import type { Metadata } from 'next';
import Link from 'next/link';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'SARS Tax Guides 2025 | Complete South Africa Tax Filing & eFiling Help',
  description: 'Free comprehensive SARS guides for 2025: eFiling registration, tax returns, provisional tax, refunds, tax clearance. Step-by-step tutorials for South African taxpayers.',
  keywords: [
    'SARS guides 2025',
    'SARS eFiling help',
    'South Africa tax guides',
    'SARS tax filing tutorials',
    'how to use SARS eFiling',
    'SARS step by step guide',
    'tax return help South Africa',
    'SARS provisional tax guide',
    'SARS refund help',
    'tax clearance certificate guide',
    'SARS eFiling registration',
    'South African tax help',
    'SARS filing assistance',
    'tax compliance South Africa',
    'SARS how to guides'
  ],
  alternates: {
    canonical: '/guides/sars-tax-guides',
  },
  openGraph: {
    title: 'Complete SARS Tax Guides 2025 | South Africa Tax Filing Help',
    description: '📚 Free comprehensive SARS guides: eFiling registration, tax returns, provisional tax, refunds & more. Step-by-step help for SA taxpayers.',
    url: 'https://genius-insights.co.za/guides/sars-tax-guides',
    type: 'website',
  },
};

export default function SARSTaxGuidesPage() {
  const guides = [
    {
      title: 'SARS eFiling Registration Guide',
      description: 'Complete step-by-step guide to registering for SARS eFiling. Learn requirements, setup process, troubleshooting, and security best practices.',
      link: '/articles/sars-efiling-registration-guide',
      duration: '22 min read',
      level: 'Beginner',
      icon: '📝',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'How to Submit Tax Returns on SARS eFiling',
      description: 'Step-by-step ITR12 filing guide with income sources, deductions, review process, and tips to maximize your tax refund.',
      link: '/articles/how-to-submit-tax-returns-sars-efiling',
      duration: '25 min read',
      level: 'Intermediate',
      icon: '📄',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'SARS Provisional Tax Guide for Self-Employed',
      description: 'Complete provisional tax guide for freelancers, contractors, and self-employed. Calculations, deadlines, IRP6 filing, and penalty avoidance.',
      link: '/articles/sars-provisional-tax-guide-self-employed',
      duration: '24 min read',
      level: 'Advanced',
      icon: '💼',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Income Tax Deductions Guide South Africa',
      description: 'Maximize your tax savings with this comprehensive guide to all SA tax deductions: retirement, medical, donations, home office, and more.',
      link: '/articles/south-africa-income-tax-deductions-guide',
      duration: '18 min read',
      level: 'Intermediate',
      icon: '💰',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'How to Track Your SARS Tax Refund',
      description: 'Complete guide to tracking and requesting SARS tax refunds. Learn refund timelines, tracking methods, what to do if delayed, and dispute processes.',
      link: '/articles/track-sars-tax-refund-guide',
      duration: '20 min read',
      level: 'Intermediate',
      icon: '💸',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      title: 'SARS Tax Clearance Certificate Guide',
      description: 'Complete guide to obtaining tax clearance certificates. Learn application requirements, processing times, validity, and what to do if declined.',
      link: '/articles/sars-tax-clearance-certificate-guide',
      duration: '22 min read',
      level: 'Intermediate',
      icon: '✅',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const tools = [
    {
      title: 'Income Tax Calculator',
      description: 'Calculate your SARS income tax, PAYE, UIF, and take-home salary for 2025/2026',
      link: '/south-africa-income-tax-calculator',
      icon: '🧮',
      color: 'from-blue-600 to-indigo-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">📚 Complete SARS Help Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              SARS Tax Guides <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Free, comprehensive, step-by-step guides for all your South African tax needs.
              From eFiling registration to filing returns, we've got you covered.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-white/80 text-sm">Complete Guides</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">100K+</div>
                <div className="text-white/80 text-sm">Readers Helped</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">Free</div>
                <div className="text-white/80 text-sm">Always</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">2025</div>
                <div className="text-white/80 text-sm">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* Ad After Hero */}
        <div className="mb-12 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <AdSenseAd
            adSlot="5341658648"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
          />
        </div>

        {/* Guides Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            📖 Complete SARS Guides
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Step-by-step tutorials covering every aspect of SARS tax filing and compliance.
            Written in plain language with real examples.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <Link
                key={index}
                href={guide.link}
                className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${guide.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {guide.icon}
                </div>

                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {guide.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {guide.level}
                    </span>
                    <span className="text-sm text-gray-500">
                      {guide.duration}
                    </span>
                  </div>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    Read Guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            🧮 Tax Calculators & Tools
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Free calculators to help you estimate your tax liability and plan ahead.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className={`group bg-gradient-to-r ${tool.color} rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white`}
              >
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-3">
                  {tool.title}
                </h3>
                <p className="text-white/90 mb-4">
                  {tool.description}
                </p>
                <span className="inline-flex items-center font-semibold group-hover:underline">
                  Use Calculator →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
            🔗 Quick Access
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">🆕</div>
              <h3 className="font-semibold text-gray-900 mb-2">New to SARS?</h3>
              <p className="text-sm text-gray-600 mb-4">Start with eFiling registration</p>
              <Link href="/articles/sars-efiling-registration-guide" className="text-blue-600 hover:underline font-medium text-sm">
                Get Started →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-900 mb-2">Filing Returns?</h3>
              <p className="text-sm text-gray-600 mb-4">Complete ITR12 guide</p>
              <Link href="/articles/how-to-submit-tax-returns-sars-efiling" className="text-blue-600 hover:underline font-medium text-sm">
                Learn How →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold text-gray-900 mb-2">Self-Employed?</h3>
              <p className="text-sm text-gray-600 mb-4">Provisional tax explained</p>
              <Link href="/articles/sars-provisional-tax-guide-self-employed" className="text-blue-600 hover:underline font-medium text-sm">
                Read Guide →
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Need More Help?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              All our guides are free, comprehensive, and updated for 2025.
              If you need personalized tax advice, consider consulting a registered tax practitioner.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0800007277"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                📞 Call SARS: 0800 00 7277
              </a>
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
              >
                📚 Browse All Articles
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
