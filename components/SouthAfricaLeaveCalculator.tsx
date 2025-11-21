'use client';

import { useState } from 'react';

interface LeaveResult {
  annualLeave: number;
  sickLeave: number;
  familyResponsibility: number;
  maternityLeave: number;
  paternityLeave: number;
  accruedLeave: number;
  leaveValue: number;
}

export default function SouthAfricaLeaveCalculator() {
  const [startDate, setStartDate] = useState<string>('2024-01-01');
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5);
  const [monthlySalary, setMonthlySalary] = useState<number>(25000);
  const [leaveTaken, setLeaveTaken] = useState<number>(0);
  const [cycleType, setCycleType] = useState<string>('annual');

  const [result, setResult] = useState<LeaveResult | null>(null);

  // BCEA Leave Entitlements
  const ANNUAL_LEAVE_DAYS = 21; // For 5-day week (15 working days)
  const SICK_LEAVE_DAYS = 30; // Over 3-year cycle
  const FAMILY_RESPONSIBILITY_DAYS = 3; // Per year
  const MATERNITY_LEAVE_DAYS = 121; // 4 consecutive months
  const PATERNITY_LEAVE_DAYS = 10; // Since 2020

  const calculateLeave = () => {
    const start = new Date(startDate);
    const current = new Date(currentDate);

    // Calculate months worked
    const monthsWorked = (current.getFullYear() - start.getFullYear()) * 12 +
      (current.getMonth() - start.getMonth());

    // Annual leave entitlement based on work pattern
    // BCEA: 21 consecutive days or 1 day for every 17 days worked
    let annualLeaveEntitlement: number;
    if (workDaysPerWeek === 5) {
      annualLeaveEntitlement = 15; // 15 working days = 21 consecutive days
    } else if (workDaysPerWeek === 6) {
      annualLeaveEntitlement = 18; // 18 working days
    } else {
      annualLeaveEntitlement = Math.ceil(workDaysPerWeek * 52 / 17); // 1 day per 17 days worked
    }

    // Calculate accrued leave based on cycle
    let accruedLeave: number;
    if (cycleType === 'annual') {
      // Simple annual accrual
      accruedLeave = (annualLeaveEntitlement / 12) * Math.min(monthsWorked, 12);
    } else {
      // Monthly accrual (pro-rata)
      accruedLeave = (annualLeaveEntitlement / 12) * monthsWorked;
    }

    // Subtract leave taken
    const remainingLeave = Math.max(0, accruedLeave - leaveTaken);

    // Calculate leave value
    const dailyRate = (monthlySalary * 12) / (workDaysPerWeek * 52);
    const leaveValue = remainingLeave * dailyRate;

    // Sick leave (30 days over 3-year cycle)
    const yearsWorked = monthsWorked / 12;
    let sickLeave: number;
    if (yearsWorked < 0.5) {
      // First 6 months: 1 day per 26 days worked
      sickLeave = Math.floor(monthsWorked * workDaysPerWeek * 4.33 / 26);
    } else {
      sickLeave = 30; // Full entitlement after 6 months
    }

    setResult({
      annualLeave: annualLeaveEntitlement,
      sickLeave,
      familyResponsibility: FAMILY_RESPONSIBILITY_DAYS,
      maternityLeave: MATERNITY_LEAVE_DAYS,
      paternityLeave: PATERNITY_LEAVE_DAYS,
      accruedLeave: remainingLeave,
      leaveValue,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Leave Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate your BCEA leave entitlements and accrued leave</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculate As Of
              </label>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Days Per Week
            </label>
            <select
              value={workDaysPerWeek}
              onChange={(e) => setWorkDaysPerWeek(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg text-black"
            >
              <option value={5}>5 days (Mon-Fri)</option>
              <option value={6}>6 days (Mon-Sat)</option>
              <option value={4}>4 days</option>
              <option value={3}>3 days (part-time)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Salary (R)
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Used to calculate leave payout value</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Cycle Type
            </label>
            <select
              value={cycleType}
              onChange={(e) => setCycleType(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg text-black"
            >
              <option value="annual">Annual (resets each year)</option>
              <option value="accrual">Continuous accrual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Leave Already Taken (days)
            </label>
            <input
              type="number"
              value={leaveTaken}
              onChange={(e) => setLeaveTaken(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <button
            onClick={calculateLeave}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Leave
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave Entitlements</h3>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 border-2 border-sky-200">
              <p className="text-sm text-gray-600 mb-2">Accrued Annual Leave</p>
              <p className="text-4xl font-bold text-sky-600">{result.accruedLeave.toFixed(1)} days</p>
              <p className="text-sm text-gray-500 mt-2">Value: {formatCurrency(result.leaveValue)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Annual Leave</p>
                <p className="text-xl font-bold text-green-600">{result.annualLeave} days</p>
                <p className="text-xs text-gray-500">Per year</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                <p className="text-xs text-gray-600 mb-1">Sick Leave</p>
                <p className="text-xl font-bold text-orange-600">{result.sickLeave} days</p>
                <p className="text-xs text-gray-500">Per 3-year cycle</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Family Responsibility</p>
                <p className="text-xl font-bold text-purple-600">{result.familyResponsibility} days</p>
                <p className="text-xs text-gray-500">Per year</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                <p className="text-xs text-gray-600 mb-1">Maternity Leave</p>
                <p className="text-xl font-bold text-pink-600">{result.maternityLeave} days</p>
                <p className="text-xs text-gray-500">4 months</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Paternity Leave</p>
              <p className="text-xl font-bold text-blue-600">{result.paternityLeave} days</p>
              <p className="text-xs text-gray-500">Since 2020 amendment</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Leave Summary:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Annual entitlement:</span>
                  <span className="font-mono">{result.annualLeave} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Leave taken:</span>
                  <span className="font-mono">-{leaveTaken} days</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Available leave:</span>
                  <span className="font-mono text-sky-600">{result.accruedLeave.toFixed(1)} days</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leave Types Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">BCEA Leave Types</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Annual Leave</h4>
            <p className="text-sm text-gray-700">
              21 consecutive days (15 working days for 5-day week) per annual leave cycle.
              Must be granted within 6 months of end of cycle. Can accumulate up to 1 year.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
            <h4 className="font-semibold text-gray-900 mb-3">Sick Leave</h4>
            <p className="text-sm text-gray-700">
              30 days over 3-year cycle (first 6 months: 1 day per 26 days worked).
              Medical certificate required for 2+ consecutive days or repeated absences.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Family Responsibility</h4>
            <p className="text-sm text-gray-700">
              3 days per year for birth of child, child illness, or death of close family member.
              Only for employees working 4+ days per week for 4+ months.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
          <h4 className="font-semibold text-sky-900 mb-2">Leave Payout on Resignation</h4>
          <p className="text-sm text-sky-800">
            When leaving employment, accrued but unused annual leave must be paid out at your
            daily rate of pay. Sick leave is not paid out unless your contract specifies otherwise.
          </p>
        </div>
      </div>
    </div>
  );
}
