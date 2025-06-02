import type { Metadata } from 'next';
import UniversalVATCalculator from '@/components/UniversalVATCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'India GST Calculator 2025 | 18% GST Calculator',
  description: 'Free India GST calculator for 2025. Calculate CGST, SGST, IGST at 5%, 12%, 18%, 28% rates. GST compliant calculations for Indian businesses.',
  keywords: [
    'india VAT calculator', '18% VAT calculator', 'india VAT rates', 'VAT calculator India', 'india sales tax'
  ],
  alternates: {
    canonical: '/india-vat-calculator',
  },
  openGraph: {
    title: 'India GST Calculator 2025 | 18% GST Calculator',
    description: 'Free India GST calculator for 2025. Calculate CGST, SGST, IGST at 5%, 12%, 18%, 28% rates. GST compliant calculations for Indian businesses.',
    url: 'https://genius-insights.co.za/india-vat-calculator',
    type: 'website',
  },
};

export default function IndiaVATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇮🇳 18% VAT Rate</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                India VAT Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate 18% VAT on goods and services in India. Free VAT calculator for India businesses and consumers.
              </p>
            </div>
          </div>
        </div>

        {/* Universal GST Calculator */}
        <UniversalVATCalculator 
          country="India"
          currency="INR"
          currencySymbol="₹"
          vatRate={18}
          vatName="GST"
          colorScheme="from-orange-600 to-red-600"
        />
      </div>
    </>
  );
}