// components/ArticleCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative h-48 w-full">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-indigo-100 h-full w-full flex items-center justify-center">
              <span className="text-indigo-400 text-lg">CareerGuide</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-sm text-gray-500 ml-auto">
            {article.reading_time ? `${article.reading_time} min read` : ''}
          </span>
        </div>
        
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-indigo-600">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {formatDate(article.published_at)}
          </span>
          <Link 
            href={`/articles/${article.slug}`}
            className="text-indigo-600 font-medium hover:text-indigo-800"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
