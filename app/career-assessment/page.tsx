// app/career-assessment/page.tsx
import type { Metadata } from 'next';
import CareerAssessment from '@/components/CareerAssessment';

export const metadata: Metadata = {
  title: 'African Career Assessment | Find Your Ideal Career Path',
  description: 'Discover your ideal career path based on your strengths, interests, and African market demands with our personalized career assessment tool.',
  keywords: ['career assessment', 'career quiz', 'career test', 'African careers', 'South Africa careers', 'career guidance'],
  alternates: {
    canonical: '/career-assessment',
  },
  openGraph: {
    title: 'African Career Assessment | Find Your Ideal Career Path',
    description: 'Discover your ideal career path based on your strengths, interests, and African market demands.',
    url: '/career-assessment',
    type: 'website',
    images: [
      {
        url: '/images/career-assessment-og.jpg',
        width: 1200,
        height: 630,
        alt: 'African Career Assessment',
      },
    ],
  },
};

export default function CareerAssessmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">African Career Assessment</h1>
          <p className="text-gray-600">
            Discover your ideal career path based on your personality, preferences, and strengths.
            Our assessment is specifically tailored to the African job market, helping you identify careers with the best opportunities.
          </p>
        </div>
        
        <CareerAssessment />
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About Our Career Assessment</h2>
          <p className="mb-4">
            Our career assessment tool uses a sophisticated algorithm that considers your personal preferences,
            strengths, and interests while matching them with current African job market demands and trends.
          </p>
          
          <h3 className="font-medium mt-6 mb-2">How We Develop Our Recommendations:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Personality traits:</strong> We assess how your personality aligns with different career environments.</li>
            <li><strong>Market demand:</strong> We consider which careers are growing and in-demand across African markets.</li>
            <li><strong>Skills alignment:</strong> We match your natural aptitudes with skills needed in various professions.</li>
            <li><strong>Work preferences:</strong> We account for your preferred work style, environment, and values.</li>
            <li><strong>Educational pathways:</strong> We provide information about education and training needed for recommended careers.</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded mt-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This assessment is meant to guide your career exploration, not to limit your options.
              We encourage you to use these results as a starting point for further research and consideration of your career path.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}