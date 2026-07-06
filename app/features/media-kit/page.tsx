import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Download,
  FileBarChart,
  FileText,
  Table,
  Upload,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Media Kit Generator — Feature Guide',
  description:
    'Turn your YouTube and Twitch analytics exports into a branded, ' +
    'sponsor-ready PDF media kit — computed locally in minutes.',
  alternates: { canonical: 'https://streamerosai.com/features/media-kit' },
};

// ---------------------------------------------------------------------------
// Static faux-UI mocks — these only LOOK like the desktop app's Media Kit
// Generator. The real import + compute + export pipeline runs in the
// streamerOS desktop app; this site just explains it. Tints map to the app's
// accent palette: source files = cyan, computed stats = purple, export = emerald.
// ---------------------------------------------------------------------------

/** A single imported analytics file row inside the faux "drop" panel. */
function FileRow({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300">
        <FileBarChart className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 truncate font-mono text-xs text-zinc-200">{name}</span>
      <span className="shrink-0 font-mono text-[11px] text-zinc-500">{size}</span>
      <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
    </div>
  );
}

/** A single computed-metric row inside the faux "stats" panel. */
function StatRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
      <span className={`text-sm font-medium ${accent ? 'text-cyan-300' : 'text-zinc-200'}`}>
        {value}
      </span>
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
export default function MediaKitGuidePage() {
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
              Your sponsor pitch, built in a minute.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              The Media Kit Generator turns your raw YouTube Studio and Twitch
              analytics exports into a branded, sponsor-ready PDF media kit. It
              computes your real reach on your own machine — no cloud, no account,
              no weekend lost to Canva.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From CSV to pitch deck in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Import &rarr; Compute &rarr; Export. Drop in your analytics, let it
            crunch duration-weighted reach, and hand a sponsor a polished PDF.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Import */}
          <Step
            index={1}
            icon={Upload}
            eyebrow="Import"
            title="Drop in your analytics exports."
            body="Select the CSV files you download from YouTube Studio and Twitch — one file or many. streamerOS reads every export you give it, so a channel spanning both platforms lands in a single kit."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Upload className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Import analytics files
                </p>
                <div className="space-y-2">
                  <FileRow name="youtube_studio_export.csv" size="42 KB" />
                  <FileRow name="twitch_analytics.csv" size="18 KB" />
                </div>
                <p className="text-center font-mono text-[11px] text-zinc-500">
                  2 files ready · single or multi-import
                </p>
              </div>
            }
          />

          {/* Step 2 — Compute */}
          <Step
            index={2}
            icon={Table}
            eyebrow="Compute"
            title="It crunches duration-weighted reach."
            body="streamerOS computes duration-weighted channel metrics across every imported file — average and peak concurrent viewers, plus total watch time. Weighting by duration means a marathon stream counts for more than a five-minute test, so the numbers reflect your real audience. Supply your own YouTube Data API v3 key and it folds live channel vitals in too."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Table className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                  Computed channel metrics
                </p>
                <div className="space-y-2">
                  <StatRow label="Avg CCV" value="1,240" accent />
                  <StatRow label="Peak CCV" value="4,870" />
                  <StatRow label="Total Watch Time" value="18,420 hrs" />
                </div>
                <p className="text-center font-mono text-[11px] text-zinc-500">
                  weighted across 2 files · illustrative figures
                </p>
              </div>
            }
          />

          {/* Step 3 — Export */}
          <Step
            index={3}
            icon={Download}
            eyebrow="Export"
            title="Export a sponsor-ready PDF."
            body="One click renders a branded PDF media kit — your channel name and headline stats laid out on a clean cover, ready to attach to a sponsor pitch. Everything happened locally; nothing left your machine."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <FileText className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Media kit · cover.pdf
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01]">
                  <div className="border-b border-white/10 bg-cyan-400/[0.06] px-5 py-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
                      Media Kit 2026
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
                      @NightOwlPlays
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">YouTube · Twitch</p>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-white/5">
                    <div className="px-4 py-4 text-center">
                      <p className="text-lg font-semibold text-zinc-100">1,240</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        Avg CCV
                      </p>
                    </div>
                    <div className="px-4 py-4 text-center">
                      <p className="text-lg font-semibold text-zinc-100">4,870</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        Peak CCV
                      </p>
                    </div>
                    <div className="px-4 py-4 text-center">
                      <p className="text-lg font-semibold text-zinc-100">18.4k</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        Watch hrs
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Branded PDF exported locally — ready for the pitch.
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
              Pitch sponsors from your own machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The Media Kit Generator is available now in streamerOS v1.0-GA —
              import your exports, and a branded PDF is minutes away. Everything
              runs locally.
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
