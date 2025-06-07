import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Philippines Tax Calculator 2025 | Philippine Income Tax Calculator | BIR Tax',
  description: 'Free Philippines tax calculator for 2025. Calculate Philippine income tax, BIR tax rates, withholding tax accurately.',
  keywords: [
    'philippines tax calculator 2025', 'philippine income tax calculator', 'BIR tax calculator', 'philippines tax rates', 'withholding tax philippines', 'train law tax calculator'
  ],
  alternates: {
    canonical: '/philippines-tax-calculator',
  },
  openGraph: {
    title: 'Philippines Tax Calculator 2025 | Philippine Income Tax Calculator',
    description: 'Free Philippines tax calculator for 2025. Calculate Philippine income tax, BIR tax rates, withholding tax accurately.',
    url: 'https://genius-insights.co.za/philippines-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/philippines-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Philippines Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philippines Tax Calculator 2025 | Philippine Income Tax Calculator',
    description: 'Free Philippines tax calculator for 2025. Calculate Philippine income tax, BIR tax rates, withholding tax accurately.',
    images: ['/images/philippines-tax-calculator-og.jpg'],
  },
};

// Philippine Income Tax Brackets for 2025 (TRAIN Law)
const philippinesTaxBrackets = [
  { min: 0, max: 250000, rate: 0.0 },           // Tax-free threshold - ₱250,000
  { min: 250001, max: 400000, rate: 0.15 },     // 15% - ₱250,001 to ₱400,000
  { min: 400001, max: 800000, rate: 0.20 },     // 20% - ₱400,001 to ₱800,000
  { min: 800001, max: 2000000, rate: 0.25 },    // 25% - ₱800,001 to ₱2,000,000
  { min: 2000001, max: 8000000, rate: 0.30 },   // 30% - ₱2,000,001 to ₱8,000,000
  { min: 8000001, max: Infinity, rate: 0.35 }   // 35% - Above ₱8,000,000
];

const philippinesAllowances = [
  'Standard deduction up to ₱250,000 per year',
  'SSS contributions (up to ₱19,800 annually)',
  'PhilHealth contributions (up to ₱21,000 annually)',
  'Pag-IBIG contributions (up to ₱2,400 annually)',
  'Additional exemption for dependents (₱25,000 per qualified dependent)',
  'Premium payments on health and hospitalization insurance',
  'Charitable contributions to approved organizations',
  '13th month pay and other bonuses (up to ₱90,000 exempt)'
];

export default function PhilippinesTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇵🇭 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Philippines Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Philippines income tax with the latest 2025 BIR tax rates and TRAIN Law brackets.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Philippines"
          currency="PHP"
          currencySymbol="₱"
          taxBrackets={philippinesTaxBrackets}
          allowances={philippinesAllowances}
          taxAuthority="Bureau of Internal Revenue (BIR)"
          colorScheme="from-blue-600 to-red-600"
        />
      </div>
    </>
  );
}