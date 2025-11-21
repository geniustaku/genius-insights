import type { Metadata } from 'next';
import SouthAfricaTaxRefundCalculator from '@/components/SouthAfricaTaxRefundCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Tax Refund Calculator 2025 | SARS eFiling Refund Estimator',
  description: 'Free SA tax refund calculator 2025. Estimate your SARS refund with deductions, rebates, medical credits. Check if you owe SARS or get money back. 2024/2025 tax year.',
  keywords: [
    'tax refund calculator south africa 2025',
    'sars refund calculator',
    'tax back calculator SA',
    'efiling refund calculator',
    'income tax refund calculator',
    'how much tax refund will I get',
    'sars tax calculator 2025',
    'tax return calculator',
    'paye refund calculator',
    'medical aid tax credit calculator',
    'retirement contribution tax deduction',
    'tax rebate calculator',
    'am I owed tax back',
    'sars owes me money'
  ],
  alternates: {
    canonical: '/south-africa-tax-refund-calculator',
  },
  openGraph: {
    title: 'South Africa Tax Refund Calculator 2025 | SARS Refund Estimator',
    description: '💵 Check your SARS refund! Calculate tax back with deductions & rebates. Free tax refund calculator.',
    url: 'https://genius-insights.co.za/south-africa-tax-refund-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Tax Refund Calculator 2025',
    description: '💵 Check your SARS refund! Calculate tax back with all deductions included.',
  },
};

export default function SouthAfricaTaxRefundCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💵 SARS Tax Refund Estimator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Tax Refund Calculator <br/>
                <span className="bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Estimate your SARS tax refund or amount owing. Include retirement contributions,
                medical aid credits, and other deductions for accurate results.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R17,235</div>
                  <div className="text-white/80 text-sm">Primary Rebate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R364/pm</div>
                  <div className="text-white/80 text-sm">Medical Credit</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">27.5%</div>
                  <div className="text-white/80 text-sm">Pension Deduction</div>
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
          <SouthAfricaTaxRefundCalculator />
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
                  How Tax Refunds Work
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Your employer deducts PAYE (Pay As You Earn) from your salary monthly based on estimated
                  tax. When you file your tax return, SARS calculates your actual tax. If you overpaid,
                  you get a refund. If you underpaid, you owe SARS.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📝', title: 'File Your Return', desc: 'Submit IRP5 and deductions on eFiling or SARS MobiApp' },
                    { icon: '🧮', title: 'SARS Calculates', desc: 'Your actual tax is calculated with all deductions' },
                    { icon: '💰', title: 'Refund or Owing', desc: 'Difference between tax paid and tax owed' },
                    { icon: '🏦', title: 'Get Paid', desc: 'Refunds usually paid within 72 hours if no audit' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl">
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
                  Common Deductions
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-2">Retirement Contributions</h4>
                    <p className="text-sm text-emerald-800">Up to 27.5% of salary (max R350,000/year) for pension, provident, and RA funds.</p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 mb-2">Medical Aid Credits</h4>
                    <p className="text-sm text-teal-800">R364/month for main member, R364 for first dependent, R246 for each additional.</p>
                  </div>

                  <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <h4 className="font-semibold text-cyan-900 mb-2">Travel Allowance</h4>
                    <p className="text-sm text-cyan-800">Claim R4.64/km for business travel if you have travel allowance and keep a logbook.</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Home Office</h4>
                    <p className="text-sm text-blue-800">R25/day worked from home (simplified method) or actual costs if dedicated office.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">2025 Filing Deadlines</h4>
                  <ul className="text-emerald-800 text-sm leading-relaxed space-y-1">
                    <li>• <strong>Auto Assessment:</strong> Accept by 21 Oct 2025</li>
                    <li>• <strong>Non-Provisional:</strong> 21 Oct 2025 (eFiling)</li>
                    <li>• <strong>Provisional:</strong> 20 Jan 2026 (eFiling)</li>
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
                    How long until I get my refund?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    SARS aims to pay refunds within 72 hours of assessment if your return is not selected
                    for verification. Audited returns can take 21 business days or longer.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What if I owe SARS money?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    You must pay within the due date shown on your assessment. Late payment incurs interest
                    and penalties. You can request a payment plan through eFiling if needed.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Do I need to file if I only have one employer?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    If you earn under R500,000 from one employer with no other income or deductions,
                    you may not need to file. Check if you can accept an auto-assessment instead.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What documents do I need?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    IRP5 from employer(s), retirement fund certificate (IT3a), medical aid certificate,
                    logbook for travel claims, bank statements for interest earned.
                  </p>
                </details>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Notice</h4>
              <p className="text-sm text-yellow-800">
                This calculator provides an estimate only. Your actual assessment from SARS may differ
                based on additional factors. Consult a tax practitioner for complex tax situations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
