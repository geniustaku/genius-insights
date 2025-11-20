'use client';

import { useState } from 'react';

export default function SouthAfricaPayrollCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(30000);
  const [payPeriod, setPayPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [age, setAge] = useState<number>(35);
  const [medicalAid, setMedicalAid] = useState<number>(2500);
  const [medicalAidDependents, setMedicalAidDependents] = useState<number>(1);
  const [retirementContribution, setRetirementContribution] = useState<number>(3000);
  const [hasUIF, setHasUIF] = useState<boolean>(true);

  // Tax brackets 2024/2025
  const TAX_BRACKETS = [
    { min: 0, max: 237100, rate: 0.18, base: 0 },
    { min: 237101, max: 370500, rate: 0.26, base: 42678 },
    { min: 370501, max: 512800, rate: 0.31, base: 77362 },
    { min: 512801, max: 673000, rate: 0.36, base: 121475 },
    { min: 673001, max: 857900, rate: 0.39, base: 179147 },
    { min: 857901, max: 1817000, rate: 0.41, base: 251258 },
    { min: 1817001, max: Infinity, rate: 0.45, base: 644489 }
  ];

  // Rebates 2024/2025
  const PRIMARY_REBATE = 17235;
  const SECONDARY_REBATE = 9444; // 65+
  const TERTIARY_REBATE = 3145; // 75+

  // UIF rates
  const UIF_RATE = 0.01; // 1% employee contribution
  const UIF_CAP = 177.12; // Monthly cap (R17,712 * 1%)

  // Medical aid tax credits
  const MEDICAL_CREDIT_MAIN = 364; // per month
  const MEDICAL_CREDIT_DEPENDENT = 246; // per month per dependent

  const calculateAnnualTax = (annualTaxableIncome: number) => {
    if (annualTaxableIncome <= 0) return 0;

    for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
      const bracket = TAX_BRACKETS[i];
      if (annualTaxableIncome >= bracket.min) {
        return bracket.base + (annualTaxableIncome - bracket.min) * bracket.rate;
      }
    }
    return 0;
  };

  const calculate = () => {
    // Convert to annual if monthly
    const annualGross = payPeriod === 'monthly' ? grossSalary * 12 : grossSalary;
    const annualRetirement = payPeriod === 'monthly' ? retirementContribution * 12 : retirementContribution;

    // Pension fund deduction (pre-tax)
    const annualTaxableIncome = annualGross - annualRetirement;

    // Calculate annual PAYE
    const annualTaxBeforeRebates = calculateAnnualTax(annualTaxableIncome);

    // Apply rebates
    let totalRebates = PRIMARY_REBATE;
    if (age >= 65) totalRebates += SECONDARY_REBATE;
    if (age >= 75) totalRebates += TERTIARY_REBATE;

    // Medical aid tax credits (annual)
    const annualMedicalCredits = (MEDICAL_CREDIT_MAIN + (MEDICAL_CREDIT_DEPENDENT * Math.max(0, medicalAidDependents - 1))) * 12;

    // Total tax credits
    const totalAnnualCredits = totalRebates + annualMedicalCredits;

    // Annual PAYE
    const annualPAYE = Math.max(0, annualTaxBeforeRebates - totalAnnualCredits);

    // Monthly breakdown
    const monthlyGross = annualGross / 12;
    const monthlyPAYE = annualPAYE / 12;
    const monthlyRetirement = annualRetirement / 12;

    // UIF calculation (1% of gross, capped at R177.12/month)
    const monthlyUIF = hasUIF ? Math.min(monthlyGross * UIF_RATE, UIF_CAP) : 0;
    const annualUIF = monthlyUIF * 12;

    // Medical aid (post-tax deduction - employee portion)
    const monthlyMedicalAid = payPeriod === 'monthly' ? medicalAid : medicalAid / 12;
    const annualMedicalAid = monthlyMedicalAid * 12;

    // Total deductions
    const monthlyTotalDeductions = monthlyPAYE + monthlyUIF + monthlyRetirement + monthlyMedicalAid;
    const annualTotalDeductions = annualPAYE + annualUIF + annualRetirement + annualMedicalAid;

    // Net (take-home) pay
    const monthlyNet = monthlyGross - monthlyTotalDeductions;
    const annualNet = annualGross - annualTotalDeductions;

    // Employer costs (for reference)
    const employerUIF = monthlyUIF; // Employer also pays 1%
    const employerSDL = monthlyGross * 0.01; // Skills Development Levy: 1%
    const employerTotal = monthlyGross + employerUIF + employerSDL;

    // Effective tax rate
    const effectiveTaxRate = annualGross > 0 ? (annualPAYE / annualGross) * 100 : 0;

    return {
      // Gross
      monthlyGross,
      annualGross,

      // Deductions
      monthlyPAYE,
      annualPAYE,
      monthlyUIF,
      annualUIF,
      monthlyRetirement,
      annualRetirement,
      monthlyMedicalAid,
      annualMedicalAid,

      // Totals
      monthlyTotalDeductions,
      annualTotalDeductions,

      // Net
      monthlyNet,
      annualNet,

      // Tax details
      annualTaxableIncome,
      annualTaxBeforeRebates,
      totalRebates,
      annualMedicalCredits,
      effectiveTaxRate,

      // Employer costs
      employerUIF,
      employerSDL,
      employerTotal,

      // Percentages
      payePercentage: monthlyGross > 0 ? (monthlyPAYE / monthlyGross) * 100 : 0,
      deductionsPercentage: monthlyGross > 0 ? (monthlyTotalDeductions / monthlyGross) * 100 : 0,
      takeHomePercentage: monthlyGross > 0 ? (monthlyNet / monthlyGross) * 100 : 0
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">South Africa Payroll Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate take-home pay with PAYE, UIF, pension & medical aid deductions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay Period
            </label>
            <select
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value as 'monthly' | 'annual')}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="monthly">Monthly Salary</option>
              <option value="annual">Annual Salary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gross Salary (R)
            </label>
            <input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              {payPeriod === 'monthly' ? 'Monthly' : 'Annual'} salary before deductions
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement/Pension Contribution (R {payPeriod === 'monthly' ? 'per month' : 'per year'})
            </label>
            <input
              type="number"
              value={retirementContribution}
              onChange={(e) => setRetirementContribution(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Pre-tax deduction (pension fund contribution)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Aid Contribution (R {payPeriod === 'monthly' ? 'per month' : 'per year'})
            </label>
            <input
              type="number"
              value={medicalAid}
              onChange={(e) => setMedicalAid(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Employee portion of medical aid (post-tax)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Aid Members
            </label>
            <select
              value={medicalAidDependents}
              onChange={(e) => setMedicalAidDependents(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="1">1 (You only)</option>
              <option value="2">2 (You + 1 dependent)</option>
              <option value="3">3 (You + 2 dependents)</option>
              <option value="4">4 (You + 3 dependents)</option>
              <option value="5">5+ (You + 4+ dependents)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Tax credit: R{MEDICAL_CREDIT_MAIN}/month + R{MEDICAL_CREDIT_DEPENDENT}/month per dependent
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <select
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="25">Under 65</option>
              <option value="67">65-74 years</option>
              <option value="76">75+ years</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Age affects tax rebates</p>
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasUIF}
                onChange={(e) => setHasUIF(e.target.checked)}
                className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Apply UIF Deduction (1%, max R177.12/month)
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-8">Unemployment Insurance Fund contribution</p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Monthly Breakdown */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Monthly Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-teal-200">
                <span className="text-gray-700">Gross Salary:</span>
                <span className="font-bold text-teal-600">R{results.monthlyGross.toLocaleString()}</span>
              </div>

              <div className="text-sm font-medium text-gray-600 mt-4 mb-2">Deductions:</div>

              <div className="flex justify-between py-2 border-b border-teal-200">
                <span className="text-gray-700">PAYE (Income Tax):</span>
                <span className="font-semibold text-red-600">-R{results.monthlyPAYE.toLocaleString()}</span>
              </div>

              {hasUIF && (
                <div className="flex justify-between py-2 border-b border-teal-200">
                  <span className="text-gray-700">UIF (1%):</span>
                  <span className="font-semibold text-red-600">-R{results.monthlyUIF.toLocaleString()}</span>
                </div>
              )}

              {results.monthlyRetirement > 0 && (
                <div className="flex justify-between py-2 border-b border-teal-200">
                  <span className="text-gray-700">Pension/Retirement:</span>
                  <span className="font-semibold text-red-600">-R{results.monthlyRetirement.toLocaleString()}</span>
                </div>
              )}

              {results.monthlyMedicalAid > 0 && (
                <div className="flex justify-between py-2 border-b border-teal-200">
                  <span className="text-gray-700">Medical Aid:</span>
                  <span className="font-semibold text-red-600">-R{results.monthlyMedicalAid.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between py-2 bg-teal-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Total Deductions:</span>
                <span className="font-bold text-red-700">-R{results.monthlyTotalDeductions.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg px-3 mt-4">
                <span className="text-gray-900 font-bold">Take-Home Pay:</span>
                <span className="font-bold text-green-600 text-2xl">R{results.monthlyNet.toLocaleString()}</span>
              </div>

              <div className="text-center text-sm text-gray-600 mt-2">
                {results.takeHomePercentage.toFixed(1)}% of gross salary
              </div>
            </div>
          </div>

          {/* Annual Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Annual Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Gross Income:</span>
                <span className="font-semibold text-black">R{results.annualGross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Total PAYE:</span>
                <span className="font-semibold text-red-600">R{results.annualPAYE.toLocaleString()}</span>
              </div>
              {hasUIF && (
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="text-gray-700">Total UIF:</span>
                  <span className="font-semibold text-red-600">R{results.annualUIF.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Total Deductions:</span>
                <span className="font-bold text-red-700">R{results.annualTotalDeductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-green-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Annual Take-Home:</span>
                <span className="font-bold text-green-600 text-lg">R{results.annualNet.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tax Details */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Tax Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Taxable Income:</span>
                <span className="font-semibold text-black">R{results.annualTaxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Tax Before Rebates:</span>
                <span className="font-semibold text-black">R{results.annualTaxBeforeRebates.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Tax Rebates:</span>
                <span className="font-semibold text-green-600">-R{results.totalRebates.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Medical Tax Credits:</span>
                <span className="font-semibold text-green-600">-R{results.annualMedicalCredits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Effective Tax Rate:</span>
                <span className="font-semibold text-black">{results.effectiveTaxRate.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Employer Costs (for reference) */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🏢 Employer Costs (Monthly)</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-orange-200">
                <span className="text-gray-700">Gross Salary:</span>
                <span className="font-semibold text-black">R{results.monthlyGross.toLocaleString()}</span>
              </div>
              {hasUIF && (
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span className="text-gray-700">Employer UIF (1%):</span>
                  <span className="font-semibold text-orange-600">+R{results.employerUIF.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-orange-200">
                <span className="text-gray-700">SDL - Skills Levy (1%):</span>
                <span className="font-semibold text-orange-600">+R{results.employerSDL.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-orange-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Total Employer Cost:</span>
                <span className="font-bold text-orange-700 text-lg">R{results.employerTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-orange-700 mt-2">
                Employer's total monthly cost including statutory contributions
              </p>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">💡 Salary Breakdown</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">PAYE:</div>
                <div className="flex-grow bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-red-500 h-full flex items-center justify-end px-2"
                    style={{ width: `${results.payePercentage}%` }}
                  >
                    <span className="text-xs text-white font-medium">{results.payePercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Deductions:</div>
                <div className="flex-grow bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-orange-500 h-full flex items-center justify-end px-2"
                    style={{ width: `${results.deductionsPercentage}%` }}
                  >
                    <span className="text-xs text-white font-medium">{results.deductionsPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Take-Home:</div>
                <div className="flex-grow bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-green-500 h-full flex items-center justify-end px-2"
                    style={{ width: `${results.takeHomePercentage}%` }}
                  >
                    <span className="text-xs text-white font-medium">{results.takeHomePercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
