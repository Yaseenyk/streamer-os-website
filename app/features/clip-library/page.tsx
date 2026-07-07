import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Film,
  Flame,
  FolderOpen,
  Scissors,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Clip Library — Feature Guide',
  description:
    'streamerOS scores every VOD by a hype metric — peak chat velocity, ' +
    'Super Chats, and sentiment — so your best moments float to the top ' +
    'automatically.',
  alternates: { canonical: 'https://streamerosai.com/features/clip-library' },
};

// Answers stay within claims made elsewhere on the site (FAQ, feature pages).
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'How does the Clip Library find my best stream moments?',
    a: 'streamerOS scores your local VOD recordings with a hype score built from what your audience actually did: peak chat velocity (50%), Super Chats and paid actions (30%), and chat sentiment (20%). The highest-scoring moments float to the top automatically — no scrubbing through hours of footage.',
  },
  {
    q: 'Do my VODs get uploaded to a cloud service for analysis?',
    a: 'No. The scoring runs entirely on your machine against your local recordings. streamerOS is zero-cloud by architecture — your footage, telemetry, and scores never leave your disk.',
  },
  {
    q: 'Does it work with both Twitch and YouTube streams?',
    a: 'Yes. streamerOS reads Twitch and YouTube chat in real time, so the hype score reflects your whole audience regardless of where you broadcast — or if you multistream to both.',
  },
  {
    q: 'How do I turn a scored moment into a clip for my editor?',
    a: 'Pair the Clip Library with Viral Moments, which marks hype spikes live and exports the timestamps to CSV. Your editor jumps straight to the scored moments instead of hunting for them.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Clip Library.
// The real, interactive scanner lives in the streamerOS desktop app; this site
// just explains it. Everything is local: recordings, telemetry, and scores
// never leave the machine.
// ---------------------------------------------------------------------------

/** A single VOD row inside the faux "Recordings" panel. */
function FileRow({ name, duration }: { name: string; duration: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="flex min-w-0 items-center gap-2.5">
        <Film className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={1.75} aria-hidden />
        <span className="truncate text-sm font-medium text-zinc-200">{name}</span>
      </span>
      <span className="shrink-0 font-mono text-[11px] text-zinc-500">{duration}</span>
    </div>
  );
}

/** A single weighted-signal row inside the faux "Hype score" breakdown. */
function WeightRow({ label, weight }: { label: string; weight: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
          {label}
        </span>
        <span className="text-sm font-medium text-cyan-300">{weight}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <span
          aria-hidden
          className="block h-full rounded-full bg-gradient-to-r from-cyan-400/70 to-cyan-300"
          style={{ width: `${weight}%` }}
        />
      </div>
    </div>
  );
}

/** A single ranked clip inside the faux "Top clips" panel. */
function RankedClip({ name, score, top }: { name: string; score: number; top?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
        top
          ? 'border-cyan-400/40 bg-cyan-400/[0.06]'
          : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold ${
          top
            ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
            : 'border-white/10 bg-white/5 text-zinc-300'
        }`}
      >
        {score}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200">{name}</span>
      {top && (
        <Trophy className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} aria-hidden />
      )}
    </div>
  );
}

/** Faux panel shell — mirrors the desktop app's card chrome. */
function Panel({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the view it describes.
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

      {/* The faux view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ClipLibraryGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Clip Library', path: '/features/clip-library' },
        ])}
      />
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
              Your best moments, already found.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              No more scrubbing a four-hour VOD for the one good moment. Clip
              Library scores every recording by real hype signals — peak chat
              velocity, Super Chats, and sentiment — so clipping stops being a
              scavenger hunt. Everything runs locally on your machine.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From raw VODs to ranked clips in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Point &rarr; Score &rarr; Stage. The app already knows where the hype
            was, so your best clips rise to the top on their own.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Point it at your recordings */}
          <Step
            index={1}
            icon={FolderOpen}
            eyebrow="Point it at your recordings"
            title="Select your Videos folder of VODs."
            body="Open Clip Library and choose the folder where your stream recordings live. It scans your local .mp4 and .mkv files — nothing is uploaded — and lists every VOD it finds, ready to score."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <FolderOpen className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Videos folder
                </p>
                <Panel icon={Film} title="Recordings">
                  <FileRow name="2026-07-04_ranked-grind.mkv" duration="4:12:38" />
                  <FileRow name="2026-07-02_launch-day.mp4" duration="2:47:05" />
                  <FileRow name="2026-06-29_late-night-q&a.mkv" duration="1:53:20" />
                  <FileRow name="2026-06-27_speedrun-attempt.mp4" duration="3:08:44" />
                </Panel>
              </div>
            }
          />

          {/* Step 2 — It scores every moment by hype */}
          <Step
            index={2}
            icon={Flame}
            eyebrow="It scores every moment by hype"
            title="Every VOD gets a telemetry-derived hype score."
            body="Clip Library correlates each recording's time window against the stream telemetry captured locally in SQLite, then weights the signals: peak chat velocity counts for 50%, Super Chats and action events for 30%, and sentiment intensity for the last 20%."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Flame className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Hype score
                </p>
                <Panel icon={TrendingUp} title="Score breakdown">
                  <WeightRow label="Chat velocity" weight={50} />
                  <WeightRow label="Super Chats" weight={30} />
                  <WeightRow label="Sentiment" weight={20} />
                  <div className="mt-3 flex items-center justify-between gap-4 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] px-3 py-2.5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      Hype score
                    </span>
                    <span className="text-lg font-semibold text-cyan-200">94</span>
                  </div>
                </Panel>
              </div>
            }
          />

          {/* Step 3 — Your best clips rise to the top */}
          <Step
            index={3}
            icon={Trophy}
            eyebrow="Your best clips rise to the top"
            title="Stage a high-scorer into the Shorts workspace."
            body="Your VODs are ranked by hype score, best first. Pick a top clip and stage it — Clip Library copies the recording into the Shorts workspace, where it's ready for editing. No scrubbing, no guesswork."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Trophy className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Ranked by hype
                </p>
                <Panel icon={Scissors} title="Top clips">
                  <RankedClip name="2026-07-04_ranked-grind.mkv" score={94} top />
                  <RankedClip name="2026-07-02_launch-day.mp4" score={81} />
                  <RankedClip name="2026-06-27_speedrun-attempt.mp4" score={67} />
                  <button
                    type="button"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-[#05070A]"
                  >
                    <Scissors className="h-4 w-4" strokeWidth={2} aria-hidden />
                    Stage for Shorts
                  </button>
                </Panel>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Copied to the Shorts workspace &mdash; ready to edit.
                </div>
              </div>
            }
          />
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Let your VODs sort themselves out.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Clip Library is available now in the streamerOS GA build — scoring
              every recording against local telemetry, entirely on your own
              machine.
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
