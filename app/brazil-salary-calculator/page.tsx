import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import BrazilSalaryCalculatorClient from './BrazilSalaryCalculatorClient';

export const metadata: Metadata = {
  title: 'Brazil Salary Calculator 2025 | Calculadora de Salário Brasil',
  description: 'Free Brazil salary calculator for 2025. Calculate salary benchmarks, cost of living, and compensation in Brazil. Real-time Brazilian market data.',
  keywords: [
    'brazil salary calculator 2025', 'calculadora salario brasil', 'brazil salary benchmarks', 'brazilian salary data', 'salario medio brasil', 'brazil compensation calculator'
  ],
  alternates: {
    canonical: '/brazil-salary-calculator',
  },
  openGraph: {
    title: 'Brazil Salary Calculator 2025 | Calculadora de Salário Brasil',
    description: 'Free Brazil salary calculator for 2025. Calculate salary benchmarks, cost of living, and compensation in Brazil.',
    url: 'https://genius-insights.co.za/brazil-salary-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brazil Salary Calculator 2025 | Calculadora de Salário Brasil',
    description: 'Free Brazil salary calculator for 2025. Calculate salary benchmarks, cost of living, and compensation in Brazil.',
  },
};

export default function BrazilSalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-yellow-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-yellow-500 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇧🇷 2025 Salary Data</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Brazil Salary Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact salary potential in Brazil with the latest 2025 market data. 
                Compare salaries across cities, industries, and experience levels.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <BrazilSalaryCalculatorClient />

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
                      <span className="font-medium text-gray-900">São Paulo</span>
                      <span className="text-lg font-bold text-gray-900">R$6,500</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Rio de Janeiro</span>
                      <span className="text-lg font-bold text-gray-900">R$5,800</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Brasília</span>
                      <span className="text-lg font-bold text-gray-900">R$6,200</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Belo Horizonte</span>
                      <span className="text-lg font-bold text-gray-900">R$4,800</span>
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
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Oil & Gas - R$12,000-25,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Technology - R$8,000-18,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Finance & Banking - R$7,000-15,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Mining - R$6,500-14,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Healthcare - R$5,500-12,000</span>
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