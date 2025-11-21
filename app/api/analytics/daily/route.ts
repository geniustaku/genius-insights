// app/api/analytics/daily/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const pageVisitsRef = collection(db, 'pageVisits');
    const dailyVisitsRef = collection(db, 'dailyVisits');

    // Get all page visits
    const pageQuery = query(pageVisitsRef, orderBy('count', 'desc'));
    const pageSnapshot = await getDocs(pageQuery);

    const allPages = pageSnapshot.docs.map(doc => ({
      id: doc.id,
      path: doc.data().path,
      count: doc.data().count,
      firstVisit: doc.data().firstVisit?.toDate?.()?.toISOString() || null,
      lastVisit: doc.data().lastVisit?.toDate?.()?.toISOString() || null,
    }));

    // Get daily visits (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let dailyData: { date: string; count: number }[] = [];

    try {
      const dailyQuery = query(
        dailyVisitsRef,
        where('date', '>=', thirtyDaysAgo.toISOString().split('T')[0]),
        orderBy('date', 'asc')
      );
      const dailySnapshot = await getDocs(dailyQuery);

      dailyData = dailySnapshot.docs.map(doc => ({
        date: doc.data().date,
        count: doc.data().count || 0,
      }));
    } catch (e) {
      // Collection may not exist yet - that's ok
      console.log('Daily visits collection not available yet');
    }

    // Categorize pages
    const calculators = allPages.filter(p => p.path?.includes('-calculator'));
    const articles = allPages.filter(p => p.path?.includes('/articles/'));
    const guides = allPages.filter(p => p.path?.includes('/guides'));
    const tools = allPages.filter(p =>
      p.path?.includes('/tools') ||
      p.path?.includes('/document-converter') ||
      p.path?.includes('/cv-builder')
    );
    const other = allPages.filter(p =>
      !p.path?.includes('-calculator') &&
      !p.path?.includes('/articles/') &&
      !p.path?.includes('/guides') &&
      !p.path?.includes('/tools') &&
      !p.path?.includes('/document-converter') &&
      !p.path?.includes('/cv-builder')
    );

    // Calculate totals
    const totalViews = allPages.reduce((sum, p) => sum + p.count, 0);
    const calculatorViews = calculators.reduce((sum, p) => sum + p.count, 0);
    const articleViews = articles.reduce((sum, p) => sum + p.count, 0);
    const guideViews = guides.reduce((sum, p) => sum + p.count, 0);
    const toolViews = tools.reduce((sum, p) => sum + p.count, 0);

    // Get today's views (approximate from last visit timestamps)
    const today = new Date().toISOString().split('T')[0];
    const todayViews = allPages.filter(p =>
      p.lastVisit && p.lastVisit.startsWith(today)
    ).length;

    // Calculate views by category for charts
    const categoryBreakdown = [
      { name: 'Calculators', views: calculatorViews, count: calculators.length },
      { name: 'Articles', views: articleViews, count: articles.length },
      { name: 'Guides', views: guideViews, count: guides.length },
      { name: 'Tools', views: toolViews, count: tools.length },
      { name: 'Other', views: other.reduce((sum, p) => sum + p.count, 0), count: other.length },
    ].sort((a, b) => b.views - a.views);

    // Top 10 calculators
    const topCalculators = calculators.slice(0, 10);

    // Top 10 articles
    const topArticles = articles.slice(0, 10);

    // Pages with low traffic (opportunity pages)
    const lowTrafficPages = allPages
      .filter(p => p.count < 10 && p.path && !p.path.includes('/api/'))
      .slice(0, 10);

    // Recently active pages
    const recentlyActive = [...allPages]
      .filter(p => p.lastVisit)
      .sort((a, b) => new Date(b.lastVisit!).getTime() - new Date(a.lastVisit!).getTime())
      .slice(0, 10);

    return NextResponse.json({
      summary: {
        totalViews,
        totalPages: allPages.length,
        todayActive: todayViews,
        calculatorViews,
        articleViews,
      },
      categoryBreakdown,
      topCalculators,
      topArticles,
      lowTrafficPages,
      recentlyActive,
      dailyData,
      allPages: allPages.slice(0, 100), // Top 100 for detailed view
    });
  } catch (error) {
    console.error('Error fetching daily analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
