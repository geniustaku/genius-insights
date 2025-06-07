'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function US401kCalculator() {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSalary: 75000,
    salaryGrowthRate: 3,
    currentBalance: 25000,
    employeeContributionPercent: 6,
    employerMatchPercent: 3,
    employerMatchLimit: 6,
    annualReturn: 7,
    inflationRate: 2.5,
    contributionType: 'traditional',
    taxRate: 22,
    catchUpContributions: true
  });

  const [results, setResults] = useState({
    monthlyContribution: 0,
    monthlyEmployerMatch: 0,
    totalAtRetirement: 0,
    totalContributions: 0,
    totalEmployerMatch: 0,
    totalGrowth: 0,
    annualTaxSavings: 0,
    realValueAtRetirement: 0,
    monthlyRetirementIncome: 0,
    replacementRatio: 0
  });

  // 2025 401k contribution limits
  const contributionLimits = {
    employee: 23500, // 2025 limit
    catchUp: 7500, // Additional for 50+
    total: 70000 // Total including employer match
  };

  const calculate401k = () => {
    const {
      currentAge,
      retirementAge,
      currentSalary,
      salaryGrowthRate,
      currentBalance,
      employeeContributionPercent,
      employerMatchPercent,
      employerMatchLimit,
      annualReturn,
      inflationRate,
      contributionType,
      taxRate,
      catchUpContributions
    } = formData;

    const yearsToRetirement = retirementAge - currentAge;
    const monthlyReturn = (annualReturn / 100) / 12;
    const annualSalaryGrowth = salaryGrowthRate / 100;
    const annualInflation = inflationRate / 100;

    // Calculate monthly contributions
    let monthlyEmployeeContribution = (currentSalary * (employeeContributionPercent / 100)) / 12;
    let monthlyEmployerMatch = Math.min(
      (currentSalary * (employerMatchPercent / 100)) / 12,
      (currentSalary * (employerMatchLimit / 100)) / 12
    );

    // Check contribution limits
    const annualEmployeeContribution = monthlyEmployeeContribution * 12;
    const maxContribution = contributionLimits.employee + 
      (currentAge >= 50 && catchUpContributions ? contributionLimits.catchUp : 0);
    
    if (annualEmployeeContribution > maxContribution) {
      monthlyEmployeeContribution = maxContribution / 12;
    }

    // Calculate tax savings for traditional 401k
    const annualTaxSavings = contributionType === 'traditional' ? 
      (monthlyEmployeeContribution * 12) * (taxRate / 100) : 0;

    // Future value calculation with salary growth
    let balance = currentBalance;
    let totalContributions = 0;
    let totalEmployerMatch = 0;
    let currentYearlySalary = currentSalary;

    for (let year = 0; year < yearsToRetirement; year++) {
      // Adjust salary for growth
      if (year > 0) {
        currentYearlySalary *= (1 + annualSalaryGrowth);
      }

      // Recalculate contributions based on new salary
      let yearlyEmployeeContribution = currentYearlySalary * (employeeContributionPercent / 100);
      let yearlyEmployerMatch = Math.min(
        currentYearlySalary * (employerMatchPercent / 100),
        currentYearlySalary * (employerMatchLimit / 100)
      );

      // Apply contribution limits
      const yearMaxContribution = contributionLimits.employee + 
        (currentAge + year >= 50 && catchUpContributions ? contributionLimits.catchUp : 0);
      
      if (yearlyEmployeeContribution > yearMaxContribution) {
        yearlyEmployeeContribution = yearMaxContribution;
      }

      // Add contributions throughout the year (monthly)
      for (let month = 0; month < 12; month++) {
        const monthlyEmployee = yearlyEmployeeContribution / 12;
        const monthlyEmployer = yearlyEmployerMatch / 12;
        
        balance = balance * (1 + monthlyReturn) + monthlyEmployee + monthlyEmployer;
        totalContributions += monthlyEmployee;
        totalEmployerMatch += monthlyEmployer;
      }
    }

    const totalAtRetirement = balance;
    const totalGrowth = totalAtRetirement - currentBalance - totalContributions - totalEmployerMatch;

    // Calculate inflation-adjusted value
    const realValueAtRetirement = totalAtRetirement / Math.pow(1 + annualInflation, yearsToRetirement);

    // Calculate monthly retirement income (4% withdrawal rule)
    const monthlyRetirementIncome = (totalAtRetirement * 0.04) / 12;

    // Calculate final salary for replacement ratio
    const finalSalary = currentSalary * Math.pow(1 + annualSalaryGrowth, yearsToRetirement);
    const replacementRatio = ((monthlyRetirementIncome * 12) / finalSalary) * 100;

    setResults({
      monthlyContribution: Math.round(monthlyEmployeeContribution),
      monthlyEmployerMatch: Math.round(monthlyEmployerMatch),
      totalAtRetirement: Math.round(totalAtRetirement),
      totalContributions: Math.round(totalContributions),
      totalEmployerMatch: Math.round(totalEmployerMatch),
      totalGrowth: Math.round(totalGrowth),
      annualTaxSavings: Math.round(annualTaxSavings),
      realValueAtRetirement: Math.round(realValueAtRetirement),
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome),
      replacementRatio: Number(replacementRatio.toFixed(1))
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number | boolean) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['currentSalary', 'currentBalance', 'currentAge', 'retirementAge'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['salaryGrowthRate', 'employeeContributionPercent', 'employerMatchPercent', 'employerMatchLimit', 'annualReturn', 'inflationRate', 'taxRate'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculate401k();
  }, [formData]);

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 401k Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                US 401k Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate 401k contributions, employer matching, tax savings, and retirement projections with 2025 contribution limits.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">401k Retirement Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate your 401k growth with employer matching and tax benefits</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Age
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.currentAge}
                      onChange={(e) => handleInputChange('currentAge', e.target.value)}
                      placeholder="30"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retirement Age
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.retirementAge}
                      onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                      placeholder="65"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Salary ($)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.currentSalary}
                      onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                      placeholder="75000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Growth Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.salaryGrowthRate}
                      onChange={(e) => handleInputChange('salaryGrowthRate', e.target.value)}
                      placeholder="3"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current 401k Balance ($)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.currentBalance}
                    onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                    placeholder="25000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Contribution (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.employeeContributionPercent}
                      onChange={(e) => handleInputChange('employeeContributionPercent', e.target.value)}
                      placeholder="6"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employer Match (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.employerMatchPercent}
                      onChange={(e) => handleInputChange('employerMatchPercent', e.target.value)}
                      placeholder="3"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer Match Limit (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.employerMatchLimit}
                    onChange={(e) => handleInputChange('employerMatchLimit', e.target.value)}
                    placeholder="6"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.annualReturn}
                      onChange={(e) => handleInputChange('annualReturn', e.target.value)}
                      placeholder="7"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                      placeholder="2.5"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contribution Type
                    </label>
                    <select 
                      value={formData.contributionType}
                      onChange={(e) => handleInputChange('contributionType', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      <option value="traditional">Traditional 401k</option>
                      <option value="roth">Roth 401k</option>
                      <option value="mixed">Mixed Traditional/Roth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.taxRate}
                      onChange={(e) => handleInputChange('taxRate', e.target.value)}
                      placeholder="22"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="catchUpContributions"
                    checked={formData.catchUpContributions}
                    onChange={(e) => handleInputChange('catchUpContributions', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="catchUpContributions" className="ml-2 block text-sm text-gray-700">
                    Include catch-up contributions (age 50+)
                  </label>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">401k Projection Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Contribution:</span>
                    <span className="font-semibold text-black">${results.monthlyContribution.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Employer Match:</span>
                    <span className="font-semibold text-green-600">${results.monthlyEmployerMatch.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Annual Tax Savings:</span>
                    <span className="font-semibold text-orange-600">${results.annualTaxSavings.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total at Retirement:</span>
                    <span className="font-semibold text-blue-600 text-xl">${results.totalAtRetirement.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Your Total Contributions:</span>
                    <span className="font-semibold text-purple-600">${results.totalContributions.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Employer Match:</span>
                    <span className="font-semibold text-green-600">${results.totalEmployerMatch.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Investment Growth:</span>
                    <span className="font-semibold text-indigo-600">${results.totalGrowth.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Real Value (Today's $):</span>
                    <span className="font-semibold text-red-600">${results.realValueAtRetirement.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Monthly Retirement Income:</span>
                    <span className="font-bold text-green-600 text-xl">${results.monthlyRetirementIncome.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Income Replacement:</span>
                    <span className="font-bold text-blue-600 text-xl">{results.replacementRatio}%</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Retirement Summary</h4>
                  <p className="text-sm text-green-800">
                    Contributing {formData.employeeContributionPercent}% of your ${formData.currentSalary.toLocaleString()} salary with {formData.employerMatchPercent}% employer match will grow to ${results.totalAtRetirement.toLocaleString()} by age {formData.retirementAge}.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">2025 Contribution Limits</h4>
                  <p className="text-sm text-blue-800">
                    Employee limit: ${contributionLimits.employee.toLocaleString()}{formData.currentAge >= 50 ? ` + $${contributionLimits.catchUp.toLocaleString()} catch-up` : ''} | Total limit: ${contributionLimits.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* 401k Benefits */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">401k Benefits & Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Tax Benefits</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">${results.annualTaxSavings.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Annual tax savings</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Employer Match</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">${results.totalEmployerMatch.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Free money from employer</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Compound Growth</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">${results.totalGrowth.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Investment growth over time</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Contribution Limit</h4>
                  <div className="text-2xl font-bold text-orange-600 mb-2">${contributionLimits.employee.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">2025 employee limit</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Employer Matching</h4>
                <p className="text-gray-600 text-sm">Calculate employer match contributions and maximize free money</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax Benefits</h4>
                <p className="text-gray-600 text-sm">Traditional and Roth 401k options with current tax savings</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Retirement Planning</h4>
                <p className="text-gray-600 text-sm">Project retirement income and replacement ratio for planning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}