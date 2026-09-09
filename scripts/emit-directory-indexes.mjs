/**
 * Post-build: serve the trailing-slash form of every page.
 *
 * The static export writes `about.html`, so GitHub Pages serves `/about` and
 * 404s on `/about/`. Every trailing-slash link into this site was dead —
 * `/blog/`, `/faq/`, `/playbook/`, `/docs/installation/` — and people and
 * tools write that slash constantly. Search Console reported the fallout as
 * "Not found (404)".
 *
 * Copying `about.html` to `about/index.html` makes both forms return 200. The
 * pages already carry an absolute rel=canonical pointing at the non-slash URL,
 * so the pair consolidates instead of competing.
 */
import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
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

async function main() {
  if (!existsSync(OUT)) throw new Error('out/ not found — run `next build` first');

  let written = 0;
  for (const file of await walk(OUT)) {
    const name = path.basename(file);
    if (SKIP.has(name) || name.startsWith('google')) continue;
    if (name === 'index.html') continue;

    const dir = file.slice(0, -'.html'.length);
    const target = path.join(dir, 'index.html');
    if (existsSync(target)) continue;

    // A file already occupying the directory name would collide; skip it.
    if (existsSync(dir)) {
      const s = await stat(dir);
      if (!s.isDirectory()) continue;
    }

    await mkdir(dir, { recursive: true });
    await writeFile(target, await readFile(file));
    written += 1;
  }
  console.log(`directory indexes: ${written} trailing-slash pages written`);
}

await main();
