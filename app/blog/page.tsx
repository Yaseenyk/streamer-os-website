import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { InteractiveBlogGrid } from '@/components/InteractiveBlogGrid';
import { getAllPostMeta } from '@/lib/posts';
import { SITE_URL } from '@/config/site';

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

      <Reveal delay={0.16} className="mt-14 block sm:mt-16">
        <InteractiveBlogGrid posts={posts} />
      </Reveal>
    </main>
  );
}
