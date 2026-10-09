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
      <p className="mt-3 text-sm text-zinc-500">Last updated: October 10, 2026</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className={H2}>Who you are dealing with</h2>
          <p className={P}>
            streamerOS is built and sold by Yaseen Khatib, an independent
            developer, trading as streamerOS at streamerosai.com. There is no
            company support desk behind it — one person answers{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              the contact address
            </Link>
            . These terms are between you and the developer.
          </p>
          <p className={P}>
            streamerOS at streamerosai.com is not affiliated with, endorsed by,
            or connected to any other project, product or website using a
            similar name.
          </p>
        </section>

        <section>
          <h2 className={H2}>What streamerOS is</h2>
          <p className={P}>
            streamerOS is a desktop application for Windows 10 and 11. Despite
            the name it is <strong className="text-zinc-200">not an operating
            system</strong>: you install it like any other program, and it runs
            alongside OBS Studio rather than replacing or modifying Windows.
          </p>
          <p className={P}>
            It controls OBS Studio through OBS&apos;s own WebSocket v5 interface,
            which you enable in OBS. It requires a working OBS installation, and
            the features that depend on local AI additionally require Ollama and
            a machine able to run it. Version 1.0 is scheduled for February
            2027; until then no public build exists, and anything offering a
            streamerOS download elsewhere did not come from us.
          </p>
        </section>

        <section>
          <h2 className={H2}>Your licence</h2>
          <p className={P}>
            streamerOS is proprietary software. Buying a licence grants you a
            personal, non-exclusive, non-transferable right to install and run
            streamerOS on the computer your licence key is issued for. You do not
            receive the source code, and you may not copy, resell, sublicense,
            rent, or redistribute the application, nor reverse-engineer,
            decompile, or disassemble it except where that restriction is void
            under the law that applies to you.
          </p>
          <p className={P}>
            The licence is a one-time purchase, not a subscription, and it does
            not expire or renew. Each key is issued for one computer&apos;s
            Installation ID, which the app shows you before you buy, and is
            verified offline on that computer — there is no activation server. If
            you reinstall Windows or replace hardware and your Installation ID
            changes, contact us with your order details and we will reissue the
            key.
          </p>
        </section>

        <section>
          <h2 className={H2}>The free trial</h2>
          <p className={P}>
            streamerOS runs unrestricted for the length of the trial — seven days
            as standard, or three months if you pre-registered before launch. No
            card is required to start, and the trial never turns into a charge.
            When it ends, the features that act during a live stream lock until you
            enter a licence key; your own data stays readable, and the free
            features described on the pricing page keep working. These terms apply
            during the trial exactly as they do after purchase.
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
          <h2 className={H2}>Your data stays yours</h2>
          <p className={P}>
            Everything you create or capture with streamerOS — chat archives,
            automation rules, overlays, clips, sponsor records and exports —
            belongs to you. We claim no ownership of it and no licence over it.
            We do not receive it: it stays in your own folders, as described in
            the{' '}
            <Link href="/privacy" className="text-cyan-400 hover:underline">
              privacy policy
            </Link>
            , which lists every connection the app can make. You are responsible
            for backing up your own data, and for respecting the privacy of the
            people in your chat when you store, export or publish it.
          </p>
        </section>

        <section>
          <h2 className={H2}>Services that are not ours</h2>
          <p className={P}>
            streamerOS connects to services you already use — OBS Studio,
            Twitch, YouTube, Discord, Ollama and model providers. We do not
            control them, we are not affiliated with or endorsed by them, and
            their names are their owners&apos; trademarks. Your use of each is
            governed by that provider&apos;s own terms, and a change on their
            side may affect features in streamerOS that depend on it.
          </p>
        </section>

        <section>
          <h2 className={H2}>Using it fairly</h2>
          <p className={P}>
            Please do not use streamerOS to break the rules of the platforms you
            stream on, to harass anyone, or to collect or publish other
            people&apos;s data unlawfully. Do not share, resell or publish licence
            keys, and do not attempt to defeat the licensing. A licence obtained
            or used in breach of these terms may be cancelled.
          </p>
        </section>

        <section>
          <h2 className={H2}>Updates and support</h2>
          <p className={P}>
            Your licence covers the version you buy and the updates we release
            for it. Updates are never installed behind your back — the app checks
            for them only if you opt in. Support is best-effort by email from one
            developer, with no guaranteed response time, and we may change or
            retire individual features as the platforms streamerOS depends on
            change.
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
          <h2 className={H2}>Governing law</h2>
          <p className={P}>
            These terms are governed by the laws of India, and the courts of
            India have jurisdiction over any dispute arising from them. Nothing
            here takes away a consumer right you have under the law of the
            country you live in — where that law gives you more, it applies.
          </p>
          <p className={P}>
            If any part of these terms is found unenforceable, the rest stays in
            force.
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
