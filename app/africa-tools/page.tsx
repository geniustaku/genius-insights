import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Free Africa Financial Tools | Tax & Salary Calculators',
  description: 'Free tax calculators, salary tools and investment calculators for South Africa, Nigeria, Kenya, Ghana. SARS-compliant. No sign up, instant results.',
  keywords: 'free Africa financial tools, South Africa tax calculator free, Nigeria tax calculator, Kenya salary calculator, Ghana VAT calculator, SARS tax calculator, African investment calculator, currency converter Africa, loan calculator south africa, retirement calculator SA, PAYE calculator, UIF calculator, property transfer calculator, JSE investment tools, African financial planning',
  alternates: {
    canonical: '/africa-tools',
  },
  openGraph: {
    title: 'Free Africa Financial & Tax Calculators | No Sign Up',
    description: 'Free tax, salary, loan and investment calculators for South Africa, Nigeria, Kenya, Ghana. SARS-compliant, instant results.',
    url: 'https://genius-insights.co.za/africa-tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Africa Financial Tools | Tax & Salary Calculators',
    description: 'Free SARS-compliant tax calculators, salary tools, investment tools for 6 African countries. No sign up needed.',
  },
};

export default function AfricaToolsPage() {
  const africaCountries = [
    {
      name: 'South Africa',
      flag: '🇿🇦',
      category: 'Financial Hub',
      tools: [
        { name: 'Tax Calculator', href: '/south-africa-tax-calculator', icon: '🧮', description: 'SARS compliant income tax calculations' },
        { name: 'VAT Calculator', href: '/south-africa-vat-calculator', icon: '🧾', description: 'South African VAT calculations' },
        { name: 'Loan Calculator', href: '/south-africa-loan-calculator', icon: '🏠', description: 'Home loans and personal loans' },
        { name: 'Investment Calculator', href: '/south-africa-investment-calculator', icon: '📈', description: 'JSE and investment planning' },
        { name: 'Retirement Calculator', href: '/south-africa-retirement-calculator', icon: '👴', description: 'Pension and retirement planning' },
        { name: 'Property Transfer Calculator', href: '/south-africa-property-transfer-calculator', icon: '🏘️', description: 'Transfer duty calculations' },
        { name: 'Rental Yield Calculator', href: '/south-africa-rental-yield-calculator', icon: '🏠', description: 'Property rental analysis' },
        { name: 'Fuel Cost Calculator', href: '/south-africa-fuel-cost-calculator', icon: '⛽', description: 'Fuel cost planning' },
        { name: 'Business Registration Calculator', href: '/south-africa-business-registration-calculator', icon: '🏢', description: 'Business setup costs' },
        { name: 'Skills Development Levy', href: '/south-africa-sdl-calculator', icon: '🎓', description: 'SDL calculations for employers' },
        { name: 'UIF Calculator', href: '/south-africa-uif-calculator', icon: '💼', description: 'Unemployment Insurance Fund' },
        { name: 'PAYE Calculator', href: '/south-africa-paye-calculator', icon: '💰', description: 'Pay As You Earn calculations' },
      ]
    },
    {
      name: 'Nigeria',
      flag: '🇳🇬',
      category: 'Emerging Market',
      tools: [
        { name: 'Tax Calculator', href: '/nigeria-tax-calculator', icon: '🧮', description: 'FIRS compliant tax calculations' },
        { name: 'VAT Calculator', href: '/nigeria-vat-calculator', icon: '🧾', description: 'Nigerian VAT calculations' },
        { name: 'Loan Calculator', href: '/nigeria-loan-calculator', icon: '🏠', description: 'Nigerian mortgage and loans' },
        { name: 'Investment Calculator', href: '/nigeria-investment-calculator', icon: '📈', description: 'NSE and investment planning' },
        { name: 'Salary Calculator', href: '/nigeria-salary-calculator', icon: '💰', description: 'Nigerian salary benchmarks' },
        { name: 'Property Calculator', href: '/nigeria-property-calculator', icon: '🏘️', description: 'Real estate investment analysis' },
        { name: 'Business Calculator', href: '/nigeria-business-calculator', icon: '🏢', description: 'Business registration costs' },
        { name: 'Pension Calculator', href: '/nigeria-pension-calculator', icon: '👴', description: 'PenCom retirement planning' },
      ]
    },
    {
      name: 'Kenya',
      flag: '🇰🇪',
      category: 'Emerging Market',
      tools: [
        { name: 'Tax Calculator', href: '/kenya-tax-calculator', icon: '🧮', description: 'KRA tax calculations' },
        { name: 'VAT Calculator', href: '/kenya-vat-calculator', icon: '🧾', description: 'Kenyan VAT calculations' },
        { name: 'Loan Calculator', href: '/kenya-loan-calculator', icon: '🏠', description: 'Kenyan mortgage planning' },
        { name: 'Investment Calculator', href: '/kenya-investment-calculator', icon: '📈', description: 'NSE investment planning' },
        { name: 'Salary Calculator', href: '/kenya-salary-calculator', icon: '💰', description: 'Kenyan salary standards' },
        { name: 'Property Calculator', href: '/kenya-property-calculator', icon: '🏘️', description: 'Property investment analysis' },
      ]
    },
    {
      name: 'Ghana',
      flag: '🇬🇭',
      category: 'Emerging Market',
      tools: [
        { name: 'Tax Calculator', href: '/ghana-tax-calculator', icon: '🧮', description: 'GRA tax calculations' },
        { name: 'VAT Calculator', href: '/ghana-vat-calculator', icon: '🧾', description: 'Ghanaian VAT calculations' },
        { name: 'Loan Calculator', href: '/ghana-loan-calculator', icon: '🏠', description: 'Ghanaian mortgage planning' },
        { name: 'Investment Calculator', href: '/ghana-investment-calculator', icon: '📈', description: 'GSE investment planning' },
        { name: 'Salary Calculator', href: '/ghana-salary-calculator', icon: '💰', description: 'Ghanaian salary standards' },
      ]
    },
    {
      name: 'Egypt',
      flag: '🇪🇬',
      category: 'Emerging Market',
      tools: [
        { name: 'Tax Calculator', href: '/egypt-tax-calculator', icon: '🧮', description: 'Egyptian tax calculations' },
        { name: 'VAT Calculator', href: '/egypt-vat-calculator', icon: '🧾', description: 'Egyptian VAT calculations' },
        { name: 'Loan Calculator', href: '/egypt-loan-calculator', icon: '🏠', description: 'Egyptian mortgage planning' },
        { name: 'Investment Calculator', href: '/egypt-investment-calculator', icon: '📈', description: 'EGX investment planning' },
      ]
    },
    {
      name: 'Morocco',
      flag: '🇲🇦',
      category: 'Emerging Market',
      tools: [
        { name: 'Tax Calculator', href: '/morocco-tax-calculator', icon: '🧮', description: 'Moroccan tax calculations' },
        { name: 'VAT Calculator', href: '/morocco-vat-calculator', icon: '🧾', description: 'Moroccan VAT calculations' },
        { name: 'Loan Calculator', href: '/morocco-loan-calculator', icon: '🏠', description: 'Moroccan mortgage planning' },
        { name: 'Investment Calculator', href: '/morocco-investment-calculator', icon: '📈', description: 'Casablanca Stock Exchange' },
      ]
    }
  ];

  const totalTools = africaCountries.reduce((sum, country) => sum + country.tools.length, 0);

  return (
    <>
      <StructuredData type="homepage" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Link href="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-green-200 mx-2">→</span>
                <span className="text-white font-medium">Africa Tools</span>
              </div>

              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🌍 African Continent</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                Free Financial &amp; Tax Calculators for
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Africa
                </span>
              </h1>

              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Free SARS-compliant tax calculators, salary tools, loan calculators and investment planners
                for South Africa, Nigeria, Kenya, Ghana, Egypt and Morocco. No sign up required.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{totalTools}</div>
                  <div className="text-green-100 text-sm">Professional Tools</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-green-100 text-sm">Countries</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">250K+</div>
                  <div className="text-green-100 text-sm">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countries and Tools Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-16">
            {africaCountries.map((country, countryIndex) => (
              <div key={countryIndex} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {/* Country Header */}
                <div className="flex items-center mb-8">
                  <span className="text-6xl mr-6">{country.flag}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{country.name}</h2>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
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
                      className="group bg-gray-50 rounded-2xl p-6 hover:bg-green-50 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{tool.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="mt-3 flex items-center text-green-600 group-hover:text-green-700">
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
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Global Tools?</h3>
              <p className="text-green-100 mb-6">
                Access our complete suite of professional tools for 25+ countries worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cv-builder"
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
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