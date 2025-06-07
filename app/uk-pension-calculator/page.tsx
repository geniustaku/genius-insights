'use client';

import StructuredData from '@/components/StructuredData';
import { useEffect } from 'react';

export default function UKPensionCalculatorPage() {
  
  const calculatePension = () => {
    const currentAge = parseInt((document.getElementById('currentAge') as HTMLInputElement)?.value || '0') || 35;
    const retirementAge = parseInt((document.getElementById('retirementAge') as HTMLSelectElement)?.value || '0') || 66;
    const salary = parseFloat((document.getElementById('salary') as HTMLInputElement)?.value || '0') || 40000;
    const currentPot = parseFloat((document.getElementById('currentPot') as HTMLInputElement)?.value || '0') || 25000;
    const monthlyContributions = parseFloat((document.getElementById('monthlyContributions') as HTMLInputElement)?.value || '0') || 300;
    const employerRate = parseFloat((document.getElementById('employerContribution') as HTMLSelectElement)?.value || '0') || 3;
    const annualReturn = parseFloat((document.getElementById('annualReturn') as HTMLSelectElement)?.value || '0') || 7;
    
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const monthsToRetirement = yearsToRetirement * 12;
    
    // Calculate employer monthly contribution
    const employerMonthly = (salary * employerRate / 100) / 12;
    const totalMonthlyContributions = monthlyContributions + employerMonthly;
    
    // Calculate future value of current pension pot
    const futureValueCurrent = currentPot * Math.pow(1 + annualReturn/100, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const monthlyRate = annualReturn / 100 / 12;
    const futureValueContributions = monthsToRetirement > 0 ? 
      totalMonthlyContributions * ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate) : 0;
    
    const totalPensionPot = futureValueCurrent + futureValueContributions;
    
    // Calculate tax-free lump sum (25%)
    const taxFreeLumpSum = totalPensionPot * 0.25;
    const remainingPot = totalPensionPot - taxFreeLumpSum;
    
    // Calculate annual income from private pension (4% withdrawal rate)
    const privatePensionAnnual = remainingPot * 0.04;
    
    // 2025 full state pension
    const statePensionAnnual = 11502;
    
    const totalAnnualIncome = privatePensionAnnual + statePensionAnnual;
    const monthlyIncome = totalAnnualIncome / 12;
    
    // Update results with null safety
    const elements = {
      yearsToRetirement: yearsToRetirement + ' years',
      projectedPot: '£' + Math.round(totalPensionPot).toLocaleString(),
      taxFreeLumpSum: '£' + Math.round(taxFreeLumpSum).toLocaleString(),
      remainingPot: '£' + Math.round(remainingPot).toLocaleString(),
      statePension: '£' + statePensionAnnual.toLocaleString(),
      privatePensionIncome: '£' + Math.round(privatePensionAnnual).toLocaleString(),
      totalAnnualIncome: '£' + Math.round(totalAnnualIncome).toLocaleString(),
      monthlyIncome: '£' + Math.round(monthlyIncome).toLocaleString()
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
    
    const summary = `Based on your contributions of £${Math.round(totalMonthlyContributions).toLocaleString()} per month (including employer contributions), you'll have a pension pot of £${Math.round(totalPensionPot).toLocaleString()} at retirement, providing £${Math.round(monthlyIncome).toLocaleString()} monthly income including state pension.`;
    
    const summaryElement = document.getElementById('retirementSummary');
    if (summaryElement) {
      summaryElement.textContent = summary;
    }
  };

  useEffect(() => {
    // Set default values on component mount
    const currentAgeInput = document.getElementById('currentAge') as HTMLInputElement;
    const salaryInput = document.getElementById('salary') as HTMLInputElement;
    const currentPotInput = document.getElementById('currentPot') as HTMLInputElement;
    const monthlyContributionsInput = document.getElementById('monthlyContributions') as HTMLInputElement;
    
    if (currentAgeInput && !currentAgeInput.value) currentAgeInput.value = '35';
    if (salaryInput && !salaryInput.value) salaryInput.value = '40000';
    if (currentPotInput && !currentPotInput.value) currentPotInput.value = '25000';
    if (monthlyContributionsInput && !monthlyContributionsInput.value) monthlyContributionsInput.value = '300';
    
    calculatePension();
  }, []);

  return (
    <>
      <StructuredData type="pension-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇬🇧 2025 Pension Rules</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                UK Pension Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your state pension, workplace pension, and retirement income with the latest 2025 UK pension rules and tax relief.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">UK Pension & Retirement Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate your complete retirement income including state pension, workplace pension, and private pensions</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Age
                  </label>
                  <input
                    type="number"
                    id="currentAge"
                    placeholder="35"
                    defaultValue="35"
                    min="16"
                    max="75"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Planned Retirement Age
                  </label>
                  <select id="retirementAge" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="60">60</option>
                    <option value="65">65</option>
                    <option value="66" defaultValue="66">66 (State Pension Age)</option>
                    <option value="67">67</option>
                    <option value="68">68</option>
                    <option value="70">70</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Gross Salary (£)
                  </label>
                  <input
                    type="number"
                    id="salary"
                    placeholder="40,000"
                    defaultValue="40000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Pension Pot Value (£)
                  </label>
                  <input
                    type="number"
                    id="currentPot"
                    placeholder="25,000"
                    defaultValue="25000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Pension Contributions (£)
                  </label>
                  <input
                    type="number"
                    id="monthlyContributions"
                    placeholder="300"
                    defaultValue="300"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer Contribution Rate (%)
                  </label>
                  <select id="employerContribution" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="3">3% (Minimum Auto-enrolment)</option>
                    <option value="5">5%</option>
                    <option value="8">8%</option>
                    <option value="10">10%</option>
                    <option value="12">12%</option>
                    <option value="15">15%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <select id="annualReturn" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black">
                    <option value="4">4% (Conservative)</option>
                    <option value="5">5% (Moderate)</option>
                    <option value="6">6% (Balanced)</option>
                    <option value="7" defaultValue="7">7% (Growth)</option>
                    <option value="8">8% (Aggressive)</option>
                  </select>
                </div>

                <button 
                  onClick={calculatePension}
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate Pension & Retirement Income
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Retirement Income Projection</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Years to Retirement:</span>
                    <span className="font-semibold text-black" id="yearsToRetirement">31 years</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Projected Pension Pot:</span>
                    <span className="font-semibold text-green-600" id="projectedPot">£485,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Tax-Free Lump Sum (25%):</span>
                    <span className="font-semibold text-green-600" id="taxFreeLumpSum">£121,250</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Remaining Pension Pot:</span>
                    <span className="font-semibold text-black" id="remainingPot">£363,750</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">State Pension (Annual):</span>
                    <span className="font-semibold text-black" id="statePension">£11,502</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Private Pension (Annual):</span>
                    <span className="font-semibold text-black" id="privatePensionIncome">£14,550</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Annual Income:</span>
                    <span className="font-bold text-green-600 text-xl" id="totalAnnualIncome">£26,052</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Monthly Income:</span>
                    <span className="font-bold text-blue-600 text-xl" id="monthlyIncome">£2,171</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Retirement Summary</h4>
                  <p className="text-sm text-yellow-800" id="retirementSummary">
                    Based on your contributions, you'll have a pension pot of £485,000 at retirement, providing £2,171 monthly income including state pension.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Sections */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">2025 UK Pension Rules</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Annual Allowance: £60,000 (2025/26)</li>
                  <li>• Lifetime Allowance: Abolished from April 2024</li>
                  <li>• State Pension: £11,502 per year (full rate)</li>
                  <li>• Tax-free lump sum: 25% of pension pot</li>
                  <li>• Minimum auto-enrolment: 8% total (3% employer, 5% employee)</li>
                  <li>• State Pension Age: 66 (rising to 67 by 2028)</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Pension Tax Relief</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Basic rate taxpayers: 20% relief on contributions</li>
                  <li>• Higher rate taxpayers: 40% relief on contributions</li>
                  <li>• Additional rate taxpayers: 45% relief on contributions</li>
                  <li>• Relief given at source or through payroll</li>
                  <li>• Maximum relief on £60,000 annual contributions</li>
                  <li>• Carry forward unused allowances from 3 previous years</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Accurate Projections</h4>
                <p className="text-gray-600 text-sm">Based on latest 2025 UK pension rules, tax rates, and state pension rates</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax Optimization</h4>
                <p className="text-gray-600 text-sm">Calculate tax relief on contributions and tax-free lump sum benefits</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Retirement Planning</h4>
                <p className="text-gray-600 text-sm">Plan your retirement income with state pension and private pension combined</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}