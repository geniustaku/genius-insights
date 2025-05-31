import type { Metadata } from 'next';
import SouthAfricaTaxCalculator from '@/components/SouthAfricaTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'South Africa Tax Calculator 2025 | SARS Income Tax & PAYE Calculator',
  description: 'Free South Africa tax calculator for 2025/2026 tax year. Calculate SARS income tax, PAYE, UIF, SDL accurately. Updated with latest tax tables, rebates & brackets. Used by 100,000+ South Africans.',
  keywords: [
    'South Africa tax calculator 2025', 'SARS tax calculator', 'South African income tax calculator', 'PAYE calculator South Africa', 'SA tax calculator 2025/2026', 'South Africa tax rates', 'SARS PAYE calculator', 'income tax South Africa', 'SA tax brackets 2025', 'South African tax rebates', 'UIF calculator SA', 'SDL calculator South Africa', 'tax year 2025/2026 SA', 'SARS income tax rates', 'South Africa payroll tax'
  ],
  alternates: {
    canonical: '/south-africa-tax-calculator',
  },
  openGraph: {
    title: 'South Africa Tax Calculator 2025 | Free SARS PAYE Calculator',
    description: '💰 Calculate your exact South African tax! Updated 2025/2026 SARS rates, rebates & brackets. Free PAYE, UIF, SDL calculator used by 100,000+ taxpayers.',
    url: 'https://genius-insights.co.za/south-africa-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Tax Calculator 2025 - SARS PAYE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'South Africa Tax Calculator 2025 | SARS PAYE Calculator',
    description: '💰 Free SA tax calculator! Calculate SARS income tax, PAYE, UIF, SDL with 2025/2026 rates. Accurate & updated.',
    images: ['/images/sa-tax-calculator-og.jpg'],
  },
};

export default function SouthAfricaTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇿🇦 2025/2026 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                South Africa Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact SARS income tax, PAYE, UIF, and SDL with the latest 2025/2026 tax tables, 
                rebates, and brackets. Trusted by over 100,000 South African taxpayers.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025/26</div>
                  <div className="text-white/80 text-sm">Tax Year</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/80 text-sm">SARS Compliant</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100K+</div>
                  <div className="text-white/80 text-sm">Users Trust Us</div>
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
          <SouthAfricaTaxCalculator />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025/2026 Tax Year Updates
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Our calculator is fully updated with the latest SARS tax tables, rates, and rebates 
                  for the 2025/2026 tax year to ensure 100% accurate calculations.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🇿🇦', title: 'SARS Compliant', desc: 'Official 2025/2026 tax tables and rates' },
                    { icon: '💰', title: 'All Tax Types', desc: 'Income tax, PAYE, UIF, SDL calculations' },
                    { icon: '🎯', title: 'Accurate Rebates', desc: 'Primary, secondary, and tertiary rebates' },
                    { icon: '📊', title: 'Monthly & Annual', desc: 'Calculate both monthly and annual tax' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-xl">
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
                  2025/2026 Tax Brackets
                </h3>
                
                <div className="space-y-4">
                  {[
                    { bracket: 'R0 - R237,100', rate: '18%', color: 'bg-green-500' },
                    { bracket: 'R237,101 - R370,500', rate: '26%', color: 'bg-yellow-500' },
                    { bracket: 'R370,501 - R512,800', rate: '31%', color: 'bg-orange-500' },
                    { bracket: 'R512,801 - R673,000', rate: '36%', color: 'bg-red-500' },
                    { bracket: 'R673,001 - R857,900', rate: '39%', color: 'bg-purple-500' },
                    { bracket: 'R857,901+', rate: '45%', color: 'bg-gray-700' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.bracket}</span>
                        <span className="text-lg font-bold text-gray-900">{item.rate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: item.rate }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Tax Rebates Included</h4>
                      <ul className="text-green-800 text-sm leading-relaxed space-y-1">
                        <li>• Primary rebate: R17,235 (under 65)</li>
                        <li>• Secondary rebate: R9,444 (65-74 years)</li>
                        <li>• Tertiary rebate: R3,145 (75+ years)</li>
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