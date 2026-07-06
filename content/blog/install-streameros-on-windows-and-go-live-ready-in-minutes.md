---
title: Install streamerOS on Windows and go live-ready in minutes
description: 'Fast Windows setup for streamerOS: connect OBS WebSocket v5, add a reactive
  overlay, enable auto-switching, and unlock local AI with Ollama.'
date: '2026-07-06'
author: Yaseen Khatib
tags:
- Getting Started
- OBS
- Local AI
- Performance
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** Pre-stream setup eats time and attention juggling scenes, overlays, and tools.
> * **The Fix:** Install streamerOS, connect OBS via OBS Bridge, and light up overlays/automation with local AI.
> * **Why It Matters:** You go live faster, react to hype automatically, and keep CPU low with zero-cloud privacy.

## What you’ll set up in minutes
- A clean Windows install of streamerOS (local-first, zero-cloud, tiny CPU).
- A fast OBS connection over native WebSocket v5 using [OBS Bridge](/features/obs-bridge).
- A reactive overlay with [Aura Studio](/features/aura-studio), calibrated to chat hype.
- Optional: Local AI via Ollama for AI Sidekick, Live Chat Sentiment, and more (see [all features](/features)).

## What you need (quick checklist)

| Item | Why it matters | Where to check |
|---|---|---|
| Windows PC | streamerOS is Windows-only | System Settings → About |
| OBS installed | streamerOS controls OBS scenes natively | Open OBS |
| OBS WebSocket v5 enabled | Required for OBS Bridge to connect | OBS settings for WebSocket/server |
| streamerOS installer | The app itself | Download and run on Windows |
| Ollama (optional) | Required for AI features (local-only) | Install and keep running locally |
| Twitch/YouTube linked in OBS | For chat/telemetry in stream | OBS account integration |

Tip: AI-powered features (like AI Sidekick and chat sentiment) require Ollama to be running locally. OBS control requires OBS’s WebSocket server to be enabled.

## Step 1: Install streamerOS on Windows
1) Download the Windows installer and run it.
2) Approve the installer when Windows prompts for permissions.
3) Launch streamerOS after install.

Result: streamerOS is ready to talk to OBS with a tiny CPU footprint and zero-cloud data flow (no account, no backend).

## Step 2: Prep OBS for control (one-time)
1) Open OBS and ensure the built-in WebSocket server (v5) is enabled.
2) Set a password if you use one, and note the host/port.
3) Keep OBS running.

Result: OBS is listening for streamerOS so your scenes can be listed and switched instantly.

## Step 3: Connect OBS using OBS Bridge
1) In streamerOS, open the OBS Bridge (see details on the [feature page](/features/obs-bridge)).
2) Enter your OBS WebSocket details (host/port/password if set) and connect.
3) Verify connection by pulling your scene list and switching to a non-live test scene.

Result: streamerOS can now list and switch OBS scenes natively via WebSocket v5. You have reliable hands-off scene control.

## Step 4: Add a reactive overlay with Aura Studio
1) Open Aura Studio (overlay and visual engine; details on the [feature page](/features/aura-studio)).
2) Use the drag-and-drop Aura Scene builder to lay out your “Canvas of Light” overlay.
3) Calibrate the hype threshold so your visuals react at 1 Hz to chat and telemetry without overwhelming the screen.
4) Render the overlay into OBS as a source.

Result: A live, reactive overlay that responds to real momentum. It stays smooth and frugal on CPU by design.

## Step 5: Automate scene switches with Auto-Director
1) Open the Auto-Director node editor.
2) Add a simple rule to switch to your “Hype” scene when chat velocity surges, and back to your main scene when it cools off.
3) Optionally include triggers for Super Chats or game combat telemetry.

Result: Scenes auto-switch when the room pops, so you stay focused on performance, not hotkeys.

## Step 6: Watch momentum in real time with Viral Moments
1) Enable the live chat-velocity monitor.
2) Let streamerOS auto-mark hype spikes during stream.
3) After the session, export markers to CSV for your editor.

Result: You leave stream with the moments already flagged—no scrubbing required.

## Step 7: Turn on local AI (optional but powerful)
1) Install Ollama and keep it running locally.
2) In streamerOS, enable AI features once Ollama is detected.
3) Try AI Sidekick to query live stats, pull recent chat, or drive the app (e.g., switch scenes) locally—no cloud needed.
4) Use Live Chat Sentiment to gauge room mood in real time and feed your automation.

Result: On-device AI that knows your stream and helps you act faster, entirely private. Explore what’s available on [the features overview](/features).

## Step 8: Record, review, and pull highlights with Clip Library
1) Stream and record locally as usual.
2) Point streamerOS at your recording folder if prompted.
3) Let Clip Library score your VODs by a hype score: 50% peak chat velocity, 30% Super Chats/actions, 20% sentiment.

Result: A ranked list of moments worth clipping without manually rewatching the whole VOD.

## A quick starter workflow (copy this for your next stream)
- 5 minutes before: Open OBS, open streamerOS, confirm OBS Bridge is connected, and load your Aura overlay scene in OBS.
- As you go live: Start Viral Moments to auto-mark spikes. Keep Auto-Director enabled for reactive scene switches.
- After stream: Export hype markers and scan the Clip Library’s top-scored segments first.

## Zero-cloud privacy and performance that respects your rig
- Local-first: No accounts, no backend—your data stays on your PC.
- Tiny CPU: streamerOS is designed to be frugal so your frames and game get the headroom.

## Troubleshooting (fast fixes)
- OBS won’t connect:
  - Ensure OBS is running and the WebSocket server (v5) is enabled.
  - Confirm host/port/password and that your firewall allows local connections.
  - In streamerOS, reconnect via OBS Bridge and re-pull the scene list.

- Overlay not showing in OBS:
  - Reopen Aura Studio and ensure your overlay is rendering into OBS as a source.
  - Revisit hype threshold calibration if the overlay seems too quiet or too noisy.
  - See the [Aura Studio feature page](/features/aura-studio) for integration pointers.

- AI features not responding:
  - Make sure Ollama is installed and running locally before opening streamerOS.
  - Give it a moment on first run; local models may initialize on first use.

## What to explore next
- Sponsor-ready assets: Media Kit Generator and Sponsor CRM keep your pipeline local and organized.
- Creativity tools: Viral Engine helps shape thumbnail strategy and tags for your VODs.
- More automation: Stack additional Auto-Director rules as your chat behavior becomes predictable.

Coming soon in v1.1 (not available yet): Shorts Factory (VOD → 9:16), Brand Guard voice/mic monitoring (Whisper), and Creator Memory (AI vector recall).

## Keep it simple, keep it local
With streamerOS, setup is quick: connect OBS, light up a reactive overlay, turn on automation, and—if you want—add local AI. You get the payoff immediately: faster starts, smarter scene changes, and highlight-ready VODs, all with zero-cloud privacy and a tiny CPU footprint.
