'use client';

import { useState } from 'react';

interface CarFinanceResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  balloonAmount: number;
  initiationFee: number;
  totalWithBalloon: number;
  effectiveMonthly: number;
}

export default function SouthAfricaCarFinanceCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(350000);
  const [deposit, setDeposit] = useState<number>(35000);
  const [interestRate, setInterestRate] = useState<number>(11.75);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [balloonPercent, setBalloonPercent] = useState<number>(0);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  const [result, setResult] = useState<CarFinanceResult | null>(null);

  // Vehicle finance constants
  const INITIATION_FEE = 1207.50; // NCR capped vehicle finance initiation fee
  const MONTHLY_SERVICE_FEE = 69; // Maximum R69/month
  const INSURANCE_RATE = 0.003; // ~0.3% of vehicle value/month (comprehensive)

  const calculateFinance = () => {
    // Calculate loan amount
    const loanAmount = vehiclePrice - deposit + INITIATION_FEE;

    // Calculate balloon payment
    const balloonAmount = vehiclePrice * (balloonPercent / 100);

    // Amount to finance (excluding balloon)
    const financeAmount = loanAmount - balloonAmount;

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;

    // Monthly payment using amortization formula
    let monthlyPayment: number;
    if (balloonPercent > 0) {
      // With balloon: adjusted formula
      const pvBalloon = balloonAmount / Math.pow(1 + monthlyRate, loanTerm);
      const adjustedPrincipal = loanAmount - pvBalloon;
      monthlyPayment =
        (adjustedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);
    } else {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }

    // Add service fee
    let totalMonthlyPayment = monthlyPayment + MONTHLY_SERVICE_FEE;

    // Add insurance if selected
    if (includeInsurance) {
      const monthlyInsurance = vehiclePrice * INSURANCE_RATE;
      totalMonthlyPayment += monthlyInsurance;
    }

    const totalRepayment = totalMonthlyPayment * loanTerm;
    const totalWithBalloon = totalRepayment + balloonAmount;
    const totalInterest = totalWithBalloon - vehiclePrice;

    setResult({
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      totalRepayment,
      balloonAmount,
      initiationFee: INITIATION_FEE,
      totalWithBalloon,
      effectiveMonthly: monthlyPayment,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Car Finance Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate vehicle finance with balloon payments</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Price (R)
            </label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deposit (R)
            </label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Typically 10-20% of vehicle price</p>
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
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Current prime rate: 11.75% (typical range: prime to prime+5%)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (months)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
            >
              <option value={24}>24 months (2 years)</option>
              <option value={36}>36 months (3 years)</option>
              <option value={48}>48 months (4 years)</option>
              <option value={54}>54 months (4.5 years)</option>
              <option value={60}>60 months (5 years)</option>
              <option value={72}>72 months (6 years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balloon Payment (%)
            </label>
            <select
              value={balloonPercent}
              onChange={(e) => setBalloonPercent(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
            >
              <option value={0}>No balloon (0%)</option>
              <option value={10}>10% balloon</option>
              <option value={20}>20% balloon</option>
              <option value={30}>30% balloon</option>
              <option value={40}>40% balloon (max)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Lower monthly payments, but lump sum due at end</p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="insurance"
              checked={includeInsurance}
              onChange={(e) => setIncludeInsurance(e.target.checked)}
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="insurance" className="text-sm text-gray-700">
              Include comprehensive insurance estimate (~0.3%/month)
            </label>
          </div>

          <button
            onClick={calculateFinance}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Monthly Payment
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Finance Breakdown</h3>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-2">Monthly Payment</p>
              <p className="text-4xl font-bold text-orange-600">{formatCurrency(result.monthlyPayment)}</p>
              <p className="text-sm text-gray-500 mt-2">For {loanTerm} months</p>
            </div>

            {result.balloonAmount > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Balloon Payment (Due at End)</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.balloonAmount)}</p>
                <p className="text-sm text-gray-500 mt-2">{balloonPercent}% of vehicle price</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Vehicle Price</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(vehiclePrice)}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Deposit</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(deposit)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <p className="text-sm text-gray-600 mb-2">Total Interest</p>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Cost of Vehicle</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(result.totalWithBalloon)}</p>
              <p className="text-sm text-gray-500 mt-2">All payments + balloon + deposit</p>
            </div>

            {result.balloonAmount > 0 && (
              <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Balloon Payment Options</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Pay lump sum at end of term</li>
                  <li>• Refinance balloon with new loan</li>
                  <li>• Trade in vehicle against balloon</li>
                  <li>• Return vehicle to dealer (if agreed)</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Vehicle Finance Tips</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">Balloon Payments</h4>
            <p className="text-sm text-gray-700">
              Lower monthly payments but you owe a lump sum at the end. Great for cash flow, but you pay more interest overall.
              Maximum 40% balloon allowed in SA.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Deposit Benefits</h4>
            <p className="text-sm text-gray-700">
              Larger deposit = lower monthly payments and less interest. Banks may offer better rates with 20%+ deposit.
              Also reduces risk of being "upside down" on your loan.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">New vs Used</h4>
            <p className="text-sm text-gray-700">
              New cars: Lower interest rates (prime to prime+2%). Used cars: Higher rates (prime+3% to prime+5%).
              New cars depreciate ~20% in year 1.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            <strong>Remember:</strong> Vehicle finance is secured against the car. If you miss payments, the bank can repossess.
            Budget for insurance, maintenance, fuel, and license fees on top of your monthly payment.
          </p>
        </div>
      </div>
    </div>
  );
}
