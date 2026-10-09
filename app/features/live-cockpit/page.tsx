import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Activity,
  Archive,
  ArrowRight,
  Bot,
  Check,
  Coins,
  Languages,
  LayoutDashboard,
  MessagesSquare,
  MonitorPlay,
  Plug,
  Radio,
  Settings2,
  TrendingUp,
  TriangleAlert,
  Users,
  Zap,
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
  title: 'Live Cockpit — Feature Guide',
  description:
    'The streamerOS Dashboard puts chat triage, Super Chat revenue, top ' +
    'chatters, a local AI read on chat sentiment and OBS scene switching on ' +
    'one screen — all running on your own PC.',
  alternates: { canonical: 'https://streamerosai.com/features/live-cockpit' },
};

// Answers stay within what the desktop app actually does (API_SPECIFICATION
// §5.5, §8.5, §Z.10). The AI Producer and Engagement panels are early
// heuristics and are deliberately not marketed here.
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Do I need a YouTube API key or a Google sign-in to see my chat?',
    a: 'No. streamerOS reads YouTube Live chat locally from the chat window open in your own browser, using Windows UI Automation — no API key and no Google sign-in. Twitch chat comes in through an anonymous, read-only connection, so there is no Twitch login either.',
  },
  {
    q: 'Will Chat Triage hide messages I actually want to see?',
    a: 'Only regular viewer messages go through the moderation filter, which hides toxic and spam lines and shows a small count of how many it filtered. Member messages and Super Chats are always shown. The filter runs on your PC — no message is sent anywhere to be checked.',
  },
  {
    q: 'How accurate is the Super Chat total?',
    a: 'The per-currency totals are exact: every Super Chat is written to a ledger on your PC, and duplicates are ignored. The combined total is an approximation. It converts each currency with exchange rates you set in Settings (bundled defaults such as 1 USD ≈ ₹83), and there is no live exchange-rate lookup, so update the rates if you want that figure to follow the market. It recognises ₹, $, €, £ and ¥ — a Super Chat in any other currency is still recorded, but left out of the converted total.',
  },
  {
    q: 'Does Sentiment Horizon send my chat to an AI service?',
    a: 'No. It uses a local AI model running in Ollama on your own PC, at 127.0.0.1, so chat never leaves the machine. If Ollama is not running, the panel shows an "Ollama offline" banner and a neutral reading instead of guessing a score.',
  },
  {
    q: 'What do I need to run the Live Cockpit?',
    a: 'A 64-bit Windows 10 or 11 PC and OBS Studio with OBS WebSocket v5 on the same machine for the Scene Switcher. Sentiment Horizon also needs Ollama with a model installed, and an RTX 3060-class GPU is recommended for the local AI features. Chat Triage, Stream Revenue, Top Chatters and the Scene Switcher do not use the AI model.',
  },
  {
    q: 'Will the Cockpit slow down my stream?',
    a: 'The core streamerOS app holds a 1.8% CPU footprint under a live 1080p60 game. That figure is for the core app: the AI model behind Sentiment Horizon runs separately in Ollama, which is why an RTX 3060-class GPU is recommended if you use it.',
  },
  {
    q: 'What still works after the 7-day trial?',
    a: 'streamerOS is free for 7 days, then $29 once. The live monitors and OBS control that act during a stream are part of the $29 licence. Your recorded stream data stays readable for free — an expired trial never hides or deletes it.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Dashboard.
// The real, live panels run in the streamerOS desktop app; this site just
// explains them. Every name, count and amount below is illustrative.
// ---------------------------------------------------------------------------

const INLINE_LINK =
  'text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400/50';

/** Faux panel shell — mirrors the desktop app's card chrome. */
function Panel({
  icon: Icon,
  title,
  meta,
  children,
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
        {meta && <span className="ml-auto font-mono text-[10px] text-zinc-500">{meta}</span>}
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

/** A labelled value row, e.g. an exchange rate or a stat. */
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

type ConnectTone = 'cyan' | 'emerald';

const CONNECT_TONE: Record<ConnectTone, { shell: string; text: string; dot: string }> = {
  cyan: {
    shell: 'border-cyan-400/40 bg-cyan-400/[0.06]',
    text: 'text-cyan-300',
    dot: 'bg-cyan-400',
  },
  emerald: {
    shell: 'border-emerald-400/40 bg-emerald-400/[0.06]',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
};

/** A single connection toggle inside the faux "Command Center". */
function ConnectRow({
  icon: Icon,
  name,
  status,
  action,
  tone,
}: {
  icon: LucideIcon;
  name: string;
  status: string;
  action: string;
  tone: ConnectTone;
}) {
  const t = CONNECT_TONE[tone];
  return (
    <div className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${t.shell}`}>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${t.text}`}
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-zinc-100">{name}</span>
        <span className={`mt-0.5 flex items-center gap-1.5 font-mono text-[11px] ${t.text}`}>
          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
          {status}
        </span>
      </span>
      <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300">
        {action}
      </span>
    </div>
  );
}

/** A filter tab with its live count inside the faux "Chat Triage". */
function TabChip({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium ${
        active
          ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
          : 'border-white/10 bg-white/5 text-zinc-400'
      }`}
    >
      {label}
      <span className={active ? 'text-cyan-300/70' : 'text-zinc-600'}>{count}</span>
    </span>
  );
}

type LineKind = 'viewer' | 'member' | 'super';

/** A single chat message inside the faux "Chat Triage". */
function ChatLine({
  user,
  text,
  kind = 'viewer',
  amount,
}: {
  user: string;
  text: string;
  kind?: LineKind;
  amount?: string;
}) {
  const shell =
    kind === 'super'
      ? 'border-l-2 border-cyan-400/60 bg-white/[0.04]'
      : kind === 'member'
        ? 'bg-emerald-400/[0.06]'
        : '';
  return (
    <p className={`rounded-md px-2.5 py-1.5 text-sm leading-relaxed ${shell}`}>
      {kind === 'member' && (
        <span className="text-emerald-300" aria-hidden>
          ★{' '}
        </span>
      )}
      <span className="font-semibold text-zinc-200">{user}</span>
      {amount && <span className="ml-1.5 font-mono text-xs text-cyan-300">{amount}</span>}
      <span className="text-zinc-600">: </span>
      <span className="text-zinc-400">{text}</span>
    </p>
  );
}

/** A ranked chatter inside the faux "Top Chatters" panel. */
function ChatterRow({ rank, name, count }: { rank: number; name: string; count: number }) {
  const top = rank === 1;
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
        top ? 'border-cyan-400/40 bg-cyan-400/[0.06]' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold ${
          top
            ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
            : 'border-white/10 bg-white/5 text-zinc-300'
        }`}
      >
        {rank}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200">{name}</span>
      <span className="shrink-0 font-mono text-[11px] text-zinc-500">{count} msgs</span>
    </div>
  );
}

/** A scene inside the faux "OBS Scene Switcher". */
function SceneRow({ name, live }: { name: string; live?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border px-3 py-2 ${
        live ? 'border-cyan-400/40 bg-cyan-400/[0.06]' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <span className={`truncate text-sm font-medium ${live ? 'text-cyan-200' : 'text-zinc-300'}`}>
        {name}
      </span>
      {live ? (
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Live
        </span>
      ) : (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          Switch
        </span>
      )}
    </div>
  );
}

/** An exact per-currency total inside the faux "Stream Revenue" panel. */
function CurrencyRow({ code, amount, count }: { code: string; amount: string; count: number }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{code}</span>
      <span className="flex items-baseline gap-2">
        <span className="text-sm font-medium text-zinc-200">{amount}</span>
        <span className="font-mono text-[11px] text-zinc-500">×{count}</span>
      </span>
    </div>
  );
}

/** A checked benefit line used in the deep-dive sections. */
function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2.5} aria-hidden />
      <span className="leading-relaxed text-zinc-400">{children}</span>
    </li>
  );
}

// Illustrative sentiment history for the faux waveform (bar heights, %).
const WAVE = [34, 40, 30, 46, 44, 55, 60, 52, 66, 74, 70, 80, 78, 86];

// ---------------------------------------------------------------------------
// Overview + related features
// ---------------------------------------------------------------------------
interface Card {
  icon: LucideIcon;
  title: string;
  body: string;
}

const PANELS: Card[] = [
  {
    icon: Plug,
    title: 'Command Center',
    body: 'One click to connect OBS, with your YouTube chat status right beside it.',
  },
  {
    icon: MessagesSquare,
    title: 'Chat Triage',
    body: 'One chat block with All, Viewers, Members and Super Chats tabs, each with a live count.',
  },
  {
    icon: Coins,
    title: 'Stream Revenue',
    body: 'Every Super Chat recorded on your PC and totalled per currency.',
  },
  {
    icon: Users,
    title: 'Top Chatters',
    body: 'Your two most active chatters this stream, and how many people are talking.',
  },
  {
    icon: Activity,
    title: 'Sentiment Horizon',
    body: 'A local AI read on the room, from toxic to hype, updated every second.',
  },
  {
    icon: MonitorPlay,
    title: 'OBS Scene Switcher',
    body: 'Your OBS scenes in a list, the live one highlighted, one click to switch.',
  },
];

interface Related extends Card {
  href: string;
}

const RELATED: Related[] = [
  {
    icon: Archive,
    title: 'Chat Archive',
    href: '/features/chat-archive',
    body: 'Every chat line from the stream is saved on your PC, ready to search afterwards.',
  },
  {
    icon: TrendingUp,
    title: 'Viral Moments',
    href: '/features/viral-moments',
    body: 'Hype spikes marked live, with the timestamps exported for your editor.',
  },
  {
    icon: Zap,
    title: 'Auto-Hype Director',
    href: '/features/auto-hype',
    body: 'Turn chat velocity and sentiment into automatic OBS scene switches.',
  },
  {
    icon: Bot,
    title: 'AI Sidekick',
    href: '/features/ai-sidekick',
    body: 'Ask about your stream in plain language, right from the app.',
  },
];

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the panel it describes.
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

      {/* The faux panel for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LiveCockpitGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Live Cockpit', path: '/features/live-cockpit' },
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
              Your whole stream on one screen.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              The Live Cockpit is the streamerOS Dashboard — the screen you keep
              open while you&rsquo;re live. Chat sorted into tabs, Super Chats
              totalled, your most active chatters, a local AI read on the mood of
              the room and your OBS scenes, side by side. It all runs on your own
              PC.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src="/screenshots/dashboard.png"
        alt="The streamerOS Dashboard mid-stream, with the command center, Chat Triage, Stream Revenue, Top Chatters, Sentiment Horizon and the OBS Scene Switcher side by side"
        caption="The cockpit, mid-stream"
        width={SHOTS.dashboard.width}
        height={SHOTS.dashboard.height}
      />

      {/* Overview */}
      <section className="mx-auto max-w-5xl px-6 pt-20 sm:pt-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Six panels. One screen.
          </h2>
          <p className="mt-4 text-zinc-400">
            The things you&rsquo;d otherwise juggle between OBS and a browser full of
            chat tabs, laid out where you can see them at a glance.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PANELS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-400">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Run the stream from the Dashboard in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Connect &rarr; Triage &rarr; Spot your regulars &rarr; Switch scenes.
            Revenue and sentiment get their own sections below.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Connect */}
          <Step
            index={1}
            icon={Plug}
            eyebrow="Connect"
            title="Connect OBS and bring in chat."
            body="The Command Center sits at the top of the Dashboard. One click connects OBS over WebSocket v5 on the same PC, and your YouTube chat status is right beside it. YouTube Live chat is read from the chat window in your own browser using Windows UI Automation — no API key, no Google sign-in. Twitch chat comes in through an anonymous, read-only connection with no login."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Plug className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Command Center
                </p>
                <Panel icon={LayoutDashboard} title="Command Center">
                  <ConnectRow
                    icon={MonitorPlay}
                    name="OBS Studio"
                    status="Connected"
                    action="Disconnect"
                    tone="cyan"
                  />
                  <ConnectRow
                    icon={Radio}
                    name="YouTube Live"
                    status="Active"
                    action="Manage"
                    tone="emerald"
                  />
                </Panel>
                <div className="flex flex-wrap gap-2">
                  {['No API key', 'No Google sign-in', 'Twitch: read-only'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
          />

          {/* Step 2 — Triage */}
          <Step
            index={2}
            icon={MessagesSquare}
            eyebrow="Triage"
            title="Read chat one tab at a time."
            body="Chat Triage is a single chat block with four tabs — All, Viewers, Members and Super Chats — each with a live count, so you can jump to just the Super Chats between rounds. Regular viewer messages pass a local moderation filter that hides toxic and spam lines; member messages and Super Chats always come through. It follows the newest message, stops when you scroll up to read, and picks back up when you return to the bottom."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <MessagesSquare className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Following latest
                </p>
                <Panel icon={MessagesSquare} title="Chat Triage" meta="3 filtered">
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    <TabChip label="All" count={214} active />
                    <TabChip label="Viewers" count={188} />
                    <TabChip label="Members" count={9} />
                    <TabChip label="Super Chats" count={17} />
                  </div>
                  <ChatLine user="pixelpanda" text="that clutch was clean" />
                  <ChatLine kind="member" user="nightowl_gg" text="12 months already, let's go" />
                  <ChatLine
                    kind="super"
                    user="rahul.plays"
                    amount="₹500.00"
                    text="GG bhai, next match on stream?"
                  />
                  <ChatLine user="mira_draws" text="rank up tonight?" />
                </Panel>
              </div>
            }
          />

          {/* Step 3 — Top Chatters */}
          <Step
            index={3}
            icon={Users}
            eyebrow="Spot your regulars"
            title="See who is actually talking."
            body="Top Chatters ranks the two most active chatters this stream by message count, shows how many different people have chatted, and lines up chips for the people who chatted most recently — handy for a shout-out without scrolling back through chat."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Users className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  This stream
                </p>
                <Panel icon={Users} title="Top Chatters">
                  <ChatterRow rank={1} name="pixelpanda" count={48} />
                  <ChatterRow rank={2} name="nightowl_gg" count={41} />
                  <PropRow label="Distinct chatters" value="63" accent />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['mira_draws', 'rahul.plays', 'tacoLord', 'zen_k'].map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </Panel>
              </div>
            }
          />

          {/* Step 4 — Scene Switcher */}
          <Step
            index={4}
            icon={MonitorPlay}
            eyebrow="Switch scenes"
            title="Change scenes without leaving the Dashboard."
            body="The OBS Scene Switcher lists your scenes and highlights the one that is live — click another to switch. The highlight refreshes every few seconds, so a change you make directly in OBS shows up here too."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <MonitorPlay className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  OBS scenes
                </p>
                <Panel icon={MonitorPlay} title="OBS Scene Switcher">
                  <SceneRow name="Starting Soon" />
                  <SceneRow name="Gameplay" live />
                  <SceneRow name="Just Chatting" />
                  <SceneRow name="BRB" />
                  <SceneRow name="Ending" />
                </Panel>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Connected over OBS WebSocket v5 on this PC.
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Stream Revenue */}
      <section id="revenue" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Stream Revenue
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Know what the stream made before you hit End.
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Every Super Chat is recorded to a local SQLite ledger on your PC as it
              lands. If the same one comes through twice, it only counts once.
            </p>
            <ul className="mt-6 space-y-3">
              <Bullet>
                Exact totals for each currency — ₹, $, €, £ and ¥ are recognised by
                symbol.
              </Bullet>
              <Bullet>
                A combined total in the display currency you pick, clearly labelled as
                approximate.
              </Bullet>
              <Bullet>
                Conversion uses exchange rates you set in Settings. The bundled
                defaults include 1 USD ≈ ₹83, 1 EUR ≈ ₹90 and 1 GBP ≈ ₹105. They stay
                fixed until you change them — there is no live exchange-rate lookup.
              </Bullet>
              <Bullet>Nothing is uploaded. The ledger lives on your own disk.</Bullet>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              Streaming to an Indian audience? See how ₹ revenue and Hinglish chat
              work in{' '}
              <Link href="/for/indian-streamers" className={INLINE_LINK}>
                streamerOS for Indian streamers
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <Panel icon={Coins} title="Stream Revenue" meta="17 Super Chats">
                <div className="flex items-end justify-between gap-4 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] px-3 py-2.5">
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      Total · approx
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-cyan-200">≈ ₹6,255</span>
                  </span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-300">
                    INR
                  </span>
                </div>
                <p className="pt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                  Exact, by currency
                </p>
                <CurrencyRow code="INR" amount="₹2,450.00" count={12} />
                <CurrencyRow code="USD" amount="$35.00" count={4} />
                <CurrencyRow code="EUR" amount="€10.00" count={1} />
              </Panel>
              <Panel icon={Settings2} title="Exchange rates · Settings">
                <PropRow label="1 USD" value="₹83" />
                <PropRow label="1 EUR" value="₹90" />
                <PropRow label="1 GBP" value="₹105" />
              </Panel>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sentiment Horizon */}
      <section id="sentiment" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Sentiment Horizon
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Read the mood of chat at a glance.
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              A local AI model, running in Ollama on your own PC, reads chat in
              batches about every two seconds and scores the room from −1 (toxic) to
              +1 (hype), with a short label like 🔥 HYPE or 😂 LMAO.
            </p>
            <ul className="mt-6 space-y-3">
              <Bullet>
                Updates once a second, holding the last score between readings so the
                bar glides instead of flickering.
              </Bullet>
              <Bullet>Understands Hinglish — “Bhai sahi hai” reads as positive.</Bullet>
              <Bullet>
                When chat is flying, it scores an evenly spread sample of up to 40
                messages from each window.
              </Bullet>
              <Bullet>
                If Ollama is offline, you see an “Ollama offline” banner and a neutral
                reading — never a made-up score.
              </Bullet>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              Needs Ollama and a model installed; an RTX 3060-class GPU is recommended
              for the local AI features. Sentiment can also drive{' '}
              <Link href="/features/auto-hype" className={INLINE_LINK}>
                Auto-Hype Director
              </Link>{' '}
              rules, and{' '}
              <Link href="/features/viral-moments" className={INLINE_LINK}>
                Viral Moments
              </Link>{' '}
              marks the hype spikes for your editor.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:order-first">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <Panel icon={Activity} title="Sentiment Horizon" meta="31 msgs / window">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-lg font-bold uppercase tracking-wider text-cyan-300">
                    🔥 HYPE
                  </span>
                  <span className="font-mono text-2xl font-semibold leading-none text-cyan-300">
                    0.62
                  </span>
                </div>
                <div className="pt-2">
                  <div className="relative h-2 rounded-full bg-white/5">
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-white/20"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-1/2 rounded-full bg-gradient-to-r from-purple-400/60 to-cyan-300"
                      style={{ width: '31%' }}
                    />
                    <span
                      aria-hidden
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 bg-cyan-300"
                      style={{ left: '81%' }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-zinc-600">
                    <span>−1 toxic</span>
                    <span>0</span>
                    <span>+1 hype</span>
                  </div>
                </div>
                <div className="flex h-12 items-end justify-end gap-1.5 overflow-hidden pt-1">
                  {WAVE.map((h, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className="w-1.5 shrink-0 rounded-full bg-gradient-to-t from-purple-400/60 to-cyan-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </Panel>

              <div className="flex items-center gap-3 rounded-lg border border-purple-400/30 bg-purple-400/[0.06] px-3 py-2.5">
                <Languages className="h-4 w-4 shrink-0 text-purple-300" strokeWidth={1.75} aria-hidden />
                <span className="min-w-0 flex-1 truncate text-sm text-zinc-300">Bhai sahi hai</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-purple-300">
                  Positive
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/[0.04] px-3 py-2.5">
                <TriangleAlert className="h-4 w-4 shrink-0 text-red-400/80" strokeWidth={1.75} aria-hidden />
                <span className="min-w-0 flex-1 text-sm text-zinc-300">Ollama offline</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Neutral · 0.00
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related features */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Works with the rest of streamerOS.
            </h2>
            <p className="mt-4 text-zinc-400">
              The chat and signals on the Dashboard feed straight into these.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.href} delay={i * 0.05}>
                  <Link
                    href={r.href}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100">
                      {r.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-zinc-400">{r.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300">
                      Read the guide
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="Every panel on the Dashboard."
        blurb="Chat, Super Chat revenue, the mood of the room and your OBS scenes, captured from the app."
        shots={[
          SHOTS.dashboard,
          SHOTS.chatTriage,
          SHOTS.revenue,
          SHOTS.revenueInr,
          SHOTS.topChatters,
          SHOTS.sentiment,
          SHOTS.sceneSwitcher,
          SHOTS.obsConnection,
        ]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Run the whole stream from one screen.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The Live Cockpit ships at launch in February 2027, running on your own
              PC. Free for 7 days, then $29 once.
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
