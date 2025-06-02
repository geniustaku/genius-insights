import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Japan Salary Calculator 2025 | Japanese Salary Benchmarks',
  description: 'Free Japan salary calculator for 2025. Calculate salary benchmarks, net income, and compensation in Japan. Real-time Japanese market data.',
  keywords: [
    'japan salary calculator 2025', 'japanese salary calculator', 'japan salary benchmarks', 'japanese salary data', 'japan compensation calculator'
  ],
  alternates: {
    canonical: '/japan-salary-calculator',
  },
  openGraph: {
    title: 'Japan Salary Calculator 2025 | Japanese Salary Benchmarks',
    description: 'Free Japan salary calculator for 2025. Calculate salary benchmarks, net income, and compensation in Japan.',
    url: 'https://genius-insights.co.za/japan-salary-calculator',
    type: 'website',
  },
};

export default function JapanSalaryCalculatorPage() {
  return (
    <>
      <StructuredData type="salary-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🇯🇵 2025 Salary Data</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Japan Salary Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate your exact salary potential in Japan with the latest 2025 market data. 
                Compare salaries across cities, industries, and experience levels.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Japan Salary Calculator</h2>
              <p className="text-gray-600">Calculate salary benchmarks and compensation in Japan</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                      placeholder="Enter job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black">
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="automotive">Automotive</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="electronics">Electronics</option>
                      <option value="gaming">Gaming</option>
                      <option value="consulting">Consulting</option>
                      <option value="trading">Trading</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black">
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
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black">
                      <option value="">Select City</option>
                      <option value="tokyo">Tokyo</option>
                      <option value="osaka">Osaka</option>
                      <option value="yokohama">Yokohama</option>
                      <option value="nagoya">Nagoya</option>
                      <option value="sapporo">Sapporo</option>
                      <option value="kobe">Kobe</option>
                      <option value="kyoto">Kyoto</option>
                      <option value="fukuoka">Fukuoka</option>
                      <option value="sendai">Sendai</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black">
                      <option value="">Select Education</option>
                      <option value="high-school">High School</option>
                      <option value="vocational">Vocational School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-black">
                      <option value="">Select Company Size</option>
                      <option value="startup">Startup (1-50 employees)</option>
                      <option value="small">Small (51-300 employees)</option>
                      <option value="medium">Medium (301-1000 employees)</option>
                      <option value="large">Large (1000+ employees)</option>
                      <option value="zaibatsu">Major Corporation</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  Calculate Japan Salary
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
                      <span className="font-medium text-gray-900">Tokyo</span>
                      <span className="text-lg font-bold text-gray-900">¥5,200,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Osaka</span>
                      <span className="text-lg font-bold text-gray-900">¥4,600,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Yokohama</span>
                      <span className="text-lg font-bold text-gray-900">¥4,800,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Nagoya</span>
                      <span className="text-lg font-bold text-gray-900">¥4,400,000</span>
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
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Finance & Banking - ¥6,000,000-12,000,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Technology - ¥5,500,000-11,000,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Automotive - ¥5,000,000-9,500,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Electronics - ¥4,800,000-8,500,000</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Gaming - ¥4,500,000-8,000,000</span>
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