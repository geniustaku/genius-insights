import type { Metadata } from 'next';
import SouthAfricaCapitalGainsTaxCalculator from '@/components/SouthAfricaCapitalGainsTaxCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator SA 2026 | SARS CGT',
  description: 'Free capital gains tax (CGT) calculator for South Africa 2026. Calculate CGT on property, shares & crypto. R40,000 annual exclusion, 40% inclusion rate. How much CGT do I pay on my house sale?',
  keywords: [
    'capital gains tax calculator south africa',
    'CGT calculator south africa 2026',
    'capital gains tax on property south africa',
    'how to calculate capital gains tax south africa',
    'SARS CGT calculator',
    'capital gains tax on selling house south africa',
    'shares capital gains tax south africa',
    'CGT inclusion rate south africa',
    'R40000 annual exclusion capital gains',
    'capital gains tax rates south africa 2026',
    'property CGT calculator south africa',
    'CGT on shares JSE south africa',
    'primary residence exclusion CGT south africa',
    'crypto capital gains tax south africa',
    'how much CGT do I pay SARS'
  ],
  alternates: {
    canonical: '/south-africa-capital-gains-tax-calculator',
  },
  openGraph: {
    title: 'Capital Gains Tax Calculator SA 2026 | SARS CGT',
    description: 'Calculate capital gains tax on property, shares & crypto in South Africa. R40K exclusion, 40% inclusion rate. Free SARS CGT calculator.',
    url: 'https://genius-insights.co.za/south-africa-capital-gains-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-cgt-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Capital Gains Tax Calculator 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Gains Tax Calculator SA 2026 | SARS CGT',
    description: 'How much CGT do I pay? Calculate capital gains tax on property & shares in South Africa. R40K exclusion, 40% inclusion.',
    images: ['/images/sa-cgt-calculator-og.jpg'],
  },
};

export default function SouthAfricaCapitalGainsTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💰 2026 CGT Rates & R40K Exclusion</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Capital Gains Tax (CGT) Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                How much CGT do I pay on selling my property, shares or crypto? SARS-compliant calculator
                with R40,000 annual exclusion, 40% inclusion rate and current tax brackets.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R40K</div>
                  <div className="text-white/80 text-sm">Annual Exclusion</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">40%</div>
                  <div className="text-white/80 text-sm">Individual Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">80%</div>
                  <div className="text-white/80 text-sm">Company/Trust</div>
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
          <SouthAfricaCapitalGainsTaxCalculator />
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
                  How Capital Gains Tax Works in South Africa (SARS)
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Capital Gains Tax (CGT) applies when you sell assets like property, shares, or cryptocurrency
                  in South Africa. Understanding CGT helps you plan your investments and minimize tax liability.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'Annual Exclusion', desc: 'First R40,000 capital gain per year is tax-free (individuals)' },
                    { icon: '📊', title: 'Inclusion Rates', desc: '40% individuals, 80% companies/trusts included in taxable income' },
                    { icon: '🏠', title: 'Primary Residence', desc: 'R2M exclusion on sale of primary residence' },
                    { icon: '🎯', title: 'Deductible Costs', desc: 'Purchase costs, improvements, and selling expenses reduce CGT' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-xl">
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
                  How to Calculate CGT Step-by-Step (SARS)
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 1: Calculate Capital Gain</h4>
                    <p className="text-sm text-gray-600">Sale Price - (Purchase Price + Costs + Improvements)</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 2: Apply Annual Exclusion</h4>
                    <p className="text-sm text-gray-600">Capital Gain - R40,000 (individuals only)</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 3: Apply Inclusion Rate</h4>
                    <p className="text-sm text-gray-600">Result × 40% (individuals) or 80% (companies/trusts)</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Step 4: Calculate Tax</h4>
                    <p className="text-sm text-gray-600">Taxable Gain × Your Marginal Tax Rate</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">CGT Planning Tips</h4>
                      <ul className="text-green-800 text-sm leading-relaxed space-y-1">
                        <li>• Use R40K annual exclusion each year</li>
                        <li>• Keep records of all improvements & costs</li>
                        <li>• Consider timing of asset sales</li>
                        <li>• Primary residence exclusion: R2M lifetime limit</li>
                        <li>• Offset capital gains with capital losses</li>
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
