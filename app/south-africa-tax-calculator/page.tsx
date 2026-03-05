import type { Metadata } from 'next';
import SouthAfricaTaxCalculator from '@/components/SouthAfricaTaxCalculator';
import StructuredData from '@/components/StructuredData';
import ToolLayout from '@/components/ToolLayout';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'SARS Tax Calculator 2026 | Free PAYE Calculator',
  description: 'Free SARS tax calculator for 2026/2027. Calculate income tax, PAYE, UIF & SDL on your salary. Updated tax tables, brackets & rebates. How much tax will I pay in South Africa?',
  keywords: [
    'SARS tax calculator 2026', 'SARS tax calculator', 'tax calculator south africa', 'PAYE calculator south africa 2026', 'how much tax will I pay south africa', 'income tax calculator south africa', 'SARS PAYE calculator', 'tax brackets south africa 2026', 'salary tax calculator south africa', 'UIF calculator south africa', 'SDL calculator south africa', 'tax tables 2026 south africa SARS', 'calculate my tax south africa', 'south african tax rates 2026/2027', 'SARS eFiling tax calculator'
  ],
  alternates: {
    canonical: '/south-africa-tax-calculator',
  },
  openGraph: {
    title: 'SARS Tax Calculator 2026 | Free PAYE Calculator',
    description: 'Free SARS tax calculator for 2026/2027. Calculate income tax, PAYE, UIF & SDL with updated tax tables and brackets.',
    url: 'https://genius-insights.co.za/south-africa-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=SARS+Tax+Calculator+2026&subtitle=Free+PAYE+UIF+and+SDL+Calculator',
        width: 1200,
        height: 630,
        alt: 'South Africa Tax Calculator 2026 - SARS PAYE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARS Tax Calculator 2026 | Free PAYE Calculator',
    description: 'How much tax will I pay? Free SARS calculator with 2026/2027 PAYE, UIF, SDL rates. Accurate & updated.',
    images: ['/api/og?title=SARS+Tax+Calculator+2026&subtitle=Free+PAYE+UIF+and+SDL+Calculator'],
  },
};

export default function SouthAfricaTaxCalculatorPage() {
  const relatedTools = [
    {
      name: 'Property Transfer Calculator',
      href: '/south-africa-property-transfer-calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate transfer duty, bond costs, and attorney fees',
      category: 'Property'
    },
    {
      name: 'Retirement Calculator',
      href: '/south-africa-retirement-calculator',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      description: 'Plan your retirement savings and pension',
      category: 'Investment'
    },
    {
      name: 'VAT Calculator',
      href: '/south-africa-vat-calculator',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate VAT on goods and services',
      category: 'Tax & SARS'
    }
  ];

  const relatedArticles = [
    {
      title: 'SARS eFiling Registration Guide',
      href: '/articles/sars-efiling-registration',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Complete step-by-step guide to register for SARS eFiling and manage your tax profile online',
      category: 'Tax & SARS',
      readTime: '8 min read'
    },
    {
      title: 'Understanding 2026 Tax Brackets',
      href: '/articles/sa-tax-brackets-2025',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Complete breakdown of South African tax brackets and rebates for 2026/2027',
      category: 'Tax & SARS',
      readTime: '6 min read'
    },
    {
      title: 'PAYE vs Annual Tax Returns',
      href: '/articles/paye-vs-tax-returns',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      excerpt: 'When you need to submit tax returns even if you pay PAYE through your employer',
      category: 'Tax & SARS',
      readTime: '5 min read'
    }
  ];

  return (
    <>
      <StructuredData
        type="tax-calculator"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.genius-insights.co.za' },
          { name: 'Calculators', url: 'https://www.genius-insights.co.za/calculators' },
          { name: 'Tax Calculator', url: 'https://www.genius-insights.co.za/south-africa-tax-calculator' },
        ]}
      />
      <ToolLayout
        title="SARS Tax Calculator South Africa 2026"
        category="Tax & SARS"
        heroImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center"
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        {/* Stats Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2026/27</div>
              <div className="text-gray-600 text-sm">Tax Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-gray-600 text-sm">SARS Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100K+</div>
              <div className="text-gray-600 text-sm">Users Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Free</div>
              <div className="text-gray-600 text-sm">Always</div>
            </div>
          </div>
        </div>

        {/* Display Ad 3 - Before Calculator */}
        <div className="mb-8 text-center">
          <AdSenseAd 
            adSlot="5341658648"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Calculator Component */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <SouthAfricaTaxCalculator />
        </div>

        {/* Display Ad 4 - After Calculator */}
        <div className="mb-8 text-center">
          <AdSenseAd 
            adSlot="2386701555"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Multiplex Ad - Within Information Section */}
          <div className="mb-8 text-center">
            <AdSenseAd 
              adSlot="9985989974"
              adFormat="autorelaxed"
              style={{ display: 'block', minHeight: '280px' }}
              className="border border-gray-200 rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                SARS Tax Tables & Rates 2026/2027
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our calculator is fully updated with the latest SARS tax tables, rates, and rebates 
                for the 2026/2027 tax year to ensure 100% accurate calculations.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: '🇿🇦', title: 'SARS Compliant', desc: 'Official 2026/2027 tax tables and rates' },
                  { icon: '💰', title: 'All Tax Types', desc: 'Income tax, PAYE, UIF, SDL calculations' },
                  { icon: '🎯', title: 'Accurate Rebates', desc: 'Primary, secondary, and tertiary rebates' },
                  { icon: '📊', title: 'Monthly & Annual', desc: 'Calculate both monthly and annual tax' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-lg">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                South Africa PAYE Tax Brackets 2026/2027
              </h3>
              
              <div className="space-y-3">
                {[
                  { bracket: 'R0 - R237,100', rate: '18%', color: 'bg-green-500' },
                  { bracket: 'R237,101 - R370,500', rate: '26%', color: 'bg-yellow-500' },
                  { bracket: 'R370,501 - R512,800', rate: '31%', color: 'bg-orange-500' },
                  { bracket: 'R512,801 - R673,000', rate: '36%', color: 'bg-red-500' },
                  { bracket: 'R673,001 - R857,900', rate: '39%', color: 'bg-purple-500' },
                  { bracket: 'R857,901+', rate: '45%', color: 'bg-gray-700' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 text-sm">{item.bracket}</span>
                      <span className="font-bold text-gray-900">{item.rate}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                           style={{ width: item.rate }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">💡 Tax Rebates Included</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Primary rebate: R17,235 (under 65)</li>
                  <li>• Secondary rebate: R9,444 (65-74 years)</li>
                  <li>• Tertiary rebate: R3,145 (75+ years)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}