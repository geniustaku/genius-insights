'use client';

import StructuredData from '@/components/StructuredData';
import { useEffect } from 'react';

export default function UKInsuranceCalculatorPage() {
  
  const calculateInsurance = () => {
    const insuranceType = (document.getElementById('insuranceType') as HTMLSelectElement)?.value;
    const coverAmount = parseFloat((document.getElementById('coverAmount') as HTMLInputElement)?.value || '0') || 500000;
    const age = parseInt((document.getElementById('age') as HTMLInputElement)?.value || '0') || 35;
    const gender = (document.getElementById('gender') as HTMLSelectElement)?.value;
    const smokingStatus = (document.getElementById('smokingStatus') as HTMLSelectElement)?.value;
    const termYears = parseInt((document.getElementById('termYears') as HTMLInputElement)?.value || '0') || 30;
    const provider = (document.getElementById('provider') as HTMLSelectElement)?.value;
    const region = (document.getElementById('region') as HTMLSelectElement)?.value;
    
    const insuranceNames: Record<string, string> = {
      'life-insurance': 'Life Insurance',
      'critical-illness': 'Critical Illness Cover',
      'income-protection': 'Income Protection',
      'motor-insurance': 'Motor Insurance',
      'home-insurance': 'Home & Contents Insurance',
      'travel-insurance': 'Travel Insurance',
      'private-medical': 'Private Medical Insurance',
      'pet-insurance': 'Pet Insurance'
    };
    
    const providerNames: Record<string, string> = {
      'aviva': 'Aviva',
      'legal-general': 'Legal & General',
      'zurich': 'Zurich',
      'axa': 'AXA',
      'prudential': 'Prudential',
      'direct-line': 'Direct Line',
      'admiral': 'Admiral',
      'churchill': 'Churchill'
    };
    
    // Base premium rates per £1000 cover per month for life insurance
    const baseRates: Record<string, number> = {
      'life-insurance': 0.12,
      'critical-illness': 0.18,
      'income-protection': 2.5, // Percentage of income
      'motor-insurance': 12.0, // Percentage of vehicle value annually
      'home-insurance': 0.4, // Percentage of property value annually
      'travel-insurance': 45, // Flat annual rate
      'private-medical': 8.5, // Percentage of income monthly
      'pet-insurance': 3.2 // Percentage of vet limit annually
    };
    
    // Age adjustment factors
    const ageFactors: Record<number, number> = {
      18: 0.5, 25: 0.6, 30: 0.8, 35: 1.0, 40: 1.4, 45: 1.9, 50: 2.6, 55: 3.8, 60: 5.5, 65: 8.2, 70: 12.5, 75: 18.0
    };
    
    // Find closest age factor
    const ageKeys = Object.keys(ageFactors).map(Number).sort((a,b) => a-b);
    const closestAge = ageKeys.reduce((prev, curr) => Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev);
    const ageFactor = ageFactors[closestAge];
    
    // Gender and smoking adjustments
    const genderFactor = gender === 'female' ? 0.88 : gender === 'other' ? 1.05 : 1.0;
    const smokingFactor = smokingStatus === 'smoker' ? 2.2 : smokingStatus === 'ex-smoker' ? 1.3 : 1.0;
    
    // Regional adjustments (London is more expensive)
    const regionFactors: Record<string, number> = {
      'london': 1.25, 'south-east': 1.15, 'south-west': 1.05, 'midlands': 1.0,
      'north-england': 0.95, 'scotland': 0.98, 'wales': 0.96, 'northern-ireland': 0.92
    };
    const regionFactor = regionFactors[region] || 1.0;
    
    // Provider adjustment
    const providerFactors: Record<string, number> = {
      'aviva': 1.0, 'legal-general': 0.98, 'zurich': 1.05, 'axa': 1.02,
      'prudential': 0.96, 'direct-line': 0.89, 'admiral': 0.91, 'churchill': 0.93
    };
    const providerFactor = providerFactors[provider] || 1.0;
    
    let monthlyPremium, annualPremium, summary, benefits;
    
    if (['motor-insurance', 'home-insurance', 'travel-insurance', 'pet-insurance'].includes(insuranceType)) {
      // General insurance (annual premiums)
      if (insuranceType === 'travel-insurance') {
        annualPremium = baseRates[insuranceType] * regionFactor * providerFactor;
        monthlyPremium = annualPremium / 12;
      } else {
        const baseRate = baseRates[insuranceType] / 100;
        annualPremium = coverAmount * baseRate * regionFactor * providerFactor;
        monthlyPremium = annualPremium / 12;
      }
      
      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} costs £${Math.round(monthlyPremium).toLocaleString()} per month.`;
      
      switch(insuranceType) {
        case 'motor-insurance':
          benefits = 'Comprehensive motor insurance with third-party liability, theft, fire, and breakdown cover.';
          break;
        case 'home-insurance':
          benefits = 'Buildings and contents insurance with personal liability and emergency home assistance.';
          break;
        case 'travel-insurance':
          benefits = 'Worldwide travel insurance with medical cover, cancellation protection, and personal belongings.';
          break;
        case 'pet-insurance':
          benefits = 'Comprehensive pet insurance covering accidents, illnesses, and routine healthcare.';
          break;
        default:
          benefits = 'Comprehensive insurance coverage with competitive rates.';
      }
    } else if (['private-medical', 'income-protection'].includes(insuranceType)) {
      // Income-based insurance
      const incomePercentage = baseRates[insuranceType] / 100;
      monthlyPremium = coverAmount * incomePercentage * ageFactor * genderFactor * regionFactor * providerFactor / 12;
      annualPremium = monthlyPremium * 12;
      
      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} costs £${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = insuranceType === 'private-medical' ? 
        'Private healthcare with fast-track consultations, private rooms, and comprehensive treatment options.' :
        'Income protection paying up to 65% of salary if unable to work due to illness or injury.';
    } else {
      // Life/critical illness insurance
      const baseMonthlyRate = baseRates[insuranceType];
      monthlyPremium = (coverAmount / 1000) * baseMonthlyRate * ageFactor * genderFactor * smokingFactor * regionFactor * providerFactor;
      annualPremium = monthlyPremium * 12;
      
      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} of £${coverAmount.toLocaleString()} cover for a ${age}-year-old ${gender} ${smokingStatus.replace('-', ' ')} costs £${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = insuranceType === 'life-insurance' ? 
        'Level term life insurance with guaranteed premiums, terminal illness benefit, and optional inflation protection.' :
        'Critical illness cover for cancer, heart attack, stroke, and 30+ other conditions with tax-free lump sum.';
    }
    
    const totalPremiums = annualPremium * termYears;
    
    // Update results
    const elements = {
      resultInsuranceType: insuranceNames[insuranceType],
      resultCoverAmount: '£' + coverAmount.toLocaleString(),
      resultProvider: providerNames[provider],
      resultDemographics: `${age}, ${gender.charAt(0).toUpperCase() + gender.slice(1)}, ${smokingStatus.charAt(0).toUpperCase() + smokingStatus.slice(1).replace('-', ' ')}`,
      monthlyPremium: '£' + Math.round(monthlyPremium).toLocaleString(),
      annualPremium: '£' + Math.round(annualPremium).toLocaleString(),
      totalPremiums: '£' + Math.round(totalPremiums).toLocaleString(),
      insuranceSummary: summary,
      policyBenefits: benefits
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
  };

  const handleInsuranceTypeChange = () => {
    const insuranceType = (document.getElementById('insuranceType') as HTMLSelectElement)?.value as keyof typeof defaults;
    const defaults = {
      'life-insurance': { amount: 500000, age: 35, term: 30 },
      'critical-illness': { amount: 300000, age: 35, term: 25 },
      'income-protection': { amount: 60000, age: 35, term: 30 },
      'motor-insurance': { amount: 25000, age: 35, term: 1 },
      'home-insurance': { amount: 400000, age: 35, term: 1 },
      'travel-insurance': { amount: 10000, age: 35, term: 1 },
      'private-medical': { amount: 5000, age: 35, term: 1 },
      'pet-insurance': { amount: 15000, age: 35, term: 1 }
    };
    
    const def = defaults[insuranceType];
    if (def) {
      const coverAmountInput = document.getElementById('coverAmount') as HTMLInputElement;
      const ageInput = document.getElementById('age') as HTMLInputElement;
      const termInput = document.getElementById('termYears') as HTMLInputElement;
      
      if (coverAmountInput) coverAmountInput.value = def.amount.toString();
      if (ageInput) ageInput.value = def.age.toString();
      if (termInput) termInput.value = def.term.toString();
    }
    
    calculateInsurance();
  };

  useEffect(() => {
    // Set default values on component mount
    const coverAmountInput = document.getElementById('coverAmount') as HTMLInputElement;
    const ageInput = document.getElementById('age') as HTMLInputElement;
    const termInput = document.getElementById('termYears') as HTMLInputElement;
    
    if (coverAmountInput && !coverAmountInput.value) coverAmountInput.value = '500000';
    if (ageInput && !ageInput.value) ageInput.value = '35';
    if (termInput && !termInput.value) termInput.value = '30';
    
    calculateInsurance();
  }, []);

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-800 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 UK Insurance Market</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                UK Insurance Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate premiums for life, health, motor, home, and travel insurance with top UK insurers including Aviva, Zurich, and Legal & General.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">UK Insurance Premium Calculator</h2>
              <p className="text-gray-600 text-lg">Get quotes from leading UK insurance providers with instant calculations</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Type
                  </label>
                  <select 
                    id="insuranceType" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black" 
                    onChange={handleInsuranceTypeChange}
                  >
                    <option value="life-insurance">Life Insurance</option>
                    <option value="critical-illness">Critical Illness Cover</option>
                    <option value="income-protection">Income Protection</option>
                    <option value="motor-insurance">Motor Insurance</option>
                    <option value="home-insurance">Home & Contents Insurance</option>
                    <option value="travel-insurance">Travel Insurance</option>
                    <option value="private-medical">Private Medical Insurance</option>
                    <option value="pet-insurance">Pet Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Amount (£)
                  </label>
                  <input
                    type="number"
                    id="coverAmount"
                    placeholder="500,000"
                    defaultValue="500000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    placeholder="35"
                    defaultValue="35"
                    min="18"
                    max="85"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select id="gender" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Smoking Status
                  </label>
                  <select id="smokingStatus" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black">
                    <option value="non-smoker">Non-smoker</option>
                    <option value="smoker">Smoker</option>
                    <option value="ex-smoker">Ex-smoker (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Term (Years)
                  </label>
                  <input
                    type="number"
                    id="termYears"
                    placeholder="30"
                    defaultValue="30"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <select id="provider" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black">
                    <option value="aviva">Aviva</option>
                    <option value="legal-general">Legal & General</option>
                    <option value="zurich">Zurich</option>
                    <option value="axa">AXA</option>
                    <option value="prudential">Prudential</option>
                    <option value="direct-line">Direct Line</option>
                    <option value="admiral">Admiral</option>
                    <option value="churchill">Churchill</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UK Region
                  </label>
                  <select id="region" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-black">
                    <option value="london">London</option>
                    <option value="south-east">South East England</option>
                    <option value="south-west">South West England</option>
                    <option value="midlands">Midlands</option>
                    <option value="north-england">North England</option>
                    <option value="scotland">Scotland</option>
                    <option value="wales">Wales</option>
                    <option value="northern-ireland">Northern Ireland</option>
                  </select>
                </div>

                <button 
                  onClick={calculateInsurance}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Insurance Premium
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Insurance Quote Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Insurance Type:</span>
                    <span className="font-semibold text-black" id="resultInsuranceType">Life Insurance</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Cover Amount:</span>
                    <span className="font-semibold text-black" id="resultCoverAmount">£500,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-semibold text-black" id="resultProvider">Aviva</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Demographics:</span>
                    <span className="font-semibold text-black" id="resultDemographics">35, Male, Non-smoker</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Premium:</span>
                    <span className="font-semibold text-purple-600 text-xl" id="monthlyPremium">£45</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Annual Premium:</span>
                    <span className="font-semibold text-indigo-600" id="annualPremium">£540</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Premiums (30 years):</span>
                    <span className="font-bold text-green-600 text-xl" id="totalPremiums">£16,200</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Insurance Summary</h4>
                  <p className="text-sm text-purple-800" id="insuranceSummary">
                    Aviva life insurance of £500,000 cover for a 35-year-old male non-smoker costs £45 per month.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Policy Benefits</h4>
                  <p className="text-sm text-blue-800" id="policyBenefits">
                    Level term life insurance with guaranteed premiums, terminal illness benefit, and optional inflation protection.
                  </p>
                </div>
              </div>
            </div>

            {/* UK Insurance Providers */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top UK Insurance Providers 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Aviva</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">Market Leader</div>
                  <p className="text-sm text-gray-600">UK's largest insurer</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal & General</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">Life Specialist</div>
                  <p className="text-sm text-gray-600">Leading life insurance provider</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Zurich</h4>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">Global Expertise</div>
                  <p className="text-sm text-gray-600">International insurance leader</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Direct Line</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">Digital First</div>
                  <p className="text-sm text-gray-600">Leading digital insurer</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Coverage</h4>
                <p className="text-gray-600 text-sm">Life, health, motor, home, travel, and specialist insurance options</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Competitive Rates</h4>
                <p className="text-gray-600 text-sm">Compare quotes from top UK insurers for best value</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="font-semibold text-gray-900 mb-2">FCA Regulated</h4>
                <p className="text-gray-600 text-sm">All calculations based on FCA guidelines and industry standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}