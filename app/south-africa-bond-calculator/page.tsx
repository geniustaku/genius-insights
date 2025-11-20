import type { Metadata } from 'next';
import SouthAfricaBondCalculator from '@/components/SouthAfricaBondCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Bond Calculator 2025 | Free Home Loan & Affordability Calculator',
  description: 'Free SA bond calculator 2025. Calculate home loan affordability, monthly bond repayments, total interest costs with current 11.75% prime rate. Property affordability calculator for South African home buyers.',
  keywords: [
    'bond calculator South Africa 2025',
    'home loan calculator SA',
    'bond affordability calculator',
    'home loan affordability South Africa',
    'bond repayment calculator',
    'mortgage calculator SA',
    'property affordability calculator',
    'how much bond can I afford',
    'home loan calculator with deposit',
    'bond interest calculator',
    'property bond calculator',
    'housing loan calculator SA',
    'bond qualification calculator',
    'mortgage affordability calculator',
    'home buying calculator South Africa'
  ],
  alternates: {
    canonical: '/south-africa-bond-calculator',
  },
  openGraph: {
    title: 'South Africa Bond Calculator 2025 | Free Home Loan Calculator',
    description: '🏠 Calculate bond affordability & monthly repayments! Current prime rate 11.75%. Find out how much property you can afford.',
    url: 'https://genius-insights.co.za/south-africa-bond-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-bond-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Bond Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Bond Calculator 2025 | Home Loan Affordability Calculator',
    description: '🏠 Calculate home loan affordability! Prime rate 11.75%. Instant bond repayment calculations.',
    images: ['/images/sa-bond-calculator-og.jpg'],
  },
};

export default function SouthAfricaBondCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏠 Home Loan & Affordability Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Bond Calculator <br/>
                <span className="bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate home loan affordability and monthly bond repayments with accurate 2025 interest rates.
                Find out how much property you can afford with our free bond calculator.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">11.75%</div>
                  <div className="text-white/80 text-sm">Prime Rate (Dec 2024)</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">10%</div>
                  <div className="text-white/80 text-sm">Min Deposit</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">20 Years</div>
                  <div className="text-white/80 text-sm">Standard Term</div>
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-teal-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaBondCalculator />
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
                  How to Calculate Bond Repayments
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Home loan repayments are calculated using an amortization formula that considers the bond amount,
                  interest rate, and loan term. South African banks use the prime lending rate (currently 11.75%)
                  as the base rate.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'Bond Amount', desc: 'Property price minus deposit (typically 10-20%)' },
                    { icon: '📊', title: 'Interest Rate', desc: 'Prime rate ±2% based on credit score (11.75% current prime)' },
                    { icon: '⏱️', title: 'Loan Term', desc: '20-30 years standard (shorter term = less interest)' },
                    { icon: '🏦', title: 'Monthly Repayment', desc: 'Fixed payment covering principal + interest' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
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
                  Bond Affordability Rules
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">30% Rule</h4>
                    <p className="text-sm text-gray-600">Banks typically allow up to 30% of gross income for bond repayment</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Debt-to-Income Ratio</h4>
                    <p className="text-sm text-gray-600">Total debt payments (bond + loans) should be below 40% of gross income</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Credit Score</h4>
                    <p className="text-sm text-gray-600">650+ recommended for prime rates, 700+ for best rates</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Deposit</h4>
                    <p className="text-sm text-gray-600">10-20% minimum, larger deposit = better interest rate</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Smart Bond Tips</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Apply at 3+ banks for best rate comparison</li>
                        <li>• Improve credit score before applying (wait 6 months)</li>
                        <li>• Pay extra R1,000/month saves R100K+ in interest</li>
                        <li>• Fixed rate protects against prime rate increases</li>
                        <li>• Budget 5-10% extra for transfer costs & fees</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Interest Rates */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                South African Home Loan Interest Rates 2025
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💚 Excellent Credit (750+)</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">Prime -0.5% to Prime</p>
                  <p className="text-sm text-gray-700">11.25% - 11.75%</p>
                  <p className="text-xs text-gray-500 mt-2">Best rates, large deposit, stable income</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💛 Good Credit (650-749)</h4>
                  <p className="text-3xl font-bold text-yellow-600 mb-2">Prime to Prime +1%</p>
                  <p className="text-sm text-gray-700">11.75% - 12.75%</p>
                  <p className="text-xs text-gray-500 mt-2">Standard rates, 10% deposit</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🧡 Fair Credit (550-649)</h4>
                  <p className="text-3xl font-bold text-orange-600 mb-2">Prime +1% to Prime +2%</p>
                  <p className="text-sm text-gray-700">12.75% - 13.75%</p>
                  <p className="text-xs text-gray-500 mt-2">Higher risk, may need 20% deposit</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Current Prime Rate:</strong> 11.75% (December 2024). The SARB repo rate is 7.75%.
                  Prime rate = repo rate + 4%. Rates subject to change based on SARB Monetary Policy Committee decisions.
                </p>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Additional Home Buying Costs in South Africa
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🏠 Transfer Costs</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ <strong>Transfer duty:</strong> 0-13% (first R1.1M exempt)</li>
                    <li>✓ <strong>Conveyancing fees:</strong> R15,000-R35,000</li>
                    <li>✓ <strong>Deeds office fees:</strong> ±R1,500</li>
                    <li>✓ <strong>Total:</strong> Typically 5-10% of property price</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🏦 Bond Costs</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ <strong>Bond registration:</strong> R30,000-R50,000</li>
                    <li>✓ <strong>Bond origination:</strong> ±R6,000</li>
                    <li>✓ <strong>Property valuation:</strong> R3,000-R5,000</li>
                    <li>✓ <strong>Total:</strong> ±R40,000-R60,000</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-900 mb-3">📝 Ongoing Costs</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ <strong>Home insurance:</strong> 0.3-0.5% of property value/year</li>
                    <li>✓ <strong>Municipal rates:</strong> 0.5-1% of property value/year</li>
                    <li>✓ <strong>Levies (sectional title):</strong> R800-R3,000/month</li>
                    <li>✓ <strong>Maintenance:</strong> 1% of property value/year</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-3">⚠️ Hidden Costs</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ <strong>Electrical compliance:</strong> R2,000-R5,000</li>
                    <li>✓ <strong>Gas compliance:</strong> R1,500-R3,000</li>
                    <li>✓ <strong>Beetle certificate:</strong> R1,000-R2,000</li>
                    <li>✓ <strong>Moving costs:</strong> R5,000-R20,000</li>
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
