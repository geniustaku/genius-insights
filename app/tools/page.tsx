'use client';
import React from 'react';
import Link from 'next/link';
import AdSenseAd from '@/components/AdSenseAd';
import { usePageVisit } from '@/hooks/usePageVisit';

export default function ToolsPage() {
  usePageVisit('/tools');

  // ALL calculators - comprehensive list for SA one-stop hub
  const tools = [
    // TAX & SARS CALCULATORS
    {
      name: 'SARS Income Tax Calculator 2025',
      href: '/south-africa-income-tax-calculator',
      description: 'Calculate your exact SARS income tax, PAYE, UIF, and SDL with the latest 2025/2026 tax tables and rebates',
      category: 'Tax & SARS',
      popular: true,
      icon: '🇿🇦',
      tags: ['SARS', 'Income Tax', 'PAYE', 'UIF', '2025']
    },
    {
      name: 'VAT Calculator 2025',
      href: '/south-africa-vat-calculator-2025',
      description: 'Calculate 15% VAT on goods and services. Add or remove VAT from prices instantly',
      category: 'Tax & SARS',
      popular: true,
      icon: '💰',
      tags: ['VAT', '15%', 'SARS', 'Business']
    },
    {
      name: 'Capital Gains Tax Calculator',
      href: '/south-africa-capital-gains-tax-calculator',
      description: 'Calculate CGT on property, shares, and investments with R40K annual exclusion',
      category: 'Tax & SARS',
      popular: true,
      icon: '📈',
      tags: ['CGT', 'Capital Gains', 'Property', 'Shares']
    },
    {
      name: 'Crypto Tax Calculator',
      href: '/south-africa-crypto-tax-calculator',
      description: 'Calculate tax on Bitcoin, Ethereum, and cryptocurrency profits in South Africa',
      category: 'Tax & SARS',
      popular: false,
      icon: '₿',
      tags: ['Crypto', 'Bitcoin', 'Ethereum', 'SARS']
    },
    {
      name: 'Freelancer Tax Calculator',
      href: '/south-africa-freelancer-provisional-tax-calculator',
      description: 'Calculate provisional tax payments for freelancers and self-employed South Africans',
      category: 'Tax & SARS',
      popular: false,
      icon: '💼',
      tags: ['Freelancer', 'Provisional Tax', 'Self-Employed']
    },
    {
      name: 'Estate Duty Calculator',
      href: '/south-africa-estate-duty-calculator',
      description: 'Calculate estate duty (death tax) with R3.5M abatement and spouse deductions',
      category: 'Tax & SARS',
      popular: false,
      icon: '⚰️',
      tags: ['Estate Duty', 'Inheritance Tax', 'Will']
    },

    {
      name: 'Tax Refund Calculator',
      href: '/south-africa-tax-refund-calculator',
      description: 'Estimate your SARS tax refund with deductions, rebates, and medical credits',
      category: 'Tax & SARS',
      popular: true,
      icon: '💵',
      tags: ['Tax Refund', 'SARS', 'eFiling', 'Rebates']
    },

    // EMPLOYMENT & SALARY CALCULATORS
    {
      name: 'Payroll Calculator',
      href: '/south-africa-payroll-calculator',
      description: 'Calculate employee take-home pay with PAYE, UIF, pension, and medical aid deductions',
      category: 'Employment',
      popular: true,
      icon: '💼',
      tags: ['Payroll', 'PAYE', 'Take-home Pay', 'Salary']
    },
    {
      name: 'UIF Calculator',
      href: '/south-africa-uif-calculator',
      description: 'Calculate UIF contributions and unemployment benefits. 1% rate, R17,712 ceiling',
      category: 'Employment',
      popular: true,
      icon: '🏢',
      tags: ['UIF', 'Unemployment', 'Maternity', 'Retrenchment']
    },
    {
      name: 'Overtime Calculator',
      href: '/south-africa-overtime-calculator',
      description: 'Calculate overtime pay at BCEA rates - 1.5x weekday, 2x Sunday & public holidays',
      category: 'Employment',
      popular: true,
      icon: '⏰',
      tags: ['Overtime', 'BCEA', 'Sunday Pay', 'Public Holiday']
    },
    {
      name: 'Leave Calculator',
      href: '/south-africa-leave-calculator',
      description: 'Calculate annual leave, sick leave, family leave entitlements. BCEA compliant',
      category: 'Employment',
      popular: true,
      icon: '🏖️',
      tags: ['Leave', 'Annual Leave', 'Sick Leave', 'BCEA']
    },
    {
      name: 'Pension Calculator',
      href: '/south-africa-pension-calculator',
      description: 'Plan retirement with 27.5% tax deduction. Project pension fund growth',
      category: 'Employment',
      popular: true,
      icon: '🏦',
      tags: ['Pension', 'Retirement', 'RA', '27.5%']
    },
    {
      name: 'Gratuity Calculator',
      href: '/south-africa-gratuity-calculator',
      description: 'Calculate severance pay, retrenchment packages. BCEA minimum, tax implications',
      category: 'Employment',
      popular: false,
      icon: '🎁',
      tags: ['Gratuity', 'Severance', 'Retrenchment', 'BCEA']
    },
    {
      name: 'Salary Calculator',
      href: '/salary-calculator',
      description: 'Calculate net salary from gross income with all SA tax and deductions',
      category: 'Employment',
      popular: false,
      icon: '💵',
      tags: ['Salary', 'Net Pay', 'Gross', 'Deductions']
    },

    // PROPERTY CALCULATORS
    {
      name: 'Property Transfer Calculator',
      href: '/south-africa-property-transfer-calculator',
      description: 'Calculate transfer duty, bond costs, attorney fees, and all property transfer costs',
      category: 'Property',
      popular: true,
      icon: '🏠',
      tags: ['Property', 'Transfer Duty', 'Bond Costs', 'Attorney Fees']
    },
    {
      name: 'Bond Calculator',
      href: '/south-africa-bond-calculator',
      description: 'Calculate home loan affordability and monthly bond repayments at 11.75% prime rate',
      category: 'Property',
      popular: true,
      icon: '🏡',
      tags: ['Bond', 'Home Loan', 'Mortgage', 'Affordability']
    },
    {
      name: 'Rental Yield Calculator',
      href: '/south-africa-rental-yield-calculator',
      description: 'Calculate rental yields, property investment returns, and cash flow for SA real estate',
      category: 'Property',
      popular: false,
      icon: '🔑',
      tags: ['Rental Yield', 'Property Investment', 'Cash Flow']
    },

    // LOAN & BANKING CALCULATORS
    {
      name: 'Personal Loan Calculator',
      href: '/south-africa-personal-loan-calculator',
      description: 'Calculate personal loan repayments with NCR-compliant fees. Compare bank rates',
      category: 'Banking',
      popular: true,
      icon: '🏦',
      tags: ['Personal Loan', 'NCR', 'Bank Rates', 'Interest']
    },
    {
      name: 'Car Finance Calculator',
      href: '/south-africa-car-finance-calculator',
      description: 'Calculate vehicle finance with balloon payments. Compare new vs used car rates',
      category: 'Banking',
      popular: true,
      icon: '🚗',
      tags: ['Car Finance', 'Vehicle Loan', 'Balloon', 'WesBank']
    },
    {
      name: 'Loan Calculator',
      href: '/south-africa-loan-calculator',
      description: 'General loan calculator for home loans, personal loans, and vehicle finance',
      category: 'Banking',
      popular: false,
      icon: '💳',
      tags: ['Loans', 'Home Loans', 'Interest Rates']
    },
    {
      name: 'Debt Consolidation Calculator',
      href: '/south-africa-debt-consolidation-calculator',
      description: 'Calculate debt consolidation savings and monthly payment reductions',
      category: 'Banking',
      popular: false,
      icon: '📊',
      tags: ['Debt Consolidation', 'Debt Review', 'NCR']
    },
    {
      name: 'Capitec Calculator',
      href: '/south-africa-capitec-calculator',
      description: 'Capitec-specific calculators for personal loans, savings, and credit facilities',
      category: 'Banking',
      popular: false,
      icon: '🔴',
      tags: ['Capitec', 'Personal Loan', 'Savings']
    },
    {
      name: 'FNB Calculator',
      href: '/south-africa-fnb-calculator',
      description: 'FNB-specific calculators for home loans, personal loans, and investments',
      category: 'Banking',
      popular: false,
      icon: '🟢',
      tags: ['FNB', 'Home Loans', 'Banking']
    },
    {
      name: 'Standard Bank Calculator',
      href: '/south-africa-standard-bank-calculator',
      description: 'Standard Bank calculators for mortgages, personal loans, and investments',
      category: 'Banking',
      popular: false,
      icon: '🔵',
      tags: ['Standard Bank', 'Mortgages', 'Loans']
    },
    {
      name: 'Credit Card Calculator',
      href: '/south-africa-credit-card-calculator',
      description: 'Calculate credit card payoff time and interest. Compare minimum vs fixed payments',
      category: 'Banking',
      popular: true,
      icon: '💳',
      tags: ['Credit Card', 'Debt', 'Interest', 'Payoff']
    },
    {
      name: 'Fixed Deposit Calculator',
      href: '/south-africa-deposit-calculator',
      description: 'Calculate fixed deposit returns with compound interest. Compare bank rates',
      category: 'Banking',
      popular: true,
      icon: '💰',
      tags: ['Fixed Deposit', 'Savings', 'Interest', 'Bank']
    },

    // INVESTMENT CALCULATORS
    {
      name: 'TFSA Calculator',
      href: '/south-africa-tfsa-calculator',
      description: 'Calculate Tax-Free Savings Account growth with R36K annual limit and R500K lifetime cap',
      category: 'Investment',
      popular: true,
      icon: '💎',
      tags: ['TFSA', 'Tax-Free', 'Savings', 'Investment']
    },
    {
      name: 'Investment Calculator',
      href: '/south-africa-investment-calculator',
      description: 'Calculate compound interest, unit trusts, and JSE stock investment returns',
      category: 'Investment',
      popular: false,
      icon: '📈',
      tags: ['Investment', 'Compound Interest', 'JSE']
    },
    {
      name: 'Retirement Calculator',
      href: '/south-africa-retirement-calculator',
      description: 'Plan retirement savings, pension contributions, and retirement annuity',
      category: 'Investment',
      popular: false,
      icon: '👴',
      tags: ['Retirement', 'Pension', 'RA', 'Provident Fund']
    },
    {
      name: 'Inflation Calculator',
      href: '/south-africa-inflation-calculator',
      description: 'Calculate inflation impact on your money. Historical SA CPI rates & purchasing power',
      category: 'Investment',
      popular: true,
      icon: '📊',
      tags: ['Inflation', 'CPI', 'Purchasing Power', 'SARB']
    },

    // INSURANCE CALCULATORS
    {
      name: 'Insurance Calculator',
      href: '/south-africa-insurance-calculator',
      description: 'Compare life insurance, medical aid, and short-term insurance premiums',
      category: 'Insurance',
      popular: false,
      icon: '🛡️',
      tags: ['Insurance', 'Life Insurance', 'Medical Aid']
    },
    {
      name: 'Insurance Comparison',
      href: '/south-africa-insurance-comparison',
      description: 'Compare insurance quotes from top SA insurers - Discovery, Sanlam, Old Mutual',
      category: 'Insurance',
      popular: false,
      icon: '⚖️',
      tags: ['Insurance Comparison', 'Discovery', 'Sanlam']
    },

    // UTILITY CALCULATORS
    {
      name: 'Solar & Loadshedding Calculator',
      href: '/south-africa-solar-loadshedding-calculator',
      description: 'Calculate solar panel ROI, battery backup costs, and loadshedding savings',
      category: 'Utilities',
      popular: true,
      icon: '☀️',
      tags: ['Solar', 'Loadshedding', 'Battery', 'Eskom']
    },
    {
      name: 'Fuel Cost Calculator',
      href: '/south-africa-fuel-cost-calculator',
      description: 'Calculate fuel costs and travel expenses with current SA petrol prices',
      category: 'Utilities',
      popular: false,
      icon: '⛽',
      tags: ['Fuel Costs', 'Petrol Price', 'Travel']
    },

    // BUSINESS CALCULATORS
    {
      name: 'Business Registration Calculator',
      href: '/south-africa-business-registration-calculator',
      description: 'Calculate CIPC registration costs, company setup fees, and Pty Ltd costs',
      category: 'Business',
      popular: false,
      icon: '🏢',
      tags: ['CIPC', 'Company Registration', 'Pty Ltd']
    },
  ];

  // Categories with counts and colors
  const categories = [
    { name: 'Tax & SARS', icon: '🇿🇦', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { name: 'Employment', icon: '💼', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { name: 'Property', icon: '🏠', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { name: 'Banking', icon: '🏦', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
    { name: 'Investment', icon: '📈', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { name: 'Insurance', icon: '🛡️', color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100' },
    { name: 'Utilities', icon: '⚡', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
    { name: 'Business', icon: '🏢', color: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
  ];

  const getCategoryCount = (name: string) => tools.filter(t => t.category === name).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Genius Insights</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/guides" className="text-gray-600 hover:text-gray-900 font-medium">Guides</Link>
                <Link href="/tools" className="text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1">Tools</Link>
                <Link href="/calculators" className="text-gray-600 hover:text-gray-900 font-medium">Calculators</Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 font-medium">Articles</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - SEO Optimized */}
      <section className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            South Africa Financial Tools & Calculators
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Your one-stop hub for {tools.length}+ free South African financial calculators.
            SARS tax, property, loans, UIF, bonds, and more. Updated for 2025.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-white">{tools.length}+</div>
              <div className="text-white/80 text-sm">Free Calculators</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-white">2025</div>
              <div className="text-white/80 text-sm">Tax Year Updated</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-white/80 text-sm">SARS Compliant</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-white/80 text-sm">No Sign-up</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation - Good for SEO */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`#${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className={`${cat.color} border rounded-xl px-4 py-2 flex items-center space-x-2 transition-colors`}
              >
                <span>{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
                <span className="text-xs opacity-75">({getCategoryCount(cat.name)})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSenseAd adSlot="5341658648" adFormat="auto" style={{ display: 'block', minHeight: '90px' }} />
      </div>

      {/* Popular Tools Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-3xl">🔥</span>
            <h2 className="text-3xl font-bold text-gray-900">Most Popular Calculators</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.filter(t => t.popular).map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <article className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools by Category - SEO Structured */}
      {categories.map((category) => {
        const categoryTools = tools.filter(t => t.category === category.name);
        if (categoryTools.length === 0) return null;

        return (
          <section
            key={category.name}
            id={category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
            className="py-12 bg-white border-t"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{category.name} Calculators</h2>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {categoryTools.length} tools
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="group">
                    <article className="bg-gray-50 rounded-xl border border-gray-200 p-5 hover:bg-white hover:shadow-lg transition-all h-full">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {tool.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-white text-gray-500 text-xs px-2 py-0.5 rounded border">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-emerald-600 text-sm font-medium group-hover:underline">
                          Use Free →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Ad Before Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSenseAd adSlot="2386701555" adFormat="auto" style={{ display: 'block', minHeight: '90px' }} />
      </div>

      {/* SEO Footer Content */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">South Africa's #1 Financial Calculator Hub</h3>
              <p className="text-gray-400">
                Genius Insights provides free, accurate financial calculators for South Africans.
                All tools are updated with 2025 SARS tax tables, current interest rates, and
                NCR-compliant calculations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Popular Calculators</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/south-africa-income-tax-calculator" className="hover:text-white">→ Income Tax Calculator</Link></li>
                <li><Link href="/south-africa-tax-refund-calculator" className="hover:text-white">→ Tax Refund Calculator</Link></li>
                <li><Link href="/south-africa-overtime-calculator" className="hover:text-white">→ Overtime Calculator</Link></li>
                <li><Link href="/south-africa-pension-calculator" className="hover:text-white">→ Pension Calculator</Link></li>
                <li><Link href="/south-africa-leave-calculator" className="hover:text-white">→ Leave Calculator</Link></li>
                <li><Link href="/south-africa-credit-card-calculator" className="hover:text-white">→ Credit Card Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">More Calculators</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/south-africa-bond-calculator" className="hover:text-white">→ Bond Calculator</Link></li>
                <li><Link href="/south-africa-uif-calculator" className="hover:text-white">→ UIF Calculator</Link></li>
                <li><Link href="/south-africa-deposit-calculator" className="hover:text-white">→ Fixed Deposit Calculator</Link></li>
                <li><Link href="/south-africa-inflation-calculator" className="hover:text-white">→ Inflation Calculator</Link></li>
                <li><Link href="/south-africa-gratuity-calculator" className="hover:text-white">→ Gratuity Calculator</Link></li>
                <li><Link href="/south-africa-car-finance-calculator" className="hover:text-white">→ Car Finance Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Why Use Our Calculators?</h3>
              <ul className="space-y-2 text-gray-400">
                <li>✓ 100% Free - No registration required</li>
                <li>✓ SARS 2025/2026 Tax Year compliant</li>
                <li>✓ NCR-compliant loan calculations</li>
                <li>✓ Current prime rate: 11.75%</li>
                <li>✓ Updated monthly with latest rates</li>
                <li>✓ Mobile-friendly design</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 Genius Insights. All financial calculations are estimates only. Consult a professional for financial advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
