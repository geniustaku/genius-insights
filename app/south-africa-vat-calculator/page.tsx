import type { Metadata } from 'next';
import SouthAfricaVATCalculator from '@/components/SouthAfricaVATCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'South Africa VAT Calculator 2025 | Free 15% VAT Calculator & SARS Tool',
  description: 'Free South African VAT calculator 2025. Calculate 15% VAT, VAT inclusive/exclusive prices, VAT registration thresholds. SARS compliant tool used by 80,000+ businesses.',
  keywords: [
    'South Africa VAT calculator 2025', 'SA VAT calculator 15%', 'VAT inclusive calculator SA', 'VAT exclusive calculator SA', 'SARS VAT calculator', 'South African VAT rates', 'VAT registration threshold SA', 'business VAT calculator SA', 'SA VAT calculation tool', '15% VAT calculator', 'South Africa VAT compliance', 'VAT invoice calculator SA', 'SARS VAT tool', 'SA value added tax calculator', 'VAT refund calculator SA'
  ],
  alternates: {
    canonical: '/south-africa-vat-calculator',
  },
  openGraph: {
    title: 'South Africa VAT Calculator 2025 | Free 15% VAT Calculator',
    description: '💼 Calculate SA VAT instantly! 15% VAT inclusive/exclusive, registration thresholds, SARS compliant. Free tool for 80,000+ businesses.',
    url: 'https://genius-insights.co.za/south-africa-vat-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-vat-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa VAT Calculator 2025 - 15% VAT Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA VAT Calculator 2025 | Free 15% VAT Tool',
    description: '💼 Calculate South African VAT! 15% VAT inclusive/exclusive, registration info. SARS compliant & free.',
    images: ['/images/sa-vat-calculator-og.jpg'],
  },
};

export default function SouthAfricaVATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💼 15% VAT Rate</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                South Africa VAT Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate South African VAT (Value Added Tax) at 15% with our SARS-compliant calculator. 
                Perfect for businesses, invoicing, and VAT compliance calculations.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">15%</div>
                  <div className="text-white/80 text-sm">VAT Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R1M</div>
                  <div className="text-white/80 text-sm">Registration Threshold</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">80K+</div>
                  <div className="text-white/80 text-sm">Business Users</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">SARS</div>
                  <div className="text-white/80 text-sm">Compliant</div>
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
          <SouthAfricaVATCalculator />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  South African VAT Basics
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Understanding VAT (Value Added Tax) is crucial for South African businesses. 
                  Learn the key requirements and thresholds for VAT compliance with SARS.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '📊', title: '15% Standard Rate', desc: 'Applied to most goods and services' },
                    { icon: '🏢', title: 'R1M Registration', desc: 'Mandatory registration threshold per year' },
                    { icon: '📅', title: 'Bi-monthly Returns', desc: 'VAT returns due every 2 months' },
                    { icon: '✅', title: 'Zero-rated Items', desc: 'Basic foods, medicines, exports' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl">
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
                  VAT Registration Thresholds
                </h3>
                
                <div className="space-y-4">
                  {[
                    { category: 'Mandatory Registration', amount: 'R1,000,000+', color: 'bg-red-500', desc: 'Annual taxable supplies' },
                    { category: 'Voluntary Registration', amount: 'R50,000+', color: 'bg-yellow-500', desc: 'May register voluntarily' },
                    { category: 'Micro Business', amount: 'R120,000+', color: 'bg-green-500', desc: 'Turnover tax option' },
                    { category: 'Import/Export', amount: 'Any amount', color: 'bg-blue-500', desc: 'Automatic VAT liability' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.category}</span>
                        <span className="text-lg font-bold text-gray-900">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: '80%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">VAT Benefits</h4>
                      <ul className="text-purple-800 text-sm leading-relaxed space-y-1">
                        <li>• Claim input VAT on business expenses</li>
                        <li>• Enhanced credibility with suppliers</li>
                        <li>• Access to VAT refunds</li>
                        <li>• Simplified import/export processes</li>
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