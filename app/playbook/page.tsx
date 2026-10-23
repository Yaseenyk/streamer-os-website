import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Coffee,
  Crosshair,
  Ghost,
  MonitorPlay,
  Swords,
  Trophy,
  Volume2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'The Streamer’s Playbook',
  description:
    'Real Auto-Hype Director automations built on chat velocity and Super Chats: facecam push-ins, celebration scenes, clutch focus cuts, BRB breaks and saved clips.',
  alternates: { canonical: 'https://streamerosai.com/playbook' },
};

// ---------------------------------------------------------------------------
// Local, static MOCK of a node. The real LogicNode type lives in the desktop
// app repo and must never be imported here — this marketing site only renders
// a static picture of a rule. Keeping the shape local keeps `next build` clean.
// ---------------------------------------------------------------------------
type NodeKind = 'trigger' | 'logic' | 'action';

interface ScenarioNode {
  kind: NodeKind;
  icon: LucideIcon;
  label: string;
  detail: string;
}

const NODE_TONE: Record<NodeKind, { ring: string; icon: string; dot: string; tag: string }> = {
  trigger: { ring: 'border-cyan-400/40 bg-cyan-400/[0.06]', icon: 'text-cyan-300', dot: 'bg-cyan-400', tag: 'Trigger' },
  logic: { ring: 'border-purple-400/40 bg-purple-400/[0.06]', icon: 'text-purple-300', dot: 'bg-purple-400', tag: 'Logic' },
  action: { ring: 'border-emerald-400/40 bg-emerald-400/[0.06]', icon: 'text-emerald-300', dot: 'bg-emerald-400', tag: 'Action' },
};

function NodeChip({ node }: { node: ScenarioNode }) {
  const { kind, icon: Icon, label, detail } = node;
  const t = NODE_TONE[kind];
  return (
    <div className={`w-full rounded-xl border ${t.ring} p-4 backdrop-blur-sm`}>
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{t.tag}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${t.icon}`}>
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">{label}</p>
          <p className="truncate text-xs text-zinc-500">{detail}</p>
        </div>
      </div>
    </div>
  );
}

/** Static glassmorphic card mocking the Auto-Hype Director node setup. */
function NodeSetup({ title, nodes }: { title: string; nodes: ScenarioNode[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-7">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{title}</p>
      <div className="mt-5 flex flex-col gap-3">
        {nodes.map((node, i) => (
          <div key={`${node.kind}-${node.label}`} className="flex flex-col gap-3">
            <NodeChip node={node} />
            {i < nodes.length - 1 && (
              <ArrowRight aria-hidden className="h-4 w-4 self-center rotate-90 text-zinc-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scenarios
// ---------------------------------------------------------------------------
interface Scenario {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  prose: string[];
  setupTitle: string;
  nodes: ScenarioNode[];
}

const SCENARIOS: Scenario[] = [
  {
    icon: Swords,
    eyebrow: 'Scenario 01',
    title: 'The Boss Fight: Pushing In the OBS Facecam on a Chat-Velocity Hype Spike',
    prose: [
      'You’re forty minutes into a brutal boss attempt and the run is finally going right. You can’t feel it from inside the fight, but chat can — the messages start stacking faster, the emotes pour in, and the room leans forward all at once. That surge of chat velocity is the most honest hype signal you have, and it’s happening at the exact moment your hands are least free to do anything about it.',
      'So you let the Auto-Hype Director watch it for you. A Trigger node compares chat velocity against your hype threshold, and an Action node switches OBS to a tighter facecam angle the moment it crosses. The switch fires once when the condition becomes true — not on every tick — and when chat settles back below the threshold, streamerOS returns you to the scene you were on. You never touch a hotkey; the broadcast simply tightens around the moment.',
    ],
    setupTitle: 'Node setup · Boss Fight',
    nodes: [
      { kind: 'trigger', icon: Zap, label: 'Chat Velocity > 50 / s', detail: 'hype detected' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Facecam Close-Up', detail: 'push in on the reaction' },
    ],
  },
  {
    icon: Trophy,
    eyebrow: 'Scenario 02',
    title: 'The Big Super Chat: A Celebration Scene and Sound When Support Lands',
    prose: [
      'A viewer drops a big Super Chat in the middle of a fight. It deserves a moment on stream — but you’re mid-game, and by the time you’ve read it and reached for a hotkey, the moment has passed and the supporter got a flat “thanks” three minutes late.',
      'The Auto-Hype Director catches it for you. A Super Chat Trigger fires when a single Super Chat crosses the amount you set, and two Action nodes run together: one switches OBS to your celebration scene, the other plays your thank-you sting from the clips folder. Super Chats interrupt the rule loop ahead of the regular velocity ticks, so the reaction lands while the donation is still on screen.',
    ],
    setupTitle: 'Node setup · Big Super Chat',
    nodes: [
      { kind: 'trigger', icon: Trophy, label: 'Super Chat ≥ $20', detail: 'real support lands' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Celebration', detail: 'give it a moment' },
      { kind: 'action', icon: Volume2, label: 'Play Sound = Thank-You Sting', detail: 'with a cooldown' },
    ],
  },
  {
    icon: Crosshair,
    eyebrow: 'Scenario 03',
    title: 'The Clutch: Switching OBS Studio to a Focus Scene When Chat Goes Silent',
    prose: [
      'You’re in a 1v5. The whole lobby is on you, and there is no universe where you take a hand off the mouse to reach for an OBS hotkey and swap to your “Tryhard / Focus” scene — the moment you do, you lose the round. Meanwhile chat goes dead silent, everyone holding their breath at once.',
      'The Auto-Hype Director reads that silence for exactly what it is. A Trigger watches for chat velocity dropping below a low threshold and switches you to a clean Focus scene, stripping away the overlays that would distract you. Then, when you clutch it, chat detonates — velocity spikes past your hype threshold — and streamerOS cuts to your Victory / Replay scene and saves the OBS replay buffer, so the round is already on disk. You never touched a key; the broadcast told your story for you.',
    ],
    setupTitle: 'Node setup · The Clutch',
    nodes: [
      { kind: 'trigger', icon: Activity, label: 'Chat Velocity < 0.5 / s', detail: 'the room holds its breath' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Focus Mode', detail: 'cut the distractions' },
      { kind: 'trigger', icon: Zap, label: 'Chat Velocity > 40 / s', detail: 'chat detonates' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Victory / Replay + Save Replay', detail: 'ride the moment' },
    ],
  },
  {
    icon: Coffee,
    eyebrow: 'Scenario 04',
    title: 'The Snack Break: A BRB Scene and Muted Mic When the Room Goes Quiet',
    prose: [
      'You step away for thirty seconds to grab food. Thirty seconds becomes five minutes. You forgot to hit the BRB screen — so viewers are watching an empty chair and a paused game, and the energy you spent all stream building quietly drains away.',
      'A rule built on a very low chat-velocity threshold catches it: when chat falls almost silent, the Action nodes switch to your AFK / Be Right Back scene and mute your mic input in OBS, so the kitchen stays off-stream. Set the threshold low enough that only a genuinely empty room trips it — a normal lull should not — and when chat picks back up, streamerOS returns to the scene you left.',
    ],
    setupTitle: 'Node setup · Snack Break',
    nodes: [
      { kind: 'trigger', icon: Activity, label: 'Chat Velocity < 0.1 / s', detail: 'the room goes quiet' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = BRB + Mute Mic', detail: 'a tidy “back soon”' },
    ],
  },
  {
    icon: Ghost,
    eyebrow: 'Scenario 05',
    title: 'The Jump Scare: Saving the Clip the Moment Chat Floods',
    prose: [
      'The horror game finally gets you. You scream, you flinch clean out of frame — and chat instantly floods with OMEGALUL and LMAO. It’s a perfect clip moment, the kind that makes the rounds the next day, and right now it’s slipping past completely unmarked.',
      'The flood itself is the signal: chat velocity jumps far above your normal pace. A Trigger on that spike saves the OBS replay buffer, so the last few seconds are already on disk, and sets your Aura overlay to its Hype mood for the moment. Viral Moments independently drops a timestamped marker on the spike, so the clip is easy to find after the stream. The bit lands on its own, and you just keep playing.',
    ],
    setupTitle: 'Node setup · Jump Scare',
    nodes: [
      { kind: 'trigger', icon: Zap, label: 'Chat Velocity > 30 / s', detail: 'the laughter flood' },
      { kind: 'action', icon: MonitorPlay, label: 'Save Replay Buffer', detail: 'the clip is already saved' },
      { kind: 'action', icon: Activity, label: 'Aura Mood = Hype', detail: 'the overlay reacts' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Plain-text concept definitions — entity-rich, answer-first blocks sized for
// clean AI / LLM summarization snippets.
// ---------------------------------------------------------------------------
const GLOSSARY: { term: string; definition: string }[] = [
  {
    term: 'Auto-Hype Director',
    definition:
      'The Auto-Hype Director is streamerOS’s visual, node-based automation engine. It links Trigger nodes (chat velocity and Super Chat amount, each above or below a threshold you set), Logic nodes (AND / OR), and Action nodes so that Open Broadcaster Software (OBS) Studio scenes switch automatically the instant your stream peaks — without touching a hotkey.',
  },
  {
    term: 'Chat Velocity',
    definition:
      'Chat velocity is the rate of incoming chat messages over a short rolling window, such as messages per second. streamerOS treats a sharp rise in chat velocity as a real-time hype signal, and a drop below a low threshold as a lull, using both to drive automatic scene changes.',
  },
  {
    term: 'Interprocess Communication (IPC)',
    definition:
      'Interprocess Communication (IPC) is the set of operating-system mechanisms that let two separate local applications — such as streamerOS and Open Broadcaster Software (OBS) Studio — exchange data and commands directly on the same machine, without routing anything over the internet.',
  },
  {
    term: 'Local Loopback Adapter',
    definition:
      'A local loopback adapter, reachable at the IP address 127.0.0.1, routes network traffic entirely inside your own computer’s memory. streamerOS communicates with OBS Studio over this loopback connection, so scene-switch commands never leave the device and execute in milliseconds.',
  },
  {
    term: 'Zero-Cloud Architecture',
    definition:
      'Zero-cloud architecture means the software runs and stores all of its data on the local machine, with no remote server, user account, or backend. For streamerOS, your chat, audio, credentials, and automation rules never leave your computer.',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PlaybookPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              The Playbook
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              The Streamer&rsquo;s Playbook.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Real-world automation scenarios built with the Auto-Hype Director.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Scenarios */}
      <div className="mx-auto max-w-3xl space-y-24 px-6 py-20 sm:space-y-28 sm:py-24">
        {SCENARIOS.map((scenario) => {
          const { icon: Icon, eyebrow, title, prose, setupTitle, nodes } = scenario;
          return (
            <section key={title}>
              <Reveal>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                  {eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-5 max-w-prose space-y-4 leading-relaxed text-slate-300">
                  {prose.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.16} className="mt-8">
                <NodeSetup title={setupTitle} nodes={nodes} />
              </Reveal>
            </section>
          );
        })}
      </div>

      {/* Key concepts — plain-text definitions for clean AI / LLM summarization */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Key concepts
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              streamerOS Automation Glossary: Key Terms Defined
            </h2>
          </Reveal>
          <div className="mt-8 space-y-8">
            {GLOSSARY.map(({ term, definition }) => (
              <Reveal key={term}>
                <h3 className="text-lg font-semibold text-zinc-100">{term}</h3>
                <p className="mt-2 max-w-prose leading-relaxed text-slate-300">{definition}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Write your own plays.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              These are just five. The Auto-Hype Director is a blank canvas — wire your
              own triggers, logic, and actions, and let the broadcast run itself.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-Register for Launch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
              <Link
                href="/features/auto-hype"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                How the Director works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
