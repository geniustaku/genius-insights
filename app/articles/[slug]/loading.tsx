export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-12 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
          </div>
          
          <div className="max-w-4xl">
            {/* Category Badge Skeleton */}
            <div className="h-8 w-32 bg-white/20 rounded-full mb-6 animate-pulse"></div>
            
            {/* Title Skeleton */}
            <div className="space-y-4 mb-8">
              <div className="h-16 bg-white/20 rounded-lg animate-pulse"></div>
              <div className="h-16 bg-white/20 rounded-lg animate-pulse w-4/5"></div>
            </div>
            
            {/* Author and Meta Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse mr-4"></div>
                <div>
                  <div className="h-6 w-24 bg-white/20 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="h-6 w-20 bg-white/20 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div className="relative -mt-20 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/20">
            <div className="h-[500px] bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mt-3 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Reading Progress Bar */}
            <div className="h-1 bg-gray-200 animate-pulse"></div>
            
            {/* Content Skeleton */}
            <div className="p-8 md:p-12">
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                  </div>
                ))}
              </div>
              
              {/* Tags Skeleton */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Author Bio Skeleton */}
            <div className="mt-16 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-purple-200 mx-8 md:mx-12 mb-8">
              <div className="text-center mb-8">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="w-32 h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Share Section Skeleton */}
            <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl mx-8 md:mx-12 mb-8">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex flex-wrap gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}