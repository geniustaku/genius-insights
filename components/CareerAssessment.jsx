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
    { code: 'south-africa', name: '🇿🇦 South Africa' },
    { code: 'nigeria', name: '🇳🇬 Nigeria' },
    { code: 'kenya', name: '🇰🇪 Kenya' },
    { code: 'ghana', name: '🇬🇭 Ghana' },
    { code: 'egypt', name: '🇪🇬 Egypt' },
    { code: 'morocco', name: '🇲🇦 Morocco' },
    { code: 'ethiopia', name: '🇪🇹 Ethiopia' },
    { code: 'tanzania', name: '🇹🇿 Tanzania' },
    { code: 'uganda', name: '🇺🇬 Uganda' },
    { code: 'rwanda', name: '🇷🇼 Rwanda' },
    { code: 'senegal', name: '🇸🇳 Senegal' },
    { code: 'ivory-coast', name: '🇨🇮 Côte d\'Ivoire' },
    { code: 'botswana', name: '🇧🇼 Botswana' },
    { code: 'mauritius', name: '🇲🇺 Mauritius' },
    { code: 'tunisia', name: '🇹🇳 Tunisia' },
    { code: 'zambia', name: '🇿🇲 Zambia' }
  ];
  
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-vibrant rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Analyzing Your Profile
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Our AI is processing your responses and matching them with thousands of career profiles across Africa...
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="space-y-4 max-w-sm mx-auto">
          {[
            "Processing personality traits",
            "Analyzing market trends", 
            "Matching career opportunities",
            "Generating recommendations"
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 text-left">
              <div className="w-6 h-6 bg-gradient-vibrant rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (result) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gradient-vibrant rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Your Career Assessment Results
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based on your responses, we've identified the most promising career paths that align with your personality and Africa's growing markets.
          </p>
        </div>

        {/* Personality Traits */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🧠</span>
            Your Dominant Traits
          </h3>
          <div className="flex flex-wrap gap-3">
            {result.traits.map((trait, index) => (
              <span 
                key={trait} 
                className={`px-6 py-3 rounded-2xl font-semibold text-white ${
                  index === 0 ? 'bg-gradient-vibrant text-lg' : 
                  index === 1 ? 'bg-gradient-elegant' : 'bg-gradient-fresh'
                }`}
              >
                {trait.replace('-', ' ').split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            ))}
          </div>
        </div>
        
        {/* Career Recommendations */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🚀</span>
            Your Top Career Matches
          </h3>
          <div className="grid gap-6">
            {result.careers.map((career, index) => (
              <div key={index} className="group hover-lift bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg ${
                      index === 0 ? 'bg-gradient-vibrant' :
                      index === 1 ? 'bg-gradient-elegant' :
                      index === 2 ? 'bg-gradient-fresh' :
                      'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{career}</h4>
                      {index < 3 && result.education[career] && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">📚 Education Path:</p>
                          <div className="flex flex-wrap gap-2">
                            {result.education[career]?.map((edu, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {edu}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Match Score</div>
                    <div className="text-2xl font-bold text-gray-900">{95 - (index * 8)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Industry Insights */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📊</span>
            Industry Growth Insights
          </h3>
          <div className="grid gap-6">
            {result.industries.map((industry, index) => {
              const data = industryGrowthData[industry];
              if (!data) return null;
              
              return (
                <div key={industry} className="group hover-lift bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-6 border border-gray-200 hover:border-green-300 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-gray-900 capitalize">{industry}</h4>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      data.growth === 'High' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {data.growth} Growth
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{data.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="mr-2">🚀</span>
                      Top Opportunities:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.jobOpportunities.map((job, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-green-200 rounded-full text-sm font-medium text-gray-700 hover:bg-green-50 transition-colors duration-200">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            Your Next Steps
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '👤', title: 'Complete Your Profile', desc: 'Add skills and experience to get personalized job matches', color: 'bg-blue-500' },
              { icon: '💰', title: 'Explore Salary Data', desc: 'Research compensation for your recommended roles', color: 'bg-green-500' },
              { icon: '📚', title: 'Education Planning', desc: 'Find certifications and learning paths to build your skills', color: 'bg-purple-500' },
              { icon: '🔍', title: 'Browse Jobs', desc: 'Find opportunities matching your career path', color: 'bg-orange-500' }
            ].map((step, index) => (
              <div key={index} className="group hover-lift bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center text-white text-xl`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={resetQuiz}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-900 py-4 px-8 rounded-2xl font-semibold hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>Retake Assessment</span>
          </button>
          
          <Link 
            href={`/salary-calculator?industry=${result.industries[0] || 'tech'}&country=${selectedCountry}`}
            className="flex-1 bg-gradient-vibrant text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>💰</span>
            <span>Explore Salary Data</span>
          </Link>
        </div>
        
        {/* Share Results */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 text-center">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">Share Your Results</h3>
          <p className="text-purple-700 mb-6">Inspire others with your career journey!</p>
          <div className="flex justify-center gap-4">
            {[
              { name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
              { name: 'Twitter', color: 'bg-blue-400 hover:bg-blue-500' },
              { name: 'WhatsApp', color: 'bg-green-600 hover:bg-green-700' },
              { name: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800' }
            ].map((social, index) => (
              <button key={index} className={`p-3 ${social.color} text-white rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover-lift">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-vibrant rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎯</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
          Career Assessment
        </h2>
        <p className="text-gray-600 text-lg">
          Answer a few questions to discover career paths that match your personality and Africa's opportunities
        </p>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          🌍 Select Your Country
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
        >
          {africanCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-purple-600">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-vibrant h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-display font-semibold text-gray-900 leading-relaxed">
          {questions[currentQuestion].text}
        </h3>
        
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(questions[currentQuestion].id, option.trait)}
              className="group w-full text-left p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gray-50 hover:bg-white transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-vibrant rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Optional: Previous button for better UX */}
      {currentQuestion > 0 && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-gray-500 hover:text-gray-700 font-medium flex items-center mx-auto transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Question
          </button>
        </div>
      )}
    </div>
  );
}