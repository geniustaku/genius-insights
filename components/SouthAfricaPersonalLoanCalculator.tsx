'use client';

import { useState } from 'react';

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  effectiveRate: number;
  initiationFee: number;
  monthlyServiceFee: number;
  totalFees: number;
}

export default function SouthAfricaPersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(24);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  const [result, setResult] = useState<LoanResult | null>(null);

  // NCR Fee Caps (National Credit Regulator)
  const INITIATION_FEE_RATE = 0.15; // 15% of loan amount
  const MAX_INITIATION_FEE = 1050 + (loanAmount * 0.10); // R1,050 + 10% capped
  const MONTHLY_SERVICE_FEE = 69; // Maximum R69/month
  const CREDIT_LIFE_RATE = 0.004; // ~0.4% of outstanding balance/month

  const calculateLoan = () => {
    // Calculate initiation fee (capped by NCR)
    let initiationFee = loanAmount * INITIATION_FEE_RATE;
    initiationFee = Math.min(initiationFee, MAX_INITIATION_FEE);

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;

    // Principal including initiation fee (added to loan)
    const principal = loanAmount + initiationFee;

    // Monthly payment using amortization formula
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);

    // Add service fee
    let totalMonthlyPayment = monthlyPayment + MONTHLY_SERVICE_FEE;

    // Add credit life insurance if selected
    if (includeInsurance) {
      const avgBalance = principal / 2; // Simplified average balance
      const monthlyInsurance = avgBalance * CREDIT_LIFE_RATE;
      totalMonthlyPayment += monthlyInsurance;
    }

    const totalRepayment = totalMonthlyPayment * loanTerm;
    const totalInterest = totalRepayment - loanAmount;
    const totalServiceFees = MONTHLY_SERVICE_FEE * loanTerm;

    // Calculate effective annual rate (including fees)
    const effectiveRate = ((totalRepayment / loanAmount - 1) / (loanTerm / 12)) * 100;

    setResult({
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      totalRepayment,
      effectiveRate,
      initiationFee,
      monthlyServiceFee: MONTHLY_SERVICE_FEE,
      totalFees: initiationFee + totalServiceFees,
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Loan Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate monthly repayments with NCR-compliant fees</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (R)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Typical range: R1,000 - R300,000</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Typical range: 15% - 28% (max 27.5% NCR cap)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (months)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
            >
              <option value={12}>12 months (1 year)</option>
              <option value={24}>24 months (2 years)</option>
              <option value={36}>36 months (3 years)</option>
              <option value={48}>48 months (4 years)</option>
              <option value={60}>60 months (5 years)</option>
              <option value={72}>72 months (6 years)</option>
              <option value={84}>84 months (7 years)</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="insurance"
              checked={includeInsurance}
              onChange={(e) => setIncludeInsurance(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="insurance" className="text-sm text-gray-700">
              Include Credit Life Insurance (~0.4%/month)
            </label>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">NCR Fee Caps</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Initiation fee: R1,050 + 10% of loan (capped)</li>
              <li>• Monthly service fee: Max R69/month</li>
              <li>• Interest rate cap: 27.5% per year</li>
              <li>• Credit life insurance: ~0.4%/month of balance</li>
            </ul>
          </div>

          <button
            onClick={calculateLoan}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Monthly Payment
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Breakdown</h3>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-2">Monthly Payment</p>
              <p className="text-4xl font-bold text-purple-600">{formatCurrency(result.monthlyPayment)}</p>
              <p className="text-sm text-gray-500 mt-2">For {loanTerm} months</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(loanAmount)}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                <p className="text-xs text-gray-600 mb-1">Initiation Fee</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(result.initiationFee)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <p className="text-sm text-gray-600 mb-2">Total Interest & Fees</p>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
              <p className="text-sm text-gray-500 mt-2">Over the loan term</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Repayment</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(result.totalRepayment)}</p>
              <p className="text-sm text-gray-500 mt-2">Capital + Interest + Fees</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Fee Breakdown:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Initiation Fee:</span>
                  <span className="font-mono">{formatCurrency(result.initiationFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Service Fee:</span>
                  <span className="font-mono">{formatCurrency(result.monthlyServiceFee)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Service Fees:</span>
                  <span className="font-mono">{formatCurrency(result.monthlyServiceFee * loanTerm)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total Fees:</span>
                  <span className="font-mono">{formatCurrency(result.totalFees)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">SA Bank Personal Loan Rates (2025)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Bank</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Interest Rate</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Max Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Max Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-gray-700">FNB</td>
                <td className="px-4 py-3 text-gray-700">15% - 27.5%</td>
                <td className="px-4 py-3 text-gray-700">R300,000</td>
                <td className="px-4 py-3 text-gray-700">72 months</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700">Standard Bank</td>
                <td className="px-4 py-3 text-gray-700">15% - 27.5%</td>
                <td className="px-4 py-3 text-gray-700">R300,000</td>
                <td className="px-4 py-3 text-gray-700">72 months</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700">ABSA</td>
                <td className="px-4 py-3 text-gray-700">15% - 27.5%</td>
                <td className="px-4 py-3 text-gray-700">R350,000</td>
                <td className="px-4 py-3 text-gray-700">84 months</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700">Nedbank</td>
                <td className="px-4 py-3 text-gray-700">15% - 27.5%</td>
                <td className="px-4 py-3 text-gray-700">R300,000</td>
                <td className="px-4 py-3 text-gray-700">72 months</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700">Capitec</td>
                <td className="px-4 py-3 text-gray-700">18% - 27.5%</td>
                <td className="px-4 py-3 text-gray-700">R250,000</td>
                <td className="px-4 py-3 text-gray-700">84 months</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700">African Bank</td>
                <td className="px-4 py-3 text-gray-700">21% - 27.5%</td>
                <td className="px-4 py-3 text-gray-700">R250,000</td>
                <td className="px-4 py-3 text-gray-700">72 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            <strong>Tip:</strong> Your interest rate depends on your credit score, income, and loan amount.
            Always compare quotes from multiple lenders before committing to a loan.
          </p>
        </div>
      </div>
    </div>
  );
}
