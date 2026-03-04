import type { Metadata } from 'next';
import SouthAfricaPensionCalculator from '@/components/SouthAfricaPensionCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Pension Fund Calculator SA 2026 | Tax Savings',
  description: 'How much pension will I get in South Africa? Free pension calculator with 27.5% tax deduction, two-pot system, RA and provident fund projections for 2026.',
  keywords: [
    'pension calculator south africa 2026',
    'how much pension will I get south africa',
    'pension fund contribution calculator SA',
    'retirement annuity calculator south africa',
    'provident fund calculator south africa',
    '27.5 percent pension tax deduction',
    'two-pot retirement system calculator',
    'pension fund growth calculator',
    'retirement savings calculator south africa',
    'pension tax savings calculator SA',
    'how much should I contribute to pension',
    'pension fund vs provident fund south africa',
    'RA calculator south africa 2026',
    'R350000 pension cap calculator'
  ],
  alternates: {
    canonical: '/south-africa-pension-calculator',
  },
  openGraph: {
    title: 'Pension Fund Calculator SA 2026 | Tax Savings',
    description: 'How much pension will I get? Calculate pension fund growth, 27.5% tax deduction and two-pot system projections.',
    url: 'https://genius-insights.co.za/south-africa-pension-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pension Fund Calculator SA 2026 | Tax Savings',
    description: 'How much pension will I get? Calculate contributions, tax savings and retirement fund growth with 2026 rates.',
  },
};

export default function SouthAfricaPensionCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏦 Retirement Planning Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                How Much Pension Will I Get <br/>
                <span className="bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">in South Africa? (2026)</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your pension fund growth with the 27.5% tax deduction. Project your retirement
                annuity, pension fund or provident fund value including the two-pot system.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">27.5%</div>
                  <div className="text-white/80 text-sm">Tax Deductible</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R350K</div>
                  <div className="text-white/80 text-sm">Annual Cap</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R550K</div>
                  <div className="text-white/80 text-sm">Tax-Free Lump Sum</div>
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
          <SouthAfricaPensionCalculator />
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
                  Pension Fund Tax Benefits in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  South Africa allows a 27.5% tax deduction on pension contributions (capped at R350,000/year).
                  Your pension, provident, or RA fund grows tax-free until retirement.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: '27.5% Tax Deduction', desc: 'Contributions are tax deductible up to 27.5% of salary' },
                    { icon: '📈', title: 'Tax-Free Growth', desc: 'Investment growth is not taxed within the fund' },
                    { icon: '🎁', title: 'R550K Tax-Free', desc: 'First R550,000 lump sum at retirement is tax-free' },
                    { icon: '🔒', title: 'Protected Savings', desc: 'Retirement funds protected from creditors' }
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
                  Retirement Fund Options
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 mb-2">Pension Fund</h4>
                    <p className="text-sm text-teal-800">Employer-sponsored. At retirement: 1/3 lump sum (R550K tax-free), 2/3 must buy annuity.</p>
                  </div>

                  <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <h4 className="font-semibold text-cyan-900 mb-2">Provident Fund</h4>
                    <p className="text-sm text-cyan-800">Similar to pension. Pre-2021 contributions can be taken as full lump sum. New contributions follow pension rules.</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Retirement Annuity (RA)</h4>
                    <p className="text-sm text-blue-800">Personal fund for self-employed or additional savings. Same tax benefits. Can't access before 55.</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
                  <h4 className="font-semibold text-teal-900 mb-2">The Power of Starting Early</h4>
                  <p className="text-teal-800 text-sm leading-relaxed">
                    R1,000/month from age 25 → R6.8M at 65 (at 10% return)<br/>
                    R1,000/month from age 35 → R2.3M at 65 (at 10% return)<br/>
                    <strong>10 years earlier = 3x more money!</strong>
                  </p>
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
                    How much should I contribute to my pension?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Financial advisors recommend 15% of your salary. The minimum to get full tax benefit is
                    whatever reaches the 27.5% cap. Start as early as possible - compound interest is your friend.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Can I access my pension before retirement?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    You can access your pension fund if you resign, are retrenched, or emigrate. However, early
                    withdrawal is heavily taxed. Retirement annuities cannot be accessed before age 55.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What is the two-pot retirement system?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    From September 2024, new contributions split into: Savings pot (1/3) - accessible once per year,
                    and Retirement pot (2/3) - preserved until retirement. Minimum withdrawal R2,000.
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
