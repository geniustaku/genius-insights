import Link from 'next/link';
import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import { htmlToText } from 'html-to-text';

export const metadata = {
  title: 'Career Articles | Genius Insights',
  description: 'Browse our collection of career guidance, salary insights, and professional development articles for the South African job market.',
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
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Career Articles</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Browse our comprehensive guides and insights on career development, South African salary trends, 
          and professional growth strategies tailored for the local job market.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          <Link href="/articles" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            All Articles
          </Link>
          <Link href="/articles?category=software-development" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium">
            Software Development
          </Link>
          <Link href="/articles?category=data-science" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium">
            Data Science
          </Link>
          <Link href="/articles?category=cloud-computing" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium">
            Cloud Computing
          </Link>
        </div>
        
        <div className="w-full md:w-auto">
          <select className="block w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>
      
      {/* Articles Grid */}
      {sanitizedArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sanitizedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">No articles found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any articles matching your criteria. Please try different filters.
          </p>
          <Link 
            href="/articles" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            View All Articles
          </Link>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-6 pb-12">
        <Link 
          href={page > 1 ? `/articles?page=${page - 1}` : '/articles'}
          className={`px-4 py-2 rounded-md border ${
            page > 1 
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          aria-disabled={page <= 1}
        >
          Previous
        </Link>
        
        <span className="text-sm text-gray-700">
          Page {page}
        </span>
        
        <Link 
          href={hasMoreArticles ? `/articles?page=${page + 1}` : '#'}
          className={`px-4 py-2 rounded-md border ${
            hasMoreArticles 
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          aria-disabled={!hasMoreArticles}
        >
          Next
        </Link>
      </div>
      
      {/* Newsletter CTA */}
      <div className="bg-indigo-100 p-8 rounded-xl text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Stay Updated with Career Insights</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest South African career guidance, salary trends, and professional development tips directly in your inbox.
        </p>
        <form className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-indigo-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
