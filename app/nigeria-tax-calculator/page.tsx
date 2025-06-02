import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Nigeria Tax Calculator 2025 | FIRS Income Tax & PAYE Calculator Free',
  description: 'Free Nigeria tax calculator for 2025. Calculate FIRS income tax, PAYE, withholding tax accurately. Updated with latest Nigerian tax rates, allowances & brackets. Used by 50,000+ Nigerians.',
  keywords: [
    'Nigeria tax calculator 2025', 'FIRS tax calculator', 'Nigerian income tax calculator', 'PAYE calculator Nigeria', 'Nigeria tax calculator 2025', 'Nigeria tax rates', 'FIRS PAYE calculator', 'income tax Nigeria', 'Nigeria tax brackets 2025', 'Nigerian tax allowances', 'withholding tax calculator Nigeria', 'payroll tax Nigeria', 'tax year 2025 Nigeria', 'FIRS income tax rates', 'Nigeria payroll calculator'
  ],
  alternates: {
    canonical: '/nigeria-tax-calculator',
  },
  openGraph: {
    title: 'Nigeria Tax Calculator 2025 | Free FIRS PAYE Calculator',
    description: '💰 Calculate your exact Nigerian tax! Updated 2025 FIRS rates, allowances & brackets. Free PAYE, withholding tax calculator used by 50,000+ taxpayers.',
    url: 'https://genius-insights.co.za/nigeria-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/nigeria-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Nigeria Tax Calculator 2025 - FIRS PAYE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nigeria Tax Calculator 2025 | FIRS PAYE Calculator',
    description: '💰 Free Nigeria tax calculator! Calculate FIRS income tax, PAYE, withholding tax with 2025 rates. Accurate & updated.',
    images: ['/images/nigeria-tax-calculator-og.jpg'],
  },
};

export default function NigeriaTaxCalculatorPage() {
  const nigeriaTaxBrackets = [
    { min: 0, max: 300000, rate: 0.07 },
    { min: 300001, max: 600000, rate: 0.11 },
    { min: 600001, max: 1100000, rate: 0.15 },
    { min: 1100001, max: 1600000, rate: 0.19 },
    { min: 1600001, max: 3200000, rate: 0.21 },
    { min: 3200001, max: Infinity, rate: 0.24 }
  ];

  const nigeriaAllowances = [
    'Personal allowance: ₦200,000 + 20% of gross income',
    'Maximum personal allowance: ₦200,000',
    'Pension contribution: 8% of basic salary'
  ];

  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        <UniversalTaxCalculator
          country="Nigeria"
          currency="NGN"
          currencySymbol="₦"
          taxBrackets={nigeriaTaxBrackets}
          allowances={nigeriaAllowances}
          taxAuthority="FIRS"
          colorScheme="from-green-600 to-emerald-600"
        />
      </div>
    </>
  );
}