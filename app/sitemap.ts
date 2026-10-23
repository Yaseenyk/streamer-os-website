import type { MetadataRoute } from 'next';
import { getAllPostMeta } from '@/lib/posts';
import { SITE_URL as BASE_URL } from '@/config/site';

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // No lastmod on static routes: Google uses lastmod only when it is consistently
  // accurate, and these pages have no reliable last-edited date. Posts keep theirs.
  const staticRoutes: MetadataRoute.Sitemap = [
    // Bare origin, no trailing slash — this must match the homepage's canonical
    // tag, and under `trailingSlash: false` Next normalizes that to the bare
    // form no matter what we pass to `alternates.canonical`. (The two forms are
    // equivalent per RFC 3986 and Google normalizes them, so the only thing
    // that matters is that the sitemap and the canonical agree.)
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/features`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/features/auto-hype`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/obs-bridge`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/aura-studio`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/clip-library`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/viral-moments`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/media-kit`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/sponsor-crm`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/live-cockpit`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/chat-archive`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/ai-sidekick`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/viral-engine`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/aura-scene`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/shorts-factory`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/brand-guard`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/for/indian-streamers`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/performance`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/zero-cloud`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/download`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/streamers`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/vs/streamlabs`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trust`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vs/streamer-bot`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vs/sammi`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vs`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/for/low-end-pc`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/for/solo-streamers`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/for/youtube-live`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/for/vtubers`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/playbook`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/docs`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/docs/installation`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/changelog`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Map every published blog post (newest first) into the sitemap.
  const posts = await getAllPostMeta();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
