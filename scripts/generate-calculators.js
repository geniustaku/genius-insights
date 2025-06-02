const fs = require('fs');
const path = require('path');

// Calculator configurations for all countries
const calculatorConfigs = {
  // Tax Calculators
  'kenya-tax-calculator': {
    country: 'Kenya',
    flag: '🇰🇪',
    title: 'Kenya Tax Calculator 2025 | KRA Income Tax & PAYE Calculator',
    description: 'Free Kenya tax calculator for 2025. Calculate KRA income tax, PAYE, NHIF, NSSF accurately. Updated with latest Kenyan tax rates & brackets.',
    currency: 'KSh',
    taxAuthority: 'KRA',
    brackets: [
      { bracket: 'KSh 0 - 288,000', rate: '10%' },
      { bracket: 'KSh 288,001 - 388,000', rate: '25%' },
      { bracket: 'KSh 388,001 - 6,000,000', rate: '30%' },
      { bracket: 'KSh 6,000,001 - 9,600,000', rate: '32.5%' },
      { bracket: 'KSh 9,600,001+', rate: '35%' }
    ],
    allowances: ['Personal relief: KSh 28,800 per year', 'NHIF contribution relief', 'NSSF contribution relief'],
    colorScheme: 'from-green-600 to-emerald-600'
  },
  
  'ghana-tax-calculator': {
    country: 'Ghana',
    flag: '🇬🇭',
    title: 'Ghana Tax Calculator 2025 | GRA Income Tax & PAYE Calculator',
    description: 'Free Ghana tax calculator for 2025. Calculate GRA income tax, PAYE, SSNIT accurately. Updated with latest Ghanaian tax rates & brackets.',
    currency: '₵',
    taxAuthority: 'GRA',
    brackets: [
      { bracket: '₵0 - 4,500', rate: '0%' },
      { bracket: '₵4,501 - 7,200', rate: '5%' },
      { bracket: '₵7,201 - 48,000', rate: '10%' },
      { bracket: '₵48,001 - 220,000', rate: '17.5%' },
      { bracket: '₵220,001+', rate: '25%' }
    ],
    allowances: ['Tax-free threshold: ₵4,500', 'SSNIT contribution relief', 'Pension contribution relief'],
    colorScheme: 'from-yellow-600 to-orange-600'
  },

  'canada-tax-calculator': {
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Canada Tax Calculator 2025 | CRA Income Tax & Federal/Provincial Calculator',
    description: 'Free Canada tax calculator for 2025. Calculate CRA federal and provincial income tax, CPP, EI accurately. Updated with latest Canadian tax rates.',
    currency: 'C$',
    taxAuthority: 'CRA',
    brackets: [
      { bracket: 'C$0 - 53,359', rate: '15%' },
      { bracket: 'C$53,360 - 106,717', rate: '20.5%' },
      { bracket: 'C$106,718 - 165,430', rate: '26%' },
      { bracket: 'C$165,431 - 235,675', rate: '29%' },
      { bracket: 'C$235,676+', rate: '33%' }
    ],
    allowances: ['Basic personal amount: C$15,000', 'CPP/EI contributions', 'Provincial tax credits'],
    colorScheme: 'from-red-600 to-red-700'
  },

  'us-tax-calculator': {
    country: 'United States',
    flag: '🇺🇸',
    title: 'US Tax Calculator 2025 | IRS Federal Income Tax Calculator',
    description: 'Free US tax calculator for 2025. Calculate IRS federal income tax, Social Security, Medicare, state taxes. Updated with latest American tax brackets.',
    currency: '$',
    taxAuthority: 'IRS',
    brackets: [
      { bracket: '$0 - 11,000', rate: '10%' },
      { bracket: '$11,001 - 44,725', rate: '12%' },
      { bracket: '$44,726 - 95,375', rate: '22%' },
      { bracket: '$95,376 - 182,050', rate: '24%' },
      { bracket: '$182,051 - 231,250', rate: '32%' },
      { bracket: '$231,251 - 578,125', rate: '35%' },
      { bracket: '$578,126+', rate: '37%' }
    ],
    allowances: ['Standard deduction: $13,850 (single)', 'Social Security: 6.2%', 'Medicare: 1.45%'],
    colorScheme: 'from-blue-600 to-indigo-600'
  },

  'india-tax-calculator': {
    country: 'India',
    flag: '🇮🇳',
    title: 'India Tax Calculator 2025 | Income Tax Calculator FY 2024-25',
    description: 'Free India tax calculator for FY 2024-25. Calculate income tax under old and new tax regime, TDS, advance tax. Updated with latest Indian tax slabs.',
    currency: '₹',
    taxAuthority: 'Income Tax Department',
    brackets: [
      { bracket: '₹0 - 2,50,000', rate: '0%' },
      { bracket: '₹2,50,001 - 5,00,000', rate: '5%' },
      { bracket: '₹5,00,001 - 10,00,000', rate: '20%' },
      { bracket: '₹10,00,001+', rate: '30%' }
    ],
    allowances: ['Standard deduction: ₹50,000', 'Section 80C: ₹1,50,000', 'HRA exemption available'],
    colorScheme: 'from-orange-600 to-red-600'
  }
};

// VAT/GST Calculator configurations
const vatConfigs = {
  'nigeria-vat-calculator': {
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Nigeria VAT Calculator 2025 | 7.5% VAT Calculator',
    description: 'Free Nigeria VAT calculator for 2025. Calculate 7.5% VAT on goods and services. FIRS compliant VAT calculations for Nigerian businesses.',
    vatRate: 7.5,
    currency: '₦',
    colorScheme: 'from-green-600 to-emerald-600'
  },
  
  'kenya-vat-calculator': {
    country: 'Kenya',
    flag: '🇰🇪',
    title: 'Kenya VAT Calculator 2025 | 16% VAT Calculator',
    description: 'Free Kenya VAT calculator for 2025. Calculate 16% VAT on goods and services. KRA compliant VAT calculations for Kenyan businesses.',
    vatRate: 16,
    currency: 'KSh',
    colorScheme: 'from-green-600 to-emerald-600'
  },

  'ghana-vat-calculator': {
    country: 'Ghana',
    flag: '🇬🇭',
    title: 'Ghana VAT Calculator 2025 | 12.5% VAT Calculator',
    description: 'Free Ghana VAT calculator for 2025. Calculate 12.5% VAT on goods and services. GRA compliant VAT calculations for Ghanaian businesses.',
    vatRate: 12.5,
    currency: '₵',
    colorScheme: 'from-yellow-600 to-orange-600'
  },

  'uk-vat-calculator': {
    country: 'United Kingdom',
    flag: '🇬🇧',
    title: 'UK VAT Calculator 2025 | 20% VAT Calculator',
    description: 'Free UK VAT calculator for 2025. Calculate 20% VAT on goods and services. HMRC compliant VAT calculations for British businesses.',
    vatRate: 20,
    currency: '£',
    colorScheme: 'from-blue-600 to-indigo-600'
  },

  'canada-gst-calculator': {
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Canada GST/HST Calculator 2025 | GST HST Calculator',
    description: 'Free Canada GST/HST calculator for 2025. Calculate GST, HST, PST for all provinces. CRA compliant tax calculations for Canadian businesses.',
    vatRate: 13,
    currency: 'C$',
    colorScheme: 'from-red-600 to-red-700'
  },

  'india-gst-calculator': {
    country: 'India',
    flag: '🇮🇳',
    title: 'India GST Calculator 2025 | 18% GST Calculator',
    description: 'Free India GST calculator for 2025. Calculate CGST, SGST, IGST at 5%, 12%, 18%, 28% rates. GST compliant calculations for Indian businesses.',
    vatRate: 18,
    currency: '₹',
    colorScheme: 'from-orange-600 to-red-600'
  }
};

// Loan Calculator configurations  
const loanConfigs = {
  'nigeria-loan-calculator': {
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Nigeria Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Nigeria loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Nigerian bank rates. EMI calculator for Nigerian loans.',
    currency: '₦',
    colorScheme: 'from-green-600 to-emerald-600'
  },

  'kenya-loan-calculator': {
    country: 'Kenya',
    flag: '🇰🇪',
    title: 'Kenya Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Kenya loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Kenyan bank rates. EMI calculator for Kenyan loans.',
    currency: 'KSh',
    colorScheme: 'from-green-600 to-emerald-600'
  },

  'ghana-loan-calculator': {
    country: 'Ghana',
    flag: '🇬🇭',
    title: 'Ghana Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Ghana loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Ghanaian bank rates. EMI calculator for Ghanaian loans.',
    currency: '₵',
    colorScheme: 'from-yellow-600 to-orange-600'
  },

  'uk-loan-calculator': {
    country: 'United Kingdom',
    flag: '🇬🇧', 
    title: 'UK Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free UK loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with British bank rates. Repayment calculator for UK loans.',
    currency: '£',
    colorScheme: 'from-blue-600 to-indigo-600'
  },

  'canada-loan-calculator': {
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Canada Loan Calculator 2025 | Mortgage & Personal Loan Calculator', 
    description: 'Free Canada loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Canadian bank rates. Payment calculator for Canadian loans.',
    currency: 'C$',
    colorScheme: 'from-red-600 to-red-700'
  },

  'us-loan-calculator': {
    country: 'United States',
    flag: '🇺🇸',
    title: 'US Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free US loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with American bank rates. Payment calculator for US loans.',
    currency: '$',
    colorScheme: 'from-blue-600 to-indigo-600'
  },

  'india-loan-calculator': {
    country: 'India', 
    flag: '🇮🇳',
    title: 'India Loan Calculator 2025 | Home Loan EMI Calculator',
    description: 'Free India loan calculator for 2025. Calculate home loan EMI, personal loan EMI, car loan EMI with Indian bank rates. EMI calculator for Indian loans.',
    currency: '₹',
    colorScheme: 'from-orange-600 to-red-600'
  }
};

// Template for tax calculator pages
function generateTaxCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} tax calculator 2025', '${config.taxAuthority} tax calculator', '${config.country.toLowerCase()} income tax calculator', 'PAYE calculator ${config.country}', '${config.country.toLowerCase()} tax rates', 'payroll tax ${config.country}', 'income tax ${config.country.toLowerCase()}'
  ],
  alternates: {
    canonical: '/${config.country.toLowerCase().replace(/\\s+/g, '-')}-tax-calculator',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.country.toLowerCase().replace(/\\s+/g, '-')}-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/${config.country.toLowerCase().replace(/\\s+/g, '-')}-tax-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '${config.country} Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${config.title}',
    description: '${config.description}',
    images: ['/images/${config.country.toLowerCase().replace(/\\s+/g, '-')}-tax-calculator-og.jpg'],
  },
};

export default function ${config.country.replace(/\\s+/g, '')}TaxCalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br ${config.colorScheme} rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">${config.flag} 2025 Tax Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                ${config.country} Tax Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact ${config.taxAuthority} income tax and PAYE with the latest 2025 ${config.country} tax rates, 
                allowances, and brackets. Trusted by thousands of ${config.country} taxpayers.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} Income Tax Calculator 2025</h2>
              <p className="text-gray-600">Calculate your ${config.country} income tax with current ${config.taxAuthority} rates</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Gross Income (${config.currency})</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your annual gross income"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
                
                <button className="w-full bg-gradient-to-r ${config.colorScheme} text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate ${config.country} Tax
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  2025 ${config.country} Tax Brackets
                </h2>
                
                <div className="space-y-4">
                  ${config.brackets.map((item, index) => `
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">${item.bracket}</span>
                      <span className="text-lg font-bold text-gray-900">${item.rate}</span>
                    </div>
                  </div>`).join('')}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Tax Allowances & Deductions
                </h3>
                
                <div className="space-y-4">
                  ${config.allowances.map(allowance => `
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">${allowance}</span>
                  </div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}`;
}

// Template for VAT calculators
function generateVATCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} VAT calculator', '${config.vatRate}% VAT calculator', '${config.country.toLowerCase()} VAT rates', 'VAT calculator ${config.country}', '${config.country.toLowerCase()} sales tax'
  ],
  alternates: {
    canonical: '/${config.country.toLowerCase().replace(/\\s+/g, '-')}-vat-calculator',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.country.toLowerCase().replace(/\\s+/g, '-')}-vat-calculator',
    type: 'website',
  },
};

export default function ${config.country.replace(/\\s+/g, '')}VATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br ${config.colorScheme} rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">${config.flag} ${config.vatRate}% VAT Rate</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                ${config.country} VAT Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate ${config.vatRate}% VAT on goods and services in ${config.country}. Free VAT calculator for ${config.country} businesses and consumers.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} VAT Calculator</h2>
              <p className="text-gray-600">Calculate ${config.vatRate}% VAT inclusive and exclusive amounts</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (${config.currency})</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Add VAT (VAT Exclusive to VAT Inclusive)</option>
                    <option>Remove VAT (VAT Inclusive to VAT Exclusive)</option>
                  </select>
                </div>
                
                <button className="w-full bg-gradient-to-r ${config.colorScheme} text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate VAT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}`;
}

// Template for loan calculators
function generateLoanCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} loan calculator', '${config.country.toLowerCase()} mortgage calculator', 'loan calculator ${config.country}', '${config.country.toLowerCase()} EMI calculator', '${config.country.toLowerCase()} home loan'
  ],
  alternates: {
    canonical: '/${config.country.toLowerCase().replace(/\\s+/g, '-')}-loan-calculator',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.country.toLowerCase().replace(/\\s+/g, '-')}-loan-calculator',
    type: 'website',
  },
};

export default function ${config.country.replace(/\\s+/g, '')}LoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br ${config.colorScheme} rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">${config.flag} Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                ${config.country} Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate loan payments, EMI, and interest for mortgages, personal loans, and car loans in ${config.country}.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} Loan & Mortgage Calculator</h2>
              <p className="text-gray-600">Calculate monthly payments and total interest for your loan</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (${config.currency})</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 8.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Years)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 20"
                    />
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r ${config.colorScheme} text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Loan Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}`;
}

// Generate all calculator files
function generateAllCalculators() {
  const appDir = path.join(__dirname, '..', 'app');
  
  // Generate tax calculators
  Object.entries(calculatorConfigs).forEach(([slug, config]) => {
    const dirPath = path.join(appDir, slug);
    const filePath = path.join(dirPath, 'page.tsx');
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const content = generateTaxCalculatorTemplate(config);
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  });
  
  // Generate VAT calculators
  Object.entries(vatConfigs).forEach(([slug, config]) => {
    const dirPath = path.join(appDir, slug);
    const filePath = path.join(dirPath, 'page.tsx');
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const content = generateVATCalculatorTemplate(config);
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  });
  
  // Generate loan calculators
  Object.entries(loanConfigs).forEach(([slug, config]) => {
    const dirPath = path.join(appDir, slug);
    const filePath = path.join(dirPath, 'page.tsx');
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const content = generateLoanCalculatorTemplate(config);
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  });
  
  console.log('\n✅ All calculator pages generated successfully!');
  console.log('Total pages created:', Object.keys(calculatorConfigs).length + Object.keys(vatConfigs).length + Object.keys(loanConfigs).length);
}

// Run the generator
generateAllCalculators();