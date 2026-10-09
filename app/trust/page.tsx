import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ShieldCheck, Eye, Scale, Wrench } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { PreRegisterButton } from '@/components/PreRegisterModal';
import { breadcrumbJsonLd, faqPageJsonLd, type FaqEntry } from '@/lib/seo';
import { siteConfig } from '@/config/site';

// This page exists because streamerOS asks for money and for access to a
// streamer's machine before anyone can inspect a build — and because the
// product is not open source, so "read the code" is not an answer we can give.
// Everything here is either checkable by the reader on their own PC or marked
// plainly as a promise we have not kept yet. Nothing on this page may describe
// a safeguard the product does not actually implement.
export const metadata: Metadata = {
  title: 'Trust & Verification',
  description:
    'streamerOS is a paid Windows desktop app from an independent developer, ' +
    'not an operating system and not open source. What it does, what it never ' +
    'does, how to verify each claim yourself, and what we cannot prove yet.',
  alternates: { canonical: 'https://streamerosai.com/trust' },
};

const H2 = 'text-2xl font-semibold tracking-tight text-zinc-100';
const P = 'mt-3 leading-relaxed text-zinc-400';
const LI = 'mt-3 list-disc space-y-2 pl-5 text-zinc-400';

interface Claim {
  claim: string;
  check: string;
}

// Each row must be something a reader can confirm without trusting us. If a
// claim cannot be checked from outside, it belongs in "What we cannot prove"
// instead.
const CLAIMS: Claim[] = [
  {
    claim: 'There is no streamerOS account.',
    check:
      'Install it and look. There is no sign-up screen, no email field and no password — the app opens straight into the cockpit.',
  },
  {
    claim: 'The AI runs on your machine, never on our servers.',
    check:
      'The app will only talk to an AI endpoint on 127.0.0.1, your own computer. Point it anywhere else in Settings and it refuses the address rather than connecting — that restriction is enforced in the code, not a preference you can be talked out of.',
  },
  {
    claim: 'We receive no chat, audio, or stream data.',
    check:
      'Block streamerOS in Windows Defender Firewall and keep streaming. Everything except the connections listed below keeps working, because there is no server of ours for it to reach.',
  },
  {
    claim: 'Your licence is verified without the internet.',
    check:
      'Disconnect from the network, then enter your key. It activates offline against an Installation ID computed on your PC. There is no activation server to call — and none to shut down later.',
  },
  {
    claim: 'Your chat archive stays on your disk.',
    check:
      'Open the streamerOS data folder. Your streams are files on your own drive; you can read, export or delete them without the app.',
  },
  {
    claim: 'Your YouTube API key is not sitting in a text file.',
    check:
      'If you add one, it is stored in Windows Credential Manager, where you can see and revoke it yourself.',
  },
  {
    claim: 'The screenshots are the real product.',
    check:
      'Every screenshot on this site is captured from the running application. None are mockups, renders or concept art.',
  },
];

const NEVER = [
  'No streamerOS account, and no password for us to lose.',
  'No cloud backend that receives your chat, microphone audio, OBS layout or stream statistics.',
  'No analytics SDK, crash reporter or usage tracking inside the application.',
  'No advertising, no data brokers, and nothing about you offered for sale — not now, and not as a later change of policy.',
  'No subscription, no auto-renewal, and no card stored to start a trial.',
  'No background service that keeps running after you close the app.',
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Is streamerOS an operating system?',
    a: 'No. Despite the name, streamerOS is an ordinary Windows desktop application that runs alongside OBS Studio on Windows 10 and 11. You do not install it instead of Windows, you do not boot into it, and it does not replace or modify your operating system. The name describes what it does for a stream — acting as the control layer over OBS, chat and clips — not what it is.',
  },
  {
    q: 'Is streamerOS open source?',
    a: 'No. streamerOS is proprietary software and the source code is not distributed, which is stated plainly in the terms. It is built on open-source foundations — Rust, Tauri, OBS WebSocket, Ollama for local AI and an open speech-recognition model for Brand Guard — but the application itself is closed. Because you cannot read the code, this page lists every claim we make and how to check each one from outside the app instead.',
  },
  {
    q: 'How do I know streamerOS is not sending my data somewhere?',
    a: 'Block the application in Windows Defender Firewall and use it. Everything except the optional connections listed in the privacy policy keeps working, because there is no streamerOS server for it to reach. You can also watch its connections live in Resource Monitor under the Network tab while you stream.',
  },
  {
    q: 'Is the installer signed, and can I verify the download?',
    a: 'There is no public build yet — streamerOS v1.0 launches in February 2027. When it ships, the SHA-256 checksum of every installer will be published on this page so you can verify the file you downloaded is the file we built. Until a code-signing certificate is in place, Windows SmartScreen may warn about the installer because it is new, and we would rather say so here than have you discover it mid-install.',
  },
  {
    q: 'Who builds streamerOS?',
    a: 'Yaseen Khatib, an independent developer, working on it since May 2026. It is not a company with a support department behind it: one person answers the contact address. That is worth knowing before you buy.',
  },
  {
    q: 'What happens to my licence if development stops?',
    a: 'It keeps working. The licence is verified offline on your own computer, so there is no activation server that can be switched off, and no subscription that lapses. An abandoned streamerOS is an app that keeps running exactly as it did on the last day it was updated.',
  },
];

export default function TrustPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Trust & Verification', path: '/trust' }])} />
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />

      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Trust</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Trust &amp; verification
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-zinc-300">
        streamerOS asks you to install software on the machine you stream from,
        and eventually to pay for it. This page is here so you do not have to
        take that on faith. It sets out what the app does, what it never does,
        how to check each claim yourself — and what we cannot prove yet.
      </p>
      <p className="mt-3 text-sm text-zinc-500">Last updated: October 10, 2026</p>

      <div className="mt-14 space-y-14">
        <Reveal>
          <section>
            <h2 className={H2}>Where the project stands today</h2>
            <p className={P}>
              Being straight about this matters more than sounding further along
              than we are:
            </p>
            <ul className={LI}>
              <li>
                <strong className="text-zinc-200">streamerOS has not launched.</strong>{' '}
                v1.0 is scheduled for <strong className="text-zinc-200">February 2027</strong>,
                for Windows 10 and 11.
              </li>
              <li>
                <strong className="text-zinc-200">There is no public download yet.</strong>{' '}
                Anything offering a streamerOS installer today is not from us.
                The only thing this site collects right now is an email address
                for launch day.
              </li>
              <li>
                <strong className="text-zinc-200">It is a desktop app, not an operating system.</strong>{' '}
                It runs on Windows beside OBS Studio.
              </li>
              <li>
                <strong className="text-zinc-200">It has been in development since May 2026</strong>,
                built by one developer. The screenshots across this site are
                captures of that working application.
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>Check it yourself</h2>
            <p className={P}>
              A privacy promise you cannot test is just marketing. Each claim
              below can be confirmed on your own PC, without taking our word for
              it.
            </p>
            <div className="mt-6 space-y-4">
              {CLAIMS.map((item) => (
                <div
                  key={item.claim}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <p className="flex items-start gap-2.5 font-medium text-zinc-100">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                      aria-hidden
                    />
                    {item.claim}
                  </p>
                  <p className="mt-2 flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <Eye className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                    <span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                        How to check
                      </span>
                      <br />
                      {item.check}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>What streamerOS never does</h2>
            <ul className="mt-5 space-y-3">
              {NEVER.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-zinc-400">
                  <X className="mt-1 h-4 w-4 shrink-0 text-rose-400/80" aria-hidden />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
            <p className={P}>
              The connections the app <em>does</em> make — Twitch chat, an
              optional YouTube API key you supply, model downloads, your own
              Discord webhooks — are listed one by one in the{' '}
              <Link href="/privacy" className="text-cyan-400 hover:underline">
                privacy policy
              </Link>
              . If a future feature adds a connection, it goes on that page in
              the same release.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>Not open source — and what we publish instead</h2>
            <p className={P}>
              streamerOS is proprietary. You do not receive the source code, and
              we would rather say that in one sentence than let you infer it
              later. There are good free alternatives and you should know about
              them: Streamer.bot and SAMMI are both free, both far more
              established, and both run locally. streamerOS is a different trade:
              one integrated cockpit that works out of the box, built and
              supported by a named developer, for a one-time $29.
            </p>
            <p className={P}>
              Since &ldquo;audit the code&rdquo; is not available to you, these are:
            </p>
            <ul className={LI}>
              <li>Every outbound connection, named and explained, in the privacy policy.</li>
              <li>Every claim on this page paired with a way to test it.</li>
              <li>
                A{' '}
                <Link href="/changelog" className="text-cyan-400 hover:underline">
                  changelog
                </Link>{' '}
                that is a development log, with no invented release numbers.
              </li>
              <li>
                <Link href="/docs/installation" className="text-cyan-400 hover:underline">
                  Documentation
                </Link>{' '}
                of what the app touches on your system.
              </li>
              <li>
                The open-source projects it is built on: Rust, Tauri, OBS
                WebSocket v5, Ollama for local AI, and an open speech-recognition
                model for Brand Guard.
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>What we commit to at launch</h2>
            <p className={P}>
              These have not happened yet. They are promises, listed here so you
              can hold us to them:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                'The SHA-256 checksum of every installer published on this page, so you can verify the file you downloaded.',
                'A code-signed installer, so Windows can show you who published it.',
                'Release notes for every version, including anything that changes what the app connects to.',
                'This page updated in the same release as any change to the list above — not afterwards.',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-zinc-400">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>What we cannot prove yet</h2>
            <p className={P}>
              A page that only lists reassurances is not worth reading. Here is
              the other side, and you should weigh it:
            </p>
            <ul className={LI}>
              <li>
                <strong className="text-zinc-200">No third-party security audit.</strong>{' '}
                Nobody independent has reviewed the code. Its privacy design is
                our account of it, which is exactly why the checks above are
                written to work without trusting us.
              </li>
              <li>
                <strong className="text-zinc-200">No public build to inspect.</strong>{' '}
                Until February 2027 there is nothing for you — or a security
                researcher, or VirusTotal — to examine.
              </li>
              <li>
                <strong className="text-zinc-200">No independent reviews, and no user testimonials.</strong>{' '}
                The product has no users yet. You will not find invented quotes
                from streamers on this site, because there are none to quote.
              </li>
              <li>
                <strong className="text-zinc-200">One developer.</strong> Support
                is one person answering email, and the project carries the risk
                that implies. The offline licence is the hedge: it keeps working
                whatever happens to us.
              </li>
              <li>
                <strong className="text-zinc-200">Windows only.</strong> There is
                no macOS or Linux build, and none planned for v1.0.
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>Money</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Scale, title: '$29, once', body: 'A one-time licence. Not a subscription, no renewal, no price that climbs later.' },
                { icon: Wrench, title: 'Trial first', body: 'Seven days with every feature and no card — three months if you pre-register before launch.' },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <card.icon className="h-5 w-5 text-cyan-400" aria-hidden />
                  <p className="mt-3 font-medium text-zinc-100">{card.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{card.body}</p>
                </div>
              ))}
            </div>
            <p className={P}>
              You run the whole product before paying anything, so purchases are
              final except where the law that applies to you says otherwise —
              and if something is wrong, write to us. The{' '}
              <Link href="/terms" className="text-cyan-400 hover:underline">
                terms
              </Link>{' '}
              spell this out.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>Questions people actually ask</h2>
            <dl className="mt-6 space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="border-l-2 border-white/10 pl-5">
                  <dt className="font-medium text-zinc-100">{item.q}</dt>
                  <dd className="mt-2 leading-relaxed text-zinc-400">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className={H2}>Reaching a human</h2>
            <p className={P}>
              streamerOS is built by Yaseen Khatib. Questions about any of the
              above — including the uncomfortable ones — go to{' '}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-cyan-400 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>{' '}
              or the{' '}
              <Link href="/contact" className="text-cyan-400 hover:underline">
                contact page
              </Link>
              , and a person answers.
            </p>
            <div className="mt-8">
              <PreRegisterButton />
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
