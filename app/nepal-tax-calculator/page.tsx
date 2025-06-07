import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Nepal Tax Calculator 2025 | Nepali Income Tax Calculator | IRD Tax Calculator',
  description: 'Free Nepal tax calculator for 2025. Calculate Nepali income tax, social security fund, and take-home salary with current NPR rates.',
  keywords: [
    'nepal tax calculator 2025', 'nepali tax calculator', 'nepal income tax calculator', 'IRD tax calculator nepal', 'nepal salary calculator', 'nepali rupee tax calculator'
  ],
  alternates: {
    canonical: '/nepal-tax-calculator',
  },
  openGraph: {
    title: 'Nepal Tax Calculator 2025 | Nepali Income Tax Calculator',
    description: 'Free Nepal tax calculator for 2025. Calculate Nepali income tax, social security fund, and take-home salary with current NPR rates.',
    url: 'https://genius-insights.co.za/nepal-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/nepal-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Nepal Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nepal Tax Calculator 2025 | Nepali Income Tax Calculator',
    description: 'Free Nepal tax calculator for 2025. Calculate Nepali income tax, social security fund, and take-home salary with current NPR rates.',
    images: ['/images/nepal-tax-calculator-og.jpg'],
  },
};

// Nepal Income Tax Brackets for 2025
const nepalTaxBrackets = [
  { min: 0, max: 500000, rate: 0.01 },           // 1% - Up to NPR 500,000
  { min: 500001, max: 700000, rate: 0.10 },      // 10% - NPR 500,001 to 700,000
  { min: 700001, max: 1000000, rate: 0.20 },     // 20% - NPR 700,001 to 1,000,000
  { min: 1000001, max: 2000000, rate: 0.30 },    // 30% - NPR 1,000,001 to 2,000,000
  { min: 2000001, max: Infinity, rate: 0.36 }    // 36% - Above NPR 2,000,000
];

const nepalAllowances = [
  'Personal allowance: NPR 500,000 per year',
  'Additional allowance for married individuals: NPR 25,000',
  'Social Security Fund contributions (up to NPR 34,020 annually)',
  'Citizen Investment Trust contributions',
  'Insurance premium payments (up to NPR 40,000)',
  'Medical expenses for self and family',
  'Education expenses for children',
  'Donation to approved charitable organizations'
];

export default function NepalTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇳🇵 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Nepal Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Nepal income tax with the latest 2025 IRD tax rates and Social Security Fund deductions.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Nepal"
          currency="NPR"
          currencySymbol="₨"
          taxBrackets={nepalTaxBrackets}
          allowances={nepalAllowances}
          taxAuthority="Inland Revenue Department (IRD)"
          colorScheme="from-blue-600 to-red-600"
        />
      </div>
    </>
  );
}