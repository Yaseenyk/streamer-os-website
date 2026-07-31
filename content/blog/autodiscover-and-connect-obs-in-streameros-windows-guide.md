---
title: Auto‑discover and connect OBS in streamerOS (Windows guide)
description: Connect OBS to streamerOS fast with local auto‑discovery. This Windows
  guide shows how to enable OBS WebSocket v5 and start switching scenes reliably.
date: '2026-07-31'
author: Yaseen Khatib
tags:
- OBS
- Getting Started
- Guides
- Automation
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** You waste time fiddling with IPs and passwords just to let tools control OBS.
> * **The Fix:** Use streamerOS’s OBS Bridge to auto‑discover a local OBS WebSocket v5 server and connect in minutes.
> * **Why It Matters:** Faster setup means you can actually switch scenes and automate your show—without cloud risk or CPU drag.

## What you’ll get from this guide

By the end, streamerOS will be paired with your OBS so you can:

- See your active scenes and switch them instantly from streamerOS.
- Feed that connection into automation like [Auto‑Director](/features/auto-hype).
- Keep everything local-first (no accounts, no cloud), with a tiny CPU footprint.

We’ll cover the simplest path: auto‑discovery for a local OBS, plus what to check if it doesn’t show up right away.

Relevant feature pages:
- OBS Bridge — connect and control OBS scenes: [OBS Bridge](/features/obs-bridge)
- Full feature lineup: [Features](/features)

## Before you start: quick preflight

You’re on Windows. Great—streamerOS is Windows‑only.

Make sure you have:
- OBS running on the same PC (or on the same local network if you’re using a dual‑PC setup).
- OBS’s WebSocket server enabled. streamerOS talks to OBS via the native WebSocket v5 interface.
- Your firewall set to allow local connections between streamerOS and OBS.

Tip: If you’re unsure about enabling WebSocket v5 in OBS, consult the OBS documentation, then return to this guide. streamerOS needs that switch on.

## How auto‑discovery works (plain English)

streamerOS’s OBS Bridge looks for a reachable OBS WebSocket v5 server on your machine (and, if your network allows it, on your LAN). When it sees an available OBS instance, it offers a quick connect. You enter your OBS WebSocket password once, and you’re in—no manual IP wrangling required for a typical single‑PC setup.

If auto‑discovery doesn’t find your OBS, you can still connect manually by providing the server address and password inside OBS Bridge. We’ll show both paths below.

## Step‑by‑step: connect OBS via auto‑discovery

### 1) Prep OBS for discovery

- Open OBS and confirm your WebSocket server is enabled.
- Note or set your OBS WebSocket password so you can authenticate the first time.
- Keep OBS running with your usual scene collection loaded.

Result: OBS is broadcasting a local WebSocket endpoint that streamerOS can discover.

### 2) Open OBS Bridge in streamerOS

- Launch streamerOS.
- Open the OBS Bridge feature view (see the [OBS Bridge page](/features/obs-bridge) for where to find it).
- Wait a moment for streamerOS to scan for a local OBS WebSocket v5 server.

Result: You should see your OBS instance appear as “found” and ready to connect.

### 3) Connect and authenticate

- Select the discovered OBS instance.
- When prompted, enter your OBS WebSocket password.
- Confirm the connection.

Result: streamerOS is now connected to OBS via native WebSocket v5. You’re controlling OBS locally—no cloud, no middlemen.

### 4) Sanity‑check the link

- In OBS Bridge, fetch or view your current scenes (list should populate once connected).
- Switch to a non‑live scene and back to your live scene to verify control.

Result: Scene switching is round‑tripping correctly—your stream layout reacts instantly with minimal CPU impact.

## Option B: manual connect (if auto‑discovery doesn’t appear)

If nothing shows up during discovery:

- Confirm OBS’s WebSocket server is enabled and running.
- In OBS Bridge, choose the manual connect path (see [OBS Bridge](/features/obs-bridge) for specifics).
- Provide the address of your OBS WebSocket server (local or LAN) and the password.
- Connect and verify scenes as above.

This is common in dual‑PC setups or strict firewall environments.

## Dual‑PC note (capture PC + gaming PC)

You can run streamerOS on one Windows machine and OBS on another, as long as both are on the same LAN and can reach each other. If discovery doesn’t list your OBS, use the manual connection flow with the OBS machine’s local address and your WebSocket password. Ensure your firewall allows inbound connections for OBS on the capture PC.

## Quick wins after you connect

With OBS Bridge live, you can immediately:

- List and switch scenes from streamerOS while keeping CPU usage tiny.
- Feed scene control into automation like [Auto‑Director](/features/auto-hype), which reacts to chat velocity, Super Chats, and in‑game combat.
- Build reactive overlays with Aura Scene builder inside Aura Studio, then render them into OBS (learn more at [Aura Studio](/features/aura-studio)).

Everything stays local-first and zero‑cloud.

## Troubleshooting: fix discovery and connection in minutes

Use this table to map symptoms to fast fixes:

| Symptom | Likely cause | Fast fix |
| --- | --- | --- |
| No OBS found during discovery | OBS WebSocket server is off | Enable OBS’s WebSocket v5 server, keep OBS running, retry discovery |
| Prompt keeps rejecting password | Password mismatch | Recheck the OBS WebSocket password you set in OBS and try again |
| Connect spins, then fails | Windows firewall blocking local traffic | Allow OBS (and streamerOS) in Windows Defender Firewall on your Private network |
| Manual connect fails to reach host | Wrong address or different networks | Verify both PCs are on the same LAN; use the OBS PC’s correct local address |
| Scenes list is empty after connecting | OBS connected but data not fetched yet | Refresh the scene list in OBS Bridge; confirm OBS has an active scene collection |
| Intermittent disconnects | OBS restarts or a port conflict | Keep OBS open during testing; ensure no other app is claiming the same network port; reconnect in OBS Bridge |
| Discovery shows multiple candidates | Multiple OBS instances running | Close the extra OBS instance or choose the one with your live scene collection |

Still stuck? Walk through this checklist:
- Update OBS to a version that includes native WebSocket v5 support.
- Restart OBS first, then reopen streamerOS and revisit OBS Bridge.
- Temporarily disable any overly aggressive firewall rule and test again (re‑enable after).

## Best practices for a stable link

- Start OBS before opening streamerOS so discovery can succeed on the first pass.
- Keep a single OBS instance running per machine to avoid confusion.
- If you move to a dual‑PC setup later, re‑run this guide using manual connect on the LAN.

## Why streamerOS for OBS control

- Local‑first, zero‑cloud: nothing leaves your machine; no account or backend required.
- Native OBS WebSocket v5: direct, modern control path built for OBS.
- Tiny CPU footprint: keep your system headroom for encoding and the game. See more on performance at [Features](/features).

## What to try next

- Automate scene switching with [Auto‑Director](/features/auto-hype) using chat velocity and event spikes.
- Build a reactive, telemetry‑aware overlay in Aura Studio and render it into OBS. Learn more at [Aura Studio](/features/aura-studio).
- Explore the rest of the stack—from hype tracking to local AI—on the main [Features](/features) page.

You’re connected. You can now drive OBS straight from streamerOS and unlock automation without touching the cloud—or your frame rate.
