import type { Metadata } from 'next';
import Link from 'next/link';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Property Transfer Guides South Africa 2025 | Complete Property Buying & Selling Help',
  description: 'Free comprehensive property transfer guides for SA 2025: buying property, selling, bond registration, transfer costs, documents, attorneys. Step-by-step help for SA property buyers and sellers.',
  keywords: [
    'property transfer guides South Africa',
    'property buying guide SA',
    'property selling guide',
    'property transfer help',
    'bond registration guide',
    'transfer duty guide',
    'property documents checklist',
    'property attorney guide',
    'first time home buyer guide SA',
    'property transfer timeline',
    'property transfer costs guide',
    'estate property buying guide',
    'South Africa property guides 2025',
    'property transfer process SA',
    'property buying help South Africa'
  ],
  alternates: {
    canonical: '/guides/property-transfer-guides',
  },
  openGraph: {
    title: 'Complete Property Transfer Guides 2025 | South Africa Property Help',
    description: '🏠 Free comprehensive property guides: buying, selling, transfer costs, bond registration & more. Step-by-step help for SA property transactions.',
    url: 'https://genius-insights.co.za/guides/property-transfer-guides',
    type: 'website',
  },
};

export default function PropertyTransferGuidesPage() {
  const guides = [
    {
      title: 'Complete Property Transfer Guide',
      description: 'Comprehensive overview of the entire property transfer process in South Africa from offer to registration.',
      link: '/articles/complete-property-transfer-guide-south-africa-2025',
      duration: '12 min read',
      level: 'Beginner',
      icon: '🏠',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Property Transfer Costs Breakdown',
      description: 'Complete breakdown of all costs involved in property transfer: transfer duty, attorney fees, bond costs, and hidden expenses.',
      link: '/articles/property-transfer-costs-south-africa-2025-breakdown',
      duration: '11 min read',
      level: 'Beginner',
      icon: '💰',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Property Transfer Timeline',
      description: 'Understand exactly how long property transfer takes in SA and what happens in each phase from offer to registration.',
      link: '/articles/property-transfer-timeline-south-africa',
      duration: '14 min read',
      level: 'Beginner',
      icon: '⏱️',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Transfer Duty Calculator & Guide',
      description: 'Master transfer duty calculations with 2025 rates, exemptions, and strategies to minimize your transfer duty costs.',
      link: '/articles/transfer-duty-calculator-guide-south-africa',
      duration: '12 min read',
      level: 'Intermediate',
      icon: '📊',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'First-Time Home Buyer\'s Guide',
      description: 'Complete guide for first-time buyers: bond applications, affordability, transfer process, and avoiding common mistakes.',
      link: '/articles/first-time-home-buyer-guide-south-africa-2025',
      duration: '14 min read',
      level: 'Beginner',
      icon: '🎉',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'How to Choose Transfer Attorney',
      description: 'Find the right transfer attorney: costs, services, questions to ask, and what to expect from your conveyancer.',
      link: '/articles/how-to-choose-property-transfer-attorney-south-africa',
      duration: '10 min read',
      level: 'Beginner',
      icon: '⚖️',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'Selling Your Property Guide',
      description: 'Complete guide to selling property in SA: pricing, marketing, negotiations, legal requirements, and maximizing your sale price.',
      link: '/articles/selling-property-south-africa-complete-guide',
      duration: '16 min read',
      level: 'Intermediate',
      icon: '🏡',
      color: 'from-teal-500 to-green-600'
    },
    {
      title: 'Bond Registration vs Transfer',
      description: 'Understand the key differences between bond registration and property transfer, costs, timelines, and processes.',
      link: '/articles/bond-registration-vs-property-transfer-explained',
      duration: '15 min read',
      level: 'Intermediate',
      icon: '🏦',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Property Transfer Documents Checklist',
      description: 'Complete checklist of all documents required for property transfer from buyers, sellers, and attorneys.',
      link: '/articles/property-transfer-documents-checklist-south-africa',
      duration: '14 min read',
      level: 'Intermediate',
      icon: '📋',
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Buying Estate Property Guide',
      description: 'Complete guide to purchasing property from deceased estates: process, timeline, risks, and legal requirements.',
      link: '/articles/buying-property-deceased-estate-south-africa',
      duration: '16 min read',
      level: 'Advanced',
      icon: '🏛️',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  const tools = [
    {
      title: 'Property Transfer Calculator',
      description: 'Calculate all property transfer costs including transfer duty, attorney fees, and bond registration',
      link: '/south-africa-property-transfer-calculator',
      icon: '🧮',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'Rental Yield Calculator',
      description: 'Calculate rental yields, ROI, and cash flow for property investments',
      link: '/south-africa-rental-yield-calculator',
      icon: '📈',
      color: 'from-green-600 to-emerald-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">🏠 Complete Property Help Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Property Transfer Guides <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Free, comprehensive, step-by-step guides for buying, selling, and transferring property in South Africa.
              Everything you need to know in one place.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-white/80 text-sm">Complete Guides</div>
              </div>
              <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">80K+</div>
                <div className="text-white/80 text-sm">Property Buyers Helped</div>
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
            📖 Complete Property Guides
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Step-by-step tutorials covering every aspect of property buying, selling, and transfer in South Africa.
            Written in plain language with real examples.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Link
                key={index}
                href={guide.link}
                className="group bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${guide.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {guide.icon}
                </div>

                <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-3">
                  {guide.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {guide.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                      {guide.level}
                    </span>
                    <span className="text-xs text-gray-500">
                      {guide.duration}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            🧮 Property Calculators & Tools
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg">
            Free calculators to help you estimate property costs and plan your purchase or investment.
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
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
            🔗 Quick Access by Topic
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">🆕</div>
              <h3 className="font-semibold text-gray-900 mb-2">Buying?</h3>
              <p className="text-sm text-gray-600 mb-4">Start here for buyers</p>
              <Link href="/articles/first-time-home-buyer-guide-south-africa-2025" className="text-green-600 hover:underline font-medium text-sm">
                Buyer's Guide →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Costs?</h3>
              <p className="text-sm text-gray-600 mb-4">Understand all costs</p>
              <Link href="/articles/property-transfer-costs-south-africa-2025-breakdown" className="text-green-600 hover:underline font-medium text-sm">
                Costs Guide →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">🏡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Selling?</h3>
              <p className="text-sm text-gray-600 mb-4">Complete selling guide</p>
              <Link href="/articles/selling-property-south-africa-complete-guide" className="text-green-600 hover:underline font-medium text-sm">
                Seller's Guide →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-900 mb-2">Documents?</h3>
              <p className="text-sm text-gray-600 mb-4">Full checklist</p>
              <Link href="/articles/property-transfer-documents-checklist-south-africa" className="text-green-600 hover:underline font-medium text-sm">
                Checklist →
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Need Professional Help?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              All our guides are free, comprehensive, and updated for 2025.
              For legal advice and representation, consult a registered conveyancing attorney.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/south-africa-property-transfer-calculator"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                🧮 Calculate Transfer Costs
              </Link>
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
