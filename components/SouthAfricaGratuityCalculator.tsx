'use client';

import { useState } from 'react';

interface GratuityResult {
  gratuityAmount: number;
  taxableAmount: number;
  taxPayable: number;
  netPayout: number;
  totalServiceYears: number;
  effectiveRate: number;
}

export default function SouthAfricaGratuityCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(35000);
  const [yearsOfService, setYearsOfService] = useState<number>(10);
  const [monthsOfService, setMonthsOfService] = useState<number>(6);
  const [gratuityFormula, setGratuityFormula] = useState<string>('standard');
  const [terminationType, setTerminationType] = useState<string>('resignation');

  const [result, setResult] = useState<GratuityResult | null>(null);

  // Tax tables for lump sum withdrawals (2025)
  const LUMP_SUM_TAX_TABLE = [
    { min: 0, max: 550000, rate: 0, base: 0 },
    { min: 550001, max: 770000, rate: 0.18, base: 0 },
    { min: 770001, max: 1100000, rate: 0.27, base: 39600 },
    { min: 1100001, max: Infinity, rate: 0.36, base: 128700 },
  ];

  const calculateGratuity = () => {
    const totalYears = yearsOfService + (monthsOfService / 12);

    let gratuityAmount: number;

    // Calculate gratuity based on formula
    switch (gratuityFormula) {
      case 'standard':
        // Standard: 1 week per year of service
        gratuityAmount = (monthlySalary / 4.33) * totalYears;
        break;
      case 'generous':
        // Generous: 2 weeks per year
        gratuityAmount = (monthlySalary / 4.33) * 2 * totalYears;
        break;
      case 'basic':
        // Basic: 1 day per year
        gratuityAmount = (monthlySalary / 21.67) * totalYears;
        break;
      case 'one_month':
        // 1 month per year
        gratuityAmount = monthlySalary * totalYears;
        break;
      default:
        gratuityAmount = (monthlySalary / 4.33) * totalYears;
    }

    // Calculate tax on lump sum
    let taxPayable = 0;

    // First R550,000 is tax-free for retirement/retrenchment
    const taxableAmount = terminationType === 'retirement' || terminationType === 'retrenchment'
      ? Math.max(0, gratuityAmount - 550000)
      : gratuityAmount; // Resignation taxed differently

    // Calculate tax based on bracket
    for (const bracket of LUMP_SUM_TAX_TABLE) {
      if (taxableAmount > bracket.min) {
        if (taxableAmount <= bracket.max) {
          taxPayable = bracket.base + (taxableAmount - bracket.min) * bracket.rate;
          break;
        }
      }
    }

    // Resignation doesn't get tax-free threshold
    if (terminationType === 'resignation') {
      // Taxed as additional income (simplified)
      const estimatedMarginalRate = 0.31; // Assume average
      taxPayable = gratuityAmount * estimatedMarginalRate;
    }

    const netPayout = gratuityAmount - taxPayable;
    const effectiveRate = (taxPayable / gratuityAmount) * 100;

    setResult({
      gratuityAmount,
      taxableAmount,
      taxPayable,
      netPayout,
      totalServiceYears: totalYears,
      effectiveRate,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Gratuity Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate end-of-service gratuity and severance pay</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Salary (R)
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Service
              </label>
              <input
                type="number"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Months
              </label>
              <select
                value={monthsOfService}
                onChange={(e) => setMonthsOfService(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg text-black"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>{i} months</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gratuity Formula
            </label>
            <select
              value={gratuityFormula}
              onChange={(e) => setGratuityFormula(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg text-black"
            >
              <option value="basic">Basic: 1 day per year</option>
              <option value="standard">Standard: 1 week per year (BCEA minimum)</option>
              <option value="generous">Generous: 2 weeks per year</option>
              <option value="one_month">Premium: 1 month per year</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Check your employment contract for actual formula</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Leaving
            </label>
            <select
              value={terminationType}
              onChange={(e) => setTerminationType(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg text-black"
            >
              <option value="resignation">Resignation</option>
              <option value="retrenchment">Retrenchment</option>
              <option value="retirement">Retirement</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Affects tax treatment of payout</p>
          </div>

          <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
            <h4 className="font-semibold text-violet-900 mb-2">BCEA Severance (Retrenchment)</h4>
            <p className="text-sm text-violet-800">
              Minimum: 1 week's pay per completed year of service. Your contract may offer more.
              First R550,000 of retrenchment package is tax-free.
            </p>
          </div>

          <button
            onClick={calculateGratuity}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Gratuity
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gratuity Breakdown</h3>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200">
              <p className="text-sm text-gray-600 mb-2">Net Payout (After Tax)</p>
              <p className="text-4xl font-bold text-violet-600">{formatCurrency(result.netPayout)}</p>
              <p className="text-sm text-gray-500 mt-2">For {result.totalServiceYears.toFixed(1)} years of service</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Gross Gratuity</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(result.gratuityAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
                <p className="text-xs text-gray-600 mb-1">Tax Payable</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(result.taxPayable)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <p className="text-sm text-gray-600 mb-2">Effective Tax Rate</p>
              <p className="text-3xl font-bold text-green-600">{result.effectiveRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-500 mt-2">
                {terminationType === 'retrenchment' || terminationType === 'retirement'
                  ? `Tax-free threshold: R550,000`
                  : 'Resignation: Taxed as income'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Calculation:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Monthly salary:</span>
                  <span className="font-mono">{formatCurrency(monthlySalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Years of service:</span>
                  <span className="font-mono">{result.totalServiceYears.toFixed(1)} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross gratuity:</span>
                  <span className="font-mono">{formatCurrency(result.gratuityAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less tax:</span>
                  <span className="font-mono text-red-600">-{formatCurrency(result.taxPayable)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Net payout:</span>
                  <span className="font-mono text-violet-600">{formatCurrency(result.netPayout)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gratuity Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Severance & Gratuity Rules</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">Retrenchment</h4>
            <p className="text-sm text-gray-700">
              BCEA minimum: 1 week per year of service. Many employers offer more generous packages.
              Must be paid within 7 days of termination.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Tax Treatment</h4>
            <p className="text-sm text-gray-700">
              Retirement/Retrenchment: First R550,000 tax-free. Resignation: Taxed as income at marginal rate.
              Strategy: Wait for retirement if close.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Pension Fund Payout</h4>
            <p className="text-sm text-gray-700">
              Pension fund withdrawals have separate rules. Consider preserving funds instead of
              withdrawing for better tax treatment.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">Important Notice</h4>
          <p className="text-sm text-yellow-800">
            Gratuity is not mandatory in SA unless specified in your employment contract.
            Check your contract and company policy. The BCEA only mandates severance pay for retrenchment.
          </p>
        </div>
      </div>
    </div>
  );
}
