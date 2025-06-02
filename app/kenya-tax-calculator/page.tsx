import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Kenya Tax Calculator 2025 | KRA Income Tax & PAYE Calculator',
  description: 'Free Kenya tax calculator for 2025. Calculate KRA income tax, PAYE, NHIF, NSSF accurately. Updated with latest Kenyan tax rates & brackets.',
  keywords: [
    'kenya tax calculator 2025', 'KRA tax calculator', 'kenya income tax calculator', 'PAYE calculator Kenya', 'kenya tax rates', 'payroll tax Kenya', 'income tax kenya'
  ],
  alternates: {
    canonical: '/kenya-tax-calculator',
  },
  openGraph: {
    title: 'Kenya Tax Calculator 2025 | KRA Income Tax & PAYE Calculator',
    description: 'Free Kenya tax calculator for 2025. Calculate KRA income tax, PAYE, NHIF, NSSF accurately. Updated with latest Kenyan tax rates & brackets.',
    url: 'https://genius-insights.co.za/kenya-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/kenya-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Kenya Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenya Tax Calculator 2025 | KRA Income Tax & PAYE Calculator',
    description: 'Free Kenya tax calculator for 2025. Calculate KRA income tax, PAYE, NHIF, NSSF accurately. Updated with latest Kenyan tax rates & brackets.',
    images: ['/images/kenya-tax-calculator-og.jpg'],
  },
};

export default function KenyaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇰🇪 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Kenya Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact KRA income tax and PAYE with the latest 2025 Kenya tax rates, 
                allowances, and brackets. Trusted by thousands of Kenya taxpayers.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kenya Income Tax Calculator 2025</h2>
              <p className="text-gray-600">Calculate your Kenya income tax with current KRA rates</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Gross Income (KSh)</label>
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
                
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Kenya Tax
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
                  2025 Kenya Tax Brackets
                </h2>
                
                <div className="space-y-4">
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">KSh 0 - 288,000</span>
                      <span className="text-lg font-bold text-gray-900">10%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">KSh 288,001 - 388,000</span>
                      <span className="text-lg font-bold text-gray-900">25%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">KSh 388,001 - 6,000,000</span>
                      <span className="text-lg font-bold text-gray-900">30%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">KSh 6,000,001 - 9,600,000</span>
                      <span className="text-lg font-bold text-gray-900">32.5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">KSh 9,600,001+</span>
                      <span className="text-lg font-bold text-gray-900">35%</span>
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
                    <span className="text-gray-700">Personal relief: KSh 28,800 per year</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">NHIF contribution relief</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">NSSF contribution relief</span>
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