import type { Metadata } from 'next';
import SouthAfricaCreditCardCalculator from '@/components/SouthAfricaCreditCardCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Credit Card Calculator 2025 | Credit Card Payoff & Interest Calculator',
  description: 'Free SA credit card calculator 2025. Calculate credit card payoff time, interest charges, minimum vs fixed payments. See how much you can save by paying more.',
  keywords: [
    'credit card calculator south africa 2025',
    'credit card payoff calculator',
    'credit card interest calculator',
    'minimum payment calculator',
    'credit card debt calculator',
    'how long to pay off credit card',
    'credit card balance calculator',
    'fnb credit card calculator',
    'nedbank credit card calculator',
    'standard bank credit card',
    'absa credit card calculator',
    'capitec credit card',
    'credit card interest rate SA',
    'debt payoff calculator'
  ],
  alternates: {
    canonical: '/south-africa-credit-card-calculator',
  },
  openGraph: {
    title: 'South Africa Credit Card Calculator 2025 | Payoff Calculator',
    description: '💳 Calculate credit card payoff! See interest charges, compare payment strategies. Free calculator.',
    url: 'https://genius-insights.co.za/south-africa-credit-card-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Credit Card Calculator 2025',
    description: '💳 Calculate credit card payoff and compare payment strategies.',
  },
};

export default function SouthAfricaCreditCardCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💳 Credit Card Debt Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Credit Card Calculator <br/>
                <span className="bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                See how long it takes to pay off your credit card and how much interest you'll pay.
                Compare minimum payments vs fixed payments to find the best strategy.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">15-27%</div>
                  <div className="text-white/80 text-sm">Interest Rates</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">5%</div>
                  <div className="text-white/80 text-sm">Min Payment</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">55 Days</div>
                  <div className="text-white/80 text-sm">Interest Free</div>
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
          <SouthAfricaCreditCardCalculator />
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
                  Credit Card Interest in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Credit cards charge interest monthly on your outstanding balance. SA credit card rates
                  range from 15% to 27% per year, regulated by the NCR. Understanding how interest works
                  can save you thousands.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📅', title: '55 Days Interest-Free', desc: 'If you pay full balance by due date' },
                    { icon: '💰', title: '15-27% Interest', desc: 'Applied monthly if you carry a balance' },
                    { icon: '⚠️', title: 'Minimum Payment Trap', desc: 'Paying only minimum takes years to clear' },
                    { icon: '📊', title: 'NCR Regulated', desc: 'Interest rates capped by National Credit Regulator' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
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
                  SA Bank Credit Card Rates (2025)
                </h3>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Bank</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Interest Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-4 py-2 text-gray-700">FNB</td><td className="px-4 py-2 text-gray-700">18% - 22%</td></tr>
                      <tr><td className="px-4 py-2 text-gray-700">Standard Bank</td><td className="px-4 py-2 text-gray-700">18% - 21%</td></tr>
                      <tr><td className="px-4 py-2 text-gray-700">ABSA</td><td className="px-4 py-2 text-gray-700">18% - 22%</td></tr>
                      <tr><td className="px-4 py-2 text-gray-700">Nedbank</td><td className="px-4 py-2 text-gray-700">18% - 21%</td></tr>
                      <tr><td className="px-4 py-2 text-gray-700">Capitec</td><td className="px-4 py-2 text-gray-700">17% - 20%</td></tr>
                      <tr><td className="px-4 py-2 text-gray-700">Discovery</td><td className="px-4 py-2 text-gray-700">15% - 19%</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200">
                  <h4 className="font-semibold text-rose-900 mb-2">The Minimum Payment Trap</h4>
                  <p className="text-rose-800 text-sm leading-relaxed">
                    A R25,000 balance at 21% interest with 5% minimum payment takes over 10 years to pay off
                    and costs R20,000+ in interest! Paying just R500 extra per month cuts this to under 3 years.
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
                    How is credit card interest calculated?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Interest is calculated daily on your average daily balance, then charged monthly.
                    If you pay your full balance by the due date, you avoid interest. If not, interest
                    applies to your entire balance including new purchases.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What is the interest-free period?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Most SA credit cards offer 55 days interest-free on purchases. This runs from your
                    statement date to your payment due date. If you pay in full, you pay zero interest.
                    Cash advances never have an interest-free period.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Should I do a balance transfer?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Balance transfers (0% for 6-12 months) can save money if you'll pay off the debt
                    in that period. Watch for transfer fees (usually 2-3%) and revert rates. Only worth
                    it if you stop using the old card and have a payoff plan.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How can I reduce my credit card interest?
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm">
                    Pay more than minimum, pay before due date, negotiate a lower rate with your bank,
                    or consider a personal loan to consolidate (usually lower interest). Never miss
                    payments - late fees and penalty rates make things worse.
                  </p>
                </details>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Struggling With Debt?</h4>
              <p className="text-sm text-red-800">
                If you're only managing minimum payments and debt is growing, consider debt counselling.
                Contact the NCR or a registered debt counsellor for free advice. Debt review can reduce
                payments and protect you from legal action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
