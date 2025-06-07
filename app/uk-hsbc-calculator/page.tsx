'use client';

import { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

interface CalculationResults {
  resultProduct: string;
  resultAmount: string;
  resultRate: string;
  resultTier: string;
  monthlyAmount: string;
  totalInterest: string;
  totalAmount: string;
  hsbcSummary: string;
  tierBenefits: string;
}

interface ProductDefaults {
  amount: number;
  rate: number;
  term: number;
}

export default function UKHSBCCalculatorPage() {
  const [results, setResults] = useState<CalculationResults>({
    resultProduct: 'Residential Mortgage',
    resultAmount: '£350,000',
    resultRate: '5.89%',
    resultTier: 'HSBC Bank Account',
    monthlyAmount: '£2,320',
    totalInterest: '£346,000',
    totalAmount: '£696,000',
    hsbcSummary: 'HSBC residential mortgage of £350,000 at 5.89% over 25 years requires monthly payments of £2,320.',
    tierBenefits: 'Standard account: Basic banking services with digital access and branch support.'
  });

  const calculateHSBC = (): void => {
    const productTypeElement = document.getElementById('productType') as HTMLSelectElement;
    const amountElement = document.getElementById('amount') as HTMLInputElement;
    const interestRateElement = document.getElementById('interestRate') as HTMLInputElement;
    const termYearsElement = document.getElementById('termYears') as HTMLInputElement;
    const monthlyContributionElement = document.getElementById('monthlyContribution') as HTMLInputElement;
    const hsbcTierElement = document.getElementById('hsbcTier') as HTMLSelectElement;
    
    const productType = productTypeElement?.value || 'residential-mortgage';
    const amount = parseFloat(amountElement?.value || '350000') || 350000;
    const interestRate = parseFloat(interestRateElement?.value || '5.89') || 5.89;
    const termYears = parseFloat(termYearsElement?.value || '25') || 25;
    const monthlyContribution = parseFloat(monthlyContributionElement?.value || '0') || 0;
    const hsbcTier = hsbcTierElement?.value || 'standard';
    
    const productNames: Record<string, string> = {
      'residential-mortgage': 'Residential Mortgage',
      'buy-to-let-mortgage': 'Buy-to-Let Mortgage',
      'personal-loan': 'Personal Loan',
      'overdraft': 'Arranged Overdraft',
      'premier-savings': 'Premier Savings',
      'jade-savings': 'Jade Private Savings',
      'isa-cash': 'Cash ISA',
      'global-investment': 'Global Investment'
    };
    
    const tierNames: Record<string, string> = {
      'standard': 'HSBC Bank Account',
      'advance': 'HSBC Advance',
      'premier': 'HSBC Premier',
      'jade': 'HSBC Jade'
    };
    
    const tierBenefitsMap: Record<string, string> = {
      'standard': 'Standard account: Basic banking services with digital access and branch support.',
      'advance': 'Advance benefits: Enhanced savings rates, preferential loan rates, and priority customer service.',
      'premier': 'Premier benefits: Dedicated relationship manager, global banking, exclusive rates, and investment advice.',
      'jade': 'Jade private banking: Ultra-high net worth services, bespoke investment solutions, and global concierge services.'
    };
    
    // Tier rate adjustments
    const tierAdjustments: Record<string, number> = {
      'standard': 1.0,
      'advance': 0.985, // 1.5% better rates
      'premier': 0.96,  // 4% better rates
      'jade': 0.92      // 8% better rates
    };
    
    const adjustedRate = interestRate * tierAdjustments[hsbcTier];
    
    let monthlyAmount: number, totalInterest: number, totalAmount: number, summary: string;
    
    if (['residential-mortgage', 'buy-to-let-mortgage', 'personal-loan', 'overdraft'].includes(productType)) {
      // Loan calculations
      const monthlyRate = adjustedRate / 100 / 12;
      const numPayments = termYears * 12;
      
      if (productType === 'overdraft') {
        // Simple overdraft interest calculation
        monthlyAmount = amount * (adjustedRate / 100) / 12;
        totalInterest = monthlyAmount * 12 * termYears;
        totalAmount = amount + totalInterest;
        
        summary = `HSBC ${productNames[productType].toLowerCase()} of £${amount.toLocaleString()} at ${adjustedRate.toFixed(2)}% costs approximately £${Math.round(monthlyAmount).toLocaleString()} monthly in interest.`;
      } else {
        monthlyAmount = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        const totalPayments = monthlyAmount * numPayments;
        totalInterest = totalPayments - amount;
        totalAmount = totalPayments;
        
        summary = `HSBC ${productNames[productType].toLowerCase()} of £${amount.toLocaleString()} at ${adjustedRate.toFixed(2)}% over ${termYears} years requires monthly payments of £${Math.round(monthlyAmount).toLocaleString()}.`;
      }
    } else {
      // Investment/Savings calculations
      const annualRate = adjustedRate / 100;
      const compoundFrequency = 12;
      const totalMonths = termYears * 12;
      
      // Future value of lump sum
      const futureValueLumpSum = amount * Math.pow(1 + annualRate/compoundFrequency, compoundFrequency * termYears);
      
      // Future value of monthly contributions
      let futureValueContributions = 0;
      if (monthlyContribution > 0) {
        const monthlyRate = annualRate / 12;
        futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      }
      
      totalAmount = futureValueLumpSum + futureValueContributions;
      totalInterest = totalAmount - amount - (monthlyContribution * totalMonths);
      monthlyAmount = totalInterest / totalMonths; // Monthly interest earned
      
      summary = `HSBC ${productNames[productType].toLowerCase()} of £${amount.toLocaleString()} at ${adjustedRate.toFixed(2)}% over ${termYears} years will grow to £${Math.round(totalAmount).toLocaleString()}.`;
    }
    
    // Update results state
    setResults({
      resultProduct: productNames[productType],
      resultAmount: '£' + amount.toLocaleString(),
      resultRate: adjustedRate.toFixed(2) + '%',
      resultTier: tierNames[hsbcTier],
      monthlyAmount: '£' + Math.round(monthlyAmount).toLocaleString(),
      totalInterest: '£' + Math.round(totalInterest).toLocaleString(),
      totalAmount: '£' + Math.round(totalAmount).toLocaleString(),
      hsbcSummary: summary,
      tierBenefits: tierBenefitsMap[hsbcTier]
    });
  };

  const handleProductTypeChange = (): void => {
    const productTypeElement = document.getElementById('productType') as HTMLSelectElement;
    const productType = productTypeElement?.value;
    
    const defaults: Record<string, ProductDefaults> = {
      'residential-mortgage': { amount: 350000, rate: 5.89, term: 25 },
      'buy-to-let-mortgage': { amount: 300000, rate: 6.49, term: 25 },
      'personal-loan': { amount: 30000, rate: 5.9, term: 5 },
      'overdraft': { amount: 5000, rate: 39.9, term: 1 },
      'premier-savings': { amount: 50000, rate: 5.1, term: 1 },
      'jade-savings': { amount: 250000, rate: 5.4, term: 1 },
      'isa-cash': { amount: 20000, rate: 4.8, term: 1 },
      'global-investment': { amount: 100000, rate: 9.2, term: 10 }
    };
    
    const def = defaults[productType];
    if (def) {
      const amountElement = document.getElementById('amount') as HTMLInputElement;
      const interestRateElement = document.getElementById('interestRate') as HTMLInputElement;
      const termYearsElement = document.getElementById('termYears') as HTMLInputElement;
      
      if (amountElement) amountElement.value = def.amount.toString();
      if (interestRateElement) interestRateElement.value = def.rate.toString();
      if (termYearsElement) termYearsElement.value = def.term.toString();
    }
    
    calculateHSBC();
  };

  // Calculate on component mount
  useEffect(() => {
    calculateHSBC();
  }, []);

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-white">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-gray-800 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 HSBC UK</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                HSBC Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate HSBC mortgages, loans, savings, Premier banking, and Jade private banking products with competitive UK rates.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">HSBC Product Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments, returns, and benefits for HSBC's global banking solutions</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HSBC Product Type
                  </label>
                  <select id="productType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black" onChange={handleProductTypeChange}>
                    <option value="residential-mortgage">Residential Mortgage</option>
                    <option value="buy-to-let-mortgage">Buy-to-Let Mortgage</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="overdraft">Arranged Overdraft</option>
                    <option value="premier-savings">Premier Savings</option>
                    <option value="jade-savings">Jade Private Savings</option>
                    <option value="isa-cash">Cash ISA</option>
                    <option value="global-investment">Global Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (£)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="350,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    id="interestRate"
                    step="0.01"
                    placeholder="5.89"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    id="termYears"
                    placeholder="25"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Contribution (Optional)
                  </label>
                  <input
                    type="number"
                    id="monthlyContribution"
                    placeholder="1,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HSBC Banking Tier
                  </label>
                  <select id="hsbcTier" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="standard">HSBC Bank Account</option>
                    <option value="advance">HSBC Advance</option>
                    <option value="premier">HSBC Premier</option>
                    <option value="jade">HSBC Jade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HSBC Branch Location
                  </label>
                  <select id="branch" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="london-canary-wharf">London Canary Wharf</option>
                    <option value="london-oxford-street">London Oxford Street</option>
                    <option value="manchester">Manchester Market Street</option>
                    <option value="birmingham">Birmingham Bull Street</option>
                    <option value="edinburgh">Edinburgh Princes Street</option>
                    <option value="glasgow">Glasgow Buchanan Street</option>
                    <option value="bristol">Bristol Broadmead</option>
                    <option value="cardiff">Cardiff Queen Street</option>
                  </select>
                </div>

                <button 
                  onClick={calculateHSBC}
                  className="w-full bg-gradient-to-r from-red-600 to-gray-800 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate HSBC Product
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">HSBC Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold text-black">{results.resultProduct}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-black">{results.resultAmount}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-black">{results.resultRate}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Banking Tier:</span>
                    <span className="font-semibold text-black">{results.resultTier}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Payment/Return:</span>
                    <span className="font-semibold text-red-600 text-xl">{results.monthlyAmount}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest/Growth:</span>
                    <span className="font-semibold text-green-600">{results.totalInterest}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Amount:</span>
                    <span className="font-bold text-green-600 text-xl">{results.totalAmount}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">HSBC Summary</h4>
                  <p className="text-sm text-red-800">
                    {results.hsbcSummary}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Tier Benefits</h4>
                  <p className="text-sm text-yellow-800">
                    {results.tierBenefits}
                  </p>
                </div>
              </div>
            </div>

            {/* HSBC Products Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">HSBC Interest Rates 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Residential Mortgage</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">5.89%</div>
                  <p className="text-sm text-gray-600">2-year fixed rate</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Premier Savings</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">5.10%</div>
                  <p className="text-sm text-gray-600">Premier customer rate</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Cash ISA</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">4.80%</div>
                  <p className="text-sm text-gray-600">Tax-free savings</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Jade Savings</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">5.40%</div>
                  <p className="text-sm text-gray-600">Private banking rate</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Banking</h4>
                <p className="text-gray-600 text-sm">World's local bank with presence in 65+ countries</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💎</div>
                <h4 className="font-semibold text-gray-900 mb-2">Premier & Jade</h4>
                <p className="text-gray-600 text-sm">Premium banking with global privileges and concierge services</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-gray-900 mb-2">Investment Excellence</h4>
                <p className="text-gray-600 text-sm">Award-winning investment platform and wealth management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}