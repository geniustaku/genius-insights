import type { Metadata } from 'next';
import SouthAfricaCarFinanceCalculator from '@/components/SouthAfricaCarFinanceCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Car Finance Calculator 2025 | Vehicle Finance & Balloon Payment Calculator',
  description: 'Free SA car finance calculator 2025. Calculate vehicle finance with balloon payments, deposits, interest rates. Compare new vs used car finance. NCR-compliant calculations.',
  keywords: [
    'car finance calculator south africa 2025',
    'vehicle finance calculator SA',
    'balloon payment calculator',
    'car loan calculator',
    'wesbank calculator',
    'mfc calculator',
    'vehicle finance rates',
    'car payment calculator',
    'new car finance calculator',
    'used car finance calculator',
    'balloon payment options',
    'vehicle loan calculator',
    'auto finance calculator SA',
    'car installment calculator',
    'how much car can I afford'
  ],
  alternates: {
    canonical: '/south-africa-car-finance-calculator',
  },
  openGraph: {
    title: 'South Africa Car Finance Calculator 2025 | Vehicle & Balloon Calculator',
    description: '🚗 Calculate car finance with balloon payments! Deposits, interest rates, new vs used. Free calculator.',
    url: 'https://genius-insights.co.za/south-africa-car-finance-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Car Finance Calculator 2025 | Balloon Payments',
    description: '🚗 Calculate vehicle finance! Balloon payments, deposits, bank rates. Free calculator.',
  },
};

export default function SouthAfricaCarFinanceCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🚗 Vehicle Finance Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Car Finance Calculator <br/>
                <span className="bg-gradient-to-r from-orange-200 to-red-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate vehicle finance with balloon payments, deposits, and accurate interest rates.
                Compare new vs used car financing options for SA buyers.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">11.75%</div>
                  <div className="text-white/80 text-sm">Prime Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">40%</div>
                  <div className="text-white/80 text-sm">Max Balloon</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">72 Months</div>
                  <div className="text-white/80 text-sm">Max Term</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Calculator</div>
                </div>
              </div>
            </div>
          </div>
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
          <SouthAfricaCarFinanceCalculator />
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
                  Vehicle Finance in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Vehicle finance is a secured loan where the car serves as collateral. Interest rates are typically
                  lower than personal loans, and you can choose between instalment sale (you own the car from day 1)
                  or lease agreements (bank owns the car).
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '🚗', title: 'New Cars', desc: 'Prime rate to prime+2% (11.75% - 13.75%)' },
                    { icon: '🔧', title: 'Used Cars', desc: 'Prime+2% to prime+5% (13.75% - 16.75%)' },
                    { icon: '🎈', title: 'Balloon Option', desc: 'Up to 40% balloon, due at end of term' },
                    { icon: '📅', title: 'Max 72 Months', desc: '6 years maximum repayment term' }
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
                  Finance Types
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Instalment Sale Agreement</h4>
                    <p className="text-sm text-orange-800">You own the car from day 1. Most common for private buyers. Interest deductible for business use.</p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Lease Agreement</h4>
                    <p className="text-sm text-red-800">Bank owns the car. Lower monthly payments. Popular for businesses (VAT and full costs deductible).</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Rent-to-Own</h4>
                    <p className="text-sm text-purple-800">Higher rates but easier approval. Good for buyers with poor credit scores.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Additional Costs</h4>
                  <ul className="text-orange-800 text-sm leading-relaxed space-y-1">
                    <li>• Comprehensive insurance (required)</li>
                    <li>• License and registration fees</li>
                    <li>• Fuel and maintenance</li>
                    <li>• Tracking device (if required by bank)</li>
                    <li>• Extended warranty (optional)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
