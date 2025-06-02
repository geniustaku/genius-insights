import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Americas Professional Tools | US, Canada, Brazil Tax & Career Calculators',
  description: 'Comprehensive professional tools for the Americas. Tax calculators, CV builders, salary tools for United States, Canada, Brazil. Trusted by 400K+ professionals.',
  keywords: 'Americas professional tools, US tax calculator, Canada tax calculator, Brazil tax calculator, North America career tools, South America calculators',
  alternates: {
    canonical: '/americas-tools',
  },
  openGraph: {
    title: 'Americas Professional Tools | US, Canada, Brazil Calculators',
    description: 'Complete toolkit for Americas professionals. Tax, salary, investment tools for US, Canada, Brazil.',
    url: 'https://genius-insights.co.za/americas-tools',
    type: 'website',
  },
};

export default function AmericasToolsPage() {
  const americasCountries = [
    {
      name: 'United States',
      flag: '🇺🇸',
      category: 'Major Economy',
      tools: [
        { name: 'Tax Calculator', href: '/us-tax-calculator', icon: '🧮', description: 'IRS compliant federal tax calculations' },
        { name: 'Sales Tax Calculator', href: '/us-sales-tax-calculator', icon: '🧾', description: 'State and local sales tax' },
        { name: 'Loan Calculator', href: '/us-loan-calculator', icon: '🏠', description: 'Mortgage and personal loans' },
        { name: 'Investment Calculator', href: '/us-investment-calculator', icon: '📈', description: 'Investment and retirement planning' },
        { name: '401k Calculator', href: '/us-401k-calculator', icon: '💰', description: '401k retirement planning' },
        { name: 'Student Loan Calculator', href: '/us-student-loan-calculator', icon: '🎓', description: 'Student debt calculations' },
        { name: 'Property Calculator', href: '/us-property-calculator', icon: '🏘️', description: 'Real estate investment analysis' },
      ]
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      category: 'Major Economy',
      tools: [
        { name: 'Tax Calculator', href: '/canada-tax-calculator', icon: '🧮', description: 'CRA compliant federal and provincial tax' },
        { name: 'GST Calculator', href: '/canada-gst-calculator', icon: '🧾', description: 'Goods and Services Tax calculations' },
        { name: 'Loan Calculator', href: '/canada-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
        { name: 'Investment Calculator', href: '/canada-investment-calculator', icon: '📈', description: 'RRSP and TFSA planning' },
        { name: 'Property Calculator', href: '/canada-property-calculator', icon: '🏘️', description: 'Real estate market analysis' },
      ]
    },
    {
      name: 'Brazil',
      flag: '🇧🇷',
      category: 'Emerging Market',
      tools: [
        { name: 'Tax Calculator', href: '/brazil-tax-calculator', icon: '🧮', description: 'Receita Federal compliant calculations' },
        { name: 'Loan Calculator', href: '/brazil-loan-calculator', icon: '🏠', description: 'Brazilian loan and financing' },
        { name: 'Investment Calculator', href: '/brazil-investment-calculator', icon: '📈', description: 'Brazilian market investments' },
        { name: 'Salary Calculator', href: '/brazil-salary-calculator', icon: '💰', description: 'Brazilian salary benchmarks' },
      ]
    }
  ];

  const totalTools = americasCountries.reduce((sum, country) => sum + country.tools.length, 0);

  return (
    <>
      <StructuredData type="regional-tools" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Link href="/" className="text-purple-200 hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-purple-200 mx-2">→</span>
                <span className="text-white font-medium">Americas Tools</span>
              </div>

              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🌎 Americas Region</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                Professional Tools for the
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Americas
                </span>
              </h1>
              
              <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive professional tools for North and South America. Tax calculators, career tools, 
                and financial planning for major economies and emerging markets.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{totalTools}</div>
                  <div className="text-purple-100 text-sm">Professional Tools</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-purple-100 text-sm">Countries</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">400K+</div>
                  <div className="text-purple-100 text-sm">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countries and Tools Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-16">
            {americasCountries.map((country, countryIndex) => (
              <div key={countryIndex} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {/* Country Header */}
                <div className="flex items-center mb-8">
                  <span className="text-6xl mr-6">{country.flag}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{country.name}</h2>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
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
                      className="group bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{tool.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="mt-3 flex items-center text-blue-600 group-hover:text-blue-700">
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
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Global Tools?</h3>
              <p className="text-purple-100 mb-6">
                Access our complete suite of professional tools for 25+ countries worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cv-builder"
                  className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
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