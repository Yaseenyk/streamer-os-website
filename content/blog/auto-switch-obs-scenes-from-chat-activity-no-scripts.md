---
title: Auto-switch OBS scenes from chat activity (no scripts)
description: Use streamerOS Auto-Director to switch OBS scenes on chat spikes—no scripts.
  Connect OBS, set chat thresholds, add cooldowns, and go live smarter.
date: '2026-07-08'
author: Yaseen Khatib
tags:
- Guides
- OBS
- Automation
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** You miss hype moments or fumble hotkeys while managing scenes mid-stream.
> * **The Fix:** streamerOS Auto-Director maps chat velocity to automatic OBS scene switches—no scripting required.
> * **Why It Matters:** Hands-free, hype-aware scenes keep pacing tight and viewers engaged without spiking your CPU.

## What you’ll build
You’ll connect OBS to streamerOS, read your chat-velocity baseline, then create a no-code rule in Auto-Director that switches scenes when chat heats up. Typical setup:

- Low chat → Gameplay scene
- Medium chat → Talking/Facecam scene
- High chat spike → Hype/Fullscreen Cam scene

This is fully local-first and zero-cloud, with a tiny CPU footprint. If you can run OBS, you can run this.

## What you need
- Windows PC with OBS installed
- OBS WebSocket v5 enabled (native in modern OBS)
- streamerOS installed
- A few prepared scenes in OBS (Gameplay, Just Chatting, Hype Cam—name them clearly)

Note: OBS control in streamerOS requires OBS’s WebSocket server to be on. See [OBS Bridge](/features/obs-bridge).

## Step 1: Prep OBS (1 minute)
Before you automate, make your manual setup clean:

- Verify OBS WebSocket v5 is enabled and you know the port and password.
- Create or tidy up the scenes you’ll switch between. Keep names short and unambiguous.
- Set a single default transition in OBS (e.g., a short fade) for smooth changes.

If you’re unsure on connecting streamerOS to OBS, review [OBS Bridge](/features/obs-bridge).

## Step 2: Connect streamerOS to OBS via OBS Bridge
Open streamerOS and use the OBS Bridge feature to connect to OBS over WebSocket. You’ll provide the same address/port/password you configured in OBS. When connected, you should be able to list scenes and confirm streamerOS sees them. If you need UI specifics, follow the steps on the [OBS Bridge](/features/obs-bridge) page.

Quick sanity checks:
- Scenes are discoverable from streamerOS.
- A test switch from streamerOS actually changes OBS.

## Step 3: Calibrate your chat-velocity baseline (recommended)
Your automation will hinge on chat velocity: how fast messages are flying. Spend 5–10 minutes getting a feel for your normal vs hype ranges so you pick thresholds that won’t flicker.

- Open [Viral Moments](/features/viral-moments) to watch the live chat-velocity graph in real time.
- Note what “quiet” looks like during a chill moment and what “hype” looks like when you ask mods/friends to spike chat briefly.
- Write down two practical breakpoints you see (e.g., Quiet → Normal, Normal → Hype). These numbers are your starting thresholds.

Tip: If you’re not live, do a private test stream. Ask mods to help simulate spikes with quick bursts of messages.

## Step 4: Build the no-code rule in Auto-Director
You’ll use the visual node system in [Auto-Director](/features/auto-hype). The concept is simple: Chat Velocity → Thresholds → Scene Switches. Exact node names may differ; follow the feature page for UI specifics.

High-level flow to create:
1) Add a Chat Velocity input node.
2) Add one or more threshold/logic nodes to split the signal into Low, Medium, and High ranges.
3) For each range, add a Scene Switch action mapped to the target OBS scene.
4) Add short cooldowns/holds to prevent rapid back-and-forth switches.

Suggested starting logic:

| Chat range | Switch to scene      | Threshold idea (tune from baseline) | Hold / Cooldown |
|------------|----------------------|-------------------------------------|-----------------|
| Low        | Gameplay             | <= your Quiet value                 | 6–10s hold      |
| Medium     | Just Chatting/Cam    | between Quiet and Hype              | 8–12s hold      |
| High       | Hype/Fullscreen Cam  | >= your Hype value                  | 12–20s hold     |

Notes:
- Start conservative. It’s better to under-trigger than to whiplash your viewers.
- If Auto-Director exposes delay or hysteresis controls, use them. If you don’t see these options, check the [Auto-Director](/features/auto-hype) page for guidance on smoothing.

## Step 5: Test safely before going public
Run a short, private test stream. Keep [Viral Moments](/features/viral-moments) open next to OBS while your mods simulate chat bursts.

Check for:
- Correct scene mapping: Do Low/Medium/High ranges land on the intended scenes?
- Stability: Do cooldowns prevent scene flicker when chat hovers near a threshold?
- Timing: Are holds long enough so a quick spike doesn’t instantly revert?

Adjust thresholds upward if you’re over-triggering. Extend holds if transitions feel frantic.

## Step 6: Go live with confidence
When your test feels smooth:
- Verify OBS Bridge is connected and scenes are listed.
- Confirm Auto-Director is active with your rule enabled.
- Keep Viral Moments open for the first session to watch spikes in real time.

This is all local-first and zero-cloud. streamerOS runs with a tiny CPU footprint, so your encoder has room to breathe. Read more about performance at [Performance (tiny CPU)](/features/performance) and privacy at [Zero-cloud privacy](/features/zero-cloud).

## Pro tips from active streams
- Normalize audio across scenes: Use the same mic and game-audio sources in each scene so switches don’t change volume.
- Respect segment intent: If you’re delivering a serious point, consider pausing the automation or raising thresholds so a stray burst doesn’t cut you off.
- Use a “Fallback” path: If chat quiets for a while, automatically drift back to Gameplay to maintain show rhythm.
- Pair visuals with hype: If you want overlays that react to the same energy, build them in [Aura Studio](/features/aura-studio). It renders locally into OBS via the Aura Scene builder and can follow your hype-threshold calibration.

## Optional upgrade: Fold in Super Chats and combat
If you ever want to go beyond chat velocity, Auto-Director can also react to Super Chats and game combat signals. Add those inputs to the same node graph and blend them with your chat thresholds. Keep it simple at first—then iterate between streams.

## Troubleshooting
- OBS won’t connect: Double-check WebSocket v5 is enabled and the port/password match in OBS and streamerOS. See [OBS Bridge](/features/obs-bridge).
- Scenes never switch: Confirm your Auto-Director rule is actually active and connected to a Scene Switch action. Open [Viral Moments](/features/viral-moments) and verify you see live chat-velocity changes; if not, make sure your chat source is live.
- It switches too often: Raise your thresholds and/or increase hold/cooldown durations in your Auto-Director logic.
- It never hits “High”: Your “Hype” threshold is too high for your current audience pace. Lower it slightly and retest with mod help.
- CPU worries: streamerOS is designed for a tiny CPU footprint. If you suspect resource pressure, close unneeded browser tabs or overlays and keep your node graph minimal.

## Your end result
You now have hands-free, chat-aware scene direction that follows the energy of your stream—without scripts, bots, or cloud services. streamerOS listens for real excitement and moves the camera where it belongs, right when it matters.

Next session, open your rule, nudge thresholds based on what you learned, and keep iterating. Smart automation should feel invisible; your audience will just feel the show get tighter and more alive.

If you want to explore more live-side helpers and local AI options, browse the main [Features](/features) page. All of it stays on your PC—no account required.
