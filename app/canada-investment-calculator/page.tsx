'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function CanadaInvestmentCalculator() {
  type AccountType = 'tfsa' | 'rrsp' | 'non-registered' | 'resp' | 'fhsa';

  const [formData, setFormData] = useState({
    initialInvestment: 25000,
    monthlyContribution: 500,
    annualReturn: 7,
    investmentPeriod: 25,
    accountType: 'tfsa' as AccountType,
    currentAge: 30,
    retirementAge: 65,
    annualIncome: 70000,
    marginalTaxRate: 35,
    province: 'ontario'
  });

  const [results, setResults] = useState({
    futureValue: 0,
    totalContributions: 0,
    totalGrowth: 0,
    taxSavings: 0,
    monthlyRetirementIncome: 0,
    contributionRoom: 0,
    realValue: 0,
    rrspDeduction: 0
  });

  const accountTypes = {
    'tfsa': 'Tax-Free Savings Account (TFSA)',
    'rrsp': 'Registered Retirement Savings Plan (RRSP)',
    'non-registered': 'Non-Registered Investment Account',
    'resp': 'Registered Education Savings Plan (RESP)',
    'fhsa': 'First Home Savings Account (FHSA)'
  };

  const provinces = {
    'alberta': 'Alberta',
    'british-columbia': 'British Columbia',
    'manitoba': 'Manitoba',
    'new-brunswick': 'New Brunswick',
    'newfoundland': 'Newfoundland and Labrador',
    'northwest-territories': 'Northwest Territories',
    'nova-scotia': 'Nova Scotia',
    'nunavut': 'Nunavut',
    'ontario': 'Ontario',
    'prince-edward-island': 'Prince Edward Island',
    'quebec': 'Quebec',
    'saskatchewan': 'Saskatchewan',
    'yukon': 'Yukon'
  };

  // 2025 contribution limits and room calculations
  const contributionLimits = {
    tfsa: {
      annual: 7000, // 2025 limit
      totalRoom: function(age: number) {
        // TFSA room accumulates from age 18, starting 2009
        const startYear = Math.max(2009, 2025 - (age - 18));
        const yearsEligible = 2025 - startYear + 1;
        return Math.min(yearsEligible * 7000, 95000); // Approximate total room
      }
    },
    rrsp: {
      maxContribution: function(income: number) {
        return Math.min(income * 0.18, 31560); // 2025 limit
      }
    },
    resp: {
      annual: 50000, // No annual limit, but CESG considerations
      lifetime: 50000,
      cesg: 0.20 // 20% government grant up to $500/year
    },
    fhsa: {
      annual: 8000,
      lifetime: 40000
    }
  };

  const calculateInvestment = () => {
    const {
      initialInvestment,
      monthlyContribution,
      annualReturn,
      investmentPeriod,
      accountType,
      currentAge,
      annualIncome,
      marginalTaxRate
    } = formData;

    const monthlyRate = (annualReturn / 100) / 12;
    const totalMonths = investmentPeriod * 12;

    // Future value calculation with compound interest
    let futureValue = 0;
    let currentBalance = initialInvestment;
    
    // Calculate month by month to account for monthly contributions
    for (let month = 0; month < totalMonths; month++) {
      currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
    }
    
    futureValue = currentBalance;
    
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    const totalGrowth = futureValue - totalContributions;

    // Account-specific calculations
    let taxSavings = 0;
    let contributionRoom = 0;
    let rrspDeduction = 0;

    switch (accountType) {
      case 'tfsa':
        contributionRoom = contributionLimits.tfsa.totalRoom(currentAge);
        break;
      case 'rrsp':
        rrspDeduction = contributionLimits.rrsp.maxContribution(annualIncome);
        taxSavings = rrspDeduction * (marginalTaxRate / 100);
        contributionRoom = rrspDeduction;
        break;
      case 'resp':
        const annualContrib = Math.min(monthlyContribution * 12, 2500); // CESG eligible amount
        taxSavings = annualContrib * contributionLimits.resp.cesg * investmentPeriod; // Total CESG
        contributionRoom = contributionLimits.resp.lifetime;
        break;
      case 'fhsa':
        contributionRoom = contributionLimits.fhsa.lifetime;
        const fhsaDeduction = Math.min(monthlyContribution * 12, contributionLimits.fhsa.annual);
        taxSavings = fhsaDeduction * (marginalTaxRate / 100) * investmentPeriod;
        break;
    }

    // Calculate inflation-adjusted value (assume 2.5% inflation)
    const inflationRate = 0.025;
    const realValue = futureValue / Math.pow(1 + inflationRate, investmentPeriod);

    // Monthly retirement income (4% withdrawal rule)
    const monthlyRetirementIncome = (futureValue * 0.04) / 12;

    setResults({
      futureValue: Math.round(futureValue),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      taxSavings: Math.round(taxSavings),
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome),
      contributionRoom: Math.round(contributionRoom),
      realValue: Math.round(realValue),
      rrspDeduction: Math.round(rrspDeduction)
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['initialInvestment', 'monthlyContribution', 'annualIncome', 'currentAge', 'retirementAge'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['annualReturn', 'investmentPeriod', 'marginalTaxRate'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateInvestment();
  }, [formData]);

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇨🇦 Investment Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Canada Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate TFSA, RRSP, RESP, and FHSA investment returns with Canadian tax benefits and contribution limits.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Canada Investment & Retirement Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate returns for TFSA, RRSP, RESP, and other Canadian registered accounts</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Account Type
                  </label>
                  <select 
                    value={formData.accountType}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(accountTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment (CAD $)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.initialInvestment}
                      onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                      placeholder="25000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution (CAD $)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      placeholder="500"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
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
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={formData.investmentPeriod}
                      onChange={(e) => handleInputChange('investmentPeriod', e.target.value)}
                      placeholder="25"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
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
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income (CAD $)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                      placeholder="70000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marginal Tax Rate (%)
                    </label>
                    <select 
                      value={formData.marginalTaxRate}
                      onChange={(e) => handleInputChange('marginalTaxRate', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      <option value={20}>20% - Lower Income</option>
                      <option value={30}>30% - Middle Income</option>
                      <option value={35}>35% - Upper Middle Income</option>
                      <option value={43}>43% - High Income</option>
                      <option value={53}>53% - Top Income Bracket</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province/Territory
                    </label>
                    <select 
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      {Object.entries(provinces).map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Projection Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Account Type:</span>
                    <span className="font-semibold text-black text-sm">{accountTypes[formData.accountType]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Investment Period:</span>
                    <span className="font-semibold text-black">{formData.investmentPeriod} years</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Contributions:</span>
                    <span className="font-semibold text-blue-600">CAD ${results.totalContributions.toLocaleString()}</span>
                  </div>

                  {results.contributionRoom > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">
                        {formData.accountType === 'rrsp' ? 'Annual RRSP Room:' : 'Contribution Room:'}
                      </span>
                      <span className="font-semibold text-purple-600">CAD ${results.contributionRoom.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Investment Growth:</span>
                    <span className="font-semibold text-green-600">CAD ${results.totalGrowth.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Future Value:</span>
                    <span className="font-semibold text-red-600 text-xl">CAD ${results.futureValue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Real Value (Today's $):</span>
                    <span className="font-semibold text-orange-600">CAD ${results.realValue.toLocaleString()}</span>
                  </div>

                  {results.taxSavings > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">
                        {formData.accountType === 'resp' ? 'Total CESG Grants:' : 'Tax Savings:'}
                      </span>
                      <span className="font-semibold text-green-600">CAD ${results.taxSavings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Monthly Retirement Income:</span>
                    <span className="font-bold text-blue-600 text-xl">CAD ${results.monthlyRetirementIncome.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Investment Summary</h4>
                  <p className="text-sm text-green-800">
                    Investing CAD ${formData.monthlyContribution.toLocaleString()}/month in a {accountTypes[formData.accountType].toLowerCase()} for {formData.investmentPeriod} years will grow to CAD ${results.futureValue.toLocaleString()}.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Account Benefits</h4>
                  <p className="text-sm text-blue-800">
                    {formData.accountType === 'tfsa' && 'Tax-free growth and withdrawals. Contribution room resets each year.'}
                    {formData.accountType === 'rrsp' && `Tax deduction of CAD $${results.rrspDeduction.toLocaleString()} annually. Taxed on withdrawal.`}
                    {formData.accountType === 'resp' && `20% government grant (CESG) up to $500/year. Tax-free growth for education.`}
                    {formData.accountType === 'fhsa' && 'Tax deduction like RRSP, tax-free withdrawal like TFSA for first home.'}
                    {formData.accountType === 'non-registered' && 'No contribution limits. Capital gains and dividends may be taxed.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Canadian Investment Accounts */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">2025 Canadian Investment Account Limits</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">TFSA</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">$7,000</div>
                  <p className="text-sm text-gray-600">Annual contribution limit</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">RRSP</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">$31,560</div>
                  <p className="text-sm text-gray-600">Maximum annual contribution</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">RESP</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">20%</div>
                  <p className="text-sm text-gray-600">CESG government grant</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">FHSA</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">$8,000</div>
                  <p className="text-sm text-gray-600">Annual contribution limit</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇨🇦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Canadian Registered Accounts</h4>
                <p className="text-gray-600 text-sm">TFSA, RRSP, RESP, FHSA with 2025 contribution limits and tax benefits</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax Optimization</h4>
                <p className="text-gray-600 text-sm">Calculate tax savings, deductions, and government grants for each account type</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Retirement Planning</h4>
                <p className="text-gray-600 text-sm">Project retirement income and real purchasing power with inflation adjustments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}