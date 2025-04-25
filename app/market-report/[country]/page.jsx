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

// Helper function to get country name
function getCountryName(countryCode) {
  const countries = {
    'south-africa': 'South Africa',
    'nigeria': 'Nigeria',
    'kenya': 'Kenya',
    'ghana': 'Ghana',
    'egypt': 'Egypt',
    'tanzania': 'Tanzania',
    'ethiopia': 'Ethiopia',
    'uganda': 'Uganda',
    'morocco': 'Morocco',
    'rwanda': 'Rwanda'
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
  
  const countryName = getCountryName(country);
  
  // Ensure we're in client side rendering for Recharts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!countryName) {
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
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            {countryName} Job Market Report 2025
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Comprehensive analysis of salary trends, in-demand skills, and growth opportunities
            across major industries in {countryName}.
          </p>
        </div>
        
        {/* Key Insights */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-black">Key Market Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-black">Key Findings</h3>
              <ul className="space-y-3">
                {data.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-black">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-800 text-white rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Market Overview</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-white">{formatMoney(data.yearlyTrends[4].jobs, '')}</p>
                  <p className="text-sm text-white">Tech jobs available in 2025</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{formatMoney(data.yearlyTrends[4].avgSalary, data.currency)}</p>
                  <p className="text-sm text-white">Average tech professional salary</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">+{data.growthRoles[0].growth}%</p>
                  <p className="text-sm text-white">Highest job growth in {data.growthRoles[0].role}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{formatMoney(data.topPaying[0].salary, data.currency)}</p>
                  <p className="text-sm text-white">Top salary for {data.topPaying[0].role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Top Paying Roles */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-black">Top Paying Roles</h2>
          {isClient ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.topPaying}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.gridLines} />
                    <XAxis 
                      type="number" 
                      tickFormatter={(value) => `${value/1000}K`} 
                      tick={{ fill: chartColors.text }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="role" 
                      tick={{ fontSize: 14, fill: chartColors.text }} 
                      width={120}
                    />
                    <Tooltip 
                      formatter={(value) => [`${formatMoney(value, data.currency)}`, 'Annual Salary']}
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', color: 'black' }}
                      labelStyle={{ color: 'black', fontWeight: 'bold' }}
                    />
                    <Bar 
                      dataKey="salary" 
                      fill={chartColors.salary} 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-black mt-4">
                Source: Genius Insights Analysis, {countryName} Job Market Survey 2025
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
              <p className="text-black">Loading chart...</p>
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
                Source: Genius Insights Analysis, {countryName} Employment Statistics 2025
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
                Source: Genius Insights Analysis, {countryName} Bureau of Statistics 2021-2025
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
                Source: Genius Insights Job Market Analysis, based on 50,000+ job postings in {countryName}
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