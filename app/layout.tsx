import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { PreRegisterProvider } from '@/components/PreRegisterModal';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// Production canonical origin (GitHub Pages project site, served under a subpath).
const SITE_URL = 'https://yaseenyk.github.io/streamer-os-website';

const TITLE = 'streamerOS — The Ultra-Lightweight Cockpit for Live Streamers';
const DESCRIPTION =
  'streamerOS is a Rust-powered desktop cockpit for Twitch & YouTube streamers. ' +
  'Automate OBS scenes with the Auto-Hype Director, read your chat’s pulse in real ' +
  'time, and keep every frame for your game — 1.8% CPU, 100% local, zero cloud.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  // Homepage self-canonical. Server pages override with their own absolute URL.
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: 'streamerOS',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05070A',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'streamerOS',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows 10, Windows 11',
  softwareVersion: '1.0',
  description: DESCRIPTION,
  url: SITE_URL,
  // Free and open source; the $29 Supporter Edition is an optional one-time purchase.
  offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
  featureList: [
    'Auto-Hype Director — node-based OBS scene automation',
    '1.8% CPU footprint under a live 1080p60 game',
    'Zero-cloud, local-first privacy (no account, no backend)',
    'Native OBS WebSocket v5 scene control',
    'Real-time Twitch and YouTube chat velocity and sentiment',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          defer
          data-domain="yaseenyk.github.io/streamer-os-website"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-[#05070A] text-zinc-100 antialiased selection:bg-cyan-400/30 selection:text-white`}
      >
        <PreRegisterProvider>
          <Header />
          {children}
          <Footer />
          <FloatingContact />
        </PreRegisterProvider>
      </body>
    </html>
  );
}
