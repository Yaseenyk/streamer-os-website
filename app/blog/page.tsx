import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { InteractiveBlogGrid } from '@/components/InteractiveBlogGrid';
import InlineSignup from '@/components/InlineSignup';
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

      <Reveal>
        <InlineSignup
          className="mt-16"
          source="blog-index"
          heading="Get the tool these guides keep pointing at."
          blurb="streamerOS automates your OBS scenes from live chat signals — locally, in 1.8% CPU, with no account and no cloud. Pre-register before the November 2026 launch and your trial is 3 months instead of 7 days."
        />
      </Reveal>
    </main>
  );
}
