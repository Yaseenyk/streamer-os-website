'use client';

import { motion } from 'framer-motion';

export default function LocalVsCloudDiagram() {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {/* Local engine — a fast closed loop that never leaves the device */}
      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-md">
        <h3 className="mb-3 font-mono text-sm text-emerald-400">LOCAL ENGINE</h3>
        <svg viewBox="0 0 240 160" className="h-auto w-full">
          <rect
            x="24"
            y="24"
            width="192"
            height="112"
            rx="16"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          <rect x="60" y="52" width="120" height="56" rx="12" fill="none" stroke="#1e293b" strokeWidth="3" />
          <motion.circle
            r="5"
            fill="#34d399"
            animate={{ cx: [60, 180, 180, 60, 60], cy: [52, 52, 108, 108, 52] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <text x="120" y="84" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">
            on-device
          </text>
        </svg>
        <p className="mt-3 font-mono text-xs leading-relaxed text-emerald-300/80">
          Closed loop · instant · never leaves your machine
        </p>
      </div>

      {/* Cloud engine — a slow round-trip to a remote server */}
      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-md">
        <h3 className="mb-3 font-mono text-sm text-amber-400">CLOUD ENGINE</h3>
        <svg viewBox="0 0 240 160" className="h-auto w-full">
          {/* Cloud silhouette (soft amber blobs) */}
          <g fill="#f59e0b" fillOpacity="0.15">
            <circle cx="104" cy="42" r="16" />
            <circle cx="136" cy="42" r="16" />
            <circle cx="120" cy="32" r="18" />
            <rect x="100" y="36" width="40" height="18" rx="9" />
          </g>
          <text x="120" y="46" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">
            CLOUD
          </text>

          {/* Your machine */}
          <rect x="92" y="116" width="56" height="28" rx="6" fill="#05070a" stroke="#475569" strokeWidth="1.5" />
          <text x="120" y="134" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            YOU
          </text>

          {/* Jagged round-trip route */}
          <path
            d="M120 116 L104 92 L136 76 L120 58"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Delayed packet travelling up to the cloud and back */}
          <motion.circle
            r="5"
            fill="#f59e0b"
            animate={{
              cx: [120, 104, 136, 120, 136, 104, 120],
              cy: [116, 92, 76, 58, 76, 92, 116],
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <p className="mt-3 font-mono text-xs leading-relaxed text-amber-300/80">
          Round-trip to a remote server · adds latency · fails if it does
        </p>
      </div>
    </div>
  );
}
