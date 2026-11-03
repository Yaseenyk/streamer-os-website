---
title: "OBS Mic Too Quiet? Measure Before You Boost"
description: "My laptop mic was about 16 times too quiet for the speech test I was running, and I blamed my code for a day. How to measure your level and fix a quiet mic in Windows and OBS."
date: "2026-11-04"
author: "Yaseen Khatib"
tags: ["Guides", "OBS Studio", "Audio"]
---

**Short answer:** If your mic is too quiet in OBS, fix the level at the source before you boost it in software. Check the input volume in Windows, bring the mic closer, then watch the OBS Audio Mixer: speech should reach the upper yellow range. Add a Gain filter only for what is still missing, and expect the noise to rise too.

## The test that kept failing

On 11 June 2026 I was testing Brand Guard, a streamerOS feature that listens to your microphone and flags words your sponsor deal rules out. The test was simple. Say a banned word near the mic, watch the counter tick up. I said it. The counter did not move.

So I went looking for a bug, and I found a real one. The speech model recognised the word and then threw the result away, because of a quirk in how it handled timestamps. I fixed that one and wrote it up in the log.

But that was not the only reason for the misses, and the line in my test log that ended the confusion says so: the earlier misses were all down to audio level, not code. The microphone was a far-field array built into a laptop. Speech needed an RMS level of about 0.05 to be read reliably. Mine was around 0.003.

RMS is the average loudness of a stretch of audio, on a scale from 0 to 1. My calculation, not the log's: 0.05 against 0.003 is roughly 16 times in amplitude, or about 24 dB. I had been debugging software while the microphone was shouting from the other end of a tunnel.

When the signal was healthy the chain worked. On a later run the same diagnostic probe read an RMS of 0.147, and the transcript came back as "Go Go Go Pepsi Pepsi Go!" with two detections. The code had been fine at that step all along.

## A caveat before you copy me

My measurement was for speech recognition, not for stream audio. A viewer's ear and a speech model need different things, and I am not claiming 0.05 is a target for your stream. What carries over is the shape of the problem: **a mic can be present, selected and "working" and still be far too quiet.** The fix is to measure, not to guess.

## Step 1: look at the meter, not the slider

Open OBS and look at the **Audio Mixer** dock. Talk at your normal streaming volume and watch the bar for your mic. OBS's own [audio mixer guide](https://obsproject.com/kb/audio-mixer-guide) describes the zones in words: audio in the red zone is close to clipping, speech should reach the lower end of the red area or sit in the upper range of yellow, and everything else, like music and alert sounds, belongs in green.

If your voice only just lights the green, you are too quiet. If it hits red, you are too loud. A meter that moves while the fader is at 100% tells you more than the fader ever will.

## Step 2: fix it at the source

Software gain amplifies whatever arrives, noise included. So work upstream first, in this order:

1. **Distance.** My laptop array was built for far-field pickup. A headset or desk mic a hand's width from your mouth is worth more than any slider. This is the single biggest change.
2. **Windows input level.** Open **Settings → System → Sound**, select your microphone under Input and open its properties to find the Input volume slider. OBS's guide says to aim for the Windows recording level at or around 0 dB for the least clipping.
3. **The right device.** In OBS, check the source is the microphone you think it is. Laptops often list several inputs.

Do these three, then look at the meter again. Often that is the whole fix.

## Step 3: gain, only for what is left

If the meter is still low, you can add gain inside OBS. There are two ways, and I am describing them from how the program is laid out, not from a measurement of my own:

- **Advanced Audio Properties.** Under **Edit**, OBS lets you enter a custom volume percentage well above 100%, per the audio mixer guide.
- **A Gain filter.** Right-click the mic in the Audio Mixer, open **Filters**, and add a Gain filter with a few decibels of boost.

Either way, raise it in small steps and keep watching the meter. Amplification multiplies the room noise along with your voice, so if the background rises with it, go back to Step 2 and fix the distance. A noise suppression filter after the gain can tidy up, but I have not measured how well it does, so I will not promise a result.

## The turning point

The moment I stopped debugging code and measured the signal, the problem shrank to a one-line cause: the level was far too low. The lesson I took from it is that a miss at the mic should be checked at the meter first.

## What I would do again

1. **Check the level before the software.** Meter first, settings second, code last.
2. **Put numbers on it.** "Quiet" is a feeling; an RMS or an Audio Mixer reading is a fact.
3. **Move the mic before you move a slider.**
4. **Set Windows input volume first,** then OBS gain, never both at full boost.
5. **Raise gain in small steps,** and look at the noise as well as the voice.
6. **Re-test with real speech,** at the volume and distance you will actually use on stream.

streamerOS is a Windows app launching in February 2027, and [Brand Guard](/features/brand-guard) transcribes locally on your PC. The signup box below is the pre-registration list. If you are setting up OBS for the first time, [what streamerOS asks of your PC](/features/performance) is a good place to see how much headroom to leave.

## Frequently asked questions

**Why is my mic so quiet in OBS but fine in Discord?**
Different apps apply different processing and gain. Check the Windows input volume and the OBS meter, since OBS shows the signal it actually receives.

**How loud should my mic be in OBS?**
OBS's guide says speech should sit in the upper yellow range of the meter, reaching toward the lower end of red, without clipping.

**Is boosting the gain in OBS bad?**
Not by itself, but it raises background noise along with your voice. Fix distance and the Windows level first.

**Does a quiet mic affect Brand Guard?**
In my testing, yes: speech recognition missed words when the signal was far too low.
