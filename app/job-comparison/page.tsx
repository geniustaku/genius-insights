// app/job-comparison/page.tsx
import type { Metadata } from 'next';
import JobComparisonTool from '@/components/JobComparisonTool';

export const metadata: Metadata = {
  title: 'Free Salary Comparison Tool | Compare Jobs SA',
  description: 'Compare salaries, career growth and work-life balance across jobs in South Africa. Free job comparison tool with real salary data. No sign up required.',
  keywords: ['salary comparison south africa', 'job comparison tool', 'compare salaries SA', 'career comparison tool free', 'salary calculator south africa', 'compare career paths', 'job salary data south africa', 'work life balance comparison', 'career growth comparison', 'best paying jobs south africa', 'salary benchmark tool', 'compare jobs free online', 'south africa salary guide', 'job market comparison africa'],
  alternates: {
    canonical: '/job-comparison',
  },
  openGraph: {
    title: 'Free Salary & Job Comparison Tool | South Africa',
    description: 'Compare salaries, career growth and work-life balance across jobs in South Africa. Free tool with real data, no sign up needed.',
    url: '/job-comparison',
    type: 'website',
    images: [
      {
        url: '/images/job-comparison-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Salary and Job Comparison Tool South Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Job Salaries in South Africa | Free Tool',
    description: 'Compare salaries, growth potential and work-life balance for different careers in SA. Free, no sign up.',
    images: ['/images/job-comparison-og.jpg'],
  },
};

export default function JobComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Free Salary &amp; Job Comparison Tool</h1>
          <p className="text-gray-600">
            Compare salaries, career growth and work-life balance across different jobs in South Africa and Africa.
            Make data-driven career decisions with real salary data. Free to use, no sign up required.
          </p>
        </div>
        
        <JobComparisonTool />
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How to Compare Salaries and Career Paths</h2>
          <p className="mb-6">
            When comparing different career paths, it's important to consider multiple factors beyond just salary.
            Our comparison tool provides insights into various dimensions of different jobs to help you make a holistic decision.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Salary</h3>
              <p className="text-gray-700 text-sm">
                We provide current salary ranges based on actual job postings and survey data across different African countries.
                Salaries are adjusted for local currency and cost of living.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Work-Life Balance</h3>
              <p className="text-gray-700 text-sm">
                This metric considers typical working hours, flexibility, remote work opportunities, and overall stress levels
                associated with different roles and industries.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Growth Potential</h3>
              <p className="text-gray-700 text-sm">
                We analyze career advancement opportunities, salary growth over time, and the potential for skill development
                and professional growth in each role.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Job Security</h3>
              <p className="text-gray-700 text-sm">
                This considers market demand stability, industry outlook, and the risk of job displacement due to
                automation or other market factors in the African context.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Market Demand</h3>
              <p className="text-gray-700 text-sm">
                Our analysis of current and projected job openings across different African markets helps you
                understand which roles are most in-demand.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-indigo-700">Required Skills</h3>
              <p className="text-gray-700 text-sm">
                We outline the core skills and qualifications needed for each role, with particular attention
                to which skills are most valued in the African market.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded mt-6">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> When comparing jobs, consider which factors matter most to you personally.
              The "best" career path varies depending on your individual values, priorities, and life circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}