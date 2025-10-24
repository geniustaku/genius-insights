// app/api/analytics/reset/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

/**
 * POST /api/analytics/reset
 * Deletes all analytics data and resets counters to zero
 */
export async function POST(request: NextRequest) {
  try {
    const pageVisitsRef = collection(db, 'page_visits');
    const snapshot = await getDocs(pageVisitsRef);

    let deletedCount = 0;

    // Delete all documents in the page_visits collection
    const deletePromises = snapshot.docs.map(async (document) => {
      await deleteDoc(doc(db, 'page_visits', document.id));
      deletedCount++;
    });

    await Promise.all(deletePromises);

    return NextResponse.json({
      success: true,
      message: 'Analytics reset successfully',
      deletedCount,
    });
  } catch (error: any) {
    console.error('Error resetting analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to reset analytics',
        details: error.message
      },
      { status: 500 }
    );
  }
}
