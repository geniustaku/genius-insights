import type { Metadata } from 'next';
import React from 'react';
import SouthAfricaRetirementCalculator from '@/components/SouthAfricaRetirementCalculator';
import StructuredData from '@/components/StructuredData';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'South Africa Retirement Calculator 2025 | Pension Fund & Retirement Planning',
  description: 'Free SA retirement calculator 2025. Calculate pension fund, retirement annuity, provident fund savings. Plan your financial future with 2025 rates. Used by 150,000+ South Africans.',
  keywords: [
    'South Africa retirement calculator 2025', 'SA pension calculator', 'retirement planning South Africa', 'pension fund calculator SA', 'retirement annuity calculator', 'provident fund calculator SA', 'South African retirement planning', 'pension savings calculator', 'retirement income calculator SA', 'annuity calculator South Africa', 'pension withdrawal calculator', 'retirement fund calculator', 'SA retirement savings', 'financial planning calculator SA', 'retirement age calculator South Africa'
  ],
  alternates: {
    canonical: '/south-africa-retirement-calculator',
  },
  openGraph: {
    title: 'South Africa Retirement Calculator 2025 | Free Pension & Retirement Planning',
    description: '🏦 Plan your SA retirement! Calculate pension, provident fund, retirement annuity with 2025 rates. Free retirement planning tool for 150,000+ users.',
    url: 'https://genius-insights.co.za/south-africa-retirement-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-retirement-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Retirement Calculator 2025 - Pension Planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Retirement Calculator 2025 | Pension Planning Tool',
    description: '🏦 Free SA retirement calculator! Plan pension, provident fund, retirement savings with 2025 rates.',
    images: ['/images/sa-retirement-calculator-og.jpg'],
  },
};

export default function SouthAfricaRetirementCalculatorPage() {
  const relatedTools = [
    {
      name: 'SARS Tax Calculator',
      href: '/south-africa-tax-calculator',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate income tax, PAYE, UIF, and SDL with 2025/2026 rates',
      category: 'Tax & SARS'
    },
    {
      name: 'Investment Calculator',
      href: '/south-africa-investment-calculator',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate investment returns and compound interest',
      category: 'Investment'
    },
    {
      name: 'Life Insurance Calculator',
      href: '/south-africa-insurance-calculator',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      description: 'Compare life insurance and medical aid premiums',
      category: 'Insurance'
    }
  ];

  const relatedArticles = [
    {
      title: 'Retirement Planning Guide for South Africa',
      href: '/articles/retirement-planning-guide-sa',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Complete guide to retirement planning in South Africa',
      category: 'Retirement',
      readTime: '12 min read'
    },
    {
      title: 'Pension Fund vs Provident Fund Explained',
      href: '/articles/pension-vs-provident-fund-sa',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Understanding the differences between pension and provident funds',
      category: 'Retirement',
      readTime: '8 min read'
    },
    {
      title: 'Retirement Annuity Benefits and Tax Savings',
      href: '/articles/retirement-annuity-benefits-sa',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      excerpt: 'How retirement annuities can save you tax and build wealth',
      category: 'Retirement',
      readTime: '10 min read'
    }
  ];

  return (
    <>
      <StructuredData type="retirement-calculator" />
      <ToolLayout
        title="Retirement Calculator 2025"
        category="Investment"
        heroImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop&crop=center"
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏦 2025 Retirement Planning</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                SA Retirement Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Plan your financial future with our comprehensive South African retirement calculator. 
                Calculate pension funds, retirement annuities, and investment growth with 2025 rates.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">150K+</div>
                  <div className="text-white/80 text-sm">Users Planning</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R50M+</div>
                  <div className="text-white/80 text-sm">Retirement Planned</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025</div>
                  <div className="text-white/80 text-sm">Updated Rates</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Always</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaRetirementCalculator />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  SA Retirement Fund Types
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Understanding the different retirement fund options in South Africa will help you 
                  make informed decisions about your financial future and retirement planning.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🏢', title: 'Pension Fund', desc: 'Employer-sponsored retirement savings' },
                    { icon: '💰', title: 'Provident Fund', desc: 'Lump sum withdrawal on retirement' },
                    { icon: '📈', title: 'Retirement Annuity', desc: 'Individual retirement investment' },
                    { icon: '🏦', title: 'Preservation Fund', desc: 'Preserve benefits when changing jobs' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  2025 Retirement Planning Tips
                </h3>
                
                <div className="space-y-4">
                  {[
                    { tip: 'Start Early', benefit: '30+ years compound growth', color: 'bg-emerald-500' },
                    { tip: 'Contribute 15%+', benefit: 'Minimum recommended savings rate', color: 'bg-teal-500' },
                    { tip: 'Diversify Investments', benefit: 'Reduce risk, maximize returns', color: 'bg-cyan-500' },
                    { tip: 'Regular Reviews', benefit: 'Adjust strategy as needed', color: 'bg-blue-500' },
                    { tip: 'Tax Efficiency', benefit: 'Maximize tax deductions', color: 'bg-indigo-500' },
                    { tip: 'Inflation Protection', benefit: 'Maintain purchasing power', color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.tip}</span>
                        <span className="text-sm font-medium text-gray-600">Essential</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: '90%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{item.benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-emerald-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">Retirement Reality Check</h4>
                      <ul className="text-emerald-800 text-sm leading-relaxed space-y-1">
                        <li>• Most South Africans retire with only 10% of their final salary</li>
                        <li>• You need 75% of your pre-retirement income to maintain lifestyle</li>
                        <li>• Starting at 25 vs 35 can double your retirement savings</li>
                        <li>• Compound interest is your greatest wealth-building tool</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}