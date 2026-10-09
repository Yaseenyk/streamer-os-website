import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportChatbot from '@/components/SupportChatbot';
import { PreRegisterProvider } from '@/components/PreRegisterModal';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteConfig } from '@/config/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const TITLE = 'streamerOS | The OBS Studio Companion for Stream Automation';
// Leads with the brand and says plainly what it is: this is the snippet Google
// and AI answer engines quote when someone searches the name, and the name is
// shared by unrelated projects, so the description has to disambiguate.
const DESCRIPTION =
  'streamerOS is a Windows desktop app (not an operating system) for Twitch and YouTube streamers: it automates OBS scenes from live chat and runs on your own PC.';
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
    // Phrases people type at an AI assistant rather than into a search box.
    'local AI chat sentiment for streaming', 'zero-cloud Twitch and YouTube chat analyzer',
    'offline chat sentiment for OBS', 'Rust low-CPU stream automation cockpit',
    'OBS companion app not an operating system',
  ],
  authors: [{ name: 'Yaseen Khatib', url: 'https://github.com/yaseenyk' }],
  creator: 'Yaseen Khatib',
  publisher: 'streamerOS',
  // Homepage self-canonical. Server pages override with their own absolute URL.
  // Note: under `trailingSlash: false` Next normalizes the root canonical to the
  // bare origin, so this always emits `https://streamerosai.com` — keep the
  // sitemap's homepage entry in the same form.
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

// Site-wide entity graph. WebSite, Organization, Person and SoftwareApplication
// live here (the layout wraps every page) so page-level nodes — a BlogPosting's
// publisher, for instance — can reference them by @id and resolve on any page.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      // Google reads the site name shown in results from this node on the
      // homepage. alternateName covers the domain spelling people also search.
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'streamerOS',
      alternateName: ['streamerOS AI', 'streamerosai'],
      url: SITE_URL,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'streamerOS',
      alternateName: 'streamerOS AI',
      url: SITE_URL,
      // A square mark, not the 1200x630 share card — Google shows the logo in a
      // square slot and ignores wide images there.
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-512.png`,
        width: 512,
        height: 512,
      },
      email: siteConfig.contactEmail,
      // Unset URLs drop out rather than emitting an empty string — a 404 or a
      // blank in sameAs is a broken entity link for search engines.
      sameAs: [siteConfig.githubUrl, siteConfig.twitterUrl, siteConfig.discordUrl].filter(Boolean),
      founder: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Yaseen Khatib',
      url: `${SITE_URL}/about`,
      sameAs: ['https://github.com/Yaseenyk', 'https://yaseenkhatib.streamerosai.com/'],
      jobTitle: 'Senior Full-Stack Developer',
      email: siteConfig.contactEmail,
      knowsAbout: ['TypeScript', 'Node.js', 'Systems Architecture', 'OBS WebSocket Protocol'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#application`,
      name: 'streamerOS',
      alternateName: 'streamerOS AI',
      image: `${SITE_URL}/logo-512.png`,
      screenshot: `${SITE_URL}/screenshots/dashboard.png`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Windows 10, Windows 11',
      softwareVersion: '1.0',
      // Pre-launch: the offer is a pre-order and the app is not downloadable
      // yet, so the date and the PreOrder availability below have to agree.
      releaseDate: '2027-02-01',
      softwareRequirements: 'OBS Studio with OBS WebSocket v5; Ollama for the optional local AI features',
      isAccessibleForFree: false,
      description:
        'A Windows desktop companion app for OBS Studio — not an operating system. Local, zero-cloud stream automation and workflow orchestration for live broadcasters, built on OBS WebSocket v5. Version 1.0 launches February 2027.',
      url: SITE_URL,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      // A free 7-day trial, then a one-time $29 licence. Priced as the licence
      // so search results do not advertise the product as free, and it must
      // match /pricing — a mismatch makes the rich result ineligible.
      offers: {
        '@type': 'Offer',
        price: '29.00',
        priceCurrency: 'USD',
        category: 'One-time licence, free 7-day trial',
        availability: 'https://schema.org/PreOrder',
        availabilityStarts: '2027-02-01',
        url: `${SITE_URL}/pricing`,
      },
      // Keep in step with lib/features.ts — the catalog the menus and /features use.
      featureList: [
        'Live Cockpit — chat triage, Super Chat revenue, top chatters and scene control on one screen',
        'Super Chat revenue ledger with per-currency and approximate ₹ totals',
        'Sentiment Horizon — local AI chat mood, including Hinglish',
        'Viral Moments — live hype-spike markers with CSV export',
        'Chat Archive — every stream’s chat saved locally and searchable',
        'OBS Bridge — native OBS WebSocket v5 scene control',
        'Aura Studio and Aura Scene Builder — reactive and custom OBS overlays',
        'Auto-Hype Director — node-based OBS automation from chat velocity and Super Chats',
        'Clip Library — local recordings ranked by hype score',
        'Shorts Factory — 16:9 VODs to vertical 9:16 shorts, encoded locally',
        'AI Sidekick — local Ollama assistant that answers from your stream and acts in OBS',
        'Creator Memory — private on-device vector memory for the assistant',
        'Viral Engine — AI titles, hashtags and thumbnail plans from your chat',
        'Brand Guard — on-device speech recognition for banned sponsor terms',
        'Sponsor CRM and Media Kit Generator',
        '1.8% CPU footprint under a live 1080p60 game',
        'Zero-cloud, local-first privacy (no account, no backend)',
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
        {/* Plausible's documented queue stub. The deferred script above has not
            executed yet when the first signup can fire, so calls are buffered
            here and replayed once it loads — without it, an early conversion is
            silently dropped. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}',
          }}
        />
      </head>
      {/* Browser extensions (password managers, ColorZilla's `cz-shortcut-listen`,
          Grammarly and friends) add attributes to <body> before React hydrates,
          which React then reports as a mismatch. This suppresses the warning for
          this element's own attributes only — one level deep — so a genuine
          mismatch anywhere inside the tree is still reported. */}
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-[#05070A] text-zinc-100 antialiased selection:bg-cyan-400/30 selection:text-white`}
      >
        <PreRegisterProvider>
          <Header />
          {children}
          <Footer />
          <SupportChatbot />
        </PreRegisterProvider>
      </body>
    </html>
  );
}
