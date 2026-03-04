import type { Metadata } from 'next';
import SouthAfricaLoanCalculator from '@/components/SouthAfricaLoanCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Home Loan Calculator SA 2026 | Bond Repayment',
  description: 'How much home loan can I afford? Free SA home loan calculator 2026. Calculate bond repayments, affordability & deposit. Compare FNB, ABSA, Standard Bank, Nedbank rates.',
  keywords: [
    'home loan calculator south africa',
    'bond repayment calculator 2026',
    'how much home loan can I afford',
    'home loan affordability calculator SA',
    'bond calculator south africa',
    'how much can I borrow for a house',
    'home loan interest rates south africa 2026',
    'bond repayment calculator south africa',
    'property loan calculator SA',
    'home loan deposit calculator',
    'fnb home loan calculator',
    'standard bank home loan calculator',
    'absa home loan calculator',
    'nedbank home loan calculator',
    'home loan pre-approval calculator',
    'bond amount calculator south africa',
    'home loan comparison south africa'
  ],
  alternates: {
    canonical: '/south-africa-loan-calculator',
  },
  openGraph: {
    title: 'Home Loan Calculator SA 2026 | Bond Repayment',
    description: 'How much home loan can I afford? Calculate bond repayments, affordability & deposit requirements. Compare SA bank rates for 2026.',
    url: 'https://genius-insights.co.za/south-africa-loan-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-loan-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Loan Calculator South Africa 2026 - Bond Repayment & Affordability',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Loan Calculator SA 2026 | Bond Repayment',
    description: 'How much home loan can I afford? Calculate bond repayments & compare SA bank rates. Free instant calculator.',
    images: ['/images/sa-loan-calculator-og.jpg'],
  },
};

export default function SouthAfricaLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏠 2026 Interest Rates</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Home Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                How much home loan can I afford? Calculate your bond repayments, deposit requirements and
                total interest costs. Compare rates from FNB, ABSA, Standard Bank and Nedbank.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">11.5%</div>
                  <div className="text-white/80 text-sm">Prime Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-white/80 text-sm">Happy Buyers</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">4 Banks</div>
                  <div className="text-white/80 text-sm">Rate Comparison</div>
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

        {/* Display Ad 3 - Before Calculator */}
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
          <SouthAfricaLoanCalculator />
        </div>

        {/* Display Ad 4 - After Calculator */}
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
            {/* Multiplex Ad - Within Information Section */}
            <div className="mb-8 text-center">
              <AdSenseAd 
                adSlot="9985989974"
                adFormat="autorelaxed"
                style={{ display: 'block', minHeight: '280px' }}
                className="border border-gray-200 rounded-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  How Much Can I Borrow for a House in SA?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Understanding home loan requirements and bond affordability rules will help you
                  prepare for your application and get approved at the best interest rate.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'Deposit Required', desc: 'Typically 10-20% of property value' },
                    { icon: '📊', title: 'Affordability Rules', desc: 'Max 30% of gross income for repayments' },
                    { icon: '🏦', title: 'Credit Score', desc: 'Minimum 600+ for best rates' },
                    { icon: '📋', title: 'Documentation', desc: 'Payslips, bank statements, ID' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
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
                  Home Loan Interest Rates SA Banks 2026
                </h3>
                
                <div className="space-y-4">
                  {[
                    { bank: 'Standard Bank', rate: '11.25%', color: 'bg-blue-500' },
                    { bank: 'ABSA', rate: '11.50%', color: 'bg-red-500' },
                    { bank: 'FNB', rate: '11.25%', color: 'bg-orange-500' },
                    { bank: 'Nedbank', rate: '11.75%', color: 'bg-green-500' },
                    { bank: 'Capitec Bank', rate: '11.95%', color: 'bg-purple-500' },
                    { bank: 'African Bank', rate: '12.25%', color: 'bg-gray-600' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.bank}</span>
                        <span className="text-lg font-bold text-gray-900">{item.rate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Pro Tips</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Shop around - rates vary between banks</li>
                        <li>• Higher deposit = better interest rate</li>
                        <li>• Consider pre-approval for negotiation power</li>
                        <li>• Factor in transfer costs (8-10% of property value)</li>
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