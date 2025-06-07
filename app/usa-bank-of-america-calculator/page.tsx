'use client';

import StructuredData from '@/components/StructuredData';

export default function USABankOfAmericaCalculatorPage() {
  const calculateBofA = () => {
    if (typeof window === 'undefined') return;
    // @ts-ignore
    window.calculateBofA?.();
  };

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-blue-50">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-700 to-blue-800 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇺🇸 Bank of America</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Bank of America Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate Bank of America mortgages, loans, savings, Preferred Rewards, and Merrill Lynch investment products with competitive rates.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bank of America Product Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate payments, returns, and Preferred Rewards benefits</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BofA Product Type
                  </label>
                  <select id="productType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black" onChange={() => {
                    const productType = (document.getElementById('productType') as HTMLSelectElement)?.value as keyof typeof defaults;
                    const defaults = {
                      'mortgage-fixed': { amount: 450000, rate: 7.25, term: 30 },
                      'mortgage-arm': { amount: 600000, rate: 6.875, term: 30 },
                      'auto-loan': { amount: 40000, rate: 7.49, term: 6 },
                      'personal-loan': { amount: 25000, rate: 15.99, term: 5 },
                      'preferred-savings': { amount: 75000, rate: 4.85, term: 1 },
                      'advantage-cd': { amount: 25000, rate: 5.25, term: 1 },
                      'merrill-investment': { amount: 100000, rate: 9.1, term: 15 },
                      'ira-rollover': { amount: 150000, rate: 8.5, term: 25 }
                    };
                    
                    const def = defaults[productType];
                    if (def) {
                      const amountEl = document.getElementById('amount');
                      const rateEl = document.getElementById('interestRate');
                      const termEl = document.getElementById('termYears');
                      
                      if (amountEl && rateEl && termEl) {
                        (amountEl as HTMLInputElement).value = def.amount.toString();
                        (rateEl as HTMLInputElement).value = def.rate.toString();
                        (termEl as HTMLInputElement).value = def.term.toString();
                      }
                    }
                    
                    calculateBofA();
                  }}>
                    <option value="mortgage-fixed">30-Year Fixed Mortgage</option>
                    <option value="mortgage-arm">5/1 ARM Mortgage</option>
                    <option value="auto-loan">Auto Loan</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="preferred-savings">Preferred Savings</option>
                    <option value="advantage-cd">Advantage CD</option>
                    <option value="merrill-investment">Merrill Investment</option>
                    <option value="ira-rollover">IRA Rollover</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="450,000"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    id="interestRate"
                    step="0.01"
                    placeholder="7.25"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    id="termYears"
                    placeholder="30"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Contribution (Optional)
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
                    Preferred Rewards Tier
                  </label>
                  <select id="preferredTier" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="none">No Preferred Rewards</option>
                    <option value="gold">Gold ($20,000+ balance)</option>
                    <option value="platinum">Platinum ($50,000+ balance)</option>
                    <option value="platinum-honors">Platinum Honors ($100,000+ balance)</option>
                    <option value="diamond">Diamond ($1,000,000+ balance)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Region
                  </label>
                  <select id="state" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="california">California</option>
                    <option value="new-york">New York</option>
                    <option value="florida">Florida</option>
                    <option value="texas">Texas</option>
                    <option value="north-carolina">North Carolina</option>
                    <option value="virginia">Virginia</option>
                    <option value="georgia">Georgia</option>
                    <option value="massachusetts">Massachusetts</option>
                  </select>
                </div>

                <button 
                  onClick={() => {
                    calculateBofA();
                  }}
                  className="w-full bg-gradient-to-r from-red-700 to-blue-800 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate BofA Product
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank of America Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold text-black" id="resultProduct">30-Year Fixed Mortgage</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold text-black" id="resultAmount">$450,000</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-black" id="resultRate">7.25%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Preferred Rewards:</span>
                    <span className="font-semibold text-black" id="resultTier">No Preferred Rewards</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Payment/Return:</span>
                    <span className="font-semibold text-red-600 text-xl" id="monthlyAmount">$3,070</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest/Growth:</span>
                    <span className="font-semibold text-green-600" id="totalInterest">$655,200</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Total Amount:</span>
                    <span className="font-bold text-green-600 text-xl" id="totalAmount">$1,105,200</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">BofA Summary</h4>
                  <p className="text-sm text-red-800" id="bofaSummary">
                    Bank of America 30-year fixed mortgage of $450,000 at 7.25% over 30 years requires monthly payments of $3,070.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Preferred Rewards Benefits</h4>
                  <p className="text-sm text-yellow-800" id="preferredBenefits">
                    No Preferred Rewards: Standard rates and basic banking benefits.
                  </p>
                </div>
              </div>
            </div>

            {/* BofA Products Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bank of America Rates 2025</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">30-Year Fixed</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">7.25%</div>
                  <p className="text-sm text-gray-600">Fixed rate mortgage</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Auto Loan</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">7.49%</div>
                  <p className="text-sm text-gray-600">New vehicle financing</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Advantage CD</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">5.25%</div>
                  <p className="text-sm text-gray-600">12-month certificate</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Preferred Savings</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">4.85%</div>
                  <p className="text-sm text-gray-600">Preferred Rewards rate</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Nationwide Presence</h4>
                <p className="text-gray-600 text-sm">4,000+ branches and 16,000+ ATMs across America</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <h4 className="font-semibold text-gray-900 mb-2">Preferred Rewards</h4>
                <p className="text-gray-600 text-sm">Rate boosts and fee waivers based on combined balances</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Merrill Lynch</h4>
                <p className="text-gray-600 text-sm">Integrated wealth management and investment advisory services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function calculateBofA() {
            const productType = document.getElementById('productType').value;
            const amount = parseFloat(document.getElementById('amount').value) || 450000;
            const interestRate = parseFloat(document.getElementById('interestRate').value) || 7.25;
            const termYears = parseFloat(document.getElementById('termYears').value) || 30;
            const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
            const preferredTier = document.getElementById('preferredTier').value;
            
            const productNames = {
              'mortgage-fixed': '30-Year Fixed Mortgage',
              'mortgage-arm': '5/1 ARM Mortgage',
              'auto-loan': 'Auto Loan',
              'personal-loan': 'Personal Loan',
              'preferred-savings': 'Preferred Savings',
              'advantage-cd': 'Advantage CD',
              'merrill-investment': 'Merrill Investment',
              'ira-rollover': 'IRA Rollover'
            };
            
            const tierNames = {
              'none': 'No Preferred Rewards',
              'gold': 'Gold Preferred Rewards',
              'platinum': 'Platinum Preferred Rewards',
              'platinum-honors': 'Platinum Honors',
              'diamond': 'Diamond Preferred Rewards'
            };
            
            const tierBenefits = {
              'none': 'No Preferred Rewards: Standard rates and basic banking benefits.',
              'gold': 'Gold: 10% rate boost on deposits, 25% more cash back, $12 fee waiver.',
              'platinum': 'Platinum: 20% rate boost on deposits, 50% more cash back, waived fees.',
              'platinum-honors': 'Platinum Honors: 50% rate boost on deposits, 75% more rewards, premium benefits.',
              'diamond': 'Diamond: 50% rate boost on deposits, 75% more rewards, dedicated advisor and exclusive access.'
            };
            
            // Preferred Rewards rate adjustments (better rates for deposits, slightly better for loans)
            const tierAdjustments = {
              'none': { loan: 1.0, deposit: 1.0 },
              'gold': { loan: 0.995, deposit: 1.1 },
              'platinum': { loan: 0.99, deposit: 1.2 },
              'platinum-honors': { loan: 0.985, deposit: 1.5 },
              'diamond': { loan: 0.98, deposit: 1.5 }
            };
            
            const isLoan = ['mortgage-fixed', 'mortgage-arm', 'auto-loan', 'personal-loan'].includes(productType);
            const adjustment = isLoan ? tierAdjustments[preferredTier].loan : tierAdjustments[preferredTier].deposit;
            const adjustedRate = interestRate * adjustment;
            
            let monthlyAmount, totalInterest, totalAmount, summary;
            
            if (isLoan) {
              // Loan calculations
              const monthlyRate = adjustedRate / 100 / 12;
              const numPayments = termYears * 12;
              monthlyAmount = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
              const totalPayments = monthlyAmount * numPayments;
              totalInterest = totalPayments - amount;
              totalAmount = totalPayments;
              
              summary = \`Bank of America \${productNames[productType].toLowerCase()} of $\${amount.toLocaleString()} at \${adjustedRate.toFixed(3)}% over \${termYears} years requires monthly payments of $\${Math.round(monthlyAmount).toLocaleString()}.\`;
            } else {
              // Investment/Savings calculations
              const annualRate = adjustedRate / 100;
              const compoundFrequency = productType.includes('investment') || productType.includes('ira') ? 12 : 12;
              const totalMonths = termYears * 12;
              
              // Future value of lump sum
              const futureValueLumpSum = amount * Math.pow(1 + annualRate/compoundFrequency, compoundFrequency * termYears);
              
              // Future value of monthly contributions
              let futureValueContributions = 0;
              if (monthlyContribution > 0) {
                const monthlyRate = annualRate / 12;
                futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
              }
              
              totalAmount = futureValueLumpSum + futureValueContributions;
              totalInterest = totalAmount - amount - (monthlyContribution * totalMonths);
              monthlyAmount = totalInterest / totalMonths; // Monthly interest earned
              
              if (productType.includes('investment') || productType.includes('ira')) {
                summary = \`Bank of America \${productNames[productType].toLowerCase()} with $\${amount.toLocaleString()} initial and \${monthlyContribution > 0 ? '$' + monthlyContribution.toLocaleString() + ' monthly' : 'no monthly'} contributions at \${adjustedRate.toFixed(2)}% will grow to $\${Math.round(totalAmount).toLocaleString()} over \${termYears} years.\`;
              } else {
                summary = \`Bank of America \${productNames[productType].toLowerCase()} of $\${amount.toLocaleString()} at \${adjustedRate.toFixed(2)}% over \${termYears} years will grow to $\${Math.round(totalAmount).toLocaleString()}.\`;
              }
            }
            
            // Update results
            document.getElementById('resultProduct').textContent = productNames[productType];
            document.getElementById('resultAmount').textContent = '$' + amount.toLocaleString();
            document.getElementById('resultRate').textContent = adjustedRate.toFixed(3) + '%';
            document.getElementById('resultTier').textContent = tierNames[preferredTier];
            document.getElementById('monthlyAmount').textContent = '$' + Math.round(monthlyAmount).toLocaleString();
            document.getElementById('totalInterest').textContent = '$' + Math.round(totalInterest).toLocaleString();
            document.getElementById('totalAmount').textContent = '$' + Math.round(totalAmount).toLocaleString();
            document.getElementById('bofaSummary').textContent = summary;
            document.getElementById('preferredBenefits').textContent = tierBenefits[preferredTier];
          }
          
          // Calculate on page load
          window.addEventListener('load', calculateBofA);
        `
      }} />
    </>
  );
}