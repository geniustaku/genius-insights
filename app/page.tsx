// app/page.js
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import FeaturedArticle from '@/components/FeaturedArticle';
import CategoryList from '@/components/CategoryList';

export const revalidate = 3600; // Revalidate this page every hour

export default async function Home() {
  const articles = await getArticles(6);
  const featuredArticle = articles[0]; // Use the first article as featured
  const recentArticles = articles.slice(1); // Rest of the articles
  
  return (
    <div className="space-y-16">
      {/* Hero Section - Elegant gradient with soft pattern */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern-grid.svg')] bg-[length:60px_60px]"></div>
        
        <div className="relative px-6 py-24 md:py-32 max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              Elevate Your <span className="text-indigo-600">South African</span> Career
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
              Expert guidance, salary insights, and industry trends tailored for South Africa's dynamic job market.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/categories/software-development" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-sm"
              >
                Software Development
              </Link>
              <Link 
                href="/categories/data-science" 
                className="bg-white text-indigo-600 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                Data Science
              </Link>
              <Link 
                href="/categories/cloud-computing" 
                className="bg-white text-indigo-600 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                Cloud Computing
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Article - Clean modern card */}
      {featuredArticle && (
        <section className="px-6 max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Featured Insight</h2>
            <div className="ml-4 h-px bg-gray-200 flex-grow"></div>
          </div>
          <FeaturedArticle article={featuredArticle} />
        </section>
      )}
      
      {/* Recent Articles - Clean grid with consistent spacing */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Latest Career Insights</h2>
            <div className="ml-4 h-px bg-gray-200 w-16 hidden md:block"></div>
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
          {recentArticles.map((article: unknown) => (
            <ArticleCard key={(article as any).id} article={article} />
          ))}
        </div>
      </section>
      
      {/* Categories Section - Clean and elegant */}
      <section className="px-6 py-16 bg-gray-50 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Explore Career Paths</h2>
            <p className="text-gray-600">Discover specialized guides for different tech career tracks</p>
          </div>
          <CategoryList />
        </div>
      </section>
      
      {/* Stats Section - Minimalist design */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-100 text-center shadow-sm">
            <p className="text-3xl font-bold text-indigo-600 mb-1">R48K</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Avg. Entry Salary</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100 text-center shadow-sm">
            <p className="text-3xl font-bold text-indigo-600 mb-1">12%</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Annual Growth</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100 text-center shadow-sm">
            <p className="text-3xl font-bold text-indigo-600 mb-1">5,000+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Tech Jobs</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100 text-center shadow-sm">
            <p className="text-3xl font-bold text-indigo-600 mb-1">3.5x</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Career Growth</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials - Clean cards */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">What Professionals Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How our insights have helped South African professionals advance their careers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  TM
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Thabo Mbeki</p>
                  <p className="text-xs text-gray-500">Senior Developer, Cape Town</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The salary insights helped me negotiate a 15% increase during my last job change. 
                Incredibly valuable resource for tech professionals in South Africa."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  NK
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Nomsa Khumalo</p>
                  <p className="text-xs text-gray-500">Data Scientist, Johannesburg</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "I've used the career roadmaps to plan my professional development. 
                The South African context makes it so much more relevant."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  JN
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">James Naidoo</p>
                  <p className="text-xs text-gray-500">Cloud Architect, Durban</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The certification guides saved me months of research. 
                I followed the AWS path and landed my dream role at a fintech company."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Elegant and clean */}
      <section className="px-6 py-20 bg-indigo-600 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Stay Ahead in Your Career Journey</h2>
          <p className="text-indigo-100 mb-8">
            Join thousands of South African professionals receiving our weekly insights and career opportunities.
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-sm"
                required
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-indigo-200 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>
      
      {/* Partners Section - Minimalist */}
      <section className="px-6 mb-16 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-indigo-600 text-sm uppercase tracking-wider font-medium">Trusted by leading companies</p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {['Standard Bank', 'Vodacom', 'Takealot', 'Discovery', 'Investec'].map((company) => (
            <div key={company} className="text-center text-gray-500 font-medium text-sm">
              {company}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}