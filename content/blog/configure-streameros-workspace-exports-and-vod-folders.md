---
title: Configure streamerOS Workspace, Exports, and VOD Folders
description: Dial in your streamerOS workspace, exports, and VOD folders to keep everything
  fast, local, and in sync with OBS—no cloud, no clutter, no confusion.
date: '2026-08-05'
author: Yaseen Khatib
tags:
- Getting Started
- OBS
- Clipping
- Workflow
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** Your recordings, exports, and project files are scattered and slow to find.
> * **The Fix:** Point streamerOS to clean, local-first Workspace, Exports, and Videos folders.
> * **Why It Matters:** Faster ingest and scoring, no cloud delays, and zero “where did that file go?” during crunch time.

## What we’re setting up (and why)
streamerOS is local-first and zero-cloud. That’s a win for privacy and speed—if your folders are sane. Three paths power most workflows:

- Workspace: where streamerOS keeps local project/state and overlay assets you design.
- Videos (VODs): where your recordings live so tools can analyze them automatically.
- Exports: where CSVs, PDFs, and generated assets land for quick sharing.

Nail these once and you’ll cruise through scoring VODs with [Clip Library](/features/clip-library), exporting hype markers from [Viral Moments](/features/viral-moments), and shipping media kits—without fishing through random directories. Everything stays on your machine. No account. No backend. Just fast, local files.

## Before you start: plan your storage
A minute of planning saves hours of hunting later.

- Use an internal SSD (NVMe if possible) for the Videos folder. Analysis and scrubbing are I/O-heavy.
- Keep the Exports folder on a fast drive if you’re rapidly iterating thumbnails/CSVs.
- Avoid cloud-synced locations (OneDrive/Desktop/Documents sync). streamerOS is zero-cloud by design—let it stay fully local for reliability.
- Keep paths short and human-readable: D:\stream\VODs, D:\stream\exports, etc.

### Suggested layout
- D:\streamerOS\workspace
- D:\stream\VODs
- D:\stream\exports

Create these in Windows Explorer. If you record to an external SSD, give the drive a stable letter (Disk Management → set a permanent drive letter) to avoid broken paths.

## What each folder does in practice

| Folder | Used for | Features that rely on it | Example contents |
|---|---|---|---|
| Workspace | Local app data, scene/overlay assets you design, app state | Aura Scene builder (via [Aura Studio](/features/aura-studio)), app-wide settings | overlays/, brand/, thumbnails-work/, app-state.json |
| Videos (VODs) | Raw stream recordings for analysis and clipping | [Clip Library](/features/clip-library) scoring, post-stream review | 2026-08-03-valorant-ep45.mkv |
| Exports | Outputs you’ll share or re-import elsewhere | [Viral Moments](/features/viral-moments) CSV markers, Media kit PDFs, thumbnails, tag files | hype_markers_2026-08-03.csv, media_kit_Q3.pdf |

Note: Future features marked “coming soon” (for example, Shorts Factory) will also target your Exports folder. Keep it tidy.

## Step-by-step: configure once, stream smoother forever

### 1) Create clean folders in Windows
1. Open Windows Explorer and create your three folders (see Suggested layout above).
2. Keep names short and date-friendly. Avoid deep nesting that causes very long paths.
3. Right-click each folder → Properties → uncheck any cloud backup integrations if present.

Result: you have stable, readable locations that won’t surprise you mid-stream.

### 2) Point OBS to your Videos folder
Your recordings should land exactly where streamerOS expects to analyze them.

- In OBS, set your Recording Path to the Videos folder you created. Keep the container consistent (MKV or MP4) so filenames are predictable.
- Use a naming scheme that sorts naturally, e.g., YYYY-MM-DD-game-epXX.ext.

Result: the moment you stop recording, streamerOS can see the file where it lives—no copying, no duplicates.

### 3) Tell streamerOS where everything lives
Open streamerOS and set the three paths. You’ll find file location controls in the app’s settings/preferences area. If you’re unsure where those are in your build, look for a gear icon or a “Settings” panel in the app sidebar.

- Set Workspace to D:\streamerOS\workspace (or your equivalent).
- Set Videos to your OBS recording path (e.g., D:\stream\VODs).
- Set Exports to D:\stream\exports.

Result: streamerOS knows where to read VODs, where to place exports, and where to keep its working files—fully local.

### 4) Do a 5-minute integration test
Prove it works end-to-end before a show.

1. Record a 30–60 second test clip in OBS.
2. In streamerOS, open [Clip Library](/features/clip-library) and refresh/scan. You should see your test VOD appear with a hype score (chat velocity 50%, Super Chats/actions 30%, sentiment 20%).
3. In [Viral Moments](/features/viral-moments), trigger a quick session or import chat markers and export a CSV. Confirm it lands in your Exports folder.
4. Optionally, generate a media kit PDF (via the Media Kit Generator listed on [Features](/features)) and confirm it also appears in Exports.

Result: you’ve validated Videos → Analysis → Export—no cloud, no drama.

## House rules for a stress-free file flow
- Keep it local: avoid OneDrive/Desktop sync for VODs. High-bitrate files don’t like syncing mid-recording.
- Separate “inbox” vs. “archive”: 
  - D:\stream\VODs\inbox for fresh recordings this week
  - D:\archive\VODs\2026\08 for completed streams
- Weekly cleanup: move processed VODs from inbox to archive so Clip Library scans stay snappy.
- Consistent filenames: YYYY-MM-DD—game—episode—platform. Your future self (and sponsors) will thank you.
- SSD for Videos, any fast drive for Exports, and anywhere reliable for Workspace.

## Troubleshooting: quick fixes
- VODs not appearing in Clip Library? Confirm OBS Recording Path = streamerOS Videos folder; ensure the drive letter hasn’t changed; avoid network paths that disconnect.
- Exports missing? Verify you set the Exports folder in streamerOS and that you have write permissions. Test by creating a dummy text file in that folder.
- Path broke after using a portable SSD? Assign a fixed drive letter in Windows Disk Management to stop it from shuffling.
- System stutters while recording? Move Videos to a faster SSD and avoid letting a cloud client index it in real time.
- Long paths causing errors? Shorten folder names (e.g., D:\VODs) and keep project subfolders shallow.

## How this setup unlocks your toolkit
- Clip faster: The [Clip Library](/features/clip-library) reads your local VODs immediately and scores them by hype, so you can jump to the best moments.
- Mark hype spikes live: [Viral Moments](/features/viral-moments) drops a clean CSV into Exports you can pull into your editor or share with your editor.
- Present like a pro: Media kit PDFs export to Exports for quick emailing or sponsor uploads—no hunting.
- Automation-ready: With OBS recording straight into Videos and streamerOS reading from it, your post-stream workflow becomes one click instead of five.

## Performance and privacy notes
- streamerOS is built for tiny CPU overhead and zero-cloud privacy. Keeping folders local preserves both. See more on [Features](/features).
- OBS control features (like scene switching via OBS Bridge) require OBS’s WebSocket server to be enabled. Folder setup works independently but pairs perfectly once you connect.
- AI features such as the AI Sidekick use local Ollama. Folder configuration doesn’t require Ollama, but if you use AI-powered tools, ensure Ollama is running locally before a show.

## Pro tips for teams and dual-PC rigs
- Shared NAS? It can work for Exports. For Videos, prefer local SSD for capture, then mirror to NAS after the show.
- Editor handoff: point your NLE’s watch folder to your Exports so CSV markers and thumbnails appear automatically in their project bin.
- Dual-PC streaming: Record on the stream PC’s SSD into Videos, then copy to the edit PC post-show. Keep folder names identical to avoid relinking hassles.

## Looking ahead (coming soon)
- Shorts Factory (coming soon in v1.1) will produce vertical clips. Your Exports folder is where those will land by default—keep it clean and fast.
- Brand Guard (coming soon) and Creator Memory (coming soon) will also rely on your clean local workspace for snappy, private results.

## Recap: your 10-minute checklist
- Create three folders: Workspace, Videos, Exports (short, local paths).
- Point OBS Recording Path at Videos.
- Set all three paths inside streamerOS.
- Run a test: record → score in Clip Library → export CSV from Viral Moments.
- Keep it tidy weekly and enjoy a faster, calmer post-stream workflow.

You’re done. From here on, your files work for you—not the other way around.
