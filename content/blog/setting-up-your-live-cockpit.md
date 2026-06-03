---
title: "The Power of Local AI: Setting Up Your Live Cockpit"
description: "A friendly walkthrough of the streamerOS live dashboard — the difference between the Historical Analytics Dashboard and the real-time Viral Moments tab, plus the new OBS Link and YouTube Live Status health badges that tell you your pipelines are connected."
date: "2026-06-03"
author: "Yaseen Khatib"
tags: ["Guides", "Getting Started", "Dashboard", "Local AI"]
---

> **streamerOS Live Cockpit Series · Part 1 of 3**
> 1. **The Power of Local AI: Setting Up Your Live Cockpit** — you are here
> 2. [Breaking the Window Freeze: The Popout Chat Masterclass](/streamer-os-website/blog/popout-chat-masterclass)
> 3. [Waking Up the Brain: Handling the "Ollama Offline" Banner](/streamer-os-website/blog/fixing-the-ollama-offline-banner)

Think of streamerOS less as another app cluttering your taskbar and more as the cockpit of an aircraft. A good cockpit doesn't bury you in raw numbers — it puts the *right* gauge in front of you at the *right* moment, so you can keep your hands on the controls and your eyes on the runway (in your case, the game).

Everything in streamerOS runs locally on your own machine. There's no cloud account to log into, no chat data being shipped off to a server somewhere. The "brain" doing the work lives on your PC, which is exactly why it stays so fast and so private. In this first guide, we'll take a tour of the cockpit so you know what every gauge is telling you before you go live.

---

## Two Views, Two Very Different Jobs

The most common point of confusion for new streamers is treating the dashboard as one big screen of numbers. It's actually **two separate tools** that answer two completely different questions. Knowing which one to look at — and when — is the single biggest upgrade you can make to how you read your stream.

### The Historical Analytics Dashboard — "How did that stream go?"

This is your main, post-stream review desk. It's built for **depth, not speed**.

When your broadcast ends, the Historical Analytics Dashboard digests the full session and turns it into clean, readable summaries — the kind of report you pour over with a coffee the next morning. Under the hood it works from exported **CSV data**, which is just a structured spreadsheet of everything that happened during your stream: message counts, engagement curves, the quiet stretches, the peaks.

Reach for this view when you want to:

- Review how an entire stream performed from start to finish.
- Spot patterns across sessions — "my chat always wakes up around the 40-minute mark."
- Export the raw numbers to build your own charts or share with a sponsor.

The key thing to remember: this dashboard is **reflective**. It's a recording, not a live feed. It's deliberately *not* trying to update second-by-second, because its job is accuracy over the long haul, not reflexes in the moment.

### The Viral Moments Tab — "What's happening *right now*?"

This is the opposite tool, built for **speed, not depth**.

The Viral Moments tab watches your live chat as it streams in and tracks how *fast* your community is reacting. Its headline number is **chat velocity** — messages per second — and it's tuned to catch the instant your chat erupts after a clutch play, a plot twist, or a perfectly-timed joke.

Reach for this view when you're *live* and want to:

- Catch an interaction spike the moment it happens, not in tomorrow's report.
- See, at a glance, whether the energy in chat is rising or cooling off.
- Know when to lean into a moment your audience is already excited about.

Where the Historical Dashboard is your rear-view mirror, the Viral Moments tab is your windshield. One tells you where you've been; the other tells you what's coming at you right now.

> **Rule of thumb:** If you're *streaming*, you live in the Viral Moments tab. If you're *reviewing*, you live in the Historical Analytics Dashboard.

---

## The Health Badges: Your Pre-Flight Checklist

Before any pilot pushes the throttle, they run a quick instrument check. streamerOS gives you the same thing in the form of two small **health badges** pinned to the top of the screen. They're tiny, but they answer the most important question in live streaming: *"Is everything actually connected?"*

A green badge means a background pipeline is alive and talking to streamerOS. A dimmed or red badge means something needs your attention *before* you go live — which is exactly when you want to find out, not twenty minutes into the broadcast.

### The OBS Link Badge

This badge confirms that streamerOS and **OBS Studio** are talking to each other over the local connection (OBS WebSocket v5).

- **Green:** streamerOS is connected to OBS and can read scene changes, fire automations, and react to your stream in real time.
- **Not green:** OBS either isn't running, or its WebSocket server isn't switched on yet. Until this goes green, scene-based automation can't reach OBS.

When this badge is green, you know the bridge between your dashboard and your broadcast software is solid.

### The YouTube Live Status Badge

This one is newer, and it works a little differently from the OBS badge — in a way that's worth understanding.

The YouTube Live Status badge is **backend-authoritative**. In plain English: it doesn't just *guess* you're live because a window is open somewhere. It reflects the actual, confirmed live state coming from the background pipeline that's tracking your broadcast. If the badge says you're live, you're genuinely live, because the source of truth is the pipeline itself — not a hopeful assumption on the screen.

- **Green:** Your YouTube live stream is confirmed active and the chat pipeline is flowing into streamerOS.
- **Not green:** The pipeline hasn't confirmed a live broadcast yet. If you *think* you're live but this is dim, that's your cue that the chat connection isn't established — and the next guide in this series is exactly what you need.

Because this badge trusts the backend pipeline rather than appearances, it won't lie to you. That makes it the single most reliable "am I really connected?" indicator on the whole screen.

---

## Reading the Cockpit at a Glance

Put it all together and your pre-stream routine becomes a five-second habit:

1. **Glance at the badges.** Two greens at the top = your pipelines are live and connected. Anything dim is a to-do before you go live.
2. **Open the Viral Moments tab.** This is your live windshield for the whole broadcast — watch chat velocity here.
3. **Leave the Historical Dashboard for later.** Come back to it after the stream, when you want the full, accurate story.

That's the whole philosophy: the right gauge, at the right moment, with zero clutter — and all of it running quietly on your own machine.

---

## Frequently Asked Questions

### Why are there two dashboards instead of one combined view?
Because real-time speed and historical accuracy pull in opposite directions. A live velocity tracker has to favor *instant* reactions and can't pause to reconcile a whole session, while a historical report favors *complete, accurate* summaries and doesn't need to update every second. Splitting them keeps each one excellent at its own job instead of mediocre at both.

### What does "backend-authoritative" actually mean for the YouTube badge?
It means the badge reflects the live state that the background pipeline has actually confirmed, rather than inferring it from what's visible on screen. If the badge is green, the connection is real — so you can trust it as your ground truth for whether your chat feed is flowing.

### My OBS Link badge is green but the YouTube badge is dim. Is that a problem?
Not a bug — just a checklist item. It means streamerOS is talking to OBS perfectly, but the live YouTube chat pipeline hasn't connected yet. The fix is to connect your chat the right way, which is exactly what we cover in **Part 2** of this series.

---

## Next Up

Now that you can read your cockpit, it's time to feed it the data that makes it sing: your live chat. In **[Part 2: Breaking the Window Freeze — The Popout Chat Masterclass](/streamer-os-website/blog/popout-chat-masterclass)**, we'll connect your YouTube chat using the local window scraper, explain why the "Popout Chat" trick is so powerful, and show how streamerOS keeps your velocity scores updating in real time at almost zero CPU cost.
