'use client';

import React, { useState, useEffect } from 'react';

interface PageVisitStat {
  id: string;
  path: string;
  count: number;
  firstVisit: string | null;
  lastVisit: string | null;
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<PageVisitStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setStats(data.stats || []);
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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalVisits = () => {
    return stats.reduce((sum, stat) => sum + stat.count, 0);
  };

  const getPageDisplayName = (path: string) => {
    if (!path) return 'Unknown';
    if (path === '/') return 'Home Page';
    return path
      .split('/')
      .filter(Boolean)
      .map(part => part.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '))
      .join(' / ');
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

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4 text-5xl">⚠️</div>
          <p className="text-red-600 font-semibold">{error}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Page Views</p>
              <p className="text-3xl font-bold mt-2">{getTotalVisits().toLocaleString()}</p>
            </div>
            <div className="text-5xl opacity-80">👁️</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Tracked Pages</p>
              <p className="text-3xl font-bold mt-2">{stats.length}</p>
            </div>
            <div className="text-5xl opacity-80">📄</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Top Page Views</p>
              <p className="text-3xl font-bold mt-2">
                {stats.length > 0 ? stats[0].count.toLocaleString() : 0}
              </p>
              {stats.length > 0 && (
                <p className="text-purple-100 text-xs mt-1 truncate max-w-[150px]">
                  {getPageDisplayName(stats[0].path)}
                </p>
              )}
            </div>
            <div className="text-5xl opacity-80">🏆</div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Page Visit Statistics</h2>
          <button
            onClick={fetchStats}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            🔄 Refresh
          </button>
        </div>

        {stats.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📊</div>
            <p className="text-gray-500">No page visit data yet</p>
            <p className="text-sm text-gray-400 mt-2">Visit some pages to see analytics</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Path
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.map((stat, index) => (
                  <tr key={stat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                        {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                        {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                        <span className="text-sm font-medium text-gray-900">
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {getPageDisplayName(stat.path)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {stat.path || '/'}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-blue-600">
                          {stat.count.toLocaleString()}
                        </span>
                        <div className="ml-3 w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min((stat.count / stats[0].count) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(stat.firstVisit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(stat.lastVisit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 text-xl">ℹ️</div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">About Page Visit Tracking</h3>
            <p className="text-sm text-blue-700">
              This dashboard shows page visit counts for tracked pages on your website.
              Visit counts are updated in real-time and stored in Firestore. The data includes
              only page view counts without any personal information, location data, or device details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
