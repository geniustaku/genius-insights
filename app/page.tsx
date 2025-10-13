'use client';
import React, { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/NewsletterSignup';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';
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
      
      {/* Enhanced Navigation Bar with Glass Effect */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors">Genius Insights</span>
                  <span className="text-xs text-gray-500 -mt-1">Financial Intelligence</span>
                </div>
              </Link>
              <div className="hidden lg:flex items-center space-x-8">
                <Link href="/tools" className="text-gray-600 hover:text-green-600 font-medium relative group">
                  <span>Tools</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link href="/articles" className="text-gray-600 hover:text-blue-600 font-medium relative group">
                  <span>Guides</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link href="/calculators" className="text-gray-600 hover:text-purple-600 font-medium relative group">
                  <span>Calculators</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link href="/market" className="text-gray-600 hover:text-orange-600 font-medium relative group">
                  <span>Market</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link href="/document-converter" className="text-gray-600 hover:text-indigo-600 font-medium relative group">
                  <span>Converter</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Breaking News Banner with Animation */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white py-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-64 h-64 rounded-full bg-white/10 -top-32 -left-32 animate-blob"></div>
          <div className="absolute w-64 h-64 rounded-full bg-white/10 -bottom-32 -right-32 animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center space-x-4 animate-pulse">
            <span className="bg-white text-red-600 px-3 py-1.5 text-xs font-bold rounded-full shadow-lg animate-bounce">🔥 NEW</span>
            <p className="text-sm font-medium">
              <Link href="/document-converter" className="hover:underline flex items-center space-x-2">
                <span>🚀 NEW Document Converter Tool - Convert PDF, Word, Excel & PowerPoint instantly!</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
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

            {/* Enhanced Side Stories */}
            <div className="space-y-6">
              
              {/* Trending Tools with Modern Design */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
                  <span className="text-2xl mr-3 animate-pulse">🔥</span>
                  <span className="text-gradient">Trending Tools</span>
                </h3>
                <div className="space-y-4">
                  <Link href="/document-converter" className="flex items-start space-x-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 p-4 rounded-xl transition-all duration-300 group border border-transparent hover:border-indigo-200">
                    <div className="w-16 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <span className="text-white text-lg">📄</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">Document Converter</h4>
                      <p className="text-xs text-gray-600">Convert PDF, Word, Excel, PowerPoint</p>
                      <span className="text-xs text-indigo-600 font-medium">NEW • Free Tool</span>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-property-transfer-calculator" className="flex items-start space-x-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 p-4 rounded-xl transition-all duration-300 group border border-transparent hover:border-blue-200">
                    <Image 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=60&fit=crop&crop=center"
                      alt="Property Transfer"
                      width={80}
                      height={60}
                      className="w-16 h-12 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">Property Transfer Calculator</h4>
                      <p className="text-xs text-gray-600">Calculate transfer costs and duties</p>
                      <span className="text-xs text-blue-600 font-medium">Tools • 8 min</span>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-retirement-calculator" className="flex items-start space-x-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 p-4 rounded-xl transition-all duration-300 group border border-transparent hover:border-green-200">
                    <Image 
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=60&fit=crop&crop=center"
                      alt="Retirement Planning"
                      width={80}
                      height={60}
                      className="w-16 h-12 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-green-600 transition-colors">Retirement Calculator</h4>
                      <p className="text-xs text-gray-600">Plan your pension strategy</p>
                      <span className="text-xs text-green-600 font-medium">Tools • 6 min</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Enhanced Market Data Widget */}
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-lg mb-4 text-green-900 flex items-center">
                  <span className="mr-3 text-2xl animate-pulse">📊</span>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">SA Market Watch</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-medium text-gray-700">Repo Rate</span>
                    <span className="font-bold text-green-600 text-lg">8.25%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-medium text-gray-700">Prime Rate</span>
                    <span className="font-bold text-green-600 text-lg">11.75%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-medium text-gray-700">USD/ZAR</span>
                    <span className="font-bold text-red-600 text-lg flex items-center">
                      <span className="text-red-500 mr-1">📈</span>
                      R18.45
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-medium text-gray-700">JSE All Share</span>
                    <span className="font-bold text-blue-600 text-lg flex items-center">
                      <span className="text-blue-500 mr-1">📊</span>
                      75,234
                    </span>
                  </div>
                </div>
                <Link href="/market" className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 text-sm font-medium px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                  <span>View all market data</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Strategically Placed Ad Unit 1 */}
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

          {/* Enhanced In-Article Ad Unit */}
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
                className=""
              />
            </div>
          </div>

          {/* NEW: Document Conversion Tools Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Document Conversion Tools</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Convert PDF to Word, Excel to PDF, PowerPoint files and more - completely free online converter
              </p>
            </div>
            
            {/* Document Converter Showcase */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-200/50 shadow-xl mb-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute w-96 h-96 rounded-full bg-blue-400 -top-48 -left-48 animate-blob"></div>
                <div className="absolute w-96 h-96 rounded-full bg-purple-400 -bottom-48 -right-48 animate-blob animation-delay-2000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg mb-6">
                    <span className="text-3xl">📄</span>
                    <span className="text-xl font-bold text-gray-900">Free Document Converter</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">NEW</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Convert PDF to Word, Excel to PDF & More - Instantly Online
                  </h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    Professional document conversion powered by LibreOffice. No software installation required - works on any device.
                  </p>
                </div>
                
                {/* Popular Conversions Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm">PDF</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">PDF to Word</div>
                    <div className="text-xs text-gray-600">Most Popular</div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xs">DOC</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">Word to PDF</div>
                    <div className="text-xs text-gray-600">Business</div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xs">XLS</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">Excel to PDF</div>
                    <div className="text-xs text-gray-600">Reports</div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xs">PPT</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">PowerPoint</div>
                    <div className="text-xs text-gray-600">Slides</div>
                  </div>
                </div>
                
                {/* Features and CTA */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700 font-medium">100% Free & Secure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700 font-medium">No Registration Required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700 font-medium">Files up to 50MB</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700 font-medium">All Devices Supported</span>
                    </div>
                  </div>
                  
                  <Link href="/document-converter" className="group">
                    <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-3">
                      <span>🚀</span>
                      <span>Start Converting Now</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
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

          {/* Enhanced Ad Unit 2 */}
          <div className="mb-12 flex justify-center">
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-2xl p-6 border border-purple-200/50 shadow-lg max-w-4xl w-full">
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

          {/* Contextual Ad Unit - Before Newsletter */}
          <div className="mb-12 flex justify-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 shadow-lg max-w-3xl w-full">
              <div className="text-center mb-4">
                <span className="text-xs text-green-600 font-medium bg-white px-3 py-1.5 rounded-full border border-green-200 shadow-sm">Financial Services</span>
              </div>
              <AdSenseAd 
                adSlot="5279468522"
                className="text-center"
              />
            </div>
          </div>

          {/* Enhanced Newsletter Section */}
          <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/50 rounded-3xl p-10 text-center shadow-xl relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-96 h-96 rounded-full bg-blue-300 -top-48 -left-48 animate-blob"></div>
              <div className="absolute w-96 h-96 rounded-full bg-purple-300 -bottom-48 -right-48 animate-blob animation-delay-2000"></div>
              <div className="absolute w-96 h-96 rounded-full bg-indigo-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 text-gradient font-display">Stay Ahead of the Market</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Join 50,000+ South Africans who trust us for weekly insights on SARS updates, market trends, and expert financial strategies.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterSignup variant="compact" />
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  No spam, ever
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Unsubscribe anytime
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Expert insights
                </div>
              </div>
            </div>
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