'use client';

import React, { useState, useEffect } from 'react';

type CitizenshipType = 'citizen' | 'pr' | 'pr-first-year' | 'pr-second-year';

export default function SingaporeSalaryCalculatorClient() {
  const [formData, setFormData] = useState({
    annualSalary: 60000,
    currentAge: 30,
    citizenship: 'citizen' as CitizenshipType,
    bonusAmount: 12000,
    personalRelief: 4000,
    earnedIncomeRelief: 1000,
    otherReliefs: 0,
    calculationType: 'annual' // 'annual' or 'monthly'
  });

  const [results, setResults] = useState({
    grossSalary: 0,
    employeeCPF: 0,
    employerCPF: 0,
    totalCPF: 0,
    taxableIncome: 0,
    incomeTax: 0,
    netSalary: 0,
    takeHomePay: 0,
    effectiveTaxRate: 0,
    marginalTaxRate: 0,
    monthlyTakeHome: 0,
    totalReliefs: 0
  });

  const citizenshipTypes: Record<CitizenshipType, string> = {
    'citizen': 'Singapore Citizen',
    'pr': 'Permanent Resident',
    'pr-first-year': 'PR (First Year)',
    'pr-second-year': 'PR (Second Year)'
  };

  // CPF contribution rates based on age and citizenship
  const getCPFRates = (age: number, citizenship: CitizenshipType) => {
    let employeeRate = 0;
    let employerRate = 0;

    if (citizenship === 'citizen' || citizenship === 'pr') {
      if (age <= 35) {
        employeeRate = 20;
        employerRate = 17;
      } else if (age <= 45) {
        employeeRate = 20;
        employerRate = 17;
      } else if (age <= 50) {
        employeeRate = 20;
        employerRate = 17;
      } else if (age <= 55) {
        employeeRate = 20;
        employerRate = 17;
      } else if (age <= 60) {
        employeeRate = 13;
        employerRate = 12;
      } else if (age <= 65) {
        employeeRate = 7.5;
        employerRate = 8.5;
      } else {
        employeeRate = 5;
        employerRate = 7.5;
      }
    } else if (citizenship === 'pr-first-year') {
      employeeRate = 5;
      employerRate = 4;
    } else if (citizenship === 'pr-second-year') {
      employeeRate = 15;
      employerRate = 12;
    }

    return { employeeRate, employerRate };
  };

  // Singapore income tax calculation based on 2025 tax brackets
  const calculateIncomeTax = (taxableIncome: number): number => {
    const taxBrackets = [
      { min: 0, max: 20000, rate: 0 },
      { min: 20000, max: 30000, rate: 0.02 },
      { min: 30000, max: 40000, rate: 0.035 },
      { min: 40000, max: 80000, rate: 0.07 },
      { min: 80000, max: 120000, rate: 0.115 },
      { min: 120000, max: 160000, rate: 0.15 },
      { min: 160000, max: 200000, rate: 0.18 },
      { min: 200000, max: 240000, rate: 0.19 },
      { min: 240000, max: 280000, rate: 0.195 },
      { min: 280000, max: 320000, rate: 0.20 },
      { min: 320000, max: Infinity, rate: 0.22 }
    ];

    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of taxBrackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );

      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return tax;
  };

  // Calculate marginal tax rate
  const getMarginalTaxRate = (taxableIncome: number): number => {
    if (taxableIncome <= 20000) return 0;
    if (taxableIncome <= 30000) return 2;
    if (taxableIncome <= 40000) return 3.5;
    if (taxableIncome <= 80000) return 7;
    if (taxableIncome <= 120000) return 11.5;
    if (taxableIncome <= 160000) return 15;
    if (taxableIncome <= 200000) return 18;
    if (taxableIncome <= 240000) return 19;
    if (taxableIncome <= 280000) return 19.5;
    if (taxableIncome <= 320000) return 20;
    return 22;
  };

  const calculateSalary = () => {
    const {
      annualSalary,
      currentAge,
      citizenship,
      bonusAmount,
      personalRelief,
      earnedIncomeRelief,
      otherReliefs
    } = formData;

    const grossSalary = annualSalary + bonusAmount;
    const monthlySalary = annualSalary / 12;

    // CPF calculations
    const cpfRates = getCPFRates(currentAge, citizenship);
    const cpfCap = 6000; // Monthly CPF contribution cap
    const effectiveMonthlySalary = Math.min(monthlySalary, cpfCap);

    const monthlyEmployeeCPF = (effectiveMonthlySalary * cpfRates.employeeRate) / 100;
    const monthlyEmployerCPF = (effectiveMonthlySalary * cpfRates.employerRate) / 100;

    // Annual CPF (including bonus)
    const bonusCPFEmployee = Math.min(bonusAmount, cpfCap * 12 - annualSalary) > 0 ? 
      (Math.min(bonusAmount, Math.max(0, cpfCap * 12 - annualSalary)) * cpfRates.employeeRate) / 100 : 0;
    
    const employeeCPF = (monthlyEmployeeCPF * 12) + bonusCPFEmployee;
    const employerCPF = employeeCPF * (cpfRates.employerRate / cpfRates.employeeRate);
    const totalCPF = employeeCPF + employerCPF;

    // Tax calculations
    const totalReliefs = personalRelief + earnedIncomeRelief + otherReliefs + employeeCPF;
    const taxableIncome = Math.max(0, grossSalary - totalReliefs);
    const incomeTax = calculateIncomeTax(taxableIncome);

    // Net calculations
    const netSalary = grossSalary - employeeCPF - incomeTax;
    const takeHomePay = netSalary;
    const monthlyTakeHome = takeHomePay / 12;

    // Tax rates
    const effectiveTaxRate = grossSalary > 0 ? (incomeTax / grossSalary) * 100 : 0;
    const marginalTaxRate = getMarginalTaxRate(taxableIncome);

    setResults({
      grossSalary: Math.round(grossSalary),
      employeeCPF: Math.round(employeeCPF),
      employerCPF: Math.round(employerCPF),
      totalCPF: Math.round(totalCPF),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(incomeTax),
      netSalary: Math.round(netSalary),
      takeHomePay: Math.round(takeHomePay),
      effectiveTaxRate: Number(effectiveTaxRate.toFixed(2)),
      marginalTaxRate,
      monthlyTakeHome: Math.round(monthlyTakeHome),
      totalReliefs: Math.round(totalReliefs)
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['annualSalary', 'bonusAmount', 'personalRelief', 'earnedIncomeRelief', 'otherReliefs', 'currentAge'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateSalary();
  }, [formData]);

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Singapore Salary & Tax Calculator</h2>
          <p className="text-gray-600 text-lg">Calculate your take-home pay, CPF contributions, and income tax with 2025 rates</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Type
              </label>
              <select 
                value={formData.calculationType}
                onChange={(e) => handleInputChange('calculationType', e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
              >
                <option value="annual">Annual Salary</option>
                <option value="monthly">Monthly Salary</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.calculationType === 'annual' ? 'Annual Salary (S$)' : 'Monthly Salary (S$)'}
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.calculationType === 'annual' ? formData.annualSalary : Math.round(formData.annualSalary / 12)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    const annualValue = formData.calculationType === 'annual' ? value : value * 12;
                    handleInputChange('annualSalary', annualValue);
                  }}
                  placeholder={formData.calculationType === 'annual' ? '60000' : '5000'}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Bonus (S$)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.bonusAmount}
                  onChange={(e) => handleInputChange('bonusAmount', e.target.value)}
                  placeholder="12000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>
            </div>

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
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Citizenship Status
                </label>
                <select 
                  value={formData.citizenship}
                  onChange={(e) => handleInputChange('citizenship', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(citizenshipTypes).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Relief (Optional)</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Relief (S$)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.personalRelief}
                    onChange={(e) => handleInputChange('personalRelief', e.target.value)}
                    placeholder="4000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Earned Income Relief (S$)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.earnedIncomeRelief}
                    onChange={(e) => handleInputChange('earnedIncomeRelief', e.target.value)}
                    placeholder="1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Reliefs (S$)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.otherReliefs}
                  onChange={(e) => handleInputChange('otherReliefs', e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Parent relief, course fees, donations, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Salary Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Citizenship Status:</span>
                <span className="font-semibold text-black text-sm">{citizenshipTypes[formData.citizenship]}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Gross Annual Income:</span>
                <span className="font-semibold text-blue-600">S$ {results.grossSalary.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">CPF Employee (You Pay):</span>
                <span className="font-semibold text-red-600">S$ {results.employeeCPF.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">CPF Employer (Free Money):</span>
                <span className="font-semibold text-green-600">S$ {results.employerCPF.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Total Tax Reliefs:</span>
                <span className="font-semibold text-purple-600">S$ {results.totalReliefs.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Taxable Income:</span>
                <span className="font-semibold text-orange-600">S$ {results.taxableIncome.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Income Tax:</span>
                <span className="font-semibold text-red-600">S$ {results.incomeTax.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Net Annual Salary:</span>
                <span className="font-semibold text-green-600 text-xl">S$ {results.netSalary.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                <span className="text-gray-900 font-medium">Monthly Take-Home:</span>
                <span className="font-bold text-red-600 text-2xl">S$ {results.monthlyTakeHome.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-blue-600 mb-1">Effective Tax Rate</div>
                  <div className="text-xl font-bold text-blue-600">{results.effectiveTaxRate}%</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-purple-600 mb-1">Marginal Tax Rate</div>
                  <div className="text-xl font-bold text-purple-600">{results.marginalTaxRate}%</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Salary Summary</h4>
              <p className="text-sm text-green-800">
                From S$ {results.grossSalary.toLocaleString()} gross income, you take home S$ {results.monthlyTakeHome.toLocaleString()}/month after CPF and taxes, with S$ {results.employerCPF.toLocaleString()} additional employer CPF.
              </p>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Total Package Value</h4>
              <p className="text-sm text-yellow-800">
                Your total compensation including employer CPF is S$ {(results.grossSalary + results.employerCPF).toLocaleString()}/year, making your effective take-home rate {((results.netSalary / (results.grossSalary + results.employerCPF)) * 100).toFixed(1)}%.
              </p>
            </div>
          </div>
        </div>

        {/* Singapore Tax Information */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Singapore Tax & CPF Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">CPF Contribution</h4>
              <div className="text-2xl font-bold text-red-600 mb-2">Up to 37%</div>
              <p className="text-sm text-gray-600">Employee + Employer combined</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Tax-Free Threshold</h4>
              <div className="text-2xl font-bold text-green-600 mb-2">S$ 20,000</div>
              <p className="text-sm text-gray-600">First S$ 20,000 is tax-free</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Max Tax Rate</h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">22%</div>
              <p className="text-sm text-gray-600">Top marginal tax rate</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Personal Relief</h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">S$ 4,000</div>
              <p className="text-sm text-gray-600">Standard personal relief</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🇸🇬</div>
            <h4 className="font-semibold text-gray-900 mb-2">Singapore Tax System</h4>
            <p className="text-gray-600 text-sm">Progressive tax rates from 0% to 22% with generous reliefs and CPF benefits</p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="font-semibold text-gray-900 mb-2">CPF Retirement Savings</h4>
            <p className="text-gray-600 text-sm">Mandatory retirement savings with employer matching up to 17%</p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-semibold text-gray-900 mb-2">Complete Breakdown</h4>
            <p className="text-gray-600 text-sm">Detailed analysis of gross pay, deductions, taxes, and net take-home</p>
          </div>
        </div>
      </div>
    </div>
  );
}