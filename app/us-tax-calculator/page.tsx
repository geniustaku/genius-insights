import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'US Tax Calculator 2025 | IRS Federal Income Tax Calculator',
  description: 'Free US tax calculator for 2025. Calculate IRS federal income tax, Social Security, Medicare, state taxes. Updated with latest American tax brackets.',
  keywords: [
    'united states tax calculator 2025', 'IRS tax calculator', 'united states income tax calculator', 'PAYE calculator United States', 'united states tax rates', 'payroll tax United States', 'income tax united states'
  ],
  alternates: {
    canonical: '/us-tax-calculator',
  },
  openGraph: {
    title: 'US Tax Calculator 2025 | IRS Federal Income Tax Calculator',
    description: 'Free US tax calculator for 2025. Calculate IRS federal income tax, Social Security, Medicare, state taxes. Updated with latest American tax brackets.',
    url: 'https://genius-insights.co.za/us-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/us-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'United States Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Tax Calculator 2025 | IRS Federal Income Tax Calculator',
    description: 'Free US tax calculator for 2025. Calculate IRS federal income tax, Social Security, Medicare, state taxes. Updated with latest American tax brackets.',
    images: ['/images/us-tax-calculator-og.jpg'],
  },
};

// 2025 US Federal Tax Brackets (Single Filer)
const usTaxBrackets = [
  { min: 0, max: 11000, rate: 0.10 },
  { min: 11001, max: 44725, rate: 0.12 },
  { min: 44726, max: 95375, rate: 0.22 },
  { min: 95376, max: 182050, rate: 0.24 },
  { min: 182051, max: 231250, rate: 0.32 },
  { min: 231251, max: 578125, rate: 0.35 },
  { min: 578126, max: Infinity, rate: 0.37 }
];

const usAllowances = [
  'Standard deduction: $13,850 (single), $27,700 (married filing jointly)',
  'Social Security tax: 6.2% on wages up to $160,200',
  'Medicare tax: 1.45% on all wages',
  'Additional Medicare tax: 0.9% on wages over $200,000 (single)',
  'State and local tax deduction: Limited to $10,000',
  'Mortgage interest deduction on first $750,000 of debt',
  'Charitable contribution deductions',
  'Traditional IRA contributions may be deductible',
  '401(k) contributions: Up to $23,000 (2025 limit)'
];

export default function UnitedStatesTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                United States Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact IRS federal income tax with the latest 2025 United States tax rates, 
                allowances, and brackets. Get instant results with real-time calculations.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <UniversalTaxCalculator
          country="United States"
          currency="USD"
          currencySymbol="$"
          taxBrackets={usTaxBrackets}
          allowances={usAllowances}
          taxAuthority="IRS"
          colorScheme="from-blue-600 to-indigo-600"
        />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 US Federal Tax Brackets (Single Filer)
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$0 - $11,000</span>
                      <span className="text-lg font-bold text-gray-900">10%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$11,001 - $44,725</span>
                      <span className="text-lg font-bold text-gray-900">12%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$44,726 - $95,375</span>
                      <span className="text-lg font-bold text-gray-900">22%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$95,376 - $182,050</span>
                      <span className="text-lg font-bold text-gray-900">24%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$182,051 - $231,250</span>
                      <span className="text-lg font-bold text-gray-900">32%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$231,251 - $578,125</span>
                      <span className="text-lg font-bold text-gray-900">35%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">$578,126+</span>
                      <span className="text-lg font-bold text-gray-900">37%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Key Tax Information for 2025
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Standard deduction: $13,850 (single)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Standard deduction: $27,700 (married filing jointly)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Social Security: 6.2% (up to $160,200)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Medicare: 1.45% (all wages)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">401(k) limit: $23,000 (2025)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">IRA limit: $7,000 (2025)</span>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
                  <p className="text-sm text-yellow-800">
                    This calculator shows federal income tax only. State taxes, local taxes, 
                    and additional deductions may apply depending on your location and circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}