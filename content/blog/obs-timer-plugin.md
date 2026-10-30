---
title: "OBS Timer Plugin: The Built-In Countdown Script vs Ashmanix"
description: "OBS already ships a countdown timer script under Tools → Scripts. When that is enough, when you want the Ashmanix Countdown Timer plugin instead, and how to set each one up."
date: "2026-10-30"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Automation"]
---

**You may not need an OBS timer plugin: OBS Studio ships a countdown timer
script, `countdown.lua`, that you load under Tools → Scripts and point at a text
source.** It counts down a duration you set and shows a final message at zero —
enough for "Starting soon" and "Back in 5". If you want several timers, a count
*up*, a dockable control panel, or a scene switch when the timer hits zero,
install the Ashmanix Countdown Timer plugin. Both are covered below, with what
each one cannot do.

## Option 1: the countdown script that ships with OBS

OBS's scripting guide says two example scripts ship with every install, in the
`data/obs-plugins/frontend-tools/scripts` folder under your OBS installation.
The folder on current builds actually holds a few, including
`countdown.lua`, `clock-source.lua`, `instant-replay.lua`, `pause-scene.lua`
and `url-text.py`. The countdown one is the timer.

To use it:

1. Add a **Text (GDI+)** source to the scene where the timer should appear.
   The script writes into an existing text source; it does not create one.
2. Open **Tools → Scripts** and click **+**.
3. Browse to the OBS installation folder, then
   `data\obs-plugins\frontend-tools\scripts`, and pick `countdown.lua`.
   On Windows that is usually under `C:\Program Files\obs-studio\`.
4. Select the script in the list. Its settings appear on the right:
   **Duration (minutes)**, the **Text Source** to write to, the **Final Text**
   shown when the timer reaches zero, and a **Reset Timer** button.
5. The script also registers a reset hotkey. Bind it under
   **Settings → Hotkeys** if you want to restart the countdown without opening
   the Scripts window.

It is Lua, so nothing extra to install — Lua is embedded in OBS. The timer
restarts when the scene containing the text source becomes active, which is
exactly what a Starting Soon scene wants and exactly what a timer you need to
keep running across scenes does not.

**What it cannot do:** run more than one timer, count up, count down to a
clock time ("live at 8 pm"), or trigger anything at zero beyond changing the
text.

## Option 2: the Ashmanix Countdown Timer plugin

[Ashmanix Countdown Timer](https://obsproject.com/forum/resources/countdown-timer.1610)
is the plugin most people mean by "OBS timer plugin". As listed on its OBS
forum page at version 2.2.0, it needs OBS 31.1.0 or newer, runs on Windows,
macOS and Linux (64-bit), and the source is on GitHub.

What it adds over the script:

- **A dockable panel** with the timer controls, so you start, pause and reset
  from the OBS window rather than from the Scripts dialog.
- **Multiple timers**, each counting up or down.
- **A period timer** in days, hours, minutes and seconds, with an option for a
  steady one-second increment.
- **Actions at zero:** display a message, or switch scenes when a timer
  reaches zero.
- **Output formatting** (version 2.2.0 added an option to split the output into
  parts).

It still writes into a **text source** you create, like the script.

### Installing it on Windows

The current version is no longer an installer. Per the plugin page:

1. Download the Windows zip from the forum resource page and unzip it.
2. Copy the plugin folder into `C:\ProgramData\obs-studio\plugins`. Create the
   `obs-studio\plugins` folders if they do not exist. This is the location OBS's
   own plugins guide now recommends for every plugin; the old
   `C:\Program Files\obs-studio\obs-plugins\64bit` path still works but is
   marked as stopping in a future version.
3. If you had an older Ashmanix version installed with the previous Windows
   installer, remove those files first — the page warns they interfere with the
   new one.
4. Restart OBS. The timer appears under the **Docks** menu.

Users on the plugin's thread have reported that a target time already in the
past will not start in time mode, and that the timer uses timestamps, so if OBS
lags the display can jump a few seconds rather than drift. Check the thread for
the state of any bug before relying on a feature on air.

## Which one to pick

| You want | Use |
| --- | --- |
| "Starting in 5:00" on one scene | The built-in `countdown.lua` |
| A countdown that keeps running across scenes | Ashmanix |
| Count-up ("stream has been live for…") | Ashmanix |
| A switch to your main scene when the countdown ends | Ashmanix, or an Advanced Scene Switcher **Timer** condition |
| The current time of day on screen | The bundled `clock-source.lua` |

For the scene-switch case, the [Advanced Scene Switcher plugin](/blog/obs-advanced-scene-switcher-guide)
has a **Timer** condition and a **Date and time** condition, which is the better
tool if the timer is really a scheduling rule rather than something viewers
should see.

## Timer not showing? Check these

- **No text appears.** The script or plugin writes into a text source; make
  sure one exists in the scene and is selected in the settings.
- **The script is not in the list after adding it.** Lua scripts load without
  extra setup. If you picked a Python script instead, OBS needs a matching
  Python install and its path set on the **Python Settings** tab of the Scripts
  window — see [OBS scripts: what they are and which to install](/blog/obs-scripts-guide).
- **The plugin does not appear under Docks.** Check the OBS version against the
  plugin's minimum (31.1.0 for the current release), confirm the folder landed
  in `C:\ProgramData\obs-studio\plugins`, and remove any files from an older
  installer version.
- **The countdown restarts every time you switch scenes.** That is the bundled
  script's behaviour by design. Use the plugin if you need the timer to persist.

## One timer you do not need to set up

If the countdown is only there so you remember to leave the Starting Soon
screen, a rule can do that instead of a clock: Advanced Scene Switcher's Timer
condition cuts to your main scene after the interval, and
[streamerOS](/features/scene-switcher) switches scenes on the other end of the
stream — when chat spikes — rather than on a schedule. Timers are for viewers;
automation is for the switch itself.

## Frequently Asked Questions

**Does OBS have a built-in timer?**
Yes, as a script: `countdown.lua` ships with OBS under
`data/obs-plugins/frontend-tools/scripts`. Load it from Tools → Scripts and point
it at a text source. There is no timer source in the Sources menu.

**What is the best OBS countdown timer plugin?**
Ashmanix Countdown Timer is the widely used one: a dockable panel with multiple
up or down timers and scene switching at zero. Version 2.2.0 needs OBS 31.1.0 or
newer.

**Can an OBS timer switch scenes when it reaches zero?**
The Ashmanix plugin can, and Advanced Scene Switcher's Timer condition can
switch on an interval without showing a timer at all. The bundled script only
changes the text.

**Where do OBS plugins go on Windows?**
`C:\ProgramData\obs-studio\plugins`, per OBS's plugins guide, each plugin in its
own folder with `bin` and `data` subfolders.
