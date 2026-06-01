// Centralized external links for the marketing site. These are safe
// placeholders — swap them for the real release, checkout, and social URLs
// before launch. Internal routes (e.g. `/download`, `/#pricing`) stay inline
// in the components; only off-site destinations live here.
export const siteConfig = {
  /** Where the "Download v1.0-GA" buttons send people to grab the binary. */
  downloadUrl: 'https://github.com/streamerOS/streamerOS/releases/latest',
  /** Checkout for the $29 one-time Supporter Edition. */
  supporterCheckoutUrl: 'https://streameros.gumroad.com/l/supporter',
  twitterUrl: 'https://twitter.com/streamerOS',
  discordUrl: 'https://discord.gg/streamerOS',
  githubUrl: 'https://github.com/streamerOS/streamerOS',
} as const;
