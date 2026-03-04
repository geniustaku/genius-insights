// app/career-assessment/page.tsx
import type { Metadata } from 'next';
import CareerAssessment from '@/components/CareerAssessment';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Free Career Test South Africa | Personality Quiz',
  description: 'Take a free career assessment test to find your ideal career path. Personality test for career guidance in South Africa. No sign up, instant results with salary insights.',
  keywords: ['career test free', 'personality test career', 'career assessment south africa', 'career quiz free online', 'what career suits me', 'career aptitude test free', 'career guidance south africa', 'career personality quiz', 'career test no sign up', 'free career assessment online', 'career counseling south africa', 'job aptitude test', 'career change quiz', 'career finder test free', 'best career test south africa', 'career path assessment', 'skills assessment career'],
  alternates: {
    canonical: '/career-assessment',
  },
  openGraph: {
    title: 'Free Career Test & Personality Quiz | South Africa',
    description: 'Discover your ideal career with a free personality-based career assessment. Instant results, salary insights, no sign up required.',
    url: '/career-assessment',
    type: 'website',
    images: [
      {
        url: '/images/career-assessment-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Career Assessment Test - Find Your Ideal Career',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Career Test | Personality Quiz for Careers',
    description: 'Find your ideal career with a free personality-based career test. No sign up, instant results with salary data.',
    images: ['/images/career-assessment-og.jpg'],
  },
};

export default function CareerAssessmentPage() {
  return (
    <>
      <StructuredData type="career-assessment" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-vibrant rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block glass rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">🎯 AI-Powered Assessment</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Free Career Test &amp; <br/>
              <span className="text-gradient bg-gradient-to-r from-yellow-300 to-cyan-300 bg-clip-text text-transparent">Personality Career Quiz</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Discover your ideal career path with our free personality-based career assessment.
              No sign up required. Get instant results with salary insights for South Africa and Africa.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-white/80 text-sm">Assessments</div>
              </div>
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Accuracy</div>
              </div>
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm">Career Paths</div>
              </div>
              <div className="glass rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-bold text-white">7</div>
                <div className="text-white/80 text-sm">Minutes</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Assessment Section */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <CareerAssessment />
      </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                How Our Free Career Assessment Test Works
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our AI-powered algorithm analyzes your responses against thousands of successful 
                career profiles across Africa to provide you with the most accurate recommendations.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: '🧠', title: 'Personality Analysis', desc: 'Deep dive into your work style and preferences' },
                  { icon: '📊', title: 'Market Intelligence', desc: 'Real-time African job market demand analysis' },
                  { icon: '🎯', title: 'Skills Matching', desc: 'Align your strengths with in-demand roles' },
                  { icon: '🚀', title: 'Growth Potential', desc: 'Identify careers with best advancement opportunities' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-vibrant rounded-xl flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                What You'll Discover
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: 'Top 5 Career Matches', desc: 'Personalized career recommendations based on your profile', color: 'bg-blue-500' },
                  { title: 'Industry Growth Insights', desc: 'Market trends and opportunities across African sectors', color: 'bg-purple-500' },
                  { title: 'Education Pathways', desc: 'Specific certifications and learning paths to reach your goals', color: 'bg-green-500' },
                  { title: 'Salary Expectations', desc: 'Realistic compensation ranges for your target roles', color: 'bg-orange-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-3 h-3 ${item.color} rounded-full mt-2`}></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-purple-600 text-sm font-bold">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">AI-Powered Insights</h4>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      Our assessment uses machine learning trained on successful African professionals 
                      to provide recommendations that consider both your personal fit and market realities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}