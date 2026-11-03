---
title: "OBS Dropped Frames: How I Found a CPU Hog That Wasn't OBS"
description: "OBS dropped frames have three different causes and three different fixes. A story about measuring CPU one second at a time, plus the exact OBS menus to check first."
date: "2026-11-04"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Performance", "Optimization"]
---

**Short answer:** OBS dropped frames mean frames did not leave your PC in time. Open the Stats dock and see which counter climbs: network drops need a different server, lower bitrate or a cable; encoding and rendering lag mean the PC is overloaded. To find the culprit, sample each program's CPU once a second.

## The sawtooth

On 11 June 2026 I was staring at a column of CPU readings that looked like a saw blade. I was building streamerOS, a Windows companion app for streamers, and I had just switched on a feature that listens to the microphone. The app was sitting there doing nothing, listening to a silent room. The numbers said otherwise.

I had set myself a budget: the app must stay under 5% CPU while you play a game. So I sampled the process once a second for twenty seconds, the way my test log records it: the `\Process(streamer-os)\% Processor Time` counter, sampled at 1 Hz.

The result, straight from the log: a valley of about 5%, then bursts of about 190%, average around 106%. On a silent mic. Percentages above 100 are normal for this counter, by the way: it adds up all the cores the process uses, so a process can read 190% on a multi-core chip.

I want to be careful about what this story is and is not. That machine was a development laptop with integrated graphics, and it was not streaming. I did not measure OBS dropping a single frame because of this. The official benchmark for the app (an RTX 3060 PC, a demanding game running, Windows Performance Recorder) was blocked, because I did not have that hardware on the desk. That is written up in the repo as a release hold. What I did have was a method, and the method is the useful part.

## What "dropped frames" actually means in OBS

Before you hunt for a hog, find out which kind of problem you have. OBS reports three different failures, and they have three different fixes. Open the **Stats** dock (**Docks → Stats** in current builds, **View → Docks → Stats** in older ones) and watch which number moves while the stream stutters.

| Counter | What it means | Where to look |
| --- | --- | --- |
| Dropped frames (network) | The upload could not carry the data | Server, bitrate, cable, drivers |
| Skipped frames due to encoding lag | The encoder missed its deadline | Encoder, preset, resolution |
| Missed frames due to rendering lag | The GPU could not composite the scene in time | Game frame cap, scene complexity |

The first row is the classic. The other two are about the PC being overloaded, and they are where a hidden CPU hog shows up. Our post on [the encoding overloaded warning](/blog/obs-encoding-overloaded-fix) walks through the second and third rows in detail.

## If the network counter is climbing

This is where most "OBS dropping frames but my internet is fine" reports end up, because a fast speed test does not prove a stable connection to one particular server. OBS's own [stream connection troubleshooting guide](https://obsproject.com/kb/stream-connection-troubleshooting) gives the order. In the version I read in November 2026 it goes:

1. **Change server.** **Settings → Stream**, pick a different Server. For Twitch on Windows, the guide points to the TwitchTest tool to rank servers.
2. **Lower the video bitrate.** **Settings → Output**. The guide's starting point is 75% of your total upload speed.
3. **Try another service** in **Settings → Stream** to see whether the problem is tied to one platform.
4. **Settings → Advanced → Network:** the guide lists network optimizations and TCP pacing (Windows only), setting Bind to IP to Default, and trying IP Family set to IPv4 Only.
5. **Dynamic bitrate**, in the same Network section: "Dynamically change bitrate to manage congestion (Beta)". The guide says it lowers bitrate instead of dropping frames, but treats it as a workaround, not a fix.
6. **Everything outside OBS:** security software, VPNs, vendor "network booster" utilities, old network drivers, and Wi-Fi. The guide says plainly that a wired connection is recommended when streaming.

Work through them in that order and stop when the counter stops climbing.

## If the PC counters are climbing, find the hog

This is the case my CPU graph belonged to. If skipped or missed frames climb, something is taking compute away from OBS and your game. Task Manager shows a rough picture, but it smooths over the short bursts that cause stutter. My bursts lasted several seconds, and an average over a minute would have hidden them.

So sample, as I did. In PowerShell:

```
Get-Counter '\Process(obs64)\% Processor Time' -SampleInterval 1 -MaxSamples 20
```

Swap `obs64` for any process name without the `.exe`. Run it for each suspect while you play, then read the pattern, not the average. A flat line is fine. A sawtooth is the thing to chase.

## The turning point: it was not the loud part

The model I was using needed about six seconds of CPU to transcribe every five-second window of audio, so it could never quite keep up while someone was talking. That part I expected. What I did not expect was the bursts on silence. The app was running its speech model on windows of audio that contained nothing, so every few seconds it spent a burst of CPU transcribing a quiet room.

The fix was small: measure the loudness of each audio window first, and skip the model when it is below a threshold. After the change, I sampled again for twenty seconds on a silent mic: average 5.0%, peak 10.8%, bursts gone. For active speech I moved the model onto the graphics chip: process CPU went from around 106% to 10.8%, with the peak falling from 190% to 28%. Same method, three samples, each one told me what to do next.

The lesson for a streamer is not about speech models. It is that the thing eating your headroom is rarely the thing you suspect, and a one-second sampler finds it faster than guessing.

## What I would do again

1. **Read the Stats counters first.** Network, encoding and rendering lag are different diseases.
2. **Fix the network in OBS's order:** server, bitrate, Advanced → Network options, cable, then drivers and security software.
3. **Sample CPU at one second, not one minute,** for every always-on program: chat tools, overlays, launchers, recorders.
4. **Test while the load is real.** An idle app can hide a problem that appears under chat or game load.
5. **Change one thing, then sample again.** I would not have trusted the fix without the second run.
6. **Be suspicious of your own tools first.** I am saying this about software I wrote.

If you are budgeting CPU headroom on a modest PC, the [low-CPU OBS settings guide](/blog/best-obs-settings-for-low-cpu-streaming) is the next stop. streamerOS launches in February 2027 and the pre-registration box below is how you hear about it; its CPU numbers live on the [performance page](/features/performance), and until the RTX benchmark is done I will not claim more than that page says.

## Frequently asked questions

**Why does OBS drop frames when my internet is fine?**
A speed test measures bulk throughput, not stability to one ingest server. Try a different server and a lower bitrate first, as OBS's own guide suggests, and use a wired connection.

**What is a normal percentage of dropped frames?**
Ideally none. A few frames during a brief network hiccup are not alarming, but a counter that keeps climbing is. I do not have a verified threshold to quote.

**Is dynamic bitrate worth turning on?**
It trades dropped frames for a lower bitrate during congestion. OBS's guide calls it a beta workaround that does not fix the root cause.

**Can a program other than OBS cause dropped frames?**
Yes, in two ways: network software and drivers can disturb the upload, and any CPU or GPU hog can cause encoding or rendering lag. Sampling each program's CPU is how you tell.
