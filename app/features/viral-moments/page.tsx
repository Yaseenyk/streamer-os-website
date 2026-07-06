import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  BookmarkPlus,
  Check,
  FileDown,
  Flame,
  MessageSquare,
  Radio,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Viral Moments — Feature Guide',
  description:
    'streamerOS watches your chat velocity live, auto-marks every hype spike, ' +
    'and exports the timestamps to CSV — so no clip-worthy moment is ever lost.',
  alternates: { canonical: 'https://streamerosai.com/features/viral-moments' },
};

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Viral Moments
// view. The real, live detector runs in the streamerOS desktop app; this site
// just explains it.
// ---------------------------------------------------------------------------

/** A single connected chat source row inside the faux "Sources" panel. */
function SourceRow({
  icon: Icon,
  name,
  detail,
}: {
  icon: LucideIcon;
  name: string;
  detail: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-300">
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">{name}</p>
          <p className="truncate text-xs text-zinc-500">{detail}</p>
        </div>
      </div>
      <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1 text-[11px] font-medium text-emerald-200/90">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        Connected
      </span>
    </div>
  );
}

/** A single marker row inside the faux "Session markers" list. */
function MarkerRow({ time, peak }: { time: string; peak: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-300">
          <BookmarkPlus className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="font-mono text-sm text-zinc-200">{time}</span>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
        peak {peak}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the app view it describes.
// ---------------------------------------------------------------------------
interface StepProps {
  index: number;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  last?: boolean;
  mock: ReactNode;
}

function Step({ index, icon: Icon, eyebrow, title, body, last, mock }: StepProps) {
  return (
    <Reveal className="relative grid gap-8 pb-16 last:pb-0 lg:grid-cols-2 lg:gap-12">
      {/* Timeline rail + marker (left column, large screens) */}
      <div className="flex gap-5">
        <div className="relative flex flex-col items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#05070A] text-cyan-300">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          {!last && (
            <span aria-hidden className="mt-2 w-px flex-1 bg-gradient-to-b from-white/15 to-transparent" />
          )}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            Step {index} · {eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
          <p className="mt-3 leading-relaxed text-zinc-400">{body}</p>
        </div>
      </div>

      {/* The faux app view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ViralMomentsGuidePage() {
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
              Never miss the moment again.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              streamerOS watches your chat velocity live, bookmarks every hype spike
              the instant it happens, and hands your editor a timestamped CSV — so
              you never rewatch the whole stream hunting for clips again.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From live chat to clip list in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Connect &rarr; auto-mark &rarr; export. Raw chat text never leaves the
            detector — only the velocity signal and trending-keyword histograms
            cross the internal boundary.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Connect */}
          <Step
            index={1}
            icon={Radio}
            eyebrow="Connect"
            title="Connect your live chat."
            body="Point streamerOS at your stream and it starts reading chat in real time — YouTube live chat through a local window scraper, and Twitch straight over IRC. Both feeds fold into a single velocity signal the moment they're live."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Chat sources
                </p>
                <div className="space-y-2.5">
                  <SourceRow
                    icon={MessageSquare}
                    name="YouTube Live"
                    detail="window scraper"
                  />
                  <SourceRow
                    icon={MessageSquare}
                    name="Twitch"
                    detail="IRC"
                  />
                </div>
              </div>
            }
          />

          {/* Step 2 — Auto-mark */}
          <Step
            index={2}
            icon={Activity}
            eyebrow="Auto-mark"
            title="It auto-marks every hype spike."
            body="streamerOS tracks messages per second continuously. When velocity spikes past the trend, it drops a session marker on that exact timestamp automatically — no hotkey, no watching a dashboard. Every eruption gets bookmarked the instant it happens."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Activity className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Live chat velocity
                </p>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-3xl font-semibold text-cyan-300">
                        58<span className="ml-1 text-sm text-zinc-500">msgs/s</span>
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">threshold 40 / s</p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-2.5 py-1 text-[11px] font-medium text-cyan-200">
                      <Flame className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      Spiking
                    </span>
                  </div>
                  {/* Faux sparkline */}
                  <div aria-hidden className="mt-4 flex h-14 items-end gap-1">
                    {[3, 4, 3, 5, 4, 6, 5, 8, 7, 11, 16, 14].map((h, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-sm ${
                          h >= 11 ? 'bg-cyan-400/80' : 'bg-white/10'
                        }`}
                        style={{ height: `${(h / 16) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.04] px-3 py-2 text-sm text-cyan-100/90">
                  <BookmarkPlus className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2} aria-hidden />
                  Marker dropped &middot; 01:24:07
                </div>
              </div>
            }
          />

          {/* Step 3 — Export */}
          <Step
            index={3}
            icon={FileDown}
            eyebrow="Export"
            title="Export your markers to CSV."
            body="When the stream wraps, list the whole session's markers and export them to a CSV in one click. Every timestamp and its peak velocity lands in a file your editor can open straight in the timeline — no rewatching required."
            last
            mock={
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                    <BookmarkPlus className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                    Session markers
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200">
                    <FileDown className="h-3.5 w-3.5 text-cyan-300" strokeWidth={1.75} aria-hidden />
                    Export CSV
                  </span>
                </div>
                <div className="space-y-2">
                  <MarkerRow time="00:12:41" peak="47 / s" />
                  <MarkerRow time="00:38:19" peak="62 / s" />
                  <MarkerRow time="01:24:07" peak="58 / s" />
                  <MarkerRow time="01:51:33" peak="71 / s" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  4 markers exported &rarr; handed to your editor.
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Catch every clip on your own machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Viral Moments ships in the streamerOS GA build — reading chat locally,
              privacy-preserving by design, and available right now.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-Register for Launch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
              <Link
                href="/features"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
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
