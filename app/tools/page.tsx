'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ToolsPage() {
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
    { name: 'Tax & SARS', icon: '🇿🇦', count: tools.filter(t => t.category === 'Tax & SARS').length, color: 'bg-green-100 text-green-700' },
    { name: 'Property', icon: '🏠', count: tools.filter(t => t.category === 'Property').length, color: 'bg-blue-100 text-blue-700' },
    { name: 'Banking', icon: '🏦', count: tools.filter(t => t.category === 'Banking').length, color: 'bg-purple-100 text-purple-700' },
    { name: 'Insurance', icon: '🛡️', count: tools.filter(t => t.category === 'Insurance').length, color: 'bg-orange-100 text-orange-700' },
    { name: 'Investment', icon: '📈', count: tools.filter(t => t.category === 'Investment').length, color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Business', icon: '💼', count: tools.filter(t => t.category === 'Business').length, color: 'bg-pink-100 text-pink-700' },
    { name: 'Transport', icon: '🚗', count: tools.filter(t => t.category === 'Transport').length, color: 'bg-yellow-100 text-yellow-700' }
  ];

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
                <Link href="/tools" className="text-green-600 hover:text-green-700 font-medium border-b-2 border-green-600">Tools</Link>
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
            <span className="text-gray-900 font-medium">Financial Tools</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              South African Financial Tools & Calculators
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Comprehensive financial calculators and tools designed specifically for South Africa. 
              Calculate SARS tax, property transfers, retirement planning, insurance premiums, and more 
              with the latest South African rates and regulations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                2025/2026 Tax Year Updated
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                SARS Compliant
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                100% Free
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Updated Daily
              </span>
            </div>
          </div>

          {/* Ad Space - Top Banner */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-12 text-center">
            <div className="text-gray-500 font-medium mb-2">Advertisement</div>
            <div className="text-sm text-gray-400">728x90 - Top Banner AdSense Space</div>
          </div>

          {/* Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
            {categories.map((category, index) => (
              <div key={index} className={`${category.color} rounded-lg p-4 text-center`}>
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-semibold text-sm">{category.name}</div>
                <div className="text-xs opacity-75">{category.count} tools</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Tools Grid */}
            <div className="lg:col-span-3">
              
              {/* Popular Tools */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-2">🔥</span>
                  Most Popular Financial Tools
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {tools.filter(tool => tool.popular).map((tool, index) => (
                    <Link key={index} href={tool.href} className="group block">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="relative h-48">
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-green-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                              POPULAR
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="font-bold text-lg text-white mb-1 group-hover:text-green-300 transition-colors">
                              {tool.name}
                            </h3>
                            <span className="text-sm text-gray-200">{tool.category}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {tool.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Ad Space - Mid Content */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-8 text-center">
                  <div className="text-gray-500 font-medium mb-2">Advertisement</div>
                  <div className="text-sm text-gray-400">336x280 - Medium Rectangle AdSense Space</div>
                </div>
              </div>

              {/* All Tools by Category */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Financial Tools</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {tools.map((tool, index) => (
                    <Link key={index} href={tool.href} className="group block">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="flex">
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <Image
                              src={tool.image}
                              alt={tool.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>
                          <div className="p-4 flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                                {tool.name}
                              </h3>
                              {tool.popular && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-bold rounded-full">
                                  HOT
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tool.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-blue-600 font-medium">{tool.category}</span>
                              <span className="text-green-600 text-sm font-medium">Free →</span>
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
            <div className="lg:col-span-1 space-y-8">
              
              {/* Market Update */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">📊 SA Market Update</h3>
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Petrol (95)</span>
                    <span className="font-bold text-orange-600">R22.86/L</span>
                  </div>
                </div>
              </div>

              {/* Ad Space - Sidebar */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="text-gray-500 font-medium mb-2">Advertisement</div>
                <div className="text-sm text-gray-400">300x250 - Sidebar AdSense</div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">📰 Related Guides</h3>
                <div className="space-y-3">
                  <Link href="/articles/sars-efiling-registration" className="block text-sm text-gray-700 hover:text-blue-600">
                    How to Register for SARS eFiling
                  </Link>
                  <Link href="/articles/sa-tax-brackets-2025" className="block text-sm text-gray-700 hover:text-blue-600">
                    2025 South African Tax Brackets
                  </Link>
                  <Link href="/articles/property-transfer-guide" className="block text-sm text-gray-700 hover:text-blue-600">
                    Property Transfer Process Guide
                  </Link>
                  <Link href="/articles/retirement-planning-sa" className="block text-sm text-gray-700 hover:text-blue-600">
                    Retirement Planning in South Africa
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-3">💌 Stay Updated</h3>
                <p className="text-sm text-green-100 mb-4">Get weekly financial insights and new tool updates</p>
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
        </div>
      </section>

      {/* Bottom Ad Space */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-500 font-medium mb-2">Advertisement</div>
            <div className="text-sm text-gray-400">970x250 - Bottom Leaderboard AdSense Space</div>
          </div>
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">About Our SA Financial Tools</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our comprehensive collection of South African financial calculators and tools are designed 
                specifically for SA residents. All tools are updated with the latest SARS tax tables, 
                interest rates, and South African financial regulations for 2025.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Popular Calculations</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• SARS Income Tax & PAYE Calculator</li>
                <li>• Property Transfer Duty Calculator</li>
                <li>• Retirement Annuity Calculator</li>
                <li>• Home Loan Affordability Calculator</li>
                <li>• Medical Aid Comparison Tool</li>
                <li>• Business Tax Calculator</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Stay Compliant</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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