'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdSenseAd from '@/components/AdSenseAd';
import { usePageVisit } from '@/hooks/usePageVisit';

export default function ToolsPage() {
  // Track tools page visits
  usePageVisit('/tools');
  const tools = [
    {
      name: 'SARS Tax Calculator 2025',
      href: '/south-africa-tax-calculator',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate your exact SARS income tax, PAYE, UIF, and SDL with the latest 2025/2026 tax tables and rebates',
      category: 'Tax & SARS',
      popular: true,
      tags: ['SARS', 'Income Tax', 'PAYE', 'UIF', 'SDL', '2025']
    },
    {
      name: 'Property Transfer Calculator',
      href: '/south-africa-property-transfer-calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate transfer duty, bond costs, attorney fees, and all property transfer costs in South Africa',
      category: 'Property',
      popular: true,
      tags: ['Property', 'Transfer Duty', 'Bond Costs', 'Attorney Fees']
    },
    {
      name: 'Retirement Calculator',
      href: '/south-africa-retirement-calculator',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      description: 'Plan your retirement savings, pension contributions, and retirement annuity in South Africa',
      category: 'Investment',
      popular: true,
      tags: ['Retirement', 'Pension', 'RA', 'Provident Fund']
    },
    {
      name: 'VAT Calculator',
      href: '/south-africa-vat-calculator',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate VAT on goods and services with South African VAT rates and exemptions',
      category: 'Tax & SARS',
      popular: false,
      tags: ['VAT', 'Value Added Tax', 'SARS', 'Business Tax']
    },
    {
      name: 'Loan Calculator',
      href: '/south-africa-loan-calculator',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate personal loans, home loans, and vehicle finance with South African interest rates',
      category: 'Banking',
      popular: false,
      tags: ['Loans', 'Home Loans', 'Vehicle Finance', 'Interest Rates']
    },
    {
      name: 'Insurance Calculator',
      href: '/south-africa-insurance-calculator',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      description: 'Compare life insurance, medical aid, and short-term insurance premiums from top SA insurers',
      category: 'Insurance',
      popular: false,
      tags: ['Life Insurance', 'Medical Aid', 'Car Insurance', 'Discovery', 'Sanlam']
    },
    {
      name: 'Investment Calculator',
      href: '/south-africa-investment-calculator',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate compound interest, unit trusts, and JSE stock investment returns',
      category: 'Investment',
      popular: false,
      tags: ['JSE', 'Unit Trusts', 'Compound Interest', 'Investments']
    },
    {
      name: 'Fuel Cost Calculator',
      href: '/south-africa-fuel-cost-calculator',
      image: 'https://images.unsplash.com/photo-1586953211146-04f00b44de96?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate fuel costs, petrol prices, and travel expenses with current South African fuel prices',
      category: 'Transport',
      popular: false,
      tags: ['Fuel Costs', 'Petrol Price', 'Travel Expenses', 'AA']
    },
    {
      name: 'Business Registration Calculator',
      href: '/south-africa-business-registration-calculator',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate CIPC registration costs, company registration fees, and business setup costs',
      category: 'Business',
      popular: false,
      tags: ['CIPC', 'Company Registration', 'Business Setup', 'Pty Ltd']
    },
    {
      name: 'FNB Calculator',
      href: '/south-africa-fnb-calculator',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
      description: 'FNB-specific banking calculators for home loans, personal loans, and investment products',
      category: 'Banking',
      popular: false,
      tags: ['FNB', 'First National Bank', 'Home Loans', 'Banking']
    },
    {
      name: 'Standard Bank Calculator',
      href: '/south-africa-standard-bank-calculator',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
      description: 'Standard Bank calculators for mortgages, personal loans, and investment accounts',
      category: 'Banking',
      popular: false,
      tags: ['Standard Bank', 'Mortgages', 'Personal Loans', 'Investment']
    },
    {
      name: 'Rental Yield Calculator',
      href: '/south-africa-rental-yield-calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate rental yields, property investment returns, and cash flow for SA real estate',
      category: 'Property',
      popular: false,
      tags: ['Rental Yield', 'Property Investment', 'Cash Flow', 'Real Estate']
    }
  ];

  const categories = [
    { name: 'Tax & SARS', icon: '🇿🇦', count: tools.filter(t => t.category === 'Tax & SARS').length, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Property', icon: '🏠', count: tools.filter(t => t.category === 'Property').length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Banking', icon: '🏦', count: tools.filter(t => t.category === 'Banking').length, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Insurance', icon: '🛡️', count: tools.filter(t => t.category === 'Insurance').length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Investment', icon: '📈', count: tools.filter(t => t.category === 'Investment').length, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Business', icon: '💼', count: tools.filter(t => t.category === 'Business').length, color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { name: 'Transport', icon: '🚗', count: tools.filter(t => t.category === 'Transport').length, color: 'bg-orange-50 text-orange-700 border-orange-200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Genius Insights</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/guides" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">Guides</Link>
                <Link href="/tools" className="text-emerald-600 hover:text-emerald-700 font-medium pb-4 border-b-2 border-emerald-600">Tools</Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">News</Link>
                <Link href="/calculators" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">Calculators</Link>
                <Link href="/market" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">Market</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all font-medium shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-900 font-medium">Financial Tools</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              South African Financial 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"> Tools</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Comprehensive financial calculators designed specifically for South Africa. 
              Calculate SARS tax, property transfers, retirement planning, and more 
              with the latest South African rates and regulations.
            </p>
            
            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white border border-emerald-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-emerald-700">2025/2026 Tax Year</span>
              </div>
              <div className="bg-white border border-blue-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700">SARS Compliant</span>
              </div>
              <div className="bg-white border border-purple-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-700">100% Free</span>
              </div>
              <div className="bg-white border border-amber-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium text-amber-700">Updated Daily</span>
              </div>
            </div>

            {/* AdSense Ad Unit 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <AdSenseAd 
                adSlot="3043670508"
                className="text-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {categories.map((category, index) => (
              <div key={index} className={`${category.color} border rounded-2xl p-6 text-center hover:shadow-md transition-all cursor-pointer group`}>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                <div className="font-semibold text-sm mb-1">{category.name}</div>
                <div className="text-xs opacity-75">{category.count} tools</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Tools Grid */}
            <div className="lg:col-span-3">
              
              {/* Popular Tools */}
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">🔥</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Most Popular Tools</h2>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tools.filter(tool => tool.popular).map((tool, index) => (
                    <Link key={index} href={tool.href} className="group">
                      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                              POPULAR
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6">
                          <div className="mb-3">
                            <div className="text-sm font-medium text-emerald-600 mb-1">{tool.category}</div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {tool.name}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tool.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-600 font-medium text-sm">Free Tool</span>
                            <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Mid-Content Ad */}
                <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <AdSenseAd 
                    adSlot="5662611907"
                    adFormat="autorelaxed"
                    className="text-center"
                  />
                </div>
              </div>

              {/* All Tools */}
              <div>
                <div className="flex items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">📊</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">All Financial Tools</h2>
                  </div>
                </div>
                
                <div className="grid gap-6">
                  {tools.map((tool, index) => (
                    <Link key={index} href={tool.href} className="group">
                      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                        <div className="flex flex-col md:flex-row">
                          {/* Image Section */}
                          <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden">
                            <Image
                              src={tool.image}
                              alt={tool.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          
                          {/* Content Section */}
                          <div className="p-6 flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="text-sm font-medium text-blue-600 mb-1">{tool.category}</div>
                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {tool.name}
                                </h3>
                              </div>
                              {tool.popular && (
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                                  HOT
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{tool.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {tool.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <span key={tagIndex} className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center space-x-2 text-emerald-600 font-medium text-sm">
                                <span>Try Free</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                
                {/* Market Update */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">SA Market Update</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 font-medium">Repo Rate</span>
                      <span className="font-bold text-emerald-600">8.25%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 font-medium">Prime Rate</span>
                      <span className="font-bold text-emerald-600">11.75%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 font-medium">USD/ZAR</span>
                      <span className="font-bold text-red-600">R18.45</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 font-medium">JSE All Share</span>
                      <span className="font-bold text-blue-600">75,234</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-700 font-medium">Petrol (95)</span>
                      <span className="font-bold text-orange-600">R22.86/L</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <AdSenseAd 
                    adSlot="5279468522"
                    className="text-center"
                  />
                </div>

                {/* Related Guides */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📰</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Related Guides</h3>
                  </div>
                  <div className="space-y-3">
                    <Link href="/articles/sars-efiling-registration" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-600">How to Register for SARS eFiling</div>
                    </Link>
                    <Link href="/articles/sa-tax-brackets-2025" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-600">2025 South African Tax Brackets</div>
                    </Link>
                    <Link href="/articles/property-transfer-guide" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-600">Property Transfer Process Guide</div>
                    </Link>
                    <Link href="/articles/retirement-planning-sa" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-600">Retirement Planning in South Africa</div>
                    </Link>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-sm">💌</span>
                    </div>
                    <h3 className="font-bold text-lg">Stay Updated</h3>
                  </div>
                  <p className="text-sm text-white/90 mb-6 leading-relaxed">Get weekly financial insights and new tool updates delivered to your inbox</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                      Subscribe Free
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <div className="text-gray-400 font-medium mb-2">Advertisement</div>
            <div className="text-sm text-gray-400">970x250 - Bottom Leaderboard AdSense Space</div>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">About Our SA Financial Tools</h3>
              <p className="text-gray-600 leading-relaxed">
                Our comprehensive collection of South African financial calculators and tools are designed 
                specifically for SA residents. All tools are updated with the latest SARS tax tables, 
                interest rates, and South African financial regulations for 2025.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Popular Calculations</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>SARS Income Tax & PAYE Calculator</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Property Transfer Duty Calculator</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Retirement Annuity Calculator</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Home Loan Affordability Calculator</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Medical Aid Comparison Tool</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Business Tax Calculator</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Stay Compliant</h3>
              <p className="text-gray-600 leading-relaxed">
                All our calculators are regularly updated to ensure compliance with South African 
                Revenue Service (SARS) requirements, Reserve Bank regulations, and current market rates 
                from major SA financial institutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}