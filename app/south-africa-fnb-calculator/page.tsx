'use client';

import { useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

declare global {
  interface Window {
    calculateFNB: () => void;
  }
}

export default function SouthAfricaFNBCalculatorPage() {
  useEffect(() => {
    // Define the calculation function
    window.calculateFNB = function() {
      const productType = (document.getElementById('productType') as HTMLSelectElement)?.value || 'home-loan';
      const amount = parseFloat((document.getElementById('amount') as HTMLInputElement)?.value) || 1800000;
      const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement)?.value) || 11.5;
      const termYears = parseFloat((document.getElementById('termYears') as HTMLInputElement)?.value) || 20;
      const monthlySpending = parseFloat((document.getElementById('monthlySpending') as HTMLInputElement)?.value) || 15000;
      const ebucksLevel = (document.getElementById('ebucksLevel') as HTMLSelectElement)?.value || 'red';
      
      const productNames: { [key: string]: string } = {
        'home-loan': 'FNB Home Loan',
        'personal-loan': 'Personal Loan',
        'vehicle-finance': 'Vehicle Finance',
        'student-loan': 'Student Loan',
        'ebucks-savings': 'eBucks Savings',
        'notice-deposit': '32-Day Notice Deposit',
        'unit-trust': 'Unit Trust Investment',
        'flexi-fixed-deposit': 'Flexi Fixed Deposit'
      };
      
      const ebucksRates: { [key: string]: number } = {
        'red': 0.01,
        'gold': 0.02,
        'platinum': 0.03,
        'private': 0.04
      };
      
      let monthlyAmount: number, totalInterest: number, totalAmount: number, summary: string;
      
      if (['home-loan', 'personal-loan', 'vehicle-finance', 'student-loan'].includes(productType)) {
        // Loan calculations
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = termYears * 12;
        monthlyAmount = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        const totalPayments = monthlyAmount * numPayments;
        totalInterest = totalPayments - amount;
        totalAmount = totalPayments;
        
        summary = `FNB ${productNames[productType].toLowerCase()} of R${amount.toLocaleString()} at ${interestRate}% over ${termYears} years requires monthly payments of R${Math.round(monthlyAmount).toLocaleString()}.`;
      } else {
        // Investment/Savings calculations
        const annualRate = interestRate / 100;
        const compoundFrequency = 12;
        
        const futureValue = amount * Math.pow(1 + annualRate/compoundFrequency, compoundFrequency * termYears);
        totalAmount = futureValue;
        totalInterest = futureValue - amount;
        monthlyAmount = totalInterest / (termYears * 12);
        
        summary = `FNB ${productNames[productType].toLowerCase()} of R${amount.toLocaleString()} at ${interestRate}% over ${termYears} years will grow to R${Math.round(totalAmount).toLocaleString()}.`;
      }
      
      // Calculate eBucks rewards
      const monthlyEbucks = monthlySpending * ebucksRates[ebucksLevel];
      
      const resultElements = {
        resultProduct: productNames[productType],
        resultAmount: 'R' + amount.toLocaleString(),
        resultRate: interestRate + '%',
        monthlyAmount: 'R' + Math.round(monthlyAmount).toLocaleString(),
        monthlyEbucks: 'R' + Math.round(monthlyEbucks).toLocaleString(),
        totalInterest: 'R' + Math.round(totalInterest).toLocaleString(),
        totalAmount: 'R' + Math.round(totalAmount).toLocaleString(),
        fnbSummary: summary,
        ebucksInfo: `Earn R${Math.round(monthlyEbucks).toLocaleString()} monthly in eBucks with ${ebucksLevel} level membership. Annual eBucks: R${Math.round(monthlyEbucks * 12).toLocaleString()}.`
      };
      
      Object.entries(resultElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
      });
    };

    // Calculate on page load
    window.calculateFNB();
  }, []);

  const handleProductTypeChange = () => {
    const productType = (document.getElementById('productType') as HTMLSelectElement)?.value;
    
    const defaults: { [key: string]: { amount: number; rate: number; term: number } } = {
      'home-loan': { amount: 1800000, rate: 11.5, term: 20 },
      'personal-loan': { amount: 200000, rate: 14.75, term: 5 },
      'vehicle-finance': { amount: 400000, rate: 11.9, term: 6 },
      'student-loan': { amount: 100000, rate: 13.5, term: 4 },
      'ebucks-savings': { amount: 50000, rate: 6.25, term: 3 },
      'notice-deposit': { amount: 100000, rate: 7.5, term: 1 },
      'unit-trust': { amount: 150000, rate: 10.5, term: 10 },
      'flexi-fixed-deposit': { amount: 75000, rate: 8.0, term: 2 }
    };
    
    const def = defaults[productType];
    if (def) {
      const amountInput = document.getElementById('amount') as HTMLInputElement;
      const interestRateInput = document.getElementById('interestRate') as HTMLInputElement;
      const termYearsInput = document.getElementById('termYears') as HTMLInputElement;
      
      if (amountInput && interestRateInput && termYearsInput) {
        amountInput.value = def.amount.toString();
        interestRateInput.value = def.rate.toString();
        termYearsInput.value = def.term.toString();
      }
    }
    
    if (window.calculateFNB) {
      window.calculateFNB();
    }
  };

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇿🇦 First National Bank</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                FNB Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate FNB loans, savings, investments, and eBucks rewards with current 2025 rates and innovative digital solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">FNB Product Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments, returns, and eBucks rewards for FNB products</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FNB Product Type
                  </label>
                  <select 
                    id="productType" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black" 
                    onChange={handleProductTypeChange}
                  >
                    <option value="home-loan">FNB Home Loan</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="vehicle-finance">Vehicle Finance</option>
                    <option value="student-loan">Student Loan</option>
                    <option value="ebucks-savings">eBucks Savings</option>
                    <option value="notice-deposit">32-Day Notice Deposit</option>
                    <option value="unit-trust">Unit Trust Investment</option>
                    <option value="flexi-fixed-deposit">Flexi Fixed Deposit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (R)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    defaultValue="1800000"
                    placeholder="1,800,000"
                    onChange={() => window.calculateFNB && window.calculateFNB()}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
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
                    defaultValue="11.5"
                    placeholder="11.50"
                    onChange={() => window.calculateFNB && window.calculateFNB()}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    id="termYears"
                    defaultValue="20"
                    placeholder="20"
                    onChange={() => window.calculateFNB && window.calculateFNB()}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Spending (for eBucks)
                  </label>
                  <input
                    type="number"
                    id="monthlySpending"
                    defaultValue="15000"
                    placeholder="15,000"
                    onChange={() => window.calculateFNB && window.calculateFNB()}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    eBucks Level
                  </label>
                  <select 
                    id="ebucksLevel" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                    onChange={() => window.calculateFNB && window.calculateFNB()}
                  >
                    <option value="red">Red eBucks (1% earn rate)</option>
                    <option value="gold">Gold eBucks (2% earn rate)</option>
                    <option value="platinum">Platinum eBucks (3% earn rate)</option>
                    <option value="private">Private eBucks (4% earn rate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FNB Branch
                  </label>
                  <select id="branch" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black">
                    <option value="johannesburg">Johannesburg Rosebank</option>
                    <option value="sandton">Sandton Nelson Mandela Square</option>
                    <option value="cape-town">Cape Town V&A Waterfront</option>
                    <option value="durban">Durban Umhlanga</option>
                    <option value="pretoria">Pretoria Menlyn Park</option>
                    <option value="bloemfontein">Bloemfontein Mimosa</option>
                    <option value="port-elizabeth">Port Elizabeth Baywest</option>
                    <option value="nelspruit">Nelspruit Riverside</option>
                  </select>
                </div>

                <button 
                  onClick={() => window.calculateFNB && window.calculateFNB()}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate FNB Product
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">FNB Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold text-black" id="resultProduct">FNB Home Loan</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-black" id="resultAmount">R1,800,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-black" id="resultRate">11.50%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Payment/Return:</span>
                    <span className="font-semibold text-orange-600 text-xl" id="monthlyAmount">R21,350</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly eBucks Earned:</span>
                    <span className="font-semibold text-purple-600" id="monthlyEbucks">R300</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest/Growth:</span>
                    <span className="font-semibold text-green-600" id="totalInterest">R3,324,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Amount:</span>
                    <span className="font-bold text-green-600 text-xl" id="totalAmount">R5,124,000</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">FNB Product Summary</h4>
                  <p className="text-sm text-orange-800" id="fnbSummary">
                    FNB home loan of R1,800,000 at 11.50% over 20 years requires monthly payments of R21,350.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">eBucks Rewards</h4>
                  <p className="text-sm text-purple-800" id="ebucksInfo">
                    Earn eBucks on qualifying transactions. Higher account levels earn more rewards.
                  </p>
                </div>
              </div>
            </div>

            {/* FNB Products Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">FNB Interest Rates & eBucks 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Home Loans</h4>
                  <div className="text-2xl font-bold text-orange-600 mb-2">11.50%</div>
                  <p className="text-sm text-gray-600">Prime linked variable rate</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">eBucks Savings</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">6.25%</div>
                  <p className="text-sm text-gray-600">Plus eBucks rewards</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Notice Deposit</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">7.50%</div>
                  <p className="text-sm text-gray-600">32-day notice required</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">eBucks Rate</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">1-4%</div>
                  <p className="text-sm text-gray-600">Based on account level</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-gray-900 mb-2">eBucks Rewards</h4>
                <p className="text-gray-600 text-sm">Earn eBucks on banking, shopping, and fuel purchases</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">FNB App</h4>
                <p className="text-gray-600 text-sm">Award-winning banking app with instant calculations</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation Leader</h4>
                <p className="text-gray-600 text-sm">South Africa's most innovative bank with digital-first solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}