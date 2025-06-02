import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'France Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
  description: 'Free France loan calculator for 2025. Calculate mortgage payments, personal loans with French bank rates.',
  keywords: [
    'france loan calculator', 'france mortgage calculator', 'loan calculator France', 'france EMI calculator'
  ],
  alternates: {
    canonical: '/france-loan-calculator',
  },
  openGraph: {
    title: 'France Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free France loan calculator for 2025. Calculate mortgage payments, personal loans with French bank rates.',
    url: 'https://genius-insights.co.za/france-loan-calculator',
    type: 'website',
  },
};

export default function FranceLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇫🇷 Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                France Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate loan payments and interest for mortgages, personal loans, and car loans in France.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">France Loan Calculator</h2>
              <p className="text-gray-600">Calculate monthly payments and total interest for your loan</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (€)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Loan Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}