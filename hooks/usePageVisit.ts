// hooks/usePageVisit.ts
'use client';

import { useEffect } from 'react';

/**
 * Custom hook to track page visits
 * @param pagePath - The path of the page to track (e.g., '/document-converter')
 */
export function usePageVisit(pagePath: string) {
  useEffect(() => {
    // Track the visit when component mounts
    const trackVisit = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pagePath }),
        });
      } catch (error) {
        console.error('Error tracking page visit:', error);
        // Silently fail - don't disrupt user experience
      }
    };

    trackVisit();
  }, [pagePath]);
}
