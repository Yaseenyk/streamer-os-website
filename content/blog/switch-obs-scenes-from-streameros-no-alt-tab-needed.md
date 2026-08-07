---
title: Switch OBS Scenes from streamerOS (No Alt-Tab Needed)
description: Stay in-game and switch OBS scenes right from streamerOS using OBS Bridge,
  Auto-Director rules, or local AI—no alt-tabbing, zero cloud.
date: '2026-08-07'
author: Yaseen Khatib
tags:
- Guides
- OBS
- Automation
- Local AI
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** Alt-tabbing to change OBS scenes breaks focus and causes missed moments.
> * **The Fix:** Use streamerOS to list and switch OBS scenes directly—or automate switches with rules or local AI.
> * **Why It Matters:** Smoother shows, fewer mistakes, and zero-cloud control with a tiny CPU footprint.

## What you’ll set up in 10–15 minutes
- Live scene control inside streamerOS via native OBS WebSocket v5.
- One-click manual switching from a clean scene list.
- Optional: Auto-switching from chat velocity, Super Chats, or game combat with [Auto-Director](/features/auto-hype).
- Optional: Type natural-language commands to your local AI Sidekick to switch scenes (Ollama required).

Everything stays local-first (no accounts, no backend). streamerOS runs lean, so you keep frames where they matter: your game and OBS. See the full lineup in [Features](/features).

## Prerequisites (2-minute check)
- Windows PC with OBS running.
- OBS WebSocket server enabled (v5). This ships with modern OBS—just ensure the server is turned on and note the port and password.
- streamerOS installed and open.
- If you’ll use AI Sidekick: install and run Ollama locally before you start.

Tip: If you plan to auto-switch based on chat, make sure your live chat is connected in streamerOS so it can read chat velocity and Super Chats. See the [Auto-Director](/features/auto-hype) page for connection details and supported triggers.

## Step 1 — Connect OBS to streamerOS with OBS Bridge
1) In streamerOS, open the OBS control area powered by [OBS Bridge](/features/obs-bridge).
2) Add your OBS WebSocket connection using the host (usually localhost), port, and password you noted from OBS.
3) Verify the connection: you should see your OBS scenes listed in streamerOS.

Result: streamerOS now has native control of OBS via WebSocket v5. No more app-switching just to change scenes.

## Step 2 — Manual quick-switching (zero learning curve)
- Keep the OBS Bridge scene list visible while you play.
- Click the target scene when you’re ready to switch—Gameplay, BRB, Just Chatting, etc.
- Watch OBS switch instantly in the preview/program.

Pro tips to make this bulletproof:
- Keep scene names short and unique ("Gameplay", "BRB", "Cam-Full", "Desk").
- Order your scenes in OBS the way you most often need them—your mental map will match the list you see in streamerOS.

Result: You stay in your main window and make precise scene changes without alt-tabbing.

## Step 3 — Hands-off switching with Auto-Director (optional)
If you want your show to react to hype automatically, use the [Auto-Director](/features/auto-hype). It’s a visual rules system that watches chat velocity, Super Chats, and even game combat signals.

1) Open Auto-Director in streamerOS.
2) Create a simple rule flow:
   - Trigger node: Chat velocity exceeds your set threshold.
   - Action node: Switch to your "Hype" or "Gameplay" scene.
3) Add more triggers as needed:
   - Super Chat received → switch to "Celebration" scene briefly, then return.
   - Combat detected → switch to "Action" or "No-Face" scene for max visibility.
4) Calibrate thresholds. Start conservative so it doesn’t flicker scenes on minor buzz.
5) Dry-run to preview behavior, then arm the rules for your next broadcast.

Result: When hype spikes, the scene switches for you—no clicks, no context-switching.

## Step 4 — Command it with local AI (optional)
The AI Sidekick in streamerOS can drive the app, including switching scenes—fully local via Ollama.

1) Make sure Ollama is installed and running on your PC.
2) Open the AI Sidekick panel in streamerOS.
3) Type natural commands like:
   - "Switch to BRB"
   - "Go to Just Chatting"
   - "Cut to Gameplay, then return to Cam-Full in 60 seconds"
4) Keep your scene names clean so the Sidekick can match them reliably.

Result: You get hands-free intent-based control without cloud latency or accounts.

## Which method should you use?

| Method | Best for | Setup time | Needs Ollama | Hands-on during stream |
|---|---|---:|:---:|:---:|
| Manual via OBS Bridge | Precise, intentional cuts | 2–3 min | No | Yes |
| Auto-Director rules | Reactive, hype-driven shows | 5–10 min | No | No (auto) |
| AI Sidekick commands | Natural-language control | 3–5 min | Yes | Minimal |

Use manual for key story beats, Auto-Director for momentum, and AI Sidekick to cover in-between moments while you stay focused.

## Test-run checklist (5 minutes, off-stream)
- Click through each scene in streamerOS and confirm OBS switches immediately.
- Trigger a mock chat burst (test messages work) and confirm Auto-Director switches to the correct scene.
- Send a sample Super Chat or simulate the event type you plan to use; validate the cut and any auto-return behavior.
- Ask the AI Sidekick to switch scenes; verify it picks the intended scene.
- Watch CPU: streamerOS is designed for a tiny footprint—your frames should stay stable. See [Features](/features) for performance details.

## Troubleshooting
- Can’t connect to OBS:
  - Confirm the WebSocket server is enabled in OBS and the port/password are correct.
  - Check that no firewall is blocking localhost on the chosen port.
- Scene list is empty:
  - Make sure you’re connected to the correct OBS instance and that scenes exist in your current OBS profile.
- Wrong scene switches on Auto-Director rules:
  - Lower sensitivity on chat velocity or add a small cooldown so spikes don’t chain-fire.
  - Keep triggers unambiguous (e.g., separate rules for Super Chats vs. general chat hype).
- AI Sidekick not responding:
  - Ensure Ollama is running locally before you launch streamerOS.
  - Rephrase with the exact scene name if your phrasing is too similar to multiple scenes.

## Pro tips for smooth ops
- Name scenes for intent: "Cutaway-Desk", "Hype-Gameplay", "BRB-Minimal". The clearer the name, the faster you’ll hit the right one—manually or via AI.
- Add a short cool-down in Auto-Director to prevent rapid back-and-forth.
- Combine manual and auto: keep manual control for critical reveals, let Auto-Director handle ambient hype.
- Use streamerOS’s local-first design to your advantage: you get privacy and stability without cloud dependencies.

## Why streamerOS for scene control?
- Zero-cloud and Windows-first: privacy by default, no accounts, no backend.
- Native OBS WebSocket v5 control for reliable switching.
- Tiny CPU footprint to protect your FPS and encoder quality. More on performance in [Features](/features).

## You’re done—no more alt-tabbing
With [OBS Bridge](/features/obs-bridge) connected, your scene list is a click away. Layer in [Auto-Director](/features/auto-hype) for hype-driven cuts, and optionally use the AI Sidekick for natural-language switches—all local, all fast. Your viewers see seamless transitions while you stay locked into the moment.
