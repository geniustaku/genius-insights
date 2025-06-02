import type { Metadata } from 'next';
import UniversalVATCalculator from '@/components/UniversalVATCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'US Sales Tax Calculator 2025 | State Sales Tax Calculator',
  description: 'Free US sales tax calculator for 2025. Calculate state and local sales tax for all 50 states.',
  keywords: [
    'united states VAT calculator', '8.5% VAT calculator', 'united states VAT rates', 'VAT calculator United States'
  ],
  alternates: {
    canonical: '/us-sales-tax-calculator',
  },
  openGraph: {
    title: 'US Sales Tax Calculator 2025 | State Sales Tax Calculator',
    description: 'Free US sales tax calculator for 2025. Calculate state and local sales tax for all 50 states.',
    url: 'https://genius-insights.co.za/us-sales-tax-calculator',
    type: 'website',
  },
};

export default function UnitedStatesVATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 8.5% VAT Rate</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                United States VAT Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate 8.5% VAT on goods and services in United States.
              </p>
            </div>
          </div>
        </div>

        {/* Universal VAT Calculator */}
        <UniversalVATCalculator 
          country="United States"
          currency="USD"
          currencySymbol="$"
          vatRate={8.5}
          vatName="Sales Tax"
          colorScheme="from-blue-600 to-red-600"
        />
      </div>
    </>
  );
}