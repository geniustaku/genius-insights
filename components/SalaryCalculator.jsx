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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">African Salary Calculator</h2>
      <p className="text-gray-800 mb-6">Get accurate salary estimates based on 2025 market data.</p>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4 border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleCalculate} className="space-y-4 text-gray-900">
        <div>
          <label className="block mb-1 font-medium text-gray-900">Country</label>
          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full p-2 border rounded text-gray-900"
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

        <div>
          <label className="block mb-1 font-medium text-gray-900">Industry</label>
          <select 
            value={industry} 
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-2 border rounded text-gray-900"
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

        <div>
          <label className="block mb-1 font-medium text-gray-900">Experience Level</label>
          <select 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 border rounded text-gray-900"
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

        <div>
          <label className="block mb-1 font-medium text-gray-900">Education</label>
          <select 
            value={education} 
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 border rounded text-gray-900"
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

        <div>
          <label className="block mb-1 font-medium text-gray-900">City/Region</label>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded text-gray-900"
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

        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate Salary Range'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-blue-50 rounded text-gray-900">
          <h3 className="text-xl font-bold mb-2">Estimated Salary Range:</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm text-gray-800">Low End</p>
              <p className="font-bold">{result.currency}{result.low.toLocaleString()}</p>
            </div>
            <div className="border-x">
              <p className="text-sm text-gray-800">Average</p>
              <p className="font-bold text-blue-600">{result.currency}{result.average.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-800">High End</p>
              <p className="font-bold">{result.currency}{result.high.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 bg-white p-3 rounded border">
            <h4 className="font-semibold text-lg mb-2">{result.jobTitle} in {result.locationName}</h4>
            <div className="text-sm text-gray-900 space-y-1">
              <p><span className="font-medium">Industry:</span> {result.industryName}</p>
              <p><span className="font-medium">Experience:</span> {result.experienceName}</p>
              <p><span className="font-medium">In-demand skills:</span> {result.inDemandSkills.join(', ')}</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a 
              href={`/jobs?industry=${industry}&location=${location}&country=${selectedCountry}`}
              className="text-blue-600 hover:underline inline-block"
            >
              View available jobs in this field →
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-800">
            *Based on African market data as of 2025. Actual salaries may vary based on specific company, skills, and market conditions.
          </p>
        </div>
      )}
    </div>
  );
}
