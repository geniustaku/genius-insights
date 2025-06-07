import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';

export const metadata: Metadata = {
  title: 'Luxembourg Tax Calculator 2025 | Luxembourg Income Tax Calculator | Impôt Calculator',
  description: 'Free Luxembourg tax calculator for 2025. Calculate Luxembourg income tax, social contributions, and net salary with current EUR rates.',
  keywords: [
    'luxembourg tax calculator 2025', 'luxembourg income tax calculator', 'luxembourg salary calculator', 'impot luxembourg calculator', 'luxembourg payroll calculator', 'luxembourg net salary calculator'
  ],
  alternates: {
    canonical: '/luxembourg-tax-calculator',
  },
  openGraph: {
    title: 'Luxembourg Tax Calculator 2025 | Luxembourg Income Tax Calculator',
    description: 'Free Luxembourg tax calculator for 2025. Calculate Luxembourg income tax, social contributions, and net salary with current EUR rates.',
    url: 'https://genius-insights.co.za/luxembourg-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/luxembourg-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxembourg Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxembourg Tax Calculator 2025 | Luxembourg Income Tax Calculator',
    description: 'Free Luxembourg tax calculator for 2025. Calculate Luxembourg income tax, social contributions, and net salary with current EUR rates.',
    images: ['/images/luxembourg-tax-calculator-og.jpg'],
  },
};

// Luxembourg Income Tax Brackets for 2025
const luxembourgTaxBrackets = [
  { min: 0, max: 12000, rate: 0.0 },            // Tax-free threshold - €12,000
  { min: 12001, max: 13050, rate: 0.08 },       // 8% - €12,001 to €13,050
  { min: 13051, max: 15600, rate: 0.09 },       // 9% - €13,051 to €15,600
  { min: 15601, max: 18150, rate: 0.10 },       // 10% - €15,601 to €18,150
  { min: 18151, max: 20700, rate: 0.11 },       // 11% - €18,151 to €20,700
  { min: 20701, max: 23250, rate: 0.12 },       // 12% - €20,701 to €23,250
  { min: 23251, max: 25800, rate: 0.14 },       // 14% - €23,251 to €25,800
  { min: 25801, max: 30000, rate: 0.16 },       // 16% - €25,801 to €30,000
  { min: 30001, max: 40000, rate: 0.18 },       // 18% - €30,001 to €40,000
  { min: 40001, max: 48000, rate: 0.31 },       // 31% - €40,001 to €48,000
  { min: 48001, max: 54000, rate: 0.33 },       // 33% - €48,001 to €54,000
  { min: 54001, max: 60000, rate: 0.36 },       // 36% - €54,001 to €60,000
  { min: 60001, max: 66000, rate: 0.38 },       // 38% - €60,001 to €66,000
  { min: 66001, max: 72000, rate: 0.40 },       // 40% - €66,001 to €72,000
  { min: 72001, max: 78000, rate: 0.41 },       // 41% - €72,001 to €78,000
  { min: 78001, max: 84000, rate: 0.42 },       // 42% - €78,001 to €84,000
  { min: 84001, max: 200000, rate: 0.43 },      // 43% - €84,001 to €200,000
  { min: 200001, max: Infinity, rate: 0.45 }    // 45% - Above €200,000
];

const luxembourgAllowances = [
  'Basic tax-free threshold: €12,000 per year',
  'Employee social security contributions (12.65% of salary)',
  'Pension fund contributions (additional voluntary contributions)',
  'Professional expenses allowance: €540 - €4,500',
  'Commuting expenses deduction',
  'Childcare expenses deduction',
  'Interest on home loans deduction',
  'Charitable donations deduction',
  'Insurance premium deductions'
];

export default function LuxembourgTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-white to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-blue-900/90 font-medium text-sm tracking-wide">🇱🇺 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900 mb-6 leading-tight">
                Luxembourg Tax Calculator <br/>
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Luxembourg income tax with the latest 2025 tax rates and social security contributions.
              </p>
            </div>
          </div>
        </div>

        <UniversalTaxCalculator
          country="Luxembourg"
          currency="EUR"
          currencySymbol="€"
          taxBrackets={luxembourgTaxBrackets}
          allowances={luxembourgAllowances}
          taxAuthority="Administration des Contributions Directes"
          colorScheme="from-red-600 via-white to-blue-600"
        />
      </div>
    </>
  );
}