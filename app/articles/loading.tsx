export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section Skeleton */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 animate-pulse mb-8 h-8 w-48"></div>
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-6 max-w-2xl mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-4xl mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-12 max-w-3xl mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-wrap gap-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid Skeleton */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4 w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}