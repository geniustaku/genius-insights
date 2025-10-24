import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import NewsletterSignup from '@/components/NewsletterSignup';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';
import { getArticles } from '@/lib/db';
import HomePageClient from '@/components/HomePageClient';

// Generate comprehensive SEO metadata
export const metadata: Metadata = {
  title: 'Genius Insights | South Africa Financial Tools, SARS Tax Calculator & Business News',
  description: 'South Africa\'s leading financial intelligence platform. Free SARS tax calculator, property transfer calculator, retirement planner, document converter, and expert business news. Updated daily with latest SA market insights.',
  keywords: 'South Africa, SARS tax calculator, South African financial news, property transfer calculator, retirement planning, document converter, business news South Africa, JSE, financial tools, tax calculator 2025, SA market news, fintech South Africa',
  openGraph: {
    title: 'Genius Insights | South Africa Financial Intelligence & Tools',
    description: 'Free financial calculators, expert market analysis, and business news for South Africans. SARS tax calculator, property transfer tools, retirement planning & more.',
    type: 'website',
    url: 'https://www.genius-insights.co.za',
    siteName: 'Genius Insights',
    images: [
      {
        url: 'https://www.genius-insights.co.za/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Genius Insights - South Africa Financial Intelligence',
      }
    ],
    locale: 'en_ZA',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GeniusInsightsZA',
    title: 'Genius Insights | South Africa Financial Intelligence',
    description: 'Free SARS tax calculator, property tools, retirement planning & expert SA business news',
    images: ['https://www.genius-insights.co.za/images/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.genius-insights.co.za',
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

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  reading_time: number;
  featured_image?: string;
  published_at: string | any;
}

function getGuideImage(category: string, index: number) {
  const guideImages: Record<string, string[]> = {
    'Tax & SARS': [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
    ],
    'Property': [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    ],
    'Banking': [
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    ],
    'Business': [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    ]
  };

  const categoryImages = guideImages[category] || guideImages['Business'];
  return categoryImages[index % categoryImages.length];
}

function formatDate(dateString: string | any): string {
  try {
    let date: Date;

    if (dateString && typeof dateString === 'object' && 'toDate' in dateString) {
      date = dateString.toDate();
    } else if (dateString && typeof dateString === 'object' && 'seconds' in dateString) {
      date = new Date(dateString.seconds * 1000);
    } else if (typeof dateString === 'string' || typeof dateString === 'number') {
      date = new Date(dateString);
    } else {
      date = new Date();
    }

    if (isNaN(date.getTime())) {
      return 'Recent';
    }

    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    return 'Recent';
  }
}

export default async function Home() {
  const articles = await getArticles(10);
  const featuredArticles = articles || [];
  const latestArticle = featuredArticles[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Genius Insights',
    description: 'South Africa financial intelligence platform with tools, calculators, and expert market analysis',
    url: 'https://www.genius-insights.co.za',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.genius-insights.co.za/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Genius Insights',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.genius-insights.co.za/logo.png',
      },
    },
  };

  return (
    <HomePageClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StructuredData type="homepage" />

      {/* Modern Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg text-gray-900">Genius Insights</span>
                <span className="text-[10px] text-gray-500 -mt-1">Financial Intelligence</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/articles" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">
                News
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">
                Tools
              </Link>
              <Link href="/document-converter" className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">
                <span>Converter</span>
                <span className="ml-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
              </Link>
            </div>

            {/* CTA Button */}
            <Link href="/document-converter">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm shadow-sm hover:shadow-md transition-all">
                Free Tools
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* Hero Section - Latest Article */}
          {latestArticle && (
            <section className="mb-10 sm:mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">🔥 Latest News</h2>
              </div>

              <Link href={`/articles/${latestArticle.slug}`} className="group block">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <Image
                        src={latestArticle.featured_image || getGuideImage(latestArticle.category, 0)}
                        alt={latestArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
                          LATEST
                        </span>
                      </div>
                    </div>

                    {/* Content - Text below/beside image */}
                    <div className="p-6 sm:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full">
                          {latestArticle.category}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(latestArticle.published_at)}</span>
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {latestArticle.title}
                      </h1>

                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
                        {latestArticle.excerpt}
                      </p>

                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">{latestArticle.author}</span>
                        <span className="mx-2">•</span>
                        <span>{latestArticle.reading_time} min read</span>
                      </div>

                      <div className="mt-4">
                        <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Read Article
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Document Converter Highlight */}
          <section className="mb-10 sm:mb-12">
            <Link href="/document-converter" className="block group no-underline">
              <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-slate-600 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-50"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center text-white">
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{color: 'white'}}>📄 Document Converter</h2>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">FREE</span>
                    </div>
                    <p className="text-white mb-6 text-base sm:text-lg" style={{color: 'white'}}>
                      Convert PDF, Word, Excel, and PowerPoint files instantly. No registration required!
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600 text-white" style={{color: 'white'}}>✓ PDF to Word</span>
                      <span className="bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600 text-white" style={{color: 'white'}}>✓ Excel to PDF</span>
                      <span className="bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600 text-white" style={{color: 'white'}}>✓ PowerPoint</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      Try Converter Now →
                    </button>
                  </div>

                  <div className="hidden md:grid grid-cols-2 gap-3">
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📄</div>
                      <div className="text-white font-semibold text-sm" style={{color: 'white'}}>PDF</div>
                    </div>
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📝</div>
                      <div className="text-white font-semibold text-sm" style={{color: 'white'}}>Word</div>
                    </div>
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📊</div>
                      <div className="text-white font-semibold text-sm" style={{color: 'white'}}>Excel</div>
                    </div>
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📽️</div>
                      <div className="text-white font-semibold text-sm" style={{color: 'white'}}>PowerPoint</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* Latest 3 Articles Grid */}
          {featuredArticles.length > 1 && (
            <section className="mb-10 sm:mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">📰 Recent Articles</h2>
                <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.slice(1, 4).map((article, index) => (
                  <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.featured_image || getGuideImage(article.category, index + 1)}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white px-2.5 py-1 text-[10px] font-bold rounded-full shadow">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                          <span>{formatDate(article.published_at)}</span>
                          <span>{article.reading_time} min</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad Unit */}
          <div className="mb-10 sm:mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">Sponsored</span>
              </div>
              <AdSenseAd adSlot="3043670508" className="text-center" />
            </div>
          </div>

          {/* Popular Tools */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">🛠️ Popular Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

              <Link href="/south-africa-tax-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                      🇿🇦
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-sm">SARS Tax Calculator</h3>
                      <p className="text-xs text-gray-500">2025 Rates</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Calculate your tax with latest SARS rates</p>
                </div>
              </Link>

              <Link href="/south-africa-property-transfer-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                      🏠
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">Property Transfer</h3>
                      <p className="text-xs text-gray-500">Transfer Duty</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Calculate transfer costs and duties</p>
                </div>
              </Link>

              <Link href="/south-africa-retirement-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                      📈
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Retirement Planner</h3>
                      <p className="text-xs text-gray-500">Pension & RA</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Plan your retirement savings</p>
                </div>
              </Link>

              <Link href="/tools" className="group no-underline">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-md hover:shadow-lg transition-all h-full border border-slate-700 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm" style={{color: 'white'}}>View All Tools</h3>
                      <p className="text-xs text-white" style={{color: 'white'}}>12+ Calculators</p>
                    </div>
                  </div>
                  <p className="text-sm text-white" style={{color: 'white'}}>Explore all financial tools →</p>
                </div>
              </Link>

            </div>
          </section>

          {/* Newsletter */}
          <section className="mb-10 sm:mb-12">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 sm:p-12 text-center shadow-lg border border-slate-700 text-white">
              <div className="max-w-2xl mx-auto text-white">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">📧</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{color: 'white'}}>Stay Updated</h2>
                <p className="text-white mb-8 text-sm sm:text-base" style={{color: 'white'}}>
                  Get weekly insights on South African financial news, SARS updates, and market trends delivered to your inbox.
                </p>
                <div className="max-w-md mx-auto">
                  <NewsletterSignup variant="compact" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="font-bold text-lg">Genius Insights</span>
              </div>
              <p className="text-gray-400 text-sm">
                South Africa's leading financial intelligence platform.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/south-africa-tax-calculator" className="text-gray-400 hover:text-white transition-colors">Tax Calculator</Link></li>
                <li><Link href="/document-converter" className="text-gray-400 hover:text-white transition-colors">Document Converter</Link></li>
                <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors">All Tools</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Content</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/articles" className="text-gray-400 hover:text-white transition-colors">News & Articles</Link></li>
                <li><Link href="/market" className="text-gray-400 hover:text-white transition-colors">Market Data</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Genius Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </HomePageClient>
  );
}
