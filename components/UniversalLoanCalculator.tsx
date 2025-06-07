'use client'
import { useState } from 'react';
import Link from 'next/link';

interface UniversalLoanCalculatorProps {
  country: string;
  currency: string;
  currencySymbol: string;
  loanTypes: {
    name: string;
    minRate: number;
    maxRate: number;
    typicalTerm: number;
    maxAmount: number;
    description: string;
  }[];
  colorScheme?: string;
  features: {
    [key: string]: any;
  }[];
}

export default function UniversalLoanCalculator({ 
  country, 
  currency, 
  currencySymbol, 
  loanTypes,
  features,
  colorScheme = 'from-blue-600 to-indigo-600'
}: UniversalLoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateLoan = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;
    
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;
    
    // Monthly payment calculation using PMT formula
    const monthlyPayment = monthlyRate === 0 
      ? principal / numberOfPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    
    // Create amortization schedule for first 12 months
    const schedule = [];
    let balance = principal;
    
    for (let i = 1; i <= Math.min(12, numberOfPayments); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
      loanDetails: {
        principal,
        rate: parseFloat(interestRate),
        term: parseFloat(loanTerm)
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const resetCalculator = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Home Button */}
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${colorScheme} px-8 py-6`}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {country} Loan Calculator
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Calculate loan payments, interest, and amortization schedule
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Loan Amount ({currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-600 font-medium">{currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="Enter loan amount"
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Annual Interest Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full px-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                      placeholder="e.g. 8.5"
                      style={{ fontSize: '18px' }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-600 font-medium">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="e.g. 20"
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={calculateLoan}
                  disabled={!loanAmount || !interestRate || !loanTerm}
                  className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !loanAmount || !interestRate || !loanTerm
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${colorScheme} text-white hover:shadow-2xl hover:scale-105 active:scale-95`
                  }`}
                >
                  Calculate Loan
                </button>
                
                <button
                  onClick={resetCalculator}
                  className="py-4 px-6 rounded-xl font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              {/* Quick Presets */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Quick Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {setLoanTerm('15'); setInterestRate('7.5');}}
                    className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    15yr @ 7.5%
                  </button>
                  <button
                    onClick={() => {setLoanTerm('30'); setInterestRate('8.0');}}
                    className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    30yr @ 8.0%
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Monthly Payment */}
                  <div className={`bg-gradient-to-r ${colorScheme} rounded-xl p-6 text-white`}>
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">Monthly Payment</div>
                      <div className="text-3xl font-bold">{formatCurrency(results.monthlyPayment)}</div>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-800">
                          {formatCurrency(results.loanDetails.principal)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">Principal</div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-800">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-red-600 font-medium">Total Interest</div>
                      </div>
                    </div>
                  </div>

                  {/* Total Payment */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Total Amount Paid</div>
                      <div className="text-2xl font-bold text-black">{formatCurrency(results.totalPayment)}</div>
                      <div className="text-sm text-gray-600 mt-2">
                        over {results.loanDetails.term} years at {results.loanDetails.rate}% APR
                      </div>
                    </div>
                  </div>

                  {/* Amortization Schedule Preview */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-bold text-black mb-4">First Year Payment Breakdown</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-semibold text-gray-700">Month</th>
                            <th className="text-right py-2 font-semibold text-gray-700">Payment</th>
                            <th className="text-right py-2 font-semibold text-gray-700">Principal</th>
                            <th className="text-right py-2 font-semibold text-gray-700">Interest</th>
                            <th className="text-right py-2 font-semibold text-gray-700">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.schedule.map((payment: any, index: number) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="py-2 text-black">{payment.month}</td>
                              <td className="py-2 text-right text-black">{formatCurrency(payment.payment)}</td>
                              <td className="py-2 text-right text-green-600">{formatCurrency(payment.principal)}</td>
                              <td className="py-2 text-right text-red-600">{formatCurrency(payment.interest)}</td>
                              <td className="py-2 text-right text-black">{formatCurrency(payment.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-black mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your loan details above to see monthly payments and amortization schedule</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}