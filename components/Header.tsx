'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Workflow, Gauge, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface FeatureLink {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

const FEATURE_LINKS: FeatureLink[] = [
  {
    label: 'Auto-Hype Director',
    href: '/features/auto-hype',
    description: 'Visual automation engine.',
    icon: Workflow,
  },
  {
    label: 'Ultra-Light Performance',
    href: '/features/performance',
    description: '1.8% CPU footprint.',
    icon: Gauge,
  },
  {
    label: 'Zero-Cloud Privacy',
    href: '/features/zero-cloud',
    description: 'Local-first architecture.',
    icon: ShieldCheck,
  },
];

const NAV_LINKS = [
  { label: 'Playbook', href: '/playbook' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Changelog', href: '/changelog' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  };

  // Toggle the drawer, always resetting the Features accordion so it opens in
  // its default (collapsed) state.
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
    setIsMobileFeaturesOpen(false);
  };

  // Lock body scroll while the full-screen drawer is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close the drawer if the viewport grows past the `sm` breakpoint while
  // it's open (the toggle is `sm:hidden`, so it would otherwise be stuck).
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const mq = window.matchMedia('(min-width: 640px)');
    const handleChange = () => {
      if (mq.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070A]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 sm:flex">
            {/* Features dropdown — hover-revealed glass panel. The `pt-3` wrapper
                keeps the hover area continuous between trigger and panel. */}
            <div
              className="relative"
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsFeaturesOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isFeaturesOpen}
                className="flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Features
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-72 rounded-xl border border-white/10 bg-[#05070A]/95 p-2 shadow-xl backdrop-blur-xl">
                      {FEATURE_LINKS.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <Link
                            key={feature.href}
                            href={feature.href}
                            className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-zinc-100">
                                {feature.label}
                              </span>
                              <span className="block text-xs text-zinc-500">
                                {feature.description}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <Link
              href="/download"
              className="hidden items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300 sm:inline-flex"
            >
              Download
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-white/5 hover:text-zinc-100 sm:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — sibling of <header> (the header's backdrop-filter
          would otherwise clamp this `fixed` element). */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-[#05070A] sm:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-8">
              {/* Features accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileFeaturesOpen((open) => !open)}
                  aria-expanded={isMobileFeaturesOpen}
                  aria-controls="mobile-features"
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Features
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isMobileFeaturesOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isMobileFeaturesOpen && (
                    <motion.div
                      id="mobile-features"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 py-1 pl-3">
                        {FEATURE_LINKS.map((feature) => {
                          const Icon = feature.icon;
                          return (
                            <Link
                              key={feature.href}
                              href={feature.href}
                              onClick={closeMenu}
                              className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              <Icon
                                className="h-5 w-5 shrink-0 text-cyan-400"
                                strokeWidth={1.75}
                                aria-hidden
                              />
                              <span>
                                <span className="block text-base font-medium">{feature.label}</span>
                                <span className="block text-xs text-zinc-500">
                                  {feature.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-lg font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/download"
                onClick={closeMenu}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300"
              >
                Download
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
