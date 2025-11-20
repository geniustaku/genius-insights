import type { Metadata } from 'next';
import SouthAfricaVATCalculator from '@/components/SouthAfricaVATCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa VAT Calculator 2025 | Free 15% VAT Calculator - Add & Remove VAT',
  description: 'Free SA VAT calculator 2025. Calculate 15% VAT on purchases and sales. Add VAT to prices or remove VAT from totals. Includes VAT registration guide, zero-rated items, SARS compliance tips.',
  keywords: [
    'vat calculator south africa 2025',
    'vat calculator 15%',
    'add vat calculator',
    'remove vat calculator',
    'vat calculator with total',
    'calculate vat south africa',
    'vat inclusive calculator',
    'vat exclusive calculator',
    'sars vat calculator',
    'vat registration calculator',
    'vat threshold south africa',
    'zero rated vat items',
    'vat on purchases',
    'vat exempt items SA',
    'value added tax calculator'
  ],
  alternates: {
    canonical: '/south-africa-vat-calculator-2025',
  },
  openGraph: {
    title: 'South Africa VAT Calculator 2025 | Free 15% VAT Calculator',
    description: '💰 Calculate 15% VAT instantly! Add VAT to prices or remove VAT from totals. SARS-compliant calculator with registration guide.',
    url: 'https://genius-insights.co.za/south-africa-vat-calculator-2025',
    type: 'website',
    images: [
      {
        url: '/images/sa-vat-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa VAT Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA VAT Calculator 2025 | Add & Remove 15% VAT',
    description: '💰 Calculate VAT instantly! Add/remove 15% VAT. SARS-compliant with registration guide.',
    images: ['/images/sa-vat-calculator-og.jpg'],
  },
};

export default function SouthAfricaVATCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💰 Value-Added Tax Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                VAT Calculator <br/>
                <span className="bg-gradient-to-r from-green-200 to-teal-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate 15% VAT on purchases and sales. Add VAT to prices or remove VAT from totals
                with our free SARS-compliant calculator. Includes VAT registration guide.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">15%</div>
                  <div className="text-white/80 text-sm">VAT Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R1M</div>
                  <div className="text-white/80 text-sm">Registration Threshold</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2 Months</div>
                  <div className="text-white/80 text-sm">Filing Period</div>
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-teal-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
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
          <SouthAfricaVATCalculator />
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
                  What is VAT in South Africa?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Value-Added Tax (VAT) is a consumption tax levied on most goods and services sold in South Africa.
                  The current rate is 15%, increased from 14% in April 2018. VAT is collected by businesses and
                  paid to SARS (South African Revenue Service).
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: '15% Standard Rate', desc: 'Applied to most goods and services in SA since April 2018' },
                    { icon: '📊', title: 'Zero-Rated Items', desc: 'Basic foods, exports, international transport (0% VAT)' },
                    { icon: '🏦', title: 'VAT Registration', desc: 'Mandatory if taxable turnover exceeds R1 million/year' },
                    { icon: '📅', title: 'Bi-Monthly Returns', desc: 'VAT201 returns submitted every 2 months to SARS' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-xl">
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
                  How to Calculate VAT
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Add VAT (Excl → Incl)</h4>
                    <p className="text-sm text-gray-600 mb-2">Multiply base amount by 1.15</p>
                    <p className="text-xs font-mono text-emerald-600">R1,000 × 1.15 = R1,150</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Remove VAT (Incl → Excl)</h4>
                    <p className="text-sm text-gray-600 mb-2">Divide total by 1.15</p>
                    <p className="text-xs font-mono text-blue-600">R1,150 ÷ 1.15 = R1,000</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Calculate VAT Amount</h4>
                    <p className="text-sm text-gray-600 mb-2">Multiply base by 0.15 (15%)</p>
                    <p className="text-xs font-mono text-purple-600">R1,000 × 0.15 = R150</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Extract VAT from Total</h4>
                    <p className="text-sm text-gray-600 mb-2">Total minus (Total ÷ 1.15)</p>
                    <p className="text-xs font-mono text-orange-600">R1,150 - (R1,150 ÷ 1.15) = R150</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-emerald-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">VAT Quick Tips</h4>
                      <ul className="text-emerald-800 text-sm leading-relaxed space-y-1">
                        <li>• Always display prices VAT-inclusive for consumers (B2C)</li>
                        <li>• Issue valid tax invoices with VAT number</li>
                        <li>• Submit VAT201 returns by 25th of following month</li>
                        <li>• Keep records & invoices for 5 years</li>
                        <li>• Claim input VAT on business expenses</li>
                        <li>• Register voluntarily if turnover &gt; R50K/year</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VAT History in SA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                VAT Rate History in South Africa
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">1991-1993</h4>
                  <p className="text-3xl font-bold text-blue-600">10%</p>
                  <p className="text-sm text-gray-600 mt-2">VAT introduced (replacing GST)</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-2">1993-2018</h4>
                  <p className="text-3xl font-bold text-purple-600">14%</p>
                  <p className="text-sm text-gray-600 mt-2">Increased to 14% (April 1993)</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
                  <h4 className="font-semibold text-gray-900 mb-2">2018-Present</h4>
                  <p className="text-3xl font-bold text-emerald-600">15%</p>
                  <p className="text-sm text-gray-600 mt-2">Current rate (1 April 2018)</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Future</h4>
                  <p className="text-3xl font-bold text-orange-600">15%</p>
                  <p className="text-sm text-gray-600 mt-2">No changes announced (2025)</p>
                </div>
              </div>
            </div>

            {/* Common VAT Questions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Common VAT Questions
              </h3>
              <div className="space-y-4">
                <details className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    When must I register for VAT?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    You must register for VAT if your taxable turnover exceeds or is likely to exceed R1 million
                    in any consecutive 12-month period. You can register voluntarily if turnover exceeds R50,000/year.
                    Apply via SARS eFiling using the VAT101 form.
                  </p>
                </details>

                <details className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What items are zero-rated for VAT?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Zero-rated items attract 0% VAT and include: brown bread, maize meal, samp, beans, lentils,
                    rice, vegetables, fruit, milk, eggs, vegetable oil, milk powder, pilchards, sardines, exports,
                    and international passenger transport. Zero-rated means businesses can claim input VAT.
                  </p>
                </details>

                <details className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What's the difference between zero-rated and exempt?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Zero-rated (0% VAT): You can claim input VAT on related expenses. Exempt: No output VAT charged,
                    but you cannot claim input VAT. Exempt items include financial services, residential rent,
                    educational services, and public transport.
                  </p>
                </details>

                <details className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How often must I submit VAT returns?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Most VAT vendors submit bi-monthly (every 2 months). Payment is due by the 25th of the month
                    following the VAT period end. Large vendors (turnover &gt;R30M) may be on monthly filing category.
                    Returns are submitted via SARS eFiling using the VAT201 form.
                  </p>
                </details>

                <details className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What happens if I don't register for VAT when required?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Non-compliance can result in penalties up to 200% of the tax owed, plus interest at 10.25%/year.
                    SARS can also initiate criminal proceedings. You must register within 21 days of exceeding the
                    R1 million threshold. Backdated VAT liabilities may apply.
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
