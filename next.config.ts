import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

// Static export — `next build` emits a fully static site (no Node runtime).
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/streamer-os-website',
  // Let `.md`/`.mdx` files act as routes (App Router docs hub under app/docs).
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Plugins are passed as strings/serializable tuples — required by Turbopack,
// which is the default compiler on Next 16 and can't accept function refs.
// rehype-pretty-code options must stay JSON-serializable (no transformer fns).
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      ['rehype-pretty-code', { theme: 'poimandres', keepBackground: true }],
      ['rehype-autolink-headings', { behavior: 'wrap' }],
    ],
  },
});

export default withMDX(nextConfig);
