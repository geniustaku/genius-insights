'use client';

import { useState } from 'react';

export default function SouthAfricaCapitalGainsTaxCalculator() {
  const [assetType, setAssetType] = useState<'property' | 'shares' | 'crypto' | 'other'>('property');
  const [purchasePrice, setPurchasePrice] = useState<number>(1000000);
  const [salePrice, setSalePrice] = useState<number>(1500000);
  const [purchaseCosts, setPurchaseCosts] = useState<number>(50000);
  const [improvementCosts, setImprovementCosts] = useState<number>(100000);
  const [sellingCosts, setSellingCosts] = useState<number>(75000);
  const [taxPayerType, setTaxPayerType] = useState<'individual' | 'company' | 'trust'>('individual');
  const [individualAge, setIndividualAge] = useState<number>(35);

  // 2025 Annual Exclusion
  const ANNUAL_EXCLUSION = 40000;

  // Inclusion rates
  const INCLUSION_RATES = {
    individual: 0.40, // 40%
    company: 0.80, // 80%
    trust: 0.80 // 80%
  };

  const calculate = () => {
    // Calculate capital gain
    const totalCosts = purchasePrice + purchaseCosts + improvementCosts + sellingCosts;
    const capitalGain = salePrice - totalCosts;

    // Apply annual exclusion (individuals and special trusts only)
    const exclusionApplies = taxPayerType === 'individual';
    const taxableGainBeforeInclusion = exclusionApplies
      ? Math.max(0, capitalGain - ANNUAL_EXCLUSION)
      : capitalGain;

    // Apply inclusion rate
    const inclusionRate = INCLUSION_RATES[taxPayerType];
    const taxableCapitalGain = taxableGainBeforeInclusion * inclusionRate;

    // Estimate tax based on marginal rate (simplified)
    let estimatedMarginalRate = 0.31; // Average marginal rate
    if (taxPayerType === 'individual') {
      if (salePrice > 1817000) estimatedMarginalRate = 0.45;
      else if (salePrice > 857900) estimatedMarginalRate = 0.41;
      else if (salePrice > 673000) estimatedMarginalRate = 0.39;
      else if (salePrice > 512800) estimatedMarginalRate = 0.36;
    } else if (taxPayerType === 'company') {
      estimatedMarginalRate = 0.27;
    } else {
      estimatedMarginalRate = 0.45; // Trust rate
    }

    const cgtTax = taxableCapitalGain * estimatedMarginalRate;
    const netProfit = capitalGain - cgtTax;
    const effectiveTaxRate = capitalGain > 0 ? (cgtTax / capitalGain) * 100 : 0;

    return {
      capitalGain,
      annualExclusion: exclusionApplies ? ANNUAL_EXCLUSION : 0,
      taxableGainBeforeInclusion,
      inclusionRate: inclusionRate * 100,
      taxableCapitalGain,
      estimatedMarginalRate: estimatedMarginalRate * 100,
      cgtTax,
      netProfit,
      effectiveTaxRate
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Capital Gains Tax Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate CGT on property, shares, crypto & other assets with 2025 rates</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Type
            </label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as any)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="property">Property/Real Estate</option>
              <option value="shares">Shares/Stocks</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="other">Other Assets</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxpayer Type
            </label>
            <select
              value={taxPayerType}
              onChange={(e) => setTaxPayerType(e.target.value as any)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="trust">Trust</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Price (R)
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sale Price (R)
            </label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Costs (agent fees, transfer duty) (R)
            </label>
            <input
              type="number"
              value={purchaseCosts}
              onChange={(e) => setPurchaseCosts(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Improvement Costs (renovations, upgrades) (R)
            </label>
            <input
              type="number"
              value={improvementCosts}
              onChange={(e) => setImprovementCosts(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selling Costs (agent commission, legal fees) (R)
            </label>
            <input
              type="number"
              value={sellingCosts}
              onChange={(e) => setSellingCosts(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
            />
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">CGT Calculation Results</h3>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Capital Gain:</span>
              <span className="font-semibold text-black">R{results.capitalGain.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {results.annualExclusion > 0 && (
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Annual Exclusion:</span>
                <span className="font-semibold text-green-600">-R{results.annualExclusion.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Gain After Exclusion:</span>
              <span className="font-semibold text-black">R{results.taxableGainBeforeInclusion.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Inclusion Rate:</span>
              <span className="font-semibold text-black">{results.inclusionRate}%</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Taxable Capital Gain:</span>
              <span className="font-semibold text-orange-600">R{results.taxableCapitalGain.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Estimated Marginal Rate:</span>
              <span className="font-semibold text-black">{results.estimatedMarginalRate.toFixed(0)}%</span>
            </div>

            <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
              <span className="text-gray-900 font-medium">CGT Tax Payable:</span>
              <span className="font-bold text-red-600 text-xl">R{results.cgtTax.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
              <span className="text-gray-900 font-medium">Net Profit After CGT:</span>
              <span className="font-bold text-green-600 text-xl">R{results.netProfit.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Effective CGT Rate:</span>
              <span className="font-semibold text-black">{results.effectiveTaxRate.toFixed(2)}%</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 CGT Summary</h4>
            <p className="text-sm text-blue-800">
              You made a capital gain of R{results.capitalGain.toLocaleString()}.
              After the R{results.annualExclusion.toLocaleString()} annual exclusion and {results.inclusionRate}% inclusion rate,
              you'll pay approximately R{results.cgtTax.toLocaleString()} in CGT,
              leaving you with a net profit of R{results.netProfit.toLocaleString()}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
