import type { Metadata } from 'next';
import UniversalVATCalculator from '@/components/UniversalVATCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'UK VAT Calculator 2025 | 20% VAT Calculator',
  description: 'Free UK VAT calculator for 2025. Calculate 20% VAT on goods and services. HMRC compliant VAT calculations for British businesses.',
  keywords: [
    'united kingdom VAT calculator', '20% VAT calculator', 'united kingdom VAT rates', 'VAT calculator United Kingdom', 'united kingdom sales tax'
  ],
  alternates: {
    canonical: '/united kingdom-vat-calculator',
  },
  openGraph: {
    title: 'UK VAT Calculator 2025 | 20% VAT Calculator',
    description: 'Free UK VAT calculator for 2025. Calculate 20% VAT on goods and services. HMRC compliant VAT calculations for British businesses.',
    url: 'https://genius-insights.co.za/united kingdom-vat-calculator',
    type: 'website',
  },
};

export default function UnitedKingdomVATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 20% VAT Rate</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                United Kingdom VAT Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate 20% VAT on goods and services in United Kingdom. Free VAT calculator for United Kingdom businesses and consumers.
              </p>
            </div>
          </div>
        </div>

        {/* Universal VAT Calculator */}
        <UniversalVATCalculator 
          country="United Kingdom"
          currency="GBP"
          currencySymbol="£"
          vatRate={20}
          vatName="VAT"
          colorScheme="from-blue-600 to-indigo-600"
        />
      </div>
    </>
  );
}