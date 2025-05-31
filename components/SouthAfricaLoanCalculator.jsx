'use client'
import { useState } from 'react';

export default function SouthAfricaLoanCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('11.5');
  const [loanTerm, setLoanTerm] = useState('20');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculationType, setCalculationType] = useState('affordability'); // affordability or repayment

  const calculateAffordability = () => {
    const income = parseFloat(monthlyIncome);
    const expenses = parseFloat(monthlyExpenses);
    const rate = parseFloat(interestRate) / 100 / 12;
    const termMonths = parseFloat(loanTerm) * 12;
    
    // Maximum affordable monthly payment (30% of net income rule)
    const netIncome = income - expenses;
    const maxMonthlyPayment = netIncome * 0.3;
    
    // Calculate maximum loan amount based on affordability
    const maxLoanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + rate, -termMonths)) / rate);
    
    // Calculate minimum deposit (assume 10% minimum)
    const minDepositPercentage = 10;
    const maxPropertyPrice = maxLoanAmount / (1 - minDepositPercentage / 100);
    const minDeposit = maxPropertyPrice * (minDepositPercentage / 100);
    
    // Transfer costs (approximately 8-10% of property value)
    const transferCosts = maxPropertyPrice * 0.09;
    const totalCashNeeded = minDeposit + transferCosts;
    
    return {
      maxPropertyPrice,
      maxLoanAmount,
      minDeposit,
      maxMonthlyPayment,
      transferCosts,
      totalCashNeeded,
      netIncome,
      debtToIncomeRatio: (maxMonthlyPayment / income) * 100
    };
  };

  const calculateRepayment = () => {
    const price = parseFloat(propertyPrice);
    const dep = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate) / 100 / 12;
    const termMonths = parseFloat(loanTerm) * 12;
    
    const loanAmount = price - dep;
    const monthlyPayment = loanAmount * (rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
    
    const totalInterest = (monthlyPayment * termMonths) - loanAmount;
    const totalPayment = loanAmount + totalInterest;
    
    // Transfer costs calculation
    const transferDuty = calculateTransferDuty(price);
    const bondRegistration = Math.max(price * 0.001, 1500); // 0.1% or min R1500
    const bondAttorneyFees = price * 0.015; // ~1.5%
    const transferAttorneyFees = price * 0.01; // ~1%
    const deedsOffice = 500;
    const totalTransferCosts = transferDuty + bondRegistration + bondAttorneyFees + transferAttorneyFees + deedsOffice;
    
    const totalCashNeeded = dep + totalTransferCosts;
    const loanToValue = (loanAmount / price) * 100;
    
    // Affordability check
    const requiredIncome = monthlyPayment / 0.3; // 30% debt-to-income ratio
    
    return {
      propertyPrice: price,
      deposit: dep,
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalPayment,
      transferDuty,
      bondRegistration,
      bondAttorneyFees,
      transferAttorneyFees,
      totalTransferCosts,
      totalCashNeeded,
      loanToValue,
      requiredIncome
    };
  };

  const calculateTransferDuty = (propertyValue) => {
    // 2025 SA Transfer Duty rates
    if (propertyValue <= 1000000) return 0; // No transfer duty
    if (propertyValue <= 1375000) return (propertyValue - 1000000) * 0.03;
    if (propertyValue <= 1925000) return 11250 + (propertyValue - 1375000) * 0.06;
    if (propertyValue <= 2475000) return 44250 + (propertyValue - 1925000) * 0.08;
    if (propertyValue <= 11000000) return 88250 + (propertyValue - 2475000) * 0.11;
    return 1026000 + (propertyValue - 11000000) * 0.13; // Above R11m
  };

  const handleCalculate = () => {
    setLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      if (calculationType === 'affordability') {
        const affordabilityResult = calculateAffordability();
        setResult({ type: 'affordability', ...affordabilityResult });
      } else {
        const repaymentResult = calculateRepayment();
        setResult({ type: 'repayment', ...repaymentResult });
      }
      setLoading(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLargeCurrency = (amount) => {
    if (amount >= 1000000) {
      return `R${(amount / 1000000).toFixed(2)}M`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          🏠 South African Home Loan Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Calculate affordability or loan repayments with 2025 SA interest rates
        </p>
      </div>

      {/* Calculator Type Toggle */}
      <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
        <button
          onClick={() => setCalculationType('affordability')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            calculationType === 'affordability'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💰 Affordability Calculator
        </button>
        <button
          onClick={() => setCalculationType('repayment')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            calculationType === 'repayment'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🧮 Repayment Calculator
        </button>
      </div>

      <div className="space-y-6">
        {calculationType === 'affordability' ? (
          // Affordability Calculator Inputs
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                💵 Monthly Gross Income
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                💸 Monthly Expenses
              </label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>
        ) : (
          // Repayment Calculator Inputs
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🏠 Property Price
              </label>
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
                placeholder="e.g. 2000000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                💰 Deposit Amount
              </label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="e.g. 200000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📈 Interest Rate (%)
            </label>
            <select 
              value={interestRate} 
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="10.5">10.5% (Excellent credit)</option>
              <option value="11.0">11.0% (Good credit)</option>
              <option value="11.5">11.5% (Prime rate)</option>
              <option value="12.0">12.0% (Average credit)</option>
              <option value="12.5">12.5% (Below average)</option>
              <option value="13.0">13.0% (Poor credit)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ⏰ Loan Term (Years)
            </label>
            <select 
              value={loanTerm} 
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || (calculationType === 'affordability' ? !monthlyIncome || !monthlyExpenses : !propertyPrice)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate {calculationType === 'affordability' ? 'Affordability' : 'Repayments'}</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {result.type === 'affordability' ? (
            // Affordability Results
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
                Your Home Buying Power
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">Max Property</p>
                  <p className="text-lg font-bold text-gray-800">{formatLargeCurrency(result.maxPropertyPrice)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg">
                  <p className="text-sm font-medium text-white/90 mb-1">Max Loan</p>
                  <p className="text-lg font-bold">{formatLargeCurrency(result.maxLoanAmount)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">Min Deposit</p>
                  <p className="text-lg font-bold text-gray-800">{formatLargeCurrency(result.minDeposit)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg">
                  <p className="text-sm font-medium text-white/90 mb-1">Monthly Payment</p>
                  <p className="text-lg font-bold">{formatCurrency(result.maxMonthlyPayment)}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Cash Requirements
                </h4>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Deposit (10%)</p>
                    <p className="text-lg font-bold text-gray-800">{formatCurrency(result.minDeposit)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transfer Costs</p>
                    <p className="text-lg font-bold text-orange-600">{formatCurrency(result.transferCosts)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Cash Needed</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(result.totalCashNeeded)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Repayment Results
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
                Your Loan Repayment Breakdown
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">Property Price</p>
                  <p className="text-lg font-bold text-gray-800">{formatLargeCurrency(result.propertyPrice)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg">
                  <p className="text-sm font-medium text-white/90 mb-1">Loan Amount</p>
                  <p className="text-lg font-bold">{formatLargeCurrency(result.loanAmount)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">Monthly Payment</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(result.monthlyPayment)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl shadow-lg">
                  <p className="text-sm font-medium text-white/90 mb-1">Total Interest</p>
                  <p className="text-lg font-bold">{formatLargeCurrency(result.totalInterest)}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📊</span>
                    Loan Details
                  </h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan-to-Value:</span>
                      <span className="font-medium">{result.loanToValue.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payment:</span>
                      <span className="font-medium">{formatLargeCurrency(result.totalPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Required Income:</span>
                      <span className="font-medium">{formatCurrency(result.requiredIncome)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">💰</span>
                    Transfer Costs
                  </h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transfer Duty:</span>
                      <span className="font-medium">{formatCurrency(result.transferDuty)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Registration:</span>
                      <span className="font-medium">{formatCurrency(result.bondRegistration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attorney Fees:</span>
                      <span className="font-medium">{formatCurrency(result.bondAttorneyFees + result.transferAttorneyFees)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-semibold">
                      <span>Total Cash Needed:</span>
                      <span className="text-red-600">{formatCurrency(result.totalCashNeeded)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Calculate Tax on Income</span>
            </a>
            
            <a 
              href="/south-africa-property-transfer-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🏠</span>
              <span>Property Transfer Costs</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              🏦 <strong>Important:</strong> These calculations are estimates. Actual loan terms, rates, and costs may vary 
              based on your credit profile, bank policies, and market conditions. Consult with a qualified mortgage advisor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}