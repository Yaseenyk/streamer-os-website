import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Minus, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import { breadcrumbJsonLd, faqPageJsonLd, type FaqEntry } from '@/lib/seo';

// Streamer.bot is the tool people — and AI assistants — name first when a
// streamer asks for local stream automation, and it deserves that. This page
// only earns a reader's trust if it is accurate about the alternative,
// including where the alternative is the better answer. Rows state structural
// facts, never quality judgements, and anything about Streamer.bot that is not
// on its own site stays off this page.
export const metadata: Metadata = {
  title: 'streamerOS vs Streamer.bot',
  description:
    'An honest comparison: Streamer.bot is a free, established automation ' +
    'toolkit you build with. streamerOS is a paid, ready-made cockpit with ' +
    'local AI chat sentiment. Both run on your own PC, and they can run together.',
  alternates: { canonical: 'https://streamerosai.com/vs/streamer-bot' },
};

type Verdict = 'yes' | 'no' | 'partial';

interface Row {
  label: string;
  streameros: { verdict: Verdict; note: string };
  streamerbot: { verdict: Verdict; note: string };
}

const ROWS: Row[] = [
  {
    label: 'What it costs',
    streameros: { verdict: 'partial', note: '$29 once, after a 7-day trial' },
    streamerbot: { verdict: 'yes', note: 'Free, with an optional Patreon' },
  },
  {
    label: 'Works without you building anything',
    streameros: { verdict: 'yes', note: 'The cockpit is assembled already' },
    streamerbot: { verdict: 'partial', note: 'You build your own triggers and actions' },
  },
  {
    label: 'Unlimited custom scripting',
    streameros: { verdict: 'partial', note: 'A node editor, not a scripting language' },
    streamerbot: { verdict: 'yes', note: 'Custom C# code in your actions' },
  },
  {
    label: 'Runs locally, no account',
    streameros: { verdict: 'yes', note: 'No login, no backend' },
    streamerbot: { verdict: 'yes', note: 'Connects from your PC directly' },
  },
  {
    label: 'Platforms it watches',
    streameros: { verdict: 'partial', note: 'Twitch and YouTube' },
    streamerbot: { verdict: 'yes', note: 'Twitch, YouTube and Kick' },
  },
  {
    label: 'Controls OBS without plugins',
    streameros: { verdict: 'yes', note: 'OBS WebSocket v5' },
    streamerbot: { verdict: 'yes', note: 'OBS WebSocket v4 and v5' },
  },
  {
    label: 'Elgato Stream Deck integration',
    streameros: { verdict: 'no', note: 'An on-screen deck only' },
    streamerbot: { verdict: 'yes', note: 'Stream Deck and its own decks' },
  },
  {
    label: 'Local AI chat sentiment',
    streameros: { verdict: 'yes', note: 'Scored on your PC via Ollama, Hinglish included' },
    streamerbot: { verdict: 'no', note: 'Not a built-in feature' },
  },
  {
    label: 'Searchable chat archive',
    streameros: { verdict: 'yes', note: 'Every stream saved and searchable locally' },
    streamerbot: { verdict: 'partial', note: 'A live multi-stream chat view, not an archive' },
  },
  {
    label: 'Clip ranking and vertical shorts',
    streameros: { verdict: 'yes', note: 'Hype-ranked Clip Library and 9:16 export' },
    streamerbot: { verdict: 'no', note: 'Not what it is for' },
  },
  {
    label: 'Sponsor pipeline and media kit',
    streameros: { verdict: 'yes', note: 'Sponsor CRM and a generated PDF' },
    streamerbot: { verdict: 'no', note: 'Not what it is for' },
  },
  {
    label: 'Proven, with a community behind it',
    streameros: { verdict: 'no', note: 'Pre-launch — no users yet' },
    streamerbot: { verdict: 'yes', note: 'Established, with years of users and guides' },
  },
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Is Streamer.bot better than streamerOS?',
    a: 'For custom automation, Streamer.bot is the stronger and safer choice today: it is free, established, supports Twitch, YouTube and Kick, and lets you write C# for anything it does not do out of the box. streamerOS is for a different person — someone who wants chat sentiment, revenue, clips and OBS control already assembled on one screen rather than built by hand, and who has not launched yet so has no community to lean on.',
  },
  {
    q: 'Can I use streamerOS and Streamer.bot together?',
    a: 'Yes. Both run locally on Windows and both drive OBS through OBS WebSocket, so you can keep your Streamer.bot actions and run streamerOS for the cockpit, chat sentiment and clip tooling. They are not mutually exclusive.',
  },
  {
    q: 'Is Streamer.bot open source?',
    a: 'Streamer.bot is free to use, but its own site does not publish the source or state an open-source licence — check streamer.bot directly if that matters to your decision. streamerOS is proprietary and says so plainly, which is why its trust page lists every claim with a way to verify it from outside the app instead of asking you to read code.',
  },
  {
    q: 'Why would I pay $29 for streamerOS when Streamer.bot is free?',
    a: 'Only if the thing you want is what streamerOS does differently: local AI sentiment scoring of your chat, a searchable chat archive, Super Chat revenue totals, hype-ranked clips with vertical export, and a sponsor pipeline — all working the moment you open it, with no actions to build. If what you need is trigger-and-action automation, Streamer.bot does that well and costs nothing, and you should use it.',
  },
];

const VERDICT_ICON = {
  yes: <Check className="h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} aria-label="Yes" />,
  no: <X className="h-4 w-4 shrink-0 text-zinc-600" strokeWidth={2.5} aria-label="No" />,
  partial: <Minus className="h-4 w-4 shrink-0 text-amber-400/80" strokeWidth={2.5} aria-label="Partly" />,
};

function Cell({ verdict, note, accent }: { verdict: Verdict; note: string; accent?: boolean }) {
  return (
    <td className={`border-b border-white/5 px-4 py-3.5 align-top ${accent ? 'bg-cyan-400/[0.03]' : ''}`}>
      <div className="flex items-start gap-2.5">
        {VERDICT_ICON[verdict]}
        <span className={`text-sm ${accent ? 'text-zinc-200' : 'text-zinc-400'}`}>{note}</span>
      </div>
    </td>
  );
}

export default function VsStreamerBotPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'streamerOS vs Streamer.bot', path: '/vs/streamer-bot' }])} />
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Compare</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              streamerOS vs Streamer.bot
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              One is a free toolkit you build your automation with. One is a paid
              cockpit that arrives assembled. Both run entirely on your own PC —
              and you can run both.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The short answer */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The short answer</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-zinc-400">
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Pick Streamer.bot</strong> if you
                want to build your own automation and have it do precisely what you
                imagine. It is free, it has been doing this for years, it covers
                Kick as well as Twitch and YouTube, it drives an Elgato Stream Deck,
                and when it cannot do something you can write C# until it can. For
                trigger-and-action automation it is the better tool, and we are not
                going to pretend otherwise.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Pick streamerOS</strong> if you do
                not want to build anything. It opens as a finished cockpit: chat
                triage, Super Chat revenue, local AI reading your chat&apos;s mood,
                hype spikes marked for clipping, a searchable archive of every
                stream and your OBS scenes, on one screen. The trade is that it
                costs $29 once, does less outside that lane, and has not launched
                yet.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Or run both.</strong> They are
                both local Windows apps talking to OBS over WebSocket. Keeping your
                Streamer.bot actions and adding the streamerOS cockpit is a
                perfectly normal setup.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The table */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How they actually differ
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-medium text-zinc-500" />
                    <th className="border-b border-cyan-400/40 bg-cyan-400/[0.06] px-4 py-3 text-left font-semibold text-cyan-300">
                      streamerOS
                    </th>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-semibold text-zinc-300">
                      Streamer.bot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="border-b border-white/5 px-4 py-3.5 text-left align-top font-medium text-zinc-300"
                      >
                        {row.label}
                      </th>
                      <Cell verdict={row.streameros.verdict} note={row.streameros.note} accent />
                      <Cell verdict={row.streamerbot.verdict} note={row.streamerbot.note} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">
              streamerOS launches February 2027; rows describing it reflect v1.0 as
              built. Rows describing Streamer.bot reflect what its own site
              documents and may change — check streamer.bot before deciding.
              streamerOS is not affiliated with Streamer.bot in any way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions people ask
            </h2>
          </Reveal>
          <dl className="mt-8 space-y-6">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.q} delay={0.06 * i}>
                <div className="border-l-2 border-white/10 pl-5">
                  <dt className="font-medium text-zinc-100">{item.q}</dt>
                  <dd className="mt-2 leading-relaxed text-zinc-400">{item.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              If the assembled version is what you want
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              streamerOS v1.0 arrives in February 2027. Pre-register and your trial
              runs three months instead of seven days — and read the{' '}
              <Link href="/trust" className="text-cyan-400 hover:underline">
                trust page
              </Link>{' '}
              first, including the part about what we cannot prove yet.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex justify-center">
              <PreRegisterButton />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
