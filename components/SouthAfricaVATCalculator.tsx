'use client';

import { useState } from 'react';

interface VATResult {
  vatAmount: number;
  totalAmount: number;
  baseAmount: number;
}

export default function SouthAfricaVATCalculator() {
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  const [addAmount, setAddAmount] = useState<number>(1000);
  const [removeAmount, setRemoveAmount] = useState<number>(1150);
  const [result, setResult] = useState<VATResult | null>(null);

  const VAT_RATE = 0.15; // 15% VAT rate in South Africa

  const calculateAddVAT = () => {
    const vatAmount = addAmount * VAT_RATE;
    const totalAmount = addAmount + vatAmount;

    setResult({
      vatAmount,
      totalAmount,
      baseAmount: addAmount,
    });
  };

  const calculateRemoveVAT = () => {
    const baseAmount = removeAmount / (1 + VAT_RATE);
    const vatAmount = removeAmount - baseAmount;

    setResult({
      vatAmount,
      totalAmount: removeAmount,
      baseAmount,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">VAT Calculator (15%)</h2>
        <p className="text-gray-600 text-lg">Add VAT to prices or remove VAT from totals</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'add'
                ? 'bg-white text-emerald-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Add VAT
          </button>
          <button
            onClick={() => setActiveTab('remove')}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'remove'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Remove VAT
          </button>
        </div>
      </div>

      {/* Add VAT Tab */}
      {activeTab === 'add' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (Excluding VAT)
              </label>
              <input
                type="number"
                step="0.01"
                value={addAmount}
                onChange={(e) => setAddAmount(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the base price before VAT</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Current VAT Rate:</span>
                <span className="text-2xl font-bold text-emerald-600">15%</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">Standard VAT rate in South Africa (since April 2018)</p>
            </div>

            <button
              onClick={calculateAddVAT}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Calculate Price Including VAT
            </button>
          </div>

          {/* Results for Add VAT */}
          {result && result.baseAmount === addAmount && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Results</h3>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Amount (Excl VAT)</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.baseAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200">
                <p className="text-sm text-gray-600 mb-2">VAT Amount (15%)</p>
                <p className="text-3xl font-bold text-emerald-600">{formatCurrency(result.vatAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Total (Incl VAT)</p>
                <p className="text-4xl font-bold text-purple-600">{formatCurrency(result.totalAmount)}</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-300 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Calculation:</p>
                <p className="text-xs text-gray-600 font-mono">
                  {formatCurrency(result.baseAmount)} + ({formatCurrency(result.baseAmount)} × 0.15) = {formatCurrency(result.totalAmount)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Remove VAT Tab */}
      {activeTab === 'remove' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (Including VAT)
              </label>
              <input
                type="number"
                step="0.01"
                value={removeAmount}
                onChange={(e) => setRemoveAmount(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the total price including VAT</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">VAT Formula:</span>
                <span className="text-lg font-mono text-blue-600">Total ÷ 1.15</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">To calculate the base amount (excl VAT) from VAT-inclusive price</p>
            </div>

            <button
              onClick={calculateRemoveVAT}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Calculate Price Excluding VAT
            </button>
          </div>

          {/* Results for Remove VAT */}
          {result && result.totalAmount === removeAmount && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Results</h3>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Total (Incl VAT)</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.totalAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Amount (Excl VAT)</p>
                <p className="text-4xl font-bold text-blue-600">{formatCurrency(result.baseAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200">
                <p className="text-sm text-gray-600 mb-2">VAT Amount (15%)</p>
                <p className="text-3xl font-bold text-emerald-600">{formatCurrency(result.vatAmount)}</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-300 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Calculation:</p>
                <p className="text-xs text-gray-600 font-mono">
                  {formatCurrency(result.totalAmount)} ÷ 1.15 = {formatCurrency(result.baseAmount)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Educational Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">VAT Quick Reference</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
            <h4 className="font-semibold text-gray-900 mb-3">To Add VAT (15%):</h4>
            <p className="text-sm font-mono text-gray-700 mb-2">Amount × 1.15 = Total incl VAT</p>
            <p className="text-xs text-gray-600">Example: R1,000 × 1.15 = R1,150</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">To Remove VAT (15%):</h4>
            <p className="text-sm font-mono text-gray-700 mb-2">Total incl VAT ÷ 1.15 = Amount excl VAT</p>
            <p className="text-xs text-gray-600">Example: R1,150 ÷ 1.15 = R1,000</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            <strong>💡 VAT Registration:</strong> Mandatory if taxable turnover exceeds R1 million/year. Voluntary registration available for turnover above R50,000/year.
          </p>
        </div>
      </div>
    </div>
  );
}
