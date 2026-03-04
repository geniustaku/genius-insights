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
  title: 'Tax Calculator South Africa 2026 | Genius Insights',
  description: 'Free SARS tax calculator, PAYE calculator & salary calculator for South Africa. Calculate income tax, property transfer costs & bond repayments. 2026 rates.',
  keywords: 'tax calculator south africa, SARS tax calculator, PAYE calculator, salary calculator south africa, income tax calculator south africa, take home pay calculator south africa, how much tax do I pay south africa, property transfer cost calculator, bond calculator south africa, home loan calculator south africa, VAT calculator south africa, UIF calculator, capital gains tax calculator south africa, retirement annuity calculator south africa, SARS tax tables 2026, calculate my salary after tax south africa, property transfer duty calculator, how to calculate PAYE in south africa, cost of buying a house south africa, personal loan calculator south africa, car finance calculator south africa, TFSA calculator, overtime calculator south africa, payroll calculator south africa, financial tools south africa, free online calculator south africa',
  openGraph: {
    title: 'Tax Calculator South Africa 2026 - Free PAYE & Salary Tools',
    description: 'Free SARS tax calculator, PAYE calculator, salary & property transfer calculators for South Africa. Updated with 2026 tax tables and rates.',
    type: 'website',
    url: 'https://www.genius-insights.co.za',
    siteName: 'Genius Insights',
    images: [
      {
        url: 'https://www.genius-insights.co.za/api/og?title=Free+SA+Financial+Tools+2026&subtitle=Tax+Calculators+%E2%80%A2+Property+Tools+%E2%80%A2+Expert+Guides',
        width: 1200,
        height: 630,
        alt: 'Genius Insights - Free Tax Calculator South Africa with PAYE, Salary and Property Tools',
      }
    ],
    locale: 'en_ZA',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GeniusInsightsZA',
    title: 'Tax Calculator South Africa | Free PAYE & Salary Tools',
    description: 'Free SARS tax calculator, PAYE calculator, salary calculator & property transfer tools for South Africa. Updated 2026 tax tables.',
    images: ['https://www.genius-insights.co.za/api/og?title=Free+SA+Financial+Tools+2026&subtitle=Tax+Calculators+%E2%80%A2+Property+Tools+%E2%80%A2+Expert+Guides'],
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
    description: 'Free tax calculator South Africa - SARS PAYE calculator, salary calculator, income tax calculator, property transfer cost calculator, bond calculator and 35+ financial tools updated with 2026 rates',
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
              <Link href="/guides" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors">
                Guides
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

        {/* Hero Section - Value Proposition with H1 */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                  Free Tax Calculator South Africa 2026
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 mb-6 leading-relaxed">
                  Calculate your SARS income tax, PAYE, take-home salary and more. 35+ free financial calculators including property transfer costs, bond repayments, and expert guides — updated with the latest 2026 tax tables.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/south-africa-income-tax-calculator" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                    Tax Calculator
                  </Link>
                  <Link href="/tools" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition-all">
                    Browse All Tools
                  </Link>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> 100% Free Calculators</span>
                  <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> SARS 2026 Tax Tables</span>
                  <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> No Login Required</span>
                </div>
              </div>

              {/* Quick Calculator Links */}
              <div className="grid grid-cols-2 gap-3">
                <Link href="/south-africa-income-tax-calculator" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all group">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="font-bold text-white text-sm">Income Tax Calculator</div>
                  <div className="text-xs text-slate-400">SARS PAYE 2026 Rates</div>
                </Link>
                <Link href="/south-africa-property-transfer-calculator" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all group">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-bold text-white text-sm">Property Transfer</div>
                  <div className="text-xs text-slate-400">Transfer Duty Calculator</div>
                </Link>
                <Link href="/south-africa-bond-calculator" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all group">
                  <div className="text-2xl mb-2">🏡</div>
                  <div className="font-bold text-white text-sm">Bond Calculator</div>
                  <div className="text-xs text-slate-400">Home Loan Repayments</div>
                </Link>
                <Link href="/south-africa-personal-loan-calculator" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all group">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-bold text-white text-sm">Personal Loan</div>
                  <div className="text-xs text-slate-400">NCR Rates Calculator</div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* Latest News Article */}
          {latestArticle && (
            <section className="mb-10 sm:mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Latest News</h2>
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

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full">
                          {latestArticle.category}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(latestArticle.published_at)}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {latestArticle.title}
                      </h3>

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
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">📄 Document Converter</h2>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">FREE</span>
                    </div>
                    <p className="text-white mb-6 text-base sm:text-lg">
                      Convert PDF, Word, Excel, and PowerPoint files instantly. No registration required!
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600 text-white">✓ PDF to Word</span>
                      <span className="bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600 text-white">✓ Excel to PDF</span>
                      <span className="bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-600 text-white">✓ PowerPoint</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      Try Converter Now →
                    </button>
                  </div>

                  <div className="hidden md:grid grid-cols-2 gap-3">
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📄</div>
                      <div className="text-white font-semibold text-sm">PDF</div>
                    </div>
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📝</div>
                      <div className="text-white font-semibold text-sm">Word</div>
                    </div>
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📊</div>
                      <div className="text-white font-semibold text-sm">Excel</div>
                    </div>
                    <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600">
                      <div className="text-3xl mb-2">📽️</div>
                      <div className="text-white font-semibold text-sm">PowerPoint</div>
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

          {/* Ad Unit #1 - After Articles */}
          <div className="mb-10 sm:mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">Sponsored</span>
              </div>
              <AdSenseAd adSlot="3043670508" className="text-center" />
            </div>
          </div>

          {/* Quick Access Categories */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">📂 Browse Guides</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/guides" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 text-center hover:shadow-lg transition-all border border-blue-200">
                  <div className="text-4xl mb-2">📚</div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">All Guides</h3>
                  <p className="text-xs text-gray-600 mt-1">Complete Library</p>
                </div>
              </Link>

              <Link href="/guides/sars-tax-guides" className="group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 text-center hover:shadow-lg transition-all border border-green-200">
                  <div className="text-4xl mb-2">💰</div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-green-600 transition-colors">Tax & SARS</h3>
                  <p className="text-xs text-gray-600 mt-1">6 Guides</p>
                </div>
              </Link>

              <Link href="/guides/property-transfer-guides" className="group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 text-center hover:shadow-lg transition-all border border-orange-200">
                  <div className="text-4xl mb-2">🏘️</div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">Property</h3>
                  <p className="text-xs text-gray-600 mt-1">10 Guides</p>
                </div>
              </Link>

              <Link href="/tools" className="group">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 text-center hover:shadow-lg transition-all border border-purple-200">
                  <div className="text-4xl mb-2">🛠️</div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">Tools</h3>
                  <p className="text-xs text-gray-600 mt-1">Calculators</p>
                </div>
              </Link>

              <Link href="/articles" className="group">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 text-center hover:shadow-lg transition-all border border-pink-200">
                  <div className="text-4xl mb-2">📰</div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">News</h3>
                  <p className="text-xs text-gray-600 mt-1">Latest Articles</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Popular Tools - Featured 8 */}
          <section className="mb-10 sm:mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">🔥 Most Popular SA Tax & Financial Calculators</h2>
              <Link href="/tools" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                View All 35+
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

              <Link href="/south-africa-income-tax-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">🇿🇦</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-sm">Income Tax Calculator</h3>
                      <p className="text-xs text-gray-500">SARS 2026</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">How much tax do I pay? Calculate PAYE, UIF with 2026 rates</p>
                </div>
              </Link>

              <Link href="/south-africa-tax-refund-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">💵</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-sm">Tax Refund Calculator</h3>
                      <p className="text-xs text-gray-500">eFiling</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Estimate your SARS eFiling tax refund</p>
                </div>
              </Link>

              <Link href="/south-africa-overtime-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">⏰</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors text-sm">Overtime Calculator</h3>
                      <p className="text-xs text-gray-500">BCEA Rates</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">1.5x weekday, 2x Sunday rates</p>
                </div>
              </Link>

              <Link href="/south-africa-pension-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-2xl">🏦</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors text-sm">Pension Calculator</h3>
                      <p className="text-xs text-gray-500">27.5% Tax Benefit</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Retirement annuity calculator with tax savings</p>
                </div>
              </Link>

              <Link href="/south-africa-bond-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">🏡</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">Bond Calculator</h3>
                      <p className="text-xs text-gray-500">Home Loans</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Home loan affordability & monthly repayments</p>
                </div>
              </Link>

              <Link href="/south-africa-leave-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-2xl">🏖️</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors text-sm">Leave Calculator</h3>
                      <p className="text-xs text-gray-500">BCEA</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Annual, sick & family leave</p>
                </div>
              </Link>

              <Link href="/south-africa-credit-card-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center text-2xl">💳</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors text-sm">Credit Card Calculator</h3>
                      <p className="text-xs text-gray-500">Payoff Time</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Compare payment strategies</p>
                </div>
              </Link>

              <Link href="/tools" className="group no-underline">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-md hover:shadow-lg transition-all h-full border border-slate-700 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">⚡</div>
                    <div>
                      <h3 className="font-bold text-white text-sm">View All Tools</h3>
                      <p className="text-xs text-white">35+ Calculators</p>
                    </div>
                  </div>
                  <p className="text-sm text-white">Explore all financial tools →</p>
                </div>
              </Link>

            </div>
          </section>

          {/* Ad Unit #2 - After Popular Tools */}
          <div className="mb-10 sm:mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">Advertisement</span>
              </div>
              <AdSenseAd adSlot="3043670508" className="text-center" />
            </div>
          </div>

          {/* Salary & PAYE Calculators */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">💼 Salary & PAYE Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/south-africa-payroll-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">💼</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">Payroll Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Calculate PAYE, UIF & take-home pay</p>
                </div>
              </Link>
              <Link href="/south-africa-uif-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">🏢</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">UIF Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Contributions & benefits</p>
                </div>
              </Link>
              <Link href="/south-africa-gratuity-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center text-xl">🎁</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-violet-600 transition-colors text-sm">Gratuity Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Severance & retrenchment</p>
                </div>
              </Link>
              <Link href="/salary-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">💵</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-sm">Salary Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Calculate salary after tax</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Home Loan & Personal Loan Calculators */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">🏦 Home Loan & Personal Loan Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/south-africa-personal-loan-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">🏦</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Personal Loan</h3>
                  </div>
                  <p className="text-xs text-gray-600">NCR-compliant rates</p>
                </div>
              </Link>
              <Link href="/south-africa-car-finance-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">🚗</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-sm">Car Finance</h3>
                  </div>
                  <p className="text-xs text-gray-600">With balloon payments</p>
                </div>
              </Link>
              <Link href="/south-africa-deposit-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-xl">💰</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors text-sm">Fixed Deposit</h3>
                  </div>
                  <p className="text-xs text-gray-600">Compare bank rates</p>
                </div>
              </Link>
              <Link href="/south-africa-debt-consolidation-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">📊</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">Debt Consolidation</h3>
                  </div>
                  <p className="text-xs text-gray-600">Reduce monthly payments</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Investment & TFSA Calculators */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">📈 Investment & TFSA Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/south-africa-tfsa-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-xl">💎</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-sm">TFSA Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Tax-free savings growth</p>
                </div>
              </Link>
              <Link href="/south-africa-inflation-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">📊</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">Inflation Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">CPI & purchasing power</p>
                </div>
              </Link>
              <Link href="/south-africa-investment-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">📈</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">Investment Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Compound interest growth</p>
                </div>
              </Link>
              <Link href="/south-africa-capital-gains-tax-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl">📈</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors text-sm">Capital Gains Tax</h3>
                  </div>
                  <p className="text-xs text-gray-600">CGT on investments</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Property Transfer & VAT Calculators */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">🏠 Property Transfer & VAT Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/south-africa-property-transfer-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">🏠</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">Property Transfer</h3>
                  </div>
                  <p className="text-xs text-gray-600">Property transfer duty & buying costs</p>
                </div>
              </Link>
              <Link href="/south-africa-rental-yield-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center text-xl">🔑</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors text-sm">Rental Yield</h3>
                  </div>
                  <p className="text-xs text-gray-600">Property returns</p>
                </div>
              </Link>
              <Link href="/south-africa-vat-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-xl">🧾</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors text-sm">VAT Calculator</h3>
                  </div>
                  <p className="text-xs text-gray-600">Calculate 15% VAT inclusive/exclusive</p>
                </div>
              </Link>
              <Link href="/south-africa-estate-duty-calculator" className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">⚰️</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors text-sm">Estate Duty</h3>
                  </div>
                  <p className="text-xs text-gray-600">Inheritance tax</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Banking Tools Section */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">🏦 Banking Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <Link href="/south-africa-standard-bank-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-blue-200">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-xs">SB</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">Standard Bank</h3>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Loan & bond calculator</p>
                </div>
              </Link>

              <Link href="/south-africa-fnb-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-orange-200">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-xs">FNB</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">FNB</h3>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Home loan calculator</p>
                </div>
              </Link>

              <Link href="/south-africa-insurance-comparison" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-purple-200">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl">
                      🔍
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Compare Insurance</h3>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Best insurance deals</p>
                </div>
              </Link>

              <Link href="/south-africa-business-registration-calculator" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-green-200">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl">
                      🏢
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-sm">Business Reg</h3>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Registration costs</p>
                </div>
              </Link>

            </div>
          </section>

          {/* Ad Unit #3 - Before Newsletter */}
          <div className="mb-10 sm:mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">Advertisement</span>
              </div>
              <AdSenseAd adSlot="3043670508" className="text-center" />
            </div>
          </div>

          {/* Quick Links Section */}
          <section className="mb-10 sm:mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">⚡ Quick Access</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link href="/articles" className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all group">
                  <div className="text-2xl mb-1">📰</div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">Articles</p>
                </Link>
                <Link href="/tools" className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all group">
                  <div className="text-2xl mb-1">🛠️</div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">All Tools</p>
                </Link>
                <Link href="/calculators" className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all group">
                  <div className="text-2xl mb-1">🧮</div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">Calculators</p>
                </Link>
                <Link href="/document-converter" className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all group">
                  <div className="text-2xl mb-1">📄</div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">Converter</p>
                </Link>
                <Link href="/market" className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all group">
                  <div className="text-2xl mb-1">📈</div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">Markets</p>
                </Link>
                <Link href="/cv-builder" className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all group">
                  <div className="text-2xl mb-1">📝</div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">CV Builder</p>
                </Link>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="mb-10 sm:mb-12">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 sm:p-12 text-center shadow-lg border border-slate-700 text-white">
              <div className="max-w-2xl mx-auto text-white">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">📧</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Stay Updated</h2>
                <p className="text-white mb-8 text-sm sm:text-base">
                  Get weekly South African tax tips, SARS updates, new calculator alerts and financial planning insights delivered to your inbox.
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
                South Africa's free tax calculator, PAYE calculator, salary tools and financial guides. Updated with 2026 SARS tax tables.
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
            <p>© 2026 Genius Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </HomePageClient>
  );
}
