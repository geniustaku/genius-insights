import type { Metadata } from 'next';
import SouthAfricaRentalYieldCalculator from '@/components/SouthAfricaRentalYieldCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';
import RelatedCalculators from '@/components/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Rental Yield Calculator SA 2026 | Buy to Let',
  description: 'Is buy to let worth it in South Africa? Calculate rental yield, property ROI & cash flow. Gross and net yield calculator for SA property investors. Free 2026 tool.',
  keywords: [
    'rental yield calculator south africa',
    'buy to let calculator south africa',
    'is buy to let worth it south africa',
    'property investment calculator SA',
    'rental return on investment calculator',
    'gross rental yield calculator',
    'net rental yield calculator south africa',
    'property cash flow calculator',
    'rental income calculator SA',
    'how to calculate rental yield south africa',
    'buy to let property south africa',
    'property investment ROI calculator',
    'rental property calculator SA 2026',
    'investment property calculator south africa',
    'what is a good rental yield in south africa',
    'landlord calculator south africa',
    'rental property profit calculator'
  ],
  alternates: {
    canonical: '/south-africa-rental-yield-calculator',
  },
  openGraph: {
    title: 'Rental Yield Calculator SA 2026 | Buy to Let',
    description: 'Is buy to let worth it? Calculate rental yield, property ROI & cash flow for SA property investments. Gross and net yield with 2026 rates.',
    url: 'https://genius-insights.co.za/south-africa-rental-yield-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Rental+Yield+Calculator+SA+2026&subtitle=Buy+to+Let+Property+Investment',
        width: 1200,
        height: 630,
        alt: 'Rental Yield Calculator South Africa 2026 - Buy to Let Property Investment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Yield Calculator SA 2026 | Buy to Let',
    description: 'Is buy to let worth it in SA? Calculate rental yield, property ROI & cash flow. Free calculator for property investors.',
    images: ['/api/og?title=Rental+Yield+Calculator+SA+2026&subtitle=Buy+to+Let+Property+Investment'],
  },
};

export default function SouthAfricaRentalYieldCalculatorPage() {
  return (
    <>
      <StructuredData
        type="rental-calculator"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.genius-insights.co.za' },
          { name: 'Calculators', url: 'https://www.genius-insights.co.za/calculators' },
          { name: 'Rental Yield Calculator', url: 'https://www.genius-insights.co.za/south-africa-rental-yield-calculator' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏠 Property Investment Analysis</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Rental Yield Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Is buy to let worth it in South Africa? Calculate gross and net rental yield, property ROI
                and monthly cash flow. Make smarter property investment decisions with accurate 2026 data.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">80K+</div>
                  <div className="text-white/80 text-sm">Property Investors</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">8-12%</div>
                  <div className="text-white/80 text-sm">Target Yield SA</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">ROI</div>
                  <div className="text-white/80 text-sm">Analysis</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2026</div>
                  <div className="text-white/80 text-sm">Market Rates</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Ad Before Calculator */}
          <div className="mb-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
            <AdSenseAd
              adSlot="5341658648"
              adFormat="auto"
              style={{ display: 'block', minHeight: '90px' }}
            />
          </div>

          <SouthAfricaRentalYieldCalculator />

          {/* Ad After Calculator */}
          <div className="mt-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
            <AdSenseAd
              adSlot="2386701555"
              adFormat="auto"
              style={{ display: 'block', minHeight: '90px' }}
            />
          </div>
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            {/* Multiplex Ad in Information Section */}
            <div className="mb-8">
              <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
              <AdSenseAd
                adSlot="9985989974"
                adFormat="autorelaxed"
                style={{ display: 'block', minHeight: '280px' }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  How to Calculate Rental Yield in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  What is a good rental yield in South Africa? Understanding gross vs net rental yield
                  helps you compare buy-to-let properties and make profitable investment decisions.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '📊', title: 'Gross Rental Yield', desc: 'Annual rental income ÷ property value' },
                    { icon: '💰', title: 'Net Rental Yield', desc: 'After deducting all expenses and costs' },
                    { icon: '📈', title: 'Cash Flow Analysis', desc: 'Monthly income vs expenses calculation' },
                    { icon: '🎯', title: 'ROI Calculation', desc: 'Return on investment including capital gains' }
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
                  Buy to Let Tips for SA Property Investors
                </h3>
                
                <div className="space-y-4">
                  {[
                    { tip: 'Target 8-12% Yield', benefit: 'Good returns for SA market', color: 'bg-green-500' },
                    { tip: 'Location Research', benefit: 'Prime areas with growth potential', color: 'bg-blue-500' },
                    { tip: 'Factor All Costs', benefit: 'Rates, taxes, maintenance, insurance', color: 'bg-purple-500' },
                    { tip: 'Vacancy Allowance', benefit: 'Budget 1-2 months vacancy per year', color: 'bg-orange-500' },
                    { tip: 'Property Management', benefit: '8-12% of rental for full management', color: 'bg-red-500' },
                    { tip: 'Capital Growth', benefit: 'Consider property appreciation potential', color: 'bg-indigo-500' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.tip}</span>
                        <span className="text-sm font-medium text-gray-600">Essential</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{item.benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Property Investment Reality</h4>
                      <ul className="text-green-800 text-sm leading-relaxed space-y-1">
                        <li>• Average SA rental yields range 6-12% depending on area</li>
                        <li>• Factor 20-30% of rental income for expenses</li>
                        <li>• Consider both rental yield and capital appreciation</li>
                        <li>• Review yields annually and adjust rental rates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <RelatedCalculators currentSlug="south-africa-rental-yield-calculator" />
        </div>
      </div>
    </>
  );
}