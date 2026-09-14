import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Clapperboard,
  Crop,
  Film,
  Flame,
  FolderOpen,
  Smartphone,
  SquareStop,
  Timer,
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
  title: 'Shorts Factory — Feature Guide',
  description:
    'Turn stream VODs into vertical 9:16 shorts on your own PC. Pick a hype ' +
    'marker, set the window, and streamerOS crops and encodes an .mp4 locally ' +
    'with FFmpeg. No upload.',
  alternates: { canonical: 'https://streamerosai.com/features/shorts-factory' },
};

// Answers stay within the product spec (API_SPECIFICATION §7, §10.2; PRD §3E).
// Limits are stated plainly: encoding is CPU-heavy and the crop is centred —
// no face tracking or captions. Release timing matches the rest of the site
// (features index + pricing FAQ: Shorts Factory is in the launch build).
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does Shorts Factory upload my VODs anywhere?',
    a: 'No. Cropping and encoding run locally with FFmpeg on your PC, and the finished .mp4 is written to the shorts folder in your streamerOS workspace. Your footage never leaves the machine.',
  },
  {
    q: 'Will it post to TikTok, YouTube Shorts or Reels for me?',
    a: 'No. streamerOS does not publish anywhere. It hands you a finished vertical .mp4 and a Reveal in Explorer button, and you upload it with whatever you already use. The Viral Engine can suggest titles and hashtags for the post.',
  },
  {
    q: 'Can I make shorts while I’m live?',
    a: 'We don’t recommend it. Video encoding uses a lot of CPU, so Shorts Factory is an after-stream job, not something to run alongside a live game. Finish the stream, then cut your shorts.',
  },
  {
    q: 'Does it track my face or reframe the shot automatically?',
    a: 'Not yet. The crop is a centred 9:16 cut from a landscape recording, so it works best when the action sits near the middle of the frame. There is no automatic face tracking, smart framing or burned-in captions today.',
  },
  {
    q: 'Which video formats does it accept?',
    a: 'Source VODs in .mp4, .mkv, .mov or .webm from your streamerOS workspace. The source needs to be landscape, like a normal 16:9 stream recording, for the centred crop to work. The output is always an .mp4.',
  },
  {
    q: 'How long is each short, and can I stop an encode?',
    a: 'The window starts at 60 seconds around the hype marker you pick, and you can adjust it to fit the moment. You can cancel an encode at any time, and the partial file is cleaned up.',
  },
  {
    q: 'Is Shorts Factory included in the $29 licence?',
    a: 'Yes. streamerOS is free for 7 days, then $29 once, and the licence includes Shorts Factory. It is not an add-on or a separate tier. It ships at launch in November 2026.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Shorts
// workspace. The real timeline, crop and FFmpeg encoder live in the streamerOS
// desktop app; this site just explains it. Everything is local: the VOD, the
// encode and the finished short never leave the machine.
// ---------------------------------------------------------------------------

/** A single VOD row inside the faux "Workspace VODs" panel. */
function FileRow({ name, duration, tag }: { name: string; duration: string; tag?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="flex min-w-0 items-center gap-2.5">
        <Film className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={1.75} aria-hidden />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-zinc-200">{name}</span>
          {tag && (
            <span className="block font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
              {tag}
            </span>
          )}
        </span>
      </span>
      <span className="shrink-0 font-mono text-[11px] text-zinc-500">{duration}</span>
    </div>
  );
}

/** A single labelled value row inside a faux settings panel. */
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
        <span className="truncate text-xs font-semibold text-zinc-300">{title}</span>
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

// Hype markers on the faux timeline, as a percentage of the VOD's length.
// The selected one sits at 2:14:36 of a 4:12:38 recording.
const MARKERS = [
  { at: 18, selected: false },
  { at: 53.3, selected: true },
  { at: 81, selected: false },
];

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
export default function ShortsFactoryGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Shorts Factory', path: '/features/shorts-factory' },
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
              Last night’s hype, cut to vertical.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Shorts Factory turns a stream VOD into a 9:16 short without opening
              an editor. Pick the recording, jump to a hype marker from your live
              stream, set the window and encode. FFmpeg runs on your own PC and
              the finished .mp4 lands in your workspace. Nothing is uploaded.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src={SHOTS.shortsFactory.src}
        alt={SHOTS.shortsFactory.alt}
        caption={SHOTS.shortsFactory.caption}
        width={SHOTS.shortsFactory.width}
        height={SHOTS.shortsFactory.height}
      />

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From VOD to vertical short in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Pick &rarr; Mark &rarr; Crop &rarr; Encode. Every step runs on your
            machine.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Pick the VOD */}
          <Step
            index={1}
            icon={FolderOpen}
            eyebrow="Pick the VOD"
            title="Choose a recording from your workspace."
            body="Pick a VOD in your streamerOS workspace (.mp4, .mkv, .mov or .webm), or stage a top-scored recording straight from the Clip Library. Staging copies the file, so your original recording stays untouched."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <FolderOpen className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Workspace
                </p>
                <Panel icon={Film} title="VODs">
                  <FileRow
                    name="2026-07-04_ranked-grind.mkv"
                    duration="4:12:38"
                    tag="Staged from Clip Library"
                  />
                  <FileRow name="2026-07-02_launch-day.mp4" duration="2:47:05" />
                  <FileRow name="2026-06-29_late-night-q&a.mov" duration="1:53:20" />
                </Panel>
              </div>
            }
          />

          {/* Step 2 — Find the moment */}
          <Step
            index={2}
            icon={Flame}
            eyebrow="Find the moment"
            title="Jump to a hype marker on the timeline."
            body="The timeline shows the hype markers Viral Moments dropped while you were live, so you start where chat reacted instead of scrubbing four hours of footage."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Flame className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Timeline · hype markers
                </p>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    <span>0:00:00</span>
                    <span>4:12:38</span>
                  </div>
                  <div className="relative mt-4 h-2 rounded-full bg-white/5">
                    {MARKERS.map((m) => (
                      <span
                        key={m.at}
                        aria-hidden
                        className={`absolute top-1/2 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                          m.selected
                            ? 'bg-cyan-300 shadow-[0_0_0_2px_rgba(34,211,238,0.6)]'
                            : 'bg-zinc-500'
                        }`}
                        style={{ left: `${m.at}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[11px] text-zinc-500">
                    3 hype markers on this VOD
                  </p>
                </div>
                <Panel icon={Flame} title="Selected marker">
                  <PropRow label="Marker" value="2:14:36" accent />
                  <PropRow label="From" value="Viral Moments" />
                </Panel>
              </div>
            }
          />

          {/* Step 3 — Window + crop */}
          <Step
            index={3}
            icon={Crop}
            eyebrow="Set the window"
            title="Set the window and preview the 9:16 crop."
            body="Shorts Factory starts with 60 seconds around the marker, and you can adjust it to fit the moment. It crops your 16:9 frame to 9:16 from the centre, so it works best when the action sits near the middle of the shot."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Crop className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Crop preview · 16:9 &rarr; 9:16
                </p>
                <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                  <div aria-hidden className="absolute inset-y-0 left-0 w-[34.2%] bg-[#05070A]/70" />
                  <div aria-hidden className="absolute inset-y-0 right-0 w-[34.2%] bg-[#05070A]/70" />
                  <div className="absolute inset-y-0 left-[34.2%] flex w-[31.6%] flex-col items-center justify-center gap-1.5 border-2 border-cyan-400/70 bg-cyan-400/[0.06]">
                    <Smartphone className="h-4 w-4 text-cyan-300" strokeWidth={1.75} aria-hidden />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-200">
                      9:16
                    </span>
                  </div>
                </div>
                <Panel icon={Timer} title="Clip window">
                  <PropRow label="Length" value="60 s" accent />
                  <PropRow label="Start" value="2:14:06" />
                  <PropRow label="End" value="2:15:06" />
                  <PropRow label="Crop" value="Centred 9:16" />
                </Panel>
              </div>
            }
          />

          {/* Step 4 — Encode */}
          <Step
            index={4}
            icon={Clapperboard}
            eyebrow="Encode"
            title="Encode locally, then post it yourself."
            body="FFmpeg encodes an .mp4 into your workspace’s shorts folder while a progress bar shows the percent done and the encode speed. Cancel any time and the partial file is cleaned up. When it finishes, Reveal in Explorer takes you straight to the file, ready for TikTok, YouTube Shorts or Reels."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Clapperboard className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Encoding on this PC
                </p>
                <Panel icon={Film} title="short_ranked-grind_2-14-06.mp4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-cyan-300">64%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <span
                        aria-hidden
                        className="block h-full rounded-full bg-gradient-to-r from-cyan-400/70 to-cyan-300"
                        style={{ width: '64%' }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300">
                    <SquareStop className="h-4 w-4" strokeWidth={2} aria-hidden />
                    Cancel
                  </div>
                </Panel>
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Saved to shorts &mdash;
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-200">
                    <FolderOpen className="h-3.5 w-3.5" aria-hidden />
                    Reveal in Explorer
                  </span>
                </div>
              </div>
            }
          />
        </div>

        {/* Related features */}
        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-zinc-500">
            Shorts Factory picks up where the{' '}
            <Link href="/features/clip-library" className={LINK_CLASS}>
              Clip Library
            </Link>{' '}
            and{' '}
            <Link href="/features/viral-moments" className={LINK_CLASS}>
              Viral Moments
            </Link>{' '}
            leave off. When the short is ready, the{' '}
            <Link href="/features/viral-engine" className={LINK_CLASS}>
              Viral Engine
            </Link>{' '}
            can suggest titles and hashtags for the upload.
          </p>
        </Reveal>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="From hype spike to vertical short."
        blurb="The Shorts workspace, plus the Clip Library and live chat signals that show it where to cut."
        shots={[SHOTS.shortsFactory, SHOTS.clipLibrary, SHOTS.viralMoments, SHOTS.velocityStats]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Turn the stream you just finished into shorts.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Shorts Factory ships at launch in November 2026. Free for 7 days,
              then $29 once — Shorts Factory is included, and every encode stays
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
