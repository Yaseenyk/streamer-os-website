import { SITE_URL } from '@/config/site';

export interface Crumb {
  name: string;
  /** Root-relative path, e.g. `/features/auto-hype`. */
  path: string;
}

/**
 * BreadcrumbList structured data. "Home" is prepended automatically, so pass
 * only the trail below the root, e.g.:
 * `breadcrumbJsonLd([{ name: 'Features', path: '/features' }, { name: 'OBS Bridge', path: '/features/obs-bridge' }])`
 */
export function breadcrumbJsonLd(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.path === '/' ? SITE_URL : `${SITE_URL}${crumb.path}`,
    })),
  };
}

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * FAQPage structured data. Build it from the same array that renders visually
 * so the markup always matches the visible content (a rich-results requirement).
 */
export function faqPageJsonLd(items: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
