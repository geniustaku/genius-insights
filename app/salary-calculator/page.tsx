// app/salary-calculator/page.tsx
import type { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';

export const metadata: Metadata = {
  title: 'African Salary Calculator | Compare Salaries Across Africa',
  description: 'Get accurate salary estimations based on your skills, experience, and location across Africa. Compare salary ranges for different roles and industries.',
  keywords: ['salary calculator', 'African salaries', 'tech salaries', 'South Africa salary', 'Nigeria salary', 'Kenya salary'],
  alternates: {
    canonical: '/salary-calculator',
  },
  openGraph: {
    title: 'African Salary Calculator | Compare Salaries Across Africa',
    description: 'Get accurate salary estimations based on your skills, experience, and location across Africa.',
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
};

export default function SalaryCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">African Salary Calculator</h1>
          <p className="text-gray-600">
            Get accurate salary estimations based on your industry, experience, education, and location across Africa.
            Our calculator uses the latest 2025 market data to provide you with reliable salary ranges.
          </p>
        </div>
        
        <SalaryCalculator />
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How Our Salary Calculator Works</h2>
          <p className="mb-4">
            Our calculator uses comprehensive data from multiple sources including industry surveys, 
            job postings, and direct employer information to provide accurate salary estimates for various 
            professions across African countries.
          </p>
          
          <h3 className="font-medium mt-6 mb-2">Factors Affecting Your Salary:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Location:</strong> Salaries vary significantly between different countries and cities based on local cost of living and market dynamics.</li>
            <li><strong>Industry:</strong> Different sectors offer varying compensation levels for similar roles.</li>
            <li><strong>Experience:</strong> More years of relevant experience typically leads to higher compensation.</li>
            <li><strong>Education:</strong> Advanced degrees and certifications can influence salary ranges.</li>
            <li><strong>Skills:</strong> In-demand technical and soft skills can significantly impact earning potential.</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded mt-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This calculator provides estimates based on market averages. 
              Individual salaries may vary based on specific company policies, performance, and other factors 
              not captured in this tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}