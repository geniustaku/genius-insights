'use client';

import StructuredData from '@/components/StructuredData';

// German loan types with typical interest rates
const germanyLoanTypes = [
  {
    name: 'Mortgage (Immobilienkredit)',
    minRate: 3.5,
    maxRate: 5.5,
    typicalTerm: 360,
    maxAmount: 2000000,
    description: 'Fixed-rate mortgage for property purchase'
  },
  {
    name: 'Personal Loan (Privatkredit)',
    minRate: 4.5,
    maxRate: 12.0,
    typicalTerm: 96,
    maxAmount: 80000,
    description: 'Unsecured personal loan for various needs'
  },
  {
    name: 'Car Loan (Autokredit)',
    minRate: 2.9,
    maxRate: 8.5,
    typicalTerm: 84,
    maxAmount: 100000,
    description: 'Vehicle financing for new and used cars'
  },
  {
    name: 'Business Loan (Firmenkredit)',
    minRate: 3.0,
    maxRate: 10.0,
    typicalTerm: 120,
    maxAmount: 1000000,
    description: 'Commercial lending for business needs'
  }
];

export default function GermanyLoanCalculatorPage() {
  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-red-600 to-yellow-500 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 German Banking</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Germany Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate loan payments and interest for mortgages, personal loans, and car loans in Germany with current interest rates.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">German Loan & Mortgage Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate monthly payments and total interest for your loan in Germany</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type
                  </label>
                  <select id="loanType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black" onChange={() => {
                    const loanType = (document.getElementById('loanType') as HTMLSelectElement).value;
                    const defaults = {
                      'mortgage': { amount: 250000, rate: 4.5, term: 25 },
                      'personal': { amount: 20000, rate: 8.0, term: 5 },
                      'car': { amount: 30000, rate: 5.5, term: 6 },
                      'business': { amount: 100000, rate: 6.0, term: 10 }
                    };
                    
                    const def = defaults[loanType as keyof typeof defaults];
                    if (def) {
                      (document.getElementById('loanAmount') as HTMLInputElement)!.value = def.amount.toString();
                      (document.getElementById('interestRate') as HTMLInputElement)!.value = def.rate.toString();
                      (document.getElementById('loanTermYears') as HTMLInputElement)!.value = def.term.toString();
                    }
                    
                    const loanAmount = parseFloat((document.getElementById('loanAmount') as HTMLInputElement)?.value) || 250000;
                    const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement)?.value) || 4.5;
                    const termYears = parseFloat((document.getElementById('loanTermYears') as HTMLInputElement)?.value) || 25;
                    const termUnit = (document.getElementById('termUnit') as HTMLSelectElement).value;
                    const downPayment = parseFloat((document.getElementById('downPayment') as HTMLInputElement)?.value) || 0;
                    
                    const actualLoanAmount = loanAmount - downPayment;
                    
                    const termMonths = termUnit === 'months' ? termYears : termYears * 12;
                    
                    const monthlyRate = interestRate / 100 / 12;
                    const monthlyPayment = actualLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
                    
                    const totalPayments = monthlyPayment * termMonths;
                    const totalInterest = totalPayments - actualLoanAmount;
                    const totalCost = actualLoanAmount + totalInterest;
                    
                    document.getElementById('resultLoanAmount')!.textContent = '€' + actualLoanAmount.toLocaleString();
                    document.getElementById('resultInterestRate')!.textContent = interestRate.toFixed(2) + '%';
                    document.getElementById('resultLoanTerm')!.textContent = termUnit === 'months' ? termYears + ' months' : termYears + ' years';
                    document.getElementById('monthlyPayment')!.textContent = '€' + Math.round(monthlyPayment).toLocaleString();
                    document.getElementById('totalInterest')!.textContent = '€' + Math.round(totalInterest).toLocaleString();
                    document.getElementById('totalCost')!.textContent = '€' + Math.round(totalCost).toLocaleString();
                    
                    const termDisplay = termUnit === 'months' ? termYears + ' months' : termYears + ' years';
                    const summary = `Monthly payment of €${Math.round(monthlyPayment).toLocaleString()} over ${termDisplay}. Total interest: €${Math.round(totalInterest).toLocaleString()}.`;
                    document.getElementById('loanSummary')!.textContent = summary;
                  }}>
                    <option value="mortgage">Mortgage (Immobilienkredit)</option>
                    <option value="personal">Personal Loan (Privatkredit)</option>
                    <option value="car">Car Loan (Autokredit)</option>
                    <option value="business">Business Loan (Firmenkredit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (€)
                  </label>
                  <input
                    type="number"
                    id="loanAmount"
                    placeholder="250,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per year)
                  </label>
                  <input
                    type="number"
                    id="interestRate"
                    step="0.01"
                    placeholder="4.5"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      id="loanTermYears"
                      placeholder="25"
                      className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                    <select id="termUnit" className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    German Bank
                  </label>
                  <select id="bankName" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="deutsche-bank">Deutsche Bank</option>
                    <option value="commerzbank">Commerzbank</option>
                    <option value="postbank">Postbank</option>
                    <option value="sparkasse">Sparkasse</option>
                    <option value="volksbank">Volksbank</option>
                    <option value="dkb">DKB (Deutsche Kreditbank)</option>
                    <option value="ing">ING</option>
                    <option value="comdirect">Comdirect</option>
                    <option value="other">Other Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (€) - Optional
                  </label>
                  <input
                    type="number"
                    id="downPayment"
                    placeholder="50,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <button 
                  onClick={() => {
                    const loanAmount = parseFloat((document.getElementById('loanAmount') as HTMLInputElement)?.value) || 250000;
                    const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement)?.value) || 4.5;
                    const termYears = parseFloat((document.getElementById('loanTermYears') as HTMLInputElement)?.value) || 25;
                    const termUnit = (document.getElementById('termUnit') as HTMLSelectElement).value;
                    const downPayment = parseFloat((document.getElementById('downPayment') as HTMLInputElement)?.value) || 0;
                    
                    const actualLoanAmount = loanAmount - downPayment;
                    
                    const termMonths = termUnit === 'months' ? termYears : termYears * 12;
                    
                    const monthlyRate = interestRate / 100 / 12;
                    const monthlyPayment = actualLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
                    
                    const totalPayments = monthlyPayment * termMonths;
                    const totalInterest = totalPayments - actualLoanAmount;
                    const totalCost = actualLoanAmount + totalInterest;
                    
                    document.getElementById('resultLoanAmount')!.textContent = '€' + actualLoanAmount.toLocaleString();
                    document.getElementById('resultInterestRate')!.textContent = interestRate.toFixed(2) + '%';
                    document.getElementById('resultLoanTerm')!.textContent = termUnit === 'months' ? termYears + ' months' : termYears + ' years';
                    document.getElementById('monthlyPayment')!.textContent = '€' + Math.round(monthlyPayment).toLocaleString();
                    document.getElementById('totalInterest')!.textContent = '€' + Math.round(totalInterest).toLocaleString();
                    document.getElementById('totalCost')!.textContent = '€' + Math.round(totalCost).toLocaleString();
                    
                    const termDisplay = termUnit === 'months' ? termYears + ' months' : termYears + ' years';
                    const summary = `Monthly payment of €${Math.round(monthlyPayment).toLocaleString()} over ${termDisplay}. Total interest: €${Math.round(totalInterest).toLocaleString()}.`;
                    document.getElementById('loanSummary')!.textContent = summary;
                  }}
                  className="w-full bg-gradient-to-r from-black via-red-600 to-yellow-500 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate German Loan
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Loan Amount:</span>
                    <span className="font-semibold" id="resultLoanAmount">€250,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold" id="resultInterestRate">4.50%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Loan Term:</span>
                    <span className="font-semibold" id="resultLoanTerm">25 years</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold text-blue-600 text-xl" id="monthlyPayment">€1,389</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-red-600" id="totalInterest">€166,700</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Cost:</span>
                    <span className="font-bold text-green-600 text-xl" id="totalCost">€416,700</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Loan Summary</h4>
                  <p className="text-sm text-blue-800" id="loanSummary">
                    Monthly payment of €1,389 over 25 years. Total interest: €166,700.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">German Banking Note</h4>
                  <p className="text-sm text-yellow-800">
                    Interest rates vary by bank, credit score, and loan type. Consider Schufa score impact on rates.
                  </p>
                </div>
              </div>
            </div>

            {/* Interest Rate Ranges */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Typical German Interest Rates 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Mortgages</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">3.5% - 5.5%</div>
                  <p className="text-sm text-gray-600">Fixed-rate home loans</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Loans</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">4.5% - 12.0%</div>
                  <p className="text-sm text-gray-600">Unsecured loans</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Car Loans</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">2.9% - 8.5%</div>
                  <p className="text-sm text-gray-600">Vehicle financing</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Loans</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">3.0% - 10.0%</div>
                  <p className="text-sm text-gray-600">Commercial lending</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">German Banks</h4>
                <p className="text-gray-600 text-sm">Compare rates from major German banks and credit institutions</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h4>
                <p className="text-gray-600 text-sm">Precise loan calculations with German banking standards and practices</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-900 mb-2">Schufa Compliant</h4>
                <p className="text-gray-600 text-sm">Consider German credit scoring system in your loan planning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}