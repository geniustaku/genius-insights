'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function USStudentLoanCalculator() {
  type RepaymentPlanType = 'standard' | 'extended' | 'graduated' | 'idr-ibr' | 'idr-paye' | 'idr-repaye' | 'idr-ice';

  const [formData, setFormData] = useState({
    loanAmount: 50000,
    interestRate: 5.5,
    loanTerm: 10,
    repaymentPlan: 'standard' as RepaymentPlanType,
    annualIncome: 45000,
    familySize: 1,
    graduationDate: '2025-05',
    loanType: 'federal-direct',
    capitalization: true
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    payoffDate: '',
    interestSavings: 0,
    monthlyPaymentIDR: 0,
    forgivenessPeriod: 0
  });

  const repaymentPlans: Record<string, string> = {
    'standard': 'Standard Repayment (10 years)',
    'extended': 'Extended Repayment (25 years)',
    'graduated': 'Graduated Repayment (10 years)',
    'idr-ibr': 'Income-Based Repayment (IBR)',
    'idr-paye': 'Pay As You Earn (PAYE)',
    'idr-repaye': 'Revised Pay As You Earn (REPAYE)',
    'idr-ice': 'Income Contingent Repayment (ICR)'
  };

  const loanTypes: Record<string, string> = {
    'federal-direct': 'Federal Direct Loans',
    'federal-plus': 'Federal PLUS Loans',
    'private': 'Private Student Loans',
    'consolidation': 'Direct Consolidation Loans'
  };

  const calculateLoan = () => {
    const {
      loanAmount,
      interestRate,
      loanTerm,
      repaymentPlan,
      annualIncome,
      familySize
    } = formData;

    // Standard payment calculation
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;
    
    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterest = 0;
    let monthlyPaymentIDR = 0;
    let forgivenessPeriod = 0;

    if (repaymentPlan === 'standard' || repaymentPlan === 'graduated') {
      const termYears = repaymentPlan === 'standard' ? loanTerm : 10;
      const payments = termYears * 12;
      
      if (loanAmount > 0 && monthlyRate > 0) {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
          (Math.pow(1 + monthlyRate, payments) - 1);
        
        if (repaymentPlan === 'graduated') {
          // Graduated starts at 50% of standard, increases every 2 years
          monthlyPayment = monthlyPayment * 0.5;
        }
      } else if (loanAmount > 0) {
        monthlyPayment = loanAmount / payments;
      }
      
      totalPayment = monthlyPayment * payments;
      totalInterest = totalPayment - loanAmount;
    } else if (repaymentPlan === 'extended') {
      const payments = 25 * 12;
      if (loanAmount > 0 && monthlyRate > 0) {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
          (Math.pow(1 + monthlyRate, payments) - 1);
      } else if (loanAmount > 0) {
        monthlyPayment = loanAmount / payments;
      }
      totalPayment = monthlyPayment * payments;
      totalInterest = totalPayment - loanAmount;
    } else {
      // Income-driven repayment plans
      const povertyGuideline = 15060 + (familySize - 1) * 5380; // 2025 Federal Poverty Guidelines
      const discretionaryIncome = Math.max(0, annualIncome - povertyGuideline);
      
      switch (repaymentPlan) {
        case 'idr-ibr':
          monthlyPaymentIDR = (discretionaryIncome * 0.15) / 12;
          forgivenessPeriod = 20;
          break;
        case 'idr-paye':
          monthlyPaymentIDR = Math.min(
            (discretionaryIncome * 0.10) / 12,
            (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, 120)) / 
            (Math.pow(1 + monthlyRate, 120) - 1)
          );
          forgivenessPeriod = 20;
          break;
        case 'idr-repaye':
          monthlyPaymentIDR = (discretionaryIncome * 0.10) / 12;
          forgivenessPeriod = loanAmount <= 30000 ? 20 : 25;
          break;
        case 'idr-ice':
          const standardPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, 120)) / 
            (Math.pow(1 + monthlyRate, 120) - 1);
          const incomePayment = (annualIncome * 0.20) / 12;
          monthlyPaymentIDR = Math.min(standardPayment, incomePayment);
          forgivenessPeriod = 25;
          break;
      }
      
      monthlyPayment = monthlyPaymentIDR;
      
      // Estimate total payment (simplified - actual calculation is complex)
      const estimatedPayments = forgivenessPeriod * 12;
      totalPayment = monthlyPayment * estimatedPayments;
      totalInterest = Math.max(0, totalPayment - loanAmount);
    }

    // Calculate payoff date
    const graduationDate = new Date(formData.graduationDate + '-01');
    const graceMonths = 6; // Standard 6-month grace period
    const firstPaymentDate = new Date(graduationDate);
    firstPaymentDate.setMonth(firstPaymentDate.getMonth() + graceMonths);
    
    const payoffDate = new Date(firstPaymentDate);
    const paymentMonths = forgivenessPeriod > 0 ? forgivenessPeriod * 12 : numPayments;
    payoffDate.setMonth(payoffDate.getMonth() + paymentMonths);

    // Interest savings calculation (vs 25-year extended)
    const extendedPayments = 25 * 12;
    const extendedMonthlyPayment = loanAmount > 0 && monthlyRate > 0 ? 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, extendedPayments)) / 
      (Math.pow(1 + monthlyRate, extendedPayments) - 1) : loanAmount / extendedPayments;
    const extendedTotalPayment = extendedMonthlyPayment * extendedPayments;
    const interestSavings = Math.max(0, extendedTotalPayment - totalPayment);

    setResults({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      interestSavings: Math.round(interestSavings),
      monthlyPaymentIDR: Math.round(monthlyPaymentIDR),
      forgivenessPeriod
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number | boolean) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['loanAmount', 'annualIncome', 'familySize'].includes(field)) {
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

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 Student Loan Calculator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                US Student Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate student loan payments, interest, and explore federal repayment plans including income-driven options.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">US Student Loan Payment Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments for federal and private student loans with various repayment options</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount ($)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      placeholder="50000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      placeholder="5.5"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type
                  </label>
                  <select 
                    value={formData.loanType}
                    onChange={(e) => handleInputChange('loanType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(loanTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repayment Plan
                  </label>
                  <select 
                    value={formData.repaymentPlan}
                    onChange={(e) => handleInputChange('repaymentPlan', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(repaymentPlans).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                {!formData.repaymentPlan.startsWith('idr') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <select 
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                )}

                {formData.repaymentPlan.startsWith('idr') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Income ($)
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.annualIncome}
                        onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                        placeholder="45000"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Family Size
                      </label>
                      <select 
                        value={formData.familySize}
                        onChange={(e) => handleInputChange('familySize', e.target.value)}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 People</option>
                        <option value={3}>3 People</option>
                        <option value={4}>4 People</option>
                        <option value={5}>5 People</option>
                        <option value={6}>6 People</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Date
                  </label>
                  <input
                    type="month"
                    value={formData.graduationDate}
                    onChange={(e) => handleInputChange('graduationDate', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="capitalization"
                    checked={formData.capitalization}
                    onChange={(e) => handleInputChange('capitalization', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="capitalization" className="ml-2 block text-sm text-gray-700">
                    Interest capitalizes during grace period
                  </label>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Payment Analysis</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Loan Amount:</span>
                    <span className="font-semibold text-black">${formData.loanAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-black">{formData.interestRate}%</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Repayment Plan:</span>
                    <span className="font-semibold text-black text-sm">{repaymentPlans[formData.repaymentPlan]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold text-blue-600 text-xl">${results.monthlyPayment.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Payment:</span>
                    <span className="font-semibold text-red-600">${results.totalPayment.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-orange-600">${results.totalInterest.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Payoff Date:</span>
                    <span className="font-semibold text-purple-600">{results.payoffDate}</span>
                  </div>

                  {results.forgivenessPeriod > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Forgiveness Period:</span>
                      <span className="font-semibold text-green-600">{results.forgivenessPeriod} years</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Interest Savings:</span>
                    <span className="font-bold text-green-600 text-xl">${results.interestSavings.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Payment Summary</h4>
                  <p className="text-sm text-green-800">
                    {loanTypes[formData.loanType]} with {repaymentPlans[formData.repaymentPlan].toLowerCase()} will cost ${results.monthlyPayment.toLocaleString()}/month and ${results.totalInterest.toLocaleString()} in total interest.
                  </p>
                </div>

                {formData.repaymentPlan.startsWith('idr') && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Income-Driven Repayment</h4>
                    <p className="text-sm text-blue-800">
                      Based on your income of ${formData.annualIncome.toLocaleString()} and family size of {formData.familySize}, your payment is income-based{results.forgivenessPeriod > 0 ? ` with loan forgiveness after ${results.forgivenessPeriod} years` : ''}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Student Loan Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Federal Student Loan Repayment Options</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Standard Repayment</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">10 Years</div>
                  <p className="text-sm text-gray-600">Fixed payments, lowest total interest</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Extended Repayment</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">25 Years</div>
                  <p className="text-sm text-gray-600">Lower monthly payments</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Income-Driven</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">10-15%</div>
                  <p className="text-sm text-gray-600">Of discretionary income</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Loan Forgiveness</h4>
                  <div className="text-2xl font-bold text-orange-600 mb-2">20-25 Years</div>
                  <p className="text-sm text-gray-600">Remaining balance forgiven</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="font-semibold text-gray-900 mb-2">Federal & Private Loans</h4>
                <p className="text-gray-600 text-sm">Calculate payments for all types of student loans with various repayment options</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Income-Driven Plans</h4>
                <p className="text-gray-600 text-sm">IBR, PAYE, REPAYE, and ICR options based on income and family size</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Loan Forgiveness</h4>
                <p className="text-gray-600 text-sm">Calculate potential forgiveness amounts and timeline for federal loans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}