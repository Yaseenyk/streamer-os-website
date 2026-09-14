# streamerOS Master Knowledge Base

> Authoritative support reference for streamerOS tier-1 customer support. The
> website support chat answers only from this document, so every statement here
> must be true of the launch build. Rewritten 2026-09-11 against the product
> repository (API specification, feature code and licence gates).
>
> After editing, re-ingest it into the support index (`api/scripts/ingest.ts`) —
> the chat widget reads the index, not this file.

---

## Product Philosophy and Architecture

### What streamerOS Is and Who streamerOS Is For

streamerOS is a desktop cockpit for live streamers on YouTube Live and Twitch.
It runs natively on Windows 10 and 11 and sits alongside OBS Studio: it reads
your chat, measures what your audience is doing, drives OBS for you, and helps
with the work around the stream — clips, Shorts, upload titles, sponsors. It is
built in Rust (on Tauri) so it can run next to a game and OBS on one machine.
streamerOS does not replace OBS Studio; you still stream with OBS.

### How the Zero-Cloud and Local-First Architecture Works

streamerOS is local-first. Chat, microphone audio, stream history, automation
rules, overlays, sponsor records and AI memories are processed and stored on the
user's own computer. streamerOS has no account, no login and no backend server
for user data, and the application contains no analytics SDK, telemetry or crash
reporter.

The app only makes network connections for features the user switches on:

- **Twitch chat** — an anonymous, read-only connection to Twitch chat when the
  user monitors a Twitch channel. No credentials are sent or stored.
- **YouTube chat** — read locally from the YouTube page open in the user's own
  browser, using Windows UI Automation. The app itself does not connect to
  YouTube for chat and needs no YouTube API key or Google sign-in.
- **YouTube Data API** — only if the user adds their own API key and channel ID;
  used to fetch the channel's public statistics such as subscriber count. The key
  is stored in Windows Credential Manager.
- **AI model downloads** — Ollama downloads local AI models when the user
  installs one; Brand Guard downloads its speech model (about 140 MB) from Hugging
  Face once, when the user clicks download.
- **Google Fonts** — only when an Aura Scene overlay uses a Google font.
- **Discord webhooks** — only when an automation rule includes a Discord action;
  it posts the user's own message to the user's own webhook.
- **Update checks** — only if the user opts in.

Licensing makes no network connection (see licensing below).

### Where streamerOS Stores Data

Data lives in the streamerOS data folder under the user's Windows AppData
folder, plus a workspace folder the user chooses (for example
`Documents\streamerOS`). The workspace holds exports, Shorts, chat archive
exports and opt-in Brand Guard audit recordings. To delete everything, delete
those folders.

### streamerOS Performance Footprint

streamerOS is engineered to hold approximately **1.8% CPU** under a live 1080p60
game. That figure is for the core app — chat monitoring, automation and the
cockpit. Two features the user starts deliberately use much more CPU: Brand Guard
speech recognition (while the user is speaking) and Shorts Factory video
encoding, which is meant to run after the stream. Local AI features (AI Sidekick,
Sentiment Horizon, Viral Engine) run on the GPU through Ollama.

---

## Pricing and Licensing

### How the Trial and Licence Work

- **Free trial:** 7 days with every feature and no credit card. People who
  pre-registered before the November 2026 launch get 3 months.
- **Licence:** $29, paid once. Not a subscription; it does not expire or renew.
  It includes every feature, including Shorts Factory, Brand Guard and Creator
  Memory.

### What Happens When the Trial Ends

Features that act during a live stream lock until a licence key is entered: OBS
control and the Auto-Hype Director, the live chat monitors (chat velocity,
sentiment, keywords), Aura overlays, Shorts Factory, Brand Guard, the Viral
Engine, AI actions and insights, Sponsor CRM changes and media kit export.

The user's own data is never locked or deleted. These stay available for free:
settings, imported analytics and the dashboard metrics, the Clip Library list,
the Chat Archive, the most recent stream's report, and AI Sidekick chat up to
**10 messages per day**. Nothing is charged automatically — no card is on file.

### How Licence Keys Are Issued and Verified

streamerOS licence keys are verified **offline** against a signature built into
the app — there is no activation server, account or login, and the app never
needs the internet to stay licensed.

Each key is made for one computer:

1. Open streamerOS and go to the activation screen. It shows this PC's
   **Installation ID** (for example `A1B2-C3D4-E5F6-7890`). The ID is an
   anonymous code derived on the machine and is safe to share.
2. Send the Installation ID with the order.
3. Enter the key you receive. It activates on that PC only, and the app shows
   "Licensed to" with the name on the order.

---

## System Requirements and Setup

### System Requirements

| Requirement | Specification |
| --- | --- |
| Operating system | Windows 10 or Windows 11, 64-bit |
| Memory | 16 GB RAM recommended |
| CPU | 8-core processor recommended |
| GPU | RTX 3060-class GPU recommended for the local AI features |
| Other software | OBS Studio 28 or later; Ollama for the local AI features |

streamerOS does not support macOS or Linux. Without a suitable GPU or Ollama,
everything except the local AI features (AI Sidekick, Sentiment Horizon, Viral
Engine) still works.

### Installing streamerOS

The Windows installer sets streamerOS up for the current user account, so it
does not need an administrator prompt.

### How to Connect streamerOS to OBS Studio

streamerOS controls OBS through **OBS WebSocket v5**, which is built into OBS
Studio 28 and later.

1. In OBS Studio, open **Tools → WebSocket Server Settings** and tick **Enable
   WebSocket server**. The default port is **4455**.
2. If authentication is off, open streamerOS — it finds OBS on the same PC
   automatically and connects.
3. If authentication is on, click **Show Connect Info** in OBS, copy the
   password, and enter it in streamerOS's **OBS Bridge** connection form with
   host `127.0.0.1` and the port from OBS.
4. When connected, your OBS scenes appear in the OBS Bridge stream deck and the
   cockpit's scene switcher.

streamerOS only connects to OBS on the same computer (`127.0.0.1`). The OBS
password is kept in memory while the app runs and is not written to disk.

### Setting Up the Local AI

1. Install Ollama from ollama.com.
2. In streamerOS, use the **AI Engine** toggle to start the local engine, and
   choose or download models in Settings. The defaults are `llama3.2` for chat
   and `nomic-embed-text` for memory.

---

## Features

### Live Cockpit (Dashboard)

The dashboard is the home screen during a stream. It shows:

- **Command Center** — one-click OBS connection and YouTube chat status.
- **Chat Triage** — one chat feed with All, Viewers, Members and Super Chats
  tabs and live counts. Regular viewer messages pass a local moderation filter
  that hides toxic and spam lines; member and Super Chat messages are always
  shown. It follows the newest message and pauses when you scroll up.
- **Stream Revenue** — every Super Chat is recorded to a local ledger. It shows
  the exact total per currency and an approximate combined total in your chosen
  display currency, converted with exchange rates you can edit in Settings
  (defaults such as 1 USD ≈ ₹83; there is no live exchange-rate lookup).
- **Top Chatters** — the most active chatters this stream and the number of
  distinct chatters.
- **Sentiment Horizon** — see below.
- **OBS Scene Switcher** — your scenes with the live one highlighted; one click
  switches.

### Sentiment Horizon

Sentiment Horizon uses local AI through Ollama to score chat mood from −1
(toxic) to +1 (hype), with a short label such as "🔥 HYPE". It classifies chat in
batches every couple of seconds and updates the display once a second, holding
the last reading between classifications. It understands Hinglish. In very fast
chat it scores an evenly spread sample of up to 40 messages per window.

**Honest fallback:** if Ollama is offline, Sentiment Horizon shows an "Ollama
offline" banner and a neutral reading instead of a made-up score, and everything
else keeps running. It resumes automatically when Ollama is back.

### Viral Moments

Viral Moments measures chat velocity (messages per second) against the current
stream's own baseline and marks every hype spike with a timestamp while you are
live. Markers export to CSV and feed Shorts Factory.

### Chat Archive

Every chat line from YouTube or Twitch is saved locally, grouped by stream.
Users can search message text and usernames, filter by message type, label a
stream, redact a single message, delete a stream, and export a stream as a
compressed JSON file into the workspace (and import it back). The AI Sidekick
can search the archive. The archive stays available after the trial.

### OBS Bridge

Connects to OBS over WebSocket v5 on the same PC, syncs your scenes into a stream
deck, and switches the program scene. It keeps the live-scene highlight in sync
even when you change scenes directly in OBS.

### Aura Studio

A gallery of ready-made OBS overlays that react to the stream's vibe — Calm,
Hype, Combat or Tense — derived from the foreground game and chat velocity, with
an adjustable hype threshold. streamerOS serves the active overlay from the
user's PC; add it to OBS as a Browser Source at the local address the app shows.
Switching designs in the gallery changes what that source shows.

### Aura Scene Builder

A drag-and-drop overlay editor on a 1920×1080 transparent canvas with text
(including Google Fonts), images (PNG, JPG, GIF, WEBP, BMP, SVG) and video (WEBM,
MP4). Imported assets are copied into the app's local folder. The AI Sidekick can
generate a scene on request.

### Auto-Hype Director

A visual node editor for stream automation:

- **Trigger nodes** compare **chat velocity** or **Super Chat** amount against a
  threshold you set (above or below).
- **Logic nodes** combine triggers with **AND** or **OR**.
- **Action nodes** can switch an OBS scene, play a sound clip from the clips
  folder, set the Aura overlay's mood, mute or unmute an OBS audio input, save the
  OBS replay buffer, or post a message to a Discord webhook.

Scene switches fire once when a condition becomes true rather than repeatedly,
and sounds have a cooldown so they do not stack. Rules are saved on the PC.

### Clip Library

Scans the Videos folder (or a folder set in settings) for .mp4 and .mkv
recordings and ranks each by a hype score built from what chat did during the
recording: peak chat velocity (50%), Super Chats and automation events (30%) and
sentiment intensity (20%). Recordings with no matching stream data score 0. A
recording can be staged — copied, never moved — into the Shorts workspace.

### Shorts Factory

Crops a 16:9 stream recording to a vertical 9:16 clip and encodes an .mp4 into
the workspace's `shorts` folder, using FFmpeg on the PC. Pick a VOD, use hype
markers on the timeline, choose the window (60 seconds by default), and watch the
progress bar; encoding can be cancelled and the partial file is removed. The crop
is centred and needs a landscape source. streamerOS does not upload or post
Shorts anywhere.

### AI Sidekick

A local AI assistant powered by Ollama on the user's PC — no cloud model, no
per-message cost. It answers from live stream stats and the user's **Streamer
Bible** (a JSON file in the workspace describing persona, current game,
moderation rules and OBS scene names, reloaded automatically when edited). It
keeps answers short — one or two sentences — because the streamer is live. It
currently answers in English.

When asked, it can switch the OBS scene, read recent chat, search the Chat
Archive, look up the current stream's Super Chat revenue, recall creator memory,
and design an Aura Scene overlay. If OBS is not connected, it says so.

It can also turn imported YouTube or Twitch analytics into 2–4 insight cards
(growth, brand, content) when at least 7 days of data are available.

### Creator Memory

Saying "remember that…", "note that…" or "keep in mind…" to the AI Sidekick
stores the fact in a private vector database on the PC. Later questions
automatically pull in relevant memories.

### Viral Engine

Writes an upload package with local AI: three YouTube titles (70 characters or
fewer) and 6–10 hashtags. **Live Sync** mode uses the detected game and up to 40
recent chat lines; **Describe Video** mode uses a description the user types. The
Thumbnail Lab turns a chosen title into a three-point thumbnail plan (subject
placement, contrasting colours, a short text hook). "Trending" means what the
user's own audience is reacting to — the Viral Engine has no platform-wide trends
data.

### Brand Guard

Listens to the microphone the user selects, transcribes speech locally with
Whisper, and alerts on screen when a banned term (for example a competitor
brand) is spoken, showing the term with up to 5 words of context. Audio is
processed in memory; it is saved only if the user turns on audit recording for
that session, in which case the clip and transcript snippet go to the workspace's
`audit` folder. The speech model is English-focused.

### Sponsor CRM

A local pipeline board for sponsor leads with prospect, contacted, negotiating,
won and lost stages, deal value and notes, stored in a database on the PC.

### Media Kit Generator

Imports YouTube Studio and Twitch analytics CSV exports (including audience
demographics) and builds a sponsor-ready PDF media kit, saved on the PC.

---

## Troubleshooting and FAQs

### Q: The "Ollama offline" banner keeps showing and Sentiment Horizon reads neutral. How do I fix this?

A: streamerOS cannot reach Ollama, so the honest fallback has engaged.

1. Confirm Ollama is installed. Use the **AI Engine** toggle in streamerOS to
   start it.
2. Confirm a chat model has finished downloading (Settings).
3. Local AI runs best on an RTX 3060-class GPU; on weaker hardware responses can
   be slow enough to time out.
4. When Ollama is reachable again, readings resume automatically.

### Q: OBS WebSocket is refusing the connection. How do I fix this?

1. In OBS Studio, open **Tools → WebSocket Server Settings** and confirm
   **Enable WebSocket server** is ticked.
2. Confirm OBS Studio is version 28 or later.
3. If authentication is enabled, enter the exact password from **Show Connect
   Info** in the OBS Bridge connection form.
4. Use host `127.0.0.1` and the port shown in OBS (default 4455). streamerOS only
   connects to OBS on the same PC.
5. If a Windows firewall prompt appears, allow local communication.

### Q: My CPU usage is higher than expected. What should I check?

1. Brand Guard speech recognition uses significant CPU while you are speaking —
   switch it on only for sponsored segments.
2. Shorts Factory encoding uses a lot of CPU — run it after the stream.
3. Check OBS's own encoder settings (for example x264 on a slow preset), which
   are separate from streamerOS.
4. Local AI inference loads the GPU; on underpowered hardware it can slow the
   system.

### Q: streamerOS rejected my licence key. What do I do?

1. Paste the key exactly, with no extra spaces.
2. If the message says the key was issued for a different computer, the key was
   made for another Installation ID. This happens after reinstalling Windows or
   replacing the motherboard. Send your new Installation ID (shown on the
   activation screen) with your order details to support for a replacement key.
3. Keys are verified offline, so no internet connection is needed to activate.

### Q: YouTube chat is not showing up. What should I check?

1. Make sure your live stream's chat is open in your browser.
2. Use the Go Live / Attach YouTube Chat flow in streamerOS to pick that browser
   window.
3. Very fast chats (20 or more messages a second) can outrun the browser reader,
   so some messages may be missed; chat velocity and hype detection still work.

### Q: The Clip Library shows no recordings. What should I check?

1. Confirm your recordings are .mp4 or .mkv files in your Windows Videos folder
   (or the folder set in streamerOS).
2. If the Clip Library shows a message that Windows blocked access through a
   folder junction, your Videos folder was relocated with a junction created
   without administrator rights. Recreate the junction from an administrator
   command prompt, or move the folder with Properties → Location.

### Q: Does streamerOS upload my chat, audio or data to the cloud?

A: No. streamerOS has no account and no server for user data; chat, audio and
stream history are processed and stored on your PC. The only connections the app
makes are for features you switch on — reading Twitch chat, your own YouTube
channel statistics if you add an API key, AI and speech model downloads, Google
Fonts in an overlay that uses one, a Discord webhook you configure, and opt-in
update checks.

### Q: Does streamerOS understand Hindi or Hinglish?

A: Sentiment Horizon reads Hinglish chat — Hindi written in Roman script, mixed
with English — so "Bhai sahi hai" scores positive. The AI Sidekick currently
replies in English, and Brand Guard's speech model is English-focused.
