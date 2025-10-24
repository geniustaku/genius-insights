'use client';

import { usePageVisit } from '@/hooks/usePageVisit';

/**
 * Client component wrapper for individual Article pages to track visits
 * This tracks each article separately so you can see which specific articles are most popular
 */
export default function ArticlePageClient({
  slug,
  children
}: {
  slug: string;
  children: React.ReactNode
}) {
  // Track individual article page visits with the full path
  usePageVisit(`/articles/${slug}`);

  return <>{children}</>;
}
