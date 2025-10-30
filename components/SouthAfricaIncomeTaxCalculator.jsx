'use client'
import { useState } from 'react';

export default function SouthAfricaIncomeTaxCalculator() {
  const [annualSalary, setAnnualSalary] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [age, setAge] = useState('under65');
  const [medicalAidMembers, setMedicalAidMembers] = useState('0');
  const [retirementContribution, setRetirementContribution] = useState('');
  const [inputType, setInputType] = useState('annual'); // annual or monthly
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2025/2026 Tax Brackets
  const taxBrackets = [
    { min: 0, max: 237100, rate: 0.18, base: 0 },
    { min: 237101, max: 370500, rate: 0.26, base: 42678 },
    { min: 370501, max: 512800, rate: 0.31, base: 77362 },
    { min: 512801, max: 673000, rate: 0.36, base: 121475 },
    { min: 673001, max: 857900, rate: 0.39, base: 179147 },
    { min: 857901, max: 1817000, rate: 0.41, base: 251258 },
    { min: 1817001, max: Infinity, rate: 0.45, base: 644489 }
  ];

  // Tax Rebates 2025/2026
  const taxRebates = {
    primary: 17235,    // All taxpayers
    secondary: 9444,   // 65 and older
    tertiary: 3145     // 75 and older
  };

  // Medical Aid Tax Credits 2025/2026
  const medicalAidCredits = {
    main: 364,        // Main member
    dependent: 246    // Each dependent
  };

  const calculateIncomeTax = () => {
    const annual = inputType === 'annual'
      ? parseFloat(annualSalary)
      : parseFloat(monthlySalary) * 12;

    const retirementAnnual = parseFloat(retirementContribution) || 0;
    const members = parseInt(medicalAidMembers) || 0;

    // Calculate taxable income (after retirement deduction - max 27.5% or R350,000)
    const maxRetirementDeduction = Math.min(annual * 0.275, 350000);
    const retirementDeduction = Math.min(retirementAnnual, maxRetirementDeduction);
    const taxableIncome = annual - retirementDeduction;

    // Calculate tax based on brackets
    let taxBeforeRebates = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min + 1;
        taxBeforeRebates = bracket.base + (taxableInBracket * bracket.rate);
      }
    }

    // Apply tax rebates based on age
    let totalRebates = taxRebates.primary;
    if (age === '65to74') {
      totalRebates += taxRebates.secondary;
    } else if (age === '75plus') {
      totalRebates += taxRebates.secondary + taxRebates.tertiary;
    }

    // Apply medical aid tax credits
    const medicalAidCredit = members > 0
      ? (medicalAidCredits.main + (members - 1) * medicalAidCredits.dependent) * 12
      : 0;

    // Calculate final tax
    const taxAfterRebates = Math.max(taxBeforeRebates - totalRebates, 0);
    const taxAfterMedicalCredit = Math.max(taxAfterRebates - medicalAidCredit, 0);

    // Calculate UIF (1% of gross, max R177.12 per month)
    const monthlyGross = annual / 12;
    const uifMonthly = Math.min(monthlyGross * 0.01, 177.12);
    const uifAnnual = uifMonthly * 12;

    // Calculate PAYE (monthly tax deduction)
    const payeMonthly = taxAfterMedicalCredit / 12;

    // Calculate take-home
    const totalMonthlyDeductions = payeMonthly + uifMonthly;
    const monthlyTakeHome = monthlyGross - totalMonthlyDeductions;
    const annualTakeHome = annual - taxAfterMedicalCredit - uifAnnual;

    // Calculate effective tax rate
    const effectiveTaxRate = (taxAfterMedicalCredit / annual) * 100;

    // Determine marginal tax rate
    let marginalRate = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
        marginalRate = bracket.rate * 100;
        break;
      }
    }

    // Calculate tax threshold
    const taxThreshold = age === 'under65' ? 95750 : age === '65to74' ? 148217 : 165689;
    const isBelowThreshold = taxableIncome < taxThreshold;

    return {
      annualSalary: annual,
      monthlySalary: monthlyGross,
      taxableIncome,
      retirementDeduction,
      taxBeforeRebates,
      totalRebates,
      medicalAidCredit,
      taxAfterRebates,
      finalTax: taxAfterMedicalCredit,
      uifAnnual,
      uifMonthly,
      payeMonthly,
      totalMonthlyDeductions,
      monthlyTakeHome,
      annualTakeHome,
      effectiveTaxRate,
      marginalRate,
      taxThreshold,
      isBelowThreshold,
      breakdown: {
        grossMonthly: monthlyGross,
        paye: payeMonthly,
        uif: uifMonthly,
        netMonthly: monthlyTakeHome
      }
    };
  };

  const handleCalculate = () => {
    if (!annualSalary && !monthlySalary) return;

    setLoading(true);

    setTimeout(() => {
      const taxResult = calculateIncomeTax();
      setResult(taxResult);
      setLoading(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return 'R0';
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (percentage) => {
    if (isNaN(percentage)) return '0.0%';
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          💰 South African Income Tax Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Calculate your SARS income tax, PAYE, UIF, and take-home salary for 2025/2026
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-2xl p-1 flex">
            <button
              onClick={() => setInputType('annual')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                inputType === 'annual'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Annual Salary
            </button>
            <button
              onClick={() => setInputType('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                inputType === 'monthly'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📆 Monthly Salary
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {inputType === 'annual' ? (
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                💼 Annual Gross Salary
              </label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                placeholder="e.g. 600000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <p className="text-xs text-gray-500">Your total annual salary before deductions</p>
            </div>
          ) : (
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                💼 Monthly Gross Salary
              </label>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <p className="text-xs text-gray-500">Your monthly salary before deductions</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              👤 Age Group
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="under65">Under 65</option>
              <option value="65to74">65 to 74</option>
              <option value="75plus">75 and older</option>
            </select>
            <p className="text-xs text-gray-500">Age affects tax rebates and thresholds</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏥 Medical Aid Members
            </label>
            <select
              value={medicalAidMembers}
              onChange={(e) => setMedicalAidMembers(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="0">No medical aid</option>
              <option value="1">1 member (self only)</option>
              <option value="2">2 members (self + 1)</option>
              <option value="3">3 members (self + 2)</option>
              <option value="4">4 members (self + 3)</option>
              <option value="5">5+ members</option>
            </select>
            <p className="text-xs text-gray-500">Includes you and dependents on medical aid</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              💰 Annual Retirement Contribution (Optional)
            </label>
            <input
              type="number"
              value={retirementContribution}
              onChange={(e) => setRetirementContribution(e.target.value)}
              placeholder="e.g. 80000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">Pension/RA contributions (max 27.5% of income or R350,000 deductible)</p>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || (!annualSalary && !monthlySalary)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate My Tax</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Your Tax Calculation Summary
            </h3>

            {result.isBelowThreshold && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-2xl">
                <p className="text-green-800 font-semibold text-center">
                  🎉 Your income is below the tax threshold! You pay no income tax.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Gross Monthly</p>
                <p className="text-xl font-bold text-gray-800">{formatCurrency(result.monthlySalary)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Monthly PAYE</p>
                <p className="text-lg font-bold">{formatCurrency(result.payeMonthly)}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly UIF</p>
                <p className="text-lg font-bold text-orange-600">{formatCurrency(result.uifMonthly)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Take Home</p>
                <p className="text-lg font-bold">{formatCurrency(result.monthlyTakeHome)}</p>
              </div>
            </div>

            {/* Tax Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Annual Tax Breakdown
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600">Annual Gross Salary:</span>
                  <span className="font-medium">{formatCurrency(result.annualSalary)}</span>
                </div>
                {result.retirementDeduction > 0 && (
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-600">Retirement Deduction:</span>
                    <span className="font-medium text-green-600">-{formatCurrency(result.retirementDeduction)}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-t pt-2">
                  <span className="text-gray-600 font-semibold">Taxable Income:</span>
                  <span className="font-bold">{formatCurrency(result.taxableIncome)}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600">Tax Before Rebates:</span>
                  <span className="font-medium">{formatCurrency(result.taxBeforeRebates)}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600">Tax Rebates:</span>
                  <span className="font-medium text-green-600">-{formatCurrency(result.totalRebates)}</span>
                </div>
                {result.medicalAidCredit > 0 && (
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-600">Medical Aid Tax Credit:</span>
                    <span className="font-medium text-green-600">-{formatCurrency(result.medicalAidCredit)}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-t pt-2">
                  <span className="text-gray-600 font-semibold">Total Annual Tax (PAYE):</span>
                  <span className="font-bold text-red-600">{formatCurrency(result.finalTax)}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600">Total Annual UIF:</span>
                  <span className="font-medium text-orange-600">{formatCurrency(result.uifAnnual)}</span>
                </div>
                <div className="flex justify-between pb-2 border-t-2 pt-2">
                  <span className="text-gray-900 font-bold">Annual Take Home:</span>
                  <span className="font-bold text-green-600 text-lg">{formatCurrency(result.annualTakeHome)}</span>
                </div>
              </div>
            </div>

            {/* Tax Rates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  Tax Rates
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-sm">Effective Tax Rate</span>
                      <span className="font-bold text-blue-600">{formatPercentage(result.effectiveTaxRate)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000"
                           style={{ width: `${Math.min(result.effectiveTaxRate, 100)}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Actual tax paid as % of gross income</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-sm">Marginal Tax Rate</span>
                      <span className="font-bold text-purple-600">{formatPercentage(result.marginalRate)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                           style={{ width: `${result.marginalRate}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tax rate on your next R1 earned</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Monthly Breakdown
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gross Salary:</span>
                    <span className="font-medium">{formatCurrency(result.breakdown.grossMonthly)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">PAYE Tax:</span>
                    <span className="font-medium text-red-600">-{formatCurrency(result.breakdown.paye)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">UIF:</span>
                    <span className="font-medium text-orange-600">-{formatCurrency(result.breakdown.uif)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="text-gray-900 font-bold">Net Salary:</span>
                    <span className="font-bold text-green-600 text-lg">{formatCurrency(result.breakdown.netMonthly)}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> This excludes pension, medical aid, and other voluntary deductions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Saving Tips */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">💡</span>
              Tax Optimization Tips
            </h4>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">🏦 Retirement Annuities</h5>
                <p className="text-gray-600 mb-2">Contribute up to 27.5% of income (max R350,000) - fully tax deductible!</p>
                <p className="text-xs text-green-700">Potential saving: Up to 45% of contribution amount</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">🏥 Medical Aid Credits</h5>
                <p className="text-gray-600 mb-2">R364/month for main member, R246/month per dependent</p>
                <p className="text-xs text-green-700">Annual saving: Up to R{((364 + (parseInt(medicalAidMembers) - 1) * 246) * 12).toLocaleString()}</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">💰 Tax-Free Savings</h5>
                <p className="text-gray-600 mb-2">Invest up to R36,000/year - all growth is tax-free!</p>
                <p className="text-xs text-green-700">Long-term benefit: Significant capital gains & dividend tax savings</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">📝 Tax Deductions</h5>
                <p className="text-gray-600 mb-2">Home office, travel, donations up to 10% of income</p>
                <p className="text-xs text-green-700">Keep detailed records and receipts for all claims</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/articles/south-africa-income-tax-deductions-guide"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📖</span>
              <span>Tax Deductions Guide</span>
            </a>

            <a
              href="/south-africa-loan-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>💳</span>
              <span>Loan Calculator</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              💰 <strong>Tax Disclaimer:</strong> This calculator provides estimates based on 2025/2026 SARS tax tables.
              Actual tax may vary based on individual circumstances. Consult a registered tax practitioner for personalized advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
