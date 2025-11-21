import type { Metadata } from 'next';
import SouthAfricaUIFCalculator from '@/components/SouthAfricaUIFCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa UIF Calculator 2025 | Free Unemployment Benefits & Contribution Calculator',
  description: 'Free SA UIF calculator 2025. Calculate UIF contributions, unemployment benefits, maternity pay & retrenchment payouts. 1% contribution rate, R17,712 ceiling. uFiling guide included.',
  keywords: [
    'uif calculator south africa 2025',
    'uif contribution calculator',
    'unemployment benefits calculator SA',
    'uif payout calculator',
    'uif maternity calculator',
    'retrenchment calculator south africa',
    'uif benefits calculator',
    'how much uif will I get',
    'uif claim calculator',
    'unemployment insurance calculator',
    'uif credit days calculator',
    'uif daily rate calculator',
    'ufiling calculator',
    'uif ceiling 2025',
    'uif contribution rate'
  ],
  alternates: {
    canonical: '/south-africa-uif-calculator',
  },
  openGraph: {
    title: 'South Africa UIF Calculator 2025 | Unemployment Benefits Calculator',
    description: '💼 Calculate UIF contributions & benefits! 1% rate, R17,712 ceiling. Unemployment, maternity, retrenchment payouts.',
    url: 'https://genius-insights.co.za/south-africa-uif-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA UIF Calculator 2025 | Unemployment Benefits',
    description: '💼 Calculate UIF contributions & benefits! Unemployment, maternity, retrenchment payouts.',
  },
};

export default function SouthAfricaUIFCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💼 Unemployment Insurance Fund Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                UIF Calculator <br/>
                <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your UIF contributions and unemployment benefits. Find out how much you'll receive
                if retrenched, on maternity leave, or claiming illness benefits.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">1%</div>
                  <div className="text-white/80 text-sm">Contribution Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R17,712</div>
                  <div className="text-white/80 text-sm">Monthly Ceiling</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">365 Days</div>
                  <div className="text-white/80 text-sm">Max Benefit Period</div>
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
          <SouthAfricaUIFCalculator />
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
                  What is UIF?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  The Unemployment Insurance Fund (UIF) provides short-term financial relief to workers who become
                  unemployed, are on maternity/adoption leave, or are unable to work due to illness. Both employers
                  and employees contribute 1% each of the employee's salary.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: '2% Total Contribution', desc: '1% from employee + 1% from employer monthly' },
                    { icon: '📊', title: 'R17,712 Ceiling', desc: 'Maximum monthly earnings for UIF calculation' },
                    { icon: '📅', title: 'Up to 365 Days', desc: 'Maximum benefit period based on credit days' },
                    { icon: '💼', title: 'Multiple Benefits', desc: 'Unemployment, maternity, illness, adoption' }
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
                  UIF Benefit Types
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Unemployment Benefits</h4>
                    <p className="text-sm text-blue-800">For workers who are retrenched, dismissed, or whose contract ended. Up to 365 days based on credits.</p>
                  </div>

                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-semibold text-pink-900 mb-2">Maternity Benefits</h4>
                    <p className="text-sm text-pink-800">Up to 121 days (17.32 weeks) for pregnant women. Claim from 4 weeks before due date.</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Illness Benefits</h4>
                    <p className="text-sm text-green-800">For extended illness preventing work. Medical certificate required. Up to 238 days.</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Adoption Benefits</h4>
                    <p className="text-sm text-purple-800">Up to 121 days for adoptive parents. Same as maternity benefits.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Income Replacement Rate</h4>
                  <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                    <li>• Lower earners: 60% replacement rate</li>
                    <li>• R5,000-R10,000: 50% replacement rate</li>
                    <li>• R10,000-R15,000: 45% replacement rate</li>
                    <li>• Higher earners: 38% replacement rate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How long after losing my job can I claim UIF?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    You must claim within 6 months of becoming unemployed. Register as a work seeker and apply
                    on uFiling (www.ufiling.co.za) or at your nearest Department of Labour office.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How are credit days calculated?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    You earn 1 credit day for every 4 days worked while contributing to UIF. Maximum is 365
                    credit days (about 4 years of continuous employment). Only contributions in the last
                    4 years count.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Can domestic workers claim UIF?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Yes! Since April 2003, domestic workers must be registered for UIF by their employers.
                    They are entitled to the same benefits as other workers.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What documents do I need to claim?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    ID document, UI-19 form from employer, UI-2.7 form (proof of banking), last payslip,
                    service certificate, and appointment letter for new job seekers.
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
