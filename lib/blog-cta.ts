import type { PostMeta } from '@/lib/posts';
import { SHOTS } from '@/lib/shots';
import type { Shot } from '@/components/ScreenshotStrip';

// Search traffic lands on blog posts, not the marketing pages — 94% of this
// site's impressions do. A reader who just finished an OBS tuning guide and a
// reader who just finished a sponsorship guide want different things, so the
// pitch is matched to the cluster the post belongs to rather than being one
// generic "sign up" box repeated 39 times.

export interface BlogCta {
  /** End-of-post email capture. */
  heading: string;
  blurb: string;
  /** Mid-post pointer to the feature that solves what the post describes. */
  callout: { text: string; linkLabel: string; href: string };
  /** A real capture of that feature, shown beside the callout. */
  shot: Shot;
}

interface Cluster extends BlogCta {
  /** Post tags that put a post in this cluster, checked in order. */
  match: string[];
}

const CLUSTERS: Cluster[] = [
  {
    match: ['Sponsorship', 'Monetization'],
    heading: 'Sponsors ask for numbers. Have them ready.',
    blurb:
      'streamerOS tracks peak concurrents, chat velocity and which clips actually travelled — then builds the media kit a sponsor asks for, on your machine. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
    callout: {
      text: 'streamerOS keeps every deal, rate and deliverable in one local tracker — no spreadsheet, no CRM subscription.',
      linkLabel: 'See the Sponsor CRM',
      href: '/features/sponsor-crm',
    },
    shot: SHOTS.sponsorCrm,
  },
  {
    match: ['Optimization', 'Performance', 'Streaming Hardware'],
    heading: 'You just freed up CPU. Don’t hand it straight back.',
    blurb:
      'Most stream tools take back everything these settings won. streamerOS runs your scene automation in 1.8% CPU — local, no cloud round-trip, no OBS plugins to break. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
    callout: {
      text: 'Tuning OBS only helps if the rest of your stack stays out of the way. streamerOS holds 1.8% CPU under a live 1080p60 game.',
      linkLabel: 'See the performance numbers',
      href: '/features/performance',
    },
    shot: SHOTS.obsConnection,
  },
  {
    match: ['Privacy', 'Local-First', 'Zero-Cloud'],
    heading: 'Local-first, and you can verify it.',
    blurb:
      'No account, no backend, no telemetry — your chat and audio never leave the machine. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
    callout: {
      text: 'streamerOS has no server to send your chat to. Everything runs on your PC, and you can watch the connections.',
      linkLabel: 'See how Zero-Cloud works',
      href: '/features/zero-cloud',
    },
    shot: SHOTS.chatArchive,
  },
  {
    match: ['Clips', 'VOD', 'Editing'],
    heading: 'Stop scrubbing VODs for the good bit.',
    blurb:
      'streamerOS marks the moments your chat reacted to while you were live, so the clip is already waiting when you stop. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
    callout: {
      text: 'streamerOS timestamps every chat spike as it happens, so your clips are found before the stream ends.',
      linkLabel: 'See the Clip Library',
      href: '/features/clip-library',
    },
    shot: SHOTS.clipLibrary,
  },
  {
    match: ['Twitch', 'YouTube', 'Platforms', 'Growth'],
    heading: 'Whichever platform you picked, the stream still has to run itself.',
    blurb:
      'streamerOS switches your OBS scenes off live chat signals so you can play instead of reaching for hotkeys. Works the same on Twitch and YouTube. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
    callout: {
      text: 'streamerOS reads chat on Twitch and YouTube the same way, so switching platforms later does not mean rebuilding your setup.',
      linkLabel: 'See what it automates',
      href: '/features/auto-hype',
    },
    shot: SHOTS.autoDirector,
  },
  {
    match: ['Automation', 'OBS Studio', 'Guides'],
    heading: 'Wire it up once, then stop thinking about it.',
    blurb:
      'streamerOS drives OBS over WebSocket v5 — no fragile plugins — and switches scenes the instant your chat peaks. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
    callout: {
      text: 'streamerOS talks straight to OBS over WebSocket v5, so there is no plugin to break on the next OBS update.',
      linkLabel: 'See the OBS Bridge',
      href: '/features/obs-bridge',
    },
    shot: SHOTS.obsBridge,
  },
];

const FALLBACK: BlogCta = {
  heading: 'Run your stream like mission control.',
  blurb:
    'streamerOS is a local-first desktop cockpit for Twitch and YouTube — automate your OBS scenes, read your chat’s pulse, and keep every frame for your game. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days.',
  callout: {
    text: 'streamerOS automates the fiddly parts of running a stream, entirely on your own machine.',
    linkLabel: 'See all the features',
    href: '/features',
  },
  shot: SHOTS.dashboard,
};

/** Pick the pitch that matches what this post is actually about. */
export function getBlogCta(meta: PostMeta): BlogCta {
  const found = CLUSTERS.find((cluster) => cluster.match.some((tag) => meta.tags.includes(tag)));
  return found ?? FALLBACK;
}

/**
 * Up to `limit` other posts sharing the most tags with this one. Keeps a reader
 * who finished one guide moving through the site instead of back to the SERP,
 * and gives every post inbound internal links it did not have before.
 */
export function getRelatedPosts(current: PostMeta, all: PostMeta[], limit = 3): PostMeta[] {
  return all
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post);
}
