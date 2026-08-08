/**
 * Post-build guard: every URL in the emitted sitemap must correspond to a real
 * file in ./out, and nothing in the sitemap may be noindex'd.
 *
 * Why this exists: `/docs` and `/docs/installation` were advertised in
 * sitemap.xml but 404'd in production for a month. They built fine locally, so
 * nothing caught it — the CI Pages action was shadowing next.config.ts with a
 * generated next.config.js, which dropped `pageExtensions` and made the two
 * `page.mdx` routes vanish from the export. Serving 404s from your own sitemap
 * is a direct trust hit, so the build now fails loudly instead.
 *
 * Runs as part of `npm run build`.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");
const SITEMAP = join(OUT, "sitemap.xml");

if (!existsSync(SITEMAP)) {
  console.error("verify-sitemap: out/sitemap.xml is missing — did the export run?");
  process.exit(1);
}

const xml = readFileSync(SITEMAP, "utf-8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (locs.length === 0) {
  console.error("verify-sitemap: sitemap.xml contains no <loc> entries.");
  process.exit(1);
}

/**
 * Map a public URL to the static file that GitHub Pages would serve for it.
 * Handles both export conventions: `about.html` (trailingSlash: false) and
 * `about/index.html` (trailingSlash: true).
 */
function candidatesFor(url) {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  if (path === "") return [join(OUT, "index.html")];
  return [join(OUT, `${path}.html`), join(OUT, path, "index.html")];
}

const missing = [];
const noindexed = [];

for (const url of locs) {
  const found = candidatesFor(url).find(existsSync);
  if (!found) {
    missing.push(url);
    continue;
  }
  // A sitemap is a list of pages you want indexed. Shipping a noindex'd URL in
  // it sends Google two contradictory instructions about the same page.
  const html = readFileSync(found, "utf-8");
  if (/<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    noindexed.push(url);
  }
}

if (missing.length === 0 && noindexed.length === 0) {
  console.log(`verify-sitemap: OK — all ${locs.length} sitemap URLs resolve and are indexable.`);
  process.exit(0);
}

if (missing.length > 0) {
  console.error(`\nverify-sitemap: ${missing.length} sitemap URL(s) have no file in ./out:`);
  for (const url of missing) console.error(`  404  ${url}`);
}
if (noindexed.length > 0) {
  console.error(`\nverify-sitemap: ${noindexed.length} sitemap URL(s) are marked noindex:`);
  for (const url of noindexed) console.error(`  noindex  ${url}`);
}
console.error("\nBuild failed. Fix the routes above or drop them from app/sitemap.ts.\n");
process.exit(1);
