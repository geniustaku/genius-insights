'use client';

import { useState } from 'react';

interface PensionResult {
  monthlyContribution: number;
  annualContribution: number;
  taxDeduction: number;
  netMonthlyCost: number;
  projectedFund: number;
  monthlyPension: number;
  totalContributions: number;
  totalGrowth: number;
}

export default function SouthAfricaPensionCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [monthlySalary, setMonthlySalary] = useState<number>(35000);
  const [contributionPercent, setContributionPercent] = useState<number>(15);
  const [currentFundValue, setCurrentFundValue] = useState<number>(100000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [annuityRate, setAnnuityRate] = useState<number>(5);

  const [result, setResult] = useState<PensionResult | null>(null);

  // Tax deduction limits for retirement funds
  const MAX_TAX_DEDUCTION_PERCENT = 27.5; // 27.5% of greater of remuneration or taxable income
  const MAX_TAX_DEDUCTION_AMOUNT = 350000; // R350,000 per year cap

  const calculatePension = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;

    // Calculate contributions
    const monthlyContribution = (monthlySalary * contributionPercent) / 100;
    const annualContribution = monthlyContribution * 12;

    // Calculate tax deduction (capped at 27.5% of salary or R350,000)
    const maxDeductible = Math.min(
      (monthlySalary * 12 * MAX_TAX_DEDUCTION_PERCENT) / 100,
      MAX_TAX_DEDUCTION_AMOUNT
    );
    const actualDeduction = Math.min(annualContribution, maxDeductible);

    // Estimate tax savings (using approximate marginal rate)
    let marginalRate = 0.18; // Default 18%
    const annualSalary = monthlySalary * 12;
    if (annualSalary > 1817000) marginalRate = 0.45;
    else if (annualSalary > 857900) marginalRate = 0.41;
    else if (annualSalary > 673000) marginalRate = 0.39;
    else if (annualSalary > 512800) marginalRate = 0.36;
    else if (annualSalary > 370500) marginalRate = 0.31;
    else if (annualSalary > 237100) marginalRate = 0.26;

    const taxDeduction = actualDeduction * marginalRate;
    const netMonthlyCost = monthlyContribution - (taxDeduction / 12);

    // Project fund value at retirement (compound interest with monthly contributions)
    const monthlyRate = expectedReturn / 100 / 12;

    // Future value of current fund
    const futureCurrentFund = currentFundValue * Math.pow(1 + monthlyRate, monthsToRetirement);

    // Future value of monthly contributions (annuity)
    const futureContributions = monthlyContribution *
      ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate);

    const projectedFund = futureCurrentFund + futureContributions;
    const totalContributions = currentFundValue + (monthlyContribution * monthsToRetirement);
    const totalGrowth = projectedFund - totalContributions;

    // Calculate monthly pension using annuity rate
    const monthlyPension = (projectedFund * (annuityRate / 100)) / 12;

    setResult({
      monthlyContribution,
      annualContribution,
      taxDeduction,
      netMonthlyCost,
      projectedFund,
      monthlyPension,
      totalContributions,
      totalGrowth,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pension Calculator</h2>
        <p className="text-gray-600 text-lg">Plan your retirement with tax-efficient pension contributions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Salary (R)
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Rate (% of salary)
            </label>
            <select
              value={contributionPercent}
              onChange={(e) => setContributionPercent(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            >
              <option value={5}>5% (minimum recommended)</option>
              <option value={10}>10%</option>
              <option value={15}>15% (recommended)</option>
              <option value={17.5}>17.5%</option>
              <option value={20}>20%</option>
              <option value={22.5}>22.5%</option>
              <option value={27.5}>27.5% (max tax deductible)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Max 27.5% of salary is tax deductible (capped at R350,000/year)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Fund Value (R)
            </label>
            <input
              type="number"
              value={currentFundValue}
              onChange={(e) => setCurrentFundValue(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Your existing retirement fund balance</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <select
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            >
              <option value={6}>6% (conservative)</option>
              <option value={8}>8% (moderate)</option>
              <option value={10}>10% (balanced)</option>
              <option value={12}>12% (growth)</option>
              <option value={14}>14% (aggressive)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Historical SA equity: ~10-12% long-term</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annuity Rate (% of fund per year)
            </label>
            <select
              value={annuityRate}
              onChange={(e) => setAnnuityRate(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            >
              <option value={4}>4% (conservative drawdown)</option>
              <option value={5}>5% (standard)</option>
              <option value={6}>6% (moderate)</option>
              <option value={7}>7.5% (higher risk)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Safe withdrawal rate to not outlive your money</p>
          </div>

          <button
            onClick={calculatePension}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Pension Projection
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Retirement Projection</h3>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
              <p className="text-sm text-gray-600 mb-2">Projected Monthly Pension</p>
              <p className="text-4xl font-bold text-teal-600">{formatCurrency(result.monthlyPension)}</p>
              <p className="text-sm text-gray-500 mt-2">At age {retirementAge}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <p className="text-sm text-gray-600 mb-2">Projected Fund Value</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(result.projectedFund)}</p>
              <p className="text-sm text-gray-500 mt-2">After {retirementAge - currentAge} years</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Monthly Contribution</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(result.monthlyContribution)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Annual Tax Saving</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(result.taxDeduction)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
              <p className="text-sm text-gray-600 mb-2">Net Monthly Cost (After Tax)</p>
              <p className="text-3xl font-bold text-orange-600">{formatCurrency(result.netMonthlyCost)}</p>
              <p className="text-sm text-gray-500 mt-2">What it actually costs you</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Growth Breakdown:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Current fund:</span>
                  <span className="font-mono">{formatCurrency(currentFundValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total contributions:</span>
                  <span className="font-mono">{formatCurrency(result.totalContributions - currentFundValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Investment growth:</span>
                  <span className="font-mono text-green-600">{formatCurrency(result.totalGrowth)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Final fund value:</span>
                  <span className="font-mono">{formatCurrency(result.projectedFund)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pension Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Retirement Fund Types in SA</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">Pension Fund</h4>
            <p className="text-sm text-gray-700">
              Employer-sponsored defined benefit or contribution fund. At retirement, 1/3 can be taken as lump sum (R550,000 tax-free),
              2/3 must buy an annuity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Provident Fund</h4>
            <p className="text-sm text-gray-700">
              Similar to pension fund but historically allowed full lump sum at retirement.
              Since 2021, new contributions follow pension fund rules (1/3 lump sum, 2/3 annuity).
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Retirement Annuity (RA)</h4>
            <p className="text-sm text-gray-700">
              Personal retirement fund for self-employed or additional savings.
              Same tax benefits as pension fund. Can't access before age 55.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
          <h4 className="font-semibold text-teal-900 mb-2">Tax Benefit (2025)</h4>
          <p className="text-sm text-teal-800">
            Contributions up to 27.5% of your salary (max R350,000/year) are tax deductible.
            At retirement, first R550,000 lump sum is tax-free, remainder taxed on sliding scale.
          </p>
        </div>
      </div>
    </div>
  );
}
