import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Philippines OFW Remittance Calculator 2025 | Forex Exchange Rate Calculator',
  description: 'Free Philippines OFW remittance calculator. Calculate exchange rates, transfer fees, and total cost for sending money to Philippines.',
  keywords: [
    'philippines remittance calculator', 'OFW remittance calculator', 'philippines forex calculator', 'money transfer philippines', 'exchange rate calculator philippines', 'remittance fees calculator'
  ],
  alternates: {
    canonical: '/philippines-remittance-calculator',
  },
  openGraph: {
    title: 'Philippines OFW Remittance Calculator 2025',
    description: 'Free Philippines OFW remittance calculator. Calculate exchange rates, transfer fees, and total cost for sending money to Philippines.',
    url: 'https://genius-insights.co.za/philippines-remittance-calculator',
    type: 'website',
    images: [
      {
        url: '/images/philippines-remittance-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Philippines OFW Remittance Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philippines OFW Remittance Calculator 2025',
    description: 'Free Philippines OFW remittance calculator. Calculate exchange rates, transfer fees, and total cost for sending money to Philippines.',
    images: ['/images/philippines-remittance-calculator-og.jpg'],
  },
};

export default function PhilippinesRemittanceCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇵🇭 OFW Remittance Tool</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Philippines Remittance <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate exact costs and exchange rates for sending money to the Philippines through various remittance services.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">OFW Remittance Calculator</h2>
              <p className="text-gray-600 text-lg">Compare remittance services and calculate the best deal for sending money to Philippines</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Amount
                  </label>
                  <div className="relative">
                    <select className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-700 focus:outline-none">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="SAR">SAR</option>
                      <option value="AED">AED</option>
                      <option value="SGD">SGD</option>
                      <option value="HKD">HKD</option>
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
                    <option value="western-union">Western Union</option>
                    <option value="remitly">Remitly</option>
                    <option value="worldremit">WorldRemit</option>
                    <option value="wise">Wise (TransferWise)</option>
                    <option value="moneygram">MoneyGram</option>
                    <option value="xoom">Xoom</option>
                    <option value="gcash">GCash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transfer Method
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="bank-deposit">Bank Deposit</option>
                    <option value="cash-pickup">Cash Pickup</option>
                    <option value="mobile-wallet">Mobile Wallet (GCash/PayMaya)</option>
                    <option value="door-delivery">Door-to-Door Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transfer Speed
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="instant">Instant (0-30 minutes)</option>
                    <option value="fast">Fast (1-4 hours)</option>
                    <option value="standard">Standard (1-3 business days)</option>
                    <option value="economy">Economy (3-5 business days)</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Send Amount:</span>
                    <span className="font-semibold">$1,000.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = ₱56.85</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-semibold">$4.99</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-semibold">$1,004.99</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Recipient Gets:</span>
                    <span className="font-bold text-green-600 text-xl">₱56,850.00</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg">
                  Calculate Transfer Cost
                </button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Rates</h4>
                <p className="text-gray-600 text-sm">Compare real-time exchange rates across multiple remittance providers</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">Fast Transfers</h4>
                <p className="text-gray-600 text-sm">Send money instantly to GCash, bank accounts, or cash pickup locations</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h4>
                <p className="text-gray-600 text-sm">All featured services are licensed and regulated money transfer operators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}