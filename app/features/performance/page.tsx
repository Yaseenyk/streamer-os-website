import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, ArrowRight, Cpu, Gauge, Zap, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Ultra-Light Performance — Feature Guide',
  description:
    'How streamerOS holds a 1.8% CPU footprint under a live 1080p60 game. ' +
    'A Rust + Tauri core that leaves your frames for the stream.',
};

// ---------------------------------------------------------------------------
// Faux "System Telemetry" monitor — a static representation of where CPU goes
// during a live broadcast. The widths are illustrative, not a live readout;
// the point is the contrast between the game/OBS and streamerOS's 1.8% sliver.
// Width classes are full literals so Tailwind's scanner keeps them.
// ---------------------------------------------------------------------------
interface TelemetryRow {
  label: string;
  readout: string;
  /** Literal Tailwind width class (kept whole so the JIT picks it up). */
  barWidth: string;
  fill: string;
}

const TELEMETRY: TelemetryRow[] = [
  {
    label: 'Game Engine',
    readout: 'CPU: 65% | RAM: 4.8GB',
    barWidth: 'w-[65%]',
    fill: 'bg-gradient-to-r from-amber-500 to-red-500',
  },
  {
    label: 'OBS Studio',
    readout: 'CPU: 25% | RAM: 1.1GB',
    barWidth: 'w-[25%]',
    fill: 'bg-gradient-to-r from-blue-500 to-slate-500',
  },
  {
    label: 'streamerOS',
    readout: 'CPU: 1.8% | RAM: 152MB',
    barWidth: 'w-[1.8%]',
    fill: 'bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]',
  },
];

function TelemetryBar({ label, readout, barWidth, fill }: TelemetryRow) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-zinc-200">{label}</span>
        <span className="font-mono text-[11px] tracking-tight text-zinc-500">{readout}</span>
      </div>
      {/* Track is NOT clipped — the streamerOS bar's glow needs to bleed out. */}
      <div className="mt-2 h-2 w-full rounded-full bg-white/5">
        <div className={`h-full rounded-full ${barWidth} ${fill}`} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Supporting stat cards.
// ---------------------------------------------------------------------------
interface Stat {
  icon: LucideIcon;
  stat: string;
  label: string;
  body: string;
}

const STATS: Stat[] = [
  {
    icon: Gauge,
    stat: '1.8%',
    label: 'CPU under load',
    body:
      'Measured while capturing a live 1080p60 game — not an idle benchmark. ' +
      'The cockpit stays out of the way of your frames.',
  },
  {
    icon: Cpu,
    stat: '152 MB',
    label: 'Resident memory',
    body:
      'The entire broadcast control surface fits in roughly the memory of a ' +
      'single browser tab. No Chromium, no bloat.',
  },
  {
    icon: Zap,
    stat: 'Rust + Tauri',
    label: 'Native core',
    body:
      'A compiled Rust engine in a lightweight Tauri shell — no Electron ' +
      'runtime tax, so the GPU and CPU headroom belong to your game.',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PerformanceGuidePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url(/grid.svg)] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Feature Guide
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Zero Impact. Maximum Hype.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Powered by Rust and Tauri, streamerOS runs a 1.8% CPU footprint under a
              live 1080p60 game. Save your frames for the stream.
            </p>
          </Reveal>
        </div>
      </section>

      {/* System Telemetry visual */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            See where your CPU actually goes.
          </h2>
          <p className="mt-4 text-zinc-400">
            Your game and OBS do the heavy lifting. streamerOS is the thin cyan
            sliver — automation that costs you almost nothing.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            {/* Monitor header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-300" strokeWidth={1.75} aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                  System Telemetry
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Live · 1080p60
                </span>
              </div>
            </div>

            {/* Resource bars */}
            <div className="mt-6 space-y-6">
              {TELEMETRY.map((row) => (
                <TelemetryBar key={row.label} {...row} />
              ))}
            </div>

            {/* Total footer */}
            <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] uppercase tracking-widest">
              <span className="text-zinc-500">Total broadcast overhead</span>
              <span className="text-cyan-300">streamerOS · 1.8%</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stat cards */}
      <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-24">
        <div className="grid gap-5 sm:grid-cols-3">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="mt-5 text-2xl font-semibold tracking-tight text-zinc-100">
                    {s.stat}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                    {s.label}
                  </p>
                  <p className="mt-3 leading-relaxed text-zinc-400">{s.body}</p>
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
              Light enough to forget it&rsquo;s running.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              streamerOS v1.0-GA ships free and open source — a full broadcast
              cockpit at a 1.8% CPU footprint.
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
