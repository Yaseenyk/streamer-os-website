import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release history for streamerOS, starting with the v1.0-GA launch.',
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

// NOTE: the v1.0-GA entry is the real launch release. The pre-GA entries
// below are illustrative — replace the version numbers and dates with the
// actual release log before publishing.
const RELEASES: Release[] = [
  {
    version: 'v1.0-GA',
    date: 'September 2026',
    tag: 'Upcoming',
    summary: 'General availability — the full streamerOS cockpit ships this September.',
    changes: [
      'Official stable release for Windows 10 and 11',
      'Launch of the Auto-Hype Director — the visual, node-based scene-automation engine',
      'Live chat-velocity and sentiment monitoring across Twitch & YouTube',
      'Native OBS WebSocket scene control',
    ],
    current: true,
  },
  {
    version: 'v1.0-RC',
    date: 'April 2026',
    tag: 'Release candidate',
    summary: 'Bug fixes and the final push to a 1.8% CPU footprint.',
    changes: [
      'Wide-ranging bug fixes across the broadcast pipeline',
      'CPU optimization down to the 1.8% target under live game load',
      'Stability and memory-footprint hardening ahead of GA',
    ],
  },
  {
    version: 'v0.9 Beta',
    date: 'February 2026',
    tag: 'Closed beta',
    summary: 'The first invite-only build of the cockpit.',
    changes: [
      'Initial closed-beta rollout to an invite-only group',
      'Local-first, zero-cloud architecture proof-of-concept',
      'Early OBS bridge and scene-control groundwork',
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
              Every version of streamerOS, newest first.
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
