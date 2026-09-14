import type { Shot } from '@/components/ProductShot';

// Every real capture of the app, described once. Alt text says what is on the
// screen — a screen reader should get the same information a sighted visitor
// does, not the marketing line that happens to sit next to it.
//
// Captured from the product repo in simulation mode; see
// public/screenshots/README.md for how to retake them.
//
// Slots whose file does not exist yet are safe in <Screenshot> and
// <ScreenshotStrip> (both check the file at build time and skip it). They are
// NOT safe in a bare <ProductShot>, which renders the <img> regardless — only
// hand a ProductShot a shot whose PNG is already in public/screenshots/.
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
    alt: 'The Aura Studio overlay gallery showing vibe-reactive OBS overlays with the active one highlighted',
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

  // ---------------------------------------------------------------------------
  // Slots waiting for a capture (2026-09-11). The PNG does not exist yet, so the
  // width/height below are placeholders — set them to the real pixel size of
  // the file when it lands, or the frame reserves the wrong aspect ratio. The
  // shot list and how to stage each screen is in
  // docs/session-logs/2026-09-11.md.
  // ---------------------------------------------------------------------------
  revenueInr: {
    src: '/screenshots/panel-revenue-inr.png',
    width: 900,
    height: 363,
    alt: 'The Stream Revenue panel totalling a stream of Super Chats in rupees, with the per-currency breakdown underneath',
    caption: 'Every Super Chat, totalled in ₹',
  },
  chatArchiveSession: {
    src: '/screenshots/chat-archive-session.png',
    width: 1600,
    height: 900,
    alt: 'The Chat Archive with a labelled past stream open, a search filtering its messages and the export button in view',
    caption: 'Search, label, export',
  },
  aiSidekick: {
    src: '/screenshots/ai-sidekick.png',
    width: 1600,
    height: 900,
    alt: 'The streamerOS AI Sidekick chat panel answering a question about the current stream using live stats',
    caption: 'An assistant that knows your stream',
  },
  aiAction: {
    src: '/screenshots/panel-ai-action.png',
    width: 900,
    height: 600,
    alt: 'The AI Sidekick confirming it switched the OBS scene after being asked in plain language, with the action result shown',
    caption: 'Ask, and it acts',
  },
  hinglishChat: {
    src: '/screenshots/panel-hinglish-chat.png',
    width: 900,
    height: 600,
    alt: 'Chat Triage full of Hinglish messages, with Sentiment Horizon reading the mood of the room as positive',
    caption: 'Hinglish chat, read correctly',
  },
  creatorMemory: {
    src: '/screenshots/panel-creator-memory.png',
    width: 900,
    height: 600,
    alt: 'The AI Sidekick recalling a fact the streamer asked it to remember in an earlier session',
    caption: 'It remembers your channel',
  },
  viralEngine: {
    src: '/screenshots/viral-engine.png',
    width: 1600,
    height: 900,
    alt: 'The Viral Engine showing three AI-written YouTube title suggestions and a hashtag cloud generated from the live game and chat',
    caption: 'Titles and hashtags from your own chat',
  },
  thumbnailLab: {
    src: '/screenshots/panel-thumbnail-lab.png',
    width: 900,
    height: 600,
    alt: 'The Thumbnail Lab panel with a three-point thumbnail strategy: subject placement, colour palette and a bold text hook',
    caption: 'A thumbnail plan, not a guess',
  },
  auraScene: {
    src: '/screenshots/aura-scene.png',
    width: 1600,
    height: 900,
    alt: 'The Aura Scene editor with text, image and video layers arranged on a 1920 by 1080 transparent canvas',
    caption: 'Build the overlay in the app',
  },
  shortsFactory: {
    src: '/screenshots/shorts-factory.png',
    width: 1600,
    height: 900,
    alt: 'The Shorts Factory workspace with a VOD loaded, a hype marker on the timeline and a 9:16 crop preview',
    caption: 'From a 16:9 VOD to a 9:16 short',
  },
  brandGuard: {
    src: '/screenshots/brand-guard.png',
    width: 1600,
    height: 900,
    alt: 'Brand Guard listening to the microphone with a list of banned sponsor terms and an alert showing the matched word in context',
    caption: 'A warning before the sponsor hears it',
  },
  mediaKit: {
    src: '/screenshots/media-kit.png',
    width: 1600,
    height: 900,
    alt: 'The Media Kit Generator preview of a sponsor PDF with reach, watch-time and top-stream figures',
    caption: 'A sponsor deck from your own numbers',
  },
} as const satisfies Record<string, Shot>;
