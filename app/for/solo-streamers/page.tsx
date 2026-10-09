import type { Metadata } from 'next';
import { Eye, Layers, ScanLine, Sparkles } from 'lucide-react';
import UseCaseLayout from '@/components/UseCaseLayout';
import { SHOTS } from '@/lib/shots';

// The thing to be scrupulous about here: streamerOS reads chat, it never
// writes to it. Someone streaming alone is exactly the person who would assume
// "chat tool" means a bot that moderates, so the page says otherwise twice —
// once in the disqualifiers and once in the FAQ.
export const metadata: Metadata = {
  title: 'Stream automation for solo streamers',
  description:
    'Streaming alone means playing, talking, watching chat and driving OBS at ' +
    'the same time. streamerOS takes the scene switching and the chat watching, ' +
    'so you can do the two that need a person.',
  alternates: { canonical: 'https://streamerosai.com/for/solo-streamers' },
};

export default function SoloStreamersPage() {
  return (
    <UseCaseLayout
      crumb={{ name: 'For solo streamers', path: '/for/solo-streamers' }}
      kicker="For solo streamers"
      title="No mods, no producer, no second monitor full of tabs."
      intro="When you stream alone you are the talent and the production crew at once. streamerOS runs the production half: it watches chat, switches your scenes when the room reacts, and marks the moment so the clip is waiting when you stop."
      problem={{
        heading: 'The part nobody sees',
        paragraphs: [
          'A big channel has a moderator watching chat, someone clipping highlights and sometimes a producer switching scenes. Streaming solo, all of that is you — while you are also playing the game and holding a conversation.',
          'So things get dropped. The Super Chat scrolls past during a fight. The funniest thing you did all month goes un-clipped because you were mid-sentence. You reach for a hotkey, miss, and the VOD has thirty seconds of the wrong scene.',
          'streamerOS does not replace you talking to your chat. It takes the jobs that are really just watching for something and reacting — the ones a person should not have to do while playing.',
        ],
      }}
      cards={[
        {
          icon: ScanLine,
          title: 'Chat, sorted as it lands',
          body: 'Super Chats, members, first-time chatters and the rest are tagged as they arrive, so what matters stays visible instead of scrolling away during a fight.',
        },
        {
          icon: Layers,
          title: 'Scenes that switch themselves',
          body: 'Build a rule once: when chat velocity or a Super Chat crosses a number you set, switch the scene, play a sound or save the replay buffer. No hotkey to reach for.',
        },
        {
          icon: Sparkles,
          title: 'Clips you did not have to catch',
          body: 'Hype spikes are marked against your channel baseline while you are live, and the Clip Library ranks your local recordings by what chat actually did.',
        },
        {
          icon: Eye,
          title: 'Read the room without reading every line',
          body: 'Sentiment Horizon scores the mood of chat on your own PC, so a glance tells you what a scroll would have.',
        },
      ]}
      shots={{
        heading: 'The cockpit a solo streamer watches',
        blurb: 'Real captures: chat triage, the automation canvas, and spikes marked live.',
        items: [SHOTS.dashboard, SHOTS.chatTriage, SHOTS.autoDirector, SHOTS.viralMoments, SHOTS.topChatters, SHOTS.sentiment],
      }}
      notFor={{
        heading: 'What it will not do for you',
        intro:
          'This is the part most pages leave out. streamerOS watches your chat — it does not participate in it:',
        items: [
          'It is not a chat bot. It never posts messages, runs commands or replies to viewers. Its connection to Twitch chat is anonymous and read-only, which is also why it needs no credentials from you.',
          'It does not moderate. There are no timeouts, no bans, no auto-mod rules. If you need moderation while you stream alone, you still need a bot or a human — Streamer.bot is free and does this well.',
          'It does not handle alerts, tipping or donation overlays. Keep whatever you already use for those.',
          'It will not talk to your chat when you go quiet. Nothing here fills a silence for you.',
          'Windows only, and not released until February 2027.',
        ],
      }}
      faq={[
        {
          q: 'Does streamerOS moderate my chat or ban people?',
          a: 'No. It reads chat and never writes to it — no timeouts, no bans, no commands, no replies. Its Twitch connection is anonymous and read-only, so it holds no credentials that could act as you. For moderation you still want a bot like Streamer.bot or a human moderator.',
        },
        {
          q: 'Can it replace a moderator?',
          a: 'For the watching part, largely yes: it tags Super Chats, members and first-time chatters as they arrive and scores the mood of the room, so you are not scrolling to find what matters. For the acting part — removing a message, timing someone out, answering a question — no. That still needs a person or a bot.',
        },
        {
          q: 'How does it know when to switch a scene?',
          a: 'You decide. A trigger node compares chat velocity in messages per second, or Super Chats, against a threshold you set, and connects to an action: switch the OBS scene, play a sound, change the overlay mood, mute an input, save the replay buffer or post to your own Discord webhook. Viral Moments shows your channel’s normal pace so you can pick a sensible number.',
        },
        {
          q: 'I already use Streamer.bot. Is this a replacement?',
          a: 'Not really — they do different jobs and run happily side by side. Streamer.bot is the better automation toolkit and it can post in chat. streamerOS is the cockpit: sentiment, revenue, hype spikes, clip ranking and a searchable archive, assembled rather than built. There is a full comparison on this site.',
        },
      ]}
      cta={{
        heading: 'Hand the production half over',
        body: 'streamerOS v1.0 arrives in February 2027 for Windows 10 and 11.',
      }}
    />
  );
}
