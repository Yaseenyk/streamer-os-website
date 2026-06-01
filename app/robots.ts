import type { MetadataRoute } from 'next';

const BASE_URL = 'https://yaseenyk.github.io/streamer-os-website';

// Required for `output: 'export'` — emit a static robots.txt at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
