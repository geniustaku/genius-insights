import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Australia Tax Calculator 2025 | ATO Income Tax Calculator',
  description: 'Free Australia tax calculator for 2025. Calculate ATO income tax, Medicare levy accurately. Updated with latest Australian tax rates.',
  keywords: [
    'australia tax calculator 2025', 'australia income tax calculator', 'tax calculator Australia', 'australia tax rates', 'payroll tax Australia'
  ],
  alternates: {
    canonical: '/australia-tax-calculator',
  },
  openGraph: {
    title: 'Australia Tax Calculator 2025 | ATO Income Tax Calculator',
    description: 'Free Australia tax calculator for 2025. Calculate ATO income tax, Medicare levy accurately. Updated with latest Australian tax rates.',
    url: 'https://genius-insights.co.za/australia-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/australia-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Australia Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australia Tax Calculator 2025 | ATO Income Tax Calculator',
    description: 'Free Australia tax calculator for 2025. Calculate ATO income tax, Medicare levy accurately. Updated with latest Australian tax rates.',
    images: ['/images/australia-tax-calculator-og.jpg'],
  },
};

// Australian tax brackets for 2024-2025 financial year
const australianTaxBrackets = [
  { min: 0, max: 18200, rate: 0 },        // Tax-free threshold
  { min: 18201, max: 45000, rate: 0.19 }, // 19%
  { min: 45001, max: 120000, rate: 0.325 }, // 32.5%
  { min: 120001, max: 180000, rate: 0.37 }, // 37%
  { min: 180001, max: Infinity, rate: 0.45 } // 45%
];

const australianAllowances = [
  'Tax-free threshold: $18,200 per year',
  'Medicare levy: 2% on taxable income over $29,207',
  'Medicare levy surcharge may apply if no private health insurance',
  'Low and Middle Income Tax Offset (LMITO) may apply',
  'Senior Australians Tax Offset available for eligible seniors',
  'Work-related deductions for job expenses',
  'Charitable donations are tax-deductible'
];

export default function AustraliaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇦🇺 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Australia Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Australia income tax with the latest 2025 tax rates and brackets.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Australia"
          currency="AUD"
          currencySymbol="A$"
          taxBrackets={australianTaxBrackets}
          allowances={australianAllowances}
          taxAuthority="ATO (Australian Taxation Office)"
          colorScheme="from-blue-600 to-green-600"
        />

        {/* Additional Information Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Australia Tax System 2025</h2>
              <p className="text-gray-600">Understanding Australian income tax and the ATO requirements</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Progressive tax system with tax-free threshold
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Medicare levy for public healthcare funding
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    PAYG withholding for employees
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Annual tax return lodgment required
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Dates</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Financial Year:</span>
                    <span className="font-medium">1 July - 30 June</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tax Return Due:</span>
                    <span className="font-medium">31 October</span>
                  </li>
                  <li className="flex justify-between">
                    <span>PAYG Due:</span>
                    <span className="font-medium">28th of month</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Super Guarantee:</span>
                    <span className="font-medium">11.5% (2024-25)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}