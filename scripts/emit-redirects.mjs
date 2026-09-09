/**
 * Post-build: write redirect stubs for retired blog URLs.
 *
 * Thirteen posts were written for people who already had streamerOS - every
 * slug contained the product name, so the only way to search for one was to
 * know the product first. Consolidating them into fewer pages written for the
 * query people actually type means the old URLs must go somewhere rather than
 * 404 for anyone who bookmarked or linked them.
 *
 * GitHub Pages cannot issue a 301, so each stub is rel=canonical plus a
 * meta-refresh - the strongest soft redirect available here. Stubs are kept out
 * of the sitemap deliberately.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const SITE = 'https://streamerosai.com';

/** old slug -> the post that replaced it */
export const BLOG_REDIRECTS = {
  'autodiscover-and-connect-obs-in-streameros-windows-guide': 'obs-websocket-setup-guide',
  'connect-streameros-to-obs-over-websocket-v5-windows': 'obs-websocket-setup-guide',
  'control-obs-studio-from-streameros-with-obs-websocket-v5': 'obs-websocket-setup-guide',
  'automate-obs-studio-for-twitch-with-streameros-no-plugins': 'auto-switch-obs-scenes-guide',
  'how-to-auto-switch-obs-scenes-on-twitch-with-streameros': 'auto-switch-obs-scenes-guide',
  'switch-obs-scenes-from-streameros-no-alt-tab-needed': 'auto-switch-obs-scenes-guide',
  'run-obs-scene-automation-on-a-lowend-streaming-pc-streameros': 'obs-automation-on-a-low-end-pc',
  'set-up-ollama-on-windows-for-streameros-local-ai-fast-guide': 'run-ollama-on-windows-guide',
  'fixing-the-ollama-offline-banner': 'run-ollama-on-windows-guide',
  'how-to-auto-clip-twitch-highlights-locally-with-streameros': 'auto-clip-twitch-highlights',
  'configure-streameros-workspace-exports-and-vod-folders': 'streaming-workspace-folder-setup',
  'setting-up-your-live-cockpit': 'streaming-workspace-folder-setup',
  'install-streameros-on-windows-and-go-live-ready-in-minutes': 'streaming-workspace-folder-setup',
};

let written = 0;
for (const [from, to] of Object.entries(BLOG_REDIRECTS)) {
  const target = `${SITE}/blog/${to}`;
  if (!existsSync(path.join(OUT, 'blog', `${to}.html`))) {
    throw new Error(`redirect target missing from ./out: ${from} -> ${to}`);
  }

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body>This page moved to <a href="${target}">${target}</a>.</body></html>
`;

  // Both URL shapes, since the export serves /blog/x and /blog/x/.
  writeFileSync(path.join(OUT, 'blog', `${from}.html`), html);
  mkdirSync(path.join(OUT, 'blog', from), { recursive: true });
  writeFileSync(path.join(OUT, 'blog', from, 'index.html'), html);
  written += 1;
}

console.log(`redirects: ${written} stubs written`);
