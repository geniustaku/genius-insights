import type { Metadata } from 'next';
import SouthAfricaFreelancerTaxCalculator from '@/components/SouthAfricaFreelancerTaxCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Freelancer & Provisional Tax Calculator 2025 | Free Self-Employed Tax Calculator',
  description: 'Free SA freelancer & provisional tax calculator 2025. Calculate income tax, provisional payments (Aug & Feb), business deductions, retirement contributions. Self-employed, contractors, consultants - SARS-compliant tax tool.',
  keywords: [
    'freelancer tax calculator South Africa 2025',
    'provisional tax calculator SA',
    'self-employed tax calculator',
    'freelance income tax SA',
    'provisional tax payments calculator',
    'contractor tax calculator South Africa',
    'self-employed SARS tax',
    'provisional tax dates SA',
    'freelancer deductions calculator',
    'business expense tax calculator',
    'self-employed retirement contributions',
    'provisional tax penalty calculator',
    'independent contractor tax SA',
    'freelance tax deductions',
    'SARS provisional tax calculator'
  ],
  alternates: {
    canonical: '/south-africa-freelancer-provisional-tax-calculator',
  },
  openGraph: {
    title: 'South Africa Freelancer & Provisional Tax Calculator 2025 | Free Calculator',
    description: '💼 Calculate freelancer income tax & provisional payments! Business deductions, retirement contributions, Aug & Feb payment dates. SARS-compliant.',
    url: 'https://genius-insights.co.za/south-africa-freelancer-provisional-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-freelancer-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Freelancer & Provisional Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Freelancer Tax Calculator 2025 | Provisional Tax & Deductions',
    description: '💼 Calculate self-employed income tax! Provisional payments, business deductions, SARS compliance.',
    images: ['/images/sa-freelancer-tax-calculator-og.jpg'],
  },
};

export default function SouthAfricaFreelancerProvisionalTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💼 Self-Employed Tax Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Freelancer & Provisional Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate income tax, provisional tax payments, and deductions for freelancers, contractors,
                and self-employed individuals. Stay SARS-compliant with accurate tax planning.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Aug & Feb</div>
                  <div className="text-white/80 text-sm">Payment Dates</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">27.5%</div>
                  <div className="text-white/80 text-sm">Max Retirement</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">18-45%</div>
                  <div className="text-white/80 text-sm">Tax Brackets</div>
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaFreelancerTaxCalculator />
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
                  Understanding Provisional Tax in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Provisional tax is a pre-payment system where self-employed individuals, freelancers, and
                  business owners pay their estimated tax twice a year (August and February) instead of once annually.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📅', title: 'Payment Schedule', desc: 'Two payments: End of August and end of February each year' },
                    { icon: '💰', title: 'Who Must Pay', desc: 'Freelancers, contractors, business owners earning >R1M or <80% PAYE' },
                    { icon: '⚠️', title: 'Penalties', desc: '10% interest on underpayments. Always estimate conservatively!' },
                    { icon: '📝', title: 'Deductions', desc: 'Business expenses, retirement (27.5%), medical aid credits reduce tax' }
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
                  Provisional Tax Payment Dates
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">📅 First Provisional Payment</h4>
                    <p className="text-sm text-purple-800 mb-2">
                      <strong>Due:</strong> End of August (31 Aug for companies, 28 Aug for individuals)
                    </p>
                    <p className="text-sm text-purple-700">
                      Based on 50% of previous year's tax or 50% of estimated current year tax (whichever is higher).
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-semibold text-pink-900 mb-2">📅 Second Provisional Payment</h4>
                    <p className="text-sm text-pink-800 mb-2">
                      <strong>Due:</strong> End of February (28/29 Feb for companies and individuals)
                    </p>
                    <p className="text-sm text-pink-700">
                      Balance of estimated annual tax liability. Must be at least 80% of actual tax to avoid penalties.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">📅 Third Payment (Optional)</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Due:</strong> Within 6 months of year-end (e.g., 30 Sep for Feb year-end)
                    </p>
                    <p className="text-sm text-blue-700">
                      Optional "top-up" payment if you underestimated. Avoids penalties if you reach 90% of actual tax.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">Provisional Tax Tips</h4>
                      <ul className="text-purple-800 text-sm leading-relaxed space-y-1">
                        <li>• Set aside 30-40% of income for tax throughout year</li>
                        <li>• Keep detailed records of all business expenses</li>
                        <li>• Maximize retirement contributions (27.5% limit)</li>
                        <li>• Use eFiling for easy provisional tax submissions</li>
                        <li>• Estimate conservatively to avoid penalties</li>
                        <li>• Consider quarterly savings for provisional payments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deductible Expenses Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Tax-Deductible Business Expenses for Freelancers
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💻 Office & Equipment</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Computer & software</li>
                    <li>✓ Office furniture & supplies</li>
                    <li>✓ Internet & phone costs</li>
                    <li>✓ Home office portion (% of rent/bond)</li>
                    <li>✓ Printer, scanner, equipment</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-3">🚗 Travel & Transport</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Business travel (logbook method)</li>
                    <li>✓ Client meeting transport</li>
                    <li>✓ Fuel for business trips</li>
                    <li>✓ Parking & toll fees</li>
                    <li>✓ Vehicle maintenance (business %)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-3">📚 Professional Development</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Courses & training</li>
                    <li>✓ Professional memberships</li>
                    <li>✓ Industry subscriptions</li>
                    <li>✓ Conferences & seminars</li>
                    <li>✓ Books & learning materials</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Expenses must be "wholly and exclusively" for business purposes.
                  Keep receipts, invoices, and records for at least 5 years. Personal expenses are NOT deductible.
                </p>
              </div>
            </div>

            {/* Retirement Contributions Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Retirement Fund Contributions (27.5% Deduction)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">✓ How It Works</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Freelancers can deduct retirement fund contributions up to 27.5% of taxable income,
                    capped at R350,000 per year.
                  </p>
                  <p className="text-sm text-green-800">
                    Example: Earn R500K net income → Max deduction R137,500 (27.5%). At 31% tax bracket,
                    saves R42,625 in tax while building retirement savings!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">📋 Qualifying Retirement Funds</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Retirement Annuity (RA) - most common for freelancers</li>
                    <li>✓ Pension Fund</li>
                    <li>✓ Provident Fund</li>
                    <li>✓ Preservation Fund</li>
                  </ul>
                  <p className="text-xs text-blue-700 mt-3">
                    Note: Tax-free savings accounts (TFSA) do NOT qualify for this deduction.
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
