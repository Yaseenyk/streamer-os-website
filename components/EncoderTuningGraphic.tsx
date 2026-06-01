'use client';

import { motion } from 'framer-motion';

// Staggered launch offsets so packets stream continuously rather than in lockstep.
const INPUT_PACKETS = [0, 0.5, 1, 1.5];
const OUTPUT_PACKETS = [0.25, 0.75, 1.25, 1.75];
const TOP_PINS = [240, 270, 300, 330, 360];

export default function EncoderTuningGraphic() {
  return (
    <div className="my-8 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-md">
      <h3 className="mb-6 self-start font-mono text-sm text-cyan-400">
        ⚙️ HARDWARE ENCODER · GPU OFFLOAD
      </h3>

      <svg viewBox="0 0 600 200" className="h-auto w-full max-w-2xl">
        {/* Input / output lanes */}
        <line x1="30" y1="100" x2="220" y2="100" stroke="#1e293b" strokeWidth="4" />
        <line x1="380" y1="100" x2="570" y2="100" stroke="#1e293b" strokeWidth="4" />

        {/* Raw frames entering the encoder (cyan) */}
        {INPUT_PACKETS.map((delay, i) => (
          <motion.circle
            key={`in-${i}`}
            cx="30"
            cy="100"
            r="5"
            fill="#06b6d4"
            animate={{ cx: [30, 220], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay }}
          />
        ))}

        {/* Processor pins */}
        {TOP_PINS.map((x) => (
          <line key={`pt-${x}`} x1={x} y1="45" x2={x} y2="55" stroke="#334155" strokeWidth="3" />
        ))}
        {TOP_PINS.map((x) => (
          <line key={`pb-${x}`} x1={x} y1="145" x2={x} y2="155" stroke="#334155" strokeWidth="3" />
        ))}

        {/* Encoder block — stroke gently shifts to read as "live" silicon */}
        <motion.rect
          x="220"
          y="55"
          width="160"
          height="90"
          rx="14"
          fill="#05070a"
          stroke="#a855f7"
          strokeWidth="2"
          animate={{ stroke: ['#a855f7', '#22d3ee', '#a855f7'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x="300"
          y="96"
          textAnchor="middle"
          fill="#e2e8f0"
          fontSize="13"
          fontFamily="monospace"
          fontWeight="bold"
        >
          ENCODER
        </text>
        <text x="300" y="116" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
          NVENC · AV1
        </text>

        {/* Encoded stream leaving the encoder (purple) */}
        {OUTPUT_PACKETS.map((delay, i) => (
          <motion.circle
            key={`out-${i}`}
            cx="380"
            cy="100"
            r="5"
            fill="#a855f7"
            animate={{ cx: [380, 570], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay }}
          />
        ))}

        <text x="30" y="80" fill="#64748b" fontSize="10" fontFamily="monospace">
          RAW FRAMES
        </text>
        <text x="570" y="80" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
          ENCODED STREAM
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-xs text-slate-400">
        Frames are handed to the GPU’s dedicated encoder — your CPU stays free for the game.
      </p>
    </div>
  );
}
