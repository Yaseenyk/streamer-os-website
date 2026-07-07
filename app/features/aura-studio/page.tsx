import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  Check,
  Gauge,
  Palette,
  Radio,
  Sliders,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Aura Studio — Feature Guide',
  description:
    'A living Canvas of Light — streamerOS reads your game telemetry and ' +
    'chat velocity every second and shifts your OBS overlay vibe from Calm ' +
    'to Hype on its own.',
  alternates: { canonical: 'https://streamerosai.com/features/aura-studio' },
};

// Answers stay within claims made elsewhere on the site (FAQ, feature pages).
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'What is Aura Studio?',
    a: 'Aura Studio is a reactive overlay layer — a "Canvas of Light" — that reads your game telemetry and chat velocity every second and shifts your overlay’s vibe from Calm to Hype on its own. Your stream visually reacts to the room without you touching anything mid-broadcast.',
  },
  {
    q: 'How does the overlay get into OBS Studio?',
    a: 'You build it with the Aura Scene builder, a drag-and-drop overlay editor, and streamerOS renders it into OBS. There is no cloud overlay service in the loop — the whole pipeline runs locally next to OBS.',
  },
  {
    q: 'Can I control when the overlay flips from Calm to Hype?',
    a: 'Yes. Aura Studio has a hype-threshold calibration, so you decide how much chat energy it takes before the overlay escalates. A cozy chatting stream and a tournament grand final can run very different thresholds.',
  },
  {
    q: 'Does a live reactive overlay cost me frames?',
    a: 'No. streamerOS runs on a Rust core that holds a 1.8% CPU footprint under a live 1080p60 game — the overlay reacts in real time while your frames stay with the game and OBS.',
  },
];

// ---------------------------------------------------------------------------
// Static aura "tiles" — these only LOOK like the gallery in the desktop app.
// The real, selectable gallery lives in streamerOS; this site just explains
// it. Tints trace the Calm → Hype scale: calm=purple, neon=cyan, hype=emerald.
// ---------------------------------------------------------------------------
type AuraTone = 'calm' | 'neon' | 'hype';

const AURA_TONE: Record<AuraTone, { ring: string; icon: string; dot: string }> = {
  calm: {
    ring: 'border-purple-400/40 bg-purple-400/[0.06]',
    icon: 'text-purple-300',
    dot: 'bg-purple-400',
  },
  neon: {
    ring: 'border-cyan-400/40 bg-cyan-400/[0.06]',
    icon: 'text-cyan-300',
    dot: 'bg-cyan-400',
  },
  hype: {
    ring: 'border-emerald-400/40 bg-emerald-400/[0.06]',
    icon: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
};

function AuraTile({
  tone,
  icon: Icon,
  name,
  subtitle,
  selected,
}: {
  tone: AuraTone;
  icon: LucideIcon;
  name: string;
  subtitle: string;
  selected?: boolean;
}) {
  const t = AURA_TONE[tone];
  return (
    <div
      className={`relative rounded-xl border ${t.ring} p-4 backdrop-blur-sm ${
        selected ? 'ring-2 ring-cyan-400/70' : ''
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[#05070A]">
          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
        </span>
      )}
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          Overlay
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${t.icon}`}>
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">{name}</p>
          <p className="truncate text-xs text-zinc-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/** A single labelled control row inside the faux "Properties" panel. */
function PropRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
      <span className={`text-sm font-medium ${accent ? 'text-cyan-300' : 'text-zinc-200'}`}>
        {value}
      </span>
    </div>
  );
}

/** Faux calibration panel — mirrors the desktop app's threshold inspector. */
function CalibrationPanel({ title, rows }: { title: string; rows: ReactNode }) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Sliders className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
      </div>
      <div className="mt-3 space-y-2">{rows}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the studio view it describes.
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

      {/* The faux studio view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AuraStudioGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Aura Studio', path: '/features/aura-studio' },
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
              An overlay that feels the room.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Aura reads your game and your chat every second and shifts the vibe
              for you. It computes a live state — Calm, Building, Hype — from game
              telemetry and chat velocity, then drives your OBS overlays over a
              local bridge. No manual switching, no cloud.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A Canvas of Light in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Pick an aura &rarr; calibrate your threshold &rarr; let it shift the
            vibe live. Everything runs on your machine.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — The Gallery */}
          <Step
            index={1}
            icon={Palette}
            eyebrow="The Gallery"
            title="Pick an Aura from the gallery."
            body="Open Aura Studio and browse the built-in gallery of overlay looks. Each aura is a full Canvas of Light — Calm, Neon, Hype and more — that reacts to your vibe state. Click one to make it the active overlay for your stream."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Palette className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Overlay gallery
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <AuraTile
                    tone="calm"
                    icon={Sparkles}
                    name="Calm"
                    subtitle="soft, slow drift"
                  />
                  <AuraTile
                    tone="neon"
                    icon={Sparkles}
                    name="Neon"
                    subtitle="crisp, reactive"
                    selected
                  />
                  <AuraTile
                    tone="hype"
                    icon={Sparkles}
                    name="Hype"
                    subtitle="bright, high energy"
                  />
                  <AuraTile
                    tone="calm"
                    icon={Sparkles}
                    name="Aurora"
                    subtitle="ambient sweep"
                  />
                </div>
              </div>
            }
          />

          {/* Step 2 — The Calibration */}
          <Step
            index={2}
            icon={Gauge}
            eyebrow="The Calibration"
            title="Calibrate your hype threshold."
            body="Every stream peaks differently, so you set where 'Hype' kicks in. Drag the threshold along the Calm → Hype scale until it matches your room, and Aura remembers it — the calibration persists between sessions."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Sliders className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                  Set the threshold
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <CalibrationPanel
                    title="Hype Calibration"
                    rows={
                      <>
                        <PropRow label="Threshold" value="72%" accent />
                        <PropRow label="Persists" value="Yes" />
                      </>
                    }
                  />
                  {/* Calm → Hype scale */}
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                      <span className="text-purple-300">Calm</span>
                      <span className="text-emerald-300">Hype</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-gradient-to-r from-purple-400/70 via-cyan-400/70 to-emerald-400/80">
                      <span
                        aria-hidden
                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#05070A] bg-cyan-300 shadow-[0_0_0_2px_rgba(34,211,238,0.6)]"
                        style={{ left: '72%' }}
                      />
                    </div>
                    <p className="font-mono text-[11px] text-zinc-500">
                      Hype fires past 72%
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          {/* Step 3 — The Vibe Engine */}
          <Step
            index={3}
            icon={Radio}
            eyebrow="The Vibe Engine"
            title="It shifts your vibe live, once a second."
            body="Aura reads your game telemetry and chat velocity at 1 Hz, computes the current vibe state, and drives your active OBS overlay over the local HTTP bridge on port 4500. You never touch a switch — the atmosphere just follows the moment."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Activity className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Vibe engine · live
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-center">
                  <div className="w-full max-w-xs space-y-2">
                    <PropRow label="Game telemetry" value="reading" />
                    <PropRow label="Chat velocity" value="61 / s" />
                  </div>
                  <span aria-hidden className="flex items-center justify-center text-zinc-600">
                    <span className="hidden h-px w-10 bg-gradient-to-r from-cyan-400/60 to-emerald-400/60 sm:block" />
                    <ArrowRight className="h-4 w-4 rotate-90 text-zinc-500 sm:rotate-0" />
                  </span>
                  <div className="w-full max-w-xs rounded-xl border border-emerald-400/40 bg-emerald-400/[0.06] p-4">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        Vibe state · 1 Hz tick
                      </span>
                    </div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-emerald-300">
                      HYPE
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.04] px-3 py-2 text-sm text-cyan-200/90">
                  <Radio className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2} aria-hidden />
                  Driving OBS overlay
                  <span className="font-mono text-cyan-300">:4500</span>
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
              Light that runs on your machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Aura Studio ships in the streamerOS GA build — available now,
              running entirely locally with no cloud in the loop.
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
