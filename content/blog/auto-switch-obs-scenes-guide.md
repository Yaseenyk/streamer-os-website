---
title: "How to Auto-Switch OBS Scenes, Including From Chat Activity"
description: "Make OBS switch scenes automatically with the built-in switcher, Advanced Scene Switcher macros or a chat-driven tool, plus rules that stop misfires."
date: "2026-09-09"
updated: "2026-10-22"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Automation"]
---

**To make OBS switch scenes automatically without scripting, use OBS's built-in
Automatic Scene Switcher (Tools menu) for window-based rules, or install the free
Advanced Scene Switcher plugin for anything richer — processes, audio, media,
time and more.** Switching on chat activity needs a separate tool that reads your
chat. All three are covered below, plus the three rules that stop automation from
looking broken.

Switching scenes by hand is fine until the moment it matters. The raid lands,
chat erupts, and your hands are on WASD — so either you miss the switch or you
miss the play.

## What can actually trigger a switch

Anything your PC can observe:

* **A process starting or stopping.** The game launches → cut to Gameplay. It
  closes → cut to Be Right Back. The most reliable trigger there is, because
  process state is unambiguous.
* **Window focus.** You alt-tab to a browser → cut away from the capture, so
  your viewers never see your inbox.
* **[Chat velocity](/blog/what-is-chat-velocity).** Messages per second jumping past your normal pace → cut to
  a reaction or facecam scene, because something just happened.
* **[Chat sentiment](/blog/how-to-read-chat-sentiment-in-real-time).** The mood of the room turning, which often precedes the
  velocity spike.
* **Time.** Starting soon → live, after a countdown.

The first two are what most tools mean by scene automation. The chat-driven ones
are the interesting ones, because they react to your *audience* rather than to
your machine — which means something has to be reading chat in the first place,
and [showing you what it sees](/features/live-cockpit).

## Option 1: OBS's built-in Automatic Scene Switcher

Free, already installed, and enough if your rules are "this window is focused →
show this scene".

1. In OBS, open **Tools → Automatic Scene Switcher**.
2. Pick a window title from the list and the scene it should switch to, then add
   the rule. Repeat for each window.
3. Choose what happens **when no window matches**: either don't switch, or
   switch to a fallback scene such as Be Right Back.
4. Set the check interval, and press **Start**.

Its limit is in the name: it only knows which window has focus. It cannot react
to a process starting in the background, your mic, or your chat.

### OBS Automatic Scene Switcher not working? Check these

When the built-in switcher does nothing, it is almost always one of these:

* **It was never started.** Adding rules is not enough — the switcher only runs
  after you press **Start** in its window. After restarting OBS, open the window
  again and check it still says it is running.
* **The window title changed.** The rule matches the window's title text.
  Browsers change the title with every tab, and many games show a launcher window
  first and the game window second. Pick the title the window has *while you
  play*, not the one it had when you set the rule up.
* **"When no window matches" is fighting you.** If that is set to switch to a
  fallback scene, every alt-tab to an unlisted window cuts away. Set it to
  **Don't switch** while you test.
* **Two switchers are running at once.** If Advanced Scene Switcher is also
  installed and running, the two can undo each other's switches. Use one.
* **The game is not a window OBS can see by title.** Some full-screen games and
  overlays report generic titles. Try running the game borderless windowed, or
  switch on the game's process instead (Option 2 below).

## Option 2: Advanced Scene Switcher (free plugin)

[Advanced Scene Switcher](https://obsproject.com/forum/resources/advanced-scene-switcher.395/)
is the long-running community plugin for this, and it is open source
([source on GitHub](https://github.com/WarmUpTill/SceneSwitcher)). It replaces
"window → scene" with **macros**: one or more conditions, and the actions to run
when they are true.

1. Install the plugin for your OBS version from its resource page, and restart
   OBS.
2. Open **Tools → Advanced Scene Switcher** and go to the **Macro** tab.
3. Add a macro, add a condition — for example **Process** is running, with your
   game's executable — and add an action: **Switch scene** to Gameplay.
4. Add the inverse macro (process not running → Be Right Back), so the switch
   has a way home.

Conditions cover far more than windows — running processes, audio levels, media
state, time of day and idle time among them — and macros can be combined. It is
the right tool for machine-side rules, and it is free. The full walkthrough,
with five macro recipes, is in the
[Advanced Scene Switcher guide](/blog/obs-advanced-scene-switcher-guide).

## Option 3: Switch scenes from chat activity

Reacting to your *audience* rather than your machine needs something that reads
chat and talks to OBS. Advanced Scene Switcher's Twitch condition can react to
individual chat messages and events like new subscribers, but not to how *busy*
chat is. For that you need a tool that measures chat speed and controls OBS
through its built-in [WebSocket server](/blog/obs-websocket-setup-guide).

**A toolkit like Streamer.bot.** Local, free and extremely capable — you build
the logic in its action system. Worth learning if automation is the point for
you; steep if you just want a couple of rules. There is a side-by-side in
[streamerOS vs Streamer.bot](/vs/streamer-bot), and one for [SAMMI](/vs/sammi).

**A ready-made rule editor.** streamerOS's [Auto-Hype Director](/features/auto-hype)
is one: it [connects over WebSocket v5](/features/obs-bridge) and switches a
scene when chat velocity or a Super Chat amount crosses a threshold you set.
It runs locally and is a paid Windows app, so try the free options above first
if your rules are machine-side.

## The three rules that keep it from looking broken

This is the part most guides skip, and it is what separates automation that
feels magic from automation that feels faulty.

**1. Threshold against your own baseline, not a fixed number.** "Switch when
chat exceeds 20 messages per second" is meaningless — for one channel that never
happens, for another it is a Tuesday. The trigger should be a jump relative to
*your* normal pace.

**2. Always have a cooldown.** Without one, a spike that hovers around the
threshold switches scenes repeatedly for as long as it lasts. Thirty to sixty
seconds of enforced calm after a switch is usually right.

**3. Automate the return too.** A rule that cuts to a reaction scene and never
comes back leaves you stranded there. Every automatic switch needs a defined way
home — a timer, or the inverse condition.

## Test it before you go live

Whatever tool you use, rehearse the rules where a misfire costs nothing:

1. Start an unlisted or private stream, or simply run OBS without going live.
2. Trigger each condition on purpose — launch the game, alt-tab, or have a
   friend send a burst of messages in your chat.
3. Watch for two failure modes: a rule that never fires, and a rule that flips
   back and forth. The second one almost always means a missing cooldown.
4. Keep a manual scene hotkey on your keyboard for the first few real streams.

## Start with two rules, not ten

The failure mode of anyone new to this is building fifteen rules in an evening
and turning the whole thing off a week later because the stream felt out of
control.

Start with:

1. **Game launches → Gameplay scene.** Boring, reliable, saves a click every
   single stream.
2. **Chat spikes → reaction scene, with a 60-second cooldown.** The one that
   actually catches moments.

Live with those for a few streams. Add a third only when you notice a switch you
keep making by hand.

## Frequently Asked Questions

**Can OBS switch scenes automatically on its own?**
Yes, on window focus, using the built-in Automatic Scene Switcher under Tools.
For processes, audio, media or time, use the free Advanced Scene Switcher
plugin, which can also react to single Twitch chat messages and events.
Switching when chat gets busy needs a tool that measures chat speed and controls
OBS over WebSocket.

**Where is the Automatic Scene Switcher in OBS?**
In the **Tools** menu. If you installed Advanced Scene Switcher, it appears in
the same menu as a separate entry.

**Do I need to write scripts?**
No. Rule-based tools cover the common cases without code.

**Will automation add lag to my scene switches?**
Not if the decision is made locally. A cloud round trip does add visible delay
at exactly the wrong moment; a local tool switches in the same frame.

**What if the automation fires at a bad time?**
Keep a manual override on a hotkey, and use cooldowns. Automation should reduce
your workload, not take the controls away.
