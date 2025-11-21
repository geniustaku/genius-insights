import type { Metadata } from 'next';
import SouthAfricaPersonalLoanCalculator from '@/components/SouthAfricaPersonalLoanCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa Personal Loan Calculator 2025 | Free Loan Repayment Calculator',
  description: 'Free SA personal loan calculator 2025. Calculate monthly repayments with NCR-compliant fees, initiation fees, service charges. Compare FNB, Standard Bank, ABSA, Capitec loan rates.',
  keywords: [
    'personal loan calculator south africa 2025',
    'loan calculator SA',
    'loan repayment calculator',
    'fnb personal loan calculator',
    'standard bank loan calculator',
    'absa loan calculator',
    'capitec loan calculator',
    'nedbank loan calculator',
    'african bank loan calculator',
    'ncr loan calculator',
    'how much can I borrow',
    'loan interest calculator',
    'monthly loan repayment calculator',
    'unsecured loan calculator',
    'bank loan calculator SA'
  ],
  alternates: {
    canonical: '/south-africa-personal-loan-calculator',
  },
  openGraph: {
    title: 'South Africa Personal Loan Calculator 2025 | Loan Repayment Calculator',
    description: '💰 Calculate personal loan repayments! NCR-compliant fees, compare bank rates. FNB, ABSA, Capitec, Nedbank rates.',
    url: 'https://genius-insights.co.za/south-africa-personal-loan-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Personal Loan Calculator 2025',
    description: '💰 Calculate loan repayments! NCR fees, bank rate comparison. Free calculator.',
  },
};

export default function SouthAfricaPersonalLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">💰 NCR-Compliant Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Personal Loan Calculator <br/>
                <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">South Africa 2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate monthly repayments with accurate NCR fee caps. Compare rates from major SA banks
                including FNB, Standard Bank, ABSA, Nedbank, and Capitec.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">27.5%</div>
                  <div className="text-white/80 text-sm">Max Interest Rate</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R69</div>
                  <div className="text-white/80 text-sm">Max Service Fee</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">84 Months</div>
                  <div className="text-white/80 text-sm">Max Term</div>
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
          <SouthAfricaPersonalLoanCalculator />
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
                  Personal Loans in South Africa
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Personal loans (unsecured loans) are regulated by the National Credit Regulator (NCR).
                  Interest rates, fees, and charges are capped to protect consumers. Always compare
                  quotes from multiple lenders before committing.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📊', title: 'NCR Regulated', desc: 'All fees and rates capped by National Credit Regulator' },
                    { icon: '💰', title: 'Up to R350,000', desc: 'Typical maximum loan amount at major banks' },
                    { icon: '⏱️', title: 'Up to 84 Months', desc: 'Maximum repayment term (7 years)' },
                    { icon: '📝', title: 'No Collateral', desc: 'Unsecured loans - no asset required as security' }
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
                  Loan Requirements
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Basic Requirements</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• SA citizen or permanent resident</li>
                      <li>• 18 years or older</li>
                      <li>• Regular income (employed or self-employed)</li>
                      <li>• Bank account in your name</li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-semibold text-pink-900 mb-2">Documents Needed</h4>
                    <ul className="text-sm text-pink-800 space-y-1">
                      <li>• SA ID or passport</li>
                      <li>• Proof of income (3 months payslips)</li>
                      <li>• 3 months bank statements</li>
                      <li>• Proof of residence</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Tips to Get Approved</h4>
                  <ul className="text-purple-800 text-sm leading-relaxed space-y-1">
                    <li>• Check credit score before applying</li>
                    <li>• Clear any defaults or judgments</li>
                    <li>• Reduce existing debt first</li>
                    <li>• Apply for an amount you can afford</li>
                    <li>• Compare multiple lenders</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Warning: Responsible Borrowing</h4>
              <p className="text-sm text-red-800">
                Only borrow what you can afford to repay. Missing payments will damage your credit score
                and may result in legal action. If you're struggling with debt, contact a debt counsellor
                for free advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
