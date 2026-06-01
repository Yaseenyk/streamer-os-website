'use client';

import { motion } from 'framer-motion';

// A spiky velocity trace; the stroke draws and retraces to read as a live feed.
const WAVE =
  'M30 150 L90 138 L150 92 L210 128 L270 60 L330 116 L390 70 L450 150 L510 104 L570 132';
const GRID_LINES = [40, 80, 120, 160];

export default function TelemetryLoopVisualizer() {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-md">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-mono text-sm text-cyan-400">CHAT VELOCITY · LIVE</h3>
        <span className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          REC
        </span>
      </div>

      <svg viewBox="0 0 600 190" className="h-auto w-full">
        <defs>
          <linearGradient id="telemetry-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {GRID_LINES.map((y) => (
          <line key={`grid-${y}`} x1="30" y1={y} x2="570" y2={y} stroke="#1e293b" strokeWidth="1" />
        ))}

        <motion.path
          d={WAVE}
          fill="none"
          stroke="url(#telemetry-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        {/* Sweeping "now" line */}
        <motion.line
          x1={30}
          x2={30}
          y1="20"
          y2="170"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeOpacity="0.4"
          animate={{ x1: [30, 570], x2: [30, 570] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Spike marker at the peak */}
        <motion.circle
          cx="270"
          cy="60"
          fill="#a855f7"
          animate={{ r: [4, 8, 4], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="mt-5 flex flex-wrap gap-3 font-mono text-xs">
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300">
          ▲ spike detected
        </span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300">
          sentiment: positive
        </span>
      </div>
    </div>
  );
}
