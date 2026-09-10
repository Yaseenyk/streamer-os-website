import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import Pricing from '@/components/Pricing';
import { Reveal } from '@/components/Reveal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Pricing — $29 Once, Not a Subscription',
  description:
    'streamerOS costs $29 one time. Free unrestricted trial first — 7 days, ' +
    'or 3 months if you pre-register before the November 2026 launch.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Is streamerOS a subscription?',
    a: 'No. A licence is $29, paid once, and it does not renew. There is no monthly plan, no annual plan and no seat count — the pricing page you are reading is the whole pricing model.',
  },
  {
    q: 'What do I get in the free trial?',
    a: 'Everything. The trial is the full v1.0 cockpit with nothing held back and no card required — Auto-Hype Director, OBS scene control, chat velocity and sentiment, the clip library and the sponsor media kit. It runs 7 days as standard, or 3 months if you pre-register before launch.',
  },
  {
    q: 'What happens when the trial ends?',
    a: 'streamerOS locks until you enter a licence key. Nothing is deleted and nothing is charged automatically — there is no card on file to charge. Your workspace folder, your automation rules and your clip markers stay on your disk exactly as you left them.',
  },
  {
    q: 'Do I need an account to buy or run it?',
    a: 'No. The licence key is validated once, on first launch, and after that streamerOS never needs the network to keep running. There is no account portal, no login and no dashboard — which is the same reason it keeps working with your machine offline.',
  },
  {
    q: 'Does the $29 licence cover future versions?',
    a: 'It covers v1.0 and the v1.1 feature set — Shorts export, assistant memory and mic monitoring — at no extra cost. A future major version may be a separate purchase; it will never become a subscription.',
  },
  {
    q: 'Can I use one licence on more than one PC?',
    a: 'Yes, on machines you own or control — a gaming PC and a dedicated streaming PC is the normal case. It is a personal licence, so it is not for sharing across a team or reselling.',
  },
];

// Framed around the business model rather than feature checklists: the question
// a $29 one-time purchase has to answer is "versus renting it" and "versus free".
const MODEL_ROWS = [
  { label: 'What you pay', streameros: '$29 once', subscription: 'Every month, forever', free: 'Nothing' },
  { label: 'Stops working if you stop paying', streameros: 'No', subscription: 'Yes', free: 'No' },
  { label: 'Needs an account', streameros: 'No', subscription: 'Yes', free: 'Usually' },
  { label: 'Runs with the network unplugged', streameros: 'Yes', subscription: 'No', free: 'Rarely' },
  { label: 'Your chat and audio leave your PC', streameros: 'Never', subscription: 'Yes', free: 'Often' },
];

const CAVEATS = [
  { ok: false, text: 'Windows 10 and 11 only. macOS and Linux are not supported and are not close.' },
  { ok: false, text: 'The local AI features want an RTX 3060-class GPU. Everything else runs on far less.' },
  { ok: false, text: 'It is a companion to OBS Studio, not a replacement for it. You still need OBS.' },
  { ok: true, text: 'The trial is the real product, not a demo — decide with it before you pay anything.' },
  { ok: true, text: 'No card is taken to start, so nothing can auto-charge you when the trial ends.' },
];

export default function PricingPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Pricing', path: '/pricing' }])} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Pricing</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              $29 once. Then it&rsquo;s yours.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Try the whole cockpit free first — every feature, no card. Pre-register
              before the November launch and that trial runs three months instead of
              seven days.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The tiers themselves — the same component the homepage renders, so the
          price can never drift between the two places people look for it. */}
      <Pricing />

      {/* Business-model comparison */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What you are actually buying.
            </h2>
            <p className="mt-3 max-w-xl text-zinc-400">
              Most streaming tools are either a monthly bill or free because you are
              the product. streamerOS is neither.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-medium text-zinc-500" />
                    <th className="border-b border-cyan-400/40 bg-cyan-400/[0.06] px-4 py-3 text-left font-semibold text-cyan-300">
                      streamerOS
                    </th>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-semibold text-zinc-300">
                      Subscription tools
                    </th>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-semibold text-zinc-300">
                      Free cloud tools
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_ROWS.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="border-b border-white/5 px-4 py-3.5 text-left font-medium text-zinc-300"
                      >
                        {row.label}
                      </th>
                      <td className="border-b border-white/5 bg-cyan-400/[0.03] px-4 py-3.5 text-zinc-100">
                        {row.streameros}
                      </td>
                      <td className="border-b border-white/5 px-4 py-3.5 text-zinc-400">
                        {row.subscription}
                      </td>
                      <td className="border-b border-white/5 px-4 py-3.5 text-zinc-400">{row.free}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stated plainly, because finding this out after paying is what turns a
          $29 purchase into a refund request and a bad review. */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Before you buy, know this.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              {CAVEATS.map((row) => (
                <li key={row.text} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                  {row.ok ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} aria-hidden />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2.5} aria-hidden />
                  )}
                  {row.text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-zinc-500">
              Full details in the{' '}
              <Link href="/download" className="text-cyan-400 underline-offset-2 hover:underline">
                system requirements
              </Link>{' '}
              and the{' '}
              <Link href="/terms" className="text-cyan-400 underline-offset-2 hover:underline">
                licence terms
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Three months, not seven days.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Pre-registering before launch is the only way to get the longer trial.
              One email, no card.
            </p>
            <div className="mt-8">
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300"
              >
                Claim 3 months free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
