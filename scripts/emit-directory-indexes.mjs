/**
 * Post-build: make the trailing-slash form of every page resolve.
 *
 * The static export writes `about.html`, so GitHub Pages serves `/about` and
 * 404s on `/about/`. Every trailing-slash link into this site was dead —
 * `/blog/`, `/faq/`, `/playbook/`, `/docs/installation/` — and people and
 * tools write that slash constantly. Search Console reported the fallout as
 * "Not found (404)".
 *
 * The first version of this copied the whole page to `about/index.html`. That
 * fixed the 404 and created a second problem: two URLs serving byte-identical
 * content. The canonical consolidated them, but Google still had to fetch both
 * to find that out, which doubled the crawl surface of a site that is already
 * crawl-starved.
 *
 * So the slash form is now a redirect stub instead of a copy — a few hundred
 * bytes carrying rel=canonical plus a meta-refresh, which is the strongest
 * soft-301 GitHub Pages can issue. The URL still resolves for anyone who typed
 * the slash, and a crawler spends almost nothing finding out where the real
 * page lives.
 */
import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const SITE = 'https://streamerosai.com';

// 404.html is served by Pages for missing paths; the verification file must
// stay exactly where Google expects it.
const SKIP = new Set(['404.html', '_not-found.html']);

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_next') continue;
      found.push(...(await walk(full)));
    } else if (entry.name.endsWith('.html')) {
      found.push(full);
    }
  }
  return found;
}

/** The canonical the page declares, so the stub points exactly where it does. */
function canonicalOf(html, fallback) {
  const match = html.match(/rel="canonical" href="([^"]+)"/);
  return match ? match[1] : fallback;
}

function stub(target) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body>This page is at <a href="${target}">${target}</a>.</body></html>
`;
}

async function main() {
  if (!existsSync(OUT)) throw new Error('out/ not found — run `next build` first');

  let written = 0;
  for (const file of await walk(OUT)) {
    const name = path.basename(file);
    if (SKIP.has(name) || name.startsWith('google')) continue;
    if (name === 'index.html') continue;

    const html = await readFile(file, 'utf8');
    // Redirect stubs do not get their own slash form.
    if (html.includes('http-equiv="refresh"')) continue;

    const dir = file.slice(0, -'.html'.length);
    const target = path.join(dir, 'index.html');
    if (existsSync(target)) continue;

    // A file already occupying the directory name would collide; skip it.
    if (existsSync(dir)) {
      const s = await stat(dir);
      if (!s.isDirectory()) continue;
    }

    const route = file.slice(OUT.length).replace(/\\/g, '/').replace(/\.html$/, '');
    await mkdir(dir, { recursive: true });
    await writeFile(target, stub(canonicalOf(html, `${SITE}${route}`)));
    written += 1;
  }
  console.log(`directory indexes: ${written} trailing-slash redirects written`);
}

await main();
