'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Rocket, X } from 'lucide-react';

// Pre-registration captures emails ahead of the September 2026 launch. Delivered
// via EmailJS's REST API (client-side, works on the static export) to the site
// contact inbox. The public key is safe to expose — that's EmailJS's design.
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE = 'service_560nh3i';
const EMAILJS_TEMPLATE = 'template_dyb1k4x';
const EMAILJS_PUBLIC_KEY = 'mB56akvK2qStLNadU';
const PREREGISTER_INBOX = 'contact@streamerosai.com';

const FIELD_CLASS =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-slate-100 ' +
  'placeholder-slate-500 outline-none backdrop-blur-xl transition-colors focus:border-cyan-400 ' +
  'focus:ring-1 focus:ring-cyan-400';

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
 * app-wide controlled <PreRegisterModal>. Exposes `open()` via context so any CTA
 * across the (mostly server-rendered) pages can flip the state to true.
 */
export function PreRegisterProvider({ children }: { children: ReactNode }) {
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const open = useCallback(() => setIsPreRegisterOpen(true), []);
  const close = useCallback(() => setIsPreRegisterOpen(false), []);

  return (
    <PreRegisterContext.Provider value={{ open }}>
      {children}
      <PreRegisterModal isOpen={isPreRegisterOpen} onClose={close} />
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
      {children ?? 'Pre-Register for Launch'}
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
      Launching September 2026
    </span>
  );
}

/**
 * Controlled pre-registration modal. Centered glassmorphic panel with a fade-in
 * backdrop and scale-up entrance.
 */
export function PreRegisterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lock body scroll and close on Escape while open. No setState here — the form
  // lives in a child that remounts each open, so it always starts fresh.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div aria-hidden className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="prereg-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_0_80px_-20px_rgba(34,211,238,0.45)] backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-cyan-400 ${INTERACTIVE}`}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <LaunchBadge />

            <h2 id="prereg-title" className="mt-4 text-xl font-bold tracking-tight text-slate-100">
              Secure Pre-Registration Access
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              streamerOS is launching natively in September 2026. Enter your email below to
              reserve your spot on the zero-cloud optimization list and receive the stable build
              the second it drops.
            </p>

            <PreRegisterForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PreRegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '');

    // Honeypot — bots fill this hidden field. Report success without sending.
    if (formData.get('_gotcha')) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: 'streamerOS Pre-Registration',
            email,
            message: `New streamerOS pre-registration from ${email}`,
            to_email: PREREGISTER_INBOX,
            reply_to: email,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`EmailJS returned ${response.status}`);
      }
      setIsSuccess(true);
    } catch {
      setErrorMessage(
        'Something went wrong — you weren’t added to the list. Please try again in a moment.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        className="mt-6 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] p-6 text-center"
      >
        <p className="text-base font-semibold text-slate-100">You’re on the launch list. 🚀</p>
        <p className="mt-1 text-sm text-slate-400">
          We’ll email you the moment streamerOS goes live.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      {/* Honeypot: hidden from humans, bots tend to fill it in. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      {errorMessage && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <label htmlFor="prereg-email" className="sr-only">
        Email address
      </label>
      <input
        id="prereg-email"
        name="email"
        type="email"
        required
        autoFocus
        placeholder="Enter your email address"
        className={FIELD_CLASS}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-1 inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-[#05070A] transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] ${INTERACTIVE} disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none`}
      >
        {isSubmitting ? 'Joining…' : 'Join Launch List'}
      </button>

      <p className="text-center text-xs text-slate-500">
        No spam. One launch-day email, then you choose.
      </p>
    </form>
  );
}
