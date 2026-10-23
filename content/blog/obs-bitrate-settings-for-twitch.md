---
title: "OBS Bitrate Settings for Twitch: What to Use in 2026"
description: "For 1080p60 on Twitch, use 6,000 kbps CBR as the safe default and up to 7,500 kbps if your upload allows. The full table, and how to pick for your connection."
date: "2026-10-23"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Twitch"]
---

**For a 1080p60 Twitch stream, set OBS to CBR at 6,000 kbps — and go up to
7,500 kbps only if your upload speed comfortably allows it.** Twitch raised its
maximum for 1080p to 7.5 Mbps in June 2026, but 6,000 kbps is still the setting
that works for most viewers and most connections. Use a 2-second keyframe
interval. The rest of this guide covers lower resolutions and how to pick a
bitrate your connection can actually hold.

## OBS bitrate settings for Twitch, by resolution

These are the starting points. Twitch's long-standing
[encoding guide](https://stream.twitch.tv/encoding/) uses the lower end of each
range; the upper end of the 1080p row reflects the higher limits Twitch
[announced in June 2026](https://blog.twitch.tv/en/2026/06/17/introducing-dual-format-and-2k-streaming-on-twitch/).

| Resolution and frame rate | Video bitrate | Notes |
|---|---|---|
| 1080p, 60 fps | 6,000 – 7,500 kbps | Best for fast games if your upload can hold it |
| 1080p, 30 fps | 4,500 – 6,000 kbps | Slower games, Just Chatting |
| 720p, 60 fps | 4,500 – 6,000 kbps | The safest choice for fast games on modest uploads |
| 720p, 30 fps | 3,000 – 4,500 kbps | Weak connections or very low-end PCs |

Set these in **Settings → Output → Output Mode: Advanced → Streaming**:

* **Rate control:** CBR. Twitch's ingest expects a constant bitrate.
* **Bitrate:** from the table.
* **Keyframe interval:** 2 seconds.
* **Audio:** 160 kbps AAC is plenty for voice and game audio.

1440p ("2k") streaming on Twitch, at up to 9 Mbps with the HEVC codec, is
available to Partners and Affiliates through Twitch's Enhanced Broadcasting, not
through a plain single-stream setup.

## How to pick a bitrate your connection can hold

The table is the ceiling, not the target. Your **upload** speed decides what you
can actually sustain:

1. Run a speed test and note the **upload** number, not download.
2. Keep your total stream bitrate (video plus audio) to roughly **three quarters
   of that upload**, so a busy evening on your connection does not drop frames.
3. If your upload is 8 Mbps, 6,000 kbps video is about the limit. If it is under
   6 Mbps, drop to 720p at around 4,000 kbps.

A stable stream at a lower bitrate looks far better to viewers than a sharper one
that stutters. Twitch's own guidance says the same.

## Why higher is not always better on Twitch

Two reasons to stay moderate even if your upload is huge:

* **Viewers' connections.** If your channel does not get quality options (the
  transcodes that let a viewer pick 480p or 720p), every viewer receives your
  full bitrate. Twitch says it has added server-side transcoding for Partners and
  many Affiliates, but not every channel gets it. A very high bitrate then means
  buffering for viewers on mobile or slow Wi-Fi.
* **Your encoder.** More bitrate does not fix a struggling encoder. If OBS shows
  encoding lag, the fix is elsewhere — see
  [OBS 'Encoding Overloaded': What It Means and How to Fix It](/blog/obs-encoding-overloaded-fix).

## Checking that it works

1. Open **View → Stats** in OBS during a test stream.
2. Watch **Dropped frames (network)**. Anything consistently above zero means the
   bitrate is too high for your connection right now — lower it in steps of
   500 kbps.
3. If **frames missed due to rendering lag** or **skipped frames due to encoding
   lag** are climbing instead, bitrate is not the problem; it is your GPU or
   encoder.

Which encoder to pair with these settings is covered in
[NVENC vs x264 for Streaming](/blog/nvenc-vs-x264-for-streaming).

## Frequently Asked Questions

**What is the best OBS bitrate for Twitch?**
6,000 kbps CBR for 1080p60 is the safe default. Twitch allows up to 7,500 kbps
for 1080p since June 2026, if your upload can hold it.

**What bitrate should I use for 720p60 on Twitch?**
Between 4,500 and 6,000 kbps, with CBR and a 2-second keyframe interval.

**Why does my Twitch stream drop frames at 6,000 kbps?**
Your upload cannot sustain it, or something else on your network is using it.
Lower the bitrate in 500 kbps steps until dropped frames stay at zero.
