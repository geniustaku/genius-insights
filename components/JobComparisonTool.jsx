// components/JobComparisonTool.jsx
'use client'
import { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

export default function JobComparisonTool() {
  const [jobs, setJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('south-africa');
  
  // Color palette for the radar chart
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  
  // Load available jobs when the component mounts
  useEffect(() => {
    fetchAvailableJobs();
  }, [selectedIndustry, selectedCountry]);
  
  const fetchAvailableJobs = async () => {
    setJobsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedIndustry) queryParams.append('industry', selectedIndustry);
      if (selectedCountry) queryParams.append('country', selectedCountry);
      
      const response = await fetch(`/api/career-data/jobs?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      
      const data = await response.json();
      setAvailableJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load available jobs. Please try again.');
      // Set fallback data if API fails
      setAvailableJobs(getFallbackJobs(selectedIndustry));
    } finally {
      setJobsLoading(false);
    }
  };
  
  const handleAddJob = (jobId) => {
    if (jobs.length >= 5) {
      setError('You can compare up to 5 jobs at a time. Please remove one to add another.');
      return;
    }
    
    if (jobs.some(job => job.id === jobId)) {
      setError('This job is already in your comparison.');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    // In a real application, you would fetch the job details from the API
    // For now, we'll find it in the available jobs list
    const jobToAdd = availableJobs.find(job => job.id === jobId);
    
    if (jobToAdd) {
      setJobs([...jobs, jobToAdd]);
    }
    
    setLoading(false);
  };
  
  const handleRemoveJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    setError(null);
  };
  
  const handleClearAll = () => {
    setJobs([]);
    setError(null);
  };
  
  // Filter available jobs to exclude those already added
  const filteredJobs = availableJobs.filter(job => 
    !jobs.some(selectedJob => selectedJob.id === job.id)
  );
  
  // Format data for the radar chart
  const getChartData = () => {
    if (jobs.length === 0) return [];
    
    // Define all the metrics we want to compare
    const metrics = [
      { name: 'Salary', key: 'salary', max: 10 },
      { name: 'Work-Life Balance', key: 'workLifeBalance', max: 10 },
      { name: 'Growth Potential', key: 'growthPotential', max: 10 },
      { name: 'Job Security', key: 'jobSecurity', max: 10 },
      { name: 'Market Demand', key: 'marketDemand', max: 10 }
    ];
    
    // Create data points for each metric
    return metrics.map(metric => {
      const dataPoint = { metric: metric.name };
      
      // Add a value for each job
      jobs.forEach(job => {
        dataPoint[job.title] = job[metric.key];
      });
      
      return dataPoint;
    });
  };
  
  // Industries for filter dropdown
  const industries = [
    { value: '', label: 'All Industries' },
    { value: 'tech', label: 'Technology & IT' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'education', label: 'Education & Academia' },
    { value: 'manufacturing', label: 'Manufacturing & Production' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'mining', label: 'Mining & Resources' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'agriculture', label: 'Agriculture & Farming' }
  ];
  
  // Countries for filter dropdown
  const countries = [
    { value: 'south-africa', label: 'South Africa' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'egypt', label: 'Egypt' }
  ];
  
  // Format salary for display
  const formatSalary = (salary, country) => {
    const currencySymbols = {
      'south-africa': 'R',
      'nigeria': '₦',
      'kenya': 'KSh',
      'ghana': 'GH₵',
      'egypt': 'E£',
      'default': '$'
    };
    
    const symbol = currencySymbols[country] || currencySymbols['default'];
    return `${symbol}${salary.toLocaleString()}`;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">African Job Comparison Tool</h2>
      <p className="text-gray-600 mb-6">
        Compare different career paths across key metrics like salary, growth potential, and work-life balance.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-medium">Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Industry</label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          >
            {industries.map((industry) => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={jobs.length === 0 || loading}
          >
            Clear All Jobs
          </button>
        </div>
      </div>
      
      {/* Selected Jobs for Comparison */}
      {jobs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Selected Jobs for Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job, index) => (
              <div key={job.id} className="border rounded-lg p-4 relative" style={{ borderColor: colors[index % colors.length] }}>
                <button
                  onClick={() => handleRemoveJob(job.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  aria-label="Remove job"
                >
                  &times;
                </button>
                <h4 className="font-medium mb-1">{job.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{job.industry}</p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Salary:</span> {formatSalary(job.annualSalary, selectedCountry)}</p>
                  <p><span className="font-medium">Work-Life:</span> {job.workLifeBalance}/10</p>
                  <p><span className="font-medium">Growth:</span> {job.growthPotential}/10</p>
                  <p><span className="font-medium">Security:</span> {job.jobSecurity}/10</p>
                  <p><span className="font-medium">Demand:</span> {job.marketDemand}/10</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Radar Chart Comparison */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Visual Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={getChartData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} />
                  
                  {jobs.map((job, index) => (
                    <Radar
                      key={job.id}
                      name={job.title}
                      dataKey={job.title}
                      stroke={colors[index % colors.length]}
                      fill={colors[index % colors.length]}
                      fillOpacity={0.2}
                    />
                  ))}
                  
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Available Jobs to Add */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Available Jobs to Compare</h3>
        
        {jobsLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-500">Loading jobs...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No more jobs available for comparison with the current filters.</p>
            <p className="text-sm text-gray-500 mt-2">Try changing the industry or country to see more options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <h4 className="font-medium mb-1">{job.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{job.industry}</p>
                <div className="space-y-1 text-sm mb-4">
                  <p><span className="font-medium">Salary:</span> {formatSalary(job.annualSalary, selectedCountry)}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium w-24">Work-Life:</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${job.workLifeBalance * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium w-24">Growth:</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${job.growthPotential * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium w-24">Security:</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${job.jobSecurity * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium w-24">Demand:</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${job.marketDemand * 10}%` }}></div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddJob(job.id)}
                  className="w-full px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Add to Comparison
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to provide fallback job data if API fails
function getFallbackJobs(industry) {
  const baseJobs = [
    {
      id: 'job1',
      title: 'Software Developer',
      industry: 'Technology & IT',
      annualSalary: 650000,
      workLifeBalance: 7,
      growthPotential: 8,
      jobSecurity: 8,
      marketDemand: 9
    },
    {
      id: 'job2',
      title: 'Data Scientist',
      industry: 'Technology & IT',
      annualSalary: 820000,
      workLifeBalance: 7,
      growthPotential: 9,
      jobSecurity: 8,
      marketDemand: 9
    },
    {
      id: 'job3',
      title: 'UX Designer',
      industry: 'Technology & IT',
      annualSalary: 580000,
      workLifeBalance: 8,
      growthPotential: 7,
      jobSecurity: 7,
      marketDemand: 8
    },
    {
      id: 'job4',
      title: 'Project Manager',
      industry: 'Technology & IT',
      annualSalary: 750000,
      workLifeBalance: 6,
      growthPotential: 8,
      jobSecurity: 7,
      marketDemand: 8
    },
    {
      id: 'job5',
      title: 'Cybersecurity Specialist',
      industry: 'Technology & IT',
      annualSalary: 780000,
      workLifeBalance: 7,
      growthPotential: 9,
      jobSecurity: 9,
      marketDemand: 10
    },
    {
      id: 'job6',
      title: 'Financial Analyst',
      industry: 'Finance & Banking',
      annualSalary: 620000,
      workLifeBalance: 6,
      growthPotential: 8,
      jobSecurity: 7,
      marketDemand: 8
    },
    {
      id: 'job7',
      title: 'Investment Banker',
      industry: 'Finance & Banking',
      annualSalary: 950000,
      workLifeBalance: 4,
      growthPotential: 8,
      jobSecurity: 6,
      marketDemand: 7
    },
    {
      id: 'job8',
      title: 'Healthcare Administrator',
      industry: 'Healthcare & Medical',
      annualSalary: 680000,
      workLifeBalance: 7,
      growthPotential: 7,
      jobSecurity: 9,
      marketDemand: 8
    },
    {
      id: 'job9',
      title: 'Teaching Professional',
      industry: 'Education & Academia',
      annualSalary: 450000,
      workLifeBalance: 8,
      growthPotential: 6,
      jobSecurity: 8,
      marketDemand: 7
    },
    {
      id: 'job10',
      title: 'Marketing Manager',
      industry: 'Retail & E-commerce',
      annualSalary: 580000,
      workLifeBalance: 7,
      growthPotential: 7,
      jobSecurity: 6,
      marketDemand: 7
    }
  ];
  
  // If an industry is selected, filter jobs to that industry
  if (industry && industry !== '') {
    const industryMap = {
      'tech': 'Technology & IT',
      'finance': 'Finance & Banking',
      'healthcare': 'Healthcare & Medical',
      'education': 'Education & Academia',
      'retail': 'Retail & E-commerce'
    };
    
    const mappedIndustry = industryMap[industry] || industry;
    return baseJobs.filter(job => job.industry === mappedIndustry);
  }
  
  return baseJobs;
}