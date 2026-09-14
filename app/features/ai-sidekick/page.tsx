import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Check,
  CircleDollarSign,
  Database,
  LayoutTemplate,
  Lightbulb,
  MessagesSquare,
  MonitorPlay,
  Power,
  Search,
  Settings2,
  Sparkles,
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
  title: 'AI Sidekick — Feature Guide',
  description:
    'A local AI assistant that knows your stream: it answers from your live ' +
    'stats and Streamer Bible, switches OBS scenes when you ask and remembers ' +
    'what you tell it — running on your own PC.',
  alternates: { canonical: 'https://streamerosai.com/features/ai-sidekick' },
};

// Answers stay within what the desktop app actually does (API spec §3.1–§3.9,
// §2.7, §Z.10). Say the limits plainly — a local 3B model is not a cloud model.
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does the AI Sidekick send my prompts or stream data to the cloud?',
    a: 'No. The Sidekick runs on Ollama, a local AI engine on your own PC, and streamerOS only talks to it at 127.0.0.1. Your questions, live stats, Streamer Bible and memories stay on the machine. There is no per-message cost, and once your models are downloaded it keeps working with the internet off.',
  },
  {
    q: 'What do I need to run it?',
    a: 'Ollama installed on the PC, and an RTX 3060-class GPU is recommended. The defaults are llama3.2 for chat and nomic-embed-text for memory; you choose and download models from Settings. The AI Engine toggle starts or stops the local engine for you, so there is nothing to manage in a terminal.',
  },
  // The honest one. Buyers compare this to ChatGPT; tell them where it lands.
  {
    q: 'Is it as smart as ChatGPT or other cloud AI?',
    a: 'No, and it is not trying to be. Local 3B-class models are fast and private, but they are less capable than large cloud models. The Sidekick is built for short, grounded answers about your own stream and for simple actions like switching a scene — not long essays or deep research. If your hardware can handle a bigger model, you can pick one in Settings.',
  },
  {
    q: 'Will running a local AI model slow down my stream?',
    a: 'Generating a reply uses your GPU while it runs, so the Sidekick keeps answers to a sentence or two and only generates when you send it a message. The AI Engine toggle stops the engine completely when you want every bit of headroom. Note that the 1.8% CPU figure quoted for streamerOS is the core app under a live 1080p60 game — it does not include AI inference, which depends on your model and GPU.',
  },
  {
    q: 'Can it switch OBS scenes on its own?',
    a: 'Only when you ask. Say "switch to gameplay" and it maps that to the scene names in your Streamer Bible and switches over your local OBS connection, chaining up to four steps for one request. If OBS is not connected, it tells you so instead of pretending the switch happened.',
  },
  {
    q: 'Does it make things up?',
    a: 'It is grounded, not infallible. Facts from your Streamer Bible are put ahead of everything else it knows, revenue and chat answers come from your own stored data, and a chat-archive search that finds nothing is reported as nothing rather than invented. Like any language model it can still get something wrong, so check a number before you read it out on stream.',
  },
  {
    q: 'What happens when the free trial ends?',
    a: 'streamerOS is free for 7 days, then $29 once. Without a licence, plain chat with the Sidekick stays free for up to 10 messages a day. Actions (scene switching, chat, archive and revenue lookups, overlay design), creator memory, the Streamer Bible and AI insights are part of the $29 licence.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's AI Sidekick.
// The real, interactive assistant lives in the streamerOS desktop app; this
// site just explains it. Everything is local: prompts, memories and replies
// never leave the machine. Purple marks the AI's side of the conversation.
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

/** A single labelled row inside a faux settings or file panel. */
function PropRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
      <span className={`truncate text-sm font-medium ${accent ? 'text-purple-300' : 'text-zinc-200'}`}>
        {value}
      </span>
    </div>
  );
}

/** One message in the faux chat. The streamer on the right, the Sidekick on the left. */
function Bubble({ from, children }: { from: 'you' | 'ai'; children: ReactNode }) {
  const you = from === 'you';
  return (
    <div className={`flex ${you ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl border px-3 py-2 text-sm leading-relaxed ${
          you
            ? 'border-white/10 bg-white/5 text-zinc-200'
            : 'border-purple-400/30 bg-purple-400/[0.06] text-zinc-100'
        }`}
      >
        <span
          className={`mb-0.5 block font-mono text-[10px] uppercase tracking-widest ${
            you ? 'text-zinc-500' : 'text-purple-300'
          }`}
        >
          {you ? 'You' : 'Sidekick'}
        </span>
        {children}
      </div>
    </div>
  );
}

/** A green confirmation strip — an action that actually ran. */
function Confirm({ icon: Icon = Check, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
      <Icon className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
      {children}
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

type InsightTag = 'growth' | 'brand' | 'content';

const INSIGHT_TONE: Record<InsightTag, string> = {
  growth: 'border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-300',
  brand: 'border-purple-400/30 bg-purple-400/[0.06] text-purple-300',
  content: 'border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-300',
};

/** A single faux AI insight card. */
function InsightCard({ tag, heading, body }: { tag: InsightTag; heading: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-3">
      <span
        className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${INSIGHT_TONE[tag]}`}
      >
        {tag}
      </span>
      <p className="mt-2 text-sm font-semibold text-zinc-100">{heading}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">{body}</p>
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
// Split section — copy on one side, a faux panel on the other. Used for the
// deep-dive sections below the walkthrough.
// ---------------------------------------------------------------------------
function Split({
  id,
  eyebrow,
  title,
  children,
  mock,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  mock: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/5">
      <Reveal className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-purple-400/80">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">{children}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
      </Reveal>
    </section>
  );
}

// ---------------------------------------------------------------------------
// What it can do — each card is a real tool the Sidekick can call, with a
// prompt that actually reaches it.
// ---------------------------------------------------------------------------
interface Capability {
  icon: LucideIcon;
  title: string;
  prompt: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: MonitorPlay,
    title: 'Switch your OBS scene',
    prompt: 'switch to gameplay',
    body: 'Matches the scene names in your Streamer Bible and switches over your local OBS connection. If OBS is not connected, it says so.',
    href: '/features/obs-bridge',
    linkLabel: 'How OBS Bridge works',
  },
  {
    icon: MessagesSquare,
    title: 'Read recent chat',
    prompt: 'what is chat asking right now?',
    body: 'Pulls the latest live chat lines, so you can catch the question you scrolled past mid-fight.',
  },
  {
    icon: Search,
    title: 'Search your Chat Archive',
    prompt: 'what did chat say about my crosshair last stream?',
    body: 'Searches the chat you saved from earlier streams — straight from your disk.',
    href: '/features/chat-archive',
    linkLabel: 'See the Chat Archive',
  },
  {
    icon: CircleDollarSign,
    title: 'Check Super Chat revenue',
    prompt: 'how much have I made in Super Chats this stream?',
    body: 'Looks up this stream’s Super Chat total and per-currency breakdown — the same numbers as your revenue panel.',
    href: '/features/live-cockpit#revenue',
    linkLabel: 'See the revenue panel',
  },
  {
    icon: LayoutTemplate,
    title: 'Design an overlay',
    prompt: 'design a starting soon screen',
    body: 'Builds an Aura Scene overlay from your description, saves it, and pushes it live to your overlay.',
    href: '/features/aura-scene',
    linkLabel: 'See Aura Scene',
  },
  {
    icon: Brain,
    title: 'Recall what you told it',
    prompt: 'who is my co-host?',
    body: 'Brings in facts you asked it to remember, automatically, whenever they are relevant to the question.',
    href: '#memory',
    linkLabel: 'How Creator Memory works',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AiSidekickGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'AI Sidekick', path: '/features/ai-sidekick' },
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
              An AI co-pilot that knows your stream.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Ask a question mid-stream and get a straight answer from your own
              live stats and channel notes. Ask it to switch scenes and it does.
              The AI Sidekick runs on your own PC — no cloud model, no
              per-message cost, and it keeps working with the internet off.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src="/screenshots/ai-sidekick.png"
        alt="The streamerOS AI Sidekick chat panel answering a question about the current stream using live stats"
        caption="An assistant that knows your stream"
      />

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From switched on to hands-free in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Turn it on &rarr; tell it about your stream &rarr; ask &rarr; let it
            act. All of it on your own hardware.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Turn on the AI Engine */}
          <Step
            index={1}
            icon={Power}
            eyebrow="Switch it on"
            title="One toggle starts the local AI."
            body="The Sidekick runs on Ollama, on your own PC. Flip the AI Engine toggle and streamerOS starts the engine for you — no terminal, nothing to babysit — and stops it again when you want the resources back. Pick and download models from Settings; llama3.2 for chat and nomic-embed-text for memory are the defaults."
            mock={
              <div className="space-y-4">
                <MockLabel icon={Settings2}>Settings · AI</MockLabel>
                <Panel icon={Bot} title="Local AI">
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-purple-400/30 bg-purple-400/[0.06] px-3 py-2.5">
                    <span className="flex items-center gap-2 text-sm font-medium text-zinc-100">
                      <Power className="h-4 w-4 text-purple-300" strokeWidth={1.75} aria-hidden />
                      AI Engine
                    </span>
                    <span aria-hidden className="relative h-5 w-9 rounded-full bg-purple-500/80">
                      <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                    </span>
                  </div>
                  <PropRow label="Chat model" value="llama3.2" accent />
                  <PropRow label="Memory model" value="nomic-embed-text" />
                  <PropRow label="Address" value="127.0.0.1" />
                </Panel>
                <Confirm>Running locally &mdash; nothing leaves this PC.</Confirm>
              </div>
            }
          />

          {/* Step 2 — The Streamer Bible */}
          <Step
            index={2}
            icon={BookOpen}
            eyebrow="Tell it about your stream"
            title="Write your Streamer Bible once."
            body="Your Streamer Bible is a JSON file in your workspace: your persona, current game, moderation rules and OBS scene names. Save an edit and the Sidekick reloads it automatically. Those facts sit above everything else it knows, so “which scene is gameplay?” is answered from your file, not a guess."
            mock={
              <div className="space-y-4">
                <MockLabel icon={BookOpen}>Workspace</MockLabel>
                <Panel icon={BookOpen} title="streamer_bible.json">
                  <PropRow label="Persona" value="Chill ranked grinder" />
                  <PropRow label="Game" value="Valorant" accent />
                  <PropRow label="Moderation" value="No spoilers, no slurs" />
                  <PropRow label="scene.gameplay" value="Scene 3" accent />
                  <PropRow label="scene.brb" value="Scene 5" />
                </Panel>
                <Confirm>Saved &mdash; the Sidekick reloaded your Bible.</Confirm>
              </div>
            }
          />

          {/* Step 3 — Ask */}
          <Step
            index={3}
            icon={MessagesSquare}
            eyebrow="Ask anything, mid-stream"
            title="Plain words in, a short answer out."
            body="Replies stream in token by token, designed to show the first word in under ~800 ms on RTX 3060-class hardware. The Sidekick sees your live stats — chat speed, the room’s vibe and sentiment — alongside your Bible, and keeps answers to a line or two because you are live."
            mock={
              <div className="space-y-4">
                <MockLabel icon={Sparkles}>Sidekick · streaming reply</MockLabel>
                <div className="space-y-3">
                  <Bubble from="you">How&rsquo;s chat feeling right now?</Bubble>
                  <Bubble from="ai">
                    Chat&rsquo;s moving fast and the mood is positive &mdash; that
                    last round landed.
                  </Bubble>
                  <Bubble from="you">Which scene is gameplay again?</Bubble>
                  <Bubble from="ai">Scene 3 &mdash; straight from your Bible.</Bubble>
                </div>
              </div>
            }
          />

          {/* Step 4 — Let it act */}
          <Step
            index={4}
            icon={MonitorPlay}
            eyebrow="Let it act"
            title="Ask, and it does the thing."
            body="Say “switch to gameplay” and it switches your OBS scene. It can also read recent chat, search your Chat Archive, look up this stream’s Super Chat revenue and design an Aura Scene overlay — chaining up to four steps for one request. If OBS isn’t connected, it tells you instead of pretending."
            last
            mock={
              <div className="space-y-4">
                <MockLabel icon={MonitorPlay}>Sidekick · action</MockLabel>
                <div className="space-y-3">
                  <Bubble from="you">switch to gameplay</Bubble>
                  <Confirm icon={MonitorPlay}>OBS scene &rarr; Scene 3 (gameplay)</Confirm>
                  <Bubble from="ai">Done &mdash; you&rsquo;re on gameplay.</Bubble>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* What it can do */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-purple-400/80">
              Actions
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Six things you can just ask for.
            </h2>
            <p className="mt-4 text-zinc-400">
              No menus mid-match. Type the request the way you would say it, and
              the Sidekick picks the right tool.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, prompt, body, href, linkLabel }, i) => (
              <Reveal
                key={title}
                delay={Math.min(i, 5) * 0.05}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-purple-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 rounded-lg border border-purple-400/20 bg-purple-400/[0.05] px-3 py-2 font-mono text-xs text-purple-200">
                  &ldquo;{prompt}&rdquo;
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{body}</p>
                {href && linkLabel && (
                  <Link
                    href={href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    {linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Memory */}
      <Split
        id="memory"
        eyebrow="Creator Memory"
        title="Tell it once. It remembers."
        mock={
          <div className="space-y-4">
            <MockLabel icon={Brain}>Sidekick · memory</MockLabel>
            <div className="space-y-3">
              <Bubble from="you">Remember that my co-host is Max.</Bubble>
              <Confirm icon={Database}>Saved to creator memory on this PC</Confirm>
              <p className="py-1 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                Next stream
              </p>
              <Bubble from="you">Who&rsquo;s joining me for the duo queue?</Bubble>
              <Bubble from="ai">Max, your co-host.</Bubble>
            </div>
          </div>
        }
      >
        <p>
          Start a message with &ldquo;remember that&hellip;&rdquo;, &ldquo;note
          that&hellip;&rdquo; or &ldquo;keep in mind&hellip;&rdquo; and the
          Sidekick stores the fact in a private vector database (LanceDB) on your
          disk. Your co-host&rsquo;s name, a sponsor&rsquo;s do-not-say list, the
          running joke with your mods.
        </p>
        <p>
          Later questions pull in the relevant memories automatically — you never
          have to repeat yourself or dig for a setting. Nothing leaves the PC.{' '}
          <Link href="/features/zero-cloud" className="text-cyan-400 underline-offset-2 hover:underline">
            Why streamerOS stays zero-cloud
          </Link>
          .
        </p>
      </Split>

      {/* AI insights */}
      <Split
        eyebrow="AI Insights"
        title="Advice from your own analytics."
        mock={
          <div className="space-y-4">
            <MockLabel icon={Lightbulb}>AI Insights · example</MockLabel>
            <div className="space-y-2">
              <InsightCard
                tag="growth"
                heading="Weekend streams hold viewers longer"
                body="Your peak viewers land on Saturdays. Test moving one weekday slot to Sunday."
              />
              <InsightCard
                tag="content"
                heading="Chat spikes during ranked clutches"
                body="Your fastest chat comes in close rounds. Lead your next VOD title with the clutch."
              />
              <InsightCard
                tag="brand"
                heading="Steady schedule reads well to sponsors"
                body="Consistent weekly streams make an easier pitch. Put the schedule in your media kit."
              />
            </div>
          </div>
        }
      >
        <p>
          Import the analytics CSV exports from YouTube or Twitch and the Sidekick
          writes two to four insight cards from your numbers, each tagged growth,
          brand or content — so you know whether a tip is about reach, sponsors or
          what to stream next.
        </p>
        <p>
          It needs at least 7 days of data. With less than that, it asks you to
          import more rather than padding the list with guesses.
        </p>
      </Split>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="The Sidekick, in the app."
        blurb="Answering from your stream, acting on a request and recalling what you told it."
        shots={[SHOTS.aiSidekick, SHOTS.aiAction, SHOTS.creatorMemory]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              An assistant that never leaves your PC.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The AI Sidekick ships at launch in streamerOS, running on the local
              AI engine on your own hardware. Free for 7 days, then $29 once.
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
