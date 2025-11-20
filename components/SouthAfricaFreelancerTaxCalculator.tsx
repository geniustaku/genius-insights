'use client';

import { useState } from 'react';

export default function SouthAfricaFreelancerTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(500000);
  const [businessExpenses, setBusinessExpenses] = useState<number>(100000);
  const [medicalAidContributions, setMedicalAidContributions] = useState<number>(24000);
  const [retirementContributions, setRetirementContributions] = useState<number>(50000);
  const [age, setAge] = useState<number>(35);
  const [medicalAidMembers, setMedicalAidMembers] = useState<number>(1);

  // Tax brackets 2024/2025 for individuals
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

  // Medical aid tax credits (2024/2025)
  const MEDICAL_CREDIT_MAIN = 364; // per month
  const MEDICAL_CREDIT_DEPENDENT = 246; // per month per dependent

  const calculateIncomeTax = (taxableIncome: number) => {
    if (taxableIncome <= 0) return 0;

    for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
      const bracket = TAX_BRACKETS[i];
      if (taxableIncome >= bracket.min) {
        return bracket.base + (taxableIncome - bracket.min) * bracket.rate;
      }
    }
    return 0;
  };

  const calculate = () => {
    // Calculate taxable income
    const grossIncome = annualIncome;
    const netBusinessIncome = grossIncome - businessExpenses;

    // Retirement fund contributions (max 27.5% of income, capped at R350,000)
    const maxRetirement = Math.min(netBusinessIncome * 0.275, 350000);
    const allowableRetirement = Math.min(retirementContributions, maxRetirement);

    // Taxable income
    const taxableIncome = netBusinessIncome - allowableRetirement;

    // Calculate income tax before rebates
    const taxBeforeRebates = calculateIncomeTax(taxableIncome);

    // Apply rebates
    let totalRebates = PRIMARY_REBATE;
    if (age >= 65) totalRebates += SECONDARY_REBATE;
    if (age >= 75) totalRebates += TERTIARY_REBATE;

    // Medical aid tax credits
    const medicalCredits = (MEDICAL_CREDIT_MAIN + (MEDICAL_CREDIT_DEPENDENT * Math.max(0, medicalAidMembers - 1))) * 12;

    // Total tax credits
    const totalCredits = totalRebates + medicalCredits;

    // Final tax liability
    const incomeTax = Math.max(0, taxBeforeRebates - totalCredits);

    // Provisional tax payments
    // First payment: 50% of previous year's tax (estimate)
    // Second payment: 100% of current year's tax
    const firstProvisionalPayment = incomeTax * 0.50;
    const secondProvisionalPayment = incomeTax - firstProvisionalPayment;

    // Payment dates
    const firstPaymentDate = 'End of August';
    const secondPaymentDate = 'End of February';

    // Effective tax rate
    const effectiveTaxRate = netBusinessIncome > 0 ? (incomeTax / netBusinessIncome) * 100 : 0;

    // Tax threshold
    const taxThreshold = age >= 75 ? 157900 : age >= 65 ? 148217 : 95750;
    const belowThreshold = taxableIncome < taxThreshold;

    // Penalties for late provisional tax
    const penaltyRate = 10; // 10% penalty on underpayment

    // Deductions breakdown
    const totalDeductions = businessExpenses + allowableRetirement;
    const deductionBenefit = totalDeductions > 0
      ? calculateIncomeTax(grossIncome) - calculateIncomeTax(grossIncome - totalDeductions)
      : 0;

    return {
      // Income
      grossIncome,
      businessExpenses,
      netBusinessIncome,

      // Deductions
      retirementContributions: allowableRetirement,
      maxRetirementAllowed: maxRetirement,
      totalDeductions,
      deductionBenefit,

      // Taxable income
      taxableIncome,
      belowThreshold,
      taxThreshold,

      // Tax calculation
      taxBeforeRebates,
      primaryRebate: PRIMARY_REBATE,
      ageRebates: totalRebates - PRIMARY_REBATE,
      medicalCredits,
      totalCredits,

      // Final tax
      incomeTax,
      effectiveTaxRate,

      // Provisional payments
      firstProvisionalPayment,
      secondProvisionalPayment,
      firstPaymentDate,
      secondPaymentDate,

      // Penalties
      penaltyRate,

      // Monthly
      monthlyIncome: grossIncome / 12,
      monthlyExpenses: businessExpenses / 12,
      monthlyNetIncome: netBusinessIncome / 12,
      monthlyTax: incomeTax / 12,
      monthlyNetAfterTax: (netBusinessIncome - incomeTax) / 12
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Freelancer & Provisional Tax Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate income tax, provisional payments & deductions for freelancers</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Gross Income (R)
            </label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Total freelance/business income before expenses</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Expenses (R)
            </label>
            <input
              type="number"
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Software, equipment, office, travel, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Fund Contributions (R)
            </label>
            <input
              type="number"
              value={retirementContributions}
              onChange={(e) => setRetirementContributions(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max deductible: R{results.maxRetirementAllowed.toLocaleString()}
              (27.5% of income, capped at R350K)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Aid Contributions (R per year)
            </label>
            <input
              type="number"
              value={medicalAidContributions}
              onChange={(e) => setMedicalAidContributions(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Annual medical aid premiums (for tax credit)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Aid Members
            </label>
            <select
              value={medicalAidMembers}
              onChange={(e) => setMedicalAidMembers(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="1">1 (You only)</option>
              <option value="2">2 (You + 1 dependent)</option>
              <option value="3">3 (You + 2 dependents)</option>
              <option value="4">4 (You + 3 dependents)</option>
              <option value="5">5 (You + 4 dependents)</option>
              <option value="6">6+ (You + 5+ dependents)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Tax credit: R{MEDICAL_CREDIT_MAIN}/month + R{MEDICAL_CREDIT_DEPENDENT}/month per dependent
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Age
            </label>
            <select
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="25">Under 65</option>
              <option value="67">65-74 years</option>
              <option value="76">75+ years</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Age affects tax rebates and thresholds</p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Income Breakdown */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💼 Income Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Gross Income:</span>
                <span className="font-semibold text-black">R{results.grossIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Business Expenses:</span>
                <span className="font-semibold text-red-600">-R{results.businessExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Net Business Income:</span>
                <span className="font-bold text-purple-600">R{results.netBusinessIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Retirement Contributions:</span>
                <span className="font-semibold text-green-600">-R{results.retirementContributions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-purple-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Taxable Income:</span>
                <span className="font-bold text-purple-700 text-lg">R{results.taxableIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tax Calculation */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Tax Calculation</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Tax Before Rebates:</span>
                <span className="font-semibold text-black">R{results.taxBeforeRebates.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Primary Rebate:</span>
                <span className="font-semibold text-green-600">-R{results.primaryRebate.toLocaleString()}</span>
              </div>
              {results.ageRebates > 0 && (
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="text-gray-700">Age Rebates:</span>
                  <span className="font-semibold text-green-600">-R{results.ageRebates.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Medical Tax Credits:</span>
                <span className="font-semibold text-green-600">-R{results.medicalCredits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-red-50 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Annual Tax Payable:</span>
                <span className="font-bold text-red-600 text-xl">R{results.incomeTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Effective Tax Rate:</span>
                <span className="font-semibold text-black">{results.effectiveTaxRate.toFixed(2)}%</span>
              </div>
            </div>

            {results.belowThreshold && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-sm text-green-900">
                  ✓ Your taxable income is below the tax threshold (R{results.taxThreshold.toLocaleString()}).
                  You may not owe any tax!
                </p>
              </div>
            )}
          </div>

          {/* Provisional Tax Payments */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Provisional Tax Payments</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">1st Payment ({results.firstPaymentDate}):</span>
                  <span className="font-bold text-orange-600">R{results.firstProvisionalPayment.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">Based on 50% of estimated annual tax</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">2nd Payment ({results.secondPaymentDate}):</span>
                  <span className="font-bold text-orange-600">R{results.secondProvisionalPayment.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">Balance of annual tax liability</p>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-xs text-yellow-900">
                  ⚠️ <strong>Late Payment Penalty:</strong> {results.penaltyRate}% interest on underpayments.
                  Pay provisional tax on time to avoid penalties!
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Monthly Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Monthly Gross:</span>
                <span className="font-semibold text-black">R{results.monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Monthly Expenses:</span>
                <span className="font-semibold text-red-600">-R{results.monthlyExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Monthly Tax:</span>
                <span className="font-semibold text-red-600">-R{results.monthlyTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-green-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Monthly Net Income:</span>
                <span className="font-bold text-green-600 text-xl">R{results.monthlyNetAfterTax.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tax Savings */}
          {results.deductionBenefit > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Tax Savings from Deductions</h4>
              <p className="text-sm text-blue-800">
                Your R{results.totalDeductions.toLocaleString()} in deductions (expenses + retirement)
                save you approximately R{results.deductionBenefit.toLocaleString()} in tax!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
