import type { MetadataRoute } from 'next';

const BASE_URL = 'https://streamerosai.com';

// Required for `output: 'export'` — emit a static robots.txt at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: the whole static site is crawlable.
      { userAgent: '*', allow: '/' },
      // Explicitly welcome the major AI / generative-search crawlers so the site
      // can be ingested, summarized, and cited by AI discovery tools.
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User'], allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: ['ClaudeBot', 'Claude-Web', 'anthropic-ai'], allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
