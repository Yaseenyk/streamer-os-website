import type { MDXComponents } from 'mdx/types';

// Required by @next/mdx with the App Router. Per-element styling for docs is
// handled by the `prose` wrapper in app/docs/layout.tsx, so this just passes
// components through — extend here to override specific MDX elements globally.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
