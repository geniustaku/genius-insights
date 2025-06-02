import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'France Salary Calculator 2025 | Calculateur de Salaire France',
  description: 'Free France salary calculator for 2025. Calculate salary benchmarks, net income, and compensation in France. Real-time French market data.',
  keywords: [
    'france salary calculator 2025', 'calculateur salaire france', 'france salary benchmarks', 'french salary data', 'salaire france', 'france compensation calculator'
  ],
  alternates: {
    canonical: '/france-salary-calculator',
  },
  openGraph: {
    title: 'France Salary Calculator 2025 | Calculateur de Salaire France',
    description: 'Free France salary calculator for 2025. Calculate salary benchmarks, net income, and compensation in France.',
    url: 'https://genius-insights.co.za/france-salary-calculator',
    type: 'website',
  },
};

export default function FranceSalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇫🇷 2025 Salary Data</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                France Salary Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact salary potential in France with the latest 2025 market data. 
                Compare salaries across cities, industries, and experience levels.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">France Salary Calculator</h2>
              <p className="text-gray-600">Calculate salary benchmarks and compensation in France</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Enter job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="luxury">Luxury Goods</option>
                      <option value="aerospace">Aerospace</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="energy">Energy</option>
                      <option value="consulting">Consulting</option>
                      <option value="retail">Retail</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                      <option value="">Select City</option>
                      <option value="paris">Paris</option>
                      <option value="lyon">Lyon</option>
                      <option value="marseille">Marseille</option>
                      <option value="toulouse">Toulouse</option>
                      <option value="nice">Nice</option>
                      <option value="nantes">Nantes</option>
                      <option value="strasbourg">Strasbourg</option>
                      <option value="montpellier">Montpellier</option>
                      <option value="bordeaux">Bordeaux</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                      <option value="">Select Education</option>
                      <option value="bac">Baccalauréat</option>
                      <option value="bts">BTS/DUT</option>
                      <option value="licence">Licence (Bachelor's)</option>
                      <option value="master">Master's Degree</option>
                      <option value="grande-ecole">Grande École</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                      <option value="">Select Company Size</option>
                      <option value="startup">Startup (1-50 employees)</option>
                      <option value="small">Small (51-250 employees)</option>
                      <option value="medium">Medium (251-1000 employees)</option>
                      <option value="large">Large (1000+ employees)</option>
                      <option value="cac40">CAC 40 Company</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate France Salary
                </button>
              </div>
            </div>
          </div>
        </div>

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
                      <span className="font-medium text-gray-900">Paris</span>
                      <span className="text-lg font-bold text-gray-900">€50,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Lyon</span>
                      <span className="text-lg font-bold text-gray-900">€42,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Toulouse</span>
                      <span className="text-lg font-bold text-gray-900">€40,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Marseille</span>
                      <span className="text-lg font-bold text-gray-900">€38,000</span>
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Finance & Banking - €55,000-90,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Technology - €50,000-85,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Luxury Goods - €45,000-80,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Consulting - €48,000-75,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Aerospace - €45,000-70,000</span>
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