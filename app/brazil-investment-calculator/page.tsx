'use client';

import React, { useState, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';

export default function BrazilInvestmentCalculator() {
  const [formData, setFormData] = useState({
    initialInvestment: 50000,
    monthlyContribution: 1000,
    investmentPeriod: 10,
    investmentType: 'cdi' as keyof typeof investmentTypes,
    expectedReturn: 11.5,
    inflationRate: 4.5,
    taxRegime: 'progressive',
    currentAge: 35,
    retirementAge: 65
  });

  const [results, setResults] = useState({
    futureValue: 0,
    totalContributions: 0,
    totalGrowth: 0,
    realValue: 0,
    monthlyRetirementIncome: 0,
    taxOwed: 0,
    netValue: 0,
    realReturn: 0
  });

  const investmentTypes = {
    'cdi': 'CDI - Certificado de Depósito Interbancário',
    'selic': 'Taxa Selic - Tesouro Direto',
    'bovespa': 'Bovespa - Ações B3',
    'fiis': 'FIIs - Fundos Imobiliários',
    'lci-lca': 'LCI/LCA - Letras de Crédito',
    'cdb': 'CDB - Certificado de Depósito Bancário',
    'debentures': 'Debêntures',
    'crypto': 'Criptomoedas',
    'savings': 'Poupança'
  };

  const taxRegimes = {
    'progressive': 'Tabela Progressiva',
    'regressive': 'Tabela Regressiva',
    'exempt': 'Isento de IR'
  };

  const calculateInvestment = () => {
    const {
      initialInvestment,
      monthlyContribution,
      investmentPeriod,
      investmentType,
      expectedReturn,
      inflationRate,
      taxRegime,
      currentAge,
      retirementAge
    } = formData;

    const monthlyReturn = (expectedReturn / 100) / 12;
    const totalMonths = investmentPeriod * 12;

    // Future value calculation with compound interest
    let futureValue = 0;
    let currentBalance = initialInvestment;
    
    // Calculate month by month
    for (let month = 0; month < totalMonths; month++) {
      currentBalance = currentBalance * (1 + monthlyReturn) + monthlyContribution;
    }
    
    futureValue = currentBalance;
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    const totalGrowth = futureValue - totalContributions;

    // Calculate inflation-adjusted value
    const realValue = futureValue / Math.pow(1 + (inflationRate / 100), investmentPeriod);

    // Calculate tax based on Brazilian rules
    let taxRate = 0;
    let taxOwed = 0;

    if (taxRegime === 'progressive') {
      // Progressive tax table for investments
      if (investmentPeriod <= 0.5) taxRate = 0.225; // 22.5%
      else if (investmentPeriod <= 1) taxRate = 0.20; // 20%
      else if (investmentPeriod <= 2) taxRate = 0.175; // 17.5%
      else taxRate = 0.15; // 15%
    } else if (taxRegime === 'regressive') {
      // Regressive tax table
      if (investmentPeriod <= 0.5) taxRate = 0.225; // 22.5%
      else if (investmentPeriod <= 1) taxRate = 0.20; // 20%
      else if (investmentPeriod <= 2) taxRate = 0.175; // 17.5%
      else if (investmentPeriod <= 4) taxRate = 0.15; // 15%
      else if (investmentPeriod <= 6) taxRate = 0.125; // 12.5%
      else taxRate = 0.10; // 10%
    } else {
      taxRate = 0; // Tax exempt (LCI/LCA, some FIIs)
    }

    // Tax only on gains for most investments
    if (['lci-lca', 'savings'].includes(investmentType)) {
      taxRate = 0; // Tax exempt
    } else if (investmentType === 'fiis') {
      taxRate = 0.20; // 20% on gains, but dividends are exempt
    } else if (investmentType === 'bovespa') {
      // Stocks: 15% on gains for sales up to R$ 20,000/month are exempt
      taxRate = 0.15;
    }

    taxOwed = totalGrowth * taxRate;
    const netValue = futureValue - taxOwed;

    // Calculate real return (nominal return - inflation)
    const realReturn = expectedReturn - inflationRate;

    // Monthly retirement income (4% withdrawal rule)
    const monthlyRetirementIncome = (netValue * 0.04) / 12;

    setResults({
      futureValue: Math.round(futureValue),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      realValue: Math.round(realValue),
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome),
      taxOwed: Math.round(taxOwed),
      netValue: Math.round(netValue),
      realReturn: Number(realReturn.toFixed(2))
    });
  };

  const handleInputChange = (field: string, value: string | number): void => {
    let processedValue = value;
    
    // Handle numeric inputs
    if (typeof value === 'string' && value !== '') {
      if (['initialInvestment', 'monthlyContribution', 'currentAge', 'retirementAge'].includes(field)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        processedValue = numericValue.replace(/^0+/, '') || '0';
        if (processedValue !== '') {
          processedValue = parseInt(processedValue);
        }
      } else if (['investmentPeriod', 'expectedReturn', 'inflationRate'].includes(field)) {
        const numericValue = value.replace(/[^0-9.]/g, '');
        processedValue = parseFloat(numericValue) || 0;
      }
    }

    // Auto-adjust expected returns based on investment type
    if (field === 'investmentType') {
      const returnRates = {
        'selic': 11.5, // Current Selic rate
        'cdi': 11.0, // CDI typically below Selic
        'savings': 8.5, // Poupança lower returns
        'cdb': 12.0, // CDB can offer above CDI
        'lci-lca': 10.5, // Tax-free, slightly lower
        'bovespa': 15.0, // Historical Bovespa average
        'fiis': 13.0, // Real estate funds
        'debentures': 13.5, // Corporate bonds
        'crypto': 25.0 // High risk/return
      } as const;
      
      const newFormData = { 
        ...formData, 
        investmentType: value as keyof typeof investmentTypes,
      };
      if (returnRates[value as keyof typeof returnRates]) {
        newFormData.expectedReturn = returnRates[value as keyof typeof returnRates];
      }
      setFormData(newFormData);
      return;
    }
    
    setFormData({ ...formData, [field]: processedValue });
  };

  useEffect(() => {
    calculateInvestment();
  }, [formData]);

  return (
    <>
      <StructuredData type="investment-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-yellow-600 rounded-b-3xl">
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇧🇷 Calculadora de Investimentos</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Brazil Investment Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate returns on Bovespa stocks, CDI, Selic, FIIs, and other Brazilian investments with tax implications.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculadora de Investimentos Brasil</h2>
              <p className="text-gray-600 text-lg">Calculate returns for Brazilian investment products with tax optimization</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Investimento
                  </label>
                  <select 
                    value={formData.investmentType}
                    onChange={(e) => handleInputChange('investmentType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(investmentTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investimento Inicial (R$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.initialInvestment}
                      onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                      placeholder="50000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aporte Mensal (R$)
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      placeholder="1000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rentabilidade Esperada (% ao ano)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.expectedReturn}
                      onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                      placeholder="11.5"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Período (Anos)
                    </label>
                    <input
                      type="number"
                      value={formData.investmentPeriod}
                      onChange={(e) => handleInputChange('investmentPeriod', e.target.value)}
                      placeholder="10"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inflação (IPCA % ao ano)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                      placeholder="4.5"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regime de Tributação
                    </label>
                    <select 
                      value={formData.taxRegime}
                      onChange={(e) => handleInputChange('taxRegime', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    >
                      {Object.entries(taxRegimes).map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idade Atual
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.currentAge}
                      onChange={(e) => handleInputChange('currentAge', e.target.value)}
                      placeholder="35"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idade de Aposentadoria
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.retirementAge}
                      onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                      placeholder="65"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-black"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Resultados da Simulação</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Tipo de Investimento:</span>
                    <span className="font-semibold text-black text-sm">{investmentTypes[formData.investmentType]}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Período de Investimento:</span>
                    <span className="font-semibold text-black">{formData.investmentPeriod} anos</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Investido:</span>
                    <span className="font-semibold text-blue-600">R$ {results.totalContributions.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rendimento Bruto:</span>
                    <span className="font-semibold text-green-600">R$ {results.totalGrowth.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Valor Futuro Bruto:</span>
                    <span className="font-semibold text-purple-600 text-xl">R$ {results.futureValue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Imposto de Renda:</span>
                    <span className="font-semibold text-red-600">R$ {results.taxOwed.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Valor Líquido:</span>
                    <span className="font-semibold text-green-600 text-xl">R$ {results.netValue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Valor Real (Hoje):</span>
                    <span className="font-semibold text-orange-600">R$ {results.realValue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Rentabilidade Real:</span>
                    <span className={`font-semibold ${results.realReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.realReturn}% ao ano
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                    <span className="text-gray-900 font-medium">Renda Mensal:</span>
                    <span className="font-bold text-green-600 text-xl">R$ {results.monthlyRetirementIncome.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Resumo do Investimento</h4>
                  <p className="text-sm text-blue-800">
                    Investindo R$ {formData.monthlyContribution.toLocaleString()}/mês em {investmentTypes[formData.investmentType].toLowerCase()} por {formData.investmentPeriod} anos resultará em R$ {results.netValue.toLocaleString()} líquidos.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Características do Investimento</h4>
                  <p className="text-sm text-yellow-800">
                    {formData.investmentType === 'selic' && 'Tesouro Direto indexado à Selic, baixo risco, liquidez diária.'}
                    {formData.investmentType === 'cdi' && 'Investimento pós-fixado que acompanha o CDI, boa liquidez.'}
                    {formData.investmentType === 'bovespa' && 'Ações na B3, maior potencial de retorno, maior volatilidade.'}
                    {formData.investmentType === 'fiis' && 'Fundos Imobiliários, distribuição mensal, isenção de IR nos dividendos.'}
                    {formData.investmentType === 'lci-lca' && 'Letras de Crédito, isenção de Imposto de Renda para pessoa física.'}
                    {formData.investmentType === 'savings' && 'Poupança, isenta de IR, rentabilidade baixa mas segura.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Brazilian Investment Products */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Produtos de Investimento no Brasil</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Taxa Selic</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">11,5%</div>
                  <p className="text-sm text-gray-600">Taxa básica de juros</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">CDI</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">11,0%</div>
                  <p className="text-sm text-gray-600">Certificado de Depósito Interbancário</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Bovespa</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">15,0%</div>
                  <p className="text-sm text-gray-600">Ações na B3</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">IPCA</h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">4,5%</div>
                  <p className="text-sm text-gray-600">Inflação oficial</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🇧🇷</div>
                <h4 className="font-semibold text-gray-900 mb-2">Mercado Brasileiro</h4>
                <p className="text-gray-600 text-sm">Selic, CDI, Bovespa, FIIs com tributação brasileira</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Otimização Fiscal</h4>
                <p className="text-gray-600 text-sm">Tabela progressiva, regressiva e investimentos isentos de IR</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Rentabilidade Real</h4>
                <p className="text-gray-600 text-sm">Cálculo com inflação IPCA e poder de compra futuro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}