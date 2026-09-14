import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'What is in the streamerOS launch build, and a development log of when each part of the cockpit first landed.',
  alternates: { canonical: 'https://streamerosai.com/changelog' },
};

interface Release {
  version: string;
  date: string;
  tag: string;
  summary: string;
  changes: string[];
  current?: boolean;
}

// The pre-launch entries are a development log taken from the product repo's
// history (the month each piece first landed), not invented release numbers.
// The page previously showed a "v0.9 closed beta" and a "v1.0-RC" that never
// existed — a changelog is exactly the page a sceptical buyer checks.
const RELEASES: Release[] = [
  {
    version: 'v1.0',
    date: 'November 2026',
    tag: 'Launch',
    summary: 'General availability for Windows 10 and 11 — the whole cockpit, free for 7 days, then $29 once.',
    changes: [
      'Live Cockpit: Chat Triage, Super Chat revenue, Top Chatters, Sentiment Horizon and the OBS scene switcher on one screen',
      'Auto-Hype Director, OBS Bridge, Aura Studio overlays and the Aura Scene Builder',
      'Viral Moments, Clip Library and Shorts Factory for turning streams into clips',
      'AI Sidekick with Creator Memory, Hinglish-aware chat sentiment, the Viral Engine and Brand Guard — all on local AI',
      'Chat Archive, Sponsor CRM and the Media Kit Generator',
      'Offline licence keys tied to your PC, and a free tier that keeps your own data readable after the trial',
    ],
    current: true,
  },
  {
    version: 'September 2026',
    date: 'Development log',
    tag: 'Pre-release',
    summary: 'Licensing, and the Viral Engine rebuilt around local AI.',
    changes: [
      'A 7-day trial with offline, machine-bound licence keys and a free tier for your own data',
      'Viral Engine rebuilt on local AI, with Live Sync and Describe Video modes',
      'Clip Library explains when Windows blocks a relocated Videos folder instead of showing an empty list',
    ],
  },
  {
    version: 'June 2026',
    date: 'Development log',
    tag: 'Pre-release',
    summary: 'The AI sidekick learned to act, and chat started being kept.',
    changes: [
      'Chat Archive — every stream’s chat saved and searchable on your PC',
      'Super Chat revenue ledger with ₹ totals and exchange rates you can edit',
      'AI Sidekick actions: switch OBS scenes, read chat and design overlays on request',
      'Streamer Bible and Creator Memory for the assistant',
      'Clip Library ranks local recordings by hype score',
      'Aura Scene Builder and the Sponsor CRM pipeline',
      'OBS Bridge connection view and stream deck',
    ],
  },
  {
    version: 'May 2026',
    date: 'Development log',
    tag: 'Pre-release',
    summary: 'The foundations: chat, OBS, overlays and the node editor.',
    changes: [
      'Auto-Hype Director node editor',
      'Aura Studio vibe-reactive OBS overlays and the Shorts Factory workspace',
      'Twitch chat support, Brand Guard speech recognition and the Media Kit Generator',
      'YouTube Live chat velocity, read from your own browser',
      'Local AI chat assistant on Ollama',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Changelog</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Ship notes. What&rsquo;s new in streamerOS.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              What ships at launch, and a log of when each part of the cockpit first
              landed during development.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="border-l border-white/10 pl-8">
          {RELEASES.map((release, i) => (
            <Reveal key={release.version} delay={i * 0.06} className="relative pb-14 last:pb-0">
              {/* timeline node */}
              <span
                aria-hidden
                className={`absolute -left-[2.4rem] top-1 h-3.5 w-3.5 rounded-full border-2 bg-[#05070A] ${
                  release.current ? 'border-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.5)]' : 'border-white/25'
                }`}
              />

              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-lg font-semibold text-zinc-100">{release.version}</h2>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    release.current
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                      : 'border-white/15 bg-white/5 text-zinc-400'
                  }`}
                >
                  {release.tag}
                </span>
                <span className="text-xs text-zinc-500">{release.date}</span>
              </div>

              <p className="mt-2 text-sm text-zinc-300">{release.summary}</p>

              <ul className="mt-4 space-y-2">
                {release.changes.map((change) => (
                  <li key={change} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                    {change}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-4 text-center text-sm text-zinc-500">
            Want it the moment it ships?{' '}
            <PreRegisterButton className="text-cyan-400 hover:underline">
              Pre-register for launch
            </PreRegisterButton>
            .
          </p>
        </Reveal>
      </div>
    </main>
  );
}
