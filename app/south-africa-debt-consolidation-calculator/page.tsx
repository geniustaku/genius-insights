import type { Metadata } from 'next';
import SouthAfricaDebtConsolidationCalculator from '@/components/SouthAfricaDebtConsolidationCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';
import RelatedCalculators from '@/components/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator SA 2026 | Save',
  description: 'Should I consolidate my debt? Free SA calculator compares your credit cards, store accounts & loans vs one consolidation loan. See how much you save monthly. Debt review vs consolidation.',
  keywords: [
    'debt consolidation calculator south africa',
    'consolidate my debt south africa',
    'debt consolidation loan south africa',
    'debt review vs debt consolidation',
    'how to consolidate debt south africa',
    'credit card debt consolidation SA',
    'store account consolidation calculator',
    'debt consolidation calculator with interest',
    'combine debts into one payment SA',
    'debt payoff calculator south africa',
    'debt relief calculator south africa',
    'reduce monthly debt payments calculator',
    'debt review calculator south africa',
    'consolidation loan interest rates SA 2026',
    'is debt consolidation worth it south africa',
    'best debt consolidation loans south africa',
    'debt management calculator south africa'
  ],
  alternates: {
    canonical: '/south-africa-debt-consolidation-calculator',
  },
  openGraph: {
    title: 'Debt Consolidation Calculator SA 2026 | Save',
    description: 'Should I consolidate my debt? Compare multiple debts vs one loan. See monthly savings, interest reduction & payoff time. Free SA calculator.',
    url: 'https://genius-insights.co.za/south-africa-debt-consolidation-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Debt+Consolidation+Calculator+SA+2026&subtitle=Compare+%26+Save+on+Monthly+Payments',
        width: 1200,
        height: 630,
        alt: 'Debt Consolidation Calculator South Africa 2026 - Compare & Save',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator SA 2026 | Save',
    description: 'Should I consolidate my debt? Compare credit cards, store accounts & loans vs one payment. See your monthly savings.',
    images: ['/api/og?title=Debt+Consolidation+Calculator+SA+2026&subtitle=Compare+%26+Save+on+Monthly+Payments'],
  },
};

export default function SouthAfricaDebtConsolidationCalculatorPage() {
  return (
    <>
      <StructuredData
        type="loan-calculator"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.genius-insights.co.za' },
          { name: 'Calculators', url: 'https://www.genius-insights.co.za/calculators' },
          { name: 'Debt Consolidation Calculator', url: 'https://www.genius-insights.co.za/south-africa-debt-consolidation-calculator' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💳 Simplify Your Debt & Save Money</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Debt Consolidation Calculator <br/>
                <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">South Africa 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Should I consolidate my debt? Compare your credit cards, store accounts and personal loans
                against one consolidation loan. See how much you can save on monthly payments and total interest.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">30-50%</div>
                  <div className="text-white/80 text-sm">Typical Payment Reduction</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">14-18%</div>
                  <div className="text-white/80 text-sm">Consolidation Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">1 Payment</div>
                  <div className="text-white/80 text-sm">vs. Multiple Debts</div>
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
          <SouthAfricaDebtConsolidationCalculator />
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
                  How to Consolidate Debt in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Debt consolidation combines your credit cards, store accounts and personal loans into
                  one single payment with a lower interest rate. Use our calculator above to see if
                  consolidation will save you money each month.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '💰', title: 'Lower Interest Rate', desc: 'Reduce from 20-24% credit card rates to 14-18% consolidation loan' },
                    { icon: '📉', title: 'Single Monthly Payment', desc: 'Simplify finances - one payment instead of juggling multiple debts' },
                    { icon: '⏱️', title: 'Fixed Repayment Term', desc: 'Clear payoff date (3-7 years) vs. revolving credit card debt' },
                    { icon: '✓', title: 'Improve Credit Score', desc: 'On-time payments and lower credit utilization boost credit rating' }
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
                  Is Debt Consolidation Worth It in SA?
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">✓ Good Reasons to Consolidate</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Multiple high-interest debts (&gt;20% p.a.)</li>
                      <li>• Struggling to keep track of payments</li>
                      <li>• Good credit score (qualify for lower rate)</li>
                      <li>• Stable income to afford new payment</li>
                      <li>• Committed to not accumulating new debt</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">✕ Bad Reasons to Consolidate</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Just to free up credit cards to spend more</li>
                      <li>• Consolidation rate higher than current average</li>
                      <li>• Can't afford the new monthly payment</li>
                      <li>• Haven't addressed overspending habits</li>
                      <li>• Near end of current debt payoff anyway</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Consolidation Tips</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Shop around - compare 3+ lenders for best rate</li>
                        <li>• Avoid new debt after consolidating</li>
                        <li>• Consider shorter term to save on interest</li>
                        <li>• Check for early settlement penalties</li>
                        <li>• Ensure monthly payment fits your budget</li>
                        <li>• Read the fine print - watch for hidden fees</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Debt Consolidation vs. Debt Review in South Africa
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-3">💳 Debt Consolidation</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Take out a new loan to pay off existing debts. You remain in control of your finances.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ No credit record flag</li>
                    <li>✓ Keep control of your accounts</li>
                    <li>✓ Can still apply for new credit</li>
                    <li>✓ Faster process (days to weeks)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 Debt Review (Counseling)</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Legal process under National Credit Act. Debt counselor negotiates with creditors.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Flagged as "under debt review"</li>
                    <li>• Cannot apply for new credit</li>
                    <li>• Must complete full program</li>
                    <li>• Takes 3-5 years typically</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Only consider debt consolidation if you can afford the new payment and
                  commit to not accumulating new debt. If you're over-indebted (spending more than you earn), consider
                  debt counseling or financial advice from a registered debt counselor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <RelatedCalculators currentSlug="south-africa-debt-consolidation-calculator" />
        </div>
      </div>
    </>
  );
}
