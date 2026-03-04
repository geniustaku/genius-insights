import type { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Take Home Pay Calculator SA 2026 | Gross to Net',
  description: 'Free salary calculator for South Africa 2026. Calculate your take home pay, gross to net salary after PAYE, UIF and SDL. Covers 18 African countries.',
  keywords: [
    'take home pay calculator south africa', 'salary calculator south africa 2026', 'gross to net salary calculator SA', 'net salary calculator south africa', 'PAYE calculator south africa', 'what is my take home pay', 'salary after tax south africa', 'South Africa salary calculator', 'Nigeria salary calculator', 'Kenya salary calculator', 'African salary calculator 2026', 'how much will I earn after tax', 'salary deductions calculator SA', 'monthly salary calculator', 'annual salary to monthly take home'
  ],
  alternates: {
    canonical: '/salary-calculator',
  },
  openGraph: {
    title: 'Take Home Pay Calculator SA 2026 | Gross to Net Salary',
    description: 'Calculate your take home pay after PAYE, UIF and SDL deductions. Free gross to net salary calculator for South Africa and 18 African countries.',
    url: '/salary-calculator',
    type: 'website',
    images: [
      {
        url: '/images/salary-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'African Salary Calculator 2026 - Calculate Your Worth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take Home Pay Calculator SA 2026 | Free Tool',
    description: 'Calculate your take home pay after tax in South Africa. Free gross to net salary calculator with 2026 PAYE rates.',
    images: ['/images/salary-calculator-og.jpg'],
  },
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-elegant rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block glass rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">💰 2026 Market Data</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Take Home Pay Calculator <br/>
              <span className="text-gradient bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">South Africa 2026</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Calculate your gross to net salary after PAYE, UIF and SDL deductions.
              Find out your exact take home pay with real 2026 tax rates across 15+ African countries.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-white/80 text-sm">Countries</div>
              </div>
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-white/80 text-sm">Cities</div>
              </div>
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-white/80 text-sm">Data Points</div>
              </div>
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-white/80 text-sm">Industries</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
        <SalaryCalculator />
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
                How the Gross to Net Salary Calculator Works
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our calculator uses 2026 SARS tax tables to deduct PAYE, UIF (1%) and SDL (1%)
                from your gross salary, showing your exact take home pay each month.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: '🌍', title: 'Geographic Intelligence', desc: 'Location-specific cost of living adjustments' },
                  { icon: '🎯', title: 'Industry Expertise', desc: 'Sector-specific compensation trends' },
                  { icon: '📊', title: 'Real-time Data', desc: 'Continuously updated market insights' },
                  { icon: '🔒', title: 'Verified Sources', desc: 'Data from trusted employers and surveys' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-fresh rounded-xl flex items-center justify-center text-xl">
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
                Key Factors We Analyze
              </h3>
              
              <div className="space-y-6">
                {[
                  { factor: 'Location Impact', weight: '25%', color: 'bg-blue-500' },
                  { factor: 'Industry Standards', weight: '30%', color: 'bg-purple-500' },
                  { factor: 'Experience Level', weight: '25%', color: 'bg-green-500' },
                  { factor: 'Education & Skills', weight: '20%', color: 'bg-orange-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{item.factor}</span>
                      <span className="text-sm font-semibold text-gray-600">{item.weight}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                           style={{ width: item.weight }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Important Note</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Salary estimates are based on market averages and may vary depending on 
                      company size, specific skills, performance, and negotiation factors.
                    </p>
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