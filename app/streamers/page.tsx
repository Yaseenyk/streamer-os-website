import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Gift, MessageSquare, Rocket, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';
import { siteConfig } from '@/config/site';

// Beta recruitment for working streamers. Every promise here has to be one the
// founder can keep today: a free licence (keys are minted offline), early beta
// builds, and a direct line. The affiliate programme is deliberately NOT
// promised with numbers — there is no checkout to pay commission from yet.
export const metadata: Metadata = {
  title: { absolute: 'Founding Streamers Program — Free streamerOS Licence' },
  description:
    'Windows streamers: use the streamerOS beta on real streams before the February 2027 launch, keep a free licence, and shape v1.0 with the developer.',
  alternates: { canonical: 'https://streamerosai.com/streamers' },
};

const GET = [
  { icon: Rocket, title: 'The earliest beta builds', body: 'Before founding members and before the public launch in February 2027.' },
  { icon: Gift, title: 'A free licence, yours to keep', body: 'The full app, including the next major version. No card, no catch, nothing to pay back.' },
  { icon: MessageSquare, title: 'A direct line to the developer', body: 'Your bug reports and requests go straight to the person building it, and decide what v1.0 fixes first.' },
];

const ASK = [
  'You stream on Windows 10 or 11 with OBS Studio 28 or later.',
  'You stream on Twitch or YouTube at least once a week.',
  'You use streamerOS on a few real streams and tell us honestly what broke and what was missing.',
  'If you like it, a one-line quote we may show on the site — with your name and only with your permission. Never required.',
];

const HONEST = [
  'It is a beta: expect bugs, and expect us to ask for details when you hit one.',
  'The installer is not code-signed yet, so Windows may show a SmartScreen warning. The trust page explains how to check the file is ours.',
  'Windows only. There is no macOS or Linux version.',
  'streamerOS reads your chat; it never posts to it. It is not a chat bot.',
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does the Founding Streamers program cost anything?',
    a: 'No. Accepted streamers get a free streamerOS licence, including the next major version, and the beta builds before anyone else.',
  },
  {
    q: 'Do I have to promote streamerOS on my stream?',
    a: 'No. You are free to mention it if you want to, but it is never a condition. What we ask for is honest feedback after using it on real streams.',
  },
  {
    q: 'How big does my channel need to be?',
    a: 'There is no minimum. We especially want small and mid-sized channels — roughly 10 to 500 average viewers — because that is who streamerOS is built for.',
  },
  {
    q: 'When do beta builds go out?',
    a: 'Before the February 2027 public launch. Accepted streamers get the date by email first.',
  },
  {
    q: 'Will there be an affiliate programme?',
    a: 'Yes, at launch. Founding streamers get first access, and the commission terms will be published then.',
  },
];

export default function StreamersPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Founding Streamers', path: '/streamers' }])} />

      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Founding Streamers</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Run streamerOS on your stream before anyone else.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              We are picking a small group of Windows streamers to use the beta on real
              streams before the February 2027 launch — small enough that every report
              gets a real answer. You get a free licence. We get honest feedback.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300"
              >
                Apply to join
              </a>
              {siteConfig.demoUrl && (
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/5"
                >
                  Try the live demo first
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What you get</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {GET.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <item.icon className="h-5 w-5 text-cyan-300" aria-hidden />
                <h3 className="mt-3 font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-400">
          At launch, founding streamers also get first access to the affiliate programme; its
          terms will be published then.
        </p>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">What we ask</h2>
            <ul className="mt-6 space-y-3">
              {ASK.map((text) => (
                <li key={text} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-2xl font-semibold tracking-tight">Know before you apply</h2>
            <ul className="mt-6 space-y-3">
              {HONEST.map((text) => (
                <li key={text} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-zinc-400">
              More on what the app does and does not do on the{' '}
              <Link href="/trust" className="text-cyan-400 underline underline-offset-2">
                trust page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto max-w-xl px-6 py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Apply</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Tell us where you stream and how. We reply to every application by email.
            </p>
          </Reveal>
          <div className="mt-8">
            <ContactForm
              subject="Founding Streamers application"
              nameLabel="Channel name"
              namePlaceholder="e.g. YourChannel"
              messageLabel="About your stream"
              messagePlaceholder={'Channel link:\nPlatform (Twitch / YouTube / both):\nAverage viewers:\nHow often you stream:\nWhat you would want automated:'}
              submitLabel="Send application"
              successText="Application received. We’ll reply by email."
            />
          </div>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />
    </main>
  );
}
