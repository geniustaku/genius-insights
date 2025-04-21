// app/articles/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import CopyLinkButton from '../../../components/CopyLinkButton';
import SaveButton from '../../../components/Save';

export const revalidate = 3600; // Revalidate this page every hour

// Generate static params for the most popular articles
export async function generateStaticParams() {
  const articles = await getArticles(20); // Pre-render the top 20 articles
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
  
  // Adding Open Graph metadata for better social sharing
  return {
    title: `${article.title} | Genius Insights`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      type: 'article',
      url: `https://geniusinsights.co.za/articles/${article.slug}`,
      images: [
        {
          url: article.featured_image || 'https://geniusinsights.co.za/images/default-og.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      publishedTime: article.published_at,
      authors: [article.author],
      tags: [article.category, 'careers', 'south africa'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.title,
      images: [article.featured_image || 'https://geniusinsights.co.za/images/default-og.jpg'],
    }
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  // Get related articles (same category)
  const relatedArticles = await getRelatedArticles(article.category, article.id, 3);
  
  // URL encoding for social sharing
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(`https://geniusinsights.co.za/articles/${article.slug}`);
  
  // Social media share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const articleUrl = `https://geniusinsights.co.za/articles/${article.slug}`;
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-blue-600 transition-colors">Articles</Link>
            <span>/</span>
            <Link 
              href={`/categories/${article.category.toLowerCase().replace(/ /g, '-')}`}
              className="hover:text-blue-600 transition-colors"
            >
              {article.category}
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 shadow-sm">
                {article.author ? article.author.substring(0, 1) : 'A'}
              </div>
              <div>
                <p className="font-medium text-black">{article.author}</p>
                <p className="text-sm text-gray-600">{formatDate(article.published_at)}</p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.reading_time} min read
            </div>
          </div>
          
          {/* Featured Image */}
          {article.featured_image && (
            <div className="rounded-xl overflow-hidden shadow-xl mb-10">
              <div className="relative w-full" style={{ height: '500px' }}>
                {/* Use standard img tag for maximum compatibility */}
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-600 mt-2 text-right italic">
                Photo: Genius Insights © 2025
              </div>
            </div>
          )}
        </div>
        
        {/* Article Content - Improved for better visibility */}
        <div className="article-content">
  <div dangerouslySetInnerHTML={{ __html: article.content }} />
</div>

        
        {/* Tags */}
        <div className="my-12">
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              South Africa
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Career Growth
            </span>
          </div>
        </div>
        
        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-black">About the Author</h3>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold shadow-md">
              {article.author ? article.author.substring(0, 1) : 'A'}
            </div>
            <div>
              <p className="font-bold text-xl text-black mb-2">{article.author}</p>
              <p className="text-gray-700 mb-4">
                Career guidance expert specializing in {article.category.toLowerCase()} paths and growth opportunities 
                within the South African market. With extensive experience in the industry, 
                {article.author} provides actionable insights for professionals at all career stages.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                    <path d="M21.593 7.203c-.23-.858-.525-1.201-1.097-1.773-.547-.572-.921-.885-1.774-1.104-1.568-.436-7.935-.437-7.935-.437s-6.359-.002-7.928.434c-.85.219-1.227.531-1.772 1.103-.573.573-.87.917-1.099 1.776-.43 1.566-.436 4.764-.436 4.764s-.004 3.201.435 4.765c.23.857.525 1.2 1.098 1.772.545.572.919.885 1.772 1.103 1.569.436 7.929.437 7.929.437s6.359.002 7.928-.434c.85-.219 1.227-.532 1.773-1.105.548-.57.868-.915 1.096-1.772.437-1.565.436-4.765.436-4.765s.016-3.201-.433-4.764zm-11.736 9.676v-8.288l6.272 4.144-6.272 4.144z"/>
                  </svg>
                  Videos
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Share and Save - with Client Components for interactive buttons */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-b border-gray-200 py-8">
          <div className="mb-6 sm:mb-0">
            <p className="font-medium mb-3 text-black">Share this article</p>
            <div className="flex gap-3">
              <a 
                href={facebookShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a 
                href={twitterShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href={linkedinShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href={whatsappShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              
              {/* Copy Link Button - Using Client Component */}
              <CopyLinkButton url={articleUrl} />
            </div>
          </div>
          
          {/* Save Button - Using Client Component */}
          <SaveButton />
        </div>
      </article>
      
      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-black">More Articles You Might Like</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <Link key={relatedArticle.id} href={`/articles/${relatedArticle.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    {relatedArticle.featured_image && (
                      <div className="relative h-48 w-full">
                        <img
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm text-blue-600 mb-2">{relatedArticle.category}</div>
                      <h3 className="text-xl font-bold mb-2 text-black group-hover:text-blue-600 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-700 line-clamp-2 mb-4">{relatedArticle.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{formatDate(relatedArticle.published_at)}</span>
                        <span className="text-sm text-gray-600">{relatedArticle.reading_time} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated with South African Career Insights</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join our community and receive the latest career guidance, salary trends, and professional development 
            tips tailored for the South African market.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                Subscribe Free
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-4">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}