import type { Metadata } from 'next';
import SouthAfricaDepositCalculator from '@/components/SouthAfricaDepositCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Fixed Deposit Calculator 2025 | Savings & Interest Calculator',
  description: 'Free SA fixed deposit calculator 2025. Calculate returns on fixed deposits, savings accounts. Compare bank rates FNB, ABSA, Capitec, Nedbank. Interest tax calculator included.',
  keywords: [
    'fixed deposit calculator south africa 2025',
    'deposit interest calculator',
    'savings calculator SA',
    'bank interest calculator',
    'compound interest calculator',
    'fnb fixed deposit rates',
    'capitec fixed deposit',
    'absa fixed deposit calculator',
    'nedbank deposit rates',
    'african bank fixed deposit',
    'interest on savings calculator',
    'money market calculator',
    'term deposit calculator'
  ],
  alternates: {
    canonical: '/south-africa-deposit-calculator',
  },
  openGraph: {
    title: 'South Africa Fixed Deposit Calculator 2025 | Bank Interest Calculator',
    description: '💰 Calculate fixed deposit returns! Compare SA bank rates. Tax on interest included.',
    url: 'https://genius-insights.co.za/south-africa-deposit-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Fixed Deposit Calculator 2025',
    description: '💰 Calculate savings returns with compound interest and tax implications.',
  },
};

export default function SouthAfricaDepositCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💰 Fixed Deposit & Savings</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Deposit Calculator <br/>
                <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate returns on fixed deposits and savings accounts. Compare bank rates
                and understand tax implications on your interest income.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">7-10%</div>
                  <div className="text-white/80 text-sm">Fixed Deposit Rates</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R23,800</div>
                  <div className="text-white/80 text-sm">Interest Exemption</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Monthly</div>
                  <div className="text-white/80 text-sm">Compounding</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Calculator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Before Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd
            adSlot="5341658648"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaDepositCalculator />
        </div>

        {/* Ad After Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd
            adSlot="2386701555"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Fixed Deposits in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Fixed deposits offer guaranteed returns at higher rates than savings accounts.
                  You lock your money for a set period in exchange for better interest rates.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '🔒', title: 'Guaranteed Returns', desc: 'Interest rate fixed for the entire term' },
                    { icon: '📈', title: 'Higher Rates', desc: 'Better rates than call or savings accounts' },
                    { icon: '⏰', title: 'Fixed Terms', desc: '1 month to 5 years typically' },
                    { icon: '💰', title: 'Compound Interest', desc: 'Interest can compound monthly or annually' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Types of Deposits
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <h4 className="font-semibold text-cyan-900 mb-2">Fixed/Term Deposit</h4>
                    <p className="text-sm text-cyan-800">Money locked for a set period. Higher rates, but penalties for early withdrawal.</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Notice Deposit</h4>
                    <p className="text-sm text-blue-800">Give 32 days notice before withdrawal. Better rates than call accounts.</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Money Market</h4>
                    <p className="text-sm text-indigo-800">Higher minimums, competitive rates. Often offered by unit trust companies.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
                  <h4 className="font-semibold text-cyan-900 mb-2">Tax-Free Savings Alternative</h4>
                  <p className="text-cyan-800 text-sm leading-relaxed">
                    Consider a Tax-Free Savings Account (TFSA) - up to R36,000/year with no tax on interest,
                    dividends, or capital gains. Better for long-term savings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
