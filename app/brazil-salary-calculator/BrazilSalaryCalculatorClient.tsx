'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function BrazilSalaryCalculatorClient() {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSalary = () => {
    if (!jobTitle || !industry || !experience || !city) return;
    
    setIsCalculating(true);
    
    // Salary calculation logic
    let baseSalary = 60000; // Base R$ 60,000
    
    // City multipliers
    const cityMultipliers: {[key: string]: number} = {
      'sao-paulo': 1.3,
      'rio-de-janeiro': 1.2,
      'brasilia': 1.25,
      'belo-horizonte': 1.1,
      'salvador': 1.0,
      'fortaleza': 0.95,
      'manaus': 0.9,
      'curitiba': 1.15,
      'recife': 1.0,
      'porto-alegre': 1.1
    };
    
    // Industry multipliers
    const industryMultipliers: {[key: string]: number} = {
      'oil-gas': 2.0,
      'technology': 1.5,
      'finance': 1.4,
      'mining': 1.3,
      'healthcare': 1.2,
      'manufacturing': 1.1,
      'retail': 0.9,
      'education': 0.8
    };
    
    // Experience multipliers
    const experienceMultipliers: {[key: string]: number} = {
      'entry': 0.7,
      'mid': 1.0,
      'senior': 1.5,
      'executive': 2.2
    };
    
    // Education multipliers
    const educationMultipliers: {[key: string]: number} = {
      'high-school': 0.8,
      'technical': 0.9,
      'bachelors': 1.0,
      'masters': 1.2,
      'phd': 1.4
    };
    
    // Company size multipliers
    const companySizeMultipliers: {[key: string]: number} = {
      'startup': 0.9,
      'small': 1.0,
      'medium': 1.1,
      'large': 1.2,
      'multinational': 1.3
    };
    
    let finalSalary = baseSalary;
    finalSalary *= cityMultipliers[city] || 1;
    finalSalary *= industryMultipliers[industry] || 1;
    finalSalary *= experienceMultipliers[experience] || 1;
    finalSalary *= educationMultipliers[education] || 1;
    finalSalary *= companySizeMultipliers[companySize] || 1;
    
    const monthlySalary = finalSalary / 12;
    const weeklySalary = finalSalary / 52;
    const dailySalary = finalSalary / 252; // Working days per year
    
    // Calculate salary range (±20%)
    const minSalary = finalSalary * 0.8;
    const maxSalary = finalSalary * 1.2;
    
    setTimeout(() => {
      setResults({
        annualSalary: finalSalary,
        monthlySalary,
        weeklySalary,
        dailySalary,
        minSalary,
        maxSalary,
        cityName: city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        industryName: industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      });
      setIsCalculating(false);
    }, 500);
  };

  const formatCurrency = (amount: number) => {
    return `R$${amount.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      {/* Home Button */}
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Brazil Salary Calculator</h2>
          <p className="text-gray-600">Calculate salary benchmarks and compensation in Brazil</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Enter job title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Industry</label>
                <select 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail & Commerce</option>
                  <option value="education">Education</option>
                  <option value="oil-gas">Oil & Gas</option>
                  <option value="mining">Mining</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Experience Level</label>
                <select 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                >
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
                <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select City</option>
                  <option value="sao-paulo">São Paulo</option>
                  <option value="rio-de-janeiro">Rio de Janeiro</option>
                  <option value="brasilia">Brasília</option>
                  <option value="salvador">Salvador</option>
                  <option value="fortaleza">Fortaleza</option>
                  <option value="belo-horizonte">Belo Horizonte</option>
                  <option value="manaus">Manaus</option>
                  <option value="curitiba">Curitiba</option>
                  <option value="recife">Recife</option>
                  <option value="porto-alegre">Porto Alegre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Education Level</label>
                <select 
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select Education</option>
                  <option value="high-school">High School</option>
                  <option value="technical">Technical Certificate</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Company Size</label>
                <select 
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select Company Size</option>
                  <option value="startup">Startup (1-50 employees)</option>
                  <option value="small">Small (51-200 employees)</option>
                  <option value="medium">Medium (201-1000 employees)</option>
                  <option value="large">Large (1000+ employees)</option>
                  <option value="multinational">Multinational</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={calculateSalary}
              disabled={!jobTitle || !industry || !experience || !city || isCalculating}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                !jobTitle || !industry || !experience || !city || isCalculating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-yellow-500 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Calculating...
                </div>
              ) : (
                'Calculate Brazil Salary'
              )}
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Salary Calculation Results</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Estimated Salary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Salary:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.annualSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Salary:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.monthlySalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weekly Salary:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.weeklySalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Salary:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.dailySalary)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Salary Range</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.minSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.maxSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold text-gray-900">{results.cityName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-semibold text-gray-900">{results.industryName}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-800 mb-2">
                    💰 Salary Estimate Complete
                  </div>
                  <div className="text-sm text-green-700">
                    Based on {results.cityName} market data for {results.industryName} industry
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}