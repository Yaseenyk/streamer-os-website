import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Minus, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import { breadcrumbJsonLd, faqPageJsonLd, type FaqEntry } from '@/lib/seo';

// Facts about SAMMI here come from sammi.solutions itself. Its licensing is not
// stated on its own site, so this page does not characterise it — an invented
// licence claim about someone else's project is exactly the kind of error that
// costs a reader's trust in everything else on the page.
export const metadata: Metadata = {
  title: 'streamerOS vs SAMMI',
  description:
    'SAMMI is a free, no-code stream automation toolkit you build decks and ' +
    'buttons with. streamerOS is a paid, ready-made cockpit with local AI chat ' +
    'sentiment. Both run on your own PC on Windows, and they can run together.',
  alternates: { canonical: 'https://streamerosai.com/vs/sammi' },
};

type Verdict = 'yes' | 'no' | 'partial';

interface Row {
  label: string;
  streameros: { verdict: Verdict; note: string };
  sammi: { verdict: Verdict; note: string };
}

const ROWS: Row[] = [
  {
    label: 'What it costs',
    streameros: { verdict: 'partial', note: '$29 once, after a 7-day trial' },
    sammi: { verdict: 'yes', note: 'Free; some community extensions are paid' },
  },
  {
    label: 'Works without you building anything',
    streameros: { verdict: 'yes', note: 'The cockpit is assembled already' },
    sammi: { verdict: 'partial', note: 'You build your own buttons and decks' },
  },
  {
    label: 'Visual automation builder',
    streameros: { verdict: 'yes', note: 'Auto-Hype Director node canvas' },
    sammi: { verdict: 'yes', note: 'Visual programming, no code required' },
  },
  {
    label: 'Runs locally, no account',
    streameros: { verdict: 'yes', note: 'No login, no backend' },
    sammi: { verdict: 'yes', note: 'Runs on your own machine' },
  },
  {
    label: 'Platforms it watches',
    streameros: { verdict: 'partial', note: 'Twitch and YouTube' },
    sammi: { verdict: 'partial', note: 'Twitch and YouTube Live' },
  },
  {
    label: 'Controls OBS without plugins',
    streameros: { verdict: 'yes', note: 'OBS WebSocket v5' },
    sammi: { verdict: 'yes', note: 'OBS WebSocket' },
  },
  {
    label: 'Elgato Stream Deck integration',
    streameros: { verdict: 'no', note: 'An on-screen deck only' },
    sammi: { verdict: 'yes', note: 'SAMMI Panel plus Elgato Stream Deck' },
  },
  {
    label: 'Local AI chat sentiment',
    streameros: { verdict: 'yes', note: 'Scored on your PC via Ollama, Hinglish included' },
    sammi: { verdict: 'no', note: 'Not a documented feature' },
  },
  {
    label: 'Searchable chat archive',
    streameros: { verdict: 'yes', note: 'Every stream saved and searchable locally' },
    sammi: { verdict: 'no', note: 'Not what it is for' },
  },
  {
    label: 'Clip ranking and vertical shorts',
    streameros: { verdict: 'yes', note: 'Hype-ranked Clip Library and 9:16 export' },
    sammi: { verdict: 'no', note: 'Not what it is for' },
  },
  {
    label: 'Sponsor pipeline and media kit',
    streameros: { verdict: 'yes', note: 'Sponsor CRM and a generated PDF' },
    sammi: { verdict: 'no', note: 'Not what it is for' },
  },
  {
    label: 'Proven, with a community behind it',
    streameros: { verdict: 'no', note: 'Pre-launch — no users yet' },
    sammi: { verdict: 'yes', note: 'Established, with extensions and guides' },
  },
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Should I use SAMMI instead of streamerOS?',
    a: 'If what you want is to build your own buttons, decks and automations, yes — SAMMI is free, established, works without code and drives an Elgato Stream Deck. streamerOS is for the streamer who does not want to build anything and wants chat sentiment, revenue, clips and OBS control already on one screen.',
  },
  {
    q: 'Can SAMMI and streamerOS run at the same time?',
    a: 'Yes. Both are local Windows apps that control OBS over OBS WebSocket, so you can keep your SAMMI decks and run the streamerOS cockpit alongside them.',
  },
  {
    q: 'Does SAMMI do AI chat sentiment analysis?',
    a: 'Not as a documented feature. SAMMI reacts to stream events — follows, channel points, chat commands — rather than scoring the mood of your chat. streamerOS runs a local AI model through Ollama to score chat sentiment continuously, including Hinglish, without sending anything off your PC.',
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

export default function VsSammiPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'streamerOS vs SAMMI', path: '/vs/sammi' }])} />
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />

      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Compare</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              streamerOS vs SAMMI
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              SAMMI hands you a free canvas and lets you build the automation you
              want. streamerOS hands you a finished cockpit. Both are local
              Windows apps that drive OBS.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The short answer</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-zinc-400">
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Pick SAMMI</strong> if you want
                to design your own decks and automations without writing code, for
                free, with an Elgato Stream Deck on your desk and a community of
                extensions to pull from. It is a mature tool and it costs nothing
                to find out whether it fits.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Pick streamerOS</strong> if
                building is the part you do not want. It opens as a cockpit: chat
                triage, Super Chat revenue, local AI reading the mood of your chat,
                hype spikes marked for clipping, a searchable archive of every
                stream, and your OBS scenes — on one screen, on your own PC. It is
                $29 once, and it has not launched yet.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Or run both.</strong> SAMMI for
                the buttons you have already built, streamerOS for what is
                happening in chat while you use them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

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
                      SAMMI
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
                      <Cell verdict={row.sammi.verdict} note={row.sammi.note} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">
              streamerOS launches February 2027; rows describing it reflect v1.0 as
              built. Rows describing SAMMI reflect what its own site documents and
              may change — check sammi.solutions before deciding. streamerOS is not
              affiliated with SAMMI in any way.
            </p>
          </Reveal>
        </div>
      </section>

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

      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              If you would rather it came assembled
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              streamerOS v1.0 arrives in February 2027. Pre-register and your trial
              runs three months instead of seven days — and read the{' '}
              <Link href="/trust" className="text-cyan-400 hover:underline">
                trust page
              </Link>{' '}
              first, including what we cannot prove yet.
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
