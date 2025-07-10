'use client';
import React, { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/NewsletterSignup';
import StructuredData from '@/components/StructuredData';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  reading_time: number;
  featured_image?: string;
}

function getGuideImage(category: string, index: number) {
  const guideImages = {
    'Tax & SARS': [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center'
    ],
    'Property': [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center'
    ],
    'Banking': [
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&crop=center'
    ],
    'Insurance': [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
    ],
    'Business': [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&crop=center'
    ]
  };

  const categoryImages = guideImages[category as keyof typeof guideImages] || guideImages['Tax & SARS'];
  return categoryImages[index % categoryImages.length];
}

export default function Home(): JSX.Element {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles?limit=6');
        const data = await response.json();
        setFeaturedArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <StructuredData type="homepage" />
      
      {/* Top Navigation Bar - Business Publication Style */}
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
                <Link href="/tools" className="text-gray-600 hover:text-gray-900 font-medium">Tools</Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 font-medium">Guides</Link>
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

      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <span className="bg-white text-red-600 px-2 py-1 text-xs font-bold rounded">BREAKING</span>
            <p className="text-sm">
              <Link href="/south-africa-tax-calculator" className="hover:underline">
                SARS announces major tax bracket changes for 2025 - Calculate your new tax obligations
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Editorial Layout */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Featured Story - Business Insider Style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Main Story */}
            <div className="lg:col-span-2">
              <Link href="/south-africa-tax-calculator" className="group block">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=300&fit=crop&crop=center"
                      alt="SARS Tax Calculator 2025"
                      width={800}
                      height={300}
                      className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="bg-green-600 text-white px-3 py-1 text-sm font-bold rounded mb-4 inline-block">
                      TAX CALCULATOR
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">
                      SARS 2025 Tax Calculator: Navigate New Tax Brackets with Confidence
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      Calculate your exact tax obligations with our updated calculator featuring the latest SARS rates and thresholds for the 2025 tax year.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By Tax Team</span>
                      <span>•</span>
                      <span>5 min read</span>
                      <span>•</span>
                      <span>Jan 10, 2025</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Stories */}
            <div className="space-y-6">
              
              {/* Trending Tools */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
                  <span className="text-red-500 mr-2">🔥</span>
                  Trending Tools
                </h3>
                <div className="space-y-4">
                  <Link href="/south-africa-property-transfer-calculator" className="flex items-start space-x-3 hover:bg-white p-3 rounded-lg transition-colors">
                    <Image 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=60&fit=crop&crop=center"
                      alt="Property Transfer"
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">Property Transfer Calculator</h4>
                      <p className="text-xs text-gray-600">Calculate transfer costs and duties</p>
                      <span className="text-xs text-blue-600">Tools • 8 min</span>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-retirement-calculator" className="flex items-start space-x-3 hover:bg-white p-3 rounded-lg transition-colors">
                    <Image 
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=60&fit=crop&crop=center"
                      alt="Retirement Planning"
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">Retirement Calculator</h4>
                      <p className="text-xs text-gray-600">Plan your pension strategy</p>
                      <span className="text-xs text-blue-600">Tools • 6 min</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Market Data Widget */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-green-900 flex items-center">
                  <span className="mr-2">📊</span>
                  SA Market Watch
                </h3>
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
                    <span className="text-sm text-gray-700">JSE All Share</span>
                    <span className="font-bold text-blue-600">75,234</span>
                  </div>
                </div>
                <Link href="/market" className="text-green-600 hover:text-green-700 text-sm font-medium mt-3 inline-block">
                  View all market data →
                </Link>
              </div>
            </div>
          </div>

          {/* Section: Latest Financial Analysis */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Financial Analysis</h2>
              <Link href="/articles" className="text-green-600 hover:text-green-700 font-medium">View all →</Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredArticles.slice(0, 3).map((article, index) => (
                  <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <Image 
                          src={article.featured_image || getGuideImage(article.category, index)}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
                            {article.category?.toUpperCase() || 'ANALYSIS'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>By {article.author}</span>
                          <span>{article.reading_time} min read</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Section: Financial Tools & Calculators */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Financial Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Tax Calculator */}
              <Link href="/south-africa-tax-calculator" className="group">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">🇿🇦</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">SARS Tax Calculator</h3>
                      <p className="text-xs text-gray-500">Updated for 2025</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Calculate income tax, PAYE, UIF, and SDL with latest SARS rates
                  </p>
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    Calculate Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Property Calculator */}
              <Link href="/south-africa-property-transfer-calculator" className="group">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">🏠</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Property Transfer</h3>
                      <p className="text-xs text-gray-500">Transfer duty & costs</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Calculate transfer duty, bond costs, and attorney fees
                  </p>
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    Calculate Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Retirement Calculator */}
              <Link href="/south-africa-retirement-calculator" className="group">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">📈</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Retirement Planner</h3>
                      <p className="text-xs text-gray-500">Pension & RA</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Plan retirement savings and calculate pension contributions
                  </p>
                  <div className="flex items-center text-sm text-purple-600 font-medium">
                    Plan Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* View All Tools */}
              <Link href="/tools" className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">🛠️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">All Tools</h3>
                      <p className="text-xs text-gray-500">12+ calculators</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Access our complete suite of financial calculators
                  </p>
                  <div className="flex items-center text-sm text-gray-700 font-medium">
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* More Articles Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Financial Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.slice(3, 6).map((article, index) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                  <div className="flex space-x-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded">
                      <Image 
                        src={article.featured_image || getGuideImage(article.category, index + 3)}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs font-medium rounded mr-2">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.reading_time} min read</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Informed</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get weekly insights on SARS updates, market trends, and financial planning strategies delivered to your inbox.
            </p>
            <NewsletterSignup variant="compact" />
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-xl">Genius Insights</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                South Africa's leading financial intelligence platform. Expert analysis, precision tools, and market insights for informed financial decisions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Tools & Calculators</h3>
              <ul className="space-y-2">
                <li><Link href="/south-africa-tax-calculator" className="text-gray-400 hover:text-white transition-colors">SARS Tax Calculator</Link></li>
                <li><Link href="/south-africa-property-transfer-calculator" className="text-gray-400 hover:text-white transition-colors">Property Transfer</Link></li>
                <li><Link href="/south-africa-retirement-calculator" className="text-gray-400 hover:text-white transition-colors">Retirement Planner</Link></li>
                <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors">All Tools</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-4">Coverage</h3>
              <ul className="space-y-2">
                <li><Link href="/articles" className="text-gray-400 hover:text-white transition-colors">Financial Analysis</Link></li>
                <li><Link href="/market" className="text-gray-400 hover:text-white transition-colors">Market Data</Link></li>
                <li><Link href="/category/tax-sars" className="text-gray-400 hover:text-white transition-colors">Tax & SARS</Link></li>
                <li><Link href="/category/property" className="text-gray-400 hover:text-white transition-colors">Property</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Genius Insights. All rights reserved. South African financial intelligence and tools.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}