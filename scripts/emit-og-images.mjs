/**
 * Pre-build: render a 1200x630 social card per blog post into
 * public/blog-og/<slug>.png. lib/posts.ts picks the card up when it exists, so
 * a shared post shows its own title instead of the one site-wide image.
 * Generated files are gitignored and rebuilt on every build.
 */
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const OUT_DIR = path.join(process.cwd(), 'public', 'blog-og');
mkdirSync(OUT_DIR, { recursive: true });

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap; at most `maxLines`, the last one ellipsised if needed. */
function wrap(text, maxChars, maxLines) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}

function card(title, tag) {
  const lines = wrap(title, 30, 4);
  const size = lines.length > 3 ? 58 : 66;
  const startY = 315 - ((lines.length - 1) * size * 1.18) / 2;
  const text = lines
    .map((l, i) => `<text x="80" y="${startY + i * size * 1.18}" font-size="${size}" font-weight="700" fill="#f4f4f5">${escape(l)}</text>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#a855f7"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0" r="0.8">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.18"/><stop offset="1" stop-color="#05070A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#05070A"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="90" width="120" height="6" rx="3" fill="url(#g)"/>
  <g font-family="Inter, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif">
    <text x="80" y="150" font-size="26" letter-spacing="4" fill="#22d3ee">${escape(tag.toUpperCase())}</text>
    ${text}
    <text x="80" y="560" font-size="30" font-weight="700" fill="#f4f4f5">streamer<tspan fill="#22d3ee">OS</tspan></text>
    <text x="1120" y="560" font-size="24" fill="#a1a1aa" text-anchor="end">streamerosai.com/blog</text>
  </g>
</svg>`;
}

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
for (const file of files) {
  const { data } = matter(readFileSync(path.join(BLOG_DIR, file), 'utf8'));
  const tag = (data.tags ?? []).find((t) => t !== 'Guides') ?? 'Guide';
  await sharp(Buffer.from(card(String(data.title), String(tag))))
    .png()
    .toFile(path.join(OUT_DIR, file.replace(/\.md$/, '.png')));
}
console.log(`og images: ${files.length} cards written to public/blog-og/`);
