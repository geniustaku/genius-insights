import type { Metadata } from 'next';
import SouthAfricaInvestmentCalculator from '@/components/SouthAfricaInvestmentCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'South Africa Investment Calculator 2025 | Compound Interest & ROI Calculator',
  description: 'Free SA investment calculator 2025. Calculate compound interest, investment growth, portfolio returns with JSE & offshore options. Used by 120,000+ investors.',
  keywords: [
    'South Africa investment calculator 2025', 'SA compound interest calculator', 'investment growth calculator SA', 'JSE investment calculator', 'SA portfolio calculator', 'unit trust calculator SA', 'ETF calculator South Africa', 'offshore investment calculator SA', 'retirement investment SA', 'TFSA calculator SA', 'investment return calculator SA', 'SA wealth calculator', 'financial planning calculator SA', 'investment portfolio SA', 'SA money growth calculator'
  ],
  alternates: {
    canonical: '/south-africa-investment-calculator',
  },
  openGraph: {
    title: 'South Africa Investment Calculator 2025 | Free Compound Interest & ROI Tool',
    description: '📈 Calculate SA investment growth! Compound interest, JSE returns, offshore investments with 2025 rates. Free tool for 120,000+ investors.',
    url: 'https://genius-insights.co.za/south-africa-investment-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-investment-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Investment Calculator 2025 - Compound Interest & ROI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Investment Calculator 2025 | Compound Interest & ROI',
    description: '📈 Calculate South African investment growth! JSE returns, compound interest, portfolio growth with 2025 rates.',
    images: ['/images/sa-investment-calculator-og.jpg'],
  },
};

export default function SouthAfricaInvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">📈 Wealth Building Tool</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                SA Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment growth, compound interest, and portfolio returns for South African investments. 
                Plan your wealth building journey with JSE, unit trusts, and offshore options.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">120K+</div>
                  <div className="text-white/80 text-sm">Active Investors</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">10-15%</div>
                  <div className="text-white/80 text-sm">JSE Average Return</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">TFSA</div>
                  <div className="text-white/80 text-sm">Tax Free Savings</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025</div>
                  <div className="text-white/80 text-sm">Updated Rates</div>
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
          <SouthAfricaInvestmentCalculator />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  SA Investment Options
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  South Africa offers diverse investment opportunities from JSE stocks to unit trusts, 
                  ETFs, and offshore investments. Understanding your options is key to building wealth.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '📊', title: 'JSE Stocks & ETFs', desc: 'Direct equity exposure to SA companies' },
                    { icon: '🏛️', title: 'Unit Trusts', desc: 'Professionally managed diversified funds' },
                    { icon: '🌍', title: 'Offshore Investments', desc: 'Global exposure via TFSA or RA' },
                    { icon: '🏦', title: 'Tax-Free Savings', desc: 'R36,000 annual TFSA contribution limit' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
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
                  Investment Strategies 2025
                </h3>
                
                <div className="space-y-4">
                  {[
                    { strategy: 'Start Early', benefit: 'Compound interest multiplies over time', color: 'bg-green-500' },
                    { strategy: 'Dollar Cost Average', benefit: 'Regular monthly investments reduce risk', color: 'bg-blue-500' },
                    { strategy: 'Diversify Portfolio', benefit: 'Mix local and offshore investments', color: 'bg-purple-500' },
                    { strategy: 'Use TFSA First', benefit: 'Tax-free growth on R36k per year', color: 'bg-orange-500' },
                    { strategy: 'Low-Cost ETFs', benefit: 'Minimize fees, maximize returns', color: 'bg-red-500' },
                    { strategy: 'Long-Term Focus', benefit: '10+ year horizon for best results', color: 'bg-indigo-500' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.strategy}</span>
                        <span className="text-sm font-medium text-gray-600">Essential</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">{item.benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">Investment Reality Check</h4>
                      <ul className="text-purple-800 text-sm leading-relaxed space-y-1">
                        <li>• JSE has delivered 15%+ annual returns over 20+ years</li>
                        <li>• R1,000/month from age 25 can grow to R10M+ by retirement</li>
                        <li>• Offshore exposure helps protect against rand weakness</li>
                        <li>• Time in market beats timing the market</li>
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