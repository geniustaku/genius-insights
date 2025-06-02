const fs = require('fs');
const path = require('path');

// Remaining calculators that need to be created
const remainingCalculators = [
  // Egypt
  {
    slug: 'egypt-loan-calculator',
    country: 'Egypt',
    flag: '🇪🇬',
    title: 'Egypt Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Egypt loan calculator for 2025. Calculate mortgage payments, personal loans, car loans with Egyptian bank rates.',
    currency: 'E£',
    type: 'loan',
    colorScheme: 'from-yellow-600 to-orange-600'
  },
  {
    slug: 'egypt-vat-calculator',
    country: 'Egypt',
    flag: '🇪🇬',
    title: 'Egypt VAT Calculator 2025 | 14% VAT Calculator',
    description: 'Free Egypt VAT calculator for 2025. Calculate 14% VAT on goods and services. Egyptian VAT calculations.',
    currency: 'E£',
    type: 'vat',
    vatRate: 14,
    colorScheme: 'from-yellow-600 to-orange-600'
  },
  
  // Morocco
  {
    slug: 'morocco-tax-calculator',
    country: 'Morocco',
    flag: '🇲🇦',
    title: 'Morocco Tax Calculator 2025 | Moroccan Income Tax Calculator',
    description: 'Free Morocco tax calculator for 2025. Calculate Moroccan income tax accurately. Updated with latest tax rates.',
    currency: 'DH',
    type: 'tax',
    colorScheme: 'from-red-600 to-green-600'
  },
  {
    slug: 'morocco-loan-calculator',
    country: 'Morocco',
    flag: '🇲🇦',
    title: 'Morocco Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Morocco loan calculator for 2025. Calculate mortgage payments, personal loans with Moroccan bank rates.',
    currency: 'DH',
    type: 'loan',
    colorScheme: 'from-red-600 to-green-600'
  },
  {
    slug: 'morocco-vat-calculator',
    country: 'Morocco',
    flag: '🇲🇦',
    title: 'Morocco VAT Calculator 2025 | 20% VAT Calculator',
    description: 'Free Morocco VAT calculator for 2025. Calculate 20% VAT on goods and services. Moroccan VAT calculations.',
    currency: 'DH',
    type: 'vat',
    vatRate: 20,
    colorScheme: 'from-red-600 to-green-600'
  },
  
  // Australia
  {
    slug: 'australia-tax-calculator',
    country: 'Australia',
    flag: '🇦🇺',
    title: 'Australia Tax Calculator 2025 | ATO Income Tax Calculator',
    description: 'Free Australia tax calculator for 2025. Calculate ATO income tax, Medicare levy accurately. Updated with latest Australian tax rates.',
    currency: 'A$',
    type: 'tax',
    colorScheme: 'from-blue-600 to-green-600'
  },
  {
    slug: 'australia-loan-calculator',
    country: 'Australia',
    flag: '🇦🇺',
    title: 'Australia Loan Calculator 2025 | Home Loan Calculator',
    description: 'Free Australia loan calculator for 2025. Calculate home loan payments, personal loans with Australian bank rates.',
    currency: 'A$',
    type: 'loan',
    colorScheme: 'from-blue-600 to-green-600'
  },
  {
    slug: 'australia-gst-calculator',
    country: 'Australia',
    flag: '🇦🇺',
    title: 'Australia GST Calculator 2025 | 10% GST Calculator',
    description: 'Free Australia GST calculator for 2025. Calculate 10% GST on goods and services. ATO compliant GST calculations.',
    currency: 'A$',
    type: 'vat',
    vatRate: 10,
    colorScheme: 'from-blue-600 to-green-600'
  },
  {
    slug: 'australia-super-calculator',
    country: 'Australia',
    flag: '🇦🇺',
    title: 'Australia Super Calculator 2025 | Superannuation Calculator',
    description: 'Free Australia superannuation calculator for 2025. Calculate super contributions, employer contributions, retirement savings.',
    currency: 'A$',
    type: 'investment',
    colorScheme: 'from-blue-600 to-green-600'
  },
  {
    slug: 'australia-investment-calculator',
    country: 'Australia',
    flag: '🇦🇺',
    title: 'Australia Investment Calculator 2025 | ASX Investment Calculator',
    description: 'Free Australia investment calculator for 2025. Calculate returns on ASX investments, shares, managed funds.',
    currency: 'A$',
    type: 'investment',
    colorScheme: 'from-blue-600 to-green-600'
  },
  
  // Germany
  {
    slug: 'germany-tax-calculator',
    country: 'Germany',
    flag: '🇩🇪',
    title: 'Germany Tax Calculator 2025 | German Income Tax Calculator',
    description: 'Free Germany tax calculator for 2025. Calculate German income tax, church tax, solidarity surcharge accurately.',
    currency: '€',
    type: 'tax',
    colorScheme: 'from-gray-600 to-red-600'
  },
  {
    slug: 'germany-loan-calculator',
    country: 'Germany',
    flag: '🇩🇪',
    title: 'Germany Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Germany loan calculator for 2025. Calculate mortgage payments, personal loans with German bank rates.',
    currency: '€',
    type: 'loan',
    colorScheme: 'from-gray-600 to-red-600'
  },
  {
    slug: 'germany-vat-calculator',
    country: 'Germany',
    flag: '🇩🇪',
    title: 'Germany VAT Calculator 2025 | 19% VAT Calculator',
    description: 'Free Germany VAT calculator for 2025. Calculate 19% VAT on goods and services. German VAT calculations.',
    currency: '€',
    type: 'vat',
    vatRate: 19,
    colorScheme: 'from-gray-600 to-red-600'
  },
  {
    slug: 'germany-investment-calculator',
    country: 'Germany',
    flag: '🇩🇪',
    title: 'Germany Investment Calculator 2025 | DAX Investment Calculator',
    description: 'Free Germany investment calculator for 2025. Calculate returns on DAX investments, ETFs, stocks.',
    currency: '€',
    type: 'investment',
    colorScheme: 'from-gray-600 to-red-600'
  },
  
  // France
  {
    slug: 'france-tax-calculator',
    country: 'France',
    flag: '🇫🇷',
    title: 'France Tax Calculator 2025 | French Income Tax Calculator',
    description: 'Free France tax calculator for 2025. Calculate French income tax, social contributions accurately.',
    currency: '€',
    type: 'tax',
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'france-loan-calculator',
    country: 'France',
    flag: '🇫🇷',
    title: 'France Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free France loan calculator for 2025. Calculate mortgage payments, personal loans with French bank rates.',
    currency: '€',
    type: 'loan',
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'france-vat-calculator',
    country: 'France',
    flag: '🇫🇷',
    title: 'France VAT Calculator 2025 | 20% VAT Calculator',
    description: 'Free France VAT calculator for 2025. Calculate 20% VAT on goods and services. French VAT calculations.',
    currency: '€',
    type: 'vat',
    vatRate: 20,
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'france-investment-calculator',
    country: 'France',
    flag: '🇫🇷',
    title: 'France Investment Calculator 2025 | CAC 40 Investment Calculator',
    description: 'Free France investment calculator for 2025. Calculate returns on CAC 40 investments, ETFs, stocks.',
    currency: '€',
    type: 'investment',
    colorScheme: 'from-blue-600 to-red-600'
  },
  
  // Singapore
  {
    slug: 'singapore-tax-calculator',
    country: 'Singapore',
    flag: '🇸🇬',
    title: 'Singapore Tax Calculator 2025 | IRAS Income Tax Calculator',
    description: 'Free Singapore tax calculator for 2025. Calculate IRAS income tax, CPF contributions accurately.',
    currency: 'S$',
    type: 'tax',
    colorScheme: 'from-red-600 to-blue-600'
  },
  {
    slug: 'singapore-loan-calculator',
    country: 'Singapore',
    flag: '🇸🇬',
    title: 'Singapore Loan Calculator 2025 | HDB & Private Property Loan Calculator',
    description: 'Free Singapore loan calculator for 2025. Calculate HDB and private property loan payments with Singapore bank rates.',
    currency: 'S$',
    type: 'loan',
    colorScheme: 'from-red-600 to-blue-600'
  },
  {
    slug: 'singapore-gst-calculator',
    country: 'Singapore',
    flag: '🇸🇬',
    title: 'Singapore GST Calculator 2025 | 9% GST Calculator',
    description: 'Free Singapore GST calculator for 2025. Calculate 9% GST on goods and services. IRAS compliant GST calculations.',
    currency: 'S$',
    type: 'vat',
    vatRate: 9,
    colorScheme: 'from-red-600 to-blue-600'
  },
  {
    slug: 'singapore-cpf-calculator',
    country: 'Singapore',
    flag: '🇸🇬',
    title: 'Singapore CPF Calculator 2025 | CPF Contribution Calculator',
    description: 'Free Singapore CPF calculator for 2025. Calculate CPF contributions, employer contributions, retirement savings.',
    currency: 'S$',
    type: 'investment',
    colorScheme: 'from-red-600 to-blue-600'
  },
  {
    slug: 'singapore-investment-calculator',
    country: 'Singapore',
    flag: '🇸🇬',
    title: 'Singapore Investment Calculator 2025 | SGX Investment Calculator',
    description: 'Free Singapore investment calculator for 2025. Calculate returns on SGX investments, REITs, stocks.',
    currency: 'S$',
    type: 'investment',
    colorScheme: 'from-red-600 to-blue-600'
  },
  
  // UAE
  {
    slug: 'uae-vat-calculator',
    country: 'UAE',
    flag: '🇦🇪',
    title: 'UAE VAT Calculator 2025 | 5% VAT Calculator',
    description: 'Free UAE VAT calculator for 2025. Calculate 5% VAT on goods and services. UAE VAT compliant calculations.',
    currency: 'AED',
    type: 'vat',
    vatRate: 5,
    colorScheme: 'from-green-600 to-red-600'
  },
  {
    slug: 'uae-loan-calculator',
    country: 'UAE',
    flag: '🇦🇪',
    title: 'UAE Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free UAE loan calculator for 2025. Calculate mortgage payments, personal loans with UAE bank rates.',
    currency: 'AED',
    type: 'loan',
    colorScheme: 'from-green-600 to-red-600'
  },
  {
    slug: 'uae-investment-calculator',
    country: 'UAE',
    flag: '🇦🇪',
    title: 'UAE Investment Calculator 2025 | DFM Investment Calculator',
    description: 'Free UAE investment calculator for 2025. Calculate returns on DFM investments, real estate, stocks.',
    currency: 'AED',
    type: 'investment',
    colorScheme: 'from-green-600 to-red-600'
  },
  
  // Brazil
  {
    slug: 'brazil-tax-calculator',
    country: 'Brazil',
    flag: '🇧🇷',
    title: 'Brazil Tax Calculator 2025 | Brazilian Income Tax Calculator',
    description: 'Free Brazil tax calculator for 2025. Calculate Brazilian income tax, INSS, FGTS accurately.',
    currency: 'R$',
    type: 'tax',
    colorScheme: 'from-green-600 to-yellow-600'
  },
  {
    slug: 'brazil-loan-calculator',
    country: 'Brazil',
    flag: '🇧🇷',
    title: 'Brazil Loan Calculator 2025 | Mortgage & Personal Loan Calculator',
    description: 'Free Brazil loan calculator for 2025. Calculate mortgage payments, personal loans with Brazilian bank rates.',
    currency: 'R$',
    type: 'loan',
    colorScheme: 'from-green-600 to-yellow-600'
  },
  {
    slug: 'brazil-investment-calculator',
    country: 'Brazil',
    flag: '🇧🇷',
    title: 'Brazil Investment Calculator 2025 | Bovespa Investment Calculator',
    description: 'Free Brazil investment calculator for 2025. Calculate returns on Bovespa investments, ETFs, stocks.',
    currency: 'R$',
    type: 'investment',
    colorScheme: 'from-green-600 to-yellow-600'
  },
  
  // Additional US calculators
  {
    slug: 'us-sales-tax-calculator',
    country: 'United States',
    flag: '🇺🇸',
    title: 'US Sales Tax Calculator 2025 | State Sales Tax Calculator',
    description: 'Free US sales tax calculator for 2025. Calculate state and local sales tax for all 50 states.',
    currency: '$',
    type: 'vat',
    vatRate: 8.5,
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'us-401k-calculator',
    country: 'United States',
    flag: '🇺🇸',
    title: 'US 401k Calculator 2025 | 401k Retirement Calculator',
    description: 'Free US 401k calculator for 2025. Calculate 401k contributions, employer matching, retirement savings.',
    currency: '$',
    type: 'investment',
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'us-investment-calculator',
    country: 'United States',
    flag: '🇺🇸',
    title: 'US Investment Calculator 2025 | Stock Market Investment Calculator',
    description: 'Free US investment calculator for 2025. Calculate returns on stock market investments, S&P 500, ETFs.',
    currency: '$',
    type: 'investment',
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'us-property-calculator',
    country: 'United States',
    flag: '🇺🇸',
    title: 'US Property Calculator 2025 | Real Estate Investment Calculator',
    description: 'Free US property calculator for 2025. Calculate real estate investment returns, rental yield, property taxes.',
    currency: '$',
    type: 'investment',
    colorScheme: 'from-blue-600 to-red-600'
  },
  {
    slug: 'us-student-loan-calculator',
    country: 'United States',
    flag: '🇺🇸',
    title: 'US Student Loan Calculator 2025 | Education Loan Calculator',
    description: 'Free US student loan calculator for 2025. Calculate student loan payments, interest, repayment plans.',
    currency: '$',
    type: 'loan',
    colorScheme: 'from-blue-600 to-red-600'
  },
  
  // Additional UK calculators
  {
    slug: 'uk-pension-calculator',
    country: 'United Kingdom',
    flag: '🇬🇧',
    title: 'UK Pension Calculator 2025 | UK Pension Planning Calculator',
    description: 'Free UK pension calculator for 2025. Calculate pension contributions, state pension, retirement planning.',
    currency: '£',
    type: 'investment',
    colorScheme: 'from-blue-600 to-purple-600'
  },
  {
    slug: 'uk-investment-calculator',
    country: 'United Kingdom',
    flag: '🇬🇧',
    title: 'UK Investment Calculator 2025 | ISA & Investment Calculator',
    description: 'Free UK investment calculator for 2025. Calculate ISA contributions, stock investments, FTSE returns.',
    currency: '£',
    type: 'investment',
    colorScheme: 'from-blue-600 to-purple-600'
  },
  {
    slug: 'uk-property-calculator',
    country: 'United Kingdom',
    flag: '🇬🇧',
    title: 'UK Property Calculator 2025 | Stamp Duty Calculator',
    description: 'Free UK property calculator for 2025. Calculate stamp duty, property investment returns, rental yield.',
    currency: '£',
    type: 'investment',
    colorScheme: 'from-blue-600 to-purple-600'
  },
  
  // Additional Canada calculators
  {
    slug: 'canada-rrsp-calculator',
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Canada RRSP Calculator 2025 | Retirement Planning Calculator',
    description: 'Free Canada RRSP calculator for 2025. Calculate RRSP contributions, tax benefits, retirement savings.',
    currency: 'C$',
    type: 'investment',
    colorScheme: 'from-red-600 to-blue-600'
  },
  {
    slug: 'canada-investment-calculator',
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Canada Investment Calculator 2025 | TFSA & Investment Calculator',
    description: 'Free Canada investment calculator for 2025. Calculate TFSA contributions, TSX investments, returns.',
    currency: 'C$',
    type: 'investment',
    colorScheme: 'from-red-600 to-blue-600'
  },
  
  // Additional Nigeria calculators
  {
    slug: 'nigeria-business-calculator',
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Nigeria Business Calculator 2025 | CAC Registration Cost Calculator',
    description: 'Free Nigeria business calculator for 2025. Calculate CAC registration costs, business setup fees.',
    currency: '₦',
    type: 'business',
    colorScheme: 'from-green-600 to-white'
  },
  {
    slug: 'nigeria-investment-calculator',
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Nigeria Investment Calculator 2025 | NSE Investment Calculator',
    description: 'Free Nigeria investment calculator for 2025. Calculate NSE investment returns, stock market returns.',
    currency: '₦',
    type: 'investment',
    colorScheme: 'from-green-600 to-white'
  },
  {
    slug: 'nigeria-property-calculator',
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Nigeria Property Calculator 2025 | Real Estate Investment Calculator',
    description: 'Free Nigeria property calculator for 2025. Calculate real estate investment returns, rental yield.',
    currency: '₦',
    type: 'investment',
    colorScheme: 'from-green-600 to-white'
  },
  
  // Additional Kenya calculators
  {
    slug: 'kenya-investment-calculator',
    country: 'Kenya',
    flag: '🇰🇪',
    title: 'Kenya Investment Calculator 2025 | NSE Investment Calculator',
    description: 'Free Kenya investment calculator for 2025. Calculate NSE investment returns, stock market returns.',
    currency: 'KSh',
    type: 'investment',
    colorScheme: 'from-green-600 to-red-600'
  },
  
  // Additional India calculators
  {
    slug: 'india-epf-calculator',
    country: 'India',
    flag: '🇮🇳',
    title: 'India EPF Calculator 2025 | Provident Fund Calculator',
    description: 'Free India EPF calculator for 2025. Calculate EPF contributions, employer contributions, retirement corpus.',
    currency: '₹',
    type: 'investment',
    colorScheme: 'from-orange-600 to-green-600'
  },
  {
    slug: 'india-investment-calculator',
    country: 'India',
    flag: '🇮🇳',
    title: 'India Investment Calculator 2025 | SIP & Mutual Fund Calculator',
    description: 'Free India investment calculator for 2025. Calculate SIP returns, mutual fund investments, stock market returns.',
    currency: '₹',
    type: 'investment',
    colorScheme: 'from-orange-600 to-green-600'
  }
];

// Templates for different calculator types
function generateTaxCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} tax calculator 2025', '${config.country.toLowerCase()} income tax calculator', 'tax calculator ${config.country}', '${config.country.toLowerCase()} tax rates', 'payroll tax ${config.country}'
  ],
  alternates: {
    canonical: '/${config.slug}',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.slug}',
    type: 'website',
    images: [
      {
        url: '/images/${config.slug}-og.jpg',
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
    images: ['/images/${config.slug}-og.jpg'],
  },
};

export default function ${config.country.replace(/\\s+/g, '')}${config.type.charAt(0).toUpperCase() + config.type.slice(1)}CalculatorPage() {
  return (
    <>
      <StructuredData type="tax-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br ${config.colorScheme} rounded-b-3xl">
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
                Calculate your exact ${config.country} income tax with the latest 2025 tax rates and brackets.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} Income Tax Calculator 2025</h2>
              <p className="text-gray-600">Calculate your ${config.country} income tax with current tax rates</p>
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
                
                <button className="w-full bg-gradient-to-r ${config.colorScheme} text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate ${config.country} Tax
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

function generateVATCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} VAT calculator', '${config.vatRate}% VAT calculator', '${config.country.toLowerCase()} VAT rates', 'VAT calculator ${config.country}'
  ],
  alternates: {
    canonical: '/${config.slug}',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.slug}',
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
                Calculate ${config.vatRate}% VAT on goods and services in ${config.country}.
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

function generateLoanCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} loan calculator', '${config.country.toLowerCase()} mortgage calculator', 'loan calculator ${config.country}', '${config.country.toLowerCase()} EMI calculator'
  ],
  alternates: {
    canonical: '/${config.slug}',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.slug}',
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
                Calculate loan payments and interest for mortgages, personal loans, and car loans in ${config.country}.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} Loan Calculator</h2>
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

function generateInvestmentCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} investment calculator', '${config.country.toLowerCase()} retirement calculator', 'investment calculator ${config.country}', '${config.country.toLowerCase()} pension calculator'
  ],
  alternates: {
    canonical: '/${config.slug}',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.slug}',
    type: 'website',
  },
};

export default function ${config.country.replace(/\\s+/g, '')}InvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br ${config.colorScheme} rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">${config.flag} Investment Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                ${config.country} Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment returns and retirement savings in ${config.country}.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} Investment Calculator</h2>
              <p className="text-gray-600">Calculate investment returns and retirement planning</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment (${config.currency})</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter initial investment amount"
                  />
                </div>
                
                <button className="w-full bg-gradient-to-r ${config.colorScheme} text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Investment Returns
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

function generateBusinessCalculatorTemplate(config) {
  return `import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '${config.title}',
  description: '${config.description}',
  keywords: [
    '${config.country.toLowerCase()} business calculator', '${config.country.toLowerCase()} business registration', 'business calculator ${config.country}', '${config.country.toLowerCase()} startup costs'
  ],
  alternates: {
    canonical: '/${config.slug}',
  },
  openGraph: {
    title: '${config.title}',
    description: '${config.description}',
    url: 'https://genius-insights.co.za/${config.slug}',
    type: 'website',
  },
};

export default function ${config.country.replace(/\\s+/g, '')}BusinessCalculatorPage() {
  return (
    <>
      <StructuredData type="business-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br ${config.colorScheme} rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">${config.flag} Business Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                ${config.country} Business Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate business registration costs and startup expenses in ${config.country}.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${config.country} Business Calculator</h2>
              <p className="text-gray-600">Calculate business registration and startup costs</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Limited Company</option>
                    <option>Partnership</option>
                    <option>Sole Proprietorship</option>
                  </select>
                </div>
                
                <button className="w-full bg-gradient-to-r ${config.colorScheme} text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Business Costs
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

// Generate all remaining calculator files
function generateAllRemainingCalculators() {
  const appDir = path.join(__dirname, '..', 'app');
  let createdCount = 0;
  
  remainingCalculators.forEach(config => {
    const dirPath = path.join(appDir, config.slug);
    const filePath = path.join(dirPath, 'page.tsx');
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipped (exists): ${filePath}`);
      return;
    }
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    let content;
    switch (config.type) {
      case 'tax':
        content = generateTaxCalculatorTemplate(config);
        break;
      case 'vat':
        content = generateVATCalculatorTemplate(config);
        break;
      case 'loan':
        content = generateLoanCalculatorTemplate(config);
        break;
      case 'investment':
        content = generateInvestmentCalculatorTemplate(config);
        break;
      case 'business':
        content = generateBusinessCalculatorTemplate(config);
        break;
      default:
        content = generateLoanCalculatorTemplate(config); // Default fallback
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
    createdCount++;
  });
  
  console.log(`\n✅ Created ${createdCount} new calculator pages!`);
  console.log(`Total calculators configured: ${remainingCalculators.length}`);
}

// Run the generator
generateAllRemainingCalculators();