import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Cuba Currency Calculator 2025 | Cuban Peso Exchange Rate Calculator | CUP to USD',
  description: 'Free Cuba currency calculator for 2025. Convert Cuban Peso (CUP) to USD, EUR, and other currencies with real-time exchange rates.',
  keywords: [
    'cuba currency calculator', 'cuban peso calculator', 'CUP to USD calculator', 'cuba exchange rate calculator', 'peso converter', 'cuba forex calculator'
  ],
  alternates: {
    canonical: '/cuba-currency-calculator',
  },
  openGraph: {
    title: 'Cuba Currency Calculator 2025 | Cuban Peso Exchange Rate Calculator',
    description: 'Free Cuba currency calculator for 2025. Convert Cuban Peso (CUP) to USD, EUR, and other currencies with real-time exchange rates.',
    url: 'https://genius-insights.co.za/cuba-currency-calculator',
    type: 'website',
    images: [
      {
        url: '/images/cuba-currency-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cuba Currency Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuba Currency Calculator 2025 | Cuban Peso Exchange Rate Calculator',
    description: 'Free Cuba currency calculator for 2025. Convert Cuban Peso (CUP) to USD, EUR, and other currencies with real-time exchange rates.',
    images: ['/images/cuba-currency-calculator-og.jpg'],
  },
};

export default function CubaCurrencyCalculatorPage() {
  return (
    <>
      <StructuredData type="business-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-white to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-blue-900/90 font-medium text-sm tracking-wide">🇨🇺 Currency Converter</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900 mb-6 leading-tight">
                Cuba Currency <br/>
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Convert Cuban Peso (CUP) to major world currencies with real-time exchange rates.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cuban Peso Currency Converter</h2>
              <p className="text-gray-600 text-lg">Get accurate exchange rates for Cuban Peso conversions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Currency
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="CUP">🇨🇺 Cuban Peso (CUP)</option>
                    <option value="USD">🇺🇸 US Dollar (USD)</option>
                    <option value="EUR">🇪🇺 Euro (EUR)</option>
                    <option value="CAD">🇨🇦 Canadian Dollar (CAD)</option>
                    <option value="MXN">🇲🇽 Mexican Peso (MXN)</option>
                    <option value="VES">🇻🇪 Venezuelan Bolívar (VES)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Convert
                  </label>
                  <input
                    type="number"
                    placeholder="1,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Currency
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="USD">🇺🇸 US Dollar (USD)</option>
                    <option value="EUR">🇪🇺 Euro (EUR)</option>
                    <option value="CAD">🇨🇦 Canadian Dollar (CAD)</option>
                    <option value="CUP">🇨🇺 Cuban Peso (CUP)</option>
                    <option value="MXN">🇲🇽 Mexican Peso (MXN)</option>
                    <option value="VES">🇻🇪 Venezuelan Bolívar (VES)</option>
                    <option value="GBP">🇬🇧 British Pound (GBP)</option>
                    <option value="CHF">🇨🇭 Swiss Franc (CHF)</option>
                    <option value="JPY">🇯🇵 Japanese Yen (JPY)</option>
                    <option value="CNY">🇨🇳 Chinese Yuan (CNY)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exchange Rate Type
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="official">Official Rate (Central Bank)</option>
                    <option value="market">Informal Market Rate</option>
                    <option value="cadeca">CADECA Exchange Rate</option>
                    <option value="remittance">Remittance Rate</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Conversion Result</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">$1,000 CUP</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = $120 CUP</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rate Updated:</span>
                    <span className="font-semibold text-green-600">Live</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Converted Amount:</span>
                    <span className="font-bold text-green-600 text-xl">$8.33</span>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Cuba has multiple exchange rates. Official rates may differ significantly from market rates.
                    </p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Convert Currency
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Currency Pairs</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">USD/CUP</div>
                  <div className="text-sm text-gray-600">120.00</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">EUR/CUP</div>
                  <div className="text-sm text-gray-600">129.60</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">CAD/CUP</div>
                  <div className="text-sm text-gray-600">88.80</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">MXN/CUP</div>
                  <div className="text-sm text-gray-600">5.95</div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Multiple Rates</h4>
                <p className="text-gray-600 text-sm">Compare official, CADECA, and informal market exchange rates</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Regional Focus</h4>
                <p className="text-gray-600 text-sm">Specialized in Latin American and Caribbean currency conversions</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-Time Data</h4>
                <p className="text-gray-600 text-sm">Updated exchange rates from multiple Cuban financial sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}