import type { Metadata } from 'next';
import SouthAfricaGratuityCalculator from '@/components/SouthAfricaGratuityCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Gratuity Calculator 2025 | Severance Pay & Retrenchment Calculator',
  description: 'Free SA gratuity calculator 2025. Calculate severance pay, retrenchment packages, end-of-service benefits. BCEA minimum severance, tax on lump sum payments.',
  keywords: [
    'gratuity calculator south africa 2025',
    'severance pay calculator SA',
    'retrenchment calculator',
    'end of service calculator',
    'bcea severance pay',
    'retrenchment package calculator',
    'how much severance pay',
    'voluntary retrenchment calculator',
    'golden handshake calculator',
    'retirement payout calculator',
    'resignation payout',
    'service bonus calculator',
    'termination pay calculator'
  ],
  alternates: {
    canonical: '/south-africa-gratuity-calculator',
  },
  openGraph: {
    title: 'South Africa Gratuity Calculator 2025 | Severance Pay Calculator',
    description: '💼 Calculate severance & retrenchment pay! BCEA minimum, tax implications. Free calculator.',
    url: 'https://genius-insights.co.za/south-africa-gratuity-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Gratuity Calculator 2025',
    description: '💼 Calculate severance pay and retrenchment packages with tax implications.',
  },
};

export default function SouthAfricaGratuityCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💼 Severance & End-of-Service</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Gratuity Calculator <br/>
                <span className="bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your severance package, retrenchment pay, or end-of-service gratuity.
                Understand BCEA minimums and tax implications.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">1 Week</div>
                  <div className="text-white/80 text-sm">Per Year (BCEA)</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R550K</div>
                  <div className="text-white/80 text-sm">Tax-Free</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">7 Days</div>
                  <div className="text-white/80 text-sm">Payment Window</div>
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
          <SouthAfricaGratuityCalculator />
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
                  Severance Pay in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  The Basic Conditions of Employment Act (BCEA) sets minimum severance pay for retrenchment.
                  Gratuity is only legally required in retrenchment - other payouts depend on your contract.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📋', title: 'BCEA Minimum', desc: '1 week pay per completed year of service' },
                    { icon: '💰', title: 'Tax-Free R550K', desc: 'First R550,000 of retrenchment is tax-free' },
                    { icon: '⏰', title: '7 Day Payment', desc: 'Severance must be paid within 7 days' },
                    { icon: '📝', title: 'Contract Terms', desc: 'Your contract may offer better terms' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
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
                  Types of End-of-Service Pay
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                    <h4 className="font-semibold text-violet-900 mb-2">Retrenchment Severance</h4>
                    <p className="text-sm text-violet-800">BCEA minimum: 1 week per year. Many employers offer 2 weeks or more. Tax-free up to R550,000.</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Voluntary Retrenchment</h4>
                    <p className="text-sm text-purple-800">Often more generous packages to encourage voluntary exits. Same tax treatment as retrenchment.</p>
                  </div>

                  <div className="bg-fuchsia-50 rounded-lg p-4 border border-fuchsia-200">
                    <h4 className="font-semibold text-fuchsia-900 mb-2">Resignation</h4>
                    <p className="text-sm text-fuchsia-800">No legal entitlement to severance. Only receive accrued leave payout. Taxed as income.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
                  <h4 className="font-semibold text-violet-900 mb-2">Pension Fund Impact</h4>
                  <p className="text-violet-800 text-sm leading-relaxed">
                    Pension/provident fund withdrawals are separate from severance. Consider preserving
                    funds for better tax treatment. Withdrawal rules changed with two-pot system in 2024.
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
                    Can I negotiate a better severance package?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Yes! The BCEA sets minimums, not maximums. Many employees negotiate 2-4 weeks per year,
                    especially for senior positions or long service. Consider getting advice from a labour lawyer.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What if I refuse retrenchment?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    You cannot be forced to accept voluntary retrenchment. However, if it's a genuine
                    operational requirement (Section 189), refusal may result in dismissal with severance anyway.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Do I get UIF on top of severance?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Yes! UIF is separate from severance. You can claim UIF benefits (up to 365 days based on
                    credits) in addition to your retrenchment package.
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
