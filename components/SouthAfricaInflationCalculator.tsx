'use client';

import { useState } from 'react';

interface InflationResult {
  futureValue: number;
  pastValue: number;
  totalInflation: number;
  averageAnnualRate: number;
  purchasingPowerLoss: number;
}

export default function SouthAfricaInflationCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [startYear, setStartYear] = useState<number>(2014);
  const [endYear, setEndYear] = useState<number>(2024);
  const [calculationType, setCalculationType] = useState<string>('forward');

  const [result, setResult] = useState<InflationResult | null>(null);

  // Historical SA CPI inflation rates
  const inflationRates: { [key: number]: number } = {
    2010: 4.3, 2011: 5.0, 2012: 5.7, 2013: 5.8, 2014: 6.1,
    2015: 4.6, 2016: 6.3, 2017: 5.3, 2018: 4.7, 2019: 4.1,
    2020: 3.3, 2021: 4.5, 2022: 6.9, 2023: 5.9, 2024: 4.4,
    2025: 4.5, // Forecast
  };

  const calculateInflation = () => {
    const years = Math.abs(endYear - startYear);
    let cumulativeInflation = 1;

    // Calculate cumulative inflation
    const actualStartYear = Math.min(startYear, endYear);
    const actualEndYear = Math.max(startYear, endYear);

    for (let year = actualStartYear; year < actualEndYear; year++) {
      const rate = inflationRates[year] || 5.0; // Default 5% if no data
      cumulativeInflation *= (1 + rate / 100);
    }

    let futureValue: number;
    let pastValue: number;

    if (calculationType === 'forward') {
      // Calculate what amount will be worth in future
      futureValue = amount * cumulativeInflation;
      pastValue = amount;
    } else {
      // Calculate what was needed in past to equal amount today
      futureValue = amount;
      pastValue = amount / cumulativeInflation;
    }

    const totalInflation = (cumulativeInflation - 1) * 100;
    const averageAnnualRate = years > 0
      ? (Math.pow(cumulativeInflation, 1 / years) - 1) * 100
      : 0;
    const purchasingPowerLoss = ((cumulativeInflation - 1) / cumulativeInflation) * 100;

    setResult({
      futureValue,
      pastValue,
      totalInflation,
      averageAnnualRate,
      purchasingPowerLoss,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const years = Array.from({ length: 26 }, (_, i) => 2010 + i);

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Inflation Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate the effects of inflation on your money</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Type
            </label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            >
              <option value="forward">How much will I need in the future?</option>
              <option value="backward">What was money worth in the past?</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (R)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calculationType === 'forward' ? 'From Year' : 'From Year'}
              </label>
              <select
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calculationType === 'forward' ? 'To Year' : 'To Year'}
              </label>
              <select
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-black"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-2">Recent SA Inflation Rates</h4>
            <div className="grid grid-cols-3 gap-2 text-sm text-indigo-800">
              <span>2024: 4.4%</span>
              <span>2023: 5.9%</span>
              <span>2022: 6.9%</span>
              <span>2021: 4.5%</span>
              <span>2020: 3.3%</span>
              <span>2019: 4.1%</span>
            </div>
          </div>

          <button
            onClick={calculateInflation}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all"
          >
            Calculate Inflation Impact
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Inflation Impact</h3>

            {calculationType === 'forward' ? (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                <p className="text-sm text-gray-600 mb-2">{formatCurrency(amount)} in {startYear} equals</p>
                <p className="text-4xl font-bold text-indigo-600">{formatCurrency(result.futureValue)}</p>
                <p className="text-sm text-gray-500 mt-2">in {endYear} (adjusted for inflation)</p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                <p className="text-sm text-gray-600 mb-2">{formatCurrency(amount)} today was worth</p>
                <p className="text-4xl font-bold text-indigo-600">{formatCurrency(result.pastValue)}</p>
                <p className="text-sm text-gray-500 mt-2">in {startYear} (adjusted for inflation)</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
                <p className="text-xs text-gray-600 mb-1">Total Inflation</p>
                <p className="text-xl font-bold text-red-600">{result.totalInflation.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Over {Math.abs(endYear - startYear)} years</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Average Annual Rate</p>
                <p className="text-xl font-bold text-blue-600">{result.averageAnnualRate.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Per year</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <p className="text-sm text-gray-600 mb-2">Purchasing Power Lost</p>
              <p className="text-3xl font-bold text-orange-600">{result.purchasingPowerLoss.toFixed(1)}%</p>
              <p className="text-sm text-gray-500 mt-2">
                {formatCurrency(amount)} in {startYear} buys {result.purchasingPowerLoss.toFixed(0)}% less today
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">What This Means</h4>
              <p className="text-sm text-yellow-800">
                {calculationType === 'forward'
                  ? `To maintain the same purchasing power as ${formatCurrency(amount)} in ${startYear}, you'll need ${formatCurrency(result.futureValue)} in ${endYear}.`
                  : `${formatCurrency(amount)} today has the same buying power as ${formatCurrency(result.pastValue)} did in ${startYear}.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Inflation Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Understanding South African Inflation</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3">SARB Target</h4>
            <p className="text-sm text-gray-700">
              The SA Reserve Bank targets inflation between 3-6%. When inflation exceeds this,
              they typically raise interest rates to cool the economy.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-3">Beat Inflation</h4>
            <p className="text-sm text-gray-700">
              To maintain purchasing power, your savings must grow faster than inflation.
              Consider equity investments, property, or inflation-linked bonds.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-3">Salary Increases</h4>
            <p className="text-sm text-gray-700">
              If your salary doesn't increase by at least the inflation rate, you're
              effectively earning less each year in real terms.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-900 mb-2">10-Year Perspective</h4>
          <p className="text-sm text-indigo-800">
            Over the past 10 years (2014-2024), SA inflation averaged about 5.1% per year.
            This means prices roughly doubled over this period, and R1,000 in 2014 has
            the same buying power as about R1,650 today.
          </p>
        </div>
      </div>
    </div>
  );
}
