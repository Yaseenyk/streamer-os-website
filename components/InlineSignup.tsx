'use client';

import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import {
  SIGNUP_ERROR,
  submitPreRegistration,
  submitSignupProfile,
  type SignupProfile,
} from '@/lib/preregister';

/**
 * The trust line under every email field. It answers the three objections a
 * visitor has at the moment of signing up: is there a catch, who is behind it,
 * and why might Windows warn about it later.
 */
export function SignupTrustLine({ centered = false }: { centered?: boolean }) {
  return (
    <p className={`mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-zinc-400 ${centered ? 'mx-auto max-w-md' : ''}`}>
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>
        No card, no account. Built by one developer,{' '}
        <Link href="/about" className="text-zinc-300 underline underline-offset-2">
          Yaseen Khatib
        </Link>
        . The installer is not code-signed yet, so Windows may warn on first install —{' '}
        <Link href="/trust" className="text-zinc-300 underline underline-offset-2">
          how to verify it
        </Link>
        .
      </span>
    </p>
  );
}

const PLATFORMS: { value: SignupProfile['platform']; label: string }[] = [
  { value: 'twitch', label: 'Twitch' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'both', label: 'Both' },
  { value: 'not-yet', label: 'Not streaming yet' },
];

/**
 * Optional follow-up shown after the email is captured, so it never costs a
 * signup. Two taps; skipping it is fine.
 */
export function SignupProfileQuestion({ email, source }: { email: string; source: string }) {
  const [platform, setPlatform] = useState<SignupProfile['platform'] | null>(null);
  const [done, setDone] = useState(false);

  const choiceClass =
    'rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 ' +
    INTERACTIVE;

  if (done) {
    return <p className="mt-3 text-xs text-zinc-400">Thanks — that helps us build for how you stream.</p>;
  }

  const answer = (usesObs: SignupProfile['usesObs']) => {
    if (!platform) return;
    setDone(true);
    void submitSignupProfile(email, source, { platform, usesObs });
  };

  return (
    <div className="mt-4 text-left">
      <p className="text-xs font-medium text-zinc-300">
        {platform ? 'And do you stream with OBS Studio?' : 'Optional: where do you stream?'}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {platform
          ? (['yes', 'no'] as const).map((v) => (
              <button key={v} type="button" onClick={() => answer(v)} className={choiceClass}>
                {v === 'yes' ? 'Yes, OBS' : 'Something else'}
              </button>
            ))
          : PLATFORMS.map((p) => (
              <button key={p.value} type="button" onClick={() => setPlatform(p.value)} className={choiceClass}>
                {p.label}
              </button>
            ))}
      </div>
    </div>
  );
}

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
  const [email, setEmail] = useState('');
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
      const value = String(formData.get('email') ?? '');
      await submitPreRegistration(value, source);
      setEmail(value);
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
            <p className="text-base font-semibold text-zinc-100">You’re on the list.</p>
            <p className="mt-1 text-sm text-zinc-400">
              Your trial will be 3 months instead of 7 days. We’ll email you when your build is
              ready.
            </p>
            {email && <SignupProfileQuestion email={email} source={source} />}
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

            <SignupTrustLine centered={isBare} />
          </form>
        </>
      )}
    </aside>
  );
}
