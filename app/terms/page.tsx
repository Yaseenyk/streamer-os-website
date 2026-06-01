import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of streamerOS — open-source software ' +
    'provided free of charge, on an "as is" basis.',
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
      {/* TODO: set to the real publication date */}
      <p className="mt-3 text-sm text-zinc-500">Last updated: May 22, 2026</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className={H2}>Open-source software</h2>
          <p className={P}>
            streamerOS is free, open-source software. The application&apos;s full
            source code is publicly available, and your use, modification, and
            redistribution of it are governed by its open-source license. Where
            that license and these terms differ, the license controls.
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
            by law, the project and its contributors are not liable for any
            damages — including lost streams, dropped frames, missed moments, or
            data loss — arising from your use of the software.
          </p>
        </section>

        <section>
          <h2 className={H2}>The Supporter Edition</h2>
          <p className={P}>
            The Supporter Edition is an optional, one-time purchase. It unlocks
            cosmetic and early-access perks but does not change the open-source
            license or the warranty disclaimer above — streamerOS remains free and
            fully functional without it.
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
