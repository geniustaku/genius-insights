'use client'
import { useState } from 'react';

export default function SouthAfricaPropertyTransferCalculator() {
  const [propertyValue, setPropertyValue] = useState('');
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [hasHomeLoan, setHasHomeLoan] = useState(true);
  const [loanAmount, setLoanAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateTransferDuty = (value, firstTime = false) => {
    // First-time buyer exemption up to R1,000,000
    if (firstTime && value <= 1000000) return 0;
    
    // 2025 Transfer Duty rates for South Africa
    if (value <= 1000000) return 0;
    if (value <= 1375000) return (value - 1000000) * 0.03;
    if (value <= 1925000) return 11250 + (value - 1375000) * 0.06;
    if (value <= 2475000) return 44250 + (value - 1925000) * 0.08;
    if (value <= 11000000) return 88250 + (value - 2475000) * 0.11;
    return 1026000 + (value - 11000000) * 0.13; // Above R11m
  };

  const calculateTransferCosts = () => {
    const value = parseFloat(propertyValue);
    const loan = parseFloat(loanAmount) || 0;
    
    // Transfer duty
    const transferDuty = calculateTransferDuty(value, isFirstTimeBuyer);
    
    // Transfer attorney fees (approximately 1-1.5% of property value)
    const transferAttorneyFees = value * 0.01;
    
    // Bond attorney fees (if there's a home loan)
    const bondAttorneyFees = hasHomeLoan && loan > 0 ? loan * 0.015 : 0;
    
    // Bond registration costs (0.1% of loan amount, minimum R1500)
    const bondRegistration = hasHomeLoan && loan > 0 ? Math.max(loan * 0.001, 1500) : 0;
    
    // Deeds office fees (fixed fee)
    const deedsOfficeFees = 500;
    
    // Electrical compliance certificate
    const electricalCertificate = 500;
    
    // Pest inspection (if required)
    const pestInspection = 800;
    
    // Property valuation (if home loan)
    const propertyValuation = hasHomeLoan ? 3500 : 0;
    
    // Bond origination fee (if home loan)
    const bondOriginationFee = hasHomeLoan && loan > 0 ? loan * 0.006 : 0; // ~0.6%
    
    // FICA compliance
    const ficaCompliance = 300;
    
    // Postage and petties
    const postageAndPetties = 1200;
    
    // VAT on attorney fees (15%)
    const vatOnTransferFees = transferAttorneyFees * 0.15;
    const vatOnBondFees = bondAttorneyFees * 0.15;
    
    // Total calculations
    const totalAttorneyFees = transferAttorneyFees + bondAttorneyFees;
    const totalVAT = vatOnTransferFees + vatOnBondFees;
    const totalMiscFees = deedsOfficeFees + electricalCertificate + pestInspection + 
                         propertyValuation + ficaCompliance + postageAndPetties;
    
    const totalTransferCosts = transferDuty + totalAttorneyFees + totalVAT + 
                              bondRegistration + bondOriginationFee + totalMiscFees;
    
    // Calculate percentages
    const transferDutyPercent = (transferDuty / value) * 100;
    const totalCostPercent = (totalTransferCosts / value) * 100;
    
    return {
      propertyValue: value,
      loanAmount: loan,
      transferDuty,
      transferAttorneyFees,
      bondAttorneyFees,
      totalAttorneyFees,
      vatOnTransferFees,
      vatOnBondFees,
      totalVAT,
      bondRegistration,
      bondOriginationFee,
      deedsOfficeFees,
      electricalCertificate,
      pestInspection,
      propertyValuation,
      ficaCompliance,
      postageAndPetties,
      totalMiscFees,
      totalTransferCosts,
      transferDutyPercent,
      totalCostPercent,
      cashDeposit: value - loan,
      totalCashRequired: (value - loan) + totalTransferCosts
    };
  };

  const handleCalculate = () => {
    if (!propertyValue || propertyValue <= 0) return;
    
    setLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const costs = calculateTransferCosts();
      setResult(costs);
      setLoading(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLargeCurrency = (amount) => {
    if (amount >= 1000000) {
      return `R${(amount / 1000000).toFixed(2)}M`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          🏠 SA Property Transfer Cost Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Calculate all property transfer costs with 2025 South African rates
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            🏠 Property Purchase Price
          </label>
          <input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            placeholder="e.g. 2000000"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="firstTimeBuyer"
                checked={isFirstTimeBuyer}
                onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                className="w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="firstTimeBuyer" className="text-sm font-semibold text-gray-900">
                🎉 First-time property buyer (transfer duty exemption up to R1M)
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasHomeLoan"
                checked={hasHomeLoan}
                onChange={(e) => setHasHomeLoan(e.target.checked)}
                className="w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="hasHomeLoan" className="text-sm font-semibold text-gray-900">
                🏦 Purchasing with a home loan/bond
              </label>
            </div>
          </div>

          {hasHomeLoan && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                💰 Home Loan Amount
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="e.g. 1600000"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          )}
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || !propertyValue}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate Transfer Costs</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Your Property Transfer Costs
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Property Value</p>
                <p className="text-lg font-bold text-gray-800">{formatLargeCurrency(result.propertyValue)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Transfer Duty</p>
                <p className="text-lg font-bold">{formatCurrency(result.transferDuty)}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Costs</p>
                <p className="text-lg font-bold text-gray-800">{formatCurrency(result.totalTransferCosts)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">Cash Required</p>
                <p className="text-lg font-bold">{formatLargeCurrency(result.totalCashRequired)}</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Government Fees
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transfer Duty ({result.transferDutyPercent.toFixed(1)}%):</span>
                    <span className="font-medium">{formatCurrency(result.transferDuty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deeds Office Fees:</span>
                    <span className="font-medium">{formatCurrency(result.deedsOfficeFees)}</span>
                  </div>
                  {hasHomeLoan && result.bondRegistration > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Registration:</span>
                      <span className="font-medium">{formatCurrency(result.bondRegistration)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Government Total:</span>
                    <span>{formatCurrency(result.transferDuty + result.deedsOfficeFees + result.bondRegistration)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">⚖️</span>
                  Attorney Fees
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transfer Attorney Fees:</span>
                    <span className="font-medium">{formatCurrency(result.transferAttorneyFees)}</span>
                  </div>
                  {hasHomeLoan && result.bondAttorneyFees > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Attorney Fees:</span>
                      <span className="font-medium">{formatCurrency(result.bondAttorneyFees)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">VAT on Attorney Fees:</span>
                    <span className="font-medium">{formatCurrency(result.totalVAT)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Attorney Total:</span>
                    <span>{formatCurrency(result.totalAttorneyFees + result.totalVAT)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Additional Costs
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Electrical Certificate:</span>
                    <span className="font-medium">{formatCurrency(result.electricalCertificate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pest Inspection:</span>
                    <span className="font-medium">{formatCurrency(result.pestInspection)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FICA Compliance:</span>
                    <span className="font-medium">{formatCurrency(result.ficaCompliance)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  {hasHomeLoan && result.propertyValuation > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Valuation:</span>
                      <span className="font-medium">{formatCurrency(result.propertyValuation)}</span>
                    </div>
                  )}
                  {hasHomeLoan && result.bondOriginationFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Origination Fee:</span>
                      <span className="font-medium">{formatCurrency(result.bondOriginationFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Postage & Petties:</span>
                    <span className="font-medium">{formatCurrency(result.postageAndPetties)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mt-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💰</span>
                Financial Summary
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Property Value</p>
                  <p className="text-xl font-bold text-gray-800">{formatLargeCurrency(result.propertyValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Deposit Required</p>
                  <p className="text-xl font-bold text-blue-600">{formatLargeCurrency(result.cashDeposit)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Cash Needed</p>
                  <p className="text-xl font-bold text-red-600">{formatLargeCurrency(result.totalCashRequired)}</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-orange-100 rounded-lg text-center">
                <p className="text-sm text-orange-800">
                  <strong>Transfer costs represent {result.totalCostPercent.toFixed(1)}% of the property value</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-loan-calculator"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🏠</span>
              <span>Calculate Home Loan</span>
            </a>
            
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Calculate Income Tax</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              📋 <strong>Important:</strong> These calculations are estimates based on typical costs and 2025 rates. 
              Actual fees may vary between attorneys and conveyancers. Always get multiple quotes for comparison.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}