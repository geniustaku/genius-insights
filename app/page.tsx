'use client';
import React, { JSX } from 'react';
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

export default function Home(): JSX.Element {
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

  // Organized by priority - premium markets first
  const globalRegions = {
    americas: {
      name: 'Americas',
      icon: '🌎',
      priority: 1,
      countries: [
        { name: 'United States', flag: '🇺🇸', tools: 12, featured: true, category: 'Major Economy', priority: 1 },
        { name: 'Canada', flag: '🇨🇦', tools: 7, featured: true, category: 'Premium Market', priority: 2 },
        { name: 'Brazil', flag: '🇧🇷', tools: 6, featured: true, category: 'Growing Market', priority: 3 },
        { name: 'Mexico', flag: '🇲🇽', tools: 5, featured: false, category: 'Emerging Market', priority: 4 },
        { name: 'Cuba', flag: '🇨🇺', tools: 2, featured: true, category: 'Niche Market', priority: 5 },
      ]
    },
    europe: {
      name: 'Europe',
      icon: '🇪🇺', 
      priority: 2,
      countries: [
        { name: 'Switzerland', flag: '🇨🇭', tools: 4, featured: true, category: 'Luxury Market', priority: 1 },
        { name: 'United Kingdom', flag: '🇬🇧', tools: 11, featured: true, category: 'Financial Hub', priority: 2 },
        { name: 'Netherlands', flag: '🇳🇱', tools: 5, featured: true, category: 'Financial Center', priority: 3 },
        { name: 'Germany', flag: '🇩🇪', tools: 7, featured: true, category: 'Major Economy', priority: 4 },
        { name: 'France', flag: '🇫🇷', tools: 6, featured: true, category: 'Premium Market', priority: 5 },
      ]
    },
    asiaPacific: {
      name: 'Asia Pacific',
      icon: '🌏',
      priority: 3,
      countries: [
        { name: 'Australia', flag: '🇦🇺', tools: 6, featured: true, category: 'Premium Market', priority: 1 },
        { name: 'Singapore', flag: '🇸🇬', tools: 7, featured: true, category: 'Financial Hub', priority: 2 },
        { name: 'UAE', flag: '🇦🇪', tools: 6, featured: true, category: 'Financial Center', priority: 3 },
        { name: 'Japan', flag: '🇯🇵', tools: 5, featured: true, category: 'Major Economy', priority: 4 },
        { name: 'India', flag: '🇮🇳', tools: 8, featured: true, category: 'Growing Market', priority: 5 },
        { name: 'Bangladesh', flag: '🇧🇩', tools: 2, featured: true, category: 'Emerging Market', priority: 6 },
      ]
    },
    africa: {
      name: 'Africa',
      icon: '🌍',
      priority: 4,
      countries: [
        { name: 'South Africa', flag: '🇿🇦', tools: 15, featured: true, category: 'Regional Leader', priority: 1 },
        { name: 'Nigeria', flag: '🇳🇬', tools: 8, featured: true, category: 'Major Economy', priority: 2 },
        { name: 'Kenya', flag: '🇰🇪', tools: 6, featured: true, category: 'Tech Hub', priority: 3 },
        { name: 'Ghana', flag: '🇬🇭', tools: 5, featured: true, category: 'Growing Market', priority: 4 },
        { name: 'Egypt', flag: '🇪🇬', tools: 4, featured: true, category: 'Regional Power', priority: 5 },
        { name: 'Morocco', flag: '🇲🇦', tools: 4, featured: true, category: 'Gateway Market', priority: 6 },
        { name: 'Ethiopia', flag: '🇪🇹', tools: 2, featured: true, category: 'Emerging Market', priority: 7 },
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
      name: 'USA Tax Calculator', 
      icon: '🇺🇸', 
      link: '/us-tax-calculator', 
      description: 'Complete US tax calculations with latest rates',
      gradient: 'from-blue-600 to-red-600',
      users: '500K+',
      badge: 'Premium'
    },
    { 
      name: 'Germany Legal Services', 
      icon: '🇩🇪', 
      link: '/germany-legal-services-calculator', 
      description: 'Anwalt Kosten • Arbeitsrecht • Fachanwalt',
      gradient: 'from-red-700 to-yellow-600',
      users: '280K+',
      badge: 'Anwalt'
    },
    { 
      name: 'Investment Calculator', 
      icon: '📈', 
      link: '/us-investment-calculator', 
      description: 'Professional investment planning tools',
      gradient: 'from-green-600 to-blue-600',
      users: '400K+',
      badge: 'Popular'
    },
    { 
      name: 'Insurance Comparison', 
      icon: '🛡️', 
      link: '/uk-insurance-comparison', 
      description: 'Compare insurance providers worldwide',
      gradient: 'from-indigo-600 to-purple-600',
      users: '350K+',
      badge: 'Compare All'
    },
    { 
      name: 'Loan Calculator', 
      icon: '🏠', 
      link: '/us-loan-calculator', 
      description: 'Mortgage and loan planning tools',
      gradient: 'from-orange-600 to-red-600',
      users: '450K+',
      badge: 'Essential'
    },
  ];

  // High CPC Financial Services Tools - Premium banking and insurance calculators
  const premiumFinancialTools = [
    {
      name: 'Germany Legal Services',
      icon: '🇩🇪',
      link: '/germany-legal-services-calculator',
      description: 'Anwalt Kosten • Arbeitsrecht • Personenschäden • RVG Gebühren',
      gradient: 'from-red-700 to-yellow-600',
      users: '180K+',
      badge: 'Anwalt',
      keywords: 'anwalt für arbeitsrecht, fachanwalt personenschäden, rechtsanwalt kosten'
    },
    {
      name: 'Chase Bank Calculator',
      icon: '🏦',
      link: '/usa-chase-calculator',
      description: 'Mortgage rates, private banking, and 401k planning',
      gradient: 'from-blue-800 to-indigo-900',
      users: '150K+',
      badge: 'Premium',
      keywords: 'chase mortgage calculator, chase bank rates, private client banking'
    },
    {
      name: 'Bank of America Calculator', 
      icon: '🇺🇸',
      link: '/usa-bank-of-america-calculator',
      description: 'Preferred Rewards rates and Merrill Lynch investments',
      gradient: 'from-red-700 to-blue-800',
      users: '140K+',
      badge: 'Preferred',
      keywords: 'bank of america mortgage, preferred rewards calculator, merrill investment'
    },
    {
      name: 'Barclays Calculator',
      icon: '🇬🇧', 
      link: '/uk-barclays-calculator',
      description: 'UK mortgages, Premier banking, and investment ISAs',
      gradient: 'from-blue-900 to-teal-600',
      users: '120K+',
      badge: 'Premier',
      keywords: 'barclays mortgage calculator, premier banking rates, uk isa calculator'
    },
    {
      name: 'HSBC Calculator',
      icon: '🌍',
      link: '/uk-hsbc-calculator', 
      description: 'Global banking, Jade private banking, and forex',
      gradient: 'from-red-600 to-gray-800',
      users: '110K+',
      badge: 'Global',
      keywords: 'hsbc mortgage rates, jade private banking, global investment calculator'
    },
    {
      name: 'Standard Bank Calculator',
      icon: '🇿🇦',
      link: '/south-africa-standard-bank-calculator',
      description: 'South African banking, home loans, and investments',
      gradient: 'from-blue-800 to-red-600', 
      users: '90K+',
      badge: 'Local',
      keywords: 'standard bank home loan, south africa mortgage calculator, investment rates'
    }
  ];

  // High CPC Insurance Tools - Life, health, auto, and home insurance
  const premiumInsuranceTools = [
    {
      name: 'UK Insurance Comparison',
      icon: '🇬🇧',
      link: '/uk-insurance-comparison',
      description: 'Compare life, motor, home insurance - Aviva, Legal & General, Direct Line',
      gradient: 'from-blue-800 to-indigo-900',
      users: '220K+',
      badge: 'Compare All',
      keywords: 'uk insurance comparison, life insurance quotes, motor insurance calculator'
    },
    {
      name: 'South Africa Insurance Comparison',
      icon: '🇿🇦',
      link: '/south-africa-insurance-comparison',
      description: 'Compare Sanlam, Discovery, Old Mutual - life, motor, medical aid',
      gradient: 'from-green-700 to-blue-800',
      users: '190K+',
      badge: 'SA Leader',
      keywords: 'south africa insurance comparison, sanlam quotes, discovery insurance'
    },
    {
      name: 'USA Insurance Calculator',
      icon: '🇺🇸',
      link: '/usa-insurance-calculator',
      description: 'Life, health, auto & home insurance quotes - State Farm, Allstate',
      gradient: 'from-red-600 to-blue-700',
      users: '200K+',
      badge: 'Premium',
      keywords: 'life insurance calculator, health insurance quotes, auto insurance rates'
    }
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

            {/* High CPC Tools Grid with CPC badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {globalTools.map((tool, index) => (
                <Link 
                  key={index}
                  href={tool.link} 
                  className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-gray-900 rounded-full">
                      {tool.badge}
                    </div>
                  </div>
                  
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

      {/* Premium Financial Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-yellow-600/20 border border-yellow-500/30 backdrop-blur-sm mb-6">
              <span className="text-yellow-300 text-sm font-medium mr-2">💎</span>
              <span className="text-white text-sm font-medium">Premium Financial Services</span>
              <span className="ml-2 px-2 py-1 bg-yellow-500 text-gray-900 text-xs rounded-full font-bold">Featured</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Premium Banking Calculators
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Professional calculators for major banks worldwide. Compare mortgage rates, private banking benefits, and investment returns with current 2025 rates.
            </p>
          </div>

          {/* Premium Banking Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {premiumFinancialTools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.link} 
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-gray-900 rounded-full">
                  {tool.badge}
                </div>
                
                <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300 text-sm font-medium">{tool.users} users</span>
                  <svg className="w-5 h-5 text-yellow-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Insurance Tools Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Insurance Comparison Tools
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Compare life, motor, home, and health insurance from top providers worldwide. Simulate scenarios and find the best coverage with instant quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premiumInsuranceTools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.link} 
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                {/* Insurance Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-xs font-bold text-gray-900 rounded-full">
                  {tool.badge}
                </div>
                
                <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-300 text-sm font-medium">{tool.users} users</span>
                  <svg className="w-5 h-5 text-green-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* High CPC Keywords Section */}
          <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h4 className="text-2xl font-bold text-white mb-4">Trending Financial Searches</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'anwalt für arbeitsrecht', 'fachanwalt personenschäden', 'rechtsanwalt kosten', 'anwaltsgebühren rvg',
                  'insurance comparison tool', 'life insurance quotes uk', 'motor insurance calculator', 'anwalt unternehmensrecht',
                  'discovery insurance comparison', 'rechtsberatung deutschland', 'home insurance calculator', 'anwalt familienrecht'
                ].map((keyword, index) => (
                  <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Markets Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-medium mr-2">🌍</span>
              <span className="text-blue-800 text-sm font-medium">Premium Global Markets</span>
              <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">Featured</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Global Professional Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access professional tools designed for major global markets, financial hubs, and growing economies worldwide.
            </p>
          </div>

          {/* Regions Grid - Ordered by Priority */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {Object.entries(globalRegions)
              .sort(([,a], [,b]) => a.priority - b.priority)
              .map(([key, region]) => (
              <div key={key} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative">
                {/* Priority Badge */}
                <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold rounded-full">
                    Featured
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{region.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{region.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm">Professional Tools</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {region.countries
                    .sort((a, b) => a.priority - b.priority)
                    .slice(0, 4)
                    .map((country, index) => {
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
                        'Morocco': '/morocco-tax-calculator',
                        'Ethiopia': '/ethiopia-tax-calculator',
                        'Bangladesh': '/bangladesh-tax-calculator',
                        'Cuba': '/cuba-currency-calculator'
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
                          <p className="text-xs text-blue-600 font-medium">{country.category}</p>
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

          {/* Quick Access Featured Countries */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Featured Markets - Quick Access</h3>
            <p className="text-gray-600 mb-8">Popular destinations with comprehensive professional tools</p>
            <div className="flex flex-wrap justify-center gap-3">
              {countries
                .filter(country => country.featured)
                .sort((a, b) => a.priority - b.priority)
                .map((country, index) => {
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
                    'Ghana': '/ghana-tax-calculator',
                    'Ethiopia': '/ethiopia-tax-calculator',
                    'Bangladesh': '/bangladesh-tax-calculator',
                    'Cuba': '/cuba-currency-calculator'
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
                    <p className="text-sm text-blue-600 font-medium">{country.category}</p>
                    <p className="text-xs text-gray-600">{country.tools} Professional Tools</p>
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
                  Insurance Comparison (Sanlam, Discovery)
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  SARS Tax Compliance
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Multi-currency Support
                </div>
              </div>
              <div className="space-y-2">
                <Link href="/south-africa-insurance-comparison" className="block w-full text-center py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Compare SA Insurance
                </Link>
                <Link href="/africa-tools" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                  All Africa Tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Europe */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <div className="text-4xl mb-4">🇪🇺</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Europe</h3>
              <p className="text-gray-600 mb-6">EU-compliant tools with GDPR privacy protection and regional tax calculations.</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  German Legal Services (Anwalt für Arbeitsrecht)
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Insurance Comparison (Aviva, Legal & General)
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  GDPR Compliant
                </div>
              </div>
              <div className="space-y-2">
                <Link href="/germany-legal-services-calculator" className="block w-full text-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  🇩🇪 Anwalt Kosten
                </Link>
                <Link href="/uk-insurance-comparison" className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Compare UK Insurance
                </Link>
                <Link href="/europe-tools" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                  All Europe Tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
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
                <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">85+</div>
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