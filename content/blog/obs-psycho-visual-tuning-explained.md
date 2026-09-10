---
title: "OBS Psycho Visual Tuning: On or Off?"
description: "It is on by default and quietly costs you GPU headroom. What it does, when it improves your stream, and the 5-minute test that settles it."
date: "2026-09-09"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Optimization", "Performance"]
---

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
NVIDIA NVENC encoder selected. Depending on your OBS and driver version it
appears as a **Psycho Visual Tuning** checkbox, or is folded into a preset and
tuning dropdown on newer builds.

If you cannot find the checkbox, you are probably on a newer OBS where the
equivalent behaviour lives under the encoder **Tuning** option — the underlying
trade is the same.

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
negotiation entirely.

Tune the encoder second. Get everything else off the critical path first.
