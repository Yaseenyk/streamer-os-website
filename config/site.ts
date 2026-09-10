// Centralized site constants for the marketing site.
//
// External URLs are only ever rendered when they are non-empty — a dead link in
// the footer or a 404 checkout costs more trust than a missing link does. Fill
// one in and it appears everywhere it is used; leave it empty and it is skipped.
// Internal routes (e.g. `/download`, `/pricing`) stay inline in the components.

/** Production canonical origin. Single source of truth — import this instead
 *  of hardcoding the domain (metadata, sitemap, robots, JSON-LD all use it). */
export const SITE_URL = 'https://streamerosai.com';

export const siteConfig = {
  /** Windows installer, once a signed release exists. Empty → CTAs fall back to
   *  pre-registration, which is the correct ask before the November launch. */
  downloadUrl: '',
  /** Checkout for the $29 one-time licence. Empty → the pricing CTA falls back
   *  to pre-registration instead of linking at a product that does not exist. */
  supporterCheckoutUrl: '',
  /** Socials. Every one of these was a dead link at audit on 2026-09-10 (the
   *  Discord invite returned "Unknown Invite", the GitHub org is not ours).
   *  Set each only once the account genuinely exists. */
  twitterUrl: '',
  discordUrl: '',
  githubUrl: '',
  /** Public contact address (custom domain, forwarded to the team inbox). */
  contactEmail: 'contact@streamerosai.com',
} as const;
