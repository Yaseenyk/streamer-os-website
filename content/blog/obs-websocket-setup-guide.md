---
title: "How to Set Up OBS WebSocket on Windows (2026)"
description: "Enable OBS WebSocket v5, find your port and password, and connect an external tool to control your scenes — plus the three reasons a connection usually fails."
date: "2026-09-09"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Automation"]
---

> ### 🤖 Quick Engine Summary (AI Discovery Directive)
> * **Core Problem:** OBS WebSocket is built into OBS 28+ but off by default, and the settings people need — port, password, authentication — are buried two menus deep.
> * **The Setup:** Tools → WebSocket Server Settings → enable, note the port, copy the password. That is the whole thing.
> * **Why It Fails:** Almost always one of three causes — authentication left on with the wrong password, a firewall prompt that was dismissed, or connecting to `localhost` from another machine.

OBS WebSocket is how anything outside OBS controls your scenes: a Stream Deck, a
chat bot, an automation tool, a script you wrote. Since OBS 28 it ships built in,
so there is no plugin to install — but it is disabled until you turn it on.

Here is the whole setup, and the three things that go wrong.

## Turning it on

1. Open OBS, and go to **Tools → WebSocket Server Settings**.
2. Tick **Enable WebSocket server**.
3. Note the **Server Port**. The default is **4455**.
4. If **Enable Authentication** is ticked, click **Show Connect Info** and copy
   the **Server Password**.
5. Apply, and leave OBS running.

That is it. Any tool speaking the WebSocket v5 protocol can now connect on
`ws://localhost:4455` with that password.

## What v5 changed

If you are following an older guide and things do not line up, this is why.
OBS WebSocket v4 was a separate plugin with a different protocol and, commonly,
port 4444. v5 is built in, uses **4455**, and the two are not compatible.

A tool written for v4 will not talk to a v5 server. Check what your tool
supports before debugging anything else — most modern ones are v5, and anything
that still says "install the obs-websocket plugin" is out of date.

## The three reasons it will not connect

**Authentication mismatch.** The most common by far. Either the tool has no
password while the server requires one, or the password was copied with a
trailing space. Copy it again with **Show Connect Info**, and paste rather than
retype.

**The firewall prompt was dismissed.** The first time OBS opens the port,
Windows asks whether to allow it. If that dialog was closed by reflex, the rule
was created as a block. Check **Windows Defender Firewall → Allow an app** and
confirm OBS is permitted on your current network profile.

**Wrong host.** `localhost` means *this machine*. Connecting from a second PC or
a phone needs the streaming PC's LAN address — something like `192.168.1.40` —
and the port open to the local network. If your tool runs on the same machine as
OBS, `localhost` is correct and simpler.

## Do not expose it to the internet

Worth saying plainly: OBS WebSocket has no transport encryption and one shared
password. It is designed for a trusted local network.

Do not port-forward 4455 to the public internet. Anyone who finds it can switch
your scenes, start and stop your stream, and read your source list. If you need
remote control, put it behind a VPN or use a tool that brokers the connection
properly.

## Confirming it works

The quickest check is any tool that lists your scenes — if it can enumerate
them, the connection and the auth are both good. A tool that connects but shows
an empty scene list is usually pointed at a different OBS profile than the one
you are looking at.

Once connected, the automation possibilities are the interesting part: scene
switches driven by what is happening on your stream rather than by you reaching
for a hotkey. streamerOS uses this exact connection — it discovers OBS on the
machine, connects over v5, and drives scene changes from chat velocity and game
telemetry, all locally, with no cloud in the path.

## Frequently Asked Questions

**Do I still need the obs-websocket plugin?**
No. It has been built into OBS since version 28. Any guide telling you to
install a plugin is for v4.

**What port does OBS WebSocket use?**
4455 by default in v5. The old v4 plugin used 4444.

**Where do I find the OBS WebSocket password?**
Tools → WebSocket Server Settings → Show Connect Info.

**Can I use it from another computer?**
Yes, over your local network, using the streaming PC's LAN IP rather than
localhost. Do not expose it to the internet.
