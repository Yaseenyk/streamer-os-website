'use client';

import { useState, type FormEvent } from 'react';

// Delivered via EmailJS's REST API (client-side, works on the static export) to
// the site contact inbox. Native fetch keeps the bundle lean — no SDK. The
// public key is safe to expose; that's EmailJS's design.
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE = 'service_560nh3i';
const EMAILJS_TEMPLATE = 'template_dyb1k4x';
const EMAILJS_PUBLIC_KEY = 'mB56akvK2qStLNadU';
const CONTACT_INBOX = 'contact@streamerosai.com';

// Shared glassmorphic field styling.
const FIELD_CLASS =
  'w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white ' +
  'placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 ' +
  'outline-none rounded-lg p-3';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Read the form synchronously — `e.currentTarget` is nulled out once the
    // handler yields at the first `await`.
    const formData = new FormData(e.currentTarget);

    // Honeypot — bots fill this hidden field. Report success without sending.
    if (formData.get('_gotcha')) {
      setIsSuccess(true);
      return;
    }

    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const subject = String(formData.get('subject') ?? '');
    const message = String(formData.get('message') ?? '');

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
            name,
            email,
            message: `Subject: ${subject}\n\n${message}`,
            to_email: CONTACT_INBOX,
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
        "Something went wrong — your message wasn't sent. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        className="rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] p-8 text-center"
      >
        <p className="text-lg font-semibold text-white">
          Transmission received. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={FIELD_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={FIELD_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-slate-300">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What's this about?"
          className={FIELD_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us more…"
          className={`${FIELD_CLASS} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex cursor-pointer items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-[#05070A] transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
      >
        {isSubmitting ? 'Transmitting…' : 'Send message'}
      </button>
    </form>
  );
}
