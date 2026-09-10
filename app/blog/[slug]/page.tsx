import type { Metadata } from 'next';
import type { Components } from 'react-markdown';
import { Fragment, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Reveal } from '@/components/Reveal';
import EncoderTuningGraphic from '@/components/EncoderTuningGraphic';
import LocalVsCloudDiagram from '@/components/LocalVsCloudDiagram';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InlineSignup from '@/components/InlineSignup';
import { getAllPostMeta, getPostBySlug, getPostSlugs } from '@/lib/posts';
import { getBlogCta, getRelatedPosts } from '@/lib/blog-cta';
import { SITE_URL } from '@/config/site';
import { breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

/** Fallback social card. A post that sets `openGraph` inherits no images from
 *  the root layout, so every post has to name one explicitly or share blank. */
const DEFAULT_OG = '/og-image-1200x630.png';
import Image from 'next/image';

// Approved layout tokens → their components. Posts stay pure markdown data;
// tokens are swapped for components here, never executed from the post itself.
const PLACEHOLDERS: Record<string, ReactNode> = {
  '[OBS_ENCODER_TUNING_GRAPHIC]': <EncoderTuningGraphic />,
  '[LOCAL_VS_CLOUD_FLOW_DIAGRAM]': <LocalVsCloudDiagram />,
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Split on (and keep) any known token, so a post can interleave prose and components.
const PLACEHOLDER_PATTERN = new RegExp(
  `(${Object.keys(PLACEHOLDERS).map(escapeRegExp).join('|')})`,
  'g',
);

type PageParams = Promise<{ slug: string }>;

// Static export: only slugs returned here are emitted, and nothing else 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPostBySlug(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const image = `${SITE_URL}${meta.image ?? DEFAULT_OG}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.description,
      url,
      siteName: 'streamerOS',
      publishedTime: meta.date,
      authors: [meta.author],
      tags: meta.tags,
      images: [{ url: image, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image],
    },
  };
}

// No @tailwindcss/typography on this site, so style markdown elements directly
// to match the rest of the pages.
const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight text-zinc-100">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-5 leading-relaxed text-slate-300">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
  em: ({ children }) => <em className="italic text-zinc-200">{children}</em>,
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-slate-300">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-cyan-400 underline-offset-2 hover:underline">
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/15 bg-white/[0.03] px-4 py-2.5 text-left font-semibold text-zinc-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/5 px-4 py-2.5 align-top text-slate-300">{children}</td>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 font-mono text-xs leading-relaxed text-slate-300">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const text = Array.isArray(children) ? children.join('') : String(children ?? '');
    const isBlock = text.includes('\n') || (typeof className === 'string' && className.startsWith('language-'));
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-300">
        {children}
      </code>
    );
  },
};

function renderBody(content: string): ReactNode[] {
  return content.split(PLACEHOLDER_PATTERN).map((segment, i) => {
    const component = PLACEHOLDERS[segment];
    if (component) {
      return <Fragment key={i}>{component}</Fragment>;
    }
    if (!segment.trim()) {
      return null;
    }
    return (
      <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {segment}
      </ReactMarkdown>
    );
  });
}

/**
 * Split the markdown at the "## " heading nearest the middle, so a mid-post
 * callout lands on a section break rather than cutting a paragraph in half.
 * Returns a single chunk for posts too short to be worth interrupting.
 */
function splitAtMiddleHeading(content: string): [string, string] {
  const headings: number[] = [];
  const pattern = /\n## /g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) headings.push(match.index);

  // Two headings minimum, or the "middle" is just the top or bottom of the post.
  if (headings.length < 3 || content.length < 2500) return [content, ''];

  const target = content.length / 2;
  const cut = headings.reduce((best, index) =>
    Math.abs(index - target) < Math.abs(best - target) ? index : best,
  );
  return [content.slice(0, cut), content.slice(cut)];
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const { meta, content } = await getPostBySlug(slug);
  const cta = getBlogCta(meta);
  const related = getRelatedPosts(meta, await getAllPostMeta());
  const [bodyStart, bodyRest] = splitAtMiddleHeading(content);

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const url = `${SITE_URL}/blog/${slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: { '@type': 'Person', name: meta.author },
    keywords: meta.tags.join(', '),
    image: `${SITE_URL}${meta.image ?? DEFAULT_OG}`,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    // Resolves against the Organization node emitted by the root layout graph.
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Blog', path: '/blog' },
          { name: meta.title, path: `/blog/${slug}` },
        ])}
      />
      <article>
        <header>
          {meta.tags.length > 0 && (
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                {meta.tags.join(' · ')}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {meta.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-sm text-zinc-400">
              By {meta.author} · {formattedDate}
            </p>
          </Reveal>
        </header>

        <div className="mt-12">{renderBody(bodyStart)}</div>

        {bodyRest && (
          <>
            <Reveal>
              <aside className="my-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <Image
                  src={cta.shot.src}
                  alt={cta.shot.alt}
                  width={cta.shot.width}
                  height={cta.shot.height}
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="h-auto w-full border-b border-white/10"
                />
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-zinc-300">{cta.callout.text}</p>
                  <Link
                    href={cta.callout.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    {cta.callout.linkLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </aside>
            </Reveal>
            <div>{renderBody(bodyRest)}</div>
          </>
        )}
      </article>

      <Reveal>
        <InlineSignup
          className="mt-16"
          source={`blog:${slug}`}
          heading={cta.heading}
          blurb={cta.blurb}
        />
      </Reveal>

      {related.length > 0 && (
        <Reveal>
          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Keep reading
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {related.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.06]"
                  >
                    <span className="text-sm font-semibold leading-snug text-zinc-100 group-hover:text-cyan-300">
                      {post.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                      {post.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </main>
  );
}
