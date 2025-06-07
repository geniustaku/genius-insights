import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Nepal Remittance Calculator 2025 | Foreign Employment Remittance Calculator',
  description: 'Free Nepal remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Nepal from abroad.',
  keywords: [
    'nepal remittance calculator', 'nepal money transfer calculator', 'nepali rupee exchange rate calculator', 'nepal forex calculator', 'foreign employment nepal calculator'
  ],
  alternates: {
    canonical: '/nepal-remittance-calculator',
  },
  openGraph: {
    title: 'Nepal Remittance Calculator 2025 | Foreign Employment Remittance Calculator',
    description: 'Free Nepal remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Nepal from abroad.',
    url: 'https://genius-insights.co.za/nepal-remittance-calculator',
    type: 'website',
    images: [
      {
        url: '/images/nepal-remittance-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Nepal Remittance Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nepal Remittance Calculator 2025 | Foreign Employment Remittance Calculator',
    description: 'Free Nepal remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Nepal from abroad.',
    images: ['/images/nepal-remittance-calculator-og.jpg'],
  },
};

export default function NepalRemittanceCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇳🇵 Foreign Employment</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Nepal Remittance <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate exact costs and exchange rates for sending money to Nepal from Gulf countries and other destinations.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nepal Remittance Calculator</h2>
              <p className="text-gray-600 text-lg">Compare remittance services for sending money to Nepal from abroad</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sending From
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="AE">🇦🇪 UAE</option>
                    <option value="SA">🇸🇦 Saudi Arabia</option>
                    <option value="QA">🇶🇦 Qatar</option>
                    <option value="KW">🇰🇼 Kuwait</option>
                    <option value="MY">🇲🇾 Malaysia</option>
                    <option value="KR">🇰🇷 South Korea</option>
                    <option value="JP">🇯🇵 Japan</option>
                    <option value="US">🇺🇸 USA</option>
                    <option value="AU">🇦🇺 Australia</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Amount
                  </label>
                  <div className="relative">
                    <select className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-700 focus:outline-none">
                      <option value="USD">USD</option>
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                      <option value="QAR">QAR</option>
                      <option value="KWD">KWD</option>
                      <option value="MYR">MYR</option>
                    </select>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full pl-20 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remittance Service
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="ime">IME</option>
                    <option value="prabhu">Prabhu Money Transfer</option>
                    <option value="esewa">eSewa</option>
                    <option value="khalti">Khalti</option>
                    <option value="western-union">Western Union</option>
                    <option value="moneygram">MoneyGram</option>
                    <option value="himal">Himal Remit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receiving Method
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="bank-deposit">Bank Account</option>
                    <option value="cash-pickup">Cash Pickup</option>
                    <option value="mobile-wallet">Mobile Wallet (eSewa/Khalti)</option>
                    <option value="home-delivery">Home Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transfer Speed
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="instant">Instant (0-10 minutes)</option>
                    <option value="fast">Fast (1-2 hours)</option>
                    <option value="standard">Standard (1 business day)</option>
                    <option value="economy">Economy (2-3 business days)</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Send Amount:</span>
                    <span className="font-semibold">$1,000.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = ₨133.25</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-semibold">$5.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-semibold">$1,005.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Recipient Gets:</span>
                    <span className="font-bold text-green-600 text-xl">₨133,250</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Calculate Transfer Cost
                </button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Licensed Partners</h4>
                <p className="text-gray-600 text-sm">All services are licensed by Nepal Rastra Bank for secure transfers</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Exchange Rates</h4>
                <p className="text-gray-600 text-sm">Compare live rates from major remittance companies</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
                <p className="text-gray-600 text-sm">Instant transfers to mobile wallets and bank accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}