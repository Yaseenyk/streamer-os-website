import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'streamerOS runs entirely on your machine. We do not collect, transmit, ' +
    'or store your chat data, credentials, or OBS configuration.',
  alternates: { canonical: 'https://yaseenyk.github.io/streamer-os-website/privacy' },
};

const H2 = 'text-xl font-semibold text-zinc-100';
const P = 'mt-3 leading-relaxed text-zinc-400';

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Privacy Policy
      </h1>
      {/* TODO: set to the real publication date */}
      <p className="mt-3 text-sm text-zinc-500">Last updated: May 22, 2026</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className={H2}>Zero-cloud by architecture</h2>
          <p className={P}>
            streamerOS runs entirely locally. We do not collect, transmit, or
            store your chat data, Twitch or YouTube credentials, or OBS
            configurations on any external server. Your stream&apos;s data lives
            on your machine and nowhere else.
          </p>
          <p className={P}>
            This is not a policy choice we could quietly reverse — it is how the
            software is built. There is no streamerOS account, no cloud backend,
            and no analytics SDK embedded in the application.
          </p>
        </section>

        <section>
          <h2 className={H2}>What the app processes — and where</h2>
          <p className={P}>
            Chat messages, microphone audio, telemetry, and your automation rules
            are processed in memory on your computer to power features like the
            Auto-Hype Director. None of it is uploaded. Recordings and transcripts
            are never written to disk unless you explicitly opt in, per session.
          </p>
        </section>

        <section>
          <h2 className={H2}>The few network connections that do exist</h2>
          <p className={P}>
            For full transparency, streamerOS makes a small, fixed set of network
            connections — none of which carry your personal data:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Update checks</strong> — only when
              you opt in, the app checks whether a newer version exists. No
              personal data is sent.
            </li>
            <li>
              <strong className="text-zinc-200">Live chat ingestion</strong> — when
              you choose to monitor a Twitch or YouTube channel, the app reads that
              public chat. The connection is anonymous; no credentials are sent or
              stored.
            </li>
            <li>
              <strong className="text-zinc-200">Optional model download</strong> —
              if you enable on-device speech features, the app downloads a
              speech-recognition model once. The download sends no data about you.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={H2}>This website</h2>
          <p className={P}>
            This marketing website is a static site. It sets no tracking cookies
            and embeds no third-party analytics. If you write to us through the
            contact form, we use your message solely to reply.
          </p>
        </section>

        <section>
          <h2 className={H2}>Contact</h2>
          <p className={P}>
            Questions about this policy? Reach us through the{' '}
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
