---
title: Control OBS Studio from streamerOS with OBS WebSocket v5
description: Hook streamerOS to OBS over WebSocket v5 to list and switch scenes manually,
  auto-switch on chat spikes, and keep everything local-first on Windows.
date: '2026-07-10'
author: Yaseen Khatib
tags:
- OBS
- Guides
- Automation
- Local AI
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** You can’t reliably switch OBS scenes hands-free while streaming.
> * **The Fix:** streamerOS connects to OBS via WebSocket v5 to list and switch scenes, or auto-switch on chat and events.
> * **Why It Matters:** Smoother shows, fewer alt-tabs, and zero-cloud control that won’t spike your CPU.

## What you’ll set up

- A direct, local connection from streamerOS to OBS via WebSocket v5.
- One-click manual scene switching from streamerOS.
- Optional: automatic scene switching based on chat velocity, Super Chats, and combat triggers using Auto-Director.
- Optional: local-AI commands to switch scenes with AI Sidekick (requires Ollama).

This guide is Windows-only. OBS control in streamerOS lives in the [OBS Bridge](/features/obs-bridge). Automation rules use [Auto-Director](/features/auto-hype). AI control is part of the broader [features](/features).

## Requirements (quick check)

- OBS Studio with its WebSocket v5 server enabled and a password set.
- streamerOS installed on the same Windows PC or reachable on your LAN.
- If you want AI control: Ollama running locally (for AI Sidekick).

Runtime notes:
- OBS features need OBS with its WebSocket server enabled.
- AI features need Ollama running locally.

## Step 1 — Prep OBS WebSocket v5

Before streamerOS can control anything, OBS must expose its WebSocket v5 server.

- In OBS, enable the WebSocket server and set a password. Note the port (default is commonly 4455) and confirm it’s v5.
- Keep the server local if possible. Use 127.0.0.1 and ensure your firewall allows OBS on that port for local connections.
- If you’re dual-PC streaming on the same LAN, note the OBS machine’s local IP (e.g., 192.168.x.x). Keep your password strong.

You don’t need any cloud setup. Everything stays on your network.

## Step 2 — Connect streamerOS to OBS (OBS Bridge)

Use streamerOS as “the other app” controlling OBS. The [OBS Bridge](/features/obs-bridge) handles the WebSocket v5 link.

- Open streamerOS and go to the OBS Bridge feature.
- Enter your OBS host (127.0.0.1 for same-PC; LAN IP if remote), the WebSocket port, and your password.
- Connect and fetch your scene list. You should see your current scenes populated.

Tip: If the list is empty or the connection fails, double-check the password and port, and that OBS is open.

## Step 3 — Manual scene control (zero alt-tabs)

Once connected, you can switch scenes straight from streamerOS.

- Use the scene list to actively cut to the scene you want before or during a segment.
- When swapping from “Just Chatting” to “Gameplay,” confirm the scene change in OBS’s preview/program.
- Keep your streaming flow: use streamerOS as your production panel while you focus on chat and gameplay.

Result: you remove alt-tabs and keep your CPU footprint tiny with local-first control.

## Step 4 — Automate switching with Auto-Director

Manual switching is great. Automation is better for moments you can’t predict while live. The [Auto-Director](/features/auto-hype) in streamerOS lets you build visual rules that react to:

- Chat velocity spikes (twitch/YouTube)
- Super Chats and other high-signal actions
- Combat or high-intensity gameplay moments

Here’s a reliable starter workflow:

### Build a “Hype Cam” rule from chat velocity

- Create a rule that watches chat velocity.
- Set a threshold that marks a hype spike (start conservative; you can tune it live).
- Action: Switch OBS scene to “Hype Cam” (or your zoomed camera/overlay scene) when chat exceeds the threshold for a brief window.
- Add a fallback: return to your “Gameplay” or “Main” scene when chat settles.

Result: when chat surges, your stream visually responds in real time without you lifting a finger.

### Add a Super Chat trigger

- Add a rule listening for Super Chats (or equivalent events).
- Set a minimum amount or frequency to avoid noise.
- Action: Switch to a celebratory scene (e.g., special overlay or stinger scene) for a few seconds, then revert.

### Combat-aware scene for gameplay

- Add a rule hooked to gameplay intensity or combat telemetry where available.
- Action: Switch to your “Gameplay Close” scene (tighter crop or different camera) during fights, then return to the wide scene post-combat.

Tuning: Start with simple thresholds and expand. Because streamerOS is local-first, adjustments apply instantly without roundtrips to a server.

## Step 5 — Optional: control via local AI Sidekick

Prefer natural language? streamerOS includes a local AI Sidekick that knows your live stats and can drive the app. To use it:

- Start Ollama on your PC before your stream. Confirm it’s running locally.
- Open the AI Sidekick in streamerOS. Keep OBS connected via OBS Bridge.
- Use short prompts during your show, such as:
  - “Switch to Gameplay.”
  - “Cut to BRB.”
  - “Switch back to Just Chatting.”

The Sidekick executes scene switches through the same WebSocket v5 connection. No accounts, no cloud.

Note: AI control depends on Ollama; if Ollama isn’t running locally, Sidekick features won’t be available.

## Quick configuration cheat sheet

| Setting | Example | Notes |
|---|---|---|
| OBS Host | 127.0.0.1 | Use localhost for same-PC; LAN IP for dual-PC setups. |
| OBS Port | 4455 | Use your configured WebSocket port (v5). |
| Password | Strong secret | Must match the one set in OBS. |
| Scenes | Main, Gameplay, Hype Cam | Keep names simple and consistent for automation. |

## Testing and troubleshooting

- Authentication failed: Re-type the password in streamerOS and OBS; both must match exactly.
- Can’t connect: Verify OBS is open, the port is correct, and your firewall allows local traffic on that port.
- Scenes not updating: Refresh the scene list in OBS Bridge after changes in OBS.
- Dual-PC issues: Ping the OBS machine from the streamerOS PC. If unreachable, fix your LAN or firewall settings.
- Unexpected scene switches: Dial back chat thresholds in Auto-Director, or add a brief “debounce” period to avoid rapid toggling.

## Best practices for a smooth show

- Keep it local: use 127.0.0.1 when possible for the lowest latency and simplest security profile.
- Name your scenes clearly: short, unambiguous names make AI Sidekick prompts and Auto-Director rules more reliable.
- Start simple: one hype rule and one celebratory rule beat five overlapping automations.
- Dry run pre-show: go live unlisted or run a local recording to tune thresholds and make sure transitions look clean.

## Privacy, performance, and what’s next

- streamerOS is local-first and zero-cloud: it doesn’t require an account or send your data to a backend. That keeps your production private.
- Performance is tuned for live work: tiny CPU footprint so OBS keeps your frames.
- Coming soon (v1.1): Shorts Factory (VOD to 9:16), Brand Guard voice/mic monitoring, and Creator Memory. These are not available yet—keep an eye on updates.

## Wrap-up

You’ve just turned streamerOS into a local control surface for OBS via WebSocket v5. Start with manual cuts from the [OBS Bridge](/features/obs-bridge), add smart rules with [Auto-Director](/features/auto-hype), and, if you like, layer in local AI for quick scene switches—all without touching the cloud. Your production gets faster, your attention stays on the audience, and your stream looks intentional even when the chat goes wild.

Explore more tools built for local-first streaming in [features](/features).
