import type { Metadata } from 'next';
import UniversalInvestmentCalculator from '@/components/UniversalInvestmentCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'US Investment Calculator 2025 | Stock Market Investment Calculator',
  description: 'Free US investment calculator for 2025. Calculate returns on stock market investments, S&P 500, ETFs.',
  keywords: [
    'united states investment calculator', 'united states retirement calculator', 'investment calculator United States', 'united states pension calculator'
  ],
  alternates: {
    canonical: '/us-investment-calculator',
  },
  openGraph: {
    title: 'US Investment Calculator 2025 | Stock Market Investment Calculator',
    description: 'Free US investment calculator for 2025. Calculate returns on stock market investments, S&P 500, ETFs.',
    url: 'https://genius-insights.co.za/us-investment-calculator',
    type: 'website',
  },
};

export default function UnitedStatesInvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 Investment Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                United States Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment returns and retirement savings in United States.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Investment Calculator */}
        <UniversalInvestmentCalculator 
          country="United States"
          currency="USD"
          currencySymbol="$"
          toolName="Investment Calculator"
          colorScheme="from-blue-600 to-red-600"
        />
      </div>
    </>
  );
}