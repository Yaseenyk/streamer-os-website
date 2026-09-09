import type { Shot } from '@/components/ProductShot';

// Every real capture of the app, described once. Alt text says what is on the
// screen — a screen reader should get the same information a sighted visitor
// does, not the marketing line that happens to sit next to it.
//
// Captured from the product repo in simulation mode; see
// public/screenshots/README.md for how to retake them.
export const SHOTS = {
  dashboard: {
    src: '/screenshots/dashboard.png',
    width: 1600,
    height: 968,
    alt: 'The streamerOS cockpit during a live stream, with chat triage, super chat revenue, live sentiment, an AI producer digest and the OBS scene switcher side by side',
    caption: 'The cockpit, mid-stream',
    mobile: { src: '/screenshots/dashboard-m.png', width: 880, height: 1253 },
  },
  autoDirector: {
    src: '/screenshots/auto-director.png',
    width: 1600,
    height: 993,
    alt: 'The Auto-Hype Director node canvas with a chat velocity trigger connected through an AND gate into an OBS scene switch action',
    caption: 'Trigger, logic, action — no scripting',
    mobile: { src: '/screenshots/auto-director-m.png', width: 880, height: 305 },
  },
  viralMoments: {
    src: '/screenshots/viral-moments.png',
    width: 1600,
    height: 685,
    alt: 'The streamerOS velocity monitor charting live chat messages per second against the stream baseline, with the heat ratio called out',
    caption: 'A hype spike, measured live',
    mobile: { src: '/screenshots/viral-moments-m.png', width: 880, height: 730 },
  },
  obsBridge: {
    src: '/screenshots/obs-bridge.png',
    width: 1600,
    height: 395,
    alt: 'The streamerOS OBS Bridge with a connected OBS instance and five scenes synced into a stream deck',
    caption: 'Connected over WebSocket v5',
    mobile: { src: '/screenshots/obs-bridge-m.png', width: 700, height: 258 },
  },
  clipLibrary: {
    src: '/screenshots/clip-library.png',
    width: 1600,
    height: 425,
    alt: 'The streamerOS Clip Library listing local recordings ranked by hype score, with per-clip chat peaks and event counts',
    caption: 'Ranked by what chat actually did',
    mobile: { src: '/screenshots/clip-library-m.png', width: 880, height: 729 },
  },
  sponsorCrm: {
    src: '/screenshots/sponsor-crm.png',
    width: 1600,
    height: 587,
    alt: 'The streamerOS sponsor pipeline with leads across prospect, contacted, negotiating and won stages and a running open-pipeline total',
    caption: 'Every deal, every stage',
    mobile: { src: '/screenshots/sponsor-crm-m.png', width: 880, height: 968 },
  },
  chatArchive: {
    src: '/screenshots/chat-archive.png',
    width: 1600,
    height: 459,
    alt: 'The streamerOS Chat Archive searching saved stream chat held locally on the machine',
    caption: 'Your chat history, on your disk',
    mobile: { src: '/screenshots/chat-archive-m.png', width: 880, height: 562 },
  },
  aura: {
    src: '/screenshots/aura.png',
    width: 1600,
    height: 993,
    alt: 'The Aura Studio overlay gallery showing nine vibe-reactive OBS overlays with the active one highlighted',
    caption: 'Overlays that react to the room',
    mobile: { src: '/screenshots/aura-m.png', width: 880, height: 515 },
  },

  // Panel-level detail — the individual widgets, cropped out of the cockpit.
  chatTriage: {
    src: '/screenshots/panel-chat-triage.png',
    width: 760,
    height: 1032,
    alt: 'The Chat Triage panel with 180 messages tagged across viewers, members and Super Chats, including a highlighted Super Chat and a membership milestone',
    caption: 'Chat, tagged as it lands',
  },
  sentiment: {
    src: '/screenshots/panel-sentiment.png',
    width: 900,
    height: 304,
    alt: 'The Sentiment Horizon panel reading INSANE at 0.59 with a live coloured waveform of recent chat sentiment',
    caption: 'The mood of the room, live',
  },
  revenue: {
    src: '/screenshots/panel-revenue.png',
    width: 900,
    height: 363,
    alt: 'The Stream Revenue panel totalling ten Super Chats for the stream with a currency selector',
    caption: 'Super Chats, tallied live',
  },
  topChatters: {
    src: '/screenshots/panel-top-chatters.png',
    width: 900,
    height: 283,
    alt: 'The Top Chatters panel ranking the two most active viewers by message count alongside a unique chatter total',
    caption: 'Who is actually talking',
  },
  sceneSwitcher: {
    src: '/screenshots/panel-scene-switcher.png',
    width: 900,
    height: 205,
    alt: 'The OBS Scene Switcher panel listing five scenes with the live scene highlighted',
    caption: 'Scenes, one click away',
  },
  obsConnection: {
    src: '/screenshots/panel-obs-connection.png',
    width: 700,
    height: 258,
    alt: 'The OBS Connection card showing a connected instance running Cyberpunk2077 at 1.8% CPU with five scenes synced',
    caption: '1.8% CPU under a live game',
  },
  streamDeck: {
    src: '/screenshots/panel-stream-deck.png',
    width: 1100,
    height: 293,
    alt: 'The streamerOS stream deck with five OBS scenes as buttons and the live scene marked',
    caption: 'Your scenes as a deck',
    mobile: { src: '/screenshots/stream-deck-m.png', width: 880, height: 326 },
  },
  velocityStats: {
    src: '/screenshots/panel-velocity-stats.png',
    width: 1400,
    height: 478,
    alt: 'The velocity monitor showing messages per second, the stream baseline and the resulting heat ratio above a live chart of chat traffic',
    caption: 'Messages per second against your baseline',
    mobile: { src: '/screenshots/viral-moments-m.png', width: 880, height: 730 },
  },
} as const satisfies Record<string, Shot>;
