import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Check, Gauge, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import { NodeGraph } from '@/components/NodeGraph';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'A deep dive into streamerOS — a 1.8% CPU Rust core, the Auto-Hype Director ' +
    'scene-automation engine, and a zero-cloud, local-first architecture.',
  alternates: { canonical: 'https://yaseenyk.github.io/streamer-os-website/features' },
};

// --- Deep-dive section ------------------------------------------------------
interface DeepDiveProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
}

function DeepDive({ icon: Icon, eyebrow, title, body, points, visual, reverse, cta }: DeepDiveProps) {
  return (
    <Reveal className="grid items-center gap-10 lg:grid-cols-2">
      <div className={reverse ? 'lg:order-2' : undefined}>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-3 leading-relaxed text-zinc-400">{body}</p>
        <ul className="mt-5 space-y-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-zinc-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        {cta && (
          <Link
            href={cta.href}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
      <div className={reverse ? 'lg:order-1' : undefined}>{visual}</div>
    </Reveal>
  );
}

// --- Visuals ----------------------------------------------------------------
const STATS = [
  { value: '1.8%', label: 'Sustained CPU under a live game' },
  { value: '152 MB', label: 'Resident memory, every feature on' },
  { value: '315 ms', label: 'Time to first local-AI token' },
];

function PerfVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="space-y-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
            <span className="bg-[linear-gradient(to_right,#22d3ee,#a855f7)] bg-clip-text font-mono text-3xl font-semibold text-transparent sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-right text-xs text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const LOCAL_ITEMS = [
  'Chat messages',
  'Microphone audio',
  'Twitch & YouTube credentials',
  'OBS configuration',
  'Your automation rules',
];

function ZeroCloudVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
        Stays on your machine
      </p>
      <ul className="mt-5 space-y-3">
        {LOCAL_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-zinc-200">
            <Check className="h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-white/5 pt-5 font-mono text-xs text-zinc-500">
        0 analytics SDKs · 0 cloud accounts · 0 servers
      </p>
    </div>
  );
}

function GraphVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <NodeGraph className="w-full" />
    </div>
  );
}

// --- Supporting features ----------------------------------------------------
const SUPPORTING = [
  { title: 'Sponsor media kits', body: 'Branded PDF media kits, generated locally from your own analytics exports.' },
  { title: 'Brand-safety guard', body: 'Listens for off-limits words in your live audio and warns you before a sponsor does.' },
  { title: 'Viral hook markers', body: 'Timestamps every hype spike so the best moments are trivial to clip later.' },
  { title: 'Local AI sidekick', body: 'A Hinglish-aware assistant that answers questions about your own back-catalogue.' },
  { title: 'Native OBS control', body: 'Talks to OBS over WebSocket — scene switching with no fragile plugins.' },
  { title: 'Open source', body: 'Every line is public. Free forever, with an optional $29 Supporter Edition.' },
];

// --- Page -------------------------------------------------------------------
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
              streamerOS is one lightweight desktop app doing the work of a rack of
              tools — without ever costing you a frame.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Deep dives */}
      <div className="mx-auto max-w-6xl space-y-24 px-6 py-24 sm:space-y-32 sm:py-32">
        <DeepDive
          icon={Gauge}
          eyebrow="Performance"
          title="A footprint you’ll forget is there."
          body="streamerOS runs on a Rust core, profiled obsessively against a live 1080p60 game. It yields every spare cycle to your game and disappears into the background."
          points={[
            'Stays under a 1.8% CPU budget while a game runs foreground',
            'Around 150 MB of memory with every feature enabled',
            'Cold-starts to interactive in seconds',
          ]}
          visual={<PerfVisual />}
        />

        <DeepDive
          icon={Workflow}
          eyebrow="Auto-Hype Director"
          title="Scenes that follow your stream’s energy."
          body="Wire chat-velocity and sentiment triggers into a visual node graph. When the room peaks, streamerOS switches your OBS scene the instant it happens — and throttles itself so OBS is never spammed."
          points={[
            'Drag-and-drop trigger, logic, and action nodes',
            'Reacts to live chat velocity and sentiment',
            'Edge-triggered — one switch per change, never a flood',
          ]}
          cta={{ label: 'Read the step-by-step guide', href: '/features/auto-hype' }}
          visual={<GraphVisual />}
          reverse
        />

        <DeepDive
          icon={ShieldCheck}
          eyebrow="Zero-Cloud"
          title="Private because of how it’s built."
          body="There is no streamerOS account and no cloud backend. Your chat, your audio, and your audience data are processed in memory on your computer — and never uploaded."
          points={[
            'No analytics SDKs, no telemetry, no tracking',
            'Recordings hit disk only when you opt in, per session',
            'A handful of audited, opt-in connections — nothing else',
          ]}
          visual={<ZeroCloudVisual />}
        />
      </div>

      {/* Supporting features */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              And the rest of the deck.
            </h2>
            <p className="mt-4 text-zinc-400">
              The three pillars get the spotlight — but the cockpit does more.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTING.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <article className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.07]">
                  <span aria-hidden className="block h-2 w-2 rounded-full bg-cyan-400" />
                  <h3 className="mt-4 text-base font-semibold text-zinc-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </article>
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
              streamerOS is free and open source. Pre-register for the September launch and
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
