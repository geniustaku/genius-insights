import type { Metadata } from 'next';
import UniversalLoanCalculator from '@/components/UniversalLoanCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'US Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
  description: 'Free US loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with American bank rates. Payment calculator for US loans.',
  keywords: [
    'united states loan calculator', 'united states mortgage calculator', 'loan calculator United States', 'united states EMI calculator', 'united states home loan'
  ],
  alternates: {
    canonical: '/united states-loan-calculator',
  },
  openGraph: {
    title: 'US Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free US loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with American bank rates. Payment calculator for US loans.',
    url: 'https://genius-insights.co.za/united states-loan-calculator',
    type: 'website',
  },
};

export default function UnitedStatesLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                United States Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate loan payments, EMI, and interest for mortgages, personal loans, and car loans in United States.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Loan Calculator */}
        <UniversalLoanCalculator 
          country="United States"
          currency="USD"
          currencySymbol="$"
          colorScheme="from-blue-600 to-indigo-600"
        />
      </div>
    </>
  );
}