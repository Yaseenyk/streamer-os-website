import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Coffee,
  Crosshair,
  Gamepad2,
  Ghost,
  GitMerge,
  MonitorPlay,
  Swords,
  Trophy,
  Volume2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'The Streamer’s Playbook',
  description:
    'Real-world automation scenarios built with the Auto-Hype Director — boss-fight ' +
    'facecam push-ins, match-win celebrations, clutch focus cuts, AFK breaks, and ' +
    'auto-marked clip moments.',
  alternates: { canonical: 'https://yaseenyk.github.io/streamer-os-website/playbook' },
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
    title: 'The Boss Fight.',
    prose: [
      'You’re forty minutes into a brutal boss attempt and the run is finally going right. You can’t feel it from inside the fight, but chat can — the messages start stacking faster, the emotes pour in, and the room leans forward all at once. That surge of chat velocity is the most honest hype signal you have, and it’s happening at the exact moment your hands are least free to do anything about it.',
      'So you let the Auto-Hype Director watch it for you. A Trigger node tracks chat velocity and fires the instant it crosses your hype threshold and holds there. It flows into a Logic node that keeps the rule from twitching on a single spike, and out to an Action node that switches OBS to a tighter facecam angle — pushing the camera in on your reaction right as the room peaks. You never touch a hotkey; the broadcast simply tightens around the moment.',
    ],
    setupTitle: 'Node setup · Boss Fight',
    nodes: [
      { kind: 'trigger', icon: Zap, label: 'Chat Velocity > 50 / s', detail: 'hype detected' },
      { kind: 'logic', icon: GitMerge, label: 'Sustained for 4s', detail: 'ignore single spikes' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Facecam Close-Up', detail: 'push in on the reaction' },
    ],
  },
  {
    icon: Trophy,
    eyebrow: 'Scenario 02',
    title: 'The Victory Screen.',
    prose: [
      'The match ends and the win lands. This is the beat your highlight reel is made of — but it’s also the beat you’re most likely to fumble, because you’re busy celebrating, not reaching for a scene switch. A win deserves more than you flatly cutting to a static screen three seconds too late.',
      'The Auto-Hype Director catches it by combining two signals. A game-state Trigger fires the moment the match resolves to a victory, and an audio-level Trigger confirms the room actually erupted — your mic and game audio spiking together. A Logic gate requires both to be true, so a quiet, anticlimactic win won’t set it off. When they line up, the Action node fires a massive celebratory scene transition: confetti overlay, hype music sting, the works — perfectly timed, every single time.',
    ],
    setupTitle: 'Node setup · Victory Screen',
    nodes: [
      { kind: 'trigger', icon: Gamepad2, label: 'Game State = Victory', detail: 'match resolved as a win' },
      { kind: 'trigger', icon: Volume2, label: 'Audio Level > threshold', detail: 'the room erupts' },
      { kind: 'logic', icon: GitMerge, label: 'AND gate', detail: 'both must be true' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Victory Celebration', detail: 'transition + hype sting' },
    ],
  },
  {
    icon: Crosshair,
    eyebrow: 'Scenario 03',
    title: 'The Clutch.',
    prose: [
      'You’re in a 1v5. The whole lobby is on you, and there is no universe where you take a hand off the mouse to reach for an OBS hotkey and swap to your “Tryhard / Focus” scene — the moment you do, you lose the round. Meanwhile chat goes dead silent, everyone holding their breath at once.',
      'The Auto-Hype Director reads that silence for exactly what it is. A Trigger watches chat velocity freeze near zero and switches you to a clean Focus scene, stripping away the overlays that would distract you. Then, when you clutch it, chat detonates — velocity spikes and sentiment turns pure hype — and streamerOS instantly cuts to your Victory / Replay scene. You never touched a key; the broadcast told your story for you.',
    ],
    setupTitle: 'Node setup · The Clutch',
    nodes: [
      { kind: 'trigger', icon: Activity, label: 'Chat Velocity ≈ 0 (held 8s)', detail: 'the room holds its breath' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Focus Mode', detail: 'cut the distractions' },
      { kind: 'trigger', icon: Zap, label: 'Velocity Spike > 40 / s + Hype', detail: 'chat detonates' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = Victory / Replay', detail: 'ride the moment' },
    ],
  },
  {
    icon: Coffee,
    eyebrow: 'Scenario 04',
    title: 'The Snack Break.',
    prose: [
      'You step away for thirty seconds to grab food. Thirty seconds becomes five minutes. You forgot to hit the BRB screen — so a few thousand people are now watching an empty chair and a paused game, and the energy you spent all stream building quietly drains away.',
      'streamerOS notices the room going quiet on its own: zero game audio and chat velocity falling off for five straight minutes. A Logic node makes sure it’s a real break and not a brief lull, then the Action node fades gently into your AFK / Be Right Back scene and mutes your mic — so the kitchen stays off-stream and your viewers get a tidy “back soon” instead of an empty chair.',
    ],
    setupTitle: 'Node setup · Snack Break',
    nodes: [
      { kind: 'trigger', icon: Volume2, label: 'Game Audio = 0 + Chat Velocity ↓', detail: 'the room goes quiet' },
      { kind: 'logic', icon: GitMerge, label: 'Sustained for 5 min', detail: 'a real break, not a lull' },
      { kind: 'action', icon: MonitorPlay, label: 'Scene = BRB + Mute Mic', detail: 'a tidy “back soon”' },
    ],
  },
  {
    icon: Ghost,
    eyebrow: 'Scenario 05',
    title: 'The Jump Scare.',
    prose: [
      'The horror game finally gets you. You scream, you flinch clean out of frame — and chat instantly floods with OMEGALUL and LMAO. It’s a perfect clip moment, the kind that makes the rounds the next day, and right now it’s slipping past completely unmarked.',
      'The sentiment engine reads the emote flood for exactly what it is — a massive spike of laughter — and a Logic node confirms it’s well above your laughter threshold rather than a stray emote or two. The Action node fires a temporary black-and-white “Wasted” filter over your webcam for ten seconds and drops a clip marker. The bit lands on its own, the moment gets saved, and you just keep playing.',
    ],
    setupTitle: 'Node setup · Jump Scare',
    nodes: [
      { kind: 'trigger', icon: Activity, label: 'Emote Sentiment = “LMAO” spike', detail: 'the laughter flood' },
      { kind: 'logic', icon: GitMerge, label: 'Above laughter threshold', detail: 'real, not a trickle' },
      { kind: 'action', icon: MonitorPlay, label: 'Webcam Filter = Wasted (10s)', detail: 'the bit lands itself' },
    ],
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
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300"
              >
                Download v1.0-GA
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/features/auto-hype"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
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
