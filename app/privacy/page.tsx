import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'streamerOS runs on your machine. We do not collect your chat, audio or ' +
    'stream data. Every network connection the app and this website make, listed.',
  alternates: { canonical: 'https://streamerosai.com/privacy' },
};

const H2 = 'text-xl font-semibold text-zinc-100';
const H3 = 'mt-6 text-base font-semibold text-zinc-200';
const P = 'mt-3 leading-relaxed text-zinc-400';
const LI = 'mt-3 list-disc space-y-2 pl-5 text-zinc-400';

// Every connection below was checked against the product source on 2026-09-11.
// If a feature gains a new outbound connection, it goes on this page in the same
// change — a privacy page that misses one is worse than one that lists too many.
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: November 24, 2026</p>

      <p className="mt-5 leading-relaxed text-zinc-300">
        Every claim on this page can be checked from outside the app — the{' '}
        <Link href="/trust" className="text-cyan-400 hover:underline">
          trust page
        </Link>{' '}
        explains how to verify each one on your own PC.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className={H2}>Zero-cloud by architecture</h2>
          <p className={P}>
            streamerOS runs on your computer. We do not operate servers that
            receive your chat, your microphone audio, your stream telemetry or your
            OBS configuration, so we never collect or store any of it.
          </p>
          <p className={P}>
            This is how the software is built rather than a setting we could
            quietly flip: there is no streamerOS account, no cloud backend, and no
            analytics SDK, telemetry or crash reporter inside the application.
          </p>
        </section>

        <section>
          <h2 className={H2}>What the app keeps — and where</h2>
          <p className={P}>
            Everything below stays in the streamerOS data folder and the workspace
            folder you choose, on your own drive:
          </p>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Chat Archive</strong> — the public
              chat of streams you monitor, including viewers&apos; display names and
              messages, so you can search it later. You can redact a message or
              delete a whole stream at any time.
            </li>
            <li>
              <strong className="text-zinc-200">Stream history</strong> — chat
              velocity, sentiment and Super Chat records used by the cockpit, Clip
              Library and reports.
            </li>
            <li>
              <strong className="text-zinc-200">Your settings and work</strong> —
              automation rules, overlays and imported assets, sponsor leads, AI
              memories you ask the sidekick to keep, and any analytics exports you
              import.
            </li>
            <li>
              <strong className="text-zinc-200">Microphone audio</strong> — only
              while Brand Guard is running, processed in memory and discarded.
              Audio is written to disk only if you switch on audit recording for
              that session.
            </li>
            <li>
              <strong className="text-zinc-200">A YouTube Data API key</strong>, if
              you add one, is stored in Windows Credential Manager rather than in a
              file.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={H2}>Every network connection the app makes</h2>
          <p className={P}>
            None of these send your chat, audio or personal data to us. Most only
            happen because you switched a feature on.
          </p>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Twitch chat</strong> — when you
              monitor a Twitch channel, the app opens an anonymous, read-only
              connection to Twitch chat. No credentials are sent or stored.
            </li>
            <li>
              <strong className="text-zinc-200">YouTube chat</strong> — read from
              the YouTube page already open in your own browser, on your PC. The app
              itself does not connect to YouTube for chat.
            </li>
            <li>
              <strong className="text-zinc-200">YouTube Data API</strong> — only if
              you add your own API key and channel ID. The app requests your
              channel&apos;s public statistics, such as subscriber count, from Google.
            </li>
            <li>
              <strong className="text-zinc-200">AI model downloads</strong> — local
              AI models are downloaded by Ollama when you choose to install one, and
              Brand Guard downloads its speech-recognition model (about 140 MB) from
              Hugging Face once, when you click download. Neither sends data about
              you.
            </li>
            <li>
              <strong className="text-zinc-200">Google Fonts</strong> — only when an
              Aura Scene overlay uses a Google font, the font files are loaded from
              Google by the editor and by OBS.
            </li>
            <li>
              <strong className="text-zinc-200">Discord webhooks</strong> — only if
              you add a Discord action to an automation rule. The app posts the
              message you wrote to your own Discord webhook.
            </li>
            <li>
              <strong className="text-zinc-200">Update checks</strong> — only if you
              opt in, the app checks whether a newer version exists.
            </li>
          </ul>
          <p className={P}>
            Licensing needs no connection at all. You buy in your browser, and the
            key is verified offline against your PC&apos;s Installation ID — an
            anonymous code derived on your machine that is safe to share. The
            hardware identifier it is derived from never leaves the computer.
          </p>
        </section>

        <section>
          <h2 className={H2}>This website</h2>
          <p className={P}>
            streamerosai.com is a static site. It currently shows no advertisements and
            sets no advertising cookies. These services are involved when you use it:
          </p>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Plausible Analytics</strong> —
              counts page visits and sign-ups in aggregate, without cookies and
              without collecting personal data.
            </li>
            <li>
              <strong className="text-zinc-200">Google Analytics</strong> —
              measures how visitors find and use the site. It sets first-party
              analytics cookies and sends usage data, such as pages viewed and
              approximate location, to Google. We don&apos;t use it for advertising.
              Google signals is switched on: for visitors who are signed in to a
              Google account with ad personalisation on, Google may associate this
              site&apos;s visit data with that account to give us aggregated reports on
              age group, gender and interests (no individual is identified to us).
              You can turn this off in your Google account under Data &amp; privacy, or
              in{' '}
              <a href="https://myadcenter.google.com/" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
                My Ad Center
              </a>
              . You can block it with a browser extension, by disabling cookies, or
              with Google&apos;s{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
                opt-out add-on
              </a>
              .
            </li>
            <li>
              <strong className="text-zinc-200">Microsoft Clarity</strong> —
              a free tool that records session replays and heatmaps (mouse
              movement, clicks and scrolling) so we can see where visitors get
              stuck. Text typed into forms is masked and is not recorded. We
              don&apos;t use it for advertising. Microsoft explains how it handles
              this data in the{' '}
              <a href="https://privacy.microsoft.com/privacystatement" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
                Microsoft privacy statement
              </a>
              .
            </li>
            <li>
              <strong className="text-zinc-200">A first-party visit counter</strong>{' '}
              (a small script served from pulse.yaseenyk.workers.dev, a Cloudflare
              Worker run by the site owner, named &ldquo;pulse&rdquo;) — records the
              page viewed (without the query string), the referring site and
              campaign tags, country, device type, browser and system name, screen
              size, language, the name of your network provider, scroll depth, time
              on the page, page speed, which links and buttons were clicked and,
              when a form is sent, the form&apos;s name only (never what you typed),
              so we can tell real readers from automated traffic. Since 24 November
              2026 it also records a few technical details that show when a page is
              broken or slow: up to three script error messages per page (the
              message, the script file and the line), whether your browser translated
              the page and into which language, your connection type (such as 4g or
              3g), how fast the page responded to a tap or click, how much the layout
              jumped while loading, and the name of a form that was sent or started
              but not sent (never what you typed). It sets no
              cookies and does not store your IP address or browser user-agent
              string: the IP address is used in memory only, to limit abuse and to
              make a visitor code that changes every day (a one-way hash with a
              random salt that is deleted the next day), so visits cannot be linked
              across days. It switches itself off if your browser sends Do Not
              Track or Global Privacy Control, and rows older than 90 days are
              deleted automatically.
            </li>
            <li>
              <strong className="text-zinc-200">Pre-registration and the contact
              form</strong> — what you submit, such as your email address and
              message, is saved in the site owner&apos;s own database (a Cloudflare
              Worker and D1 database he runs, pulse.yaseenyk.workers.dev), together
              with where your visit came from (the page you sent it from and the
              referring site or campaign the visit counter noted for that browser
              tab). Only he can read it. Messages are kept for up to 24 months (spam
              for 30 days) and deleted sooner if you ask at{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-cyan-400 hover:underline">
                {siteConfig.contactEmail}
              </a>
              . A copy is also emailed to our inbox through EmailJS as a
              notification. We use it only to reply and to tell you when streamerOS
              launches.
            </li>
            <li>
              <strong className="text-zinc-200">The support chat</strong> —
              questions you type into the chat widget are sent to our support
              service, which uses Google&apos;s AI to search our documentation and
              OpenAI to write the answer. Please don&apos;t type personal or
              sensitive information into it.
            </li>
          </ul>
          <h3 className={H3}>Your choices</h3>
          <p className={P}>
            To remove your pre-registration or ask what we hold about you, write to
            us through the{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              contact page
            </Link>{' '}
            and we will delete it.
          </p>
        </section>

        <section>
          <h2 className={H2}>Cookies and similar storage</h2>
          <p className={P}>
            Google Analytics sets first-party cookies (for example <code>_ga</code>)
            to tell visits apart, and Microsoft Clarity sets its own cookies
            (<code>_clck</code>, <code>_clsk</code>) to link the pages of one visit,
            plus Microsoft cookies on clarity.ms and bing.com (such as{' '}
            <code>MUID</code>). The site also keeps a small label in your
            browser&apos;s local storage recording the first source that sent you here
            (for example a search engine or a link), used only in aggregate reports.
            Plausible and the visit counter use no cookies. Analytics scripts do not
            load on localhost, and they load only after the page has finished, so
            they never block reading. You can clear or block cookies in your browser
            settings at any time; the site works the same without them.
          </p>
        </section>

        <section>
          <h2 className={H2}>Advertising and Google AdSense</h2>
          <p className={P}>
            There are no ads on this website today. The site owner intends to show ads
            served by Google AdSense if Google approves the site, and this policy
            will be updated at the same time any ads appear.
            The streamerOS application itself never shows ads and never will.
          </p>
          <p className={P}>
            If ads are switched on, Google and its partners use cookies and similar
            technologies to serve and measure ads, and may use them to show
            personalised ads based on your visits to this and other sites. In the
            European Economic Area, the United Kingdom and Switzerland, personalised
            ads are shown only with your consent. You can opt out of personalised
            advertising at any time:
          </p>
          <ul className={LI}>
            <li>
              In{' '}
              <a href="https://adssettings.google.com" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
                Google Ad Settings
              </a>
              , where you can turn off personalised ads for your Google account and
              browser.
            </li>
            <li>
              Through{' '}
              <a href="https://www.aboutads.info/choices/" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
                aboutads.info/choices
              </a>{' '}
              or{' '}
              <a href="https://www.youronlinechoices.com" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
                youronlinechoices.com
              </a>{' '}
              to opt out of interest-based ads from many providers at once.
            </li>
            <li>
              By blocking third-party cookies in your browser. Non-personalised ads
              may still appear.
            </li>
          </ul>
          <p className={P}>
            How Google uses data from sites that use its services is explained at{' '}
            <a href="https://policies.google.com/technologies/partner-sites" className="text-cyan-400 hover:underline" rel="noopener noreferrer">
              policies.google.com/technologies/partner-sites
            </a>
            . Google Analytics is used for measurement only, not to target ads.
          </p>
        </section>

        <section>
          <h2 className={H2}>How long we keep things</h2>
          <p className={P}>
            Pre-registration emails and contact messages are kept for up to 24
            months (spam for 30 days), or until you ask for them to be deleted if
            that comes first. The visit counter deletes its rows after 90 days. Google
            Analytics and Microsoft Clarity keep data under their own retention
            settings, which we do not control beyond the options those tools offer.
            The site is not directed at children under 13 and does not knowingly
            collect their data.
          </p>
        </section>

        <section>
          <h2 className={H2}>Your rights</h2>
          <p className={P}>
            Depending on where you live, including under the GDPR in Europe and
            India&apos;s Digital Personal Data Protection Act, you can ask what we
            hold about you, ask for it to be corrected or deleted, and withdraw
            consent. Write to the address below from the email address concerned.
            Most requests are simple to meet because the only personal data we hold
            on purpose is the email and message you chose to send.
          </p>
        </section>

        <section>
          <h2 className={H2}>Who is responsible</h2>
          <p className={P}>
            streamerosai.com is run by Yaseen Khatib, an independent developer based
            in Hyderabad, India, trading as streamerOS.
          </p>
        </section>

        <section>
          <h2 className={H2}>Contact</h2>
          <p className={P}>
            Questions about this policy? Write to{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-cyan-400 hover:underline">
              {siteConfig.contactEmail}
            </a>{' '}
            or use the{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
