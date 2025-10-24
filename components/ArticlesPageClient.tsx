'use client';

import { usePageVisit } from '@/hooks/usePageVisit';

/**
 * Client component wrapper for Articles page to track visits
 * This component handles the client-side tracking while keeping the main page as a server component
 */
export default function ArticlesPageClient({ children }: { children: React.ReactNode }) {
  // Track articles listing page visits
  usePageVisit('/articles');

  return <>{children}</>;
}
