'use client'
import { useState } from 'react';

export default function SouthAfricaFuelCostCalculator() {
  const [fuelType, setFuelType] = useState('petrol95');
  const [fuelPrice, setFuelPrice] = useState('24.50'); // Current SA petrol price
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('');
  const [calculationType, setCalculationType] = useState('trip'); // trip or monthly
  const [monthlyDistance, setMonthlyDistance] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Current South African fuel prices (updated regularly)
  const fuelPrices = {
    petrol95: 24.50,
    petrol93: 24.25,
    diesel50ppm: 23.10,
    diesel500ppm: 23.15,
    lpgas: 16.20
  };

  const fuelTypeNames = {
    petrol95: 'Petrol 95 Octane',
    petrol93: 'Petrol 93 Octane', 
    diesel50ppm: 'Diesel 50ppm',
    diesel500ppm: 'Diesel 500ppm',
    lpgas: 'LP Gas'
  };

  const calculateFuelCost = () => {
    const pricePerLiter = parseFloat(fuelPrice);
    const fuelConsumption = parseFloat(consumption);
    const tripDistance = parseFloat(distance);
    const monthlyKm = parseFloat(monthlyDistance);

    if (calculationType === 'trip') {
      // Trip calculation
      const litersNeeded = (tripDistance / 100) * fuelConsumption;
      const totalCost = litersNeeded * pricePerLiter;
      const costPerKm = totalCost / tripDistance;

      return {
        type: 'trip',
        distance: tripDistance,
        litersNeeded,
        totalCost,
        costPerKm,
        fuelType: fuelTypeNames[fuelType],
        pricePerLiter
      };
    } else {
      // Monthly calculation
      const monthlyLiters = (monthlyKm / 100) * fuelConsumption;
      const monthlyCost = monthlyLiters * pricePerLiter;
      const annualCost = monthlyCost * 12;
      const costPerKm = monthlyCost / monthlyKm;

      return {
        type: 'monthly',
        monthlyDistance: monthlyKm,
        monthlyLiters,
        monthlyCost,
        annualCost,
        costPerKm,
        fuelType: fuelTypeNames[fuelType],
        pricePerLiter
      };
    }
  };

  const handleCalculate = () => {
    if (!consumption || (calculationType === 'trip' && !distance) || (calculationType === 'monthly' && !monthlyDistance)) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const fuelResult = calculateFuelCost();
      setResult(fuelResult);
      setLoading(false);
    }, 600);
  };

  const handleFuelTypeChange = (type) => {
    setFuelType(type);
    setFuelPrice(fuelPrices[type].toString());
  };

  const formatCurrency = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLiters = (liters) => {
    return `${liters.toFixed(1)}L`;
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-2 sm:mb-3">
          ⛽ South African Fuel Cost Calculator
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Calculate fuel costs, consumption, and trip expenses with current SA fuel prices
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Calculation Type Toggle */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-1 flex w-full max-w-md">
            <button
              onClick={() => setCalculationType('trip')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[44px] touch-manipulation ${
                calculationType === 'trip'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚗 Trip Calculator
            </button>
            <button
              onClick={() => setCalculationType('monthly')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[44px] touch-manipulation ${
                calculationType === 'monthly'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Monthly Budget
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ⛽ Fuel Type
            </label>
            <select 
              value={fuelType} 
              onChange={(e) => handleFuelTypeChange(e.target.value)}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
            >
              <option value="petrol95">Petrol 95 Octane - R{fuelPrices.petrol95}/L</option>
              <option value="petrol93">Petrol 93 Octane - R{fuelPrices.petrol93}/L</option>
              <option value="diesel50ppm">Diesel 50ppm - R{fuelPrices.diesel50ppm}/L</option>
              <option value="diesel500ppm">Diesel 500ppm - R{fuelPrices.diesel500ppm}/L</option>
              <option value="lpgas">LP Gas - R{fuelPrices.lpgas}/L</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              💰 Fuel Price per Liter
            </label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="e.g. 24.50"
              step="0.01"
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {calculationType === 'trip' ? (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🛣️ Trip Distance (km)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g. 450"
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                📅 Monthly Distance (km)
              </label>
              <input
                type="number"
                value={monthlyDistance}
                onChange={(e) => setMonthlyDistance(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📊 Fuel Consumption (L/100km)
            </label>
            <input
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              placeholder="e.g. 8.5"
              step="0.1"
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Check your vehicle manual or calculate: (Liters used ÷ Distance traveled) × 100
            </p>
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || !consumption || (calculationType === 'trip' && !distance) || (calculationType === 'monthly' && !monthlyDistance)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate Fuel Cost</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              {result.type === 'trip' ? 'Your Trip Fuel Cost' : 'Your Monthly Fuel Budget'}
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Fuel Type</p>
                <p className="text-lg font-bold text-gray-800">{result.fuelType}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">
                  {result.type === 'trip' ? 'Trip Cost' : 'Monthly Cost'}
                </p>
                <p className="text-lg font-bold">
                  {result.type === 'trip' ? formatCurrency(result.totalCost) : formatCurrency(result.monthlyCost)}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Fuel Needed</p>
                <p className="text-lg font-bold text-gray-800">
                  {result.type === 'trip' ? formatLiters(result.litersNeeded) : formatLiters(result.monthlyLiters)}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Cost per km</p>
                <p className="text-lg font-bold text-gray-800">{formatCurrency(result.costPerKm)}</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Cost Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Price per Liter:</span>
                    <span className="font-medium">{formatCurrency(result.pricePerLiter)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {result.type === 'trip' ? 'Trip Distance:' : 'Monthly Distance:'}
                    </span>
                    <span className="font-medium">
                      {result.type === 'trip' ? `${result.distance}km` : `${result.monthlyDistance}km`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Needed:</span>
                    <span className="font-medium">
                      {result.type === 'trip' ? formatLiters(result.litersNeeded) : formatLiters(result.monthlyLiters)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total Cost:</span>
                    <span className="text-orange-600">
                      {result.type === 'trip' ? formatCurrency(result.totalCost) : formatCurrency(result.monthlyCost)}
                    </span>
                  </div>
                  {result.type === 'monthly' && (
                    <div className="flex justify-between font-semibold">
                      <span>Annual Cost:</span>
                      <span className="text-red-600">{formatCurrency(result.annualCost)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💡</span>
                  Fuel Efficiency Tips
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800">
                      <strong>Maintenance:</strong> Regular servicing can improve fuel efficiency by up to 40%.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800">
                      <strong>Driving Style:</strong> Smooth acceleration and braking saves 10-20% fuel.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-orange-800">
                      <strong>Route Planning:</strong> Avoid traffic and combine trips to reduce costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Calculate Vehicle Tax</span>
            </a>
            
            <a 
              href="/south-africa-loan-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🚗</span>
              <span>Vehicle Finance</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              ⛽ <strong>Fuel Price Disclaimer:</strong> Prices are based on current estimates and may vary by location and supplier. 
              Check with your local fuel station for exact prices.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}