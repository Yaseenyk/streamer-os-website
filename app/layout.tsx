import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const TITLE = 'streamerOS — The Ultra-Lightweight Cockpit for Live Streamers';
const DESCRIPTION =
  'streamerOS is a Rust-powered desktop cockpit for Twitch & YouTube streamers. ' +
  'Automate OBS scenes with the Auto-Hype Director, read your chat’s pulse in real ' +
  'time, and keep every frame for your game — 1.8% CPU, 100% local, zero cloud.';

export const metadata: Metadata = {
  metadataBase: new URL('https://streameros.app'), // TODO: confirm production domain
  title: { default: TITLE, template: '%s · streamerOS' },
  description: DESCRIPTION,
  applicationName: 'streamerOS',
  keywords: [
    'streamerOS', 'live streaming software', 'OBS automation', 'OBS scene switcher',
    'Twitch streaming tools', 'YouTube live tools', 'low CPU streaming software',
    'stream automation', 'local-first streaming app',
  ],
  authors: [{ name: 'streamerOS' }],
  creator: 'streamerOS',
  openGraph: {
    type: 'website',
    siteName: 'streamerOS',
    url: 'https://streameros.app',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'streamerOS' }], // TODO: add /public/og.png
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05070A',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#05070A] text-zinc-100 antialiased selection:bg-cyan-400/30 selection:text-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
