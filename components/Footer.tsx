import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { BUILDER } from '@/config/engineering';
import { SignalLogo } from '@/components/SignalLogo';
import { FEATURE_COUNT } from '@/lib/features';

interface FooterLink {
  label: string;
  href: string;
}

// Layout: a brand block on the left (a third of the width) with the one call
// to action that matters before launch, and four link columns of six to
// eight items on the right. Legal lives in the bottom bar, so no column is a
// two-link stub and no column is twice the height of its neighbours.

// The headline features, plus a way to all of them. The full list lives in
// lib/features.ts; the footer carries the ones people search for by name.
const FEATURE_LINKS: FooterLink[] = [
  { label: 'Live Cockpit', href: '/features/live-cockpit' },
  { label: 'Auto-Hype Director', href: '/features/auto-hype' },
  { label: 'AI Sidekick', href: '/features/ai-sidekick' },
  { label: 'Clip Library', href: '/features/clip-library' },
  { label: 'Shorts Factory', href: '/features/shorts-factory' },
  { label: 'Aura Studio', href: '/features/aura-studio' },
  { label: 'Sponsor CRM', href: '/features/sponsor-crm' },
  { label: `All ${FEATURE_COUNT} features →`, href: '/features' },
];

const PRODUCT: FooterLink[] = [
  { label: 'Ultra-Light Performance', href: '/features/performance' },
  { label: 'Zero-Cloud Privacy', href: '/features/zero-cloud' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compare', href: '/vs' },
  { label: 'vs Streamlabs', href: '/vs/streamlabs' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Pre-Register', href: '/download' },
];

const FOR_YOU: FooterLink[] = [
  { label: 'Indian Streamers', href: '/for/indian-streamers' },
  { label: 'Low-End PCs', href: '/for/low-end-pc' },
  { label: 'Solo Streamers', href: '/for/solo-streamers' },
  { label: 'YouTube Live', href: '/for/youtube-live' },
  { label: 'VTubers', href: '/for/vtubers' },
  { label: 'Founding Streamers', href: '/streamers' },
];

const COMPANY: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Trust & Verification', href: '/trust' },
  { label: 'Playbook', href: '/playbook' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const LEGAL: FooterLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

// External brand links — kept as plain <a> (next/link is for internal routes).
// TODO: verify brand marks against each brand's official press kit.
const SOCIALS = [
  {
    label: 'X (Twitter)',
    href: siteConfig.twitterUrl,
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
  },
  {
    label: 'Discord',
    href: siteConfig.discordUrl,
    path: 'M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z',
  },
].filter((social) => social.href !== '');

const linkClass =
  'inline-block rounded text-[13.5px] leading-6 text-zinc-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500';

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">{title}</h3>
      <ul className="mt-4 space-y-1.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-zinc-950/0 to-black">
      {/* A hairline of brand colour along the top edge, the only decoration. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-4 lg:pr-10">
            <Link href="/" className="inline-flex items-center">
              <SignalLogo className="text-2xl" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
              The ultra-lightweight desktop cockpit for live streamers. Chat, OBS and your audience in one window, at 1.8% CPU, with nothing
              in the cloud.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Windows 10 &amp; 11 · Launch Feb 2027
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/download"
                className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Pre-register free
              </Link>
              <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Features" links={FEATURE_LINKS} />
            <FooterColumn title="Product" links={PRODUCT} />
            <FooterColumn title="For you" links={FOR_YOU} />
            <FooterColumn title="Company" links={COMPANY} />
          </div>
        </div>

        {/* Bottom bar: copyright, legal, socials */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 streamerOS. Built by{' '}
            <a
              href={BUILDER.url}
              className="rounded text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {BUILDER.name}
            </a>
            .
          </p>
          <div className="flex items-center gap-5">
            {LEGAL.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                {link.label}
              </Link>
            ))}
            {SOCIALS.length > 0 && <span aria-hidden className="h-4 w-px bg-white/10" />}
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-zinc-500 transition-colors hover:text-zinc-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
