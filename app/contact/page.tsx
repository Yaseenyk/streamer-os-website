import type { Metadata } from 'next';
import ContactFormWrapper from '@/components/ContactFormWrapper';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the streamerOS team — questions about the Supporter ' +
    'Edition, bug reports, or anything else. We read everything.',
  alternates: { canonical: 'https://yaseenyk.github.io/streamer-os-website/contact' },
};

export default function ContactPage() {
  return <ContactFormWrapper />;
}
