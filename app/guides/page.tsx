import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free South Africa Guides 2025 | SARS Tax, Property Transfer & Financial Help',
  description: 'Comprehensive free guides for South Africans: SARS tax filing, property transfer, financial planning. Step-by-step tutorials, calculators, and expert advice.',
  keywords: [
    'South Africa guides 2025',
    'SARS guides',
    'property transfer guides',
    'financial guides South Africa',
    'tax help SA',
    'property buying guides',
    'South African help guides',
    'free SA guides',
    'tax filing help',
    'property transfer help',
    'financial planning South Africa'
  ],
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Free South Africa Guides 2025 | SARS, Property & Finance Help',
    description: '📚 Comprehensive free guides for South Africans: Tax filing, property transfer, financial planning. Expert advice made simple.',
    url: 'https://genius-insights.co.za/guides',
    type: 'website',
  },
};

export default function GuidesPage() {
  const guideCategories = [
    {
      title: 'SARS Tax Guides',
      description: 'Complete guides for SARS eFiling, tax returns, provisional tax, refunds, and tax clearance certificates.',
      icon: '💰',
      color: 'from-blue-500 to-indigo-600',
      link: '/guides/sars-tax-guides',
      guides: [
        'SARS eFiling Registration',
        'Submit Tax Returns',
        'Provisional Tax for Self-Employed',
        'Tax Deductions Guide',
        'Track Tax Refunds'
      ],
      badge: '5 Guides'
    },
    {
      title: 'Property Transfer Guides',
      description: 'Everything about buying, selling, and transferring property in South Africa including costs, timelines, and legal requirements.',
      icon: '🏠',
      color: 'from-green-500 to-emerald-600',
      link: '/guides/property-transfer-guides',
      guides: [
        'Complete Property Transfer Guide',
        'Transfer Costs Breakdown',
        'First-Time Home Buyer Guide',
        'Selling Property Guide',
        'Transfer Documents Checklist'
      ],
      badge: '10 Guides'
    }
  ];

  const popularGuides = [
    {
      title: 'SARS eFiling Registration',
      description: 'Step-by-step guide to register for SARS eFiling',
      link: '/articles/sars-efiling-registration-guide',
      icon: '📝',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Submit Tax Returns',
      description: 'Complete ITR12 filing guide with all deductions',
      link: '/articles/how-to-submit-tax-returns-sars-efiling',
      icon: '📄',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Property Transfer Costs',
      description: 'Understand all costs in property transfer',
      link: '/articles/property-transfer-costs-south-africa-2025-breakdown',
      icon: '💰',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'First-Time Home Buyer',
      description: 'Complete guide for first-time property buyers',
      link: '/articles/first-time-home-buyer-guide-south-africa-2025',
      icon: '🎉',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const calculators = [
    {
      title: 'Income Tax Calculator',
      description: 'Calculate SARS income tax, PAYE & take-home salary',
      link: '/south-africa-income-tax-calculator',
      icon: '🧮'
    },
    {
      title: 'Property Transfer Calculator',
      description: 'Calculate transfer duty & all transfer costs',
      link: '/south-africa-property-transfer-calculator',
      icon: '🏠'
    },
    {
      title: 'Rental Yield Calculator',
      description: 'Calculate rental yields & property ROI',
      link: '/south-africa-rental-yield-calculator',
      icon: '📈'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-24">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">📚 Free Expert Guides</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              South Africa <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Guides 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Comprehensive, free, step-by-step guides for South Africans.
              Tax filing, property transfer, financial planning—all in plain language.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-white/80 text-sm">Complete Guides</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">180K+</div>
                <div className="text-white/80 text-sm">People Helped</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-white/80 text-sm">Free Forever</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">2025</div>
                <div className="text-white/80 text-sm">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* Guide Categories */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4 text-center">
            📖 Browse by Category
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Choose a category to access comprehensive step-by-step guides
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {guideCategories.map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className="group bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                    {category.badge}
                  </span>
                </div>

                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2 mb-6">
                  {category.guides.slice(0, 5).map((guide, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {guide}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <span className="text-blue-600 font-bold text-lg group-hover:underline">
                    Browse {category.badge} →
                  </span>
                  <svg className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Guides */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            🔥 Most Popular Guides
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Start with these most-read guides
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.link}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${guide.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {guide.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Calculators */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            🧮 Free Calculators & Tools
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Estimate costs and plan ahead with our free calculators
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {calculators.map((calc, index) => (
              <Link
                key={index}
                href={calc.link}
                className="group bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white"
              >
                <div className="text-5xl mb-4">{calc.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-3">
                  {calc.title}
                </h3>
                <p className="text-white/90 mb-4">
                  {calc.description}
                </p>
                <span className="inline-flex items-center font-semibold group-hover:underline">
                  Use Calculator →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Browse all our articles or use the search function to find specific topics.
              All guides are free, comprehensive, and updated for 2025.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all text-lg"
              >
                📚 Browse All Articles
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:shadow-lg transition-all border-2 border-gray-200 text-lg"
              >
                🛠️ View All Tools
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
