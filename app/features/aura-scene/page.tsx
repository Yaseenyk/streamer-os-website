import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  Image as ImageIcon,
  Layers,
  MonitorPlay,
  Sparkles,
  Type,
  Upload,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { ScreenshotStrip } from '@/components/ScreenshotStrip';
import { SHOTS } from '@/lib/shots';
import { Screenshot } from '@/components/Screenshot';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Aura Scene Builder — Feature Guide',
  description:
    'Build your own stream overlays inside streamerOS. Drag text, images and ' +
    'video onto a 1920×1080 transparent canvas, save, and OBS shows it through ' +
    'a Browser Source served from your own PC.',
  alternates: { canonical: 'https://streamerosai.com/features/aura-scene' },
};

// Answers stay within the product spec (API_SPECIFICATION §6.17,
// SYSTEM_ARCHITECTURE §3). The Google Fonts request is the one outside call —
// say so plainly rather than let "zero cloud" imply otherwise.
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Do I need Canva, Photoshop or an overlay website to use it?',
    a: 'No. Aura Scene Builder is built into streamerOS. You import your own images and video, add text, arrange the layers on a 1920×1080 transparent canvas and save. If you already make graphics in another tool, export them as PNG, SVG or WEBM and position them here.',
  },
  {
    q: 'How does the overlay get into OBS?',
    a: 'Add a Browser Source in OBS pointing at the local address streamerOS gives you. streamerOS serves the overlay from your own PC, and anything you save shows up in OBS within a fraction of a second. The editor and OBS load the very same asset files, so what you design is what streams.',
  },
  {
    q: 'Which file types can I use?',
    a: 'Images in PNG, JPG, GIF, WEBP, BMP and SVG, and video in WEBM and MP4. Text layers can use Google Fonts. Each file you import is copied into the app’s local asset folder, and you can save as many scenes as you need.',
  },
  {
    q: 'Does anything get uploaded?',
    a: 'Your assets and scenes stay on your PC. There is one outside request: when a scene uses a Google font, the font files load from Google, both in the editor and in OBS. A scene that uses no Google fonts makes no outside request.',
  },
  {
    q: 'What is the difference between Aura Scene Builder and Aura Studio?',
    a: 'Aura Studio is the gallery of ready-made overlays that react to the vibe of your stream. Aura Scene Builder is where you build your own, from your own assets. Pick a look from the gallery, build a custom one, or use both.',
  },
  {
    q: 'Can the AI build a scene for me?',
    a: 'Yes. Ask the AI Sidekick for something like “design a starting-soon screen” and it generates the scene and pushes it live.',
  },
  {
    q: 'Is Aura Scene Builder included in the price?',
    a: 'Yes. streamerOS is free for 7 days, then $29 once, and the licence includes Aura Scene Builder. It is not an add-on or a separate tier. It ships at launch in February 2027.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Aura Scene
// editor. The real, draggable canvas lives in the streamerOS desktop app; this
// site just explains it. Tints mark layer types: text = cyan, video = purple,
// image = emerald.
// ---------------------------------------------------------------------------

/** A single imported file inside the faux "Assets" panel. */
function AssetRow({ icon: Icon, name, kind }: { icon: LucideIcon; name: string; kind: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="flex min-w-0 items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={1.75} aria-hidden />
        <span className="truncate text-sm font-medium text-zinc-200">{name}</span>
      </span>
      <span className="shrink-0 font-mono text-[11px] uppercase text-zinc-500">{kind}</span>
    </div>
  );
}

/** A single layer inside the faux "Layers" panel, top of the stack first. */
function LayerRow({ icon: Icon, name, selected }: { icon: LucideIcon; name: string; selected?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${
        selected ? 'border-cyan-400/40 bg-cyan-400/[0.06]' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 ${selected ? 'text-cyan-300' : 'text-zinc-500'}`}
        strokeWidth={1.75}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200">{name}</span>
    </div>
  );
}

/** A single labelled value row inside a faux status readout. */
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

const LINK_CLASS = 'text-cyan-400 underline-offset-2 hover:underline';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AuraSceneGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Aura Scene Builder', path: '/features/aura-scene' },
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
              Design the overlay. See it in OBS a moment later.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Aura Scene Builder is a drag-and-drop overlay editor inside
              streamerOS — think a simple Canva built for stream overlays. Stack
              text, images and video on a 1920×1080 transparent canvas, hit save,
              and OBS picks it up from a Browser Source that streamerOS serves on
              your own PC. No separate design app, no overlay website, no
              uploads.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src={SHOTS.auraScene.src}
        alt={SHOTS.auraScene.alt}
        caption={SHOTS.auraScene.caption}
        width={SHOTS.auraScene.width}
        height={SHOTS.auraScene.height}
      />

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From blank canvas to live overlay in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Import &rarr; Arrange &rarr; Stream. Or skip the dragging and ask the
            AI Sidekick for a scene.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Import assets */}
          <Step
            index={1}
            icon={Upload}
            eyebrow="Bring your assets"
            title="Import images and video from your PC."
            body="Pick files straight from your drive: PNG, JPG, GIF, WEBP, BMP or SVG images, and WEBM or MP4 video. streamerOS copies each one into its own local asset folder, ready to drop onto the canvas. Nothing is uploaded."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Upload className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Local asset folder
                </p>
                <Panel icon={ImageIcon} title="Assets">
                  <AssetRow icon={ImageIcon} name="logo-mark.svg" kind="svg" />
                  <AssetRow icon={ImageIcon} name="webcam-frame.png" kind="png" />
                  <AssetRow icon={Video} name="starting-soon-loop.webm" kind="webm" />
                  <AssetRow icon={ImageIcon} name="sub-goal-bar.gif" kind="gif" />
                </Panel>
              </div>
            }
          />

          {/* Step 2 — Arrange layers */}
          <Step
            index={2}
            icon={Layers}
            eyebrow="Build the scene"
            title="Drag, resize and stack your layers."
            body="Drop text, image and video layers onto a 1920×1080 transparent canvas, then move them, resize them and choose what sits on top. Text layers can use Google Fonts to match your channel branding. Save as many scenes as you need: starting soon, BRB, just chatting."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Layers className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Canvas · 1920 × 1080 · transparent
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-dashed border-white/15 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]">
                  {/* Video layer */}
                  <div className="absolute left-[8%] right-[8%] top-[10%] flex h-[46%] items-center justify-center gap-2 rounded-md border border-purple-400/40 bg-purple-400/[0.06] text-purple-300">
                    <Video className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Video loop</span>
                  </div>
                  {/* Text layer — selected, with resize handles */}
                  <div className="absolute bottom-[12%] left-[8%] rounded-md border-2 border-cyan-400/70 bg-cyan-400/[0.06] px-3 py-1.5">
                    <span className="text-sm font-semibold tracking-wide text-cyan-200">
                      STARTING SOON
                    </span>
                    <span aria-hidden className="absolute -left-1 -top-1 h-2 w-2 rounded-sm bg-cyan-300" />
                    <span aria-hidden className="absolute -right-1 -top-1 h-2 w-2 rounded-sm bg-cyan-300" />
                    <span aria-hidden className="absolute -bottom-1 -left-1 h-2 w-2 rounded-sm bg-cyan-300" />
                    <span aria-hidden className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-cyan-300" />
                  </div>
                  {/* Image layer */}
                  <div className="absolute bottom-[12%] right-[8%] flex aspect-square h-[26%] items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-400/[0.06] text-emerald-300">
                    <ImageIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </div>
                </div>
                <Panel icon={Layers} title="Layers">
                  <LayerRow icon={Type} name="Text · Starting soon" selected />
                  <LayerRow icon={ImageIcon} name="logo-mark.svg" />
                  <LayerRow icon={Video} name="starting-soon-loop.webm" />
                </Panel>
              </div>
            }
          />

          {/* Step 3 — Into OBS */}
          <Step
            index={3}
            icon={MonitorPlay}
            eyebrow="Put it on stream"
            title="Point an OBS Browser Source at it."
            body="In OBS, add a Browser Source pointing at the local address streamerOS gives you. After that, every save shows up in OBS within a fraction of a second. The editor and OBS load the very same asset files, so what you designed is exactly what streams."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <MonitorPlay className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Editor &rarr; OBS
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-center">
                  <div className="w-full max-w-xs space-y-2">
                    <PropRow label="Scene" value="Starting soon" />
                    <PropRow label="Status" value="Saved" accent />
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
                        OBS · Browser Source
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold tracking-tight text-emerald-300">
                      Starting soon
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Same asset files in the editor and in OBS.
                </div>
              </div>
            }
          />

          {/* Step 4 — Ask the AI Sidekick */}
          <Step
            index={4}
            icon={Sparkles}
            eyebrow="Or just ask"
            title="Let the AI Sidekick design it."
            body="Ten minutes to go live and no starting screen? Tell the AI Sidekick what you need, like “design a starting-soon screen”, and it generates the scene and pushes it live for you."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  AI Sidekick
                </p>
                <div className="space-y-3">
                  <div className="ml-auto w-fit max-w-[85%] rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-200">
                    Design a starting-soon screen for tonight.
                  </div>
                  <div className="flex max-w-[85%] items-start gap-2.5 rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] px-3 py-2.5">
                    <Bot className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} aria-hidden />
                    <span className="text-sm text-cyan-100/90">
                      Built a starting-soon scene and pushed it live.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Scene live in OBS &mdash; no dragging required.
                </div>
              </div>
            }
          />
        </div>

        {/* Related features */}
        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-zinc-500">
            Want a ready-made look instead? Browse the vibe-reactive overlays in{' '}
            <Link href="/features/aura-studio" className={LINK_CLASS}>
              Aura Studio
            </Link>
            . Prefer to ask than drag? The{' '}
            <Link href="/features/ai-sidekick" className={LINK_CLASS}>
              AI Sidekick
            </Link>{' '}
            builds scenes on request, and the{' '}
            <Link href="/features/obs-bridge" className={LINK_CLASS}>
              OBS Bridge
            </Link>{' '}
            handles your scene switching.
          </p>
        </Reveal>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="Build it, then watch it land."
        blurb="The scene editor, the ready-made overlay gallery, and the AI Sidekick acting on a plain request."
        shots={[SHOTS.auraScene, SHOTS.aura, SHOTS.aiAction]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your overlays, built where you stream.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Aura Scene Builder ships at launch in February 2027. Free for 7
              days, then $29 once — the builder is included, and your assets stay
              on your PC.
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
