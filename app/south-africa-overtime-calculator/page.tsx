import type { Metadata } from 'next';
import SouthAfricaOvertimeCalculator from '@/components/SouthAfricaOvertimeCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Overtime Pay Calculator SA 2026 | BCEA Rates',
  description: 'How much is overtime pay in South Africa? Free BCEA overtime calculator with 1.5x weekday, 2x Sunday and public holiday rates. Calculate your overtime pay now.',
  keywords: [
    'overtime calculator south africa 2026',
    'how much is overtime pay in south africa',
    'BCEA overtime rates 2026',
    'overtime pay calculator SA',
    'sunday pay rate south africa',
    'public holiday pay calculator SA',
    'how to calculate overtime south africa',
    'overtime 1.5 times normal rate',
    'double time pay south africa',
    'labour law overtime pay BCEA',
    'nightshift pay calculator south africa',
    'overtime hours limit south africa',
    'time and a half calculator SA',
    'is overtime compulsory in south africa'
  ],
  alternates: {
    canonical: '/south-africa-overtime-calculator',
  },
  openGraph: {
    title: 'Overtime Pay Calculator SA 2026 | BCEA Rates',
    description: 'How much is overtime pay in South Africa? Calculate BCEA overtime at 1.5x weekday, 2x Sunday and public holiday rates.',
    url: 'https://genius-insights.co.za/south-africa-overtime-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Pay Calculator SA 2026 | BCEA Rates',
    description: 'How much is overtime pay in South Africa? Calculate BCEA 1.5x and 2x rates for weekdays, Sundays and public holidays.',
  },
};

export default function SouthAfricaOvertimeCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">⏰ BCEA Compliant Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                How Much Is Overtime Pay <br/>
                <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">in South Africa? (2026)</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your overtime pay per the BCEA. Weekday overtime at 1.5x your normal rate,
                Sundays at 2x, and public holidays at double pay. Know your rights.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">1.5x</div>
                  <div className="text-white/80 text-sm">Overtime Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2x</div>
                  <div className="text-white/80 text-sm">Sunday/Holiday</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">10 Hours</div>
                  <div className="text-white/80 text-sm">Max OT/Week</div>
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
          <SouthAfricaOvertimeCalculator />
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
                  BCEA Overtime Rules in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  The Basic Conditions of Employment Act (BCEA) Section 10 sets minimum overtime pay rates.
                  Employers must pay at least 1.5x (time and a half) for weekday overtime and 2x for Sundays.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '⏰', title: 'Max 45 Hours/Week', desc: 'Ordinary working hours maximum per week' },
                    { icon: '📊', title: 'Max 10 Hours OT/Week', desc: 'Maximum overtime hours per week' },
                    { icon: '💰', title: '1.5x Weekday Rate', desc: 'Minimum overtime rate for weekdays' },
                    { icon: '🎉', title: '2x Sunday/Holiday', desc: 'Double pay for Sundays and public holidays' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-xl">
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
                  Who Is Covered?
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">BCEA Applies To</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Most employees earning below R254,371.67/year</li>
                      <li>• Full-time and part-time workers</li>
                      <li>• Domestic workers</li>
                      <li>• Farm workers</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Exemptions</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Senior managers</li>
                      <li>• Employees earning above R254,371.67/year</li>
                      <li>• Sales staff working outside premises</li>
                      <li>• Workers under sectoral determinations</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Agreement Required</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Overtime must be by agreement. Your employer cannot force you to work overtime
                    without consent. The agreement should be in writing and may not exceed 10 hours
                    per week unless covered by a collective agreement.
                  </p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Know Your Rights</h4>
              <p className="text-sm text-yellow-800">
                If your employer refuses to pay overtime correctly, contact the Department of Employment and Labour
                or CCMA. Keep records of hours worked as evidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
