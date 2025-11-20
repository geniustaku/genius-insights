import type { Metadata } from 'next';
import SouthAfricaCryptoTaxCalculator from '@/components/SouthAfricaCryptoTaxCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Cryptocurrency Tax Calculator 2025 | Free Crypto CGT & Trading Income Tax Calculator',
  description: 'Free SA crypto tax calculator 2025. Calculate cryptocurrency capital gains tax (CGT) and trading income tax with SARS compliance. Bitcoin, Ethereum, altcoins - R40K exclusion, 40% inclusion rate. Used by 30,000+ crypto investors.',
  keywords: [
    'cryptocurrency tax calculator South Africa 2025',
    'crypto tax calculator SA',
    'bitcoin tax calculator South Africa',
    'crypto capital gains tax SA',
    'crypto trading income tax',
    'SARS crypto tax calculator',
    'how to calculate crypto tax SA',
    'cryptocurrency CGT calculator',
    'bitcoin trading tax South Africa',
    'ethereum tax calculator SA',
    'crypto tax compliance SARS',
    'cryptocurrency income tax SA',
    'altcoin tax calculator',
    'crypto capital gains vs trading income',
    'SARS cryptocurrency guidelines'
  ],
  alternates: {
    canonical: '/south-africa-crypto-tax-calculator',
  },
  openGraph: {
    title: 'South Africa Cryptocurrency Tax Calculator 2025 | Free Crypto Tax Calculator',
    description: '₿ Calculate crypto tax in SA! Capital gains vs trading income, R40K exclusion, 40% inclusion rate. Bitcoin, Ethereum & altcoins. SARS-compliant calculator.',
    url: 'https://genius-insights.co.za/south-africa-crypto-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-crypto-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Cryptocurrency Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Crypto Tax Calculator 2025 | Bitcoin & Crypto CGT Calculator',
    description: '₿ Calculate cryptocurrency tax in South Africa! Capital gains vs trading income, SARS compliance.',
    images: ['/images/sa-crypto-tax-calculator-og.jpg'],
  },
};

export default function SouthAfricaCryptoTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">₿ SARS-Compliant Crypto Tax Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Cryptocurrency Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate cryptocurrency tax for Bitcoin, Ethereum, and altcoins. Understand the difference between
                capital gains tax (CGT) and trading income tax to stay SARS-compliant.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R40K</div>
                  <div className="text-white/80 text-sm">Annual CGT Exclusion</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">40%</div>
                  <div className="text-white/80 text-sm">CGT Inclusion Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2 Types</div>
                  <div className="text-white/80 text-sm">Capital Gain vs Trading</div>
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
          <SouthAfricaCryptoTaxCalculator />
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
                  Understanding Crypto Tax in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  SARS treats cryptocurrency as an asset, not currency. How your crypto gains are taxed
                  depends on whether you're investing (capital gains) or actively trading (income tax).
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'Capital Gains Tax', desc: 'Long-term holding: R40K exclusion, 40% inclusion rate, lower effective tax' },
                    { icon: '📊', title: 'Trading Income Tax', desc: 'Frequent trading: Taxed as regular income at marginal rate (18-45%)' },
                    { icon: '⚠️', title: 'SARS Classification', desc: '>50 trades/year or <3 month holding may be classified as trading' },
                    { icon: '📝', title: 'Record Keeping', desc: 'Track all transactions, fees, dates for accurate tax reporting' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl">
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
                  Crypto Tax Scenarios
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">₿ Buying & Holding Bitcoin</h4>
                    <p className="text-sm text-gray-600">Long-term investment (&gt;1 year): Capital Gains Tax applies. R40K annual exclusion, 40% inclusion rate.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">📈 Day Trading Crypto</h4>
                    <p className="text-sm text-gray-600">Frequent buying/selling: Likely classified as trading income. Taxed at marginal rate (18-45%).</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">💸 Crypto-to-Crypto Swaps</h4>
                    <p className="text-sm text-gray-600">Trading BTC for ETH: Taxable event. Must calculate gain/loss in ZAR at time of swap.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🎁 Receiving Crypto</h4>
                    <p className="text-sm text-gray-600">Mining, staking, airdrops: Taxed as income at ZAR value when received. Cost basis for future sales.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-orange-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Crypto Tax Tips</h4>
                      <ul className="text-orange-800 text-sm leading-relaxed space-y-1">
                        <li>• Track every transaction with dates and ZAR values</li>
                        <li>• Deduct exchange fees and network costs</li>
                        <li>• Use FIFO method for cost basis (First In, First Out)</li>
                        <li>• Declare crypto on your annual tax return (IT-R)</li>
                        <li>• Keep records for 5 years minimum</li>
                        <li>• Consider tax-loss harvesting to offset gains</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional SARS Guidance Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                SARS Cryptocurrency Guidelines 2025
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🏦 Taxable Events</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Selling crypto for ZAR</li>
                    <li>✓ Trading crypto for crypto</li>
                    <li>✓ Using crypto to buy goods</li>
                    <li>✓ Receiving payment in crypto</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💵 Deductible Costs</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Exchange trading fees</li>
                    <li>✓ Network transaction fees</li>
                    <li>✓ Wallet transfer costs</li>
                    <li>✓ Purchase price (cost basis)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 Reporting Requirements</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Declare on IT-R tax return</li>
                    <li>✓ Report all crypto holdings</li>
                    <li>✓ Include foreign exchanges</li>
                    <li>✓ Keep transaction records</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
