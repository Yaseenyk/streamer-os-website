---
title: "OBS Psycho Visual Tuning & Adaptive Quantization: On or Off?"
description: "Leave them on unless your GPU is maxed out. What Psycho Visual Tuning (renamed Adaptive Quantization in OBS 31) and Look-ahead do, when to turn them off, and a 5-minute test."
date: "2026-09-09"
updated: "2026-10-22"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Optimization", "Performance"]
---

**Short answer: leave Psycho Visual Tuning on, and leave Look-ahead on, unless
your GPU is the bottleneck.** If the game drops frames only while you stream,
turn Look-ahead off first, then Psycho Visual Tuning. In OBS 31 and newer, Psycho
Visual Tuning is the checkbox labelled **Adaptive Quantization**. It is the same
setting under a new name.

| Setting | Leave on when | Turn off when |
|---|---|---|
| Psycho Visual Tuning / Adaptive Quantization | GPU has headroom, fast-motion games | GPU is maxed out |
| Look-ahead | GPU has headroom, frequent scene cuts | GPU is maxed out, or you need the lowest latency |

If you have opened OBS's output settings and wondered what **Psycho Visual
Tuning** is, you are in good company. It is checked by default on NVENC, it has
an intimidating name, and OBS offers no explanation next to it.

It is worth understanding, because it is one of the few settings that is a real
trade rather than a straight win.

## What it actually does

Psycho Visual Tuning enables a set of **psychovisual optimisations** inside
NVIDIA's encoder. The idea comes from how human vision works: we notice
detail loss in some places far more than others.

We are highly sensitive to:

* sharp edges and text
* slow, smooth camera movement
* faces
* flat areas of colour, where banding stands out

We are much less sensitive to:

* fine detail inside fast motion
* texture in very dark or very bright regions
* high-frequency noise, like grass or foliage in motion

With the setting on, the encoder spends more of your limited bitrate where the
eye is sensitive and less where it is not. Concretely it turns on features like
adaptive quantisation and look-ahead, letting the encoder decide bit allocation
per region rather than treating the frame uniformly.

The result at a fixed bitrate is a stream that **looks** better in motion — the
usual visible win is less mush during fast camera movement — without using any
more bandwidth.

## Adaptive Quantization vs Look-ahead: the two checkboxes

OBS shows two checkboxes next to each other on NVENC, and they do different
jobs. Knowing which is which makes the decision cleaner.

**Adaptive Quantization (AQ).** This is the per-region bit allocation described
above. The encoder compresses flat, static or dark areas harder and spends the
saved bits on edges, text and faces. **This is the Psycho Visual Tuning
checkbox.** OBS 31 renamed it to *Adaptive Quantization*, and its tooltip says
"formerly known as Psycho-Visual Tuning". OBS's own
[Advanced NVENC Options guide](https://obsproject.com/kb/advanced-nvenc-options)
describes it as the same setting "with the proper nomenclature rather than a
confusing marketing term." It is the cheaper of the two and the
one that produces most of the visible gain, which is why the usual answer to
"adaptive quantization on or off" is *on* unless the GPU is already struggling.

**Look-ahead.** A separate checkbox next to it. The encoder
buffers a handful of upcoming frames and inspects them before deciding how to
spend bits on the current one, so it can hold back bits ahead of a cut or a
burst of motion. The gain
is real on content with sudden changes, but it is the more expensive of the two
and it adds a few frames of encoding latency. On a GPU-bound machine Look-ahead
is the first thing to switch off; Psycho Visual Tuning can usually stay.

So the short version:

| Setting | What it does | Cost | Default call |
| --- | --- | --- | --- |
| Psycho Visual Tuning (AQ) | Spends bits where the eye notices | Low | On |
| Look-ahead | Plans bits a few frames ahead | Medium, adds latency | On with headroom, off when GPU-bound |

## The cost

Those optimisations are not free. The encoder does more work per frame,
particularly with look-ahead, which needs to buffer and inspect upcoming frames
before deciding how to spend bits on the current one.

That work happens on the same GPU running your game. If your GPU is already at
its limit, enabling Psycho Visual Tuning takes frames away from the thing your
viewers are actually watching.

This is the trade, in one sentence: **better-looking stream, slightly worse
game performance.**

## When to leave it on

Most of the time. Leave it enabled if:

* you have GPU headroom — the game is comfortably above your target frame rate
* you stream fast-motion content, where the benefit is largest
* your bitrate is modest, so smart bit allocation matters more
* you have a modern NVIDIA card, where the cost is small

At typical streaming bitrates the perceptual gain is real and visible, and on
current hardware the overhead is minor.

## When to turn it off

Turn it off if any of these are true:

* **Your GPU is the bottleneck.** If the game drops frames with OBS running and
  recovers when you stop streaming, you are looking for GPU time and this is one
  of the cheapest places to find it.
* **You are seeing encoding lag** in OBS's stats — frames missed due to encoding
  means the encoder cannot keep up, and disabling this reduces its work.
* **You are on an older card.** On older NVENC generations the overhead is a
  bigger share of a smaller budget.
* **You are recording locally at high bitrate.** With plenty of bits to spend,
  smart allocation matters much less. Just raise the bitrate.

## Where to find it

In OBS: **Settings → Output → Output Mode: Advanced → Streaming tab**, with an
NVIDIA NVENC encoder selected. On OBS 30 and older the checkbox reads **Psycho
Visual Tuning**. On OBS 31 and newer it reads **Adaptive Quantization**, next to
**Look-ahead**.

### Psycho Visual Tuning not showing? Check these

If the checkbox is missing, it is nearly always one of these:

* **You are on OBS 31 or newer.** It was renamed. Look for **Adaptive
  Quantization** instead.
* **Output Mode is Simple.** The simple panel hides every encoder option.
  Switch to **Advanced** at the top of the Output tab.
* **The encoder is not NVENC.** x264, AMD AMF and Intel QuickSync do not have
  this setting. The closest equivalents live in their own preset and quality
  dropdowns.
* **You are looking at the Recording tab.** It is a per-encoder option, so it
  only appears once an NVENC encoder is selected on the tab you are editing.

## How to decide, in ten minutes

Do not guess. Measure it, in this order:

1. Open OBS's **Stats** panel and start a normal session.
2. Stream for five minutes with it **on**. Note frames missed due to encoding
   lag, and your in-game frame rate.
3. Turn it **off**, restart the stream, repeat with the same game and scene.
4. Compare.

If frames-missed drops meaningfully and your game frame rate improves, keep it
off. If both are unchanged, put it back on and take the free quality.

That five-minute test is worth more than any recommendation, because the answer
depends on your card, your game, and your bitrate — three things no article
knows about you.

## The bigger picture

Psycho Visual Tuning is a GPU-side trade, and it only matters once the GPU is
genuinely the constraint. Before spending long on it, check the more common
problem: **something else on the machine eating CPU.**

A streaming setup is a negotiation between the game, the encoder, and every
companion tool you have running. If your chat overlay, alert system and
automation tools are collectively taking meaningful CPU, you will feel that far
more than an encoder tuning checkbox — which is exactly why streamerOS is [built
to hold a 1.8% CPU footprint](/features/performance) and stay out of the
negotiation entirely. What that does and does not fix on a modest machine is
spelled out in [stream automation for a low-end PC](/for/low-end-pc).

Tune the encoder second. Get everything else off the critical path first.

## Frequently Asked Questions

**Should Psycho Visual Tuning be on or off in OBS?**
On, unless your GPU is maxed out. It improves how motion looks at the same
bitrate, and the GPU cost on a modern NVIDIA card is small.

**Should adaptive quantization be on or off in OBS?**
On, for the same reason. In OBS 31 and newer, Adaptive Quantization is the same
checkbox that used to be called Psycho Visual Tuning.

**Should Look-ahead be on or off?**
On if the GPU has headroom. It is the more expensive of the two and adds a few
frames of latency, so it is the first one to turn off when the game drops frames
while streaming.

**Why can't I find Psycho Visual Tuning in OBS?**
Either you are on OBS 31 or newer, where it is called Adaptive Quantization, or
the Output tab is in Simple mode, or the selected encoder is not NVENC.

**Does Psycho Visual Tuning affect CPU usage?**
No. It runs on the NVENC encoder on your graphics card. If CPU is the problem,
look at [the OBS CPU usage preset](/blog/obs-cpu-usage-preset-explained) and
the other tools running alongside OBS.
