# Launch copy — February 2027

> **Updated 2026-10-22:** launch moved to February 2027, and a hosted live demo
> is at https://demo.streamerosai.com. Copy below that still says November or
> "next month" needs the date changed before it is sent. Section 6 is new: the
> directory listings and off-site footprint the 2026-10-22 SEO audit found missing.

Drafts for the channels that can actually reach people before launch. SEO
cannot: the domain is DR 0 and sits at position 23, and that is a 2027 asset.
These are the ones that work in eight weeks.

Everything here is written for the audience chosen on 2026-09-09: **technical,
privacy-conscious streamers**. Nothing claims a feature outside the launch build.

> **Updated 2026-09-11:** Shorts Factory, Brand Guard and Creator Memory were
> moved from "v1.1" to launch features (they are in the app's default build).
> The "What it does not do yet" lines below still name them as v1.1 — rewrite
> those before posting. Two of them have launch blockers first: Shorts Factory
> needs FFmpeg bundled in the installer, and Aura Scene overlays need the OBS
> renderer served by the installed app. See docs/session-logs/2026-09-11.md.

---

## 1. Product Hunt

**Name:** streamerOS

**Tagline** (60 char max — this is the whole pitch):
> Local-first stream cockpit. No cloud, 1.8% CPU.

Alternates worth testing:
> OBS automation that never leaves your PC
> Your stream data stays on your machine

**Description** (260 chars):
> streamerOS watches your chat and your game and drives OBS for you — scene
> switches on hype spikes, live sentiment, markers for every clip-worthy moment,
> and a sponsor media kit from your own exports. Entirely on your PC. No account,
> no cloud, 1.8% CPU.

**First comment** — this is what people actually read. Be the builder, not the brand:

> I built this because every streaming tool I tried wanted an account and shipped
> a browser engine with it.
>
> My problem was specific: a streaming PC is already running a game, an encoder
> and OBS. Adding a few hundred megabytes of Electron to draw some meters is a
> tax on the frame rate of the thing viewers came to watch. So streamerOS is
> Rust and Tauri, native, and holds 1.8% CPU under a live 1080p60 game.
>
> The other half is that your chat is your viewers' data. Sentiment and velocity
> are scored on your machine — nothing is uploaded, there is no account, and if
> you unplug the network the automation keeps running.
>
> What it does today: OBS scene switching from game telemetry and chat velocity,
> live sentiment, automatic hype-spike markers exported as CSV, and a sponsor
> media kit generated from your own Twitch/YouTube CSV exports.
>
> What it does not do yet, so nobody is surprised: vertical Shorts export,
> assistant memory across streams, and mic monitoring are v1.1.
>
> 7-day trial, $29 once, not a subscription. Happy to answer anything.

**Timing:** post 12:01am PT, Tuesday–Thursday. Have the demo video ready — PH is
a visual feed and a product with no video loses to one with a mediocre video.

---

## 2. Show HN

HN punishes marketing language and rewards specificity. Lead with the technical
decision, not the product.

**Title:**
> Show HN: A local-first streaming cockpit in Rust that holds 1.8% CPU

**Body:**

> A streamer's PC is the most contested consumer machine there is — a game, an
> encoder, OBS, and a browser full of dashboards, all fighting for the same
> cores. Most companion tools ship as Electron apps, which means a bundled
> browser engine competing with the encoder.
>
> I wrote streamerOS in Rust with Tauri instead. It holds 1.8% CPU under a live
> 1080p60 game. Everything runs on the machine: Twitch IRC and YouTube chat are
> read locally, velocity and sentiment are scored in Rust off the UI thread, and
> scene automation drives OBS over WebSocket v5 with no cloud in the path. Pull
> the network cable and the automation keeps working.
>
> A few decisions that were not obvious going in:
>
> - IPC between the Rust core and the webview is batched MessagePack rather than
>   per-event JSON. Per-event was the first version and it was the wrong call.
> - The local LLM runs on Ollama at 127.0.0.1. Model choice on a gaming PC is
>   constrained by spare VRAM, not by capability, which pushes you to quantised
>   3B models rather than anything impressive.
> - Chat velocity has to be measured against a channel's own baseline. An
>   absolute threshold is meaningless — five messages a second is a riot on one
>   channel and idle on another.
>
> Windows only for now, because the telemetry and OBS integration are
> Windows-specific. 7-day trial, $29 once.
>
> Happy to go into the architecture — the IPC layer and the chat pipeline are
> the parts I would most like to be told I got wrong.

**Notes:** post 8–10am ET on a weekday. Answer every comment for the first four
hours. Do not defend the price; state it and move on.

---

## 3. Reddit

**Read this before posting anything.** Every subreddit here bans promotion, and
being banned from r/Twitch two months before launch costs more than any post
gains. The rule that works: **be useful thirty times, mention the product once,
and only where it genuinely answers the question.**

### The eight weeks before launch

Do not post about streamerOS. Answer questions instead, in the subs where your
buyers already are:

- **r/obs** — encoder settings, dropped frames, WebSocket problems. You have
  genuine depth here; the guides on the site are the proof.
- **r/Twitch**, **r/streaming** — setup and performance questions.
- **r/letsplay**, **r/NewTubers** — earlier-stage, more receptive.

You now have six guides that answer these questions properly. Do not link them
reflexively — answer in the comment itself, and link only when the answer is
genuinely longer than a comment.

### Launch post — r/obs

Title:
> I built a local OBS automation tool in Rust because Electron was eating my frames

Body opens with the problem, not the product. Include the CPU measurement and
the screenshots, say plainly what is not in v1.0, and price it in the post.
Anything that reads like a press release gets removed by the mods and downvoted
by everyone else.

### What not to do

- No posting the same text to five subs on one day. It is the most obvious
  pattern there is and it gets you site-wide filtered.
- No "check out my tool" with a bare link.
- No fake questions from an alt account. It always gets found.

---

## 4. The pre-register list

Ten people as of 2026-09-09. That list is the launch, so email it properly.

**Before launch — one email, roughly two weeks out:**

> Subject: streamerOS ships next month — and your trial is 3 months, not 7 days
>
> You pre-registered, so two things.
>
> First: the build lands in November and you get it the day it ships.
>
> Second, and the reason this email is worth reading: pre-registrants get **three
> months** rather than the seven-day trial. No card, nothing to claim — the key
> arrives with the download.
>
> What ships: OBS scene automation from chat velocity and Super Chats, live sentiment,
> automatic hype-spike markers, and a sponsor media kit built from your own
> exports. All on your machine, no account.
>
> What does not, so there are no surprises: Shorts export, assistant memory and
> mic monitoring are v1.1.

**Launch day:** shortest email you will write. Link, one line on what it does,
the three-month key. Nothing else.

---

## 5. What still blocks all of this

1. **A working checkout.** Both buy links are dead — the Gumroad product 404s
   and the GitHub download URL points at an org that is not yours. Nobody can
   pay today.
2. **Screenshots and a 60–90 second demo video.** Product Hunt and Reddit are
   visual feeds; a desktop cockpit with no picture does not convert.
3. **A delivery mechanism for the three-month key**, which is now promised on
   36 pages.

---

## 6. Directory listings and off-site footprint

The 2026-10-22 audit found **no third-party mention of streamerOS anywhere** —
no directory, no Reddit thread, no video. For queries like "Streamer.bot
alternative" the only pages that rank are directories, so a listing there is
both a link and a ranking. Do these before any pitching; they take minutes.

**Naming rule for every listing:** always "streamerOS — OBS companion app",
lower-case s, capital OS. "StreamOS" is a different product (an overlay pack sold
to the same audience by Nerd or Die); never let a listing drift to that spelling.

### Shared facts (copy from here, keep them identical everywhere)

| Field | Value |
|---|---|
| Name | streamerOS |
| Website | https://streamerosai.com |
| Live demo | https://demo.streamerosai.com (sample data, runs in the browser) |
| Platform | Windows 10 / 11 (64-bit), with OBS Studio 28+ |
| Price | Free 7-day trial, then $29 once. No subscription. |
| Launch | February 2027 (pre-registration open now) |
| Licence | Proprietary, closed source |
| Maker | Yaseen Khatib — https://yaseenkhatib.streamerosai.com/ |
| Categories / tags | OBS, live streaming, stream automation, Twitch, YouTube Live, scene switcher, local AI, privacy |

**One line (≤ 80 chars):**
> Local OBS companion that switches scenes when your chat erupts. No cloud.

**Short (≤ 250 chars):**
> streamerOS is a Windows companion app for OBS Studio. It reads your Twitch or
> YouTube chat on your own PC, switches OBS scenes when chat velocity or a Super
> Chat crosses your threshold, and marks clip-worthy moments. No account, no cloud.

**Long:**
> streamerOS runs next to OBS Studio and takes the jobs you cannot do while
> playing: watching chat, switching scenes and remembering where the good moments
> were.
>
> - **Auto-Hype Director** — a rule editor that switches OBS scenes, plays sounds
>   or saves the replay buffer when chat velocity or a Super Chat amount crosses
>   a threshold you set.
> - **Viral Moments** — timestamps every chat spike while you are live and exports
>   the markers to CSV for your editor.
> - **Live Cockpit** — chat triage, Super Chat totals, top chatters and a local AI
>   read on chat sentiment on one screen.
> - **Local AI Sidekick** — answers from your own stream data using Ollama on your PC.
>
> Everything runs locally: no account, no backend, and chat never leaves your
> machine. Rust core, about 1.8% CPU under a live 1080p60 game. Windows only;
> it reads chat but never posts to it. Free 7-day trial, then $29 once.

**Screenshots to upload:** the PNG originals in `public/screenshots/` —
`dashboard.png`, `clip-library.png`, `viral-moments.png`, `obs-bridge.png`,
`sponsor-crm.png` — not the WebP copies the site serves.

### Where to list, in order

| # | Where | What to do | Notes |
|---|---|---|---|
| 1 | AlternativeTo — alternativeto.net | Add the app, then use "Suggest alternative" on the Streamer.bot, Firebot, Mix It Up and Advanced Scene Switcher pages | Ranks for "Streamer.bot alternative". Mark it Paid, Windows. |
| 2 | SaaSHub — saashub.com | Submit; it auto-builds "vs" pages | Add Streamer.bot, Streamlabs, Lumia Stream as alternatives |
| 3 | SourceForge — sourceforge.net (software directory, not a project) | Add the product listing | The same backend feeds Slashdot's "Top Streamer.bot Alternatives" page |
| 4 | BetaList — betalist.com | Submit as pre-launch | Fits now: a trial plus a public demo |
| 5 | OBS forum — Resources → Tools | One resource page for streamerOS | Rules below — read them first |
| 6 | Product Hunt | Launch day only (February 2027) | Section 1 has the copy |
| 7 | itch.io | Optional: paid desktop tools are accepted; SAMMI distributes there | |

### OBS forum resource — rules that get it rejected if missed

From the forum's resource and IP policy:

- streamerOS is **not a plugin**; it is a standalone app talking over
  obs-websocket. Submit it under **Tools**, not Plugins.
- The description must describe the tool, not advertise it. Use the long copy
  above minus the selling adjectives, and state the price plainly.
- **Disclose AI use** in code or art. Descriptions written mostly by an LLM are
  discouraged — rewrite the copy in your own words before posting.
- **Do not imply affiliation with OBS.** No OBS logo; say "for OBS Studio",
  never "OBS streamerOS".
- Never post builds or links inside other people's discussion threads; the
  resource page is the one place for that.

### GitHub (the streamerOS repo stays private)

The private repo cannot help search, but a **public profile README** can, and it
fixes the empty profile Google currently sees for the builder.

1. Create a public repo named exactly `Yaseenyk` (same as the username).
2. Add this `README.md`:

```markdown
### Yaseen Khatib

I build **[streamerOS](https://streamerosai.com)** — a Windows companion app for
OBS Studio that switches scenes from live chat, marks clip-worthy moments and runs
a local AI sidekick, all on your own PC. [Try the live demo](https://demo.streamerosai.com).

Senior full-stack and AI engineer. Writing: [streamerosai.com/blog](https://streamerosai.com/blog) ·
Portfolio: [yaseenkhatib.streamerosai.com](https://yaseenkhatib.streamerosai.com/)
```

3. Set the profile bio to "Building streamerOS — OBS companion app" and the
   website field to https://streamerosai.com.
4. Optional, high value: a small **public** repo such as an OBS WebSocket v5
   connection tester. It is a real link from GitHub, it fits the "obs websocket
   not connecting" query, and it shows the work behind the guides.

Once the profile exists, set `githubUrl` in `config/site.ts` to
`https://github.com/Yaseenyk` so the Organization `sameAs` picks it up.

### Pitch for inclusion in roundups

Indie-run lists that already feature Streamer.bot, SAMMI or Mix It Up and were
updated in 2026:

| Page | Contact |
|---|---|
| betterstreams.tv/blog/streaming-tool-stack | site contact (indie builder) |
| twoaveragegamers.com/the-complete-ai-tool-stack-for-twitch-streamers-2026/ | contact page |
| streamscheme.com/best-twitch-bots/ | streamscheme.com/contact/ |
| gyre.pro/blog/best-chatbot-to-use-for-streaming | support bot |
| onestream.live/blog/best-obs-plugins-every-streamer-should-use/ | contact page |

Template — short, specific, no attachments:

> Subject: A local-AI entry for your [page title]
>
> Hi [name], I read your [page title] — the [specific section] is the clearest
> comparison of Streamer.bot and Mix It Up I have found.
>
> I build streamerOS, a Windows companion app for OBS that switches scenes from
> chat velocity and Super Chats and runs its AI on the streamer's own PC (Ollama),
> so nothing goes to a cloud. It might fit your [automation / AI] section as the
> local-first option. There is a live demo you can try in the browser:
> https://demo.streamerosai.com
>
> Happy to answer anything, or send a licence if you want to test it. No pressure
> either way.
>
> Yaseen

Send one a day, personalised. A bulk send to all five on one morning is the
pattern editors delete.

### Answering on the OBS forum and Reddit

The guides already answer what people ask there. Answer **in the reply**, link a
guide only when the full answer is longer than a comment, and say you wrote it.
Starting points:

- OBS forum: "Psycho visual tuning and look-ahead options nowhere to be found"
  (thread 131057) — the OBS 31 rename to "Adaptive Quantization" answers it.
  Check the thread is still open before replying; do not revive a dead one.
- New r/obs threads about adaptive quantization, encoding overloaded or
  automatic scene switching. Search inside Reddit; they do not surface in web
  search.
- r/LocalLLaMA: a build write-up on running a local LLM next to a live game
  (GPU budget, model size) is on-topic there and links naturally.
