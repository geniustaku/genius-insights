import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Japan Tax Calculator 2025 | Japanese Income Tax Calculator',
  description: 'Free Japan tax calculator for 2025. Calculate Japanese income tax, resident tax, and social insurance accurately. Updated with latest Japan tax rates.',
  keywords: [
    'japan tax calculator 2025', 'japanese tax calculator', 'japan income tax calculator', 'japan resident tax', 'japan tax rates', 'nihon zeikin calculator'
  ],
  alternates: {
    canonical: '/japan-tax-calculator',
  },
  openGraph: {
    title: 'Japan Tax Calculator 2025 | Japanese Income Tax Calculator',
    description: 'Free Japan tax calculator for 2025. Calculate Japanese income tax, resident tax, and social insurance accurately.',
    url: 'https://genius-insights.co.za/japan-tax-calculator',
    type: 'website',
  },
};

const japanTaxBrackets = [
  { min: 0, max: 1950000, rate: 0.05 },      // 5%
  { min: 1950001, max: 3300000, rate: 0.10 }, // 10%
  { min: 3300001, max: 6950000, rate: 0.20 }, // 20%
  { min: 6950001, max: 9000000, rate: 0.23 }, // 23%
  { min: 9000001, max: 18000000, rate: 0.33 }, // 33%
  { min: 18000001, max: 40000000, rate: 0.40 }, // 40%
  { min: 40000001, max: Infinity, rate: 0.45 } // 45%
];

const japanAllowances = [
  "Basic Deduction: ¥480,000 (tax-free)",
  "Income Tax Rates: 5%, 10%, 20%, 23%, 33%, 40%, 45%",
  "Resident Tax: 10% (approximately)",
  "Social Insurance: ~14.6% (Health Insurance & Pension)",
  "Employment Insurance: 0.6% (2025)",
  "Maximum Taxable Income for Pension: ¥6,200,000"
];

export default function JapanTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇯🇵 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Japan Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Japanese income tax and resident tax with the latest 2025 Japan tax rates, 
                allowances, and social insurance contributions.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Tax Calculator */}
        <UniversalTaxCalculator 
          country="Japan"
          currency="JPY"
          currencySymbol="¥"
          taxBrackets={japanTaxBrackets}
          allowances={japanAllowances}
          taxAuthority="NTA"
          colorScheme="from-red-600 to-red-700"
        />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 Japan Tax Brackets
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">¥0 - 1,950,000</span>
                      <span className="text-lg font-bold text-gray-900">5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">¥1,950,001 - 3,300,000</span>
                      <span className="text-lg font-bold text-gray-900">10%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">¥3,300,001 - 6,950,000</span>
                      <span className="text-lg font-bold text-gray-900">20%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">¥6,950,001 - 9,000,000</span>
                      <span className="text-lg font-bold text-gray-900">23%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">¥9,000,001+</span>
                      <span className="text-lg font-bold text-gray-900">33%-45%</span>
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
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Basic deduction: ¥480,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Social insurance premiums</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Spouse and dependent deductions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Employment income deduction</span>
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