import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Cast,
  Layers,
  MonitorPlay,
  PlugZap,
  Radio,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'OBS Bridge — Feature Guide',
  description:
    'streamerOS auto-discovers OBS over WebSocket, loads your scenes, and ' +
    'switches the program feed from the cockpit — no fragile plugins, no ' +
    'alt-tabbing.',
  alternates: { canonical: 'https://streamerosai.com/features/obs-bridge' },
};

// Answers stay within claims made elsewhere on the site (FAQ, feature pages).
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'How does streamerOS connect to OBS Studio?',
    a: 'streamerOS auto-discovers your OBS instance over OBS WebSocket v5 — the official control interface built into OBS Studio — loads your scene list, and lets you switch the program feed from the cockpit. The connection runs entirely on your local machine; nothing routes through a server.',
  },
  {
    q: 'Do I need to install an OBS plugin?',
    a: 'No. The WebSocket server streamerOS talks to ships inside OBS Studio itself — you just enable it in OBS settings. There are no fragile third-party plugins to install, update, or debug.',
  },
  {
    q: 'Can I switch OBS scenes without alt-tabbing out of my game?',
    a: 'Yes. Your scenes appear in the streamerOS cockpit, so you can cut the program feed from there — or wire up the Auto-Hype Director and let streamerOS switch scenes automatically when chat reacts, with no manual input at all.',
  },
  {
    q: 'Does the OBS connection ever leave my machine?',
    a: 'No. streamerOS is zero-cloud by architecture: the OBS WebSocket link is a localhost connection between two apps on your PC. Your scene data and control commands never touch the internet.',
  },
];

// ---------------------------------------------------------------------------
// Faux connection panel — these only LOOK like the desktop app's OBS Bridge
// connector. The real, interactive UI lives in the streamerOS desktop app;
// this site just explains it.
// ---------------------------------------------------------------------------
function ConnectionPanel({
  host,
  discovered,
}: {
  host: string;
  discovered: boolean;
}) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <PlugZap className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">Connect to OBS</span>
      </div>
      {discovered && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2">
          <Wifi className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} aria-hidden />
          <span className="text-sm text-cyan-200/90">
            OBS found on <span className="font-mono text-cyan-300">{host}</span>
          </span>
        </div>
      )}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Host
          </span>
          <span className="font-mono text-sm font-medium text-zinc-200">{host}</span>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400/90 px-3 py-2 text-sm font-semibold text-[#05070A]"
          tabIndex={-1}
          aria-hidden
        >
          <PlugZap className="h-4 w-4" strokeWidth={2} aria-hidden />
          Connect
        </button>
      </div>
    </div>
  );
}

/** A single scene row inside the faux scene list. */
function SceneRow({
  name,
  program,
  switching,
}: {
  name: string;
  program?: boolean;
  switching?: boolean;
}) {
  const base =
    'flex items-center justify-between gap-4 rounded-lg border px-3 py-2 text-sm';
  const tone = program
    ? 'border-emerald-400/40 bg-emerald-400/[0.06] text-emerald-100'
    : switching
      ? 'border-cyan-400/40 bg-cyan-400/[0.06] text-cyan-100'
      : 'border-white/5 bg-white/[0.02] text-zinc-300';
  return (
    <div className={`${base} ${tone}`}>
      <span className="flex items-center gap-2">
        <MonitorPlay
          className={`h-4 w-4 shrink-0 ${program ? 'text-emerald-300' : switching ? 'text-cyan-300' : 'text-zinc-500'}`}
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="font-medium">{name}</span>
      </span>
      {program && (
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
          Program
        </span>
      )}
      {switching && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
          Cutting…
        </span>
      )}
    </div>
  );
}

/** Faux scene list — mirrors the desktop app's cockpit scene picker. */
function SceneList({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Layers className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">Scenes</span>
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

/** Live connection-status badge, as shown in the app's top bar. */
function StatusBadge({ program }: { program: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2">
      <span className="flex items-center gap-2 text-sm font-medium text-emerald-200/90">
        <Radio className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2} aria-hidden />
        OBS Connected
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
        Program: <span className="text-emerald-300">{program}</span>
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the cockpit view it describes.
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

      {/* The faux cockpit view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ObsBridgeGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'OBS Bridge', path: '/features/obs-bridge' },
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
              OBS, without the alt-tab.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Native WebSocket control of your scenes from inside streamerOS — no
              plugins. The OBS Bridge auto-discovers a running OBS instance, loads
              your scenes into the cockpit, and cuts the program feed without you
              ever leaving your game.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Connected in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Discover &rarr; Load &rarr; Switch. No plugin chain to maintain — the
            OBS Bridge talks to OBS Studio over its built-in WebSocket server.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Auto-discover */}
          <Step
            index={1}
            icon={Wifi}
            eyebrow="Auto-discover OBS"
            title="streamerOS finds your running OBS."
            body="Launch OBS with its built-in WebSocket server on, and the OBS Bridge discovers it automatically over the network — no plugin to install into OBS. Prefer to be explicit? Enter the host by hand and connect manually."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Cast className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Discover over WebSocket
                </p>
                <div className="flex justify-center">
                  <ConnectionPanel host="localhost:4455" discovered />
                </div>
              </div>
            }
          />

          {/* Step 2 — Scenes load in */}
          <Step
            index={2}
            icon={Layers}
            eyebrow="Your scenes load in"
            title="Every OBS scene appears in the cockpit."
            body="The moment the bridge connects, all of your OBS scenes stream into the cockpit's scene list. The current program scene is highlighted, so you always know what's live at a glance."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Layers className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Scenes synced from OBS
                </p>
                <div className="flex justify-center">
                  <SceneList>
                    <SceneRow name="Starting Soon" program />
                    <SceneRow name="Gameplay" />
                    <SceneRow name="Just Chatting" />
                    <SceneRow name="BRB" />
                    <SceneRow name="Victory" />
                  </SceneList>
                </div>
              </div>
            }
          />

          {/* Step 3 — Switch the feed */}
          <Step
            index={3}
            icon={Radio}
            eyebrow="Switch the feed from the cockpit"
            title="Click a scene to cut the program feed."
            body="Click any scene and streamerOS switches the live program feed over the WebSocket — instantly, without alt-tabbing. The connection-status badge in the top bar stays live and reports the current program scene the whole time."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <MonitorPlay className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Cut the program feed
                </p>
                <div className="flex justify-center">
                  <SceneList>
                    <SceneRow name="Starting Soon" />
                    <SceneRow name="Gameplay" />
                    <SceneRow name="Just Chatting" />
                    <SceneRow name="BRB" />
                    <SceneRow name="Victory" switching />
                  </SceneList>
                </div>
                <StatusBadge program="Victory" />
              </div>
            }
          />
        </div>
      </section>

      {/* Foundation note */}
      <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-24">
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#05070A] text-cyan-300">
              <PlugZap className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                The foundation the Auto-Director builds on.
              </h2>
              <p className="mt-2 leading-relaxed text-zinc-400">
                Reliable, plugin-free scene control is what makes automation
                possible. Once the OBS Bridge is live, the Auto-Director can switch
                your scenes for you — the bridge is the connection everything else
                rides on.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Available now in the GA build.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The OBS Bridge ships in streamerOS v1.0-GA — native WebSocket control,
              no plugins to install into OBS, and a live status badge that never
              lies about what&rsquo;s on air.
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
