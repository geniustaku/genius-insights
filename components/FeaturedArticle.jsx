// components/FeaturedArticle.jsx
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function FeaturedArticle({ article }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="md:flex">
        <div className="md:w-1/2 relative">
          <div className="h-64 md:h-full relative">
            {article.featured_image ? (
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-indigo-100 h-full w-full flex items-center justify-center">
                <span className="text-indigo-400 text-xl">Featured Article</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-1/2 p-8">
          <div className="flex items-center mb-4">
            <span className="text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              {article.reading_time ? `${article.reading_time} min read` : ''}
            </span>
          </div>
          
          <Link href={`/articles/${article.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 hover:text-indigo-600">
              {article.title}
            </h2>
          </Link>
          
          <p className="text-gray-600 mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {formatDate(article.published_at)}
            </span>
            <Link 
              href={`/articles/${article.slug}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Read Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}