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
    a: 'Yes. streamerOS is zero-cloud by architecture: there is no account and no backend. Your chat, audio and stream history are processed and stored on your own PC and never uploaded to us. The app only connects out for things you switch on — reading Twitch chat, your own YouTube channel stats if you add an API key, AI model downloads, Google Fonts in an overlay, a Discord webhook you set up, and opt-in update checks. The privacy policy lists every one.',
  },
  {
    q: 'Does it work with YouTube Live and Twitch?',
    a: 'Both. YouTube Live chat is read from the stream page open in your own browser, so there is no YouTube API key or Google sign-in to set up. Twitch chat is read through an anonymous, read-only connection. Very fast chats — 20 or more messages a second — can outrun the YouTube browser reader, so a few messages may be missed, though chat velocity and hype detection keep working.',
  },
  {
    q: 'Why is it Windows-only right now?',
    a: 'streamerOS is built on Windows-specific pieces: it reads YouTube chat through Windows UI Automation, detects your foreground game with Win32 APIs, keeps API keys in Windows Credential Manager and captures audio through the Windows audio stack. Porting those is real work, so macOS and Linux are out of scope for the v1.0 release.',
  },
  {
    q: 'What are the minimum system requirements?',
    a: 'Windows 10 or 11 (64-bit), with 16 GB of RAM and an 8-core CPU recommended, plus OBS Studio 28 or later. The local AI features — AI Sidekick, Sentiment Horizon and the Viral Engine — want an RTX 3060-class GPU and a free Ollama install; everything else runs without one.',
  },
  {
    q: 'What does streamerOS cost?',
    a: 'Free for 7 days with every feature and no card. After that a licence is $29 once — not a subscription, no account, verified offline on your PC. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days. If you do not buy, your own data stays readable and a free tier keeps working: the dashboard, Clip Library, Chat Archive, your last stream’s report and 10 AI chat messages a day.',
  },
  {
    q: 'Will it slow down my game?',
    a: 'No. streamerOS runs on a Rust core profiled against a live 1080p60 game, where it holds a 1.8% CPU footprint. It is built to yield spare cycles to your game — your frames stay with the game, not the tooling. Heavier jobs you start yourself, like encoding a Short, are meant for after the stream.',
  },
  {
    q: 'What exactly is the Auto-Hype Director?',
    a: 'It is a visual, node-based automation engine. You wire trigger nodes (chat velocity, Super Chats) through logic gates (AND / OR) into action nodes — switch an OBS scene, play a sound, change your overlay mood, mute an input, save a replay clip or post to Discord. When the live conditions you set are met, streamerOS fires the action.',
  },
  {
    q: 'Does the AI need the internet or a subscription?',
    a: 'No. The AI Sidekick, Sentiment Horizon and the Viral Engine run on Ollama on your own PC — no cloud model and no per-message cost. You download a model once; after that it works offline.',
  },
  {
    q: 'Does it understand Hinglish chat?',
    a: 'Yes. Sentiment Horizon’s local model is built to read Hinglish — Roman-script Hindi mixed with English — so “Bhai sahi hai” reads as positive and “Cringe yaar” as mildly negative. The AI Sidekick currently answers in English.',
  },
  {
    q: 'How does licensing work without an account?',
    a: 'When you buy, you send the Installation ID shown in the app, and your key is made for that PC. It is verified offline, so there is no activation server, no login and nothing to renew.',
  },
  {
    q: 'How do I get help or report a bug?',
    a: 'Reach out through the contact page and a human will answer. Bug reports are welcome — streamerOS runs entirely on your machine, so a description of what you were doing and your OBS version is usually enough to reproduce it.',
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
