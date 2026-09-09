# Launch copy — November 2026

Drafts for the channels that can actually reach people before launch. SEO
cannot: the domain is DR 0 and sits at position 23, and that is a 2027 asset.
These are the ones that work in eight weeks.

Everything here is written for the audience chosen on 2026-09-09: **technical,
privacy-conscious streamers**. Nothing claims a feature outside v1.0 —
`obs-bridge` + `chat-sentiment` + `pillar-c-twitch`, plus the media kit and Aura.

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
> What ships: OBS scene automation from chat and game telemetry, live sentiment,
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
