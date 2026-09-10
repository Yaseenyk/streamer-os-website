---
title: "OBS CPU Usage Preset: Which One Should You Use?"
description: "veryfast, ultrafast or faster? What each preset costs your CPU, which way to move it when you drop frames, and when to stop using x264."
date: "2026-09-09"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Optimization", "Performance"]
---

Open **Settings → Output → Advanced → Streaming** in OBS with the x264 encoder
selected and you will find **CPU Usage Preset**, a dropdown running from
`ultrafast` to `placebo`. It is the single biggest lever on how much CPU OBS
consumes, and it is routinely moved in the wrong direction.

## What the preset actually controls

x264 is a software encoder: your processor does the compression. The preset
decides **how much effort it spends** looking for ways to represent each frame
in fewer bits.

Slower presets search harder — more motion-estimation candidates, more
partition sizes, more reference frames. That extra searching finds better
compression, which means more quality fits in the same bitrate.

Faster presets skip that searching. Less CPU, and at a fixed bitrate, a visibly
softer picture during motion.

The trade in one line: **CPU time in, quality-per-bit out.**

| Preset | CPU cost | Practical use |
| --- | --- | --- |
| `ultrafast` | Lowest | Emergency headroom; noticeably soft in motion |
| `superfast` | Very low | Weak CPUs, or CPU already saturated by the game |
| `veryfast` | Low | **OBS default** — the balance point most setups want |
| `faster` / `fast` | Moderate | Spare cores and a bitrate worth filling |
| `medium` and slower | High to absurd | Local recording only, never live |

## Why `veryfast` is the default

It is not arbitrary. `veryfast` is roughly where the curve bends: moving from
`ultrafast` to `veryfast` buys a large quality improvement for a modest CPU
increase, while moving from `veryfast` to `medium` costs a great deal of CPU for
a much smaller gain.

You are also streaming at a capped bitrate. Past a point, better compression has
nowhere to put the quality it found — the bitrate ceiling is doing the limiting,
not the encoder's effort.

`medium` and below exist for offline encoding, where time is free because nobody
is watching in real time. Live, they will drop frames.

## Which direction to move, and when

**Move faster** (`superfast`, `ultrafast`) when:

* OBS reports **frames missed due to encoding lag** in the Stats panel
* your game stutters with OBS running and is fine without it
* CPU sits near 100% while streaming

This is the correct emergency response. A slightly softer stream is far better
than a stuttering one, and viewers forgive softness in a way they do not forgive
dropped frames.

**Move slower** (`faster`, `fast`) only when:

* CPU has clear headroom during your most demanding game
* you are streaming at a bitrate high enough to benefit
* you have measured, not guessed

The measurement is the same five-minute test either way: change one step, stream
five minutes, read frames-missed and your in-game frame rate in Stats. Repeat.
Your hardware answers this better than any table.

## The setting you probably want instead

Here is the honest version: if you are tuning this preset to find CPU, you are
usually solving the wrong problem.

**Switch to a hardware encoder.** NVIDIA NVENC, AMD AMF, or Intel QuickSync run
on dedicated silicon, not your CPU cores. The CPU cost drops to almost nothing,
and on any recent GPU the quality is comparable to a mid x264 preset — while
your processor goes back to the game.

The x264 presets matter when:

* you have no hardware encoder available
* you are recording locally with CPU to spare
* your GPU is the bottleneck and your CPU is idle — the reverse of the usual case

For nearly everyone else in 2026, hardware encoding is the answer and the preset
question stops mattering.

## The thing that costs more than the preset

Before spending an evening on encoder settings, look at what else is running.

A streaming PC is a negotiation between the game, the encoder, and every
companion tool you have open — chat clients, alert systems, overlay browsers,
automation tools. Each browser source is effectively another tab. Collectively
they routinely take more CPU than the difference between two adjacent presets.

That is the reasoning behind streamerOS [holding a 1.8% CPU
footprint](/features/performance): the
automation layer should not be part of the negotiation at all. Getting your
companion tools off the critical path frees more headroom than any preset
change, and it does not cost you picture quality to get it.

Tune the encoder second. Clear the machine first.

## Frequently Asked Questions

**What is the best OBS CPU usage preset?**
`veryfast` for most people. It is the default because it sits at the point where
extra CPU stops buying much quality.

**Does ultrafast look bad?**
It looks noticeably softer during motion at the same bitrate. On static or
slow-moving content the difference is small. It is always better than dropping
frames.

**Does the preset affect my game's FPS?**
Yes, if you are using x264 — the encoder and the game compete for the same
cores. With a hardware encoder, the preset is not in play at all.

**Should I use x264 or NVENC?**
NVENC if you have it. It moves encoding off the CPU entirely, which is the
outcome most people are chasing when they open this dropdown.
