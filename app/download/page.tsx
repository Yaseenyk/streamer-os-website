import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { LaunchBadge } from '@/components/PreRegisterModal';
import { ScreenshotStrip } from '@/components/ScreenshotStrip';
import { SHOTS } from '@/lib/shots';
import InlineSignup from '@/components/InlineSignup';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: 'Download streamerOS (Windows) — Pre-Register for Launch' },
  description:
    'Pre-register for streamerOS for Windows 10/11: OBS scene automation, clip markers and a local AI sidekick. No account, no cloud. 7-day trial, then $29 once.',
  alternates: { canonical: 'https://streamerosai.com/download' },
};

// The "recommended" profile is streamerOS's documented target hardware.
// TODO: confirm certified minimum specs before launch.
// Split so the low-CPU claim and the hardware list stop contradicting each
// other: the app itself needs Windows and OBS; the GPU is for the optional AI.
const REQUIREMENTS = [
  { label: 'Required', value: 'Windows 10 or 11 (64-bit) and OBS Studio 28 or later' },
  { label: 'Recommended', value: '16 GB RAM and an 8-core CPU, for headroom next to your game' },
  { label: 'Only for local AI', value: 'An RTX 3060-class GPU and Ollama' },
];

const STEPS = [
  {
    title: 'Get the installer at launch',
    body: 'When streamerOS ships in February 2027, you’ll download a Windows installer that sets it up for your user account — no administrator prompt.',
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
              streamerOS isn’t out yet. Get it first.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              It launches February 2027 for Windows. Pre-register and we’ll
              send you the build the day it ships, with a 3-month trial instead of 7 days.
              After that it’s $29 once, no subscription.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-20 sm:py-24">
        {/* Download card */}
        <Reveal>
          <div className="rounded-2xl border border-cyan-400/30 bg-white/[0.03] p-8 text-center shadow-[0_0_60px_-20px_rgba(34,211,238,0.4)] sm:p-10">
            <LaunchBadge />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Pre-register for the Windows build</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Windows 10 &amp; 11 · 3-month trial for pre-registrants · no account required
            </p>
            <InlineSignup variant="bare" source="download" className="mt-6" />
            {siteConfig.demoUrl && (
              <p className="mt-4 text-sm text-zinc-400">
                Want to see it first?{' '}
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-400 underline underline-offset-2"
                >
                  Try the live demo in your browser
                </a>{' '}
                — sample data, nothing to install.
              </p>
            )}
          </div>
        </Reveal>

      </div>

      <ScreenshotStrip
        heading="What lands on your desktop."
        blurb="The build you get on launch day, captured running on Windows."
        shots={[SHOTS.dashboard, SHOTS.autoDirector, SHOTS.obsBridge, SHOTS.viralMoments, SHOTS.sponsorCrm]}
      />

      <div className="mx-auto max-w-3xl space-y-16 px-6 pb-20">
        {/* System requirements */}
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight">System requirements</h2>
          <p className="mt-2 text-sm text-zinc-400">
            The app itself stays under 2% CPU. Without a GPU or Ollama, everything
            except the local AI features (AI Sidekick, Sentiment Horizon, Viral
            Engine) still works.
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
            Follow what is being built for v1.0 in the{' '}
            <Link href="/changelog" className="text-cyan-400 underline underline-offset-2">
              changelog
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </main>
  );
}
