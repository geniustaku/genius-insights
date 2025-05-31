'use client'
import { useState } from 'react';

export default function SouthAfricaTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [age, setAge] = useState('under65');
  const [medicalAid, setMedicalAid] = useState('');
  const [pensionFund, setPensionFund] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2025/2026 Tax brackets
  const taxBrackets = [
    { min: 0, max: 237100, rate: 0.18, base: 0 },
    { min: 237101, max: 370500, rate: 0.26, base: 42678 },
    { min: 370501, max: 512800, rate: 0.31, base: 77362 },
    { min: 512801, max: 673000, rate: 0.36, base: 121475 },
    { min: 673001, max: 857900, rate: 0.39, base: 179147 },
    { min: 857901, max: Infinity, rate: 0.45, base: 251258 }
  ];

  // Tax rebates for 2025/2026
  const rebates = {
    under65: 17235,
    age65to74: 17235 + 9444, // Primary + Secondary
    age75plus: 17235 + 9444 + 3145 // Primary + Secondary + Tertiary
  };

  const calculateTax = () => {
    if (!annualIncome || annualIncome <= 0) return;
    
    setLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const income = parseFloat(annualIncome);
      const medicalAidContrib = parseFloat(medicalAid) || 0;
      const pensionContrib = parseFloat(pensionFund) || 0;
      
      // Calculate taxable income
      const maxPensionDeduction = Math.min(pensionContrib, income * 0.275, 350000);
      const taxableIncome = Math.max(0, income - maxPensionDeduction);
      
      // Calculate income tax
      let tax = 0;
      for (const bracket of taxBrackets) {
        if (taxableIncome > bracket.min) {
          const taxableAtBracket = Math.min(taxableIncome, bracket.max) - bracket.min + 1;
          tax = bracket.base + (taxableAtBracket * bracket.rate);
        }
      }
      
      // Apply rebates
      const rebate = rebates[age];
      const taxAfterRebates = Math.max(0, tax - rebate);
      
      // Calculate UIF (1% of income, max R177.12 per month)
      const monthlyIncome = income / 12;
      const monthlyUIF = Math.min(monthlyIncome * 0.01, 177.12);
      const annualUIF = monthlyUIF * 12;
      
      // Calculate SDL (1% of income for companies with payroll > R500k)
      const annualSDL = income > 500000 ? income * 0.01 : 0;
      
      // Medical aid tax credits
      const medicalAidCredit = medicalAidContrib > 0 ? 
        Math.min(medicalAidContrib * 12, 4536 + (income > 307800 ? (income - 307800) * 0.33 : 0)) : 0;
      
      const finalTax = Math.max(0, taxAfterRebates - medicalAidCredit);
      
      setResult({
        grossIncome: income,
        taxableIncome,
        incomeTax: finalTax,
        uif: annualUIF,
        sdl: annualSDL,
        totalDeductions: finalTax + annualUIF + annualSDL,
        netIncome: income - finalTax - annualUIF - annualSDL,
        monthlyGross: income / 12,
        monthlyNet: (income - finalTax - annualUIF - annualSDL) / 12,
        monthlyTax: finalTax / 12,
        effectiveRate: income > 0 ? (finalTax / income) * 100 : 0,
        marginalRate: getMarginalRate(taxableIncome) * 100,
        rebateApplied: rebate,
        pensionDeduction: maxPensionDeduction,
        medicalCredit: medicalAidCredit
      });
      
      setLoading(false);
    }, 800);
  };

  const getMarginalRate = (income) => {
    for (const bracket of taxBrackets) {
      if (income >= bracket.min && income <= bracket.max) {
        return bracket.rate;
      }
    }
    return taxBrackets[taxBrackets.length - 1].rate;
  };

  const formatCurrency = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          🇿🇦 Calculate Your South African Tax
        </h2>
        <p className="text-gray-600 text-lg">
          2025/2026 tax year calculator with SARS-compliant rates and rebates
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              💰 Annual Gross Income
            </label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="e.g. 500000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🎂 Age Category
            </label>
            <select 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="under65">Under 65 years</option>
              <option value="age65to74">65 to 74 years</option>
              <option value="age75plus">75 years and older</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏥 Annual Medical Aid Contributions (Optional)
            </label>
            <input
              type="number"
              value={medicalAid}
              onChange={(e) => setMedicalAid(e.target.value)}
              placeholder="e.g. 24000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏦 Annual Pension Fund Contributions (Optional)
            </label>
            <input
              type="number"
              value={pensionFund}
              onChange={(e) => setPensionFund(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
        </div>

        <button 
          onClick={calculateTax}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || !annualIncome}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate My Tax</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Your 2025/2026 Tax Calculation
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Gross Income</p>
                <p className="text-lg font-bold text-gray-800">{formatCurrency(result.grossIncome)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Income Tax</p>
                <p className="text-lg font-bold">{formatCurrency(result.incomeTax)}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Deductions</p>
                <p className="text-lg font-bold text-gray-800">{formatCurrency(result.totalDeductions)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Net Income</p>
                <p className="text-lg font-bold">{formatCurrency(result.netIncome)}</p>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📅</span>
                Monthly Breakdown
              </h4>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Gross</p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(result.monthlyGross)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Tax</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(result.monthlyTax)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Net</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(result.monthlyNet)}</p>
                </div>
              </div>
            </div>

            {/* Tax Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Tax Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Income:</span>
                    <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Before Rebates:</span>
                    <span className="font-medium">{formatCurrency(result.incomeTax + result.rebateApplied)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Tax Rebate Applied:</span>
                    <span className="font-medium">-{formatCurrency(result.rebateApplied)}</span>
                  </div>
                  {result.medicalCredit > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Medical Aid Credit:</span>
                      <span className="font-medium">-{formatCurrency(result.medicalCredit)}</span>
                    </div>
                  )}
                  {result.pensionDeduction > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Pension Deduction:</span>
                      <span className="font-medium">-{formatCurrency(result.pensionDeduction)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Final Income Tax:</span>
                    <span>{formatCurrency(result.incomeTax)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  Tax Rates
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Tax Rate:</span>
                    <span className="font-medium text-green-600">{result.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marginal Tax Rate:</span>
                    <span className="font-medium text-orange-600">{result.marginalRate.toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">UIF Contribution:</span>
                    <span className="font-medium">{formatCurrency(result.uif)}</span>
                  </div>
                  {result.sdl > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">SDL Contribution:</span>
                      <span className="font-medium">{formatCurrency(result.sdl)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Take-home:</strong> {((result.netIncome / result.grossIncome) * 100).toFixed(1)}% of gross income
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-loan-calculator"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🏠</span>
              <span>Calculate Loan Affordability</span>
            </a>
            
            <a 
              href="/salary-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-green-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>💰</span>
              <span>Check Salary Benchmarks</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              ⚖️ <strong>Legal Disclaimer:</strong> This calculator provides estimates based on 2025/2026 SARS tax tables. 
              Actual tax may vary based on specific circumstances. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}