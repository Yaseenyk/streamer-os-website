import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Kept so existing call sites compile. The CSS reveal is scroll-linked, so a
   *  time offset has nothing to apply to; grouped items rise as they enter. */
  delay?: number;
}

/**
 * Scroll-linked rise, the site's shared reveal primitive. It used to be a
 * framer-motion client island; that put framer-motion (about 43 KB gzipped)
 * and a hydration pass on every blog post and glossary page just to nudge text
 * up 16px, and cold mobile loads (slow 4G, 4x CPU) painted the first paragraph
 * later because of it. It is now plain CSS (`.sos-reveal` in globals.css):
 * browsers with scroll-driven animations get the rise, others show the content
 * as is, and the server HTML is final at first paint.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className ? `sos-reveal ${className}` : 'sos-reveal'}>{children}</div>;
}
