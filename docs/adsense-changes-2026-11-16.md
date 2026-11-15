# AdSense readiness changes, 16 Nov 2026 (streamerosai.com)

Context: AdSense rejected the domain for "Low-value content" on 16 Nov 2026. This log follows
`portfolio/docs/adsense-readiness-2026-11-16.md` (checklist and hard rules). Ads stay OFF;
`scripts/verify-no-ads.mjs` still passes; `public/ads.txt` is unchanged and still carries the
publisher line.

## What was audited

Every URL in the built `sitemap.xml` (99 before, 95 after), measured on the built `out/` HTML:
words inside `<main>` (nav, header and footer excluded) and 5-word-shingle overlap between
every pair of pages to find templated or duplicated pages. Findings:

- The 52 blog posts are all 960+ words; most were already rewritten with direct answers,
  worked examples and sources (12 to 15 Nov). Overlap between posts is shared boilerplate
  (the same OBS WebSocket and Ollama setup passages), not copied bodies. Highest pair overlap
  was about 0.30.
- Feature, for/ and vs/ pages are 500 to 1,500 words with screenshots from the working app;
  they do not overlap each other beyond the layout.
- The real weak spots were: the three emote glossary entries (270 to 355 words, same shape,
  heavy overlap with each other: 0.32 to 0.40), a three-entry glossary index, the docs hub
  (201 words, ending with "More guides are on the way"), Contact (31 words), a thin About
  that said "we were streamers" with no named person or place, a Privacy page that did not
  mention the first-party visit counter, cookies or AdSense, and two overlapping cloud-vs-local
  explainers in the blog.
- Honesty problem found: the performance page presented "152 MB resident" and "measured under
  a live 1080p60 game" with invented game/OBS bars. The product repo says the formal capture
  is still pending (`README_v1_GA_BLOCKER.md`, `BENCHMARK_PROTOCOL.md`; the only record is a
  1.8% sustained figure from an offline RTX 3060 benchmark in `SYSTEM_ARCHITECTURE.md`). The
  page was corrected (below).

## What changed

Counts: deepened or rewritten 7 (about, contact, docs, download, privacy, terms, performance);
merged 4 pages into 2 (three glossary entries into one; one blog post into the post it
overlapped); noindexed 1 (glossary index); added 1 page (the merged emote page, replacing three
thin ones, so no net new thin pages); redirect stubs added 6.

- About rewritten: Yaseen Khatib, solo, Hyderabad, why it exists, where it stands (unreleased,
  v1.0 planned Feb 2027, live demo), how the site and ads are handled. Removed the claim that
  "we" were streamers (not verifiable) and the "no one ever sees your chat" overstatement.
- Contact: added who answers, what to write about, a bug-report checklist, a direct email.
  The form (EmailJS) and `contact@streamerosai.com` are unchanged.
- Privacy: added the first-party "pulse" visit counter (no cookies, no IP or user-agent stored,
  honours Do Not Track and Global Privacy Control, 90-day deletion), cookies and local storage,
  Google AdSense (not running, future use, opt-out links: Google Ad Settings, aboutads.info,
  youronlinechoices, partner-sites explainer), retention, rights (GDPR, India DPDP), controller,
  contact. Terms gained a website and content clause.
- Navigation: Docs added to the header and the footer. The footer already carried About,
  Trust, Contact, Privacy and Terms on every page.
- Docs hub rebuilt from the verified knowledge base: requirements, OBS connection, local AI,
  trial and licence behaviour, where data is kept, a feature index. The placeholder line is gone.
- Download page: added what pre-registering means and that the date is a plan, not a guarantee.
- Glossary: KEKW, POGGERS and Sadge merged into `/glossary/twitch-emotes` (738 words, same
  sources, plus what a burst of each tells a streamer). The three old URLs are static
  redirect pages. `/glossary` (a list of three entries) is `noindex,follow` and out of the sitemap.
- Blog: `the-rise-of-zero-cloud-stream-tools` (a not-indexed explainer overlapping two posts)
  was folded into `what-stream-tools-send-to-the-cloud` (1,088 to 2,025 words: how a hosted
  widget differs from a local one, four tests, where cloud is better). The old URL is a static
  redirect; the original is kept in `content/blog-archive/`.
- 4xx URLs (Bing): the 13 deleted `content/blog` files and 10 archived posts were already covered
  by `scripts/emit-redirects.mjs`. Added `/docs/auto-hype` to `/features/auto-hype` and
  `/docs/performance` to `/features/performance` (both were real pages, deleted in git history).
  Redirects are meta-refresh plus canonical plus link (GitHub Pages has no server redirects).
- Performance page: the 1.8% is now described as a single-machine figure on the developer's
  RTX 3060 test PC for the core app; the 65% and 25% game/OBS bars and "152 MB" were relabelled
  illustrative or replaced with the documented 600 MB design budget; added what the figure
  includes and excludes.

## Page by page (indexable sitemap pages)

Words are inside `<main>` of the built HTML. "kept as is" means audited and not changed.

| Page | Words before | Words after | Action |
|---|---|---|---|
| /glossary | 294 | 227 | noindex, removed from sitemap (3-entry list) |
| /contact | 31 | 256 | deepened (what to write about, who answers, bug report checklist) |
| /changelog | 394 | 394 | kept as is |
| /docs/installation | 405 | 407 | unchanged |
| /glossary/nightbot-custom-commands | 430 | 430 | kept as is |
| /download | 291 | 457 | deepened (what pre-registering means) |
| /streamers | 470 | 470 | kept as is |
| /features/media-kit | 517 | 517 | kept as is |
| /features/zero-cloud | 525 | 525 | kept as is |
| /vs/sammi | 573 | 573 | kept as is |
| /glossary/twitch-banned-words | 595 | 595 | kept as is |
| /features/aura-studio | 604 | 604 | kept as is |
| /about | 294 | 605 | rewritten (solo developer, Hyderabad, why, status, site and ads disclosure) |
| /features/clip-library | 636 | 636 | kept as is |
| /features/viral-moments | 661 | 661 | kept as is |
| /features/sponsor-crm | 669 | 669 | kept as is |
| /features/performance | 543 | 706 | corrected honesty of CPU/RAM claims, added scope Q&A |
| /glossary/twitch-emotes | new | 738 | new, merges kekw+poggers+sadge |
| /vs/streamer-bot | 742 | 742 | kept as is |
| /features/obs-bridge | 749 | 749 | kept as is |
| /for/vtubers | 762 | 762 | kept as is |
| /features/shorts-factory | 777 | 777 | kept as is |
| /vs | 797 | 797 | kept as is |
| /for/youtube-live | 804 | 804 | kept as is |
| /for/solo-streamers | 806 | 806 | kept as is |
| /features/auto-hype | 819 | 819 | kept as is |
| /for/low-end-pc | 839 | 839 | kept as is |
| /features/aura-scene | 840 | 840 | kept as is |
| /vs/streamlabs | 877 | 877 | kept as is |
| /features/brand-guard | 882 | 882 | kept as is |
| /pricing | 882 | 882 | kept as is |
| /blog/how-to-save-youtube-live-chat-and-twitch-chat-logs | 966 | 966 | kept as is |
| /blog/obs-websocket-setup-guide | 982 | 982 | kept as is |
| /blog/streaming-workspace-folder-setup | 992 | 992 | kept as is |
| /blog/obs-bitrate-settings-for-twitch | 998 | 998 | kept as is |
| /blog/auto-clip-twitch-highlights | 1014 | 1014 | kept as is |
| /features | 1037 | 1037 | kept as is |
| /blog/obs-automation-on-a-low-end-pc | 1038 | 1038 | kept as is |
| /terms | 937 | 1040 | extended (website content and ads clause) |
| /blog/how-to-track-super-chat-revenue | 1056 | 1056 | kept as is |
| /docs | 201 | 1057 | deepened (requirements, OBS, local AI, licence, data, feature index) |
| /blog/run-ollama-on-windows-guide | 1059 | 1059 | kept as is |
| /features/viral-engine | 1091 | 1091 | kept as is |
| /faq | 1108 | 1108 | kept as is |
| /features/chat-archive | 1139 | 1139 | kept as is |
| /blog/how-to-read-chat-while-streaming-one-monitor | 1154 | 1154 | kept as is |
| /blog/find-best-clips-in-your-vods-automatically | 1161 | 1161 | kept as is |
| /playbook | 1172 | 1172 | kept as is |
| /for/indian-streamers | 1185 | 1185 | kept as is |
| /blog/obs-cpu-usage-preset-explained | 1198 | 1198 | kept as is |
| /features/scene-switcher | 1225 | 1225 | kept as is |
| // | 1266 | 1266 | kept as is |
| /blog/nvenc-vs-x264-for-streaming | 1316 | 1316 | kept as is |
| /privacy | 761 | 1324 | deepened (visit counter, cookies, AdSense opt-out, retention, rights) |
| /blog/how-to-make-a-streamer-media-kit | 1344 | 1344 | kept as is |
| /blog/obs-advanced-scene-switcher-guide | 1351 | 1351 | kept as is |
| /blog/keep-obs-cpu-low-while-streaming-with-local-automation | 1360 | 1360 | kept as is |
| /blog/streamlabs-alternative-local-first | 1367 | 1376 | kept as is |
| /blog/obs-chat-dock-missing | 1377 | 1377 | kept as is |
| /blog/optimizing-desktop-ipc-obs-websocket-latency | 1401 | 1401 | kept as is |
| /blog/obs-mic-too-quiet-measure-before-you-boost | 1402 | 1402 | kept as is |
| /blog/sponsors-for-small-streamers | 1404 | 1404 | kept as is |
| /blog/what-is-chat-velocity | 1410 | 1410 | kept as is |
| /blog/how-to-read-chat-sentiment-in-real-time | 1432 | 1432 | kept as is |
| /features/ai-sidekick | 1434 | 1434 | kept as is |
| /blog/obs-timer-plugin | 1436 | 1436 | kept as is |
| /blog/obs-scripts-guide | 1458 | 1458 | kept as is |
| /blog/how-to-make-youtube-shorts-from-a-live-stream | 1478 | 1478 | kept as is |
| /blog/obs-websocket-connection-failed-three-failures | 1485 | 1485 | kept as is |
| /trust | 1491 | 1491 | kept as is |
| /blog/local-obs-automation-beats-cloud-for-latency-and-privacy | 1496 | 1496 | kept as is |
| /blog/obs-high-cpu-usage-busy-chat-companion-apps | 1498 | 1498 | kept as is |
| /blog/twitch-chat-overlay-obs | 1505 | 1504 | kept as is |
| /blog/obs-automatic-scene-switcher-not-switching | 1507 | 1507 | kept as is |
| /blog/ai-co-host-for-streaming-the-setup-that-works | 1524 | 1524 | kept as is |
| /blog/stream-automation-101 | 1522 | 1527 | kept as is |
| /blog/how-to-build-a-handsfree-obs-workflow-for-youtube-live | 1549 | 1549 | kept as is |
| /features/live-cockpit | 1555 | 1555 | kept as is |
| /blog/obs-encoding-overloaded-fix | 1567 | 1567 | kept as is |
| /blog/make-obs-overlays-react-to-chat-hype-automatically | 1572 | 1572 | kept as is |
| /blog/ai-tools-for-streamers-the-setup-that-works | 1581 | 1581 | kept as is |
| /blog/best-obs-settings-for-low-cpu-streaming | 1608 | 1608 | kept as is |
| /blog/obs-dropping-frames-with-good-internet-real-fixes | 1614 | 1614 | kept as is |
| /blog/turn-twitch-vods-into-shorts-and-tiktoks | 1619 | 1619 | kept as is |
| /blog/youtube-super-chat-requirements-eligibility-and-setup | 1635 | 1635 | kept as is |
| /blog/obs-dropped-frames-find-the-cpu-hog | 1660 | 1660 | kept as is |
| /blog/twitch-vs-youtube-for-new-streamers | 1661 | 1661 | kept as is |
| /blog/popout-chat-masterclass | 1662 | 1662 | kept as is |
| /blog/obs-replay-buffer-settings-the-setup-that-works | 1674 | 1674 | kept as is |
| /blog/how-to-track-sponsor-deals-as-a-streamer | 1689 | 1689 | kept as is |
| /blog/auto-switch-obs-scenes-guide | 1752 | 1752 | kept as is |
| /blog/companies-that-sponsor-small-streamers-list-method | 1790 | 1790 | kept as is |
| /blog/obs-psycho-visual-tuning-explained | 1815 | 1815 | kept as is |
| /blog/how-much-to-charge-for-stream-sponsorships | 1920 | 1920 | kept as is |
| /blog/what-stream-tools-send-to-the-cloud | 1088 | 2025 | merge target: absorbed the zero-cloud explainer |
| /blog | 2590 | 2551 | kept as is |
| /glossary/sadge | 274 | 0 | merged into /glossary/twitch-emotes, static redirect |
| /glossary/poggers | 320 | 0 | merged into /glossary/twitch-emotes, static redirect |
| /glossary/kekw | 355 | 0 | merged into /glossary/twitch-emotes, static redirect |
| /blog/the-rise-of-zero-cloud-stream-tools | 1650 | 0 | merged into /blog/what-stream-tools-send-to-the-cloud, static redirect |


## Not-indexed pages named in Search Console

`ai-tools-for-streamers-the-setup-that-works`, `how-to-make-youtube-shorts-from-a-live-stream`,
`how-much-to-charge-for-stream-sponsorships` and `how-to-track-sponsor-deals-as-a-streamer` were
already rewritten on 15 Nov (1,480 to 1,920 words) and were left alone; re-indexing is Google's
call. `stream-automation-101` (1,527 words) is a distinct decision guide and was kept.
`the-rise-of-zero-cloud-stream-tools` was merged (above). `/features/live-cockpit` (1,555 words),
`/vs/streamlabs`, `/vs/streamer-bot` and `/for/youtube-live` are 740 to 1,555 words with sourced,
non-duplicated content; I found nothing thin to fix, so they are unchanged. Their non-indexing is
most likely a domain-level trust signal, which is what this work targets.

## What is still weak

- The product does not exist for the public yet: no download, no checkout, launch "February
  2027", zero users and zero reviews. A reviewer can read that as a promotional site for
  something unavailable. The live demo, honest status text and the 52 how-to guides are the
  mitigation; nothing else can be done in this repo.
- The 1.8% CPU figure is still quoted on the home page, the footer, many feature pages and
  about 39 blog posts as if measured under a live game. Only the performance page, About and the
  docs were corrected. The owner should run the capture in `BENCHMARK_PROTOCOL.md` and then either
  keep the number everywhere or change it everywhere.
- Roughly 40 of the blog posts are OBS how-tos on overlapping setup steps. They are original and
  sourced but a reviewer may still judge them repetitive. Further merging (for example the three
  OBS CPU posts) was not done because each answers a separate query with separate steps.
- Feature pages are marketing-heavy by nature. Some sample figures on them are labelled
  illustrative (media kit numbers), which is honest but is not evidence.
- Subdomains (esports., spotai., solar., tools., calc., math., images., exams., campus., fitrank.,
  yk.) are likely judged with the root and are outside this repo.
- Google may need weeks to recrawl; requesting review before the changed pages are recrawled
  would waste an attempt.

## Honest assessment

The "low-value" reasons that can be fixed in code are fixed: no placeholders, the thinnest
templated pages merged or noindexed, trust pages (About, Contact, Privacy, Terms) are real and
name the person, privacy discloses analytics and the future AdSense use with opt-out, and a
misleading performance claim was corrected. This raises the odds meaningfully but cannot
guarantee a pass: the underlying risk (an unreleased product with no audience yet and a content
set aimed at search queries) is not something edits can remove. Recommended: wait for Google to
recrawl (2 to 3 weeks), check that the Search Console not-indexed count has not grown, then
request the review.

## Follow-up: the 1.8% CPU claim made honest site-wide

Product repo record: `SYSTEM_ARCHITECTURE.md` logs "CPU 1.8 % sustained" from an offline RTX 3060
benchmark; the formal capture under Cyberpunk 2077 at 1080p60 in `BENCHMARK_PROTOCOL.md` is still
pending (`PENDING_TESTS.md`, `README_v1_GA_BLOCKER.md`). Every place that said the figure was
measured or held "under a live 1080p60 game" now says it is a single-machine RTX 3060 benchmark,
and where room allows that a live-game capture has not been run yet. Sentence-level edits only.

Files changed (29): home page, footer, root layout JSON-LD and meta text, blog index blurb,
features index and menu, the performance, about, docs, docs/installation, download, FAQ,
ai-sidekick, aura-studio, auto-hype, live-cockpit, low-end-pc and vs/streamlabs pages,
`lib/blog-cta.ts` (CTA shown on blog posts), `lib/features.ts`, `lib/shots.ts` (caption),
`public/llms.txt`, `public/llms-full.txt`, and 8 blog posts. Searches covered `1.8%`, "152 MB",
"live 1080p60", "under 2% CPU" and other numeric performance claims in app, components, lib, blog
and the LLM text files; the built `out/` HTML was grepped for leftovers.

Other invented numbers found and removed: "152 MB" resident memory and the 65% / 25% game and OBS
bars (earlier commit), "stays under 2% CPU" on the download page, "a promise, not a peak" on About.

Could not verify: the app screenshot caption showing "Cyberpunk2077 at 1.8% CPU" (a real capture
of the app's own readout, left as the screenshot alt text; the visible caption was reworded); the
"app displays its own current figure" statement (from the knowledge base, not re-checked against
the app); "94% payload reduction" and MessagePack batching statements on the performance page (not
re-checked against the product code); the Hinglish, latency and "instant" scene-switch wording on
feature pages (no measurements found in the product repo).

### Follow-up 2: MessagePack, "94%" and "instant" wording

Searched the product repo (src, src-tauri, docs) for MessagePack, msgpack, bincode and "payload
reduction": no source. The "94%" in the site is not a product claim (a traffic statistic in a code
comment, and a disk-usage example in a post). Changes: removed the "batched MessagePack" sentence from
the performance page; "instantly" on the OBS Bridge page became "with one click"; the zero-cloud page
no longer says scenes switch "the instant chat reacts" and now says there is no internet delay and that
rules run on the app's once-per-second chat sampling (`SYSTEM_ARCHITECTURE.md`: velocity tick default
1.0 Hz); two sentences in `optimizing-desktop-ipc-obs-websocket-latency` ("the instant", "almost
instantly") were reworded and now say no latency figure has been measured. Kept as is: the 800 ms
first-token wording on the AI Sidekick page ("designed to", matches the PRD target; the architecture
log records a 315 ms benchmark). Still unverified: "Chat parsing, velocity and sentiment scoring run off
the UI thread" on the performance page (architecture description, not checked in code).
