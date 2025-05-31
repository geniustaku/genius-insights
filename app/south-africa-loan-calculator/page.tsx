import type { Metadata } from 'next';
import SouthAfricaLoanCalculator from '@/components/SouthAfricaLoanCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'South Africa Loan Calculator 2025 | Home Loan & Bond Affordability Calculator',
  description: 'Free South African home loan calculator 2025. Calculate bond affordability, monthly repayments, deposit requirements & loan costs. Updated with latest SA interest rates. Used by 50,000+ homebuyers.',
  keywords: [
    'South Africa loan calculator 2025', 'home loan calculator SA', 'bond calculator South Africa', 'mortgage calculator SA', 'loan affordability calculator', 'South African home loan rates', 'bond repayment calculator', 'SA mortgage calculator', 'property loan calculator', 'home loan affordability SA', 'bond interest rates SA', 'South Africa mortgage rates', 'home loan deposit calculator', 'property finance calculator SA', 'bond application calculator'
  ],
  alternates: {
    canonical: '/south-africa-loan-calculator',
  },
  openGraph: {
    title: 'South Africa Loan Calculator 2025 | Free Home Loan & Bond Calculator',
    description: '🏠 Calculate your SA home loan affordability! Free bond calculator with latest interest rates, deposit requirements & monthly payments. Trusted by 50,000+ buyers.',
    url: 'https://genius-insights.co.za/south-africa-loan-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-loan-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Loan Calculator 2025 - Home Loan Bond Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'South Africa Home Loan Calculator 2025 | Bond Calculator',
    description: '🏠 Free SA loan calculator! Calculate bond affordability, monthly payments & deposit with latest rates. Accurate & instant.',
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
                <span className="text-white/90 font-medium text-sm tracking-wide">🏠 2025 Interest Rates</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                South Africa Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your home loan affordability, bond repayments, and deposit requirements with 
                the latest South African interest rates. Make informed property decisions today.
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

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaLoanCalculator />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Home Loan Requirements in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Understanding South African home loan requirements will help you prepare 
                  for your bond application and increase your approval chances.
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
                  Current SA Bank Rates (2025)
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