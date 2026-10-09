import type { Metadata } from 'next';
import { Coins, MonitorPlay, Scissors, Wallet } from 'lucide-react';
import UseCaseLayout from '@/components/UseCaseLayout';
import { SHOTS } from '@/lib/shots';

// Most companion tools are Twitch-first and treat YouTube as a port. The
// honest caveat that has to appear here: YouTube chat is read from the live
// chat page open in the streamer's own browser, not from an API — a real
// benefit (no key, no quota) and a real constraint (the tab has to be open).
export const metadata: Metadata = {
  title: 'Stream automation for YouTube Live',
  description:
    'Super Chat revenue totalled live and per currency, YouTube chat read on ' +
    'your own PC with no API key, hype spikes marked for clipping, and OBS ' +
    'scenes that switch themselves.',
  alternates: { canonical: 'https://streamerosai.com/for/youtube-live' },
};

export default function YouTubeLivePage() {
  return (
    <UseCaseLayout
      crumb={{ name: 'For YouTube Live', path: '/for/youtube-live' }}
      kicker="For YouTube Live"
      title="Built for YouTube, not ported to it."
      intro="Most stream tools were written for Twitch and grew a YouTube tab later. streamerOS treats Super Chats as money worth tracking, reads your live chat without an API key, and turns the moment chat reacted into a vertical short."
      problem={{
        heading: 'The YouTube streamer’s blind spot',
        paragraphs: [
          'Super Chats arrive in whatever currency the viewer happens to use. YouTube shows each one as it lands and then it is gone up the scroll — so the question "what did this stream actually make?" has no answer until you go digging through the dashboard afterwards.',
          'Meanwhile the chat tools built for Twitch want an API key, a quota and an OAuth dance before they will read a single message, and half of them still cannot see a membership milestone.',
          'streamerOS keeps a running ledger of every Super Chat with a per-currency breakdown, reads your live chat from the page already open in your browser, and marks the moments your chat reacted so the clip is ready when you stop.',
        ],
      }}
      cards={[
        {
          icon: Wallet,
          title: 'A Super Chat ledger, not a scroll',
          body: 'Every Super Chat for the stream, totalled live, with a per-currency breakdown and exchange rates you can edit yourself.',
        },
        {
          icon: MonitorPlay,
          title: 'Live chat with no API key',
          body: 'Chat is read from the YouTube live chat page already open in your own browser, on your PC. No Google quota, no OAuth, no key to paste in.',
        },
        {
          icon: Coins,
          title: 'Super Chats that trigger your scenes',
          body: 'A Super Chat crossing an amount you choose can switch the OBS scene, play a sound, change the overlay mood or save the replay buffer.',
        },
        {
          icon: Scissors,
          title: 'Stream to short, locally',
          body: 'Hype spikes are marked while you are live, the Clip Library ranks recordings by what chat did, and Shorts Factory cuts a 16:9 VOD down to 9:16 on your own machine.',
        },
      ]}
      shots={{
        heading: 'What a YouTube stream looks like in the cockpit',
        blurb: 'Real captures: the revenue ledger, chat triage and clips ranked by chat reaction.',
        items: [SHOTS.dashboard, SHOTS.revenue, SHOTS.chatTriage, SHOTS.clipLibrary, SHOTS.viralMoments, SHOTS.sponsorCrm],
      }}
      notFor={{
        heading: 'Where the edges are',
        intro:
          'Reading chat from your browser rather than from an API is a trade, not a free win, and there are things this is simply not:',
        items: [
          'The YouTube live chat page has to be open in your browser for chat to be read. Close the tab and the cockpit stops seeing messages.',
          'Channel statistics such as subscriber count are the one part that does use the YouTube Data API, and only if you add your own key. Without one, you get chat and Super Chats but not channel stats.',
          'It is not a YouTube channel manager. No uploading, no scheduling, no thumbnails published for you, no replying to comments on your VODs.',
          'It reads chat and never posts to it — no bot commands, no auto-replies, no moderation.',
          'Twitch and YouTube only. Kick is not supported; Streamer.bot is, and it is free.',
          'Windows only, and not released until February 2027.',
        ],
      }}
      faq={[
        {
          q: 'Do I need a YouTube API key to use streamerOS?',
          a: 'Not for chat. Your live chat is read from the YouTube page already open in your own browser, on your PC, so there is no key, no quota and no OAuth. A key is optional and only used if you want channel statistics such as subscriber count, in which case it is stored in Windows Credential Manager rather than in a file.',
        },
        {
          q: 'Does it track Super Chat revenue?',
          a: 'Yes. Every Super Chat in the stream is kept in a running ledger with a per-currency breakdown and an approximate total, using exchange rates you can edit. It is also a trigger: a Super Chat over an amount you choose can switch your OBS scene, play a sound or save the replay buffer.',
        },
        {
          q: 'Can it turn my YouTube streams into Shorts?',
          a: 'That is what Shorts Factory does, and it runs on your machine rather than uploading your VOD anywhere. Hype spikes are marked while you are live so the moments worth cutting are already flagged, and a 16:9 recording is cropped to 9:16 and encoded locally.',
        },
        {
          q: 'Does it work with both Twitch and YouTube at once?',
          a: 'Yes, both are supported. Twitch chat is read over an anonymous, read-only connection, and YouTube chat from the live chat page in your browser. Kick is not supported.',
        },
      ]}
      cta={{
        heading: 'Know what the stream made before you close OBS',
        body: 'streamerOS v1.0 arrives in February 2027 for Windows 10 and 11.',
      }}
    />
  );
}
