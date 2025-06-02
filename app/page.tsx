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

  // Organized by regions for better global competitiveness
  const globalRegions = {
    americas: {
      name: 'Americas',
      icon: '🌎',
      countries: [
        { name: 'United States', flag: '🇺🇸', tools: 9, featured: true, category: 'Major Economy' },
        { name: 'Canada', flag: '🇨🇦', tools: 7, featured: true, category: 'Major Economy' },
        { name: 'Brazil', flag: '🇧🇷', tools: 6, featured: true, category: 'Emerging Market' },
        { name: 'Mexico', flag: '🇲🇽', tools: 5, featured: false, category: 'Emerging Market' },
      ]
    },
    europe: {
      name: 'Europe',
      icon: '🇪🇺', 
      countries: [
        { name: 'United Kingdom', flag: '🇬🇧', tools: 8, featured: true, category: 'Major Economy' },
        { name: 'Germany', flag: '🇩🇪', tools: 7, featured: true, category: 'Major Economy' },
        { name: 'France', flag: '🇫🇷', tools: 6, featured: true, category: 'Major Economy' },
        { name: 'Netherlands', flag: '🇳🇱', tools: 5, featured: false, category: 'Major Economy' },
        { name: 'Switzerland', flag: '🇨🇭', tools: 4, featured: false, category: 'Major Economy' },
      ]
    },
    asiaPacific: {
      name: 'Asia Pacific',
      icon: '🌏',
      countries: [
        { name: 'India', flag: '🇮🇳', tools: 8, featured: true, category: 'Major Economy' },
        { name: 'Singapore', flag: '🇸🇬', tools: 7, featured: true, category: 'Financial Hub' },
        { name: 'Australia', flag: '🇦🇺', tools: 6, featured: true, category: 'Major Economy' },
        { name: 'Japan', flag: '🇯🇵', tools: 5, featured: false, category: 'Major Economy' },
        { name: 'UAE', flag: '🇦🇪', tools: 6, featured: true, category: 'Financial Hub' },
      ]
    },
    africa: {
      name: 'Africa',
      icon: '🌍',
      countries: [
        { name: 'South Africa', flag: '🇿🇦', tools: 12, featured: true, category: 'Financial Hub' },
        { name: 'Nigeria', flag: '🇳🇬', tools: 8, featured: true, category: 'Emerging Market' },
        { name: 'Kenya', flag: '🇰🇪', tools: 6, featured: true, category: 'Emerging Market' },
        { name: 'Ghana', flag: '🇬🇭', tools: 5, featured: true, category: 'Emerging Market' },
        { name: 'Egypt', flag: '🇪🇬', tools: 4, featured: false, category: 'Emerging Market' },
        { name: 'Morocco', flag: '🇲🇦', tools: 4, featured: false, category: 'Emerging Market' },
      ]
    }
  };

  // Flatten for legacy compatibility
  const countries = Object.values(globalRegions).flatMap(region => region.countries);

  const globalTools = [
    { 
      name: 'CV Builder', 
      icon: '📄', 
      link: '/cv-builder', 
      description: 'ATS-optimized resumes for global markets',
      gradient: 'from-purple-500 to-pink-500',
      users: '750K+',
      badge: 'Most Popular'
    },
    { 
      name: 'Salary Calculator', 
      icon: '💰', 
      link: '/salary-calculator', 
      description: 'Real-time market data for 25+ countries',
      gradient: 'from-green-500 to-emerald-500',
      users: '500K+',
      badge: 'Updated Daily'
    },
    { 
      name: 'Tax Calculator', 
      icon: '🧮', 
      link: '/us-tax-calculator', 
      description: 'Accurate tax calculations worldwide',
      gradient: 'from-blue-500 to-cyan-500',
      users: '400K+',
      badge: '2025 Rates'
    },
    { 
      name: 'Investment Calculator', 
      icon: '📈', 
      link: '/south-africa-investment-calculator', 
      description: 'Plan your financial future globally',
      gradient: 'from-indigo-500 to-purple-500',
      users: '300K+',
      badge: 'New'
    },
    { 
      name: 'Loan Calculator', 
      icon: '🏠', 
      link: '/south-africa-loan-calculator', 
      description: 'Mortgage and loan planning tools',
      gradient: 'from-orange-500 to-red-500',
      users: '250K+',
      badge: 'Smart AI'
    },
    { 
      name: 'Career Assessment', 
      icon: '🎯', 
      link: '/career-assessment', 
      description: 'Discover your ideal career path',
      gradient: 'from-teal-500 to-cyan-500',
      users: '200K+',
      badge: 'AI Powered'
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
                <span className="text-white text-sm font-medium">Trusted by 1M+ Professionals Worldwide</span>
                <span className="ml-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">25+ Countries</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-white mb-2">Professional Tools for</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                  Global Careers
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Trusted by 1M+ professionals worldwide. Build CVs, calculate taxes, plan investments, 
                and advance your career in 25+ countries with enterprise-grade accuracy.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {globalTools.map((tool, index) => (
                <Link 
                  key={index}
                  href={tool.link} 
                  className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                >
                  {/* Badge */}
                  {tool.badge && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-gray-900 rounded-full">
                      {tool.badge}
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{tool.description}</p>
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

      {/* Global Markets Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Global Professional Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access specialized tools designed for major global markets, emerging economies, 
              and financial hubs worldwide.
            </p>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {Object.entries(globalRegions).map(([key, region]) => (
              <div key={key} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{region.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{region.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {region.countries.slice(0, 4).map((country, index) => {
                    // Map country names to actual calculator URLs
                    const getCalculatorUrl = (countryName: string) => {
                      const urlMap: { [key: string]: string } = {
                        'United States': '/us-tax-calculator',
                        'Canada': '/canada-tax-calculator', 
                        'Brazil': '/brazil-tax-calculator',
                        'United Kingdom': '/uk-tax-calculator',
                        'Germany': '/germany-tax-calculator',
                        'France': '/france-tax-calculator',
                        'India': '/india-tax-calculator',
                        'Singapore': '/singapore-tax-calculator',
                        'Australia': '/australia-tax-calculator',
                        'UAE': '/uae-tax-calculator',
                        'South Africa': '/south-africa-tax-calculator',
                        'Nigeria': '/nigeria-tax-calculator',
                        'Kenya': '/kenya-tax-calculator',
                        'Ghana': '/ghana-tax-calculator',
                        'Egypt': '/egypt-tax-calculator',
                        'Morocco': '/morocco-tax-calculator'
                      };
                      return urlMap[countryName] || `/${countryName.toLowerCase().replace(/\s+/g, '-')}-tax-calculator`;
                    };
                    
                    return (
                    <Link
                      key={index}
                      href={getCalculatorUrl(country.name)}
                      className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">{country.flag}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{country.name}</h4>
                          <p className="text-xs text-gray-600">{country.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 font-medium">{country.tools} Tools</span>
                        <svg className="w-3 h-3 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </Link>
                    );
                  })}
                </div>

                {/* View All Countries in Region */}
                <div className="mt-6 text-center">
                  <Link 
                    href={key === 'americas' ? '/americas-tools' : 
                          key === 'europe' ? '/europe-tools' : 
                          key === 'asiaPacific' ? '/asia-pacific-tools' : 
                          '/africa-tools'} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All {region.name} Tools
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Access Popular Countries */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Access</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {countries.filter(country => country.featured).map((country, index) => {
                // Map country names to actual calculator URLs
                const getCalculatorUrl = (countryName: string) => {
                  const urlMap: Record<string, string> = {
                    'United States': '/us-tax-calculator',
                    'Canada': '/canada-tax-calculator',
                    'Brazil': '/brazil-tax-calculator', 
                    'United Kingdom': '/uk-tax-calculator',
                    'Germany': '/germany-tax-calculator',
                    'France': '/france-tax-calculator',
                    'India': '/india-tax-calculator',
                    'Singapore': '/singapore-tax-calculator',
                    'Australia': '/australia-tax-calculator',
                    'UAE': '/uae-tax-calculator',
                    'South Africa': '/south-africa-tax-calculator',
                    'Nigeria': '/nigeria-tax-calculator',
                    'Kenya': '/kenya-tax-calculator',
                    'Ghana': '/ghana-tax-calculator'
                  };
                  return urlMap[countryName as keyof typeof urlMap] || `/${countryName.toLowerCase().replace(/\s+/g, '-')}-tax-calculator`;
                };
                
                return (
                <Link
                  key={index}
                  href={getCalculatorUrl(country.name)}
                  className="group bg-white rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900">{country.name}</h4>
                    <p className="text-sm text-gray-600">{country.tools} Tools Available</p>
                  </div>
                  <svg className="w-4 h-4 ml-3 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                );
              })}
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
              <Link href="/africa-tools" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
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
              <Link href="/europe-tools" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
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
              <Link href="/americas-tools" className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
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
              Leading Global Platform
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Trusted by over 1 million professionals across major global markets and emerging economies.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-purple-400 mb-2">1M+</div>
                <div className="text-gray-300">Global Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">75+</div>
                <div className="text-gray-300">Professional Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-2">15+</div>
                <div className="text-gray-300">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-red-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>

            {/* Global Recognition */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Industry Leading</h3>
                <p className="text-gray-300 text-sm">Recognized by major financial institutions and career platforms</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Enterprise Grade</h3>
                <p className="text-gray-300 text-sm">Bank-level security with GDPR and SOC 2 compliance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                <p className="text-gray-300 text-sm">Live data feeds from global markets and tax authorities</p>
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