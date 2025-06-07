'use client';

import StructuredData from '@/components/StructuredData';

export default function SouthAfricaInsuranceCalculatorPage() {
  const handleInsuranceTypeChange = () => {
    type InsuranceType = 'life-insurance' | 'disability-insurance' | 'vehicle-insurance' | 'home-insurance' | 'medical-aid' | 'funeral-cover' | 'critical-illness';
    const insuranceType = (document.getElementById('insuranceType') as HTMLSelectElement)?.value as InsuranceType;
    const defaults = {
      'life-insurance': { amount: 2000000, age: 35, term: 20 },
      'disability-insurance': { amount: 1500000, age: 35, term: 30 },
      'vehicle-insurance': { amount: 500000, age: 35, term: 1 },
      'home-insurance': { amount: 3000000, age: 35, term: 1 },
      'medical-aid': { amount: 15000, age: 35, term: 1 },
      'funeral-cover': { amount: 100000, age: 35, term: 1 },
      'critical-illness': { amount: 1000000, age: 35, term: 20 }
    };
    
    const def = defaults[insuranceType];
    if (def) {
      const coverAmountEl = document.getElementById('coverAmount') as HTMLInputElement;
      const ageEl = document.getElementById('age') as HTMLInputElement;
      const termYearsEl = document.getElementById('termYears') as HTMLInputElement;
      
      if (coverAmountEl && ageEl && termYearsEl) {
        coverAmountEl.value = def.amount.toString();
        ageEl.value = def.age.toString();
        termYearsEl.value = def.term.toString();
      }
    }
    
    calculateInsurance();
  };

  const calculateInsurance = () => {
    type InsuranceType = keyof typeof baseRates;
    const insuranceType = (document.getElementById('insuranceType') as HTMLSelectElement)?.value as InsuranceType;
    const coverAmount = parseFloat((document.getElementById('coverAmount') as HTMLInputElement)?.value ?? '') || 2000000;
    const age = parseInt((document.getElementById('age') as HTMLInputElement)?.value ?? '') || 35;
    const gender = (document.getElementById('gender') as HTMLSelectElement)?.value ?? 'male';
    const smokingStatus = (document.getElementById('smokingStatus') as HTMLSelectElement)?.value ?? 'non-smoker';
    const termYears = parseInt((document.getElementById('termYears') as HTMLInputElement)?.value ?? '') || 20;
    const provider = (document.getElementById('provider') as HTMLSelectElement)?.value as keyof typeof providerFactors ?? 'sanlam';
    
    const insuranceNames = {
      'life-insurance': 'Life Insurance',
      'disability-insurance': 'Disability Insurance',
      'vehicle-insurance': 'Vehicle Insurance',
      'home-insurance': 'Home & Contents Insurance',
      'medical-aid': 'Medical Aid',
      'funeral-cover': 'Funeral Cover',
      'critical-illness': 'Critical Illness Cover'
    };
    
    const providerNames = {
      'sanlam': 'Sanlam',
      'old-mutual': 'Old Mutual',
      'discovery': 'Discovery Life',
      'momentum': 'Momentum',
      'liberty': 'Liberty',
      'outsurance': 'OUTsurance',
      'santam': 'Santam',
      'hollard': 'Hollard'
    };
    
    // Base premium rates per R1000 cover per month
    const baseRates = {
      'life-insurance': 0.25,
      'disability-insurance': 0.35,
      'vehicle-insurance': 15.0, // Percentage of vehicle value annually
      'home-insurance': 0.8, // Percentage of home value annually  
      'medical-aid': 1.5, // Percentage of income monthly
      'funeral-cover': 0.15,
      'critical-illness': 0.30
    };
    
    // Age adjustment factors
    const ageFactors = {
      18: 0.6, 25: 0.7, 30: 0.8, 35: 1.0, 40: 1.3, 45: 1.7, 50: 2.2, 55: 3.0, 60: 4.5, 65: 7.0, 70: 12.0
    };
    
    // Find closest age factor
    const ageKeys = Object.keys(ageFactors).map(Number).sort((a,b) => a-b);
    const closestAge = ageKeys.reduce((prev, curr) => Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev);
    const ageFactor = ageFactors[closestAge as keyof typeof ageFactors];
    
    // Gender and smoking adjustments
    const genderFactor = gender === 'female' ? 0.85 : 1.0;
    const smokingFactor = smokingStatus === 'smoker' ? 1.75 : 1.0;
    
    // Provider adjustment
    const providerFactors = {
      'sanlam': 1.0, 'old-mutual': 0.95, 'discovery': 1.15, 'momentum': 0.98,
      'liberty': 1.02, 'outsurance': 0.85, 'santam': 0.92, 'hollard': 0.88
    };
    const providerFactor = providerFactors[provider];
    
    let monthlyPremium, annualPremium, summary, benefits;
    
    if (['vehicle-insurance', 'home-insurance'].includes(insuranceType)) {
      // Short-term insurance (annual premiums)
      const baseRate = baseRates[insuranceType] / 100;
      annualPremium = coverAmount * baseRate * providerFactor;
      monthlyPremium = annualPremium / 12;
      
      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} for R${coverAmount.toLocaleString()} costs R${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = insuranceType === 'vehicle-insurance' ? 
        'Includes comprehensive cover, third-party liability, and roadside assistance.' :
        'Includes building and contents cover, liability protection, and alternative accommodation.';
    } else if (insuranceType === 'medical-aid') {
      // Medical aid (based on income percentage)
      monthlyPremium = coverAmount * (baseRates[insuranceType] / 100) * providerFactor;
      annualPremium = monthlyPremium * 12;
      
      summary = `${providerNames[provider]} medical aid with R${coverAmount.toLocaleString()} income costs R${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = 'Includes hospital plan, day-to-day benefits, chronic medication, and emergency cover.';
    } else {
      // Life/disability/critical illness (long-term insurance)
      const baseMonthlyRate = baseRates[insuranceType];
      monthlyPremium = (coverAmount / 1000) * baseMonthlyRate * ageFactor * genderFactor * smokingFactor * providerFactor;
      annualPremium = monthlyPremium * 12;
      
      summary = `${providerNames[provider]} ${insuranceNames[insuranceType].toLowerCase()} of R${coverAmount.toLocaleString()} cover for a ${age}-year-old ${gender} costs R${Math.round(monthlyPremium).toLocaleString()} per month.`;
      benefits = insuranceType === 'life-insurance' ? 
        'Includes terminal illness benefit, premium waiver on disability, and inflation protection options.' :
        insuranceType === 'disability-insurance' ?
        'Includes income replacement, lump sum benefits, and rehabilitation support.' :
        'Includes cancer, heart attack, stroke, and other specified critical illnesses.';
    }
    
    const totalPremiums = annualPremium * termYears;
    
    // Update results
    const resultElements = {
      'resultInsuranceType': insuranceNames[insuranceType],
      'resultCoverAmount': 'R' + coverAmount.toLocaleString(),
      'resultProvider': providerNames[provider],
      'resultDemographics': `${age}, ${gender.charAt(0).toUpperCase() + gender.slice(1)}`,
      'monthlyPremium': 'R' + Math.round(monthlyPremium).toLocaleString(),
      'annualPremium': 'R' + Math.round(annualPremium).toLocaleString(),
      'totalPremiums': 'R' + Math.round(totalPremiums).toLocaleString(),
      'insuranceSummary': summary,
      'policyBenefits': benefits
    };

    Object.entries(resultElements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
  };

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-blue-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇿🇦 South African Insurance</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Insurance Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate premiums for life, disability, vehicle, and home insurance with top South African insurers. Get quotes from Sanlam, Old Mutual, Discovery, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">South African Insurance Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate premiums for comprehensive insurance coverage in South Africa</p>
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
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black" 
                    onChange={handleInsuranceTypeChange}
                  >
                    <option value="life-insurance">Life Insurance</option>
                    <option value="disability-insurance">Disability Insurance</option>
                    <option value="vehicle-insurance">Vehicle Insurance</option>
                    <option value="home-insurance">Home & Contents Insurance</option>
                    <option value="medical-aid">Medical Aid</option>
                    <option value="funeral-cover">Funeral Cover</option>
                    <option value="critical-illness">Critical Illness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Amount (R)
                  </label>
                  <input
                    type="number"
                    id="coverAmount"
                    placeholder="2,000,000"
                    defaultValue="2000000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
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
                    max="80"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select id="gender" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Smoking Status
                  </label>
                  <select id="smokingStatus" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black">
                    <option value="non-smoker">Non-smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Term (Years)
                  </label>
                  <input
                    type="number"
                    id="termYears"
                    placeholder="20"
                    defaultValue="20"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <select id="provider" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black">
                    <option value="sanlam">Sanlam</option>
                    <option value="old-mutual">Old Mutual</option>
                    <option value="discovery">Discovery Life</option>
                    <option value="momentum">Momentum</option>
                    <option value="liberty">Liberty</option>
                    <option value="outsurance">OUTsurance</option>
                    <option value="santam">Santam</option>
                    <option value="hollard">Hollard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <select id="province" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black">
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

                <button 
                  onClick={calculateInsurance}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Insurance Premium
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Insurance Quote Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Insurance Type:</span>
                    <span className="font-semibold text-black" id="resultInsuranceType">Life Insurance</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Cover Amount:</span>
                    <span className="font-semibold text-black" id="resultCoverAmount">R2,000,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-semibold text-black" id="resultProvider">Sanlam</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Age & Gender:</span>
                    <span className="font-semibold text-black" id="resultDemographics">35, Male</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Premium:</span>
                    <span className="font-semibold text-green-600 text-xl" id="monthlyPremium">R485</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Annual Premium:</span>
                    <span className="font-semibold text-blue-600" id="annualPremium">R5,820</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Premiums (20 years):</span>
                    <span className="font-bold text-green-600 text-xl" id="totalPremiums">R116,400</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Insurance Summary</h4>
                  <p className="text-sm text-green-800" id="insuranceSummary">
                    Sanlam life insurance of R2,000,000 cover for a 35-year-old male costs R485 per month.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Policy Benefits</h4>
                  <p className="text-sm text-blue-800" id="policyBenefits">
                    Includes terminal illness benefit, premium waiver on disability, and inflation protection options.
                  </p>
                </div>
              </div>
            </div>

            {/* Insurance Providers & Rates */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top SA Insurance Providers 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Sanlam</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">Market Leader</div>
                  <p className="text-sm text-gray-600">Comprehensive life & investment</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Old Mutual</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">Heritage Brand</div>
                  <p className="text-sm text-gray-600">Trusted since 1845</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Discovery</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">Innovation</div>
                  <p className="text-sm text-gray-600">Vitality rewards program</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">OUTsurance</h4>
                  <div className="text-2xl font-bold text-orange-600 mb-2">Value Leader</div>
                  <p className="text-sm text-gray-600">Competitive short-term insurance</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Coverage</h4>
                <p className="text-gray-600 text-sm">Life, disability, vehicle, home, and medical aid options</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Competitive Rates</h4>
                <p className="text-gray-600 text-sm">Compare quotes from top SA insurers for best value</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="font-semibold text-gray-900 mb-2">FSP Compliant</h4>
                <p className="text-gray-600 text-sm">Calculations based on FAIS regulations and industry standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}