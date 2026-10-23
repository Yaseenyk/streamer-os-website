# Keyword research — October 2026

Research run on 2026-10-23 for two sites: this one (streamerosai.com) and the
portfolio (yaseenkhatib.streamerosai.com), which sells freelance AI work. Both
are recorded here so the decisions and the numbers behind them sit in one place.
Raw data lives in the portfolio repo under `docs/keywords/`.

## Why this was done

The question was whether the blogs were aimed at the wrong audience. The
proposal on the table was to write about freelancing and delivery basics. The
data below says that audience barely searches, and that the readers who pay
search for something else.

## Sources and how far to trust them

| Source | What it gave | Caveat |
|---|---|---|
| Google Search Console (both sites) | Real impressions, position and clicks, 2026-04-21 to 2026-10-20 | Only covers queries a site already appears for |
| Google autocomplete | 732 phrases from 15 seed queries (India and US) | Discovery only, no volume |
| Bing Webmaster `GetKeyword` API | Real Bing search counts, 6 months, India and US | Bing understates heavily: for `whatsapp business api` Google India was about 47 times Bing India. Use it to rank keywords against each other, not as absolute volume |
| Semrush free (Keyword Overview) | Monthly Google volume, keyword difficulty (KD), intent, CPC | 10 searches a day; KD is per country database |

Google Keyword Planner was tried and dropped: it will not open without a
billing method.

Bing API note: for Indian searchers, query `country=in` with
`language=en-US`. `en-IN` returns almost nothing, because Indian Bing users
run English (US) settings.

## streamerOS findings

### What Search Console already shows (6 months to 2026-10-20)

Property total: 1,717 impressions, 23 clicks, average position 9.4. The OBS
how-to posts carry it, and they sit at positions 7 to 10, where almost nobody
clicks:

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| /blog/obs-psycho-visual-tuning-explained | 472 | 2 | 8.0 |
| /blog/obs-encoding-overloaded-fix | 269 | 2 | 9.9 |
| /blog/obs-cpu-usage-preset-explained | 181 | 0 | 7.8 |
| /blog/auto-switch-obs-scenes-guide | 136 | 3 | 9.5 |
| /blog/best-obs-settings-for-low-cpu-streaming | 131 | 0 | 8.6 |
| /blog/obs-websocket-setup-guide | 83 | 0 | 10.6 |

Searchers phrase several of these as a yes/no question: "adaptive
quantization obs on or off" (45 impressions), "look ahead on or off".

All six of these posts were reworked on 2026-10-22 and 2026-10-23 (titles,
answer-first openings), after the data window closed. **Do not rewrite them
again yet.** Re-check Search Console around 2026-11-13, when Google has had
about three weeks with the new versions.

### Semrush (US database)

| Keyword | Volume US | Global | KD | Intent | Verdict |
|---|---|---|---|---|---|
| obs advanced scene switcher | 390 | 990 | 28 (Easy) | Transactional, navigational | **Write next.** Easiest target found, rising, and the closest match to what the product does |
| twitch chat overlay | 2,400 | 6,800 | 49 (Possible) | Informational | Bigger but harder, and a side topic. Later |

Not yet checked (daily limit): `obs encoding overloaded`, `streamlabs
alternative`, `obs replay buffer`.

### Bing (US, 6 months)

| Keyword | US | India |
|---|---|---|
| obs plugins | 4,064 | 396 |
| streaming software | 3,786 | 481 |
| twitch chat overlay | 3,709 | 43 |
| how to start streaming on twitch | 2,937 | 28 |
| twitch clips | 882 | 14 |
| obs replay buffer | 846 | 13 |
| obs advanced scene switcher | 372 | 16 |
| streamlabs vs obs | 226 | 6 |
| obs websocket | 133 | 9 |

The audience is US-first. Every OBS settings phrase (encoding overloaded,
psycho visual tuning, CPU preset, look ahead) returned 0 on Bing, while Google
gives those same pages hundreds of impressions. Long phrases are below Bing's
reporting floor; they are not zero on Google.

### Decision

1. New post: an Advanced Scene Switcher guide. It goes deeper than the
   section in `auto-switch-obs-scenes-guide` (macro recipes, a manual override,
   fixing "not switching") and ends on the one trigger the plugin cannot
   handle on its own: chat spikes. The two posts link to each other so they do
   not compete. Current results are a 2019 blog, OBS forum threads from old
   plugin versions and thin guides.
2. Leave the six reworked posts alone until the 2026-11-13 check.
3. Finish the three remaining Semrush checks.

## Portfolio findings (summary)

The portfolio's 31 articles got 18 impressions and 0 clicks in six months,
all on narrow Rust and Tauri posts. Broad opinion posts got none. Narrow
posts rank; broad ones do not.

Freelancing-basics and pricing phrases (`freelance developer rates`, `hire
freelance full stack developer`, `cost to build web app`, every "cost" and
"price" phrase) returned 0 on Bing. That audience is other freelancers, who
are competitors rather than buyers.

| Keyword | Volume IN | KD | Intent | Verdict |
|---|---|---|---|---|
| whatsapp business api | 14,800 | 60 | Informational | Too hard now (about 77 referring domains needed) |
| whatsapp chatbot | 4,400 | 41 | Informational | Post 1 |
| zoho crm pricing | 4,400 | 38 | Navigational | Post 2: aim for positions 2 to 5 with a 3-year cost angle |
| chatbot development | 260 (2,100 global) | 39 | Commercial | Post 3: the only hiring-intent keyword |
| rag chatbot | below threshold (1,400 global, US 720) | n/a | n/a | Add to the AI chatbot page title for US and EU buyers |

## How results will be judged

| When | streamerOS | Portfolio |
|---|---|---|
| 2 weeks | Reworked posts move from 7–10 towards 3–6 | New posts indexed |
| 6 weeks | Clicks on pages that had impressions and none | Impressions on each target keyword |
| 12 weeks | Pre-registrations from these pages | Better than position 20; if not, change the angle rather than write more of the same |

## Open question

`docs/content-structure.md` says launch is November 2026; the live home page
says February 2027. Settle it before the next post's call to action is
written.
