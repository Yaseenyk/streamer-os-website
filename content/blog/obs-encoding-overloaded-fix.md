---
title: "OBS 'Encoding Overloaded': What It Means and How to Fix It"
description: "The red warning means your encoder can't keep up — not that your internet is bad. How to tell which of the three OBS frame counters is actually moving, and fix the right one."
date: "2026-09-09"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Optimization", "Performance"]
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** "Encoding overloaded! Consider turning down video settings" means the encoder cannot finish a frame before the next one arrives. It is a compute problem, not a network problem, and the usual advice — lower your bitrate — does nothing for it.
> * **The Diagnostic:** OBS counts three different failures separately. Skipped frames mean the encoder is late, missed frames mean the GPU compositor is late, dropped frames mean the network is late. Each has a different fix, and reading the wrong counter sends you down the wrong path.
> * **The Fix Order:** Move encoding off the CPU to NVENC/AMF/QuickSync first, then cut output resolution, then frame rate, then encoder preset. Bitrate is last, and usually irrelevant.

`Encoding overloaded! Consider turning down video settings.`

It arrives mid-stream, in red, usually in the fight you actually cared about.
And the first thing most people do is lower their bitrate — which does nothing,
because bitrate is not what overloaded.

## What the message actually means

OBS has a fixed budget per frame. At 60 fps, that budget is **16.7 milliseconds**.
In that window it has to composite your scene, hand the finished frame to the
encoder, and have the encoder produce compressed output.

If the encoder is still working when the next frame is due, OBS cannot wait — a
live stream has no pause button. It throws the frame away and raises the
warning.

So "encoding overloaded" means exactly one thing: **your encoder is too slow for
the settings you asked it for.** Not your upload. Not your bitrate. Not your ISP.

## First, read the right counter

This is the step people skip, and it is the one that matters. Open
**View → Stats**. OBS tracks three failures, and they are not the same problem:

| Counter | What is late | What it points at |
| --- | --- | --- |
| **Skipped frames due to encoding lag** | The encoder | This warning. CPU/GPU encode capacity. |
| **Frames missed due to rendering lag** | The compositor | GPU too busy — usually the game. |
| **Dropped frames (network)** | The upload | Bitrate, connection, ingest server. |

Watch which number climbs while the warning fires.

If **skipped** is climbing, keep reading. If **missed** is climbing, your GPU is
saturated compositing the scene and the encoder is fine — cap your in-game frame
rate and cut scene complexity instead. If **dropped** is climbing, it is the
network, and *that* is when lowering bitrate is the correct move.

Three counters, three different fixes. Fixing the wrong one is why the warning
keeps coming back.

[OBS_ENCODER_TUNING_GRAPHIC]

## Fix it in this order

Work top to bottom and stop when the counter stops moving. Each step below buys
more headroom than the one after it.

### 1. Stop encoding on the CPU

If **Settings → Output → Encoder** says `x264`, your processor is doing the
compression — while also running your game. This is the single biggest win
available, and it is one dropdown.

Switch to your GPU's dedicated encoder:

* **NVIDIA** — `NVIDIA NVENC H.264` (or AV1 on 40-series and newer)
* **AMD** — `AMD HW H.264/AVC`
* **Intel** — `QuickSync H.264`

These are separate silicon blocks. They do not take shader time from your game,
and they do not compete with it for CPU cores. On a modern NVENC chip the
encoding cost of a 1080p60 stream is close to free.

This one change resolves most encoding-overload reports outright.

### 2. Lower the output resolution

If you have no hardware encoder — older CPU, no dedicated GPU, a VM — cut the
pixels instead.

In **Settings → Video**, leave Base (Canvas) at your monitor resolution and drop
**Output (Scaled) Resolution** to `1600x900` or `1280x720`. Encoding cost scales
with pixel count: 720p is roughly **half** the work of 1080p.

Set the **Downscale Filter** to `Bicubic` for a modest saving, or `Bilinear` if
you are desperate. `Lanczos` looks best and costs the most.

720p60 on a stable stream beats 1080p60 that skips frames every fight. Viewers
notice stutter long before they notice resolution.

### 3. Drop to 30 fps

Halving the frame rate halves the number of frames to encode. For a
slower-paced stream — talk shows, strategy games, art, coding — 1080p30 is a
better use of a limited encoder than 720p60.

For shooters and racing, keep 60 and give up the resolution instead.

### 4. Move the preset faster

Still on x264? The **CPU Usage Preset** decides how hard the encoder searches
for compression. Move it toward `superfast` or `ultrafast` to buy back CPU at
the cost of some detail in motion.

Move it in that direction, not the other one — this is the setting most often
changed backwards. There is a full breakdown in
[OBS CPU Usage Preset: Which One Should You Use?](/blog/obs-cpu-usage-preset-explained).

If you are on NVENC, the equivalent is the **Preset** dropdown (`P1`–`P7`);
lower numbers are faster and cheaper.

## What is stealing the headroom

Sometimes the settings are reasonable and something else is eating the machine.

**Your game has no frame cap.** An uncapped menu screen will happily render 900
fps and saturate the GPU, starving the compositor. Cap in-game frame rate to
your monitor's refresh, or a few frames below it.

**Thermal throttling.** If the warning only appears twenty minutes in, the
hardware is hot and clocking down. Check temperatures over a session rather than
at the start — a laptop on a duvet is a genuinely common cause.

**Background tools.** Browser-based alert overlays, a second chat client,
Electron dashboards and cloud-sync stream tools each take a slice of the same
CPU. Several of them together can account for the entire deficit.

That last one is worth auditing honestly. A stack of companion apps that each
look harmless in Task Manager can add up to more CPU than OBS itself — and
unlike the encoder, none of it is doing work your viewers can see. There is more
on measuring that in
[Best OBS Settings for Low-CPU Streaming](/blog/best-obs-settings-for-low-cpu-streaming).

## What will not fix it

To save you the forum threads:

* **Lowering the bitrate.** Bitrate is how much data leaves your PC. It has
  almost no effect on how long a frame takes to encode.
* **Changing the keyframe interval.** Set it to 2 seconds and forget it.
* **Reinstalling OBS.** The settings are the problem, and they will follow you.
* **Buying more RAM.** Encoding is compute-bound, not memory-bound.
* **Process priority tricks.** Raising OBS above Normal can help marginally on a
  saturated CPU, but it redistributes a shortage rather than removing it. Fix
  the encoder first.

## The short version

The warning means the encoder missed its deadline. Read **Stats**, confirm it is
*skipped* frames and not *missed* or *dropped*, then move encoding to your GPU.
If that is not available, cut resolution, then frame rate, then preset.

Leave bitrate alone unless the counter that is climbing is the network one.
