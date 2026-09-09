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
    name: 'Free Trial',
    price: '$0',
    cadence: '7 days, no card',
    tagline: 'The whole cockpit, unlocked, for a week. Nothing is held back.',
    features: [
      'Every v1.0 feature, no restrictions',
      'No credit card to start',
      'Runs entirely on your PC',
      'Pre-register now and get 3 months instead of 7 days',
    ],
    cta: 'Pre-Register for Launch',
    href: siteConfig.downloadUrl,
    featured: false,
    preRegister: true,
  },
  {
    name: 'Full Licence',
    price: '$29',
    cadence: 'one-time — not a subscription',
    tagline: 'Pay once, keep it. No renewal, no account, no cloud.',
    features: [
      'Every feature, unlocked permanently',
      'All v1.1 features included — Shorts, assistant memory, mic monitoring',
      'Works offline forever; the licence validates once',
      'No subscription, no seat count, no upsell',
    ],
    // Checkout does not open until launch, so this reserves the price instead
    // of sending people to a page that cannot sell them anything yet.
    cta: 'Lock in launch access',
    href: siteConfig.supporterCheckoutUrl,
    featured: true,
    preRegister: true,
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
          Pay once. Own it.
        </h2>
        <p className="mt-4 text-zinc-400">
          Try the whole cockpit free for 7 days, then $29 once — no subscription,
          no account, no cloud. Pre-register before launch and your trial is three
          months instead of seven days.
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
              <PreRegisterButton
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                  tier.featured
                    ? 'bg-purple-500 text-white hover:bg-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'border border-white/15 text-zinc-100 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {tier.featured && <Heart className="h-4 w-4" aria-hidden />}
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
