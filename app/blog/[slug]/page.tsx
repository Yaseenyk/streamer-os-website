import type { Metadata } from 'next';
import type { Components } from 'react-markdown';
import { Fragment, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Reveal } from '@/components/Reveal';
import InteractiveNodeVisualizer from '@/components/InteractiveNodeVisualizer';
import EncoderTuningGraphic from '@/components/EncoderTuningGraphic';
import LocalVsCloudDiagram from '@/components/LocalVsCloudDiagram';
import TelemetryLoopVisualizer from '@/components/TelemetryLoopVisualizer';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';

const SITE_URL = 'https://yaseenyk.github.io/streamer-os-website';

// Approved layout tokens → their components. Posts stay pure markdown data;
// tokens are swapped for components here, never executed from the post itself.
const PLACEHOLDERS: Record<string, ReactNode> = {
  '[LIVE_SYSTEM_DATALINK_LOOP]': <InteractiveNodeVisualizer />,
  '[OBS_ENCODER_TUNING_GRAPHIC]': <EncoderTuningGraphic />,
  '[LOCAL_VS_CLOUD_FLOW_DIAGRAM]': <LocalVsCloudDiagram />,
  '[TELEMETRY_FEEDBACK_LOOP_VISUALIZER]': <TelemetryLoopVisualizer />,
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
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.description,
      url,
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

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const { meta, content } = await getPostBySlug(slug);

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
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

        <div className="mt-12">{renderBody(content)}</div>
      </article>
    </main>
  );
}
