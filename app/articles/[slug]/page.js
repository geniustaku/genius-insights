// app/articles/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import CopyLinkButton from '../../../components/CopyLinkButton';
import SaveButton from '../../../components/Save';
import ArticleComments from '../../../components/ArticleComments';
import AdSenseAd from '../../../components/AdSenseAd';
import ArticlePageClient from '../../../components/ArticlePageClient';

function getArticleImage(category) {
  const categoryImages = {
    'Tax & SARS': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center',
    'Property': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&crop=center',
    'Banking': 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop&crop=center',
    'Insurance': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop&crop=center',
    'Business': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop&crop=center',
    'Finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center',
    'Healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop&crop=center',
    'Legal': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop&crop=center'
  };
  
  return categoryImages[category] || categoryImages['Business'];
} 

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const articles = await getArticles(20);
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.warn('Could not generate static params, falling back to empty array:', error);
    return [
      { slug: 'sars-efiling-registration' },
      { slug: 'cipc-company-registration' },
      { slug: 'property-transfer-guide' },
      { slug: 'medical-aid-vs-insurance' },
      { slug: 'open-bank-account-guide' }
    ];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  // Use SEO fields if available, fallback to defaults
  const seoTitle = article.seo_title || `${article.title} | Genius Insights`;
  const seoDescription = article.seo_description || article.excerpt || article.title;
  const keywords = article.seo_keywords || [article.category, 'South Africa', 'financial news'];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(', '),
    authors: [{ name: article.author }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      url: `https://www.genius-insights.co.za/articles/${article.slug}`,
      siteName: 'Genius Insights',
      images: [
        {
          url: article.featured_image || 'https://www.genius-insights.co.za/images/default-og.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      publishedTime: article.published_at,
      modifiedTime: article.updated_at || article.published_at,
      authors: [article.author],
      section: article.category,
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@GeniusInsightsZA',
      title: seoTitle,
      description: seoDescription,
      images: [article.featured_image || 'https://www.genius-insights.co.za/images/default-og.jpg'],
      creator: '@GeniusInsightsZA',
    },
    alternates: {
      canonical: `https://www.genius-insights.co.za/articles/${article.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  let article = await getArticleBySlug(slug);
  
  if (!article) {
    const fallbackArticles = {
      'medical-aid-vs-insurance': {
        id: 'fallback-1',
        title: 'Medical Aid vs Medical Insurance in South Africa: Complete Comparison Guide',
        content: `
          <h2>Understanding the Difference Between Medical Aid and Medical Insurance</h2>
          <p>In South Africa, choosing between medical aid and medical insurance is a crucial decision that affects your healthcare coverage and financial well-being. This comprehensive guide explains the key differences and helps you make an informed choice.</p>
          
          <h3>What is Medical Aid?</h3>
          <p>Medical aid is regulated by the Council for Medical Schemes and provides comprehensive healthcare coverage. Medical aids must offer Prescribed Minimum Benefits (PMBs) and cannot refuse membership based on health status.</p>
          
          <h3>What is Medical Insurance?</h3>
          <p>Medical insurance provides specific coverage for defined medical events or expenses. It's regulated by the Financial Sector Conduct Authority (FSCA) and typically offers gap cover or specific illness coverage.</p>
          
          <h3>Key Differences</h3>
          <ul>
            <li><strong>Regulation:</strong> Medical aid is regulated by CMS, medical insurance by FSCA</li>
            <li><strong>Coverage:</strong> Medical aid offers comprehensive coverage, insurance offers specific coverage</li>
            <li><strong>PMBs:</strong> Medical aid must cover PMBs, insurance doesn't</li>
            <li><strong>Waiting Periods:</strong> Medical aid has general waiting periods, insurance has specific exclusions</li>
          </ul>
          
          <h3>Which Should You Choose?</h3>
          <p>Your choice depends on your healthcare needs, budget, and risk tolerance. Consider consulting with a healthcare financial advisor to make the best decision for your circumstances.</p>
        `,
        excerpt: 'Complete comparison guide between medical aid and medical insurance in South Africa, including regulations, coverage, and benefits.',
        category: 'Insurance',
        author: 'Healthcare Expert',
        published_at: new Date().toISOString(),
        reading_time: 8,
        slug: 'medical-aid-vs-insurance',
        featured_image: null
      },
      'cipc-company-registration': {
        id: 'fallback-2',
        title: 'CIPC Company Registration in South Africa: Complete Step-by-Step Guide',
        content: `
          <h2>Registering Your Company with CIPC</h2>
          <p>The Companies and Intellectual Property Commission (CIPC) is South Africa's regulatory body for company registration. This guide walks you through the complete process of registering your business.</p>
          
          <h3>Types of Companies You Can Register</h3>
          <ul>
            <li><strong>Private Company (Pty Ltd):</strong> Most common for small to medium businesses</li>
            <li><strong>Public Company (Ltd):</strong> For companies planning to list on the stock exchange</li>
            <li><strong>Personal Liability Company (Inc):</strong> For professional services</li>
            <li><strong>Non-Profit Company (NPC):</strong> For non-profit organizations</li>
          </ul>
          
          <h3>Registration Process</h3>
          <ol>
            <li><strong>Name Reservation:</strong> Reserve your company name online via CIPC website</li>
            <li><strong>Prepare Documents:</strong> Memorandum of Incorporation, Form CoR 14.1, and CoR 15.1</li>
            <li><strong>Submit Application:</strong> Submit online or at CIPC offices</li>
            <li><strong>Pay Fees:</strong> Registration fees vary by company type</li>
            <li><strong>Receive Certificate:</strong> Get your Certificate of Incorporation</li>
          </ol>
          
          <h3>Required Information</h3>
          <ul>
            <li>Company name and registration details</li>
            <li>Directors' information and ID copies</li>
            <li>Registered office address</li>
            <li>Share capital structure</li>
            <li>Memorandum of Incorporation</li>
          </ul>
          
          <h3>Costs and Timeframes</h3>
          <p>Registration typically takes 5-15 business days and costs between R175-R500 depending on company type and service level chosen.</p>
        `,
        excerpt: 'Complete step-by-step guide to registering your company with CIPC, including requirements, costs, and timeframes.',
        category: 'Business',
        author: 'Business Registration Expert',
        published_at: new Date().toISOString(),
        reading_time: 12,
        slug: 'cipc-company-registration',
        featured_image: null
      }
    };
    
    article = fallbackArticles[slug];
    
    if (!article) {
      notFound();
    }
  }
  
  const relatedArticles = await getRelatedArticles(article.category, article.id, 3);
  
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(`https://www.genius-insights.co.za/articles/${article.slug}`);
  
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const articleUrl = `https://www.genius-insights.co.za/articles/${article.slug}`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.seo_description,
    image: article.featured_image || 'https://www.genius-insights.co.za/images/default-og.jpg',
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Genius Insights',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.genius-insights.co.za/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: (article.seo_keywords || []).join(', '),
    articleSection: article.category,
    inLanguage: 'en-ZA',
    about: {
      '@type': 'Thing',
      name: article.category,
    },
    isAccessibleForFree: true,
  };

  return (
    <ArticlePageClient slug={article.slug}>
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Clean Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-semibold text-lg text-gray-900">Genius Insights</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/articles" className="text-gray-600 hover:text-gray-900 text-sm font-medium">All Articles</Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>›</span>
            <Link href="/articles" className="hover:text-gray-900">Articles</Link>
            <span>›</span>
            <span className="text-gray-700">{article.category}</span>
          </nav>
          
          <div className="max-w-3xl">
            {/* Category */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              {article.category}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              {article.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold mr-3">
                  {article.author ? article.author.substring(0, 1) : 'A'}
                </div>
                <span className="font-medium">{article.author}</span>
              </div>
              <span>•</span>
              <span>{formatDate(article.published_at)}</span>
              <span>•</span>
              <span>{article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Image */}
        {(article.featured_image || article.category) && (
          <div className="my-12">
            <div className="relative overflow-hidden rounded-lg" style={{ height: '400px' }}>
              <Image
                src={article.featured_image || getArticleImage(article.category)}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content - Single Column Layout */}
        <article className="max-w-3xl mx-auto pb-12">
          {/* Content */}
          <div className="article-content prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </article>
        
        {/* Primary Ad Unit from Landing Page */}
        <div className="mb-12 flex justify-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-sm max-w-4xl w-full">
            <div className="text-center mb-4">
              <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full border">Sponsored Content</span>
            </div>
            <AdSenseAd 
              adSlot="3043670508"
              className="text-center"
            />
          </div>
        </div>
        
        {/* In-Article Ad Unit from Landing Page */}
        <div className="mb-12 flex justify-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg max-w-5xl w-full">
            <div className="text-center mb-4">
              <span className="text-xs text-blue-600 font-medium bg-white px-3 py-1.5 rounded-full border border-blue-200 shadow-sm">Advertisement</span>
            </div>
            <AdSenseAd 
              adSlot="4969876131"
              adFormat="fluid"
              adLayout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </div>
        </div>

        {/* Article Footer */}
        <footer className="max-w-3xl mx-auto border-t border-gray-100 pt-8">
          
          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Topics</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {article.category}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                South Africa
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                Financial Guide
              </span>
            </div>
          </div>
          
          {/* Share Section - Simplified */}
          <div className="mb-12">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              <a 
                href={facebookShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Facebook
              </a>
              <a 
                href={twitterShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                Twitter
              </a>
              <a 
                href={linkedinShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm font-medium transition-colors"
              >
                LinkedIn
              </a>
              <CopyLinkButton url={articleUrl} />
            </div>
          </div>

          {/* Author Bio - Simplified */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-semibold flex-shrink-0">
                {article.author ? article.author.substring(0, 1) : 'A'}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{article.author}</h4>
                <p className="text-gray-600 text-sm mb-3">Financial Expert specializing in {article.category.toLowerCase()}</p>
                <p className="text-gray-700 text-sm">
                  Expert writer with extensive knowledge of South African financial regulations and market trends.
                </p>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Comments Section */}
        <div className="max-w-3xl mx-auto">
          <ArticleComments articleSlug={slug} />
        </div>
      </main>

      {/* Related Articles - Simplified */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600">
                More insights from our financial experts
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <Link key={relatedArticle.id} href={`/articles/${relatedArticle.slug}`} className="group">
                  <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    {relatedArticle.featured_image ? (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-lg">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="text-xs text-gray-500 mb-2">{relatedArticle.category}</div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatDate(relatedArticle.published_at)}</span>
                        <span>{relatedArticle.reading_time} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Content Ad Unit from Landing Page */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-2xl p-6 border border-purple-200/50 shadow-lg max-w-4xl w-full mx-auto">
            <div className="text-center mb-4">
              <span className="text-xs text-purple-600 font-medium bg-white px-3 py-1.5 rounded-full border border-purple-200 shadow-sm">Partner Content</span>
            </div>
            <AdSenseAd 
              adSlot="5662611907"
              adFormat="autorelaxed"
              className="text-center"
            />
          </div>
        </div>
      </section>
      
      {/* Financial Services Ad Unit from Landing Page */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 shadow-lg max-w-3xl w-full mx-auto">
            <div className="text-center mb-4">
              <span className="text-xs text-green-600 font-medium bg-white px-3 py-1.5 rounded-full border border-green-200 shadow-sm">Financial Services</span>
            </div>
            <AdSenseAd 
              adSlot="5279468522"
              className="text-center"
            />
          </div>
        </div>
      </section>
    </div>
    </ArticlePageClient>
  );
}