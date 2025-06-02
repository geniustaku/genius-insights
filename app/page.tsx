'use client'
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import FeaturedArticle from '@/components/FeaturedArticle';
import CategoryList from '@/components/CategoryList';
import { htmlToText } from 'html-to-text';
import NewsletterSignup from '@/components/NewsletterSignup';
import JobMarketHighlights from '../components/JobMarketHighlights';
import StructuredData from '@/components/StructuredData';
import { useEffect, useState } from 'react';

// Move metadata to layout.js or use Head component
function stripHtml(html: string) {
  return htmlToText(html, {
    wordwrap: 130,
  });
}

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<any>(null);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        if (response.ok) {
          const data = await response.json();
          const articlesList = Array.isArray(data) ? data : data.articles || [];
          setArticles(articlesList.slice(0, 6));
          setFeaturedArticle(articlesList[0] || null);
          setRecentArticles(articlesList.slice(1, 6));
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Don't show articles section if API fails
        setArticles([]);
        setFeaturedArticle(null);
        setRecentArticles([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticles();
  }, []);

  const sanitizedFeaturedExcerpt = featuredArticle ? stripHtml(featuredArticle.excerpt) : '';
  const sanitizedRecentArticles = recentArticles.map(article => ({
    ...article,
    excerpt: stripHtml(article.excerpt),
  }));

  const countries = [
    { name: 'South Africa', flag: '🇿🇦', tools: 12, featured: true },
    { name: 'Nigeria', flag: '🇳🇬', tools: 8, featured: true },
    { name: 'Kenya', flag: '🇰🇪', tools: 6, featured: true },
    { name: 'Ghana', flag: '🇬🇭', tools: 5, featured: true },
    { name: 'Egypt', flag: '🇪🇬', tools: 4, featured: false },
    { name: 'Morocco', flag: '🇲🇦', tools: 4, featured: false },
    { name: 'United Kingdom', flag: '🇬🇧', tools: 8, featured: true },
    { name: 'Canada', flag: '🇨🇦', tools: 7, featured: true },
    { name: 'Australia', flag: '🇦🇺', tools: 6, featured: false },
    { name: 'United States', flag: '🇺🇸', tools: 9, featured: true },
    { name: 'Germany', flag: '🇩🇪', tools: 5, featured: false },
    { name: 'France', flag: '🇫🇷', tools: 5, featured: false },
    { name: 'India', flag: '🇮🇳', tools: 7, featured: true },
    { name: 'Singapore', flag: '🇸🇬', tools: 6, featured: false },
    { name: 'UAE', flag: '🇦🇪', tools: 5, featured: false },
    { name: 'Brazil', flag: '🇧🇷', tools: 4, featured: false },
  ];

  const globalTools = [
    { 
      name: 'CV Builder', 
      icon: '📄', 
      link: '/cv-builder', 
      description: 'Professional resume maker with global templates',
      gradient: 'from-purple-500 to-pink-500',
      users: '500K+'
    },
    { 
      name: 'Salary Calculator', 
      icon: '💰', 
      link: '/salary-calculator', 
      description: 'Market insights for 20+ countries',
      gradient: 'from-green-500 to-emerald-500',
      users: '300K+'
    },
    { 
      name: 'Tax Calculator', 
      icon: '🧮', 
      link: '/south-africa-tax-calculator', 
      description: 'Country-specific tax calculations',
      gradient: 'from-blue-500 to-cyan-500',
      users: '250K+'
    },
    { 
      name: 'Loan Calculator', 
      icon: '🏠', 
      link: '/south-africa-loan-calculator', 
      description: 'Mortgage and loan planning tools',
      gradient: 'from-orange-500 to-red-500',
      users: '150K+'
    },
  ];

  return (
    <>
      <StructuredData type="homepage" />
      
      {/* Elegant Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Global Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm">
                <span className="text-purple-300 text-sm font-medium mr-2">🌍</span>
                <span className="text-white text-sm font-medium">Professional Tools for 20+ Countries</span>
                <span className="ml-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">750K+ Users</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-white mb-2">Your Global</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                  Career Toolkit
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Professional tools designed for the modern workforce. Build CVs, calculate taxes, plan finances, 
                and advance your career across multiple countries and regions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link 
                  href="/cv-builder" 
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center min-w-[200px] justify-center"
                >
                  <span className="text-xl mr-2">📄</span>
                  Build Free CV
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/salary-calculator" 
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center min-w-[200px] justify-center"
                >
                  <span className="text-xl mr-2">💰</span>
                  Check Salary
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Global Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {globalTools.map((tool, index) => (
                <Link 
                  key={index}
                  href={tool.link} 
                  className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 text-sm font-medium">{tool.users} users</span>
                    <svg className="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Country Selection Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Country
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access localized professional tools designed specifically for your region's market, 
              regulations, and career opportunities.
            </p>
          </div>

          {/* Featured Countries */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Destinations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {countries.filter(country => country.featured).map((country, index) => (
                <Link
                  key={index}
                  href={`/countries/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105 text-center"
                >
                  <div className="text-4xl mb-3">{country.flag}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{country.name}</h4>
                  <p className="text-sm text-gray-600">{country.tools} Professional Tools</p>
                  <div className="mt-3 inline-flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Explore Tools</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Countries */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">All Supported Countries</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {countries.map((country, index) => (
                <Link
                  key={index}
                  href={`/countries/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-white rounded-xl p-3 shadow hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                  title={`${country.name} - ${country.tools} tools`}
                >
                  <div className="text-2xl mb-1">{country.flag}</div>
                  <p className="text-xs font-medium text-gray-700 truncate">{country.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regional Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Regional Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized tools designed for different regions, compliance requirements, and market conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Africa */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Africa</h3>
              <p className="text-gray-600 mb-6">Comprehensive tools for the African job market with local compliance and currency support.</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  SARS Tax Compliance (SA)
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Multi-currency Support
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Local Salary Benchmarks
                </div>
              </div>
              <Link href="/africa" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                Explore Africa Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Europe */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <div className="text-4xl mb-4">🇪🇺</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Europe</h3>
              <p className="text-gray-600 mb-6">EU-compliant tools with GDPR privacy protection and regional tax calculations.</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  GDPR Compliant
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  EU Tax Systems
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Multi-language Support
                </div>
              </div>
              <Link href="/europe" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                Explore Europe Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Americas */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Americas</h3>
              <p className="text-gray-600 mb-6">Tools designed for North and South American markets with local regulations and standards.</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  US/Canada Tax Systems
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Regional Salary Data
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Industry Standards
                </div>
              </div>
              <Link href="/americas" className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
                Explore Americas Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Trusted Worldwide
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Join hundreds of thousands of professionals who trust our tools for their career and financial planning.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-purple-400 mb-2">750K+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">20+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-300">Professional Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      {!loading && featuredArticle && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Latest Career Insights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest career trends, salary insights, and professional development tips.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <FeaturedArticle 
                  article={{
                    ...featuredArticle,
                    excerpt: sanitizedFeaturedExcerpt
                  }} 
                />
              </div>
              <div className="space-y-6">
                {sanitizedRecentArticles.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/articles" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View All Articles
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Ahead of the Curve
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get weekly insights on salary trends, career opportunities, and professional development tips delivered to your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}