'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { use } from 'react'; // Add React.use import

// Dynamically import Recharts components with SSR disabled
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

// Helper function to get country name and details
function getCountryName(countryCode) {
  const countries = {
    'south-africa': { name: 'South Africa', flag: '🇿🇦', region: 'Southern Africa' },
    'nigeria': { name: 'Nigeria', flag: '🇳🇬', region: 'West Africa' },
    'kenya': { name: 'Kenya', flag: '🇰🇪', region: 'East Africa' },
    'ghana': { name: 'Ghana', flag: '🇬🇭', region: 'West Africa' },
    'egypt': { name: 'Egypt', flag: '🇪🇬', region: 'North Africa' },
    'tanzania': { name: 'Tanzania', flag: '🇹🇿', region: 'East Africa' },
    'ethiopia': { name: 'Ethiopia', flag: '🇪🇹', region: 'East Africa' },
    'uganda': { name: 'Uganda', flag: '🇺🇬', region: 'East Africa' },
    'morocco': { name: 'Morocco', flag: '🇲🇦', region: 'North Africa' },
    'rwanda': { name: 'Rwanda', flag: '🇷🇼', region: 'East Africa' },
    'tunisia': { name: 'Tunisia', flag: '🇹🇳', region: 'North Africa' }
  };
  
  return countries[countryCode];
}

// Helper to get country data
function getCountryData(countryCode) {
  // This would come from your API or database in production
  const marketData = {
    'south-africa': {
      currency: 'R',
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
      majorIndustries: [
        { name: 'Technology', growth: 15.5, jobs: 58000 },
        { name: 'Finance', growth: 8.2, jobs: 42000 },
        { name: 'Healthcare', growth: 12.1, jobs: 36000 },
        { name: 'Mining', growth: 3.5, jobs: 28000 },
        { name: 'Retail', growth: 6.8, jobs: 47000 }
      ],
      skillDemand: [
        { name: 'Cloud Computing', value: 85 },
        { name: 'Data Analysis', value: 80 },
        { name: 'AI/ML', value: 75 },
        { name: 'Cybersecurity', value: 78 },
        { name: 'JavaScript', value: 72 },
        { name: 'Python', value: 82 },
        { name: 'DevOps', value: 70 },
        { name: 'Project Management', value: 65 }
      ],
      yearlyTrends: [
        { year: '2021', jobs: 210000, avgSalary: 420000 },
        { year: '2022', jobs: 245000, avgSalary: 450000 },
        { year: '2023', jobs: 300000, avgSalary: 510000 },
        { year: '2024', jobs: 370000, avgSalary: 580000 },
        { year: '2025', jobs: 420000, avgSalary: 650000 }
      ],
      cityComparison: [
        { city: 'Johannesburg', avgSalary: 650000, jobCount: 180000, growthRate: 12 },
        { city: 'Cape Town', avgSalary: 630000, jobCount: 140000, growthRate: 15 },
        { city: 'Durban', avgSalary: 560000, jobCount: 75000, growthRate: 9 },
        { city: 'Pretoria', avgSalary: 590000, jobCount: 68000, growthRate: 11 },
        { city: 'Port Elizabeth', avgSalary: 520000, jobCount: 42000, growthRate: 8 }
      ],
      keyInsights: [
        "Remote work opportunities have increased by 45% since 2023",
        "Tech sector leads job creation with 15.5% annual growth",
        "Data-related roles command the highest salaries across industries",
        "Cape Town leads in tech job growth at 15% annually",
        "Cloud skills are the most in-demand across all sectors",
        "Career changers primarily move into tech and healthcare fields"
      ]
    },
    'nigeria': {
      currency: '₦',
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
      majorIndustries: [
        { name: 'Technology', growth: 18.2, jobs: 42000 },
        { name: 'Finance', growth: 12.5, jobs: 38000 },
        { name: 'Telecom', growth: 9.8, jobs: 26000 },
        { name: 'Oil & Gas', growth: 4.2, jobs: 32000 },
        { name: 'E-commerce', growth: 15.5, jobs: 28000 }
      ],
      skillDemand: [
        { name: 'Blockchain', value: 82 },
        { name: 'JavaScript', value: 85 },
        { name: 'Mobile Dev', value: 78 },
        { name: 'Cybersecurity', value: 75 },
        { name: 'Python', value: 80 },
        { name: 'Data Analysis', value: 72 },
        { name: 'UI/UX Design', value: 68 },
        { name: 'Cloud Services', value: 70 }
      ],
      yearlyTrends: [
        { year: '2021', jobs: 180000, avgSalary: 6500000 },
        { year: '2022', jobs: 225000, avgSalary: 7200000 },
        { year: '2023', jobs: 280000, avgSalary: 8500000 },
        { year: '2024', jobs: 345000, avgSalary: 9800000 },
        { year: '2025', jobs: 410000, avgSalary: 11000000 }
      ],
      cityComparison: [
        { city: 'Lagos', avgSalary: 11500000, jobCount: 210000, growthRate: 16 },
        { city: 'Abuja', avgSalary: 10800000, jobCount: 120000, growthRate: 14 },
        { city: 'Port Harcourt', avgSalary: 9600000, jobCount: 85000, growthRate: 11 },
        { city: 'Kano', avgSalary: 8500000, jobCount: 42000, growthRate: 8 },
        { city: 'Ibadan', avgSalary: 9200000, jobCount: 58000, growthRate: 10 }
      ],
      keyInsights: [
        "Fintech sector is experiencing explosive growth at 22% annually",
        "Blockchain developer demand has increased by 150% in two years",
        "Remote work adoption has grown by 55% since 2023",
        "Lagos continues to be the tech hub with 65% of all tech jobs",
        "International companies increased hiring by 28% in 2024",
        "Digital skills demand outpaces supply by 3:1 ratio"
      ]
    },
    'kenya': {
      currency: 'KSh',
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
      majorIndustries: [
        { name: 'Technology', growth: 16.5, jobs: 28000 },
        { name: 'Finance', growth: 14.2, jobs: 22000 },
        { name: 'Telecom', growth: 10.8, jobs: 18000 },
        { name: 'Agriculture', growth: 8.2, jobs: 15000 },
        { name: 'E-commerce', growth: 18.5, jobs: 12000 }
      ],
      skillDemand: [
        { name: 'Mobile Dev', value: 85 },
        { name: 'Python', value: 80 },
        { name: 'UI/UX Design', value: 78 },
        { name: 'JavaScript', value: 76 },
        { name: 'Data Analysis', value: 75 },
        { name: 'Cloud Services', value: 72 },
        { name: 'FinTech', value: 70 },
        { name: 'Agile Methods', value: 68 }
      ],
      yearlyTrends: [
        { year: '2021', jobs: 85000, avgSalary: 1500000 },
        { year: '2022', jobs: 110000, avgSalary: 1700000 },
        { year: '2023', jobs: 145000, avgSalary: 2000000 },
        { year: '2024', jobs: 190000, avgSalary: 2300000 },
        { year: '2025', jobs: 230000, avgSalary: 2600000 }
      ],
      cityComparison: [
        { city: 'Nairobi', avgSalary: 2700000, jobCount: 160000, growthRate: 18 },
        { city: 'Mombasa', avgSalary: 2200000, jobCount: 45000, growthRate: 15 },
        { city: 'Kisumu', avgSalary: 1900000, jobCount: 18000, growthRate: 12 },
        { city: 'Nakuru', avgSalary: 1800000, jobCount: 12000, growthRate: 10 },
        { city: 'Eldoret', avgSalary: 1750000, jobCount: 8000, growthRate: 9 }
      ],
      keyInsights: [
        "Mobile money and fintech continue to drive innovation",
        "Tech startups saw 40% increase in funding in 2024",
        "Nairobi solidifies position as East Africa's tech hub",
        "Remote work opportunities increased by 65% since 2023",
        "Data analysis skills highest in demand across industries",
        "Technology talent training programs expanded by 85%"
      ]
    }
  };
  
  // Default to South Africa if country not found
  return marketData[countryCode] || marketData['south-africa'];
}

// Format large numbers with commas
function formatMoney(amount, currencySymbol) {
  return `${currencySymbol}${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function MarketReportPage({ params }) {
  const [isClient, setIsClient] = useState(false);
  
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const country = unwrappedParams.country;
  
  const countryInfo = getCountryName(country);
  
  // Ensure we're in client side rendering for Recharts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!countryInfo) {
    notFound();
  }
  
  const data = getCountryData(country);
  
  // Chart colors with better contrast
  const chartColors = {
    salary: '#0047AB', // Strong blue for salary chart
    growth: '#007C00', // Dark green for growth chart
    jobs: '#6B4C9A',   // Deep purple for jobs line
    avgSalary: '#CB4335', // Deep red for salary line
    demandBar: '#003366', // Navy blue for demand bars
    gridLines: '#CCCCCC', // Medium gray for grid lines
    text: '#000000'      // Black for text
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Tech Market Intelligence 2025
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {countryInfo.flag} {countryInfo.name}
            <span className="block text-3xl md:text-4xl text-blue-200 mt-2">
              Tech Market Report
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
            Comprehensive analysis of salary trends, emerging opportunities, and skill demands 
            driving the tech ecosystem across {countryInfo.region}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white">
            <div className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm">Live Data</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm">2025 Projections</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              <span className="text-sm">{countryInfo.region}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Executive Summary */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Summary</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Key metrics and insights driving {countryInfo.name}'s technology sector growth and innovation landscape
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8" />
                  </svg>
                </div>
                <p className="text-3xl font-bold mb-2">{formatMoney(data.yearlyTrends[4].jobs, '')}</p>
                <p className="text-sm opacity-90">Total Tech Jobs</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <p className="text-3xl font-bold mb-2">{formatMoney(data.yearlyTrends[4].avgSalary, data.currency)}</p>
                <p className="text-sm opacity-90">Average Salary</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-3xl font-bold mb-2">+{data.growthRoles[0].growth}%</p>
                <p className="text-sm opacity-90">Highest Growth</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold mb-2">{formatMoney(data.topPaying[0].salary, data.currency)}</p>
                <p className="text-sm opacity-90">Top Salary</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Insights */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Intelligence & Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic insights and data-driven findings from {countryInfo.name}'s evolving tech landscape
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Key Market Findings</h3>
              </div>
              <div className="space-y-4">
                {data.keyInsights.map((insight, index) => (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-800 font-medium">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 rounded-3xl p-8 shadow-xl text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Market Snapshot</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">{formatMoney(data.yearlyTrends[4].jobs, '')}</p>
                  <p className="text-sm text-blue-200">Tech Jobs (2025)</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">{formatMoney(data.yearlyTrends[4].avgSalary, data.currency)}</p>
                  <p className="text-sm text-blue-200">Average Salary</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-emerald-400">+{data.growthRoles[0].growth}%</p>
                  <p className="text-sm text-blue-200">Peak Growth Rate</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">{formatMoney(data.topPaying[0].salary, data.currency)}</p>
                  <p className="text-sm text-blue-200">Highest Salary</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-sm text-blue-200 mb-2">Leading Growth Sector:</p>
                <p className="text-lg font-bold text-white">{data.growthRoles[0].role}</p>
                <p className="text-sm text-emerald-400">Growing at {data.growthRoles[0].growth}% annually</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Top Paying Roles */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💰 Highest Paying Tech Roles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium compensation packages driving talent attraction in {countryInfo.name}'s competitive tech market
            </p>
          </div>
          {isClient ? (
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Annual Salary Benchmarks</h3>
                <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  {countryInfo.flag} {countryInfo.name} • 2025
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.topPaying}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis 
                      type="number" 
                      tickFormatter={(value) => `${value > 1000000 ? (value/1000000).toFixed(1) + 'M' : (value/1000).toFixed(0) + 'K'}`} 
                      tick={{ fill: '#374151', fontSize: 12 }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="role" 
                      tick={{ fontSize: 14, fill: '#374151' }} 
                      width={140}
                    />
                    <Tooltip 
                      formatter={(value) => [`${formatMoney(value, data.currency)}`, 'Annual Salary']}
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                    />
                    <Bar 
                      dataKey="salary" 
                      radius={[0, 8, 8, 0]}
                      fill="url(#salaryGradient)"
                    />
                    <defs>
                      <linearGradient id="salaryGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Data Source:</strong> Genius Insights Market Analysis • {countryInfo.name} Tech Salary Survey 2025 • 50,000+ salary data points
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center border border-white/20">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}
        </section>
        
        {/* Fastest Growing Roles */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-black">Fastest Growing Roles</h2>
          {isClient ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.growthRoles}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.gridLines} />
                    <XAxis 
                      type="number" 
                      tickFormatter={(value) => `${value}%`} 
                      tick={{ fill: chartColors.text }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="role" 
                      tick={{ fontSize: 14, fill: chartColors.text }} 
                      width={120}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Annual Growth']}
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', color: 'black' }}
                      labelStyle={{ color: 'black', fontWeight: 'bold' }}
                    />
                    <Bar 
                      dataKey="growth" 
                      fill={chartColors.growth} 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-black mt-4">
                Source: Genius Insights Analysis, {countryInfo.name} Employment Statistics 2025
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
              <p className="text-black">Loading chart...</p>
            </div>
          )}
        </section>
        
        {/* Historical Trends */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-black">Historical Trends (2021-2025)</h2>
          {isClient ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.yearlyTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridLines} />
                    <XAxis dataKey="year" tick={{ fill: chartColors.text }} />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke={chartColors.jobs}
                      tick={{ fill: chartColors.text }} 
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke={chartColors.avgSalary}
                      tickFormatter={(value) => `${value/1000}K`}
                      tick={{ fill: chartColors.text }} 
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'jobs' 
                          ? value.toLocaleString() 
                          : formatMoney(value, data.currency),
                        name === 'jobs' ? 'Tech Jobs' : 'Avg Salary'
                      ]} 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', color: 'black' }}
                      labelStyle={{ color: 'black', fontWeight: 'bold' }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="jobs" 
                      name="Tech Jobs" 
                      stroke={chartColors.jobs} 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="avgSalary" 
                      name="Avg Salary" 
                      stroke={chartColors.avgSalary} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-black mt-4">
                Source: Genius Insights Analysis, {countryInfo.name} Bureau of Statistics 2021-2025
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
              <p className="text-black">Loading chart...</p>
            </div>
          )}
        </section>
        
        {/* City Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-black">City Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="py-3 px-4 text-left font-bold">City</th>
                  <th className="py-3 px-4 text-right font-bold">Average Salary</th>
                  <th className="py-3 px-4 text-right font-bold">Tech Jobs</th>
                  <th className="py-3 px-4 text-right font-bold">Growth Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.cityComparison.map((city) => (
                  <tr key={city.city} className="hover:bg-gray-100">
                    <td className="py-3 px-4 font-medium text-black">{city.city}</td>
                    <td className="py-3 px-4 text-right text-black">{formatMoney(city.avgSalary, data.currency)}</td>
                    <td className="py-3 px-4 text-right text-black">{city.jobCount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-green-800 font-medium">{city.growthRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        {/* In-Demand Skills */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-black">In-Demand Skills</h2>
          {isClient ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.skillDemand}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridLines} />
                    <XAxis dataKey="name" tick={{ fill: chartColors.text, angle: -45, textAnchor: 'end', fontSize: 12 }} height={60} />
                    <YAxis 
                      domain={[0, 100]} 
                      tickFormatter={(value) => `${value}%`} 
                      tick={{ fill: chartColors.text }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Demand Score']}
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', color: 'black' }}
                      labelStyle={{ color: 'black', fontWeight: 'bold' }}  
                    />
                    <Bar 
                      dataKey="value" 
                      name="Demand Score" 
                      fill={chartColors.demandBar} 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-black mt-4">
                Source: Genius Insights Job Market Analysis, based on 50,000+ job postings in {countryInfo.name}
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
              <p className="text-black">Loading chart...</p>
            </div>
          )}
        </section>
        
        {/* Call to Action */}
        <section className="mt-16 bg-blue-900 rounded-xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white">Take the Next Step in Your Career</h2>
            <p className="text-lg mb-8 text-white">
              Use our personalized tools to find your ideal career path, assess your skills, and maximize your earning potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/career-assessment" 
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-sm"
              >
                Take Career Assessment
              </Link>
              <Link 
                href="/salary-calculator" 
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-all shadow-sm"
              >
                Calculate Your Salary
              </Link>
              <Link 
                href="/skills-analyzer" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-all shadow-sm"
              >
                Analyze Your Skills
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}