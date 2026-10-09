'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, IndianRupee, Menu, Play, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SignalLogo } from '@/components/SignalLogo';
import { usePreRegister } from '@/components/PreRegisterModal';
import { FEATURE_COUNT, FOUNDATIONS, featuresByCategory } from '@/lib/features';

// The menu lists every feature, grouped. It used to carry four links — one of
// them a real feature — for an app with seventeen, so a visitor scanning the
// nav concluded the product was an OBS scene switcher and nothing else.
const GROUPS = featuresByCategory();

const NAV_LINKS = [
  { label: 'Playbook', href: '/playbook' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Changelog', href: '/changelog' },
];

const INDIA_LINK = { label: 'For Indian streamers', href: '/for/indian-streamers' };

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const { open: openPreRegister } = usePreRegister();

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

  // Close the drawer if the viewport grows past the `lg` breakpoint while
  // it's open (the toggle is `lg:hidden`, so it would otherwise be stuck).
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const mq = window.matchMedia('(min-width: 1024px)');
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
            <SignalLogo animated className="text-2xl" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Features menu — hover-revealed glass panel. The `pt-3` wrapper
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
                className="flex cursor-pointer items-center gap-1 rounded text-sm text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
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
                    <div className="w-[46rem] rounded-xl border border-white/10 bg-[#05070A]/95 p-5 shadow-xl backdrop-blur-xl">
                      <div className="columns-3 gap-6">
                        {GROUPS.map((group) => (
                          <div key={group.id} className="mb-5 break-inside-avoid">
                            <p className="px-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
                              {group.label}
                            </p>
                            <ul className="mt-2 space-y-0.5">
                              {group.features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                  <li key={feature.href}>
                                    <Link
                                      href={feature.href}
                                      onClick={() => setIsFeaturesOpen(false)}
                                      className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                    >
                                      <Icon
                                        className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                                        strokeWidth={1.75}
                                        aria-hidden
                                      />
                                      <span className="min-w-0">
                                        <span className="block text-sm font-medium text-zinc-100">
                                          {feature.name}
                                        </span>
                                        <span className="block text-xs leading-snug text-zinc-500">
                                          {feature.menu}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-2 pt-4">
                        <Link
                          href="/features"
                          onClick={() => setIsFeaturesOpen(false)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                        >
                          All {FEATURE_COUNT} features
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        {FOUNDATIONS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsFeaturesOpen(false)}
                            className="text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                          >
                            {item.name}
                          </Link>
                        ))}
                        <Link
                          href={INDIA_LINK.href}
                          onClick={() => setIsFeaturesOpen(false)}
                          className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                        >
                          <IndianRupee className="h-3.5 w-3.5" aria-hidden />
                          {INDIA_LINK.label}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded text-sm text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Live demo — opens the hosted sample-data build in a new tab. */}
            {siteConfig.demoUrl && (
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-lg border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 lg:inline-flex"
              >
                <Play className="h-3.5 w-3.5" aria-hidden />
                Live demo
              </a>
            )}

            {/* Desktop CTA */}
            <button
              type="button"
              onClick={openPreRegister}
              className="hidden cursor-pointer items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#05070A] transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 lg:inline-flex"
            >
              Pre-Register
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-white/5 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 lg:hidden"
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
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-[#05070A] lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-8">
              {/* Features accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileFeaturesOpen((open) => !open)}
                  aria-expanded={isMobileFeaturesOpen}
                  aria-controls="mobile-features"
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
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
                      <div className="flex flex-col gap-4 py-2 pl-3">
                        {GROUPS.map((group) => (
                          <div key={group.id}>
                            <p className="px-4 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
                              {group.label}
                            </p>
                            <div className="mt-1 flex flex-col">
                              {group.features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                  <Link
                                    key={feature.href}
                                    href={feature.href}
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                  >
                                    <Icon
                                      className="h-5 w-5 shrink-0 text-cyan-400"
                                      strokeWidth={1.75}
                                      aria-hidden
                                    />
                                    <span className="text-base font-medium">{feature.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <div className="flex flex-col border-t border-white/10 pt-3">
                          <Link
                            href="/features"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-2.5 text-base font-semibold text-cyan-400 transition-colors hover:bg-white/5"
                          >
                            All {FEATURE_COUNT} features
                          </Link>
                          {[...FOUNDATIONS, { name: INDIA_LINK.label, href: INDIA_LINK.href }].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMenu}
                              className="rounded-lg px-4 py-2.5 text-base text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
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
                  className="rounded-lg px-4 py-3 text-lg font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  {link.label}
                </Link>
              ))}

              {siteConfig.demoUrl && (
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/40 px-4 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <Play className="h-4 w-4" aria-hidden />
                  Try the live demo
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openPreRegister();
                }}
                className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-[#05070A] transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Pre-Register for Launch
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
