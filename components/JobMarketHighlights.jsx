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
    currencySymbol: 'R'
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
    currencySymbol: '₦'
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
    currencySymbol: 'KSh'
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
    currencySymbol: 'GH₵'
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
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {Object.keys(marketData).map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCountry === country 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setChartView('salary')}
            className={`px-3 py-1 text-sm rounded-full ${
              chartView === 'salary' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Top Salaries
          </button>
          <button
            onClick={() => setChartView('growth')}
            className={`px-3 py-1 text-sm rounded-full ${
              chartView === 'growth' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Fastest Growing
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            {chartView === 'salary' 
              ? `Top Paying Tech Roles (${data.currencySymbol})` 
              : 'Fastest Growing Tech Roles (Annual %)'}
          </h3>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis 
                  type="number" 
                  tickFormatter={chartView === 'salary' 
                    ? (value) => `${value/1000}K` 
                    : (value) => `${value}%`
                  } 
                />
                <YAxis 
                  type="category" 
                  dataKey="role" 
                  tick={{ fontSize: 12 }} 
                  width={70}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={chartView === 'salary' ? 'salary' : 'growth'} 
                  barSize={30}
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={chartView === 'salary' 
                        ? `rgba(79, 70, 229, ${1 - index * 0.15})` 
                        : `rgba(16, 185, 129, ${1 - index * 0.15})`
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* In-Demand Skills Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Most In-Demand Skills</h3>
          
          <div className="flex flex-wrap gap-2">
            {data.inDemandSkills.map((skill, index) => (
              <Link 
                key={index}
                href={`/skills/${skill.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3 py-1 text-sm rounded-full 
                  ${index < 3 
                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {skill}
                {index < 3 && (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs bg-indigo-600 text-white rounded-full">
                    {index + 1}
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Key Market Insights:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {chartView === 'salary' 
                  ? `${data.topPaying[0].role} professionals earn up to ${data.currencySymbol}${formatMoney(data.topPaying[0].salary)} annually`
                  : `${data.growthRoles[0].role} demand growing by ${data.growthRoles[0].growth}% annually`
                }
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Remote work opportunities have increased by 45% since 2023
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Companies are increasingly valuing practical skills over formal education
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <Link 
              href={`/market-report/${selectedCountry}`}
              className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800"
            >
              View Full Market Report
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}