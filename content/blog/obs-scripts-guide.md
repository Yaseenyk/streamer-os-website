---
title: "OBS Scripts: What They Are and Which to Install"
description: "OBS scripts are Lua or Python files loaded under Tools → Scripts that add small features without a plugin. How they differ from plugins, the five that ship with OBS, and how to vet one before installing it."
date: "2026-10-30"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Automation"]
---

**OBS scripts are small Lua or Python programs that OBS Studio loads under Tools
→ Scripts to add features without installing a plugin: countdown timers, clocks,
an instant-replay hotkey, text pulled from a URL.** Lua scripts run with nothing
extra installed; Python scripts need a separate Python install that OBS's guide
currently lists as 3.6 to 3.12. Start with the scripts that ship with OBS, then
add community ones from the OBS forum after reading their source. The
difference from plugins, and how to tell a safe script from a risky one, is
below.

## Scripts vs plugins

Both extend OBS. They are built and installed differently:

| | Script | Plugin |
| --- | --- | --- |
| What it is | A text file, `.lua` or `.py` | A compiled library (`.dll` on Windows) |
| Where it loads | **Tools → Scripts**, press **+** | Copied into the plugins folder, loaded at startup |
| Needs installing | Lua: no. Python: a matching Python install | Yes, and the build must match your OBS version |
| Can you read it | Yes, it is source code | Not without the author's repository |
| Typical job | A timer, a clock, a hotkey, text from the web | New source types, encoders, docks, deep integrations |

OBS's scripting documentation says scripting has been available since OBS 21.0,
supports Python 3 and LuaJIT 2 (roughly Lua 5.2), and exposes the OBS API to
both through the `obslua` and `obspython` modules. The practical consequence:
a script can do most of what a small plugin does, and you can read exactly what
it is doing before you load it.

Plugins go in `C:\ProgramData\obs-studio\plugins` on Windows, per
[OBS's plugins guide](https://obsproject.com/kb/plugins-guide). Scripts can live
anywhere; OBS remembers the path you picked.

## How to add a script

1. Open **Tools → Scripts**.
2. Click **+** and choose the `.lua` or `.py` file.
3. Select it in the list. If the script exposes settings, they appear on the
   right-hand side of the window.
4. For Python scripts only: open the **Python Settings** tab and set the
   **Python Install Path**. The Python build must match OBS's architecture, so
   64-bit OBS needs 64-bit Python.

Scripts can be added, removed and reloaded while OBS is running. There is a
**Script Log** button for the messages a script prints, which is where you look
first when one does not work.

## The scripts that ship with OBS

OBS's scripting guide points to the bundled examples in
`data/obs-plugins/frontend-tools/scripts` inside the OBS installation folder.
On a current build the folder holds five:

- **`countdown.lua`** — a countdown timer written into a text source, with a
  final message at zero and a reset hotkey. The full setup is in
  [the OBS timer guide](/blog/obs-timer-plugin).
- **`clock-source.lua`** — a clock source. It is the Lua-only kind of script:
  the documentation notes that script-defined *sources* are Lua only.
- **`instant-replay.lua`** — a hotkey that saves the replay buffer and plays
  the saved clip in a media source. It needs the replay buffer running; see
  [OBS replay buffer settings](/blog/obs-replay-buffer-settings-the-setup-that-works).
- **`pause-scene.lua`** — pauses recording while a chosen scene is active, so a
  BRB scene does not end up in the file.
- **`url-text.py`** — fetches text from a URL into a text source on an interval.
  It is Python, so it is also the quickest way to check that your Python path is
  set correctly.

These five are worth loading before you look anywhere else. They are maintained
with OBS, they show what scripts are for, and reading them teaches the shape of
every other script you will meet: a `script_description()` for the Scripts
window, `script_properties()` for the settings panel, `script_update()` when a
setting changes, and a timer or hotkey for the actual work.

## Which community scripts to install

The OBS forum's Resources section hosts scripts alongside plugins. Rather than
a list that will be out of date in a month, here is how to pick:

1. **Prefer Lua for small jobs.** No Python install, no architecture mismatch,
   and script-defined sources only work in Lua anyway.
2. **Read the source.** A script is a text file; open it. You are looking for
   two things: any network call you did not expect, and anything heavy inside
   `script_tick()`. The documentation warns that `script_tick` runs every frame
   and that logging from it can make OBS unresponsive almost immediately. It
   also advises timers over `script_tick`, and says `script_tick` is not
   recommended in Python at all because of the interpreter lock.
3. **Check it was updated for your OBS version.** Scripts break less often
   than plugins across OBS releases, but the API does change.
4. **One at a time.** If OBS crashes at startup after adding a script, you
   cannot disable it from the Scripts window because OBS never gets that far.
   The guide's fix is to rename the script file so OBS cannot load it, start
   OBS, and remove it from the list.

## When a script is the wrong tool

Scripts run inside OBS and see what OBS sees: scenes, sources, hotkeys,
recording state. They do not see your Twitch or YouTube chat, your game, or
anything outside the OBS process unless they fetch it themselves — which is
where `url-text.py` style polling, and its CPU cost in `script_tick`, start to
hurt.

For anything that needs to watch something outside OBS and act on it, the
cleaner design is a separate program talking to OBS over its built-in
[WebSocket server](/blog/obs-websocket-setup-guide). That is how Streamer.bot,
SAMMI and [streamerOS](/features/obs-bridge) work: the logic runs in its own
process, OBS just receives "switch to this scene". streamerOS in particular
reads chat and [switches scenes when chat spikes](/features/scene-switcher)
without a script or plugin inside OBS; it is a Windows app, $29 once after a
free trial, launching February 2027. If what you want is a timer or a clock,
you do not need any of that — load the bundled script and move on.

## Frequently Asked Questions

**Are OBS scripts safe?**
As safe as what is in them, and you can read what is in them. The OBS
documentation notes that the bindings expose the whole API, so a badly written
script can leak memory or crash OBS. Read the source, avoid heavy work in
`script_tick`, and add one script at a time.

**What version of Python does OBS need?**
OBS's scripting guide currently lists Python 3.6 to 3.12 and says to check the
scripting documentation for the supported version. The Python build must match
OBS's architecture (64-bit for 64-bit OBS), and the path is set on the Python
Settings tab of the Scripts window.

**Do scripts work on OBS for macOS and Linux?**
Yes. Scripting is part of OBS Studio on all three platforms; only the Python
install path differs.

**Can an OBS script switch scenes automatically?**
Yes, from anything OBS can see — a hotkey, a timer, a scene becoming active. For
triggers outside OBS, such as a game launching or chat activity, see
[how to auto-switch OBS scenes](/blog/auto-switch-obs-scenes-guide).
