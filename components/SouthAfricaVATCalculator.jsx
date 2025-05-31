'use client'
import { useState } from 'react';

export default function SouthAfricaVATCalculator() {
  const [amount, setAmount] = useState('');
  const [calculationType, setCalculationType] = useState('addVAT'); // addVAT, removeVAT, checkThreshold
  const [annualTurnover, setAnnualTurnover] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const VAT_RATE = 0.15; // 15% VAT rate in South Africa

  const calculateVAT = () => {
    const inputAmount = parseFloat(amount);
    
    if (calculationType === 'addVAT') {
      // Add VAT to amount (amount is VAT exclusive)
      const vatAmount = inputAmount * VAT_RATE;
      const totalAmount = inputAmount + vatAmount;
      
      return {
        type: 'addVAT',
        originalAmount: inputAmount,
        vatAmount: vatAmount,
        totalAmount: totalAmount,
        vatRate: VAT_RATE * 100,
        description: 'VAT Added to Exclusive Amount'
      };
    } else {
      // Remove VAT from amount (amount is VAT inclusive)
      const vatExclusiveAmount = inputAmount / (1 + VAT_RATE);
      const vatAmount = inputAmount - vatExclusiveAmount;
      
      return {
        type: 'removeVAT',
        originalAmount: inputAmount,
        vatAmount: vatAmount,
        vatExclusiveAmount: vatExclusiveAmount,
        vatRate: VAT_RATE * 100,
        description: 'VAT Removed from Inclusive Amount'
      };
    }
  };

  const checkVATRegistration = () => {
    const turnover = parseFloat(annualTurnover);
    
    let status = '';
    let recommendation = '';
    let threshold = '';
    let color = '';
    
    if (turnover >= 1000000) {
      status = 'Mandatory VAT Registration Required';
      recommendation = 'You MUST register for VAT with SARS immediately';
      threshold = 'Above R1,000,000 threshold';
      color = 'text-red-600 bg-red-50 border-red-200';
    } else if (turnover >= 50000) {
      status = 'Voluntary VAT Registration Available';
      recommendation = 'You may choose to register for VAT voluntarily';
      threshold = 'Between R50,000 - R999,999';
      color = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    } else {
      status = 'No VAT Registration Required';
      recommendation = 'VAT registration not required at current turnover level';
      threshold = 'Below R50,000 threshold';
      color = 'text-green-600 bg-green-50 border-green-200';
    }
    
    return {
      type: 'registration',
      annualTurnover: turnover,
      status,
      recommendation,
      threshold,
      color,
      mandatoryThreshold: 1000000,
      voluntaryThreshold: 50000,
      remainingToMandatory: Math.max(0, 1000000 - turnover),
      percentageToMandatory: Math.min(100, (turnover / 1000000) * 100)
    };
  };

  const handleCalculate = () => {
    if (calculationType === 'checkThreshold') {
      if (!annualTurnover || annualTurnover < 0) return;
    } else {
      if (!amount || amount <= 0) return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      if (calculationType === 'checkThreshold') {
        const registrationResult = checkVATRegistration();
        setResult(registrationResult);
      } else {
        const vatResult = calculateVAT();
        setResult(vatResult);
      }
      setLoading(false);
    }, 400);
  };

  const formatCurrency = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          💼 South African VAT Calculator
        </h2>
        <p className="text-gray-600 text-lg">
          Calculate 15% VAT, check registration requirements, and ensure SARS compliance
        </p>
      </div>

      {/* Calculator Type Toggle */}
      <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
        <button
          onClick={() => setCalculationType('addVAT')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            calculationType === 'addVAT'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ➕ Add VAT
        </button>
        <button
          onClick={() => setCalculationType('removeVAT')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            calculationType === 'removeVAT'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ➖ Remove VAT
        </button>
        <button
          onClick={() => setCalculationType('checkThreshold')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            calculationType === 'checkThreshold'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 Check Registration
        </button>
      </div>

      <div className="space-y-6">
        {calculationType === 'checkThreshold' ? (
          // VAT Registration Check
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📈 Annual Turnover (Past 12 Months)
            </label>
            <input
              type="number"
              value={annualTurnover}
              onChange={(e) => setAnnualTurnover(e.target.value)}
              placeholder="e.g. 850000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Enter your total taxable supplies for the past 12 months
            </p>
          </div>
        ) : (
          // VAT Calculation
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {calculationType === 'addVAT' ? '💰 Amount (VAT Exclusive)' : '💰 Amount (VAT Inclusive)'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <p className="text-sm text-gray-500 mt-2">
              {calculationType === 'addVAT' 
                ? '💡 Enter the amount without VAT to calculate total with VAT'
                : '💡 Enter the amount with VAT to calculate the VAT exclusive amount'
              }
            </p>
          </div>
        )}

        <button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
          disabled={loading || (calculationType === 'checkThreshold' ? !annualTurnover : !amount)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>🧮</span>
              <span>
                {calculationType === 'addVAT' && 'Add VAT (15%)'}
                {calculationType === 'removeVAT' && 'Remove VAT (15%)'}
                {calculationType === 'checkThreshold' && 'Check Registration Status'}
              </span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {result.type === 'registration' ? (
            // Registration Status Results
            <div className={`rounded-3xl p-8 border-2 ${result.color}`}>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
                VAT Registration Status
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">Annual Turnover</p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(result.annualTurnover)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">Registration Status</p>
                  <p className="text-lg font-bold text-purple-600">{result.status.split(' ')[0]}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">To Mandatory</p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(result.remainingToMandatory)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Progress to Mandatory Registration</h4>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-4 rounded-full transition-all duration-1000" 
                    style={{ width: `${result.percentageToMandatory}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R0</span>
                  <span>{result.percentageToMandatory.toFixed(1)}%</span>
                  <span>R1,000,000</span>
                </div>
              </div>

              {/* Status Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  {result.status}
                </h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">Current Status:</p>
                    <p className="text-gray-700">{result.threshold}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">Recommendation:</p>
                    <p className="text-gray-700">{result.recommendation}</p>
                  </div>
                  
                  {result.remainingToMandatory > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-medium text-blue-900 mb-2">Next Steps:</p>
                      <p className="text-blue-800 text-sm">
                        You have {formatCurrency(result.remainingToMandatory)} remaining before mandatory VAT registration. 
                        Consider voluntary registration if you have significant VAT input costs.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // VAT Calculation Results
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
                {result.description}
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {result.type === 'addVAT' ? 'Original (Excl VAT)' : 'Original (Incl VAT)'}
                  </p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(result.originalAmount)}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg">
                  <p className="text-sm font-medium text-white/90 mb-1">VAT Amount (15%)</p>
                  <p className="text-xl font-bold">{formatCurrency(result.vatAmount)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {result.type === 'addVAT' ? 'Total (Incl VAT)' : 'Amount (Excl VAT)'}
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {formatCurrency(result.type === 'addVAT' ? result.totalAmount : result.vatExclusiveAmount)}
                  </p>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🧮</span>
                  Calculation Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {result.type === 'addVAT' ? 'Amount (VAT Exclusive):' : 'Amount (VAT Inclusive):'}
                    </span>
                    <span className="font-medium">{formatCurrency(result.originalAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-800">VAT @ 15%:</span>
                    <span className="font-medium text-purple-800">
                      {result.type === 'addVAT' ? '+' : '-'}{formatCurrency(result.vatAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border-t-2 border-gray-300">
                    <span className="font-semibold text-gray-900">
                      {result.type === 'addVAT' ? 'Total (VAT Inclusive):' : 'Amount (VAT Exclusive):'}
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(result.type === 'addVAT' ? result.totalAmount : result.vatExclusiveAmount)}
                    </span>
                  </div>
                </div>

                {/* Formula */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Formula Used:</p>
                  <p className="text-sm text-gray-700 font-mono">
                    {result.type === 'addVAT' 
                      ? 'VAT Inclusive = VAT Exclusive × 1.15'
                      : 'VAT Exclusive = VAT Inclusive ÷ 1.15'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/south-africa-tax-calculator"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🧮</span>
              <span>Calculate Income Tax</span>
            </a>
            
            <a 
              href="/salary-calculator"
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>💰</span>
              <span>Check Salary Data</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              📝 <strong>SARS Compliance:</strong> This calculator uses the current 15% VAT rate. 
              VAT rules and rates may change. Always consult with a tax professional for complex VAT matters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}