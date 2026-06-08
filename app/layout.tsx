import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import SupportChatbot from '@/components/SupportChatbot';
import { PreRegisterProvider } from '@/components/PreRegisterModal';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// Production canonical origin (GitHub Pages project site, served under a subpath).
const SITE_URL = 'https://yaseenyk.github.io/streamer-os-website';

const TITLE = 'streamerOS | Local-First Stream Automation';
const DESCRIPTION =
  'Ultra-low latency, zero-cloud stream automation and workflow orchestration built natively for OBS Studio.';
// Punchier social-share copy, kept distinct from the page-level description.
const OG_DESCRIPTION =
  'Slash automation latency and reclaim your frames with zero-cloud OBS orchestration.';

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
  authors: [{ name: 'Yaseen Khatib', url: 'https://github.com/yaseenyk' }],
  creator: 'Yaseen Khatib',
  publisher: 'streamerOS',
  // Homepage self-canonical. Server pages override with their own absolute URL.
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: 'streamerOS',
    locale: 'en_US',
    url: SITE_URL,
    title: TITLE,
    description: OG_DESCRIPTION,
    images: [
      { url: `${SITE_URL}/og-image-1200x630.png`, width: 1200, height: 630, alt: 'streamerOS' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image-1200x630.png`],
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
  '@id': `${SITE_URL}/#application`,
  name: 'streamerOS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows',
  softwareVersion: '1.0',
  description:
    'A high-performance, zero-cloud desktop local automation framework for live broadcasters optimizing OBS Studio performance.',
  url: SITE_URL,
  // Authored by the creator described in the homepage ProfilePage graph.
  author: { '@id': `${SITE_URL}/#person` },
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
          <SupportChatbot />
        </PreRegisterProvider>
      </body>
    </html>
  );
}
