import type { Metadata } from 'next';
import SouthAfricaTFSACalculator from '@/components/SouthAfricaTFSACalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Tax Free Savings Account Calculator SA 2026',
  description: 'TFSA calculator South Africa. Calculate tax-free savings growth with R36,000 annual limit & R500,000 lifetime cap. Compare TFSA vs taxable investments. SARS rules.',
  keywords: [
    'tax free savings account calculator',
    'TFSA calculator South Africa',
    'tax free savings account South Africa',
    'R36000 annual limit TFSA',
    'R500000 lifetime limit TFSA',
    'TFSA contribution calculator',
    'TFSA vs taxable investment',
    'best TFSA South Africa',
    'tax free investment calculator',
    'TFSA compound interest calculator',
    'SARS TFSA rules 2026',
    'TFSA over-contribution penalty',
    'EasyEquities TFSA',
    'Satrix TFSA',
    'Allan Gray TFSA'
  ],
  alternates: {
    canonical: '/south-africa-tfsa-calculator',
  },
  openGraph: {
    title: 'Tax Free Savings Account Calculator SA 2026',
    description: 'Calculate TFSA growth with R36,000 annual limit & R500,000 lifetime cap. Compare tax-free vs taxable investment returns.',
    url: 'https://genius-insights.co.za/south-africa-tfsa-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-tfsa-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Tax Free Savings Account Calculator South Africa 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Free Savings Account Calculator SA 2026',
    description: 'Calculate TFSA growth with R36,000 annual & R500,000 lifetime limits. See tax-free vs taxable returns.',
    images: ['/images/sa-tfsa-calculator-og.jpg'],
  },
};

export default function SouthAfricaTFSACalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">📈 Tax-Free Growth & Compound Interest</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Tax Free Savings Account <br/>
                <span className="bg-gradient-to-r from-green-200 to-teal-200 bg-clip-text text-transparent">Calculator South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your TFSA growth with the R36,000 annual limit and R500,000 lifetime cap.
                See how much tax you save compared to taxable investments with this free calculator.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R36K</div>
                  <div className="text-white/80 text-sm">Annual Limit</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R500K</div>
                  <div className="text-white/80 text-sm">Lifetime Limit</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">0%</div>
                  <div className="text-white/80 text-sm">Tax on Growth</div>
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-green-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaTFSACalculator />
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
                  What is a Tax Free Savings Account (TFSA)?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  A Tax-Free Savings Account (TFSA) is a government-approved investment account where all growth,
                  interest, and dividends are 100% tax-free. It's the best way to grow your wealth without paying
                  capital gains tax, dividends tax, or income tax.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'R36,000 Annual Limit', desc: 'Contribute up to R36K per tax year (Mar-Feb). No rollover of unused amounts.' },
                    { icon: '🏦', title: 'R500,000 Lifetime Limit', desc: 'Total contributions capped at R500K over your lifetime. Track carefully!' },
                    { icon: '📈', title: '100% Tax-Free Growth', desc: 'No CGT, dividends tax, or income tax on any returns. All growth is yours!' },
                    { icon: '🔓', title: 'Flexible Access', desc: 'Withdraw anytime (unlike retirement annuity). But contribution room is lost forever!' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl">
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
                  TFSA vs. Taxable Investment
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-2">✓ TFSA (Tax-Free)</h4>
                    <ul className="text-sm text-emerald-800 space-y-1">
                      <li>• 0% tax on capital gains</li>
                      <li>• 0% tax on dividends</li>
                      <li>• 0% tax on interest</li>
                      <li>• Keep 100% of all returns</li>
                      <li>• Example: R100K growth = R100K to you</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">✕ Regular Investment (Taxable)</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• 40% CGT inclusion (12.4% effective at 31% bracket)</li>
                      <li>• 20% dividends tax (if local shares)</li>
                      <li>• Interest taxed at marginal rate (18-45%)</li>
                      <li>• Lose ~12-18% of returns to tax</li>
                      <li>• Example: R100K growth = R87.6K after CGT</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-emerald-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">TFSA Maximization Strategy</h4>
                      <ul className="text-emerald-800 text-sm leading-relaxed space-y-1">
                        <li>• Contribute R3,000/month = R36K/year (max out annual limit)</li>
                        <li>• Invest in growth assets (JSE Top 40, S&P 500 ETFs)</li>
                        <li>• Hold long-term - compound growth is tax-free!</li>
                        <li>• Never withdraw unless emergency (room is lost)</li>
                        <li>• Takes ~14 years to max out R500K lifetime limit</li>
                        <li>• Start young - compounding is your best friend</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TFSA Rules & Penalties */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                TFSA Rules & Penalties (2026)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <h4 className="font-semibold text-gray-900 mb-3">📅 Contribution Limits</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Annual:</strong> R36,000 per tax year (1 Mar - 28 Feb)<br />
                    <strong>Lifetime:</strong> R500,000 total contributions
                  </p>
                  <p className="text-xs text-emerald-700">
                    Unused annual allowances do NOT roll over. Use it or lose it!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                  <h4 className="font-semibold text-gray-900 mb-3">⚠️ Over-Contribution Penalty</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Penalty:</strong> 40% tax on excess contributions<br />
                    <strong>Example:</strong> Contribute R40K = R4K excess × 40% = R1,600 penalty
                  </p>
                  <p className="text-xs text-red-700">
                    SARS will bill you! Track contributions carefully.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🔄 Withdrawals</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Access:</strong> Withdraw anytime, no penalties<br />
                    <strong>But:</strong> Contribution room is lost forever
                  </p>
                  <p className="text-xs text-blue-700">
                    Withdraw R50K → Only R450K lifetime room left (not R500K!)
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Unlike retirement annuities, you CAN withdraw from a TFSA anytime.
                  However, once you withdraw, that contribution room is lost forever - it does NOT reset. Think of
                  TFSA as a long-term wealth builder, not a savings account for short-term goals.
                </p>
              </div>
            </div>

            {/* Best TFSA Providers */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Where to Open a TFSA in South Africa
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">🏦 Banks (Easy Access)</h4>
                  <ul className="text-sm text-gray-700 space-y-2 mb-3">
                    <li>• <strong>Discovery Bank:</strong> Money market, ETFs, unit trusts</li>
                    <li>• <strong>Capitec:</strong> Fixed deposits (low returns ~6-7%)</li>
                    <li>• <strong>Nedbank:</strong> Unit trusts, ETFs</li>
                    <li>• <strong>FNB:</strong> Money market, ETFs</li>
                  </ul>
                  <p className="text-xs text-gray-600">
                    Pros: Easy to open, familiar interface. Cons: Higher fees, limited investment options.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="font-semibold text-gray-900 mb-3">📈 Investment Platforms (Better Returns)</h4>
                  <ul className="text-sm text-gray-700 space-y-2 mb-3">
                    <li>• <strong>EasyEquities:</strong> JSE shares, ETFs, crypto (low fees)</li>
                    <li>• <strong>Satrix:</strong> Low-cost ETF specialist</li>
                    <li>• <strong>Allan Gray:</strong> Unit trusts, balanced funds</li>
                    <li>• <strong>10X Investments:</strong> Index funds (very low fees)</li>
                  </ul>
                  <p className="text-xs text-emerald-700">
                    Pros: Lower fees, better investment options. Cons: Slightly more setup required.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">💡 Recommended TFSA Strategy by Age</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-green-800 mb-1">20s-30s (Growth)</p>
                    <p className="text-xs text-green-700">
                      100% equity ETFs (Satrix 40, S&P 500). Long time horizon = maximize tax-free growth.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800 mb-1">40s-50s (Balanced)</p>
                    <p className="text-xs text-green-700">
                      70% equity, 30% bonds/property. Balance growth with stability as retirement approaches.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800 mb-1">60+ (Conservative)</p>
                    <p className="text-xs text-green-700">
                      50% equity, 50% money market/bonds. Preserve capital while still benefiting from tax-free income.
                    </p>
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
