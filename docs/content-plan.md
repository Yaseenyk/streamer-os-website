# Content plan — 2 posts a week, one keyword each

Twelve weeks, 24 posts, starting 20 October 2026 and landing before the
February 2027 launch. One primary keyword per post, no exceptions.

## Rules

1. **One primary keyword per post.** It goes in the title, the H1, the first
   100 words, and one H2. Nowhere else deliberately.
2. **Answer the query in the first 100 words.** Not after an introduction about
   how streaming has changed in recent years.
3. **Check the existing 40 posts before writing.** If a post already targets
   the keyword, update that post instead of writing a second one. Two posts
   chasing one keyword means neither ranks.
4. **The product appears once, near the end**, except in comparison posts where
   it is the subject. A post that is an advert gets no links and no citations.
5. **Name the honest limit.** Windows only, reads chat but never posts, $29
   after a trial. Every post that recommends streamerOS says what it is not.
6. **Tag it for the right CTA.** `lib/blog-cta.ts` matches tags to the closing
   pitch — use tags from an existing cluster or the generic CTA appears.

## Keywords we do NOT target

- **"streameros"** — the homepage already owns this. A blog post would compete
  with it. Brand queries are won by domain age and off-site mentions, not by
  writing your own name more often.
- **"OBS alternative" / "OBS replacement"** — streamerOS requires OBS. Those
  searchers want to replace it, bounce immediately, and the phrase teaches AI
  assistants to file you as a broadcaster competing with OBS. Use **"OBS
  companion app"** instead.
- **"free stream automation"** — the product costs $29. Ranking for "free"
  buys bounces and refund requests.
- **"best streaming software"** — head term, owned by Streamlabs, OBS and
  publishers with ten years of authority. Nothing to win here for two years.

---

## Weeks 1–4 — Commercial intent (write these first)

People searching these have a problem and a wallet. Lowest volume, highest
conversion, and the easiest to rank for because they are specific.

| # | Primary keyword | Working title | Angle & internal links |
|---|---|---|---|
| 1 | streamer.bot alternative | A Streamer.bot Alternative for People Who Don't Want to Build the Automation | Streamer.bot is free and better at custom automation — say so in the first paragraph. For whom an assembled cockpit is worth $29. → `/vs/streamer-bot` |
| 2 | obs companion app | What an OBS Companion App Actually Is (and What It Isn't) | Defines the category. The post that teaches search engines and AI which box streamerOS belongs in. → `/features`, `/vs` |
| 3 | sammi alternative | SAMMI vs the Assembled Approach to Stream Automation | Same honesty as #1. SAMMI's no-code deck building is genuinely good. → `/vs/sammi` |
| 4 | best obs companion apps | The OBS Companion Apps Worth Knowing in 2027 | A real listicle: Streamer.bot, SAMMI, Mix It Up, Touch Portal, streamerOS last. Listicles get cited by AI more than any other format. |
| 5 | twitch chat sentiment analysis | How to Run Chat Sentiment Analysis on Twitch Without a Cloud Service | Technical, local models, what sentiment can and cannot tell you. → `/features/live-cockpit` |
| 6 | obs automation without plugins | Automating OBS Without Installing a Single Plugin | OBS WebSocket v5 as the supported path; why plugins break on OBS updates. → `/features/obs-bridge` |
| 7 | super chat revenue tracking | How to Track What a YouTube Stream Actually Earned | Per-currency totals, why the dashboard is not enough. → `/for/youtube-live` |
| 8 | mix it up alternative | Mix It Up and the Trade Between a Bot and a Cockpit | Mix It Up is free and open source — say it plainly. Different job. |

## Weeks 5–8 — Problem-solution

Someone with a specific pain, one step before looking for a tool.

| # | Primary keyword | Working title | Angle & internal links |
|---|---|---|---|
| 9 | obs scene switching automation | Stop Reaching for Hotkeys: Automatic OBS Scene Switching | Check overlap with the two existing scene-switch posts; may be an update instead. → `/features/auto-hype` |
| 10 | streaming alone without mods | Streaming Without Moderators: What You Can Automate and What You Can't | States plainly that streamerOS cannot moderate. → `/for/solo-streamers` |
| 11 | obs replay buffer automatic | Saving the Replay Buffer Automatically When Chat Reacts | Practical OBS config plus automation. → `/features/viral-moments` |
| 12 | vtuber obs setup | A VTuber's OBS Setup, and the Part Your Tracking Software Doesn't Do | No avatar tracking in streamerOS — lead with it. → `/for/vtubers` |
| 13 | local ai for streamers | What Local AI Can Actually Do for a Streamer in 2027 | Ollama, model sizes, GPU requirements, honest limits. → `/features/ai-sidekick` |
| 14 | low end pc streaming setup | A Streaming Setup That Leaves the Game Alone | → `/for/low-end-pc`; check overlap with `how-to-stream-on-a-low-end-pc` |
| 15 | hinglish chat moderation | Reading Hinglish Chat: Why Most Sentiment Tools Get It Wrong | Almost no competition, and it is a genuine differentiator. → `/for/indian-streamers` |
| 16 | twitch clip automation | Clipping the Moment Without Breaking Character | → `/features/clip-library` |

## Weeks 9–12 — Informational

Top of funnel. These earn links and feed the commercial posts internal link
equity. Lower conversion — do not write these first.

| # | Primary keyword | Working title |
|---|---|---|
| 17 | obs websocket v5 | OBS WebSocket v5: What Changed and Why It Matters |
| 18 | how much cpu should obs use | How Much CPU Should OBS Use? A Reference |
| 19 | stream deck software alternative | Software Stream Decks: The Honest Comparison |
| 20 | chat velocity meaning | Chat Velocity: Measuring When Your Stream Is Working |
| 21 | obs dropped frames fix | Why OBS Drops Frames, in Order of Likelihood |
| 22 | youtube live vs twitch 2027 | Twitch or YouTube in 2027: The Numbers That Matter |
| 23 | streaming data privacy | What Your Stream Tools Know About You |
| 24 | first sponsorship as small streamer | Getting a First Sponsor Below 1,000 Followers |

Several of these overlap existing posts — check `content/blog/` first and
update rather than duplicate.

---

## Before writing anything: get the data

The `gsc data/` folder has coverage exports only. Export **Search Console →
Performance → Queries → last 3 months** as CSV and drop it in there.

That changes the order of this plan. Any keyword already showing impressions at
position 8–25 is a faster win than anything on this list, because the page
exists and Google already shows it — it just needs the post that properly
answers it.

## Measuring, so this does not become busywork

Check fortnightly:

- **Indexed?** If a post is not indexed three weeks after publishing, request
  indexing. If several are not, stop writing and fix the indexing problem —
  more posts on a site Google is not crawling is wasted effort.
- **Impressions after 6 weeks.** Zero means the keyword was too competitive or
  the post does not answer it. Rewrite or drop the topic; do not write a
  second post on it.
- **Position 11–20?** That is the best place to spend an hour: improve that
  post rather than write a new one. Page two to page one is worth more than
  another post starting at nothing.

Two a week is sustainable only if the posts are genuinely useful. Eight thin
posts a month will do less than two good ones, and the thin ones now carry a
risk they did not two years ago — scaled low-value content is a spam signal,
and this domain is three months old with no authority to spend.
