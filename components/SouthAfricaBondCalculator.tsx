'use client';

import { useState } from 'react';

interface BondResult {
  monthlyRepayment: number;
  totalInterest: number;
  totalRepayment: number;
  affordableAmount: number;
  affordableProperty: number;
  depositNeeded: number;
}

export default function SouthAfricaBondCalculator() {
  const [activeTab, setActiveTab] = useState<'repayment' | 'affordability'>('repayment');

  // Repayment Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(2500000);
  const [deposit, setDeposit] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(11.75);
  const [loanTerm, setLoanTerm] = useState<number>(20);

  // Affordability Calculator State
  const [grossIncome, setGrossIncome] = useState<number>(50000);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(5000);
  const [depositAmount, setDepositAmount] = useState<number>(250000);
  const [affordabilityRate, setAffordabilityRate] = useState<number>(11.75);
  const [affordabilityTerm, setAffordabilityTerm] = useState<number>(20);

  const [result, setResult] = useState<BondResult | null>(null);

  const calculateRepayment = () => {
    if (deposit >= propertyPrice) {
      alert('Deposit must be less than property price');
      return;
    }

    const bondAmount = propertyPrice - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyRepayment =
      (bondAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalRepayment = monthlyRepayment * numberOfPayments;
    const totalInterest = totalRepayment - bondAmount;

    setResult({
      monthlyRepayment,
      totalInterest,
      totalRepayment,
      affordableAmount: 0,
      affordableProperty: 0,
      depositNeeded: 0,
    });
  };

  const calculateAffordability = () => {
    const maxBondRepayment = grossIncome * 0.30 - monthlyDebts;

    if (maxBondRepayment <= 0) {
      alert('Your current debts are too high. You may not qualify for a bond.');
      return;
    }

    const monthlyRate = affordabilityRate / 100 / 12;
    const numberOfPayments = affordabilityTerm * 12;

    const affordableBondAmount =
      (maxBondRepayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));

    const affordablePropertyPrice = affordableBondAmount + depositAmount;
    const minDeposit = affordablePropertyPrice * 0.10;
    const totalRepayment = maxBondRepayment * numberOfPayments;
    const totalInterest = totalRepayment - affordableBondAmount;

    setResult({
      monthlyRepayment: maxBondRepayment,
      totalInterest,
      totalRepayment,
      affordableAmount: affordableBondAmount,
      affordableProperty: affordablePropertyPrice,
      depositNeeded: minDeposit,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Loan & Bond Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate bond affordability and monthly repayments</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('repayment')}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'repayment'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bond Repayment
          </button>
          <button
            onClick={() => setActiveTab('affordability')}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'affordability'
                ? 'bg-white text-green-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Affordability
          </button>
        </div>
      </div>

      {/* Repayment Tab */}
      {activeTab === 'repayment' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Price (R)
              </label>
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Amount (R)
              </label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Typically 10-20% of property price</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per year)
              </label>
              <input
                type="number"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Current prime rate: 11.75% (Dec 2024)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (years)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Standard: 20 years</p>
            </div>

            <button
              onClick={calculateRepayment}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Calculate Monthly Repayment
            </button>
          </div>

          {/* Results for Repayment */}
          {result && result.affordableAmount === 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Results</h3>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Monthly Repayment</p>
                <p className="text-4xl font-bold text-blue-600">{formatCurrency(result.monthlyRepayment)}</p>
                <p className="text-sm text-gray-500 mt-2">Per month for {loanTerm} years</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Total Interest</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
                <p className="text-sm text-gray-500 mt-2">Interest over {loanTerm} years</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Total Repayment</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.totalRepayment)}</p>
                <p className="text-sm text-gray-500 mt-2">Bond + Interest</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Affordability Tab */}
      {activeTab === 'affordability' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Monthly Income (R)
              </label>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Total monthly income before tax</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Debt Repayments (R)
              </label>
              <input
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Car loans, personal loans, credit cards</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Deposit (R)
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Cash available for deposit</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per year)
              </label>
              <input
                type="number"
                step="0.25"
                value={affordabilityRate}
                onChange={(e) => setAffordabilityRate(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (years)
              </label>
              <input
                type="number"
                value={affordabilityTerm}
                onChange={(e) => setAffordabilityTerm(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
              />
            </div>

            <button
              onClick={calculateAffordability}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Calculate Affordability
            </button>
          </div>

          {/* Results for Affordability */}
          {result && result.affordableAmount > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">You Can Afford</h3>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-2">Maximum Property Price</p>
                <p className="text-4xl font-bold text-green-600">{formatCurrency(result.affordableProperty)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Bond Amount</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.affordableAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Monthly Repayment</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.monthlyRepayment)}</p>
                <p className="text-sm text-gray-500 mt-2">30% of your income</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Deposit Needed (10%)</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(result.depositNeeded)}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
