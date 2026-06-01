import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { getAllPostMeta } from '@/lib/posts';

const SITE_URL = 'https://yaseenyk.github.io/streamer-os-website';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Engineering deep-dives and product notes from the team building streamerOS — ' +
    'performance, UI, and the Auto-Hype Director.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogIndexPage() {
  const posts = await getAllPostMeta();

  return (
    <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <section>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            The streamerOS blog
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Engineering notes & deep dives
          </h1>
        </Reveal>
      </section>

      <section className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2">
        {posts.map((post, i) => {
          const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          return (
            <Reveal key={post.slug} delay={i * 0.08} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full cursor-pointer rounded-xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-200 hover:scale-[1.01] hover:border-cyan-500/40 hover:bg-slate-950/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <article className="flex h-full flex-col">
                  {post.tags.length > 0 && (
                    <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                      {post.tags.join(' · ')}
                    </p>
                  )}
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {post.description}
                  </p>
                  <p className="mt-auto pt-6 text-xs text-zinc-500">
                    By {post.author} · {formattedDate}
                  </p>
                </article>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </main>
  );
}
