import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Morocco Tax Calculator 2025 | Moroccan Income Tax Calculator',
  description: 'Free Morocco tax calculator for 2025. Calculate Moroccan income tax accurately. Updated with latest tax rates.',
  keywords: [
    'morocco tax calculator 2025', 'morocco income tax calculator', 'tax calculator Morocco', 'morocco tax rates', 'payroll tax Morocco'
  ],
  alternates: {
    canonical: '/morocco-tax-calculator',
  },
  openGraph: {
    title: 'Morocco Tax Calculator 2025 | Moroccan Income Tax Calculator',
    description: 'Free Morocco tax calculator for 2025. Calculate Moroccan income tax accurately. Updated with latest tax rates.',
    url: 'https://genius-insights.co.za/morocco-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/morocco-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Morocco Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morocco Tax Calculator 2025 | Moroccan Income Tax Calculator',
    description: 'Free Morocco tax calculator for 2025. Calculate Moroccan income tax accurately. Updated with latest tax rates.',
    images: ['/images/morocco-tax-calculator-og.jpg'],
  },
};

export default function MoroccoTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-green-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇲🇦 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Morocco Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Morocco income tax with the latest 2025 tax rates and brackets.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Morocco Income Tax Calculator 2025</h2>
              <p className="text-gray-600">Calculate your Morocco income tax with current tax rates</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Gross Income (DH)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your annual gross income"
                  />
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Morocco Tax
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}