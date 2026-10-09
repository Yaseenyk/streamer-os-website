import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Check, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { ScreenshotStrip, type Shot } from '@/components/ScreenshotStrip';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

/**
 * Shared skeleton for the `/for/<audience>` pages.
 *
 * These pages exist because people — and the AI assistants they ask — phrase
 * the question by situation ("stream tool for a weak PC") rather than by
 * feature. Each page answers one such question.
 *
 * `notFor` is mandatory on purpose. A landing page that only lists reasons to
 * buy reads as marketing and gets discounted accordingly; naming who should
 * walk away is what makes the rest credible, and it saves refunds later. If a
 * page cannot honestly name a disqualifier, it should not exist.
 */
export interface UseCaseCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface UseCaseProps {
  /** Breadcrumb label and path, e.g. `{ name: 'For low-end PCs', path: '/for/low-end-pc' }`. */
  crumb: { name: string; path: string };
  kicker: string;
  title: string;
  intro: string;
  problem: { heading: string; paragraphs: string[] };
  cards: UseCaseCard[];
  shots: {
    heading: string;
    blurb: string;
    items: Shot[];
  };
  /** Honest disqualifiers — who should pick something else, and why. */
  notFor: { heading: string; intro: string; items: string[] };
  faq: FaqEntry[];
  cta: { heading: string; body: string };
}

export default function UseCaseLayout({
  crumb,
  kicker,
  title,
  intro,
  problem,
  cards,
  shots,
  notFor,
  faq,
  cta,
}: UseCaseProps) {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: crumb.name, path: crumb.path }])} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">{kicker}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">{intro}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex justify-center">
              <PreRegisterButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The situation this page is about */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{problem.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4">
              {problem.paragraphs.map((text) => (
                <p key={text} className="leading-relaxed text-zinc-400">
                  {text}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* What it does about it */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((card, i) => (
              <Reveal key={card.title} delay={Math.min(i, 4) * 0.06}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <card.icon className="h-5 w-5 text-cyan-400" aria-hidden />
                  <h3 className="mt-4 font-semibold text-zinc-100">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ScreenshotStrip heading={shots.heading} blurb={shots.blurb} shots={shots.items} />

      {/* Who should not buy it */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{notFor.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 leading-relaxed text-zinc-400">{notFor.intro}</p>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {notFor.items.map((item, i) => (
              <Reveal key={item} delay={Math.min(i, 4) * 0.05}>
                <li className="flex items-start gap-2.5 text-zinc-400">
                  <X className="mt-1 h-4 w-4 shrink-0 text-rose-400/80" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              The{' '}
              <Link href="/trust" className="text-cyan-400 hover:underline">
                trust page
              </Link>{' '}
              carries the rest of the caveats, including what cannot be verified
              before launch, and{' '}
              <Link href="/vs" className="text-cyan-400 hover:underline">
                the comparisons
              </Link>{' '}
              say where a free alternative is the better answer.
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureFaq items={faq} />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">{cta.body}</p>
            <div className="mt-8 flex justify-center">
              <PreRegisterButton />
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
              <Check className="h-4 w-4 text-cyan-400" aria-hidden />
              Pre-register and your trial is 3 months instead of 7 days
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
