import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Minus, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'streamerOS vs Streamlabs — A Local-First Alternative',
  description:
    'Streamlabs needs an account and runs on the cloud. streamerOS runs entirely ' +
    'on your PC for $29 once. An honest comparison, including what you give up.',
  alternates: { canonical: `${SITE_URL}/vs/streamlabs` },
};

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Is streamerOS a replacement for Streamlabs Desktop?',
    a: 'Not exactly. Streamlabs Desktop is a broadcaster — it replaces OBS Studio. streamerOS does not: it sits alongside OBS and drives it over the local WebSocket connection. If you already stream with OBS and want automation, alerts logic and sponsor tooling without adding a cloud account, streamerOS replaces the cloud suite rather than the encoder.',
  },
  {
    q: 'Can I use streamerOS without giving up OBS Studio?',
    a: 'That is the intended setup. OBS keeps doing what it is good at — capture and encoding — and streamerOS watches your chat and telemetry and tells OBS when to switch. Nothing about your existing scene collection changes.',
  },
  {
    q: 'Does streamerOS need an account like Streamlabs does?',
    a: 'No. There is no account, no login and no backend. The licence key is validated once on first launch and never again, so the app keeps running whether or not our servers exist.',
  },
  {
    q: 'Is streamerOS cheaper than Streamlabs Ultra?',
    a: 'It is a different model rather than a cheaper tier. streamerOS is $29 paid once, with no renewal. A subscription costs less on day one and more every month after that, and it stops working when you stop paying. streamerOS does not.',
  },
  {
    q: 'What does Streamlabs do that streamerOS does not?',
    a: 'Quite a lot, and it is worth being clear about it. Streamlabs syncs your setup across machines, gives you a web and mobile dashboard, hosts your alerts and overlays, runs a merch and tipping stack, and carries platform integrations a local app cannot match. If you need any of those, a cloud suite is genuinely the right tool.',
  },
  {
    q: 'Will streamerOS use less CPU than Streamlabs?',
    a: 'streamerOS holds a 1.8% CPU footprint under a live 1080p60 game. It is a native Rust application rather than an Electron one, so it does not ship a browser engine with it. The comparison that matters on your machine is the one you run yourself — Task Manager during a live stream is the only benchmark worth trusting.',
  },
];

type Verdict = 'yes' | 'no' | 'partial';

interface Row {
  label: string;
  streameros: { verdict: Verdict; note: string };
  streamlabs: { verdict: Verdict; note: string };
}

// Every row is a structural fact about how each tool is built or sold, not a
// quality judgement — those are the only comparisons that stay true over time.
const ROWS: Row[] = [
  {
    label: 'Runs without an account',
    streameros: { verdict: 'yes', note: 'No login, no backend' },
    streamlabs: { verdict: 'no', note: 'Account required to sync' },
  },
  {
    label: 'What it costs',
    streameros: { verdict: 'yes', note: '$29 once' },
    streamlabs: { verdict: 'partial', note: 'Free tier; Ultra is a subscription' },
  },
  {
    label: 'Keeps working if you stop paying',
    streameros: { verdict: 'yes', note: 'The licence does not expire' },
    streamlabs: { verdict: 'partial', note: 'Drops to the free tier' },
  },
  {
    label: 'Chat and audio stay on your PC',
    streameros: { verdict: 'yes', note: 'Processed in memory, never uploaded' },
    streamlabs: { verdict: 'no', note: 'Cloud processing by design' },
  },
  {
    label: 'Automation keeps running offline',
    streameros: { verdict: 'yes', note: 'All logic is local' },
    streamlabs: { verdict: 'no', note: 'Server-side features stop' },
  },
  {
    label: 'Replaces OBS Studio',
    streameros: { verdict: 'no', note: 'Drives OBS over WebSocket v5' },
    streamlabs: { verdict: 'yes', note: 'It is a full OBS fork' },
  },
  {
    label: 'Syncs across machines',
    streameros: { verdict: 'no', note: 'One PC, your own backups' },
    streamlabs: { verdict: 'yes', note: 'Cloud sync is the point' },
  },
  {
    label: 'Web and mobile dashboard',
    streameros: { verdict: 'no', note: 'Nothing to log into' },
    streamlabs: { verdict: 'yes', note: 'Full remote control' },
  },
  {
    label: 'Reacts to chat on its own',
    streameros: { verdict: 'yes', note: 'Velocity and sentiment trigger scenes' },
    streamlabs: { verdict: 'partial', note: 'Alerts react; scene logic is manual' },
  },
  {
    label: 'Platform support',
    streameros: { verdict: 'partial', note: 'Windows 10/11 only' },
    streamlabs: { verdict: 'yes', note: 'Windows and macOS' },
  },
];

const VERDICT_ICON = {
  yes: <Check className="h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} aria-label="Yes" />,
  no: <X className="h-4 w-4 shrink-0 text-zinc-600" strokeWidth={2.5} aria-label="No" />,
  partial: <Minus className="h-4 w-4 shrink-0 text-amber-400/80" strokeWidth={2.5} aria-label="Partly" />,
};

function Cell({ verdict, note, accent }: { verdict: Verdict; note: string; accent?: boolean }) {
  return (
    <td
      className={`border-b border-white/5 px-4 py-3.5 align-top ${accent ? 'bg-cyan-400/[0.03]' : ''}`}
    >
      <div className="flex items-start gap-2.5">
        {VERDICT_ICON[verdict]}
        <span className={`text-sm ${accent ? 'text-zinc-200' : 'text-zinc-400'}`}>{note}</span>
      </div>
    </td>
  );
}

export default function VsStreamlabsPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'streamerOS vs Streamlabs', path: '/vs/streamlabs' }])} />

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
              streamerOS vs Streamlabs
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              One runs in the cloud and syncs everywhere. One runs on your PC and
              leaves nothing behind. They are not the same product, and the honest
              answer depends on which of those you actually want.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The short answer, up top — most people who search this have already
          decided what is bothering them and want confirming detail, not a build-up. */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The short answer</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-zinc-400">
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Pick Streamlabs</strong> if you want one
                app that does everything, synced across machines, controllable from your
                phone, with alerts and tipping hosted for you. That convenience is real
                and a local app cannot replicate it.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Pick streamerOS</strong> if you already
                stream on OBS and the thing bothering you is the account, the data leaving
                your machine, or the CPU cost of a browser-engine app running next to your
                game. It sits beside OBS, watches your chat, and switches your scenes
                without any of that.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Side by side.
            </h2>
            <p className="mt-3 max-w-xl text-zinc-400">
              Structural differences only — how each tool is built and sold. Both
              columns include what the tool is bad at.
            </p>
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
                      Streamlabs
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
                      <Cell verdict={row.streamlabs.verdict} note={row.streamlabs.note} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-xs text-zinc-500">
              streamerOS launches November 2026; rows describing it reflect v1.0 as
              built. Streamlabs rows describe its published product model and may
              change — check their site before deciding on price.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The offline test */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The one question that separates them
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="mt-6 border-l-2 border-cyan-400/60 pl-5 text-lg leading-relaxed text-zinc-200">
              If I unplug the internet mid-stream, does the automation keep working?
            </blockquote>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 leading-relaxed text-zinc-400">
              Local automation keeps switching scenes and reading chat velocity from
              data already on the machine. A cloud tool stops, because its logic lives
              on a server you cannot reach. That same test predicts latency: a cloud
              round trip for a scene switch is a visible delay at exactly the moment
              you wanted it to feel instant.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-sm text-zinc-500">
              Weighing the other local options too — Streamer.bot, Stream Deck, plain
              OBS scripting? That comparison is in{' '}
              <Link
                href="/blog/streamlabs-alternative-local-first"
                className="text-cyan-400 underline-offset-2 hover:underline"
              >
                the full local-first roundup
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* What you give up — stated before the CTA on purpose */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What you give up by going local
            </h2>
            <p className="mt-3 text-zinc-400">
              This is a real trade. If any of these matter to you, stay on the cloud
              suite — you will be happier there.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              {[
                'No sync across machines. Your config lives on one PC and the backups are yours.',
                'No web or mobile dashboard. You cannot check on your stream from your phone.',
                'Fewer integrations. Cloud platforms have partnerships and webhooks a local app cannot match.',
                'You are the sysadmin. Updates and configuration are on you.',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2.5} aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Try it against your own Task Manager.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Pre-register before the November launch and the trial runs three months
              instead of seven days — long enough to decide properly. Then $29 once.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <LaunchBadge />
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Claim 3 months free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
