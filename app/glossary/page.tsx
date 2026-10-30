import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/config/site';
import { GLOSSARY, glossaryAlphabetical } from '@/lib/glossary';

export const metadata: Metadata = {
  title: 'Streamer Glossary — Twitch Emotes, Chat Terms and Tools',
  description:
    'Short, sourced definitions of the words a new streamer meets in chat: KEKW, POGGERS, Sadge, Twitch banned words, Nightbot custom commands. Definition first.',
  alternates: { canonical: `${SITE_URL}/glossary` },
};

// DefinedTermSet for the whole glossary; each term page declares its own
// DefinedTerm pointing back here by @id.
const termSetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/glossary#set`,
  name: 'Streamer Glossary',
  url: `${SITE_URL}/glossary`,
  hasDefinedTerm: GLOSSARY.map((entry) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/glossary/${entry.slug}#term`,
    name: entry.term,
    url: `${SITE_URL}/glossary/${entry.slug}`,
  })),
};

export default function GlossaryIndexPage() {
  const terms = glossaryAlphabetical();
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Glossary', path: '/glossary' }])} />
      <JsonLd data={termSetJsonLd} />

      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Glossary</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Streamer glossary
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The emotes, chat terms and tools a new streamer meets in the first week.
              Each entry starts with the definition, says where the term came from, and
              names the source it was checked against.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <ul className="space-y-4">
          {terms.map((entry, i) => (
            <Reveal key={entry.slug} delay={Math.min(i, 4) * 0.05}>
              <li>
                <Link
                  href={`/glossary/${entry.slug}`}
                  className="group block rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-zinc-100">{entry.term}</h2>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{entry.definition}</p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2}>
          <p className="mt-10 text-sm leading-relaxed text-zinc-500">
            Five terms to start; more are added as readers ask. Chat terms that measure
            rather than name things, such as{' '}
            <Link href="/blog/what-is-chat-velocity" className="text-cyan-400 underline underline-offset-2">
              chat velocity
            </Link>
            , have their own guides on the blog.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
