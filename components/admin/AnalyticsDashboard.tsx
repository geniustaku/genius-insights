'use client';

import React, { useState, useEffect } from 'react';

interface PageVisitStat {
  id: string;
  path: string;
  count: number;
  firstVisit: string | null;
  lastVisit: string | null;
}

interface CategoryBreakdown {
  name: string;
  views: number;
  count: number;
}

interface AnalyticsData {
  summary: {
    totalViews: number;
    totalPages: number;
    todayActive: number;
    calculatorViews: number;
    articleViews: number;
  };
  categoryBreakdown: CategoryBreakdown[];
  topCalculators: PageVisitStat[];
  topArticles: PageVisitStat[];
  lowTrafficPages: PageVisitStat[];
  recentlyActive: PageVisitStat[];
  allPages: PageVisitStat[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'calculators' | 'articles' | 'all'>('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/daily');

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const resetAnalytics = async () => {
    try {
      setResetting(true);
      const response = await fetch('/api/analytics/reset', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reset analytics');
      }

      const result = await response.json();
      await fetchStats();
      setShowResetConfirm(false);
      alert(`Successfully reset analytics! ${result.deletedCount} records deleted.`);
    } catch (err) {
      console.error('Error resetting analytics:', err);
      alert('Failed to reset analytics. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  const getPageDisplayName = (path: string) => {
    if (!path) return 'Unknown';
    if (path === '/') return 'Home Page';

    // Clean up calculator names
    if (path.includes('-calculator')) {
      return path
        .replace('/south-africa-', '')
        .replace('-calculator', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Calculator';
    }

    // Clean up article names
    if (path.includes('/articles/')) {
      return path
        .replace('/articles/', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .substring(0, 50) + (path.length > 60 ? '...' : '');
    }

    return path
      .split('/')
      .filter(Boolean)
      .map(part => part.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '))
      .join(' / ');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Calculators': return 'from-blue-500 to-blue-600';
      case 'Articles': return 'from-green-500 to-green-600';
      case 'Guides': return 'from-purple-500 to-purple-600';
      case 'Tools': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Calculators': return '🧮';
      case 'Articles': return '📰';
      case 'Guides': return '📚';
      case 'Tools': return '🛠️';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4 text-5xl">!!</div>
          <p className="text-red-600 font-semibold">{error || 'No data available'}</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-5 text-white">
          <p className="text-blue-100 text-xs font-medium uppercase">Total Views</p>
          <p className="text-3xl font-bold mt-1">{data.summary.totalViews.toLocaleString()}</p>
          <p className="text-blue-200 text-xs mt-1">{data.summary.totalPages} pages tracked</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-5 text-white">
          <p className="text-green-100 text-xs font-medium uppercase">Calculator Views</p>
          <p className="text-3xl font-bold mt-1">{data.summary.calculatorViews.toLocaleString()}</p>
          <p className="text-green-200 text-xs mt-1">
            {data.summary.totalViews > 0
              ? Math.round((data.summary.calculatorViews / data.summary.totalViews) * 100)
              : 0}% of total
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-5 text-white">
          <p className="text-purple-100 text-xs font-medium uppercase">Article Views</p>
          <p className="text-3xl font-bold mt-1">{data.summary.articleViews.toLocaleString()}</p>
          <p className="text-purple-200 text-xs mt-1">
            {data.summary.totalViews > 0
              ? Math.round((data.summary.articleViews / data.summary.totalViews) * 100)
              : 0}% of total
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-5 text-white">
          <p className="text-orange-100 text-xs font-medium uppercase">Active Today</p>
          <p className="text-3xl font-bold mt-1">{data.summary.todayActive}</p>
          <p className="text-orange-200 text-xs mt-1">pages visited</p>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-5 text-white">
          <p className="text-slate-300 text-xs font-medium uppercase">Top Page</p>
          <p className="text-xl font-bold mt-1 truncate">
            {data.topCalculators[0]?.count.toLocaleString() || 0}
          </p>
          <p className="text-slate-300 text-xs mt-1 truncate">
            {getPageDisplayName(data.topCalculators[0]?.path || '')}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-4">
          <nav className="flex space-x-6">
            {(['overview', 'calculators', 'articles', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveView(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                  activeView === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' && '📊 '}
                {tab === 'calculators' && '🧮 '}
                {tab === 'articles' && '📰 '}
                {tab === 'all' && '📋 '}
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeView === 'overview' && (
            <div className="space-y-8">
              {/* Category Breakdown */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {data.categoryBreakdown.map((cat) => (
                    <div key={cat.name} className={`bg-gradient-to-br ${getCategoryColor(cat.name)} rounded-lg p-4 text-white`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{getCategoryIcon(cat.name)}</span>
                        <span className="text-white/80 text-xs">{cat.count} pages</span>
                      </div>
                      <p className="font-bold text-lg">{cat.views.toLocaleString()}</p>
                      <p className="text-white/80 text-sm">{cat.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Top Calculators */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🧮</span> Top Calculators
                  </h3>
                  <div className="space-y-3">
                    {data.topCalculators.slice(0, 5).map((calc, idx) => (
                      <div key={calc.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-gray-400 w-6">#{idx + 1}</span>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                            {getPageDisplayName(calc.path)}
                          </span>
                        </div>
                        <span className="font-bold text-blue-600">{calc.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveView('calculators')}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all calculators
                  </button>
                </div>

                {/* Recently Active */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>⚡</span> Recently Active
                  </h3>
                  <div className="space-y-3">
                    {data.recentlyActive.slice(0, 5).map((page) => (
                      <div key={page.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {getPageDisplayName(page.path)}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {formatDate(page.lastVisit)}
                          </p>
                        </div>
                        <span className="font-bold text-green-600 ml-2">{page.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Insights - Low Traffic Pages */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                  <span>💡</span> Pages to Focus On (Low Traffic)
                </h3>
                <p className="text-sm text-yellow-800 mb-4">
                  These pages have low traffic. Consider improving SEO, adding internal links, or promoting them.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {data.lowTrafficPages.slice(0, 6).map((page) => (
                    <div key={page.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-yellow-200">
                      <span className="text-sm text-gray-900 truncate flex-1 mr-2">
                        {getPageDisplayName(page.path)}
                      </span>
                      <span className="text-sm font-medium text-red-600">{page.count} views</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Calculators Tab */}
          {activeView === 'calculators' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">All Calculator Performance</h3>
                <span className="text-sm text-gray-500">{data.topCalculators.length} calculators</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calculator</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.topCalculators.map((calc, idx) => (
                      <tr key={calc.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          {idx === 0 && '🥇'}
                          {idx === 1 && '🥈'}
                          {idx === 2 && '🥉'}
                          {idx > 2 && <span className="text-gray-400">#{idx + 1}</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-gray-900">
                            {getPageDisplayName(calc.path)}
                          </span>
                          <code className="block text-xs text-gray-400 mt-0.5">{calc.path}</code>
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-blue-600">
                          {calc.count.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {formatDate(calc.lastVisit)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min((calc.count / (data.topCalculators[0]?.count || 1)) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Articles Tab */}
          {activeView === 'articles' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">All Article Performance</h3>
                <span className="text-sm text-gray-500">{data.topArticles.length} articles</span>
              </div>
              {data.topArticles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No article traffic data yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.topArticles.map((article, idx) => (
                        <tr key={article.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">
                            {idx === 0 && '🥇'}
                            {idx === 1 && '🥈'}
                            {idx === 2 && '🥉'}
                            {idx > 2 && <span className="text-gray-400">#{idx + 1}</span>}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-gray-900">
                              {getPageDisplayName(article.path)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-green-600">
                            {article.count.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">
                            {formatDate(article.lastVisit)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* All Pages Tab */}
          {activeView === 'all' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">All Pages</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchStats}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    🔄 Refresh
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-medium"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Path</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Visit</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.allPages.map((page, idx) => (
                      <tr key={page.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-400">#{idx + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {getPageDisplayName(page.path)}
                        </td>
                        <td className="px-4 py-3">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{page.path}</code>
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-blue-600">
                          {page.count.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{formatDate(page.firstVisit)}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{formatDate(page.lastVisit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 text-xl">ℹ️</div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900">Analytics Tracking</h3>
              <p className="text-xs text-blue-700 mt-0.5">
                Page visits tracked in real-time. Focus on calculators with low traffic to improve overall engagement.
              </p>
            </div>
          </div>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">!!</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Analytics?</h3>
              <p className="text-gray-600 text-sm">
                This will permanently delete all page visit data. This action cannot be undone.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 font-semibold mb-2">You will lose:</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>- {data.summary.totalViews.toLocaleString()} total page views</li>
                <li>- {data.summary.totalPages} tracked pages</li>
                <li>- All visit history and timestamps</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                disabled={resetting}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={resetAnalytics}
                disabled={resetting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {resetting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Resetting...
                  </>
                ) : (
                  'Yes, Reset All'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
