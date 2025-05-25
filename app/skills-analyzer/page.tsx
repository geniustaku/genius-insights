// app/skills-analyzer/page.tsx
import type { Metadata } from 'next';
import SkillsAnalyzer from '@/components/SkillsAnalyzer';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Free African Skills Analyzer 2025 | AI-Powered Career Skills Assessment',
  description: 'Discover your career strengths with our AI-powered skills analyzer. Get personalized recommendations, identify skill gaps, and find learning pathways for African job markets. Free assessment tool.',
  keywords: ['skills analyzer', 'career assessment', 'African jobs', 'skill gap analysis', 'professional development', 'AI career tool', 'tech skills', 'African job market'],
  alternates: {
    canonical: '/skills-analyzer',
  },
  openGraph: {
    title: 'Free African Skills Analyzer 2025 | AI-Powered Career Skills Assessment',
    description: 'Discover your career strengths with our AI-powered skills analyzer. Get personalized recommendations for African job markets.',
    url: '/skills-analyzer',
    type: 'website',
    images: [
      {
        url: '/images/skills-analyzer-og.jpg',
        width: 1200,
        height: 630,
        alt: 'African Skills Analyzer',
      },
    ],
  },
};

export default function SkillsAnalyzerPage() {
  return (
    <>
      <StructuredData type="skills-analyzer" />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Free African Skills Analyzer 2025
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover your career strengths with AI-powered analysis. Get personalized recommendations and identify skill gaps for African job markets.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-blue-100">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  AI-Powered Analysis
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized Recommendations
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  African Market Focus
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SkillsAnalyzer />
          
          {/* How to Use Section */}
          <div className="mt-16 glass-card p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                How to Use Your Skills Analysis
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our AI-powered skills analyzer compares your current skillset with market requirements for African careers. 
                Transform your career journey with these actionable insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Focus on Critical Skills First</h3>
                </div>
                <p className="text-gray-700">
                  Prioritize learning the critical skills identified in your gap analysis. These are the 
                  non-negotiable competencies that African employers actively seek in candidates.
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Leverage Your Strengths</h3>
                </div>
                <p className="text-gray-700">
                  Highlight your matching and additional skills as competitive advantages. These strengths 
                  should feature prominently in your CV, portfolio, and interview presentations.
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Create a Learning Plan</h3>
                </div>
                <p className="text-gray-700">
                  Transform recommendations into a structured learning journey. Set specific timeframes 
                  and milestones for acquiring each skill based on market demand and career urgency.
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Track Your Progress</h3>
                </div>
                <p className="text-gray-700">
                  Return regularly to reassess your skills and monitor career development. Track your 
                  progress toward your target professional profile with updated skill inventories.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Pro Tip for African Markets</h4>
                  <p className="text-blue-800">
                    African employers increasingly value practical skills and demonstrable portfolios over formal 
                    qualifications alone. Create projects and case studies that showcase your developing skills 
                    as you acquire them. This approach is particularly effective in tech, creative, and business sectors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}