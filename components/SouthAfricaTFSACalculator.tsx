'use client';

import { useState } from 'react';

export default function SouthAfricaTFSACalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(2900);
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [yearsToInvest, setYearsToInvest] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(10); // % p.a.
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [currentTFSABalance, setCurrentTFSABalance] = useState<number>(0);
  const [contributedToDate, setContributedToDate] = useState<number>(0);

  // TFSA limits 2024/2025
  const ANNUAL_LIMIT = 36000; // R36,000 per tax year
  const LIFETIME_LIMIT = 500000; // R500,000 lifetime contribution limit

  const calculate = () => {
    // Calculate total annual contribution
    const annualContribution = (monthlyContribution * 12) + initialDeposit;

    // Check if exceeding annual limit
    const exceedsAnnualLimit = annualContribution > ANNUAL_LIMIT;
    const adjustedAnnualContribution = Math.min(annualContribution, ANNUAL_LIMIT);
    const adjustedMonthlyContribution = exceedsAnnualLimit
      ? (ANNUAL_LIMIT - initialDeposit) / 12
      : monthlyContribution;

    // Calculate total contributions over investment period
    let totalContributions = contributedToDate;
    let yearsUntilLifetimeLimit = yearsToInvest;

    for (let year = 0; year < yearsToInvest; year++) {
      const yearContribution = year === 0 ? adjustedAnnualContribution : ANNUAL_LIMIT;
      if (totalContributions + yearContribution > LIFETIME_LIMIT) {
        // Hit lifetime limit
        const remainingRoom = LIFETIME_LIMIT - totalContributions;
        totalContributions = LIFETIME_LIMIT;
        yearsUntilLifetimeLimit = year + (remainingRoom / ANNUAL_LIMIT);
        break;
      }
      totalContributions += yearContribution;
    }

    const hitLifetimeLimit = totalContributions >= LIFETIME_LIMIT;

    // Calculate compound growth
    const monthlyRate = expectedReturn / 100 / 12;
    let balance = currentTFSABalance + initialDeposit;
    let month = 0;
    const maxMonths = Math.min(yearsToInvest * 12, yearsUntilLifetimeLimit * 12);

    for (month = 0; month < maxMonths; month++) {
      // Add monthly contribution (if we haven't hit limit)
      const monthContribution = month === 0 ? 0 : adjustedMonthlyContribution;
      balance += monthContribution;
      // Apply interest
      balance = balance * (1 + monthlyRate);
    }

    const finalBalance = balance;
    const totalInvestment = totalContributions;
    const totalGrowth = finalBalance - totalInvestment;

    // Tax comparison (what you'd pay if not in TFSA)
    // Assuming 40% CGT inclusion rate + 31% marginal rate = 12.4% effective CGT
    const effectiveCGTRate = 0.40 * 0.31; // 12.4%
    const taxSaved = totalGrowth * effectiveCGTRate;

    // Remaining lifetime contribution room
    const lifetimeRoom = Math.max(0, LIFETIME_LIMIT - totalContributions);

    // Years to max out (at current contribution rate)
    const yearsToMaxOut = lifetimeRoom > 0 ? lifetimeRoom / ANNUAL_LIMIT : 0;

    // Age when maxed out
    const ageWhenMaxed = hitLifetimeLimit ? currentAge + yearsUntilLifetimeLimit : currentAge + yearsToMaxOut;

    // Return on investment
    const roi = totalInvestment > 0 ? ((finalBalance - totalInvestment) / totalInvestment) * 100 : 0;

    return {
      // Contributions
      monthlyContribution: adjustedMonthlyContribution,
      annualContribution: adjustedAnnualContribution,
      totalContributions: totalInvestment,
      contributedToDate,

      // Growth
      finalBalance,
      totalGrowth,
      roi,

      // Tax benefits
      taxSaved,

      // Limits
      annualLimit: ANNUAL_LIMIT,
      lifetimeLimit: LIFETIME_LIMIT,
      lifetimeRoom,
      exceedsAnnualLimit,
      hitLifetimeLimit,
      yearsToMaxOut,
      ageWhenMaxed,
      yearsUntilLifetimeLimit,

      // Additional calculations
      effectiveAnnualReturn: expectedReturn,
      yearsInvested: yearsToInvest
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tax-Free Savings Account (TFSA) Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate TFSA growth, tax savings & contribution limits</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Age
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current TFSA Balance (R)
            </label>
            <input
              type="number"
              value={currentTFSABalance}
              onChange={(e) => setCurrentTFSABalance(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">If you already have a TFSA, enter current value</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Contributed to Date (R)
            </label>
            <input
              type="number"
              value={contributedToDate}
              onChange={(e) => setContributedToDate(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              Total you've contributed (not current value). Remaining room: R{(LIFETIME_LIMIT - contributedToDate).toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Lump Sum Deposit (R)
            </label>
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">One-time deposit at start of year</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution (R)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: R{Math.floor(ANNUAL_LIMIT / 12).toLocaleString()}/month to max out R{ANNUAL_LIMIT.toLocaleString()} annual limit
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <select
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="6">6% (Conservative - Bonds/Fixed)</option>
              <option value="8">8% (Moderate - Balanced Fund)</option>
              <option value="10">10% (Growth - Equity Fund)</option>
              <option value="12">12% (Aggressive - High Growth)</option>
              <option value="15">15% (Very Aggressive)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Historical JSE returns: ~10% p.a. long-term</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={yearsToInvest}
              onChange={(e) => setYearsToInvest(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">How many years will you contribute?</p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* TFSA Limits Warning */}
          {results.exceedsAnnualLimit && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Exceeds Annual Limit</h4>
              <p className="text-sm text-yellow-800">
                Your planned annual contribution (R{results.annualContribution.toLocaleString()}) exceeds the
                R{ANNUAL_LIMIT.toLocaleString()} annual limit. Adjusted to R{results.annualLimit.toLocaleString()}.
                Excess contributions attract 40% penalty tax!
              </p>
            </div>
          )}

          {/* TFSA Growth Projection */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📈 TFSA Growth Projection</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-emerald-200">
                <span className="text-gray-700">Total Contributions:</span>
                <span className="font-semibold text-black">R{results.totalContributions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-emerald-200">
                <span className="text-gray-700">Investment Growth:</span>
                <span className="font-semibold text-green-600">+R{results.totalGrowth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 bg-emerald-100 rounded-lg px-3">
                <span className="text-gray-900 font-bold">Final TFSA Value:</span>
                <span className="font-bold text-emerald-600 text-2xl">R{results.finalBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-emerald-200">
                <span className="text-gray-700">Return on Investment:</span>
                <span className="font-semibold text-green-600">{results.roi.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-emerald-200">
                <span className="text-gray-700">Years Invested:</span>
                <span className="font-semibold text-black">{results.yearsInvested} years</span>
              </div>
            </div>
          </div>

          {/* Tax Savings */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Tax Benefits</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">Growth if Taxable:</span>
                <span className="font-semibold text-black">R{results.totalGrowth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-green-200">
                <span className="text-gray-700">CGT You'd Pay (12.4%):</span>
                <span className="font-semibold text-red-600">-R{results.taxSaved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 bg-green-100 rounded-lg px-3">
                <span className="text-gray-900 font-bold">Tax Saved in TFSA:</span>
                <span className="font-bold text-green-600 text-xl">R{results.taxSaved.toLocaleString()}</span>
              </div>
              <p className="text-sm text-green-700 mt-3">
                No capital gains tax, dividends tax, or income tax on TFSA growth!
              </p>
            </div>
          </div>

          {/* Contribution Limits */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Contribution Limits</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Annual Limit (2024/25):</span>
                <span className="font-semibold text-black">R{results.annualLimit.toLocaleString()}/year</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Lifetime Limit:</span>
                <span className="font-semibold text-black">R{results.lifetimeLimit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Contributed So Far:</span>
                <span className="font-semibold text-blue-600">R{results.totalContributions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-blue-100 rounded-lg px-3">
                <span className="text-gray-900 font-medium">Remaining Room:</span>
                <span className="font-bold text-blue-700">R{results.lifetimeRoom.toLocaleString()}</span>
              </div>

              {results.hitLifetimeLimit ? (
                <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    ✓ You'll max out lifetime R{results.lifetimeLimit.toLocaleString()} limit in {results.yearsUntilLifetimeLimit.toFixed(1)} years (age {Math.floor(results.ageWhenMaxed)})
                  </p>
                </div>
              ) : (
                <div className="mt-3 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                  <p className="text-sm text-blue-900">
                    At current rate, you'll max out in {results.yearsToMaxOut.toFixed(1)} years (age {Math.floor(results.ageWhenMaxed)})
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Your TFSA Plan</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Monthly Contribution:</span>
                <span className="font-semibold text-black">R{results.monthlyContribution.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Annual Contribution:</span>
                <span className="font-semibold text-black">R{results.annualContribution.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Expected Return:</span>
                <span className="font-semibold text-purple-600">{results.effectiveAnnualReturn}% p.a.</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-purple-100 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">💡 Recommendation</h4>
              <p className="text-sm text-purple-800">
                {results.monthlyContribution >= 3000
                  ? `Excellent! You're maximizing your R${ANNUAL_LIMIT.toLocaleString()} annual allowance. Keep it up!`
                  : `Consider increasing to R${Math.floor(ANNUAL_LIMIT / 12).toLocaleString()}/month to fully utilize your R${ANNUAL_LIMIT.toLocaleString()} annual allowance.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
