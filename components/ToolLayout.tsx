'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  category: string;
  heroImage: string;
  relatedTools?: Array<{
    name: string;
    href: string;
    image: string;
    description: string;
    category: string;
  }>;
  relatedArticles?: Array<{
    title: string;
    href: string;
    image: string;
    excerpt: string;
    category: string;
    readTime: string;
  }>;
}

export default function ToolLayout({ 
  children, 
  title, 
  category, 
  heroImage, 
  relatedTools = [], 
  relatedArticles = [] 
}: ToolLayoutProps) {
  const defaultRelatedTools = [
    {
      name: 'Property Transfer Calculator',
      href: '/south-africa-property-transfer-calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate transfer duty and bond costs',
      category: 'Property'
    },
    {
      name: 'Retirement Calculator',
      href: '/south-africa-retirement-calculator',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      description: 'Plan your retirement savings',
      category: 'Investment'
    },
    {
      name: 'Insurance Calculator',
      href: '/south-africa-insurance-calculator',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      description: 'Compare insurance premiums',
      category: 'Insurance'
    }
  ];

  const defaultRelatedArticles = [
    {
      title: 'SARS eFiling Registration Guide',
      href: '/articles/sars-efiling-registration',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Complete step-by-step guide to register for SARS eFiling',
      category: 'Tax & SARS',
      readTime: '8 min read'
    },
    {
      title: 'South African Tax Brackets Explained',
      href: '/articles/sa-tax-brackets-2025',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Understanding the 2025 tax brackets and rebates',
      category: 'Tax & SARS',
      readTime: '6 min read'
    },
    {
      title: 'PAYE vs SARS Tax Returns',
      href: '/articles/paye-vs-tax-returns',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      excerpt: 'When to submit tax returns even if you pay PAYE',
      category: 'Tax & SARS',
      readTime: '5 min read'
    }
  ];

  const toolsToShow = relatedTools.length > 0 ? relatedTools : defaultRelatedTools;
  const articlesToShow = relatedArticles.length > 0 ? relatedArticles : defaultRelatedArticles;

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-medium">Admin</Link>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <Link href="/tools" className="hover:text-gray-700">Tools</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{category}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              {/* Hero Image */}
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  <span className="bg-green-600 px-3 py-1 text-xs font-bold rounded-full mb-2 inline-block">
                    {category.toUpperCase()}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
                </div>
              </div>
            </div>
            
            {children}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Market Update */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">📊 Market Update</h3>
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

            {/* Related Tools */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">🔧 Related Tools</h3>
              <div className="space-y-4">
                {toolsToShow.slice(0, 3).map((tool, index) => (
                  <Link key={index} href={tool.href} className="block group">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image
                        src={tool.image}
                        alt={tool.name}
                        width={60}
                        height={45}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-green-600 transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-gray-600">{tool.description}</p>
                        <span className="text-xs text-gray-500">{tool.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">📰 Related Guides</h3>
              <div className="space-y-4">
                {articlesToShow.slice(0, 3).map((article, index) => (
                  <Link key={index} href={article.href} className="block group">
                    <div className="space-y-2">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={300}
                        height={150}
                        className="w-full h-24 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">{article.excerpt}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-blue-600 font-medium">{article.category}</span>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-3">💌 Stay Updated</h3>
              <p className="text-sm text-green-100 mb-4">Get weekly financial insights and tool updates</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded text-gray-900 text-sm"
                />
                <button className="w-full bg-white text-green-600 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Financial Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolsToShow.map((tool, index) => (
              <Link key={index} href={tool.href} className="group block">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Financial Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articlesToShow.map((article, index) => (
              <Link key={index} href={article.href} className="group block">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}