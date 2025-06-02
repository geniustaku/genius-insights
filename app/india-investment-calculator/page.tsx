import type { Metadata } from 'next';
import UniversalInvestmentCalculator from '@/components/UniversalInvestmentCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'India Investment Calculator 2025 | SIP & Mutual Fund Calculator',
  description: 'Free India investment calculator for 2025. Calculate SIP returns, mutual fund investments, stock market returns.',
  keywords: [
    'india investment calculator', 'india retirement calculator', 'investment calculator India', 'india pension calculator'
  ],
  alternates: {
    canonical: '/india-investment-calculator',
  },
  openGraph: {
    title: 'India Investment Calculator 2025 | SIP & Mutual Fund Calculator',
    description: 'Free India investment calculator for 2025. Calculate SIP returns, mutual fund investments, stock market returns.',
    url: 'https://genius-insights.co.za/india-investment-calculator',
    type: 'website',
  },
};

export default function IndiaInvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-green-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇮🇳 Investment Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                India Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment returns and retirement savings in India.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Investment Calculator */}
        <UniversalInvestmentCalculator 
          country="India"
          currency="INR"
          currencySymbol="₹"
          toolName="Investment Calculator"
          colorScheme="from-orange-600 to-green-600"
        />
      </div>
    </>
  );
}