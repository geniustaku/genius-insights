// components/CareerAssessment.jsx
'use client'
import { useState } from 'react';
import Link from 'next/link';

// Updated with African market-focused questions and career paths
const questions = [
  {
    id: 1,
    text: "Which of these activities do you enjoy most?",
    options: [
      { id: 'a', text: "Analyzing data and solving complex problems", trait: "analytical" },
      { id: 'b', text: "Teaching and developing others' skills", trait: "teaching" },
      { id: 'c', text: "Creating innovative solutions and designs", trait: "creative" },
      { id: 'd', text: "Managing projects and coordinating teams", trait: "organizational" }
    ]
  },
  {
    id: 2,
    text: "When working on a project, you prefer to:",
    options: [
      { id: 'a', text: "Lead the discussion and make key decisions", trait: "leadership" },
      { id: 'b', text: "Research information and develop strategies", trait: "analytical" },
      { id: 'c', text: "Support team members and maintain harmony", trait: "supportive" },
      { id: 'd', text: "Focus on details and ensure quality delivery", trait: "detail-oriented" }
    ]
  },
  {
    id: 3,
    text: "Which work environment appeals to you most?",
    options: [
      { id: 'a', text: "Fast-paced corporate setting with growth opportunities", trait: "corporate" },
      { id: 'b', text: "Startup or entrepreneurial environment", trait: "entrepreneurial" },
      { id: 'c', text: "Public service or NGO focused on social impact", trait: "public-service" },
      { id: 'd', text: "Remote or flexible work arrangement", trait: "flexible" }
    ]
  },
  {
    id: 4,
    text: "What motivates you most in your career?",
    options: [
      { id: 'a', text: "Financial security and benefits", trait: "security" },
      { id: 'b', text: "Making a positive impact on society", trait: "impact" },
      { id: 'c', text: "Learning opportunities and skills development", trait: "growth" },
      { id: 'd', text: "Recognition and advancement", trait: "achievement" }
    ]
  },
  {
    id: 5,
    text: "Which of these African job market challenges concerns you most?",
    options: [
      { id: 'a', text: "Finding opportunities that match my qualifications", trait: "qualification-match" },
      { id: 'b', text: "Developing skills that are in high demand", trait: "skill-development" },
      { id: 'c', text: "Job security and stable income", trait: "stability" },
      { id: 'd', text: "Building a professional network", trait: "networking" }
    ]
  },
  {
    id: 6,
    text: "When facing a challenge at work, you typically:",
    options: [
      { id: 'a', text: "Research multiple solutions before acting", trait: "methodical" },
      { id: 'b', text: "Quickly adapt and find creative workarounds", trait: "adaptable" },
      { id: 'c', text: "Consult with colleagues or mentors", trait: "collaborative" },
      { id: 'd', text: "Follow established procedures and best practices", trait: "procedural" }
    ]
  },
  {
    id: 7,
    text: "Which skill would you most like to develop?",
    options: [
      { id: 'a', text: "Technical expertise in specific tools or systems", trait: "technical" },
      { id: 'b', text: "Communication and presentation skills", trait: "communication" },
      { id: 'c', text: "Strategic planning and business thinking", trait: "strategic" },
      { id: 'd', text: "Project management and coordination", trait: "management" }
    ]
  }
];

// Updated with African-relevant career matches
const careerMatches = {
  analytical: ['Data Analyst', 'Business Intelligence Specialist', 'Financial Analyst', 'Research Scientist'],
  technical: ['Software Developer', 'IT Specialist', 'Systems Engineer', 'Database Administrator'],
  creative: ['UX/UI Designer', 'Digital Marketing Specialist', 'Content Creator', 'Product Designer'],
  leadership: ['Project Manager', 'Team Lead', 'Operations Manager', 'Business Development Manager'],
  entrepreneurial: ['Startup Founder', 'Business Consultant', 'Franchise Owner', 'Independent Contractor'],
  impact: ['NGO Program Coordinator', 'Corporate Social Responsibility Manager', 'Public Health Specialist', 'Education Administrator'],
  security: ['Government Administrator', 'Corporate Accountant', 'Risk Manager', 'Compliance Officer'],
  growth: ['Technology Consultant', 'Digital Skills Trainer', 'Research Associate', 'Academic Professional'],
  communication: ['Public Relations Specialist', 'Sales Representative', 'Customer Success Manager', 'Human Resources Specialist'],
  organizational: ['Operations Coordinator', 'Administrative Manager', 'Supply Chain Specialist', 'Logistics Manager'],
  'skill-development': ['Technical Trainer', 'E-learning Specialist', 'Skills Development Facilitator', 'Instructional Designer'],
  networking: ['Business Development Representative', 'Community Manager', 'Industry Association Coordinator', 'Events Manager']
};

// African-specific industry growth data
const industryGrowthData = {
  tech: {
    growth: 'High',
    description: 'Technology is among the fastest-growing sectors across Africa, with fintech, healthtech, and e-commerce leading the expansion.',
    jobOpportunities: ['Software Development', 'Cybersecurity', 'Data Science', 'Cloud Infrastructure']
  },
  finance: {
    growth: 'High',
    description: 'Financial services continue to evolve with mobile banking and fintech innovations creating new career opportunities.',
    jobOpportunities: ['Digital Banking', 'Financial Analysis', 'Risk Management', 'Mobile Money Services']
  },
  healthcare: {
    growth: 'High',
    description: 'Healthcare remains critical with increasing investments in both public and private sectors across the continent.',
    jobOpportunities: ['Healthcare Administration', 'Medical Technology', 'Pharmaceutical Services', 'Public Health']
  },
  energy: {
    growth: 'High',
    description: 'Renewable energy is seeing significant growth, with solar and wind projects expanding rapidly.',
    jobOpportunities: ['Renewable Energy Specialist', 'Project Management', 'Energy Analysis', 'Sustainability Coordination']
  },
  education: {
    growth: 'Moderate',
    description: 'Education technology and skills development programs are creating new career paths in this traditionally stable sector.',
    jobOpportunities: ['E-learning Development', 'Educational Technology', 'Training & Development', 'Curriculum Design']
  },
  agriculture: {
    growth: 'Moderate',
    description: 'Agricultural technology and sustainable farming practices are transforming this vital sector across Africa.',
    jobOpportunities: ['Agritech Specialist', 'Supply Chain Management', 'Food Processing', 'Agricultural Research']
  },
  retail: {
    growth: 'Moderate',
    description: 'E-commerce and digital retail solutions are changing the landscape of retail across the continent.',
    jobOpportunities: ['E-commerce Management', 'Supply Chain Logistics', 'Digital Marketing', 'Customer Experience']
  },
  telecom: {
    growth: 'Moderate',
    description: 'Telecommunications continues to expand infrastructure and services across urban and rural areas.',
    jobOpportunities: ['Network Engineering', 'Telecommunications Sales', 'Service Development', 'Infrastructure Management']
  }
};

// African education requirements by career field
const educationRequirements = {
  'Software Developer': ['Computer Science Degree', 'Software Engineering Certificate', 'Web Development Bootcamp'],
  'Data Analyst': ['Statistics Degree', 'Data Science Certificate', 'Business Intelligence Training'],
  'Project Manager': ['Business Administration Degree', 'Project Management Professional (PMP)', 'PRINCE2 Certification'],
  'Financial Analyst': ['Finance or Accounting Degree', 'Chartered Financial Analyst (CFA)', 'Financial Modeling Certification'],
  'Digital Marketing Specialist': ['Marketing Degree', 'Digital Marketing Certification', 'Social Media Management Training'],
  'Operations Manager': ['Business Management Degree', 'Operations Management Certificate', 'Supply Chain Management Training'],
  'NGO Program Coordinator': ['Development Studies Degree', 'Project Management Training', 'Monitoring & Evaluation Certification']
};

export default function CareerAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('south-africa');
  
  const handleAnswer = (questionId, optionTrait) => {
    const newAnswers = { ...answers, [questionId]: optionTrait };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show loading indicator
      setLoading(true);
      
      // Simulate API call with a timeout
      setTimeout(() => {
        calculateResults(newAnswers);
        setLoading(false);
      }, 1500);
    }
  };
  
  const calculateResults = (answersData) => {
    // Calculate trait frequencies
    const traitCount = {};
    
    Object.values(answersData).forEach(trait => {
      traitCount[trait] = (traitCount[trait] || 0) + 1;
    });
    
    // Find top 3 dominant traits
    const sortedTraits = Object.entries(traitCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(item => item[0]);
    
    // Get career matches
    const allMatches = [];
    sortedTraits.forEach(trait => {
      if (careerMatches[trait]) {
        allMatches.push(...careerMatches[trait]);
      }
    });
    
    // Remove duplicates and get top 5
    const uniqueMatches = [...new Set(allMatches)].slice(0, 5);
    
    // Determine recommended industries based on career matches
    const recommendedIndustries = determineIndustries(uniqueMatches);
    
    // Get education paths for top careers
    const topCareerEducation = {};
    uniqueMatches.slice(0, 3).forEach(career => {
      topCareerEducation[career] = educationRequirements[career] || 
        ['Relevant Bachelor\'s Degree', 'Professional Certification', 'Specialized Training'];
    });
    
    setResult({
      traits: sortedTraits,
      careers: uniqueMatches,
      industries: recommendedIndustries,
      education: topCareerEducation
    });
  };
  
  const determineIndustries = (careers) => {
    // Map careers to likely industries
    const industryMap = {
      'Software Developer': 'tech',
      'IT Specialist': 'tech',
      'Systems Engineer': 'tech',
      'Data Analyst': 'tech',
      'Database Administrator': 'tech',
      'Financial Analyst': 'finance',
      'Business Intelligence Specialist': 'finance',
      'Risk Manager': 'finance',
      'Corporate Accountant': 'finance',
      'UX/UI Designer': 'tech',
      'Digital Marketing Specialist': 'retail',
      'Sales Representative': 'retail',
      'Operations Manager': 'manufacturing',
      'Supply Chain Specialist': 'agriculture',
      'NGO Program Coordinator': 'education',
      'Public Health Specialist': 'healthcare',
      'Education Administrator': 'education'
    };
    
    // Count industry occurrences
    const industryCount = {};
    careers.forEach(career => {
      const industry = industryMap[career] || 'tech'; // Default to tech
      industryCount[industry] = (industryCount[industry] || 0) + 1;
    });
    
    // Get top 3 industries
    return Object.entries(industryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(item => item[0]);
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };
  
  const africanCountries = [
    { code: 'south-africa', name: 'South Africa' },
    { code: 'nigeria', name: 'Nigeria' },
    { code: 'kenya', name: 'Kenya' },
    { code: 'ghana', name: 'Ghana' },
    { code: 'egypt', name: 'Egypt' },
    { code: 'tanzania', name: 'Tanzania' },
    { code: 'ethiopia', name: 'Ethiopia' },
    { code: 'uganda', name: 'Uganda' },
    { code: 'morocco', name: 'Morocco' },
    { code: 'rwanda', name: 'Rwanda' }
  ];
  
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Analyzing Your Responses</h2>
        <div className="flex justify-center items-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
        <p className="text-gray-600">
          We're matching your profile with in-demand careers across Africa...
        </p>
      </div>
    );
  }
  
  if (result) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Career Assessment Results</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Top Traits:</h3>
          <div className="flex flex-wrap gap-2">
            {result.traits.map(trait => (
              <span key={trait} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                {trait.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Recommended Career Paths:</h3>
          <ul className="space-y-3">
            {result.careers.map((career, index) => (
              <li key={index} className="flex items-start">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{career}</p>
                  {index < 3 && (
                    <div className="mt-1 text-sm text-gray-600">
                      <p className="font-medium">Education Path:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        {result.education[career]?.map((edu, i) => (
                          <li key={i}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6 bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Industry Insights:</h3>
          {result.industries.map((industry, index) => {
            const data = industryGrowthData[industry];
            if (!data) return null;
            
            return (
              <div key={industry} className={`${index > 0 ? 'mt-4 pt-4 border-t' : ''}`}>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-blue-800 capitalize">{industry}</h4>
                  <span className={`px-2 py-0.5 rounded text-sm font-medium ${
                    data.growth === 'High' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {data.growth} Growth
                  </span>
                </div>
                <p className="text-sm mt-1">{data.description}</p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Top Opportunities:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.jobOpportunities.map((job, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Next Steps:</h3>
          <div className="bg-gray-50 p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Complete Your Profile</h4>
                <p className="text-sm text-gray-600 mt-1">Add skills and experience to get personalized job matches.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Explore Detailed Salary Data</h4>
                <p className="text-sm text-gray-600 mt-1">Research compensation for your recommended roles.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Check Education Requirements</h4>
                <p className="text-sm text-gray-600 mt-1">Find courses and certifications to build your skills.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Browse Available Jobs</h4>
                <p className="text-sm text-gray-600 mt-1">Find opportunities matching your career path.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button 
            onClick={resetQuiz}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex-1"
          >
            Retake Assessment
          </button>
          
          <Link 
            href={`/salary-calculator?industry=${result.industries[0] || 'tech'}&country=${selectedCountry}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center flex-1"
          >
            Explore Salary Data
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h3 className="text-center text-lg font-semibold mb-2">Share Your Results</h3>
          <div className="flex justify-center gap-4">
            <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </button>
            <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M18.366 8.624L4.75 14.129c-.929.373-.928 1.34-.009 1.712l3.246 1.308 1.871 6.002c.131.421.445.771.854.882.55.149 1.113-.095 1.272-.525l1.993-5.381 5.14 2.104c.581.238 1.239-.057 1.389-.639l2.869-11.115c.271-1.053-.754-1.93-1.813-1.589l-3.196 1.136zm-1.537 2.609l-5.97 5.537c-.128.118-.288.171-.442.155-.104-.011-1.177-.248-1.177-.248l.84-2.738 6.749-2.706z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">African Career Assessment</h2>
      <p className="text-gray-600 mb-6">Discover career paths aligned with your skills and the African job market.</p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {africanCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">Question {currentQuestion + 1} of {questions.length}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-medium mb-4">{questions[currentQuestion].text}</h3>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(questions[currentQuestion].id, option.trait)}
              className="w-full text-left p-3 border rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}