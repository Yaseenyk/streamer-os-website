// Full streamerOS brand lockup (node "S" mark + wordmark), inlined so the
// wordmark renders in the site's Inter font (the <text> inherits the body
// font) instead of falling back to a generic sans-serif as it did via <img>.
// IDs are suffixed `Full` so they never collide with <LogoMark />'s defs when
// both render on the same page.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 100"
      className={className}
      role="img"
      aria-label="streamerOS"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brandGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="glowFull" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(10, 20)">
        <path
          d="M 45 10 L 20 10 C 14.477 10 10 14.477 10 20 L 10 25 C 10 30.523 14.477 35 20 35 L 35 35 C 40.523 35 45 39.477 45 45 L 45 50 C 45 55.523 40.523 60 35 60 L 10 60"
          fill="none"
          stroke="url(#brandGradFull)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFull)"
        />
        <circle cx={45} cy={10} r={5} fill="#22d3ee" />
        <circle cx={10} cy={60} r={5} fill="#a855f7" />
      </g>

      <text
        x={80}
        y={62}
        fontFamily="inherit"
        fontSize={44}
        fontWeight={800}
        fill="#F8FAFC"
        letterSpacing={-1.5}
      >
        streamer<tspan fill="url(#brandGradFull)">OS</tspan>
      </text>
    </svg>
  );
}
