import type { Metadata } from 'next';
import UniversalVATCalculator from '@/components/UniversalVATCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Nigeria VAT Calculator 2025 | 7.5% VAT Calculator',
  description: 'Free Nigeria VAT calculator for 2025. Calculate 7.5% VAT on goods and services. FIRS compliant VAT calculations for Nigerian businesses.',
  keywords: [
    'nigeria VAT calculator', '7.5% VAT calculator', 'nigeria VAT rates', 'VAT calculator Nigeria', 'nigeria sales tax'
  ],
  alternates: {
    canonical: '/nigeria-vat-calculator',
  },
  openGraph: {
    title: 'Nigeria VAT Calculator 2025 | 7.5% VAT Calculator',
    description: 'Free Nigeria VAT calculator for 2025. Calculate 7.5% VAT on goods and services. FIRS compliant VAT calculations for Nigerian businesses.',
    url: 'https://genius-insights.co.za/nigeria-vat-calculator',
    type: 'website',
  },
};

export default function NigeriaVATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        <UniversalVATCalculator
          country="Nigeria"
          currency="NGN"
          currencySymbol="₦"
          vatRate={7.5}
          vatName="VAT"
          colorScheme="from-green-600 to-emerald-600"
        />
      </div>
    </>
  );
}