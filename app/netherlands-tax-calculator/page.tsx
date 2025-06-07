import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Netherlands Tax Calculator 2025 | Dutch Income Tax Calculator | Belastingdienst',
  description: 'Free Netherlands tax calculator for 2025. Calculate Dutch income tax, social contributions, and net salary with current EUR rates.',
  keywords: [
    'netherlands tax calculator 2025', 'dutch tax calculator', 'netherlands income tax calculator', 'belastingdienst calculator', 'netherlands salary calculator', 'dutch payroll calculator'
  ],
  alternates: {
    canonical: '/netherlands-tax-calculator',
  },
  openGraph: {
    title: 'Netherlands Tax Calculator 2025 | Dutch Income Tax Calculator',
    description: 'Free Netherlands tax calculator for 2025. Calculate Dutch income tax, social contributions, and net salary with current EUR rates.',
    url: 'https://genius-insights.co.za/netherlands-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/netherlands-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Netherlands Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Netherlands Tax Calculator 2025 | Dutch Income Tax Calculator',
    description: 'Free Netherlands tax calculator for 2025. Calculate Dutch income tax, social contributions, and net salary with current EUR rates.',
    images: ['/images/netherlands-tax-calculator-og.jpg'],
  },
};

// Netherlands Income Tax Brackets for 2025
const netherlandsTaxBrackets = [
  { min: 0, max: 75518, rate: 0.3693 },         // 36.93% - Up to €75,518
  { min: 75519, max: Infinity, rate: 0.4950 }   // 49.50% - Above €75,518
];

const netherlandsAllowances = [
  'General tax credit (algemene heffingskorting): €3,362',
  'Labor tax credit (arbeidskorting): up to €5,129',
  'Income-dependent combination tax credit: up to €3,070',
  'Single parent allowance: €2,282',
  'Elderly allowance (65+): €1,816',
  'Social security contributions included in tax rates',
  'Mortgage interest deduction',
  'Pension contributions deduction',
  'Charitable donations deduction'
];

export default function NetherlandsTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-white to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-blue-900/90 font-medium text-sm tracking-wide">🇳🇱 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900 mb-6 leading-tight">
                Netherlands Tax Calculator <br/>
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Netherlands income tax with the latest 2025 Belastingdienst tax rates and credits.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Netherlands"
          currency="EUR"
          currencySymbol="€"
          taxBrackets={netherlandsTaxBrackets}
          allowances={netherlandsAllowances}
          taxAuthority="Belastingdienst (Dutch Tax Authority)"
          colorScheme="from-red-600 via-white to-blue-600"
        />
      </div>
    </>
  );
}