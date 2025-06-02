import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Brazil Tax Calculator 2025 | Brazilian Income Tax Calculator',
  description: 'Free Brazil tax calculator for 2025. Calculate Brazilian income tax, INSS, FGTS accurately.',
  keywords: [
    'brazil tax calculator 2025', 'brazil income tax calculator', 'tax calculator Brazil', 'brazil tax rates', 'payroll tax Brazil'
  ],
  alternates: {
    canonical: '/brazil-tax-calculator',
  },
  openGraph: {
    title: 'Brazil Tax Calculator 2025 | Brazilian Income Tax Calculator',
    description: 'Free Brazil tax calculator for 2025. Calculate Brazilian income tax, INSS, FGTS accurately.',
    url: 'https://genius-insights.co.za/brazil-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/brazil-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Brazil Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brazil Tax Calculator 2025 | Brazilian Income Tax Calculator',
    description: 'Free Brazil tax calculator for 2025. Calculate Brazilian income tax, INSS, FGTS accurately.',
    images: ['/images/brazil-tax-calculator-og.jpg'],
  },
};

// Brazilian Income Tax Brackets for 2025
const brazilTaxBrackets = [
  { min: 0, max: 24511, rate: 0.0 },          // Tax-free threshold - R$ 24,511.92
  { min: 24512, max: 33919, rate: 0.075 },    // 7.5% - R$ 24,511.93 to R$ 33,919.80
  { min: 33920, max: 45012, rate: 0.15 },     // 15% - R$ 33,919.81 to R$ 45,012.60
  { min: 45013, max: 55976, rate: 0.225 },    // 22.5% - R$ 45,012.61 to R$ 55,976.16
  { min: 55977, max: Infinity, rate: 0.275 }  // 27.5% - Above R$ 55,976.16
];

const brazilAllowances = [
  'Standard deduction up to R$ 24,511.92 per year',
  'INSS contributions (up to R$ 7,507.49 annually)',
  'Medical expenses (unlimited deduction)',
  'Education expenses (up to R$ 3,561.50 per dependent)',
  'Dependent deduction (R$ 2,275.08 per dependent)',
  'Pension contributions to private plans',
  'Donations to approved organizations'
];

export default function BrazilTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-yellow-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇧🇷 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Brazil Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Brazil income tax with the latest 2025 tax rates and brackets.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Brazil"
          currency="BRL"
          currencySymbol="R$"
          taxBrackets={brazilTaxBrackets}
          allowances={brazilAllowances}
          taxAuthority="Receita Federal"
          colorScheme="from-green-600 to-yellow-600"
        />
      </div>
    </>
  );
}