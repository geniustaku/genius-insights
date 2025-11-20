import type { Metadata } from 'next';
import SouthAfricaCapitecCalculator from '@/components/SouthAfricaCapitecCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Capitec Bank Calculator 2025 | Free Capitec Loan, Savings & Account Calculator',
  description: 'Free Capitec calculator 2025. Calculate Capitec personal loans, GlobalOne fees, fixed deposits, credit facilities & Access home loans. Official rates for South Africa\'s largest bank. Used by 20,000+ customers.',
  keywords: [
    'Capitec calculator 2025',
    'Capitec loan calculator',
    'Capitec personal loan calculator',
    'GlobalOne calculator',
    'Capitec fixed deposit calculator',
    'Capitec savings calculator',
    'Capitec home loan calculator',
    'Capitec Access home loan',
    'Capitec credit facility calculator',
    'Capitec bank fees',
    'Capitec interest rates 2025',
    'Capitec affordability calculator',
    'GlobalOne account fees',
    'Capitec bank calculator SA',
    'how much can I borrow Capitec'
  ],
  alternates: {
    canonical: '/south-africa-capitec-calculator',
  },
  openGraph: {
    title: 'Capitec Bank Calculator 2025 | Free Loan & Savings Calculator',
    description: '🏦 Calculate Capitec loans, savings & bank fees! GlobalOne, personal loans, fixed deposits with 2025 rates. SA\'s largest bank calculator.',
    url: 'https://genius-insights.co.za/south-africa-capitec-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-capitec-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Capitec Bank Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capitec Calculator 2025 | Loan, Savings & Account Fees',
    description: '🏦 Calculate Capitec personal loans, GlobalOne fees & fixed deposits with 2025 rates!',
    images: ['/images/sa-capitec-calculator-og.jpg'],
  },
};

export default function SouthAfricaCapitecCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏦 South Africa's Largest Bank</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Capitec Bank Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate Capitec personal loans, credit facilities, GlobalOne bank fees, fixed deposits,
                and Access home loans with current 2025 interest rates and fees.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">21M+</div>
                  <div className="text-white/80 text-sm">Active Clients</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R59</div>
                  <div className="text-white/80 text-sm">GlobalOne Fee</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">19.5%</div>
                  <div className="text-white/80 text-sm">Loan Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Calculator</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaCapitecCalculator />
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
            {/* Multiplex Ad */}
            <div className="mb-8 text-center">
              <AdSenseAd
                adSlot="9985989974"
                adFormat="autorelaxed"
                style={{ display: 'block', minHeight: '280px' }}
                className="border border-gray-200 rounded-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Why Choose Capitec Bank?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Capitec is South Africa's largest retail bank with over 21 million active clients.
                  Known for simplicity, transparency, and competitive rates.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '🏆', title: '21M+ Clients', desc: 'Most customers in South Africa' },
                    { icon: '💰', title: 'Low Fees', desc: 'R59/month GlobalOne account fee' },
                    { icon: '📱', title: 'Digital First', desc: 'Award-winning mobile banking app' },
                    { icon: '⚡', title: 'Quick Approvals', desc: 'Loan decisions in minutes' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl">
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
                  Capitec Products 2025
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🏦 GlobalOne Account</h4>
                    <p className="text-sm text-gray-600">R59/month • Free digital banking • Interest on balance</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">💳 Personal Loan</h4>
                    <p className="text-sm text-gray-600">R1,000 - R250,000 • 19.5% p.a. • 6-84 months</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🏠 Access Home Loan</h4>
                    <p className="text-sm text-gray-600">R100K - R5M • 11.75% p.a. • 5-20 years</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">💰 Fixed Deposit</h4>
                    <p className="text-sm text-gray-600">9.25% p.a. • Minimum R10,000 • 1-60 months</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Capitec Tips</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Apply online or at any Capitec branch</li>
                        <li>• No minimum income for GlobalOne account</li>
                        <li>• Free ATM withdrawals at Capitec ATMs</li>
                        <li>• Loan affordability: max 30% of gross income</li>
                        <li>• Fixed deposits offer higher rates than savings</li>
                      </ul>
                    </div>
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
