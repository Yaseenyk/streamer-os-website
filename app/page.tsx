import JsonLd from '@/components/JsonLd';
import HomeContent from './home-content';

// Creator profile page. The Organization, Person, and SoftwareApplication
// nodes live globally in the root layout graph; this just marks the homepage
// as the creator's profile page and points at the shared Person by @id.
const creatorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://streamerosai.com/#creator',
  mainEntity: { '@id': 'https://streamerosai.com/#person' },
};

export default function Home() {
  return (
    <>
      <JsonLd data={creatorJsonLd} />
      <HomeContent />
    </>
  );
}
