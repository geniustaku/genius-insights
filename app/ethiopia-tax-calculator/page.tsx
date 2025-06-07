import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Ethiopia Tax Calculator 2025 | Ethiopian Income Tax Calculator | ERCA Tax',
  description: 'Free Ethiopia tax calculator for 2025. Calculate Ethiopian income tax, pension contributions, and take-home salary with current ETB rates.',
  keywords: [
    'ethiopia tax calculator 2025', 'ethiopian tax calculator', 'ethiopia income tax calculator', 'ERCA tax calculator', 'ethiopia salary calculator', 'ethiopian birr tax calculator'
  ],
  alternates: {
    canonical: '/ethiopia-tax-calculator',
  },
  openGraph: {
    title: 'Ethiopia Tax Calculator 2025 | Ethiopian Income Tax Calculator',
    description: 'Free Ethiopia tax calculator for 2025. Calculate Ethiopian income tax, pension contributions, and take-home salary with current ETB rates.',
    url: 'https://genius-insights.co.za/ethiopia-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/ethiopia-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ethiopia Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethiopia Tax Calculator 2025 | Ethiopian Income Tax Calculator',
    description: 'Free Ethiopia tax calculator for 2025. Calculate Ethiopian income tax, pension contributions, and take-home salary with current ETB rates.',
    images: ['/images/ethiopia-tax-calculator-og.jpg'],
  },
};

// Ethiopia Income Tax Brackets for 2025
const ethiopiaTaxBrackets = [
  { min: 0, max: 600, rate: 0.0 },              // Tax-free threshold - ETB 600
  { min: 601, max: 1650, rate: 0.10 },          // 10% - ETB 601 to 1,650
  { min: 1651, max: 3200, rate: 0.15 },         // 15% - ETB 1,651 to 3,200
  { min: 3201, max: 5250, rate: 0.20 },         // 20% - ETB 3,201 to 5,250
  { min: 5251, max: 7800, rate: 0.25 },         // 25% - ETB 5,251 to 7,800
  { min: 7801, max: 10900, rate: 0.30 },        // 30% - ETB 7,801 to 10,900
  { min: 10901, max: Infinity, rate: 0.35 }     // 35% - Above ETB 10,900
];

const ethiopiaAllowances = [
  'Basic tax-free threshold: ETB 600 per month',
  'Pension fund contributions (7% of basic salary)',
  'Transport allowance (up to ETB 400 per month)',
  'Medical allowance and health insurance premiums',
  'Educational allowances for children',
  'House allowance (if not provided by employer)',
  'Professional development and training expenses',
  'Charitable donations to approved organizations'
];

export default function EthiopiaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇪🇹 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Ethiopia Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Ethiopia income tax with the latest 2025 ERCA tax rates and pension deductions.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Ethiopia"
          currency="ETB"
          currencySymbol="Br"
          taxBrackets={ethiopiaTaxBrackets}
          allowances={ethiopiaAllowances}
          taxAuthority="Ethiopian Revenue and Customs Authority (ERCA)"
          colorScheme="from-green-600 via-yellow-500 to-red-600"
        />
      </div>
    </>
  );
}