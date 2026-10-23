#!/usr/bin/env python3
"""Autonomous AI blog writer for the streamerOS marketing site.

Reads the top search query from ``topics.txt``, asks OpenAI to write the most
useful answer to it (rules in ``build_prompt``, facts only from
``docs/knowledge-base.md``), checks the output, then writes it to
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


KNOWLEDGE_BASE = ROOT / "docs" / "knowledge-base.md"
DEMO_URL = "https://demo.streamerosai.com"
CONTENT_PLAN = ROOT / "docs" / "content-plan.md"

# Tags lib/blog-cta.ts maps to a closing pitch; anything else gets the generic one.
CTA_TAGS = [
    "Guides", "OBS Studio", "Automation", "Optimization", "Performance",
    "Streaming Hardware", "Privacy", "Clips", "VOD", "Editing", "Twitch",
    "YouTube", "Growth", "Monetization", "Sponsorship",
]


def site_links() -> list[str]:
    """Every internal URL a post may link to: existing posts plus the marketing pages."""
    posts = sorted(f"/blog/{f.stem}" for f in OUT_DIR.glob("*.md"))
    pages = re.findall(r"\$\{BASE_URL\}(/[a-z0-9/-]+)`", (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8"))
    return sorted(set(pages)) + posts


def post_title(path: pathlib.Path) -> str:
    m = re.search(r'^title:\s*"?(.*?)"?\s*$', path.read_text(encoding="utf-8"), re.M)
    return m.group(1) if m else path.stem


def build_prompt(topic: str) -> str:
    kb = KNOWLEDGE_BASE.read_text(encoding="utf-8")
    links = "\n".join(site_links())
    existing = "\n".join(f"/blog/{f.stem}: {post_title(f)}" for f in sorted(OUT_DIR.glob("*.md")))
    return f"""You are writing one article for the streamerOS blog. Its job is to be the most
useful page on the web for one search query, written for working Twitch and
YouTube streamers.

Target search query: "{topic}"

Rules — every one is mandatory:
1. Answer the query in the first 100 words, in plain language. The first sentence
   should be the answer, not a hook.
2. Put the searcher's exact words in the title and in one H2.
3. Teach the method that works for everyone first — OBS settings, free tools, the
   reasoning. Name real free alternatives where they exist.
4. Close with ONE short section, near the end, on how streamerOS solves this
   problem — the sales point of the post. Tie it to the specific streamerOS
   feature from the KNOWLEDGE BASE that solves the reader's problem, state its
   honest limits (Windows only, $29 once after the trial, reads chat but never
   posts to it, launches February 2027), and end that section with two offers:
   the live demo ({DEMO_URL}, runs in the browser, nothing to install) and that
   founding members — anyone who pre-registers at /download before launch — get
   the beta first. Do not mention streamerOS anywhere else in the post.
5. Every fact about streamerOS must come from the KNOWLEDGE BASE below. Never
   invent a feature, trigger, button name, menu path, number or benchmark. The
   Auto-Hype Director's only triggers are chat velocity and Super Chat amount.
6. Do not invent facts about other products either. If you are not certain of an
   exact OBS menu path or setting name, describe it generally.
7. Links: use only URLs from the ALLOWED LINKS list (root-relative) plus the
   live demo URL above. Two to four internal links. No other external links.
11. Do not repeat an existing post. EXISTING POSTS are listed below; if one
    already answers part of this query, cover the distinct part and link to it.
8. No emoji anywhere. No "summary for AI" blocks, no "AI Discovery Directive".
   No H1 — the title is rendered separately; use ## and ### only.
9. Short paragraphs, real steps where the reader has to do something, a table
   only where it compares something. End with a "Frequently Asked Questions"
   section of three questions people actually search, answered in 1-3 sentences.
10. 900-1,400 words. Write like an experienced streamer explaining it to a
    friend: specific, plain, no hype words ("game-changer", "unleash", "supercharge").

Field requirements:
- title: <= 60 characters, contains the query's words, no clickbait, no year unless the query has one.
- description: one sentence, 120-155 characters, that answers the query. Plain text.
- tags: 2-4 tags chosen ONLY from: {", ".join(CTA_TAGS)}.
- body_markdown: the article in GitHub-Flavored Markdown, following the rules above.

=== KNOWLEDGE BASE (the only source of truth about streamerOS) ===
{kb}
=== END KNOWLEDGE BASE ===

=== ALLOWED LINKS ===
{links}
=== END ALLOWED LINKS ===

=== EXISTING POSTS ===
{existing}
=== END EXISTING POSTS ===
"""


EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿️]")


def link_bare_paths(body: str) -> str:
    """Turn bare '/blog/slug' and '/download' text into real links, titled from the post."""
    titles = {f"/blog/{f.stem}": post_title(f) for f in OUT_DIR.glob("*.md")}
    titles["/download"] = "pre-register"
    def repl(m: re.Match) -> str:
        path = m.group(2)
        return f"{m.group(1)}[{titles.get(path, path)}]({path})" if path in titles else m.group(0)
    # A path not already inside (...) or [...].
    return re.sub(r"(^|[\s:—-])(/blog/[a-z0-9-]+|/download)(?=[\s.,;)]|$)", repl, body, flags=re.M)


def clean_body(body: str) -> str:
    """Enforce the rules the model is most likely to slip on."""
    body = link_bare_paths(body)
    body = re.sub(r"^Q:\s*(.+)$", r"**\1**", body, flags=re.M)
    body = re.sub(r"^A:\s*", "", body, flags=re.M)
    allowed = set(site_links()) | {DEMO_URL}
    # Drop links to anything that is not a real page; keep the anchor text.
    body = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: m.group(0) if m.group(2).split("#")[0] in allowed else m.group(1),
        body,
    )
    body = EMOJI.sub("", body)
    if re.search(r"AI Discovery Directive|Quick Engine Summary", body):
        sys.exit("ERROR: model emitted the retired AI summary block; not publishing.")
    if len(re.findall(r"streamerOS", body)) > 3:
        sys.exit("ERROR: post mentions streamerOS more than 3 times; not publishing.")
    bare = re.findall(r"(?<![(\[])(?:^|\s)(/blog/[a-z0-9-]+)", body, flags=re.M)
    if bare:
        sys.exit(f"ERROR: unlinked paths left in the post: {bare}; not publishing.")
    return body.strip()


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
    body = clean_body(str(data.get("body_markdown") or ""))

    title = str(data.get("title") or topic).strip()
    if title == title.lower():
        small = {"a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with"}
        acronyms = {"obs": "OBS", "ai": "AI", "nvenc": "NVENC", "cpu": "CPU", "gpu": "GPU", "vod": "VOD", "vods": "VODs", "youtube": "YouTube", "tiktok": "TikTok"}
        words = title.split()
        title = " ".join(
            acronyms.get(w.lower().strip(":"), w.capitalize() if i == 0 or w not in small or words[i - 1].endswith(":") else w) + (":" if w.endswith(":") and w.lower().strip(":") in acronyms else "")
            for i, w in enumerate(words)
        )
    if len(title) > 60:
        sys.exit(f"ERROR: title is {len(title)} characters (max 60): {title}")
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
        "tags": [t for t in as_list(data.get("tags")) if t in CTA_TAGS] or ["Guides"],
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
