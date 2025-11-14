import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

// Force dynamic rendering for Firebase
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featured_image: string;
  seo_keywords: string[];
  reading_time: number;
  is_published: boolean;
  published_at: any;
  created_at: any;
  updated_at: any;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('slug', '==', slug),
      where('is_published', '==', true),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return doc.data() as Article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const publishedDate = article.published_at?.toDate?.() || new Date(article.published_at);

  return {
    title: `${article.title} | Genius Insights`,
    description: article.excerpt,
    keywords: article.seo_keywords.join(', '),
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      authors: [article.author],
      images: article.featured_image ? [
        {
          url: article.featured_image,
          width: 1200,
          height: 800,
          alt: article.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.featured_image ? [article.featured_image] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const publishedDate = article.published_at?.toDate?.() || new Date(article.published_at);
  const updatedDate = article.updated_at?.toDate?.() || new Date(article.updated_at);

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image || 'https://www.genius-insights.co.za/og-image.png',
    datePublished: publishedDate.toISOString(),
    dateModified: updatedDate.toISOString(),
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
      '@id': `https://www.genius-insights.co.za/guides/${article.slug}`,
    },
    keywords: article.seo_keywords.join(', '),
    articleSection: article.category,
    wordCount: article.content.split(' ').length,
  };

  // Breadcrumb Structured Data
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.genius-insights.co.za',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://www.genius-insights.co.za/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://www.genius-insights.co.za/guides/${article.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/guides" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Guides
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 dark:text-gray-100 font-medium">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <div className="flex items-center space-x-4">
                <span>By {article.author}</span>
                <span>•</span>
                <time dateTime={publishedDate.toISOString()}>
                  {publishedDate.toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div>
                {article.reading_time} min read
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Article Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-ol:text-gray-700 dark:prose-ol:text-gray-300
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-code:text-blue-600 dark:prose-code:text-blue-400
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800
              prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400
              prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags/Keywords */}
          {article.seo_keywords && article.seo_keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Related Topics:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.seo_keywords.slice(0, 10).map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Guides */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/guides"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              ← Back to All Guides
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
