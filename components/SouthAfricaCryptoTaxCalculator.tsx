'use client';

import { useState } from 'react';

export default function SouthAfricaCryptoTaxCalculator() {
  const [transactionType, setTransactionType] = useState<'capital-gain' | 'trading-income'>('capital-gain');
  const [purchasePrice, setPurchasePrice] = useState<number>(50000);
  const [salePrice, setSalePrice] = useState<number>(80000);
  const [tradingFees, setTradingFees] = useState<number>(500);
  const [numberOfTrades, setNumberOfTrades] = useState<number>(10);
  const [totalTradingRevenue, setTotalTradingRevenue] = useState<number>(500000);
  const [totalTradingExpenses, setTotalTradingExpenses] = useState<number>(450000);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(8); // months
  const [marginalTaxRate, setMarginalTaxRate] = useState<number>(31);

  const ANNUAL_CGT_EXCLUSION = 40000;
  const CGT_INCLUSION_RATE = 0.40; // 40% for individuals

  const calculateTax = () => {
    if (transactionType === 'capital-gain') {
      // Capital Gains Tax calculation
      const grossGain = salePrice - purchasePrice - tradingFees;
      const gainAfterExclusion = Math.max(0, grossGain - ANNUAL_CGT_EXCLUSION);
      const taxableGain = gainAfterExclusion * CGT_INCLUSION_RATE;
      const cgtTax = taxableGain * (marginalTaxRate / 100);
      const netProfit = grossGain - cgtTax;
      const effectiveTaxRate = grossGain > 0 ? (cgtTax / grossGain) * 100 : 0;

      const isTradingActivity = numberOfTrades > 50 || holdingPeriod < 3;

      return {
        type: 'capital-gain',
        grossGain,
        annualExclusion: Math.min(grossGain, ANNUAL_CGT_EXCLUSION),
        gainAfterExclusion,
        inclusionRate: CGT_INCLUSION_RATE * 100,
        taxableGain,
        marginalRate: marginalTaxRate,
        cgtTax,
        netProfit,
        effectiveTaxRate,
        isTradingActivity,
        recommendation: isTradingActivity
          ? 'Warning: High trading frequency may be classified as trading income by SARS, not capital gains.'
          : 'Likely qualifies as capital gain if held as investment.'
      };
    } else {
      // Trading Income calculation
      const tradingProfit = totalTradingRevenue - totalTradingExpenses;
      const incomeTax = tradingProfit * (marginalTaxRate / 100);
      const netProfit = tradingProfit - incomeTax;
      const effectiveTaxRate = tradingProfit > 0 ? (incomeTax / tradingProfit) * 100 : 0;

      return {
        type: 'trading-income',
        tradingRevenue: totalTradingRevenue,
        tradingExpenses: totalTradingExpenses,
        tradingProfit,
        marginalRate: marginalTaxRate,
        incomeTax,
        netProfit,
        effectiveTaxRate,
        recommendation: 'Crypto trading as primary activity is taxed as normal income, not capital gains.'
      };
    }
  };

  const results = calculateTax();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cryptocurrency Tax Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate crypto CGT & trading income tax with SARS compliance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as any)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="capital-gain">Capital Gain (Long-term holding)</option>
              <option value="trading-income">Trading Income (Active trading)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              SARS determines tax treatment based on your trading activity
            </p>
          </div>

          {transactionType === 'capital-gain' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price (ZAR)
                </label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price (ZAR)
                </label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trading Fees & Costs (ZAR)
                </label>
                <input
                  type="number"
                  value={tradingFees}
                  onChange={(e) => setTradingFees(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Exchange fees, network fees, etc.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Holding Period (months)
                </label>
                <input
                  type="number"
                  value={holdingPeriod}
                  onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Number of Trades
                </label>
                <input
                  type="number"
                  value={numberOfTrades}
                  onChange={(e) => setNumberOfTrades(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Helps determine if classified as trading</p>
              </div>
            </>
          )}

          {transactionType === 'trading-income' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Trading Revenue (ZAR)
                </label>
                <input
                  type="number"
                  value={totalTradingRevenue}
                  onChange={(e) => setTotalTradingRevenue(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Trading Expenses (ZAR)
                </label>
                <input
                  type="number"
                  value={totalTradingExpenses}
                  onChange={(e) => setTotalTradingExpenses(Number(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Cost basis + fees + other costs</p>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Marginal Tax Rate (%)
            </label>
            <select
              value={marginalTaxRate}
              onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="18">18% (R0 - R237,100)</option>
              <option value="26">26% (R237,101 - R370,500)</option>
              <option value="31">31% (R370,501 - R512,800)</option>
              <option value="36">36% (R512,801 - R673,000)</option>
              <option value="39">39% (R673,001 - R857,900)</option>
              <option value="41">41% (R857,901 - R1,817,000)</option>
              <option value="45">45% (R1,817,001+)</option>
            </select>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Calculation Results</h3>

          {results.type === 'capital-gain' && 'grossGain' in results && (
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Gross Capital Gain:</span>
                <span className="font-semibold text-black">R{results.grossGain?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Annual Exclusion:</span>
                <span className="font-semibold text-green-600">-R{results.annualExclusion?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Gain After Exclusion:</span>
                <span className="font-semibold text-black">R{results.gainAfterExclusion?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Inclusion Rate:</span>
                <span className="font-semibold text-black">{results.inclusionRate}%</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Taxable Capital Gain:</span>
                <span className="font-semibold text-orange-600">R{results.taxableGain?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Marginal Tax Rate:</span>
                <span className="font-semibold text-black">{results.marginalRate}%</span>
              </div>

              <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                <span className="text-gray-900 font-medium">CGT Tax Payable:</span>
                <span className="font-bold text-red-600 text-xl">R{results.cgtTax?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                <span className="text-gray-900 font-medium">Net Profit After Tax:</span>
                <span className="font-bold text-green-600 text-xl">R{results.netProfit?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Effective Tax Rate:</span>
                <span className="font-semibold text-black">{results.effectiveTaxRate?.toFixed(2)}%</span>
              </div>

              {results.isTradingActivity && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <p className="text-sm text-yellow-900 font-medium">⚠️ {results.recommendation}</p>
                </div>
              )}

              {!results.isTradingActivity && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-sm text-green-900 font-medium">✓ {results.recommendation}</p>
                </div>
              )}
            </div>
          )}

          {results.type === 'trading-income' && 'tradingProfit' in results && (
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Trading Revenue:</span>
                <span className="font-semibold text-black">R{results.tradingRevenue?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Trading Expenses:</span>
                <span className="font-semibold text-red-600">-R{results.tradingExpenses?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Trading Profit:</span>
                <span className="font-semibold text-black">R{results.tradingProfit?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Marginal Tax Rate:</span>
                <span className="font-semibold text-black">{results.marginalRate}%</span>
              </div>

              <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                <span className="text-gray-900 font-medium">Income Tax Payable:</span>
                <span className="font-bold text-red-600 text-xl">R{results.incomeTax?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                <span className="text-gray-900 font-medium">Net Profit After Tax:</span>
                <span className="font-bold text-green-600 text-xl">R{results.netProfit?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Effective Tax Rate:</span>
                <span className="font-semibold text-black">{results.effectiveTaxRate?.toFixed(2)}%</span>
              </div>

              <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">ℹ️ {results.recommendation}</p>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-orange-100 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">💡 Tax Summary</h4>
            <p className="text-sm text-orange-800">
              {results.type === 'capital-gain' && 'cgtTax' in results
                ? `You'll pay R${results.cgtTax?.toLocaleString()} in CGT on your crypto gain, leaving R${results.netProfit?.toLocaleString()} net profit.`
                : results.type === 'trading-income' && 'incomeTax' in results
                ? `Your crypto trading profit of R${results.tradingProfit?.toLocaleString()} will be taxed at ${results.marginalRate}% as regular income.`
                : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
