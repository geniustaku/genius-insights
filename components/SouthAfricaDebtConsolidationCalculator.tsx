'use client';

import { useState } from 'react';

interface Debt {
  id: number;
  name: string;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
}

export default function SouthAfricaDebtConsolidationCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: 'Credit Card 1', balance: 25000, interestRate: 22, monthlyPayment: 1200 },
    { id: 2, name: 'Personal Loan', balance: 80000, interestRate: 19.5, monthlyPayment: 2500 },
    { id: 3, name: 'Store Account', balance: 15000, interestRate: 24, monthlyPayment: 800 }
  ]);

  const [consolidationRate, setConsolidationRate] = useState<number>(15.5);
  const [consolidationTerm, setConsolidationTerm] = useState<number>(60); // months
  const [initiationFee, setInitiationFee] = useState<number>(1207.50);
  const [monthlyAdminFee, setMonthlyAdminFee] = useState<number>(69);

  const addDebt = () => {
    const newId = debts.length > 0 ? Math.max(...debts.map(d => d.id)) + 1 : 1;
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: 10000,
      interestRate: 20,
      monthlyPayment: 500
    }]);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const calculate = () => {
    // Current debt situation
    const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
    const totalMonthlyPayment = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);

    // Calculate weighted average interest rate
    const weightedRate = debts.reduce((sum, d) => sum + (d.balance * d.interestRate), 0) / totalDebt;

    // Calculate total interest paid on current debts (estimate based on current payments)
    let currentTotalInterest = 0;
    let currentTotalMonths = 0;

    debts.forEach(debt => {
      const monthlyRate = debt.interestRate / 100 / 12;
      const balance = debt.balance;
      const payment = debt.monthlyPayment;

      if (payment <= balance * monthlyRate) {
        // Payment doesn't cover interest - debt grows indefinitely
        currentTotalMonths = 999; // Flag as problematic
      } else {
        // Calculate months to pay off
        const months = Math.log(payment / (payment - balance * monthlyRate)) / Math.log(1 + monthlyRate);
        const totalPaid = payment * months;
        const interest = totalPaid - balance;

        currentTotalInterest += interest;
        currentTotalMonths = Math.max(currentTotalMonths, months);
      }
    });

    const currentTotalCost = totalDebt + currentTotalInterest;

    // Consolidation loan calculation
    const consolidationAmount = totalDebt + initiationFee;
    const monthlyRate = consolidationRate / 100 / 12;

    const consolidationMonthlyPayment = consolidationAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, consolidationTerm)) /
      (Math.pow(1 + monthlyRate, consolidationTerm) - 1);

    const consolidationMonthlyWithFees = consolidationMonthlyPayment + monthlyAdminFee;

    const consolidationTotalPaid = (consolidationMonthlyPayment * consolidationTerm) +
      (monthlyAdminFee * consolidationTerm) + initiationFee;

    const consolidationTotalInterest = consolidationTotalPaid - totalDebt;

    // Savings calculation
    const monthlySavings = totalMonthlyPayment - consolidationMonthlyWithFees;
    const totalSavings = currentTotalCost - consolidationTotalPaid;
    const timeSaved = currentTotalMonths - consolidationTerm;

    // Interest rate savings
    const rateSavings = weightedRate - consolidationRate;

    // Affordability check (30% rule - but this is just payment comparison)
    const paymentReduction = ((totalMonthlyPayment - consolidationMonthlyWithFees) / totalMonthlyPayment) * 100;

    return {
      // Current situation
      totalDebt,
      currentMonthlyPayment: totalMonthlyPayment,
      currentWeightedRate: weightedRate,
      currentTotalInterest,
      currentTotalCost,
      currentMonths: Math.ceil(currentTotalMonths),

      // Consolidation loan
      consolidationAmount,
      consolidationRate,
      consolidationMonthlyPayment: consolidationMonthlyWithFees,
      consolidationTotalPaid,
      consolidationTotalInterest,
      consolidationTerm,

      // Savings
      monthlySavings,
      totalSavings,
      timeSaved: Math.ceil(timeSaved),
      rateSavings,
      paymentReduction,

      // Recommendation
      isWorthwhile: totalSavings > 0 && monthlySavings > 0,
      debts: debts.length
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Debt Consolidation Calculator</h2>
        <p className="text-gray-600 text-lg">Compare your current debts vs. a single consolidation loan</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Your Current Debts</h3>
              <button
                onClick={addDebt}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium"
              >
                + Add Debt
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {debts.map((debt, index) => (
                <div key={debt.id} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                      className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none flex-grow mr-2"
                      placeholder="Debt name"
                    />
                    {debts.length > 1 && (
                      <button
                        onClick={() => removeDebt(debt.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Balance (R)</label>
                      <input
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={debt.interestRate}
                        onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value))}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Payment (R)</label>
                      <input
                        type="number"
                        value={debt.monthlyPayment}
                        onChange={(e) => updateDebt(debt.id, 'monthlyPayment', Number(e.target.value))}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Consolidation Loan Terms</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={consolidationRate}
                  onChange={(e) => setConsolidationRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: 14-18% for good credit</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (months)
                </label>
                <select
                  value={consolidationTerm}
                  onChange={(e) => setConsolidationTerm(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black bg-white"
                >
                  <option value="24">24 months (2 years)</option>
                  <option value="36">36 months (3 years)</option>
                  <option value="48">48 months (4 years)</option>
                  <option value="60">60 months (5 years)</option>
                  <option value="72">72 months (6 years)</option>
                  <option value="84">84 months (7 years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initiation Fee (R)
                </label>
                <input
                  type="number"
                  value={initiationFee}
                  onChange={(e) => setInitiationFee(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Max R1,207.50 or 15% of loan (whichever is higher)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Admin Fee (R)
                </label>
                <input
                  type="number"
                  value={monthlyAdminFee}
                  onChange={(e) => setMonthlyAdminFee(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: R50-R69 per month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Current Situation */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Current Debt Situation</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Total Debt:</span>
                <span className="font-bold text-red-600">R{results.totalDebt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Monthly Payment:</span>
                <span className="font-semibold text-black">R{results.currentMonthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Weighted Interest Rate:</span>
                <span className="font-semibold text-black">{results.currentWeightedRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Total Interest (est.):</span>
                <span className="font-semibold text-red-600">R{results.currentTotalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-red-200">
                <span className="text-gray-700">Total Cost:</span>
                <span className="font-bold text-red-700 text-lg">R{results.currentTotalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Time to Pay Off:</span>
                <span className="font-semibold text-black">
                  {results.currentMonths > 500 ? '∞ (never)' : `${results.currentMonths} months`}
                </span>
              </div>
            </div>
          </div>

          {/* Consolidation Loan */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💳 Consolidation Loan</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Loan Amount:</span>
                <span className="font-bold text-blue-600">R{results.consolidationAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Interest Rate:</span>
                <span className="font-semibold text-black">{results.consolidationRate}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Monthly Payment:</span>
                <span className="font-semibold text-black">R{results.consolidationMonthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Total Interest:</span>
                <span className="font-semibold text-blue-600">R{results.consolidationTotalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Total Cost:</span>
                <span className="font-bold text-blue-700 text-lg">R{results.consolidationTotalPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Loan Term:</span>
                <span className="font-semibold text-black">{results.consolidationTerm} months</span>
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className={`rounded-2xl p-6 border ${
            results.isWorthwhile
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
              : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
          }`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {results.isWorthwhile ? '✓ Potential Savings' : '⚠️ Analysis'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Monthly Savings:</span>
                <span className={`font-bold text-lg ${results.monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R{Math.abs(results.monthlySavings).toLocaleString()} {results.monthlySavings > 0 ? 'saved' : 'more'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Total Savings:</span>
                <span className={`font-bold text-lg ${results.totalSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R{Math.abs(results.totalSavings).toLocaleString()} {results.totalSavings > 0 ? 'saved' : 'more cost'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Payment Reduction:</span>
                <span className={`font-semibold ${results.paymentReduction > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(results.paymentReduction).toFixed(1)}% {results.paymentReduction > 0 ? 'lower' : 'higher'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Interest Rate Savings:</span>
                <span className={`font-semibold ${results.rateSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(results.rateSavings).toFixed(2)}% {results.rateSavings > 0 ? 'lower' : 'higher'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Time Saved:</span>
                <span className={`font-semibold ${results.timeSaved > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(results.timeSaved)} months {results.timeSaved > 0 ? 'faster' : 'longer'}
                </span>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`p-6 rounded-xl ${
            results.isWorthwhile
              ? 'bg-green-100 border border-green-300'
              : 'bg-yellow-100 border border-yellow-300'
          }`}>
            <h4 className={`font-semibold mb-2 ${results.isWorthwhile ? 'text-green-900' : 'text-yellow-900'}`}>
              {results.isWorthwhile ? '✓ Consolidation Recommended' : '⚠️ Consolidation May Not Help'}
            </h4>
            <p className={`text-sm leading-relaxed ${results.isWorthwhile ? 'text-green-800' : 'text-yellow-800'}`}>
              {results.isWorthwhile
                ? `Consolidating your ${results.debts} debts into one loan will save you R${results.monthlySavings.toLocaleString()}/month and R${results.totalSavings.toLocaleString()} total over the loan term. You'll also reduce your interest rate by ${results.rateSavings.toFixed(2)}% and pay off debt ${Math.abs(results.timeSaved)} months faster.`
                : `Based on current terms, consolidation would ${results.monthlySavings < 0 ? 'increase your monthly payment' : 'not provide significant savings'}. Consider negotiating a lower interest rate (target: ${(results.currentWeightedRate - 3).toFixed(1)}% or less) or shorter term before consolidating.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
