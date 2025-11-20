import type { Metadata } from 'next';
import SouthAfricaEstateDutyCalculator from '@/components/SouthAfricaEstateDutyCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Estate Duty Calculator 2025 | Free Death Tax & Inheritance Tax Calculator',
  description: 'Free SA estate duty calculator 2025. Calculate death tax (estate duty) on inheritance with R3.5M abatement, 20-25% rates, spouse deductions. Estate planning tool for wills, trusts & inheritance. SARS-compliant calculator.',
  keywords: [
    'estate duty calculator South Africa 2025',
    'death tax calculator SA',
    'inheritance tax calculator',
    'estate duty rates South Africa',
    'R3.5 million abatement',
    'estate planning calculator SA',
    'will and estate calculator',
    'inheritance tax planning',
    'estate duty exemption SA',
    'death estate calculator',
    'spouse deduction estate duty',
    'SARS estate duty calculator',
    'estate duty threshold',
    'estate tax South Africa',
    'inheritance duty calculator'
  ],
  alternates: {
    canonical: '/south-africa-estate-duty-calculator',
  },
  openGraph: {
    title: 'South Africa Estate Duty Calculator 2025 | Free Inheritance Tax Calculator',
    description: '⚰️ Calculate estate duty (death tax)! R3.5M abatement, 20-25% rates, spouse deductions. Plan your estate & reduce inheritance tax.',
    url: 'https://genius-insights.co.za/south-africa-estate-duty-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-estate-duty-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Estate Duty Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Estate Duty Calculator 2025 | Death Tax & Inheritance Planning',
    description: '⚰️ Calculate estate duty! R3.5M exemption, spouse deductions, 20-25% rates. Estate planning tool.',
    images: ['/images/sa-estate-duty-calculator-og.jpg'],
  },
};

export default function SouthAfricaEstateDutyCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">⚰️ Estate Planning & Inheritance Tax</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Estate Duty Calculator <br/>
                <span className="bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate estate duty (death tax) on your estate with accurate 2025 rates. Plan your inheritance,
                minimize tax liability with spouse deductions, trusts, and charitable bequests.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R3.5M</div>
                  <div className="text-white/80 text-sm">Abatement (Exemption)</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">20%</div>
                  <div className="text-white/80 text-sm">First R30M Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">25%</div>
                  <div className="text-white/80 text-sm">Above R30M</div>
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaEstateDutyCalculator />
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
                  What is Estate Duty in South Africa?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Estate Duty (also called death tax or inheritance tax) is a tax levied on the estate of a deceased
                  person. It's calculated on the net value of the estate after deductions and exemptions.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'R3.5 Million Abatement', desc: 'First R3.5M of net estate is tax-free (exemption threshold)' },
                    { icon: '📊', title: '20% or 25% Rate', desc: '20% on dutiable estate up to R30M, then 25% on excess' },
                    { icon: '💑', title: 'Spouse Deduction', desc: 'Assets passing to spouse are fully deductible (no estate duty)' },
                    { icon: '🏦', title: 'Retirement Funds Exempt', desc: 'Pension, provident, RA funds pass directly to beneficiaries tax-free' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
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
                  Estate Duty Calculation Formula
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 1: Calculate Gross Estate</h4>
                    <p className="text-sm text-gray-600">Sum all assets: property, investments, cash, vehicles, life insurance payouts</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 2: Deduct Liabilities</h4>
                    <p className="text-sm text-gray-600">Mortgages, loans, funeral costs, executor fees, debts</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 3: Deduct Exemptions</h4>
                    <p className="text-sm text-gray-600">Spouse deduction, charitable bequests, retirement funds</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 4: Apply R3.5M Abatement</h4>
                    <p className="text-sm text-gray-600">Subtract R3.5M exemption from net estate = dutiable estate</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 5: Calculate Estate Duty</h4>
                    <p className="text-sm text-gray-600">20% on first R30M of dutiable estate, 25% on excess</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-indigo-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900 mb-2">Estate Planning Tips</h4>
                      <ul className="text-indigo-800 text-sm leading-relaxed space-y-1">
                        <li>• Use R3.5M abatement - each spouse gets own exemption</li>
                        <li>• Leave assets to spouse first (no duty on first death)</li>
                        <li>• Put life insurance in trust (excludes from estate)</li>
                        <li>• Consider charitable donations (fully deductible)</li>
                        <li>• Maximize retirement funds (exempt from duty)</li>
                        <li>• Review and update will every 3-5 years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estate Planning Strategies */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Strategies to Reduce Estate Duty
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💍 Spouse Planning</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Assets passing to surviving spouse are 100% deductible. Use unlimited spouse deduction.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Leave everything to spouse first</li>
                    <li>✓ No duty on first death</li>
                    <li>✓ Spouse's estate then uses their R3.5M abatement</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🏦 Life Insurance Trusts</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Life insurance payouts to estate attract duty. Set up insurance trust to avoid this.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Policy owned by trust, not you</li>
                    <li>✓ Payout goes to trust beneficiaries</li>
                    <li>✓ Excluded from dutiable estate</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🎁 Donations & Trusts</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Strategic donations during lifetime reduce estate size and future duty.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Annual R100K donation tax-free allowance</li>
                    <li>✓ Transfer assets to living trust</li>
                    <li>✓ Charitable donations fully deductible</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What's Included/Excluded */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                What's Included vs. Excluded from Estate Duty
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-3">✕ Included in Estate (Dutiable)</h4>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>✓ Property (primary residence, rental, investment)</li>
                    <li>✓ Investments (shares, bonds, unit trusts, crypto)</li>
                    <li>✓ Cash, savings, bank accounts</li>
                    <li>✓ Vehicles, boats, valuables</li>
                    <li>✓ Life insurance (if estate is beneficiary)</li>
                    <li>✓ Business interests, intellectual property</li>
                    <li>✓ Foreign assets owned by SA residents</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-3">✓ Excluded from Estate (Tax-Free)</h4>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>✓ Retirement funds (pension, provident, RA)</li>
                    <li>✓ Life insurance in trust (beneficiaries not estate)</li>
                    <li>✓ Assets passing to spouse</li>
                    <li>✓ Charitable bequests to PBOs</li>
                    <li>✓ First R3.5M of net estate (abatement)</li>
                    <li>✓ Funeral policy payouts</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Estate duty is calculated on the date-of-death value of assets, not the original
                  purchase price. Property and investments that have grown in value over time will be valued at their current
                  market value when calculating estate duty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
