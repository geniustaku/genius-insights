// app/api/analytics/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const pageVisitsRef = collection(db, 'pageVisits');
    const q = query(pageVisitsRef, orderBy('count', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);

    const stats = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamps to ISO strings
      firstVisit: doc.data().firstVisit?.toDate?.()?.toISOString() || null,
      lastVisit: doc.data().lastVisit?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics stats' },
      { status: 500 }
    );
  }
}
