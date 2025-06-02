// components/Header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const globalRegions = {
    americas: { name: 'Americas', icon: '🌎', countries: ['United States', 'Canada', 'Brazil'] },
    europe: { name: 'Europe', icon: '🇪🇺', countries: ['United Kingdom', 'Germany', 'France'] },
    asiaPacific: { name: 'Asia Pacific', icon: '🌏', countries: ['India', 'Singapore', 'Australia', 'UAE'] },
    africa: { name: 'Africa', icon: '🌍', countries: ['South Africa', 'Nigeria', 'Kenya', 'Ghana'] }
  };

  const popularTools = [
    { name: 'CV Builder', href: '/cv-builder', icon: '📄' },
    { name: 'Salary Calculator', href: '/salary-calculator', icon: '💰' },
    { name: 'Tax Calculator', href: '/tax-calculator', icon: '🧮' },
    { name: 'Investment Calculator', href: '/investment-calculator', icon: '📈' },
    { name: 'Loan Calculator', href: '/loan-calculator', icon: '🏠' },
    { name: 'Career Assessment', href: '/career-assessment', icon: '🎯' }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Genius Insights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Home
            </Link>
            
            {/* Tools Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center"
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isToolsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4"
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onMouseLeave={() => setIsToolsOpen(false)}
                >
                  <div className="px-4 pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Professional Tools</h3>
                    <p className="text-sm text-gray-600">Build your career worldwide</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {popularTools.map((tool, index) => (
                      <Link
                        key={index}
                        href={tool.href}
                        className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-lg mr-3">{tool.icon}</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Countries Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center"
                onMouseEnter={() => setIsCountriesOpen(true)}
                onMouseLeave={() => setIsCountriesOpen(false)}
              >
                Countries
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCountriesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4"
                  onMouseEnter={() => setIsCountriesOpen(true)}
                  onMouseLeave={() => setIsCountriesOpen(false)}
                >
                  <div className="px-4 pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Global Markets</h3>
                    <p className="text-sm text-gray-600">25+ countries supported</p>
                  </div>
                  {Object.entries(globalRegions).map(([key, region]) => (
                    <div key={key} className="px-4 py-3">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">{region.icon}</span>
                        <h4 className="font-medium text-gray-900">{region.name}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {region.countries.map((country, index) => {
                          // Map country names to actual calculator URLs
                          const getCalculatorUrl = (countryName) => {
                            const urlMap = {
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
                            return urlMap[countryName] || `/${countryName.toLowerCase().replace(/\s+/g, '-')}-tax-calculator`;
                          };
                          
                          return (
                          <Link
                            key={index}
                            href={getCalculatorUrl(country)}
                            className="text-sm text-gray-600 hover:text-purple-600 py-1 transition-colors"
                          >
                            {country}
                          </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/articles" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Insights
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              About
            </Link>
            
            {/* CTA Button */}
            <Link 
              href="/cv-builder" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Build CV Free
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Home
              </Link>
              
              <div className="px-3 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Popular Tools</h3>
                {popularTools.slice(0, 4).map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.href}
                    className="flex items-center py-2 text-gray-600 hover:text-purple-600"
                  >
                    <span className="mr-3">{tool.icon}</span>
                    <span className="text-sm">{tool.name}</span>
                  </Link>
                ))}
              </div>
              
              <div className="px-3 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Countries</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['United States', 'United Kingdom', 'India', 'South Africa'].map((country, index) => {
                    const getCalculatorUrl = (countryName) => {
                      const urlMap = {
                        'United States': '/us-tax-calculator',
                        'United Kingdom': '/uk-tax-calculator',
                        'India': '/india-tax-calculator',
                        'South Africa': '/south-africa-tax-calculator'
                      };
                      return urlMap[countryName] || `/${countryName.toLowerCase().replace(/\s+/g, '-')}-tax-calculator`;
                    };
                    
                    return (
                    <Link
                      key={index}
                      href={getCalculatorUrl(country)}
                      className="text-sm text-gray-600 hover:text-purple-600 py-1"
                    >
                      {country}
                    </Link>
                    );
                  })}
                </div>
              </div>
              
              <Link href="/articles" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Insights
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                About
              </Link>
              
              <div className="px-3 py-2">
                <Link 
                  href="/cv-builder" 
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl font-medium"
                >
                  Build CV Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}