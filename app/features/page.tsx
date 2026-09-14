import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Gauge, IndianRupee, MonitorPlay, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import JsonLd from '@/components/JsonLd';
import { ScreenshotStrip } from '@/components/ScreenshotStrip';
import { SHOTS } from '@/lib/shots';
import { breadcrumbJsonLd } from '@/lib/seo';
import { FEATURE_COUNT, featuresByCategory, type CatalogFeature } from '@/lib/features';

export const metadata: Metadata = {
  title: 'Features',
  description:
    `All ${FEATURE_COUNT} streamerOS features — live chat cockpit, Super Chat revenue, ` +
    'OBS automation, hype-ranked clips, Shorts, a local AI sidekick, overlays and ' +
    'sponsor tools. One Windows app, zero cloud.',
  alternates: { canonical: 'https://streamerosai.com/features' },
};

// The cards come from lib/features.ts — the same catalog the header menu and the
// footer read — so this page cannot drift from the navigation again.
const GROUPS = featuresByCategory();

function FeatureCard({ feature }: { feature: CatalogFeature }) {
  const { icon: Icon, name, tagline, pain, href } = feature;
  return (
    <Link href={href} className="block h-full">
      <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06]">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-zinc-100">
          {name}
          <ArrowRight
            className="h-4 w-4 text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{tagline}</p>
        <p className="mt-auto border-t border-white/5 pt-4 text-sm font-medium text-cyan-200/80 [margin-top:max(1rem,auto)]">
          {pain}
        </p>
      </article>
    </Link>
  );
}

// ---------------------------------------------------------------------------
export default function FeaturesPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Features', path: '/features' }])} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Features</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything in the cockpit.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              {FEATURE_COUNT} tools in one lightweight Windows app — a live chat
              cockpit, OBS automation, hype-ranked clips and Shorts, a local AI that
              acts for you, overlays and sponsor tooling. Every one of them runs on
              your PC, and every one ships in the November launch build.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <nav aria-label="Feature groups" className="mt-8 flex flex-wrap justify-center gap-2">
              {GROUPS.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {group.label} · {group.features.length}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <ScreenshotStrip
        heading="Not a mockup. This is the build."
        blurb="Every screen here is a capture of streamerOS running on Windows — the same cockpit that ships in November."
        shots={[
          SHOTS.dashboard,
          SHOTS.autoDirector,
          SHOTS.chatArchive,
          SHOTS.viralMoments,
          SHOTS.aura,
          SHOTS.obsBridge,
          SHOTS.sponsorCrm,
          SHOTS.clipLibrary,
        ]}
      />

      {/* Category sections */}
      <div className="mx-auto max-w-6xl space-y-24 px-6 py-24 sm:py-28">
        {GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                {group.label}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {group.title}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-400">{group.blurb}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.features.map((feature, i) => (
                <Reveal key={feature.href} delay={(i % 3) * 0.08}>
                  <FeatureCard feature={feature} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* India callout — the product's first market, stated where buyers compare. */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <Link
            href="/for/indian-streamers"
            className="group flex flex-col gap-4 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/[0.08] to-cyan-400/[0.05] p-7 transition-colors hover:border-purple-400/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-purple-300">
                <IndianRupee className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span>
                <span className="block text-lg font-semibold text-zinc-100">Streaming from India?</span>
                <span className="mt-1 block text-sm text-zinc-400">
                  Chat sentiment that reads Hinglish, Super Chats totalled in ₹, and
                  YouTube Live chat with no API key to set up.
                </span>
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-sm text-purple-300 transition-colors group-hover:text-purple-200">
              See what fits your stream
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Foundations strip — the cross-cutting promises */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built on three non-negotiables.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: 'Ultra-light',
                body: 'A Rust core profiled against a live 1080p60 game. It yields every spare cycle to your game and disappears.',
                href: '/features/performance',
              },
              {
                icon: ShieldCheck,
                title: 'Zero-cloud',
                body: 'No account, no backend. Your chat, audio and audience data are processed on your PC and never uploaded.',
                href: '/features/zero-cloud',
              },
              {
                icon: MonitorPlay,
                title: 'Native OBS',
                body: 'Talks to OBS over WebSocket v5 — real scene control with no brittle plugin chain to maintain.',
                href: '/features/obs-bridge',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                    {item.title}
                    <ArrowRight className="h-4 w-4 text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              See it run on your machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Free for 7 days with every feature, then $29 once. Pre-register for the
              launch and your trial runs three months instead.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <LaunchBadge />
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-Register for Launch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
