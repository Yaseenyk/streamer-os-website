// Centralized site constants for the marketing site. External links are safe
// placeholders — swap them for the real release, checkout, and social URLs
// before launch. Internal routes (e.g. `/download`, `/#pricing`) stay inline
// in the components.

/** Production canonical origin. Single source of truth — import this instead
 *  of hardcoding the domain (metadata, sitemap, robots, JSON-LD all use it). */
export const SITE_URL = 'https://streamerosai.com';

export const siteConfig = {
  /** Where the "Download v1.0-GA" buttons send people to grab the binary. */
  downloadUrl: 'https://github.com/streamerOS/streamerOS/releases/latest',
  /** Checkout for the $29 one-time Supporter Edition. */
  supporterCheckoutUrl: 'https://streameros.gumroad.com/l/supporter',
  twitterUrl: 'https://twitter.com/streamerOS',
  discordUrl: 'https://discord.gg/streamerOS',
  githubUrl: 'https://github.com/streamerOS/streamerOS',
  /** Public contact address (custom domain, forwarded to the team inbox). */
  contactEmail: 'contact@streamerosai.com',
} as const;
