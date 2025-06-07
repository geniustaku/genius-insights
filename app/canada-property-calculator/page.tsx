'use client';

import React, { useState, useEffect } from 'react';

export default function CanadaPropertyCalculatorClient() {
  const [formData, setFormData] = useState({
    propertyPrice: 750000,
    downPayment: 150000,
    interestRate: 6.5,
    amortizationPeriod: 25,
    paymentFrequency: 'monthly',
    propertyTaxRate: 1.2,
    homeInsurance: 2400,
    condoFees: 0,
    heatingCosts: 2000,
    province: 'ontario',
    propertyType: 'detached',
    annualIncome: 100000,
    monthlyDebts: 500,
    cmhcInsurance: true
  });

  const [results, setResults] = useState({
    monthlyMortgage: 0,
    monthlyPropertyTax: 0,
    monthlyInsurance: 0,
    monthlyHeating: 0,
    monthlyCondo: 0,
    totalMonthlyPayment: 0,
    cmhcPremium: 0,
    totalMortgageAmount: 0,
    landTransferTax: 0,
    gds: 0,
    tds: 0,
    affordability: '',
    loanToValue: 0,
    totalCashNeeded: 0
  });

  const provinces = {
    'ontario': 'Ontario',
    'british-columbia': 'British Columbia',
    'alberta': 'Alberta',
    'quebec': 'Quebec',
    'manitoba': 'Manitoba',
    'saskatchewan': 'Saskatchewan',
    'nova-scotia': 'Nova Scotia',
    'new-brunswick': 'New Brunswick',
    'newfoundland': 'Newfoundland and Labrador',
    'prince-edward-island': 'Prince Edward Island',
    'northwest-territories': 'Northwest Territories',
    'nunavut': 'Nunavut',
    'yukon': 'Yukon'
  };

  const propertyTypes = {
    'detached': 'Detached House',
    'semi-detached': 'Semi-Detached House',
    'townhouse': 'Townhouse',
    'condo': 'Condominium',
    'duplex': 'Duplex'
  };

  const paymentFrequencies = {
    'monthly': 'Monthly (12 payments/year)',
    'bi-weekly': 'Bi-Weekly (26 payments/year)',
    'weekly': 'Weekly (52 payments/year)',
    'accelerated-bi-weekly': 'Accelerated Bi-Weekly',
    'accelerated-weekly': 'Accelerated Weekly'
  };

  const calculateProperty = () => {
    const {
      propertyPrice,
      downPayment,
      interestRate,
      amortizationPeriod,
      paymentFrequency,
      propertyTaxRate,
      homeInsurance,
      condoFees,
      heatingCosts,
      province,
      annualIncome,
      monthlyDebts,
      cmhcInsurance
    } = formData;

    // Calculate CMHC insurance if applicable
    let cmhcPremium = 0;
    const loanToValue = ((propertyPrice - downPayment) / propertyPrice) * 100;
    
    if (cmhcInsurance && downPayment < propertyPrice * 0.2) {
      let cmhcRate = 0;
      if (loanToValue >= 95) cmhcRate = 4.00;
      else if (loanToValue >= 90) cmhcRate = 3.10;
      else if (loanToValue >= 85) cmhcRate = 2.40;
      else if (loanToValue > 80) cmhcRate = 1.80;
      
      cmhcPremium = ((propertyPrice - downPayment) * cmhcRate) / 100;
    }

    const totalMortgageAmount = propertyPrice - downPayment + cmhcPremium;

    // Calculate mortgage payment based on frequency
    let paymentsPerYear = 12;
    let totalPayments = amortizationPeriod * 12;

    switch (paymentFrequency) {
      case 'bi-weekly':
        paymentsPerYear = 26;
        totalPayments = amortizationPeriod * 26;
        break;
      case 'weekly':
        paymentsPerYear = 52;
        totalPayments = amortizationPeriod * 52;
        break;
      case 'accelerated-bi-weekly':
        paymentsPerYear = 26;
        totalPayments = amortizationPeriod * 26;
        break;
      case 'accelerated-weekly':
        paymentsPerYear = 52;
        totalPayments = amortizationPeriod * 52;
        break;
    }

    const periodicRate = (interestRate / 100) / paymentsPerYear;
    let mortgagePayment = 0;

    if (totalMortgageAmount > 0 && periodicRate > 0) {
      if (paymentFrequency === 'accelerated-bi-weekly') {
        // Accelerated bi-weekly: monthly payment ÷ 2
        const monthlyRate = (interestRate / 100) / 12;
        const monthlyPayment = (totalMortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, amortizationPeriod * 12)) / 
          (Math.pow(1 + monthlyRate, amortizationPeriod * 12) - 1);
        mortgagePayment = monthlyPayment / 2;
      } else if (paymentFrequency === 'accelerated-weekly') {
        // Accelerated weekly: monthly payment ÷ 4
        const monthlyRate = (interestRate / 100) / 12;
        const monthlyPayment = (totalMortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, amortizationPeriod * 12)) / 
          (Math.pow(1 + monthlyRate, amortizationPeriod * 12) - 1);
        mortgagePayment = monthlyPayment / 4;
      } else {
        mortgagePayment = (totalMortgageAmount * periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
          (Math.pow(1 + periodicRate, totalPayments) - 1);
      }
    }

    // Convert to monthly equivalent for affordability calculations
    const monthlyMortgage = mortgagePayment * (paymentsPerYear / 12);

    // Other monthly costs
    const monthlyPropertyTax = (propertyPrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHeating = heatingCosts / 12;
    const monthlyCondo = condoFees;

    const totalMonthlyPayment = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyHeating + monthlyCondo;

    // Calculate land transfer tax
    let landTransferTax = 0;
    if (province === 'ontario') {
      if (propertyPrice <= 55000) {
        landTransferTax = propertyPrice * 0.005;
      } else if (propertyPrice <= 250000) {
        landTransferTax = 275 + ((propertyPrice - 55000) * 0.01);
      } else if (propertyPrice <= 400000) {
        landTransferTax = 2225 + ((propertyPrice - 250000) * 0.015);
      } else {
        landTransferTax = 4475 + ((propertyPrice - 400000) * 0.02);
      }
      // Toronto has additional municipal land transfer tax
    } else if (province === 'british-columbia') {
      if (propertyPrice <= 200000) {
        landTransferTax = propertyPrice * 0.01;
      } else if (propertyPrice <= 2000000) {
        landTransferTax = 2000 + ((propertyPrice - 200000) * 0.02);
      } else {
        landTransferTax = 38000 + ((propertyPrice - 2000000) * 0.03);
      }
    } else {
      // Other provinces typically have lower rates
      landTransferTax = propertyPrice * 0.005;
    }

    // Calculate GDS and TDS ratios for affordability
    const monthlyIncome = annualIncome / 12;
    const gds = (totalMonthlyPayment / monthlyIncome) * 100;
    const tds = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100;

    // Determine affordability
    let affordability = '';
    if (gds <= 32 && tds <= 40) {
      affordability = 'Excellent - Well within lending guidelines';
    } else if (gds <= 35 && tds <= 42) {
      affordability = 'Good - May qualify with some lenders';
    } else if (gds <= 39 && tds <= 44) {
      affordability = 'Marginal - Limited lending options';
    } else {
      affordability = 'Poor - Unlikely to qualify for conventional mortgage';
    }

    // Calculate total cash needed
    const legalFees = 2000;
    const homeInspection = 500;
    const totalCashNeeded = downPayment + cmhcPremium + landTransferTax + legalFees + homeInspection;

    setResults({
      monthlyMortgage: Math.round(monthlyMortgage),
      monthlyPropertyTax: Math.round(monthlyPropertyTax),
      monthlyInsurance: Math.round(monthlyInsurance),
      monthlyHeating: Math.round(monthlyHeating),
      monthlyCondo: Math.round(monthlyCondo),
      totalMonthlyPayment: Math.round(totalMonthlyPayment),
      cmhcPremium: Math.round(cmhcPremium),
      totalMortgageAmount: Math.round(totalMortgageAmount),
      landTransferTax: Math.round(landTransferTax),
      gds: Number(gds.toFixed(1)),
      tds: Number(tds.toFixed(1)),
      affordability,
      loanToValue: Number(loanToValue.toFixed(1)),
      totalCashNeeded: Math.round(totalCashNeeded)
    });
  };

  type FormField = keyof typeof formData;
  const handleInputChange = (field: FormField, value: string | number | boolean) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['propertyPrice', 'downPayment', 'homeInsurance', 'condoFees', 'heatingCosts', 'annualIncome', 'monthlyDebts'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['interestRate', 'propertyTaxRate', 'amortizationPeriod'].includes(field)) {
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
    <div className="max-w-6xl mx-auto px-8 py-16">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Canada Property & Mortgage Calculator</h2>
          <p className="text-gray-600 text-lg">Calculate affordability, mortgage payments, and total costs for Canadian real estate</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Price (CAD $)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.propertyPrice}
                  onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                  placeholder="750000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment (CAD $)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  placeholder="150000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
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
                  placeholder="6.5"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amortization Period (Years)
                </label>
                <select 
                  value={formData.amortizationPeriod}
                  onChange={(e) => handleInputChange('amortizationPeriod', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
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
                Payment Frequency
              </label>
              <select 
                value={formData.paymentFrequency}
                onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
              >
                {Object.entries(paymentFrequencies).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
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
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Home Insurance (CAD $)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.homeInsurance}
                  onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                  placeholder="2400"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Condo Fees (CAD $)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.condoFees}
                  onChange={(e) => handleInputChange('condoFees', e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Heating Costs (CAD $)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.heatingCosts}
                  onChange={(e) => handleInputChange('heatingCosts', e.target.value)}
                  placeholder="2000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province/Territory
                </label>
                <select 
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(provinces).map(([key, name]) => (
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
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(propertyTypes).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                  placeholder="100000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Debt Payments (CAD $)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.monthlyDebts}
                  onChange={(e) => handleInputChange('monthlyDebts', e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="cmhcInsurance"
                checked={formData.cmhcInsurance}
                onChange={(e) => handleInputChange('cmhcInsurance', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="cmhcInsurance" className="ml-2 block text-sm text-gray-700">
                Include CMHC mortgage insurance (required if down payment &lt; 20%)
              </label>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Analysis Results</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Property Price:</span>
                <span className="font-semibold text-black">CAD ${formData.propertyPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Down Payment ({((formData.downPayment / formData.propertyPrice) * 100).toFixed(1)}%):</span>
                <span className="font-semibold text-black">CAD ${formData.downPayment.toLocaleString()}</span>
              </div>

              {results.cmhcPremium > 0 && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">CMHC Premium:</span>
                  <span className="font-semibold text-orange-600">CAD ${results.cmhcPremium.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Mortgage Amount:</span>
                <span className="font-semibold text-blue-600">CAD ${results.totalMortgageAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Monthly Mortgage Payment:</span>
                <span className="font-semibold text-red-600 text-xl">CAD ${results.monthlyMortgage.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Monthly Property Tax:</span>
                <span className="font-semibold text-purple-600">CAD ${results.monthlyPropertyTax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Monthly Insurance:</span>
                <span className="font-semibold text-green-600">CAD ${results.monthlyInsurance.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Monthly Heating:</span>
                <span className="font-semibold text-indigo-600">CAD ${results.monthlyHeating.toLocaleString()}</span>
              </div>

              {results.monthlyCondo > 0 && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly Condo Fees:</span>
                  <span className="font-semibold text-yellow-600">CAD ${results.monthlyCondo.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Total Monthly Payment:</span>
                <span className="font-semibold text-red-600 text-xl">CAD ${results.totalMonthlyPayment.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Land Transfer Tax:</span>
                <span className="font-semibold text-orange-600">CAD ${results.landTransferTax.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                <span className="text-gray-900 font-medium">Total Cash Needed:</span>
                <span className="font-bold text-red-600 text-xl">CAD ${results.totalCashNeeded.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Affordability Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800">GDS Ratio:</span>
                  <span className={`font-semibold ${results.gds <= 32 ? 'text-green-600' : results.gds <= 39 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {results.gds}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">TDS Ratio:</span>
                  <span className={`font-semibold ${results.tds <= 40 ? 'text-green-600' : results.tds <= 44 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {results.tds}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Loan-to-Value:</span>
                  <span className="font-semibold text-blue-600">{results.loanToValue}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Affordability Status</h4>
              <p className="text-sm text-green-800">{results.affordability}</p>
            </div>
          </div>
        </div>

        {/* Canadian Mortgage Features */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Canadian Mortgage Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">CMHC Insurance</h4>
              <div className="text-2xl font-bold text-red-600 mb-2">{results.cmhcPremium > 0 ? `CAD $${Math.round(results.cmhcPremium/1000)}K` : 'Not Required'}</div>
              <p className="text-sm text-gray-600">Mortgage insurance premium</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">GDS Ratio</h4>
              <div className={`text-2xl font-bold mb-2 ${results.gds <= 32 ? 'text-green-600' : results.gds <= 39 ? 'text-yellow-600' : 'text-red-600'}`}>
                {results.gds}%
              </div>
              <p className="text-sm text-gray-600">Gross debt service ratio</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">TDS Ratio</h4>
              <div className={`text-2xl font-bold mb-2 ${results.tds <= 40 ? 'text-green-600' : results.tds <= 44 ? 'text-yellow-600' : 'text-red-600'}`}>
                {results.tds}%
              </div>
              <p className="text-sm text-gray-600">Total debt service ratio</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Land Transfer Tax</h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">CAD ${Math.round(results.landTransferTax/1000)}K</div>
              <p className="text-sm text-gray-600">Provincial transfer tax</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🇨🇦</div>
            <h4 className="font-semibold text-gray-900 mb-2">Canadian Mortgage Rules</h4>
            <p className="text-gray-600 text-sm">CMHC insurance, GDS/TDS ratios, and provincial land transfer taxes included</p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="font-semibold text-gray-900 mb-2">Complete Cost Analysis</h4>
            <p className="text-gray-600 text-sm">Property tax, insurance, heating, condo fees, and all closing costs</p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-semibold text-gray-900 mb-2">Affordability Assessment</h4>
            <p className="text-gray-600 text-sm">GDS and TDS ratio calculations for mortgage qualification guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
}