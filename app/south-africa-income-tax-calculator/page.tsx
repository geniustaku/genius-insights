import type { Metadata } from 'next';
import SouthAfricaIncomeTaxCalculator from '@/components/SouthAfricaIncomeTaxCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Income Tax Calculator 2025 | SARS Tax & Salary Deductions Calculator',
  description: 'Free SA income tax calculator 2025/2026. Calculate SARS income tax, UIF, PAYE deductions, monthly take-home salary with latest tax brackets, rebates & thresholds. Used by 100,000+ South Africans.',
  keywords: [
    'South Africa income tax calculator 2025',
    'SARS tax calculator',
    'PAYE calculator South Africa',
    'salary tax calculator SA',
    'take home pay calculator SA',
    'income tax deductions calculator',
    'South Africa tax brackets 2025',
    'SARS PAYE calculator',
    'monthly salary tax calculator',
    'net salary calculator SA',
    'UIF calculator South Africa',
    'tax rebate calculator SA',
    'income tax threshold 2025',
    'salary after tax calculator',
    'South African tax calculator'
  ],
  alternates: {
    canonical: '/south-africa-income-tax-calculator',
  },
  openGraph: {
    title: 'South Africa Income Tax Calculator 2025 | SARS Tax & PAYE Calculator',
    description: '💰 Calculate SA income tax & take-home salary! 2025/2026 tax brackets, PAYE, UIF, rebates. Free SARS-compliant calculator used by 100,000+ South Africans.',
    url: 'https://genius-insights.co.za/south-africa-income-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-income-tax-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Income Tax Calculator 2025 - SARS PAYE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Income Tax Calculator 2025 | SARS Tax & PAYE Calculator',
    description: '💰 Calculate South African income tax & take-home salary! 2025/2026 tax brackets, PAYE, UIF, rebates.',
    images: ['/images/sa-income-tax-og.jpg'],
  },
};

export default function SouthAfricaIncomeTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💰 SARS Tax Year 2025/2026</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                SA Income Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your SARS income tax, PAYE deductions, UIF contributions, and take-home salary.
                Get instant, accurate tax calculations with the latest 2025/2026 tax brackets and rebates.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100K+</div>
                  <div className="text-white/80 text-sm">Users Monthly</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">SARS</div>
                  <div className="text-white/80 text-sm">Compliant</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025/26</div>
                  <div className="text-white/80 text-sm">Tax Year</div>
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
          <SouthAfricaIncomeTaxCalculator />
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
            {/* Multiplex Ad */}
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
                  Understanding SA Income Tax 2025
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  South Africa uses a progressive tax system where higher earners pay a higher percentage
                  of their income in tax. Understanding your tax obligations helps with financial planning
                  and maximizing your take-home pay.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📊', title: 'Tax Brackets', desc: 'Progressive rates from 18% to 45%' },
                    { icon: '💰', title: 'Tax Rebates', desc: 'Primary, secondary & tertiary rebates' },
                    { icon: '🎯', title: 'PAYE Deductions', desc: 'Pay-As-You-Earn monthly withholding' },
                    { icon: '🏥', title: 'UIF Contributions', desc: '1% of gross salary (max R177.12/month)' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl">
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

                <div className="space-y-3 mb-8">
                  {[
                    { range: 'R0 - R237,100', rate: '18%', color: 'bg-green-500' },
                    { range: 'R237,101 - R370,500', rate: '26%', color: 'bg-blue-500' },
                    { range: 'R370,501 - R512,800', rate: '31%', color: 'bg-purple-500' },
                    { range: 'R512,801 - R673,000', rate: '36%', color: 'bg-orange-500' },
                    { range: 'R673,001 - R857,900', rate: '39%', color: 'bg-red-500' },
                    { range: 'R857,901 - R1,817,000', rate: '41%', color: 'bg-pink-500' },
                    { range: 'R1,817,001+', rate: '45%', color: 'bg-indigo-600' }
                  ].map((bracket, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 text-sm">{bracket.range}</span>
                        <span className="text-sm font-bold text-gray-900">{bracket.rate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${bracket.color} h-2 rounded-full transition-all duration-1000`}
                             style={{ width: `${parseInt(bracket.rate)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Tax Saving Tips</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Maximize retirement annuity contributions (27.5% deductible)</li>
                        <li>• Claim medical aid tax credits (R364/month main, R246/month dependant)</li>
                        <li>• Use tax-free savings accounts (R36,000/year)</li>
                        <li>• Keep records of all work-from-home expenses</li>
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
