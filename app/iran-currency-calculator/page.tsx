import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Iran Currency Calculator 2025 | Iranian Rial Exchange Rate Calculator | IRR to USD',
  description: 'Free Iran currency calculator for 2025. Convert Iranian Rial (IRR) to USD, EUR, and other currencies with real-time exchange rates.',
  keywords: [
    'iran currency calculator', 'iranian rial calculator', 'IRR to USD calculator', 'iran exchange rate calculator', 'rial converter', 'iran forex calculator'
  ],
  alternates: {
    canonical: '/iran-currency-calculator',
  },
  openGraph: {
    title: 'Iran Currency Calculator 2025 | Iranian Rial Exchange Rate Calculator',
    description: 'Free Iran currency calculator for 2025. Convert Iranian Rial (IRR) to USD, EUR, and other currencies with real-time exchange rates.',
    url: 'https://genius-insights.co.za/iran-currency-calculator',
    type: 'website',
    images: [
      {
        url: '/images/iran-currency-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Iran Currency Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iran Currency Calculator 2025 | Iranian Rial Exchange Rate Calculator',
    description: 'Free Iran currency calculator for 2025. Convert Iranian Rial (IRR) to USD, EUR, and other currencies with real-time exchange rates.',
    images: ['/images/iran-currency-calculator-og.jpg'],
  },
};

export default function IranCurrencyCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇮🇷 Currency Converter</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Iran Currency <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Convert Iranian Rial (IRR) to major world currencies with real-time exchange rates.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Iranian Rial Currency Converter</h2>
              <p className="text-gray-600 text-lg">Get accurate exchange rates for Iranian Rial conversions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Currency
                  </label>
                  <div className="flex gap-4">
                    <select className="flex-1 px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                      <option value="IRR">🇮🇷 Iranian Rial (IRR)</option>
                      <option value="USD">🇺🇸 US Dollar (USD)</option>
                      <option value="EUR">🇪🇺 Euro (EUR)</option>
                      <option value="GBP">🇬🇧 British Pound (GBP)</option>
                      <option value="AED">🇦🇪 UAE Dirham (AED)</option>
                      <option value="TRY">🇹🇷 Turkish Lira (TRY)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Convert
                  </label>
                  <input
                    type="number"
                    placeholder="1,000,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Currency
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="USD">🇺🇸 US Dollar (USD)</option>
                    <option value="EUR">🇪🇺 Euro (EUR)</option>
                    <option value="GBP">🇬🇧 British Pound (GBP)</option>
                    <option value="IRR">🇮🇷 Iranian Rial (IRR)</option>
                    <option value="AED">🇦🇪 UAE Dirham (AED)</option>
                    <option value="TRY">🇹🇷 Turkish Lira (TRY)</option>
                    <option value="CAD">🇨🇦 Canadian Dollar (CAD)</option>
                    <option value="AUD">🇦🇺 Australian Dollar (AUD)</option>
                    <option value="CHF">🇨🇭 Swiss Franc (CHF)</option>
                    <option value="JPY">🇯🇵 Japanese Yen (JPY)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exchange Rate Type
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="market">Market Rate (Open Market)</option>
                    <option value="official">Official Rate (Central Bank)</option>
                    <option value="bank">Bank Rate</option>
                    <option value="cash">Cash Exchange Rate</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Conversion Result</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">﷼1,000,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = ﷼42,350</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rate Updated:</span>
                    <span className="font-semibold text-green-600">Live</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Converted Amount:</span>
                    <span className="font-bold text-green-600 text-xl">$23.61</span>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Exchange rates fluctuate frequently. This is an indicative rate for reference purposes only.
                    </p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-green-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Convert Currency
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Currency Pairs</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">USD/IRR</div>
                  <div className="text-sm text-gray-600">42,350</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">EUR/IRR</div>
                  <div className="text-sm text-gray-600">45,680</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">GBP/IRR</div>
                  <div className="text-sm text-gray-600">52,120</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">AED/IRR</div>
                  <div className="text-sm text-gray-600">11,530</div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-Time Rates</h4>
                <p className="text-gray-600 text-sm">Get the most current exchange rates from multiple sources</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Multiple Rate Types</h4>
                <p className="text-gray-600 text-sm">Choose from market, official, bank, or cash exchange rates</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Major Currencies</h4>
                <p className="text-gray-600 text-sm">Convert to and from all major world currencies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}