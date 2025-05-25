// components/SkillsAnalyzer.jsx
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SkillsAnalyzer() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [industrySkills, setIndustrySkills] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  // Industry options
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

  // Fetch roles when industry changes
  useEffect(() => {
    if (selectedIndustry) {
      fetchRoles(selectedIndustry);
    }
  }, [selectedIndustry]);

  // Fetch skills when role changes
  useEffect(() => {
    if (selectedRole) {
      fetchSkills(selectedIndustry, selectedRole);
    }
  }, [selectedRole]);

  const fetchRoles = async (industry) => {
    // In production, this would call your API
    setLoadingSkills(true);
    try {
      const response = await fetch(`/api/career-data/roles?industry=${industry}`);
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoleOptions(data.roles);
      setSelectedRole(''); // Reset role when industry changes
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Fallback data for development/testing
      setRoleOptions(getRolesByIndustry(industry));
    } finally {
      setLoadingSkills(false);
    }
  };

  const fetchSkills = async (industry, role) => {
    setLoadingSkills(true);
    try {
      const response = await fetch(`/api/career-data/skills?industry=${industry}&role=${role}`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      const data = await response.json();
      setIndustrySkills(data.skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback data for development/testing
      setIndustrySkills(getSkillsByRole(industry, role));
    } finally {
      setLoadingSkills(false);
    }
  };

  const handleAddSkill = () => {
    if (customSkill.trim() !== '' && !userSkills.includes(customSkill.trim())) {
      setUserSkills([...userSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleSkillSelect = (skill) => {
    if (!userSkills.includes(skill)) {
      setUserSkills([...userSkills, skill]);
    } else {
      setUserSkills(userSkills.filter(s => s !== skill));
    }
  };

  const handleRemoveSkill = (skill) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  const handleAnalyze = () => {
    if (!selectedIndustry || !selectedRole || userSkills.length === 0) {
      return;
    }

    setLoading(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      const analysis = analyzeSkillGap(userSkills, industrySkills);
      setResults(analysis);
      setLoading(false);
    }, 1500);
  };

  const analyzeSkillGap = (userSkills, requiredSkills) => {
    // Skills the user has that match required skills
    const matchingSkills = userSkills.filter(skill => 
      requiredSkills.some(reqSkill => 
        reqSkill.name.toLowerCase() === skill.toLowerCase()
      )
    );

    // Required skills the user is missing
    const missingSkills = requiredSkills.filter(reqSkill => 
      !userSkills.some(skill => 
        skill.toLowerCase() === reqSkill.name.toLowerCase()
      )
    );

    // Calculate match percentage
    const matchPercentage = Math.round(
      (matchingSkills.length / requiredSkills.length) * 100
    );

    // User skills that aren't required but might be useful
    const additionalSkills = userSkills.filter(skill => 
      !requiredSkills.some(reqSkill => 
        reqSkill.name.toLowerCase() === skill.toLowerCase()
      )
    );

    // Group missing skills by importance
    const criticalGaps = missingSkills.filter(skill => skill.importance === 'critical');
    const importantGaps = missingSkills.filter(skill => skill.importance === 'important');
    const niceToHaveGaps = missingSkills.filter(skill => skill.importance === 'nice-to-have');

    // Learning resources for missing skills
    const learningPaths = {};
    missingSkills.forEach(skill => {
      learningPaths[skill.name] = getSkillLearningResources(skill.name);
    });

    return {
      matchPercentage,
      matchingSkills,
      additionalSkills,
      missingSkills: {
        critical: criticalGaps,
        important: importantGaps,
        niceToHave: niceToHaveGaps
      },
      learningPaths
    };
  };

  // Reset the form
  const handleReset = () => {
    setSelectedIndustry('');
    setSelectedRole('');
    setUserSkills([]);
    setResults(null);
  };

  return (
    <div className="glass-card p-8 rounded-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
          AI-Powered Skills Analysis
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover your career readiness with intelligent skill gap analysis tailored for African job markets. Get personalized learning recommendations.
        </p>
      </div>

      {!results ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
              <label className="block mb-3 font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Select Your Target Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white/80 backdrop-blur-sm transition-all duration-300 text-gray-700 hover:bg-white"
                disabled={loading}
              >
                <option value="">Choose your industry...</option>
                {industries.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
              <label className="block mb-3 font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8" />
                  </svg>
                </div>
                Select Your Target Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white/80 backdrop-blur-sm transition-all duration-300 text-gray-700 hover:bg-white disabled:opacity-50"
                disabled={!selectedIndustry || loading || loadingSkills}
              >
                <option value="">
                  {loadingSkills 
                    ? '🔄 Loading roles...' 
                    : selectedIndustry 
                      ? 'Choose your target role...' 
                      : '👆 First select an industry'}
                </option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <label className="block mb-4 font-semibold text-gray-800 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Your Current Skills
            </label>
            
            {userSkills.length > 0 ? (
              <div className="mb-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  {userSkills.map((skill) => (
                    <div 
                      key={skill} 
                      className="group bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-full flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <span className="font-medium">{skill}</span>
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-3 text-emerald-600 hover:text-red-500 transition-colors duration-200 font-bold text-lg"
                        title="Remove skill"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg">
                  ✨ You have {userSkills.length} skill{userSkills.length !== 1 ? 's' : ''} in your profile. Great start!
                </p>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 font-medium mb-2">🚀 Ready to showcase your skills?</p>
                <p className="text-blue-600 text-sm">Add your current skills below to get personalized career insights and learning recommendations.</p>
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="w-full p-4 pr-24 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-white/80 backdrop-blur-sm transition-all duration-300 text-gray-700"
                placeholder="Enter a skill (e.g. JavaScript, Project Management, Communication)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                onClick={handleAddSkill}
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={customSkill.trim() === ''}
              >
                Add
              </button>
            </div>
          </div>

          {selectedRole && !loadingSkills && (
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Skills for {getRoleName(selectedRole)}</h3>
                  <p className="text-sm text-gray-600">Click skills you have to add them to your profile</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {industrySkills.map((skill) => {
                  const isSelected = userSkills.includes(skill.name);
                  const ImportanceColor = {
                    'critical': 'from-red-500 to-pink-500',
                    'important': 'from-orange-500 to-yellow-500', 
                    'nice-to-have': 'from-blue-500 to-indigo-500'
                  }[skill.importance] || 'from-gray-500 to-gray-600';
                  
                  return (
                    <button
                      key={skill.name}
                      onClick={() => handleSkillSelect(skill.name)}
                      className={`group relative p-4 rounded-xl border transition-all duration-300 text-left ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 shadow-lg transform scale-105'
                          : 'bg-white/80 border-gray-200 hover:border-indigo-300 hover:shadow-md hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
                          {skill.name}
                        </span>
                        {isSelected && (
                          <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{skill.description}</p>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${ImportanceColor} text-white`}>
                        {skill.importance}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <p className="text-sm text-indigo-700">
                  💡 <strong>Tip:</strong> Select the skills you currently have. The system will analyze your readiness and suggest areas for improvement.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleAnalyze}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg disabled:cursor-not-allowed flex items-center justify-center"
              disabled={!selectedIndustry || !selectedRole || userSkills.length === 0 || loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Your Skills...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  🚀 Analyze My Skills
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
              disabled={loading}
            >
              🔄 Start Over
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Skills Match Analysis</h3>
                </div>
                <div className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-xl shadow-lg ${
                  results.matchPercentage >= 70
                    ? 'bg-gradient-to-r from-emerald-400 to-green-400 text-white'
                    : results.matchPercentage >= 40
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                    : 'bg-gradient-to-r from-red-400 to-pink-400 text-white'
                }`}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {results.matchPercentage}% Match
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  🎆 Based on your current skills, you are <span className="font-bold text-blue-600">{results.matchPercentage}%</span> ready for the role of <span className="font-bold text-purple-600">{getRoleName(selectedRole)}</span> in <span className="font-bold text-indigo-600">{getIndustryName(selectedIndustry)}</span>.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>Career Readiness</span>
                  <span>{results.matchPercentage}%</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                      results.matchPercentage >= 70
                        ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                        : results.matchPercentage >= 40
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-gradient-to-r from-red-400 to-pink-500'
                    }`} 
                    style={{ width: `${results.matchPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Getting Started</span>
                  <span>Job Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-indigo-800">Your Matching Skills</h3>
              {results.matchingSkills.length > 0 ? (
                <ul className="space-y-2">
                  {results.matchingSkills.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span className="text-indigo-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-amber-600">
                  You don't have any skills that match this role yet.
                </p>
              )}

              {results.additionalSkills.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2 text-teal-700">Your Additional Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.additionalSkills.map((skill) => (
                      <span key={skill} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-indigo-800">Skills to Develop</h3>
              
              {results.missingSkills.critical.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-rose-700 mb-2">Critical Skills</h4>
                  <ul className="space-y-2">
                    {results.missingSkills.critical.map((skill) => (
                      <li key={skill.name} className="flex items-start bg-rose-50 p-2 rounded shadow-sm">
                        <span className="text-rose-600 mr-2 mt-1">•</span>
                        <div>
                          <div className="font-medium text-rose-800">{skill.name}</div>
                          <p className="text-sm text-rose-600">{skill.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.missingSkills.important.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-amber-700 mb-2">Important Skills</h4>
                  <ul className="space-y-2">
                    {results.missingSkills.important.map((skill) => (
                      <li key={skill.name} className="flex items-start bg-amber-50 p-2 rounded shadow-sm">
                        <span className="text-amber-600 mr-2 mt-1">•</span>
                        <div>
                          <div className="font-medium text-amber-800">{skill.name}</div>
                          <p className="text-sm text-amber-600">{skill.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.missingSkills.niceToHave.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Nice-to-Have Skills</h4>
                  <ul className="space-y-2">
                    {results.missingSkills.niceToHave.map((skill) => (
                      <li key={skill.name} className="flex items-start bg-blue-50 p-2 rounded shadow-sm">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <div>
                          <div className="font-medium text-blue-800">{skill.name}</div>
                          <p className="text-sm text-blue-600">{skill.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {Object.keys(results.learningPaths).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-indigo-800">Learning Resources</h3>
              <div className="bg-indigo-50 p-4 rounded shadow-sm border border-indigo-100">
                <p className="mb-4 text-indigo-700">Here are some resources to help you develop the skills you need:</p>
                
                <div className="space-y-4">
                  {Object.entries(results.learningPaths).slice(0, 3).map(([skill, resources]) => (
                    <div key={skill} className="border-t border-indigo-200 pt-3">
                      <h4 className="font-medium mb-2 text-indigo-700">{skill}</h4>
                      <ul className="space-y-2">
                        {resources.map((resource, index) => (
                          <li key={index} className="flex items-start bg-white p-2 rounded shadow-sm">
                            <span className="text-teal-600 mr-2">•</span>
                            <div>
                              <div className="font-medium text-indigo-800">{resource.title}</div>
                              <p className="text-sm text-purple-600">{resource.type} • {resource.duration}</p>
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                              >
                                Learn more →
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {Object.keys(results.learningPaths).length > 3 && (
                  <div className="mt-4 text-center">
                    <button 
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                      onClick={() => {
                        // This would expand to show all learning paths
                        // For now, it's just a placeholder
                      }}
                    >
                      Show more resources ({Object.keys(results.learningPaths).length - 3} more skills)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition duration-200"
            >
              Start Over
            </button>
            
            <Link
              href={`/salary-calculator?industry=${selectedIndustry}&role=${selectedRole}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Check Salary Range
            </Link>
            
            
            <Link
              href={`/jobs?skills=${results.matchingSkills.join(',')}`}
              className="px-4 py-2 border border-purple-500 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition duration-200"
            >
              Find Matching Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions (would be API calls in production)

// Get role options based on industry
function getRolesByIndustry(industry) {
  const roleMap = {
    'tech': [
      { value: 'software-developer', label: 'Software Developer' },
      { value: 'data-scientist', label: 'Data Scientist' },
      { value: 'ux-designer', label: 'UX Designer' },
      { value: 'cybersecurity-specialist', label: 'Cybersecurity Specialist' },
      { value: 'system-administrator', label: 'System Administrator' }
    ],
    'finance': [
      { value: 'financial-analyst', label: 'Financial Analyst' },
      { value: 'accountant', label: 'Accountant' },
      { value: 'investment-banker', label: 'Investment Banker' },
      { value: 'risk-manager', label: 'Risk Manager' },
      { value: 'financial-advisor', label: 'Financial Advisor' }
    ],
    'healthcare': [
      { value: 'healthcare-administrator', label: 'Healthcare Administrator' },
      { value: 'medical-records-specialist', label: 'Medical Records Specialist' },
      { value: 'public-health-specialist', label: 'Public Health Specialist' },
      { value: 'clinical-researcher', label: 'Clinical Researcher' },
      { value: 'health-information-manager', label: 'Health Information Manager' }
    ],
    'default': [
      { value: 'manager', label: 'Manager' },
      { value: 'specialist', label: 'Specialist' },
      { value: 'analyst', label: 'Analyst' },
      { value: 'coordinator', label: 'Coordinator' }
    ]
  };
  
  return roleMap[industry] || roleMap['default'];
}

// Get required skills for a role
function getSkillsByRole(industry, role) {
  // This would come from your API in production
  const skillsMap = {
    'tech': {
      'software-developer': [
        { name: 'JavaScript', importance: 'critical', description: 'Modern web development using JavaScript/TypeScript' },
        { name: 'Python', importance: 'important', description: 'Backend development and data processing' },
        { name: 'React', importance: 'important', description: 'Frontend development with React framework' },
        { name: 'SQL', importance: 'important', description: 'Database querying and management' },
        { name: 'Git', importance: 'critical', description: 'Version control and collaboration' },
        { name: 'Node.js', importance: 'important', description: 'Server-side JavaScript runtime' },
        { name: 'Cloud Services', importance: 'important', description: 'Working with AWS, Azure, or GCP' },
        { name: 'API Development', importance: 'critical', description: 'Building and consuming RESTful APIs' },
        { name: 'Problem Solving', importance: 'critical', description: 'Analytical thinking and debugging skills' },
        { name: 'Agile Methodology', importance: 'nice-to-have', description: 'Experience with Scrum or Kanban' }
      ],
      'data-scientist': [
        { name: 'Python', importance: 'critical', description: 'Primary programming language for data science' },
        { name: 'R', importance: 'nice-to-have', description: 'Statistical computing and graphics' },
        { name: 'SQL', importance: 'critical', description: 'Database querying and data extraction' },
        { name: 'Machine Learning', importance: 'critical', description: 'Implementing ML algorithms and models' },
        { name: 'Data Visualization', importance: 'important', description: 'Creating meaningful visual representations of data' },
        { name: 'Statistical Analysis', importance: 'critical', description: 'Applying statistical methods to datasets' },
        { name: 'Big Data Tools', importance: 'important', description: 'Experience with Hadoop, Spark, or similar' },
        { name: 'Data Cleaning', importance: 'critical', description: 'Preparing and cleaning data for analysis' },
        { name: 'Jupyter Notebooks', importance: 'important', description: 'Interactive computing environment' },
        { name: 'Deep Learning', importance: 'nice-to-have', description: 'Neural networks and advanced ML techniques' }
      ]
    },
    'finance': {
      'financial-analyst': [
        { name: 'Financial Modeling', importance: 'critical', description: 'Building financial models for analysis and forecasting' },
        { name: 'Excel Advanced', importance: 'critical', description: 'Advanced Excel skills including macros and pivot tables' },
        { name: 'Financial Statement Analysis', importance: 'critical', description: 'Analyzing income statements, balance sheets, etc.' },
        { name: 'Forecasting', importance: 'important', description: 'Creating business and financial projections' },
        { name: 'Business Acumen', importance: 'important', description: 'Understanding business concepts and market trends' },
        { name: 'Data Analysis', importance: 'important', description: 'Analyzing complex datasets for insights' },
        { name: 'Power BI or Tableau', importance: 'nice-to-have', description: 'Data visualization tools for reporting' },
        { name: 'Accounting Principles', importance: 'important', description: 'Understanding accounting fundamentals' },
        { name: 'Valuation Methods', importance: 'important', description: 'Company valuation techniques' },
        { name: 'Python', importance: 'nice-to-have', description: 'Programming for financial analysis automation' }
      ]
    }
  };
  
  // Default fallback if specific role/industry not found
  const defaultSkills = [
    { name: 'Communication', importance: 'critical', description: 'Clear written and verbal communication' },
    { name: 'Problem Solving', importance: 'critical', description: 'Analytical thinking and solution finding' },
    { name: 'Teamwork', importance: 'important', description: 'Collaborating effectively with others' },
    { name: 'Time Management', importance: 'important', description: 'Prioritizing tasks and meeting deadlines' },
    { name: 'Project Management', importance: 'nice-to-have', description: 'Planning, executing, and closing projects' },
    { name: 'Microsoft Office', importance: 'important', description: 'Proficiency with Word, Excel, PowerPoint' },
    { name: 'Adaptability', importance: 'important', description: 'Adjusting to new situations and challenges' },
    { name: 'Critical Thinking', importance: 'important', description: 'Objective analysis and evaluation' }
  ];
  
  return (skillsMap[industry]?.[role] || defaultSkills);
}

// Get learning resources for a skill
function getSkillLearningResources(skillName) {
  // In production, this would be an API call to get personalized resources
  const resources = {
    'JavaScript': [
      { title: 'Modern JavaScript for African Developers', type: 'Online Tutorial', duration: '8 weeks', url: '/learning-path/javascript' },
      { title: 'Interactive JavaScript Learning Path', type: 'Tutorial Series', duration: 'Self-paced', url: '/learning-path/javascript' },
      { title: 'JavaScript for Web Applications', type: 'Workshop', duration: '2 days', url: '/workshops/javascript-web-apps' }
    ],
    'Python': [
      { title: 'Python for Data Analysis', type: 'Tutorial Series', duration: '6 weeks', url: '/tutorials/python-data-analysis' },
      { title: 'Python Programming Fundamentals', type: 'Video Tutorial', duration: '10 hours', url: '/tutorials/python-fundamentals' },
      { title: 'Applied Python for Business', type: 'Certificate Program', duration: '3 months', url: '/certificates/python-business' }
    ],
    'Financial Modeling': [
      { title: 'Financial Modeling for African Markets', type: 'Tutorial Series', duration: '8 weeks', url: '/tutorials/financial-modeling-africa' },
      { title: 'Advanced Excel for Financial Analysis', type: 'Workshop', duration: '3 days', url: '/workshops/excel-financial-analysis' },
      { title: 'Building Robust Financial Models', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/robust-financial-models' }
    ],
    'SQL': [
      { title: 'SQL for Data Analysis', type: 'Tutorial Series', duration: '4 weeks', url: '/tutorials/sql-data-analysis' },
      { title: 'Database Management with SQL', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/sql-database' },
      { title: 'SQL in Business Intelligence', type: 'Workshop', duration: '2 days', url: '/workshops/sql-bi' }
    ],
    'Machine Learning': [
      { title: 'Introduction to Machine Learning', type: 'Tutorial Series', duration: '10 weeks', url: '/tutorials/intro-machine-learning' },
      { title: 'Applied ML for Business Problems', type: 'Workshop', duration: '5 days', url: '/workshops/applied-ml' },
      { title: 'ML Models for Prediction and Classification', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/ml-models' }
    ],
    'Communication': [
      { title: 'Professional Communication Skills', type: 'Tutorial Series', duration: '4 weeks', url: '/tutorials/professional-communication' },
      { title: 'Effective Business Writing', type: 'Workshop', duration: '2 days', url: '/workshops/business-writing' },
      { title: 'Presentation Skills for Professionals', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/presentation-skills' }
    ]
  };

  // Default resources if skill isn't in our database
  const defaultResources = [
    { title: `Introduction to ${skillName}`, type: 'Tutorial Series', duration: '6 weeks', url: '/tutorials/skill-introductions' },
    { title: `${skillName} for Professionals`, type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/professional-skills' },
    { title: `Applied ${skillName} Workshop`, type: 'Workshop', duration: '2 days', url: '/workshops/applied-skills' }
  ];

  return resources[skillName] || defaultResources;
}

// Get role name for display
function getRoleName(roleCode) {
  const roleNames = {
    'software-developer': 'Software Developer',
    'data-scientist': 'Data Scientist',
    'ux-designer': 'UX Designer',
    'financial-analyst': 'Financial Analyst',
    'accountant': 'Accountant'
    // Add more as needed
  };
  
  return roleNames[roleCode] || roleCode;
}

// Get industry name for display
function getIndustryName(industryCode) {
  const industryNames = {
    'tech': 'Technology & IT',
    'finance': 'Finance & Banking',
    'healthcare': 'Healthcare & Medical',
    'education': 'Education & Academia'
    // Add more as needed
  };
  
  return industryNames[industryCode] || industryCode;
}