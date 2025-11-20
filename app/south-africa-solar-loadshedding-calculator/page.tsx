import type { Metadata } from 'next';
import SouthAfricaSolarCalculator from '@/components/SouthAfricaSolarCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Solar & Loadshedding Calculator 2025 | Solar Panel Cost & Savings Calculator',
  description: 'Free SA solar calculator 2025. Calculate solar panel costs, battery sizing, loadshedding backup, ROI & savings. Plan your solar system for Eskom independence. Used by 100,000+ South Africans.',
  keywords: [
    'solar calculator South Africa 2025',
    'loadshedding calculator SA',
    'solar panel cost calculator',
    'solar system cost SA',
    'solar battery calculator',
    'solar ROI calculator South Africa',
    'how much do solar panels cost SA',
    'solar payback period calculator',
    'Eskom alternative calculator',
    'off-grid solar calculator SA',
    'solar inverter sizing calculator',
    'solar savings calculator SA',
    'loadshedding backup calculator',
    'solar panel installation cost',
    'solar power system calculator'
  ],
  alternates: {
    canonical: '/south-africa-solar-loadshedding-calculator',
  },
  openGraph: {
    title: 'South Africa Solar & Loadshedding Calculator 2025 | Free Solar Cost Calculator',
    description: '☀️ Calculate solar panel costs, savings & loadshedding backup! Free SA solar calculator with ROI, battery sizing & Eskom savings.',
    url: 'https://genius-insights.co.za/south-africa-solar-loadshedding-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-solar-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Solar & Loadshedding Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Solar & Loadshedding Calculator 2025 | Solar Panel Cost & ROI',
    description: '☀️ Calculate solar costs, savings & loadshedding backup! Free calculator for Eskom independence.',
    images: ['/images/sa-solar-calculator-og.jpg'],
  },
};

export default function SouthAfricaSolarLoadsheddingCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">☀️ Beat Loadshedding & Save Money</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Solar & Loadshedding Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate solar panel costs, battery sizing, and savings. Plan your solar system to beat
                loadshedding and achieve Eskom independence with accurate ROI projections.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">5-7 Years</div>
                  <div className="text-white/80 text-sm">Typical Payback</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">25+ Years</div>
                  <div className="text-white/80 text-sm">Panel Lifespan</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">300%+</div>
                  <div className="text-white/80 text-sm">Typical ROI</div>
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
          <SouthAfricaSolarCalculator />
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
                  Why Go Solar in South Africa?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  With frequent loadshedding and rising Eskom tariffs, solar power is now the most
                  cost-effective solution for South African homes and businesses.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '⚡', title: 'Beat Loadshedding', desc: 'Keep lights on during Stage 1-8 power cuts' },
                    { icon: '💰', title: 'Save Money', desc: 'Reduce electricity bills by 70-100%' },
                    { icon: '📈', title: 'High ROI', desc: '300-400% return over 25 years' },
                    { icon: '🏠', title: 'Increase Property Value', desc: 'Solar adds 3-5% to home value' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-xl">
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
                  Solar System Components
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">☀️ Solar Panels</h4>
                    <p className="text-sm text-gray-600">Convert sunlight to electricity. Average: R18,000/kW installed.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🔋 Battery Storage</h4>
                    <p className="text-sm text-gray-600">Store power for night use & loadshedding. Average: R8,500/kWh.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">⚙️ Inverter</h4>
                    <p className="text-sm text-gray-600">Converts DC to AC power. Hybrid inverters: R20,000-R30,000.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🔧 Installation</h4>
                    <p className="text-sm text-gray-600">Professional setup including wiring, mounting & commissioning.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-yellow-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">Solar Planning Tips</h4>
                      <ul className="text-yellow-800 text-sm leading-relaxed space-y-1">
                        <li>• Northern Cape has best solar radiation in SA</li>
                        <li>• 1 kW solar needs ~7 sqm roof space</li>
                        <li>• Average SA home needs 5-8 kW system</li>
                        <li>• Battery optional but recommended for loadshedding</li>
                        <li>• Get 3+ quotes from reputable installers</li>
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
