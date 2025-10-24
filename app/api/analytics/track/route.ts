// app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { trackPageVisit } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { pagePath } = await request.json();

    if (!pagePath || typeof pagePath !== 'string') {
      return NextResponse.json(
        { error: 'Page path is required' },
        { status: 400 }
      );
    }

    await trackPageVisit(pagePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return NextResponse.json(
      { error: 'Failed to track page visit' },
      { status: 500 }
    );
  }
}
