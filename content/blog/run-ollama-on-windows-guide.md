---
title: "How to Run Ollama on Windows (and Fix It When It Won't)"
description: "Install Ollama, pick a model that fits your VRAM, and keep it off the cores your encoder needs — plus why apps report it offline when it is clearly running."
date: "2026-09-09"
author: "Yaseen Khatib"
tags: ["Guides", "Local AI", "Windows", "Performance"]
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** Local AI on a streaming PC competes with the game and the encoder, and most guides recommend models far too large for a machine already under load.
> * **The Setup:** Install Ollama, pull a small model, confirm it answers on `127.0.0.1:11434`. That endpoint is what other apps look for.
> * **Why Apps Say Offline:** Ollama is not running, it is bound to a different address, or the model was never pulled — three causes, each with a one-line check.

Running a language model on your own machine means nothing leaves it: no API
bill, no per-message latency, no chat logs on someone's server. On a streaming
PC there is one extra constraint nobody mentions — you are sharing the machine
with a game and an encoder, and the model has to fit in what is left.

## Install and first model

Download Ollama for Windows from `ollama.com/download` and install it. It runs
as a background service and listens on **`127.0.0.1:11434`** — that address is
what every local tool will look for.

Then pull a model sized for what is left of your machine, not for your machine:

```
ollama pull llama3.2:3b
```

Confirm it works:

```
ollama run llama3.2:3b "say hello"
```

If that answers, you are done. Everything else in this guide is about the two
things that go wrong.

## Picking a model that fits a streaming PC

The mistake is choosing by capability. On a machine that is also gaming and
encoding, choose by what is spare.

| VRAM spare | Sensible size | Notes |
| --- | --- | --- |
| Under 4 GB | 1–3B | Runs on CPU acceptably; good enough for short answers |
| 6–8 GB | 3–7B | The sweet spot on a 3060-class card while gaming |
| 12 GB+ | 7–13B | Only if the game is not demanding, or you have a second PC |

Two rules that matter more than the table:

**Prefer quantised builds.** A `q4` variant uses roughly a quarter of the memory
of the full-precision one with a modest quality cost. On a shared machine that
trade is nearly always correct.

**Watch VRAM, not RAM.** If the model does not fit in VRAM it spills to system
memory and slows dramatically — and it is now competing with your encoder for
memory bandwidth, which shows up as dropped frames rather than a slow answer.

## Keeping it off the stream

Three settings worth knowing:

**Unload when idle.** Ollama keeps a model resident for a few minutes after use.
`OLLAMA_KEEP_ALIVE` controls that — shorten it if you only query occasionally
and want the VRAM back between uses.

**Do not stream a model pull mid-broadcast.** A pull is several gigabytes and
saturates the connection you are streaming over. Pull models before you go live.

**Test under load, not idle.** A model that answers instantly on an idle desktop
behaves differently with a game running. Measure while streaming, or you have
measured nothing useful.

## "Ollama offline" when it is clearly running

Apps that use Ollama check whether that endpoint answers. When one says offline
and you can see the process, it is one of three things:

**1. The service is not actually running.** Check first:

```
curl http://127.0.0.1:11434/api/tags
```

A JSON list of models means it is up. A connection error means it is not, however
convincing Task Manager looks.

**2. It is bound elsewhere.** If `OLLAMA_HOST` was set — commonly to `0.0.0.0`
for network access — the app looking at `127.0.0.1` may not find it. Either unset
it or point the app at the same address.

**3. No model is pulled.** The service is up and answers, but has nothing to
serve. `ollama list` shows what you have; an empty list explains it.

That is the whole diagnostic tree. Run the `curl` first — it separates "not
running" from "running but misconfigured" in one command, and those two have
completely different fixes.

## Why local matters here

For a streamer specifically, the argument is not cost. It is that your chat is
your viewers' data, and running the model locally means no message ever leaves
the machine — no vendor holding it, no retention policy, nothing to breach.

That is why streamerOS uses Ollama on `127.0.0.1` rather than a hosted API. The
assistant runs on your PC, against your own stream, and works with the network
unplugged.

## Frequently Asked Questions

**What port does Ollama use?**
11434, on 127.0.0.1 by default.

**Which model should I use while streaming?**
A quantised 3B model is the safe default on a gaming PC. Move up only if you
have measured spare VRAM under real load.

**Does Ollama need the internet?**
Only to pull models. Once downloaded, it runs entirely offline.

**Why does my app say Ollama is offline?**
Curl the endpoint. If it answers, the app is looking at the wrong host; if it
does not, the service is not running.

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
