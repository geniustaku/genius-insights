import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Germany Salary Calculator 2025 | Gehaltsrechner Deutschland',
  description: 'Free Germany salary calculator for 2025. Calculate salary benchmarks, net income, and compensation in Germany. Real-time German market data.',
  keywords: [
    'germany salary calculator 2025', 'gehaltsrechner deutschland', 'germany salary benchmarks', 'german salary data', 'gehalt deutschland', 'germany compensation calculator'
  ],
  alternates: {
    canonical: '/germany-salary-calculator',
  },
  openGraph: {
    title: 'Germany Salary Calculator 2025 | Gehaltsrechner Deutschland',
    description: 'Free Germany salary calculator for 2025. Calculate salary benchmarks, net income, and compensation in Germany.',
    url: 'https://genius-insights.co.za/germany-salary-calculator',
    type: 'website',
  },
};

export default function GermanySalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-red-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 2025 Salary Data</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Germany Salary Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact salary potential in Germany with the latest 2025 market data. 
                Compare salaries across cities, industries, and experience levels.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Germany Salary Calculator</h2>
              <p className="text-gray-600">Calculate salary benchmarks and compensation in Germany</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black"
                      placeholder="Enter job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="automotive">Automotive</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="engineering">Engineering</option>
                      <option value="consulting">Consulting</option>
                      <option value="chemicals">Chemicals & Pharma</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
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
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select City</option>
                      <option value="munich">Munich</option>
                      <option value="frankfurt">Frankfurt</option>
                      <option value="hamburg">Hamburg</option>
                      <option value="berlin">Berlin</option>
                      <option value="cologne">Cologne</option>
                      <option value="stuttgart">Stuttgart</option>
                      <option value="dusseldorf">Düsseldorf</option>
                      <option value="leipzig">Leipzig</option>
                      <option value="nuremberg">Nuremberg</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Education</option>
                      <option value="ausbildung">Ausbildung</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="staatsexamen">Staatsexamen</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black">
                      <option value="">Select Company Size</option>
                      <option value="startup">Startup (1-50 employees)</option>
                      <option value="small">Small (51-250 employees)</option>
                      <option value="medium">Medium (251-1000 employees)</option>
                      <option value="large">Large (1000+ employees)</option>
                      <option value="dax">DAX Company</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="w-full md:w-auto bg-gradient-to-r from-gray-800 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Germany Salary
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
                      <span className="font-medium text-gray-900">Munich</span>
                      <span className="text-lg font-bold text-gray-900">€65,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Frankfurt</span>
                      <span className="text-lg font-bold text-gray-900">€63,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Hamburg</span>
                      <span className="text-lg font-bold text-gray-900">€58,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Berlin</span>
                      <span className="text-lg font-bold text-gray-900">€52,000</span>
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
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Automotive - €70,000-120,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Technology - €65,000-110,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Finance & Banking - €60,000-100,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Consulting - €65,000-95,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">Engineering - €55,000-85,000</span>
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