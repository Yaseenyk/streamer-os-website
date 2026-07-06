---
title: Connect streamerOS to OBS over WebSocket v5 (Windows)
description: Link streamerOS with OBS using WebSocket v5 on Windows to list and switch
  scenes, trigger automation, and stay zero-cloud with a tiny CPU footprint.
date: '2026-07-06'
author: Yaseen Khatib
tags:
- Guides
- OBS
- Getting Started
- Automation
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** You can’t drive OBS from streamerOS until OBS WebSocket is set up reliably.
> * **The Fix:** Use streamerOS’s native OBS Bridge to connect to OBS over WebSocket v5.
> * **Why It Matters:** One secure local link unlocks one-click scene control and automation without cloud lag or CPU bloat.

## What you’ll unlock after this

Once streamerOS is linked to OBS via WebSocket v5:

- List and switch OBS scenes directly through the [OBS Bridge](/features/obs-bridge).
- Let Auto-Director rules auto-cut scenes from chat velocity and hype spikes (via [Auto-Director](/features/auto-hype)).
- Keep it all local-first, zero-cloud, Windows-only, with a tiny CPU footprint. See the overview at [/features](/features).

Note: OBS features in streamerOS require OBS with its WebSocket server enabled and running on your machine.

## Requirements checklist (quick scan)

- Windows PC running OBS 28+ with the native WebSocket v5 server.
- OBS is open and your scenes are configured.
- streamerOS installed and running on the same PC (or on your LAN if you operate a two-PC setup).
- One WebSocket password you control (set inside OBS). No cloud accounts needed.

## The connection game plan

You’ll do two things:

1) Turn on OBS’s WebSocket v5 server and set a password.
2) Point streamerOS’s OBS Bridge at OBS using host, port, and that password.

That’s it—once connected, scenes populate and you can test a switch.

## Step 1 — Enable OBS WebSocket v5 (set a password)

- In OBS, open the WebSocket settings panel.
- Enable the server (default port is commonly 4455).
- Set a strong password you can remember during streamerOS setup.
- If you run streamerOS on a second PC, allow LAN connections in OBS and note the OBS PC’s local IP (e.g., 192.168.x.x).
- Ensure Windows Firewall allows OBS to accept local connections on the chosen port.

Security tip: Keep this connection on your LAN. Do not port-forward it to the internet.

## Step 2 — Connect streamerOS via OBS Bridge

- Launch streamerOS and open its OBS Bridge feature. Details live at [OBS Bridge](/features/obs-bridge).
- Enter the host, port, and password you set in OBS, then connect.

Use this simple mapping when you enter connection info:

| Field    | What to use                                         |
|----------|------------------------------------------------------|
| Host     | Same PC: 127.0.0.1 or localhost; Two-PC: OBS PC’s LAN IP |
| Port     | The WebSocket port you enabled in OBS (often 4455)   |
| Password | The exact password you set in OBS                    |

If you enabled any encryption option in OBS, mirror that choice in streamerOS.

## Step 3 — Verify the link (and test a safe switch)

- After connecting, streamerOS should fetch your OBS scene list.
- Pick a non-live or test scene and switch to it to confirm round-trip control.
- You should see the change instantly in OBS. That real-time response is the point: no cloud hop, no extra overhead.

If scenes don’t appear, jump to Troubleshooting below.

## Step 4 — Stream-day reliability tips

- Launch order: start OBS first, then open streamerOS so it can find the WebSocket server cleanly.
- If OBS restarts mid-stream, just reconnect from streamerOS’s OBS Bridge once OBS is back.
- Keep OBS’s port and password stable so you don’t scramble on show day.
- streamerOS is designed for a tiny CPU footprint—leave it running alongside OBS without worry.

## Step 5 — Secure and harden your setup

- Use a dedicated, unique WebSocket password.
- Keep connections local; avoid exposing the port to the internet.
- On two-PC setups, reserve the OBS PC’s LAN IP in your router so it doesn’t change.
- In Windows Firewall, scope any inbound rules for OBS to Private networks only.

## Step 6 — Put the connection to work

With OBS now bridged into streamerOS, you can:

- Auto-cut scenes with [Auto-Director](/features/auto-hype). For example, switch to “Gameplay” when chat velocity surges, or cut to “Camera” for Super Chats. You configure rules visually; streamerOS handles the switching.
- Drive quick manual switches from the OBS Bridge scene list when you need a decisive cut.
- Combine overlays from the Aura Scene builder (part of Aura Studio) and render them into OBS, then swap between those scenes on demand.

All of this happens locally—no account, no cloud. See the full lineup at [/features](/features).

## Common setups (and what to enter)

- Single-PC streaming: Host 127.0.0.1, Port your OBS WebSocket port, Password your OBS password.
- Two-PC streaming: Host = OBS PC LAN IP (e.g., 192.168.1.50). Same port and password as configured in OBS. Ensure both machines are on the same subnet.

## Troubleshooting — fix it fast

| Symptom | Likely cause | Quick fix |
|---|---|---|
| “Can’t connect” or timeout | Wrong host or port | On single PC, use 127.0.0.1. On two PCs, confirm the OBS PC’s LAN IP and that both PCs are on the same network. Verify the exact port set in OBS. |
| “Authentication failed” | Password mismatch | Re-enter the OBS WebSocket password exactly. Consider resetting it in OBS and trying again. |
| Connects, but no scenes listed | OBS not fully ready or permission blocked | Ensure OBS is open with a loaded profile. Check Windows Firewall for OBS and allow local traffic. Reconnect. |
| Random disconnects | OBS restarted, sleep, or network blips | Keep the OBS PC from sleeping. If using Wi‑Fi, prefer Ethernet. Reconnect after OBS restarts. |
| Port already in use | Another app using the same port | Change the OBS WebSocket port in OBS, update the same port in streamerOS, and reconnect. |
| Two-PC: can’t reach OBS | Firewall or different subnets | Allow OBS through Private networks in Windows Firewall. Make sure both PCs share the same LAN/subnet. |

If issues persist, double-check that OBS is running its native WebSocket v5 server (OBS 28+). streamerOS controls OBS through that v5 protocol.

## FAQ — quick hits

- Is this zero-cloud? Yes. streamerOS is local-first with no accounts and no backend. Your OBS connection stays on your machine or LAN.
- Does this cost CPU? streamerOS is optimized for a tiny CPU footprint and local control latency.
- Do I need Ollama or AI running for this? No. OBS control via WebSocket is separate. AI features (like AI Sidekick) require Ollama locally, but that’s optional for OBS control.
- Can I use this with future features? Yes. Features marked “coming soon” in v1.1 (like Shorts Factory, Brand Guard, Creator Memory) are not required for OBS control and will be announced when ready.

## Next steps

- Explore [OBS Bridge](/features/obs-bridge) options to refine how you list and switch scenes.
- Turn on [Auto-Director](/features/auto-hype) rules to automate cuts from real-time chat hype.
- Browse [/features](/features) to layer in overlays, hype tracking, and local AI when you’re ready.

You’re now connected. Keep it local, keep it lean, and let streamerOS handle the switching so you can host the show.
