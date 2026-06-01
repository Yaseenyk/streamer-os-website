'use client';

import { motion } from 'framer-motion';

/**
 * Animated SVG of the chat → sOS core → OBS datalink. Pure inline SVG so the
 * browser can hand the animation to the GPU — no GIFs or canvas. Rendered inline
 * inside a blog post at the [LIVE_SYSTEM_DATALINK_LOOP] placeholder.
 */
export default function InteractiveNodeVisualizer() {
  return (
    <div className="my-8 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-md">
      <h3 className="mb-6 self-start font-mono text-sm text-cyan-400">
        ⚡ LIVE SYSTEM DATALINK LOOP
      </h3>

      <svg viewBox="0 0 600 200" className="h-auto w-full max-w-2xl">
        <line x1="100" y1="100" x2="300" y2="100" stroke="#1e293b" strokeWidth="4" />
        <line x1="300" y1="100" x2="500" y2="100" stroke="#1e293b" strokeWidth="4" />

        {/* Automation packets travelling along the link. */}
        <motion.circle
          cx="100"
          cy="100"
          r="6"
          fill="#06b6d4"
          animate={{ cx: [100, 300] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
        <motion.circle
          cx="300"
          cy="100"
          r="6"
          fill="#a855f7"
          animate={{ cx: [300, 500] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
        />

        {/* Chat node */}
        <g transform="translate(100, 100)">
          <motion.circle
            r="30"
            fill="#05070a"
            stroke="#06b6d4"
            strokeWidth="2"
            whileHover={{ scale: 1.1, stroke: '#22d3ee' }}
          />
          <text textAnchor="middle" y="5" fill="#e2e8f0" fontSize="10" fontFamily="monospace">
            CHAT
          </text>
        </g>

        {/* streamerOS core */}
        <g transform="translate(300, 100)">
          <motion.circle
            r="40"
            fill="#05070a"
            stroke="#a855f7"
            strokeWidth="2"
            animate={{ strokeWidth: [2, 4, 2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <text
            textAnchor="middle"
            y="5"
            fill="#e2e8f0"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            sOS CORE
          </text>
        </g>

        {/* OBS node */}
        <g transform="translate(500, 100)">
          <motion.circle
            r="30"
            fill="#05070a"
            stroke="#3b82f6"
            strokeWidth="2"
            whileHover={{ scale: 1.1, stroke: '#60a5fa' }}
          />
          <text textAnchor="middle" y="5" fill="#e2e8f0" fontSize="10" fontFamily="monospace">
            OBS v5
          </text>
        </g>
      </svg>

      <p className="mt-4 text-center font-mono text-xs text-slate-400">
        Hover over the nodes to test physics interaction. The glowing pulses represent
        localized automation packets.
      </p>
    </div>
  );
}
