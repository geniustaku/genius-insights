'use client';

import { useState } from 'react';

interface CreditCardResult {
  minimumPayment: number;
  monthsToPayOff: number;
  totalInterest: number;
  totalPayment: number;
  fixedMonthsToPayOff: number;
  fixedTotalInterest: number;
  fixedTotalPayment: number;
  interestSaved: number;
}

export default function SouthAfricaCreditCardCalculator() {
  const [balance, setBalance] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(21);
  const [minimumPercent, setMinimumPercent] = useState<number>(5);
  const [fixedPayment, setFixedPayment] = useState<number>(1500);

  const [result, setResult] = useState<CreditCardResult | null>(null);

  const calculatePayoff = () => {
    const monthlyRate = interestRate / 100 / 12;

    // Scenario 1: Minimum payments only
    let minBalance = balance;
    let minMonths = 0;
    let minTotalInterest = 0;
    let minTotalPayment = 0;
    const minPaymentFloor = 100; // Most banks have R100 minimum

    while (minBalance > 0 && minMonths < 600) { // Max 50 years safety
      const interest = minBalance * monthlyRate;
      const payment = Math.max(minBalance * (minimumPercent / 100), minPaymentFloor);
      const actualPayment = Math.min(payment, minBalance + interest);

      minTotalInterest += interest;
      minTotalPayment += actualPayment;
      minBalance = minBalance + interest - actualPayment;
      minMonths++;

      if (minBalance < 1) minBalance = 0;
    }

    // Scenario 2: Fixed monthly payment
    let fixedBalance = balance;
    let fixedMonths = 0;
    let fixedTotalInterest = 0;
    let fixedTotalPayment = 0;

    // Check if payment is sufficient
    const minRequiredPayment = balance * monthlyRate * 1.01; // Must exceed interest
    const effectivePayment = Math.max(fixedPayment, minRequiredPayment);

    while (fixedBalance > 0 && fixedMonths < 600) {
      const interest = fixedBalance * monthlyRate;
      const actualPayment = Math.min(effectivePayment, fixedBalance + interest);

      fixedTotalInterest += interest;
      fixedTotalPayment += actualPayment;
      fixedBalance = fixedBalance + interest - actualPayment;
      fixedMonths++;

      if (fixedBalance < 1) fixedBalance = 0;
    }

    const interestSaved = minTotalInterest - fixedTotalInterest;

    setResult({
      minimumPayment: Math.max(balance * (minimumPercent / 100), minPaymentFloor),
      monthsToPayOff: minMonths,
      totalInterest: minTotalInterest,
      totalPayment: minTotalPayment,
      fixedMonthsToPayOff: fixedMonths,
      fixedTotalInterest: fixedTotalInterest,
      fixedTotalPayment: fixedTotalPayment,
      interestSaved: interestSaved,
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

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years ${remainingMonths} months`;
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Credit Card Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate payoff time and compare payment strategies</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Balance (R)
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">SA credit card rates typically 15% - 27% per year</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Payment (% of balance)
            </label>
            <select
              value={minimumPercent}
              onChange={(e) => setMinimumPercent(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg text-black"
            >
              <option value={2.5}>2.5% (some banks)</option>
              <option value={3}>3%</option>
              <option value={5}>5% (most common)</option>
              <option value={10}>10%</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fixed Monthly Payment (R)
            </label>
            <input
              type="number"
              value={fixedPayment}
              onChange={(e) => setFixedPayment(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Compare against minimum payments</p>
          </div>

          <button
            onClick={calculatePayoff}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Payoff
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Comparison</h3>

            {/* Minimum Payments */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
              <p className="text-sm font-semibold text-red-700 mb-4">⚠️ Minimum Payments Only</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Initial payment:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(result.minimumPayment)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time to pay off:</span>
                  <span className="font-bold text-red-600">{formatMonths(result.monthsToPayOff)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total interest:</span>
                  <span className="font-bold text-red-600">{formatCurrency(result.totalInterest)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Total paid:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(result.totalPayment)}</span>
                </div>
              </div>
            </div>

            {/* Fixed Payments */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <p className="text-sm font-semibold text-green-700 mb-4">✅ Fixed Payment of {formatCurrency(fixedPayment)}</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly payment:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(fixedPayment)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time to pay off:</span>
                  <span className="font-bold text-green-600">{formatMonths(result.fixedMonthsToPayOff)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total interest:</span>
                  <span className="font-bold text-green-600">{formatCurrency(result.fixedTotalInterest)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Total paid:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(result.fixedTotalPayment)}</span>
                </div>
              </div>
            </div>

            {/* Savings */}
            {result.interestSaved > 0 && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-300">
                <p className="text-sm text-gray-600 mb-2">By Paying {formatCurrency(fixedPayment)}/month You Save</p>
                <p className="text-4xl font-bold text-emerald-600">{formatCurrency(result.interestSaved)}</p>
                <p className="text-sm text-gray-500 mt-2">
                  And pay off {formatMonths(result.monthsToPayOff - result.fixedMonthsToPayOff)} faster!
                </p>
              </div>
            )}

            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Why Minimum Payments Are Dangerous</h4>
              <p className="text-sm text-yellow-800">
                Paying only the minimum means you're mostly paying interest. Your balance barely decreases,
                and you end up paying {((result.totalPayment / balance) * 100 - 100).toFixed(0)}% more than you borrowed!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Credit Card Tips */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Credit Card Debt Strategies</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">Pay More Than Minimum</h4>
            <p className="text-sm text-gray-700">
              Even R200 extra per month can save you thousands in interest and years of payments.
              Set up a fixed debit order for more than the minimum.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Balance Transfer</h4>
            <p className="text-sm text-gray-700">
              Some banks offer 0% balance transfers for 6-12 months. Move your debt and pay it
              off interest-free. Watch for transfer fees (usually 2-3%).
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Debt Consolidation</h4>
            <p className="text-sm text-gray-700">
              Personal loan rates (15-20%) are often lower than credit cards (20-27%).
              Consolidate credit card debt into a fixed-term loan.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
          <h4 className="font-semibold text-rose-900 mb-2">NCR Protection</h4>
          <p className="text-sm text-rose-800">
            Credit card interest rates are capped by the NCR. If you're over-indebted, contact a
            registered debt counsellor for help. Debt review can protect you from legal action
            and reduce monthly payments.
          </p>
        </div>
      </div>
    </div>
  );
}
