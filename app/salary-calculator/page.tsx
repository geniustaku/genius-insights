import type { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';

export const metadata: Metadata = {
  title: 'African Salary Calculator 2025 | Compare Salaries Across African Countries',
  description: 'Get accurate salary estimations based on your skills, experience, and location across Africa. Compare salary ranges for different roles and industries with our updated 2025 data.',
  keywords: [
    'salary calculator', 'African salaries', 'tech salaries', 'South Africa salary', 
    'Nigeria salary', 'Kenya salary', 'salary comparison', 'Africa job market', 
    'salary estimator', 'professional compensation', 'industry salaries Africa',
    '2025 salary data', 'African job compensation', 'Egypt salary', 'Ghana salary'
  ],
  alternates: {
    canonical: '/salary-calculator',
  },
  openGraph: {
    title: 'African Salary Calculator 2025 | Compare Salaries Across African Countries',
    description: 'Get accurate salary estimations based on your skills, experience, and location across Africa with up-to-date 2025 market data.',
    url: '/salary-calculator',
    type: 'website',
    images: [
      {
        url: '/images/salary-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'African Salary Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'African Salary Calculator 2025',
    description: 'Compare accurate salary ranges across African countries',
    images: ['/images/salary-calculator-og.jpg'],
  },
};

export default function SalaryCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">African Salary Calculator</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-blue-900 mb-4">
            Get accurate salary estimations based on your industry, experience, education, and location across Africa.
            Our calculator uses the latest 2025 market data to provide you with reliable salary ranges.
          </p>
        </div>
      </div>

      <SalaryCalculator />

      <div className="mt-16 bg-blue-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">How Our Salary Calculator Works</h2>
        <p className="text-blue-900 mb-6">
          Our calculator uses comprehensive data from multiple sources including industry surveys,
          job postings, and direct employer information to provide accurate salary estimates for various
          professions across African countries.
        </p>
        
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Factors Affecting Your Salary:</h3>
        <ul className="space-y-3 text-blue-900">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <strong>Location:</strong> Salaries vary significantly between different countries and cities based on local cost of living and market dynamics.
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <strong>Industry:</strong> Different sectors offer varying compensation levels for similar roles.
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <strong>Experience:</strong> More years of relevant experience typically leads to higher compensation.
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <strong>Education:</strong> Advanced degrees and certifications can influence salary ranges.
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <strong>Skills:</strong> In-demand technical and soft skills can significantly impact earning potential.
          </li>
        </ul>
        
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-blue-900">
            <strong>Note:</strong> This calculator provides estimates based on market averages.
            Individual salaries may vary based on specific company policies, performance, and other factors
            not captured in this tool.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Stay Updated with Salary Trends</h2>
        <p className="text-blue-900 mb-6">
          Subscribe to our newsletter to receive the latest updates on salary trends across African markets.
        </p>
        <div className="max-w-md mx-auto">
          {/* Newsletter signup component would go here */}
        </div>
      </div>
    </div>
  );
}