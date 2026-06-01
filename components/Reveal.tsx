'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds — give grouped items 0, 0.08, 0.16, … */
  delay?: number;
}

/**
 * Scroll-triggered fade-and-rise — the site's shared reveal primitive, so the
 * motion language stays identical across every page. Each <Reveal> is its own
 * client island, which lets the server-rendered pages compose it freely.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
