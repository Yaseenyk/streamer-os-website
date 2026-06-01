// Square streamerOS node "S" mark (no wordmark), inlined as a component.
// IDs are suffixed `Mark` so they never collide with <Logo />'s defs when
// both render on the same page.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="streamerOS"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brandGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="glowMark" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#glowMark)">
        <path
          d="M 75 22 L 35 22 C 25 22, 20 27, 20 37 L 20 40 C 20 50, 25 55, 35 55 L 65 55 C 75 55, 80 60, 80 70 L 80 73 C 80 83, 75 88, 65 88 L 25 88"
          fill="none"
          stroke="url(#brandGradMark)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={75} cy={22} r={6} fill="#22d3ee" />
        <circle cx={25} cy={88} r={6} fill="#a855f7" />
      </g>
    </svg>
  );
}
