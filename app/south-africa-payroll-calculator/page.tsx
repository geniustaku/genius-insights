import type { Metadata } from 'next';
import SouthAfricaPayrollCalculator from '@/components/SouthAfricaPayrollCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Salary & PAYE Calculator South Africa 2026',
  description: 'Free salary calculator South Africa 2026. Calculate take-home pay after PAYE tax, UIF & pension deductions. Gross to net pay, payslip breakdown for employees & employers.',
  keywords: [
    'salary calculator south africa 2026',
    'PAYE calculator south africa',
    'take home pay calculator south africa',
    'payroll calculator south africa',
    'gross to net salary calculator south africa',
    'net pay calculator south africa',
    'how much PAYE do I pay',
    'UIF calculator south africa',
    'payslip calculator south africa',
    'monthly salary calculator after tax',
    'employer cost calculator south africa',
    'SDL calculator south africa',
    'pension deduction calculator SARS',
    'medical aid tax credit calculator',
    'salary after deductions south africa'
  ],
  alternates: {
    canonical: '/south-africa-payroll-calculator',
  },
  openGraph: {
    title: 'Salary & PAYE Calculator South Africa 2026',
    description: 'Calculate take-home salary after PAYE, UIF & pension deductions. Free gross to net salary calculator for South Africa 2026.',
    url: 'https://genius-insights.co.za/south-africa-payroll-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-payroll-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Payroll Calculator 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary & PAYE Calculator South Africa 2026',
    description: 'Calculate your take-home pay with PAYE, UIF, pension & medical aid deductions. Free SARS-compliant salary calculator.',
    images: ['/images/sa-payroll-calculator-og.jpg'],
  },
};

export default function SouthAfricaPayrollCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💼 SARS-Compliant Payroll Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Salary & PAYE Calculator <br/>
                <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                How much PAYE do I pay? Calculate your take-home salary after PAYE tax, UIF, pension and medical aid deductions.
                Gross to net pay calculator for employees and employers.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">18-45%</div>
                  <div className="text-white/80 text-sm">PAYE Tax Brackets</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">1%</div>
                  <div className="text-white/80 text-sm">UIF Contribution</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R364</div>
                  <div className="text-white/80 text-sm">Medical Tax Credit</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Calculator</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaPayrollCalculator />
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
                  PAYE, UIF & Payslip Deductions Explained
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  South African employees have several statutory and voluntary deductions from their gross salary.
                  Understanding these deductions helps you verify your payslip and plan your finances.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'PAYE (Pay As You Earn)', desc: 'Income tax deducted monthly by employer. Rates: 18-45% based on income brackets.' },
                    { icon: '🛡️', title: 'UIF (Unemployment Insurance)', desc: '1% employee + 1% employer contribution. Capped at R177.12/month per party.' },
                    { icon: '🏥', title: 'Medical Aid Tax Credit', desc: 'R364/month for main member + R246 per dependent. Reduces PAYE liability.' },
                    { icon: '💼', title: 'Pension/Retirement Fund', desc: 'Pre-tax deduction. Reduces taxable income, lowering your PAYE.' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
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
                  South Africa PAYE Tax Brackets 2026/2027
                </h3>

                <div className="space-y-3 mb-8">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R0 - R237,100</span>
                      <span className="text-sm font-bold text-teal-600">18%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R237,101 - R370,500</span>
                      <span className="text-sm font-bold text-teal-600">26%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R370,501 - R512,800</span>
                      <span className="text-sm font-bold text-teal-600">31%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R512,801 - R673,000</span>
                      <span className="text-sm font-bold text-teal-600">36%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R673,001 - R857,900</span>
                      <span className="text-sm font-bold text-teal-600">39%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R857,901 - R1,817,000</span>
                      <span className="text-sm font-bold text-teal-600">41%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">R1,817,001+</span>
                      <span className="text-sm font-bold text-teal-600">45%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-teal-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-900 mb-2">Tax Rebates 2026/2027</h4>
                      <ul className="text-teal-800 text-sm leading-relaxed space-y-1">
                        <li>• Primary rebate: R17,235 (all taxpayers)</li>
                        <li>• Secondary rebate: R9,444 (age 65+)</li>
                        <li>• Tertiary rebate: R3,145 (age 75+)</li>
                        <li>• Medical tax credit: R364/month main + R246/dependent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Contributions Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Employer Statutory Contributions
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🛡️ UIF (Unemployment)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Rate:</strong> 1% of gross salary (employer matches employee's 1%)
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Cap:</strong> R177.12/month per party (based on R17,712 threshold)
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                  <h4 className="font-semibold text-gray-900 mb-3">📚 SDL (Skills Development)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Rate:</strong> 1% of gross payroll (employer only)
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Purpose:</strong> Fund skills development & training initiatives
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💼 Total Employer Cost</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Gross salary + UIF (1%) + SDL (1%) = <strong>~102% of gross</strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    Excludes pension fund matching, provident fund, etc.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Note for Employers:</strong> These are statutory minimums. Many employers also contribute to
                  pension/provident funds (typically 50-100% match), medical aid subsidies, and other benefits.
                </p>
              </div>
            </div>

            {/* Common Payslip Questions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Common Payslip Questions
              </h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Why is my PAYE different each month?</h4>
                  <p className="text-sm text-gray-700">
                    PAYE is calculated on your annualized income. Bonuses, overtime, or backdated increases can push you
                    into a higher tax bracket temporarily, increasing that month's PAYE. It balances out over the year.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I claim back medical aid contributions?</h4>
                  <p className="text-sm text-gray-700">
                    No, you can't claim back the contributions themselves. However, you receive a medical tax credit
                    (R364/month + R246/dependent) that reduces your PAYE. If your employer didn't apply it, claim on your
                    annual tax return.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What happens to my UIF contributions?</h4>
                  <p className="text-sm text-gray-700">
                    UIF provides income protection if you lose your job, are on maternity leave, or sick leave (after sick
                    leave is exhausted). You can claim up to 58% of your salary for up to 12 months (depending on
                    contribution history).
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Should I contribute to a pension fund?</h4>
                  <p className="text-sm text-gray-700">
                    Yes! Pension contributions are pre-tax, reducing your taxable income and PAYE. A R3,000/month pension
                    contribution saves approximately R930-R1,350 in PAYE (depending on bracket), while building retirement
                    savings. It's one of the best tax benefits available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
