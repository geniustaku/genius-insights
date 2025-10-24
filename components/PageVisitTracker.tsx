'use client';

import { usePageVisit } from '@/hooks/usePageVisit';
import { usePathname } from 'next/navigation';

/**
 * Component that automatically tracks page visits based on the current URL path
 * Place this component in your layout or page components to track visits
 */
export default function PageVisitTracker() {
  const pathname = usePathname() || '/';

  // Track the current page visit
  usePageVisit(pathname);

  // This component doesn't render anything
  return null;
}
