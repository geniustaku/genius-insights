import Link from 'next/link';
import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import { htmlToText } from 'html-to-text';

export const metadata = {
  title: 'African Tech Articles & Insights 2025 | Expert Career Guidance',
  description: 'Discover cutting-edge tech insights, career guidance, and industry analysis from African tech leaders. Stay ahead with our comprehensive articles on software development, AI, cloud computing, and more.',
  keywords: ['African tech articles', 'tech career guidance', 'software development Africa', 'tech industry insights', 'African tech trends'],
};

export const revalidate = 3600; // Revalidate this page every hour

function stripHtml(html) {
  return htmlToText(html, {
    wordwrap: 130,
  });
}

export default async function ArticlesPage({ searchParams }) {
  // Get pagination parameters from URL or use defaults
  const page = Number(searchParams?.page) || 1;
  const limit = 12; // Articles per page
  const offset = (page - 1) * limit;
  
  // Fetch articles with pagination
  const articles = await getArticles(limit, offset);
  
  // Fetch the total count of articles for pagination (you would add this method to your db.js)
  // For now, we'll assume there are more articles
  const hasMoreArticles = articles.length === limit;
  
  // Sanitize the excerpts content
  const sanitizedArticles = articles.map(article => ({
    ...article,
    excerpt: stripHtml(article.excerpt),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Tech Knowledge Hub
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              African Tech
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Articles & Insights
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Discover cutting-edge insights, expert guidance, and industry analysis from leading African tech professionals and thought leaders.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, technologies, or topics..."
                  className="w-full px-6 py-4 pl-12 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-500"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">500+ Articles</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Weekly Updates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Expert Authors</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>
      
      {/* Modern Filters Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/articles" className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                All Articles
              </Link>
              
              {[
                { name: 'Software Development', icon: '💻', href: '/articles?category=software-development' },
                { name: 'Data Science & AI', icon: '🤖', href: '/articles?category=data-science' },
                { name: 'Cloud Computing', icon: '☁️', href: '/articles?category=cloud-computing' },
                { name: 'DevOps', icon: '⚙️', href: '/articles?category=devops' },
                { name: 'Mobile Development', icon: '📱', href: '/articles?category=mobile' }
              ].map((category) => (
                <Link 
                  key={category.name}
                  href={category.href} 
                  className="group px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600 rounded-xl font-medium transition-all duration-300 flex items-center hover:shadow-md"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{sanitizedArticles.length}</span> articles
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                  <option>Most Viewed</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {sanitizedArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sanitizedArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">No Articles Found</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  We couldn't find any articles matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Link 
                  href="/articles" 
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  View All Articles
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Modern Pagination */}
      {sanitizedArticles.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link 
                  href={page > 1 ? `/articles?page=${page - 1}` : '/articles'}
                  className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    page > 1 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-disabled={page <= 1}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Link>
                
                <div className="bg-white px-6 py-3 rounded-xl border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    Page <span className="text-purple-600 font-bold">{page}</span>
                  </span>
                </div>
                
                <Link 
                  href={hasMoreArticles ? `/articles?page=${page + 1}` : '#'}
                  className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    hasMoreArticles 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-disabled={!hasMoreArticles}
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Ahead in African Tech
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get the latest insights, career guidance, and industry trends delivered directly to your inbox. Join 10,000+ African tech professionals.
              </p>
              
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-grow px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-blue-100"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                  >
                    Subscribe
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
              
              <p className="text-sm text-blue-100 mt-4">
                ✨ Weekly insights • 📈 No spam • 🔒 Unsubscribe anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
