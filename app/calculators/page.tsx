'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdSenseAd from '@/components/AdSenseAd';

export default function CalculatorsPage() {
  const calculatorCategories = [
    {
      name: 'Tax & SARS Calculators',
      icon: '🇿🇦',
      description: 'SARS-compliant tax calculators for individuals and businesses',
      calculators: [
        {
          name: 'SARS Income Tax Calculator 2025',
          href: '/south-africa-tax-calculator',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate income tax, PAYE, UIF, and SDL with 2025/2026 tax year rates',
          tags: ['Income Tax', 'PAYE', 'UIF', 'SDL']
        },
        {
          name: 'VAT Calculator',
          href: '/south-africa-vat-calculator',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate VAT on goods and services with current SA VAT rates',
          tags: ['VAT', 'Value Added Tax', 'Business']
        }
      ]
    },
    {
      name: 'Property Calculators',
      icon: '🏠',
      description: 'Real estate and property investment calculators for South Africa',
      calculators: [
        {
          name: 'Property Transfer Calculator',
          href: '/south-africa-property-transfer-calculator',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate transfer duty, bond costs, and attorney fees for property transfers',
          tags: ['Transfer Duty', 'Bond Costs', 'Attorney Fees']
        },
        {
          name: 'Rental Yield Calculator',
          href: '/south-africa-rental-yield-calculator',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate rental yields and property investment returns',
          tags: ['Rental Yield', 'Property Investment', 'ROI']
        }
      ]
    },
    {
      name: 'Banking & Loans',
      icon: '🏦',
      description: 'Loan calculators for all major South African banks',
      calculators: [
        {
          name: 'Home Loan Calculator',
          href: '/south-africa-loan-calculator',
          image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate home loan affordability and monthly repayments',
          tags: ['Home Loans', 'Mortgage', 'Prime Rate']
        },
        {
          name: 'FNB Calculator',
          href: '/south-africa-fnb-calculator',
          image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
          description: 'FNB-specific loan and banking calculators',
          tags: ['FNB', 'First National Bank', 'Banking']
        },
        {
          name: 'Standard Bank Calculator',
          href: '/south-africa-standard-bank-calculator',
          image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
          description: 'Standard Bank loan and investment calculators',
          tags: ['Standard Bank', 'Loans', 'Investments']
        }
      ]
    },
    {
      name: 'Insurance Calculators',
      icon: '🛡️',
      description: 'Compare insurance premiums from top SA insurers',
      calculators: [
        {
          name: 'Life Insurance Calculator',
          href: '/south-africa-insurance-calculator',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
          description: 'Compare life insurance, medical aid, and short-term insurance',
          tags: ['Life Insurance', 'Medical Aid', 'Discovery', 'Sanlam']
        }
      ]
    },
    {
      name: 'Investment & Retirement',
      icon: '📈',
      description: 'Plan your financial future with SA retirement and investment calculators',
      calculators: [
        {
          name: 'Retirement Calculator',
          href: '/south-africa-retirement-calculator',
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate retirement savings, pension, and retirement annuity',
          tags: ['Retirement', 'Pension', 'RA', 'Provident Fund']
        },
        {
          name: 'Investment Calculator',
          href: '/south-africa-investment-calculator',
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate investment returns and compound interest',
          tags: ['JSE', 'Unit Trusts', 'Compound Interest']
        }
      ]
    },
    {
      name: 'Business Calculators',
      icon: '💼',
      description: 'Business setup and operational cost calculators',
      calculators: [
        {
          name: 'Business Registration Calculator',
          href: '/south-africa-business-registration-calculator',
          image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop&crop=center',
          description: 'Calculate CIPC registration and business setup costs',
          tags: ['CIPC', 'Company Registration', 'Pty Ltd']
        }
      ]
    }
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
                <Link href="/guides" className="text-gray-600 hover:text-gray-900 font-medium">Guides</Link>
                <Link href="/tools" className="text-gray-600 hover:text-gray-900 font-medium">Tools</Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 font-medium">News</Link>
                <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600">Calculators</Link>
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

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Financial Calculators</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              South African Financial Calculators
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Free, accurate, and up-to-date financial calculators for South Africa. Calculate tax, property costs, 
              loans, insurance, retirement planning, and more with the latest SA rates and regulations for 2025.
            </p>
            <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                SARS Compliant
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                2025 Updated
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Always Free
              </span>
            </div>
          </div>

          {/* Top Banner Ad */}
          <div className="mb-12 text-center">
            <AdSenseAd 
              adSlot="3043670508" 
              adFormat="auto"
              style={{ display: 'block', minHeight: '90px' }}
              className="border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Calculators by Category */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {calculatorCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center mb-6">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {category.calculators.map((calculator, calcIndex) => (
                      <article key={calcIndex} className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-green-200">
                        <Link href={calculator.href}>
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={calculator.image}
                              alt={calculator.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-green-600 border border-white/20">
                                {category.name.replace(' Calculators', '')}
                              </span>
                            </div>
                          </div>
                        </Link>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              Free Calculator
                            </span>
                            <span className="text-sm text-gray-500">
                              2025 Updated
                            </span>
                          </div>
                          
                          <Link href={calculator.href}>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                              {calculator.name}
                            </h3>
                          </Link>
                          
                          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                            {calculator.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {calculator.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <Link 
                              href={calculator.href}
                              className="group inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
                            >
                              Calculate
                              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Mid-content Ad every 2 categories */}
                  {(categoryIndex + 1) % 2 === 0 && (
                    <div className="mb-8 text-center">
                      <AdSenseAd 
                        adSlot="5662611907" 
                        adFormat="autorelaxed"
                        style={{ display: 'block', minHeight: '280px' }}
                        className="border border-gray-200 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Quick Calculator Access */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">🚀 Quick Access</h3>
                <div className="space-y-3">
                  <Link href="/south-africa-tax-calculator" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="font-semibold text-sm text-green-700">Tax Calculator</div>
                    <div className="text-xs text-green-600">Most Popular</div>
                  </Link>
                  <Link href="/south-africa-property-transfer-calculator" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="font-semibold text-sm text-blue-700">Property Transfer</div>
                    <div className="text-xs text-blue-600">Calculate transfer costs</div>
                  </Link>
                  <Link href="/south-africa-retirement-calculator" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="font-semibold text-sm text-purple-700">Retirement Planning</div>
                    <div className="text-xs text-purple-600">Plan your future</div>
                  </Link>
                </div>
              </div>

              {/* Market Rates */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">📊 Current SA Rates</h3>
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
                    <span className="text-sm text-gray-700">VAT Rate</span>
                    <span className="font-bold text-blue-600">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">UIF Rate</span>
                    <span className="font-bold text-purple-600">2%</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="text-center">
                <AdSenseAd 
                  adSlot="5279468522" 
                  adFormat="auto"
                  style={{ display: 'block', minHeight: '250px' }}
                  className="border border-gray-200 rounded-lg"
                />
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">📰 Calculator Guides</h3>
                <div className="space-y-3">
                  <Link href="/articles/how-to-calculate-sars-tax" className="block text-sm text-gray-700 hover:text-blue-600">
                    How to Calculate SARS Income Tax
                  </Link>
                  <Link href="/articles/property-transfer-costs-explained" className="block text-sm text-gray-700 hover:text-blue-600">
                    Property Transfer Costs Explained
                  </Link>
                  <Link href="/articles/retirement-calculator-guide" className="block text-sm text-gray-700 hover:text-blue-600">
                    Using Retirement Calculators Effectively
                  </Link>
                  <Link href="/articles/home-loan-affordability" className="block text-sm text-gray-700 hover:text-blue-600">
                    Home Loan Affordability Guidelines
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-3">💌 Calculator Updates</h3>
                <p className="text-sm text-green-100 mb-4">Get notified when we add new calculators and update rates</p>
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

      {/* Bottom Ad */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AdSenseAd 
              adSlot="4969876131" 
              adLayout="in-article"
              adFormat="fluid"
              style={{ display: 'block', minHeight: '250px' }}
              className="border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* SEO Footer */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Tax Calculators</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• SARS Income Tax Calculator 2025</li>
                <li>• PAYE Tax Calculator South Africa</li>
                <li>• VAT Calculator SA</li>
                <li>• UIF Contribution Calculator</li>
                <li>• SDL Calculator</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Property Calculators</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Transfer Duty Calculator SA</li>
                <li>• Bond Costs Calculator</li>
                <li>• Property Investment Calculator</li>
                <li>• Rental Yield Calculator</li>
                <li>• Capital Gains Tax Calculator</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Banking Calculators</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Home Loan Calculator SA</li>
                <li>• Personal Loan Calculator</li>
                <li>• Vehicle Finance Calculator</li>
                <li>• FNB Calculator</li>
                <li>• Standard Bank Calculator</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Investment Calculators</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Retirement Calculator SA</li>
                <li>• Retirement Annuity Calculator</li>
                <li>• Compound Interest Calculator</li>
                <li>• Unit Trust Calculator</li>
                <li>• Tax Free Savings Calculator</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              All calculators are regularly updated with the latest South African tax rates, interest rates, 
              and financial regulations to ensure accuracy and SARS compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}