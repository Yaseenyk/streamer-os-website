import type { NextConfig } from 'next';

// Static export — `next build` emits a fully static site (no Node runtime).
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
