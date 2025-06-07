'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function BrazilLoanCalculator() {
  type PaymentSystemType = 'sac' | 'price' | 'sacre';
  
  type LoanType = 'mortgage' | 'personal' | 'car' | 'payroll' | 'overdraft';
  
  const [formData, setFormData] = useState({
      loanAmount: 300000,
      interestRate: 10.5,
      loanTerm: 20,
      loanType: 'mortgage' as LoanType,
      paymentSystem: 'sac' as PaymentSystemType,
      income: 8000,
      downPayment: 60000,
      propertyValue: 360000,
      indexation: 'fixed'
    });

  const [results, setResults] = useState({
    monthlyPaymentStart: 0,
    monthlyPaymentEnd: 0,
    totalPayment: 0,
    totalInterest: 0,
    loanToValue: 0,
    incomeRatio: 0,
    fgtsUsage: 0,
    totalWithFGTS: 0
  });

  const loanTypes = {
    'mortgage': 'Financiamento Imobiliário (SFH)',
    'personal': 'Empréstimo Pessoal',
    'car': 'Financiamento Veicular',
    'payroll': 'Empréstimo Consignado',
    'overdraft': 'Cheque Especial'
  };

  const paymentSystems = {
    'sac': 'SAC - Sistema de Amortização Constante',
    'price': 'PRICE - Sistema Francês',
    'sacre': 'SACRE - Sistema Misto'
  };

  const indexationTypes = {
    'fixed': 'Taxa Fixa',
    'tr': 'TR + Taxa Fixa',
    'ipca': 'IPCA + Taxa Fixa',
    'cdi': 'CDI + Spread'
  };

  const calculateLoan = () => {
    const {
      loanAmount,
      interestRate,
      loanTerm,
      loanType,
      paymentSystem,
      income,
      downPayment,
      propertyValue
    } = formData;

    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = loanTerm * 12;
    
    let monthlyPaymentStart = 0;
    let monthlyPaymentEnd = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (paymentSystem === 'sac') {
      // SAC - Constant Amortization System
      const amortization = loanAmount / totalMonths;
      monthlyPaymentStart = amortization + (loanAmount * monthlyRate);
      monthlyPaymentEnd = amortization + (amortization * monthlyRate);
      
      // Total payment calculation for SAC
      let balance = loanAmount;
      totalPayment = 0;
      for (let month = 1; month <= totalMonths; month++) {
        const interest = balance * monthlyRate;
        const payment = amortization + interest;
        totalPayment += payment;
        balance -= amortization;
      }
      
    } else if (paymentSystem === 'price') {
      // PRICE - French System (Fixed payments)
      if (loanAmount > 0 && monthlyRate > 0) {
        monthlyPaymentStart = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
        monthlyPaymentEnd = monthlyPaymentStart;
        totalPayment = monthlyPaymentStart * totalMonths;
      } else {
        monthlyPaymentStart = loanAmount / totalMonths;
        monthlyPaymentEnd = monthlyPaymentStart;
        totalPayment = monthlyPaymentStart * totalMonths;
      }
      
    } else if (paymentSystem === 'sacre') {
      // SACRE - Mixed System
      const pricePayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const amortization = loanAmount / totalMonths;
      const sacFirstPayment = amortization + (loanAmount * monthlyRate);
      
      monthlyPaymentStart = (pricePayment + sacFirstPayment) / 2;
      
      // Simplified calculation for mixed system
      let balance = loanAmount;
      totalPayment = 0;
      for (let month = 1; month <= totalMonths; month++) {
        const interest = balance * monthlyRate;
        const amortizationAmount = loanAmount / totalMonths;
        const payment = amortizationAmount + interest;
        totalPayment += payment;
        balance -= amortizationAmount;
      }
      
      monthlyPaymentEnd = amortization + ((loanAmount - (amortization * (totalMonths - 1))) * monthlyRate);
    }

    totalInterest = totalPayment - loanAmount;

    // Calculate additional metrics for mortgage
    const loanToValue = loanType === 'mortgage' ? (loanAmount / propertyValue) * 100 : 0;
    const incomeRatio = (monthlyPaymentStart / income) * 100;

    // FGTS calculation for mortgage (simplified)
    let fgtsUsage = 0;
    if (loanType === 'mortgage') {
      // Typical FGTS usage for down payment and monthly payments
      fgtsUsage = Math.min(downPayment * 0.5, 50000); // Up to R$ 50,000 for down payment
    }

    const totalWithFGTS = totalPayment - fgtsUsage;

    setResults({
      monthlyPaymentStart: Math.round(monthlyPaymentStart),
      monthlyPaymentEnd: Math.round(monthlyPaymentEnd),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      loanToValue: Number(loanToValue.toFixed(1)),
      incomeRatio: Number(incomeRatio.toFixed(1)),
      fgtsUsage: Math.round(fgtsUsage),
      totalWithFGTS: Math.round(totalWithFGTS)
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['loanAmount', 'income', 'downPayment', 'propertyValue'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['interestRate', 'loanTerm'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateLoan();
  }, [formData]);

  return (
    <>
      <StructuredData type="loan-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-yellow-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇧🇷 Calculadora de Empréstimo</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Brazil Loan Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate mortgage payments, personal loans, and financing with Brazilian banking systems including SAC, PRICE, and FGTS.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculadora de Empréstimo Brasil</h2>
              <p className="text-gray-600 text-lg">Calculate loan payments with Brazilian banking systems and interest rates</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Empréstimo (Loan Type)
                  </label>
                  <select 
                    value={formData.loanType}
                    onChange={(e) => handleInputChange('loanType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(loanTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor do Empréstimo (R$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      placeholder="300000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  {formData.loanType === 'mortgage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entrada (R$)
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.downPayment}
                        onChange={(e) => handleInputChange('downPayment', e.target.value)}
                        placeholder="60000"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                      />
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taxa de Juros (% ao ano)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      placeholder="10.5"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prazo (Anos)
                    </label>
                    <select 
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    >
                      <option value={5}>5 Anos</option>
                      <option value={10}>10 Anos</option>
                      <option value={15}>15 Anos</option>
                      <option value={20}>20 Anos</option>
                      <option value={25}>25 Anos</option>
                      <option value={30}>30 Anos</option>
                      <option value={35}>35 Anos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sistema de Amortização
                  </label>
                  <select 
                    value={formData.paymentSystem}
                    onChange={(e) => handleInputChange('paymentSystem', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(paymentSystems).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indexação
                  </label>
                  <select 
                    value={formData.indexation}
                    onChange={(e) => handleInputChange('indexation', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(indexationTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Renda Mensal (R$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.income}
                      onChange={(e) => handleInputChange('income', e.target.value)}
                      placeholder="8000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  {formData.loanType === 'mortgage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor do Imóvel (R$)
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                        placeholder="360000"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Resultados do Financiamento</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Tipo de Empréstimo:</span>
                    <span className="font-semibold text-black text-sm">{loanTypes[formData.loanType]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Sistema:</span>
                    <span className="font-semibold text-black text-sm">{paymentSystems[formData.paymentSystem]}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Valor Financiado:</span>
                    <span className="font-semibold text-blue-600">R$ {formData.loanAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">1ª Parcela:</span>
                    <span className="font-semibold text-green-600 text-xl">R$ {results.monthlyPaymentStart.toLocaleString()}</span>
                  </div>

                  {formData.paymentSystem === 'sac' && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Última Parcela:</span>
                      <span className="font-semibold text-green-600">R$ {results.monthlyPaymentEnd.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total de Juros:</span>
                    <span className="font-semibold text-red-600">R$ {results.totalInterest.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total a Pagar:</span>
                    <span className="font-semibold text-orange-600">R$ {results.totalPayment.toLocaleString()}</span>
                  </div>

                  {formData.loanType === 'mortgage' && (
                    <>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600">LTV (Loan-to-Value):</span>
                        <span className="font-semibold text-purple-600">{results.loanToValue}%</span>
                      </div>

                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600">FGTS Disponível:</span>
                        <span className="font-semibold text-green-600">R$ {results.fgtsUsage.toLocaleString()}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">% da Renda:</span>
                    <span className={`font-semibold ${results.incomeRatio <= 30 ? 'text-green-600' : results.incomeRatio <= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {results.incomeRatio}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Com FGTS:</span>
                    <span className="font-bold text-green-600 text-xl">R$ {results.totalWithFGTS.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Resumo do Financiamento</h4>
                  <p className="text-sm text-blue-800">
                    {loanTypes[formData.loanType]} de R$ {formData.loanAmount.toLocaleString()} com {paymentSystems[formData.paymentSystem]} em {formData.loanTerm} anos.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Sistema de Amortização</h4>
                  <p className="text-sm text-yellow-800">
                    {formData.paymentSystem === 'sac' && 'SAC: Parcelas decrescentes, amortização constante, menor total de juros.'}
                    {formData.paymentSystem === 'price' && 'PRICE: Parcelas fixas, amortização crescente, maior previsibilidade.'}
                    {formData.paymentSystem === 'sacre' && 'SACRE: Sistema misto, parcelas intermediárias entre SAC e PRICE.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Brazilian Banking Features */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Características do Sistema Bancário Brasileiro</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Sistema SAC</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">Decrescente</div>
                  <p className="text-sm text-gray-600">Amortização constante, parcelas decrescentes</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Sistema PRICE</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">Fixas</div>
                  <p className="text-sm text-gray-600">Parcelas fixas, amortização crescente</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">FGTS</h4>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">Financiamento</div>
                  <p className="text-sm text-gray-600">Uso do FGTS para entrada e parcelas</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">SFH</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">Habitação</div>
                  <p className="text-sm text-gray-600">Sistema Financeiro da Habitação</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇧🇷</div>
                <h4 className="font-semibold text-gray-900 mb-2">Sistema Brasileiro</h4>
                <p className="text-gray-600 text-sm">SAC, PRICE, SACRE com indexação TR, IPCA, e CDI</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">FGTS Integration</h4>
                <p className="text-gray-600 text-sm">Calculate FGTS usage for down payment and monthly installments</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">Complete Analysis</h4>
                <p className="text-gray-600 text-sm">Income ratio, LTV, and total cost analysis for informed decisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}