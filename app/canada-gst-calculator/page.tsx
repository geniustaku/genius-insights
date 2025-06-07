'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function CanadaGSTHSTCalculator() {
  type Province = keyof typeof taxRates;
  
  const [formData, setFormData] = useState({
    amount: 1000,
    province: 'ontario' as Province,
    calculationType: 'add-tax' as 'add-tax' | 'remove-tax',
    businessType: 'general'
  });

  const [results, setResults] = useState({
    baseAmount: 0,
    gstAmount: 0,
    pstAmount: 0,
    hstAmount: 0,
    totalTax: 0,
    totalAmount: 0,
    taxRate: 0
  });

  // 2025 Canada tax rates by province/territory
  const taxRates = {
    'alberta': { gst: 5, pst: 0, hst: 0, name: 'Alberta' },
    'british-columbia': { gst: 5, pst: 7, hst: 0, name: 'British Columbia' },
    'manitoba': { gst: 5, pst: 7, hst: 0, name: 'Manitoba' },
    'new-brunswick': { gst: 0, pst: 0, hst: 15, name: 'New Brunswick' },
    'newfoundland': { gst: 0, pst: 0, hst: 15, name: 'Newfoundland and Labrador' },
    'northwest-territories': { gst: 5, pst: 0, hst: 0, name: 'Northwest Territories' },
    'nova-scotia': { gst: 0, pst: 0, hst: 15, name: 'Nova Scotia' },
    'nunavut': { gst: 5, pst: 0, hst: 0, name: 'Nunavut' },
    'ontario': { gst: 0, pst: 0, hst: 13, name: 'Ontario' },
    'prince-edward-island': { gst: 0, pst: 0, hst: 15, name: 'Prince Edward Island' },
    'quebec': { gst: 5, pst: 9.975, hst: 0, name: 'Quebec' },
    'saskatchewan': { gst: 5, pst: 6, hst: 0, name: 'Saskatchewan' },
    'yukon': { gst: 5, pst: 0, hst: 0, name: 'Yukon' }
  };

  const businessTypes = {
    'general': 'General Goods & Services',
    'food': 'Food & Beverages',
    'medical': 'Medical Services',
    'books': 'Books & Educational',
    'childcare': 'Childcare Services'
  };

  const calculateTax = () => {
    const { amount, province, calculationType } = formData;
    const rates = taxRates[province];
    
    let baseAmount = 0;
    let gstAmount = 0;
    let pstAmount = 0;
    let hstAmount = 0;
    let totalTax = 0;
    let totalAmount = 0;
    let totalTaxRate = 0;

    // Calculate total tax rate
    if (rates.hst > 0) {
      totalTaxRate = rates.hst;
    } else {
      totalTaxRate = rates.gst + rates.pst;
    }

    if (calculationType === 'add-tax') {
      // Adding tax to base amount (tax-exclusive to tax-inclusive)
      baseAmount = amount;
      
      if (rates.hst > 0) {
        // HST provinces
        hstAmount = (amount * rates.hst) / 100;
        totalTax = hstAmount;
      } else {
        // GST + PST provinces
        gstAmount = (amount * rates.gst) / 100;
        pstAmount = (amount * rates.pst) / 100;
        totalTax = gstAmount + pstAmount;
      }
      
      totalAmount = baseAmount + totalTax;
    } else {
      // Removing tax from total amount (tax-inclusive to tax-exclusive)
      totalAmount = amount;
      baseAmount = amount / (1 + totalTaxRate / 100);
      totalTax = amount - baseAmount;
      
      if (rates.hst > 0) {
        // HST provinces
        hstAmount = totalTax;
      } else {
        // GST + PST provinces
        const gstRate = rates.gst / totalTaxRate;
        const pstRate = rates.pst / totalTaxRate;
        gstAmount = totalTax * gstRate;
        pstAmount = totalTax * pstRate;
      }
    }

    setResults({
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      pstAmount: Math.round(pstAmount * 100) / 100,
      hstAmount: Math.round(hstAmount * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      taxRate: totalTaxRate
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    let processedValue = value;
    
    if (field === 'amount' && typeof value === 'string' && value !== '') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      processedValue = parseFloat(numericValue) || 0;
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateTax();
  }, [formData]);

  const currentRates = taxRates[formData.province];

  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇨🇦 {results.taxRate}% Tax Rate</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Canada GST/HST Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate GST, HST, and PST for all Canadian provinces and territories. CRA compliant tax calculations for businesses and consumers.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Canada GST/HST Tax Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate sales tax for all Canadian provinces and territories</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (CAD $)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="1000.00"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
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
                    {Object.entries(taxRates).map(([key, data]) => (
                      <option key={key} value={key}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calculation Type
                  </label>
                  <select 
                    value={formData.calculationType}
                    onChange={(e) => handleInputChange('calculationType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="add-tax">Add Tax (Tax-Exclusive to Tax-Inclusive)</option>
                    <option value="remove-tax">Remove Tax (Tax-Inclusive to Tax-Exclusive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select 
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(businessTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Tax Rates - {currentRates.name}</h3>
                  <div className="space-y-2">
                    {currentRates.hst > 0 ? (
                      <div className="flex justify-between">
                        <span className="text-gray-600">HST:</span>
                        <span className="font-semibold text-red-600">{currentRates.hst}%</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">GST:</span>
                          <span className="font-semibold text-blue-600">{currentRates.gst}%</span>
                        </div>
                        {currentRates.pst > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">PST:</span>
                            <span className="font-semibold text-green-600">{currentRates.pst}%</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-900 font-medium">Total Tax Rate:</span>
                      <span className="font-bold text-red-600">{results.taxRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Province/Territory:</span>
                    <span className="font-semibold text-black">{currentRates.name}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Calculation Type:</span>
                    <span className="font-semibold text-black">
                      {formData.calculationType === 'add-tax' ? 'Adding Tax' : 'Removing Tax'}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Base Amount:</span>
                    <span className="font-semibold text-blue-600 text-xl">CAD ${results.baseAmount.toFixed(2)}</span>
                  </div>

                  {results.hstAmount > 0 ? (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">HST ({currentRates.hst}%):</span>
                      <span className="font-semibold text-red-600">CAD ${results.hstAmount.toFixed(2)}</span>
                    </div>
                  ) : (
                    <>
                      {results.gstAmount > 0 && (
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">GST ({currentRates.gst}%):</span>
                          <span className="font-semibold text-blue-600">CAD ${results.gstAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {results.pstAmount > 0 && (
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">PST ({currentRates.pst}%):</span>
                          <span className="font-semibold text-green-600">CAD ${results.pstAmount.toFixed(2)}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Tax:</span>
                    <span className="font-semibold text-red-600 text-xl">CAD ${results.totalTax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Amount:</span>
                    <span className="font-bold text-red-600 text-2xl">CAD ${results.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Tax Summary</h4>
                  <p className="text-sm text-blue-800">
                    {formData.calculationType === 'add-tax' ? 
                      `Adding ${results.taxRate}% tax to CAD $${results.baseAmount.toFixed(2)} gives a total of CAD $${results.totalAmount.toFixed(2)} including CAD $${results.totalTax.toFixed(2)} in taxes.` :
                      `Removing ${results.taxRate}% tax from CAD $${results.totalAmount.toFixed(2)} gives a base amount of CAD $${results.baseAmount.toFixed(2)} with CAD $${results.totalTax.toFixed(2)} in taxes.`
                    }
                  </p>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">CRA Compliance</h4>
                  <p className="text-sm text-green-800">
                    Calculations are based on current Canada Revenue Agency (CRA) tax rates for {currentRates.name} and are updated for 2025.
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Information by Province */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">2025 Canadian Tax Rates by Province</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(taxRates).slice(0, 6).map(([key, rates]) => {
                  const totalRate = rates.hst || (rates.gst + rates.pst);
                  return (
                    <div key={key} className="bg-gray-50 rounded-xl p-6 text-center">
                      <h4 className="font-semibold text-gray-900 mb-2">{rates.name}</h4>
                      <div className="text-2xl font-bold text-red-600 mb-2">{totalRate}%</div>
                      <p className="text-sm text-gray-600">
                        {rates.hst ? `HST: ${rates.hst}%` : 
                         `GST: ${rates.gst}%${rates.pst ? ` + PST: ${rates.pst}%` : ''}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇨🇦</div>
                <h4 className="font-semibold text-gray-900 mb-2">All Provinces & Territories</h4>
                <p className="text-gray-600 text-sm">Complete coverage of GST, HST, and PST rates across Canada</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">CRA Compliant</h4>
                <p className="text-gray-600 text-sm">Calculations based on current Canada Revenue Agency tax rates</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Business Ready</h4>
                <p className="text-gray-600 text-sm">Perfect for invoicing, pricing, and tax planning for Canadian businesses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}