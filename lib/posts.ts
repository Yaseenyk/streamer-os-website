import { readFile, readdir } from 'node:fs/promises';
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
  author: string;
  tags: string[];
  /** Optional per-post social card, e.g. "/blog-og/chat-velocity.png". Falls
   *  back to the site-wide image, since a post that sets `openGraph` without
   *  images inherits none from the layout and would otherwise share unillustrated. */
  image?: string;
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
      author: data.author,
      tags: data.tags ?? [],
      image: data.image,
    },
    content,
  };
}

// All post metadata, newest first — used by the blog index.
export async function getAllPostMeta(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}
