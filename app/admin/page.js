// app/admin/page.js
import Link from 'next/link';

export default async function AdminDashboard() {
  // In a real application, you would fetch this data from your database
  const stats = {
    totalArticles: 3,
    publishedArticles: 3,
    draftArticles: 0,
    totalCategories: 3,
    totalUploads: 8,
    lastUpdated: new Date().toLocaleDateString()
  };
  
  // Recent activities (in a real app, fetch from database)
  const recentActivities = [
    { id: 1, action: 'Article Published', item: 'Full Stack Developer Career Path in South Africa', date: '10 minutes ago' },
    { id: 2, action: 'Article Published', item: 'Data Science Salary Guide: What to Expect in South Africa (2025)', date: '1 hour ago' },
    { id: 3, action: 'Article Published', item: 'Cloud Engineer Career Roadmap in South Africa', date: '3 hours ago' },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Articles</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalArticles}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Published: {stats.publishedArticles}</span>
              <span className="text-sm text-gray-500">Drafts: {stats.draftArticles}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Categories</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCategories}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/categories" className="text-sm text-indigo-600 hover:text-indigo-800">
              Manage categories →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Media Uploads</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUploads}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/media" className="text-sm text-indigo-600 hover:text-indigo-800">
              Manage media →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/articles/new" 
            className="flex items-center p-3 bg-indigo-50 rounded-md hover:bg-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-gray-700">Create New Article</span>
          </Link>
          
          <Link 
            href="/admin/media/upload" 
            className="flex items-center p-3 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
            <span className="text-gray-700">Upload Media</span>
          </Link>
          
          <Link 
            href="/admin/categories/new" 
            className="flex items-center p-3 bg-green-50 rounded-md hover:bg-green-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-gray-700">Add New Category</span>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.item}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <p className="text-sm text-gray-400">{activity.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Link href="/admin/activity" className="text-sm text-indigo-600 hover:text-indigo-800">
            View all activity →
          </Link>
        </div>
      </div>
      
      {/* Site Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Site Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
            <p className="text-gray-900">{stats.lastUpdated}</p>
          </div>
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Environment</h3>
            <p className="text-gray-900">Production</p>
          </div>
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Next.js Version</h3>
            <p className="text-gray-900">14.0.0</p>
          </div>
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Database</h3>
            <p className="text-gray-900">Azure SQL</p>
          </div>
        </div>
      </div>
    </div>
  );
}