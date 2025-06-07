'use client';

import StructuredData from '@/components/StructuredData';
import { useEffect } from 'react';

export default function UKPropertyCalculatorPage() {
  
  const calculateProperty = () => {
    const propertyValue = parseFloat((document.getElementById('propertyValue') as HTMLInputElement)?.value || '0') || 250000;
    const propertyType = (document.getElementById('propertyType') as HTMLSelectElement)?.value || 'residential';
    const location = (document.getElementById('location') as HTMLSelectElement)?.value || 'england';
    const rentalIncome = parseFloat((document.getElementById('rentalIncome') as HTMLInputElement)?.value || '0') || 1200;
    const deposit = parseFloat((document.getElementById('deposit') as HTMLInputElement)?.value || '0') || 50000;
    const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement)?.value || '0') || 5.5;
    
    let stampDuty = 0;
    
    // Calculate stamp duty based on location and property type
    if (location === 'scotland') {
      if (propertyValue <= 250000) stampDuty = 0;
      else if (propertyValue <= 400000) stampDuty = (propertyValue - 250000) * 0.05;
      else if (propertyValue <= 750000) stampDuty = 7500 + (propertyValue - 400000) * 0.10;
      else stampDuty = 42500 + (propertyValue - 750000) * 0.12;
    } else if (location === 'wales') {
      if (propertyValue <= 250000) stampDuty = 0;
      else if (propertyValue <= 400000) stampDuty = (propertyValue - 250000) * 0.035;
      else if (propertyValue <= 750000) stampDuty = 5250 + (propertyValue - 400000) * 0.05;
      else if (propertyValue <= 1500000) stampDuty = 22750 + (propertyValue - 750000) * 0.075;
      else stampDuty = 79000 + (propertyValue - 1500000) * 0.10;
    } else {
      // England & Northern Ireland
      if (propertyType === 'additional') {
        if (propertyValue <= 250000) stampDuty = propertyValue * 0.03;
        else if (propertyValue <= 925000) stampDuty = 7500 + (propertyValue - 250000) * 0.08;
        else if (propertyValue <= 1500000) stampDuty = 61500 + (propertyValue - 925000) * 0.13;
        else stampDuty = 136250 + (propertyValue - 1500000) * 0.15;
      } else if (propertyType === 'first-time' && propertyValue <= 625000) {
        if (propertyValue <= 425000) stampDuty = 0;
        else stampDuty = (propertyValue - 425000) * 0.05;
      } else {
        if (propertyValue <= 250000) stampDuty = 0;
        else if (propertyValue <= 925000) stampDuty = (propertyValue - 250000) * 0.05;
        else if (propertyValue <= 1500000) stampDuty = 33750 + (propertyValue - 925000) * 0.10;
        else stampDuty = 91250 + (propertyValue - 1500000) * 0.12;
      }
    }
    
    // Add non-resident surcharge
    if (propertyType === 'non-resident') {
      stampDuty += propertyValue * 0.02;
    }
    
    const legalCosts = Math.max(1500, propertyValue * 0.008);
    const totalCosts = propertyValue + stampDuty + legalCosts;
    
    // Calculate mortgage payments
    const mortgageAmount = propertyValue - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = 25 * 12;
    const monthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate rental yield and cash flow
    const annualRent = rentalIncome * 12;
    const rentalYield = (annualRent / propertyValue) * 100;
    const monthlyCashFlow = rentalIncome - monthlyPayment;
    
    // Update results with null safety
    const elements = {
      resultPropertyValue: '£' + propertyValue.toLocaleString(),
      resultStampDuty: '£' + Math.round(stampDuty).toLocaleString(),
      resultLegalCosts: '£' + Math.round(legalCosts).toLocaleString(),
      resultTotalCosts: '£' + Math.round(totalCosts).toLocaleString(),
      resultMortgagePayment: '£' + Math.round(monthlyPayment).toLocaleString(),
      resultRentalYield: rentalYield.toFixed(2) + '%',
      resultCashFlow: '£' + Math.round(monthlyCashFlow).toLocaleString()
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
    
    const summary = monthlyCashFlow > 0 
      ? `This property generates a ${rentalYield.toFixed(2)}% rental yield with positive monthly cash flow of £${Math.round(monthlyCashFlow).toLocaleString()} after mortgage payments.`
      : `This property generates a ${rentalYield.toFixed(2)}% rental yield but requires £${Math.round(Math.abs(monthlyCashFlow)).toLocaleString()} monthly top-up after mortgage payments.`;
    
    const summaryElement = document.getElementById('investmentSummary');
    if (summaryElement) {
      summaryElement.textContent = summary;
    }
  };

  useEffect(() => {
    // Set default values on component mount
    const propertyValueInput = document.getElementById('propertyValue') as HTMLInputElement;
    const rentalIncomeInput = document.getElementById('rentalIncome') as HTMLInputElement;
    const depositInput = document.getElementById('deposit') as HTMLInputElement;
    const interestRateInput = document.getElementById('interestRate') as HTMLInputElement;
    
    if (propertyValueInput && !propertyValueInput.value) propertyValueInput.value = '250000';
    if (rentalIncomeInput && !rentalIncomeInput.value) rentalIncomeInput.value = '1200';
    if (depositInput && !depositInput.value) depositInput.value = '50000';
    if (interestRateInput && !interestRateInput.value) interestRateInput.value = '5.5';
    
    calculateProperty();
  }, []);

  return (
    <>
      <StructuredData type="property-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 2025 Property Market</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                UK Property Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate stamp duty, property investment returns, rental yields, and mortgage affordability with the latest UK property market data.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">UK Property & Stamp Duty Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate all your property costs including stamp duty, investment returns, and rental yields</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Value (£)
                  </label>
                  <input
                    type="number"
                    id="propertyValue"
                    placeholder="250,000"
                    defaultValue="250000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select id="propertyType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="residential">Residential Property</option>
                    <option value="additional">Additional Property/Buy-to-Let</option>
                    <option value="first-time">First-Time Buyer</option>
                    <option value="non-resident">Non-UK Resident</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select id="location" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="england">England & Northern Ireland</option>
                    <option value="scotland">Scotland</option>
                    <option value="wales">Wales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Monthly Rental Income (£)
                  </label>
                  <input
                    type="number"
                    id="rentalIncome"
                    placeholder="1,200"
                    defaultValue="1200"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deposit Amount (£)
                  </label>
                  <input
                    type="number"
                    id="deposit"
                    placeholder="50,000"
                    defaultValue="50000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mortgage Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    id="interestRate"
                    step="0.01"
                    placeholder="5.5"
                    defaultValue="5.5"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <button 
                  onClick={calculateProperty}
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Property Costs & Returns
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Analysis Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Property Value:</span>
                    <span className="font-semibold text-black" id="resultPropertyValue">£250,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Stamp Duty:</span>
                    <span className="font-semibold text-red-600" id="resultStampDuty">£2,500</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Legal & Survey Costs:</span>
                    <span className="font-semibold text-black" id="resultLegalCosts">£2,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Purchase Costs:</span>
                    <span className="font-semibold text-black" id="resultTotalCosts">£254,500</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Mortgage Payment:</span>
                    <span className="font-semibold text-black" id="resultMortgagePayment">£1,100</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rental Yield (Annual):</span>
                    <span className="font-semibold text-green-600" id="resultRentalYield">5.76%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Monthly Net Cash Flow:</span>
                    <span className="font-bold text-green-600 text-xl" id="resultCashFlow">£100</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Investment Summary</h4>
                  <p className="text-sm text-blue-800" id="investmentSummary">
                    This property generates a 5.76% rental yield with positive monthly cash flow of £100 after mortgage payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Stamp Duty Rates Table */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">UK Stamp Duty Rates 2025</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Standard Residential Rates</h4>
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex justify-between"><span className="text-black">Up to £250,000:</span><span className="font-semibold text-black">0%</span></div>
                    <div className="flex justify-between"><span className="text-black">£250,001 - £925,000:</span><span className="font-semibold text-black">5%</span></div>
                    <div className="flex justify-between"><span className="text-black">£925,001 - £1.5m:</span><span className="font-semibold text-black">10%</span></div>
                    <div className="flex justify-between"><span className="text-black">Over £1.5m:</span><span className="font-semibold text-black">12%</span></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Additional Property Rates</h4>
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex justify-between"><span className="text-black">Up to £250,000:</span><span className="font-semibold text-black">3%</span></div>
                    <div className="flex justify-between"><span className="text-black">£250,001 - £925,000:</span><span className="font-semibold text-black">8%</span></div>
                    <div className="flex justify-between"><span className="text-black">£925,001 - £1.5m:</span><span className="font-semibold text-black">13%</span></div>
                    <div className="flex justify-between"><span className="text-black">Over £1.5m:</span><span className="font-semibold text-black">15%</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h4>
                <p className="text-gray-600 text-sm">Based on latest 2025 UK stamp duty rates and property market data</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏠</div>
                <h4 className="font-semibold text-gray-900 mb-2">Investment Analysis</h4>
                <p className="text-gray-600 text-sm">Calculate rental yields, cash flow, and property investment returns</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Total Cost Breakdown</h4>
                <p className="text-gray-600 text-sm">Includes stamp duty, legal fees, survey costs, and ongoing expenses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}