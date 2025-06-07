import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Cuba Remittance Calculator 2025 | Cuban Remittance Calculator | Send Money to Cuba',
  description: 'Free Cuba remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Cuba from abroad.',
  keywords: [
    'cuba remittance calculator', 'cuban remittance calculator', 'send money to cuba calculator', 'cuba money transfer calculator', 'cuban peso remittance calculator'
  ],
  alternates: {
    canonical: '/cuba-remittance-calculator',
  },
  openGraph: {
    title: 'Cuba Remittance Calculator 2025 | Cuban Remittance Calculator',
    description: 'Free Cuba remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Cuba from abroad.',
    url: 'https://genius-insights.co.za/cuba-remittance-calculator',
    type: 'website',
    images: [
      {
        url: '/images/cuba-remittance-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cuba Remittance Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuba Remittance Calculator 2025 | Cuban Remittance Calculator',
    description: 'Free Cuba remittance calculator for 2025. Calculate exchange rates and transfer costs for sending money to Cuba from abroad.',
    images: ['/images/cuba-remittance-calculator-og.jpg'],
  },
};

export default function CubaRemittanceCalculatorPage() {
  return (
    <>
      <StructuredData type="business-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-white to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-blue-900/90 font-medium text-sm tracking-wide">🇨🇺 Cuban Diaspora</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900 mb-6 leading-tight">
                Cuba Remittance <br/>
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Calculator</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-800/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate exact costs and exchange rates for sending money to Cuba from anywhere in the world.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cuba Remittance Calculator</h2>
              <p className="text-gray-600 text-lg">Compare remittance services for sending money to Cuba</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sending From
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="US">🇺🇸 USA</option>
                    <option value="ES">🇪🇸 Spain</option>
                    <option value="MX">🇲🇽 Mexico</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="VE">🇻🇪 Venezuela</option>
                    <option value="IT">🇮🇹 Italy</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="AR">🇦🇷 Argentina</option>
                    <option value="CL">🇨🇱 Chile</option>
                    <option value="CO">🇨🇴 Colombia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Amount
                  </label>
                  <div className="relative">
                    <select className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-700 focus:outline-none">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="CAD">CAD</option>
                      <option value="MXN">MXN</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <input
                      type="number"
                      placeholder="200"
                      className="w-full pl-20 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remittance Service
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="ais">AIS (Fincimex)</option>
                    <option value="cubamax">Cubamax</option>
                    <option value="remesas">Remesas.com</option>
                    <option value="western-union">Western Union</option>
                    <option value="moneygram">MoneyGram</option>
                    <option value="cuban-services">Cuban Services Network</option>
                    <option value="envios">Envios.com</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receiving Method
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="bank-deposit">Cuban Bank Account</option>
                    <option value="cash-pickup">Cash Pickup (CADECA)</option>
                    <option value="debit-card">Cuban Debit Card</option>
                    <option value="home-delivery">Home Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Speed
                  </label>
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option value="instant">Instant (0-30 minutes)</option>
                    <option value="fast">Fast (1-4 hours)</option>
                    <option value="standard">Standard (1-2 business days)</option>
                    <option value="economy">Economy (3-5 business days)</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Send Amount:</span>
                    <span className="font-semibold">$200.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">1 USD = $120 CUP</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-semibold">$12.99</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-semibold">$212.99</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Recipient Gets:</span>
                    <span className="font-bold text-green-600 text-xl">$24,000 CUP</span>
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
                <h4 className="font-semibold text-gray-900 mb-2">Licensed Services</h4>
                <p className="text-gray-600 text-sm">All services comply with US and Cuban regulations for remittances</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💳</div>
                <h4 className="font-semibold text-gray-900 mb-2">Multiple Options</h4>
                <p className="text-gray-600 text-sm">Send to bank accounts, debit cards, or cash pickup locations</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🌎</div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Coverage</h4>
                <p className="text-gray-600 text-sm">Send from anywhere in the world to family and friends in Cuba</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}