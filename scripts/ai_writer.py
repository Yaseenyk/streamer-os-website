#!/usr/bin/env python3
"""Autonomous AI blog writer for the streamerOS marketing site.

Reads the top topic from ``topics.txt``, asks OpenAI to write a scannable,
streamer-focused SEO article in strict Markdown, then writes it to
``content/blog/<slug>.md`` with the frontmatter the Next.js site's
``lib/posts.ts`` loader understands. On success the used topic is removed from
``topics.txt``.

Env:
  OPENAI_API_KEY     (required)  OpenAI API key.
  OPENAI_MODEL       (optional)  Defaults to ``gpt-5``.
  OPENAI_MAX_TOKENS  (optional)  Output token cap. Defaults to 16384.
"""

from __future__ import annotations

import datetime
import json
import os
import pathlib
import re
import sys

import yaml
from openai import OpenAI

SCRIPTS_DIR = pathlib.Path(__file__).resolve().parent
ROOT = SCRIPTS_DIR.parent
TOPICS_FILE = SCRIPTS_DIR / "topics.txt"
OUT_DIR = ROOT / "content" / "blog"

# Local convenience: load OPENAI_API_KEY from a gitignored .env if present.
# In CI the key comes from the environment (GitHub secret), so this is a no-op.
try:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
    load_dotenv(SCRIPTS_DIR / ".env")
except ImportError:
    pass

# lib/posts.ts reads `author` as a plain string, so keep it a string here.
AUTHOR = "Yaseen Khatib"


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")[:80] or "post"


def read_top_topic() -> str | None:
    if not TOPICS_FILE.exists():
        return None
    for line in TOPICS_FILE.read_text(encoding="utf-8").splitlines():
        if line.strip():
            return line.strip()
    return None


def remove_topic(topic: str) -> None:
    lines = TOPICS_FILE.read_text(encoding="utf-8").splitlines()
    remaining = [ln for ln in lines if ln.strip() != topic]
    # Keep a trailing newline for clean diffs.
    TOPICS_FILE.write_text(
        "\n".join(remaining).rstrip("\n") + ("\n" if remaining else ""),
        encoding="utf-8",
    )


def build_prompt(topic: str) -> str:
    return f"""You are a streaming-industry content writer for streamerOS, a local-first,
zero-cloud desktop app for live streamers (works with OBS, Twitch, and YouTube).
Your audience is WORKING STREAMERS — not software engineers. They skim, they
don't read walls of text. Write practical, punchy, benefit-led content.

Write an SEO blog post on this topic:
"{topic}"

Field requirements (ALL fields mandatory — never leave one empty):
- title: a specific, search-friendly, punchy title (<=70 chars). No clickbait.
- description: one compelling meta-description sentence, 120-160 chars, plain text, no quotes.
- tags: 2-4 short tags from a streamer vocabulary (e.g. Guides, OBS, Growth,
  Monetization, Clipping, Automation, Local AI, Performance).
- body_markdown: the full article in GitHub-Flavored Markdown. Requirements:
  - START with a blockquote summary block in EXACTLY this convention (this is the
    site's "AI Discovery Directive" used by every post):
    > ### 🤖 Quick Engine Summary (AI Discovery Directive)
    > * **Core Problem:** <the streamer pain in one line>
    > * **The Fix:** <the approach in one line>
    > * **Why It Matters:** <the payoff in one line>
  - Do NOT include an H1 (#) heading; the title is rendered separately. Use ## and ### only.
  - Be SCANNABLE: short paragraphs (2-3 sentences max), frequent ## sections,
    bullet lists, and a short markdown table where it genuinely helps.
  - Be practical and specific to streaming. Avoid engineering jargon and internals.
  - Where it fits naturally, reference streamerOS and link to a relevant feature
    page using a ROOT-RELATIVE markdown link. Valid feature links ONLY:
    /features , /features/auto-hype , /features/obs-bridge , /features/aura-studio ,
    /features/clip-library , /features/viral-moments , /features/media-kit ,
    /features/sponsor-crm , /features/performance , /features/zero-cloud
    Do NOT invent other internal links or full URLs. Keep product mentions honest
    and non-spammy (one or two links is plenty).
  - Do NOT wrap the whole body in a markdown code fence. No commentary before or
    after the article.
  - Target 900-1200 words.
"""


# Structured-output contract keeps the model from silently omitting fields.
POST_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "body_markdown": {"type": "string"},
    },
    "required": ["title", "description", "tags", "body_markdown"],
    "additionalProperties": False,
}


def as_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str) and value.strip():
        return [p.strip() for p in value.split(",") if p.strip()]
    return []


def generate(topic: str) -> dict:
    # .strip() guards against a trailing newline/space in the key (a common
    # paste artifact in CI secrets) that makes httpx reject the auth header.
    api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    if not api_key:
        sys.exit("ERROR: OPENAI_API_KEY is not set.")
    model_name = os.environ.get("OPENAI_MODEL", "gpt-5").strip()
    max_tokens = int(os.environ.get("OPENAI_MAX_TOKENS", "16384"))

    client = OpenAI(api_key=api_key)
    resp = client.responses.create(
        model=model_name,
        input=build_prompt(topic),
        max_output_tokens=max_tokens,
        text={
            "format": {
                "type": "json_schema",
                "name": "blog_post",
                "strict": True,
                "schema": POST_SCHEMA,
            }
        },
    )
    if getattr(resp, "status", None) == "incomplete":
        sys.exit("ERROR: response truncated — raise OPENAI_MAX_TOKENS.")

    text = (resp.output_text or "").strip()
    if not text:
        sys.exit("ERROR: OpenAI returned an empty response.")
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        sys.exit(f"ERROR: could not parse structured output: {exc}")


def main() -> None:
    topic = read_top_topic()
    if not topic:
        print("No topics left in topics.txt — nothing to write.")
        return

    print(f"Topic: {topic}")
    data = generate(topic)
    body = str(data.get("body_markdown") or "").strip()

    title = str(data.get("title") or topic).strip()
    slug = slugify(title)
    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")

    if not body:
        sys.exit("ERROR: generated article body is empty.")

    # Frontmatter matches lib/posts.ts PostMeta exactly (title/description/date/
    # author/tags). We own slug (filename) and date.
    frontmatter = {
        "title": title,
        "description": str(data.get("description") or "").strip(),
        "date": today,
        "author": AUTHOR,
        "tags": as_list(data.get("tags")) or ["Guides", "Streaming"],
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"{slug}.md"
    if out_path.exists():
        slug = f"{slug}-{today}"
        out_path = OUT_DIR / f"{slug}.md"

    fm = yaml.safe_dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
    out_path.write_text(f"---\n{fm}\n---\n\n{body}\n", encoding="utf-8")
    print(f"Wrote {out_path.relative_to(ROOT)}")

    remove_topic(topic)
    print("Removed topic from topics.txt")


if __name__ == "__main__":
    main()
