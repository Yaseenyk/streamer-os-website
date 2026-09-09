'use client';

import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { SIGNUP_ERROR, submitPreRegistration } from '@/lib/preregister';

const INTERACTIVE =
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A]';

interface InlineSignupProps {
  /** Which surface this form sits on — recorded with the lead. */
  source: string;
  /** Headline. Keep it about the reader's problem, not the product. */
  heading?: string;
  /** One line of supporting copy. */
  blurb?: string;
  /** Submit button label. */
  cta?: string;
  /**
   * `card` is the bordered block used at the end of a blog post. `bare` drops
   * the chrome for places that already have their own headline — the hero,
   * where the field replaces a button that used to open a modal.
   */
  variant?: 'card' | 'bare';
  className?: string;
}

/**
 * Email capture rendered directly in the page — no modal in the way.
 *
 * The modal costs a click before anyone even sees a field, which is fine for a
 * visitor who already came to sign up but wastes the reader who just finished a
 * guide. Search traffic lands almost entirely on blog posts, so those readers
 * need the field in front of them, in context, at the moment the post pays off.
 */
export default function InlineSignup({
  source,
  heading,
  blurb,
  cta = 'Get 3 months free',
  variant = 'card',
  className = '',
}: InlineSignupProps) {
  const isBare = variant === 'bare';
  const fieldId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    // Honeypot — bots fill this hidden field. Report success without sending.
    if (formData.get('_gotcha')) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitPreRegistration(String(formData.get('email') ?? ''), source);
      setIsSuccess(true);
    } catch {
      setErrorMessage(SIGNUP_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shell = isBare
    ? ''
    : 'rounded-2xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.07),rgba(168,85,247,0.05))] p-6 sm:p-8';

  return (
    <aside className={`${shell} ${className}`.trim()}>
      {isSuccess ? (
        <div role="status" className={`flex items-start gap-3 ${isBare ? 'justify-center text-left' : ''}`}>
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </span>
          <div>
            <p className="text-base font-semibold text-zinc-100">You’re on the launch list. 🚀</p>
            <p className="mt-1 text-sm text-zinc-400">
              Your trial is 3 months instead of 7 days. We’ll email you the day streamerOS ships —
              nothing before that.
            </p>
          </div>
        </div>
      ) : (
        <>
          {heading && (
            <h2 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
              {heading}
            </h2>
          )}
          {blurb && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{blurb}</p>}

          <form onSubmit={handleSubmit} className={heading || blurb ? 'mt-5' : ''}>
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
                className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
              >
                {errorMessage}
              </p>
            )}

            <div className={`flex flex-col gap-2.5 sm:flex-row ${isBare ? 'mx-auto max-w-md' : ''}`}>
              <label htmlFor={fieldId} className="sr-only">
                Email address
              </label>
              <input
                id={fieldId}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-[#05070A]/60 px-3.5 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 ${INTERACTIVE}`}
              >
                {isSubmitting ? 'Joining…' : cta}
                {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden />}
              </button>
            </div>

            <p className={`mt-3 flex items-center gap-1.5 text-xs text-zinc-500 ${isBare ? 'justify-center' : ''}`}>
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
              No card, no account. One launch-day email, then you choose.
            </p>
          </form>
        </>
      )}
    </aside>
  );
}
