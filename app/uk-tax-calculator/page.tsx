import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'UK Tax Calculator 2025/26 | HMRC Income Tax & National Insurance Calculator',
  description: 'Free UK tax calculator for 2025/26 tax year. Calculate HMRC income tax, National Insurance, student loan repayments. Updated with latest UK tax rates, allowances & brackets.',
  keywords: [
    'UK tax calculator 2025', 'HMRC tax calculator', 'UK income tax calculator', 'National Insurance calculator UK', 'UK tax calculator 2025/26', 'UK tax rates', 'HMRC PAYE calculator', 'income tax UK', 'UK tax brackets 2025', 'UK tax allowances', 'student loan calculator UK', 'payroll tax UK', 'tax year 2025/26 UK', 'HMRC income tax rates'
  ],
  alternates: {
    canonical: '/uk-tax-calculator',
  },
  openGraph: {
    title: 'UK Tax Calculator 2025/26 | Free HMRC PAYE Calculator',
    description: '💰 Calculate your exact UK tax! Updated 2025/26 HMRC rates, allowances & National Insurance. Free PAYE calculator used by thousands of UK taxpayers.',
    url: 'https://genius-insights.co.za/uk-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/uk-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'UK Tax Calculator 2025/26 - HMRC PAYE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Tax Calculator 2025/26 | HMRC PAYE Calculator',
    description: '💰 Free UK tax calculator! Calculate HMRC income tax, National Insurance with 2025/26 rates.',
    images: ['/images/uk-tax-calculator-og.jpg'],
  },
};

const ukTaxBrackets = [
  { min: 0, max: 12570, rate: 0 },        // Personal allowance
  { min: 12571, max: 50270, rate: 0.2 },  // Basic rate
  { min: 50271, max: 125140, rate: 0.4 }, // Higher rate  
  { min: 125141, max: Infinity, rate: 0.45 } // Additional rate
];

const ukAllowances = [
  "Personal Allowance: £12,570 (tax-free)",
  "Basic Rate: 20% on income £12,571 - £50,270", 
  "Higher Rate: 40% on income £50,271 - £125,140",
  "Additional Rate: 45% on income over £125,140",
  "National Insurance: 12% (£12,571-£50,270), 2% (over £50,270)"
];

export default function UKTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 2025/26 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                UK Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025/26</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact HMRC income tax, National Insurance, and student loan repayments with the latest 2025/26 UK tax rates, 
                allowances, and brackets.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025/26</div>
                  <div className="text-white/80 text-sm">Tax Year</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">HMRC</div>
                  <div className="text-white/80 text-sm">Compliant</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">£12,570</div>
                  <div className="text-white/80 text-sm">Tax Allowance</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Always</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Universal Tax Calculator */}
        <UniversalTaxCalculator 
          country="UK"
          currency="GBP"
          currencySymbol="£"
          taxBrackets={ukTaxBrackets}
          allowances={ukAllowances}
          taxAuthority="HMRC"
          colorScheme="from-blue-600 to-indigo-600"
        />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025/26 UK Tax Updates
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Our calculator includes the latest HMRC tax rates, allowances, and National Insurance contributions 
                  for the 2025/26 tax year.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🇬🇧', title: 'HMRC Compliant', desc: 'Official 2025/26 UK tax rates and allowances' },
                    { icon: '💰', title: 'All Deductions', desc: 'Income tax, National Insurance, student loans' },
                    { icon: '🎯', title: 'Personal Allowance', desc: '£12,570 tax-free allowance (2025/26)' },
                    { icon: '📊', title: 'Multiple Plans', desc: 'All student loan plans and pension schemes' }
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
                  2025/26 UK Tax Rates
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Income Tax Bands</h4>
                    {[
                      { bracket: '£0 - £12,570', rate: '0%', color: 'bg-green-500' },
                      { bracket: '£12,571 - £50,270', rate: '20%', color: 'bg-yellow-500' },
                      { bracket: '£50,271 - £125,140', rate: '40%', color: 'bg-orange-500' },
                      { bracket: '£125,141+', rate: '45%', color: 'bg-red-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-700">{item.bracket}</span>
                        <span className="font-bold text-gray-900">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">National Insurance (Class 1)</h4>
                    {[
                      { bracket: '£0 - £12,570', rate: '0%' },
                      { bracket: '£12,571 - £50,270', rate: '12%' },
                      { bracket: '£50,271+', rate: '2%' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-700">{item.bracket}</span>
                        <span className="font-bold text-gray-900">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Key Allowances 2025/26</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Personal allowance: £12,570</li>
                        <li>• Higher rate threshold: £50,270</li>
                        <li>• NI lower earnings limit: £12,570</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}