import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Bangladesh Tax Calculator 2025 | Bangladeshi Income Tax Calculator | NBR Tax',
  description: 'Free Bangladesh tax calculator for 2025. Calculate Bangladeshi income tax, VAT, and take-home salary with current BDT rates.',
  keywords: [
    'bangladesh tax calculator 2025', 'bangladeshi tax calculator', 'bangladesh income tax calculator', 'NBR tax calculator', 'bangladesh salary calculator', 'bangladeshi taka tax calculator'
  ],
  alternates: {
    canonical: '/bangladesh-tax-calculator',
  },
  openGraph: {
    title: 'Bangladesh Tax Calculator 2025 | Bangladeshi Income Tax Calculator',
    description: 'Free Bangladesh tax calculator for 2025. Calculate Bangladeshi income tax, VAT, and take-home salary with current BDT rates.',
    url: 'https://genius-insights.co.za/bangladesh-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/bangladesh-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bangladesh Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangladesh Tax Calculator 2025 | Bangladeshi Income Tax Calculator',
    description: 'Free Bangladesh tax calculator for 2025. Calculate Bangladeshi income tax, VAT, and take-home salary with current BDT rates.',
    images: ['/images/bangladesh-tax-calculator-og.jpg'],
  },
};

// Bangladesh Income Tax Brackets for 2025
const bangladeshTaxBrackets = [
  { min: 0, max: 350000, rate: 0.0 },            // Tax-free threshold - BDT 350,000
  { min: 350001, max: 450000, rate: 0.05 },      // 5% - BDT 350,001 to 450,000
  { min: 450001, max: 750000, rate: 0.10 },      // 10% - BDT 450,001 to 750,000
  { min: 750001, max: 1150000, rate: 0.15 },     // 15% - BDT 750,001 to 1,150,000
  { min: 1150001, max: 1650000, rate: 0.20 },    // 20% - BDT 1,150,001 to 1,650,000
  { min: 1650001, max: Infinity, rate: 0.25 }    // 25% - Above BDT 1,650,000
];

const bangladeshAllowances = [
  'Basic tax-free threshold: BDT 350,000 per year',
  'Additional allowance for female taxpayers: BDT 50,000',
  'Senior citizen allowance (65+): BDT 100,000 additional',
  'Freedom fighter allowance: BDT 100,000 additional',
  'Investment allowance: Up to BDT 15,000,000 (various rates)',
  'Life insurance premium: Up to BDT 100,000',
  'DPS/Pension contribution: Up to BDT 120,000',
  'Medical allowance: Up to BDT 120,000'
];

export default function BangladeshTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇧🇩 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Bangladesh Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Bangladesh income tax with the latest 2025 NBR tax rates and allowances.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Bangladesh"
          currency="BDT"
          currencySymbol="৳"
          taxBrackets={bangladeshTaxBrackets}
          allowances={bangladeshAllowances}
          taxAuthority="National Board of Revenue (NBR)"
          colorScheme="from-green-600 to-red-600"
        />
      </div>
    </>
  );
}