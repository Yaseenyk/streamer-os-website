---
title: "How to Organise Your Streaming Folders (VODs, Clips, Exports)"
description: "A folder structure that survives a year of streaming, keeps VODs off your system drive, and means you can actually find the clip you remember from March."
date: "2026-09-09"
author: "Yaseen Khatib"
tags: ["Guides", "Workflow", "OBS Studio"]
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** Recordings default to the system drive with timestamp filenames, so within months you have a full C: and hundreds of files nobody can identify.
> * **The Structure:** One root, dated folders, and a split between raw recordings and anything you produced from them.
> * **The Rule That Matters:** Never record to the drive Windows is on — the one time it fills mid-stream, the recording stops and OBS may too.

Nobody plans a folder structure. You stream, OBS writes
`2026-03-14 21-07-33.mkv` to wherever it defaulted, and eleven months later
there are four hundred of those on a drive that is 94% full, and the clip you
remember is in one of them.

Ten minutes now avoids all of that.

## Get recordings off the system drive first

This matters more than any organisation scheme.

OBS defaults to your user folder, which is on C:, which is where Windows lives.
A three-hour recording at a decent bitrate is tens of gigabytes. Fill that drive
mid-stream and the recording stops — and Windows starts behaving badly at
exactly the moment you least want it to.

In OBS: **Settings → Output → Recording Path**, and point it at a different
physical drive. Not a different partition — a different drive, so the write does
not compete with the OS for the same disk.

## A structure that survives

```
D:\Streaming\
├── recordings\        raw OBS output, dated
│   └── 2026-09\
├── clips\             cut from recordings, named by content
├── exports\           finished uploads, per platform
│   ├── youtube\
│   └── shorts\
├── assets\            overlays, alerts, fonts, scene backgrounds
└── analytics\         platform CSV exports, media kit source data
```

Three principles are doing the work:

**Separate raw from produced.** Recordings are disposable once you have cut what
you need. Clips and exports are not. Keeping them in different trees means you
can delete a month of raw footage without a careful review.

**Date the raw, name the produced.** `2026-09\` is right for recordings, because
the only way you will look for one is by when. Clips should be named for what
they contain — `boss-fight-comeback.mp4` — because that is how you remember them.

**One root.** Everything under `D:\Streaming\`. Backups, drive migrations and
disk-space questions all become one operation instead of six.

## Name recordings so they mean something

OBS's default filename format is a timestamp. You can do better in
**Settings → Advanced → Recording → Filename Formatting**:

```
%CCYY-%MM-%DD %hh-%mm-%ss
```

becomes something like:

```
%CCYY-%MM-%DD_%hh%mm_stream
```

The gain is small but real — sortable, unambiguous, and readable at a glance in
a file list. If you stream several distinct kinds of content, putting that in the
scene collection name and including it here pays for itself quickly.

## Keep your analytics exports

The folder people leave out, and the one that matters commercially.

Twitch and YouTube let you export channel analytics as CSV. Do it monthly and
keep them in `analytics\`. Two reasons:

- **Platforms limit history.** The window you can look back on is not
  indefinite. Once it has rolled off, it is gone.
- **Sponsors ask for numbers.** A media kit built from twelve months of your own
  exports is more credible than a screenshot of last week, and you cannot
  reconstruct it after the fact.

This is exactly what streamerOS's media kit generator reads — local CSV exports
from a watched folder, turned into a branded PDF, with nothing uploaded
anywhere. But the folder is worth keeping whether or not you use a tool, because
the data disappears if you do not.

## Housekeeping that takes five minutes a month

- **Delete raw recordings older than 60 days**, once you have cut from them.
  This is the only step that keeps the drive from filling.
- **Move finished exports off to an archive drive** or cloud storage.
- **Export last month's analytics CSV** before the window rolls.

Set a monthly reminder. It is the difference between a system that works for
years and one you abandon in March.

## Frequently Asked Questions

**Where should OBS save recordings?**
A drive that is not your Windows drive, ideally a physically separate disk.

**MKV or MP4?**
Record MKV and remux to MP4 afterwards. An MP4 recording that crashes mid-write
is often unrecoverable; MKV survives it. OBS has a remux tool built in.

**How long should I keep raw VODs?**
Sixty days is a reasonable default. Keep anything you might still cut from,
delete the rest — it is the bulk of your disk usage.

**Why keep analytics CSV exports?**
Platform history windows expire, and sponsor conversations need numbers you
cannot reconstruct later.

---

## Get 3 months free instead of 7 days

streamerOS is a Windows-native cockpit that runs entirely on your PC — chat
velocity, sentiment, OBS scene automation and your sponsor media kit. No cloud
account, no telemetry upload, and a 1.8% CPU footprint so your game keeps its
frames.

It launches **November 2026**. The trial is 7 days; a full licence is **$29 once
— not a subscription**.

**Pre-register before launch and your trial is 3 months.**

**[Claim 3 months free →](/download)** — one email, no card, and you get the
build the day it ships.
