import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import UniversalInvestmentCalculator from '@/components/UniversalInvestmentCalculator';

export const metadata: Metadata = {
  title: 'Luxembourg Investment Calculator 2025 | Luxembourg Finance Calculator',
  description: 'Free Luxembourg investment calculator for 2025. Calculate returns, compound growth, and investment scenarios in Luxembourg with EUR.',
  keywords: [
    'luxembourg investment calculator', 'luxembourg finance calculator', 'luxembourg savings calculator', 'luxembourg compound interest calculator', 'luxembourg portfolio calculator'
  ],
  alternates: {
    canonical: '/luxembourg-investment-calculator',
  },
  openGraph: {
    title: 'Luxembourg Investment Calculator 2025 | Luxembourg Finance Calculator',
    description: 'Free Luxembourg investment calculator for 2025. Calculate returns, compound growth, and investment scenarios in Luxembourg with EUR.',
    url: 'https://genius-insights.co.za/luxembourg-investment-calculator',
    type: 'website',
    images: [
      {
        url: '/images/luxembourg-investment-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxembourg Investment Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxembourg Investment Calculator 2025 | Luxembourg Finance Calculator',
    description: 'Free Luxembourg investment calculator for 2025. Calculate returns, compound growth, and investment scenarios in Luxembourg with EUR.',
    images: ['/images/luxembourg-investment-calculator-og.jpg'],
  },
};

export default function LuxembourgInvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-white to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-blue-900/90 font-medium text-sm tracking-wide">🇱🇺 Financial Planning</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Luxembourg Investment <br/>
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment returns, compound growth, and financial planning scenarios in Luxembourg.
              </p>
            </div>
          </div>
        </div>

        <UniversalInvestmentCalculator
          country="Luxembourg"
          currency="EUR"
          currencySymbol="€"
          colorScheme="from-red-600 via-white to-blue-600"
        />

        {/* Luxembourg-specific features section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Luxembourg Investment Features</h2>
              <p className="text-gray-600">Specialized investment opportunities in the Grand Duchy of Luxembourg</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Luxembourg Banks</h4>
                <p className="text-gray-600 text-sm">Investment products from BGL BNP Paribas, Banque Internationale, and other Luxembourg banks</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💼</div>
                <h4 className="font-semibold text-gray-900 mb-2">Fund Management</h4>
                <p className="text-gray-600 text-sm">Access to Luxembourg-domiciled investment funds and UCITS</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax Optimization</h4>
                <p className="text-gray-600 text-sm">Consider Luxembourg tax implications for investment planning</p>
              </div>
            </div>

            {/* Additional Luxembourg investment information */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Luxembourg Investment Advantages</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    EU financial center with stable regulatory environment
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Home to major investment funds and UCITS
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Favorable tax treaties and holding company structures
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Strong banking secrecy and investor protection laws
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Options</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Luxembourg government bonds and treasury bills
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    UCITS funds and alternative investment funds
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Private banking and wealth management services
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    European equity and bond markets access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}