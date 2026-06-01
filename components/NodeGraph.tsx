// Inline SVG recreation of the Auto-Hype Director node graph (formerly
// /public/node-graph.svg). Inlined as a component so the illustration ships in
// the markup with zero external image requests, while staying shared between
// the home page and the features page.
export function NodeGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 450"
      fill="none"
      className={className}
      role="img"
      aria-label="streamerOS Auto-Hype Director node graph: two Twitch chat trigger nodes feeding a logic gate into an OBS scene-switch action node"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nodeGraphWire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* ambient glows */}
      <ellipse cx="150" cy="225" rx="180" ry="160" fill="#22D3EE" opacity="0.07" />
      <ellipse cx="668" cy="225" rx="160" ry="150" fill="#A855F7" opacity="0.07" />

      {/* connection wires */}
      <g stroke="url(#nodeGraphWire)" strokeWidth="2" opacity="0.75">
        <path d="M232 136 C 292 136 272 225 332 225" />
        <path d="M232 314 C 292 314 272 225 332 225" />
        <path d="M484 225 L 584 225" />
      </g>

      {/* connection nodes */}
      <circle cx="232" cy="136" r="4" fill="#22D3EE" />
      <circle cx="232" cy="314" r="4" fill="#22D3EE" />
      <circle cx="332" cy="225" r="4" fill="#A855F7" />
      <circle cx="484" cy="225" r="4" fill="#A855F7" />
      <circle cx="584" cy="225" r="4" fill="#22D3EE" />

      {/* Trigger 1 */}
      <rect x="64" y="96" width="168" height="80" rx="14" fill="#0A0E15" stroke="#22D3EE" strokeOpacity="0.5" />
      <circle cx="86" cy="120" r="5" fill="#22D3EE" />
      <text x="102" y="125" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.6" fill="#22D3EE">TRIGGER</text>
      <rect x="86" y="138" width="124" height="8" rx="4" fill="#ffffff" fillOpacity="0.08" />

      {/* Trigger 2 */}
      <rect x="64" y="274" width="168" height="80" rx="14" fill="#0A0E15" stroke="#22D3EE" strokeOpacity="0.5" />
      <circle cx="86" cy="298" r="5" fill="#22D3EE" />
      <text x="102" y="303" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.6" fill="#22D3EE">TRIGGER</text>
      <rect x="86" y="316" width="124" height="8" rx="4" fill="#ffffff" fillOpacity="0.08" />

      {/* Logic */}
      <rect x="332" y="185" width="152" height="80" rx="14" fill="#0A0E15" stroke="#A855F7" strokeOpacity="0.6" />
      <circle cx="354" cy="209" r="5" fill="#A855F7" />
      <text x="370" y="214" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.6" fill="#A855F7">LOGIC</text>
      <rect x="354" y="227" width="108" height="8" rx="4" fill="#ffffff" fillOpacity="0.08" />

      {/* Action */}
      <rect x="584" y="185" width="168" height="80" rx="14" fill="#0A0E15" stroke="#22D3EE" strokeOpacity="0.7" />
      <circle cx="606" cy="209" r="5" fill="#22D3EE" />
      <text x="622" y="214" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.6" fill="#22D3EE">ACTION</text>
      <rect x="606" y="227" width="124" height="8" rx="4" fill="#ffffff" fillOpacity="0.08" />
    </svg>
  );
}
