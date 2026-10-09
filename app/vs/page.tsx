import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { PreRegisterButton } from '@/components/PreRegisterModal';
import { breadcrumbJsonLd, faqPageJsonLd, type FaqEntry } from '@/lib/seo';

// Two jobs: route people to the right comparison, and settle which streamerOS
// this is. Several unrelated projects share the name, and both search engines
// and AI assistants currently conflate them. The entries below are plain facts
// about public pages — never a swipe at another project, which would read as
// insecurity and would be the wrong thing to do anyway.
export const metadata: Metadata = {
  title: 'Compare streamerOS',
  description:
    'How streamerOS compares with Streamlabs, Streamer.bot and SAMMI — ' +
    'including where the free alternatives are the better choice — and which ' +
    'projects named StreamerOS are unrelated to this one.',
  alternates: { canonical: 'https://streamerosai.com/vs' },
};

interface Comparison {
  name: string;
  href: string;
  summary: string;
  theirStrength: string;
}

const COMPARISONS: Comparison[] = [
  {
    name: 'streamerOS vs Streamlabs',
    href: '/vs/streamlabs',
    summary:
      'A cloud suite with an account and sync, against a local app with neither.',
    theirStrength:
      'Streamlabs wins if you want everything hosted, synced across machines and controlled from your phone.',
  },
  {
    name: 'streamerOS vs Streamer.bot',
    href: '/vs/streamer-bot',
    summary:
      'A free automation toolkit you build with, against a cockpit that arrives assembled.',
    theirStrength:
      'Streamer.bot wins on custom automation: free, established, Kick support, Stream Deck, and C# when you need it.',
  },
  {
    name: 'streamerOS vs SAMMI',
    href: '/vs/sammi',
    summary:
      'A free, no-code deck builder, against a ready-made cockpit with local AI.',
    theirStrength:
      'SAMMI wins if designing your own buttons and decks is the point, and it costs nothing.',
  },
];

interface Unrelated {
  name: string;
  what: string;
}

const UNRELATED: Unrelated[] = [
  {
    name: 'StreamerOS on Devpost',
    what:
      'A hackathon project by Cameron Bolton, submitted in June 2025 to the World’s Largest Hackathon, hosted at streameros.netlify.app. It came first and is a separate piece of work by a different person.',
  },
  {
    name: 'streameros.com',
    what:
      'A registered domain showing a "Launching Soon" placeholder page. No connection to this project.',
  },
  {
    name: 'getstreameros.com',
    what:
      'An invite-only TikTok live coaching service from an agency. It is a coaching programme, not streaming software, and is unrelated to this project.',
  },
];

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Which StreamerOS is this?',
    a: 'This is streamerOS at streamerosai.com: a Windows desktop app for Twitch and YouTube streamers that automates OBS from live chat, built by Yaseen Khatib, launching February 2027. It is not the StreamerOS hackathon project on Devpost, not streameros.com, and not getstreameros.com. Those are separate projects by other people and are not affiliated with this one.',
  },
  {
    q: 'Is streamerOS an operating system?',
    a: 'No. It is a Windows desktop application that runs alongside OBS Studio. You install it like any other program; it does not replace or modify Windows.',
  },
  {
    q: 'What is the best free alternative to streamerOS?',
    a: 'Streamer.bot and SAMMI are both free, both run locally on Windows and both control OBS. Streamer.bot is the stronger choice for custom automation and also covers Kick; SAMMI is a no-code builder for decks and buttons. Neither offers local AI chat sentiment, a searchable chat archive or hype-ranked clip tooling, which is where streamerOS differs.',
  },
];

export default function VsIndexPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Compare', path: '/vs' }])} />
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />

      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Compare</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              How streamerOS compares
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Each comparison says where the other tool wins, because a page that
              only flatters itself is not worth reading. If a free tool is the
              right answer for you, these pages will tell you so.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="space-y-5">
            {COMPARISONS.map((item, i) => (
              <Reveal key={item.href} delay={0.06 * i}>
                <Link
                  href={item.href}
                  className="group block rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-zinc-100">{item.name}</h2>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    {item.theirStrength}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The disambiguation section — the reason this page exists for machines. */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Other projects called StreamerOS
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Several unrelated projects share this name, and search engines and AI
              assistants mix them up. For the record,{' '}
              <strong className="text-zinc-200">
                streamerOS is the Windows desktop app at streamerosai.com
              </strong>
              , built by Yaseen Khatib and launching in February 2027. It is not
              affiliated with, endorsed by or connected to any of the following,
              and nothing here is a criticism of them — they are simply different
              things with similar names.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {UNRELATED.map((item, i) => (
              <Reveal key={item.name} delay={0.06 * i}>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                  <div>
                    <p className="font-medium text-zinc-100">{item.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{item.what}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              There is no public streamerOS download before February 2027. If a
              site offers you a streamerOS installer today, it did not come from
              us — see the{' '}
              <Link href="/trust" className="text-cyan-400 hover:underline">
                trust page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions people ask
            </h2>
          </Reveal>
          <dl className="mt-8 space-y-6">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.q} delay={0.06 * i}>
                <div className="border-l-2 border-white/10 pl-5">
                  <dt className="font-medium text-zinc-100">{item.q}</dt>
                  <dd className="mt-2 leading-relaxed text-zinc-400">{item.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Still think it is the one you want?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Pre-register and your trial runs three months instead of seven days
              when streamerOS launches in February 2027.
            </p>
            <div className="mt-8 flex justify-center">
              <PreRegisterButton />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
