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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Skills Gap Analyzer</h2>
      <p className="text-gray-600 mb-6">
        Identify which skills you need to develop for your target career path in the African job market.
      </p>

      {!results ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Select Your Target Industry:</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Select Your Target Role:</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={!selectedIndustry || loading || loadingSkills}
              >
                <option value="">
                  {loadingSkills 
                    ? 'Loading roles...' 
                    : selectedIndustry 
                      ? 'Select Role' 
                      : 'First select an industry'}
                </option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Your Skills:</label>
            {userSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {userSkills.map((skill) => (
                  <div 
                    key={skill} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No skills added yet. Add your skills below.</p>
            )}

            <div className="flex">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="flex-grow p-2 border rounded-l"
                placeholder="Add a skill (e.g. JavaScript, Project Management)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                onClick={handleAddSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                disabled={customSkill.trim() === ''}
              >
                Add
              </button>
            </div>
          </div>

          {selectedRole && !loadingSkills && (
            <div>
              <label className="block mb-2 font-medium">Common Skills for {getRoleName(selectedRole)}:</label>
              <div className="flex flex-wrap gap-2">
                {industrySkills.map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => handleSkillSelect(skill.name)}
                    className={`px-3 py-1 rounded-full border ${
                      userSkills.includes(skill.name)
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {skill.name}
                    {userSkills.includes(skill.name) && (
                      <span className="ml-1">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Click on skills you already have to add them to your profile.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAnalyze}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={!selectedIndustry || !selectedRole || userSkills.length === 0 || loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Skills Gap'}
            </button>
            <button
              onClick={handleReset}
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Skills Match Analysis</h3>
              <span className={`text-lg font-bold px-3 py-1 rounded ${
                results.matchPercentage >= 70
                  ? 'bg-green-100 text-green-800'
                  : results.matchPercentage >= 40
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {results.matchPercentage}% Match
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              Based on your current skills, you are <span className="font-medium">{results.matchPercentage}%</span> matched 
              to the role of <span className="font-medium">{getRoleName(selectedRole)}</span> in 
              <span className="font-medium"> {getIndustryName(selectedIndustry)}</span>.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  results.matchPercentage >= 70
                    ? 'bg-green-600'
                    : results.matchPercentage >= 40
                    ? 'bg-yellow-500'
                    : 'bg-red-600'
                }`} 
                style={{ width: `${results.matchPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Your Matching Skills</h3>
              {results.matchingSkills.length > 0 ? (
                <ul className="space-y-2">
                  {results.matchingSkills.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  You don't have any skills that match this role yet.
                </p>
              )}

              {results.additionalSkills.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Your Additional Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.additionalSkills.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Skills to Develop</h3>
              
              {results.missingSkills.critical.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-700 mb-2">Critical Skills</h4>
                  <ul className="space-y-2">
                    {results.missingSkills.critical.map((skill) => (
                      <li key={skill.name} className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">•</span>
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.missingSkills.important.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-yellow-700 mb-2">Important Skills</h4>
                  <ul className="space-y-2">
                    {results.missingSkills.important.map((skill) => (
                      <li key={skill.name} className="flex items-start">
                        <span className="text-yellow-600 mr-2 mt-1">•</span>
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <p className="text-sm text-gray-600">{skill.description}</p>
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
                      <li key={skill.name} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <p className="text-sm text-gray-600">{skill.description}</p>
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
              <h3 className="text-lg font-semibold mb-3">Learning Resources</h3>
              <div className="bg-blue-50 p-4 rounded">
                <p className="mb-4">Here are some resources to help you develop the skills you need:</p>
                
                <div className="space-y-4">
                  {Object.entries(results.learningPaths).slice(0, 3).map(([skill, resources]) => (
                    <div key={skill} className="border-t pt-3">
                      <h4 className="font-medium mb-2">{skill}</h4>
                      <ul className="space-y-2">
                        {resources.map((resource, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <p className="text-sm text-gray-600">{resource.type} • {resource.duration}</p>
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
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
                      className="text-blue-600 hover:underline"
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
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Start Over
            </button>
            
            <Link
              href={`/salary-calculator?industry=${selectedIndustry}&role=${selectedRole}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Check Salary Range
            </Link>
            
            <Link
              href="/courses"
              className="px-4 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
            >
              Find Training Courses
            </Link>
            
            <Link
              href={`/jobs?skills=${results.matchingSkills.join(',')}`}
              className="px-4 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
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
      { title: 'Modern JavaScript for African Developers', type: 'Online Course', duration: '8 weeks', url: '/courses/javascript-fundamentals' },
      { title: 'Interactive JavaScript Learning Path', type: 'Tutorial Series', duration: 'Self-paced', url: '/learning-path/javascript' },
      { title: 'JavaScript for Web Applications', type: 'Workshop', duration: '2 days', url: '/workshops/javascript-web-apps' }
    ],
    'Python': [
      { title: 'Python for Data Analysis', type: 'Online Course', duration: '6 weeks', url: '/courses/python-data-analysis' },
      { title: 'Python Programming Fundamentals', type: 'Video Tutorial', duration: '10 hours', url: '/tutorials/python-fundamentals' },
      { title: 'Applied Python for Business', type: 'Certificate Program', duration: '3 months', url: '/certificates/python-business' }
    ],
    'Financial Modeling': [
      { title: 'Financial Modeling for African Markets', type: 'Online Course', duration: '8 weeks', url: '/courses/financial-modeling-africa' },
      { title: 'Advanced Excel for Financial Analysis', type: 'Workshop', duration: '3 days', url: '/workshops/excel-financial-analysis' },
      { title: 'Building Robust Financial Models', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/robust-financial-models' }
    ],
    'SQL': [
      { title: 'SQL for Data Analysis', type: 'Online Course', duration: '4 weeks', url: '/courses/sql-data-analysis' },
      { title: 'Database Management with SQL', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/sql-database' },
      { title: 'SQL in Business Intelligence', type: 'Workshop', duration: '2 days', url: '/workshops/sql-bi' }
    ],
    'Machine Learning': [
      { title: 'Introduction to Machine Learning', type: 'Online Course', duration: '10 weeks', url: '/courses/intro-machine-learning' },
      { title: 'Applied ML for Business Problems', type: 'Workshop', duration: '5 days', url: '/workshops/applied-ml' },
      { title: 'ML Models for Prediction and Classification', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/ml-models' }
    ],
    'Communication': [
      { title: 'Professional Communication Skills', type: 'Online Course', duration: '4 weeks', url: '/courses/professional-communication' },
      { title: 'Effective Business Writing', type: 'Workshop', duration: '2 days', url: '/workshops/business-writing' },
      { title: 'Presentation Skills for Professionals', type: 'Tutorial Series', duration: 'Self-paced', url: '/tutorials/presentation-skills' }
    ]
  };

  // Default resources if skill isn't in our database
  const defaultResources = [
    { title: `Introduction to ${skillName}`, type: 'Online Course', duration: '6 weeks', url: '/courses/skill-introductions' },
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