import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import CanadaPropertyCalculatorClient from './CanadaPropertyCalculatorClient';

export const metadata: Metadata = {
  title: 'Canada Property Calculator 2025 | Real Estate Investment & Mortgage Calculator',
  description: 'Free Canada property calculator for 2025. Calculate home affordability, mortgage payments, property taxes, and real estate investment returns. Ontario, BC, Alberta rates.',
  keywords: [
    'canada property calculator 2025', 'canada mortgage calculator', 'canada real estate calculator', 'home affordability canada', 'property tax calculator canada', 'ontario property calculator', 'bc property calculator', 'alberta property calculator'
  ],
  alternates: {
    canonical: '/canada-property-calculator',
  },
  openGraph: {
    title: 'Canada Property Calculator 2025 | Real Estate Investment & Mortgage Calculator',
    description: 'Free Canada property calculator for 2025. Calculate home affordability, mortgage payments, property taxes, and real estate investment returns.',
    url: 'https://genius-insights.co.za/canada-property-calculator',
    type: 'website',
    images: [
      {
        url: '/images/canada-property-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada Property Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada Property Calculator 2025 | Real Estate Investment & Mortgage Calculator',
    description: 'Free Canada property calculator for 2025. Calculate home affordability, mortgage payments, property taxes, and real estate investment returns.',
    images: ['/images/canada-property-calculator-og.jpg'],
  },
};

export default function CanadaPropertyCalculatorPage() {
  return (
    <>
      <StructuredData type="property-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇨🇦 2025 Property Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Canada Property Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate home affordability, mortgage payments, property taxes, and investment returns 
                for Canadian real estate with updated 2025 rates.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <CanadaPropertyCalculatorClient />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Canada Property Tax Rates by Province
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Ontario</span>
                      <span className="text-lg font-bold text-gray-900">0.5-2.5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">British Columbia</span>
                      <span className="text-lg font-bold text-gray-900">0.2-1.2%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Alberta</span>
                      <span className="text-lg font-bold text-gray-900">0.5-1.5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Quebec</span>
                      <span className="text-lg font-bold text-gray-900">0.5-3.0%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Additional Costs to Consider
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">CMHC Insurance (if down payment < 20%)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Legal fees and title insurance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Home inspection costs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Moving and utility connection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Provincial land transfer tax</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}