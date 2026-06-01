'use client';

import { useState, type FormEvent } from 'react';
import { CircleAlert, CircleCheckBig, LoaderCircle } from 'lucide-react';

// Shared glassmorphic field styling (focus tokens per the GTM directive).
const FIELD_CLASS =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm ' +
  'text-zinc-100 placeholder:text-zinc-600 transition focus:border-cyan-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-cyan-400';

// NEXT_PUBLIC_ → inlined into the client bundle at BUILD time. For a static
// export there is no server to read it at runtime, so it must be set before
// `next build` runs (see README).
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);

    if (!FORM_ENDPOINT) {
      // Endpoint not configured — fail into the error UI rather than
      // POSTing to an undefined URL.
      console.error('NEXT_PUBLIC_FORM_ENDPOINT is not set.');
      setIsError(true);
      return;
    }

    // Read the form synchronously — `e.currentTarget` is cleared after the
    // handler yields at the first `await`.
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Form endpoint returned ${response.status}`);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success — replace the form with a confirmation.
  if (isSuccess) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center"
      >
        <CircleCheckBig className="h-10 w-10 text-green-400" aria-hidden />
        <h2 className="text-lg font-semibold text-zinc-100">Message sent</h2>
        <p className="text-sm text-zinc-400">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      {/* Error boundary — above the form so the user can retry. */}
      {isError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden />
          <span>
            Something went wrong — your message wasn&apos;t sent. Please try
            again in a moment.
          </span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-300">
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
          <label htmlFor="email" className="text-sm font-medium text-zinc-300">
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
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-zinc-300">
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

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-300">
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
