import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Indonesia Tax Calculator 2025 | Indonesian Income Tax Calculator | PPh Calculator',
  description: 'Free Indonesia tax calculator for 2025. Calculate Indonesian income tax (PPh), BPJS, and take-home salary with current IDR rates.',
  keywords: [
    'indonesia tax calculator 2025', 'indonesian tax calculator', 'PPh calculator indonesia', 'indonesia income tax calculator', 'BPJS calculator', 'indonesian rupiah tax calculator'
  ],
  alternates: {
    canonical: '/indonesia-tax-calculator',
  },
  openGraph: {
    title: 'Indonesia Tax Calculator 2025 | Indonesian Income Tax Calculator',
    description: 'Free Indonesia tax calculator for 2025. Calculate Indonesian income tax (PPh), BPJS, and take-home salary with current IDR rates.',
    url: 'https://genius-insights.co.za/indonesia-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/indonesia-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Indonesia Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indonesia Tax Calculator 2025 | Indonesian Income Tax Calculator',
    description: 'Free Indonesia tax calculator for 2025. Calculate Indonesian income tax (PPh), BPJS, and take-home salary with current IDR rates.',
    images: ['/images/indonesia-tax-calculator-og.jpg'],
  },
};

// Indonesian Income Tax Brackets for 2025 (PPh 21)
const indonesiaTaxBrackets = [
  { min: 0, max: 60000000, rate: 0.05 },           // 5% - Up to IDR 60 million
  { min: 60000001, max: 250000000, rate: 0.15 },   // 15% - IDR 60-250 million
  { min: 250000001, max: 500000000, rate: 0.25 },  // 25% - IDR 250-500 million
  { min: 500000001, max: 5000000000, rate: 0.30 }, // 30% - IDR 500 million - 5 billion
  { min: 5000000001, max: Infinity, rate: 0.35 }   // 35% - Above IDR 5 billion
];

const indonesiaAllowances = [
  'Personal allowance (PTKP): IDR 54,000,000 per year for individual',
  'Married allowance: Additional IDR 4,500,000 per year',
  'Dependent allowance: IDR 4,500,000 per dependent (max 3)',
  'BPJS Kesehatan contributions (up to IDR 2,400,000 annually)',
  'BPJS Ketenagakerjaan contributions (2% of salary)',
  'Professional development and training expenses',
  'Zakat and religious donations',
  'Pension fund contributions'
];

export default function IndonesiaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-white rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-red-900/90 font-medium text-sm tracking-wide">🇮🇩 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-red-900 mb-6 leading-tight">
                Indonesia Tax Calculator <br/>
                <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-red-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Indonesia income tax (PPh) with the latest 2025 tax rates and BPJS deductions.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Indonesia"
          currency="IDR"
          currencySymbol="Rp"
          taxBrackets={indonesiaTaxBrackets}
          allowances={indonesiaAllowances}
          taxAuthority="Directorate General of Taxes (DGT)"
          colorScheme="from-red-600 to-white"
        />
      </div>
    </>
  );
}