# AdSense changes, 19 Nov 2026 (streamerosai.com)

Follows `docs/adsense-changes-2026-11-16.md`. The owner lifted the content freeze on 19 Nov 2026.
Ads stay OFF: no ad code added, `ADSENSE_CLIENT` not set, `scripts/verify-no-ads.mjs` passes.

## 1. Claims checked against the product repo (`D:\Streamer OS\streamerOS`)

| Claim on the site | What the product code/docs say | Action |
|---|---|---|
| Sentiment "understands Hinglish", "Hinglish chat, read correctly", "Bhai sahi hai reads as positive" | The chat classifier prompt says "Hinglish is in scope" (`src-tauri/src/services/ollama_client.rs`, `CHAT_AFFECT_SYSTEM_PROMPT`). The "Bhai sahi hai" / "Cringe yaar" examples come from the design doc `docs/AI_SYSTEM_PROMPTS.md`. No accuracy benchmark exists; Hinglish recall is listed as not benchmarked in `model_manager.rs` and `SYSTEM_ARCHITECTURE.md`. | Reworded to "prompted for Hinglish, accuracy not yet benchmarked" on FAQ, for/indian-streamers (FAQ, card, panel heading and text), live-cockpit bullet, features list (`lib/features.ts`), screenshot caption (`lib/shots.ts`). Kept short mentions that only say Hinglish is in scope (changelog, vs tables, llms.txt). |
| "The app displays its own current figure" (CPU) | Verified: `src-tauri/src/commands/system.rs` `get_system_stats` reads the app's own process CPU and RAM via `sysinfo`. | Kept. |
| "Chat parsing, velocity and sentiment scoring run off the UI thread" | Verified: these run in the Rust core (`commands/chat.rs`, `velocity.rs`, `sentiment.rs`), not in the WebView UI. | Kept. |
| "No bundled browser engine" | Tauri shell on the system WebView (`src-tauri/tauri.conf.json`). | Kept. |
| "Instant"/"instantly"/"the instant" scene switching and marking, "feel instant", "Slash automation latency" | No latency measurement exists in the product repo. Velocity is sampled once per second (`SYSTEM_ARCHITECTURE.md`). | Reworded to "when the room peaks", "as soon as the trigger condition is met, with no internet round-trip", "at the second it happens", "once per second". Pages: home (2), auto-hype (2), viral-moments (2), obs-bridge link text, playbook, `LocalVsCloudDiagram`, blog CTA (`lib/blog-cta.ts`), OG description (`app/layout.tsx`), and blog posts `local-obs-automation-beats-cloud-for-latency-and-privacy` (3), `make-obs-overlays-react-to-chat-hype-automatically`, `popout-chat-masterclass`, `optimizing-desktop-ipc-obs-websocket-latency` (title "Why Scene Switches Feel Instant, Not Laggy" became "Where OBS Scene Switch Lag Comes From"). |
| "94% payload reduction", MessagePack | Already removed on 16 Nov; re-searched site and product: none left as a product claim (the "94%" in `lib/blog-cta.ts` is a traffic note in a code comment; the one in a blog post is a disk-usage example). | No change. |
| ~800 ms first token (AI Sidekick) | "designed to" wording matches the PRD target; architecture log records a 315 ms benchmark. | Kept. |

Left as is on purpose: "instant replay" (OBS/NVIDIA feature names), "feel instant" on vs/streamlabs and
`streamlabs-alternative-local-first` (describes what a streamer wants from a cloud tool, not a product claim).

## 2. Thin or templated pages

Audit: words inside `<main>` of every sitemap URL in the built `out/` (96 URLs) and 5-word-shingle
overlap between every pair. Highest pair overlap is 0.31 (vs/sammi and vs/streamer-bot; docs and
docs/installation), caused by shared comparison rows and the requirements list, not copied bodies.

| Page | Words before | Words after | Action and why |
|---|---|---|---|
| /docs/installation | 421 | 924 | Deepened from the product code: the real installer formats (`.exe` per-user NSIS and `.msi`, `tauri.conf.json`), unsigned-installer SmartScreen note, OBS auto-probe of `127.0.0.1:4455` and its three outcomes including password-required (`commands/obs.rs`), manual host/port form, Ollama at `127.0.0.1:11434` with default model `llama3.2` and in-app model download (`ollama_client.rs`), offline notice, optional YouTube API key in Windows Credential Manager (`youtube_api.rs`), a troubleshooting table. Also removed "download the latest v1.0 release" (there is no release yet) and the HowTo JSON-LD now says the same. |
| /glossary/nightbot-custom-commands | 436 | 665 | Deepened: four commands built only from the documented syntax and variables, and three mistakes (options after the response, edit replaces the response, alias needs `$(query)`). Sources unchanged (Nightbot docs). |
| /contact (261), /changelog (400), /download (468), /streamers (468) | | unchanged | Functional pages (contact form, release log, pre-registration, beta sign-up). Short by nature and honest; deepening them would mean padding. |
| All feature, for/, vs/ pages (519+) and blog posts (960+) | | unchanged | Not thin; overlap under 0.31. |

Nothing was noindexed or merged this pass (the 16 Nov pass already merged the emote glossary and the
zero-cloud post and noindexed `/glossary`). Sitemap unchanged at 96 URLs.

## 3. Blog pipeline and templated AI posts

- Pipeline: `.github/workflows/ai_blogger.yml` runs `scripts/ai_writer.py` (OpenAI) and publishes straight
  to main. There are no future-dated posts in `content/blog/`; the queue is `scripts/topics.txt` (4 topics left).
- Cadence: was Mondays and Thursdays (2 a week, at the cap). Slowed to Thursdays only (1 a week) during the
  AdSense re-review: fewer, stronger posts. Restore `"0 9 * * 1,4"` to go back to two.
- Templating found: four auto posts used the same formula title "<query>: the setup that works", and six
  had an H2 that was the bare lowercase search query ("## obs scene switcher hotkey"). Fixed (slugs and
  URLs unchanged, no posts deleted):

| Post (slug unchanged) | Change |
|---|---|
| ai-co-host-for-streaming-the-setup-that-works | Title to "How to Build a Free AI Co-Host for Your Stream"; bare-query H2 rewritten; formula line in description |
| ai-tools-for-streamers-the-setup-that-works | Title to "AI Tools for Streamers: A Free, Local Stack"; bare-query H2 rewritten |
| obs-replay-buffer-settings-the-setup-that-works | Title to "OBS Replay Buffer Settings, Hotkeys and Fixes" |
| obs-scene-switcher-hotkey-the-setup-that-works | Title to "How to Set an OBS Scene Switcher Hotkey"; bare-query H2 rewritten |
| how-to-make-youtube-shorts-from-a-live-stream | Bare-query H2 and "the setup that works" line rewritten |
| obs-dropping-frames-with-good-internet-real-fixes | Bare-query H2 rewritten |
| youtube-super-chat-requirements-eligibility-and-setup | Bare-query H2 and "The setup that works for everyone" H2 rewritten |

- `scripts/ai_writer.py`: the prompt now forbids formula titles and bare-query H2s, and the script fails the
  run (nothing published) if a title contains "setup that works", "real fixes" or "list + method", or if an
  H2 is exactly the search query.

## Gates

`npm run build` (emit OG images, next build, directory indexes, redirects, verify-sitemap 96 URLs OK,
verify-links OK across 256 pages, verify-no-ads OK across 780 files) and `npm run lint` pass. Checked
in `out/`: no "the instant", "setup that works" or "Hinglish chat, read correctly" left in product
claims; `/glossary` still `noindex, follow` and absent from the sitemap; new post titles in `<title>`.

## What remains (needs the owner)

- The product is still unreleased (no download, launch planned February 2027, no users or reviews). This is
  the biggest "low-value" risk and edits cannot remove it.
- The 1.8% CPU figure is a single-machine benchmark; run the capture in `BENCHMARK_PROTOCOL.md` and update
  the wording site-wide either way.
- Hinglish accuracy: run a small labelled test (for example 100 real Hinglish chat lines) before claiming more
  than "in scope".
- Scene-switch latency: measure chat-spike-to-cut time once; until then the site makes no latency claim.
- About 40 OBS how-to posts share setup passages (overlap up to 0.29). Each answers a separate query; merging
  more is a judgment call for the owner.
- AI-written posts still end with a similar streamerOS sales section; read each new Thursday post after it
  goes live.
- Subdomains are judged with the root and are outside this repo. Wait for a recrawl (2 to 3 weeks) before
  requesting review.

## 4. Second pass, 19 Nov 2026: content-first home page, pre-launch pages noindexed, blogger paused, overlaps pruned

Owner-approved the same day, following `portfolio/docs/adsense-case-study-2026-11-19.md` (items 1 to 3 of its
recommendations). Ads stay OFF; `verify-no-ads` passes. `/privacy` was not touched in this pass.

### Home page and navigation

- The home page (`app/home-content.tsx`, `app/page.tsx`) now leads with the guides. New h1: "OBS and streaming guides
  for Twitch and YouTube streamers." Below it: every indexable guide grouped into six topics (OBS settings and
  performance; scene switching, plugins and automation; live chat; clips, Shorts and files; sponsors, Super Chats
  and growth; local AI, privacy and tool choice), titles and descriptions read from the posts themselves, then a
  reference row (Playbook, Glossary and its three entries, Docs, FAQ).
- The app has one labelled section near the end: "streamerOS app: coming February 2027", with "not released yet",
  "there is no download yet" and "a plan rather than a promise". Links: the browser demo, the features page and the
  early-access list (email only). The launch month is the one the product repo plans (`streamerOS/docs/session-logs/2026-10-24.md`,
  Microsoft Store launch Feb 2027) and the site already stated.
- Removed from the home page: the marquee, feature bento, ten-screen product tour, "how it works" timeline and the
  pricing block. The h1 is server HTML with a transform-only animation, so it paints at first render (LCP).
- Home `<title>` is now "streamerOS: Free OBS and Streaming Guides for Twitch and YouTube" (was the app tagline).
- Header: Guides, Playbook, Docs, FAQ, About, then one menu labelled "streamerOS app" with the status line "Coming
  February 2027 · not released yet". Pricing and Changelog left the header. The header button reads "Early access"
  (was "Pre-Register"); the mobile button reads "Join the early-access list" (was "Get the beta").
- Footer: a Guides column comes first; app pages sit in one "App · pre-launch" column where Pricing and Compare are
  labelled "(pre-launch)" and the list link is "Early-access list". The brand blurb now describes the guides.

### Pre-launch pages: noindex,follow, out of the sitemap, llms files and header

| Page | Change |
|---|---|
| /download | noindex,follow; title "streamerOS Early Access: Join the Waitlist (Not Released Yet)"; eyebrow "Early access · no download yet"; description says there is no download |
| /pricing | noindex,follow |
| /vs, /vs/streamlabs, /vs/streamer-bot, /vs/sammi | noindex,follow |
| /streamers (Founding Streamers beta sign-up) | noindex,follow |

All seven were removed from `app/sitemap.ts`, from `public/llms.txt` (which now lists the guides first) and the three
comparison URLs from `public/llms-full.txt`. The pages stay live. Searched for "Download now", "free download",
"download the" CTAs in app, components and lib: none promise a download; the last one ("Download streamerOS" in the
download page title) is gone.

### AI Blogger paused

`.github/workflows/ai_blogger.yml`: the Thursday cron is commented out with "Paused 19 Nov 2026 for the AdSense
review; owner re-enables." `workflow_dispatch` is kept, so a reviewed post can still be run by hand. To re-enable,
uncomment the two `schedule` lines.

### Overlapping posts

Measured: 5-word shingle Jaccard on the markdown bodies (frontmatter and code removed) is low for every pair (highest
0.017), so the overlap is in the question each post answers, not in copied text. Clustered by question, using the
14 Oct Search Console page export where it helped choose. In each cluster the stronger post stays indexable; the
others get `seeAlso: <kept slug>` in frontmatter, which makes the page `noindex, follow`, shows a "See also" box at
the top linking the kept post, and drops it from the blog index, home page, RSS feed, sitemap and "Keep reading"
links (`lib/posts.ts`, `app/blog/[slug]/page.tsx`). No URL was deleted.

| Question | Kept (indexable) | Noindexed, see-also to the kept post |
|---|---|---|
| Auto-switching OBS scenes from chat | auto-switch-obs-scenes-guide (most clicks of any post) | how-to-build-a-handsfree-obs-workflow-for-youtube-live, make-obs-overlays-react-to-chat-hype-automatically (both product walkthroughs for the unreleased app) |
| Local vs cloud tools: privacy and latency | what-stream-tools-send-to-the-cloud (and optimizing-desktop-ipc-obs-websocket-latency for lag) | local-obs-automation-beats-cloud-for-latency-and-privacy |
| Keeping OBS CPU low | best-obs-settings-for-low-cpu-streaming | keep-obs-cpu-low-while-streaming-with-local-automation |
| What the apps beside OBS cost | obs-high-cpu-usage-busy-chat-companion-apps | obs-automation-on-a-low-end-pc |
| OBS dropping frames | obs-dropped-frames-find-the-cpu-hog (obs-encoding-overloaded-fix kept for the error message) | obs-dropping-frames-with-good-internet-real-fixes |
| Reading chat while streaming | how-to-read-chat-while-streaming-one-monitor | popout-chat-masterclass (an app manual, not a general guide) |
| Finding highlights automatically | auto-clip-twitch-highlights | find-best-clips-in-your-vods-automatically |
| Turning a stream into vertical Shorts | how-to-make-youtube-shorts-from-a-live-stream | turn-twitch-vods-into-shorts-and-tiktoks |
| Sponsors for small streamers | sponsors-for-small-streamers | companies-that-sponsor-small-streamers-list-method |

Kept as separate questions on purpose: OBS WebSocket setup vs "connection failed"; Advanced Scene Switcher guide vs
the cold-start "not switching" story vs the hotkey post; encoder preset, adaptive quantization, NVENC vs x264 and
bitrate; AI co-host vs AI tool stack (overlapping Ollama setup, different question; the owner may still merge them).

Internal links in kept posts and on `/features/viral-moments` that pointed at noindexed posts were repointed to the
kept ones (sentence-level edits; one cross-link in the Shorts post became two sentences on doing the same with a
Twitch VOD). Links that remain still work (pages are live, follow).

Result: blog posts indexable 51 to 41; sitemap 96 to 79 URLs.

### Gates

`npm run lint` and `npm run build` pass: verify-sitemap OK (79 URLs, none noindex), verify-links OK (256 pages),
verify-no-ads OK (780 files). Checked in `out/`: the seven pre-launch pages and ten posts carry
`<meta name="robots" content="noindex, follow">` and are absent from `sitemap.xml`, `feed.xml` (41 items), the blog
index and the home page; the home page and kept posts are `index, follow`; the header reads Guides, Playbook, Docs,
FAQ, About, streamerOS app, Live demo, Early access.
