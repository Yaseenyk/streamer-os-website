import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  AudioLines,
  Ban,
  Check,
  Download,
  FolderOpen,
  Mic,
  Plus,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  X,
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
  title: 'Brand Guard — Feature Guide',
  description:
    'Brand Guard transcribes your mic locally with Whisper and puts an alert on ' +
    'screen when you say a term your sponsor deal rules out, like a ' +
    'competitor’s brand. No cloud, no recording unless you opt in.',
  alternates: { canonical: 'https://streamerosai.com/features/brand-guard' },
};

// Answers stay within the product spec (API_SPECIFICATION §5.1–§5.4,
// SYSTEM_ARCHITECTURE §1 ASR row). Limits are stated plainly: English-focused
// model, Hindi/Hinglish recall not benchmarked, CPU cost while talking, and
// word matching rather than intent. Release timing matches the rest of the
// site (features index + pricing FAQ: Brand Guard is in the launch build).
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does Brand Guard record my stream audio?',
    a: 'Not unless you ask it to. Your microphone audio is transcribed in memory on your PC and nothing is saved. If you switch on “save audit audio” for a session, the audio clips and transcript snippets are written to the audit folder in your streamerOS workspace, still on your own disk.',
  },
  {
    q: 'Is my voice sent to the cloud for transcription?',
    a: 'No. Transcription runs locally with Whisper (whisper.cpp) on your PC. The feature’s only network use is the one-time model download from Hugging Face when you click “Download model”, and that file is checked against a pinned checksum before it is used.',
  },
  {
    q: 'Does it work in Hindi or Hinglish?',
    a: 'We can’t promise that yet. The v1 model is an English base model, and we have not benchmarked how well it catches terms in Hindi or Hinglish speech. English sponsored segments are what it is built for today.',
  },
  {
    q: 'Will it slow down my game or stream?',
    a: 'Speech recognition uses noticeably more CPU than the rest of streamerOS while you are talking. It skips silent stretches, but the best practice is to switch Brand Guard on for your sponsored segments rather than leave it running all stream.',
  },
  {
    q: 'Does it understand what I mean, or only the words?',
    a: 'Only the words. Brand Guard matches your speech against the list of terms you set; it does not judge intent, so naming a competitor in a joke triggers the same alert as recommending them. It is an early warning for slips, not a guarantee that nothing gets through.',
  },
  {
    q: 'How does it connect to my Media Kit?',
    a: 'When you save audit audio for a session, streamerOS also writes a compliance summary for that session to your workspace, and the Media Kit uses those summaries for its brand-safety figure. Sessions without the opt-in do not add to it.',
  },
  {
    q: 'Is Brand Guard included in the $29 licence?',
    a: 'Yes. streamerOS is free for 7 days, then $29 once, and the licence includes Brand Guard. It is not an add-on or a separate tier. It ships at launch in February 2027.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Brand Guard.
// The real microphone listener and Whisper transcription live in the
// streamerOS desktop app; this site just explains it. Brand names below are
// made up for the mock.
// ---------------------------------------------------------------------------

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

/** A single banned term inside the faux "Banned terms" panel. */
function TermChip({ term }: { term: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-200">
      {term}
      <X className="h-3 w-3 text-zinc-500" strokeWidth={2} aria-hidden />
    </span>
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
export default function BrandGuardGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Brand Guard', path: '/features/brand-guard' },
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
              Know the moment you name the wrong brand.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              One slip of a competitor’s name can put a sponsor deal at risk.
              Brand Guard listens to the microphone you choose, transcribes your
              speech on your own PC with Whisper, and checks it against the terms
              you’ve banned. Say one, and an alert shows you the word and what
              you said around it, so you can correct course while you’re still
              live.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src={SHOTS.brandGuard.src}
        alt={SHOTS.brandGuard.alt}
        caption={SHOTS.brandGuard.caption}
        width={SHOTS.brandGuard.width}
        height={SHOTS.brandGuard.height}
      />

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From banned list to live alert in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Download &rarr; List &rarr; Listen &rarr; Alert. The speech
            recognition runs on your PC.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Model download */}
          <Step
            index={1}
            icon={Download}
            eyebrow="One-time setup"
            title="Download the speech model once."
            body="Click “Download model” and streamerOS fetches an English Whisper base model (about 142 MB) from Hugging Face. The file is checked against a pinned checksum before it is used. That download is the only network use in Brand Guard."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Download className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Speech model · one-time
                </p>
                <Panel icon={AudioLines} title="Whisper model">
                  <PropRow label="Model" value="English · base" />
                  <PropRow label="Size" value="~142 MB" />
                  <PropRow label="Source" value="Hugging Face" />
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                        Download
                      </span>
                      <span className="text-sm font-medium text-cyan-300">100%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <span
                        aria-hidden
                        className="block h-full rounded-full bg-gradient-to-r from-cyan-400/70 to-cyan-300"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </Panel>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Checksum verified &mdash; model ready.
                </div>
              </div>
            }
          />

          {/* Step 2 — Banned terms */}
          <Step
            index={2}
            icon={Ban}
            eyebrow="Set your list"
            title="List the words your deal rules out."
            body="Add the terms you can’t say on stream: a competitor’s brand, a rival product, anything your sponsor agreement flags. Then pick the microphone Brand Guard should listen to."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Ban className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Banned terms
                </p>
                <Panel icon={ShieldCheck} title="Sponsor rules">
                  <div className="flex flex-wrap gap-2">
                    <TermChip term="RivalCola" />
                    <TermChip term="FizzMax" />
                    <TermChip term="NovaPods" />
                    <span className="inline-flex items-center gap-1 rounded-lg border border-dashed border-white/15 px-2.5 py-1 text-xs text-zinc-500">
                      <Plus className="h-3 w-3" strokeWidth={2} aria-hidden />
                      Add term
                    </span>
                  </div>
                  <PropRow label="Microphone" value="USB Microphone" />
                </Panel>
              </div>
            }
          />

          {/* Step 3 — Listening */}
          <Step
            index={3}
            icon={Mic}
            eyebrow="Go live"
            title="Switch it on for the sponsored segment."
            body="Brand Guard transcribes your speech locally and skips silent stretches. Audio is processed in memory, and nothing is recorded unless you turn on “save audit audio” for that session. Speech recognition is heavier on the CPU than the rest of streamerOS while you’re talking, so use it for the segments that matter."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Mic className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Brand Guard · on
                </p>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/[0.06] p-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Listening
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <AudioLines className="h-5 w-5 text-emerald-300" strokeWidth={1.75} aria-hidden />
                    <span className="text-sm font-medium text-zinc-200">USB Microphone</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <PropRow label="Transcription" value="On this PC" accent />
                  <PropRow label="Save audit audio" value="Off" />
                  <PropRow label="Audio saved" value="None" />
                </div>
              </div>
            }
          />

          {/* Step 4 — Alert */}
          <Step
            index={4}
            icon={ShieldAlert}
            eyebrow="Get the alert"
            title="See the word, and what you said around it."
            body="Say a banned term and an on-screen alert shows the match with up to five words of context, so you know exactly what slipped out. If you opted in to save audit audio, the clip and a transcript snippet go to the audit folder in your workspace, and the session’s compliance summary feeds the brand-safety figure in your Media Kit."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-300" aria-hidden />
                  Alert
                </p>
                <div className="rounded-xl border border-amber-400/30 bg-amber-400/[0.08] p-4">
                  <div className="flex items-center gap-2">
                    <TriangleAlert className="h-4 w-4 text-amber-300" strokeWidth={2} aria-hidden />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                      Banned term detected
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-amber-300">
                    RivalCola
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    &hellip;I’d grab a{' '}
                    <span className="font-semibold text-amber-300">RivalCola</span> before
                    the&hellip;
                  </p>
                </div>
                <Panel icon={FolderOpen} title="Audit folder · opt-in sessions only">
                  <PropRow label="Audio clip" value="Saved" />
                  <PropRow label="Transcript" value="Snippet saved" />
                  <PropRow label="Summary" value="To Media Kit" accent />
                </Panel>
              </div>
            }
          />
        </div>

        {/* Related features */}
        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-zinc-500">
            Opt-in session summaries feed the brand-safety figure in your{' '}
            <Link href="/features/media-kit" className={LINK_CLASS}>
              Media Kit
            </Link>
            , and the deals you are protecting live in the{' '}
            <Link href="/features/sponsor-crm" className={LINK_CLASS}>
              Sponsor CRM
            </Link>
            . For how streamerOS keeps your audio and data on your PC, see{' '}
            <Link href="/features/zero-cloud" className={LINK_CLASS}>
              Zero Cloud
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="Protect the deal you worked for."
        blurb="Brand Guard’s alert, the Media Kit it reports into, and the sponsor pipeline it helps protect."
        shots={[SHOTS.brandGuard, SHOTS.mediaKit, SHOTS.sponsorCrm]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Take the sponsor read with a second pair of ears.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Brand Guard ships at launch in February 2027. Free for 7 days, then
              $29 once — Brand Guard is included, and your voice is transcribed on
              your PC, not in the cloud.
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
