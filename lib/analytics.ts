// lib/analytics.ts
import { db } from './firebase';
import { doc, setDoc, getDoc, increment, serverTimestamp } from 'firebase/firestore';

export interface PageVisit {
  path: string;
  count: number;
  lastVisit: any;
  firstVisit: any;
}

/**
 * Track a page visit in Firestore
 * @param pagePath - The path of the page being visited (e.g., '/document-converter')
 */
export async function trackPageVisit(pagePath: string): Promise<void> {
  try {
    // Sanitize the path to use as a document ID
    const docId = pagePath.replace(/^\//, '').replace(/\//g, '_') || 'home';
    const docRef = doc(db, 'pageVisits', docId);

    // Check if document exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Increment existing count
      await setDoc(docRef, {
        count: increment(1),
        lastVisit: serverTimestamp(),
      }, { merge: true });
    } else {
      // Create new document
      await setDoc(docRef, {
        path: pagePath,
        count: 1,
        firstVisit: serverTimestamp(),
        lastVisit: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error tracking page visit:', error);
    // Don't throw error to prevent disrupting user experience
  }
}

/**
 * Get visit count for a specific page
 * @param pagePath - The path of the page
 * @returns The visit count or 0 if not found
 */
export async function getPageVisitCount(pagePath: string): Promise<number> {
  try {
    const docId = pagePath.replace(/^\//, '').replace(/\//g, '_') || 'home';
    const docRef = doc(db, 'pageVisits', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().count || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting page visit count:', error);
    return 0;
  }
}

/**
 * Get visit data for a specific page
 * @param pagePath - The path of the page
 * @returns The page visit data or null if not found
 */
export async function getPageVisitData(pagePath: string): Promise<PageVisit | null> {
  try {
    const docId = pagePath.replace(/^\//, '').replace(/\//g, '_') || 'home';
    const docRef = doc(db, 'pageVisits', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PageVisit;
    }
    return null;
  } catch (error) {
    console.error('Error getting page visit data:', error);
    return null;
  }
}
