'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UKInsuranceComparison() {
  type InsuranceType = 'life' | 'motor' | 'home' | 'travel' | 'pet' | 'health' | 'business' | 'income-protection';
  type ProviderType = 'aviva' | 'axa' | 'legal-general' | 'direct-line' | 'admiral' | 'churchill' | 'bupa' | 'vitality';

  const [formData, setFormData] = useState({
    insuranceType: 'life' as InsuranceType,
    age: 35,
    gender: 'male',
    smokingStatus: 'non-smoker',
    coverageAmount: 250000,
    postcode: 'SW1A 1AA',
    property: 'detached',
    vehicleValue: 25000,
    annualMileage: 12000,
    claimsHistory: 0,
    healthConditions: 'none',
    occupation: 'office-worker',
    provider: 'aviva' as ProviderType,
    term: 25,
    scenario: 'standard'
  });

  const [results, setResults] = useState({
    monthlyPremium: 0,
    annualPremium: 0,
    totalCost: 0,
    coverageDetails: '',
    benefits: '',
    exclusions: '',
    claimProcess: '',
    recommendation: ''
  });

  const [comparisonResults, setComparisonResults] = useState<any[]>([]);

  const insuranceTypes = {
    'life': 'Life Insurance',
    'motor': 'Motor Insurance', 
    'home': 'Home Insurance',
    'travel': 'Travel Insurance',
    'pet': 'Pet Insurance',
    'health': 'Private Health Insurance',
    'business': 'Business Insurance',
    'income-protection': 'Income Protection Insurance'
  };

  const providers = {
    'aviva': 'Aviva',
    'axa': 'AXA UK',
    'legal-general': 'Legal & General',
    'direct-line': 'Direct Line',
    'admiral': 'Admiral',
    'churchill': 'Churchill',
    'bupa': 'Bupa',
    'vitality': 'Vitality'
  };

  const insuranceScenarios = [
    {
      name: 'Critical Illness Claim',
      description: 'Heart attack at age 45 with £100k life cover',
      impact: 'Full payout within 30 days',
      type: 'life'
    },
    {
      name: 'Car Accident',
      description: 'Non-fault accident with £5k vehicle damage',
      impact: 'Repair costs covered minus £500 excess',
      type: 'motor'
    },
    {
      name: 'Home Burglary',
      description: 'Break-in with £10k contents stolen',
      impact: 'Contents replacement up to policy limit',
      type: 'home'
    },
    {
      name: 'Holiday Cancellation',
      description: 'Emergency cancellation of £3k holiday',
      impact: 'Full refund of non-refundable costs',
      type: 'travel'
    },
    {
      name: 'Pet Surgery',
      description: 'Emergency surgery costing £2.5k',
      impact: '80% coverage after £150 excess',
      type: 'pet'
    },
    {
      name: 'Private Hospital Treatment',
      description: 'Elective surgery with 6-month waiting list on NHS',
      impact: 'Immediate private treatment covered',
      type: 'health'
    }
  ];

  const calculateInsurance = () => {
    const { insuranceType, age, gender, smokingStatus, coverageAmount, provider, term } = formData;

    // Base premium rates per £1000 coverage (monthly)
    const baseRates: Record<InsuranceType, number> = {
      'life': 0.25,
      'motor': 0.8,
      'home': 0.15,
      'travel': 8.5,
      'pet': 12.0,
      'health': 35.0,
      'business': 2.5,
      'income-protection': 1.8
    };

    // Age factor multipliers
    const ageFactors: { [key: number]: number } = {
      18: 0.6, 25: 0.7, 30: 0.8, 35: 1.0, 40: 1.2, 45: 1.5, 
      50: 2.0, 55: 2.8, 60: 4.0, 65: 6.5, 70: 10.0
    };

    // Provider multipliers
    const providerFactors: Record<ProviderType, number> = {
      'aviva': 1.0,
      'axa': 1.05,
      'legal-general': 0.95,
      'direct-line': 0.9,
      'admiral': 0.85,
      'churchill': 0.88,
      'bupa': 1.15,
      'vitality': 1.1
    };

    const closestAge = Object.keys(ageFactors).map(Number).reduce((prev, curr) => 
      Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
    );

    const ageFactor = ageFactors[closestAge];
    const genderFactor = gender === 'female' ? 0.9 : 1.0;
    const smokingFactor = smokingStatus === 'smoker' ? 2.2 : smokingStatus === 'ex-smoker' ? 1.3 : 1.0;
    const providerFactor = providerFactors[provider];

    let monthlyPremium: number = 0;
    let coverageDetails: string = '';
    let benefits: string = '';
    let exclusions: string = '';
    let claimProcess: string = '';
    let recommendation: string = '';

    // Calculate based on insurance type
    if (['life', 'income-protection'].includes(insuranceType)) {
      const baseMonthlyRate = baseRates[insuranceType];
      monthlyPremium = (coverageAmount / 1000) * baseMonthlyRate * ageFactor * genderFactor * smokingFactor * providerFactor;
      
      if (insuranceType === 'life') {
        coverageDetails = `£${coverageAmount.toLocaleString()} life insurance coverage for ${term} years with ${providers[provider]}`;
        benefits = 'Death benefit, terminal illness cover, optional critical illness cover, premium waiver on disability';
        exclusions = 'Suicide within first 12 months, death due to dangerous activities, pre-existing conditions not declared';
        claimProcess = 'Notify insurer within 30 days → Submit death certificate → Complete claim forms → Payout within 14 days';
        recommendation = age < 40 ? 'Consider term life insurance for cost-effectiveness' : 'Whole life insurance may provide better long-term value';
      } else {
        coverageDetails = `${coverageAmount / 12}% of monthly income (up to £${coverageAmount.toLocaleString()}/year) replacement`;
        benefits = 'Monthly income replacement, rehabilitation support, partial payment for reduced capacity work';
        exclusions = 'Self-inflicted injuries, criminal activities, pregnancy-related conditions (some policies)';
        claimProcess = 'Medical assessment → Waiting period (typically 4-26 weeks) → Monthly payments begin';
        recommendation = 'Essential for self-employed and primary earners - covers 50-70% of income typically';
      }
    } else if (insuranceType === 'motor') {
      const baseCost = formData.vehicleValue * 0.04; // 4% of vehicle value annually
      monthlyPremium = baseCost * ageFactor * providerFactor / 12;
      
      coverageDetails = `Comprehensive motor insurance for vehicle worth £${formData.vehicleValue.toLocaleString()} with ${formData.annualMileage.toLocaleString()} annual miles`;
      benefits = 'Third-party liability, theft protection, accident damage, windscreen cover, breakdown assistance';
      exclusions = 'Driving under influence, uninsured drivers, racing, vehicles used for hire/reward without declaration';
      claimProcess = 'Report incident immediately → Obtain crime reference (if applicable) → Submit claim online/phone → Assessment and repair approval';
      recommendation = formData.claimsHistory > 2 ? 'Consider higher excess to reduce premiums' : 'Comprehensive cover recommended for vehicles over £10k value';
    } else if (insuranceType === 'home') {
      const baseCost = coverageAmount * 0.002; // 0.2% of property value annually
      monthlyPremium = baseCost * providerFactor / 12;
      
      coverageDetails = `Buildings and contents insurance for property worth £${coverageAmount.toLocaleString()} in ${formData.postcode}`;
      benefits = 'Buildings cover, contents protection, alternative accommodation, legal liability, accidental damage';
      exclusions = 'Flood (may need separate cover), gradual damage, wear and tear, unoccupied property over 60 days';
      claimProcess = 'Secure property → Contact police if crime → Notify insurer within 48 hours → Provide evidence/receipts → Assessment and settlement';
      recommendation = formData.property === 'leasehold' ? 'Ensure buildings insurance via management company' : 'Consider flood cover separately if in risk area';
    } else {
      // Travel, Pet, Health, Business insurance
      const annualCost = baseRates[insuranceType] * (coverageAmount / 1000) * providerFactor;
      monthlyPremium = annualCost / 12;
      
      switch(insuranceType) {
        case 'travel':
          coverageDetails = `Annual worldwide travel insurance covering trips up to £${coverageAmount.toLocaleString()} per incident`;
          benefits = 'Medical emergencies abroad, cancellation cover, baggage protection, personal liability, 24/7 assistance';
          exclusions = 'Pre-existing medical conditions, high-risk activities, travel to FCO-advised against destinations';
          claimProcess = 'Emergency: Call assistance line → Non-emergency: Submit claim with receipts within 28 days → Assessment and payment';
          recommendation = 'Annual policies cost-effective for multiple trips - single trip cover for one-off holidays';
          break;
        case 'pet':
          coverageDetails = `Pet insurance covering up to £${coverageAmount.toLocaleString()} annually for veterinary treatment`;
          benefits = 'Accident and illness cover, third-party liability, death from illness/accident, complementary therapy';
          exclusions = 'Pre-existing conditions, routine care, breeding-related conditions, older pets (some policies)';
          claimProcess = 'Get treatment → Pay vet directly or claim back → Submit receipts and vet report → Reimbursement within 5-10 days';
          recommendation = 'Lifetime cover better than annual limit policies - insure pets young for best rates';
          break;
        case 'health':
          coverageDetails = `Private health insurance with £${coverageAmount.toLocaleString()} annual limit for treatment costs`;
          benefits = 'Fast-track treatment, private hospitals, consultant choice, diagnostics, outpatient cover';
          exclusions = 'Pre-existing conditions, cosmetic treatment, fertility treatment (standard policies), drug/alcohol abuse';
          claimProcess = 'Get referral → Pre-authorization for major treatment → Direct billing or claim reimbursement';
          recommendation = 'Consider if long NHS waiting times affecting quality of life - compare network hospitals';
          break;
        case 'business':
          coverageDetails = `Business insurance package covering public liability (£${coverageAmount.toLocaleString()}) and professional indemnity`;
          benefits = 'Public liability, employers liability, professional indemnity, business interruption, cyber liability';
          exclusions = 'Criminal acts, contractual disputes not involving negligence, fines and penalties';
          claimProcess = 'Immediate notification of incidents → Legal support provided → Claims handling and settlement';
          recommendation = 'Essential for client-facing businesses - cyber cover increasingly important for digital businesses';
          break;
      }
    }

    const annualPremium = monthlyPremium * 12;
    const totalCost = annualPremium * term;

    setResults({
      monthlyPremium: Math.round(monthlyPremium),
      annualPremium: Math.round(annualPremium),
      totalCost: Math.round(totalCost),
      coverageDetails,
      benefits,
      exclusions,
      claimProcess,
      recommendation
    });

    // Generate comparison with other providers
    generateComparison();
  };

  const generateComparison = () => {
    const comparisons = Object.entries(providers).map(([key, name]) => {
      if (key === formData.provider) return null;
      
      const providerFactors: Record<ProviderType, number> = {
        'aviva': 1.0,
        'axa': 1.05,
        'legal-general': 0.95,
        'direct-line': 0.9,
        'admiral': 0.85,
        'churchill': 0.88,
        'bupa': 1.15,
        'vitality': 1.1
      };

      const factor = providerFactors[key as ProviderType];
      const adjustedPremium = results.monthlyPremium * factor;
      
      return {
        provider: name,
        monthlyPremium: Math.round(adjustedPremium),
        annualSaving: Math.round((results.annualPremium - (adjustedPremium * 12))),
        rating: Math.random() * 2 + 3.5, // 3.5-5.5 rating
        features: getProviderFeatures(key as ProviderType, formData.insuranceType)
      };
    }).filter(Boolean);

    setComparisonResults(comparisons.sort((a, b) => a!.monthlyPremium - b!.monthlyPremium));
  };

  const getProviderFeatures = (provider: ProviderType, type: InsuranceType): string[] => {
    const features: { [key: string]: { [key: string]: string[] } } = {
      'aviva': {
        'life': ['24/7 support', 'Online claims', 'Health services'],
        'motor': ['5-star defaqto rating', 'Approved repairers', 'Courtesy car'],
        'home': ['24/7 claims', 'Alternative accommodation', 'Home emergency cover']
      },
      'legal-general': {
        'life': ['Fast-track claims', 'Rehabilitation support', 'Terminal illness cover'],
        'motor': ['Lifetime repairs guarantee', 'Windscreen cover', '24/7 helpline'],
        'home': ['Trace and access cover', 'Garden cover', 'Legal expenses']
      },
      'direct-line': {
        'life': ['Online management', 'Flexible premiums', 'Health screening'],
        'motor': ['Drive Plus app', 'Multi-car discounts', 'Key cover'],
        'home': ['Unlimited buildings cover', 'Contents new-for-old', 'Identity theft']
      }
    };

    return features[provider]?.[type] || ['Competitive rates', 'UK call centers', 'Online services'];
  };

  const simulateScenario = (scenario: any) => {
    const impact = calculateScenarioImpact(scenario, formData);
    alert(`Scenario: ${scenario.name}\n\nWith your current ${insuranceTypes[formData.insuranceType]} policy:\n${impact}`);
  };

  const calculateScenarioImpact = (scenario: any, currentFormData: typeof formData) => {
    switch(scenario.name) {
      case 'Critical Illness Claim':
        return `Your ${providers[currentFormData.provider]} life insurance would pay out £${currentFormData.coverageAmount.toLocaleString()} immediately upon diagnosis. This provides financial security during treatment and recovery.`;
      case 'Car Accident':
        return `Your motor insurance covers repair costs up to vehicle value (£${currentFormData.vehicleValue.toLocaleString()}) minus your excess. Includes courtesy car and legal support.`;
      case 'Home Burglary':
        return `Contents insurance covers stolen items up to £${Math.min(currentFormData.coverageAmount * 0.6, 50000).toLocaleString()}. You'll need receipts/photos for claims. Alternative accommodation provided if home uninhabitable.`;
      case 'Holiday Cancellation':
        return `Travel insurance covers non-refundable costs up to £${Math.min(10000, currentFormData.coverageAmount).toLocaleString()} per person. Valid reasons include illness, jury service, redundancy.`;
      case 'Pet Surgery':
        return `Pet insurance covers 80% of vet bills after £150 excess. Maximum £${Math.min(15000, currentFormData.coverageAmount).toLocaleString()} per year. Pre-existing conditions excluded.`;
      case 'Private Hospital Treatment':
        return `Health insurance provides immediate access to private treatment. Covers consultant fees, hospital charges, and diagnostics up to £${currentFormData.coverageAmount.toLocaleString()} annually.`;
      default:
        return 'Coverage details depend on your specific policy terms and conditions.';
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    calculateInsurance();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 rounded-b-3xl">
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 UK Insurance Market</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              UK Insurance Comparison <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Calculator 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Compare life, motor, home, travel, and health insurance from top UK providers. Simulate scenarios and find the best coverage for your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">UK Insurance Comparison Tool</h2>
            <p className="text-gray-600 text-lg">Compare quotes from Aviva, Legal & General, AXA, Direct Line, Admiral, and more</p>
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
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(insuranceTypes).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    min="18"
                    max="80"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage Amount (£)
                </label>
                <input
                  type="number"
                  value={formData.coverageAmount}
                  onChange={(e) => handleInputChange('coverageAmount', parseInt(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smoking Status
                </label>
                <select 
                  value={formData.smokingStatus}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                >
                  <option value="non-smoker">Non-smoker</option>
                  <option value="smoker">Smoker</option>
                  <option value="ex-smoker">Ex-smoker (3+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Provider
                </label>
                <select 
                  value={formData.provider}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(providers).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Conditional fields based on insurance type */}
              {formData.insuranceType === 'motor' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Value (£)
                    </label>
                    <input
                      type="number"
                      value={formData.vehicleValue}
                      onChange={(e) => handleInputChange('vehicleValue', parseInt(e.target.value))}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Mileage
                    </label>
                    <input
                      type="number"
                      value={formData.annualMileage}
                      onChange={(e) => handleInputChange('annualMileage', parseInt(e.target.value))}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>
              )}

              {formData.insuranceType === 'home' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select 
                      value={formData.property}
                      onChange={(e) => handleInputChange('property', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                    >
                      <option value="detached">Detached House</option>
                      <option value="semi-detached">Semi-detached</option>
                      <option value="terraced">Terraced House</option>
                      <option value="flat">Flat/Apartment</option>
                      <option value="bungalow">Bungalow</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Insurance Quote Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Insurance Type:</span>
                  <span className="font-semibold text-black">{insuranceTypes[formData.insuranceType]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Coverage Amount:</span>
                  <span className="font-semibold text-black">£{formData.coverageAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-semibold text-black">{providers[formData.provider]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly Premium:</span>
                  <span className="font-semibold text-blue-600 text-xl">£{results.monthlyPremium.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Annual Premium:</span>
                  <span className="font-semibold text-green-600">£{results.annualPremium.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                  <span className="text-gray-900 font-medium">Total Cost ({formData.term} years):</span>
                  <span className="font-bold text-blue-600 text-xl">£{results.totalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Coverage Details</h4>
                <p className="text-sm text-green-800">{results.coverageDetails}</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Benefits</h4>
                <p className="text-sm text-blue-800">{results.benefits}</p>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Recommendation</h4>
                <p className="text-sm text-orange-800">{results.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Provider Comparison Section */}
          {comparisonResults.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Compare UK Insurance Providers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisonResults.slice(0, 6).map((comparison, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 mb-2">{comparison.provider}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">£{comparison.monthlyPremium}/month</div>
                    <div className="text-sm text-green-600 mb-3">
                      {comparison.annualSaving > 0 ? `Save £${comparison.annualSaving}/year` : `£${Math.abs(comparison.annualSaving)} more/year`}
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500">{'★'.repeat(Math.floor(comparison.rating))}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - Math.floor(comparison.rating))}</span>
                      <span className="ml-2 text-sm text-gray-600">{comparison.rating.toFixed(1)}</span>
                    </div>
                    <div className="space-y-1">
                      {comparison.features.map((feature: string, i: number) => (
                        <div key={i} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scenario Simulation Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Insurance Scenario Simulator</h3>
            <p className="text-gray-600 text-center mb-8">Simulate real-world scenarios to understand how your insurance coverage works</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceScenarios.map((scenario, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{scenario.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  <p className="text-sm text-blue-600 mb-4">{scenario.impact}</p>
                  <button
                    onClick={() => simulateScenario(scenario)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Simulate Scenario
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Information Sections */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Claim Process</h4>
              <p className="text-sm text-gray-700">{results.claimProcess}</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Policy Exclusions</h4>
              <p className="text-sm text-gray-700">{results.exclusions}</p>
            </div>
          </div>

          {/* UK Insurance Market Information */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">UK Insurance Market 2025</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Life Insurance</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">£2.8T</div>
                <p className="text-sm text-gray-600">Market value with Legal & General, Aviva leading</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Motor Insurance</h4>
                <div className="text-2xl font-bold text-green-600 mb-2">£15B</div>
                <p className="text-sm text-gray-600">Annual premiums, Admiral and Direct Line popular</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Home Insurance</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">85%</div>
                <p className="text-sm text-gray-600">Household penetration rate across UK</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Health Insurance</h4>
                <div className="text-2xl font-bold text-orange-600 mb-2">11%</div>
                <p className="text-sm text-gray-600">Population with private medical insurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}