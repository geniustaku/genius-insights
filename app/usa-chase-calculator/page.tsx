'use client';

import { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

interface ChaseResults {
  resultProduct: string;
  resultAmount: string;
  resultRate: string;
  resultTier: string;
  monthlyAmount: string;
  totalInterest: string;
  totalAmount: string;
  chaseSummary: string;
  tierBenefits: string;
}

interface ChaseInputs {
  productType: string;
  amount: number;
  interestRate: number;
  termYears: number;
  monthlyContribution: number;
  chaseTier: string;
  state: string;
}

export default function USAChaseCalculatorPage() {
  const [inputs, setInputs] = useState<ChaseInputs>({
    productType: 'mortgage-conventional',
    amount: 500000,
    interestRate: 7.125,
    termYears: 30,
    monthlyContribution: 0,
    chaseTier: 'total-checking',
    state: 'new-york'
  });

  const [results, setResults] = useState<ChaseResults>({
    resultProduct: 'Conventional Mortgage',
    resultAmount: '$500,000',
    resultRate: '7.125%',
    resultTier: 'Chase Total Checking',
    monthlyAmount: '$3,395',
    totalInterest: '$722,200',
    totalAmount: '$1,222,200',
    chaseSummary: 'Chase conventional mortgage of $500,000 at 7.125% over 30 years requires monthly payments of $3,395.',
    tierBenefits: 'Total Checking: $12 monthly fee waived with $1,500 daily balance or qualifying direct deposit.'
  });

  const calculateChase = () => {
    const { productType, amount, interestRate, termYears, monthlyContribution, chaseTier } = inputs;
    
    const productNames = {
      'mortgage-conventional': 'Conventional Mortgage',
      'mortgage-jumbo': 'Jumbo Mortgage',
      'auto-loan': 'Chase Auto Loan',
      'personal-loan': 'Personal Loan',
      'savings-premier': 'Premier Savings',
      'cd-certificate': 'Certificate of Deposit',
      'investment-401k': 'Chase 401(k)',
      'private-client': 'Private Client Banking'
    };
    
    const tierNames = {
      'total-checking': 'Chase Total Checking',
      'premier-plus': 'Chase Premier Plus',
      'private-client': 'Chase Private Client',
      'sapphire-banking': 'Chase Sapphire Banking'
    };
    
    const tierBenefits = {
      'total-checking': 'Total Checking: $12 monthly fee waived with $1,500 daily balance or qualifying direct deposit.',
      'premier-plus': 'Premier Plus: No monthly fee with $15,000 combined balance. Priority service and enhanced rewards.',
      'private-client': 'Private Client: No fees with $250,000 combined balance. Dedicated advisor and exclusive rates.',
      'sapphire-banking': 'Sapphire Banking: No fees with $75,000 combined balance. Premium rewards and travel benefits.'
    };
    
    // Tier rate adjustments
    const tierAdjustments = {
      'total-checking': 1.0,
      'premier-plus': 0.975, // 2.5% better rates
      'private-client': 0.94, // 6% better rates
      'sapphire-banking': 0.96 // 4% better rates
    };
    
    const adjustedRate = interestRate * tierAdjustments[chaseTier as keyof typeof tierAdjustments];
    
    let monthlyAmount: number, totalInterest: number, totalAmount: number, summary: string;
    
    if (['mortgage-conventional', 'mortgage-jumbo', 'auto-loan', 'personal-loan'].includes(productType)) {
      // Loan calculations
      const monthlyRate = adjustedRate / 100 / 12;
      const numPayments = termYears * 12;
      monthlyAmount = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalPayments = monthlyAmount * numPayments;
      totalInterest = totalPayments - amount;
      totalAmount = totalPayments;
      
      summary = `Chase ${(productNames[productType as keyof typeof productNames] || '').toLowerCase()} of $${amount.toLocaleString()} at ${adjustedRate.toFixed(3)}% over ${termYears} years requires monthly payments of $${Math.round(monthlyAmount).toLocaleString()}.`;
    } else {
      // Investment/Savings calculations
      const annualRate = adjustedRate / 100;
      const compoundFrequency = productType === 'investment-401k' ? 12 : 12; // Monthly compounding
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
      
      if (productType === 'investment-401k') {
        summary = `Chase 401(k) with $${amount.toLocaleString()} initial and ${monthlyContribution > 0 ? '$' + monthlyContribution.toLocaleString() + ' monthly' : 'no monthly'} contributions at ${adjustedRate.toFixed(2)}% will grow to $${Math.round(totalAmount).toLocaleString()} over ${termYears} years.`;
      } else {
        summary = `Chase ${(productNames[productType as keyof typeof productNames] || '').toLowerCase()} of $${amount.toLocaleString()} at ${adjustedRate.toFixed(2)}% over ${termYears} years will grow to $${Math.round(totalAmount).toLocaleString()}.`;
      }
    }
    
    // Update results state
    setResults({
      resultProduct: productNames[productType as keyof typeof productNames] || '',
      resultAmount: '$' + amount.toLocaleString(),
      resultRate: adjustedRate.toFixed(3) + '%',
      resultTier: tierNames[chaseTier as keyof typeof tierNames] || '',
      monthlyAmount: '$' + Math.round(monthlyAmount).toLocaleString(),
      totalInterest: '$' + Math.round(totalInterest).toLocaleString(),
      totalAmount: '$' + Math.round(totalAmount).toLocaleString(),
      chaseSummary: summary,
      tierBenefits: tierBenefits[chaseTier as keyof typeof tierBenefits] || ''
    });
  };

  const handleProductTypeChange = (productType: string) => {
    const defaults = {
      'mortgage-conventional': { amount: 500000, rate: 7.125, term: 30 },
      'mortgage-jumbo': { amount: 850000, rate: 7.25, term: 30 },
      'auto-loan': { amount: 45000, rate: 6.99, term: 6 },
      'personal-loan': { amount: 35000, rate: 12.99, term: 5 },
      'savings-premier': { amount: 100000, rate: 4.75, term: 1 },
      'cd-certificate': { amount: 50000, rate: 5.15, term: 1 },
      'investment-401k': { amount: 50000, rate: 8.5, term: 20 },
      'private-client': { amount: 250000, rate: 5.25, term: 1 }
    };
    
    const def = defaults[productType as keyof typeof defaults];
    if (def) {
      setInputs(prev => ({
        ...prev,
        productType,
        amount: def.amount,
        interestRate: def.rate,
        termYears: def.term
      }));
    } else {
      setInputs(prev => ({ ...prev, productType }));
    }
  };

  // Calculate initial values on component mount
  useEffect(() => {
    calculateChase();
  }, []);

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-900 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 JPMorgan Chase & Co.</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Chase Bank Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate Chase mortgages, loans, savings, investments, and Private Client banking products with current US rates and terms.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Chase Bank Product Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments, returns, and benefits for America's largest bank</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chase Product Type
                  </label>
                  <select 
                    value={inputs.productType}
                    onChange={(e) => {
                      handleProductTypeChange(e.target.value);
                      setTimeout(calculateChase, 0);
                    }}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="mortgage-conventional">Conventional Mortgage</option>
                    <option value="mortgage-jumbo">Jumbo Mortgage</option>
                    <option value="auto-loan">Chase Auto Loan</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="savings-premier">Premier Savings</option>
                    <option value="cd-certificate">Certificate of Deposit</option>
                    <option value="investment-401k">Chase 401(k)</option>
                    <option value="private-client">Private Client Banking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.amount}
                    onChange={(e) => setInputs(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    placeholder="500,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, interestRate: parseFloat(e.target.value) || 0 }))}
                    step="0.01"
                    placeholder="7.125"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={inputs.termYears}
                    onChange={(e) => setInputs(prev => ({ ...prev, termYears: parseFloat(e.target.value) || 0 }))}
                    placeholder="30"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Contribution (Optional)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyContribution}
                    onChange={(e) => setInputs(prev => ({ ...prev, monthlyContribution: parseFloat(e.target.value) || 0 }))}
                    placeholder="1,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chase Banking Tier
                  </label>
                  <select 
                    value={inputs.chaseTier}
                    onChange={(e) => setInputs(prev => ({ ...prev, chaseTier: e.target.value }))}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="total-checking">Chase Total Checking</option>
                    <option value="premier-plus">Chase Premier Plus</option>
                    <option value="private-client">Chase Private Client</option>
                    <option value="sapphire-banking">Chase Sapphire Banking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Region
                  </label>
                  <select 
                    value={inputs.state}
                    onChange={(e) => setInputs(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="new-york">New York</option>
                    <option value="california">California</option>
                    <option value="texas">Texas</option>
                    <option value="florida">Florida</option>
                    <option value="illinois">Illinois</option>
                    <option value="ohio">Ohio</option>
                    <option value="michigan">Michigan</option>
                    <option value="arizona">Arizona</option>
                  </select>
                </div>

                <button 
                  onClick={calculateChase}
                  className="w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Chase Product
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Chase Calculation Results</h3>
                
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
                    <span className="font-semibold text-blue-600 text-xl">{results.monthlyAmount}</span>
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

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Chase Summary</h4>
                  <p className="text-sm text-blue-800">
                    {results.chaseSummary}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Tier Benefits</h4>
                  <p className="text-sm text-purple-800">
                    {results.tierBenefits}
                  </p>
                </div>
              </div>
            </div>

            {/* Chase Products Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Chase Interest Rates 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">30-Year Mortgage</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">7.125%</div>
                  <p className="text-sm text-gray-600">Conventional loan</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Auto Loan</h4>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">6.99%</div>
                  <p className="text-sm text-gray-600">New vehicle financing</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Premier Savings</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">4.75%</div>
                  <p className="text-sm text-gray-600">Premier Plus members</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">12-Month CD</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">5.15%</div>
                  <p className="text-sm text-gray-600">Certificate of deposit</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-gray-900 mb-2">America's Largest Bank</h4>
                <p className="text-gray-600 text-sm">$3.7 trillion in assets with nationwide branch network</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💎</div>
                <h4 className="font-semibold text-gray-900 mb-2">Private Client</h4>
                <p className="text-gray-600 text-sm">Exclusive banking for $250k+ with dedicated advisors</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Digital Innovation</h4>
                <p className="text-gray-600 text-sm">Award-winning mobile app and online banking platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}