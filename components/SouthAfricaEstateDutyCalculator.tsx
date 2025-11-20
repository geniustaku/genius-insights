'use client';

import { useState } from 'react';

export default function SouthAfricaEstateDutyCalculator() {
  const [estateValue, setEstateValue] = useState<number>(5000000);
  const [liabilities, setLiabilities] = useState<number>(500000);
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married-cop' | 'married-anc'>('married-anc');
  const [spouseAssets, setSpouseAssets] = useState<number>(3000000);
  const [charitableBequests, setCharitableBequests] = useState<number>(0);
  const [lifeInsurancePayouts, setLifeInsurancePayouts] = useState<number>(1000000);
  const [retirementFunds, setRetirementFunds] = useState<number>(800000);

  // Estate duty rates 2024/2025
  const ESTATE_DUTY_RATE_LOWER = 0.20; // 20% on first R30 million
  const ESTATE_DUTY_RATE_HIGHER = 0.25; // 25% on excess above R30 million
  const ESTATE_DUTY_THRESHOLD = 30000000;

  // Abatement (exemption)
  const ABATEMENT = 3500000; // R3.5 million per deceased estate

  const calculate = () => {
    // Calculate gross estate value
    let grossEstate = estateValue;

    // Add life insurance proceeds (if estate is beneficiary)
    grossEstate += lifeInsurancePayouts;

    // Deductions
    let totalDeductions = 0;

    // 1. Liabilities (debts, funeral costs, executor fees)
    totalDeductions += liabilities;

    // 2. Section 4(q) deduction - property passing to surviving spouse
    let spouseDeduction = 0;
    if (maritalStatus === 'married-anc') {
      // Married in community of property: spouse gets 50%
      spouseDeduction = grossEstate * 0.50;
    } else if (maritalStatus === 'married-cop') {
      // Married out of community with accrual: depends on estate
      // Simplified: assume spouse gets bequest equal to their current assets
      spouseDeduction = Math.min(spouseAssets, grossEstate * 0.50);
    }
    totalDeductions += spouseDeduction;

    // 3. Charitable bequests (Section 4(a))
    totalDeductions += charitableBequests;

    // 4. Exclusions from estate duty
    // Retirement funds (pension, provident, RA) go directly to beneficiaries
    // Not included in dutiable estate
    const excludedAssets = retirementFunds;

    // Net estate value
    const netEstate = grossEstate - totalDeductions - excludedAssets;

    // Apply abatement (R3.5M exemption)
    const dutiableEstate = Math.max(0, netEstate - ABATEMENT);

    // Calculate estate duty
    let estateDuty = 0;
    if (dutiableEstate > ESTATE_DUTY_THRESHOLD) {
      // First R30M at 20%, excess at 25%
      estateDuty = (ESTATE_DUTY_THRESHOLD * ESTATE_DUTY_RATE_LOWER) +
        ((dutiableEstate - ESTATE_DUTY_THRESHOLD) * ESTATE_DUTY_RATE_HIGHER);
    } else {
      // All at 20%
      estateDuty = dutiableEstate * ESTATE_DUTY_RATE_LOWER;
    }

    // Effective duty rate
    const effectiveDutyRate = grossEstate > 0 ? (estateDuty / grossEstate) * 100 : 0;

    // Amount passing to heirs
    const amountToHeirs = grossEstate - liabilities - estateDuty;

    // Percentage lost to duty
    const percentageLostToDuty = grossEstate > 0 ? (estateDuty / grossEstate) * 100 : 0;

    return {
      // Estate calculation
      grossEstate,
      liabilities,
      spouseDeduction,
      charitableBequests,
      excludedAssets,
      totalDeductions,
      netEstate,

      // Duty calculation
      abatement: ABATEMENT,
      dutiableEstate,
      estateDuty,
      effectiveDutyRate,

      // Distribution
      amountToHeirs,
      percentageLostToDuty,

      // Breakdown
      isAboveDutyThreshold: netEstate > ABATEMENT,
      isAboveHigherRateThreshold: dutiableEstate > ESTATE_DUTY_THRESHOLD,

      // Tips
      hasSpouseDeduction: spouseDeduction > 0,
      maritalStatus
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Estate Duty Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate estate duty (death tax) on your estate with 2025 rates</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status
            </label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value as any)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="single">Single/Divorced/Widowed</option>
              <option value="married-cop">Married in Community of Property</option>
              <option value="married-anc">Married out of Community (ANC)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Affects spouse deduction on estate duty</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gross Estate Value (R)
            </label>
            <input
              type="number"
              value={estateValue}
              onChange={(e) => setEstateValue(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Total value of all assets (property, investments, cash, etc.)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Liabilities & Debts (R)
            </label>
            <input
              type="number"
              value={liabilities}
              onChange={(e) => setLiabilities(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Mortgages, loans, funeral costs, executor fees</p>
          </div>

          {(maritalStatus === 'married-cop' || maritalStatus === 'married-anc') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spouse's Separate Assets (R)
              </label>
              <input
                type="number"
                value={spouseAssets}
                onChange={(e) => setSpouseAssets(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">For married ANC - spouse's own estate value</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Life Insurance Payouts (R)
            </label>
            <input
              type="number"
              value={lifeInsurancePayouts}
              onChange={(e) => setLifeInsurancePayouts(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">If estate is beneficiary (pays into estate, attracts duty)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Funds (Pension/Provident/RA) (R)
            </label>
            <input
              type="number"
              value={retirementFunds}
              onChange={(e) => setRetirementFunds(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Exempt from estate duty - passes directly to beneficiaries</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Charitable Bequests (R)
            </label>
            <input
              type="number"
              value={charitableBequests}
              onChange={(e) => setCharitableBequests(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Donations to registered charities/PBOs (deductible)</p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Estate Valuation */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Estate Valuation</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-indigo-200">
                <span className="text-gray-700">Gross Estate Value:</span>
                <span className="font-bold text-indigo-600">R{results.grossEstate.toLocaleString()}</span>
              </div>

              <div className="text-sm font-medium text-gray-600 mt-4 mb-2">Less: Deductions</div>

              <div className="flex justify-between py-2 border-b border-indigo-200">
                <span className="text-gray-700">Liabilities & Debts:</span>
                <span className="font-semibold text-red-600">-R{results.liabilities.toLocaleString()}</span>
              </div>

              {results.hasSpouseDeduction && (
                <div className="flex justify-between py-2 border-b border-indigo-200">
                  <span className="text-gray-700">Spouse Deduction:</span>
                  <span className="font-semibold text-green-600">-R{results.spouseDeduction.toLocaleString()}</span>
                </div>
              )}

              {results.charitableBequests > 0 && (
                <div className="flex justify-between py-2 border-b border-indigo-200">
                  <span className="text-gray-700">Charitable Bequests:</span>
                  <span className="font-semibold text-green-600">-R{results.charitableBequests.toLocaleString()}</span>
                </div>
              )}

              {results.excludedAssets > 0 && (
                <div className="flex justify-between py-2 border-b border-indigo-200">
                  <span className="text-gray-700">Excluded Assets (Retirement):</span>
                  <span className="font-semibold text-green-600">-R{results.excludedAssets.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between py-2 bg-indigo-100 rounded-lg px-3 mt-3">
                <span className="text-gray-900 font-medium">Net Estate Value:</span>
                <span className="font-bold text-indigo-700 text-lg">R{results.netEstate.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Estate Duty Calculation */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Estate Duty Calculation</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Net Estate:</span>
                <span className="font-semibold text-black">R{results.netEstate.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Less: Abatement (R3.5M):</span>
                <span className="font-semibold text-green-600">-R{results.abatement.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 bg-orange-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Dutiable Estate:</span>
                <span className="font-bold text-orange-700">R{results.dutiableEstate.toLocaleString()}</span>
              </div>

              {results.isAboveDutyThreshold && (
                <>
                  <div className="flex justify-between py-2 border-b border-red-200 text-sm mt-4">
                    <span className="text-gray-600">First R30M @ 20%:</span>
                    <span className="font-semibold text-black">R{(ESTATE_DUTY_THRESHOLD * 0.20).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-red-200 text-sm">
                    <span className="text-gray-600">Excess @ 25%:</span>
                    <span className="font-semibold text-black">
                      R{((results.dutiableEstate - ESTATE_DUTY_THRESHOLD) * 0.25).toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between py-3 bg-red-100 rounded-lg px-3 mt-3">
                <span className="text-gray-900 font-bold">Estate Duty Payable:</span>
                <span className="font-bold text-red-600 text-2xl">R{results.estateDuty.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Effective Duty Rate:</span>
                <span className="font-semibold text-black">{results.effectiveDutyRate.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Distribution to Heirs */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍👩‍👧‍👦 Amount to Heirs</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Gross Estate:</span>
                <span className="font-semibold text-black">R{results.grossEstate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Liabilities:</span>
                <span className="font-semibold text-red-600">-R{results.liabilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Estate Duty:</span>
                <span className="font-semibold text-red-600">-R{results.estateDuty.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 bg-green-100 rounded-lg px-3 mt-3">
                <span className="text-gray-900 font-bold">Net to Heirs:</span>
                <span className="font-bold text-green-600 text-2xl">R{results.amountToHeirs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Lost to Duty:</span>
                <span className="font-semibold text-red-600">{results.percentageLostToDuty.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {results.estateDuty > 0 ? (
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-300">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Estate Duty Payable</h4>
              <p className="text-sm text-yellow-800 leading-relaxed">
                Your estate will pay R{results.estateDuty.toLocaleString()} in estate duty ({results.percentageLostToDuty.toFixed(1)}% of gross estate).
                Consider estate planning strategies to reduce this liability: life insurance in trust, donations to spouse,
                charitable bequests, or trusts.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-green-50 rounded-lg border border-green-300">
              <h4 className="font-semibold text-green-900 mb-2">✓ No Estate Duty Payable</h4>
              <p className="text-sm text-green-800 leading-relaxed">
                Your estate is below the R{ABATEMENT.toLocaleString()} exemption threshold. No estate duty will be payable.
                {results.hasSpouseDeduction && ' The spouse deduction significantly reduces your estate duty liability.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
