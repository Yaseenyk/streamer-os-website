import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about streamerOS — OBS integration, privacy, ' +
    'platform support, system requirements, pricing, and performance.',
  alternates: { canonical: 'https://streamerosai.com/faq' },
};

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How does streamerOS connect to OBS?',
    a: 'It talks to OBS over OBS WebSocket v5 — the same official interface OBS exposes for external control. The connection runs entirely on your local machine (localhost), so there are no plugins to install and nothing routes through a server. The Auto-Hype Director uses that same local link to switch your scenes automatically when the stream peaks.',
  },
  {
    q: 'Is my data actually private?',
    a: 'Yes. streamerOS is zero-cloud by architecture: there is no account and no backend. Your chat logs, audio feeds, and API keys are processed in memory and written only to your own disk — they never leave the machine. The only network traffic is a small, fixed set of opt-in connections (an update check and reading the public chat of a channel you choose), none of which carry personal data.',
  },
  {
    q: 'Why is it Windows-only right now?',
    a: 'streamerOS integrates deeply with the Windows audio subsystem and DirectX to keep its footprint tiny and its telemetry accurate under a live game — that level of integration is platform-specific. macOS and Linux are on the roadmap, but they are out of scope for the v1.0 release rather than an afterthought.',
  },
  {
    q: 'What are the minimum system requirements?',
    a: 'Windows 10 or 11, 16 GB of RAM, and an 8-core CPU. The core monitoring and automation are featherweight; that headroom mainly gives the optional on-device AI features room to run comfortably alongside your game and OBS.',
  },
  {
    q: 'Is streamerOS really free?',
    a: 'Yes — streamerOS is free and open source, and the free build is fully functional. The optional $29 Supporter Edition is a one-time purchase that adds cosmetic perks and early access to new AI models; it helps fund development but changes nothing about what the free version can do.',
  },
  {
    q: 'Will it slow down my game?',
    a: 'No. streamerOS runs on a Rust core profiled against a live 1080p60 game, where it holds a 1.8% CPU footprint. It is built to yield spare cycles to your game — your frames stay with the game, not the tooling.',
  },
  {
    q: 'What exactly is the Auto-Hype Director?',
    a: 'It is a visual, node-based automation engine. You wire trigger nodes (chat velocity, sentiment, game state) through logic gates (AND / OR) into action nodes (switch OBS scene). When the live conditions you defined are met, streamerOS fires the action — switching scenes the instant the room peaks.',
  },
  {
    q: 'How do I get help or report a bug?',
    a: 'Reach out through the contact page. streamerOS is open source, so issues and contributions are welcome on the public repository too.',
  },
];

// FAQPage structured data — built from the same FAQ_ITEMS rendered below so the
// markup always matches the visible content (a Google rich-results requirement).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">FAQ</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Frequently Asked Questions.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The things streamers ask us most — setup, privacy, platforms, and performance.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        {/* Native <details> accordion — fully static, no client JS. */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 0.05}>
              <details
                open={i === 0}
                className="group rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors hover:border-white/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-medium text-zinc-100 sm:text-base">{item.q}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-zinc-100">Still have a question?</h2>
            <p className="mt-2 text-sm text-zinc-400">
              We read everything. Send it over and we&apos;ll get back to you.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/5"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
