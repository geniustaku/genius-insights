import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import FeaturedArticle from '@/components/FeaturedArticle';
import CategoryList from '@/components/CategoryList';
import { htmlToText } from 'html-to-text';
import NewsletterSignup from '@/components/NewsletterSignup';
import JobMarketHighlights from '../components/JobMarketHighlights';

export const revalidate = 3600; // Revalidate this page every hour

function stripHtml(html: string) {
  return htmlToText(html, {
    wordwrap: 130,
  });
}

export default async function Home() {
  const articles = await getArticles(6);
  const featuredArticle = articles[0]; // Use the first article as featured
  const recentArticles = articles.slice(1); // Rest of the articles

  // Sanitize the excerpt content
  const sanitizedFeaturedExcerpt = featuredArticle ? stripHtml(featuredArticle.excerpt) : '';
  const sanitizedRecentArticles = recentArticles.map(article => ({
    ...article,
    excerpt: stripHtml(article.excerpt),
  }));

  return (
    <div className="space-y-16">
      {/* Hero Section - Enhanced with career tools */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern-grid.svg')] bg-[length:60px_60px]"></div>
        
        <div className="relative px-6 py-24 md:py-32 max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 leading-tight">
              Elevate Your <span className="text-indigo-600">African</span> Career
            </h1>
            <p className="text-lg md:text-xl mb-10 text-indigo-800 max-w-3xl mx-auto">
              Expert guidance, salary insights, and industry trends tailored for Africa's dynamic job markets.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/salary-calculator" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-sm"
              >
                Salary Calculator
              </Link>
              <Link 
                href="/career-assessment" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 shadow-sm"
              >
                Career Assessment
              </Link>
              <Link 
                href="/skills-analyzer" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-sm"
              >
                Skills Analyzer
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Career Tools Highlights - New section */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-6 rounded-xl">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Salary Calculator</h3>
            <p className="text-blue-800 text-sm mb-4">
              Get accurate salary estimations based on your skills, experience, and location across Africa.
            </p>
            <Link 
              href="/salary-calculator" 
              className="text-indigo-800 text-sm font-medium flex items-center hover:text-indigo-600"
            >
              Calculate Your Worth
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-xl">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-green-900">Career Assessment</h3>
            <p className="text-green-800 text-sm mb-4">
              Discover your ideal career path based on your strengths, interests, and African market demands.
            </p>
            <Link 
              href="/career-assessment" 
              className="text-emerald-800 text-sm font-medium flex items-center hover:text-emerald-600"
            >
              Find Your Path
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-6 rounded-xl">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-orange-900">Skills Analyzer</h3>
            <p className="text-orange-800 text-sm mb-4">
              Identify skill gaps and get personalized recommendations to boost your employability.
            </p>
            <Link 
              href="/skills-analyzer" 
              className="text-orange-800 text-sm font-medium flex items-center hover:text-orange-600"
            >
              Analyze Your Skills
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Article - Clean modern card */}
      {featuredArticle && (
        <section className="px-6 max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-semibold text-indigo-900">Featured Insight</h2>
            <div className="ml-4 h-px bg-indigo-200 flex-grow"></div>
          </div>
          <FeaturedArticle article={{ ...featuredArticle, excerpt: sanitizedFeaturedExcerpt }} />
        </section>
      )}
      
      {/* Recent Articles - Clean grid with consistent spacing */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-indigo-900">Latest Career Insights</h2>
            <div className="ml-4 h-px bg-indigo-200 w-16 hidden md:block"></div>
          </div>
          <Link 
            href="/articles" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-300"
          >
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sanitizedRecentArticles.map((article: unknown) => (
            <ArticleCard key={(article as any).id} article={article} />
          ))}
        </div>
      </section>
      
      {/* Job Market Insights - New section */}
      <section className="px-6 py-16 bg-indigo-200 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-2">African Job Market Insights</h2>
            <p className="text-indigo-800">Explore current trends, in-demand skills, and salary data across Africa</p>
          </div>
          
          <JobMarketHighlights />
          
          <div className="mt-8 text-center">
            <Link 
              href="/job-comparison" 
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-sm"
            >
              Compare Jobs & Salaries
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section - Clean and elegant */}
      <section className="px-6 py-16 bg-purple-100 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-purple-900 mb-2">Explore Career Paths</h2>
            <p className="text-purple-800">Discover specialized guides for different tech career tracks</p>
          </div>
          <CategoryList />
        </div>
      </section>
      
      {/* Newsletter Section - New section */}
      <section className="px-6 max-w-6xl mx-auto">
        <NewsletterSignup variant="default" />
      </section>
      
      {/* Stats Section - Colorful design with updated data */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-6 rounded-lg border border-blue-200 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600 mb-1">R48K</p>
            <p className="text-xs text-blue-800 uppercase tracking-wider">Avg. Entry Salary</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg border border-purple-200 text-center shadow-sm">
            <p className="text-3xl font-bold text-purple-600 mb-1">12%</p>
            <p className="text-xs text-purple-800 uppercase tracking-wider">Annual Growth</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg border border-green-200 text-center shadow-sm">
            <p className="text-3xl font-bold text-green-600 mb-1">5,000+</p>
            <p className="text-xs text-green-800 uppercase tracking-wider">Tech Jobs</p>
          </div>
          <div className="bg-amber-100 p-6 rounded-lg border border-amber-200 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600 mb-1">3.5x</p>
            <p className="text-xs text-amber-800 uppercase tracking-wider">Career Growth</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials - Colorful cards */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-2">What Professionals Say</h2>
            <p className="text-indigo-800 max-w-2xl mx-auto">
              How our insights have helped African professionals advance their careers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium">
                  TM
                </div>
                <div className="ml-4">
                  <p className="font-medium text-blue-900">Thabo Mbeki</p>
                  <p className="text-xs text-blue-700">Senior Developer, Cape Town</p>
                </div>
              </div>
              <p className="text-blue-800 text-sm">
                "The salary calculator helped me negotiate a 15% increase during my last job change. 
                Incredibly valuable resource for tech professionals in South Africa."
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-medium">
                  NK
                </div>
                <div className="ml-4">
                  <p className="font-medium text-purple-900">Nomsa Khumalo</p>
                  <p className="text-xs text-purple-700">Data Scientist, Johannesburg</p>
                </div>
              </div>
              <p className="text-purple-800 text-sm">
                "Thanks to the career assessment and market insights, I was able to successfully pivot into data science and land my dream job!"
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-medium">
                  ZN
                </div>
                <div className="ml-4">
                  <p className="font-medium text-green-900">Zanele Ndlovu</p>
                  <p className="text-xs text-green-700">Cloud Engineer, Durban</p>
                </div>
              </div>
              <p className="text-green-800 text-sm">
                "The skills analyzer gave me a better understanding of my worth in the market and helped me secure an amazing offer"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}