'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function CanadaLoanCalculator() {
  const [formData, setFormData] = useState<{
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    loanType: keyof typeof loanTypes;
    paymentFrequency: 'monthly' | 'semi-monthly' | 'bi-weekly' | 'weekly' | 'accelerated-bi-weekly' | 'accelerated-weekly';
    downPayment: number;
    cmhcInsurance: boolean;
    province: string;
  }>({
    loanAmount: 400000,
    interestRate: 6.5,
    loanTerm: 25,
    loanType: 'mortgage',
    paymentFrequency: 'monthly',
    downPayment: 80000,
    cmhcInsurance: true,
    province: 'ontario'
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    biWeeklyPayment: 0,
    weeklyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    cmhcPremium: 0,
    totalLoanAmount: 0,
    payoffDate: '',
    interestSavings: 0
  });

  const loanTypes = {
    'mortgage': 'Mortgage',
    'personal': 'Personal Loan',
    'car': 'Car Loan',
    'heloc': 'Home Equity Line of Credit',
    'business': 'Business Loan'
  };

  const paymentFrequencies = {
    'monthly': 'Monthly (12 payments/year)',
    'semi-monthly': 'Semi-Monthly (24 payments/year)',
    'bi-weekly': 'Bi-Weekly (26 payments/year)',
    'weekly': 'Weekly (52 payments/year)',
    'accelerated-bi-weekly': 'Accelerated Bi-Weekly',
    'accelerated-weekly': 'Accelerated Weekly'
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

  const calculateLoan = () => {
    const {
      loanAmount,
      interestRate,
      loanTerm,
      loanType,
      paymentFrequency,
      downPayment,
      cmhcInsurance
    } = formData;

    let principalAmount = loanAmount;
    let cmhcPremium = 0;

    // Calculate CMHC insurance for mortgages if applicable
    if (loanType === 'mortgage' && cmhcInsurance) {
      const propertyValue = loanAmount + downPayment;
      const loanToValue = (loanAmount / propertyValue) * 100;
      
      let cmhcRate = 0;
      if (loanToValue > 95) cmhcRate = 4.00;
      else if (loanToValue > 90) cmhcRate = 3.10;
      else if (loanToValue > 85) cmhcRate = 2.40;
      else if (loanToValue > 80) cmhcRate = 1.80;

      cmhcPremium = (loanAmount * cmhcRate) / 100;
      principalAmount = loanAmount + cmhcPremium;
    }

    // Payment frequency calculations
    let paymentsPerYear = 12;
    let termInPayments = loanTerm * 12;

    switch (paymentFrequency) {
      case 'monthly':
        paymentsPerYear = 12;
        termInPayments = loanTerm * 12;
        break;
      case 'semi-monthly':
        paymentsPerYear = 24;
        termInPayments = loanTerm * 24;
        break;
      case 'bi-weekly':
        paymentsPerYear = 26;
        termInPayments = loanTerm * 26;
        break;
      case 'weekly':
        paymentsPerYear = 52;
        termInPayments = loanTerm * 52;
        break;
      case 'accelerated-bi-weekly':
        paymentsPerYear = 26;
        termInPayments = loanTerm * 26;
        break;
      case 'accelerated-weekly':
        paymentsPerYear = 52;
        termInPayments = loanTerm * 52;
        break;
    }

    const periodicRate = (interestRate / 100) / paymentsPerYear;
    
    let payment = 0;
    if (principalAmount > 0 && periodicRate > 0) {
      if (paymentFrequency === 'accelerated-bi-weekly') {
        // Accelerated bi-weekly: monthly payment ÷ 2
        const monthlyRate = (interestRate / 100) / 12;
        const monthlyPayment = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12)) / 
          (Math.pow(1 + monthlyRate, loanTerm * 12) - 1);
        payment = monthlyPayment / 2;
      } else if (paymentFrequency === 'accelerated-weekly') {
        // Accelerated weekly: monthly payment ÷ 4
        const monthlyRate = (interestRate / 100) / 12;
        const monthlyPayment = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12)) / 
          (Math.pow(1 + monthlyRate, loanTerm * 12) - 1);
        payment = monthlyPayment / 4;
      } else {
        // Standard payment calculation
        payment = (principalAmount * periodicRate * Math.pow(1 + periodicRate, termInPayments)) / 
          (Math.pow(1 + periodicRate, termInPayments) - 1);
      }
    } else if (principalAmount > 0) {
      payment = principalAmount / termInPayments;
    }

    // Calculate total payment and interest
    const totalPayment = payment * termInPayments;
    const totalInterest = totalPayment - principalAmount;

    // Calculate equivalent payments for different frequencies
    const monthlyRate = (interestRate / 100) / 12;
    const monthlyPayment = principalAmount > 0 && monthlyRate > 0 ? 
      (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12)) / 
      (Math.pow(1 + monthlyRate, loanTerm * 12) - 1) : principalAmount / (loanTerm * 12);

    const biWeeklyPayment = monthlyPayment * 12 / 26;
    const weeklyPayment = monthlyPayment * 12 / 52;

    // Calculate payoff date
    const today = new Date();
    const payoffDate = new Date(today);
    const totalMonths = (termInPayments / paymentsPerYear) * 12;
    payoffDate.setMonth(payoffDate.getMonth() + totalMonths);

    // Calculate interest savings vs monthly payments
    const monthlyTotalPayment = monthlyPayment * loanTerm * 12;
    const interestSavings = Math.max(0, monthlyTotalPayment - totalPayment);

    setResults({
      monthlyPayment: Math.round(payment * (paymentsPerYear / 12)),
      biWeeklyPayment: Math.round(biWeeklyPayment),
      weeklyPayment: Math.round(weeklyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      cmhcPremium: Math.round(cmhcPremium),
      totalLoanAmount: Math.round(principalAmount),
      payoffDate: payoffDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long' }),
      interestSavings: Math.round(interestSavings)
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number | boolean) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['loanAmount', 'downPayment'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['interestRate', 'loanTerm'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateLoan();
  }, [formData]);

  const loanToValue = formData.loanType === 'mortgage' ? 
    ((formData.loanAmount / (formData.loanAmount + formData.downPayment)) * 100).toFixed(1) : 0;

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇨🇦 Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Canada Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate mortgage payments, personal loans, and car loans with Canadian bank rates and payment frequencies.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Canada Loan & Mortgage Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments for mortgages, personal loans, and more with Canadian banking features</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type
                  </label>
                  <select 
                    value={formData.loanType}
                    onChange={(e) => handleInputChange('loanType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(loanTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount (CAD $)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      placeholder="400000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  {formData.loanType === 'mortgage' && (
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
                        placeholder="80000"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                      />
                    </div>
                  )}
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
                      Loan Term (Years)
                    </label>
                    <select 
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    >
                      <option value={5}>5 Years</option>
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                      <option value={35}>35 Years</option>
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

                {formData.loanType === 'mortgage' && (
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
                )}
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Payment Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Loan Type:</span>
                    <span className="font-semibold text-black">{loanTypes[formData.loanType]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-black">CAD ${formData.loanAmount.toLocaleString()}</span>
                  </div>

                  {results.cmhcPremium > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">CMHC Premium:</span>
                      <span className="font-semibold text-orange-600">CAD ${results.cmhcPremium.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Loan Amount:</span>
                    <span className="font-semibold text-blue-600">CAD ${results.totalLoanAmount.toLocaleString()}</span>
                  </div>

                  {formData.loanType === 'mortgage' && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Loan-to-Value Ratio:</span>
                      <span className="font-semibold text-purple-600">{loanToValue}%</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{paymentFrequencies[formData.paymentFrequency]} Payment:</span>
                    <span className="font-semibold text-red-600 text-xl">CAD ${results.monthlyPayment.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-orange-600">CAD ${results.totalInterest.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Payment:</span>
                    <span className="font-semibold text-green-600">CAD ${results.totalPayment.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Payoff Date:</span>
                    <span className="font-semibold text-blue-600">{results.payoffDate}</span>
                  </div>

                  {results.interestSavings > 0 && (
                    <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                      <span className="text-gray-900 font-medium">Interest Savings:</span>
                      <span className="font-bold text-green-600 text-xl">CAD ${results.interestSavings.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Payment Summary</h4>
                  <p className="text-sm text-blue-800">
                    {loanTypes[formData.loanType]} of CAD ${formData.loanAmount.toLocaleString()} at {formData.interestRate}% interest for {formData.loanTerm} years with {paymentFrequencies[formData.paymentFrequency].toLowerCase()} payments.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Payment Frequency Comparison</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span>CAD ${results.monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bi-Weekly:</span>
                      <span>CAD ${results.biWeeklyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly:</span>
                      <span>CAD ${results.weeklyPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canadian Banking Features */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Canadian Banking Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Frequencies</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">6 Options</div>
                  <p className="text-sm text-gray-600">Monthly, bi-weekly, weekly, and accelerated payments</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">CMHC Insurance</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">Included</div>
                  <p className="text-sm text-gray-600">Mortgage insurance for down payments &lt; 20%</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Loan Types</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">5 Types</div>
                  <p className="text-sm text-gray-600">Mortgages, personal, car, HELOC, business loans</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">All Provinces</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">13 Regions</div>
                  <p className="text-sm text-gray-600">All provinces and territories covered</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇨🇦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Canadian Banking</h4>
                <p className="text-gray-600 text-sm">Designed for Canadian mortgage and loan features including CMHC insurance</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Flexibility</h4>
                <p className="text-gray-600 text-sm">Multiple payment frequencies including accelerated options to save interest</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h4>
                <p className="text-gray-600 text-sm">Total interest, payoff dates, and payment comparisons for informed decisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}