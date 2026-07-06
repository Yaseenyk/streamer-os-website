import type { MetadataRoute } from 'next';
import { getAllPostMeta } from '@/lib/posts';

const BASE_URL = 'https://streamerosai.com';

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/features`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/features/auto-hype`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/obs-bridge`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/aura-studio`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/clip-library`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/viral-moments`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/media-kit`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/sponsor-crm`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/performance`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/features/zero-cloud`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/download`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/playbook`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/changelog`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Map every published blog post (newest first) into the sitemap.
  const posts = await getAllPostMeta();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
