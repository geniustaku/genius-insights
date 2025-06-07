'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SouthAfricaInsuranceComparison() {
  type InsuranceType = 'life' | 'motor' | 'home' | 'medical' | 'disability' | 'funeral' | 'business' | 'travel';
  type ProviderType = 'sanlam' | 'old-mutual' | 'discovery' | 'momentum' | 'liberty' | 'santam' | 'outsurance' | 'hollard';

  const [formData, setFormData] = useState({
    insuranceType: 'life' as InsuranceType,
    age: 35,
    gender: 'male',
    smokingStatus: 'non-smoker',
    coverageAmount: 1000000,
    province: 'gauteng',
    vehicleValue: 300000,
    annualIncome: 600000,
    dependents: 2,
    healthStatus: 'good',
    occupation: 'professional',
    provider: 'sanlam' as ProviderType,
    term: 20,
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
    'medical': 'Medical Aid / Health Insurance',
    'disability': 'Disability Insurance',
    'funeral': 'Funeral Cover',
    'business': 'Business Insurance',
    'travel': 'Travel Insurance'
  };

  const providers = {
    'sanlam': 'Sanlam',
    'old-mutual': 'Old Mutual',
    'discovery': 'Discovery',
    'momentum': 'Momentum',
    'liberty': 'Liberty',
    'santam': 'Santam',
    'outsurance': 'Outsurance',
    'hollard': 'Hollard'
  };

  const insuranceScenarios = [
    {
      name: 'Critical Illness Diagnosis',
      description: 'Cancer diagnosis requiring R500,000 treatment',
      impact: 'Lump sum payout for treatment and recovery',
      type: 'life'
    },
    {
      name: 'Hijacking Incident',
      description: 'Vehicle hijacked, R250,000 vehicle stolen',
      impact: 'Vehicle replacement and trauma counseling covered',
      type: 'motor'
    },
    {
      name: 'House Fire',
      description: 'Electrical fire damages 60% of home contents',
      impact: 'Contents replacement and alternative accommodation',
      type: 'home'
    },
    {
      name: 'Private Hospital Stay',
      description: 'Emergency surgery requiring 5-day private hospital stay',
      impact: 'Medical aid covers hospital and specialist fees',
      type: 'medical'
    },
    {
      name: 'Work-Related Injury',
      description: 'Accident causes 40% disability, unable to work',
      impact: 'Monthly income replacement for rehabilitation period',
      type: 'disability'
    },
    {
      name: 'Family Bereavement',
      description: 'Sudden death requiring funeral arrangements',
      impact: 'Funeral costs and family support covered',
      type: 'funeral'
    }
  ];

  const calculateInsurance = () => {
    const { insuranceType, age, gender, smokingStatus, coverageAmount, provider, term, annualIncome } = formData;

    // Base premium rates (monthly ZAR per R1000 coverage or percentage of income)
    const baseRates: Record<InsuranceType, number> = {
      'life': 0.45,        // Per R1000 coverage
      'motor': 0.035,      // Percentage of vehicle value annually
      'home': 0.002,       // Percentage of property value annually
      'medical': 0.08,     // Percentage of annual income
      'disability': 0.015, // Percentage of annual income
      'funeral': 150,      // Fixed monthly amount
      'business': 0.003,   // Percentage of coverage amount
      'travel': 8.5        // Percentage of trip value
    };

    // Age factor multipliers
    const ageFactors: { [key: number]: number } = {
      18: 0.5, 25: 0.6, 30: 0.8, 35: 1.0, 40: 1.3, 45: 1.7, 
      50: 2.2, 55: 3.0, 60: 4.5, 65: 7.0, 70: 12.0
    };

    // Provider multipliers (South African market positioning)
    const providerFactors: Record<ProviderType, number> = {
      'sanlam': 1.0,
      'old-mutual': 1.02,
      'discovery': 1.08,
      'momentum': 0.95,
      'liberty': 0.98,
      'santam': 0.92,
      'outsurance': 0.88,
      'hollard': 0.90
    };

    // Provincial risk factors
    const provinceFactors = {
      'gauteng': 1.15,  // Higher crime rates
      'western-cape': 1.05,
      'kwazulu-natal': 1.10,
      'eastern-cape': 0.90,
      'free-state': 0.85,
      'mpumalanga': 0.95,
      'limpopo': 0.88,
      'north-west': 0.92,
      'northern-cape': 0.80
    };

    const closestAge = Object.keys(ageFactors).map(Number).reduce((prev, curr) => 
      Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
    );

    const ageFactor = ageFactors[closestAge];
    const genderFactor = gender === 'female' ? 0.88 : 1.0;
    const smokingFactor = smokingStatus === 'smoker' ? 2.8 : smokingStatus === 'ex-smoker' ? 1.4 : 1.0;
    const providerFactor = providerFactors[provider];
    const provinceFactor = provinceFactors[formData.province as keyof typeof provinceFactors] || 1.0;

    let monthlyPremium: number = 0;
    let coverageDetails: string = '';
    let benefits: string = '';
    let exclusions: string = '';
    let claimProcess: string = '';
    let recommendation: string = '';

    // Calculate based on insurance type
    switch(insuranceType) {
      case 'life':
        const baseMonthlyRate = baseRates.life;
        monthlyPremium = (coverageAmount / 1000) * baseMonthlyRate * ageFactor * genderFactor * smokingFactor * providerFactor;
        
        coverageDetails = `R${coverageAmount.toLocaleString()} life insurance coverage for ${term} years with ${providers[provider]}`;
        benefits = 'Death benefit, terminal illness cover, disability benefit, premium waiver on disability, funeral benefit';
        exclusions = 'Suicide within first 24 months, death due to criminal activities, war, pre-existing conditions not declared';
        claimProcess = 'Notify insurer immediately → Submit death certificate and ID → Complete claim forms → Assessment within 7 days → Payout within 48 hours of approval';
        recommendation = age < 40 ? 'Term life insurance cost-effective for young families' : 'Whole life with investment component may suit wealth building goals';
        break;

      case 'motor':
        const vehicleBaseCost = formData.vehicleValue * baseRates.motor * provinceFactor;
        monthlyPremium = vehicleBaseCost * ageFactor * providerFactor / 12;
        
        coverageDetails = `Comprehensive motor insurance for R${formData.vehicleValue.toLocaleString()} vehicle in ${formData.province.replace('-', ' ')}`;
        benefits = 'Accident damage cover, theft protection, third-party liability, hijack trauma counseling, roadside assistance';
        exclusions = 'Driving under influence, unlicensed driving, racing, vehicle used for illegal activities, wear and tear';
        claimProcess = 'Secure scene → Contact police (if crime) → Notify insurer within 24 hours → Assessment by qualified panel beater → Repair authorization and completion';
        recommendation = provinceFactor > 1.0 ? 'Consider tracking device for premium discount in high-risk areas' : 'Standard comprehensive cover sufficient for your area';
        break;

      case 'home':
        const propertyBaseCost = coverageAmount * baseRates.home * provinceFactor;
        monthlyPremium = propertyBaseCost * providerFactor / 12;
        
        coverageDetails = `Buildings and contents insurance for R${coverageAmount.toLocaleString()} property in ${formData.province.replace('-', ' ')}`;
        benefits = 'Buildings cover, contents replacement, alternative accommodation, domestic worker protection, garden and pool cover';
        exclusions = 'Flood damage (separate cover needed), gradual damage, unoccupied property over 60 days, war and terrorism';
        claimProcess = 'Secure property → Contact police (if crime) → Submit photos and proof of ownership → Professional assessment → Settlement within 30 days';
        recommendation = 'Ensure adequate contents cover - many South Africans are under-insured for contents replacement';
        break;

      case 'medical':
        const medicalPremium = annualIncome * baseRates.medical * ageFactor * providerFactor;
        monthlyPremium = medicalPremium / 12;
        
        coverageDetails = `Medical aid covering R${Math.round(annualIncome * 4).toLocaleString()} annual medical expenses for family of ${formData.dependents + 1}`;
        benefits = 'Private hospital cover, specialist consultations, chronic medication, emergency transport, overseas emergency cover';
        exclusions = 'Pre-existing conditions (waiting periods apply), cosmetic procedures, experimental treatments, over-the-counter medications';
        claimProcess = 'Present medical aid card → Treatment pre-authorization for major procedures → Direct billing or reimbursement claim submission';
        recommendation = 'Discovery Health leads in innovation but Momentum and Sanlam offer competitive family packages';
        break;

      case 'disability':
        const disabilityPremium = annualIncome * baseRates.disability * ageFactor * genderFactor * providerFactor;
        monthlyPremium = disabilityPremium / 12;
        
        coverageDetails = `Income protection covering ${Math.round(annualIncome * 0.75 / 12).toLocaleString()}/month (75% of gross income) until age 65`;
        benefits = 'Monthly income replacement, rehabilitation benefits, lump sum for permanent disability, premium waiver';
        exclusions = 'Self-inflicted injuries, criminal activities, war, pre-existing medical conditions, normal pregnancy';
        claimProcess = 'Medical assessment → Waiting period (1-6 months) → Ongoing medical reviews → Monthly payments commence';
        recommendation = 'Essential for professionals and business owners - covers 60-75% of income typically';
        break;

      case 'funeral':
        monthlyPremium = baseRates.funeral * ageFactor * providerFactor;
        
        coverageDetails = `Funeral cover for main member and up to ${formData.dependents + 1} family members with ${providers[provider]}`;
        benefits = 'Funeral expenses, tombstone, transport of remains, family support counseling, grocery benefit';
        exclusions = 'Suicide within first 6 months, death outside South Africa without repatriation cover, war';
        claimProcess = 'Immediate notification → Submit death certificate → Funeral parlor liaison → Direct payment to service providers within 24 hours';
        recommendation = 'Popular affordable option in South Africa - consider inflation protection for long-term policies';
        break;

      case 'business':
        const businessPremium = coverageAmount * baseRates.business * provinceFactor * providerFactor;
        monthlyPremium = businessPremium / 12;
        
        coverageDetails = `Business insurance package covering R${coverageAmount.toLocaleString()} public liability and business interruption`;
        benefits = 'Public liability, product liability, business interruption, cyber liability, key person cover, equipment cover';
        exclusions = 'Professional indemnity (separate cover), criminal acts, contractual disputes, fines and penalties';
        claimProcess = 'Immediate incident notification → Risk assessment → Legal support coordination → Claims settlement and business continuity support';
        recommendation = 'Essential for SMEs - consider cyber liability add-on for businesses handling personal data';
        break;

      case 'travel':
        const travelPremium = (coverageAmount / 1000) * baseRates.travel * providerFactor;
        monthlyPremium = travelPremium;
        
        coverageDetails = `Annual travel insurance covering trips up to R${coverageAmount.toLocaleString()} per incident worldwide`;
        benefits = 'Medical emergencies abroad, trip cancellation, baggage protection, hijack cover, emergency evacuation';
        exclusions = 'Pre-existing medical conditions, high-risk activities, travel to war zones, alcohol-related incidents';
        claimProcess = 'Emergency assistance hotline → Medical pre-authorization → Submit claims with receipts within 30 days → Assessment and reimbursement';
        recommendation = 'Annual policies cost-effective for frequent travelers - single trip cover for occasional travel';
        break;

      default:
        monthlyPremium = 0;
        coverageDetails = '';
        benefits = '';
        exclusions = '';
        claimProcess = '';
        recommendation = '';
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
        'sanlam': 1.0,
        'old-mutual': 1.02,
        'discovery': 1.08,
        'momentum': 0.95,
        'liberty': 0.98,
        'santam': 0.92,
        'outsurance': 0.88,
        'hollard': 0.90
      };

      const factor = providerFactors[key as ProviderType];
      const adjustedPremium = results.monthlyPremium * factor;
      
      return {
        provider: name,
        monthlyPremium: Math.round(adjustedPremium),
        annualSaving: Math.round((results.annualPremium - (adjustedPremium * 12))),
        rating: Math.random() * 1.5 + 3.5, // 3.5-5.0 rating
        features: getProviderFeatures(key as ProviderType, formData.insuranceType)
      };
    }).filter(Boolean);

    setComparisonResults(comparisons.sort((a, b) => a!.monthlyPremium - b!.monthlyPremium));
  };

  const getProviderFeatures = (provider: ProviderType, type: InsuranceType): string[] => {
    const features: { [key: string]: { [key: string]: string[] } } = {
      'sanlam': {
        'life': ['Wealthbonus rewards', 'Online claims', 'HIV cover'],
        'motor': ['Accident Assist', 'Authorised dealers', '24/7 roadside'],
        'home': ['HomeSure package', 'Emergency repairs', 'Security upgrades']
      },
      'discovery': {
        'life': ['Vitality rewards', 'DiscoveryCard cashback', 'Booster benefit'],
        'motor': ['DriveStar telematics', 'Accident management', 'Vitality discounts'],
        'medical': ['Vitality program', 'Hospital networks', 'Chronic benefits']
      },
      'old-mutual': {
        'life': ['Gradual premium increases', 'Rewards programme', 'Simplified underwriting'],
        'motor': ['iWYZE telematics', 'Comprehensive cover', 'Accident benefits'],
        'home': ['GreenSure eco-benefits', 'Smart home discounts', 'Garden cover']
      }
    };

    return features[provider]?.[type] || ['Competitive rates', 'Local branches', '24/7 support'];
  };

  const simulateScenario = (scenario: any) => {
    const impact = calculateScenarioImpact(scenario, formData);
    alert(`Scenario: ${scenario.name}\n\nWith your current ${insuranceTypes[formData.insuranceType]} policy:\n${impact}`);
  };

  const calculateScenarioImpact = (scenario: any, currentFormData: typeof formData) => {
    switch(scenario.name) {
      case 'Critical Illness Diagnosis':
        return `Your ${providers[currentFormData.provider]} life insurance includes critical illness cover. You'd receive R${Math.min(currentFormData.coverageAmount * 0.5, 500000).toLocaleString()} for treatment while your life cover continues.`;
      case 'Hijacking Incident':
        return `Motor insurance covers vehicle replacement (R${currentFormData.vehicleValue.toLocaleString()}) and includes trauma counseling. Excess typically R15,000-R25,000 for hijacking claims.`;
      case 'House Fire':
        return `Home insurance covers contents replacement up to R${Math.min(currentFormData.coverageAmount * 0.6, 800000).toLocaleString()}. Alternative accommodation provided for up to 12 months during repairs.`;
      case 'Private Hospital Stay':
        return `Medical aid covers private hospital costs up to scheme rates. Pre-authorization required for elective procedures. Emergency procedures covered immediately.`;
      case 'Work-Related Injury':
        return `Disability insurance provides R${Math.round(currentFormData.annualIncome * 0.75 / 12).toLocaleString()}/month income replacement after waiting period. Rehabilitation support included.`;
      case 'Family Bereavement':
        return `Funeral cover provides immediate R${Math.min(50000, currentFormData.coverageAmount * 0.05).toLocaleString()} for funeral expenses plus family support benefits and grocery vouchers.`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-blue-800 rounded-b-3xl">
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">🇿🇦 South African Insurance Market</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              South Africa Insurance <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Comparison 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Compare life, motor, home, medical aid, and funeral cover from Sanlam, Discovery, Old Mutual, and other top South African insurers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">South African Insurance Comparison Tool</h2>
            <p className="text-gray-600 text-lg">Compare quotes from Sanlam, Discovery, Old Mutual, Momentum, Liberty, and more</p>
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
                    max="75"
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage Amount (R)
                </label>
                <input
                  type="number"
                  value={formData.coverageAmount}
                  onChange={(e) => handleInputChange('coverageAmount', parseInt(e.target.value))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <select 
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="gauteng">Gauteng</option>
                    <option value="western-cape">Western Cape</option>
                    <option value="kwazulu-natal">KwaZulu-Natal</option>
                    <option value="eastern-cape">Eastern Cape</option>
                    <option value="free-state">Free State</option>
                    <option value="mpumalanga">Mpumalanga</option>
                    <option value="limpopo">Limpopo</option>
                    <option value="north-west">North West</option>
                    <option value="northern-cape">Northern Cape</option>
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
                    <option value="ex-smoker">Ex-smoker (2+ years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Provider
                </label>
                <select 
                  value={formData.provider}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(providers).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Conditional fields based on insurance type */}
              {formData.insuranceType === 'motor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Value (R)
                  </label>
                  <input
                    type="number"
                    value={formData.vehicleValue}
                    onChange={(e) => handleInputChange('vehicleValue', parseInt(e.target.value))}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  />
                </div>
              )}

              {['medical', 'disability'].includes(formData.insuranceType) && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income (R)
                    </label>
                    <input
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value))}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dependents
                    </label>
                    <input
                      type="number"
                      value={formData.dependents}
                      onChange={(e) => handleInputChange('dependents', parseInt(e.target.value))}
                      min="0"
                      max="10"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Insurance Quote Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Insurance Type:</span>
                  <span className="font-semibold text-black">{insuranceTypes[formData.insuranceType]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Coverage Amount:</span>
                  <span className="font-semibold text-black">R{formData.coverageAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-semibold text-black">{providers[formData.provider]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Province:</span>
                  <span className="font-semibold text-black">{formData.province.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly Premium:</span>
                  <span className="font-semibold text-green-600 text-xl">R{results.monthlyPremium.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Annual Premium:</span>
                  <span className="font-semibold text-blue-600">R{results.annualPremium.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                  <span className="text-gray-900 font-medium">Total Cost ({formData.term} years):</span>
                  <span className="font-bold text-green-600 text-xl">R{results.totalCost.toLocaleString()}</span>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Compare South African Insurance Providers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisonResults.slice(0, 6).map((comparison, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 mb-2">{comparison.provider}</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">R{comparison.monthlyPremium.toLocaleString()}/month</div>
                    <div className="text-sm text-blue-600 mb-3">
                      {comparison.annualSaving > 0 ? `Save R${comparison.annualSaving.toLocaleString()}/year` : `R${Math.abs(comparison.annualSaving).toLocaleString()} more/year`}
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500">{'★'.repeat(Math.floor(comparison.rating))}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - Math.floor(comparison.rating))}</span>
                      <span className="ml-2 text-sm text-gray-600">{comparison.rating.toFixed(1)}</span>
                    </div>
                    <div className="space-y-1">
                      {comparison.features.map((feature: string, i: number) => (
                        <div key={i} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">South African Insurance Scenarios</h3>
            <p className="text-gray-600 text-center mb-8">Simulate real South African scenarios to understand your insurance coverage</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceScenarios.map((scenario, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{scenario.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  <p className="text-sm text-green-600 mb-4">{scenario.impact}</p>
                  <button
                    onClick={() => simulateScenario(scenario)}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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

          {/* South African Insurance Market Information */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">South African Insurance Market 2025</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Life Insurance</h4>
                <div className="text-2xl font-bold text-green-600 mb-2">R2.1T</div>
                <p className="text-sm text-gray-600">Assets under management, Sanlam and Old Mutual leading</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Motor Insurance</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">R65B</div>
                <p className="text-sm text-gray-600">Annual premiums, Santam and Outsurance popular</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Medical Aid</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">16%</div>
                <p className="text-sm text-gray-600">Population coverage, Discovery Health leading</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Funeral Cover</h4>
                <div className="text-2xl font-bold text-orange-600 mb-2">85%</div>
                <p className="text-sm text-gray-600">Household penetration rate across SA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}