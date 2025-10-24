'use client';

import { usePageVisit } from '@/hooks/usePageVisit';

/**
 * Client component wrapper for Home page to track visits
 */
export default function HomePageClient({
  children
}: {
  children: React.ReactNode
}) {
  // Track home page visits
  usePageVisit('/');

  return <>{children}</>;
}
