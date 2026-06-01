'use client';

import { motion, type Variants } from 'framer-motion';
import { Check, Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

interface Tier {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  featured: boolean;
  /** Free Core opens the pre-registration modal instead of linking to a binary. */
  preRegister?: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Free Core',
    price: '$0',
    cadence: 'free forever',
    tagline: 'The full streamerOS cockpit. Open source, no strings.',
    features: [
      'Local telemetry & chat monitoring',
      'Auto-Hype Director scene automation',
      '1.8% CPU footprint',
      'Zero-cloud privacy',
    ],
    cta: 'Pre-Register for Launch',
    href: siteConfig.downloadUrl,
    featured: false,
    preRegister: true,
  },
  {
    name: 'Supporter Edition',
    price: '$29',
    cadence: 'one-time purchase',
    tagline: 'Everything in Free Core — plus a way to fuel the project.',
    features: [
      'Everything in Free Core',
      'Supporter badge in the app',
      'Early access to new AI models',
      'A warm feeling of supporting indie open-source development',
    ],
    cta: 'Become a Supporter',
    href: siteConfig.supporterCheckoutUrl,
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Free and open source. Forever.
        </h2>
        <p className="mt-4 text-zinc-400">
          streamerOS costs nothing and always will. The Supporter Edition is a
          one-time thank-you that keeps indie development alive.
        </p>
        <LaunchBadge className="mt-6" />
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl border bg-white/[0.03] p-8 ${
              tier.featured
                ? 'border-purple-500/40 shadow-[0_0_60px_-15px_rgba(168,85,247,0.45)] ring-2 ring-purple-500'
                : 'border-white/10'
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3 w-3" aria-hidden />
                Most loved
              </span>
            )}

            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{tier.tagline}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
              <span className="text-sm text-zinc-500">{tier.cadence}</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? 'text-purple-400' : 'text-cyan-400'}`}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {tier.preRegister ? (
              <PreRegisterButton className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/5">
                {tier.cta}
              </PreRegisterButton>
            ) : (
              <a
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  tier.featured
                    ? 'bg-purple-500 text-white hover:bg-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'border border-white/15 text-zinc-100 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {tier.featured && <Heart className="h-4 w-4" aria-hidden />}
                {tier.cta}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
