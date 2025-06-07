'use client'
import { useState } from 'react';
import Link from 'next/link';

interface UniversalVATCalculatorProps {
  country: string;
  currency: string;
  currencySymbol: string;
  vatRate: number;
  vatName?: string;
  colorScheme?: string;
}

export default function UniversalVATCalculator({ 
  country, 
  currency, 
  currencySymbol, 
  vatRate,
  vatName = 'VAT',
  colorScheme = 'from-blue-600 to-indigo-600'
}: UniversalVATCalculatorProps) {
  const [amount, setAmount] = useState('');
  const [calculationType, setCalculationType] = useState('add'); // 'add' or 'remove'
  const [results, setResults] = useState<any>(null);

  const calculateVAT = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    const inputAmount = parseFloat(amount);
    let vatAmount, totalAmount, netAmount;
    
    if (calculationType === 'add') {
      // Add VAT to net amount
      netAmount = inputAmount;
      vatAmount = (inputAmount * vatRate) / 100;
      totalAmount = inputAmount + vatAmount;
    } else {
      // Remove VAT from gross amount
      totalAmount = inputAmount;
      vatAmount = (inputAmount * vatRate) / (100 + vatRate);
      netAmount = inputAmount - vatAmount;
    }
    
    setResults({
      netAmount,
      vatAmount,
      totalAmount,
      vatRate,
      calculationType
    });
  };

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const resetCalculator = () => {
    setAmount('');
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {country} {vatName} Calculator
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Calculate {vatRate}% {vatName} on goods and services
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Calculation Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setCalculationType('add')}
                    className={`px-4 py-3 rounded-xl font-medium text-left transition-all duration-200 ${
                      calculationType === 'add'
                        ? `bg-gradient-to-r ${colorScheme} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">Add {vatName}</div>
                    <div className="text-sm opacity-90">Calculate {vatName} inclusive amount</div>
                  </button>
                  <button
                    onClick={() => setCalculationType('remove')}
                    className={`px-4 py-3 rounded-xl font-medium text-left transition-all duration-200 ${
                      calculationType === 'remove'
                        ? `bg-gradient-to-r ${colorScheme} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">Remove {vatName}</div>
                    <div className="text-sm opacity-90">Calculate {vatName} exclusive amount</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {calculationType === 'add' ? `Net Amount (${vatName} Exclusive)` : `Gross Amount (${vatName} Inclusive)`} ({currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-600 font-medium">{currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 text-lg font-semibold text-black border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="Enter amount"
                    style={{ fontSize: '18px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={calculateVAT}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !amount || parseFloat(amount) <= 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${colorScheme} text-white hover:shadow-2xl hover:scale-105 active:scale-95`
                  }`}
                >
                  Calculate {vatName}
                </button>
                
                <button
                  onClick={resetCalculator}
                  className="py-4 px-6 rounded-xl font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              {/* VAT Rate Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-800">{vatRate}%</div>
                  <div className="text-sm text-blue-600 font-medium">{country} {vatName} Rate</div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Main Result */}
                  <div className={`bg-gradient-to-r ${colorScheme} rounded-xl p-6 text-white`}>
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-2">
                        {calculationType === 'add' ? `${vatName} Inclusive Amount` : `${vatName} Exclusive Amount`}
                      </div>
                      <div className="text-3xl font-bold">
                        {calculationType === 'add' ? formatCurrency(results.totalAmount) : formatCurrency(results.netAmount)}
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-center">{vatName} Breakdown</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Net Amount ({vatName} Exclusive)</span>
                        <span className="font-bold text-gray-900">{formatCurrency(results.netAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{vatName} ({vatRate}%)</span>
                        <span className="font-bold text-red-600">+{formatCurrency(results.vatAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-4">
                        <span className="font-bold text-green-800">Total Amount ({vatName} Inclusive)</span>
                        <span className="font-bold text-green-800 text-lg">{formatCurrency(results.totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Formula */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Calculation Formula</h4>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                      {calculationType === 'add' ? (
                        <div className="space-y-1 text-gray-700">
                          <div>Net Amount: {formatCurrency(parseFloat(amount))}</div>
                          <div>{vatName} Amount: {formatCurrency(parseFloat(amount))} × {vatRate}% = {formatCurrency(results.vatAmount)}</div>
                          <div className="font-bold text-gray-900 pt-2 border-t">Total: {formatCurrency(parseFloat(amount))} + {formatCurrency(results.vatAmount)} = {formatCurrency(results.totalAmount)}</div>
                        </div>
                      ) : (
                        <div className="space-y-1 text-gray-700">
                          <div>Gross Amount: {formatCurrency(parseFloat(amount))}</div>
                          <div>{vatName} Amount: {formatCurrency(parseFloat(amount))} × {vatRate}% ÷ (100% + {vatRate}%) = {formatCurrency(results.vatAmount)}</div>
                          <div className="font-bold text-gray-900 pt-2 border-t">Net: {formatCurrency(parseFloat(amount))} - {formatCurrency(results.vatAmount)} = {formatCurrency(results.netAmount)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🧾</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter an amount above and click calculate to see your {vatName} breakdown</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}