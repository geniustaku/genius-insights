'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface UniversalTaxCalculatorProps {
  country: string;
  currency: string;
  currencySymbol: string;
  taxBrackets?: TaxBracket[];
  allowances?: string[];
  taxAuthority?: string;
  colorScheme?: string;
}

export default function UniversalTaxCalculator({ 
  country, 
  currency, 
  currencySymbol, 
  taxBrackets, 
  allowances = [],
  taxAuthority = 'Tax Authority',
  colorScheme = 'from-blue-600 to-indigo-600'
}: UniversalTaxCalculatorProps) {
  const [income, setIncome] = useState('');
  const [incomeType, setIncomeType] = useState('annual');
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTax = () => {
    if (!income || parseFloat(income) <= 0) return;
    
    setIsCalculating(true);
    
    // Convert monthly to annual if needed
    const annualIncome = incomeType === 'monthly' ? parseFloat(income) * 12 : parseFloat(income);
    
    // Default tax brackets if none provided
    const brackets = taxBrackets || [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50001, max: 100000, rate: 0.2 },
      { min: 100001, max: 200000, rate: 0.3 },
      { min: 200001, max: Infinity, rate: 0.4 }
    ];
    
    let totalTax = 0;
    let remainingIncome = annualIncome;
    const taxBreakdown: any[] = [];
    
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInThisBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1);
      const taxForThisBracket = taxableInThisBracket * bracket.rate;
      
      if (taxableInThisBracket > 0) {
        totalTax += taxForThisBracket;
        taxBreakdown.push({
          bracket: `${currencySymbol}${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '+' : currencySymbol + bracket.max.toLocaleString()}`,
          rate: (bracket.rate * 100).toFixed(1) + '%',
          taxableAmount: taxableInThisBracket,
          tax: taxForThisBracket
        });
        remainingIncome -= taxableInThisBracket;
      }
    }
    
    const netIncome = annualIncome - totalTax;
    const effectiveRate = (totalTax / annualIncome) * 100;
    const marginalRate = (brackets.find(b => annualIncome >= b.min && annualIncome <= b.max)?.rate || 0) * 100;
    
    setTimeout(() => {
      setResults({
        grossIncome: annualIncome,
        totalTax,
        netIncome,
        effectiveRate,
        marginalRate,
        monthlyGross: annualIncome / 12,
        monthlyNet: netIncome / 12,
        monthlyTax: totalTax / 12,
        taxBreakdown
      });
      setIsCalculating(false);
    }, 500);
  };

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
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
              {country} Tax Calculator 2025
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Calculate your {taxAuthority} income tax with real-time results
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Calculator Form */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Income Period
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIncomeType('annual')}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      incomeType === 'annual'
                        ? `bg-gradient-to-r ${colorScheme} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Annual
                  </button>
                  <button
                    onClick={() => setIncomeType('monthly')}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      incomeType === 'monthly'
                        ? `bg-gradient-to-r ${colorScheme} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {incomeType === 'monthly' ? 'Monthly' : 'Annual'} Gross Income ({currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-600 font-medium">{currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder={`Enter your ${incomeType} income`}
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <button
                onClick={calculateTax}
                disabled={!income || parseFloat(income) <= 0 || isCalculating}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  !income || parseFloat(income) <= 0 || isCalculating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${colorScheme} text-white hover:shadow-2xl hover:scale-105 active:scale-95`
                }`}
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Calculating...
                  </div>
                ) : (
                  `Calculate ${country} Tax`
                )}
              </button>

              {/* Tax Authority Info */}
              {allowances.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Tax Allowances & Deductions</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    {allowances.map((allowance: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{allowance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-800">
                          {formatCurrency(results.netIncome)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">Annual Net Income</div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-800">
                          {formatCurrency(results.totalTax)}
                        </div>
                        <div className="text-sm text-red-600 font-medium">Annual Tax</div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-center">Monthly Breakdown</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(results.monthlyGross)}</div>
                        <div className="text-sm text-gray-600">Gross</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-red-600">-{formatCurrency(results.monthlyTax)}</div>
                        <div className="text-sm text-gray-600">Tax</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{formatCurrency(results.monthlyNet)}</div>
                        <div className="text-sm text-gray-600">Net</div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Rates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-blue-800">{results.effectiveRate.toFixed(1)}%</div>
                      <div className="text-sm text-blue-600 font-medium">Effective Rate</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-purple-800">{results.marginalRate.toFixed(1)}%</div>
                      <div className="text-sm text-purple-600 font-medium">Marginal Rate</div>
                    </div>
                  </div>

                  {/* Tax Breakdown */}
                  {results.taxBreakdown.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Tax Breakdown by Bracket</h4>
                      <div className="space-y-3">
                        {results.taxBreakdown.map((bracket: any, index: number) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                            <div>
                              <div className="font-medium text-gray-900">{bracket.bracket}</div>
                              <div className="text-sm text-gray-600">Rate: {bracket.rate}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{formatCurrency(bracket.tax)}</div>
                              <div className="text-sm text-gray-600">on {formatCurrency(bracket.taxableAmount)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🧮</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your income above and click calculate to see your tax breakdown</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}