'use client';

import { useState } from 'react';

export default function SouthAfricaSolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(2500);
  const [dailyUsage, setDailyUsage] = useState<number>(30); // kWh
  const [province, setProvince] = useState<string>('gauteng');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [loadsheddingStage, setLoadsheddingStage] = useState<number>(4);
  const [roofSpace, setRoofSpace] = useState<number>(50); // square meters

  // 2025 Eskom tariffs (approximate average per kWh)
  const ESKOM_TARIFFS: Record<string, number> = {
    gauteng: 2.85,
    'western-cape': 2.95,
    'kwazulu-natal': 2.80,
    'eastern-cape': 2.75,
    'free-state': 2.70,
    mpumalanga: 2.72,
    limpopo: 2.68,
    'north-west': 2.70,
    'northern-cape': 2.78
  };

  // Solar panel costs (per kW installed - 2025 estimates)
  const SOLAR_COST_PER_KW = 18000; // Average R18,000 per kW
  const BATTERY_COST_PER_KWH = 8500; // Average R8,500 per kWh storage
  const INVERTER_COST = 25000; // Average hybrid inverter

  // Solar generation (kWh per kW per day - varies by province)
  const SOLAR_GENERATION: Record<string, number> = {
    gauteng: 4.5,
    'western-cape': 5.2,
    'kwazulu-natal': 4.8,
    'eastern-cape': 4.6,
    'free-state': 5.0,
    mpumalanga: 4.7,
    limpopo: 5.3,
    'north-west': 5.1,
    'northern-cape': 5.8 // Best in SA
  };

  const calculate = () => {
    const tariff = ESKOM_TARIFFS[province];
    const solarGen = SOLAR_GENERATION[province];

    // Calculate current annual cost
    const annualEskomCost = monthlyBill * 12;

    // Calculate system size needed (with 20% buffer for losses)
    const systemSizeKw = (dailyUsage / solarGen) * 1.2;

    // Calculate battery size (for loadshedding backup)
    const hoursBackup = loadsheddingStage * 2.5; // Approximate hours per stage
    const batterySizeKwh = (dailyUsage / 24) * hoursBackup * 1.3; // 30% buffer

    // Check if roof space is sufficient (1 kW needs ~6-7 sqm)
    const roofSpaceNeeded = systemSizeKw * 7;
    const roofSufficient = roofSpace >= roofSpaceNeeded;

    // Calculate costs
    const solarPanelCost = systemSizeKw * SOLAR_COST_PER_KW;
    const batteryCost = batterySizeKwh * BATTERY_COST_PER_KWH;
    const totalSystemCost = solarPanelCost + batteryCost + INVERTER_COST;

    // Installation & other costs (15-20% of equipment)
    const installationCost = totalSystemCost * 0.18;
    const totalProjectCost = totalSystemCost + installationCost;

    // Calculate annual generation & savings
    const annualGeneration = systemSizeKw * solarGen * 365;
    const annualSavings = annualGeneration * tariff;

    // Payback period
    const paybackYears = totalProjectCost / annualSavings;

    // 25-year savings (panels last 25+ years)
    const lifetimeSavings = (annualSavings * 25) - totalProjectCost;

    // Monthly savings
    const monthlySavings = annualSavings / 12;

    // Return on investment
    const roi = ((annualSavings * 25) / totalProjectCost - 1) * 100;

    return {
      systemSizeKw: Math.ceil(systemSizeKw * 10) / 10,
      batterySizeKwh: Math.ceil(batterySizeKwh),
      roofSpaceNeeded: Math.ceil(roofSpaceNeeded),
      roofSufficient,
      solarPanelCost,
      batteryCost,
      inverterCost: INVERTER_COST,
      installationCost,
      totalProjectCost,
      annualGeneration: Math.round(annualGeneration),
      annualEskomCost,
      annualSavings,
      monthlySavings,
      paybackYears: Math.round(paybackYears * 10) / 10,
      lifetimeSavings,
      roi: Math.round(roi),
      tariff
    };
  };

  const results = calculate();

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Solar & Loadshedding Calculator</h2>
        <p className="text-gray-600 text-lg">Calculate solar panel costs, savings & ROI for your home or business</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province (affects solar generation)
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="gauteng">Gauteng</option>
              <option value="western-cape">Western Cape</option>
              <option value="kwazulu-natal">KwaZulu-Natal</option>
              <option value="eastern-cape">Eastern Cape</option>
              <option value="free-state">Free State</option>
              <option value="mpumalanga">Mpumalanga</option>
              <option value="limpopo">Limpopo</option>
              <option value="north-west">North West</option>
              <option value="northern-cape">Northern Cape (Best Sun!)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as any)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="residential">Residential Home</option>
              <option value="commercial">Commercial/Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Monthly Electricity Bill (R)
            </label>
            <input
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Electricity Usage (kWh)
            </label>
            <input
              type="number"
              value={dailyUsage}
              onChange={(e) => setDailyUsage(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Check your Eskom bill or meter. Average home: 20-40 kWh/day</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typical Loadshedding Stage
            </label>
            <select
              value={loadsheddingStage}
              onChange={(e) => setLoadsheddingStage(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg text-black bg-white"
            >
              <option value="2">Stage 2</option>
              <option value="3">Stage 3</option>
              <option value="4">Stage 4</option>
              <option value="5">Stage 5</option>
              <option value="6">Stage 6</option>
              <option value="7">Stage 7</option>
              <option value="8">Stage 8</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Roof Space (square meters)
            </label>
            <input
              type="number"
              value={roofSpace}
              onChange={(e) => setRoofSpace(Number(e.target.value))}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg text-black"
            />
            <p className="text-xs text-gray-500 mt-1">Approximate usable roof area for solar panels</p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Solar System Recommendation</h3>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-3">System Specification</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Solar Panels:</span>
                  <span className="font-semibold text-black">{results.systemSizeKw} kW</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Battery Storage:</span>
                  <span className="font-semibold text-black">{results.batterySizeKwh} kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Annual Generation:</span>
                  <span className="font-semibold text-green-600">{results.annualGeneration.toLocaleString()} kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Roof Space Needed:</span>
                  <span className={`font-semibold ${results.roofSufficient ? 'text-green-600' : 'text-red-600'}`}>
                    {results.roofSpaceNeeded} m² {results.roofSufficient ? '✓' : '⚠️ Insufficient'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-3">System Costs</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Solar Panels:</span>
                  <span className="font-semibold text-black">R{results.solarPanelCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Battery:</span>
                  <span className="font-semibold text-black">R{results.batteryCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Inverter:</span>
                  <span className="font-semibold text-black">R{results.inverterCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Installation:</span>
                  <span className="font-semibold text-black">R{results.installationCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-900 font-medium">Total Investment:</span>
                  <span className="font-bold text-orange-600 text-lg">R{results.totalProjectCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border border-green-300">
              <h4 className="font-semibold text-green-900 mb-3">💰 Savings & ROI</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Monthly Savings:</span>
                  <span className="font-bold text-green-600">R{results.monthlySavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Annual Savings:</span>
                  <span className="font-bold text-green-600">R{results.annualSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Payback Period:</span>
                  <span className="font-bold text-green-600">{results.paybackYears} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">25-Year Savings:</span>
                  <span className="font-bold text-green-600">R{results.lifetimeSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-green-300">
                  <span className="text-green-900 font-medium">ROI:</span>
                  <span className="font-bold text-green-600 text-lg">{results.roi}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">☀️ Recommendation</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              A {results.systemSizeKw} kW solar system with {results.batterySizeKwh} kWh battery
              will cover your daily usage and provide backup during Stage {loadsheddingStage} loadshedding.
              You'll save R{results.monthlySavings.toLocaleString()}/month and recover your investment
              in {results.paybackYears} years. Over 25 years, you'll save R{results.lifetimeSavings.toLocaleString()}!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
