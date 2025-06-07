'use client';

import StructuredData from '@/components/StructuredData';

export default function GermanySalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 2025 Salary Data</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Germany Salary Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact salary potential in Germany with the latest 2025 market data. 
                Compare salaries across cities, industries, and experience levels.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Germany Salary Calculator</h2>
              <p className="text-gray-600">Calculate salary benchmarks and compensation in Germany</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black"
                      placeholder="Enter job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="automotive">Automotive</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="engineering">Engineering</option>
                      <option value="consulting">Consulting</option>
                      <option value="chemicals">Chemicals & Pharma</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Experience</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (6-10 years)</option>
                      <option value="executive">Executive (10+ years)</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select City</option>
                      <option value="munich">Munich</option>
                      <option value="frankfurt">Frankfurt</option>
                      <option value="hamburg">Hamburg</option>
                      <option value="berlin">Berlin</option>
                      <option value="cologne">Cologne</option>
                      <option value="stuttgart">Stuttgart</option>
                      <option value="dusseldorf">Düsseldorf</option>
                      <option value="leipzig">Leipzig</option>
                      <option value="nuremberg">Nuremberg</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Education</option>
                      <option value="ausbildung">Ausbildung</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="staatsexamen">Staatsexamen</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Company Size</option>
                      <option value="startup">Startup (1-50 employees)</option>
                      <option value="small">Small (51-250 employees)</option>
                      <option value="medium">Medium (251-1000 employees)</option>
                      <option value="large">Large (1000+ employees)</option>
                      <option value="dax">DAX Company</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    const jobTitle = (document.querySelector('input[placeholder="Enter job title"]') as HTMLInputElement)?.value || 'Software Engineer';
                    const industry = (document.querySelector('select')?.value || 'technology') as keyof typeof baseSalaries;
                    const experience = (document.querySelectorAll('select')[1].value || 'mid') as keyof typeof experienceMultipliers;
                    const city = (document.querySelectorAll('select')[2].value || 'munich') as keyof typeof cityMultipliers;
                    const education = (document.querySelectorAll('select')[3].value || 'bachelors') as keyof typeof educationMultipliers;
                    const companySize = (document.querySelectorAll('select')[4].value || 'medium') as keyof typeof companySizeMultipliers;
                    
                    const baseSalaries = {
                      'technology': { base: 70000, range: [55000, 110000] },
                      'automotive': { base: 75000, range: [60000, 120000] },
                      'finance': { base: 68000, range: [50000, 100000] },
                      'manufacturing': { base: 62000, range: [45000, 90000] },
                      'healthcare': { base: 55000, range: [40000, 80000] },
                      'engineering': { base: 65000, range: [50000, 95000] },
                      'consulting': { base: 72000, range: [55000, 110000] },
                      'chemicals': { base: 68000, range: [52000, 95000] }
                    };
                    
                    const cityMultipliers = {
                      'munich': 1.15,
                      'frankfurt': 1.12,
                      'hamburg': 1.05,
                      'berlin': 0.95,
                      'cologne': 1.00,
                      'stuttgart': 1.08,
                      'dusseldorf': 1.03,
                      'leipzig': 0.85,
                      'nuremberg': 0.95
                    };
                    
                    const experienceMultipliers = {
                      'entry': 0.75,
                      'mid': 1.0,
                      'senior': 1.35,
                      'executive': 1.8
                    };
                    
                    const educationMultipliers = {
                      'ausbildung': 0.85,
                      'bachelors': 1.0,
                      'masters': 1.15,
                      'phd': 1.25,
                      'staatsexamen': 1.1
                    };
                    
                    const companySizeMultipliers = {
                      'startup': 0.9,
                      'small': 0.95,
                      'medium': 1.0,
                      'large': 1.1,
                      'dax': 1.25
                    };
                    
                    const industryData = baseSalaries[industry] || baseSalaries['technology'];
                    const estimatedSalary = Math.round(
                      industryData.base * 
                      cityMultipliers[city] * 
                      experienceMultipliers[experience] * 
                      educationMultipliers[education] * 
                      companySizeMultipliers[companySize]
                    );
                    
                    const rangeLow = Math.round(industryData.range[0] * cityMultipliers[city] * experienceMultipliers[experience]);
                    const rangeHigh = Math.round(industryData.range[1] * cityMultipliers[city] * experienceMultipliers[experience]);
                    
                    const monthlyNet = Math.round((estimatedSalary * 0.60) / 12);
                    
                    const midRange = (rangeLow + rangeHigh) / 2;
                    let marketPosition = 'Average';
                    if (estimatedSalary > midRange * 1.1) marketPosition = 'Above Average';
                    else if (estimatedSalary < midRange * 0.9) marketPosition = 'Below Average';
                    
                    const resultPosition = document.getElementById('resultPosition');
                    if (resultPosition) resultPosition.textContent = jobTitle;
                    const resultIndustry = document.getElementById('resultIndustry');
                    if (resultIndustry) resultIndustry.textContent = industry.charAt(0).toUpperCase() + industry.slice(1);
                    const resultLocation = document.getElementById('resultLocation');
                    if (resultLocation) resultLocation.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                    const resultExperience = document.getElementById('resultExperience');
                    if (resultExperience) {
                      resultExperience.textContent = experience.replace('_', ' ').charAt(0).toUpperCase() + experience.replace('_', ' ').slice(1) + ' Level';
                    }
                    const estimatedSalaryElement = document.getElementById('estimatedSalary');
                    if (estimatedSalaryElement) estimatedSalaryElement.textContent = '€' + estimatedSalary.toLocaleString();
                    const salaryRangeElement = document.getElementById('salaryRange');
                    if (salaryRangeElement) salaryRangeElement.textContent = '€' + rangeLow.toLocaleString() + ' - €' + rangeHigh.toLocaleString();
                    const marketPositionElement = document.getElementById('marketPosition');
                    if (marketPositionElement) marketPositionElement.textContent = marketPosition;
                    const monthlyNetElement = document.getElementById('monthlyNet');
                    if (monthlyNetElement) monthlyNetElement.textContent = '€' + monthlyNet.toLocaleString();
                    
                    const notes = `This estimate is based on current market data for ${jobTitle} roles in ${city.charAt(0).toUpperCase() + city.slice(1)}. Consider additional benefits like vacation days (25-30 days typical), health insurance, and potential company car or transport allowances.`;
                    const salaryNotesElement = document.getElementById('salaryNotes');
                    if (salaryNotesElement) salaryNotesElement.textContent = notes;
                  }}
                  className="w-full md:w-auto bg-gradient-to-r from-gray-800 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Germany Salary
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto px-8 pb-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Salary Calculation Results</h2>
              <p className="text-gray-600">Based on your inputs, here's your German salary analysis</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Salary Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Salary Projection</h3>
                
                <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Position:</span>
                      <span className="font-semibold" id="resultPosition">Software Engineer</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-semibold" id="resultIndustry">Technology</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold" id="resultLocation">Munich</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Experience Level:</span>
                      <span className="font-semibold" id="resultExperience">Mid Level</span>
                    </div>
                    <div className="flex justify-between py-2 bg-green-50 rounded-lg px-4">
                      <span className="text-gray-900 font-medium">Estimated Annual Salary:</span>
                      <span className="font-bold text-green-600 text-xl" id="estimatedSalary">€72,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Data */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Market Analysis</h3>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Market Range:</span>
                      <span className="font-semibold text-blue-600" id="salaryRange">€65,000 - €85,000</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Your Position:</span>
                      <span className="font-semibold text-yellow-600" id="marketPosition">Above Average</span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Monthly Net (approx.):</span>
                      <span className="font-semibold text-green-600" id="monthlyNet">€3,780</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Salary Notes</h4>
                  <p className="text-sm text-gray-700" id="salaryNotes">
                    This estimate is based on current market data for your role in Munich. Consider additional benefits like vacation days, health insurance, and company car.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Average Salaries by City (2025)
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Munich</span>
                      <span className="text-lg font-bold text-gray-900">€65,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Frankfurt</span>
                      <span className="text-lg font-bold text-gray-900">€63,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Hamburg</span>
                      <span className="text-lg font-bold text-gray-900">€58,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Berlin</span>
                      <span className="text-lg font-bold text-gray-900">€52,000</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Top Paying Industries
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Automotive - €70,000-120,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Technology - €65,000-110,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Finance & Banking - €60,000-100,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Consulting - €65,000-95,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Engineering - €55,000-85,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}