import type { Metadata } from 'next';
import UniversalTaxCalculator from '@/components/UniversalTaxCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Singapore Tax Calculator 2025 | IRAS Income Tax Calculator',
  description: 'Free Singapore tax calculator for 2025. Calculate IRAS income tax, CPF contributions accurately with latest tax rates and brackets.',
  keywords: [
    'singapore tax calculator 2025', 'singapore income tax calculator', 'IRAS tax calculator', 'singapore tax rates 2025', 'payroll tax Singapore', 'singapore income tax brackets', 'IRAS calculator', 'singapore tax brackets 2025', 'singapore personal income tax', 'singapore resident tax rates'
  ],
  alternates: {
    canonical: '/singapore-tax-calculator',
  },
  openGraph: {
    title: 'Singapore Tax Calculator 2025 | Free IRAS Calculator',
    description: '💰 Calculate your exact Singapore tax! Updated 2025 IRAS rates, brackets & CPF contributions. Free tax calculator used by thousands of Singapore residents.',
    url: 'https://genius-insights.co.za/singapore-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/singapore-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Singapore Tax Calculator 2025 - IRAS Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore Tax Calculator 2025 | IRAS Calculator',
    description: '💰 Free Singapore tax calculator! Calculate IRAS income tax with 2025 rates.',
    images: ['/images/singapore-tax-calculator-og.jpg'],
  },
};

const singaporeTaxBrackets = [
  { min: 0, max: 20000, rate: 0 },        // 0% on first S$20,000
  { min: 20001, max: 30000, rate: 0.02 }, // 2% on next S$10,000
  { min: 30001, max: 40000, rate: 0.035 }, // 3.5% on next S$10,000
  { min: 40001, max: 80000, rate: 0.07 },  // 7% on next S$40,000
  { min: 80001, max: 120000, rate: 0.115 }, // 11.5% on next S$40,000
  { min: 120001, max: 160000, rate: 0.15 }, // 15% on next S$40,000
  { min: 160001, max: 200000, rate: 0.18 }, // 18% on next S$40,000
  { min: 200001, max: 240000, rate: 0.19 }, // 19% on next S$40,000
  { min: 240001, max: 280000, rate: 0.195 }, // 19.5% on next S$40,000
  { min: 280001, max: 320000, rate: 0.20 }, // 20% on next S$40,000
  { min: 320001, max: Infinity, rate: 0.22 } // 22% on income above S$320,000
];

const singaporeAllowances = [
  "Tax Exemption: S$20,000 (first S$20,000 is tax-free)",
  "Personal Relief: Up to S$9,000 for Singapore citizens/PRs",
  "Spouse Relief: Up to S$2,000",
  "Child Relief: S$4,000 per child",
  "Working Mother's Child Relief: 15% of mother's earned income",
  "Parent Relief: Up to S$9,000 per parent",
  "CPF Relief: Voluntary contributions eligible for relief"
];

export default function SingaporeTaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-blue-600 to-purple-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇸🇬 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Singapore Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact IRAS income tax with the latest 2025 Singapore tax rates, 
                brackets, and personal reliefs.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025</div>
                  <div className="text-white/80 text-sm">Tax Year</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">IRAS</div>
                  <div className="text-white/80 text-sm">Compliant</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">S$20,000</div>
                  <div className="text-white/80 text-sm">Tax Free</div>
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
          country="Singapore"
          currency="SGD"
          currencySymbol="S$"
          taxBrackets={singaporeTaxBrackets}
          allowances={singaporeAllowances}
          taxAuthority="IRAS"
          colorScheme="from-red-600 to-blue-600"
        />

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 Singapore Tax Updates
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Our calculator includes the latest IRAS tax rates, brackets, and personal reliefs 
                  for the 2025 tax year in Singapore.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🇸🇬', title: 'IRAS Compliant', desc: 'Official 2025 Singapore tax rates and brackets' },
                    { icon: '💰', title: 'All Reliefs', desc: 'Personal, spouse, child, and parent reliefs included' },
                    { icon: '🎯', title: 'Tax Exemption', desc: 'S$20,000 tax-free allowance for all residents' },
                    { icon: '📊', title: 'Progressive Rates', desc: '0% to 22% progressive tax system' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl flex items-center justify-center text-xl">
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
                  2025 Singapore Tax Rates
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Individual Income Tax Rates</h4>
                    {[
                      { bracket: 'S$0 - S$20,000', rate: '0%', color: 'bg-green-500' },
                      { bracket: 'S$20,001 - S$30,000', rate: '2%', color: 'bg-green-400' },
                      { bracket: 'S$30,001 - S$40,000', rate: '3.5%', color: 'bg-yellow-400' },
                      { bracket: 'S$40,001 - S$80,000', rate: '7%', color: 'bg-yellow-500' },
                      { bracket: 'S$80,001 - S$120,000', rate: '11.5%', color: 'bg-orange-400' },
                      { bracket: 'S$120,001 - S$160,000', rate: '15%', color: 'bg-orange-500' },
                      { bracket: 'S$160,001 - S$200,000', rate: '18%', color: 'bg-red-400' },
                      { bracket: 'S$200,001 - S$240,000', rate: '19%', color: 'bg-red-500' },
                      { bracket: 'S$240,001 - S$280,000', rate: '19.5%', color: 'bg-red-600' },
                      { bracket: 'S$280,001 - S$320,000', rate: '20%', color: 'bg-red-700' },
                      { bracket: 'S$320,001+', rate: '22%', color: 'bg-red-800' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-700">{item.bracket}</span>
                        <span className="font-bold text-gray-900">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl border border-red-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-red-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">Key Reliefs 2025</h4>
                      <ul className="text-red-800 text-sm leading-relaxed space-y-1">
                        <li>• Personal relief: Up to S$9,000</li>
                        <li>• Child relief: S$4,000 per child</li>
                        <li>• Parent relief: Up to S$9,000 per parent</li>
                        <li>• Spouse relief: Up to S$2,000</li>
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