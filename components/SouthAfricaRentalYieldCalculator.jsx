'use client'
import { useState } from 'react';

export default function SouthAfricaRentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState('');
  const [monthlyRental, setMonthlyRental] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [bondAmount, setBondAmount] = useState('');
  const [interestRate, setInterestRate] = useState('11.75'); // Current SA prime rate
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [vacancyRate, setVacancyRate] = useState('8'); // 1 month vacancy per year
  const [calculationType, setCalculationType] = useState('yield'); // yield or cashflow
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRentalYield = () => {
    const propValue = parseFloat(propertyValue) || parseFloat(purchasePrice);
    const monthlyRent = parseFloat(monthlyRental);
    const monthlyExp = parseFloat(monthlyExpenses) || 0;
    const annualExp = parseFloat(annualExpenses) || 0;
    const vacancy = parseFloat(vacancyRate) / 100;
    const bond = parseFloat(bondAmount) || 0;
    const rate = parseFloat(interestRate) / 100;

    // Annual rental income
    const grossAnnualRental = monthlyRent * 12;
    const vacancyLoss = grossAnnualRental * vacancy;
    const netAnnualRental = grossAnnualRental - vacancyLoss;

    // Annual expenses
    const totalMonthlyExpenses = monthlyExp * 12;
    const totalAnnualExpenses = totalMonthlyExpenses + annualExp;

    // Bond repayment calculation (rough estimate for interest only)
    const annualBondPayment = bond * rate;

    // Net rental income after all expenses
    const netRentalIncome = netAnnualRental - totalAnnualExpenses - annualBondPayment;

    // Yield calculations
    const grossRentalYield = (grossAnnualRental / propValue) * 100;
    const netRentalYield = (netRentalIncome / propValue) * 100;

    // Cash flow calculations
    const monthlyCashFlow = (netRentalIncome / 12);
    const monthlyBondPayment = annualBondPayment / 12;
    const monthlyNetIncome = monthlyRent - monthlyExp - monthlyBondPayment;

    // ROI calculation (assuming deposit is 20% of purchase price)
    const deposit = propValue * 0.2;
    const roi = (netRentalIncome / deposit) * 100;

    // Property investment rating
    let rating = 'Poor';
    let ratingColor = 'text-red-600';
    if (netRentalYield >= 12) {
      rating = 'Excellent';
      ratingColor = 'text-green-600';
    } else if (netRentalYield >= 10) {
      rating = 'Very Good';
      ratingColor = 'text-green-500';
    } else if (netRentalYield >= 8) {
      rating = 'Good';
      ratingColor = 'text-blue-600';
    } else if (netRentalYield >= 6) {
      rating = 'Fair';
      ratingColor = 'text-yellow-600';
    }

    return {
      propertyValue: propValue,
      grossAnnualRental,
      netAnnualRental,
      vacancyLoss,
      totalAnnualExpenses,
      annualBondPayment,
      netRentalIncome,
      grossRentalYield,
      netRentalYield,
      monthlyCashFlow,
      monthlyNetIncome,
      roi,
      deposit,
      rating,
      ratingColor,
      monthlyRent,
      monthlyExpenses: monthlyExp,
      isPositiveCashFlow: monthlyNetIncome > 0,
      breakdownExpenses: {
        monthlyExpenses: totalMonthlyExpenses,
        annualExpenses: annualExp,
        bondPayments: annualBondPayment,
        vacancyAllowance: vacancyLoss
      }
    };
  };

  const handleCalculate = () => {
    if (!monthlyRental || (!propertyValue && !purchasePrice)) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const yieldResult = calculateRentalYield();
      setResult(yieldResult);
      setLoading(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return 'R0';
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatPercentage = (percentage) => {
    if (isNaN(percentage)) return '0.0%';
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          🏠 South African Rental Yield Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Calculate rental yields, ROI, and cash flow analysis for property investments
        </p>
      </div>

      <div className="space-y-6">
        {/* Calculation Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-2xl p-1 flex">
            <button
              onClick={() => setCalculationType('yield')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                calculationType === 'yield'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Yield Calculator
            </button>
            <button
              onClick={() => setCalculationType('cashflow')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                calculationType === 'cashflow'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💰 Cash Flow Analysis
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏠 Property Value
            </label>
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="e.g. 2500000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">Current market value or purchase price</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              💰 Monthly Rental Income
            </label>
            <input
              type="number"
              value={monthlyRental}
              onChange={(e) => setMonthlyRental(e.target.value)}
              placeholder="e.g. 18000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">Gross monthly rental income</p>
          </div>
        </div>

        {calculationType === 'cashflow' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🏦 Bond Amount
              </label>
              <input
                type="number"
                value={bondAmount}
                onChange={(e) => setBondAmount(e.target.value)}
                placeholder="e.g. 2000000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <p className="text-xs text-gray-500">Outstanding bond amount</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                📈 Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g. 11.75"
                step="0.25"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <p className="text-xs text-gray-500">Current bond interest rate</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📋 Monthly Expenses
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="e.g. 3500"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">Insurance, rates, maintenance, management</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📅 Annual Expenses
            </label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">Repairs, upgrades, legal fees</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            🏠 Vacancy Rate (%)
          </label>
          <select 
            value={vacancyRate} 
            onChange={(e) => setVacancyRate(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="0">0% (Always occupied)</option>
            <option value="4">4% (2 weeks vacancy)</option>
            <option value="8">8% (1 month vacancy) - Recommended</option>
            <option value="17">17% (2 months vacancy)</option>
            <option value="25">25% (3 months vacancy)</option>
          </select>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || !monthlyRental || (!propertyValue && !purchasePrice)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate Rental Yield</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Your Property Investment Analysis
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Gross Yield</p>
                <p className="text-xl font-bold text-gray-800">{formatPercentage(result.grossRentalYield)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Net Yield</p>
                <p className="text-lg font-bold">{formatPercentage(result.netRentalYield)}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly Cash Flow</p>
                <p className={`text-lg font-bold ${result.isPositiveCashFlow ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(result.monthlyCashFlow)}
                </p>
              </div>
              <div className={`text-center p-4 rounded-2xl shadow-lg ${result.netRentalYield >= 8 ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'}`}>
                <p className="text-sm font-medium text-white/90 mb-1">Rating</p>
                <p className="text-lg font-bold">{result.rating}</p>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Investment Summary
              </h4>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Property Value</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(result.propertyValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Annual Rental Income</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(result.netAnnualRental)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">ROI on Deposit</p>
                  <p className={`text-xl font-bold ${result.roi >= 15 ? 'text-green-600' : result.roi >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {formatPercentage(result.roi)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Required Deposit (20%)</p>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(result.deposit)}</p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Income Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Annual Rental:</span>
                    <span className="font-medium">{formatCurrency(result.grossAnnualRental)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vacancy Allowance:</span>
                    <span className="font-medium text-red-600">-{formatCurrency(result.vacancyLoss)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Net Rental Income:</span>
                    <span className="text-green-600">{formatCurrency(result.netAnnualRental)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  Expense Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Expenses (Annual):</span>
                    <span className="font-medium">{formatCurrency(result.breakdownExpenses.monthlyExpenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Expenses:</span>
                    <span className="font-medium">{formatCurrency(result.breakdownExpenses.annualExpenses)}</span>
                  </div>
                  {result.breakdownExpenses.bondPayments > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Interest (Annual):</span>
                      <span className="font-medium">{formatCurrency(result.breakdownExpenses.bondPayments)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total Annual Expenses:</span>
                    <span className="text-red-600">{formatCurrency(result.totalAnnualExpenses + result.breakdownExpenses.bondPayments)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Recommendation */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Investment Analysis
              </h4>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className={`p-3 rounded-lg border ${result.grossRentalYield >= 10 ? 'bg-green-50 border-green-200' : result.grossRentalYield >= 8 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                  <h5 className="font-semibold mb-1">Gross Yield Rating</h5>
                  <p className={result.grossRentalYield >= 10 ? 'text-green-800' : result.grossRentalYield >= 8 ? 'text-yellow-800' : 'text-red-800'}>
                    {result.grossRentalYield >= 10 ? 'Excellent - Above 10%' : result.grossRentalYield >= 8 ? 'Good - Above 8%' : 'Below average - Under 8%'}
                  </p>
                </div>
                
                <div className={`p-3 rounded-lg border ${result.isPositiveCashFlow ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h5 className="font-semibold mb-1">Cash Flow</h5>
                  <p className={result.isPositiveCashFlow ? 'text-green-800' : 'text-red-800'}>
                    {result.isPositiveCashFlow ? 'Positive - Generates income' : 'Negative - Requires top-up'}
                  </p>
                </div>
                
                <div className={`p-3 rounded-lg border ${result.roi >= 15 ? 'bg-green-50 border-green-200' : result.roi >= 10 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                  <h5 className="font-semibold mb-1">ROI Rating</h5>
                  <p className={result.roi >= 15 ? 'text-green-800' : result.roi >= 10 ? 'text-yellow-800' : 'text-red-800'}>
                    {result.roi >= 15 ? 'Excellent return' : result.roi >= 10 ? 'Good return' : 'Below average return'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-property-transfer-calculator"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🏠</span>
              <span>Property Transfer Costs</span>
            </a>
            
            <a 
              href="/south-africa-loan-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-green-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🏦</span>
              <span>Bond Calculator</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              🏠 <strong>Investment Disclaimer:</strong> Property investments carry risks. Past performance doesn't guarantee future returns. 
              Consult a qualified financial advisor for personalized investment advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}