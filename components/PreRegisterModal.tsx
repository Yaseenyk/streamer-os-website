'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { Rocket } from 'lucide-react';
import DeferredWidgets from '@/components/DeferredWidgets';

// Shared interactive base for clickable buttons: explicit pointer + keyboard focus ring.
const INTERACTIVE =
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A]';

interface PreRegisterContextValue {
  open: () => void;
}

const PreRegisterContext = createContext<PreRegisterContextValue | null>(null);

export function usePreRegister(): PreRegisterContextValue {
  const ctx = useContext(PreRegisterContext);
  if (!ctx) {
    throw new Error('usePreRegister must be used within a <PreRegisterProvider>');
  }
  return ctx;
}

/**
 * Owns the centralized `isPreRegisterOpen` visibility state and renders the single,
 * app-wide controlled modal (loaded with the other deferred widgets). Exposes `open()` via context so any CTA
 * across the (mostly server-rendered) pages can flip the state to true.
 */
export function PreRegisterProvider({ children }: { children: ReactNode }) {
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const open = useCallback(() => setIsPreRegisterOpen(true), []);
  const close = useCallback(() => setIsPreRegisterOpen(false), []);

  return (
    <PreRegisterContext.Provider value={{ open }}>
      {children}
      <DeferredWidgets isOpen={isPreRegisterOpen} onClose={close} />
    </PreRegisterContext.Provider>
  );
}

/** Primary CTA: opens the pre-registration modal. Pass `className` to match each site CTA. */
export function PreRegisterButton({
  className = '',
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { open } = usePreRegister();
  return (
    <button type="button" onClick={open} className={`${INTERACTIVE} ${className}`}>
      {children ?? 'Get the beta'}
    </button>
  );
}

/** Subtle launch micro-badge, placed near CTAs. */
export function LaunchBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ${className}`}
    >
      <Rocket className="h-3.5 w-3.5 text-cyan-400" aria-hidden />
      Launching February 2027
    </span>
  );
}

