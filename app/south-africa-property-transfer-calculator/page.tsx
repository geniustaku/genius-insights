import type { Metadata } from 'next';
import React from 'react';
import SouthAfricaPropertyTransferCalculator from '@/components/SouthAfricaPropertyTransferCalculator';
import StructuredData from '@/components/StructuredData';
import ToolLayout from '@/components/ToolLayout';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Transfer Cost Calculator SA 2026 | Transfer Duty',
  description: 'Calculate transfer costs when buying a house in South Africa. Transfer duty, conveyancing fees, bond registration costs & attorney fees with 2026 rates. Free instant calculator.',
  keywords: [
    'transfer cost calculator south africa',
    'transfer duty calculator 2026',
    'how much are transfer costs when buying a house',
    'property transfer costs south africa',
    'conveyancing fees calculator SA',
    'transfer duty rates 2026 south africa',
    'bond registration costs calculator',
    'property attorney fees south africa',
    'first time buyer transfer duty exemption',
    'transfer costs when buying a house south africa',
    'deeds office fees calculator',
    'property buying costs south africa 2026',
    'transfer duty exemption R1 million',
    'conveyancer fees south africa',
    'how much is transfer duty on a house',
    'property transfer process south africa',
    'additional costs when buying a house SA'
  ],
  alternates: {
    canonical: '/south-africa-property-transfer-calculator',
  },
  openGraph: {
    title: 'Transfer Cost Calculator SA 2026 | Transfer Duty',
    description: 'Calculate all transfer costs when buying a house in SA. Transfer duty, conveyancing fees, bond registration & attorney fees. Updated 2026 rates.',
    url: 'https://genius-insights.co.za/south-africa-property-transfer-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-property-transfer-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Transfer Cost Calculator South Africa 2026 - Transfer Duty & Conveyancing Fees',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transfer Cost Calculator SA 2026 | Transfer Duty',
    description: 'How much are transfer costs when buying a house? Calculate transfer duty, conveyancing fees & bond registration with 2026 SA rates.',
    images: ['/images/sa-property-transfer-calculator-og.jpg'],
  },
};

export default function SouthAfricaPropertyTransferCalculatorPage() {
  const relatedTools = [
    {
      name: 'SARS Tax Calculator',
      href: '/south-africa-tax-calculator',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate income tax, PAYE, UIF, and SDL with 2026/2027 rates',
      category: 'Tax & SARS'
    },
    {
      name: 'Rental Yield Calculator',
      href: '/south-africa-rental-yield-calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate rental yields and property investment returns',
      category: 'Property'
    },
    {
      name: 'Home Loan Calculator',
      href: '/south-africa-loan-calculator',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate home loan affordability and monthly repayments',
      category: 'Banking'
    }
  ];

  const relatedArticles = [
    {
      title: 'Property Transfer Process Guide',
      href: '/articles/property-transfer-process-sa',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Step-by-step guide to the property transfer process in South Africa',
      category: 'Property',
      readTime: '10 min read'
    },
    {
      title: 'Transfer Duty Exemptions Explained',
      href: '/articles/transfer-duty-exemptions-sa',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Understanding when you can claim transfer duty exemptions',
      category: 'Property',
      readTime: '7 min read'
    },
    {
      title: 'First Time Home Buyer Guide SA',
      href: '/articles/first-time-home-buyer-guide-sa',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Complete guide for first-time property buyers in South Africa',
      category: 'Property',
      readTime: '12 min read'
    }
  ];

  return (
    <>
      <StructuredData type="property-transfer-calculator" />
      <ToolLayout
        title="Transfer Cost Calculator South Africa 2026"
        category="Property"
        heroImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&crop=center"
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏠 2026 Transfer Rates</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Transfer Cost Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                How much are transfer costs when buying a house? Calculate transfer duty, conveyancing fees,
                bond registration costs and attorney fees with the latest 2026 South African rates.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2026</div>
                  <div className="text-white/80 text-sm">Updated Rates</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">75K+</div>
                  <div className="text-white/80 text-sm">Property Buyers</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/80 text-sm">Accurate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Calculator</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Display Ad 3 - Before Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd 
            adSlot="5341658648"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaPropertyTransferCalculator />
        </div>

        {/* Display Ad 4 - After Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd 
            adSlot="2386701555"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            {/* Multiplex Ad - Within Information Section */}
            <div className="mb-8 text-center">
              <AdSenseAd 
                adSlot="9985989974"
                adFormat="autorelaxed"
                style={{ display: 'block', minHeight: '280px' }}
                className="border border-gray-200 rounded-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Transfer Duty Rates South Africa 2026
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  How much is transfer duty on a house in South Africa? Use our calculator to see the
                  exact transfer duty, conveyancing fees and total costs when buying property in 2026.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🆓', title: 'No Transfer Duty', desc: 'Properties up to R1,000,000' },
                    { icon: '💰', title: '3% Transfer Duty', desc: 'R1,000,001 - R1,375,000' },
                    { icon: '📈', title: '6% Transfer Duty', desc: 'R1,375,001 - R1,925,000' },
                    { icon: '🔥', title: '8%+ Transfer Duty', desc: 'Properties above R1,925,000' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl">
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
                  What Are the Costs When Buying a House in SA?
                </h3>
                
                <div className="space-y-4">
                  {[
                    { cost: 'Transfer Duty', range: '0% - 13%', color: 'bg-red-500' },
                    { cost: 'Transfer Attorney Fees', range: '~1%', color: 'bg-orange-500' },
                    { cost: 'Bond Attorney Fees', range: '~1.5%', color: 'bg-yellow-500' },
                    { cost: 'Bond Registration', range: '0.1%', color: 'bg-green-500' },
                    { cost: 'Deeds Office Fees', range: '~R500', color: 'bg-blue-500' },
                    { cost: 'Total Estimated', range: '2-16%', color: 'bg-purple-600' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.cost}</span>
                        <span className="text-lg font-bold text-gray-900">{item.range}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-orange-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Money-Saving Tips</h4>
                      <ul className="text-orange-800 text-sm leading-relaxed space-y-1">
                        <li>• First-time buyers under R1M: No transfer duty</li>
                        <li>• Shop around for attorney quotes</li>
                        <li>• Budget 8-12% of property value for all costs</li>
                        <li>• Consider negotiating transfer costs with seller</li>
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