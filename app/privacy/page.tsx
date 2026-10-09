import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'streamerOS runs on your machine. We do not collect your chat, audio or ' +
    'stream data. Every network connection the app and this website make, listed.',
  alternates: { canonical: 'https://streamerosai.com/privacy' },
};

const H2 = 'text-xl font-semibold text-zinc-100';
const H3 = 'mt-6 text-base font-semibold text-zinc-200';
const P = 'mt-3 leading-relaxed text-zinc-400';
const LI = 'mt-3 list-disc space-y-2 pl-5 text-zinc-400';

// Every connection below was checked against the product source on 2026-09-11.
// If a feature gains a new outbound connection, it goes on this page in the same
// change — a privacy page that misses one is worse than one that lists too many.
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: October 10, 2026</p>

      <p className="mt-5 leading-relaxed text-zinc-300">
        Every claim on this page can be checked from outside the app — the{' '}
        <Link href="/trust" className="text-cyan-400 hover:underline">
          trust page
        </Link>{' '}
        explains how to verify each one on your own PC.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className={H2}>Zero-cloud by architecture</h2>
          <p className={P}>
            streamerOS runs on your computer. We do not operate servers that
            receive your chat, your microphone audio, your stream telemetry or your
            OBS configuration, so we never collect or store any of it.
          </p>
          <p className={P}>
            This is how the software is built rather than a setting we could
            quietly flip: there is no streamerOS account, no cloud backend, and no
            analytics SDK, telemetry or crash reporter inside the application.
          </p>
        </section>

        <section>
          <h2 className={H2}>What the app keeps — and where</h2>
          <p className={P}>
            Everything below stays in the streamerOS data folder and the workspace
            folder you choose, on your own drive:
          </p>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Chat Archive</strong> — the public
              chat of streams you monitor, including viewers&apos; display names and
              messages, so you can search it later. You can redact a message or
              delete a whole stream at any time.
            </li>
            <li>
              <strong className="text-zinc-200">Stream history</strong> — chat
              velocity, sentiment and Super Chat records used by the cockpit, Clip
              Library and reports.
            </li>
            <li>
              <strong className="text-zinc-200">Your settings and work</strong> —
              automation rules, overlays and imported assets, sponsor leads, AI
              memories you ask the sidekick to keep, and any analytics exports you
              import.
            </li>
            <li>
              <strong className="text-zinc-200">Microphone audio</strong> — only
              while Brand Guard is running, processed in memory and discarded.
              Audio is written to disk only if you switch on audit recording for
              that session.
            </li>
            <li>
              <strong className="text-zinc-200">A YouTube Data API key</strong>, if
              you add one, is stored in Windows Credential Manager rather than in a
              file.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={H2}>Every network connection the app makes</h2>
          <p className={P}>
            None of these send your chat, audio or personal data to us. Most only
            happen because you switched a feature on.
          </p>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Twitch chat</strong> — when you
              monitor a Twitch channel, the app opens an anonymous, read-only
              connection to Twitch chat. No credentials are sent or stored.
            </li>
            <li>
              <strong className="text-zinc-200">YouTube chat</strong> — read from
              the YouTube page already open in your own browser, on your PC. The app
              itself does not connect to YouTube for chat.
            </li>
            <li>
              <strong className="text-zinc-200">YouTube Data API</strong> — only if
              you add your own API key and channel ID. The app requests your
              channel&apos;s public statistics, such as subscriber count, from Google.
            </li>
            <li>
              <strong className="text-zinc-200">AI model downloads</strong> — local
              AI models are downloaded by Ollama when you choose to install one, and
              Brand Guard downloads its speech-recognition model (about 140 MB) from
              Hugging Face once, when you click download. Neither sends data about
              you.
            </li>
            <li>
              <strong className="text-zinc-200">Google Fonts</strong> — only when an
              Aura Scene overlay uses a Google font, the font files are loaded from
              Google by the editor and by OBS.
            </li>
            <li>
              <strong className="text-zinc-200">Discord webhooks</strong> — only if
              you add a Discord action to an automation rule. The app posts the
              message you wrote to your own Discord webhook.
            </li>
            <li>
              <strong className="text-zinc-200">Update checks</strong> — only if you
              opt in, the app checks whether a newer version exists.
            </li>
          </ul>
          <p className={P}>
            Licensing needs no connection at all. You buy in your browser, and the
            key is verified offline against your PC&apos;s Installation ID — an
            anonymous code derived on your machine that is safe to share. The
            hardware identifier it is derived from never leaves the computer.
          </p>
        </section>

        <section>
          <h2 className={H2}>This website</h2>
          <p className={P}>
            streamerosai.com is a static site and sets no tracking cookies. A few
            services are involved when you use it:
          </p>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Plausible Analytics</strong> —
              counts page visits and sign-ups in aggregate, without cookies and
              without collecting personal data.
            </li>
            <li>
              <strong className="text-zinc-200">Pre-registration and the contact
              form</strong> — what you submit, such as your email address and
              message, is delivered to our inbox through EmailJS. We use it only to
              reply and to tell you when streamerOS launches.
            </li>
            <li>
              <strong className="text-zinc-200">The support chat</strong> —
              questions you type into the chat widget are sent to our support
              service, which uses Google&apos;s AI to search our documentation and
              OpenAI to write the answer. Please don&apos;t type personal or
              sensitive information into it.
            </li>
          </ul>
          <h3 className={H3}>Your choices</h3>
          <p className={P}>
            To remove your pre-registration or ask what we hold about you, write to
            us through the{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              contact page
            </Link>{' '}
            and we will delete it.
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
