// app/skills-analyzer/page.tsx
import type { Metadata } from 'next';
import SkillsAnalyzer from '@/components/SkillsAnalyzer';

export const metadata: Metadata = {
  title: 'Skills Gap Analyzer | Boost Your African Career',
  description: 'Identify skill gaps and get personalized recommendations to boost your employability in the African job market with our skills analyzer tool.',
  keywords: ['skills gap', 'skills analyzer', 'career skills', 'tech skills', 'professional development', 'African job market'],
  alternates: {
    canonical: '/skills-analyzer',
  },
  openGraph: {
    title: 'Skills Gap Analyzer | Boost Your African Career',
    description: 'Identify skill gaps and get personalized recommendations to boost your employability in the African job market.',
    url: '/skills-analyzer',
    type: 'website',
    images: [
      {
        url: '/images/skills-analyzer-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Skills Gap Analyzer',
      },
    ],
  },
};

export default function SkillsAnalyzerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Skills Gap Analyzer</h1>
          <p className="text-gray-600">
            Identify which skills you need to develop for your target career path in the African job market.
            Get personalized recommendations for courses, resources, and learning paths to close your skills gap.
          </p>
        </div>
        
        <SkillsAnalyzer />
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How to Use Your Skills Analysis</h2>
          <p className="mb-4">
            Our skills analyzer compares your current skillset with the requirements of your target role
            in the African job market. Here's how to make the most of your results:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Focus on Critical Skills First</h3>
              <p className="text-gray-700 text-sm">
                Prioritize learning the critical skills identified in your gap analysis. These are the
                non-negotiable skills that most employers look for in candidates for your target role.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Leverage Your Strengths</h3>
              <p className="text-gray-700 text-sm">
                Pay attention to your matching and additional skills. These are your competitive advantages
                that you should highlight in your CV and interviews.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Create a Learning Plan</h3>
              <p className="text-gray-700 text-sm">
                Use the recommended learning resources to create a structured learning plan. Consider setting
                specific timeframes for acquiring each skill.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Track Your Progress</h3>
              <p className="text-gray-700 text-sm">
                Return to the Skills Analyzer regularly to update your skills and track your progress
                toward your target career profile.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded mt-6">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Many employers in Africa now value practical skills and portfolios over formal
              qualifications. Consider creating projects that demonstrate your new skills as you acquire them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}