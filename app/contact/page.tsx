import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the streamerOS team — questions, bug reports, ' +
    'partnership ideas, or feedback.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
      <section className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-zinc-400">
          Questions, bug reports, partnership ideas — we read everything. Drop us a line.
        </p>
      </section>

      <div className="mt-12">
        <ContactForm />
      </div>
    </main>
  );
}
