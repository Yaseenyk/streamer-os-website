import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  GitMerge,
  MonitorPlay,
  MousePointerClick,
  Settings2,
  Spline,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Auto-Hype Director — Feature Guide',
  description:
    'A step-by-step visual guide to the Auto-Hype Director: build a node ' +
    'rule that switches your OBS scene automatically when chat catches fire.',
  alternates: { canonical: 'https://streamerosai.com/features/auto-hype' },
};

// Answers stay within claims made elsewhere on the site (FAQ, feature pages).
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does the Auto-Hype Director work with OBS Studio?',
    a: 'Yes — it is built natively for OBS Studio. streamerOS talks to OBS over OBS WebSocket v5, the official control interface, entirely on your local machine. When a rule fires, it switches your OBS scene directly — no plugins to install and no cloud round-trip.',
  },
  {
    q: 'Do I need to know how to code or script?',
    a: 'No. The Auto-Hype Director is a visual node editor: you drag Trigger, Logic, and Action nodes onto a canvas and wire them together. A working "chat erupts → cut to Victory scene" rule takes three nodes and no scripting.',
  },
  {
    q: 'What can trigger an automatic OBS scene switch?',
    a: 'Trigger nodes watch live signals like chat velocity, chat sentiment, Super Chats, and game state. You combine them through AND / OR logic gates, so a rule can be as simple as "chat velocity above 40 messages per second" or require several conditions at once.',
  },
  {
    q: 'Will automation add lag to my stream?',
    a: 'No. Everything runs locally next to OBS — there is no server in the loop. The whole streamerOS app holds a 1.8% CPU footprint under a live 1080p60 game, so your frames stay with the game and the scene cut lands the instant the trigger condition is met.',
  },
];

// ---------------------------------------------------------------------------
// Static node "chips" — these only LOOK like the desktop editor's nodes. The
// real, interactive graph lives in the streamerOS desktop app; this site just
// explains it. Tints map to the app's node palette: trigger=cyan,
// logic=purple, action=emerald.
// ---------------------------------------------------------------------------
type NodeTone = 'trigger' | 'logic' | 'action';

const NODE_TONE: Record<NodeTone, { ring: string; icon: string; dot: string }> = {
  trigger: {
    ring: 'border-cyan-400/40 bg-cyan-400/[0.06]',
    icon: 'text-cyan-300',
    dot: 'bg-cyan-400',
  },
  logic: {
    ring: 'border-purple-400/40 bg-purple-400/[0.06]',
    icon: 'text-purple-300',
    dot: 'bg-purple-400',
  },
  action: {
    ring: 'border-emerald-400/40 bg-emerald-400/[0.06]',
    icon: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
};

function NodeChip({
  tone,
  icon: Icon,
  kind,
  title,
  subtitle,
}: {
  tone: NodeTone;
  icon: LucideIcon;
  kind: string;
  title: string;
  subtitle: string;
}) {
  const t = NODE_TONE[tone];
  return (
    <div className={`w-full max-w-xs rounded-xl border ${t.ring} p-4 backdrop-blur-sm`}>
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {kind}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${t.icon}`}>
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">{title}</p>
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

/** Faux properties panel — mirrors the desktop app's right-hand inspector. */
function PropertiesPanel({ title, rows }: { title: string; rows: ReactNode }) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Settings2 className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
      </div>
      <div className="mt-3 space-y-2">{rows}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the editor view it describes.
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

      {/* The faux editor view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AutoHypeGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Auto-Hype Director', path: '/features/auto-hype' },
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
              Master the Auto-Hype Director.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              A simple visual node editor that automates OBS based on your chat&rsquo;s
              live energy. You drag nodes onto a canvas, wire them together, and
              streamerOS switches scenes the instant the room reacts — no scripting,
              no plugins, no cloud.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Build your first rule in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Trigger &rarr; Logic &rarr; Action. Watch a quiet stream cut to your
            Victory scene the moment chat erupts.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — The Trigger */}
          <Step
            index={1}
            icon={Zap}
            eyebrow="The Trigger"
            title="Drop a Trigger node onto the canvas."
            body="Open the Auto-Hype Director and drag a Trigger node from the palette onto the canvas. With it selected, the Properties panel opens on the right — set it to watch Chat Velocity and fire when it climbs past 40 messages per second."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <MousePointerClick className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Drag onto canvas
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <NodeChip
                    tone="trigger"
                    icon={Zap}
                    kind="Trigger"
                    title="Chat Velocity"
                    subtitle="when value > threshold"
                  />
                  <PropertiesPanel
                    title="Trigger Properties"
                    rows={
                      <>
                        <PropRow label="Metric" value="Chat Velocity" />
                        <PropRow label="Condition" value=">" />
                        <PropRow label="Threshold" value="40 / s" accent />
                      </>
                    }
                  />
                </div>
              </div>
            }
          />

          {/* Step 2 — The Logic */}
          <Step
            index={2}
            icon={GitMerge}
            eyebrow="The Logic"
            title="Connect the Trigger into a logic gate."
            body="Drag from the Trigger node's output handle to an AND gate to draw a connection. Logic nodes combine multiple signals — with a single trigger, AND simply passes it through, and you can add more conditions later without rewiring."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Spline className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                  Draw a connection
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <NodeChip
                    tone="trigger"
                    icon={Zap}
                    kind="Trigger"
                    title="Chat Velocity"
                    subtitle="> 40 / s"
                  />
                  {/* Connector */}
                  <span aria-hidden className="flex items-center text-zinc-600">
                    <span className="hidden h-px w-10 bg-gradient-to-r from-cyan-400/60 to-purple-400/60 sm:block" />
                    <ArrowRight className="h-4 w-4 rotate-90 text-zinc-500 sm:rotate-0" />
                  </span>
                  <NodeChip
                    tone="logic"
                    icon={GitMerge}
                    kind="Logic"
                    title="AND gate"
                    subtitle="all inputs true"
                  />
                </div>
              </div>
            }
          />

          {/* Step 3 — The Action */}
          <Step
            index={3}
            icon={MonitorPlay}
            eyebrow="The Action"
            title="Wire the gate to a scene switch."
            body="Finally, connect the gate to an Action node and point it at OBS. Set the action to Switch OBS Scene and choose your Victory scene. When chat velocity crosses 40/s, the gate goes hot and streamerOS cuts the broadcast to Victory automatically."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Workflow className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Set the output
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-center">
                  <NodeChip
                    tone="logic"
                    icon={GitMerge}
                    kind="Logic"
                    title="AND gate"
                    subtitle="all inputs true"
                  />
                  <span aria-hidden className="flex items-center text-zinc-600">
                    <span className="hidden h-px w-10 bg-gradient-to-r from-purple-400/60 to-emerald-400/60 sm:block" />
                    <ArrowRight className="h-4 w-4 rotate-90 text-zinc-500 sm:rotate-0" />
                  </span>
                  <PropertiesPanel
                    title="Action Properties"
                    rows={
                      <>
                        <PropRow label="Action" value="Switch OBS Scene" />
                        <PropRow label="Scene" value="Victory" accent />
                      </>
                    }
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Rule live: chat erupts &rarr; broadcast cuts to Victory.
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
              Build it on your own machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The Auto-Hype Director ships in streamerOS v1.0-GA — free, open
              source, and running at a 1.8% CPU footprint.
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
