import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bangladesh Remittance Calculator 2025 | Bangladeshi Remittance Calculator',
  description: 'Free Bangladesh remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Bangladesh.',
  keywords: [
    'bangladesh remittance calculator', 'bangladeshi remittance calculator', 'bangladesh money transfer calculator', 'bangladeshi taka exchange rate calculator', 'bkash remittance calculator'
  ],
  alternates: {
    canonical: '/bangladesh-remittance-calculator',
  },
  openGraph: {
    title: 'Bangladesh Remittance Calculator 2025 | Bangladeshi Remittance Calculator',
    description: 'Free Bangladesh remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Bangladesh.',
    url: 'https://genius-insights.co.za/bangladesh-remittance-calculator',
    type: 'website',
    images: [
      {
        url: '/images/bangladesh-remittance-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bangladesh Remittance Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangladesh Remittance Calculator 2025 | Bangladeshi Remittance Calculator',
    description: 'Free Bangladesh remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Bangladesh.',
    images: ['/images/bangladesh-remittance-calculator-og.jpg'],
  },
};

export default function BangladeshRemittanceCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇧🇩 Expatriate Services</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Bangladesh Remittance <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate exact costs and exchange rates for sending money to Bangladesh from abroad.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bangladesh Remittance Calculator</h2>
              <p className="text-gray-600 text-lg">Compare remittance services for sending money to Bangladesh</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sending From
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="AE">🇦🇪 UAE</option>
                    <option value="SA">🇸🇦 Saudi Arabia</option>
                    <option value="SG">🇸🇬 Singapore</option>
                    <option value="MY">🇲🇾 Malaysia</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                    <option value="US">🇺🇸 USA</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="AU">🇦🇺 Australia</option>
                    <option value="IT">🇮🇹 Italy</option>
                    <option value="KR">🇰🇷 South Korea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Amount
                  </label>
                  <div className="relative">
                    <select className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-700 focus:outline-none">
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                      <option value="SGD">SGD</option>
                    </select>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full pl-20 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remittance Service
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="bkash">bKash</option>
                    <option value="rocket">Rocket</option>
                    <option value="nagad">Nagad</option>
                    <option value="western-union">Western Union</option>
                    <option value="moneygram">MoneyGram</option>
                    <option value="ria">Ria Money Transfer</option>
                    <option value="transfast">Transfast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receiving Method
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg">
                    <option value="bank-deposit">Bank Account</option>
                    <option value="mobile-wallet">Mobile Wallet (bKash/Rocket/Nagad)</option>
                    <option value="cash-pickup">Cash Pickup</option>
                    <option value="home-delivery">Home Delivery</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    Include 2% government incentive for remittance
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Send Amount:</span>
                    <span className="font-semibold">$1,000.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = ৳119.85</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-semibold">$4.99</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200 text-green-600">
                    <span className="text-gray-600">Gov. Incentive (2%):</span>
                    <span className="font-semibold">+৳2,397</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-semibold">$1,004.99</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Recipient Gets:</span>
                    <span className="font-bold text-green-600 text-xl">৳122,282</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-green-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Calculate Transfer Cost
                </button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Mobile Wallets</h4>
                <p className="text-gray-600 text-sm">Direct transfers to bKash, Rocket, Nagad, and other mobile financial services</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🎁</div>
                <h4 className="font-semibold text-gray-900 mb-2">Government Incentive</h4>
                <p className="text-gray-600 text-sm">Receive 2% additional bonus from Bangladesh government on remittances</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Bank Integration</h4>
                <p className="text-gray-600 text-sm">Direct deposits to all major Bangladeshi banks nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}