'use client'
import { useState } from 'react';

export default function SouthAfricaInvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [investmentType, setInvestmentType] = useState('general');
  const [inflationRate, setInflationRate] = useState('6');
  const [calculationType, setCalculationType] = useState('growth'); // growth or goal
  const [targetAmount, setTargetAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // South African investment options with typical returns
  const investmentOptions = {
    general: { name: 'General Investment', return: 12, description: 'Mixed portfolio approach' },
    jse: { name: 'JSE Top 40 ETF', return: 15, description: 'SA equity market exposure' },
    unitrust: { name: 'Balanced Unit Trust', return: 10, description: 'Professional fund management' },
    offshore: { name: 'Offshore Investment', return: 14, description: 'Global market exposure' },
    tfsa: { name: 'Tax-Free Savings', return: 12, description: 'Tax-free growth (R36k/year limit)' },
    bonds: { name: 'SA Government Bonds', return: 8, description: 'Conservative fixed income' },
    property: { name: 'Property Fund (REIT)', return: 9, description: 'Real estate investment trust' }
  };

  const calculateInvestmentGrowth = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const years = parseFloat(investmentPeriod);
    const annualReturn = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = years * 12;

    if (calculationType === 'growth') {
      // Future Value calculation with compound interest
      // FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]
      
      const futureValueInitial = initial * Math.pow(1 + annualReturn, years);
      
      let futureValueMonthly = 0;
      if (monthly > 0) {
        futureValueMonthly = monthly * 
          ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
      }
      
      const totalFutureValue = futureValueInitial + futureValueMonthly;
      const totalContributions = initial + (monthly * totalMonths);
      const totalInterestEarned = totalFutureValue - totalContributions;
      
      // Real value adjusted for inflation
      const realValue = totalFutureValue / Math.pow(1 + inflation, years);
      const realReturn = ((realValue / totalContributions) - 1) * 100;
      
      // Year-by-year breakdown (simplified - showing key milestones)
      const yearlyBreakdown = [];
      for (let year = 1; year <= Math.min(years, 10); year++) {
        const yearInitial = initial * Math.pow(1 + annualReturn, year);
        const monthsToDate = year * 12;
        const yearMonthly = monthly > 0 ? 
          monthly * ((Math.pow(1 + monthlyReturn, monthsToDate) - 1) / monthlyReturn) : 0;
        const yearTotal = yearInitial + yearMonthly;
        const yearContributions = initial + (monthly * monthsToDate);
        
        yearlyBreakdown.push({
          year,
          value: yearTotal,
          contributions: yearContributions,
          growth: yearTotal - yearContributions
        });
      }

      return {
        type: 'growth',
        totalFutureValue,
        totalContributions,
        totalInterestEarned,
        realValue,
        realReturn,
        annualReturn: expectedReturn,
        investmentPeriod: years,
        monthlyContribution: monthly,
        initialAmount: initial,
        yearlyBreakdown,
        investmentType: investmentOptions[investmentType].name,
        effectiveReturn: ((totalFutureValue / totalContributions) - 1) * 100
      };
    } else {
      // Goal-based calculation - how much to invest to reach target
      const target = parseFloat(targetAmount);
      
      // Calculate required monthly payment to reach target
      // PMT = (FV - PV(1+r)^n) / [((1+r)^n - 1)/r]
      const futureValueInitial = initial * Math.pow(1 + annualReturn, years);
      const remainingTarget = target - futureValueInitial;
      
      let requiredMonthly = 0;
      if (remainingTarget > 0 && years > 0) {
        const denominator = (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
        requiredMonthly = remainingTarget / denominator;
      }
      
      const totalRequiredContributions = initial + (requiredMonthly * totalMonths);
      const shortfall = requiredMonthly > 50000 ? requiredMonthly - 50000 : 0; // Unrealistic if >R50k/month
      
      return {
        type: 'goal',
        targetAmount: target,
        requiredMonthly,
        totalRequiredContributions,
        initialAmount: initial,
        investmentPeriod: years,
        isAchievable: requiredMonthly <= 50000 && requiredMonthly >= 0,
        shortfall,
        investmentType: investmentOptions[investmentType].name,
        annualReturn: expectedReturn
      };
    }
  };

  const handleCalculate = () => {
    if (!investmentPeriod || (calculationType === 'growth' && !initialAmount && !monthlyContribution) || 
        (calculationType === 'goal' && !targetAmount)) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const investmentResult = calculateInvestmentGrowth();
      setResult(investmentResult);
      setLoading(false);
    }, 600);
  };

  const handleInvestmentTypeChange = (type) => {
    setInvestmentType(type);
    setExpectedReturn(investmentOptions[type].return.toString());
  };

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return 'R0';
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatLargeCurrency = (amount) => {
    if (amount >= 1000000) {
      return `R${(amount / 1000000).toFixed(1)}M`;
    }
    return formatCurrency(amount);
  };

  const formatPercentage = (percentage) => {
    if (isNaN(percentage)) return '0.0%';
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-2 sm:mb-3">
          📈 South African Investment Calculator
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Calculate investment growth, compound interest, and wealth building potential
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Calculation Type Toggle */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-1 flex w-full max-w-md">
            <button
              onClick={() => setCalculationType('growth')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[44px] touch-manipulation ${
                calculationType === 'growth'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📈 Growth Calculator
            </button>
            <button
              onClick={() => setCalculationType('goal')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[44px] touch-manipulation ${
                calculationType === 'goal'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎯 Goal Planner
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            📊 Investment Type
          </label>
          <select 
            value={investmentType} 
            onChange={(e) => handleInvestmentTypeChange(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="general">General Investment Portfolio - 12% return</option>
            <option value="jse">JSE Top 40 ETF - 15% return</option>
            <option value="unitrust">Balanced Unit Trust - 10% return</option>
            <option value="offshore">Offshore Investment - 14% return</option>
            <option value="tfsa">Tax-Free Savings Account - 12% return</option>
            <option value="bonds">SA Government Bonds - 8% return</option>
            <option value="property">Property Fund (REIT) - 9% return</option>
          </select>
          <p className="text-sm text-gray-600 mt-1">
            {investmentOptions[investmentType].description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              💰 Initial Investment
            </label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">One-time initial investment amount</p>
          </div>

          {calculationType === 'growth' ? (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                📅 Monthly Contribution
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="e.g. 3000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <p className="text-xs text-gray-500">Regular monthly investment amount</p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🎯 Target Amount
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g. 5000000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <p className="text-xs text-gray-500">Your investment goal amount</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ⏰ Investment Period (Years)
            </label>
            <input
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
              placeholder="e.g. 20"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">How long will you invest for?</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📈 Expected Annual Return (%)
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="e.g. 12"
              step="0.5"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-xs text-gray-500">Expected annual return percentage</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            📊 Inflation Rate (%)
          </label>
          <select 
            value={inflationRate} 
            onChange={(e) => setInflationRate(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="4">4% (SARB Lower Target)</option>
            <option value="6">6% (SARB Upper Target)</option>
            <option value="8">8% (Above Target)</option>
          </select>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || !investmentPeriod || (calculationType === 'growth' && !initialAmount && !monthlyContribution) || (calculationType === 'goal' && !targetAmount)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>{calculationType === 'growth' ? 'Calculate Growth' : 'Calculate Required Investment'}</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              {result.type === 'growth' ? 'Your Investment Growth Projection' : 'Your Investment Goal Plan'}
            </h3>
            
            {result.type === 'growth' ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Contributions</p>
                    <p className="text-lg font-bold text-gray-800">{formatLargeCurrency(result.totalContributions)}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg">
                    <p className="text-sm font-medium text-white/90 mb-1">Future Value</p>
                    <p className="text-lg font-bold">{formatLargeCurrency(result.totalFutureValue)}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-1">Interest Earned</p>
                    <p className="text-lg font-bold text-green-600">{formatLargeCurrency(result.totalInterestEarned)}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-1">Effective Return</p>
                    <p className="text-lg font-bold text-purple-600">{formatPercentage(result.effectiveReturn)}</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📊</span>
                    Investment Analysis
                  </h4>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Real Value (Inflation-adjusted)</p>
                      <p className="text-xl font-bold text-blue-600">{formatLargeCurrency(result.realValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Investment Period</p>
                      <p className="text-xl font-bold text-gray-800">{result.investmentPeriod} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Annual Return</p>
                      <p className="text-xl font-bold text-green-600">{result.annualReturn}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Investment Type</p>
                      <p className="text-sm font-bold text-purple-600">{result.investmentType}</p>
                    </div>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                {result.yearlyBreakdown.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📈</span>
                      Growth Timeline
                    </h4>
                    
                    <div className="space-y-3">
                      {result.yearlyBreakdown.slice(0, 5).map((year, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Year {year.year}</span>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">{formatCurrency(year.value)}</div>
                            <div className="text-sm text-gray-600">Growth: {formatCurrency(year.growth)}</div>
                          </div>
                        </div>
                      ))}
                      
                      {result.yearlyBreakdown.length > 5 && (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          ... and {result.yearlyBreakdown.length - 5} more years
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-1">Target Amount</p>
                    <p className="text-2xl font-bold text-gray-800">{formatLargeCurrency(result.targetAmount)}</p>
                  </div>
                  <div className={`text-center p-4 rounded-2xl shadow-lg ${result.isAchievable ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'}`}>
                    <p className="text-sm font-medium text-white/90 mb-1">Required Monthly</p>
                    <p className="text-2xl font-bold">{formatCurrency(result.requiredMonthly)}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Contributions</p>
                    <p className="text-2xl font-bold text-purple-600">{formatLargeCurrency(result.totalRequiredContributions)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className={`p-4 rounded-lg border ${result.isAchievable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <h4 className={`font-semibold mb-2 ${result.isAchievable ? 'text-green-900' : 'text-red-900'}`}>
                      Goal Assessment
                    </h4>
                    <p className={result.isAchievable ? 'text-green-800' : 'text-red-800'}>
                      {result.isAchievable 
                        ? `Your goal is achievable! By investing ${formatCurrency(result.requiredMonthly)} monthly for ${result.investmentPeriod} years, you can reach your target of ${formatLargeCurrency(result.targetAmount)}.`
                        : `This goal may be challenging. The required monthly investment of ${formatCurrency(result.requiredMonthly)} might be too high. Consider extending your timeline or reducing your target amount.`
                      }
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-retirement-calculator"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🏦</span>
              <span>Retirement Planning</span>
            </a>
            
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Tax Calculator</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              📈 <strong>Investment Disclaimer:</strong> Past performance doesn't guarantee future returns. All investments carry risk. 
              Consult a qualified financial advisor for personalized investment advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}