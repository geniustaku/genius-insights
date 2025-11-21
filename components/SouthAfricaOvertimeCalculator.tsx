'use client';

import { useState } from 'react';

interface OvertimeResult {
  normalHourlyRate: number;
  overtimeRate: number;
  sundayRate: number;
  publicHolidayRate: number;
  totalOvertimePay: number;
  totalSundayPay: number;
  totalPublicHolidayPay: number;
  grandTotal: number;
}

export default function SouthAfricaOvertimeCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(15000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(45);
  const [overtimeHours, setOvertimeHours] = useState<number>(10);
  const [sundayHours, setSundayHours] = useState<number>(0);
  const [publicHolidayHours, setPublicHolidayHours] = useState<number>(0);

  const [result, setResult] = useState<OvertimeResult | null>(null);

  // BCEA overtime rates
  const OVERTIME_MULTIPLIER = 1.5; // 1.5x normal rate
  const SUNDAY_MULTIPLIER = 2.0; // 2x normal rate
  const PUBLIC_HOLIDAY_MULTIPLIER = 2.0; // 2x normal rate

  const calculateOvertime = () => {
    // Calculate hourly rate
    // Monthly hours = weekly hours × 4.33 weeks
    const monthlyHours = hoursPerWeek * 4.33;
    const normalHourlyRate = monthlySalary / monthlyHours;

    // Calculate overtime rates
    const overtimeRate = normalHourlyRate * OVERTIME_MULTIPLIER;
    const sundayRate = normalHourlyRate * SUNDAY_MULTIPLIER;
    const publicHolidayRate = normalHourlyRate * PUBLIC_HOLIDAY_MULTIPLIER;

    // Calculate total pay
    const totalOvertimePay = overtimeHours * overtimeRate;
    const totalSundayPay = sundayHours * sundayRate;
    const totalPublicHolidayPay = publicHolidayHours * publicHolidayRate;
    const grandTotal = totalOvertimePay + totalSundayPay + totalPublicHolidayPay;

    setResult({
      normalHourlyRate,
      overtimeRate,
      sundayRate,
      publicHolidayRate,
      totalOvertimePay,
      totalSundayPay,
      totalPublicHolidayPay,
      grandTotal,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Overtime Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate overtime pay according to BCEA regulations</p>
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
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Normal Hours Per Week
            </label>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg text-black"
            >
              <option value={40}>40 hours (standard)</option>
              <option value={45}>45 hours (BCEA maximum)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">BCEA maximum is 45 hours/week for most workers</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overtime Hours (Weekdays)
            </label>
            <input
              type="number"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Paid at 1.5x normal rate (BCEA requirement)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sunday Hours Worked
            </label>
            <input
              type="number"
              value={sundayHours}
              onChange={(e) => setSundayHours(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Paid at 2x normal rate (or 1.5x if normally work Sundays)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Holiday Hours Worked
            </label>
            <input
              type="number"
              value={publicHolidayHours}
              onChange={(e) => setPublicHolidayHours(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Paid at 2x normal rate</p>
          </div>

          <button
            onClick={calculateOvertime}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Overtime Pay
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Overtime Breakdown</h3>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
              <p className="text-sm text-gray-600 mb-2">Total Extra Pay</p>
              <p className="text-4xl font-bold text-amber-600">{formatCurrency(result.grandTotal)}</p>
              <p className="text-sm text-gray-500 mt-2">For this pay period</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Normal Hourly Rate</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(result.normalHourlyRate)}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Overtime Rate (1.5x)</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(result.overtimeRate)}</p>
              </div>
            </div>

            {overtimeHours > 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Weekday Overtime Pay</p>
                <p className="text-3xl font-bold text-orange-600">{formatCurrency(result.totalOvertimePay)}</p>
                <p className="text-sm text-gray-500 mt-2">{overtimeHours} hours × {formatCurrency(result.overtimeRate)}</p>
              </div>
            )}

            {sundayHours > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Sunday Work Pay</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.totalSundayPay)}</p>
                <p className="text-sm text-gray-500 mt-2">{sundayHours} hours × {formatCurrency(result.sundayRate)} (2x)</p>
              </div>
            )}

            {publicHolidayHours > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Public Holiday Pay</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(result.totalPublicHolidayPay)}</p>
                <p className="text-sm text-gray-500 mt-2">{publicHolidayHours} hours × {formatCurrency(result.publicHolidayRate)} (2x)</p>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Rate Summary:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Normal hourly:</span>
                  <span className="font-mono">{formatCurrency(result.normalHourlyRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime (1.5x):</span>
                  <span className="font-mono">{formatCurrency(result.overtimeRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday (2x):</span>
                  <span className="font-mono">{formatCurrency(result.sundayRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Public Holiday (2x):</span>
                  <span className="font-mono">{formatCurrency(result.publicHolidayRate)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BCEA Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">BCEA Overtime Rules</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">Maximum Hours</h4>
            <p className="text-sm text-gray-700">
              Maximum 45 ordinary hours per week. Maximum 10 hours overtime per week.
              Agreement must be in writing for overtime.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Overtime Rate</h4>
            <p className="text-sm text-gray-700">
              Minimum 1.5x normal rate for weekday overtime. Can negotiate higher rates
              in employment contract or bargaining council agreement.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Sunday & Holidays</h4>
            <p className="text-sm text-gray-700">
              Sunday work: 2x rate (or 1.5x if you normally work Sundays).
              Public holidays: 2x rate. Additional day off may be granted.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            <strong>Note:</strong> BCEA overtime rules don't apply to employees earning above R254,371.67 per year (2025 threshold),
            senior managers, sales staff working mainly outside employer's premises, or those covered by sectoral determinations.
          </p>
        </div>
      </div>
    </div>
  );
}
