import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'France Tax Calculator 2025 | French Income Tax Calculator',
  description: 'Free France tax calculator for 2025. Calculate French income tax, social contributions accurately.',
  keywords: [
    'france tax calculator 2025', 'france income tax calculator', 'tax calculator France', 'france tax rates', 'payroll tax France'
  ],
  alternates: {
    canonical: '/france-tax-calculator',
  },
  openGraph: {
    title: 'France Tax Calculator 2025 | French Income Tax Calculator',
    description: 'Free France tax calculator for 2025. Calculate French income tax, social contributions accurately.',
    url: 'https://genius-insights.co.za/france-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/france-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'France Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'France Tax Calculator 2025 | French Income Tax Calculator',
    description: 'Free France tax calculator for 2025. Calculate French income tax, social contributions accurately.',
    images: ['/images/france-tax-calculator-og.jpg'],
  },
};

export default function FranceTaxCalculatorPage() {
  // French tax brackets for 2025 (based on current French tax law)
  const frenchTaxBrackets = [
    { min: 0, max: 11294, rate: 0.0 },        // Tax-free band (tranche à 0%)
    { min: 11295, max: 28797, rate: 0.11 },   // First bracket 11%
    { min: 28798, max: 82341, rate: 0.30 },   // Second bracket 30%
    { min: 82342, max: 177106, rate: 0.41 },  // Third bracket 41%
    { min: 177107, max: Infinity, rate: 0.45 } // Top bracket 45%
  ];

  const frenchAllowances = [
    "Tax-free allowance: €11,294 (2025)",
    "Standard deduction: 10% of income (minimum €468, maximum €14,171)",
    "Employee expenses deduction available",
    "Dependent child allowances: €1,678 per child for family quotient",
    "Social security contributions are deductible",
    "CSG and CRDS: 9.7% on income (partially deductible)",
    "Prélèvement à la source: Tax withheld at source",
    "Family quotient system applies for married couples and dependents"
  ];

  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇫🇷 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                France Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact France income tax with the latest 2025 tax rates and brackets.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="France"
          currency="EUR"
          currencySymbol="€"
          taxBrackets={frenchTaxBrackets}
          allowances={frenchAllowances}
          taxAuthority="Direction Générale des Finances Publiques (DGFiP)"
          colorScheme="from-blue-600 to-red-600"
        />
      </div>
    </>
  );
}