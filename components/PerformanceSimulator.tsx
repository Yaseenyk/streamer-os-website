'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, MemoryStick, Rocket, RotateCcw, ShieldCheck, TriangleAlert } from 'lucide-react';

// ---------------------------------------------------------------------------
// Side-by-side telemetry: streamerOS (Rust core) vs a typical Electron app.
// Clicking "Simulate Game Launch" jitters both readouts under load, then
// settles them — Electron spikes into the red, streamerOS holds at 1.8%.
// All values are illustrative; nothing is measured live.
// ---------------------------------------------------------------------------

type Mode = 'idle' | 'load';

interface Stats {
  electronCpu: number;
  electronRam: number;
  osCpu: number;
  osRam: number;
}

const IDLE: Stats = { electronCpu: 4.5, electronRam: 400, osCpu: 0.5, osRam: 45 };
const LOAD_FINAL: Stats = { electronCpu: 14.2, electronRam: 800, osCpu: 1.8, osRam: 152 };

const CPU_SCALE = 20; // % at which the gauge ring reads full
const RAM_SCALE = 1024; // MB at which the RAM bar reads full

const OS_ACCENT = '#22d3ee'; // cyan — stable
const WARN_ACCENT = '#f87171'; // red — warning
const NEUTRAL_ACCENT = '#a1a1aa'; // zinc — idle electron

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Circular CPU gauge -----------------------------------------------------
function Gauge({ value, accent }: { value: number; accent: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, value / CPU_SCALE));

  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset, stroke: accent }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span animate={{ color: accent }} className="font-mono text-3xl font-semibold">
          {value.toFixed(1)}
        </motion.span>
        <span className="font-mono text-xs text-zinc-500">% CPU</span>
      </div>
    </div>
  );
}

// --- One runtime's telemetry card -------------------------------------------
function TelemetryCard({
  name,
  runtime,
  accent,
  cpu,
  ram,
  status,
  warning,
}: {
  name: string;
  runtime: string;
  accent: string;
  cpu: number;
  ram: number;
  status: string;
  warning: boolean;
}) {
  const ramPct = Math.min(100, (ram / RAM_SCALE) * 100);

  return (
    <motion.div
      animate={{ borderColor: warning ? 'rgba(248,113,113,0.45)' : 'rgba(255,255,255,0.1)' }}
      className="rounded-2xl border bg-white/[0.03] p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
          <p className="mt-0.5 font-mono text-xs text-zinc-500">{runtime}</p>
        </div>
        <motion.span
          animate={{ color: accent, borderColor: accent }}
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
        >
          {warning ? (
            <TriangleAlert className="h-3 w-3" aria-hidden />
          ) : (
            <ShieldCheck className="h-3 w-3" aria-hidden />
          )}
          {status}
        </motion.span>
      </div>

      {/* CPU gauge */}
      <div className="mt-5 flex justify-center">
        <Gauge value={cpu} accent={accent} />
      </div>

      {/* RAM counter */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <MemoryStick className="h-3.5 w-3.5" aria-hidden /> Memory
          </span>
          <motion.span animate={{ color: accent }} className="font-mono text-lg font-semibold">
            {Math.round(ram)} MB
          </motion.span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${ramPct}%`, backgroundColor: accent }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Simulator
// ---------------------------------------------------------------------------
export default function PerformanceSimulator() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>('idle');
  const [stats, setStats] = useState<Stats>(IDLE);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  // Tidy up any in-flight jitter when the component unmounts.
  useEffect(() => () => clearTimers(), []);

  const runLoad = () => {
    clearTimers();
    setMode('load');

    // Respect reduced-motion: skip the rapid fluctuation, jump to the result.
    if (reduce) {
      setStats(LOAD_FINAL);
      return;
    }

    // Fluctuate rapidly for ~1.1s, then settle on the representative values.
    intervalRef.current = setInterval(() => {
      setStats({
        electronCpu: rand(12, 15),
        electronRam: rand(770, 830),
        osCpu: rand(1.5, 2),
        osRam: rand(146, 158),
      });
    }, 80);
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setStats(LOAD_FINAL);
    }, 1100);
  };

  const runIdle = () => {
    clearTimers();
    setMode('idle');
    setStats(IDLE);
  };

  const underLoad = mode === 'load';
  const electronAccent = underLoad ? WARN_ACCENT : NEUTRAL_ACCENT;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080b11] shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-zinc-500">resource monitor — comparison (demo)</span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          live sim
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* Telemetry readouts */}
        <div className="grid gap-5 sm:grid-cols-2">
          <TelemetryCard
            name="streamerOS"
            runtime="Rust core + native webview"
            accent={OS_ACCENT}
            cpu={stats.osCpu}
            ram={stats.osRam}
            status="Stable"
            warning={false}
          />
          <TelemetryCard
            name="Typical Electron App"
            runtime="Chromium + Node.js bundle"
            accent={electronAccent}
            cpu={stats.electronCpu}
            ram={stats.electronRam}
            status={underLoad ? 'Warning' : 'Idle'}
            warning={underLoad}
          />
        </div>

        {/* Control */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={underLoad ? runIdle : runLoad}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition ${
              underLoad
                ? 'border border-white/15 text-zinc-200 hover:border-white/30 hover:bg-white/5'
                : 'bg-cyan-400 text-[#05070A] hover:bg-cyan-300'
            }`}
          >
            {underLoad ? (
              <>
                <RotateCcw className="h-4 w-4" aria-hidden />
                Reset to Idle
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" aria-hidden />
                Simulate Game Launch (High Load)
              </>
            )}
          </button>
          <p className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <Cpu className="h-3.5 w-3.5" aria-hidden />
            {underLoad
              ? 'Game running — watch where each architecture spends your machine.'
              : 'Both runtimes idle. Launch a game to load them up.'}
          </p>
        </div>
      </div>
    </div>
  );
}
