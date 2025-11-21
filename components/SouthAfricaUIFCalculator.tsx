'use client';

import { useState } from 'react';

interface UIFResult {
  monthlyContribution: number;
  employeeContribution: number;
  employerContribution: number;
  annualContribution: number;
  dailyBenefit: number;
  maxBenefitDays: number;
  estimatedPayout: number;
  creditDays: number;
}

export default function SouthAfricaUIFCalculator() {
  const [activeTab, setActiveTab] = useState<'contribution' | 'benefits'>('contribution');

  // Contribution Calculator
  const [monthlyIncome, setMonthlyIncome] = useState<number>(25000);

  // Benefits Calculator
  const [lastSalary, setLastSalary] = useState<number>(25000);
  const [yearsWorked, setYearsWorked] = useState<number>(5);
  const [reasonForClaim, setReasonForClaim] = useState<string>('unemployment');

  const [result, setResult] = useState<UIFResult | null>(null);

  // UIF Constants 2024/2025
  const UIF_RATE = 0.01; // 1% each from employee and employer
  const MAX_EARNINGS_CEILING = 17712; // Maximum monthly earnings for UIF calculation
  const IRR = 0.38; // Income Replacement Rate (38% for lowest earners, sliding scale)

  const calculateContribution = () => {
    // Cap at maximum earnings ceiling
    const cappedIncome = Math.min(monthlyIncome, MAX_EARNINGS_CEILING);

    const employeeContribution = cappedIncome * UIF_RATE;
    const employerContribution = cappedIncome * UIF_RATE;
    const monthlyContribution = employeeContribution + employerContribution;
    const annualContribution = monthlyContribution * 12;

    setResult({
      monthlyContribution,
      employeeContribution,
      employerContribution,
      annualContribution,
      dailyBenefit: 0,
      maxBenefitDays: 0,
      estimatedPayout: 0,
      creditDays: 0,
    });
  };

  const calculateBenefits = () => {
    const cappedSalary = Math.min(lastSalary, MAX_EARNINGS_CEILING);

    // Calculate daily wage
    const dailyWage = (cappedSalary * 12) / 365;

    // Calculate Income Replacement Rate (IRR) - sliding scale
    // Higher earners get lower %, lower earners get higher %
    let irr = 0.38; // Base rate
    if (cappedSalary <= 5000) {
      irr = 0.60; // 60% for lowest earners
    } else if (cappedSalary <= 10000) {
      irr = 0.50; // 50% for lower earners
    } else if (cappedSalary <= 15000) {
      irr = 0.45; // 45% for middle earners
    } else {
      irr = 0.38; // 38% for higher earners
    }

    // Daily benefit
    const dailyBenefit = dailyWage * irr;

    // Credit days: 1 day for every 4 days worked (max 365 days)
    const daysWorked = yearsWorked * 365;
    const creditDays = Math.min(Math.floor(daysWorked / 4), 365);

    // Benefit period based on reason
    let maxBenefitDays = creditDays;
    if (reasonForClaim === 'maternity') {
      maxBenefitDays = Math.min(creditDays, 121); // 17.32 weeks
    } else if (reasonForClaim === 'illness') {
      maxBenefitDays = Math.min(creditDays, 238);
    } else if (reasonForClaim === 'adoption') {
      maxBenefitDays = Math.min(creditDays, 121);
    }

    const estimatedPayout = dailyBenefit * maxBenefitDays;

    setResult({
      monthlyContribution: 0,
      employeeContribution: 0,
      employerContribution: 0,
      annualContribution: 0,
      dailyBenefit,
      maxBenefitDays,
      estimatedPayout,
      creditDays,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">UIF Calculator South Africa</h2>
        <p className="text-gray-600 text-lg">Calculate UIF contributions and unemployment benefits</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('contribution')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'contribution'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            UIF Contribution
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'benefits'
                ? 'bg-white text-green-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            UIF Benefits
          </button>
        </div>
      </div>

      {/* Contribution Tab */}
      {activeTab === 'contribution' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Gross Income (R)
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">UIF ceiling: R17,712/month (2024/2025)</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">UIF Contribution Rates</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Employee: 1% of gross salary</li>
                <li>• Employer: 1% of gross salary</li>
                <li>• Total: 2% of gross salary</li>
                <li>• Maximum ceiling: R17,712/month</li>
              </ul>
            </div>

            <button
              onClick={calculateContribution}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Calculate UIF Contribution
            </button>
          </div>

          {/* Results for Contribution */}
          {result && result.monthlyContribution > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Monthly UIF Breakdown</h3>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Your Contribution (1%)</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.employeeContribution)}</p>
                <p className="text-sm text-gray-500 mt-2">Deducted from your salary</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Employer Contribution (1%)</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(result.employerContribution)}</p>
                <p className="text-sm text-gray-500 mt-2">Paid by your employer</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Total Monthly UIF</p>
                <p className="text-4xl font-bold text-purple-600">{formatCurrency(result.monthlyContribution)}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Annual UIF Contribution</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(result.annualContribution)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Benefits Tab */}
      {activeTab === 'benefits' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Monthly Salary (R)
              </label>
              <input
                type="number"
                value={lastSalary}
                onChange={(e) => setLastSalary(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years Worked (Contributing to UIF)
              </label>
              <input
                type="number"
                step="0.5"
                value={yearsWorked}
                onChange={(e) => setYearsWorked(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Total time contributing to UIF in last 4 years</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Claim
              </label>
              <select
                value={reasonForClaim}
                onChange={(e) => setReasonForClaim(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              >
                <option value="unemployment">Unemployment / Retrenchment</option>
                <option value="maternity">Maternity Leave</option>
                <option value="illness">Illness (Extended)</option>
                <option value="adoption">Adoption Leave</option>
              </select>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Benefit Calculation</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 1 credit day for every 4 days worked</li>
                <li>• Maximum 365 credit days (12 months)</li>
                <li>• Sliding scale: 38-60% income replacement</li>
                <li>• Must be registered with UIF</li>
              </ul>
            </div>

            <button
              onClick={calculateBenefits}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Calculate UIF Benefits
            </button>
          </div>

          {/* Results for Benefits */}
          {result && result.dailyBenefit > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Estimated UIF Benefits</h3>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-2">Estimated Total Payout</p>
                <p className="text-4xl font-bold text-green-600">{formatCurrency(result.estimatedPayout)}</p>
                <p className="text-sm text-gray-500 mt-2">Over {result.maxBenefitDays} days</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Daily Benefit Amount</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.dailyBenefit)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Benefit Period</p>
                <p className="text-3xl font-bold text-purple-600">{result.maxBenefitDays} days</p>
                <p className="text-sm text-gray-500 mt-2">~{Math.round(result.maxBenefitDays / 30)} months</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Credit Days Accumulated</p>
                <p className="text-2xl font-bold text-orange-600">{result.creditDays} days</p>
                <p className="text-sm text-gray-500 mt-2">Based on {yearsWorked} years worked</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* How to Claim UIF */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">How to Claim UIF Benefits</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
              <div>
                <p className="font-semibold text-gray-900">Register on uFiling</p>
                <p className="text-sm text-gray-600">Create account at www.ufiling.co.za</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
              <div>
                <p className="font-semibold text-gray-900">Submit Application</p>
                <p className="text-sm text-gray-600">Upload ID, UI-19 form, bank statement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
              <div>
                <p className="font-semibold text-gray-900">Get UI-19 from Employer</p>
                <p className="text-sm text-gray-600">Employer must provide service record</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">4</div>
              <div>
                <p className="font-semibold text-gray-900">Visit Labour Centre</p>
                <p className="text-sm text-gray-600">May need to register as job seeker</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">5</div>
              <div>
                <p className="font-semibold text-gray-900">Wait for Approval</p>
                <p className="text-sm text-gray-600">Processing takes 2-6 weeks</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">6</div>
              <div>
                <p className="font-semibold text-gray-900">Receive Payment</p>
                <p className="text-sm text-gray-600">Paid monthly into bank account</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            <strong>Important:</strong> You must claim within 6 months of becoming unemployed. Keep copies of payslips and employment contracts. Contact the UIF call centre at 012 337 1680 for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
