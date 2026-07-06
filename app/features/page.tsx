import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Activity,
  BrainCircuit,
  Clapperboard,
  FileBarChart,
  Flame,
  Gauge,
  Handshake,
  MessageSquareText,
  MonitorPlay,
  Palette,
  Scissors,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'The full streamerOS cockpit — reactive OBS automation, hype-scored clip ' +
    'finding, live viral markers, a sponsor media-kit generator, a lead CRM, and ' +
    'a local AI sidekick. One lightweight Windows app, zero cloud.',
  alternates: { canonical: 'https://streamerosai.com/features' },
};

// ---------------------------------------------------------------------------
// A feature is either shipping in the current build (GA) or landing in v1.1.
// The badge is a promise to the visitor — never mark a v1.1 feature as live.
// ---------------------------------------------------------------------------
type Status = 'ga' | 'soon';

interface Feature {
  icon: LucideIcon;
  name: string;
  tagline: string;
  pain: string;
  status: Status;
  href?: string;
}

interface Category {
  eyebrow: string;
  title: string;
  blurb: string;
  features: Feature[];
}

const CATEGORIES: Category[] = [
  {
    eyebrow: 'Production',
    title: 'Run the broadcast.',
    blurb: 'Control OBS and your on-screen look without ever alt-tabbing out of the game.',
    features: [
      {
        icon: MonitorPlay,
        name: 'OBS Bridge',
        tagline:
          'Auto-discovers OBS over WebSocket, lists your scenes, and switches the program feed — no fragile plugins.',
        pain: 'Kills the alt-tab scramble to change scenes mid-game.',
        status: 'ga',
      },
      {
        icon: Palette,
        name: 'Aura Studio',
        tagline:
          'A live "Canvas of Light" that reads your game telemetry and chat velocity every second and shifts your overlay vibe — Calm to Hype — on its own.',
        pain: 'Your stream reacts to the moment without you touching a thing.',
        status: 'ga',
      },
      {
        icon: Sparkles,
        name: 'Aura Scene Builder',
        tagline:
          'A drag-and-drop overlay editor. Build scenes, import your own assets, and render them straight into OBS — no third-party design tool.',
        pain: 'Stops you paying for and juggling a separate overlay app.',
        status: 'ga',
      },
    ],
  },
  {
    eyebrow: 'Automation',
    title: 'Hands off the keyboard.',
    blurb: 'Let the app watch the signals and do the repetitive work while you play.',
    features: [
      {
        icon: Workflow,
        name: 'Auto-Director',
        tagline:
          'A visual node editor that fires OBS scene switches automatically from chat-velocity spikes, Super Chats, and in-game combat — edge-triggered so OBS is never spammed.',
        pain: 'Perfect scene timing while both hands are on the game.',
        status: 'ga',
        href: '/features/auto-hype',
      },
      {
        icon: Scissors,
        name: 'Clip Library',
        tagline:
          'Scans your local recordings and scores every VOD by a hype metric — peak chat velocity, Super Chats, and sentiment — so the best moments float to the top.',
        pain: 'No more scrubbing a 4-hour VOD hunting for the good part.',
        status: 'ga',
      },
      {
        icon: Flame,
        name: 'Viral Moments',
        tagline:
          'Watches chat velocity live, auto-drops a marker on every hype spike, and exports the timestamps to CSV for your editor.',
        pain: 'Every clip-worthy moment is bookmarked the instant it happens.',
        status: 'ga',
      },
      {
        icon: Clapperboard,
        name: 'Shorts Factory',
        tagline:
          'Agentic post-production: pick a VOD, mark a moment, and crop 16:9 down to a vertical 9:16 short with a bundled FFmpeg engine.',
        pain: 'Turns last night’s stream into TikTok/Shorts content without an editor.',
        status: 'soon',
      },
    ],
  },
  {
    eyebrow: 'Business',
    title: 'Get paid to stream.',
    blurb: 'The unglamorous revenue work — pitching sponsors and tracking deals — handled locally.',
    features: [
      {
        icon: FileBarChart,
        name: 'Media Kit Generator',
        tagline:
          'Import your YouTube and Twitch analytics exports, and it computes duration-weighted reach stats and exports a branded, sponsor-ready PDF media kit.',
        pain: 'A professional pitch deck in minutes instead of a weekend in Canva.',
        status: 'ga',
      },
      {
        icon: Handshake,
        name: 'Sponsor CRM',
        tagline:
          'A lead pipeline built for creators — track every sponsor conversation from first DM to signed deal, stored locally on your machine.',
        pain: 'Stops sponsor leads dying in a messy inbox and spreadsheet.',
        status: 'ga',
      },
    ],
  },
  {
    eyebrow: 'Intelligence',
    title: 'A brain that runs on your PC.',
    blurb: 'Local AI, powered by Ollama on your own hardware — no account, no data leaving the box.',
    features: [
      {
        icon: MessageSquareText,
        name: 'AI Sidekick',
        tagline:
          'A streaming local-AI assistant that knows your live stats and can drive the app for you — switch a scene, pull recent chat, build an overlay — all by asking.',
        pain: 'Answers "what was my peak last Tuesday?" and acts on it, mid-stream.',
        status: 'ga',
      },
      {
        icon: Activity,
        name: 'Viral Engine',
        tagline:
          'Analyzes what makes titles and thumbnails land, then generates a thumbnail strategy and tag cloud for your next upload.',
        pain: 'Takes the guesswork out of packaging a VOD for discovery.',
        status: 'ga',
      },
      {
        icon: MessageSquareText,
        name: 'Live Chat Sentiment',
        tagline:
          'Classifies the mood of your chat in real time — peak and lowest points tracked through the whole session and fed to the AI.',
        pain: 'See the room turn before it shows up in your numbers.',
        status: 'ga',
      },
      {
        icon: ShieldCheck,
        name: 'Brand Guard (Voice)',
        tagline:
          'Local Whisper speech recognition listens to your mic for off-limits or competitor words and warns you before a sponsor hears them.',
        pain: 'Protects sponsor contracts from an accidental slip on-air.',
        status: 'soon',
      },
      {
        icon: BrainCircuit,
        name: 'Creator Memory',
        tagline:
          'A private vector memory that lets the AI Sidekick recall your entire back-catalogue — past streams, decisions, and stats — when you ask.',
        pain: 'Your AI remembers your channel’s history, not just this session.',
        status: 'soon',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
function StatusBadge({ status }: { status: Status }) {
  if (status === 'ga') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        Available now
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
      Coming in v1.1
    </span>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, name, tagline, pain, status, href } = feature;
  const inner = (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <StatusBadge status={status} />
      </div>
      <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-zinc-100">
        {name}
        {href && (
          <ArrowRight
            className="h-4 w-4 text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{tagline}</p>
      <p className="mt-4 border-t border-white/5 pt-4 text-sm font-medium text-cyan-200/80">
        {pain}
      </p>
    </article>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}

// ---------------------------------------------------------------------------
export default function FeaturesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Features</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything in the cockpit.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              streamerOS is one lightweight Windows app doing the work of a rack of
              tools — reactive OBS automation, clip finding, sponsor pitching, and a
              local AI brain — without ever costing you a frame.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category sections */}
      <div className="mx-auto max-w-6xl space-y-24 px-6 py-24 sm:py-28">
        {CATEGORIES.map((category) => (
          <section key={category.eyebrow}>
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                {category.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {category.title}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-400">{category.blurb}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.features.map((feature, i) => (
                <Reveal key={feature.name} delay={(i % 3) * 0.08}>
                  <FeatureCard feature={feature} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Foundations strip — the cross-cutting promises */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built on three non-negotiables.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: 'Ultra-light',
                body: 'A Rust core profiled against a live 1080p60 game. It yields every spare cycle to your game and disappears.',
                href: '/features/performance',
              },
              {
                icon: ShieldCheck,
                title: 'Zero-cloud',
                body: 'No account, no backend. Your chat, audio, and audience data are processed in memory on your PC and never uploaded.',
                href: '/features/zero-cloud',
              },
              {
                icon: Workflow,
                title: 'Native OBS',
                body: 'Talks to OBS over WebSocket v5 — real scene control with no brittle plugin chain to maintain.',
                href: '/features/auto-hype',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                    {item.title}
                    <ArrowRight className="h-4 w-4 text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              See it run on your machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              streamerOS is free and open source. Pre-register for the launch and
              watch the cockpit disappear into the background.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <LaunchBadge />
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-Register for Launch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
