import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Ghana Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
  description: 'Free Ghana loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Ghanaian bank rates. EMI calculator for Ghanaian loans.',
  keywords: [
    'ghana loan calculator', 'ghana mortgage calculator', 'loan calculator Ghana', 'ghana EMI calculator', 'ghana home loan'
  ],
  alternates: {
    canonical: '/ghana-loan-calculator',
  },
  openGraph: {
    title: 'Ghana Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Ghana loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Ghanaian bank rates. EMI calculator for Ghanaian loans.',
    url: 'https://genius-insights.co.za/ghana-loan-calculator',
    type: 'website',
  },
};

export default function GhanaLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-600 to-orange-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇭 Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Ghana Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate loan payments, EMI, and interest for mortgages, personal loans, and car loans in Ghana.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ghana Loan & Mortgage Calculator</h2>
              <p className="text-gray-600">Calculate monthly payments and total interest for your loan</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₵)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 8.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Years)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 20"
                    />
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
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