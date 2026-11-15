import type { Metadata } from 'next';
import Link from 'next/link';
import ContactFormWrapper from '@/components/ContactFormWrapper';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact the developer of streamerOS: email or form, what to include in a bug report, ' +
    'and how licensing, privacy and correction requests are handled.',
  alternates: { canonical: 'https://streamerosai.com/contact' },
};

const H2 = 'text-lg font-semibold text-zinc-100';
const P = 'mt-2 text-sm leading-relaxed text-zinc-400';
const LI = 'mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-400';
const A = 'text-cyan-400 hover:underline';

export default function ContactPage() {
  return (
    <ContactFormWrapper>
      <section className="mt-14 space-y-8">
        <div>
          <h2 className={H2}>Who answers</h2>
          <p className={P}>
            One person. streamerOS has no company support desk, so messages are read
            and answered by the developer, Yaseen Khatib, when he is at his desk in
            India (UTC+5:30). There is no promised response time; if you have not
            heard back after a week, write again, because spam filters do eat
            replies. Everything is also described on the{' '}
            <Link href="/about" className={A}>
              About page
            </Link>
            .
          </p>
        </div>
        <div>
          <h2 className={H2}>What to write about</h2>
          <ul className={LI}>
            <li>
              <strong className="text-zinc-200">Pricing, licensing and refunds.</strong>{' '}
              The{' '}
              <Link href="/pricing" className={A}>
                pricing page
              </Link>{' '}
              and the{' '}
              <Link href="/faq" className={A}>
                FAQ
              </Link>{' '}
              answer most of these; write if yours is not there.
            </li>
            <li>
              <strong className="text-zinc-200">Bug reports.</strong> Say what you
              did, what you expected, what happened, your Windows version and OBS
              version, and whether it is the live demo or a pre-release build. A
              screenshot helps.
            </li>
            <li>
              <strong className="text-zinc-200">A mistake in a guide.</strong> Send
              the page address and the line that is wrong. Corrections are made to
              the page itself.
            </li>
            <li>
              <strong className="text-zinc-200">Privacy requests.</strong> To remove
              a pre-registration or ask what is held about you, write from the email
              address in question. See the{' '}
              <Link href="/privacy" className={A}>
                privacy policy
              </Link>
              .
            </li>
            <li>
              <strong className="text-zinc-200">Beta access.</strong> Working
              streamers can apply on the{' '}
              <Link href="/streamers" className={A}>
                Founding Streamers page
              </Link>
              .
            </li>
          </ul>
        </div>
        <div>
          <h2 className={H2}>Direct email</h2>
          <p className={P}>
            <a href={`mailto:${siteConfig.contactEmail}`} className={A}>
              {siteConfig.contactEmail}
            </a>{' '}
            reaches the same inbox as the form. The form is delivered through
            EmailJS; see the privacy policy for what happens to what you send. The
            developer will not ask for passwords, payment card details or licence
            keys by email.
          </p>
        </div>
      </section>
    </ContactFormWrapper>
  );
}
