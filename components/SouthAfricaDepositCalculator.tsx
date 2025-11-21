'use client';

import { useState } from 'react';

interface DepositResult {
  finalAmount: number;
  totalInterest: number;
  effectiveRate: number;
  taxOnInterest: number;
  netInterest: number;
  netFinalAmount: number;
}

export default function SouthAfricaDepositCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [term, setTerm] = useState<number>(12);
  const [compoundFrequency, setCompoundFrequency] = useState<string>('monthly');
  const [taxBracket, setTaxBracket] = useState<number>(26);

  const [result, setResult] = useState<DepositResult | null>(null);

  // Interest exemption (2025)
  const INTEREST_EXEMPTION_UNDER_65 = 23800;
  const INTEREST_EXEMPTION_65_PLUS = 34500;

  const calculateDeposit = () => {
    // Compound frequency
    let n: number;
    switch (compoundFrequency) {
      case 'daily': n = 365; break;
      case 'monthly': n = 12; break;
      case 'quarterly': n = 4; break;
      case 'semi-annually': n = 2; break;
      case 'annually': n = 1; break;
      default: n = 12;
    }

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const r = interestRate / 100;
    const t = term / 12; // Convert months to years
    const finalAmount = principal * Math.pow(1 + r / n, n * t);
    const totalInterest = finalAmount - principal;

    // Calculate effective annual rate
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    // Calculate tax on interest (assuming under 65 and interest above exemption)
    const taxableInterest = Math.max(0, totalInterest - INTEREST_EXEMPTION_UNDER_65);
    const taxOnInterest = taxableInterest * (taxBracket / 100);
    const netInterest = totalInterest - taxOnInterest;
    const netFinalAmount = principal + netInterest;

    setResult({
      finalAmount,
      totalInterest,
      effectiveRate,
      taxOnInterest,
      netInterest,
      netFinalAmount,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fixed Deposit Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate returns on fixed deposits and savings accounts</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deposit Amount (R)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Current SA fixed deposit rates: 7-10% (2025)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Term (months)
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg text-black"
            >
              <option value={1}>1 month</option>
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months (1 year)</option>
              <option value={24}>24 months (2 years)</option>
              <option value={36}>36 months (3 years)</option>
              <option value={60}>60 months (5 years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg text-black"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi-annually">Semi-Annually</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Tax Bracket (%)
            </label>
            <select
              value={taxBracket}
              onChange={(e) => setTaxBracket(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg text-black"
            >
              <option value={18}>18% (R0 - R237,100)</option>
              <option value={26}>26% (R237,101 - R370,500)</option>
              <option value={31}>31% (R370,501 - R512,800)</option>
              <option value={36}>36% (R512,801 - R673,000)</option>
              <option value={39}>39% (R673,001 - R857,900)</option>
              <option value={41}>41% (R857,901 - R1,817,000)</option>
              <option value={45}>45% (Over R1,817,000)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Interest exemption: R23,800/year (under 65)</p>
          </div>

          <button
            onClick={calculateDeposit}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Returns
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Returns</h3>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
              <p className="text-sm text-gray-600 mb-2">Final Amount (Before Tax)</p>
              <p className="text-4xl font-bold text-cyan-600">{formatCurrency(result.finalAmount)}</p>
              <p className="text-sm text-gray-500 mt-2">After {term} months</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Gross Interest</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Effective Rate</p>
                <p className="text-xl font-bold text-purple-600">{result.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <p className="text-sm text-gray-600 mb-2">Estimated Tax on Interest</p>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(result.taxOnInterest)}</p>
              <p className="text-sm text-gray-500 mt-2">After R23,800 exemption</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
              <p className="text-sm text-gray-600 mb-2">Net Amount (After Tax)</p>
              <p className="text-4xl font-bold text-emerald-600">{formatCurrency(result.netFinalAmount)}</p>
              <p className="text-sm text-gray-500 mt-2">Net interest: {formatCurrency(result.netInterest)}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Summary:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Initial deposit:</span>
                  <span className="font-mono">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross interest earned:</span>
                  <span className="font-mono text-green-600">+{formatCurrency(result.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less tax:</span>
                  <span className="font-mono text-red-600">-{formatCurrency(result.taxOnInterest)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Net returns:</span>
                  <span className="font-mono text-cyan-600">{formatCurrency(result.netFinalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bank Rates Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">SA Fixed Deposit Rates (2025)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Bank</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">12 Months</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">24 Months</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Min Deposit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-4 py-2">FNB</td><td className="px-4 py-2">7.5% - 8.5%</td><td className="px-4 py-2">8.0% - 9.0%</td><td className="px-4 py-2">R1,000</td></tr>
              <tr><td className="px-4 py-2">Standard Bank</td><td className="px-4 py-2">7.25% - 8.25%</td><td className="px-4 py-2">7.75% - 8.75%</td><td className="px-4 py-2">R10,000</td></tr>
              <tr><td className="px-4 py-2">ABSA</td><td className="px-4 py-2">7.5% - 8.5%</td><td className="px-4 py-2">8.0% - 9.0%</td><td className="px-4 py-2">R5,000</td></tr>
              <tr><td className="px-4 py-2">Nedbank</td><td className="px-4 py-2">7.75% - 8.75%</td><td className="px-4 py-2">8.25% - 9.25%</td><td className="px-4 py-2">R1,000</td></tr>
              <tr><td className="px-4 py-2">Capitec</td><td className="px-4 py-2">8.0% - 9.0%</td><td className="px-4 py-2">8.5% - 9.5%</td><td className="px-4 py-2">R500</td></tr>
              <tr><td className="px-4 py-2">African Bank</td><td className="px-4 py-2">9.0% - 10.0%</td><td className="px-4 py-2">9.5% - 10.5%</td><td className="px-4 py-2">R500</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
          <h4 className="font-semibold text-cyan-900 mb-2">Interest Income Tax</h4>
          <p className="text-sm text-cyan-800">
            Interest income is taxable, but there's an annual exemption: R23,800 (under 65) or R34,500 (65+).
            Interest above this is added to your taxable income and taxed at your marginal rate.
          </p>
        </div>
      </div>
    </div>
  );
}
