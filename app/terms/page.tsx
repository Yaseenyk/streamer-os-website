import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of streamerOS — a one-time-purchase ' +
    'Windows application, licensed per user and provided on an "as is" basis.',
  alternates: { canonical: 'https://streamerosai.com/terms' },
};

const H2 = 'text-xl font-semibold text-zinc-100';
const P = 'mt-3 leading-relaxed text-zinc-400';

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 10, 2026</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className={H2}>Your licence</h2>
          <p className={P}>
            streamerOS is proprietary software. Buying a licence grants you a
            personal, non-exclusive, non-transferable right to install and run
            streamerOS on machines you own or control. You do not receive the
            source code, and you may not copy, resell, sublicense, rent, or
            redistribute the application, nor reverse-engineer, decompile, or
            disassemble it except where that restriction is void under the law
            that applies to you.
          </p>
          <p className={P}>
            The licence is a one-time purchase, not a subscription. It is
            validated once, on first launch, and does not expire or renew.
          </p>
        </section>

        <section>
          <h2 className={H2}>The free trial</h2>
          <p className={P}>
            streamerOS runs unrestricted for the length of the trial — seven days
            as standard, or three months if you pre-registered before launch. No
            card is required to start, and the trial ends by locking the
            application rather than by charging you. These terms apply during the
            trial exactly as they do after purchase.
          </p>
        </section>

        <section>
          <h2 className={H2}>Provided &ldquo;as is&rdquo;</h2>
          <p className={P}>
            streamerOS is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo;, without warranty of any kind — express or implied —
            including but not limited to the warranties of merchantability,
            fitness for a particular purpose, and non-infringement.
          </p>
          <p className={P}>
            You run streamerOS at your own risk. To the maximum extent permitted
            by law, we are not liable for any damages — including lost streams,
            dropped frames, missed moments, or data loss — arising from your use
            of the software.
          </p>
        </section>

        <section>
          <h2 className={H2}>Payment and refunds</h2>
          <p className={P}>
            A licence costs $29 once. Because the trial lets you run every
            feature before paying, purchases are final except where a refund is
            required by the law that applies to you — write to us and we will
            sort it out.
          </p>
        </section>

        <section>
          <h2 className={H2}>Changes to these terms</h2>
          <p className={P}>
            We may update these terms as the project evolves. Material changes
            will be reflected by the &ldquo;last updated&rdquo; date above.
          </p>
        </section>

        <section>
          <h2 className={H2}>Contact</h2>
          <p className={P}>
            Questions about these terms? Reach us through the{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
