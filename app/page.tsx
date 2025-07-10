'use client';
import React, { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { htmlToText } from 'html-to-text';
import NewsletterSignup from '@/components/NewsletterSignup';
import StructuredData from '@/components/StructuredData';
import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';


function stripHtml(html: string) {
  return htmlToText(html, {
    wordwrap: 130,
  });
}

function getGuideImage(category: string, index: number) {
  const guideImages = {
    'Tax & SARS': [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center', // Tax documents
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center', // Calculator
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center'  // Financial charts
    ],
    'Property': [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center', // Modern house
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&crop=center', // Keys
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center'  // City buildings
    ],
    'Banking': [
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center', // Bank building
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center', // Credit cards
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&crop=center'  // Mobile banking
    ],
    'Insurance': [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center', // Protection concept
      'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=300&fit=crop&crop=center', // Family protection
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'  // Insurance forms
    ],
    'Business': [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop&crop=center', // Business meeting
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center', // Team work
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&crop=center'  // Business growth
    ]
  };

  const categoryImages = guideImages[category as keyof typeof guideImages] || guideImages['Tax & SARS'];
  return categoryImages[index % categoryImages.length];
}

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

  const featuredTools = [
    { 
      name: 'SARS Tax Calculator', 
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center',
      link: '/south-africa-tax-calculator', 
      description: 'Calculate your 2025 SARS tax obligations with our comprehensive calculator',
      category: 'Tax & SARS',
      time: '5 min read'
    },
    { 
      name: 'Property Transfer Calculator', 
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&crop=center',
      link: '/south-africa-property-transfer-calculator', 
      description: 'Calculate bond costs, transfer duty, and attorney fees for SA property transfers',
      category: 'Property',
      time: '8 min read'
    },
    { 
      name: 'Insurance Comparison Tool', 
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop&crop=center',
      link: '/south-africa-insurance-comparison', 
      description: 'Compare Sanlam, Discovery, and Old Mutual insurance rates and benefits',
      category: 'Insurance',
      time: '6 min read'
    }
  ];

  return (
    <>
      <StructuredData type="homepage" />
      
      {/* Navigation Bar */}
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

      {/* Main Hero Section - News Style */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Featured Story */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Main Story */}
            <div className="lg:col-span-2">
              <Link href="/south-africa-tax-calculator" className="group block">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative overflow-hidden">
                      <Image 
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center"
                        alt="SARS Tax Calculator 2025"
                        width={800}
                        height={400}
                        className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">
                      <span className="bg-green-600 text-white px-4 py-2 text-sm font-bold rounded-full mb-4 inline-block w-fit">
                        TAX CALCULATOR
                      </span>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-900">
                        SARS 2025 Tax Calculator: Navigate New Tax Brackets with Confidence
                      </h1>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Calculate your exact tax obligations with our updated calculator featuring the latest SARS rates and thresholds for the 2025 tax year.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-medium">By Tax Team</span>
                        <span>•</span>
                        <span>5 min read</span>
                        <span>•</span>
                        <span className="font-medium">Jan 10, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Stories */}
            <div className="space-y-6">
              
              {/* Trending Tools */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">🔥 Trending Tools</h3>
                <div className="space-y-4">
                  <Link href="/south-africa-property-transfer-calculator" className="flex items-center space-x-3 hover:bg-white p-3 rounded-lg transition-colors">
                    <Image 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=60&fit=crop&crop=center"
                      alt="Property Transfer"
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">Property Transfer Calculator</h4>
                      <p className="text-xs text-gray-600">Calculate transfer costs</p>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-insurance-comparison" className="flex items-center space-x-3 hover:bg-white p-3 rounded-lg transition-colors">
                    <Image 
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=80&h=60&fit=crop&crop=center"
                      alt="Insurance Comparison"
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">Insurance Comparison</h4>
                      <p className="text-xs text-gray-600">Compare SA insurers</p>
                    </div>
                  </Link>
                  
                  <Link href="/south-africa-retirement-calculator" className="flex items-center space-x-3 hover:bg-white p-3 rounded-lg transition-colors">
                    <Image 
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=60&fit=crop&crop=center"
                      alt="Retirement Planning"
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">Retirement Calculator</h4>
                      <p className="text-xs text-gray-600">Plan your pension</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-green-900">📊 Market Update</h3>
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
                    <span className="text-sm text-gray-700">Petrol (95)</span>
                    <span className="font-bold text-blue-600">R22.86/L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Articles from Database */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Financial Guides</h2>
              <Link href="/articles" className="text-green-600 hover:text-green-700 font-medium">View all →</Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.slice(0, 6).map((article, index) => (
                  <Link key={article.id} href={`/articles/${article.slug}`} className="group block">
                    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <Image 
                          src={article.featured_image || getGuideImage(article.category, index)}
                          alt={article.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                            {article.category?.toUpperCase() || 'GUIDE'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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

          {/* Feature Tools Grid - News Style */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Financial Tools & Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTools.map((tool, index) => (
                <Link key={index} href={tool.link} className="group block">
                  <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={tool.image}
                        alt={tool.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold rounded">
                          {tool.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Financial Tool</span>
                        <span>{tool.time}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Ad Space */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-12">
            <div className="text-gray-500 text-sm mb-2">Advertisement</div>
            <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded flex items-center justify-center">
              <span className="text-gray-600 font-medium">728x90 Content Advertisement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section - News Style */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">South African Financial Categories</h2>
            <p className="text-lg text-gray-600">Browse our comprehensive collection of financial tools and guides organized by category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tax & SARS Category */}
            <div className="group">
              <Link href="/category/tax-sars" className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🇿🇦</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">Tax & SARS</h3>
                    <p className="text-sm text-gray-500">8 tools & guides</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  SARS tax calculators, eFiling guides, and compliance tools for South African taxpayers.
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  Explore category
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Property Category */}
            <div className="group">
              <Link href="/category/property" className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">Property</h3>
                    <p className="text-sm text-gray-500">6 tools & guides</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Transfer duty, bond calculators, and property investment analysis tools.
                </p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  Explore category
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Banking Category */}
            <div className="group">
              <Link href="/category/banking" className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">Banking</h3>
                    <p className="text-sm text-gray-500">12 tools & guides</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Bank-specific calculators for Standard Bank, FNB, and other major SA banks.
                </p>
                <div className="flex items-center text-sm text-purple-600 font-medium">
                  Explore category
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Insurance Category */}
            <div className="group">
              <Link href="/category/insurance" className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">Insurance</h3>
                    <p className="text-sm text-gray-500">5 tools & guides</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Compare Discovery, Sanlam, and Old Mutual insurance products and rates.
                </p>
                <div className="flex items-center text-sm text-orange-600 font-medium">
                  Explore category
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Ahead of South African Finance
            </h2>
            <p className="text-xl text-green-100">
              Get weekly insights on SARS updates, market trends, and financial planning strategies delivered to your inbox.
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

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
                South Africa's most comprehensive financial tools platform. Calculate taxes, compare insurance, plan investments, and access expert financial guidance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/south-africa-tax-calculator" className="text-gray-400 hover:text-white transition-colors">SARS Tax Calculator</Link></li>
                <li><Link href="/south-africa-property-transfer-calculator" className="text-gray-400 hover:text-white transition-colors">Property Transfer</Link></li>
                <li><Link href="/south-africa-insurance-comparison" className="text-gray-400 hover:text-white transition-colors">Insurance Comparison</Link></li>
                <li><Link href="/articles" className="text-gray-400 hover:text-white transition-colors">Financial Guides</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/category/tax-sars" className="text-gray-400 hover:text-white transition-colors">Tax & SARS</Link></li>
                <li><Link href="/category/property" className="text-gray-400 hover:text-white transition-colors">Property</Link></li>
                <li><Link href="/category/banking" className="text-gray-400 hover:text-white transition-colors">Banking</Link></li>
                <li><Link href="/category/insurance" className="text-gray-400 hover:text-white transition-colors">Insurance</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Genius Insights. All rights reserved. Financial tools and calculators for South Africa.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}