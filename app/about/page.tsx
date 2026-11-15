import type { Metadata } from 'next';
import { Gauge, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { BUILDER } from '@/config/engineering';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'streamerOS is built by one person, Yaseen Khatib, in Hyderabad, India. ' +
    'Who he is, why he built a local-first streaming cockpit, where the product ' +
    'stands today and how this site is run.',
  alternates: { canonical: 'https://streamerosai.com/about' },
};

interface Value {
  icon: LucideIcon;
  title: string;
  body: string;
}

const VALUES: Value[] = [
  {
    icon: Gauge,
    title: 'Performance First',
    body: 'A Rust core, built to disappear into the background. About 1.8% CPU is the figure from the developer’s RTX 3060 benchmark, not a guarantee.',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Privacy',
    body: 'Local-first isn’t a setting — it’s the architecture. There is no streamerOS server that receives your chat or your audio, because there is no streamerOS server for user data at all.',
  },
  {
    icon: Workflow,
    title: 'Unleashed Automation',
    body: 'The Auto-Hype Director reads the room so you don’t have to. Your scenes follow your stream’s energy, automatically.',
  },
];

const LINK =
  'rounded text-cyan-400 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <section>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            About
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            One developer, one problem: a streaming PC that is already full.
          </h1>
        </Reveal>
      </section>

      <section className="mt-14 sm:mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Who builds it</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-slate-300">
            <p>
              streamerOS is built by{' '}
              <a href={BUILDER.url} className={LINK}>
                {BUILDER.name}
              </a>
              , a full-stack and AI engineer working alone from Hyderabad, India. There
              is no company, no team and no support desk behind it: the person who
              wrote the code also writes the guides on this site and answers the
              email sent to{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className={LINK}>
                {siteConfig.contactEmail}
              </a>
              . The{' '}
              <Link href="/terms" className={LINK}>
                terms
              </Link>{' '}
              say the same thing in legal language: you are dealing with one
              independent developer.
            </p>
            <p>
              Alongside streamerOS he takes on senior full-stack and AI engineering
              work (
              <a href={BUILDER.hireUrl} className={LINK}>
                more on that here
              </a>
              ) and publishes a free{' '}
              <a href={BUILDER.journeyUrl} className={LINK}>
                sixteen-chapter AI engineering journey
              </a>
              . None of that is hidden: it is the day job that funds a product with
              no investors and no advertising inside the app.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-16 sm:mt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why it exists</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-slate-300">
            <p>
              The starting point was practical. A streaming PC is already running a
              game, a video encoder and OBS Studio. Most companion tools for streamers
              ask for an account and then ship a browser engine to draw a few meters,
              which costs frame rate on the one thing viewers came to watch. streamerOS
              is a native Windows app written in Rust on Tauri, aimed at staying out of
              the way: its benchmark figure on the developer’s test PC is about 1.8% CPU for thecore app (chat monitoring, automation and the cockpit).
            </p>
            <p>
              The second reason is that chat belongs to your viewers. They never chose
              your tools, so streamerOS keeps chat, microphone audio, stream history
              and sponsor records on your own computer: no account, no backend, no
              analytics inside the app. The{' '}
              <Link href="/privacy" className={LINK}>
                privacy policy
              </Link>{' '}
              lists every network connection the app can make, and the{' '}
              <Link href="/trust" className={LINK}>
                trust page
              </Link>{' '}
              explains how to check the claims on your own PC instead of taking them
              on faith.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-16 sm:mt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Where it stands today</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-slate-300">
            <p>
              streamerOS has not been released. Version 1.0 for Windows 10 and 11 is
              planned for February 2027 and there is no public download yet, which is
              why the download page asks you to pre-register rather than offering an
              installer. Until launch you can{' '}
              <a href={siteConfig.demoUrl} className={LINK}>
                try the live demo
              </a>
              , which is the real interface running on sample data in your browser,
              read the{' '}
              <Link href="/features" className={LINK}>
                feature pages
              </Link>{' '}
              (each uses screenshots from the working app) and follow the{' '}
              <Link href="/changelog" className={LINK}>
                development log
              </Link>
              , which records when each part first landed and does not invent release
              numbers.
            </p>
            <p>
              When it ships it costs $29 once, with a 7-day free trial, because a tool
              you buy outright owes its answers to you rather than to a renewal date.
              Details are on the{' '}
              <Link href="/pricing" className={LINK}>
                pricing page
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-16 sm:mt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">About this website</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-slate-300">
            <p>
              The blog is written by the same developer and is mostly OBS and streaming
              how-tos: settings, fixes and measurements you can repeat, with sources
              where a number comes from somewhere else. The{' '}
              <Link href="/docs" className={LINK}>
                docs
              </Link>{' '}
              cover installation and setup, and the{' '}
              <Link href="/playbook" className={LINK}>
                playbook
              </Link>{' '}
              and{' '}
              <Link href="/glossary" className={LINK}>
                glossary
              </Link>{' '}
              explain the concepts.
            </p>
            <p>
              The app will never show ads. This website may display Google AdSense
              ads in future; if it does, they will be labelled by Google, kept away from
              navigation and forms, and covered in the{' '}
              <Link href="/privacy" className={LINK}>
                privacy policy
              </Link>
              , including how to opt out of personalised ads. Corrections and
              questions are welcome on the{' '}
              <Link href="/contact" className={LINK}>
                contact page
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-16 sm:mt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Core values</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {VALUES.map((value, i) => {
            const { icon: Icon, title, body } = value;
            return (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-100">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
