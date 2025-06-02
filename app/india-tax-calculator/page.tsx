import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'India Tax Calculator 2025 | Income Tax Calculator FY 2024-25',
  description: 'Free India tax calculator for FY 2024-25. Calculate income tax under old and new tax regime, TDS, advance tax. Updated with latest Indian tax slabs.',
  keywords: [
    'india tax calculator 2025', 'Income Tax Department tax calculator', 'india income tax calculator', 'PAYE calculator India', 'india tax rates', 'payroll tax India', 'income tax india'
  ],
  alternates: {
    canonical: '/india-tax-calculator',
  },
  openGraph: {
    title: 'India Tax Calculator 2025 | Income Tax Calculator FY 2024-25',
    description: 'Free India tax calculator for FY 2024-25. Calculate income tax under old and new tax regime, TDS, advance tax. Updated with latest Indian tax slabs.',
    url: 'https://genius-insights.co.za/india-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/india-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'India Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Tax Calculator 2025 | Income Tax Calculator FY 2024-25',
    description: 'Free India tax calculator for FY 2024-25. Calculate income tax under old and new tax regime, TDS, advance tax. Updated with latest Indian tax slabs.',
    images: ['/images/india-tax-calculator-og.jpg'],
  },
};

const indiaTaxBrackets = [
  { min: 0, max: 300000, rate: 0 },        // Tax-free up to ₹3 lakhs
  { min: 300001, max: 700000, rate: 0.05 }, // 5% for ₹3-7 lakhs
  { min: 700001, max: 1000000, rate: 0.1 }, // 10% for ₹7-10 lakhs
  { min: 1000001, max: 1200000, rate: 0.15 }, // 15% for ₹10-12 lakhs
  { min: 1200001, max: 1500000, rate: 0.2 }, // 20% for ₹12-15 lakhs
  { min: 1500001, max: Infinity, rate: 0.3 } // 30% for above ₹15 lakhs
];

const indiaAllowances = [
  "Standard Deduction: ₹75,000 (New Tax Regime)",
  "Basic Exemption: ₹3,00,000 (tax-free)",
  "Section 80C: ₹1,50,000 (Old Regime)",
  "Health Insurance: ₹25,000 (Section 80D)",
  "NPS Contribution: ₹50,000 (Section 80CCD)",
  "Home Loan Interest: ₹2,00,000 (Section 24)"
];

export default function IndiaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇮🇳 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                India Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact Income Tax Department income tax and PAYE with the latest 2025 India tax rates, 
                allowances, and brackets. Trusted by thousands of India taxpayers.
              </p>
            </div>
          </div>
        </div>

        {/* Universal Tax Calculator */}
        <UniversalTaxCalculator 
          country="India"
          currency="INR"
          currencySymbol="₹"
          taxBrackets={indiaTaxBrackets}
          allowances={indiaAllowances}
          taxAuthority="Income Tax Department"
          colorScheme="from-orange-600 to-red-600"
        />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 India Tax Brackets
                </h2>
                
                <div className="space-y-4">
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₹0 - 2,50,000</span>
                      <span className="text-lg font-bold text-gray-900">0%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₹2,50,001 - 5,00,000</span>
                      <span className="text-lg font-bold text-gray-900">5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₹5,00,001 - 10,00,000</span>
                      <span className="text-lg font-bold text-gray-900">20%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">₹10,00,001+</span>
                      <span className="text-lg font-bold text-gray-900">30%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Tax Allowances & Deductions
                </h3>
                
                <div className="space-y-4">
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Standard deduction: ₹50,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Section 80C: ₹1,50,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">HRA exemption available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}