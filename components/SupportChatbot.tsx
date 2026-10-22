'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';

// The panel pulls in the AI SDK (~0.5 MB with its schema validation). Loading it
// on first open keeps it off every page's critical path.
const SupportChatWindow = lazy(() => import('./SupportChatWindow'));

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // Stays true after the first open so the conversation survives closing.
  const [hasOpened, setHasOpened] = useState(false);

  // Escape closes the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {hasOpened && (
        <Suspense fallback={null}>
          <SupportChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => {
          setHasOpened(true);
          setIsOpen((open) => !open);
        }}
        aria-label={isOpen ? 'Close support chat' : 'Open support chat'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-cyan-400 text-[#05070A] shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
