# SEO content plan: five story posts, 4 November 2026

Experiment: five first-person story posts, each built on one verified episode from the streamerOS product repo
(`D:\Streamer OS\streamerOS`, read-only) and each aimed at one search keyword. Later we compare Search Console
and GA4 for these URLs against the existing how-to posts. Market: US, English (DataForSEO location 2840).

Rules kept: one chat source at a time and no chat overlay are never claimed; every number comes from a repo file or an
OBS page read on 4 Nov 2026; competitors only from public pages, worded "as of November 2026".

## Seeds searched (treg, DataForSEO Labs related keywords, depth 2, limit 60)

obs scene switcher, obs websocket, obs high cpu usage, obs settings, obs dropped frames, streamlabs alternative,
stream automation, obs not connecting, obs mic too quiet, twitch chat too fast (returned nothing), twitch chat delay.
Plus 13 SERP checks and 2 competitor domain pulls (streamer.bot, meldstudio.co). streamscheme and instreamly were
already covered on 30 Oct (`portfolio/docs/seo-keyword-research-2026-10-30.md`).

## Keyword table (US, monthly volume, KD 0 to 100)

| Keyword | Vol | KD | Intent | Who ranks today | Used for |
|---|---|---|---|---|---|
| obs dropped frames | 390 | 0 | informational | obsproject forum, reddit, small how-to guides (8 results, no big brand) | Post 1 |
| obs dropping frames but internet is fine | 140 | 0 | informational | forum threads (obsproject) and small guides | Post 1 secondary |
| how to fix dropped frames obs | 140 | 0 | informational | same set | Post 1 secondary |
| obs dropping frames while streaming | 90 | 0 | informational | same set | Post 1 secondary |
| obs websocket | 590 | 7 | navigational | SERP returned unrelated coinbase docs: open | Post 3 |
| obs-websocket plugin / obs websocket plugin | 210 each | 3 | navigational | not checked | Post 3 context |
| obs websocket server | 50 | 4 | navigational | not checked | Post 3 secondary |
| obs scene switcher | 110 | 0 | transactional | telycam.com, obsproject forum x2 | Post 2 secondary |
| obs automatic scene switcher | 110 (30 Oct) | n/a | n/a | obsproject forum, small blogs, youtube; we sit at 35 | Post 2 |
| obs scene switcher not working | not in seeds | n/a | n/a | 7 of 10 results are forum, reddit, facebook, github | Post 2 |
| obs high cpu usage | 30 | 0 | informational | obsproject forum, unrelated enterprise pages | Post 5 |
| obs high gpu usage | 20 | 0 | informational | n/a | Post 5 context |
| rate control obs | 90 | 0 | informational | not checked | not used (no episode) |
| obs mic too quiet | 20 | 0 | transactional | reddit, small guides | Post 4 |
| how to make mic louder on obs | 40 | 0 | informational | n/a | Post 4 secondary |
| mic volume too low windows 11 | 70 | 0 | informational | n/a | Post 4 secondary |
| best obs settings for recording | 880 | 0 | informational | not targeted: no true episode | skipped |
| streamlabs vs obs | 1,000 | 0 | commercial | fourthwall, streamlabs.com | skipped (we have /vs/streamlabs) |
| streamlabs alternative | 140 | 2 | commercial | not checked; we are at ~11.6 | skipped (page and post exist) |
| streamelements shutting down | 720 | 0 | informational | n/a | skipped: cannot verify any fact |
| twitch chat overlay | 1,900 | 7 | informational | n/a | skipped: product renders no chat overlay |
| twitch chat delay | 20 | 0 | informational | streamer.bot ext, streamlabs, streamelements | skipped |

Honest read: volumes are small. The only 300+ keywords with KD 0 are all in the dropped-frames cluster (about 760
combined with its variants) and "obs websocket" (590, KD 7). Everything else is long tail where winning means
position 1 to 3 on a handful of searches.

## Competitors (public pages read 4 Nov 2026)

- **Streamer.bot** (streamer.bot, as of November 2026): describes itself as local-first, with first-class OBS control of
  scenes and sources, support for OBS WebSocket 4 and 5, and integrations with Twitch, YouTube and Kick. DataForSEO
  shows 1,426 ranked keywords, led by broad head terms (twitch viewer bot variants about 6,600 each, KD 30 to 42) and
  a few KD 0 pages ("stream markers twitch" 18,100, "streamelements variables" 9,900, "twitch chatbox" 4,400). It
  ranks through a wiki and many long-tail pages, not through OBS troubleshooting.
- **Meld Studio** (meldstudio.co, as of November 2026): free streaming and recording app with multistreaming,
  clipping and Meld Spark, which builds overlays from text prompts; it also ships "Spark Plug for OBS". DataForSEO
  shows 786 ranked keywords, mostly brand ("meld", "meld studio") and broad software terms at KD 47 to 90, plus
  KD 0 to 2 Nightbot command pages. Neither competitor writes OBS error-fix stories.
- **Who AI assistants cite** (`portfolio/docs/ai-visibility-2026-11-04.md`): obsproject.com (4), meldstudio.co (3),
  itechguides.com (2), streamer.bot. The gap in the SERPs for fix queries is forum threads and thin guides.

## What the data says about angle

1. Dropped-frames queries are all KD 0 and answered by forum threads and generic lists. A post that is concrete about
   which counter to read, with OBS's own order of fixes, and has a true measurement story, is differentiated.
2. "obs websocket" is navigational and the SERP is junk, so a fix-oriented page with exact failure signatures can
   take a place without competing with obsproject.com on the plugin download.
3. The existing cluster ("obs tuning" at 1, "encoding overloaded obs fix" 28 to 35) is strengthened by internal links
   from all five posts to the existing OBS tuning posts, not by repeating them.

## The five stories

All published 4 November 2026 (see Publishing note). Product claims were verified in `src-tauri/src` and the
test log, not only in docs.

### 1. `/blog/obs-dropped-frames-find-the-cpu-hog`
Title: OBS Dropped Frames: How I Found a CPU Hog That Wasn't OBS.
- Primary: obs dropped frames (390). Secondary: obs dropping frames but internet is fine, how to fix dropped frames obs,
  obs dropping frames while streaming, dropped frames (network) vs encoding lag.
- Episode: 11 Jun 2026, Brand Guard CPU sawtooth, about 5% valley, about 190% bursts, average about 106% on a silent
  mic; RMS gate to 5.0% avg and 10.8% peak; Vulkan offload took talking-load CPU from about 106% to 10.8%. Sources:
  `streamerOS/TEST_SESSION_LOG.md` (rows "CPU budget", 2026-06-11), commit `78a3c4b` and working-tree notes;
  `README_v1_GA_BLOCKER.md` and `docs/BENCHMARK_PROTOCOL.md` for the blocked RTX 3060 benchmark and the 5% budget.
- Honest limit stated in the post: the dev box was not streaming, no OBS frame drop was measured.
- Network advice is OBS's own "Stream Connection Troubleshooting" KB page (read 4 Nov 2026).
- Why it can win: KD 0 cluster, SERP is forum threads; ours adds a counter table, OBS's fix order and a sampling method.

### 2. `/blog/obs-automatic-scene-switcher-not-switching`
Title: OBS Automatic Scene Switcher Not Switching: The Cold-Start Bug.
- Primary: obs automatic scene switcher. Secondary: obs scene switcher not working, obs scene switcher, error 600.
- Episode: 10 Jun 2026, Auto-Hype stopped switching after a cold boot because the edge-trigger recorded `last_scene`
  for a switch that never reached OBS; fix returns a `DispatchOutcome`; plus a deleted "Scene 3" giving code 600 and a
  back-off. Sources: `TEST_SESSION_LOG.md` section "2026-06-10", commit `9236949`,
  `src-tauri/src/services/evaluator.rs` (`last_scene`, `failed_scene`, `DispatchOutcome`).
- Not duplicating: `auto-switch-obs-scenes-guide` and `obs-advanced-scene-switcher-guide`; this one is a failure-mode
  checklist, links to both, and says plainly the plugin was not tested for this bug.
- Why it can win: "not working" SERP is forums, reddit, facebook; we offer a ranked checklist from a real root cause.

### 3. `/blog/obs-websocket-connection-failed-three-failures`
Title: OBS WebSocket Connection Failed: Three Failures, Three Fixes.
- Primary: obs websocket. Secondary: obs websocket password, obs websocket port 4455, obs websocket server.
- Episode: 2 Jun 2026 wrong-password test leaked a raw error into the header (`af912c9`, `7c42de6`); then the three
  OBS states tested live (auth on 2 Jun, auth off and port closed 10 Jun). Sources: `TEST_SESSION_LOG.md` rows
  "OBS auto-discovery" and "OBS connect UX", `src-tauri/src/services/obs.rs` (close during op 2 means auth failure,
  code 4009; port 4455; silent `Unavailable`), plus the stale-binary diagnosis (`f46ba19`, 10 Jun).
- Not duplicating `obs-websocket-setup-guide` (setup); this is diagnosis, and links to it.
- External: OBS remote control guide (menu wording differs: "obs-websocket Settings"); Streamer.bot WebSocket 4 and 5
  support, as of November 2026.
- Why it can win: SERP for the head term is unrelated (coinbase), so a relevant page gets in cheaply.

### 4. `/blog/obs-mic-too-quiet-measure-before-you-boost`
Title: OBS Mic Too Quiet? Measure Before You Boost.
- Primary: obs mic too quiet. Secondary: how to make mic louder on obs, mic volume too low windows 11, obs mic gain.
- Episode: 11 to 13 Jun 2026, Brand Guard detection misses traced to level, RMS about 0.003 on a far-field laptop
  array versus about 0.05 needed; a later probe read 0.147 and produced two detections. Source: `TEST_SESSION_LOG.md`
  rows "TermDetected path" and "TermDetected live". The 16x and 24 dB figures are labelled as the author's arithmetic.
- OBS Audio Mixer zone wording is from OBS's audio mixer guide; Gain filter and Windows Sound path are described as
  standard UI, not benchmarked.
- Why it can win: tiny volume, but every query is KD 0 and the cluster is long tail; low risk, low reward.

### 5. `/blog/obs-high-cpu-usage-busy-chat-companion-apps`
Title: OBS High CPU Usage? Check the Apps Around It, Like My Chat Reader.
- Primary: obs high cpu usage. Secondary: obs cpu usage while streaming, reduce cpu usage streaming.
- Episode: 21 Jun 2026, fast chat made the cockpit fall about 10 minutes behind and the chat scraper disconnect;
  per-message SQLite insert plus per-message re-render; fixed by batching (`113af8a`), and the UIA 7 s stall capped
  (`a3aa8d4`); 5 s CPU/RAM sampler added (`d56e0ba`).
- Honest limit stated in the post: this is the author's own app, no OBS frame drop measured.
- Why it can win: weakest SERP in the set (30 searches); chiefly useful as an internal-link hub for the OBS cluster.

## Publishing note

The site builds from `content/blog/*.md`, and `lib/posts.ts` does not filter on date, and deploy runs only on push or
after AI Blogger, with no daily rebuild. A future-dated post would therefore either go live immediately or need a new
cron. So all five are dated 2026-11-04 and published together. Their OG cards are generated at build by
`scripts/emit-og-images.mjs`; sitemap, RSS and JSON-LD are emitted by the existing templates; `verify-sitemap` and
`verify-links` passed.

## Measuring

Check Search Console on 2026-11-18 (2 weeks) and 2026-12-16 (6 weeks) for impressions and position on each primary
keyword, and GA4 `blog:<slug>` pre-registration sources. Compare against the existing OBS tuning posts.

## Spend (treg)

About $0.20 of the $0.40 cap: 12 keyword-ideas seeds ($0.012 to $0.017 each; one seed was run twice by mistake, and
"twitch chat too fast" returned nothing but was billed), 13 SERPs ($0.00015 each), 2 ranked-keyword pulls ($0.015
each). No backlink calls. Raw outputs are in the session scratchpad, not committed.
