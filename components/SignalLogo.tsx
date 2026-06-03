// SignalLogo.tsx — streamerOS "Signal" logo, drop-in for the Next.js site.
// Exposes three pieces, all inheriting `currentColor`-free brand gradients with
// self-contained, collision-proof gradient/filter IDs:
//   • <SignalMark />          static logomark (favicon / square contexts)
//   • <SignalMarkAnimated />  the live-pulse mark (header / hero)
//   • <SignalLogo />          full horizontal lockup (mark + wordmark)
//
// Drop into components/ and import where you currently use <Logo /> / <LogoMark />.
import type { CSSProperties } from 'react';

const BARS = [
  { x: 14.25, y: 39, h: 22 },
  { x: 24.92, y: 30, h: 40 },
  { x: 35.58, y: 21, h: 58 },
  { x: 46.25, y: 13, h: 74 }, // static peak
  { x: 56.92, y: 21, h: 58 },
  { x: 67.58, y: 30, h: 40 },
  { x: 78.25, y: 39, h: 22 },
];
const W = 7.5;

// ---------------------------------------------------------------------------
// Static mark
// ---------------------------------------------------------------------------
export function SignalMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="streamerOS"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sigMarkG" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="sigMarkGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#sigMarkGlow)" fill="url(#sigMarkG)">
        {BARS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={W} height={b.h} rx={W / 2} />
        ))}
      </g>
      <circle cx={50} cy={13} r={7} fill="none" stroke="#22d3ee" strokeWidth={1.4} strokeOpacity={0.5} />
      <circle cx={50} cy={13} r={3.4} fill="#67e8f9" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Animated mark — side bars breathe, peak holds, pulse ring pings.
// Pure CSS; honours prefers-reduced-motion via the media query below.
// ---------------------------------------------------------------------------
const ANIM_CSS = `
@keyframes sigEq { 0%,100% { transform: scaleY(.55); } 50% { transform: scaleY(1); } }
@keyframes sigPing { 0% { transform: scale(1); opacity:.55; } 70% { opacity:0; } 100% { transform: scale(2.3); opacity:0; } }
.sigBar { transform-box: fill-box; transform-origin: center; }
.sigA .b0,.sigA .b6 { animation: sigEq 1.25s ease-in-out infinite; }
.sigA .b1,.sigA .b5 { animation: sigEq 1.25s ease-in-out infinite .14s; }
.sigA .b2,.sigA .b4 { animation: sigEq 1.25s ease-in-out infinite .28s; }
.sigA .ping { transform-box: fill-box; transform-origin: center; animation: sigPing 1.8s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .sigA .b0,.sigA .b1,.sigA .b2,.sigA .b4,.sigA .b5,.sigA .b6,.sigA .ping { animation: none; }
}`;

export function SignalMarkAnimated({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`sigA ${className ?? ''}`} role="img" aria-label="streamerOS"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sigAniG" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="sigAniGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <style>{ANIM_CSS}</style>
      <g filter="url(#sigAniGlow)" fill="url(#sigAniG)">
        {BARS.map((b, i) => (
          <rect key={i} className={`sigBar b${i}`} x={b.x} y={b.y} width={W} height={b.h} rx={W / 2} />
        ))}
      </g>
      <circle className="ping" cx={50} cy={13} r={7} fill="none" stroke="#22d3ee" strokeWidth={1.4} />
      <circle cx={50} cy={13} r={3.4} fill="#67e8f9" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Full lockup — mark + inline wordmark (inherits the page's Inter font).
// ---------------------------------------------------------------------------
export function SignalLogo({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const markStyle: CSSProperties = { width: '1.55em', height: '1.55em', flex: '0 0 auto' };
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.42em', lineHeight: 1 }}
    >
      <span style={markStyle}>
        {animated ? <SignalMarkAnimated /> : <SignalMark />}
      </span>
      <span style={{ fontWeight: 800, letterSpacing: '-0.045em', color: '#F8FAFC' }}>
        streamer
        <span style={{
          background: 'linear-gradient(135deg,#22d3ee,#a855f7)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}>OS</span>
      </span>
    </span>
  );
}
