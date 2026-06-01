'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  Cpu,
  Radio,
  RotateCcw,
  Sparkles,
  VolumeX,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// A miniature, "playable" model of the Auto-Hype Director. Clicking a control
// mutates the simulated telemetry (velocity / sentiment), fires a glowing data
// packet down the node graph, and swaps the fake OBS preview to the resulting
// scene. Nothing here talks to a real engine — it's a guided demo.
// ---------------------------------------------------------------------------

type EventKind = 'idle' | 'hype' | 'silence';

interface SimState {
  velocity: number; // messages / second
  sentiment: string;
  scene: string;
  event: EventKind;
}

const IDLE: SimState = {
  velocity: 12,
  sentiment: 'Neutral',
  scene: 'Just Chatting',
  event: 'idle',
};

const HYPE: SimState = {
  velocity: 64,
  sentiment: 'Hype',
  scene: 'HYPE SCENE',
  event: 'hype',
};

const SILENCE: SimState = {
  velocity: 2,
  sentiment: 'Focused',
  scene: 'Focus Mode',
  event: 'silence',
};

const VELOCITY_CEILING = 80; // for the meter's full-width mapping

// Per-event accent used by the packet, the meter, and the lit nodes.
const ACCENT: Record<Exclude<EventKind, 'idle'>, string> = {
  hype: '#22d3ee',
  silence: '#a855f7',
};

// Fake-OBS preview styling, keyed by the active scene.
const SCENE_VISUAL: Record<
  string,
  { label: string; sub: string; className: string; dot: string }
> = {
  'Just Chatting': {
    label: 'JUST CHATTING',
    sub: 'idle · waiting for a trigger',
    className: 'bg-[#0a0e15] text-zinc-300',
    dot: 'bg-zinc-500',
  },
  'HYPE SCENE': {
    label: 'HYPE SCENE ACTIVE',
    sub: 'velocity + sentiment spike detected',
    className:
      'bg-[linear-gradient(135deg,rgba(34,211,238,0.25),rgba(168,85,247,0.25))] text-white',
    dot: 'bg-cyan-300',
  },
  'Focus Mode': {
    label: 'FOCUS MODE',
    sub: 'chat fell silent · everyone is locked in',
    className: 'bg-[#070b12] text-purple-200',
    dot: 'bg-purple-400',
  },
};

// ---------------------------------------------------------------------------
// Node — a single box in the graph (trigger / logic / action).
// ---------------------------------------------------------------------------
function Node({
  icon: Icon,
  tag,
  label,
  value,
  lit,
  accent,
}: {
  icon: LucideIcon;
  tag: string;
  label: string;
  value?: string;
  lit: boolean;
  accent: string;
}) {
  return (
    <motion.div
      animate={{
        borderColor: lit ? accent : 'rgba(255,255,255,0.12)',
        boxShadow: lit ? `0 0 22px -4px ${accent}` : '0 0 0px rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border bg-white/[0.03] px-4 py-3"
    >
      <div className="flex items-center gap-2">
        <Icon
          className="h-4 w-4"
          strokeWidth={1.75}
          aria-hidden
          style={{ color: lit ? accent : '#71717a' }}
        />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {tag}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-zinc-100">{label}</p>
      {value && <p className="mt-0.5 font-mono text-xs text-zinc-400">{value}</p>}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Control button.
// ---------------------------------------------------------------------------
function ControlButton({
  icon: Icon,
  label,
  hint,
  onClick,
  variant,
}: {
  icon: LucideIcon;
  label: string;
  hint: string;
  onClick: () => void;
  variant: 'hype' | 'silence' | 'reset';
}) {
  const styles = {
    hype: 'border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-300',
    silence:
      'border-purple-400/40 hover:border-purple-400 hover:bg-purple-400/10 text-purple-300',
    reset: 'border-white/10 hover:border-white/30 hover:bg-white/5 text-zinc-300',
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-xl border bg-white/[0.02] px-4 py-3 text-left transition ${styles}`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        <span className="text-sm font-semibold">{label}</span>
      </span>
      <span className="mt-1 block pl-[26px] text-xs text-zinc-500">{hint}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Simulator
// ---------------------------------------------------------------------------
export default function AutoHypeSimulator() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<SimState>(IDLE);
  // Bumped on every fire so the packet animation re-mounts and replays.
  const [pulse, setPulse] = useState(0);

  const fire = (next: SimState) => {
    setState(next);
    setPulse((p) => p + 1);
  };

  const scene = SCENE_VISUAL[state.scene];
  const accent = state.event === 'idle' ? '#3f3f46' : ACCENT[state.event];
  const velocityPct = Math.min(100, (state.velocity / VELOCITY_CEILING) * 100);

  const velocityLit = state.event === 'hype';
  const sentimentLit = state.event === 'hype';
  const silenceLit = state.event === 'silence';

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080b11] shadow-2xl shadow-black/50">
      {/* Title bar — premium dashboard chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-zinc-500">
            streamerOS — Auto-Hype Director (demo)
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          live sim
        </span>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[minmax(0,260px)_1fr]">
        {/* ---------------- Control panel ---------------- */}
        <div className="bg-[#080b11] p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Control panel
          </p>
          <div className="mt-4 space-y-3">
            <ControlButton
              icon={Zap}
              label="Spike Chat Velocity"
              hint="Chat erupts — velocity + hype"
              variant="hype"
              onClick={() => fire(HYPE)}
            />
            <ControlButton
              icon={VolumeX}
              label="Simulate Silence"
              hint="Chat goes quiet — everyone's locked in"
              variant="silence"
              onClick={() => fire(SILENCE)}
            />
            <ControlButton
              icon={RotateCcw}
              label="Reset"
              hint="Return to a calm baseline stream"
              variant="reset"
              onClick={() => fire(IDLE)}
            />
          </div>

          {/* Telemetry readout */}
          <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <span>Chat velocity</span>
                <span className="text-zinc-300">{state.velocity}/s</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${velocityPct}%`, backgroundColor: accent }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Sentiment
              </span>
              <motion.span
                animate={{ color: accent }}
                className="font-mono text-xs font-semibold"
              >
                {state.sentiment}
              </motion.span>
            </div>
          </div>
        </div>

        {/* ---------------- The engine ---------------- */}
        <div className="bg-[#080b11] p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            The engine
          </p>

          {/* Node graph */}
          <div className="relative mt-4">
            {/* connecting rail */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/10 sm:block" />
            {/* glowing data packet — re-mounts each fire via the `pulse` key */}
            {pulse > 0 && !reduce && state.event !== 'idle' && (
              <motion.div
                key={pulse}
                aria-hidden
                className="absolute top-1/2 z-10 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full sm:block"
                style={{ backgroundColor: accent, boxShadow: `0 0 14px 3px ${accent}` }}
                initial={{ left: '4%', opacity: 0 }}
                animate={{ left: ['4%', '50%', '96%'], opacity: [0, 1, 0] }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            )}

            <div className="relative grid gap-3 sm:grid-cols-3 sm:items-center">
              {/* Triggers */}
              <div className="space-y-3">
                <Node
                  icon={Activity}
                  tag="Trigger"
                  label="Chat Velocity"
                  value={velocityLit ? '> 40 /s' : `${state.velocity} /s`}
                  lit={velocityLit || silenceLit}
                  accent={accent}
                />
                <Node
                  icon={Sparkles}
                  tag="Trigger"
                  label="Sentiment"
                  value={state.sentiment}
                  lit={sentimentLit || silenceLit}
                  accent={accent}
                />
              </div>

              {/* Logic */}
              <Node
                icon={Cpu}
                tag="Logic"
                label={state.event === 'silence' ? 'NOR · held 8s' : 'AND gate'}
                lit={state.event !== 'idle'}
                accent={accent}
              />

              {/* Action */}
              <Node
                icon={Radio}
                tag="Action"
                label="Switch OBS Scene"
                value={`→ ${state.scene}`}
                lit={state.event !== 'idle'}
                accent={accent}
              />
            </div>
          </div>

          {/* Fake OBS preview */}
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            OBS preview
          </p>
          <motion.div
            animate={{ opacity: 1 }}
            className={`mt-2 flex aspect-video flex-col items-center justify-center rounded-xl border border-white/10 transition-colors duration-500 ${scene.className}`}
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-80">
              <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${scene.dot}`} />
              ● rec
            </span>
            <motion.p
              key={state.scene}
              initial={reduce ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-center text-xl font-bold tracking-tight sm:text-2xl"
            >
              {scene.label}
            </motion.p>
            <p className="mt-1 text-center text-xs opacity-70">{scene.sub}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
