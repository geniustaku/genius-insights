'use client'
import { useState } from 'react';

export default function SouthAfricaRetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSalary, setCurrentSalary] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('10');
  const [inflationRate, setInflationRate] = useState('6');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculationType, setCalculationType] = useState('retirement'); // retirement or pension

  const calculateRetirement = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const yearsToRetirement = retAge - age;
    const annualSalary = parseFloat(currentSalary) * 12;
    const savings = parseFloat(currentSavings) || 0;
    const monthlyContrib = parseFloat(monthlyContribution) || 0;
    const annualContrib = monthlyContrib * 12;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const realReturn = (1 + returnRate) / (1 + inflation) - 1;

    // Future Value of current savings
    const futureCurrentSavings = savings * Math.pow(1 + returnRate, yearsToRetirement);

    // Future Value of annual contributions (annuity)
    const futureContributions = annualContrib * 
      ((Math.pow(1 + returnRate, yearsToRetirement) - 1) / returnRate);

    // Total retirement savings
    const totalRetirementSavings = futureCurrentSavings + futureContributions;

    // Required retirement capital (75% of final salary)
    const finalSalary = annualSalary * Math.pow(1 + inflation, yearsToRetirement);
    const requiredIncome = finalSalary * 0.75;
    const requiredCapital = requiredIncome / 0.04; // 4% withdrawal rule

    // Monthly pension using annuity formula (4% withdrawal rate)
    const monthlyPension = (totalRetirementSavings * 0.04) / 12;

    // Replacement ratio
    const replacementRatio = (monthlyPension * 12) / finalSalary * 100;

    // Shortfall calculation
    const shortfall = Math.max(0, requiredCapital - totalRetirementSavings);
    const additionalMonthlyContrib = shortfall > 0 ? 
      (shortfall * returnRate) / ((Math.pow(1 + returnRate, yearsToRetirement) - 1) * 12) : 0;

    return {
      yearsToRetirement,
      totalRetirementSavings,
      monthlyPension,
      finalSalary,
      requiredIncome,
      requiredCapital,
      replacementRatio,
      shortfall,
      additionalMonthlyContrib,
      futureCurrentSavings,
      futureContributions,
      isOnTrack: totalRetirementSavings >= requiredCapital,
      currentSavingsRate: annualContrib / annualSalary * 100
    };
  };

  const handleCalculate = () => {
    if (!currentAge || !currentSalary) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const retirementResult = calculateRetirement();
      setResult(retirementResult);
      setLoading(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatLargeCurrency = (amount) => {
    if (amount >= 1000000) {
      return `R${(amount / 1000000).toFixed(1)}M`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          🏦 South African Retirement Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Plan your financial future with our comprehensive retirement planning tool
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🎂 Current Age
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="e.g. 30"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏁 Retirement Age
            </label>
            <select 
              value={retirementAge} 
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="60">60 years</option>
              <option value="65">65 years</option>
              <option value="67">67 years (new retirement age)</option>
              <option value="70">70 years</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              💰 Current Monthly Salary
            </label>
            <input
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              placeholder="e.g. 35000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏦 Current Retirement Savings
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g. 150000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📅 Monthly Contribution
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📈 Expected Annual Return
            </label>
            <select 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="8">8% (Conservative)</option>
              <option value="10">10% (Moderate)</option>
              <option value="12">12% (Aggressive)</option>
              <option value="15">15% (High Growth)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            📊 Expected Inflation Rate
          </label>
          <select 
            value={inflationRate} 
            onChange={(e) => setInflationRate(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="4">4% (SARB Lower Target)</option>
            <option value="6">6% (SARB Upper Target)</option>
            <option value="8">8% (Above Target)</option>
          </select>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || !currentAge || !currentSalary}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate My Retirement</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Your Retirement Projection
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Years to Retirement</p>
                <p className="text-xl font-bold text-gray-800">{result.yearsToRetirement}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Total Savings</p>
                <p className="text-lg font-bold">{formatLargeCurrency(result.totalRetirementSavings)}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly Pension</p>
                <p className="text-lg font-bold text-gray-800">{formatCurrency(result.monthlyPension)}</p>
              </div>
              <div className={`text-center p-4 rounded-2xl shadow-lg ${result.isOnTrack ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'}`}>
                <p className="text-sm font-medium text-white/90 mb-1">Status</p>
                <p className="text-lg font-bold">{result.isOnTrack ? 'On Track' : 'Shortfall'}</p>
              </div>
            </div>

            {/* Retirement Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                Retirement Readiness
              </h4>
              
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Replacement Ratio</p>
                  <p className={`text-2xl font-bold ${result.replacementRatio >= 75 ? 'text-green-600' : result.replacementRatio >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {result.replacementRatio.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">Target: 75%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Savings Rate</p>
                  <p className={`text-2xl font-bold ${result.currentSavingsRate >= 15 ? 'text-green-600' : result.currentSavingsRate >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {result.currentSavingsRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">Target: 15%+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Required Income</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(result.requiredIncome / 12)}</p>
                  <p className="text-xs text-gray-500">Monthly</p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Savings Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Savings (Future Value):</span>
                    <span className="font-medium">{formatLargeCurrency(result.futureCurrentSavings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Future Contributions:</span>
                    <span className="font-medium">{formatLargeCurrency(result.futureContributions)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total Retirement Capital:</span>
                    <span className="text-emerald-600">{formatLargeCurrency(result.totalRetirementSavings)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🚀</span>
                  Improvement Plan
                </h4>
                
                <div className="space-y-3 text-sm">
                  {result.shortfall > 0 ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Shortfall:</span>
                        <span className="font-medium text-red-600">{formatLargeCurrency(result.shortfall)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Monthly Needed:</span>
                        <span className="font-medium text-orange-600">{formatCurrency(result.additionalMonthlyContrib)}</span>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-yellow-800 text-xs">
                          <strong>Recommendation:</strong> Increase monthly contributions by {formatCurrency(result.additionalMonthlyContrib)} to meet retirement goals.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 text-xs">
                        <strong>Congratulations!</strong> You're on track for a comfortable retirement. Consider increasing contributions to build extra security.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Calculate Tax Benefits</span>
            </a>
            
            <a 
              href="/south-africa-investment-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📈</span>
              <span>Investment Calculator</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              📊 <strong>Financial Planning Disclaimer:</strong> These projections are estimates based on assumptions. 
              Actual returns may vary. Consult a qualified financial advisor for personalized retirement planning.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}