'use client'
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Link from 'next/link';

// Mock data for 2025 African tech job market
const marketData = {
  'south-africa': {
    topPaying: [
      { role: 'Data Scientist', salary: 820000 },
      { role: 'Cloud Architect', salary: 780000 },
      { role: 'DevOps Engineer', salary: 750000 },
      { role: 'AI Specialist', salary: 730000 },
      { role: 'Security Engineer', salary: 710000 },
    ],
    growthRoles: [
      { role: 'AI/ML Engineer', growth: 35 },
      { role: 'Data Engineer', growth: 28 },
      { role: 'Cloud Specialist', growth: 24 },
      { role: 'DevOps Engineer', growth: 22 },
      { role: 'Cybersecurity', growth: 20 },
    ],
    inDemandSkills: [
      'Python', 'Cloud (AWS/Azure)', 'Data Analysis', 'Machine Learning', 
      'JavaScript', 'DevOps', 'Cybersecurity', 'React', 'Docker/Kubernetes'
    ],
    currencySymbol: 'R',
    flag: '🇿🇦',
    displayName: 'South Africa'
  },
  'nigeria': {
    topPaying: [
      { role: 'Security Architect', salary: 12500000 },
      { role: 'Data Scientist', salary: 11800000 },
      { role: 'Cloud Engineer', salary: 11000000 },
      { role: 'DevOps Engineer', salary: 10500000 },
      { role: 'Full-Stack Developer', salary: 9800000 },
    ],
    growthRoles: [
      { role: 'Blockchain Developer', growth: 40 },
      { role: 'DevOps Engineer', growth: 32 },
      { role: 'Data Scientist', growth: 30 },
      { role: 'Mobile Developer', growth: 25 },
      { role: 'Security Specialist', growth: 22 },
    ],
    inDemandSkills: [
      'JavaScript', 'Python', 'React/React Native', 'DevOps', 'Cloud Services',
      'Cybersecurity', 'Data Analysis', 'Blockchain', 'UI/UX Design'
    ],
    currencySymbol: '₦',
    flag: '🇳🇬',
    displayName: 'Nigeria'
  },
  'kenya': {
    topPaying: [
      { role: 'Data Scientist', salary: 2800000 },
      { role: 'Security Specialist', salary: 2600000 },
      { role: 'DevOps Engineer', salary: 2500000 },
      { role: 'Software Architect', salary: 2400000 },
      { role: 'Full-Stack Developer', salary: 2200000 },
    ],
    growthRoles: [
      { role: 'Data Analyst', growth: 35 },
      { role: 'Mobile Developer', growth: 32 },
      { role: 'Cloud Engineer', growth: 28 },
      { role: 'FinTech Specialist', growth: 26 },
      { role: 'UX/UI Designer', growth: 22 },
    ],
    inDemandSkills: [
      'Python', 'JavaScript', 'Mobile Development', 'UI/UX Design',
      'Cloud Services', 'Data Analysis', 'Agile Methodologies', 'React Native', 'FinTech'
    ],
    currencySymbol: 'KSh',
    flag: '🇰🇪',
    displayName: 'Kenya'
  },
  'ghana': {
    topPaying: [
      { role: 'Data Engineer', salary: 220000 },
      { role: 'DevOps Engineer', salary: 210000 },
      { role: 'Software Architect', salary: 200000 },
      { role: 'Security Specialist', salary: 190000 },
      { role: 'Full-Stack Developer', salary: 180000 },
    ],
    growthRoles: [
      { role: 'Mobile Developer', growth: 38 },
      { role: 'Data Analyst', growth: 34 },
      { role: 'Cloud Engineer', growth: 30 },
      { role: 'UI/UX Designer', growth: 28 },
      { role: 'QA Engineer', growth: 22 },
    ],
    inDemandSkills: [
      'JavaScript', 'Python', 'Mobile Development', 'UI/UX Design',
      'Cloud Services', 'Quality Assurance', 'Agile', 'React/React Native'
    ],
    currencySymbol: 'GH₵',
    flag: '🇬🇭',
    displayName: 'Ghana'
  },
  'egypt': {
    topPaying: [
      { role: 'Software Architect', salary: 480000 },
      { role: 'Data Scientist', salary: 450000 },
      { role: 'DevOps Engineer', salary: 420000 },
      { role: 'Security Engineer', salary: 400000 },
      { role: 'Full-Stack Developer', salary: 380000 },
    ],
    growthRoles: [
      { role: 'AI/ML Engineer', growth: 42 },
      { role: 'Data Engineer', growth: 36 },
      { role: 'Cloud Specialist', growth: 32 },
      { role: 'Mobile Developer', growth: 28 },
      { role: 'UI/UX Designer', growth: 25 },
    ],
    inDemandSkills: [
      'Python', 'JavaScript', 'React', 'Cloud Computing', 'Data Science',
      'Mobile Development', 'DevOps', 'Machine Learning', 'Cybersecurity'
    ],
    currencySymbol: 'EGP',
    flag: '🇪🇬',
    displayName: 'Egypt'
  },
  'morocco': {
    topPaying: [
      { role: 'Cloud Architect', salary: 380000 },
      { role: 'Data Scientist', salary: 350000 },
      { role: 'DevOps Engineer', salary: 330000 },
      { role: 'Security Specialist', salary: 320000 },
      { role: 'Software Engineer', salary: 300000 },
    ],
    growthRoles: [
      { role: 'Cloud Engineer', growth: 40 },
      { role: 'Data Analyst', growth: 35 },
      { role: 'DevOps Engineer', growth: 30 },
      { role: 'Mobile Developer', growth: 28 },
      { role: 'AI Specialist', growth: 26 },
    ],
    inDemandSkills: [
      'Cloud Services', 'Python', 'JavaScript', 'Data Analysis', 'DevOps',
      'Mobile Development', 'React', 'Machine Learning', 'French Tech'
    ],
    currencySymbol: 'MAD',
    flag: '🇲🇦',
    displayName: 'Morocco'
  },
  'tunisia': {
    topPaying: [
      { role: 'Software Architect', salary: 85000 },
      { role: 'DevOps Engineer', salary: 78000 },
      { role: 'Data Scientist', salary: 75000 },
      { role: 'Security Engineer', salary: 72000 },
      { role: 'Full-Stack Developer', salary: 68000 },
    ],
    growthRoles: [
      { role: 'AI/ML Engineer', growth: 45 },
      { role: 'Data Engineer', growth: 38 },
      { role: 'Cloud Specialist', growth: 34 },
      { role: 'Mobile Developer', growth: 30 },
      { role: 'DevOps Engineer', growth: 28 },
    ],
    inDemandSkills: [
      'Python', 'JavaScript', 'Machine Learning', 'Cloud Computing', 'React',
      'Data Science', 'DevOps', 'Mobile Development', 'French Language'
    ],
    currencySymbol: 'TND',
    flag: '🇹🇳',
    displayName: 'Tunisia'
  },
  'uganda': {
    topPaying: [
      { role: 'Data Scientist', salary: 180000000 },
      { role: 'Software Architect', salary: 165000000 },
      { role: 'DevOps Engineer', salary: 150000000 },
      { role: 'Security Specialist', salary: 140000000 },
      { role: 'Mobile Developer', salary: 130000000 },
    ],
    growthRoles: [
      { role: 'Mobile Developer', growth: 48 },
      { role: 'Data Analyst', growth: 40 },
      { role: 'FinTech Specialist', growth: 35 },
      { role: 'Cloud Engineer', growth: 32 },
      { role: 'UI/UX Designer', growth: 28 },
    ],
    inDemandSkills: [
      'Mobile Development', 'JavaScript', 'Python', 'FinTech', 'UI/UX Design',
      'Data Analysis', 'Cloud Services', 'React Native', 'Agile'
    ],
    currencySymbol: 'UGX',
    flag: '🇺🇬',
    displayName: 'Uganda'
  },
  'tanzania': {
    topPaying: [
      { role: 'Data Engineer', salary: 85000000 },
      { role: 'Software Architect', salary: 80000000 },
      { role: 'DevOps Engineer', salary: 75000000 },
      { role: 'Mobile Developer', salary: 70000000 },
      { role: 'Full-Stack Developer', salary: 65000000 },
    ],
    growthRoles: [
      { role: 'Mobile Developer', growth: 50 },
      { role: 'Data Analyst', growth: 42 },
      { role: 'FinTech Developer', growth: 38 },
      { role: 'UI/UX Designer', growth: 35 },
      { role: 'Cloud Engineer', growth: 30 },
    ],
    inDemandSkills: [
      'Mobile Development', 'JavaScript', 'Python', 'FinTech', 'Data Analysis',
      'UI/UX Design', 'React Native', 'Cloud Services', 'Agile Development'
    ],
    currencySymbol: 'TZS',
    flag: '🇹🇿',
    displayName: 'Tanzania'
  },
  'rwanda': {
    topPaying: [
      { role: 'Data Scientist', salary: 18000000 },
      { role: 'Software Architect', salary: 16500000 },
      { role: 'DevOps Engineer', salary: 15000000 },
      { role: 'Security Engineer', salary: 14000000 },
      { role: 'Full-Stack Developer', salary: 13000000 },
    ],
    growthRoles: [
      { role: 'AI/ML Engineer', growth: 55 },
      { role: 'Data Engineer', growth: 45 },
      { role: 'FinTech Specialist', growth: 40 },
      { role: 'Mobile Developer', growth: 38 },
      { role: 'Cloud Engineer', growth: 35 },
    ],
    inDemandSkills: [
      'Python', 'JavaScript', 'Data Science', 'FinTech', 'Mobile Development',
      'Cloud Computing', 'AI/ML', 'React', 'Digital Transformation'
    ],
    currencySymbol: 'RWF',
    flag: '🇷🇼',
    displayName: 'Rwanda'
  }
};

export default function JobMarketHighlights() {
  const [selectedCountry, setSelectedCountry] = useState('south-africa');
  const [chartView, setChartView] = useState('salary'); // 'salary' or 'growth'
  
  const data = marketData[selectedCountry];
  const chartData = chartView === 'salary' ? data.topPaying : data.growthRoles;
  
  // Format large numbers with commas
  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-100">
          <p className="font-medium">{label}</p>
          {chartView === 'salary' ? (
            <p className="text-indigo-600">
              {data.currencySymbol}{formatMoney(payload[0].value)}
            </p>
          ) : (
            <p className="text-emerald-600">+{payload[0].value}% growth</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Live Market Data
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Currently showing: {marketData[selectedCountry].flag} {marketData[selectedCountry].displayName}
        </h3>
        <p className="text-blue-100 text-sm">
          Real-time insights from across the African tech ecosystem
        </p>
      </div>

      {/* Country Selection */}
      <div className="mb-8">
        <p className="text-white font-medium mb-4 text-center">Select African Country:</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(marketData).map(([country, data]) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 ${
                selectedCountry === country 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105 shadow-2xl' 
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-105'
              }`}
            >
              <div className="text-2xl mb-1">{data.flag}</div>
              <div className="text-xs font-medium">{data.displayName}</div>
              {selectedCountry === country && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-xl"></div>
              )}
            </button>
          ))}
        </div>
      </div>
        
      {/* View Toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setChartView('salary')}
          className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            chartView === 'salary' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
          }`}
        >
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Top Salaries
        </button>
        <button
          onClick={() => setChartView('growth')}
          className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            chartView === 'growth' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
          }`}
        >
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Fastest Growing
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Chart Section */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {chartView === 'salary' 
                ? `💰 Top Paying Tech Roles (${data.currencySymbol})` 
                : '📈 Fastest Growing Tech Roles (Annual %)'}
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {marketData[selectedCountry].flag} {marketData[selectedCountry].displayName}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  tickFormatter={chartView === 'salary' 
                    ? (value) => `${value > 1000000 ? (value/1000000).toFixed(1) + 'M' : (value/1000).toFixed(0) + 'K'}` 
                    : (value) => `${value}%`
                  }
                  stroke="#6b7280"
                />
                <YAxis 
                  type="category" 
                  dataKey="role" 
                  tick={{ fontSize: 13, fill: '#374151' }} 
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={chartView === 'salary' ? 'salary' : 'growth'} 
                  barSize={35}
                  radius={[0, 6, 6, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={chartView === 'salary' 
                        ? `url(#salaryGradient${index})` 
                        : `url(#growthGradient${index})`
                      } 
                    />
                  ))}
                </Bar>
                <defs>
                  {chartData.map((_, index) => (
                    <linearGradient key={`gradient-${index}`} id={`${chartView}Gradient${index}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={chartView === 'salary' ? '#3b82f6' : '#10b981'} stopOpacity={1 - index * 0.15} />
                      <stop offset="100%" stopColor={chartView === 'salary' ? '#8b5cf6' : '#059669'} stopOpacity={1 - index * 0.15} />
                    </linearGradient>
                  ))}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Enhanced Skills & Insights Section */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
          <div className="flex items-center mb-6">
            <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">Most In-Demand Skills</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {data.inDemandSkills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-2 text-sm rounded-xl font-medium transition-all duration-200 ${
                  index < 3 
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200 shadow-sm' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {skill}
                {index < 3 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-bold">
                    {index + 1}
                  </span>
                )}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h4 className="font-bold text-gray-800">Key Market Insights</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <svg className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800 font-medium">
                  {chartView === 'salary' 
                    ? `${data.topPaying[0].role} professionals earn up to ${data.currencySymbol}${formatMoney(data.topPaying[0].salary)} annually`
                    : `${data.growthRoles[0].role} demand growing by ${data.growthRoles[0].growth}% annually`
                  }
                </p>
              </div>
              <div className="flex items-start p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <svg className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-emerald-800 font-medium">
                  Remote work opportunities increased by 45% since 2023
                </p>
              </div>
              <div className="flex items-start p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <svg className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-purple-800 font-medium">
                  Companies value practical skills over formal education
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href={`/market-report/${selectedCountry}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Full Market Report
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}