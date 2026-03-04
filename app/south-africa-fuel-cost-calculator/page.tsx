import type { Metadata } from 'next';
import SouthAfricaFuelCostCalculator from '@/components/SouthAfricaFuelCostCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator SA | Petrol & Diesel Price',
  description: 'Calculate petrol and diesel costs per trip in South Africa. Current fuel prices, fuel levy breakdown, consumption calculator. Free tool updated with 2026 SA fuel prices.',
  keywords: [
    'fuel cost calculator South Africa', 'petrol price calculator SA', 'diesel price calculator SA', 'fuel levy South Africa', 'petrol cost per km calculator', 'trip cost calculator South Africa', 'fuel consumption calculator SA', 'current petrol price SA 2026', 'diesel cost per litre SA', 'car running cost calculator', 'fuel price South Africa today', 'petrol vs diesel cost SA', 'road trip fuel calculator SA', 'vehicle fuel expense calculator', 'SA fuel price March 2026'
  ],
  alternates: {
    canonical: '/south-africa-fuel-cost-calculator',
  },
  openGraph: {
    title: 'Fuel Cost Calculator SA | Petrol & Diesel Price',
    description: 'Calculate petrol and diesel trip costs with current South African fuel prices. Includes fuel levy breakdown and consumption estimates. Free 2026 tool.',
    url: 'https://genius-insights.co.za/south-africa-fuel-cost-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-fuel-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Petrol and Diesel Fuel Cost Calculator South Africa 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Cost Calculator SA | Petrol & Diesel Price',
    description: 'Calculate petrol and diesel trip costs with current SA fuel prices. Free fuel levy and consumption calculator for 2026.',
    images: ['/images/sa-fuel-calculator-og.jpg'],
  },
};

export default function SouthAfricaFuelCostCalculatorPage() {
  return (
    <>
      <StructuredData type="fuel-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">⛽ Current Fuel Prices</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Petrol &amp; Diesel Cost Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate fuel costs per trip with current South African petrol and diesel prices.
                Includes fuel levy breakdown, consumption estimates and cost-per-km calculations.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">200K+</div>
                  <div className="text-white/80 text-sm">Daily Users</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R24+</div>
                  <div className="text-white/80 text-sm">Petrol Price/L</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Live</div>
                  <div className="text-white/80 text-sm">Fuel Prices</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Always</div>
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
          <SouthAfricaFuelCostCalculator />
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
                  What Affects Petrol &amp; Diesel Prices in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Understanding fuel levy, exchange rates and oil prices helps you budget
                  smarter for petrol and diesel costs in South Africa.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🌍', title: 'International Oil Prices', desc: 'Global crude oil market fluctuations' },
                    { icon: '💱', title: 'Rand/Dollar Exchange', desc: 'Currency strength affects import costs' },
                    { icon: '🏛️', title: 'Government Levies', desc: 'Fuel levy and Road Accident Fund' },
                    { icon: '⛽', title: 'Retail Margins', desc: 'Service station markup and costs' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl">
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
                  Fuel Saving Tips 2026
                </h3>
                
                <div className="space-y-4">
                  {[
                    { tip: 'Maintain Your Vehicle', benefit: 'Up to 40% better fuel efficiency', color: 'bg-green-500' },
                    { tip: 'Drive Smoothly', benefit: 'Avoid aggressive acceleration/braking', color: 'bg-blue-500' },
                    { tip: 'Plan Your Routes', benefit: 'Combine trips, avoid traffic', color: 'bg-purple-500' },
                    { tip: 'Check Tire Pressure', benefit: '3% improvement in efficiency', color: 'bg-orange-500' },
                    { tip: 'Remove Extra Weight', benefit: '1-2% per 45kg removed', color: 'bg-red-500' },
                    { tip: 'Use Air Con Wisely', benefit: 'Windows vs AC at different speeds', color: 'bg-indigo-500' }
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
                
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-orange-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Fuel Price Reality Check</h4>
                      <ul className="text-orange-800 text-sm leading-relaxed space-y-1">
                        <li>• SA fuel prices updated monthly by Department of Energy</li>
                        <li>• Fuel levy contributes ~R4.50 per liter to road infrastructure</li>
                        <li>• Diesel typically 5-10% cheaper than petrol</li>
                        <li>• Coastal areas often have lower prices than inland</li>
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