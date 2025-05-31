'use client'
import { useState, useEffect } from 'react';

export default function SalaryCalculator() {
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('south-africa');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchCities(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/salary-data/countries');
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();
      setCountries(data.countries);
    } catch (err) {
      setError('Failed to load country data');
      console.error(err);
    }
  };

  const fetchCities = async (countryCode) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/salary-data/cities?country=${countryCode}`);
      if (!response.ok) throw new Error('Failed to fetch cities');
      const data = await response.json();
      setCities(data.cities);
      setLocation('');
    } catch (err) {
      setError('Failed to load city data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/salary-data/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry,
          experience,
          education,
          location,
          country: selectedCountry
        })
      });

      if (!response.ok) throw new Error('Calculation failed');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to calculate salary estimate. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const industries = [
    { value: 'tech', label: 'Technology & IT' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'education', label: 'Education & Academia' },
    { value: 'manufacturing', label: 'Manufacturing & Production' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'mining', label: 'Mining & Resources' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'construction', label: 'Construction & Engineering' },
    { value: 'consulting', label: 'Consulting & Professional Services' },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-2 sm:mb-3">
          Calculate Your Market Value
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Get personalized salary insights based on the latest African market data
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl mb-6 flex items-center">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-red-600 text-sm font-bold">!</span>
          </div>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-6 text-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🌍 Country
            </label>
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
              required
              disabled={loading}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏙️ City/Region
            </label>
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-50 text-base appearance-none"
              required
              disabled={loading || cities.length === 0}
            >
              <option value="">Select City/Region</option>
              {cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🏢 Industry
            </label>
            <select 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
              required
              disabled={loading}
            >
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ⏰ Experience Level
            </label>
            <select 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
              required
              disabled={loading}
            >
              <option value="">Select Experience</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (6-10 years)</option>
              <option value="executive">Executive (10+ years)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            🎓 Education Level
          </label>
          <select 
            value={education} 
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white text-base appearance-none"
            required
            disabled={loading}
          >
            <option value="">Select Education</option>
            <option value="high-school">High School/Matric</option>
            <option value="diploma">Diploma/Certificate</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="honors">Honors Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD/Doctorate</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-elegant text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2 min-h-[48px] touch-manipulation"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>💰</span>
              <span>Calculate Salary Range</span>
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Main Results Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Your Estimated Salary Range
              </h3>
              <p className="text-gray-600">Based on current market data for {result.locationName}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Minimum</p>
                <p className="text-xl font-bold text-gray-800">{result.currency}{result.low.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-gradient-elegant text-white rounded-2xl shadow-lg transform scale-105">
                <p className="text-sm font-medium text-white/90 mb-1">Average</p>
                <p className="text-2xl font-bold">{result.currency}{result.average.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Maximum</p>
                <p className="text-xl font-bold text-gray-800">{result.currency}{result.high.toLocaleString()}</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💼</span>
                {result.jobTitle} in {result.locationName}
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">🏢</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Industry</p>
                    <p className="text-gray-600">{result.industryName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">⏰</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Experience</p>
                    <p className="text-gray-600">{result.experienceName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              In-Demand Skills for Higher Earnings
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.inDemandSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={`/job-comparison?industry=${industry}&location=${location}&country=${selectedCountry}`}
              className="flex-1 bg-gradient-vibrant text-white text-center py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📊</span>
              <span>Compare Similar Roles</span>
            </a>
            
            <a 
              href={`/career-assessment`}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 text-center py-4 px-6 rounded-2xl font-semibold hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🎯</span>
              <span>Optimize Your Career</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              💡 <strong>Market Insight:</strong> Salary estimates are based on comprehensive African market data as of 2025. 
              Individual compensation may vary based on company size, specific skills, performance metrics, and negotiation factors.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
