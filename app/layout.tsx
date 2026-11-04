import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      description: 'Maker of streamerOS, a Windows desktop companion app for OBS Studio that automates scenes from live chat.',
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
      sameAs: ['https://github.com/Yaseenyk', 'https://yk.streamerosai.com/'],
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
      // Same audience, similar name: keep search engines from merging the entities.
      disambiguatingDescription:
        'streamerOS (streamerosai.com) is an OBS Studio companion app. It is not the StreamOS overlay pack or any other product named StreamOS.',
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
        {/* Google tag (GA4). The bootstrap below runs immediately, so events queue in
            dataLayer; gtag.js and Clarity are injected once by the loader after it. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search)){window.gaEvent=function(){};window.gtag=function(){};return}var w=window,d=document,q=new URLSearchParams(location.search),st=null;try{st=w.localStorage}catch(e){}function g(k){return q.get(k)||''}var ref=g('ref'),hasUtm=!!g('utm_source');var ft=null;try{ft=JSON.parse(st.getItem('ga_ft')||'null')}catch(e){}if(!ft){var rh='';try{rh=d.referrer?new URL(d.referrer).hostname:''}catch(e){}ft={s:g('utm_source')||ref||rh||'direct',m:g('utm_medium')||(ref?'share':(rh?'referral':'none')),c:g('utm_campaign')||(ref?'ref-tag':'(not set)')};try{st.setItem('ga_ft',JSON.stringify(ft))}catch(e){}}w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=gtag;gtag('js',new Date());var cfg={};if(!hasUtm&&ref){cfg.campaign_source=ref;cfg.campaign_medium='share';cfg.campaign_name='ref-tag'}gtag('config','G-9W846YK3FZ',cfg);w.gaEvent=function(n,p){try{p=p||{};p.first_source=ft.s;p.first_medium=ft.m;p.first_campaign=ft.c;p.cta_page=p.cta_page||location.pathname;gtag('event',n,p)}catch(e){}};d.addEventListener('click',function(e){try{var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'',n='';if(/^(https?:)?\\/\\/(wa\\.me|api\\.whatsapp\\.com)|^whatsapp:/i.test(h))n='whatsapp_click';else if(/^mailto:/i.test(h))n='email_click';else if(/^tel:/i.test(h))n='phone_click';else if(/\\.(apk|ipa)([?#]|$)/i.test(h))n='app_download';else if(/\\.md([?#]|$)/i.test(h))n='template_download';var u=h;if(!n&&h!=='#'){var o=null;try{o=new URL(h,location.href)}catch(x){}if(o&&o.origin===location.origin){n=a.closest('header,nav')?'nav_click':(a.closest('footer')?'footer_click':'internal_link_click');u=o.pathname}}if(n)w.gaEvent(n,{cta_text:(a.textContent||'').trim().slice(0,60),link_url:u.slice(0,100)});}catch(x){}},true);})();",
          }}
        />
        {/* One loader for gtag.js and Microsoft Clarity (heatmaps and replay; forms carry
            data-clarity-mask, so typed text is hidden). It injects both once, at the first
            of: a user interaction, 2 s after load plus idle time, or 4 s after load. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search)){window.gaEvent=function(){};window.gtag=function(){};return}var w=window,d=document,x=0;function go(){if(x)return;x=1;var s=d.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id=G-9W846YK3FZ';d.head.appendChild(s);(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(w,d,'clarity','script','z8avowdpj1')}['pointerdown','keydown','scroll','touchstart'].forEach(function(e){w.addEventListener(e,go,{once:true,passive:true})});function idle(){setTimeout(function(){if(w.requestIdleCallback)w.requestIdleCallback(go,{timeout:1500});else go()},2000);setTimeout(go,4000)}if(d.readyState==='complete')idle();else w.addEventListener('load',idle)})();",
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
        </PreRegisterProvider>
      </body>
    </html>
  );
}
