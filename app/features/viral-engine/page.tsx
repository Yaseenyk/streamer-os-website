import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  Copy,
  Film,
  Flame,
  Frame,
  Gamepad2,
  Hash,
  HardDrive,
  Keyboard,
  MessagesSquare,
  Radio,
  Scissors,
  Sparkles,
  Type,
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
  title: 'Viral Engine — Feature Guide',
  description:
    'streamerOS writes your upload kit with local AI: three YouTube titles, ' +
    '6–10 hashtags and a thumbnail plan, built from the game you are playing ' +
    'and what your chat is reacting to.',
  alternates: { canonical: 'https://streamerosai.com/features/viral-engine' },
};

// Answers stay within what the desktop app actually does (API spec §3.8–§3.9,
// AI_SYSTEM_PROMPTS §3 and §7). "Trending" is the audience's own reaction, not
// a platform trends feed — say so before a buyer assumes otherwise.
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does Viral Engine use YouTube trending data?',
    a: 'No. There is no external trends feed. "Trending" in Viral Engine means what your own audience is reacting to right now — the live chat sample and the game you are playing — not platform-wide YouTube trends. If you already know a topic is hot, type it into Describe Video and the kit is written around it.',
  },
  {
    q: 'Is my chat sent to a cloud AI?',
    a: 'No. The chat sample goes only to the local AI model running on your own PC through Ollama. Nothing is uploaded, and Viral Engine does not post anything to YouTube for you — you copy the title and tags into YouTube Studio yourself.',
  },
  {
    q: 'Which games does Live Sync recognise?',
    a: 'Live Sync detects the game in the foreground from a built-in list that includes Valorant, CS2, GTA V, Fortnite, Apex Legends, Minecraft and PUBG: Battlegrounds. If no game is detected it still runs, working from your chat. For anything off the list, Describe Video lets you name the game yourself.',
  },
  {
    q: 'Can I use it for a VOD after the stream?',
    a: 'Yes — that is what Describe Video is for. Type what the video is, for example "valorant ranked, insane 1v5 clutch", and it writes the same kit. Live Sync works from the chat coming in while you stream.',
  },
  {
    q: 'Does Thumbnail Lab make the thumbnail image?',
    a: 'No. It writes a three-point plan — where the subject sits in the 16:9 frame, two or three contrasting colours that read on OLED and phone screens, and a bold two-to-four-word text hook. You or your editor build the thumbnail from that plan in your usual tool.',
  },
  // A small local model writes these. Set the expectation before launch day.
  {
    q: 'Are the titles ready to post as they are?',
    a: 'They are written to fit — each is 70 characters or fewer — and to be specific to your game and chat. But they come from a small local model, so treat them as three strong starting points: pick one, read it once, tweak it if needed.',
  },
  {
    q: 'What do I need, and what does it cost?',
    a: 'Viral Engine uses the same local AI engine as the AI Sidekick, so Ollama needs to be installed on your PC. It ships at launch in streamerOS, which is free for 7 days, then $29 once. After the trial, Viral Engine is part of the $29 licence.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Viral Engine.
// The real, interactive generator lives in the streamerOS desktop app; this
// site just explains it. Everything is local: the chat sample and the model
// that reads it never leave the machine.
// ---------------------------------------------------------------------------

/** Faux panel shell — mirrors the desktop app's card chrome. */
function Panel({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

/** Mono eyebrow above each mock. */
function MockLabel({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
      <Icon className="h-3.5 w-3.5 text-purple-300" aria-hidden />
      {children}
    </p>
  );
}

/** A single labelled row. */
function PropRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
      <span className={`truncate text-sm font-medium ${accent ? 'text-cyan-300' : 'text-zinc-200'}`}>
        {value}
      </span>
    </div>
  );
}

/** One of the two input modes. */
function ModeCard({
  icon: Icon,
  name,
  detail,
  selected,
}: {
  icon: LucideIcon;
  name: string;
  detail: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        selected ? 'border-purple-400/40 bg-purple-400/[0.06]' : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${selected ? 'text-purple-300' : 'text-zinc-500'}`}
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="text-sm font-semibold text-zinc-100">{name}</span>
        {selected && (
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-400 text-[#05070A]">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{detail}</p>
    </div>
  );
}

/** A single line of the faux chat sample. */
function ChatLine({ user, text }: { user: string; text: string }) {
  return (
    <p className="truncate rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 text-sm text-zinc-300">
      <span className="font-medium text-cyan-300">{user}</span>{' '}
      <span>{text}</span>
    </p>
  );
}

/** A copyable title suggestion. */
function TitleRow({ title, top }: { title: string; top?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
        top ? 'border-purple-400/40 bg-purple-400/[0.06]' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <span className="min-w-0 flex-1 text-sm font-medium text-zinc-100">{title}</span>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400">
        <Copy className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      </span>
    </div>
  );
}

// Faux tag cloud — size stands in for how central a tag is to the kit.
const TAGS: { tag: string; size: 'lg' | 'md' | 'sm'; game?: boolean }[] = [
  { tag: '#Valorant', size: 'lg', game: true },
  { tag: '#1v5', size: 'lg' },
  { tag: '#Clutch', size: 'md' },
  { tag: '#ValorantClips', size: 'md' },
  { tag: '#RankedGrind', size: 'sm' },
  { tag: '#FPS', size: 'sm' },
  { tag: '#Gaming', size: 'sm' },
  { tag: '#ValorantIndia', size: 'md' },
];

const TAG_SIZE: Record<'lg' | 'md' | 'sm', string> = {
  lg: 'text-base font-semibold',
  md: 'text-sm font-medium',
  sm: 'text-xs',
};

/** One numbered point of the faux Thumbnail Lab plan. */
function PlanRow({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-purple-400/30 bg-purple-400/10 text-xs font-semibold text-purple-200">
        {n}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
        <div className="mt-1 text-sm text-zinc-200">{children}</div>
      </div>
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
// Where the kit's inputs come from — the honest-scope section.
// ---------------------------------------------------------------------------
const SOURCES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MessagesSquare,
    title: 'Your chat',
    body: 'Up to 40 recent live chat lines — the moments your viewers are actually reacting to.',
  },
  {
    icon: Gamepad2,
    title: 'Your game',
    body: 'The game detected in the foreground, so every title and tag is specific to what you played.',
  },
  {
    icon: HardDrive,
    title: 'Your PC',
    body: 'A local AI model reads it all on your own machine. The chat sample never goes anywhere else.',
  },
];

// Neighbouring features in the stream-to-upload workflow.
const RELATED: { icon: LucideIcon; name: string; href: string; body: string }[] = [
  {
    icon: Flame,
    name: 'Viral Moments',
    href: '/features/viral-moments',
    body: 'Marks hype spikes live and exports the timestamps, so you know which moment to package.',
  },
  {
    icon: Film,
    name: 'Clip Library',
    href: '/features/clip-library',
    body: 'Ranks your recordings by hype score, so the best moment is already found.',
  },
  {
    icon: Scissors,
    name: 'Shorts Factory',
    href: '/features/shorts-factory',
    body: 'Turns 16:9 VODs into vertical shorts.',
  },
  {
    icon: Bot,
    name: 'AI Sidekick',
    href: '/features/ai-sidekick',
    body: 'The same local AI engine, as an assistant that knows your stream.',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ViralEngineGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Viral Engine', path: '/features/viral-engine' },
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
              Your upload kit, written from your own chat.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Stream&rsquo;s over and the title box is blank. Viral Engine reads the
              game you played and what chat reacted to, then writes three YouTube
              titles, a set of hashtags and a thumbnail plan — using local AI on
              your own PC.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src="/screenshots/viral-engine.png"
        alt="The Viral Engine showing three AI-written YouTube title suggestions and a hashtag cloud generated from the live game and chat"
        caption="Titles and hashtags from your own chat"
      />

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From live stream to upload kit in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Pick a mode &rarr; read the room &rarr; copy titles and tags &rarr;
            plan the thumbnail.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Pick a mode */}
          <Step
            index={1}
            icon={Sparkles}
            eyebrow="Pick a mode"
            title="Live Sync, or describe the video."
            body="Streaming right now? Live Sync builds the kit from your stream as it happens. Cutting a VOD or planning an upload? Describe Video takes a one-line description instead — something like “valorant ranked, insane 1v5 clutch”."
            mock={
              <div className="space-y-4">
                <MockLabel icon={Sparkles}>Viral Engine · mode</MockLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ModeCard
                    icon={Radio}
                    name="Live Sync"
                    detail="Game + recent live chat"
                    selected
                  />
                  <ModeCard icon={Keyboard} name="Describe Video" detail="Type what the video is" />
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Describe Video
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">valorant ranked, insane 1v5 clutch</p>
                </div>
              </div>
            }
          />

          {/* Step 2 — Read the room */}
          <Step
            index={2}
            icon={MessagesSquare}
            eyebrow="Read the room"
            title="It reads your game and your chat."
            body="Live Sync picks up the game in the foreground from a built-in list — Valorant, CS2, GTA V, Fortnite, Apex Legends, Minecraft, PUBG: Battlegrounds and more — and samples up to 40 recent chat lines, so the suggestions reflect what your audience is actually reacting to. No game detected? It still runs."
            mock={
              <div className="space-y-4">
                <MockLabel icon={Radio}>Live Sync · context</MockLabel>
                <Panel icon={Gamepad2} title="Stream context">
                  <PropRow label="Game detected" value="Valorant" accent />
                  <PropRow label="Chat sample" value="Last 40 lines" />
                </Panel>
                <div className="space-y-1.5">
                  <ChatLine user="kiran_07" text="NO WAY he took that 1v5" />
                  <ChatLine user="ghostpeek" text="clip it clip it clip it" />
                  <ChatLine user="aim_trainer" text="that last jett dash was insane" />
                  <ChatLine user="mods_r_us" text="ranked grind hits different today" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <HardDrive className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2} aria-hidden />
                  Sent only to the local model on this PC.
                </div>
              </div>
            }
          />

          {/* Step 3 — Titles and hashtags */}
          <Step
            index={3}
            icon={Hash}
            eyebrow="Copy titles and tags"
            title="Three titles and a hashtag cloud."
            body="You get exactly three YouTube title suggestions, each 70 characters or fewer and one click to copy, plus 6–10 hashtags, each starting with # and including the game, laid out as a tag cloud."
            mock={
              <div className="space-y-4">
                <MockLabel icon={Type}>Upload kit</MockLabel>
                <Panel icon={Type} title="Title suggestions">
                  <TitleRow title="I Clutched a 1v5 in Ranked and Chat Lost It" top />
                  <TitleRow title="The Valorant 1v5 Nobody Saw Coming" />
                  <TitleRow title="Ranked Valorant, But I Win a 1v5" />
                </Panel>
                <Panel icon={Hash} title="Hashtags">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-1">
                    {TAGS.map(({ tag, size, game }) => (
                      <span
                        key={tag}
                        className={`${TAG_SIZE[size]} ${game ? 'text-cyan-300' : 'text-purple-200/90'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Panel>
              </div>
            }
          />

          {/* Step 4 — Thumbnail Lab */}
          <Step
            index={4}
            icon={Frame}
            eyebrow="Plan the thumbnail"
            title="A thumbnail plan before you open an editor."
            body="Thumbnail Lab takes your chosen title and top tags and writes a three-point plan: where the subject sits in the 16:9 frame, two or three contrasting colours that read on OLED and phone screens, and a bold text hook of two to four words."
            last
            mock={
              <div className="space-y-4">
                <MockLabel icon={Frame}>Thumbnail Lab</MockLabel>
                {/* Faux 16:9 frame with rule-of-thirds guides */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-[#05070A]">
                  <span aria-hidden className="absolute inset-y-0 left-1/3 w-px bg-white/5" />
                  <span aria-hidden className="absolute inset-y-0 left-2/3 w-px bg-white/5" />
                  <span aria-hidden className="absolute inset-x-0 top-1/3 h-px bg-white/5" />
                  <span aria-hidden className="absolute inset-x-0 top-2/3 h-px bg-white/5" />
                  <span
                    aria-hidden
                    className="absolute bottom-0 right-[10%] h-[80%] w-[28%] rounded-t-full bg-gradient-to-t from-purple-500/60 to-cyan-400/60"
                  />
                  <span className="absolute left-[7%] top-[16%] text-2xl font-black uppercase leading-none tracking-tight text-cyan-300 sm:text-3xl">
                    1v5
                    <br />
                    Clutch
                  </span>
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    16:9
                  </span>
                </div>
                <div className="space-y-2">
                  <PlanRow n={1} label="Subject placement">
                    Your agent on the right third, facing into the frame.
                  </PlanRow>
                  <PlanRow n={2} label="Contrasting colours">
                    <span className="flex items-center gap-2">
                      <span aria-hidden className="h-3 w-3 rounded-sm bg-cyan-400" />
                      <span aria-hidden className="h-3 w-3 rounded-sm bg-purple-500" />
                      <span aria-hidden className="h-3 w-3 rounded-sm border border-white/20 bg-[#05070A]" />
                      Cyan, purple, near-black
                    </span>
                  </PlanRow>
                  <PlanRow n={3} label="Text hook">
                    &ldquo;1v5 CLUTCH&rdquo; &mdash; heavy weight, top left.
                  </PlanRow>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Honest scope */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-purple-400/80">
              What &ldquo;trending&rdquo; means here
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built from your audience, not a trends feed.
            </h2>
            <p className="mt-4 text-zinc-400">
              Viral Engine doesn&rsquo;t scrape YouTube or pull platform-wide trend
              data. It works from three things you already have — the people who
              watch you, and what they just reacted to.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {SOURCES.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                delay={i * 0.05}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-purple-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related features */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Find the moment, then package it.
            </h2>
            <p className="mt-4 text-zinc-400">
              Viral Engine writes the kit. These find the moment worth writing it
              for.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map(({ icon: Icon, name, href, body }, i) => (
              <Reveal key={href} delay={i * 0.05}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition group-hover:text-cyan-300">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="Where the kit comes from."
        blurb="The upload kit, the thumbnail plan, and the live chat signals it is built from."
        shots={[SHOTS.viralEngine, SHOTS.thumbnailLab, SHOTS.chatTriage, SHOTS.sentiment]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Stop staring at a blank title box.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Viral Engine ships at launch in streamerOS, running on the local AI
              engine on your own PC. Free for 7 days, then $29 once.
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
