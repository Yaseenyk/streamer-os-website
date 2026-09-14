import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Archive,
  BrainCircuit,
  Clapperboard,
  Coins,
  FileBarChart,
  Flame,
  Gauge,
  Handshake,
  Hash,
  LayoutDashboard,
  MessageSquareText,
  Mic,
  MonitorPlay,
  Palette,
  Scissors,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// The one feature catalog. The header menu, the footer, the /features grid and
// the SoftwareApplication featureList all read from here, so a feature can no
// longer exist on one surface and be missing from another — which is exactly
// how the site ended up advertising 4 things in its menu for a 17-feature app.
//
// Every line here has to be true of the build that ships in November. Checked
// against the product repo on 2026-09-11 (API_SPECIFICATION.md, the feature
// components, and the licence gates in src-tauri/src/services/licensing.rs).
// Some cards point at a section of a page (`#revenue`) rather than a page of
// their own: a thin page per widget would split authority the way the blog
// consolidation of 2026-09-09 was undoing.
// ---------------------------------------------------------------------------

export type FeatureCategoryId = 'live' | 'production' | 'automation' | 'intelligence' | 'business';

export interface FeatureCategory {
  id: FeatureCategoryId;
  /** Short label for menus. */
  label: string;
  /** Section heading on /features. */
  title: string;
  blurb: string;
}

export interface CatalogFeature {
  name: string;
  href: string;
  icon: LucideIcon;
  category: FeatureCategoryId;
  /** One short line for menus. */
  menu: string;
  /** What it does — the card body on /features. */
  tagline: string;
  /** The problem it removes — the card footer on /features. */
  pain: string;
}

export const CATEGORIES: FeatureCategory[] = [
  {
    id: 'live',
    label: 'Live',
    title: 'Run the stream from one screen.',
    blurb: 'Chat, money and mood in front of you while you play — and every word of it kept on your disk.',
  },
  {
    id: 'production',
    label: 'Production',
    title: 'Control OBS and your look.',
    blurb: 'Scene control and overlays without alt-tabbing out of the game.',
  },
  {
    id: 'automation',
    label: 'Automation',
    title: 'Hands off the keyboard.',
    blurb: 'Let the app watch the signals and do the repetitive work, during the stream and after it.',
  },
  {
    id: 'intelligence',
    label: 'Local AI',
    title: 'A brain that runs on your PC.',
    blurb: 'Local AI through Ollama on your own hardware — no cloud model, no per-message bill, no chat leaving the box.',
  },
  {
    id: 'business',
    label: 'Business',
    title: 'Get paid to stream.',
    blurb: 'The unglamorous revenue work — pitching sponsors and tracking deals — handled locally.',
  },
];

export const FEATURES: CatalogFeature[] = [
  // Live
  {
    name: 'Live Cockpit',
    href: '/features/live-cockpit',
    icon: LayoutDashboard,
    category: 'live',
    menu: 'Chat, revenue and mood on one screen.',
    tagline:
      'One screen for the stream: Chat Triage sorts viewers, members and Super Chats as they land, Top Chatters shows who is talking, and your OBS scenes sit one click away.',
    pain: 'No more juggling a chat pop-out, OBS and a revenue tab mid-game.',
  },
  {
    name: 'Super Chat Revenue',
    href: '/features/live-cockpit#revenue',
    icon: Coins,
    category: 'live',
    menu: 'Every Super Chat, totalled per stream.',
    tagline:
      'Each Super Chat is logged to a ledger on your PC and totalled per stream — exact per currency, plus an approximate total in ₹, $ or another currency at rates you set.',
    pain: 'Know what the stream earned before you hit End Stream.',
  },
  {
    name: 'Sentiment Horizon',
    href: '/features/live-cockpit#sentiment',
    icon: Activity,
    category: 'live',
    menu: 'The mood of your chat, live.',
    tagline:
      'A local AI model reads chat every couple of seconds and scores the room from toxic to hype — and it understands Hinglish.',
    pain: 'See the room turning before it shows up in your numbers.',
  },
  {
    name: 'Viral Moments',
    href: '/features/viral-moments',
    icon: Flame,
    category: 'live',
    menu: 'Hype spikes marked as they happen.',
    tagline:
      'Measures chat velocity against this stream’s own baseline, drops a marker on every spike and exports the timestamps to CSV for your editor.',
    pain: 'Every clip-worthy moment is bookmarked while you are still playing.',
  },
  {
    name: 'Chat Archive',
    href: '/features/chat-archive',
    icon: Archive,
    category: 'live',
    menu: 'Every stream’s chat, saved and searchable.',
    tagline:
      'Chat is saved to your own disk, stream by stream — search it, label sessions, redact a line, export or delete. It stays readable even after the trial.',
    pain: 'Find what chat said last Tuesday without scrolling a VOD.',
  },

  // Production
  {
    name: 'OBS Bridge',
    href: '/features/obs-bridge',
    icon: MonitorPlay,
    category: 'production',
    menu: 'Native OBS scene control.',
    tagline:
      'Finds OBS over WebSocket v5 on your PC, syncs your scenes into a deck and switches the program feed — no plugin to reinstall after an OBS update.',
    pain: 'Kills the alt-tab scramble to change scenes mid-game.',
  },
  {
    name: 'Aura Studio',
    href: '/features/aura-studio',
    icon: Palette,
    category: 'production',
    menu: 'Overlays that react to the room.',
    tagline:
      'A gallery of ready-made OBS overlays that shift from Calm to Hype on their own, driven by your game and your chat’s energy.',
    pain: 'Your stream reacts to the moment without you touching a thing.',
  },
  {
    name: 'Aura Scene Builder',
    href: '/features/aura-scene',
    icon: Sparkles,
    category: 'production',
    menu: 'Design your own overlays.',
    tagline:
      'A drag-and-drop overlay editor — text, images and video on a 1080p canvas — sent to OBS as a browser source from your own PC.',
    pain: 'Stops you paying for and juggling a separate overlay tool.',
  },

  // Automation
  {
    name: 'Auto-Hype Director',
    href: '/features/auto-hype',
    icon: Workflow,
    category: 'automation',
    menu: 'Scenes that switch themselves.',
    tagline:
      'A visual node editor: chat-velocity and Super Chat triggers, AND/OR logic, and actions like switching a scene, playing a sound, muting a mic or saving a replay clip.',
    pain: 'Perfect scene timing while both hands stay on the game.',
  },
  {
    name: 'Clip Library',
    href: '/features/clip-library',
    icon: Scissors,
    category: 'automation',
    menu: 'Your recordings, ranked by hype.',
    tagline:
      'Scans your local recordings and scores each one by what chat did — peak velocity, Super Chats and sentiment — so the best moments float to the top.',
    pain: 'No more scrubbing a four-hour VOD hunting for the good part.',
  },
  {
    name: 'Shorts Factory',
    href: '/features/shorts-factory',
    icon: Clapperboard,
    category: 'automation',
    menu: '16:9 VODs to vertical shorts.',
    tagline:
      'Pick a hype moment and it crops the VOD from 16:9 to 9:16 and encodes a finished .mp4 on your PC, with a live progress bar.',
    pain: 'Turns last night’s stream into Shorts and Reels without an editor.',
  },

  // Local AI
  {
    name: 'AI Sidekick',
    href: '/features/ai-sidekick',
    icon: MessageSquareText,
    category: 'intelligence',
    menu: 'A local AI that acts for you.',
    tagline:
      'Ask about your stream and it answers from your live stats — and it can switch a scene, search saved chat or design an overlay for you. Runs on Ollama, on your PC.',
    pain: 'A producer you can talk to mid-stream, without a cloud bill.',
  },
  {
    name: 'Creator Memory',
    href: '/features/ai-sidekick#memory',
    icon: BrainCircuit,
    category: 'intelligence',
    menu: 'Your AI remembers your channel.',
    tagline:
      'Tell the sidekick to remember something and it stores it in a private vector memory on your disk, then recalls it when it matters.',
    pain: 'Your assistant knows your channel, not just this session.',
  },
  {
    name: 'Viral Engine',
    href: '/features/viral-engine',
    icon: Hash,
    category: 'intelligence',
    menu: 'Titles and hashtags from your chat.',
    tagline:
      'Writes three YouTube titles and a set of hashtags from the game you are playing and what chat is reacting to — or from a description you type — plus a thumbnail plan.',
    pain: 'Takes the guesswork out of packaging a VOD for discovery.',
  },
  {
    name: 'Brand Guard',
    href: '/features/brand-guard',
    icon: Mic,
    category: 'intelligence',
    menu: 'A warning before you say a banned brand.',
    tagline:
      'On-device speech recognition listens to your mic for competitor or off-limits words and alerts you on screen. The audio stays on your PC.',
    pain: 'Protects sponsor contracts from an accidental slip on air.',
  },

  // Business
  {
    name: 'Sponsor CRM',
    href: '/features/sponsor-crm',
    icon: Handshake,
    category: 'business',
    menu: 'Every sponsor deal on one board.',
    tagline:
      'A lead pipeline built for creators — track every sponsor conversation from first DM to signed deal, stored locally on your machine.',
    pain: 'Stops sponsor leads dying in a messy inbox and spreadsheet.',
  },
  {
    name: 'Media Kit Generator',
    href: '/features/media-kit',
    icon: FileBarChart,
    category: 'business',
    menu: 'A sponsor-ready PDF from your stats.',
    tagline:
      'Import your YouTube and Twitch analytics exports and it builds a branded, sponsor-ready PDF media kit from your own numbers.',
    pain: 'A professional pitch deck in minutes instead of a weekend in Canva.',
  },
];

/** The cross-cutting promises — linked alongside features, but not features. */
export const FOUNDATIONS = [
  {
    name: 'Ultra-Light Performance',
    href: '/features/performance',
    icon: Gauge,
    menu: '1.8% CPU under a live game.',
  },
  {
    name: 'Zero-Cloud Privacy',
    href: '/features/zero-cloud',
    icon: ShieldCheck,
    menu: 'No account, nothing uploaded.',
  },
] as const;

export const FEATURE_COUNT = FEATURES.length;

/** Features grouped in category order, for menus and the /features page. */
export function featuresByCategory() {
  return CATEGORIES.map((category) => ({
    ...category,
    features: FEATURES.filter((feature) => feature.category === category.id),
  }));
}
