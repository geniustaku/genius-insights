'use client';

import StructuredData from '@/components/StructuredData';

export default function GermanyVATCalculatorPage() {
  return (
    <>
      <StructuredData type="vat-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-red-600 to-yellow-500 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 19% & 7% VAT Rates</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Germany VAT Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Mehrwertsteuer 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate 19% German VAT (Mehrwertsteuer/MwSt) instantly. Add or remove VAT with standard and 7% reduced rates for invoices and pricing.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate German Mehrwertsteuer (MwSt)</h2>
              <p className="text-gray-600 text-lg">Enter an amount to calculate 19% or 7% VAT inclusive and exclusive prices for Germany</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (€)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="100.00"
                    step="0.01"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT Rate
                  </label>
                  <select id="vatRate" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="19" selected>19% (Standard Rate)</option>
                    <option value="7">7% (Reduced Rate)</option>
                    <option value="0">0% (Exempt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calculation Type
                  </label>
                  <select id="calculationType" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black">
                    <option value="add">Add VAT (Net → Gross)</option>
                    <option value="remove">Remove VAT (Gross → Net)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <select id="productCategory" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black" onChange={() => {
                    const category = ((document.getElementById('productCategory') as HTMLSelectElement)?.value || 'standard') as CategoryKey;
                    const vatRateSelect = document.getElementById('vatRate') as HTMLSelectElement | null;
                    
                    type CategoryKey = 'standard' | 'food' | 'books' | 'medical' | 'transport' | 'accommodation' | 'financial' | 'insurance' | 'education' | 'medical-services';
                    const rateMap: Record<CategoryKey, string> = {
                      'standard': '19',
                      'food': '7',
                      'books': '7',
                      'medical': '7',
                      'transport': '7',
                      'accommodation': '7',
                      'financial': '0',
                      'insurance': '0',
                      'education': '0',
                      'medical-services': '0'
                    };
                    
                    if (vatRateSelect) {
                      vatRateSelect.value = rateMap[category];
                    }
                    
                    const amount = parseFloat((document.getElementById('amount') as HTMLInputElement)?.value) || 100;
                    const vatRate = parseFloat((document.getElementById('vatRate') as HTMLSelectElement)?.value) || 19;
                    const calculationType = (document.getElementById('calculationType') as HTMLSelectElement)?.value || 'add';
                    
                    let netAmount, grossAmount, vatAmount;
                    
                    if (calculationType === 'add') {
                      netAmount = amount;
                      vatAmount = netAmount * (vatRate / 100);
                      grossAmount = netAmount + vatAmount;
                    } else {
                      grossAmount = amount;
                      netAmount = grossAmount / (1 + vatRate / 100);
                      vatAmount = grossAmount - netAmount;
                    }
                    
                    document.getElementById('originalAmount')!.textContent = '€' + amount.toFixed(2);
                    document.getElementById('displayVatRate')!.textContent = vatRate + '%';
                    document.getElementById('vatAmount')!.textContent = '€' + vatAmount.toFixed(2);
                    document.getElementById('netAmount')!.textContent = '€' + netAmount.toFixed(2);
                    document.getElementById('grossAmount')!.textContent = '€' + grossAmount.toFixed(2);
                    const summaryText = calculationType === 'add' 
                      ? `Adding ${vatRate}% VAT to €${netAmount.toFixed(2)} results in a gross price of €${grossAmount.toFixed(2)} (VAT: €${vatAmount.toFixed(2)}).`
                      : `Removing ${vatRate}% VAT from €${grossAmount.toFixed(2)} results in a net price of €${netAmount.toFixed(2)} (VAT: €${vatAmount.toFixed(2)}).`;
                    
                    const summaryElement = document.getElementById('calculationSummary');
                    if (summaryElement) {
                      summaryElement.textContent = summaryText;
                    }
                  }}>
                    <option value="standard">Standard Products/Services (19%)</option>
                    <option value="food">Food & Beverages (7%)</option>
                    <option value="books">Books & Newspapers (7%)</option>
                    <option value="medical">Medical Equipment (7%)</option>
                    <option value="transport">Public Transport (7%)</option>
                    <option value="accommodation">Hotel Accommodation (7%)</option>
                    <option value="financial">Financial Services (0%)</option>
                    <option value="insurance">Insurance (0%)</option>
                    <option value="education">Education Services (0%)</option>
                    <option value="medical-services">Medical Services (0%)</option>
                  </select>
                </div>

                <button 
                  onClick={() => {
                    const amount = parseFloat((document.getElementById('amount') as HTMLInputElement)?.value) || 100;
                    const vatRate = parseFloat((document.getElementById('vatRate') as HTMLSelectElement)?.value) || 19;
                    const calculationType = (document.getElementById('calculationType') as HTMLSelectElement)?.value || 'add';
                    
                    let netAmount, grossAmount, vatAmount;
                    
                    if (calculationType === 'add') {
                      netAmount = amount;
                      vatAmount = netAmount * (vatRate / 100);
                      grossAmount = netAmount + vatAmount;
                    } else {
                      grossAmount = amount;
                      netAmount = grossAmount / (1 + vatRate / 100);
                      vatAmount = grossAmount - netAmount;
                    }
                    
                    document.getElementById('originalAmount')!.textContent = '€' + amount.toFixed(2);
                    document.getElementById('displayVatRate')!.textContent = vatRate + '%';
                    document.getElementById('vatAmount')!.textContent = '€' + vatAmount.toFixed(2);
                    document.getElementById('netAmount')!.textContent = '€' + netAmount.toFixed(2);
                    document.getElementById('grossAmount')!.textContent = '€' + grossAmount.toFixed(2);
                    
                    const summaryText = calculationType === 'add' 
                      ? `Adding ${vatRate}% VAT to €${netAmount.toFixed(2)} results in a gross price of €${grossAmount.toFixed(2)} (VAT: €${vatAmount.toFixed(2)}).`
                      : `Removing ${vatRate}% VAT from €${grossAmount.toFixed(2)} results in a net price of €${netAmount.toFixed(2)} (VAT: €${vatAmount.toFixed(2)}).`;
                    
                    const summaryElement = document.getElementById('calculationSummary');
                    if (summaryElement) {
                      summaryElement.textContent = summaryText;
                    }
                  }}
                  className="w-full bg-gradient-to-r from-black via-red-600 to-yellow-500 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Calculate German VAT
                </button>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">VAT Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Original Amount:</span>
                    <span className="font-semibold" id="originalAmount">€100.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">VAT Rate:</span>
                    <span className="font-semibold" id="displayVatRate">19%</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">VAT Amount:</span>
                    <span className="font-semibold text-red-600" id="vatAmount">€19.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Net Amount (excl. VAT):</span>
                    <span className="font-semibold" id="netAmount">€100.00</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Gross Amount (incl. VAT):</span>
                    <span className="font-bold text-green-600 text-xl" id="grossAmount">€119.00</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Calculation Summary</h4>
                  <p className="text-sm text-blue-800" id="calculationSummary">
                    Adding 19% VAT to €100.00 results in a gross price of €119.00 (VAT: €19.00).
                  </p>
                </div>
              </div>
            </div>

            {/* VAT Rates Information */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Germany Mehrwertsteuer Rates 2026</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">Standard Rate: 19%</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Most goods and services</li>
                    <li>• Electronics and technology</li>
                    <li>• Clothing and accessories</li>
                    <li>• Professional services</li>
                    <li>• Entertainment services</li>
                    <li>• Restaurant meals (dine-in)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">Reduced Rate: 7%</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Food and beverages</li>
                    <li>• Books and newspapers</li>
                    <li>• Medical equipment</li>
                    <li>• Public transportation</li>
                    <li>• Hotel accommodation</li>
                    <li>• Cultural events</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">Exempt: 0%</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Financial services</li>
                    <li>• Insurance services</li>
                    <li>• Education services</li>
                    <li>• Medical services</li>
                    <li>• Real estate transactions</li>
                    <li>• Postal services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h4>
                <p className="text-gray-600 text-sm">Based on official German VAT rates and tax regulations for 2026</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
                <p className="text-gray-600 text-sm">Calculate VAT amounts instantly for invoicing and pricing</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🏢</div>
                <h4 className="font-semibold text-gray-900 mb-2">Business Compliant</h4>
                <p className="text-gray-600 text-sm">Suitable for German businesses and international companies trading in Germany</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}