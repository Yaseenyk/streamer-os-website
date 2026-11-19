import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// Posts live as markdown under content/blog and are read at build time only —
// this site is a static export, so there is no request-time filesystem access.
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Set when a post is substantively revised; drives dateModified and sitemap lastmod. */
  updated?: string;
  author: string;
  tags: string[];
  /** Optional per-post social card, e.g. "/blog-og/chat-velocity.png". Falls
   *  back to the site-wide image, since a post that sets `openGraph` without
   *  images inherits none from the layout and would otherwise share unillustrated. */
  image?: string;
  /** Set on a post that overlaps a stronger one (19 Nov 2026 overlap pass). The
   *  page stays live but is noindex,follow, shows a "see also" note pointing at
   *  this slug, and is left out of the blog index, feed, sitemap and related links. */
  seeAlso?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export async function getPostSlugs(): Promise<string[]> {
  const files = await readdir(BLOG_DIR);
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const raw = await readFile(path.join(BLOG_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      updated: data.updated,
      author: data.author,
      tags: data.tags ?? [],
      seeAlso: typeof data.seeAlso === 'string' && data.seeAlso ? data.seeAlso : undefined,
      // Per-post card from scripts/emit-og-images.mjs, when it has been generated.
      image:
        data.image ??
        (existsSync(path.join(process.cwd(), 'public', 'blog-og', `${slug}.png`))
          ? `/blog-og/${slug}.png`
          : undefined),
    },
    content,
  };
}

// Indexable post metadata, newest first: the blog index, feed, sitemap and
// related-post links. Posts with `seeAlso` (noindexed overlaps) are left out;
// their pages are still generated from getPostSlugs().
export async function getAllPostMeta(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .map((post) => post.meta)
    .filter((meta) => !meta.seeAlso)
    .sort((a, b) => b.date.localeCompare(a.date));
}
