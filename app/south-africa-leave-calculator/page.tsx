import type { Metadata } from 'next';
import SouthAfricaLeaveCalculator from '@/components/SouthAfricaLeaveCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Leave Calculator 2025 | BCEA Annual Leave & Sick Leave Calculator',
  description: 'Free SA leave calculator 2025. Calculate annual leave, sick leave, family responsibility leave. BCEA compliant leave entitlements and accrued leave payout calculator.',
  keywords: [
    'leave calculator south africa 2025',
    'annual leave calculator SA',
    'sick leave calculator',
    'leave days calculator',
    'BCEA leave entitlement',
    'how many leave days',
    'leave payout calculator',
    'accrued leave calculator',
    'family responsibility leave',
    'maternity leave calculator',
    'paternity leave SA',
    'leave balance calculator',
    'holiday leave calculator',
    'vacation days calculator SA'
  ],
  alternates: {
    canonical: '/south-africa-leave-calculator',
  },
  openGraph: {
    title: 'South Africa Leave Calculator 2025 | BCEA Leave Entitlements',
    description: '🏖️ Calculate your leave! Annual leave, sick leave, family leave. BCEA compliant calculator.',
    url: 'https://genius-insights.co.za/south-africa-leave-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Leave Calculator 2025',
    description: '🏖️ Calculate annual leave, sick leave, family leave. BCEA compliant.',
  },
};

export default function SouthAfricaLeaveCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏖️ BCEA Leave Entitlements</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Leave Calculator <br/>
                <span className="bg-gradient-to-r from-sky-200 to-blue-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your leave entitlements according to BCEA. Track annual leave, sick leave,
                family responsibility leave, and calculate your leave payout value.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">21 Days</div>
                  <div className="text-white/80 text-sm">Annual Leave</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">30 Days</div>
                  <div className="text-white/80 text-sm">Sick Leave/3yr</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">3 Days</div>
                  <div className="text-white/80 text-sm">Family Leave</div>
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
          <SouthAfricaLeaveCalculator />
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
                  BCEA Leave Rights
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  The Basic Conditions of Employment Act (BCEA) guarantees minimum leave entitlements
                  for all employees in South Africa. These are minimum standards - your employer may
                  offer more generous leave.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '🏖️', title: '21 Days Annual Leave', desc: '15 working days for 5-day week employees' },
                    { icon: '🏥', title: '30 Days Sick Leave', desc: 'Over 3-year cycle after 6 months service' },
                    { icon: '👨‍👩‍👧', title: '3 Days Family Leave', desc: 'Birth, child illness, family death' },
                    { icon: '🤰', title: '4 Months Maternity', desc: '121 days maternity leave (unpaid by employer)' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center text-xl">
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
                  Leave Rules
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
                    <h4 className="font-semibold text-sky-900 mb-2">Annual Leave Accrual</h4>
                    <p className="text-sm text-sky-800">Leave accrues from day one. BCEA allows 1 day for every 17 days worked. Must be taken within 6 months of end of leave cycle.</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Leave During Notice Period</h4>
                    <p className="text-sm text-blue-800">Employer can't force you to take leave during notice. Unused leave must be paid out at resignation or dismissal.</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Sick Leave Proof</h4>
                    <p className="text-sm text-indigo-800">Medical certificate required for 2+ consecutive days or if employer has reason to doubt illness.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl border border-sky-200">
                  <h4 className="font-semibold text-sky-900 mb-2">Public Holidays 2025</h4>
                  <p className="text-sky-800 text-sm leading-relaxed">
                    12 public holidays in SA. If you work on a public holiday, you're entitled to double pay
                    or a day off. Public holidays don't count as annual leave.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Can my employer refuse my leave request?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Yes, for operational reasons, but they must grant leave within 6 months of end of
                    your leave cycle. They cannot unreasonably refuse or accumulate leave indefinitely.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What happens to unused leave when I resign?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Accrued annual leave must be paid out at your daily rate. Sick leave is NOT paid out
                    unless your contract specifically provides for this.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Is maternity leave paid?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Employers are not required to pay during maternity leave. However, you can claim
                    UIF benefits (up to 60% of salary) for up to 121 days.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
