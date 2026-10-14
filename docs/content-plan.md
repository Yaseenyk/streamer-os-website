# Content plan — driven by Search Console, not guesses

Rewritten 14 October 2026 against the real Search Console export (last 3
months). The first version of this file invented keywords; this one follows the
data, and the data says something different.

## What the data actually says

**1,505 impressions, 17 clicks, 1.13% CTR, average position 9.6.**

| Query cluster | Impressions | Clicks | Best position |
|---|---|---|---|
| Encoder tuning (psycho-visual, adaptive quantization, look-ahead, presets) | **201** | **0** | 5.8 |
| Streamlabs alternative | 18 | 0 | 11.6 |
| Encoding overloaded | 12 | 0 | 10.0 |
| Scene switching | 8 | 0 | 7.0 |
| Brand ("streamer os") | 9 | **4** | **3.4** |
| Ollama | 10 | 0 | 50.0 |

### The brand question is answered, and it is not an SEO problem

**"streamer os" ranks at position 3.4** with a 44% click-through rate, and the
homepage averages position 3.68. Google already treats "streameros" and
"streamer os" as the same thing and already ranks us near the top.

The number that matters is **9 impressions in 90 days** — roughly one search
every ten days. We are not missing from the brand query; almost nobody searches
it. That is an awareness problem, and no amount of blogging fixes it. It is
fixed by the off-site work: Product Hunt, AlternativeTo, communities, the
technical article. Writing about our own name would be writing for an audience
of nine.

### The real finding: 201 impressions, zero clicks

The encoder-tuning cluster is three quarters of all our visibility and has
never produced a single click. The cause is a title/intent mismatch:

- The biggest single query is **"adaptive quantization obs on or off"** — 45
  impressions, position 9.3.
- The page Google ranks for it is **"OBS Psycho Visual Tuning: On or Off?"**
- There is no page on this site about adaptive quantization. Google is matching
  body text, so the searcher sees a title about a different setting and scrolls
  past.

Same story for look-ahead: ~11 impressions across four queries, no page about
it. These people are already being shown our site and are choosing not to click
because the title does not answer their question.

**That makes the next two posts obvious.** They are not new topics — they are
exact-match titles for demand we have already earned in a cluster Google
already trusts us on.

---

## Weeks 1–2 — Claim the demand we already have

| # | Primary keyword | Impressions waiting | Action |
|---|---|---|---|
| 1 | obs adaptive quantization on or off | **45** | **New post.** "OBS Adaptive Quantization: On or Off?" Same structure as the psycho-visual post: what it does, when it helps, a test that settles it. Cross-link both ways. |
| 2 | obs look ahead on or off | ~11 | **New post.** "OBS Look Ahead: On or Off?" Completes the NVENC settings trio. |
| 3 | psycho visual tuning | 38 @ 6.8 | **Improve the existing post**, don't rewrite. It ranks 6.8 for its own term — add an adaptive-quantization section linking to post 1, and an explicit answer in the first 50 words. |
| 4 | streamlabs alternative | 18 @ 11.6 | **Improve the existing post.** The only commercial-intent query we have. Position 11.6 is the top of page 2 — getting it to page 1 is worth more than any new post. Add the `/vs/streamlabs` comparison link prominently. |

## Weeks 3–4 — The cluster next door

Google trusts us on OBS encoder settings. Stay there while that trust is the
only asset we have.

| # | Primary keyword | Why |
|---|---|---|
| 5 | obs encoding overloaded | 236 impressions at 9.5 already. Improve the existing post first; only write new if the gap is a distinct query. |
| 6 | obs bitrate settings twitch | Adjacent to a cluster we rank in, high volume, no page yet. |
| 7 | nvenc vs x264 | The decision that sits above every setting we already rank for. |
| 8 | obs rendering lag vs encoding lag | "Encoding overloaded" searchers hit this next. Distinct from the existing post. |

## Weeks 5–8 — Product-relevant, where we already have a foothold

The scene-switching cluster is small but it is the one that maps to what
streamerOS actually does, and `/blog/auto-switch-obs-scenes-guide` is already
our best-converting page (111 impressions, 2.7% CTR, position 9.5).

| # | Primary keyword |
|---|---|
| 9 | obs automatic scene switcher | 
| 10 | obs scene switch on game launch |
| 11 | twitch chat sentiment analysis |
| 12 | obs companion app |
| 13 | streamer.bot alternative |
| 14 | best obs companion apps |
| 15 | super chat revenue tracking |
| 16 | streaming without moderators |

## Weeks 9–12 — Commercial and audience pages

Only once the clusters above are on page 1. These were the original week 1–4
list; the data moved them back.

sammi alternative · mix it up alternative · vtuber obs setup · local ai for
streamers · hinglish chat sentiment · low end pc streaming setup · twitch clip
automation · obs websocket v5

---

## Rules

1. **One primary keyword per post**, in the title, H1, first 100 words and one
   H2.
2. **Answer the query in the first 100 words.** Our CTR problem is partly that
   searchers cannot see their answer in the snippet.
3. **Put the searcher's exact words in the title.** This is the entire lesson
   of the adaptive-quantization finding.
4. **Improving a page that already ranks beats writing a new one.** A post at
   position 8-12 with impressions is worth more work than a new post starting
   from nothing.
5. **Check `content/blog/` first** — 40 posts exist. Update, don't duplicate.
6. **The product appears once, near the end**, except on comparison pages.
7. **Name the honest limit** wherever streamerOS is recommended: Windows only,
   reads chat but never posts, $29 after a trial.
8. **Tag for the right CTA** — `lib/blog-cta.ts` maps tags to the closing pitch.

## Keywords we do NOT target

- **"streameros" / "streamer os"** — already position 3.4. Nine impressions a
  quarter. Nothing to win; the fix is awareness, not content.
- **"OBS alternative" / "OBS replacement"** — streamerOS requires OBS. Those
  searchers bounce, and the phrase teaches search engines and AI assistants to
  file us as a competitor to OBS. Use "OBS companion app".
- **"free stream automation"** — the product costs $29.
- **"best streaming software"** — head term owned by publishers with a decade
  of authority.
- **Ollama queries** — we rank 50-76. Three months of work to reach page 2 for
  traffic that will never buy a streaming app. Drop the topic.

## Measuring

Check fortnightly against the Search Console export in `gsc data/`:

- **CTR on the tuning cluster.** This is the number that proves or disproves
  the whole diagnosis. 201 impressions at 0% should become clicks within six
  weeks of posts 1-3 landing. If it does not, the problem is not the titles.
- **Position on improved pages.** Page 2 to page 1 on "streamlabs alternative"
  is the single most valuable move available.
- **Indexed?** If a post is not indexed three weeks after publishing, request
  indexing. If several are not, stop writing and fix indexing first.
- **Six weeks, zero impressions** on a new post means the keyword was too
  competitive or the post does not answer it. Rewrite or drop it — do not write
  a second post on the same term.

Two posts a week only pays if each one targets demand that exists. The export
shows exactly where that is, so refresh it monthly and let it reorder this
file.
