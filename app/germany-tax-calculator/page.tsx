import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Germany Tax Calculator 2025 | German Income Tax Calculator',
  description: 'Free Germany tax calculator for 2025. Calculate German income tax, church tax, solidarity surcharge accurately.',
  keywords: [
    'germany tax calculator 2025', 'germany income tax calculator', 'tax calculator Germany', 'germany tax rates', 'payroll tax Germany'
  ],
  alternates: {
    canonical: '/germany-tax-calculator',
  },
  openGraph: {
    title: 'Germany Tax Calculator 2025 | German Income Tax Calculator',
    description: 'Free Germany tax calculator for 2025. Calculate German income tax, church tax, solidarity surcharge accurately.',
    url: 'https://genius-insights.co.za/germany-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/germany-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Germany Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Germany Tax Calculator 2025 | German Income Tax Calculator',
    description: 'Free Germany tax calculator for 2025. Calculate German income tax, church tax, solidarity surcharge accurately.',
    images: ['/images/germany-tax-calculator-og.jpg'],
  },
};

export default function GermanyTaxCalculatorPage() {
  // German tax brackets for 2025 (based on current German tax law)
  const germanTaxBrackets = [
    { min: 0, max: 11604, rate: 0.0 },        // Tax-free allowance (Grundfreibetrag)
    { min: 11605, max: 17005, rate: 0.14 },   // Entry zone (Eingangssatz) 14%
    { min: 17006, max: 66760, rate: 0.24 },   // Progressive zone 24%
    { min: 66761, max: 277825, rate: 0.42 },  // Proportional zone 42%
    { min: 277826, max: Infinity, rate: 0.45 } // Top rate (Spitzensteuersatz) 45%
  ];

  const germanAllowances = [
    "Basic tax-free allowance: €11,604 (2025)",
    "Employee lump sum: €1,230",
    "Saver's allowance: €1,000 (singles), €2,000 (married couples)",
    "Child allowance: €6,624 per child",
    "Special expenses deduction available",
    "Church tax (8-9% of income tax) if applicable",
    "Solidarity surcharge: 5.5% on income tax (for high earners)"
  ];

  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Germany Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Germany income tax with the latest 2025 tax rates and brackets.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Germany"
          currency="EUR"
          currencySymbol="€"
          taxBrackets={germanTaxBrackets}
          allowances={germanAllowances}
          taxAuthority="Bundesfinanzministerium (Federal Ministry of Finance)"
          colorScheme="from-gray-600 to-red-600"
        />
      </div>
    </>
  );
}