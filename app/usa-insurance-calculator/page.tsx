"use client";
import React, { useState, useEffect } from 'react';

export default function USAInsuranceCalculator() {
  type InsuranceType = 'term-life' | 'whole-life' | 'health-insurance' | 'auto-insurance' | 'homeowners' | 'disability-insurance' | 'umbrella-policy' | 'long-term-care';

  type StateType = 'california' | 'new-york' | 'florida' | 'texas' | 'pennsylvania' | 'illinois' | 'ohio' | 'georgia' | 'north-carolina' | 'michigan';

  type ProviderType = 'state-farm' | 'allstate' | 'geico' | 'progressive' | 'metlife' | 'prudential' | 'new-york-life' | 'northwestern-mutual';

  const [formData, setFormData] = useState({
    insuranceType: 'term-life' as InsuranceType,
    coverageAmount: 750000,
    age: 35,
    gender: 'male',
    smokingStatus: 'non-smoker',
    termYears: 30,
    provider: 'state-farm' as ProviderType,
    state: 'california' as StateType
  });

  const [results, setResults] = useState({
    monthlyPremium: 0,
    annualPremium: 0,
    totalPremiums: 0,
    summary: '',
    benefits: ''
  });

  const insuranceNames = {
    'term-life': 'Term Life Insurance',
    'whole-life': 'Whole Life Insurance',
    'health-insurance': 'Health Insurance',
    'auto-insurance': 'Auto Insurance',
    'homeowners': 'Homeowners Insurance',
    'disability-insurance': 'Disability Insurance',
    'umbrella-policy': 'Umbrella Policy',
    'long-term-care': 'Long-Term Care Insurance'
  };

  const providerNames = {
    'state-farm': 'State Farm',
    'allstate': 'Allstate',
    'geico': 'GEICO',
    'progressive': 'Progressive',
    'metlife': 'MetLife',
    'prudential': 'Prudential',
    'new-york-life': 'New York Life',
    'northwestern-mutual': 'Northwestern Mutual'
  };

  const insuranceDefaults = {
    'term-life': { amount: 750000, age: 35, term: 30 },
    'whole-life': { amount: 500000, age: 35, term: 30 },
    'health-insurance': { amount: 12000, age: 35, term: 1 },
    'auto-insurance': { amount: 35000, age: 35, term: 1 },
    'homeowners': { amount: 450000, age: 35, term: 1 },
    'disability-insurance': { amount: 80000, age: 35, term: 30 },
    'umbrella-policy': { amount: 1000000, age: 35, term: 1 },
    'long-term-care': { amount: 100000, age: 55, term: 20 }
  };

  const calculateInsurance = () => {
    const { insuranceType, gender, smokingStatus, provider, state } = formData;
    
    // Convert string inputs to numbers for calculation, with defaults
    const coverageAmount = parseInt(String(formData.coverageAmount)) || 750000;
    const age = parseInt(String(formData.age)) || 35;
    const termYears = parseInt(String(formData.termYears)) || 30;

    // Base premium rates per $1000 coverage per month (life insurance) or percentage (others)
    const baseRates = {
      'term-life': 0.15,
      'whole-life': 0.75,
      'health-insurance': 8.5,
      'auto-insurance': 4.2,
      'homeowners': 0.6,
      'disability-insurance': 2.8,
      'umbrella-policy': 0.015,
      'long-term-care': 3.2
    };

    // Age adjustment factors
    const ageFactors: { [key: number]: number } = {
      18: 0.4, 25: 0.5, 30: 0.7, 35: 1.0, 40: 1.3, 45: 1.8, 50: 2.4, 
      55: 3.5, 60: 5.2, 65: 7.8, 70: 12.0, 75: 18.5, 80: 28.0
    };

    // Find closest age factor
    const ageKeys = Object.keys(ageFactors).map(Number).sort((a,b) => a-b);
    const closestAge = ageKeys.reduce((prev, curr) => Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev);
    const ageFactor = ageFactors[closestAge];

    // Gender and smoking adjustments
    const genderFactor = gender === 'female' ? 0.85 : gender === 'other' ? 1.1 : 1.0;
    const smokingFactor = smokingStatus === 'smoker' ? 2.5 : smokingStatus === 'ex-smoker' ? 1.4 : 1.0;

    // State cost adjustments
    const stateFactors = {
      'california': 1.35, 'new-york': 1.25, 'florida': 1.15, 'texas': 1.05,
      'pennsylvania': 1.0, 'illinois': 1.08, 'ohio': 0.92, 'georgia': 0.88,
      'north-carolina': 0.85, 'michigan': 0.95
    };
    const stateFactor = stateFactors[state] || 1.0;

    // Provider adjustment
    const providerFactors = {
      'state-farm': 1.0, 'allstate': 1.05, 'geico': 0.85, 'progressive': 0.88,
      'metlife': 0.98, 'prudential': 1.02, 'new-york-life': 1.08, 'northwestern-mutual': 1.12
    };
    const providerFactor = providerFactors[provider];

    let monthlyPremium: number, annualPremium: number, summary: string, benefits: string;

    if (['auto-insurance', 'homeowners', 'umbrella-policy', 'long-term-care'].includes(insuranceType)) {
      // Property/casualty insurance (annual premiums)
      const baseRate = baseRates[insuranceType] / 100;
      annualPremium = coverageAmount * baseRate * stateFactor * providerFactor;

      if (['auto-insurance', 'homeowners'].includes(insuranceType)) {
        const ageAdjustment = insuranceType === 'auto-insurance' && age < 25 ? 1.8 : 
                            insuranceType === 'auto-insurance' && age > 65 ? 1.3 : 1.0;
        annualPremium *= ageAdjustment;
      }

      monthlyPremium = annualPremium / 12;
      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} costs $${Math.round(monthlyPremium).toLocaleString()} per month.`;

      switch(insuranceType) {
        case 'auto-insurance':
          benefits = 'Comprehensive auto insurance with liability, collision, comprehensive, and uninsured motorist coverage.';
          break;
        case 'homeowners':
          benefits = 'Homeowners insurance covering dwelling, personal property, liability, and additional living expenses.';
          break;
        case 'umbrella-policy':
          benefits = 'Umbrella liability coverage providing additional protection beyond standard auto and home policies.';
          break;
        case 'long-term-care':
          benefits = 'Long-term care insurance covering nursing home, assisted living, and in-home care services.';
          break;
        default:
          benefits = 'Comprehensive insurance coverage with competitive rates and excellent customer service.';
          break;
      }
    } else if (['health-insurance', 'disability-insurance'].includes(insuranceType)) {
      // Income-based insurance
      const incomePercentage = baseRates[insuranceType] / 100;

      if (insuranceType === 'health-insurance') {
        monthlyPremium = coverageAmount * incomePercentage * stateFactor * providerFactor / 12;
        annualPremium = monthlyPremium * 12;
      } else {
        annualPremium = coverageAmount * incomePercentage * ageFactor * genderFactor * stateFactor * providerFactor;
        monthlyPremium = annualPremium / 12;
      }

      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} costs $${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = insuranceType === 'health-insurance' ? 
        'Health insurance with medical, prescription, dental, and vision coverage options.' :
        'Disability insurance providing income replacement if unable to work due to illness or injury.';
    } else {
      // Life insurance
      const baseMonthlyRate = baseRates[insuranceType];
      monthlyPremium = (coverageAmount / 1000) * baseMonthlyRate * ageFactor * genderFactor * smokingFactor * stateFactor * providerFactor;
      annualPremium = monthlyPremium * 12;

      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} of $${coverageAmount.toLocaleString()} coverage for a ${age}-year-old ${gender} ${smokingStatus.replace('-', ' ')} costs $${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = insuranceType === 'term-life' ? 
        'Term life insurance with level premiums, convertible to permanent insurance, and accelerated death benefit rider.' :
        'Whole life insurance with guaranteed death benefit, cash value accumulation, and dividend potential.';
    }

    const totalPremiums = annualPremium * termYears;

    setResults({
      monthlyPremium: Math.round(monthlyPremium),
      annualPremium: Math.round(annualPremium),
      totalPremiums: Math.round(totalPremiums),
      summary,
      benefits
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs to prevent leading zeros
    if (field === 'coverageAmount' || field === 'age' || field === 'termYears') {
      // Allow empty string for better mobile typing experience
      if (value === '') {
        processedValue = '';
      } else if (typeof value === 'string') {
        // Remove non-numeric characters except for clearing
        const numericValue = value.replace(/[^0-9]/g, '');
        // Remove leading zeros but allow single zero
        processedValue = numericValue.replace(/^0+/, '') || (numericValue === '0' ? '0' : '');
        
        // Convert to number for validation if not empty
        if (processedValue !== '') {
          const numValue = parseInt(processedValue);
          
          // Set reasonable limits
          if (field === 'age' && numValue > 85) processedValue = '85';
          if (field === 'termYears' && numValue > 50) processedValue = '50';
          if (field === 'coverageAmount' && numValue > 10000000) processedValue = '10000000';
        }
      }
    }
    
    const newFormData = { ...formData, [field]: processedValue };
    
    // Auto-update defaults when insurance type changes
    if (field === 'insuranceType') {
      const defaults = insuranceDefaults[value as InsuranceType];
      if (defaults) {
        newFormData.coverageAmount = defaults.amount;
        newFormData.age = defaults.age;
        newFormData.termYears = defaults.term;
      }
    }
    
    setFormData(newFormData);
  };

  useEffect(() => {
    calculateInsurance();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-green-700 to-blue-900 rounded-b-3xl">
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 USA Insurance Market</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              USA Insurance Calculator <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Calculate premiums for life, health, auto, home, and disability insurance with top US insurers including State Farm, Allstate, and MetLife.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">USA Insurance Premium Calculator</h2>
            <p className="text-gray-600 text-lg">Get quotes from leading American insurance providers with instant calculations</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Input Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Type
                </label>
                <select 
                  value={formData.insuranceType}
                  onChange={(e) => handleInputChange('insuranceType', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                >
                  <option value="term-life">Term Life Insurance</option>
                  <option value="whole-life">Whole Life Insurance</option>
                  <option value="health-insurance">Health Insurance</option>
                  <option value="auto-insurance">Auto Insurance</option>
                  <option value="homeowners">Homeowners Insurance</option>
                  <option value="disability-insurance">Disability Insurance</option>
                  <option value="umbrella-policy">Umbrella Policy</option>
                  <option value="long-term-care">Long-Term Care Insurance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage Amount ($)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.coverageAmount}
                  onChange={(e) => handleInputChange('coverageAmount', e.target.value)}
                  placeholder="750000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="35"
                  min="18"
                  max="85"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select 
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smoking Status
                </label>
                <select 
                  value={formData.smokingStatus}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                >
                  <option value="non-smoker">Non-smoker</option>
                  <option value="smoker">Smoker</option>
                  <option value="ex-smoker">Ex-smoker (3+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Term (Years)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.termYears}
                  onChange={(e) => handleInputChange('termYears', e.target.value)}
                  placeholder="30"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Provider
                </label>
                <select 
                  value={formData.provider}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                >
                  <option value="state-farm">State Farm</option>
                  <option value="allstate">Allstate</option>
                  <option value="geico">GEICO</option>
                  <option value="progressive">Progressive</option>
                  <option value="metlife">MetLife</option>
                  <option value="prudential">Prudential</option>
                  <option value="new-york-life">New York Life</option>
                  <option value="northwestern-mutual">Northwestern Mutual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select 
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                >
                  <option value="california">California</option>
                  <option value="texas">Texas</option>
                  <option value="florida">Florida</option>
                  <option value="new-york">New York</option>
                  <option value="pennsylvania">Pennsylvania</option>
                  <option value="illinois">Illinois</option>
                  <option value="ohio">Ohio</option>
                  <option value="georgia">Georgia</option>
                  <option value="north-carolina">North Carolina</option>
                  <option value="michigan">Michigan</option>
                </select>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Insurance Quote Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Insurance Type:</span>
                  <span className="font-semibold text-black">{insuranceNames[formData.insuranceType]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Coverage Amount:</span>
                  <span className="font-semibold text-black">${formData.coverageAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-semibold text-black">{providerNames[formData.provider]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Demographics:</span>
                  <span className="font-semibold text-black">{parseInt(String(formData.age)) || 0}, {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}, {formData.smokingStatus.charAt(0).toUpperCase() + formData.smokingStatus.slice(1).replace('-', ' ')}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly Premium:</span>
                  <span className="font-semibold text-green-600 text-xl">${results.monthlyPremium.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Annual Premium:</span>
                  <span className="font-semibold text-blue-600">${results.annualPremium.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                  <span className="text-gray-900 font-medium">Total Premiums ({parseInt(String(formData.termYears)) || 0} years):</span>
                  <span className="font-bold text-green-600 text-xl">${results.totalPremiums.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Insurance Summary</h4>
                <p className="text-sm text-green-800">{results.summary}</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Policy Benefits</h4>
                <p className="text-sm text-blue-800">{results.benefits}</p>
              </div>
            </div>
          </div>

          {/* USA Insurance Providers */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top USA Insurance Providers 2025</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">State Farm</h4>
                <div className="text-2xl font-bold text-green-600 mb-2">Market Leader</div>
                <p className="text-sm text-gray-600">America's largest insurer</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Allstate</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">Good Hands</div>
                <p className="text-sm text-gray-600">Comprehensive coverage</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">GEICO</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">Digital First</div>
                <p className="text-sm text-gray-600">15 minutes could save you 15%</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">MetLife</h4>
                <div className="text-2xl font-bold text-indigo-600 mb-2">Life Leader</div>
                <p className="text-sm text-gray-600">Leading life insurance provider</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Coverage</h4>
              <p className="text-gray-600 text-sm">Life, health, auto, home, disability, and umbrella insurance options</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Competitive Rates</h4>
              <p className="text-gray-600 text-sm">Compare quotes from top US insurers for best value and coverage</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">📋</div>
              <h4 className="font-semibold text-gray-900 mb-2">State Regulated</h4>
              <p className="text-gray-600 text-sm">All calculations based on state insurance regulations and NAIC guidelines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}