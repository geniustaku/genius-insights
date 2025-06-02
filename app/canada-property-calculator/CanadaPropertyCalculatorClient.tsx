'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function CanadaPropertyCalculatorClient() {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [amortizationPeriod, setAmortizationPeriod] = useState('25');
  const [annualIncome, setAnnualIncome] = useState('');
  const [province, setProvince] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateMortgage = () => {
    if (!propertyPrice || !downPayment || !interestRate || !annualIncome) return;
    
    setIsCalculating(true);
    
    const price = parseFloat(propertyPrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const years = parseInt(amortizationPeriod);
    const income = parseFloat(annualIncome);
    
    const loanAmount = price - down;
    const numberOfPayments = years * 12;
    
    // Calculate monthly mortgage payment
    const monthlyPayment = rate === 0 ? loanAmount / numberOfPayments : 
      (loanAmount * rate * Math.pow(1 + rate, numberOfPayments)) / 
      (Math.pow(1 + rate, numberOfPayments) - 1);
    
    // Calculate CMHC insurance if down payment < 20%
    const downPaymentPercent = (down / price) * 100;
    let cmhcInsurance = 0;
    if (downPaymentPercent < 20) {
      if (downPaymentPercent >= 15) cmhcInsurance = loanAmount * 0.028;
      else if (downPaymentPercent >= 10) cmhcInsurance = loanAmount * 0.031;
      else cmhcInsurance = loanAmount * 0.04;
    }
    
    // Calculate property tax (estimated 1.2% annually)
    const annualPropertyTax = price * 0.012;
    const monthlyPropertyTax = annualPropertyTax / 12;
    
    // Calculate total monthly housing costs
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + (cmhcInsurance / 12);
    
    // Calculate affordability ratios
    const grossDebtServiceRatio = (totalMonthlyPayment / (income / 12)) * 100;
    const canAfford = grossDebtServiceRatio <= 32; // GDS should be <= 32%
    
    setTimeout(() => {
      setResults({
        loanAmount,
        monthlyPayment,
        totalMonthlyPayment,
        cmhcInsurance,
        annualPropertyTax,
        monthlyPropertyTax,
        grossDebtServiceRatio,
        canAfford,
        downPaymentPercent
      });
      setIsCalculating(false);
    }, 500);
  };

  const formatCurrency = (amount: number) => {
    return `C$${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      {/* Home Button */}
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Canada Property & Mortgage Calculator</h2>
          <p className="text-gray-600">Calculate affordability, mortgage payments, and investment returns</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Property Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Property Price (C$)</label>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="500,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Down Payment (C$)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="100,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Province</label>
                <select 
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select Province</option>
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="NL">Newfoundland and Labrador</option>
                </select>
              </div>
            </div>

            {/* Right Column - Mortgage Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mortgage Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="5.25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amortization Period (Years)</label>
                <select 
                  value={amortizationPeriod}
                  onChange={(e) => setAmortizationPeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                  <option value="20">20 years</option>
                  <option value="15">15 years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Annual Income (C$)</label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="80,000"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={calculateMortgage}
              disabled={!propertyPrice || !downPayment || !interestRate || !annualIncome || isCalculating}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                !propertyPrice || !downPayment || !interestRate || !annualIncome || isCalculating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Calculating...
                </div>
              ) : (
                'Calculate Property Affordability'
              )}
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Calculation Results</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Mortgage Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Amount:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-semibold text-gray-900">{results.downPaymentPercent.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Costs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CMHC Insurance:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.cmhcInsurance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Property Tax:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.monthlyPropertyTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Monthly Cost:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.totalMonthlyPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`mt-6 p-4 rounded-xl ${results.canAfford ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${results.canAfford ? 'text-green-800' : 'text-red-800'}`}>
                    {results.canAfford ? '✅ Affordable' : '❌ Not Affordable'}
                  </div>
                  <div className={`text-sm mt-2 ${results.canAfford ? 'text-green-700' : 'text-red-700'}`}>
                    GDS Ratio: {results.grossDebtServiceRatio.toFixed(1)}% (Should be ≤ 32%)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}