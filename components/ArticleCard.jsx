// components/ArticleCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function ArticleCard({ article }) {
  return (
    <article className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-purple-200">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 h-full w-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-500/20"></div>
              <div className="relative text-center">
                <svg className="w-12 h-12 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-white/90 text-sm font-medium">Tech Article</span>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-purple-600 border border-white/20">
              {article.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.reading_time ? `${article.reading_time} min read` : '5 min read'}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(article.published_at)}
          </span>
        </div>
        
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">
                {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <span>{article.author || 'Admin'}</span>
          </div>
          
          <Link 
            href={`/articles/${article.slug}`}
            className="group inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
          >
            Read Article
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
