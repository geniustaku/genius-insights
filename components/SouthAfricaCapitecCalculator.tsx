'use client';

import { useState } from 'react';

export default function SouthAfricaCapitecCalculator() {
  const [productType, setProductType] = useState<string>('global-one');
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [loanTerm, setLoanTerm] = useState<number>(48);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(15000);
  const [savingsAmount, setSavingsAmount] = useState<number>(50000);
  const [savingsTerm, setSavingsTerm] = useState<number>(12);

  // Capitec 2025 Interest Rates (approximate)
  const CAPITEC_RATES = {
    'global-one': { rate: 8.0, fee: 59 }, // GlobalOne transaction account
    'personal-loan': { rate: 19.5, initiation: 1207.50, admin: 69 },
    'credit-facility': { rate: 21.0, admin: 69 },
    'fixed-deposit': { rate: 9.25, min: 10000 },
    'savings-account': { rate: 5.85, min: 0 },
    'funeral-plan': { rate: 0, premium: 89 },
    'access-home-loan': { rate: 11.75, initiation: 6037.50 }
  };

  const calculateLoan = () => {
    const product = productType as keyof typeof CAPITEC_RATES;
    const rateData = CAPITEC_RATES[product];

    if (productType === 'personal-loan' || productType === 'credit-facility' || productType === 'access-home-loan') {
      const monthlyRate = rateData.rate / 100 / 12;
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);

      const totalPayments = monthlyPayment * loanTerm;
      const totalInterest = totalPayments - loanAmount;

      // Add fees
      const initiationFee = 'initiation' in rateData ? rateData.initiation : 0;
      const monthlyAdmin = 'admin' in rateData ? rateData.admin : 0;
      const totalAdmin = monthlyAdmin * loanTerm;
      const totalCost = totalPayments + initiationFee + totalAdmin;

      const affordability = (monthlyPayment / monthlyIncome) * 100;
      const affordable = affordability <= 30; // 30% affordability rule

      return {
        type: 'loan',
        monthlyPayment,
        totalPayments,
        totalInterest,
        initiationFee,
        monthlyAdmin,
        totalAdmin,
        totalCost,
        affordability,
        affordable,
        rate: rateData.rate
      };
    } else if (productType === 'fixed-deposit' || productType === 'savings-account') {
      const annualRate = rateData.rate / 100;
      const compoundFrequency = 12;
      const futureValue = savingsAmount * Math.pow(1 + annualRate / compoundFrequency, compoundFrequency * savingsTerm);
      const totalInterest = futureValue - savingsAmount;
      const monthlyInterest = totalInterest / savingsTerm;

      return {
        type: 'savings',
        initialAmount: savingsAmount,
        futureValue,
        totalInterest,
        monthlyInterest,
        rate: rateData.rate,
        term: savingsTerm
      };
    } else if (productType === 'global-one') {
      const monthlyFee = 'fee' in rateData ? rateData.fee : 0;
      const annualFee = monthlyFee * 12;
      const interestRate = rateData.rate;

      return {
        type: 'account',
        monthlyFee,
        annualFee,
        interestRate,
        features: [
          'Free payments at Capitec ATMs',
          'Free digital banking',
          'Free debit card',
          'Interest on positive balance',
          'Instant money transfers'
        ]
      };
    }

    return { type: 'unknown' };
  };

  const results = calculateLoan();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Capitec Bank Calculator 2025</h2>
        <p className="text-gray-600 text-lg">Calculate loans, savings & bank fees with South Africa's largest bank</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capitec Product
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="global-one">GlobalOne Bank Account</option>
              <option value="personal-loan">Personal Loan</option>
              <option value="credit-facility">Credit Facility</option>
              <option value="access-home-loan">Access Home Loan</option>
              <option value="fixed-deposit">Fixed Deposit</option>
              <option value="savings-account">Savings Account</option>
            </select>
          </div>

          {(productType === 'personal-loan' || productType === 'credit-facility' || productType === 'access-home-loan') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (R)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {productType === 'personal-loan' && 'Personal loans: R1,000 - R250,000'}
                  {productType === 'credit-facility' && 'Credit facility: R1,000 - R250,000'}
                  {productType === 'access-home-loan' && 'Home loans: R100,000 - R5,000,000'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (months)
                </label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {productType === 'personal-loan' && '6 - 84 months'}
                  {productType === 'access-home-loan' && '60 - 240 months (5-20 years)'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (R)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">For affordability assessment</p>
              </div>
            </>
          )}

          {(productType === 'fixed-deposit' || productType === 'savings-account') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {productType === 'fixed-deposit' ? 'Deposit Amount (R)' : 'Initial Savings (R)'}
                </label>
                <input
                  type="number"
                  value={savingsAmount}
                  onChange={(e) => setSavingsAmount(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {productType === 'fixed-deposit' && 'Minimum: R10,000'}
                  {productType === 'savings-account' && 'No minimum balance'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term (months)
                </label>
                <input
                  type="number"
                  value={savingsTerm}
                  onChange={(e) => setSavingsTerm(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {productType === 'fixed-deposit' && 'Fixed deposit terms: 1, 3, 6, 12, 24, 36, 60 months'}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Results */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Capitec Calculation Results</h3>

          {results.type === 'loan' && 'monthlyPayment' in results && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Monthly Payment</h4>
                <div className="text-3xl font-bold text-blue-600">
                  R{results.monthlyPayment?.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {results.affordability?.toFixed(1)}% of your income
                  <span className={`ml-2 ${results.affordable ? 'text-green-600' : 'text-red-600'}`}>
                    {results.affordable ? '✓ Affordable' : '⚠️ May not be affordable'}
                  </span>
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold text-black">{results.rate}% p.a.</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Loan Term:</span>
                  <span className="font-semibold text-black">{loanTerm} months</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total Payments:</span>
                  <span className="font-semibold text-black">R{results.totalPayments?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-orange-600">R{results.totalInterest?.toLocaleString()}</span>
                </div>
                {results.initiationFee && results.initiationFee > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Initiation Fee:</span>
                    <span className="font-semibold text-black">R{results.initiationFee?.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Monthly Admin:</span>
                  <span className="font-semibold text-black">R{results.monthlyAdmin}</span>
                </div>
                <div className="flex justify-between py-2 bg-blue-50 rounded-lg px-4">
                  <span className="text-gray-900 font-medium">Total Cost:</span>
                  <span className="font-bold text-blue-600 text-lg">R{results.totalCost?.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-900">
                  💡 Your R{loanAmount.toLocaleString()} {productType.replace('-', ' ')} will cost R{results.monthlyPayment?.toLocaleString()}/month
                  over {loanTerm} months at {results.rate}% interest.
                </p>
              </div>
            </div>
          )}

          {results.type === 'savings' && 'futureValue' in results && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Future Value</h4>
                <div className="text-3xl font-bold text-green-600">
                  R{results.futureValue?.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Initial Amount:</span>
                  <span className="font-semibold text-black">R{results.initialAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold text-black">{results.rate}% p.a.</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Term:</span>
                  <span className="font-semibold text-black">{results.term} months</span>
                </div>
                <div className="flex justify-between py-2 bg-green-50 rounded-lg px-4">
                  <span className="text-gray-900 font-medium">Interest Earned:</span>
                  <span className="font-bold text-green-600 text-lg">R{results.totalInterest?.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-sm text-green-900">
                  💰 Your R{results.initialAmount?.toLocaleString()} will grow to R{results.futureValue?.toLocaleString()}
                  in {results.term} months at {results.rate}% interest.
                </p>
              </div>
            </div>
          )}

          {results.type === 'account' && 'monthlyFee' in results && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Monthly Fee</h4>
                <div className="text-3xl font-bold text-blue-600">R{results.monthlyFee}</div>
                <p className="text-sm text-gray-600 mt-1">Annual: R{results.annualFee}</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">GlobalOne Features</h4>
                <ul className="space-y-2">
                  {results.features?.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">Interest on Balance:</p>
                <p>Earn {results.interestRate}% interest on positive balances over R25,000</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
