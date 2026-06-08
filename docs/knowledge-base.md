# streamerOS Master Knowledge Base

> Authoritative support reference for streamerOS tier-1 customer support.
> streamerOS is a Rust-powered, ultra-lightweight desktop "cockpit" for Twitch
> and YouTube streamers. This document is the canonical source for product
> behavior, system requirements, feature operation, and troubleshooting.

---

## Product Philosophy and Architecture

### What streamerOS Is and Who streamerOS Is For

streamerOS is a desktop control application for live streamers on Twitch and
YouTube. streamerOS runs natively on Windows and acts as an automation and
telemetry layer between a streamer's chat, the streamer's audio, and OBS Studio.
streamerOS is built in Rust for low resource consumption and is designed to run
alongside a game and OBS on a single machine without degrading stream
performance.

### How the Zero-Cloud and Local-First Architecture Works

streamerOS uses a "Zero-Cloud" and "Local-First" architecture. This means that
all data streamerOS processes stays on the user's local machine and is written
only to the user's local SSD. streamerOS does not upload chat logs, audio,
sentiment data, or workflow configurations to any remote server. streamerOS does
not require a user account, a login, or an internet-connected backend to
function.

Key properties of the Zero-Cloud architecture:

- streamerOS processes chat ingestion, sentiment analysis, and automation logic
  entirely on the local device.
- streamerOS stores all configuration, workflows, and cached models on the
  user's local SSD.
- streamerOS never transmits chat content or audio to streamerOS servers,
  because streamerOS operates no such servers for user data.
- The only outbound network connections streamerOS makes are: connecting to the
  public Twitch/YouTube chat services the user already streams to, an optional
  opt-in update check, and a one-time download of local AI models when the user
  enables Local AI features.

### Why the Local-First Design Matters for Privacy

Because streamerOS keeps all data on the local SSD, a streamer's chat history,
sentiment scores, and automation rules are private by default. There is no web
dashboard that exposes this data, and there is no server-side copy of a
streamer's activity. If a user wants to delete their data, the user deletes the
local streamerOS data directory.

### streamerOS Performance Footprint and Resource Claims

streamerOS is engineered to be lightweight enough to run during a live 1080p60
gameplay stream. streamerOS holds a measured footprint of approximately **1.8%
CPU** under a live 1080p60 game capture scenario. This low CPU footprint is a
core design goal because streamerOS must not compete with the game or the
encoder for CPU time.

### How the Serialization Adapter Achieves 94% Payload Reduction

streamerOS uses a component called the **Serialization Adapter** to move
telemetry between streamerOS subsystems and OBS Studio efficiently. The
Serialization Adapter compacts the data payloads streamerOS sends so that
streamerOS transmits approximately **94% less payload** than an unoptimized
JSON-over-WebSocket approach would transmit. This 94% payload reduction lowers
the per-message overhead of streamerOS automation, which contributes directly to
the low CPU footprint of streamerOS during high-velocity chat events.

### How the streamerOS Licensing Model Works

streamerOS uses a **one-time purchase** licensing model. A user pays once for a
streamerOS license and owns that version of streamerOS without a recurring
subscription. streamerOS validates the license key on **first launch**. After
the license key is validated, streamerOS does not require a web dashboard,
ongoing login, or continuous internet connection to keep running. The one-time
purchase model is consistent with the Zero-Cloud philosophy of streamerOS:
because license validation happens once on first launch, streamerOS does not
depend on an account portal or cloud session to operate day to day.

---

## System Requirements and Setup

### Minimum and Recommended System Requirements for streamerOS

streamerOS requires the following hardware and operating system:

| Requirement | Specification |
| --- | --- |
| Operating System | Windows 10 or Windows 11 (64-bit only) |
| Memory (RAM) | 16 GB |
| CPU | 8-core processor |
| GPU (for Local AI features) | RTX 3060-class GPU or better |

streamerOS supports only 64-bit Windows 10 and Windows 11. streamerOS does not
currently support macOS or Linux.

### Why streamerOS Requires an RTX 3060-Class GPU for Local AI

streamerOS requires an **RTX 3060-class GPU specifically** to run the Local AI
features of streamerOS, which include Sentiment Horizon (real-time sentiment
analysis) powered by Ollama. The RTX 3060-class GPU requirement applies only to
the Local AI features of streamerOS. A streamer who does not use the Local AI
features of streamerOS can run the rest of streamerOS without an RTX 3060-class
GPU, but the Sentiment Horizon feature and other Ollama-backed features will be
unavailable without an RTX 3060-class GPU.

### How to Connect streamerOS to OBS Studio via OBS WebSocket v5

streamerOS controls OBS Studio through the **OBS WebSocket v5** protocol, which
is built into modern versions of OBS Studio. To connect streamerOS to OBS
Studio, follow these steps:

1. Open OBS Studio and confirm OBS Studio is version 28 or later, because OBS
   WebSocket v5 is bundled with OBS Studio 28 and later.
2. In OBS Studio, open the **Tools** menu and select **WebSocket Server
   Settings**.
3. In the WebSocket Server Settings dialog, enable the checkbox labeled **Enable
   WebSocket server**.
4. Note the **Server Port** value. The OBS WebSocket v5 default port is **4455**.
5. If **Enable Authentication** is checked in OBS Studio, click **Show Connect
   Info** and copy the **Server Password**.
6. Open streamerOS and go to the OBS connection settings inside streamerOS.
7. In streamerOS, enter the OBS host (use `localhost` or `127.0.0.1` when OBS
   Studio runs on the same machine), enter the port (`4455` by default), and
   enter the server password if OBS authentication is enabled.
8. Click **Connect** in streamerOS. When the connection succeeds, streamerOS
   displays a connected status for OBS and streamerOS can then control OBS scenes
   and sources.

---

## Core Features

### How the Auto-Hype Director Builds Node-Based Automation Workflows

The **Auto-Hype Director** is the visual automation engine of streamerOS. The
Auto-Hype Director lets a user build **node-based workflows** that trigger OBS
macros automatically based on live stream telemetry, most commonly **chat
velocity**. Chat velocity is the rate at which chat messages arrive, measured by
streamerOS in real time.

A user builds an Auto-Hype Director workflow by connecting nodes on a visual
canvas:

- **Trigger nodes** watch a telemetry signal, such as chat velocity crossing a
  threshold (for example, messages-per-second exceeding a defined value).
- **Condition nodes** filter when a workflow should fire, such as only during a
  specific scene or time window.
- **Action nodes** execute an OBS macro through OBS WebSocket v5, such as
  switching to a "Hype" scene, toggling a source, or playing a stinger.

When the Auto-Hype Director detects that incoming telemetry matches a trigger
node, the Auto-Hype Director runs the connected action nodes, which fire the OBS
macros. This lets streamerOS automatically switch OBS scenes or activate effects
the moment chat activity peaks, without manual intervention from the streamer.

### How Sentiment Horizon Analyzes Chat Sentiment in Real Time

**Sentiment Horizon** is the real-time chat sentiment analysis feature of
streamerOS. Sentiment Horizon uses **local AI through Ollama** to analyze the
emotional tone of incoming chat messages as the messages arrive. Because
Sentiment Horizon runs on local AI through Ollama, Sentiment Horizon processes
chat sentiment entirely on the user's machine and never sends chat content to a
cloud service, which is consistent with the Zero-Cloud architecture of
streamerOS.

Sentiment Horizon produces a continuous sentiment reading that streamerOS can
display to the streamer and can feed into Auto-Hype Director workflows as a
trigger signal. A streamer can therefore build automation that reacts not only
to how fast chat is moving (chat velocity) but also to how positive or negative
chat sentiment is (Sentiment Horizon).

Sentiment Horizon requires the Local AI features of streamerOS to be enabled,
which requires Ollama and an RTX 3060-class GPU.

### How the Honest UI Fallback Handles Ollama Going Offline

streamerOS includes a behavior called the **Honest UI Fallback** that governs
what happens when Ollama goes offline. Local AI in streamerOS depends on Ollama,
and Ollama can become unavailable (for example, if the Ollama service is stopped,
crashes, or has not finished loading a model). When Ollama goes offline,
streamerOS does **not** crash the stream and does **not** freeze the interface.

Instead, the Honest UI Fallback causes streamerOS to gracefully fall back to a
**0.0 NEUTRAL** sentiment state. The Honest UI Fallback has these properties:

- streamerOS reports a sentiment value of **0.0** with a **NEUTRAL** label while
  Ollama is offline, rather than displaying a stale or fabricated reading.
- streamerOS keeps the rest of the application running normally, including OBS
  control and any Auto-Hype Director workflows that do not depend on sentiment.
- streamerOS surfaces an honest, visible indicator (an "Ollama offline" banner)
  so the streamer knows sentiment analysis is currently unavailable rather than
  silently wrong.
- When Ollama comes back online, streamerOS resumes live sentiment readings
  automatically.

The Honest UI Fallback is named "honest" because streamerOS explicitly tells the
user that sentiment is unavailable and reports a neutral 0.0 value, instead of
hiding the failure or guessing a sentiment score.

---

## Troubleshooting and FAQs

### Q: The "Ollama offline" banner keeps showing and Sentiment Horizon reads 0.0 NEUTRAL. How do I fix this?

A: The "Ollama offline" banner and a 0.0 NEUTRAL reading mean streamerOS cannot
reach Ollama, so the Honest UI Fallback has engaged. To restore Sentiment
Horizon:

1. Confirm Ollama is installed and the Ollama service is running on the machine.
2. Confirm the required local AI model has finished downloading and loading.
   Sentiment Horizon stays in the 0.0 NEUTRAL fallback until a model is ready.
3. Confirm the machine has an RTX 3060-class GPU, because streamerOS requires an
   RTX 3060-class GPU for Local AI features.
4. Restart Ollama, then confirm streamerOS reconnects. When Ollama comes back
   online, streamerOS resumes live sentiment readings automatically and the
   banner clears.

This is expected, non-destructive behavior: streamerOS keeps the stream running
and only reports neutral sentiment while Ollama is unavailable.

### Q: OBS WebSocket is refusing the connection from streamerOS. How do I fix this?

A: An OBS WebSocket connection refusal usually means OBS Studio is not listening,
the port or password is wrong, or a firewall is blocking the connection. To fix:

1. In OBS Studio, open **Tools → WebSocket Server Settings** and confirm
   **Enable WebSocket server** is checked.
2. Confirm the port in streamerOS matches the OBS **Server Port** (the OBS
   WebSocket v5 default is **4455**).
3. If OBS authentication is enabled, copy the password from **Show Connect Info**
   in OBS Studio and paste the exact password into streamerOS.
4. Confirm OBS Studio is version 28 or later, because streamerOS requires OBS
   WebSocket v5, which ships with OBS Studio 28 and later.
5. When OBS Studio and streamerOS run on the same machine, use `localhost` or
   `127.0.0.1` as the host. If a firewall prompt appears, allow OBS Studio and
   streamerOS to communicate locally.

### Q: My CPU is spiking while streamerOS is running. How do I reduce CPU usage?

A: streamerOS is designed to hold an approximately 1.8% CPU footprint under a
live 1080p60 game, so a CPU spike usually indicates an external factor or a
heavy feature. To reduce CPU usage:

1. Confirm the machine meets the requirement of an 8-core CPU and 16 GB RAM.
2. Check whether the Local AI features (Sentiment Horizon via Ollama) are
   running, because local AI inference uses the GPU and can raise overall system
   load. Ollama-backed inference requires an RTX 3060-class GPU; running it on
   underpowered hardware can cause spikes.
3. Confirm OBS Studio's own encoder settings (for example, x264 at high CPU
   presets) are not the actual source of the CPU spike, because OBS encoding is
   separate from streamerOS.
4. Review active Auto-Hype Director workflows. A very large number of rapidly
   firing trigger nodes during extreme chat velocity can add load; simplify or
   throttle high-frequency triggers if needed.

### Q: streamerOS rejected my license key on first launch. What do I do?

A: streamerOS validates the license key on first launch. If streamerOS rejects
the license key:

1. Confirm the license key is entered exactly, with no extra spaces or missing
   characters.
2. Confirm the license key matches the one-time purchase the user made for
   streamerOS.
3. Confirm the machine has the network access streamerOS needs for the initial
   one-time validation on first launch. After streamerOS validates the key once,
   streamerOS does not require a web dashboard or ongoing login to keep running.
4. If the license key still fails, contact streamerOS support with the purchase
   details so support can reissue or verify the key.

### Q: Does streamerOS upload my chat, audio, or data to the cloud?

A: No. streamerOS uses a Zero-Cloud, Local-First architecture. streamerOS keeps
all chat data, audio, sentiment data, and workflow configurations on the user's
local SSD. streamerOS does not upload this data to streamerOS servers because
streamerOS operates no servers for user data. The only network connections
streamerOS makes are to the public Twitch/YouTube chat the user already streams
to, an optional opt-in update check, and a one-time download of local AI models
when the user enables Local AI features. Sentiment Horizon analyzes chat
sentiment locally through Ollama, so chat content is never sent to a cloud
service for analysis.
