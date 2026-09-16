import HomeContent from './home-content';

// No page-level structured data here. The homepage used to declare itself a
// ProfilePage about the founder, which told search engines the site's front
// page is a person's profile rather than the product. The WebSite, Organization
// and SoftwareApplication nodes in the root layout describe it correctly.
export default function Home() {
  return <HomeContent />;
}
