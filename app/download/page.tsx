import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Pre-register for streamerOS — the Rust-powered, local-first streaming cockpit for Windows, launching September 2026.',
  alternates: { canonical: 'https://yaseenyk.github.io/streamer-os-website/download' },
};

// The "recommended" profile is streamerOS's documented target hardware.
// TODO: confirm certified minimum specs before launch.
const REQUIREMENTS = [
  { label: 'Operating system', value: 'Windows 10 or 11 (64-bit)' },
  { label: 'Recommended memory', value: '16 GB RAM' },
  { label: 'Recommended CPU', value: 'An 8-core processor' },
  { label: 'Local AI features', value: 'A discrete GPU (RTX 3060-class or better)' },
];

const STEPS = [
  {
    title: 'Get the installer at launch',
    body: 'When streamerOS ships this September, you’ll grab a standard signed MSI / NSIS package for Windows.',
  },
  {
    title: 'Run the installer',
    body: 'Double-click and follow the prompts. streamerOS installs in a few seconds.',
  },
  {
    title: 'Launch the cockpit',
    body: 'Open streamerOS, connect OBS, and you’re live. No account, no sign-up, no sync.',
  },
];

export default function DownloadPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Download</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Get streamerOS.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Free, open source, and landing on your desktop this September. Pre-register and
              we’ll send the build the day it ships.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-20 sm:py-24">
        {/* Download card */}
        <Reveal>
          <div className="rounded-2xl border border-cyan-400/30 bg-white/[0.03] p-8 text-center shadow-[0_0_60px_-20px_rgba(34,211,238,0.4)] sm:p-10">
            <LaunchBadge />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">For Windows 10 &amp; 11</h2>
            <p className="mt-2 text-sm text-zinc-400">
              64-bit · free forever · no account required
            </p>
            <PreRegisterButton className="mt-6 inline-flex items-center justify-center rounded-lg bg-cyan-400 px-8 py-3.5 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
              Pre-Register for Launch
            </PreRegisterButton>
            <p className="mt-4 text-xs text-zinc-500">
              Prefer to build from source? streamerOS is{' '}
              <Link href="/features" className="text-cyan-400 hover:underline">
                fully open source
              </Link>
              .
            </p>
          </div>
        </Reveal>

        {/* System requirements */}
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight">System requirements</h2>
          <p className="mt-2 text-sm text-zinc-500">
            streamerOS itself is featherweight — these recommendations are mostly
            headroom for the optional on-device AI.
          </p>
          <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            {REQUIREMENTS.map((req) => (
              <div
                key={req.label}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  {req.label}
                </span>
                <span className="text-sm text-zinc-200">{req.value}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Install steps */}
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight">Installing</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 font-mono text-sm font-semibold text-cyan-400">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Footnote */}
        <Reveal>
          <p className="text-center text-sm text-zinc-500">
            Curious what’s new? Read the{' '}
            <Link href="/changelog" className="text-cyan-400 hover:underline">
              v1.0-GA release notes
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </main>
  );
}
