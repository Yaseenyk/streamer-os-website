/**
 * The person who builds streamerOS. Linked from the footer on every page and
 * from the About page.
 *
 * This file used to carry deep links to the engineering write-ups behind the
 * performance claims. Those posts have been retired, so the links went with
 * them rather than being left pointing at replacements that do not explain
 * the numbers on this site.
 */
export const BUILDER = {
  name: 'Yaseen Khatib',
  url: 'https://yaseenkhatib.streamerosai.com/',
  // Deep links to the builder's key pages. Contextual links to a related site
  // on the same registrable domain give crawlers real paths to those pages and
  // consolidate the shared-domain signal — both genuinely relevant to this
  // site's developer audience.
  hireUrl: 'https://yaseenkhatib.streamerosai.com/hire/',
  journeyUrl: 'https://yaseenkhatib.streamerosai.com/final-year-projects/journey/',
} as const;
