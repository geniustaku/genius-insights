'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function USPropertyCalculator() {
  const [formData, setFormData] = useState({
    propertyPrice: 400000,
    downPayment: 80000,
    interestRate: 7.2,
    loanTerm: 30,
    monthlyRent: 2800,
    propertyTaxRate: 1.2,
    insurance: 1200,
    maintenance: 2000,
    vacancy: 5,
    propertyManagement: 8,
    state: 'california',
    propertyType: 'single-family'
  });

  const [results, setResults] = useState({
    monthlyMortgage: 0,
    totalMonthlyExpenses: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    rentalYield: 0,
    capRate: 0,
    totalCashNeeded: 0,
    roi: 0,
    breakEvenRent: 0
  });

  const stateNames: Record<string, string> = {
    'california': 'California',
    'texas': 'Texas',
    'florida': 'Florida',
    'new-york': 'New York',
    'pennsylvania': 'Pennsylvania',
    'illinois': 'Illinois',
    'ohio': 'Ohio',
    'georgia': 'Georgia',
    'north-carolina': 'North Carolina',
    'arizona': 'Arizona',
    'washington': 'Washington',
    'colorado': 'Colorado'
  };

  const propertyTypes: Record<string, string> = {
    'single-family': 'Single Family Home',
    'condo': 'Condominium',
    'townhouse': 'Townhouse',
    'duplex': 'Duplex',
    'multi-family': 'Multi-Family (3-4 units)',
    'apartment': 'Apartment Building (5+ units)'
  };

  const calculateProperty = () => {
    const {
      propertyPrice,
      downPayment,
      interestRate,
      loanTerm,
      monthlyRent,
      propertyTaxRate,
      insurance,
      maintenance,
      vacancy,
      propertyManagement
    } = formData;

    // Mortgage calculation
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyMortgage = loanAmount > 0 ? 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1) : 0;

    // Monthly expenses
    const monthlyPropertyTax = (propertyPrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyMaintenance = maintenance / 12;
    const vacancyLoss = monthlyRent * (vacancy / 100);
    const managementFee = monthlyRent * (propertyManagement / 100);

    const totalMonthlyExpenses = monthlyMortgage + monthlyPropertyTax + 
      monthlyInsurance + monthlyMaintenance + vacancyLoss + managementFee;

    // Cash flow and returns
    const effectiveRent = monthlyRent - vacancyLoss - managementFee;
    const monthlyCashFlow = effectiveRent - (monthlyMortgage + monthlyPropertyTax + 
      monthlyInsurance + monthlyMaintenance);
    const annualCashFlow = monthlyCashFlow * 12;

    // Investment metrics
    const annualRent = monthlyRent * 12;
    const rentalYield = (annualRent / propertyPrice) * 100;
    
    const annualExpensesNoMortgage = (monthlyPropertyTax + monthlyInsurance + 
      monthlyMaintenance + vacancyLoss + managementFee) * 12;
    const noi = annualRent - annualExpensesNoMortgage;
    const capRate = (noi / propertyPrice) * 100;

    // Closing costs estimate (3% of property price)
    const closingCosts = propertyPrice * 0.03;
    const totalCashNeeded = downPayment + closingCosts;

    const roi = totalCashNeeded > 0 ? (annualCashFlow / totalCashNeeded) * 100 : 0;

    // Break-even rent calculation
    const monthlyExpensesNoRent = monthlyMortgage + monthlyPropertyTax + 
      monthlyInsurance + monthlyMaintenance;
    const breakEvenRent = monthlyExpensesNoRent / (1 - (vacancy / 100) - (propertyManagement / 100));

    setResults({
      monthlyMortgage: Math.round(monthlyMortgage),
      totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
      monthlyCashFlow: Math.round(monthlyCashFlow),
      annualCashFlow: Math.round(annualCashFlow),
      rentalYield: Number(rentalYield.toFixed(2)),
      capRate: Number(capRate.toFixed(2)),
      totalCashNeeded: Math.round(totalCashNeeded),
      roi: Number(roi.toFixed(2)),
      breakEvenRent: Math.round(breakEvenRent)
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['propertyPrice', 'downPayment', 'monthlyRent', 'insurance', 'maintenance'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['interestRate', 'loanTerm', 'propertyTaxRate', 'vacancy', 'propertyManagement'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateProperty();
  }, [formData]);

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 Property Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                US Property Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate real estate investment returns, rental yield, cash flow, and property analysis across all US states.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">US Real Estate Investment Calculator</h2>
              <p className="text-gray-600 text-lg">Analyze property investments with comprehensive cash flow and ROI calculations</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Price ($)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.propertyPrice}
                      onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                      placeholder="400000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down Payment ($)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      placeholder="80000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      placeholder="7.2"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <select 
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    placeholder="2800"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.propertyTaxRate}
                      onChange={(e) => handleInputChange('propertyTaxRate', e.target.value)}
                      placeholder="1.2"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Insurance ($)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      placeholder="1200"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Maintenance ($)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.maintenance}
                    onChange={(e) => handleInputChange('maintenance', e.target.value)}
                    placeholder="2000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vacancy Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.vacancy}
                      onChange={(e) => handleInputChange('vacancy', e.target.value)}
                      placeholder="5"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Management (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.propertyManagement}
                      onChange={(e) => handleInputChange('propertyManagement', e.target.value)}
                      placeholder="8"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select 
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      {Object.entries(stateNames).map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select 
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      {Object.entries(propertyTypes).map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Analysis</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Property Price:</span>
                    <span className="font-semibold text-black">${formData.propertyPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Down Payment:</span>
                    <span className="font-semibold text-black">${formData.downPayment.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Cash Needed:</span>
                    <span className="font-semibold text-orange-600">${results.totalCashNeeded.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Mortgage:</span>
                    <span className="font-semibold text-red-600">${results.monthlyMortgage.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Rent:</span>
                    <span className="font-semibold text-green-600">${formData.monthlyRent.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Cash Flow:</span>
                    <span className={`font-semibold text-xl ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.monthlyCashFlow.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Annual Cash Flow:</span>
                    <span className={`font-semibold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.annualCashFlow.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Cap Rate:</span>
                    <span className="font-semibold text-blue-600">{results.capRate}%</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rental Yield:</span>
                    <span className="font-semibold text-purple-600">{results.rentalYield}%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Cash-on-Cash ROI:</span>
                    <span className={`font-bold text-xl ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.roi}%
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Investment Summary</h4>
                  <p className="text-sm text-green-800">
                    {propertyTypes[formData.propertyType]} in {stateNames[formData.state]} with {results.roi >= 8 ? 'strong' : results.roi >= 5 ? 'moderate' : 'weak'} returns of {results.roi}% ROI and ${Math.abs(results.monthlyCashFlow).toLocaleString()} monthly {results.monthlyCashFlow >= 0 ? 'positive cash flow' : 'negative cash flow'}.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Break-Even Analysis</h4>
                  <p className="text-sm text-blue-800">
                    Break-even rent: ${results.breakEvenRent.toLocaleString()}/month. Current rent is ${(formData.monthlyRent - results.breakEvenRent).toLocaleString()} {formData.monthlyRent > results.breakEvenRent ? 'above' : 'below'} break-even.
                  </p>
                </div>
              </div>
            </div>

            {/* Property Investment Metrics */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Investment Metrics</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Cap Rate</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{results.capRate}%</div>
                  <p className="text-sm text-gray-600">Property return without financing</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Cash-on-Cash ROI</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">{results.roi}%</div>
                  <p className="text-sm text-gray-600">Return on invested cash</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Rental Yield</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{results.rentalYield}%</div>
                  <p className="text-sm text-gray-600">Annual rent vs property value</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Monthly Cash Flow</h4>
                  <div className={`text-2xl font-bold mb-2 ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${results.monthlyCashFlow.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Monthly profit after expenses</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏠</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h4>
                <p className="text-gray-600 text-sm">Complete cash flow, ROI, and rental yield calculations for informed decisions</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-Time Calculations</h4>
                <p className="text-gray-600 text-sm">Instant updates as you adjust property price, rent, and investment parameters</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Investment Metrics</h4>
                <p className="text-gray-600 text-sm">Cap rate, cash-on-cash ROI, rental yield, and break-even analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}