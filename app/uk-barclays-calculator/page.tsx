'use client';

import { useState } from 'react';
import StructuredData from '@/components/StructuredData';

export default function UKBarclaysCalculatorPage() {
  const [results, setResults] = useState({
    product: 'Residential Mortgage',
    amount: '£300,000',
    rate: '5.74%',
    tier: 'Standard Banking',
    monthlyAmount: '£1,945',
    totalInterest: '£283,500',
    totalAmount: '£583,500',
    summary: 'Barclays residential mortgage of £300,000 at 5.74% over 25 years requires monthly payments of £1,945.',
    benefits: 'Standard banking: Basic digital banking services and branch access.'
  });

  const calculateBarclays = () => {
    const productType = (document.getElementById('productType') as HTMLSelectElement)?.value || 'residential-mortgage';
    const amount = parseFloat((document.getElementById('amount') as HTMLInputElement)?.value) || 300000;
    const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement)?.value) || 5.74;
    const termYears = parseFloat((document.getElementById('termYears') as HTMLInputElement)?.value) || 25;
    const monthlyContribution = parseFloat((document.getElementById('monthlyContribution') as HTMLInputElement)?.value) || 0;
    const barclaysTier = (document.getElementById('barclaysTier') as HTMLSelectElement)?.value || 'standard';
    
    const productNames: { [key: string]: string } = {
      'residential-mortgage': 'Residential Mortgage',
      'buy-to-let-mortgage': 'Buy-to-Let Mortgage',
      'personal-loan': 'Personal Loan',
      'car-loan': 'Car Finance',
      'isa-savings': 'Cash ISA',
      'premier-savings': 'Premier Savings',
      'investment-isa': 'Stocks & Shares ISA',
      'pension-sipp': 'Barclays SIPP'
    };
    
    const tierNames: { [key: string]: string } = {
      'standard': 'Standard Banking',
      'premier': 'Barclays Premier',
      'private': 'Barclays Private Bank'
    };
    
    const tierBenefits: { [key: string]: string } = {
      'standard': 'Standard banking: Basic digital banking services and branch access.',
      'premier': 'Premier benefits: Dedicated relationship manager, exclusive rates, priority service, and global banking.',
      'private': 'Private banking: Ultra-high net worth services, investment management, and bespoke financial solutions.'
    };
    
    // Tier rate adjustments
    const tierAdjustments: { [key: string]: number } = {
      'standard': 1.0,
      'premier': 0.97, // 3% better rates
      'private': 0.94  // 6% better rates
    };
    
    const adjustedRate = interestRate * tierAdjustments[barclaysTier];
    
    let monthlyAmount, totalInterest, totalAmount, summary;
    
    if (['residential-mortgage', 'buy-to-let-mortgage', 'personal-loan', 'car-loan'].includes(productType)) {
      // Loan calculations
      const monthlyRate = adjustedRate / 100 / 12;
      const numPayments = termYears * 12;
      monthlyAmount = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalPayments = monthlyAmount * numPayments;
      totalInterest = totalPayments - amount;
      totalAmount = totalPayments;
      
      summary = `Barclays ${productNames[productType].toLowerCase()} of £${amount.toLocaleString()} at ${adjustedRate.toFixed(2)}% over ${termYears} years requires monthly payments of £${Math.round(monthlyAmount).toLocaleString()}.`;
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
      
      summary = `Barclays ${productNames[productType].toLowerCase()} of £${amount.toLocaleString()} at ${adjustedRate.toFixed(2)}% over ${termYears} years will grow to £${Math.round(totalAmount).toLocaleString()}.`;
    }
    
    // Update results
    setResults({
      product: productNames[productType],
      amount: '£' + amount.toLocaleString(),
      rate: adjustedRate.toFixed(2) + '%',
      tier: tierNames[barclaysTier],
      monthlyAmount: '£' + Math.round(monthlyAmount).toLocaleString(),
      totalInterest: '£' + Math.round(totalInterest).toLocaleString(),
      totalAmount: '£' + Math.round(totalAmount).toLocaleString(),
      summary: summary,
      benefits: tierBenefits[barclaysTier]
    });
  };
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-teal-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 Barclays Bank UK</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Barclays Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate Barclays mortgages, loans, savings, investments, and Premier banking products with current UK rates and terms.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Barclays Product Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments, returns, and benefits for Barclays banking products</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barclays Product Type
                  </label>
                  <select id="productType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black" onChange={() => {
                    const productType = (document.getElementById('productType') as HTMLSelectElement).value;
                    const defaults: { [key: string]: { amount: number, rate: number, term: number } } = {
                      'residential-mortgage': { amount: 300000, rate: 5.74, term: 25 },
                      'buy-to-let-mortgage': { amount: 250000, rate: 6.15, term: 25 },
                      'personal-loan': { amount: 25000, rate: 6.9, term: 5 },
                      'car-loan': { amount: 35000, rate: 7.2, term: 5 },
                      'isa-savings': { amount: 20000, rate: 4.65, term: 1 },
                      'premier-savings': { amount: 100000, rate: 4.85, term: 1 },
                      'investment-isa': { amount: 20000, rate: 8.5, term: 10 },
                      'pension-sipp': { amount: 40000, rate: 7.8, term: 20 }
                    };
                    
                    const def = defaults[productType];
                    if (def) {
                      (document.getElementById('amount') as HTMLInputElement).value = def.amount.toString();
                      (document.getElementById('interestRate') as HTMLInputElement).value = def.rate.toString();
                      (document.getElementById('termYears') as HTMLInputElement).value = def.term.toString();
                    }
                    
                    calculateBarclays();
                  }}>
                    <option value="residential-mortgage">Residential Mortgage</option>
                    <option value="buy-to-let-mortgage">Buy-to-Let Mortgage</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="car-loan">Car Finance</option>
                    <option value="isa-savings">Cash ISA</option>
                    <option value="premier-savings">Premier Savings</option>
                    <option value="investment-isa">Stocks & Shares ISA</option>
                    <option value="pension-sipp">Barclays SIPP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (£)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="300,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
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
                    placeholder="5.74"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
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
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Contribution (Optional)
                  </label>
                  <input
                    type="number"
                    id="monthlyContribution"
                    placeholder="500"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barclays Tier
                  </label>
                  <select id="barclaysTier" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="standard">Standard Banking</option>
                    <option value="premier">Barclays Premier</option>
                    <option value="private">Barclays Private Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barclays Branch
                  </label>
                  <select id="branch" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="london-canary-wharf">London Canary Wharf</option>
                    <option value="london-piccadilly">London Piccadilly Circus</option>
                    <option value="manchester">Manchester King Street</option>
                    <option value="birmingham">Birmingham New Street</option>
                    <option value="edinburgh">Edinburgh Princes Street</option>
                    <option value="bristol">Bristol Broadmead</option>
                    <option value="leeds">Leeds City Centre</option>
                    <option value="glasgow">Glasgow Buchanan Street</option>
                  </select>
                </div>

                <button 
                  onClick={() => {
                    calculateBarclays();
                  }}
                  className="w-full bg-gradient-to-r from-blue-900 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Barclays Product
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Barclays Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold text-black">{results.product}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-black">{results.amount}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-black">{results.rate}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Barclays Tier:</span>
                    <span className="font-semibold text-black">{results.tier}</span>
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
                  <h4 className="font-semibold text-blue-900 mb-2">Barclays Summary</h4>
                  <p className="text-sm text-blue-800">
                    {results.summary}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Premier Benefits</h4>
                  <p className="text-sm text-green-800">
                    {results.benefits}
                  </p>
                </div>
              </div>
            </div>

            {/* Barclays Products Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Barclays Interest Rates 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Residential Mortgage</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">5.74%</div>
                  <p className="text-sm text-gray-600">2-year fixed rate</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Buy-to-Let</h4>
                  <div className="text-2xl font-bold text-teal-600 mb-2">6.15%</div>
                  <p className="text-sm text-gray-600">Investment property</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Cash ISA</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">4.65%</div>
                  <p className="text-sm text-gray-600">Tax-free savings</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Premier Rate</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">4.85%</div>
                  <p className="text-sm text-gray-600">Premier customer bonus</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Barclays Heritage</h4>
                <p className="text-gray-600 text-sm">Over 330 years of banking excellence and innovation</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💎</div>
                <h4 className="font-semibold text-gray-900 mb-2">Premier Banking</h4>
                <p className="text-gray-600 text-sm">Exclusive rates and dedicated relationship managers</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Digital First</h4>
                <p className="text-gray-600 text-sm">Award-winning mobile app and online banking platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}