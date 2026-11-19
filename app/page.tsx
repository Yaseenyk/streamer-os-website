import type { Metadata } from 'next';
import HomeContent from './home-content';
import { SITE_URL } from '@/config/site';

// Since 19 Nov 2026 the home page is the guides hub; the unreleased app has one
// labelled section on it, and the title and description say so. No page-level
// structured data: the WebSite, Organization and SoftwareApplication nodes in
// the root layout describe the brand and the app.
const TITLE = 'streamerOS: Free OBS and Streaming Guides for Twitch and YouTube';
const DESCRIPTION =
  'Free guides for Twitch and YouTube streamers: OBS settings, dropped frames, scene switching, chat, clips and sponsorships, plus a playbook, glossary and docs.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'streamerOS Blog' }] },
  },
  openGraph: {
    type: 'website',
    siteName: 'streamerOS',
    locale: 'en_US',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/og-image-1200x630.png`, width: 1200, height: 630, alt: 'streamerOS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image-1200x630.png`],
  },
};

export default function Home() {
  return <HomeContent />;
}
