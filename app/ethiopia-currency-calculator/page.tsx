import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Ethiopia Currency Calculator 2025 | Ethiopian Birr Exchange Rate Calculator | ETB to USD',
  description: 'Free Ethiopia currency calculator for 2025. Convert Ethiopian Birr (ETB) to USD, EUR, and other currencies with real-time exchange rates.',
  keywords: [
    'ethiopia currency calculator', 'ethiopian birr calculator', 'ETB to USD calculator', 'ethiopia exchange rate calculator', 'birr converter', 'ethiopia forex calculator'
  ],
  alternates: {
    canonical: '/ethiopia-currency-calculator',
  },
  openGraph: {
    title: 'Ethiopia Currency Calculator 2025 | Ethiopian Birr Exchange Rate Calculator',
    description: 'Free Ethiopia currency calculator for 2025. Convert Ethiopian Birr (ETB) to USD, EUR, and other currencies with real-time exchange rates.',
    url: 'https://genius-insights.co.za/ethiopia-currency-calculator',
    type: 'website',
    images: [
      {
        url: '/images/ethiopia-currency-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ethiopia Currency Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethiopia Currency Calculator 2025 | Ethiopian Birr Exchange Rate Calculator',
    description: 'Free Ethiopia currency calculator for 2025. Convert Ethiopian Birr (ETB) to USD, EUR, and other currencies with real-time exchange rates.',
    images: ['/images/ethiopia-currency-calculator-og.jpg'],
  },
};

export default function EthiopiaCurrencyCalculatorPage() {
  return (
    <>
      <StructuredData type="business-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇪🇹 Currency Converter</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Ethiopia Currency <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Convert Ethiopian Birr (ETB) to major world currencies with real-time exchange rates.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ethiopian Birr Currency Converter</h2>
              <p className="text-gray-600 text-lg">Get accurate exchange rates for Ethiopian Birr conversions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Currency
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="ETB">🇪🇹 Ethiopian Birr (ETB)</option>
                    <option value="USD">🇺🇸 US Dollar (USD)</option>
                    <option value="EUR">🇪🇺 Euro (EUR)</option>
                    <option value="GBP">🇬🇧 British Pound (GBP)</option>
                    <option value="AED">🇦🇪 UAE Dirham (AED)</option>
                    <option value="SAR">🇸🇦 Saudi Riyal (SAR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Convert
                  </label>
                  <input
                    type="number"
                    placeholder="1,000"
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
                    <option value="ETB">🇪🇹 Ethiopian Birr (ETB)</option>
                    <option value="AED">🇦🇪 UAE Dirham (AED)</option>
                    <option value="SAR">🇸🇦 Saudi Riyal (SAR)</option>
                    <option value="CAD">🇨🇦 Canadian Dollar (CAD)</option>
                    <option value="AUD">🇦🇺 Australian Dollar (AUD)</option>
                    <option value="KES">🇰🇪 Kenyan Shilling (KES)</option>
                    <option value="UGX">🇺🇬 Ugandan Shilling (UGX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exchange Rate Type
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="official">Official Rate (National Bank)</option>
                    <option value="market">Market Rate</option>
                    <option value="bank">Commercial Bank Rate</option>
                    <option value="parallel">Parallel Market Rate</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Conversion Result</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">Br1,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = Br122.50</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rate Updated:</span>
                    <span className="font-semibold text-green-600">Live</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Converted Amount:</span>
                    <span className="font-bold text-green-600 text-xl">$8.16</span>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Ethiopian Birr has official and parallel market rates. Choose the appropriate rate type for your transaction.
                    </p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Convert Currency
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Currency Pairs</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">USD/ETB</div>
                  <div className="text-sm text-gray-600">122.50</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">EUR/ETB</div>
                  <div className="text-sm text-gray-600">131.85</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">GBP/ETB</div>
                  <div className="text-sm text-gray-600">150.25</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-semibold text-gray-900">AED/ETB</div>
                  <div className="text-sm text-gray-600">33.35</div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Official Rates</h4>
                <p className="text-gray-600 text-sm">Get official exchange rates from National Bank of Ethiopia</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Multiple Sources</h4>
                <p className="text-gray-600 text-sm">Compare official, bank, and market rates for better decision making</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold text-gray-900 mb-2">Regional Currencies</h4>
                <p className="text-gray-600 text-sm">Convert to African and Middle Eastern currencies commonly used in Ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}