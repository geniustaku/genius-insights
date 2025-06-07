import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalLoanCalculator from '@/components/UniversalLoanCalculator';

export const metadata: Metadata = {
  title: 'Netherlands Mortgage Calculator 2025 | Dutch Mortgage Calculator | Hypotheek Calculator',
  description: 'Free Netherlands mortgage calculator for 2025. Calculate Dutch mortgages, monthly payments, and affordability with current EUR interest rates.',
  keywords: [
    'netherlands mortgage calculator', 'dutch mortgage calculator', 'hypotheek calculator', 'netherlands loan calculator', 'dutch property calculator', 'netherlands affordability calculator'
  ],
  alternates: {
    canonical: '/netherlands-mortgage-calculator',
  },
  openGraph: {
    title: 'Netherlands Mortgage Calculator 2025 | Dutch Mortgage Calculator',
    description: 'Free Netherlands mortgage calculator for 2025. Calculate Dutch mortgages, monthly payments, and affordability with current EUR interest rates.',
    url: 'https://genius-insights.co.za/netherlands-mortgage-calculator',
    type: 'website',
    images: [
      {
        url: '/images/netherlands-mortgage-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Netherlands Mortgage Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Netherlands Mortgage Calculator 2025 | Dutch Mortgage Calculator',
    description: 'Free Netherlands mortgage calculator for 2025. Calculate Dutch mortgages, monthly payments, and affordability with current EUR interest rates.',
    images: ['/images/netherlands-mortgage-calculator-og.jpg'],
  },
};

// Netherlands mortgage types with typical interest rates
const netherlandsLoanTypes = [
  {
    name: 'Fixed Rate Mortgage (5-year)',
    minRate: 3.8,
    maxRate: 4.5,
    typicalTerm: 360,
    maxAmount: 1500000,
    description: '5-year fixed interest rate mortgage'
  },
  {
    name: 'Fixed Rate Mortgage (10-year)',
    minRate: 4.0,
    maxRate: 4.7,
    typicalTerm: 360,
    maxAmount: 1500000,
    description: '10-year fixed interest rate mortgage'
  },
  {
    name: 'Fixed Rate Mortgage (20-year)',
    minRate: 4.2,
    maxRate: 4.9,
    typicalTerm: 360,
    maxAmount: 1500000,
    description: '20-year fixed interest rate mortgage'
  },
  {
    name: 'Variable Rate Mortgage',
    minRate: 3.5,
    maxRate: 4.2,
    typicalTerm: 360,
    maxAmount: 1500000,
    description: 'Variable interest rate mortgage'
  }
];

export default function NetherlandsMortgageCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-white to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-blue-900/90 font-medium text-sm tracking-wide">🇳🇱 Dutch Mortgage Tool</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900 mb-6 leading-tight">
                Netherlands Mortgage <br/>
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate Dutch mortgage payments, affordability, and loan options with current Netherlands interest rates.
              </p>
            </div>
          </div>
        </div>

        <UniversalLoanCalculator
          country="Netherlands"
          currency="EUR"
          currencySymbol="€"
          loanTypes={netherlandsLoanTypes}
          colorScheme="from-red-600 via-white to-blue-600"
          features={[
            {
              icon: "🏦",
              title: "Major Banks",
              description: "Compare rates from ING, ABN AMRO, Rabobank, and other Dutch banks"
            },
            {
              icon: "🏠",
              title: "NHG Guarantee",
              description: "Calculate with National Mortgage Guarantee (Nationale Hypotheek Garantie)"
            },
            {
              icon: "📊",
              title: "Affordability Check",
              description: "Determine maximum mortgage based on income and Dutch lending criteria"
            }
          ]}
        />
      </div>
    </>
  );
}