import Link from 'next/link';
import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import AdSenseAd from '@/components/AdSenseAd';
import { htmlToText } from 'html-to-text';
import ArticlesPageClient from '@/components/ArticlesPageClient';

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
    <ArticlesPageClient>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Genius Insights</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/guides" className="text-gray-600 hover:text-gray-900 font-medium">Guides</Link>
                <Link href="/tools" className="text-gray-600 hover:text-gray-900 font-medium">Tools</Link>
                <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600">News</Link>
                <Link href="/calculators" className="text-gray-600 hover:text-gray-900 font-medium">Calculators</Link>
                <Link href="/market" className="text-gray-600 hover:text-gray-900 font-medium">Market</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Financial Guides</span>
          </nav>
        </div>
      </div>

      <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              South African Financial Guides
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Expert insights, step-by-step guides, and professional advice to help you navigate South African finance, taxes, property, and investments.
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search financial guides..."
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">All</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Tax & SARS</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Property</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Banking</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Insurance</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Area */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Articles */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-4">
                  Showing <span className="font-semibold">{sanitizedArticles.length}</span> articles
                </div>
              </div>
              
              {sanitizedArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {sanitizedArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">No Articles Found</h2>
                    <p className="text-gray-600 mb-8">
                      We couldn't find any articles matching your criteria. Try adjusting your search terms.
                    </p>
                    <Link 
                      href="/articles" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      View All Articles
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Market Update */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">📊 Market Update</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Repo Rate</span>
                    <span className="font-bold text-green-600">8.25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Prime Rate</span>
                    <span className="font-bold text-green-600">11.75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">USD/ZAR</span>
                    <span className="font-bold text-red-600">R18.45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Petrol (95)</span>
                    <span className="font-bold text-blue-600">R22.86/L</span>
                  </div>
                </div>
              </div>

              {/* Ad Unit 4 - Articles Sidebar */}
              <div>
                <AdSenseAd 
                  adSlot="5279468522"
                  className="text-center"
                />
              </div>

              {/* Popular Tools */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">🔥 Popular Tools</h3>
                <div className="space-y-4">
                  <Link href="/south-africa-tax-calculator" className="block group">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🇿🇦</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-green-600 transition-colors">
                          Tax Calculator
                        </h4>
                        <p className="text-xs text-gray-600">Calculate SARS tax</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-property-transfer-calculator" className="block group">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🏠</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                          Property Transfer
                        </h4>
                        <p className="text-xs text-gray-600">Transfer duty & costs</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-retirement-calculator" className="block group">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">💰</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">
                          Retirement Planner
                        </h4>
                        <p className="text-xs text-gray-600">Plan your pension</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-3">💌 Stay Updated</h3>
                <p className="text-sm text-green-100 mb-4">Get weekly financial insights and guide updates</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded text-gray-900 text-sm"
                  />
                  <button className="w-full bg-white text-green-600 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Subscribe Free
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    </div>
    </ArticlesPageClient>
  );
}
