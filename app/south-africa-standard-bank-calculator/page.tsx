'use client';

import StructuredData from '@/components/StructuredData';
import { useEffect } from 'react';

export default function SouthAfricaStandardBankCalculatorPage() {
  
  const calculateStandardBank = () => {
    const productType = (document.getElementById('productType') as HTMLSelectElement)?.value;
    const amount = parseFloat((document.getElementById('amount') as HTMLInputElement)?.value || '0') || 1500000;
    const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement)?.value || '0') || 11.75;
    const termYears = parseFloat((document.getElementById('termYears') as HTMLInputElement)?.value || '0') || 20;
    const monthlyContribution = parseFloat((document.getElementById('monthlyContribution') as HTMLInputElement)?.value || '0') || 0;
    
    const productNames: Record<string, string> = {
      'home-loan': 'Home Loan',
      'personal-loan': 'Personal Loan', 
      'vehicle-loan': 'Vehicle & Asset Finance',
      'credit-card': 'Credit Card',
      'savings': 'PureSave Account',
      'fixed-deposit': 'Fixed Deposit',
      'investment': 'Unit Trust Investment'
    };
    
    let monthlyAmount, totalInterest, totalAmount, summary;
    
    if (['home-loan', 'personal-loan', 'vehicle-loan', 'credit-card'].includes(productType)) {
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = termYears * 12;
      monthlyAmount = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalPayments = monthlyAmount * numPayments;
      totalInterest = totalPayments - amount;
      totalAmount = totalPayments;
      
      summary = `Standard Bank ${productNames[productType].toLowerCase()} of R${amount.toLocaleString()} at ${interestRate}% over ${termYears} years requires monthly payments of R${Math.round(monthlyAmount).toLocaleString()}.`;
    } else {
      const annualRate = interestRate / 100;
      const compoundFrequency = 12;
      const totalMonths = termYears * 12;
      
      const futureValueLumpSum = amount * Math.pow(1 + annualRate/compoundFrequency, compoundFrequency * termYears);
      
      let futureValueContributions = 0;
      if (monthlyContribution > 0) {
        const monthlyRate = annualRate / 12;
        futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      }
      
      totalAmount = futureValueLumpSum + futureValueContributions;
      totalInterest = totalAmount - amount - (monthlyContribution * totalMonths);
      monthlyAmount = totalInterest / totalMonths;
      
      summary = `Standard Bank ${productNames[productType].toLowerCase()} of R${amount.toLocaleString()} at ${interestRate}% over ${termYears} years will grow to R${Math.round(totalAmount).toLocaleString()}.`;
    }
    
    const elements = {
      resultProduct: productNames[productType],
      resultAmount: 'R' + amount.toLocaleString(),
      resultRate: interestRate + '%',
      resultTerm: termYears + ' years',
      monthlyAmount: 'R' + Math.round(monthlyAmount).toLocaleString(),
      totalInterest: 'R' + Math.round(totalInterest).toLocaleString(),
      totalAmount: 'R' + Math.round(totalAmount).toLocaleString(),
      bankSummary: summary
    };
    
    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
  };

  const handleProductTypeChange = () => {
    const productType = (document.getElementById('productType') as HTMLSelectElement)?.value as 'home-loan' | 'personal-loan' | 'vehicle-loan' | 'credit-card' | 'savings' | 'fixed-deposit' | 'investment';
    const defaults = {
      'home-loan': { amount: 1500000, rate: 11.75, term: 20 },
      'personal-loan': { amount: 150000, rate: 15.5, term: 5 },
      'vehicle-loan': { amount: 350000, rate: 12.5, term: 6 },
      'credit-card': { amount: 50000, rate: 21.5, term: 1 },
      'savings': { amount: 100000, rate: 5.5, term: 5 },
      'fixed-deposit': { amount: 50000, rate: 7.25, term: 1 },
      'investment': { amount: 100000, rate: 9.5, term: 10 }
    };
    
    const def = defaults[productType];
    if (def) {
      const amountInput = document.getElementById('amount') as HTMLInputElement;
      const rateInput = document.getElementById('interestRate') as HTMLInputElement;
      const termInput = document.getElementById('termYears') as HTMLInputElement;
      
      if (amountInput) amountInput.value = def.amount.toString();
      if (rateInput) rateInput.value = def.rate.toString();
      if (termInput) termInput.value = def.term.toString();
    }
    
    calculateStandardBank();
  };

  useEffect(() => {
    // Set default values on component mount
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const rateInput = document.getElementById('interestRate') as HTMLInputElement;
    const termInput = document.getElementById('termYears') as HTMLInputElement;
    
    if (amountInput && !amountInput.value) amountInput.value = '1500000';
    if (rateInput && !rateInput.value) rateInput.value = '11.75';
    if (termInput && !termInput.value) termInput.value = '20';
    
    calculateStandardBank();
  }, []);

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇿🇦 Standard Bank South Africa</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Standard Bank Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate Standard Bank loans, savings, investments, and insurance products with current 2025 rates and terms.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Standard Bank Product Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments, returns, and costs for Standard Bank products</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type
                  </label>
                  <select 
                    id="productType" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black" 
                    onChange={handleProductTypeChange}
                  >
                    <option value="home-loan">Home Loan</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="vehicle-loan">Vehicle & Asset Finance</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="savings">Savings Account</option>
                    <option value="fixed-deposit">Fixed Deposit</option>
                    <option value="investment">Unit Trust Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (R)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="1,500,000"
                    defaultValue="1500000"
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
                    placeholder="11.75"
                    defaultValue="11.75"
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
                    placeholder="20"
                    defaultValue="20"
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
                    placeholder="2,000"
                    defaultValue="0"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Bank Branch
                  </label>
                  <select id="branch" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="johannesburg">Johannesburg CBD</option>
                    <option value="sandton">Sandton City</option>
                    <option value="cape-town">Cape Town V&A Waterfront</option>
                    <option value="durban">Durban Gateway</option>
                    <option value="pretoria">Pretoria Menlyn</option>
                    <option value="bloemfontein">Bloemfontein Central</option>
                    <option value="port-elizabeth">Port Elizabeth Greenacres</option>
                    <option value="east-london">East London Hemingways</option>
                  </select>
                </div>

                <button 
                  onClick={calculateStandardBank}
                  className="w-full bg-gradient-to-r from-blue-800 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Standard Bank Product
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Standard Bank Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold text-black" id="resultProduct">Home Loan</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-black" id="resultAmount">R1,500,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-black" id="resultRate">11.75%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Term:</span>
                    <span className="font-semibold text-black" id="resultTerm">20 years</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Payment/Return:</span>
                    <span className="font-semibold text-blue-600 text-xl" id="monthlyAmount">R18,450</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest/Growth:</span>
                    <span className="font-semibold text-green-600" id="totalInterest">R2,928,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Amount:</span>
                    <span className="font-bold text-green-600 text-xl" id="totalAmount">R4,428,000</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Standard Bank Summary</h4>
                  <p className="text-sm text-blue-800" id="bankSummary">
                    Standard Bank home loan of R1,500,000 at 11.75% over 20 years requires monthly payments of R18,450.
                  </p>
                </div>
              </div>
            </div>

            {/* Standard Bank Products & Services */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Standard Bank Products 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Home Loans</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">From 11.75%</div>
                  <p className="text-sm text-gray-600">Up to R10 million bond</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Loans</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">From 15.5%</div>
                  <p className="text-sm text-gray-600">Up to R300,000</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Vehicle Finance</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">From 12.5%</div>
                  <p className="text-sm text-gray-600">New & used vehicles</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Investments</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">9.5%+ Returns</div>
                  <p className="text-sm text-gray-600">Unit trusts & savings</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Banking</h4>
                <p className="text-gray-600 text-sm">Loans, savings, investments, and insurance products</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">Digital Banking</h4>
                <p className="text-gray-600 text-sm">Online and mobile banking with instant approvals</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure & Trusted</h4>
                <p className="text-gray-600 text-sm">150+ years of banking excellence in South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}