'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

type CitizenshipType = 'citizen' | 'pr' | 'pr-first-year' | 'pr-second-year';

export default function SingaporeCPFCalculator() {
  const [formData, setFormData] = useState({
    monthlyWage: 5000,
    currentAge: 30,
    retirementAge: 65,
    citizenship: 'citizen' as CitizenshipType,
    currentOA: 50000,
    currentSA: 20000,
    currentMA: 15000,
    additionalOA: 500,
    additionalSA: 300,
    expectedReturn: 4.0
  });

  const [results, setResults] = useState({
    employeeContribution: 0,
    employerContribution: 0,
    totalMonthlyContribution: 0,
    oaContribution: 0,
    saContribution: 0,
    maContribution: 0,
    futureOA: 0,
    futureSA: 0,
    futureMA: 0,
    totalCPF: 0,
    retirementSum: 0,
    monthlyPayout: 0,
    basicRetirementSum: 0,
    enhancedRetirementSum: 0
  });

  const citizenshipTypes: Record<CitizenshipType, string> = {
    'citizen': 'Singapore Citizen',
    'pr': 'Permanent Resident',
    'pr-first-year': 'PR (First Year)',
    'pr-second-year': 'PR (Second Year)'
  };

  // 2025 CPF contribution rates
  const getContributionRates = (age: number, citizenship: CitizenshipType) => {
    let employeeRate = 0;
    let employerRate = 0;

    // Employee contribution rates by age and citizenship
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

  // CPF allocation rates by age
  const getAllocationRates = (age: number) => {
    if (age <= 35) {
      return { oa: 62, sa: 6, ma: 32 }; // % of total contribution
    } else if (age <= 45) {
      return { oa: 60, sa: 8, ma: 32 };
    } else if (age <= 50) {
      return { oa: 56, sa: 12, ma: 32 };
    } else if (age <= 55) {
      return { oa: 54, sa: 14, ma: 32 };
    } else if (age <= 60) {
      return { oa: 28, sa: 40, ma: 32 };
    } else if (age <= 65) {
      return { oa: 12.5, sa: 55.5, ma: 32 };
    } else {
      return { oa: 10, sa: 58, ma: 32 };
    }
  };

  const calculateCPF = () => {
    const {
      monthlyWage,
      currentAge,
      retirementAge,
      citizenship,
      currentOA,
      currentSA,
      currentMA,
      additionalOA,
      additionalSA,
      expectedReturn
    } = formData;

    // Calculate current contributions
    const rates = getContributionRates(currentAge, citizenship);
    const contributionCap = 6000; // Monthly wage cap for CPF
    const effectiveWage = Math.min(monthlyWage, contributionCap);

    const employeeContribution = (effectiveWage * rates.employeeRate) / 100;
    const employerContribution = (effectiveWage * rates.employerRate) / 100;
    const totalMonthlyContribution = employeeContribution + employerContribution;

    // Allocate contributions to accounts
    const allocation = getAllocationRates(currentAge);
    const oaContribution = (totalMonthlyContribution * allocation.oa) / 100;
    const saContribution = (totalMonthlyContribution * allocation.sa) / 100;
    const maContribution = (totalMonthlyContribution * allocation.ma) / 100;

    // Calculate future values
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;

    // OA earns 2.5% base + up to 1% extra on first S$60,000
    const oaRate = 0.025; // 2.5%
    const saRate = 0.04; // 4% for SA
    const maRate = 0.04; // 4% for MA

    // Future value calculations with compound interest
    const futureOA = calculateFutureValue(currentOA, oaContribution + additionalOA, oaRate, monthsToRetirement);
    const futureSA = calculateFutureValue(currentSA, saContribution + additionalSA, saRate, monthsToRetirement);
    const futureMA = calculateFutureValue(currentMA, maContribution, maRate, monthsToRetirement);

    const totalCPF = futureOA + futureSA + futureMA;

    // 2025 Retirement sums (estimates)
    const basicRetirementSum = 198800; // BRS
    const enhancedRetirementSum = 298200; // ERS

    // Calculate retirement income
    const retirementSum = Math.min(futureSA + futureOA, enhancedRetirementSum);
    const monthlyPayout = calculateCPFLifePayout(retirementSum, retirementAge);

    setResults({
      employeeContribution: Math.round(employeeContribution),
      employerContribution: Math.round(employerContribution),
      totalMonthlyContribution: Math.round(totalMonthlyContribution),
      oaContribution: Math.round(oaContribution),
      saContribution: Math.round(saContribution),
      maContribution: Math.round(maContribution),
      futureOA: Math.round(futureOA),
      futureSA: Math.round(futureSA),
      futureMA: Math.round(futureMA),
      totalCPF: Math.round(totalCPF),
      retirementSum: Math.round(retirementSum),
      monthlyPayout: Math.round(monthlyPayout),
      basicRetirementSum,
      enhancedRetirementSum
    });
  };

  const calculateFutureValue = (present: number, monthlyPayment: number, annualRate: number, months: number) => {
    const monthlyRate = annualRate / 12;
    const futureValue = present * Math.pow(1 + monthlyRate, months) +
      monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return futureValue;
  };

  const calculateCPFLifePayout = (retirementSum: number, startAge: number) => {
    // Simplified CPF LIFE calculation
    // Actual calculation is more complex and depends on cohort
    const lifeExpectancy = 85;
    const payoutYears = lifeExpectancy - startAge;
    const annualPayout = retirementSum / payoutYears;
    return annualPayout / 12;
  };

  const handleInputChange = (field: string, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['monthlyWage', 'currentOA', 'currentSA', 'currentMA', 'additionalOA', 'additionalSA', 'currentAge', 'retirementAge'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['expectedReturn'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateCPF();
  }, [formData]);

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇸🇬 CPF Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Singapore CPF Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate CPF contributions, employer matching, and retirement projections with 2025 rates and CPF LIFE payouts.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Singapore CPF Contribution Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate CPF contributions across OA, SA, and MA accounts with retirement planning</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Wage (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.monthlyWage}
                      onChange={(e) => handleInputChange('monthlyWage', e.target.value)}
                      placeholder="5000"
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
                      Retirement Age
                    </label>
                    <select 
                      value={formData.retirementAge}
                      onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    >
                      <option value={62}>62 Years</option>
                      <option value={63}>63 Years</option>
                      <option value={64}>64 Years</option>
                      <option value={65}>65 Years</option>
                      <option value={66}>66 Years</option>
                      <option value={67}>67 Years</option>
                      <option value={68}>68 Years</option>
                      <option value={69}>69 Years</option>
                      <option value={70}>70 Years</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current OA Balance (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.currentOA}
                      onChange={(e) => handleInputChange('currentOA', e.target.value)}
                      placeholder="50000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current SA Balance (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.currentSA}
                      onChange={(e) => handleInputChange('currentSA', e.target.value)}
                      placeholder="20000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current MA Balance (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.currentMA}
                      onChange={(e) => handleInputChange('currentMA', e.target.value)}
                      placeholder="15000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Monthly OA Top-up (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.additionalOA}
                      onChange={(e) => handleInputChange('additionalOA', e.target.value)}
                      placeholder="500"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Monthly SA Top-up (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.additionalSA}
                      onChange={(e) => handleInputChange('additionalSA', e.target.value)}
                      placeholder="300"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">CPF Projection Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Citizenship Status:</span>
                    <span className="font-semibold text-black text-sm">{citizenshipTypes[formData.citizenship]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Employee Contribution:</span>
                    <span className="font-semibold text-blue-600">S$ {results.employeeContribution.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Employer Contribution:</span>
                    <span className="font-semibold text-green-600">S$ {results.employerContribution.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Monthly CPF:</span>
                    <span className="font-semibold text-red-600 text-xl">S$ {results.totalMonthlyContribution.toLocaleString()}</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-2">Monthly Allocation</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">OA (Ordinary Account):</span>
                      <span className="font-semibold text-blue-600">S$ {results.oaContribution.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SA (Special Account):</span>
                      <span className="font-semibold text-green-600">S$ {results.saContribution.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">MA (Medisave Account):</span>
                      <span className="font-semibold text-purple-600">S$ {results.maContribution.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Future OA Balance:</span>
                    <span className="font-semibold text-blue-600">S$ {results.futureOA.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Future SA Balance:</span>
                    <span className="font-semibold text-green-600">S$ {results.futureSA.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Future MA Balance:</span>
                    <span className="font-semibold text-purple-600">S$ {results.futureMA.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total CPF at {formData.retirementAge}:</span>
                    <span className="font-bold text-red-600 text-xl">S$ {results.totalCPF.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Monthly CPF LIFE Payout:</span>
                    <span className="font-bold text-green-600 text-xl">S$ {results.monthlyPayout.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">CPF Summary</h4>
                  <p className="text-sm text-blue-800">
                    Contributing S$ {results.totalMonthlyContribution.toLocaleString()}/month until age {formData.retirementAge} will result in S$ {results.totalCPF.toLocaleString()} total CPF savings.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Retirement Sums (2025)</h4>
                  <div className="space-y-1 text-sm text-yellow-800">
                    <div className="flex justify-between">
                      <span>Basic Retirement Sum:</span>
                      <span>S$ {results.basicRetirementSum.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enhanced Retirement Sum:</span>
                      <span>S$ {results.enhancedRetirementSum.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CPF Account Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">CPF Account Information</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Ordinary Account (OA)</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">2.5%</div>
                  <p className="text-sm text-gray-600">Housing, education, investments</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Special Account (SA)</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">4.0%</div>
                  <p className="text-sm text-gray-600">Retirement and approved investments</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Medisave Account (MA)</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">4.0%</div>
                  <p className="text-sm text-gray-600">Healthcare expenses</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇸🇬</div>
                <h4 className="font-semibold text-gray-900 mb-2">Singapore CPF System</h4>
                <p className="text-gray-600 text-sm">Comprehensive retirement planning with OA, SA, and MA accounts</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Employer Matching</h4>
                <p className="text-gray-600 text-sm">Up to 17% employer contribution based on age and citizenship</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">CPF LIFE</h4>
                <p className="text-gray-600 text-sm">Lifelong monthly payouts starting from retirement age</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}