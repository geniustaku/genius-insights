'use client'
import { useState } from 'react';
import Link from 'next/link';

interface UniversalInvestmentCalculatorProps {
  country: string;
  currency: string;
  currencySymbol: string;
  toolName?: string;
  colorScheme?: string;
}

export default function UniversalInvestmentCalculator({ 
  country, 
  currency, 
  currencySymbol, 
  toolName = 'Investment Calculator',
  colorScheme = 'from-blue-600 to-indigo-600'
}: UniversalInvestmentCalculatorProps) {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateInvestment = () => {
    if (!initialInvestment || !annualReturn || !timePeriod) return;
    
    const principal = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100 / 12; // Monthly rate
    const periods = parseFloat(timePeriod) * 12; // Total months
    
    // Future value calculation with monthly contributions
    let futureValue = principal * Math.pow(1 + rate, periods);
    
    if (monthly > 0) {
      const annuityFV = monthly * ((Math.pow(1 + rate, periods) - 1) / rate);
      futureValue += annuityFV;
    }
    
    const totalContributions = principal + (monthly * periods);
    const totalEarnings = futureValue - totalContributions;
    
    // Year-by-year breakdown for first 10 years
    const yearlyBreakdown = [];
    let currentValue = principal;
    
    for (let year = 1; year <= Math.min(10, parseFloat(timePeriod)); year++) {
      const yearEndValue = principal * Math.pow(1 + rate * 12, year) + 
                          (monthly * 12) * (Math.pow(1 + rate * 12, year) - 1) / (rate * 12);
      const yearContributions = monthly * 12;
      const yearEarnings = yearEndValue - (principal + (monthly * 12 * year));
      
      yearlyBreakdown.push({
        year,
        endValue: yearEndValue,
        contributions: yearContributions,
        totalContributions: principal + (monthly * 12 * year),
        earnings: yearEarnings
      });
    }
    
    setResults({
      futureValue,
      totalContributions,
      totalEarnings,
      yearlyBreakdown,
      details: {
        principal,
        monthly,
        rate: parseFloat(annualReturn),
        years: parseFloat(timePeriod)
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const resetCalculator = () => {
    setInitialInvestment('');
    setMonthlyContribution('');
    setAnnualReturn('');
    setTimePeriod('');
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
              {country} {toolName}
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Calculate investment returns and retirement savings
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Initial Investment ({currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-600 font-medium">{currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="Enter initial amount"
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Monthly Contribution ({currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-600 font-medium">{currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="Optional monthly deposits"
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Annual Return (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
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
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="w-full px-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="e.g. 20"
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={calculateInvestment}
                  disabled={!initialInvestment || !annualReturn || !timePeriod}
                  className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !initialInvestment || !annualReturn || !timePeriod
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${colorScheme} text-white hover:shadow-2xl hover:scale-105 active:scale-95`
                  }`}
                >
                  Calculate Returns
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
                    onClick={() => {setAnnualReturn('7'); setTimePeriod('10');}}
                    className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Conservative: 7%
                  </button>
                  <button
                    onClick={() => {setAnnualReturn('10'); setTimePeriod('20');}}
                    className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Aggressive: 10%
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Future Value */}
                  <div className={`bg-gradient-to-r ${colorScheme} rounded-xl p-6 text-white`}>
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">Future Value</div>
                      <div className="text-3xl font-bold">{formatCurrency(results.futureValue)}</div>
                      <div className="text-sm opacity-90 mt-2">after {results.details.years} years</div>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-800">
                          {formatCurrency(results.totalContributions)}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">Total Invested</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-800">
                          {formatCurrency(results.totalEarnings)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">Total Earnings</div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-black mb-4 text-center">Investment Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Initial Investment</span>
                        <span className="font-bold text-black">{formatCurrency(results.details.principal)}</span>
                      </div>
                      {results.details.monthly > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-700">Monthly Contributions</span>
                          <span className="font-bold text-black">{formatCurrency(results.details.monthly)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Annual Return Rate</span>
                        <span className="font-bold text-black">{results.details.rate}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-green-50 rounded-lg px-4">
                        <span className="font-bold text-green-800">ROI</span>
                        <span className="font-bold text-green-800 text-lg">
                          {((results.totalEarnings / results.totalContributions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Yearly Breakdown */}
                  {results.yearlyBreakdown.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-black mb-4">Year-by-Year Growth</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 font-semibold text-gray-700">Year</th>
                              <th className="text-right py-2 font-semibold text-gray-700">Balance</th>
                              <th className="text-right py-2 font-semibold text-gray-700">Contributed</th>
                              <th className="text-right py-2 font-semibold text-gray-700">Earnings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.yearlyBreakdown.slice(0, 5).map((year: any, index: number) => (
                              <tr key={index} className="border-b border-gray-100">
                                <td className="py-2 text-black">{year.year}</td>
                                <td className="py-2 text-right text-black font-medium">{formatCurrency(year.endValue)}</td>
                                <td className="py-2 text-right text-blue-600">{formatCurrency(year.totalContributions)}</td>
                                <td className="py-2 text-right text-green-600">{formatCurrency(year.earnings)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-xl font-bold text-black mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your investment details above to see projected returns</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}