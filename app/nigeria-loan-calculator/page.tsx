import type { Metadata } from 'next';
import UniversalLoanCalculator from '@/components/UniversalLoanCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Nigeria Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
  description: 'Free Nigeria loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Nigerian bank rates. EMI calculator for Nigerian loans.',
  keywords: [
    'nigeria loan calculator', 'nigeria mortgage calculator', 'loan calculator Nigeria', 'nigeria EMI calculator', 'nigeria home loan'
  ],
  alternates: {
    canonical: '/nigeria-loan-calculator',
  },
  openGraph: {
    title: 'Nigeria Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Nigeria loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Nigerian bank rates. EMI calculator for Nigerian loans.',
    url: 'https://genius-insights.co.za/nigeria-loan-calculator',
    type: 'website',
  },
};

export default function NigeriaLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        <UniversalLoanCalculator
          country="Nigeria"
          currency="NGN"
          currencySymbol="₦"
          colorScheme="from-green-600 to-emerald-600"
          loanTypes={[
            {
              name: 'Personal',
              minRate: 18,
              maxRate: 35,
              typicalTerm: 24,
              maxAmount: 10000000,
              description: 'Personal loans for various purposes'
            },
            {
              name: 'Mortgage',
              minRate: 15,
              maxRate: 25,
              typicalTerm: 240,
              maxAmount: 100000000,
              description: 'Home loans and mortgages'
            },
            {
              name: 'Car',
              minRate: 16,
              maxRate: 30,
              typicalTerm: 60,
              maxAmount: 30000000,
              description: 'Vehicle and auto financing'
            }
          ]}
          features={[{ Calculator: true }, { Comparison: true }, { Amortization: true }]}
        />
      </div>
    </>
  );
}