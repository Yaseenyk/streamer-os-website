import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CloudOff,
  HardDrive,
  Lock,
  MonitorPlay,
  Radio,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Zero-Cloud Privacy — Feature Guide',
  description:
    'streamerOS is local-first by architecture: no accounts, no backend ' +
    'servers, and chat logs, audio feeds, and API keys that never leave your ' +
    'machine. Total privacy by design.',
  alternates: { canonical: 'https://yaseenyk.github.io/streamer-os-website/features/zero-cloud' },
};

// ---------------------------------------------------------------------------
// Static "Local-First Architecture" diagram. Twitch/YouTube and OBS feed INTO
// the local machine; the only outbound path — to cloud servers — is severed.
// Illustrative, not a live graph.
// ---------------------------------------------------------------------------
interface Source {
  icon: LucideIcon;
  label: string;
}

const SOURCES: Source[] = [
  { icon: Radio, label: 'Twitch / YouTube' },
  { icon: MonitorPlay, label: 'OBS Studio' },
];

interface Tag {
  text: string;
  className: string;
}

const TAGS: Tag[] = [
  { text: '[LOCAL INGEST ONLY]', className: 'border-cyan-400/30 text-cyan-300' },
  { text: '[E2E ENCRYPTED]', className: 'border-emerald-400/30 text-emerald-300' },
  { text: '[NO TELEMETRY]', className: 'border-red-400/30 text-red-300' },
];

interface Guarantee {
  icon: LucideIcon;
  title: string;
  body: string;
}

const GUARANTEES: Guarantee[] = [
  {
    icon: ShieldCheck,
    title: 'No account required',
    body:
      'Download, launch, stream. There is no sign-up, no login, and no profile ' +
      'living on someone else’s server.',
  },
  {
    icon: Lock,
    title: 'Keys never leave',
    body:
      'Your OBS and platform tokens are stored locally and encrypted at rest — ' +
      'never transmitted off the machine.',
  },
  {
    icon: HardDrive,
    title: 'Logs stay on disk',
    body:
      'Chat history and audio are processed in memory and written only to your ' +
      'own drive. Nothing is uploaded, ever.',
  },
];

function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center">
      {/* Cloud servers — the severed destination */}
      <div className="flex flex-col items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/[0.04] px-5 py-3 text-center opacity-80">
        <CloudOff className="h-6 w-6 text-red-400/80" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-medium text-zinc-300">Cloud Servers</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-red-400/70">
          Never connected
        </span>
      </div>

      {/* Crossed-out, red, blocked connection */}
      <div className="relative flex h-16 w-full items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-red-500/50"
        />
        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-red-500/50 bg-[#05070A] text-red-400">
          <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
      </div>

      {/* The local machine hub — glowing cyan/purple */}
      <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 px-10 py-6 text-center shadow-[0_0_60px_-12px_rgba(34,211,238,0.7)]">
        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/40 bg-[#05070A] text-purple-300">
          <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
          <HardDrive className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="text-sm font-semibold text-zinc-100">Local Machine</p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
          Everything runs here
        </p>
      </div>

      {/* Inbound feeds from the platforms + OBS */}
      <div className="mt-2 grid w-full max-w-md grid-cols-2 gap-6">
        {SOURCES.map((source) => {
          const Icon = source.icon;
          return (
            <div key={source.label} className="flex flex-col items-center">
              <ArrowRight
                className="h-5 w-5 -rotate-90 text-cyan-400/70"
                strokeWidth={1.75}
                aria-hidden
              />
              <div className="mt-2 flex w-full flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-center">
                <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} aria-hidden />
                <span className="text-xs font-medium text-zinc-200">{source.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry tags */}
      <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-2 border-t border-white/5 pt-6">
        {TAGS.map((tag) => (
          <span
            key={tag.text}
            className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${tag.className}`}
          >
            {tag.text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ZeroCloudGuidePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Feature Guide
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Stream. Your Data. Zero Cloud.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              No accounts. No backend servers. Your chat logs, audio feeds, and API
              keys never leave your machine. Total privacy by design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Local-First Architecture visual */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built local-first, by architecture.
          </h2>
          <p className="mt-4 text-zinc-400">
            Every signal flows into your machine and stays there. The one path that
            would reach the cloud simply doesn&rsquo;t exist.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10">
            <ArchitectureDiagram />
          </div>
        </Reveal>
      </section>

      {/* Guarantees */}
      <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-24">
        <div className="grid gap-5 sm:grid-cols-3">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100">
                    {g.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-400">{g.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Privacy you don&rsquo;t have to configure.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              streamerOS v1.0-GA is free and open source — local-first out of the
              box, with nothing to opt out of.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300"
              >
                Download v1.0-GA
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
              >
                Back to all features
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
