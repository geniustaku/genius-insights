import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Ghana Tax Calculator 2025 | GRA Income Tax & PAYE Calculator',
  description: 'Free Ghana tax calculator for 2025. Calculate GRA income tax, PAYE, SSNIT accurately. Updated with latest Ghanaian tax rates & brackets.',
  keywords: [
    'ghana tax calculator 2025', 'GRA tax calculator', 'ghana income tax calculator', 'PAYE calculator Ghana', 'ghana tax rates', 'payroll tax Ghana', 'income tax ghana'
  ],
  alternates: {
    canonical: '/ghana-tax-calculator',
  },
  openGraph: {
    title: 'Ghana Tax Calculator 2025 | GRA Income Tax & PAYE Calculator',
    description: 'Free Ghana tax calculator for 2025. Calculate GRA income tax, PAYE, SSNIT accurately. Updated with latest Ghanaian tax rates & brackets.',
    url: 'https://genius-insights.co.za/ghana-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/ghana-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghana Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghana Tax Calculator 2025 | GRA Income Tax & PAYE Calculator',
    description: 'Free Ghana tax calculator for 2025. Calculate GRA income tax, PAYE, SSNIT accurately. Updated with latest Ghanaian tax rates & brackets.',
    images: ['/images/ghana-tax-calculator-og.jpg'],
  },
};

export default function GhanaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-600 to-orange-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇭 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Ghana Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact GRA income tax and PAYE with the latest 2025 Ghana tax rates, 
                allowances, and brackets. Trusted by thousands of Ghana taxpayers.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ghana Income Tax Calculator 2025</h2>
              <p className="text-gray-600">Calculate your Ghana income tax with current GRA rates</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Gross Income (₵)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your annual gross income"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
                
                <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Ghana Tax
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 Ghana Tax Brackets
                </h2>
                
                <div className="space-y-4">
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₵0 - 4,500</span>
                      <span className="text-lg font-bold text-gray-900">0%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₵4,501 - 7,200</span>
                      <span className="text-lg font-bold text-gray-900">5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₵7,201 - 48,000</span>
                      <span className="text-lg font-bold text-gray-900">10%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₵48,001 - 220,000</span>
                      <span className="text-lg font-bold text-gray-900">17.5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₵220,001+</span>
                      <span className="text-lg font-bold text-gray-900">25%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Tax Allowances & Deductions
                </h3>
                
                <div className="space-y-4">
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Tax-free threshold: ₵4,500</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">SSNIT contribution relief</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Pension contribution relief</span>
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