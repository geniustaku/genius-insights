'use client';

import StructuredData from '@/components/StructuredData';

export default function GermanyInvestmentCalculatorPage() {
  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-red-600 to-yellow-500 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 German Investment Planning</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Germany Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate investment returns and retirement savings in Germany. Analyze DAX, German stocks, ETFs, and pension plans.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">German Investment & Retirement Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate investment returns, compound growth, and retirement planning scenarios in Germany</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Type
                  </label>
                  <select id="investmentType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black" onChange={() => {
                    const investmentType = (document.getElementById('investmentType') as HTMLSelectElement)?.value as 'dax' | 'german-stocks' | 'world-etf' | 'riester' | 'betriebsrente' | 'real-estate' | 'savings';
                    const defaults = {
                      'dax': { return: 8.5, fees: 0.2 },
                      'german-stocks': { return: 9.2, fees: 1.5 },
                      'world-etf': { return: 7.8, fees: 0.4 },
                      'riester': { return: 4.5, fees: 1.8 },
                      'betriebsrente': { return: 3.5, fees: 1.2 },
                      'real-estate': { return: 6.5, fees: 1.0 },
                      'savings': { return: 1.5, fees: 0.0 }
                    };
                    
                    const def = defaults[investmentType];
                    if (def) {
                      const annualReturnElement = document.getElementById('annualReturn') as HTMLInputElement;
                      const annualFeesElement = document.getElementById('annualFees') as HTMLInputElement;
                      annualReturnElement.value = def.return.toString();
                      annualFeesElement.value = def.fees.toString();
                      
                      const taxSelect = document.getElementById('taxTreatment') as HTMLSelectElement;
                      if (investmentType === 'riester') {
                        taxSelect.value = 'riester-tax';
                      } else if (investmentType === 'betriebsrente') {
                        taxSelect.value = 'company-pension';
                      } else {
                        taxSelect.value = 'taxable';
                      }
                    }
                    
                    const initialAmount = parseFloat((document.getElementById('initialAmount') as HTMLInputElement)?.value ?? '') || 10000;
                    const monthlyContribution = parseFloat((document.getElementById('monthlyContribution') as HTMLInputElement)?.value ?? '') || 500;
                    const annualReturn = parseFloat((document.getElementById('annualReturn') as HTMLInputElement)?.value ?? '') || 7.0;
                    const investmentYears = parseFloat((document.getElementById('investmentYears') as HTMLInputElement)?.value ?? '') || 25;
                    const annualFees = parseFloat((document.getElementById('annualFees') as HTMLInputElement)?.value ?? '') || 1.5;
                    const taxTreatment = (document.getElementById('taxTreatment') as HTMLSelectElement)?.value || 'taxable';
                    
                    const netReturn = (annualReturn - annualFees) / 100;
                    const monthlyReturn = netReturn / 12;
                    const totalMonths = investmentYears * 12;
                    
                    const futureValueInitial = initialAmount * Math.pow(1 + netReturn, investmentYears);
                    
                    const futureValueContributions = monthlyContribution * 
                      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
                    
                    const totalValue = futureValueInitial + futureValueContributions;
                    const totalContributions = initialAmount + (monthlyContribution * totalMonths);
                    const investmentGrowth = totalValue - totalContributions;
                    const totalFees = totalContributions * (annualFees / 100) * investmentYears;
                    
                    let afterTaxValue = totalValue;
                    if (taxTreatment === 'taxable') {
                      const taxRate = 0.26375;
                      const taxableGains = investmentGrowth;
                      const taxes = Math.max(0, taxableGains - 1000) * taxRate;
                      afterTaxValue = totalValue - taxes;
                    } else if (taxTreatment === 'riester-tax') {
                      afterTaxValue = totalValue * 0.70;
                    } else if (taxTreatment === 'savings-allowance') {
                      const taxRate = 0.26375;
                      const taxableGains = Math.max(0, investmentGrowth - 1000);
                      const taxes = taxableGains * taxRate;
                      afterTaxValue = totalValue - taxes;
                    }
                    
                    const resultInitialAmount = document.getElementById('resultInitialAmount');
                    if (resultInitialAmount) resultInitialAmount.textContent = '€' + initialAmount.toLocaleString();
                    
                    const totalContributionsEl = document.getElementById('totalContributions');
                    if (totalContributionsEl) totalContributionsEl.textContent = '€' + Math.round(totalContributions).toLocaleString();
                    
                    const resultAnnualReturnEl = document.getElementById('resultAnnualReturn');
                    if (resultAnnualReturnEl) resultAnnualReturnEl.textContent = annualReturn.toFixed(1) + '%';
                    
                    const investmentGrowthEl = document.getElementById('investmentGrowth');
                    if (investmentGrowthEl) investmentGrowthEl.textContent = '€' + Math.round(investmentGrowth).toLocaleString();
                    
                    const totalFeesEl = document.getElementById('totalFees');
                    if (totalFeesEl) totalFeesEl.textContent = '€' + Math.round(totalFees).toLocaleString();
                    
                    const finalValueEl = document.getElementById('finalValue');
                    if (finalValueEl) finalValueEl.textContent = '€' + Math.round(totalValue).toLocaleString();
                    
                    const afterTaxValueEl = document.getElementById('afterTaxValue');
                    if (afterTaxValueEl) afterTaxValueEl.textContent = '€' + Math.round(afterTaxValue).toLocaleString();
                    
                    const summary = `Your €${initialAmount.toLocaleString()} initial investment plus €${monthlyContribution.toLocaleString()} monthly contributions would grow to €${Math.round(totalValue).toLocaleString()} over ${investmentYears} years at ${annualReturn.toFixed(1)}% annual return.`;
                    const summaryEl = document.getElementById('investmentSummary');
                    if (summaryEl) summaryEl.textContent = summary;
                  }}>
                    <option value="dax">DAX Index Fund</option>
                    <option value="german-stocks">German Blue Chip Stocks</option>
                    <option value="world-etf">World ETF (MSCI World)</option>
                    <option value="riester">Riester Pension Plan</option>
                    <option value="betriebsrente">Company Pension (Betriebsrente)</option>
                    <option value="real-estate">German Real Estate (REITs)</option>
                    <option value="savings">Savings Account (Sparkonto)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Investment (€)
                  </label>
                  <input
                    type="number"
                    id="initialAmount"
                    placeholder="10,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Contribution (€)
                  </label>
                  <input
                    type="number"
                    id="monthlyContribution"
                    placeholder="500"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    id="annualReturn"
                    step="0.1"
                    placeholder="7.0"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    id="investmentYears"
                    placeholder="25"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Treatment
                  </label>
                  <select id="taxTreatment" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="taxable">Taxable Investment</option>
                    <option value="riester-tax">Riester (Tax Deferred)</option>
                    <option value="company-pension">Company Pension (Tax Free)</option>
                    <option value="savings-allowance">Savings Allowance (€1,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Fees (%)
                  </label>
                  <input
                    type="number"
                    id="annualFees"
                    step="0.01"
                    placeholder="1.5"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <button 
                  onClick={() => {
                    const initialAmount = parseFloat((document.getElementById('initialAmount') as HTMLInputElement)?.value ?? '') || 10000;
                    const monthlyContribution = parseFloat((document.getElementById('monthlyContribution') as HTMLInputElement)?.value ?? '') || 500;
                    const annualReturn = parseFloat((document.getElementById('annualReturn') as HTMLInputElement)?.value ?? '') || 7.0;
                    const investmentYears = parseFloat((document.getElementById('investmentYears') as HTMLInputElement)?.value ?? '') || 25;
                    const annualFees = parseFloat((document.getElementById('annualFees') as HTMLInputElement)?.value ?? '') || 1.5;
                    const taxTreatment = (document.getElementById('taxTreatment') as HTMLSelectElement)?.value || 'taxable';
                    
                    const netReturn = (annualReturn - annualFees) / 100;
                    const monthlyReturn = netReturn / 12;
                    const totalMonths = investmentYears * 12;
                    
                    const futureValueInitial = initialAmount * Math.pow(1 + netReturn, investmentYears);
                    
                    const futureValueContributions = monthlyContribution * 
                      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
                    
                    const totalValue = futureValueInitial + futureValueContributions;
                    const totalContributions = initialAmount + (monthlyContribution * totalMonths);
                    const investmentGrowth = totalValue - totalContributions;
                    const totalFees = totalContributions * (annualFees / 100) * investmentYears;
                    
                    let afterTaxValue = totalValue;
                    if (taxTreatment === 'taxable') {
                      const taxRate = 0.26375;
                      const taxableGains = investmentGrowth;
                      const taxes = Math.max(0, taxableGains - 1000) * taxRate;
                      afterTaxValue = totalValue - taxes;
                    } else if (taxTreatment === 'riester-tax') {
                      afterTaxValue = totalValue * 0.70;
                    } else if (taxTreatment === 'savings-allowance') {
                      const taxRate = 0.26375;
                      const taxableGains = Math.max(0, investmentGrowth - 1000);
                      const taxes = taxableGains * taxRate;
                      afterTaxValue = totalValue - taxes;
                    }
                    
                    const resultInitialAmount = document.getElementById('resultInitialAmount');
                    if (resultInitialAmount) resultInitialAmount.textContent = '€' + initialAmount.toLocaleString();
                    const totalContributionsEl = document.getElementById('totalContributions');
                    if (totalContributionsEl) totalContributionsEl.textContent = '€' + Math.round(totalContributions).toLocaleString();
                    const resultAnnualReturnEl = document.getElementById('resultAnnualReturn');
                    if (resultAnnualReturnEl) resultAnnualReturnEl.textContent = annualReturn.toFixed(1) + '%';
                    const investmentGrowthEl = document.getElementById('investmentGrowth');
                    if (investmentGrowthEl) investmentGrowthEl.textContent = '€' + Math.round(investmentGrowth).toLocaleString();
                    const totalFeesEl = document.getElementById('totalFees');
                    if (totalFeesEl) totalFeesEl.textContent = '€' + Math.round(totalFees).toLocaleString();
                    const finalValueEl = document.getElementById('finalValue');
                    if (finalValueEl) finalValueEl.textContent = '€' + Math.round(totalValue).toLocaleString();
                    const afterTaxValueEl = document.getElementById('afterTaxValue');
                    if (afterTaxValueEl) afterTaxValueEl.textContent = '€' + Math.round(afterTaxValue).toLocaleString();
                    
                    const summary = `Your €${initialAmount.toLocaleString()} initial investment plus €${monthlyContribution.toLocaleString()} monthly contributions would grow to €${Math.round(totalValue).toLocaleString()} over ${investmentYears} years at ${annualReturn.toFixed(1)}% annual return.`;
                    const summaryElement = document.getElementById('investmentSummary');
                    if (summaryElement) summaryElement.textContent = summary;
                  }}
                  className="w-full bg-gradient-to-r from-black via-red-600 to-yellow-500 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate German Investment
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Projection Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Initial Investment:</span>
                    <span className="font-semibold" id="resultInitialAmount">€10,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Contributions:</span>
                    <span className="font-semibold" id="totalContributions">€160,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Expected Return:</span>
                    <span className="font-semibold" id="resultAnnualReturn">7.0%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Investment Growth:</span>
                    <span className="font-semibold text-green-600" id="investmentGrowth">€245,500</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Fees:</span>
                    <span className="font-semibold text-red-600" id="totalFees">€6,075</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Final Value (Before Tax):</span>
                    <span className="font-bold text-green-600 text-xl" id="finalValue">€399,425</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">After-Tax Value:</span>
                    <span className="font-bold text-blue-600 text-xl" id="afterTaxValue">€338,512</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Investment Summary</h4>
                  <p className="text-sm text-blue-800" id="investmentSummary">
                    Your €10,000 initial investment plus €500 monthly contributions would grow to €399,425 over 25 years.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">German Tax Note</h4>
                  <p className="text-sm text-yellow-800">
                    Capital gains tax (Abgeltungssteuer) is 25% + solidarity surcharge. Riester and company pensions have different tax treatments.
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Performance Data */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">German Investment Returns (Historical)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">DAX Index</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">8.5%</div>
                  <p className="text-sm text-gray-600">Average annual return (20 years)</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">German Stocks</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">9.2%</div>
                  <p className="text-sm text-gray-600">Blue chip companies</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">World ETFs</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">7.8%</div>
                  <p className="text-sm text-gray-600">MSCI World diversified</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Savings Account</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">1.5%</div>
                  <p className="text-sm text-gray-600">Current German rates</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">German Market Focus</h4>
                <p className="text-gray-600 text-sm">Specialized in DAX, German stocks, and local investment products</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Tax-Optimized</h4>
                <p className="text-gray-600 text-sm">Consider German tax implications including Riester and company pensions</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Retirement Planning</h4>
                <p className="text-gray-600 text-sm">Plan for German retirement with various investment and pension options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}