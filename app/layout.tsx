import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import SupportChatbot from '@/components/SupportChatbot';
import { PreRegisterProvider } from '@/components/PreRegisterModal';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteConfig } from '@/config/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const TITLE = 'streamerOS | The OBS Studio Companion for Stream Automation';
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
    'streamerOS', 'OBS companion app', 'OBS Studio automation', 'OBS automation',
    'automatic OBS scene switcher', 'OBS WebSocket app', 'live streaming software',
    'Twitch streaming tools', 'YouTube live tools', 'low CPU streaming software',
    'stream automation', 'local-first streaming app', 'Twitch clip finder',
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

// Site-wide entity graph. Organization, Person, and SoftwareApplication live
// here (the layout wraps every page) so page-level nodes — BlogPosting
// publisher, homepage ProfilePage — can reference them by @id and resolve on
// any page.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'streamerOS',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image-1200x630.png`,
        width: 1200,
        height: 630,
      },
      email: siteConfig.contactEmail,
      sameAs: [siteConfig.githubUrl, siteConfig.twitterUrl, siteConfig.discordUrl],
      founder: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Yaseen Khatib',
      jobTitle: 'Senior Full-Stack Developer',
      email: siteConfig.contactEmail,
      knowsAbout: ['TypeScript', 'Node.js', 'Systems Architecture', 'OBS WebSocket Protocol'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#application`,
      name: 'streamerOS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows',
      softwareVersion: '1.0',
      description:
        'A high-performance, zero-cloud OBS Studio companion app: local stream automation and workflow orchestration for live broadcasters, built on OBS WebSocket v5.',
      url: SITE_URL,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      // Free and open source; the $29 Supporter Edition is an optional one-time purchase.
      offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      featureList: [
        'Auto-Hype Director — node-based OBS scene automation',
        '1.8% CPU footprint under a live 1080p60 game',
        'Zero-cloud, local-first privacy (no account, no backend)',
        'Native OBS WebSocket v5 scene control',
        'Real-time Twitch and YouTube chat velocity and sentiment',
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={jsonLd} />
        <script
          defer
          data-domain="streamerosai.com"
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
