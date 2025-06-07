import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalLoanCalculator from '@/components/UniversalLoanCalculator';

export const metadata: Metadata = {
  title: 'Indonesia Loan Calculator 2025 | Indonesian Personal Loan Calculator | KTA Calculator',
  description: 'Free Indonesia loan calculator for 2025. Calculate personal loans, home loans, and car loans in Indonesia with current IDR interest rates.',
  keywords: [
    'indonesia loan calculator', 'indonesian loan calculator', 'KTA calculator indonesia', 'indonesia personal loan calculator', 'indonesia home loan calculator', 'indonesia car loan calculator'
  ],
  alternates: {
    canonical: '/indonesia-loan-calculator',
  },
  openGraph: {
    title: 'Indonesia Loan Calculator 2025 | Indonesian Personal Loan Calculator',
    description: 'Free Indonesia loan calculator for 2025. Calculate personal loans, home loans, and car loans in Indonesia with current IDR interest rates.',
    url: 'https://genius-insights.co.za/indonesia-loan-calculator',
    type: 'website',
    images: [
      {
        url: '/images/indonesia-loan-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Indonesia Loan Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indonesia Loan Calculator 2025 | Indonesian Personal Loan Calculator',
    description: 'Free Indonesia loan calculator for 2025. Calculate personal loans, home loans, and car loans in Indonesia with current IDR interest rates.',
    images: ['/images/indonesia-loan-calculator-og.jpg'],
  },
};

// Indonesian loan types with typical interest rates
const indonesiaLoanTypes = [
  {
    name: 'Personal Loan (KTA)',
    minRate: 12.0,
    maxRate: 24.0,
    typicalTerm: 60,
    maxAmount: 500000000,
    description: 'Unsecured personal loans for various needs'
  },
  {
    name: 'Home Loan (KPR)',
    minRate: 6.5,
    maxRate: 12.0,
    typicalTerm: 240,
    maxAmount: 5000000000,
    description: 'Mortgage loans for property purchase'
  },
  {
    name: 'Car Loan',
    minRate: 8.0,
    maxRate: 16.0,
    typicalTerm: 84,
    maxAmount: 1500000000,
    description: 'Auto financing for new and used vehicles'
  },
  {
    name: 'Business Loan',
    minRate: 10.0,
    maxRate: 18.0,
    typicalTerm: 120,
    maxAmount: 2000000000,
    description: 'Funding for business expansion and operations'
  }
];

export default function IndonesiaLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-white rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-red-900/90 font-medium text-sm tracking-wide">🇮🇩 Indonesian Banking</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-red-900 mb-6 leading-tight">
                Indonesia Loan <br/>
                <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-red-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate personal loans, home loans, and car loans in Indonesia with accurate interest rates and terms.
              </p>
            </div>
          </div>
        </div>

        <UniversalLoanCalculator
          country="Indonesia"
          currency="IDR"
          currencySymbol="Rp"
          loanTypes={indonesiaLoanTypes}
          colorScheme="from-red-600 to-white"
          features={[
            {
              icon: "🏦",
              title: "Major Banks",
              description: "Compare rates from BCA, Mandiri, BRI, BNI, and other Indonesian banks"
            },
            {
              icon: "📱",
              title: "Digital Banking",
              description: "Include rates from digital banks like Jago, Jenius, and TMRW"
            },
            {
              icon: "🏠",
              title: "Property Loans",
              description: "Special rates for primary residence, investment property, and commercial real estate"
            }
          ]}
        />
      </div>
    </>
  );
}