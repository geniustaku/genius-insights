import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Canada Tax Calculator 2025 | CRA Income Tax & Federal/Provincial Calculator',
  description: 'Free Canada tax calculator for 2025. Calculate CRA federal and provincial income tax, CPP, EI accurately. Updated with latest Canadian tax rates.',
  keywords: [
    'canada tax calculator 2025', 'CRA tax calculator', 'canada income tax calculator', 'PAYE calculator Canada', 'canada tax rates', 'payroll tax Canada', 'income tax canada'
  ],
  alternates: {
    canonical: '/canada-tax-calculator',
  },
  openGraph: {
    title: 'Canada Tax Calculator 2025 | CRA Income Tax & Federal/Provincial Calculator',
    description: 'Free Canada tax calculator for 2025. Calculate CRA federal and provincial income tax, CPP, EI accurately. Updated with latest Canadian tax rates.',
    url: 'https://genius-insights.co.za/canada-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/canada-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Canada Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada Tax Calculator 2025 | CRA Income Tax & Federal/Provincial Calculator',
    description: 'Free Canada tax calculator for 2025. Calculate CRA federal and provincial income tax, CPP, EI accurately. Updated with latest Canadian tax rates.',
    images: ['/images/canada-tax-calculator-og.jpg'],
  },
};

const canadaTaxBrackets = [
  { min: 0, max: 53359, rate: 0.15 },      // 15%
  { min: 53360, max: 106717, rate: 0.205 }, // 20.5%
  { min: 106718, max: 165430, rate: 0.26 }, // 26%
  { min: 165431, max: 235675, rate: 0.29 }, // 29%
  { min: 235676, max: Infinity, rate: 0.33 } // 33%
];

const canadaAllowances = [
  "Basic Personal Amount: $15,705 (tax-free)",
  "Federal Tax Rates: 15%, 20.5%, 26%, 29%, 33%",
  "CPP Maximum: $3,867.50 (2025)",
  "EI Maximum: $1,049.48 (2025)",
  "RRSP Contribution Limit: $31,560 (2025)",
  "TFSA Annual Limit: $7,000 (2025)"
];

export default function CanadaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇨🇦 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Canada Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact CRA income tax and PAYE with the latest 2025 Canada tax rates, 
                allowances, and brackets. Trusted by thousands of Canada taxpayers.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Tax Calculator */}
        <UniversalTaxCalculator 
          country="Canada"
          currency="CAD"
          currencySymbol="C$"
          taxBrackets={canadaTaxBrackets}
          allowances={canadaAllowances}
          taxAuthority="CRA"
          colorScheme="from-red-600 to-red-700"
        />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 Canada Tax Brackets
                </h2>
                
                <div className="space-y-4">
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">C$0 - 53,359</span>
                      <span className="text-lg font-bold text-gray-900">15%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">C$53,360 - 106,717</span>
                      <span className="text-lg font-bold text-gray-900">20.5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">C$106,718 - 165,430</span>
                      <span className="text-lg font-bold text-gray-900">26%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">C$165,431 - 235,675</span>
                      <span className="text-lg font-bold text-gray-900">29%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">C$235,676+</span>
                      <span className="text-lg font-bold text-gray-900">33%</span>
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
                    <span className="text-gray-700">Basic personal amount: C$15,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">CPP/EI contributions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Provincial tax credits</span>
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