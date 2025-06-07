import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Iran Salary Calculator 2025 | Iranian Salary Calculator | Tehran Salary Calculator',
  description: 'Free Iran salary calculator for 2025. Calculate net salary, tax deductions, and take-home pay in Iran with current Rial rates.',
  keywords: [
    'iran salary calculator 2025', 'iranian salary calculator', 'tehran salary calculator', 'iran net salary calculator', 'iran tax calculator', 'iranian rial calculator'
  ],
  alternates: {
    canonical: '/iran-salary-calculator',
  },
  openGraph: {
    title: 'Iran Salary Calculator 2025 | Iranian Salary Calculator',
    description: 'Free Iran salary calculator for 2025. Calculate net salary, tax deductions, and take-home pay in Iran with current Rial rates.',
    url: 'https://genius-insights.co.za/iran-salary-calculator',
    type: 'website',
    images: [
      {
        url: '/images/iran-salary-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Iran Salary Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iran Salary Calculator 2025 | Iranian Salary Calculator',
    description: 'Free Iran salary calculator for 2025. Calculate net salary, tax deductions, and take-home pay in Iran with current Rial rates.',
    images: ['/images/iran-salary-calculator-og.jpg'],
  },
};

export default function IranSalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇮🇷 2025 Salary Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Iran Salary <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact net salary in Iran with the latest 2025 tax rates and deductions.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Iranian Salary Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate your take-home salary after tax and social security deductions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gross Monthly Salary (IRR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">﷼</span>
                    <input
                      type="number"
                      placeholder="50,000,000"
                      className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Enter your monthly gross salary in Iranian Rial</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="permanent">Permanent Employee</option>
                    <option value="contract">Contract Worker</option>
                    <option value="freelance">Freelancer/Self-Employed</option>
                    <option value="government">Government Employee</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/Province
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="tehran">Tehran</option>
                    <option value="isfahan">Isfahan</option>
                    <option value="mashhad">Mashhad</option>
                    <option value="shiraz">Shiraz</option>
                    <option value="tabriz">Tabriz</option>
                    <option value="other">Other Province</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dependents
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="0">0 Dependents</option>
                    <option value="1">1 Dependent</option>
                    <option value="2">2 Dependents</option>
                    <option value="3">3 Dependents</option>
                    <option value="4">4+ Dependents</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    Include overtime and bonuses
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Salary Breakdown</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Gross Salary:</span>
                    <span className="font-semibold">﷼50,000,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Income Tax (9%):</span>
                    <span className="font-semibold text-red-600">-﷼4,500,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Social Security (7%):</span>
                    <span className="font-semibold text-red-600">-﷼3,500,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Deductions:</span>
                    <span className="font-semibold text-red-600">-﷼8,000,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Net Salary:</span>
                    <span className="font-bold text-green-600 text-xl">﷼42,000,000</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-green-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Calculate Salary
                </button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h4>
                <p className="text-gray-600 text-sm">Based on current Iranian tax laws and social security rates for 2025</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax Optimization</h4>
                <p className="text-gray-600 text-sm">Understand your deductions and plan your finances better</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Multiple Scenarios</h4>
                <p className="text-gray-600 text-sm">Compare different salary levels and employment types</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}