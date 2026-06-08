'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  // basePath is stripped from usePathname(), so this matches regardless of the
  // GitHub Pages subpath.
  const pathname = usePathname();

  // Escape closes the panel — standard for dismissible overlays.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // The /contact page already has the full form inline — hide the widget there.
  // Placed after all hooks so the Rules of Hooks are preserved.
  if (pathname === '/contact') return null;

  return (
    // Single morphing container: `layout` animates the size/radius change as it
    // toggles between the circular FAB and the expanded card. z-[100] keeps it
    // above the header (z-50) and the scroll-progress bar (z-[60]).
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: EASE } }}
      className={`fixed bottom-24 right-6 z-[100] overflow-hidden border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/50 backdrop-blur-md ${
        isOpen ? 'w-96 max-w-[calc(100vw-3rem)] rounded-2xl' : 'rounded-full'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="flex max-h-[calc(100vh-6rem)] w-96 max-w-[calc(100vw-3rem)] flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">Get in touch</p>
                <p className="text-xs text-slate-400">We usually reply within a day.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close contact form"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Form — scrolls if the viewport is short */}
            <div className="overflow-y-auto px-5 py-5">
              <ContactForm />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open contact form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-14 w-14 cursor-pointer items-center justify-center text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
