import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/config/site';
import { GLOSSARY, getGlossaryTerm } from '@/lib/glossary';

type PageParams = Promise<{ slug: string }>;

// Static export: only the slugs in lib/glossary.ts are emitted.
export const dynamicParams = false;

export function generateStaticParams() {
  return GLOSSARY.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryTerm(slug);
  if (!entry) return {};
  return {
    // Long titles skip the " · streamerOS" suffix, as blog posts do.
    title: entry.title.length > 47 ? { absolute: entry.title } : entry.title,
    description: entry.description,
    alternates: { canonical: `${SITE_URL}/glossary/${entry.slug}` },
  };
}

export default async function GlossaryTermPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const entry = getGlossaryTerm(slug);
  if (!entry) notFound();

  const url = `${SITE_URL}/glossary/${entry.slug}`;
  const termJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name: entry.term,
    ...(entry.aliases ? { alternateName: entry.aliases } : {}),
    description: entry.definition,
    url,
    inDefinedTermSet: { '@id': `${SITE_URL}/glossary#set` },
  };

  const related = (entry.related ?? [])
    .map((relatedSlug) => getGlossaryTerm(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <JsonLd data={termJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Glossary', path: '/glossary' },
          { name: entry.term, path: `/glossary/${entry.slug}` },
        ])}
      />

      <article>
        <header>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              <Link href="/glossary" className="hover:text-cyan-300">
                Glossary
              </Link>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {entry.term}
            </h1>
          </Reveal>
          {/* The definition is the first body text on the page, on purpose: it is
              what a searcher came for and what an answer engine quotes. */}
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-zinc-100">{entry.definition}</p>
          </Reveal>
        </header>

        {entry.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-300">
                {section.list.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-12 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-zinc-400">
          <p className="font-semibold text-zinc-200">Sources</p>
          <ul className="mt-2 space-y-1">
            {entry.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline underline-offset-2"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-zinc-500">Checked {entry.checked}.</p>
        </section>
      </article>

      {(related.length > 0 || (entry.seeAlso?.length ?? 0) > 0) && (
        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            Keep reading
          </h2>
          <ul className="mt-5 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/glossary/${item.slug}`}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-100 hover:text-cyan-300"
                >
                  {item.term}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <span className="mt-1 block text-xs leading-relaxed text-zinc-400">{item.definition}</span>
              </li>
            ))}
            {entry.seeAlso?.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cyan-400 underline underline-offset-2">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
