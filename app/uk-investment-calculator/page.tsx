import type { Metadata } from 'next';
import UniversalInvestmentCalculator from '@/components/UniversalInvestmentCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'UK Investment Calculator 2025 | ISA & Investment Calculator',
  description: 'Free UK investment calculator for 2025. Calculate ISA contributions, stock investments, FTSE returns.',
  keywords: [
    'united kingdom investment calculator', 'united kingdom retirement calculator', 'investment calculator United Kingdom', 'united kingdom pension calculator'
  ],
  alternates: {
    canonical: '/uk-investment-calculator',
  },
  openGraph: {
    title: 'UK Investment Calculator 2025 | ISA & Investment Calculator',
    description: 'Free UK investment calculator for 2025. Calculate ISA contributions, stock investments, FTSE returns.',
    url: 'https://genius-insights.co.za/uk-investment-calculator',
    type: 'website',
  },
};

export default function UnitedKingdomInvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 Investment Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                United Kingdom Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment returns and retirement savings in United Kingdom.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Investment Calculator */}
        <UniversalInvestmentCalculator 
          country="United Kingdom"
          currency="GBP"
          currencySymbol="£"
          toolName="Investment Calculator"
          colorScheme="from-blue-600 to-purple-600"
        />
      </div>
    </>
  );
}