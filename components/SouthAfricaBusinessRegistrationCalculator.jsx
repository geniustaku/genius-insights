'use client'
import { useState } from 'react';

export default function SouthAfricaBusinessRegistrationCalculator() {
  const [businessType, setBusinessType] = useState('pty');
  const [includeVAT, setIncludeVAT] = useState(false);
  const [includeSMAS, setIncludeSMAS] = useState(false);
  const [includeWorkmenComp, setIncludeWorkmenComp] = useState(false);
  const [includeProfessionalHelp, setIncludeProfessionalHelp] = useState(false);
  const [numberOfDirectors, setNumberOfDirectors] = useState('1');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2025 CIPC and SARS fees
  const registrationFees = {
    pty: {
      name: 'Private Company (Pty) Ltd',
      nameReservation: 50,
      registration: 600,
      annualReturn: 345,
      description: 'Limited liability company with separate legal entity'
    },
    cc: {
      name: 'Close Corporation (CC)',
      nameReservation: 50,
      registration: 400,
      annualReturn: 275,
      description: 'Simple business structure with limited members'
    },
    partnership: {
      name: 'Partnership',
      nameReservation: 0,
      registration: 0,
      annualReturn: 0,
      description: 'No CIPC registration required, only tax registration'
    },
    sole: {
      name: 'Sole Proprietorship',
      nameReservation: 0,
      registration: 0,
      annualReturn: 0,
      description: 'Individual business, no separate legal entity'
    }
  };

  const additionalCosts = {
    vat: 0, // VAT registration is free
    smas: 0, // SMAS registration is free
    workmenComp: 500, // Estimated annual premium
    professionalHelp: 3500, // Legal/accounting setup fees
    bankAccount: 150, // Bank account opening fees
    memorandum: 200 // Memorandum of Incorporation drafting
  };

  const calculateRegistrationCost = () => {
    const business = registrationFees[businessType];
    const directors = parseInt(numberOfDirectors);

    // Base costs
    let totalCost = business.nameReservation + business.registration;
    let setupCosts = totalCost;
    let annualCosts = business.annualReturn;

    // Additional registrations (free but may have ongoing costs)
    let registrations = [];
    
    if (businessType === 'pty' || businessType === 'cc') {
      registrations.push('CIPC Registration');
      setupCosts += additionalCosts.memorandum;
      setupCosts += additionalCosts.bankAccount;
    }

    registrations.push('SARS Tax Registration');
    
    if (includeVAT) {
      registrations.push('VAT Registration');
    }
    
    if (includeSMAS) {
      registrations.push('SMAS Registration');
    }
    
    if (includeWorkmenComp) {
      registrations.push('Workmen&apos;s Compensation');
      annualCosts += additionalCosts.workmenComp;
    }

    if (includeProfessionalHelp) {
      setupCosts += additionalCosts.professionalHelp;
    }

    // Director-related costs (for companies)
    if (businessType === 'pty' && directors > 1) {
      // Additional director appointment fees
      setupCosts += (directors - 1) * 100;
    }

    const totalFirstYear = setupCosts + annualCosts;
    
    return {
      businessType: business.name,
      description: business.description,
      setupCosts,
      annualCosts,
      totalFirstYear,
      registrations,
      breakdown: {
        nameReservation: business.nameReservation,
        registration: business.registration,
        annualReturn: business.annualReturn,
        memorandum: businessType === 'pty' || businessType === 'cc' ? additionalCosts.memorandum : 0,
        bankAccount: businessType === 'pty' || businessType === 'cc' ? additionalCosts.bankAccount : 0,
        professionalHelp: includeProfessionalHelp ? additionalCosts.professionalHelp : 0,
        workmenComp: includeWorkmenComp ? additionalCosts.workmenComp : 0,
        additionalDirectors: businessType === 'pty' && directors > 1 ? (directors - 1) * 100 : 0
      },
      timeline: getRegistrationTimeline(),
      numberOfDirectors: directors
    };
  };

  const getRegistrationTimeline = () => {
    if (businessType === 'sole' || businessType === 'partnership') {
      return [
        { step: 'SARS Registration', time: '1-2 weeks', required: true },
        { step: 'Bank Account', time: '1 week', required: false },
        { step: 'Business License', time: 'Varies', required: false }
      ];
    }
    
    return [
      { step: 'Name Reservation', time: '1-2 days', required: true },
      { step: 'Document Preparation', time: '2-3 days', required: true },
      { step: 'CIPC Registration', time: '5-10 days', required: true },
      { step: 'SARS Registration', time: '1-2 weeks', required: true },
      { step: 'Bank Account Opening', time: '1-2 weeks', required: true },
      { step: 'Additional Registrations', time: '1-3 weeks', required: false }
    ];
  };

  const handleCalculate = () => {
    setLoading(true);
    
    setTimeout(() => {
      const registrationResult = calculateRegistrationCost();
      setResult(registrationResult);
      setLoading(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'Free';
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          🏢 South African Business Registration Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Calculate complete business registration costs including CIPC fees, SARS registration, and compliance
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            🏢 Business Entity Type
          </label>
          <select 
            value={businessType} 
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="pty">Private Company (Pty) Ltd - Most Popular</option>
            <option value="cc">Close Corporation (CC) - Simpler Structure</option>
            <option value="partnership">Partnership - Shared Ownership</option>
            <option value="sole">Sole Proprietorship - Individual Business</option>
          </select>
          <p className="text-sm text-gray-600 mt-1">
            {registrationFees[businessType].description}
          </p>
        </div>

        {(businessType === 'pty') && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              👥 Number of Directors
            </label>
            <select 
              value={numberOfDirectors} 
              onChange={(e) => setNumberOfDirectors(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="1">1 Director</option>
              <option value="2">2 Directors</option>
              <option value="3">3 Directors</option>
              <option value="4">4+ Directors</option>
            </select>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Registrations & Services</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeVAT}
                onChange={(e) => setIncludeVAT(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">VAT Registration</span>
                <p className="text-sm text-gray-600">Required if turnover &gt; R1M</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSMAS}
                onChange={(e) => setIncludeSMAS(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">SMAS Registration</span>
                <p className="text-sm text-gray-600">Skills development levy</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWorkmenComp}
                onChange={(e) => setIncludeWorkmenComp(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Workmen&apos;s Compensation</span>
                <p className="text-sm text-gray-600">Required if you have employees</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeProfessionalHelp}
                onChange={(e) => setIncludeProfessionalHelp(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Professional Setup</span>
                <p className="text-sm text-gray-600">Legal & accounting assistance</p>
              </div>
            </label>
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>Calculate Registration Costs</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              {result.businessType} Registration Costs
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Setup Costs</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(result.setupCosts)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg">
                <p className="text-sm font-medium text-white/90 mb-1">First Year Total</p>
                <p className="text-2xl font-bold">{formatCurrency(result.totalFirstYear)}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Annual Costs</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(result.annualCosts)}</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Cost Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  {result.breakdown.nameReservation > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name Reservation:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.nameReservation)}</span>
                    </div>
                  )}
                  {result.breakdown.registration > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">CIPC Registration:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.registration)}</span>
                    </div>
                  )}
                  {result.breakdown.memorandum > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Memorandum & Articles:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.memorandum)}</span>
                    </div>
                  )}
                  {result.breakdown.bankAccount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Account Opening:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.bankAccount)}</span>
                    </div>
                  )}
                  {result.breakdown.additionalDirectors > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Additional Directors:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.additionalDirectors)}</span>
                    </div>
                  )}
                  {result.breakdown.professionalHelp > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Professional Setup:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.professionalHelp)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Setup Total:</span>
                    <span className="text-blue-600">{formatCurrency(result.setupCosts)}</span>
                  </div>
                  {result.breakdown.annualReturn > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Return (CIPC):</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.annualReturn)}</span>
                    </div>
                  )}
                  {result.breakdown.workmenComp > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Workmen&apos;s Compensation:</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.workmenComp)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  Required Registrations
                </h4>
                
                <div className="space-y-2">
                  {result.registrations.map((registration, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-600 text-lg">✓</span>
                      <span className="text-green-800 font-medium">{registration}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">Registration Timeline</h5>
                  <div className="space-y-2">
                    {result.timeline.map((step, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-blue-800">{step.step}:</span>
                        <span className="text-blue-600 font-medium">{step.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Calculate Business Tax</span>
            </a>
            
            <a 
              href="/south-africa-vat-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>💼</span>
              <span>VAT Calculator</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              🏢 <strong>Legal Disclaimer:</strong> Fees are based on current CIPC rates and may vary. 
              Consult with a qualified attorney or accountant for specific legal and tax advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}