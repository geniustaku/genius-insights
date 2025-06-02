import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Asia Pacific Professional Tools | India, Singapore, Australia Career Calculators',
  description: 'Professional tools for Asia Pacific region. Tax calculators, career tools for India, Singapore, Australia, UAE, Japan. Trusted by 350K+ Asia Pacific professionals.',
  keywords: 'Asia Pacific professional tools, India tax calculator, Singapore tax calculator, Australia tax calculator, UAE tax calculator, Asia career tools',
  alternates: {
    canonical: '/asia-pacific-tools',
  },
  openGraph: {
    title: 'Asia Pacific Professional Tools | India, Singapore, Australia Calculators',
    description: 'Complete Asia Pacific toolkit. Tax, salary, investment tools for major APAC economies.',
    url: 'https://genius-insights.co.za/asia-pacific-tools',
    type: 'website',
  },
};

export default function AsiaPacificToolsPage() {
  const asiaPacificCountries = [
    {
      name: 'India',
      flag: '🇮🇳',
      category: 'Major Economy',
      tools: [
        { name: 'Tax Calculator', href: '/india-tax-calculator', icon: '🧮', description: 'Income tax and GST calculations' },
        { name: 'GST Calculator', href: '/india-gst-calculator', icon: '🧾', description: 'Goods and Services Tax' },
        { name: 'Loan Calculator', href: '/india-loan-calculator', icon: '🏠', description: 'Home loans and personal loans' },
        { name: 'Investment Calculator', href: '/india-investment-calculator', icon: '📈', description: 'SIP and mutual fund planning' },
        { name: 'Salary Calculator', href: '/india-salary-calculator', icon: '💰', description: 'Indian salary benchmarks' },
        { name: 'Property Calculator', href: '/india-property-calculator', icon: '🏘️', description: 'Real estate investment analysis' },
        { name: 'Retirement Calculator', href: '/india-retirement-calculator', icon: '👴', description: 'EPF and retirement planning' },
        { name: 'Education Calculator', href: '/india-education-calculator', icon: '🎓', description: 'Education loan planning' },
      ]
    },
    {
      name: 'Singapore',
      flag: '🇸🇬',
      category: 'Financial Hub',
      tools: [
        { name: 'Tax Calculator', href: '/singapore-tax-calculator', icon: '🧮', description: 'Singapore tax system (IRAS)' },
        { name: 'GST Calculator', href: '/singapore-gst-calculator', icon: '🧾', description: 'Singapore GST calculations' },
        { name: 'Loan Calculator', href: '/singapore-loan-calculator', icon: '🏠', description: 'HDB and property loans' },
        { name: 'Investment Calculator', href: '/singapore-investment-calculator', icon: '📈', description: 'CPF and investment planning' },
        { name: 'Salary Calculator', href: '/singapore-salary-calculator', icon: '💰', description: 'Singapore salary standards' },
        { name: 'Property Calculator', href: '/singapore-property-calculator', icon: '🏘️', description: 'Property cooling measures' },
        { name: 'CPF Calculator', href: '/singapore-cpf-calculator', icon: '💼', description: 'Central Provident Fund' },
      ]
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      category: 'Major Economy',
      tools: [
        { name: 'Tax Calculator', href: '/australia-tax-calculator', icon: '🧮', description: 'ATO compliant tax calculations' },
        { name: 'GST Calculator', href: '/australia-gst-calculator', icon: '🧾', description: 'Australian GST calculations' },
        { name: 'Loan Calculator', href: '/australia-loan-calculator', icon: '🏠', description: 'Home loans and mortgages' },
        { name: 'Investment Calculator', href: '/australia-investment-calculator', icon: '📈', description: 'Super and investment planning' },
        { name: 'Salary Calculator', href: '/australia-salary-calculator', icon: '💰', description: 'Australian salary benchmarks' },
        { name: 'Property Calculator', href: '/australia-property-calculator', icon: '🏘️', description: 'Property investment analysis' },
      ]
    },
    {
      name: 'UAE',
      flag: '🇦🇪',
      category: 'Financial Hub',
      tools: [
        { name: 'Tax Calculator', href: '/uae-tax-calculator', icon: '🧮', description: 'UAE tax-free calculations' },
        { name: 'VAT Calculator', href: '/uae-vat-calculator', icon: '🧾', description: 'UAE VAT calculations' },
        { name: 'Loan Calculator', href: '/uae-loan-calculator', icon: '🏠', description: 'UAE mortgage and loans' },
        { name: 'Investment Calculator', href: '/uae-investment-calculator', icon: '📈', description: 'UAE market investments' },
        { name: 'Salary Calculator', href: '/uae-salary-calculator', icon: '💰', description: 'UAE salary standards' },
        { name: 'Property Calculator', href: '/uae-property-calculator', icon: '🏘️', description: 'Dubai real estate analysis' },
      ]
    },
    {
      name: 'Japan',
      flag: '🇯🇵',
      category: 'Major Economy',
      tools: [
        { name: 'Tax Calculator', href: '/japan-tax-calculator', icon: '🧮', description: 'Japanese tax system' },
        { name: 'Consumption Tax Calculator', href: '/japan-consumption-tax-calculator', icon: '🧾', description: 'Consumption tax calculations' },
        { name: 'Loan Calculator', href: '/japan-loan-calculator', icon: '🏠', description: 'Japanese mortgage planning' },
        { name: 'Investment Calculator', href: '/japan-investment-calculator', icon: '📈', description: 'Japanese market investments' },
        { name: 'Salary Calculator', href: '/japan-salary-calculator', icon: '💰', description: 'Japanese salary standards' },
      ]
    }
  ];

  const totalTools = asiaPacificCountries.reduce((sum, country) => sum + country.tools.length, 0);

  return (
    <>
      <StructuredData type="homepage" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-100">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Link href="/" className="text-orange-200 hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-orange-200 mx-2">→</span>
                <span className="text-white font-medium">Asia Pacific Tools</span>
              </div>

              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🌏 Asia Pacific Region</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                Professional Tools for
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Asia Pacific
                </span>
              </h1>
              
              <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive professional tools for Asia Pacific markets. Tax calculators, career tools, 
                and financial planning for major economies and financial hubs.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{totalTools}</div>
                  <div className="text-orange-100 text-sm">Professional Tools</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-orange-100 text-sm">Countries</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">350K+</div>
                  <div className="text-orange-100 text-sm">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countries and Tools Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-16">
            {asiaPacificCountries.map((country, countryIndex) => (
              <div key={countryIndex} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {/* Country Header */}
                <div className="flex items-center mb-8">
                  <span className="text-6xl mr-6">{country.flag}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{country.name}</h2>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {country.category}
                      </span>
                      <span className="text-gray-600">
                        {country.tools.length} Professional Tools Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {country.tools.map((tool, toolIndex) => (
                    <Link
                      key={toolIndex}
                      href={tool.href}
                      className="group bg-gray-50 rounded-2xl p-6 hover:bg-orange-50 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{tool.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="mt-3 flex items-center text-orange-600 group-hover:text-orange-700">
                            <span className="text-sm font-medium">Calculate Now</span>
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Global Tools CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Global Tools?</h3>
              <p className="text-orange-100 mb-6">
                Access our complete suite of professional tools for 25+ countries worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cv-builder"
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Build Global CV
                </Link>
                <Link
                  href="/salary-calculator"
                  className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  Compare Salaries
                </Link>
                <Link
                  href="/"
                  className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  View All Regions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}