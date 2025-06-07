'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

type InvestmentType = 'sgx-stocks' | 'sgx-reits' | 'cpf-oa' | 'cpf-sa' | 'srs' | 'bonds' | 'etfs' | 'unit-trusts';

export default function SingaporeInvestmentCalculator() {
  const [formData, setFormData] = useState({
    initialInvestment: 50000,
    monthlyContribution: 2000,
    investmentPeriod: 15,
    investmentType: 'sgx-stocks' as InvestmentType,
    expectedReturn: 8.0,
    currentAge: 35,
    retirementAge: 65,
    taxRate: 0, // Singapore has no capital gains tax
    inflationRate: 2.5,
    cpfContribution: 1000,
    srsContribution: 500
  });

  const [results, setResults] = useState({
    futureValue: 0,
    totalContributions: 0,
    totalGrowth: 0,
    realValue: 0,
    monthlyRetirementIncome: 0,
    taxSavings: 0,
    cpfProjection: 0,
    srsProjection: 0,
    totalPortfolio: 0
  });

  const investmentTypes: Record<InvestmentType, string> = {
    'sgx-stocks': 'SGX Stocks',
    'sgx-reits': 'Singapore REITs',
    'cpf-oa': 'CPF Ordinary Account',
    'cpf-sa': 'CPF Special Account',
    'srs': 'Supplementary Retirement Scheme',
    'bonds': 'Singapore Government Bonds',
    'etfs': 'SGX ETFs',
    'unit-trusts': 'Unit Trusts'
  };

  const calculateInvestment = () => {
    const {
      initialInvestment,
      monthlyContribution,
      investmentPeriod,
      investmentType,
      expectedReturn,
      inflationRate,
      cpfContribution,
      srsContribution
    } = formData;

    // Adjust expected returns based on investment type
    let adjustedReturn = expectedReturn;
    switch (investmentType) {
      case 'cpf-oa':
        adjustedReturn = 2.5; // CPF OA interest rate
        break;
      case 'cpf-sa':
        adjustedReturn = 4.0; // CPF SA interest rate
        break;
      case 'bonds':
        adjustedReturn = 3.5; // Singapore government bonds
        break;
      case 'sgx-reits':
        adjustedReturn = 7.0; // REITs historical average
        break;
      case 'sgx-stocks':
        adjustedReturn = 8.0; // SGX historical average
        break;
      case 'etfs':
        adjustedReturn = 7.5; // ETFs average
        break;
      case 'unit-trusts':
        adjustedReturn = 6.5; // Unit trusts average
        break;
      case 'srs':
        adjustedReturn = 6.0; // SRS investments average
        break;
    }

    const monthlyReturn = (adjustedReturn / 100) / 12;
    const totalMonths = investmentPeriod * 12;

    // Future value calculation with compound interest
    let futureValue = 0;
    let currentBalance = initialInvestment;
    
    // Calculate month by month
    for (let month = 0; month < totalMonths; month++) {
      currentBalance = currentBalance * (1 + monthlyReturn) + monthlyContribution;
    }
    
    futureValue = currentBalance;
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    const totalGrowth = futureValue - totalContributions;

    // Calculate inflation-adjusted value
    const realValue = futureValue / Math.pow(1 + (inflationRate / 100), investmentPeriod);

    // Calculate tax savings for SRS
    let taxSavings = 0;
    if (investmentType === 'srs') {
      // SRS contributions are tax-deductible up to S$15,300 for residents
      const annualSRSContribution = Math.min(srsContribution * 12, 15300);
      const marginalTaxRate = 0.15; // Assume 15% marginal tax rate
      taxSavings = annualSRSContribution * marginalTaxRate * investmentPeriod;
    }

    // Calculate CPF projections
    const cpfOAReturn = 0.025; // 2.5%
    const cpfSAReturn = 0.04; // 4.0%
    const cpfMonthlyReturn = (investmentType === 'cpf-sa' ? cpfSAReturn : cpfOAReturn) / 12;
    
    let cpfProjection = 0;
    if (cpfContribution > 0) {
      let cpfBalance = 0;
      for (let month = 0; month < totalMonths; month++) {
        cpfBalance = cpfBalance * (1 + cpfMonthlyReturn) + cpfContribution;
      }
      cpfProjection = cpfBalance;
    }

    // Calculate SRS projections
    const srsReturn = 0.06; // 6% average
    const srsMonthlyReturn = srsReturn / 12;
    
    let srsProjection = 0;
    if (srsContribution > 0) {
      let srsBalance = 0;
      for (let month = 0; month < totalMonths; month++) {
        srsBalance = srsBalance * (1 + srsMonthlyReturn) + srsContribution;
      }
      srsProjection = srsBalance;
    }

    // Total portfolio
    const totalPortfolio = futureValue + cpfProjection + srsProjection;

    // Monthly retirement income (4% withdrawal rule)
    const monthlyRetirementIncome = (totalPortfolio * 0.04) / 12;

    setResults({
      futureValue: Math.round(futureValue),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      realValue: Math.round(realValue),
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome),
      taxSavings: Math.round(taxSavings),
      cpfProjection: Math.round(cpfProjection),
      srsProjection: Math.round(srsProjection),
      totalPortfolio: Math.round(totalPortfolio)
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['initialInvestment', 'monthlyContribution', 'currentAge', 'retirementAge', 'cpfContribution', 'srsContribution'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['investmentPeriod', 'expectedReturn', 'inflationRate', 'taxRate'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }

    // Auto-adjust expected returns when investment type changes
    if (field === 'investmentType') {
      const returnRates: Record<InvestmentType, number> = {
        'cpf-oa': 2.5,
        'cpf-sa': 4.0,
        'bonds': 3.5,
        'sgx-reits': 7.0,
        'sgx-stocks': 8.0,
        'etfs': 7.5,
        'unit-trusts': 6.5,
        'srs': 6.0
      };
      
      const newFormData = { ...formData, [field]: value as InvestmentType };
      if (returnRates[value as InvestmentType]) {
        newFormData.expectedReturn = returnRates[value as InvestmentType];
      }
      setFormData(newFormData);
      return;
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
                <span className="text-white/90 font-medium text-sm tracking-wide">🇸🇬 Investment Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Singapore Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate returns on SGX stocks, REITs, CPF accounts, SRS, and other Singapore investment options with tax benefits.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Singapore Investment & Retirement Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate returns for SGX investments, CPF, SRS, and retirement planning</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Type
                  </label>
                  <select 
                    value={formData.investmentType}
                    onChange={(e) => handleInputChange('investmentType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(investmentTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.initialInvestment}
                      onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                      placeholder="50000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution (S$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      placeholder="2000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
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
                      value={formData.expectedReturn}
                      onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                      placeholder="8.0"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
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
                      placeholder="15"
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
                      placeholder="35"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
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
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Retirement Contributions</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly CPF Top-up (S$)
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.cpfContribution}
                        onChange={(e) => handleInputChange('cpfContribution', e.target.value)}
                        placeholder="1000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly SRS Contribution (S$)
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.srsContribution}
                        onChange={(e) => handleInputChange('srsContribution', e.target.value)}
                        placeholder="500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    SRS contributions are tax-deductible up to S$15,300/year for residents
                  </p>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Projection Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Investment Type:</span>
                    <span className="font-semibold text-black text-sm">{investmentTypes[formData.investmentType]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Expected Return:</span>
                    <span className="font-semibold text-black">{formData.expectedReturn}% p.a.</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Invested:</span>
                    <span className="font-semibold text-blue-600">S$ {results.totalContributions.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Investment Growth:</span>
                    <span className="font-semibold text-green-600">S$ {results.totalGrowth.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Future Value:</span>
                    <span className="font-semibold text-red-600 text-xl">S$ {results.futureValue.toLocaleString()}</span>
                  </div>

                  {results.cpfProjection > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">CPF Projection:</span>
                      <span className="font-semibold text-purple-600">S$ {results.cpfProjection.toLocaleString()}</span>
                    </div>
                  )}

                  {results.srsProjection > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">SRS Projection:</span>
                      <span className="font-semibold text-orange-600">S$ {results.srsProjection.toLocaleString()}</span>
                    </div>
                  )}

                  {results.taxSavings > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Tax Savings (SRS):</span>
                      <span className="font-semibold text-green-600">S$ {results.taxSavings.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Real Value (Today's S$):</span>
                    <span className="font-semibold text-indigo-600">S$ {results.realValue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Portfolio:</span>
                    <span className="font-bold text-red-600 text-xl">S$ {results.totalPortfolio.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Monthly Retirement Income:</span>
                    <span className="font-bold text-green-600 text-xl">S$ {results.monthlyRetirementIncome.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Investment Summary</h4>
                  <p className="text-sm text-blue-800">
                    Investing S$ {formData.monthlyContribution.toLocaleString()}/month in {investmentTypes[formData.investmentType].toLowerCase()} for {formData.investmentPeriod} years will grow to S$ {results.totalPortfolio.toLocaleString()}.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Investment Characteristics</h4>
                  <p className="text-sm text-yellow-800">
                    {formData.investmentType === 'sgx-stocks' && 'SGX stocks offer growth potential with dividends. No capital gains tax in Singapore.'}
                    {formData.investmentType === 'sgx-reits' && 'Singapore REITs provide regular distributions and are tax-transparent for individuals.'}
                    {formData.investmentType === 'cpf-oa' && 'CPF OA earns 2.5% guaranteed, can be used for housing and approved investments.'}
                    {formData.investmentType === 'cpf-sa' && 'CPF SA earns 4% guaranteed, dedicated for retirement with higher returns.'}
                    {formData.investmentType === 'srs' && 'SRS offers tax benefits now, taxed at withdrawal but only 50% is taxable.'}
                    {formData.investmentType === 'bonds' && 'Singapore government bonds offer capital preservation with modest returns.'}
                    {formData.investmentType === 'etfs' && 'ETFs provide diversification with low fees, tracking various indices.'}
                    {formData.investmentType === 'unit-trusts' && 'Unit trusts offer professional management with varying risk levels.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Singapore Investment Options */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Singapore Investment Options</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">SGX Stocks</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">8.0%</div>
                  <p className="text-sm text-gray-600">Historical average return</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Singapore REITs</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">7.0%</div>
                  <p className="text-sm text-gray-600">Income + capital growth</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">CPF SA</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">4.0%</div>
                  <p className="text-sm text-gray-600">Guaranteed government rate</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">SRS</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">Tax Deferred</div>
                  <p className="text-sm text-gray-600">Up to S$15,300/year</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇸🇬</div>
                <h4 className="font-semibold text-gray-900 mb-2">Singapore Investments</h4>
                <p className="text-gray-600 text-small">SGX stocks, REITs, bonds, ETFs with no capital gains tax</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax Optimization</h4>
                <p className="text-gray-600 text-sm">CPF top-ups and SRS contributions for tax efficiency</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Retirement Planning</h4>
                <p className="text-gray-600 text-sm">Comprehensive portfolio including CPF, SRS, and private investments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}