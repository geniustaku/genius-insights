import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'UAE Tax Calculator 2025 | Corporate Tax Calculator',
  description: 'Free UAE corporate tax calculator for 2025. Calculate UAE corporate tax with 9% rate on business profits. Updated with latest UAE tax rates.',
  keywords: [
    'uae tax calculator 2025', 'uae corporate tax calculator', 'emirates corporate tax', 'dubai corporate tax', 'uae business tax calculator', 'uae tax rates 2025'
  ],
  alternates: {
    canonical: '/uae-tax-calculator',
  },
  openGraph: {
    title: 'UAE Tax Calculator 2025 | Corporate Tax Calculator',
    description: 'Free UAE corporate tax calculator for 2025. Calculate UAE corporate tax with 9% rate on business profits. Updated with latest UAE tax rates.',
    url: 'https://genius-insights.co.za/uae-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/uae-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'UAE Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAE Tax Calculator 2025 | Corporate Tax Calculator',
    description: 'Free UAE corporate tax calculator for 2025. Calculate UAE corporate tax with 9% rate on business profits. Updated with latest UAE tax rates.',
    images: ['/images/uae-tax-calculator-og.jpg'],
  },
};

export default function UAETaxCalculatorPage() {
  // UAE Corporate Tax Brackets (effective from June 1, 2023)
  const uaeTaxBrackets = [
    { min: 0, max: 375000, rate: 0 },        // 0% on profits up to AED 375,000
    { min: 375001, max: Infinity, rate: 0.09 } // 9% on profits above AED 375,000
  ];

  const allowances = [
    'Small Business Relief: 0% tax on profits up to AED 375,000',
    'Qualifying Free Zone Business: 0% tax rate available',
    'R&D Incentives: Enhanced deductions for qualifying research and development',
    'Depreciation Allowances: Capital allowances on qualifying assets',
    'Loss Relief: Carry forward losses for up to 20 years'
  ];

  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇦🇪 UAE Corporate Tax 2025</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                UAE Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your UAE corporate tax with the latest 2025 tax rates. 0% on profits up to AED 375,000, 9% above.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator 
          country="UAE"
          currency="AED"
          currencySymbol="AED "
          taxBrackets={uaeTaxBrackets}
          allowances={allowances}
          taxAuthority="Federal Tax Authority (FTA)"
          colorScheme="from-green-600 to-red-600"
        />

        {/* Additional UAE Tax Information */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">UAE Corporate Tax Guide 2025</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Tax Rates</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• <strong>0%</strong> on taxable income up to AED 375,000</li>
                    <li>• <strong>9%</strong> on taxable income above AED 375,000</li>
                    <li>• <strong>0%</strong> for qualifying Free Zone businesses</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Who Must Pay</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• UAE resident companies</li>
                    <li>• Foreign companies with UAE permanent establishment</li>
                    <li>• UAE branches of foreign companies</li>
                    <li>• Businesses with taxable income above AED 375,000</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">Key Dates</h3>
                  <ul className="space-y-2 text-purple-700">
                    <li>• <strong>Tax Year:</strong> Calendar year (January 1 - December 31)</li>
                    <li>• <strong>Return Filing:</strong> Within 9 months of tax year end</li>
                    <li>• <strong>Payment Due:</strong> Within 9 months of tax year end</li>
                    <li>• <strong>Effective Date:</strong> June 1, 2023</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">Exemptions</h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Natural persons (individuals)</li>
                    <li>• Investment funds meeting criteria</li>
                    <li>• Government entities</li>
                    <li>• Certain charitable organizations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <ul className="space-y-2">
                  <li>• UAE introduced corporate tax from June 1, 2023</li>
                  <li>• Small Business Relief threshold is AED 375,000</li>
                  <li>• No personal income tax for individuals</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Free Zone businesses may qualify for 0% rate</li>
                  <li>• Registration required with Federal Tax Authority</li>
                  <li>• Annual tax returns must be filed electronically</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}