'use client';

import { useState } from 'react';

interface TaxRefundResult {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeRebates: number;
  taxRebates: number;
  taxAfterRebates: number;
  taxPaid: number;
  refundOrOwing: number;
  isRefund: boolean;
  effectiveRate: number;
}

export default function SouthAfricaTaxRefundCalculator() {
  const [annualSalary, setAnnualSalary] = useState<number>(400000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [taxPaid, setTaxPaid] = useState<number>(70000);
  const [age, setAge] = useState<number>(35);

  // Deductions
  const [retirementContributions, setRetirementContributions] = useState<number>(40000);
  const [medicalAidContributions, setMedicalAidContributions] = useState<number>(36000);
  const [medicalAidMembers, setMedicalAidMembers] = useState<number>(2);
  const [travelAllowance, setTravelAllowance] = useState<number>(0);
  const [businessKilometers, setBusinessKilometers] = useState<number>(0);
  const [homeofficeDays, setHomeofficeDays] = useState<number>(0);

  const [result, setResult] = useState<TaxRefundResult | null>(null);

  // 2025 Tax Tables (2024/2025 tax year)
  const TAX_BRACKETS = [
    { min: 0, max: 237100, rate: 0.18, base: 0 },
    { min: 237101, max: 370500, rate: 0.26, base: 42678 },
    { min: 370501, max: 512800, rate: 0.31, base: 77362 },
    { min: 512801, max: 673000, rate: 0.36, base: 121475 },
    { min: 673001, max: 857900, rate: 0.39, base: 179147 },
    { min: 857901, max: 1817000, rate: 0.41, base: 251258 },
    { min: 1817001, max: Infinity, rate: 0.45, base: 644489 },
  ];

  // Rebates
  const PRIMARY_REBATE = 17235;
  const SECONDARY_REBATE = 9444; // 65 and older
  const TERTIARY_REBATE = 3145; // 75 and older

  // Medical credits
  const MEDICAL_CREDIT_MAIN = 364; // Main member
  const MEDICAL_CREDIT_FIRST_DEP = 364; // First dependent
  const MEDICAL_CREDIT_OTHER = 246; // Other dependents

  // Travel allowance rates
  const TRAVEL_RATE_PER_KM = 4.64; // 2025 rate for vehicles > 95kW

  const calculateTaxRefund = () => {
    const totalIncome = annualSalary + otherIncome;

    // Calculate deductions
    let totalDeductions = 0;

    // Retirement fund deduction (max 27.5% of remuneration, capped at R350,000)
    const maxRetirementDeduction = Math.min(
      totalIncome * 0.275,
      350000
    );
    const retirementDeduction = Math.min(retirementContributions, maxRetirementDeduction);
    totalDeductions += retirementDeduction;

    // Travel allowance deduction (if business km claimed)
    if (travelAllowance > 0 && businessKilometers > 0) {
      const businessTravel = businessKilometers * TRAVEL_RATE_PER_KM;
      const taxableTravel = Math.max(0, travelAllowance - businessTravel);
      // Deduction is the business portion of the travel allowance
      totalDeductions += Math.min(businessTravel, travelAllowance);
    }

    // Home office deduction (simplified - R25 per day worked from home, max 210 days)
    if (homeofficeDays > 0) {
      const homeofficeDeduction = Math.min(homeofficeDays, 210) * 25;
      totalDeductions += homeofficeDeduction;
    }

    // Calculate taxable income
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);

    // Calculate tax
    let taxBeforeRebates = 0;
    for (const bracket of TAX_BRACKETS) {
      if (taxableIncome > bracket.min) {
        if (taxableIncome <= bracket.max) {
          taxBeforeRebates = bracket.base + (taxableIncome - bracket.min) * bracket.rate;
          break;
        }
      }
    }

    // Apply rebates
    let taxRebates = PRIMARY_REBATE;
    if (age >= 65) taxRebates += SECONDARY_REBATE;
    if (age >= 75) taxRebates += TERTIARY_REBATE;

    // Medical aid credits
    let medicalCredits = 0;
    if (medicalAidMembers >= 1) {
      medicalCredits += MEDICAL_CREDIT_MAIN * 12;
    }
    if (medicalAidMembers >= 2) {
      medicalCredits += MEDICAL_CREDIT_FIRST_DEP * 12;
    }
    if (medicalAidMembers > 2) {
      medicalCredits += (medicalAidMembers - 2) * MEDICAL_CREDIT_OTHER * 12;
    }

    taxRebates += medicalCredits;

    const taxAfterRebates = Math.max(0, taxBeforeRebates - taxRebates);
    const refundOrOwing = taxPaid - taxAfterRebates;
    const isRefund = refundOrOwing > 0;
    const effectiveRate = (taxAfterRebates / totalIncome) * 100;

    setResult({
      totalIncome,
      totalDeductions,
      taxableIncome,
      taxBeforeRebates,
      taxRebates,
      taxAfterRebates,
      taxPaid,
      refundOrOwing: Math.abs(refundOrOwing),
      isRefund,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tax Refund Calculator</h2>
        <p className="text-gray-600 text-lg">Estimate your SARS tax refund for 2024/2025 tax year</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Salary (R)
            </label>
            <input
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Income (R) - Interest, dividends, rental, etc.
            </label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax Paid (PAYE) (R)
            </label>
            <input
              type="number"
              value={taxPaid}
              onChange={(e) => setTaxPaid(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">From your IRP5 certificate</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">65+ and 75+ get additional rebates</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Deductions</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retirement Fund Contributions (R/year)
                </label>
                <input
                  type="number"
                  value={retirementContributions}
                  onChange={(e) => setRetirementContributions(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Aid Contributions (R/year)
                </label>
                <input
                  type="number"
                  value={medicalAidContributions}
                  onChange={(e) => setMedicalAidContributions(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Aid Members (including yourself)
                </label>
                <select
                  value={medicalAidMembers}
                  onChange={(e) => setMedicalAidMembers(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
                >
                  <option value={0}>No medical aid</option>
                  <option value={1}>1 (just me)</option>
                  <option value={2}>2 (me + 1 dependent)</option>
                  <option value={3}>3 members</option>
                  <option value={4}>4 members</option>
                  <option value={5}>5+ members</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days Worked From Home
                </label>
                <input
                  type="number"
                  value={homeofficeDays}
                  onChange={(e) => setHomeofficeDays(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">R25/day deduction (max 210 days)</p>
              </div>
            </div>
          </div>

          <button
            onClick={calculateTaxRefund}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Tax Refund
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Assessment</h3>

            <div className={`rounded-xl p-6 border-2 ${result.isRefund
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'}`}>
              <p className="text-sm text-gray-600 mb-2">
                {result.isRefund ? 'Estimated Refund' : 'Amount Owing'}
              </p>
              <p className={`text-4xl font-bold ${result.isRefund ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(result.refundOrOwing)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {result.isRefund ? 'SARS owes you!' : 'You owe SARS'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Total Income</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(result.totalIncome)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Taxable Income</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(result.taxableIncome)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
              <p className="text-sm text-gray-600 mb-2">Tax Payable (After Rebates)</p>
              <p className="text-3xl font-bold text-orange-600">{formatCurrency(result.taxAfterRebates)}</p>
              <p className="text-sm text-gray-500 mt-2">Effective rate: {result.effectiveRate.toFixed(1)}%</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Tax Calculation:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Total deductions:</span>
                  <span className="font-mono text-green-600">-{formatCurrency(result.totalDeductions)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax before rebates:</span>
                  <span className="font-mono">{formatCurrency(result.taxBeforeRebates)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rebates & credits:</span>
                  <span className="font-mono text-green-600">-{formatCurrency(result.taxRebates)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax payable:</span>
                  <span className="font-mono">{formatCurrency(result.taxAfterRebates)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax paid (PAYE):</span>
                  <span className="font-mono">{formatCurrency(result.taxPaid)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>{result.isRefund ? 'Refund due:' : 'Amount owing:'}</span>
                  <span className={`font-mono ${result.isRefund ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(result.refundOrOwing)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Maximize Your Tax Refund</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">Retirement Contributions</h4>
            <p className="text-sm text-gray-700">
              Contribute up to 27.5% of salary (max R350,000/year) to pension, provident, or RA funds.
              Get immediate tax savings at your marginal rate.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Medical Expenses</h4>
            <p className="text-sm text-gray-700">
              Claim medical aid credits + additional medical expenses above threshold.
              Keep all receipts for out-of-pocket medical costs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Travel & Home Office</h4>
            <p className="text-sm text-gray-700">
              Log business kilometers if you have travel allowance.
              Claim home office deduction if you work from home regularly.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h4 className="font-semibold text-emerald-900 mb-2">Filing Deadline</h4>
          <p className="text-sm text-emerald-800">
            <strong>Non-provisional taxpayers:</strong> 21 October 2025 (eFiling), 23 October 2025 (auto assessment).<br/>
            <strong>Provisional taxpayers:</strong> 20 January 2026 (eFiling).
          </p>
        </div>
      </div>
    </div>
  );
}
