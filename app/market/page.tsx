'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MarketPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const marketData = {
    indicators: [
      { name: 'Repo Rate', value: '8.25%', change: '0.00%', trend: 'neutral', icon: '🏛️' },
      { name: 'Prime Rate', value: '11.75%', change: '0.00%', trend: 'neutral', icon: '🏦' },
      { name: 'USD/ZAR', value: 'R18.45', change: '+0.12%', trend: 'up', icon: '💱' },
      { name: 'EUR/ZAR', value: 'R19.87', change: '+0.08%', trend: 'up', icon: '💱' },
      { name: 'GBP/ZAR', value: 'R23.21', change: '-0.05%', trend: 'down', icon: '💱' },
      { name: 'Gold Price', value: '$2,047', change: '+0.34%', trend: 'up', icon: '🥇' },
      { name: 'Oil Price (Brent)', value: '$82.15', change: '-0.21%', trend: 'down', icon: '🛢️' },
      { name: 'JSE All Share', value: '75,234', change: '+0.45%', trend: 'up', icon: '📈' }
    ],
    interestRates: [
      { bank: 'Standard Bank', homeLoans: '11.75%', personalLoans: '18.50%', savings: '4.25%' },
      { bank: 'First National Bank (FNB)', homeLoans: '11.75%', personalLoans: '19.00%', savings: '4.15%' },
      { bank: 'ABSA Bank', homeLoans: '11.70%', personalLoans: '18.75%', savings: '4.10%' },
      { bank: 'Nedbank', homeLoans: '11.80%', personalLoans: '18.25%', savings: '4.20%' },
      { bank: 'Capitec Bank', homeLoans: '11.65%', personalLoans: '17.75%', savings: '5.50%' },
      { bank: 'African Bank', homeLoans: 'N/A', personalLoans: '19.50%', savings: '4.75%' }
    ],
    fuelPrices: [
      { type: 'Petrol 95 (Inland)', price: 'R22.86/L', change: '+R0.15' },
      { type: 'Petrol 93 (Inland)', price: 'R22.56/L', change: '+R0.15' },
      { type: 'Petrol 95 (Coastal)', price: 'R22.12/L', change: '+R0.15' },
      { type: 'Diesel 0.05% (Inland)', price: 'R21.78/L', change: '+R0.12' },
      { type: 'Diesel 0.005% (Inland)', price: 'R21.88/L', change: '+R0.12' },
      { type: 'Illuminating Paraffin', price: 'R14.56/L', change: '+R0.08' }
    ],
    taxRates: [
      { bracket: 'R0 - R237,100', rate: '18%', marginalRate: 'R0' },
      { bracket: 'R237,101 - R370,500', rate: '26%', marginalRate: 'R42,678' },
      { bracket: 'R370,501 - R512,800', rate: '31%', marginalRate: 'R77,362' },
      { bracket: 'R512,801 - R673,000', rate: '36%', marginalRate: 'R121,475' },
      { bracket: 'R673,001 - R857,900', rate: '39%', marginalRate: 'R179,147' },
      { bracket: 'R857,901+', rate: '45%', marginalRate: 'R251,258+' }
    ]
  };

  const news = [
    {
      title: 'SARB Keeps Repo Rate Unchanged at 8.25%',
      excerpt: 'The South African Reserve Bank maintains the repo rate at 8.25% as inflation pressures ease',
      time: '2 hours ago',
      category: 'Monetary Policy',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Rand Strengthens Against Major Currencies',
      excerpt: 'The South African Rand gains ground against the US Dollar and Euro amid improved sentiment',
      time: '4 hours ago',
      category: 'Currency',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'JSE All Share Index Reaches New Monthly High',
      excerpt: 'The JSE All Share Index climbs 0.45% to reach 75,234 points on positive market sentiment',
      time: '6 hours ago',
      category: 'Stock Market',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Genius Insights</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/tools" className="text-gray-600 hover:text-gray-900 font-medium">Tools</Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 font-medium">Guides</Link>
                <Link href="/calculators" className="text-gray-600 hover:text-gray-900 font-medium">Calculators</Link>
                <Link href="/market" className="text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600">Market</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-medium">Admin</Link>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">South African Market Data</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              South African Market Data & Financial Rates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Live financial market data, interest rates, currency exchange rates, and economic indicators 
              for South Africa. Updated in real-time for accurate financial planning and investment decisions.
            </p>
          </div>

          {/* Top Banner Ad */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-8 text-center">
            <div className="text-gray-500 font-medium mb-2">Advertisement</div>
            <div className="text-sm text-gray-400">728x90 - Top Banner AdSense Space</div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              
              {/* Key Indicators */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Financial Indicators</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {marketData.indicators.map((indicator, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{indicator.icon}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          indicator.trend === 'up' ? 'bg-green-100 text-green-700' :
                          indicator.trend === 'down' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {indicator.change}
                        </span>
                      </div>
                      <div className="font-bold text-lg text-gray-900">{indicator.value}</div>
                      <div className="text-sm text-gray-600">{indicator.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="mb-8">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {[
                      { id: 'overview', name: 'Market Overview', icon: '📊' },
                      { id: 'rates', name: 'Interest Rates', icon: '🏦' },
                      { id: 'fuel', name: 'Fuel Prices', icon: '⛽' },
                      { id: 'tax', name: 'Tax Rates', icon: '🇿🇦' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                          selectedTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg border border-gray-200">
                
                {/* Market Overview Tab */}
                {selectedTab === 'overview' && (
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Market News & Updates</h3>
                    <div className="space-y-6">
                      {news.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
                          <div className="relative w-24 h-18 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover rounded"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs font-medium rounded">
                                {item.category}
                              </span>
                              <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600">{item.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interest Rates Tab */}
                {selectedTab === 'rates' && (
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Bank Interest Rates Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-4 font-medium text-gray-700">Bank</th>
                            <th className="text-left p-4 font-medium text-gray-700">Home Loans</th>
                            <th className="text-left p-4 font-medium text-gray-700">Personal Loans</th>
                            <th className="text-left p-4 font-medium text-gray-700">Savings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marketData.interestRates.map((bank, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="p-4 font-medium text-gray-900">{bank.bank}</td>
                              <td className="p-4 text-green-600 font-medium">{bank.homeLoans}</td>
                              <td className="p-4 text-orange-600 font-medium">{bank.personalLoans}</td>
                              <td className="p-4 text-blue-600 font-medium">{bank.savings}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Fuel Prices Tab */}
                {selectedTab === 'fuel' && (
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Current Fuel Prices (January 2025)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {marketData.fuelPrices.map((fuel, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-900">{fuel.type}</div>
                              <div className="text-sm text-gray-600">Current Price</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-gray-900">{fuel.price}</div>
                              <div className="text-sm text-green-600">{fuel.change}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tax Rates Tab */}
                {selectedTab === 'tax' && (
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">2025/2026 Tax Year Rates</h3>
                    <div className="space-y-4">
                      {marketData.taxRates.map((bracket, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{bracket.bracket}</span>
                            <span className="font-bold text-green-600">{bracket.rate}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Marginal Tax: {bracket.marginalRate}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Tax Rebates for 2025/2026</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Primary rebate: R17,235 (under 65)</li>
                        <li>• Secondary rebate: R9,444 (65-74 years)</li>
                        <li>• Tertiary rebate: R3,145 (75+ years)</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Mid-content Ad */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 my-8 text-center">
                <div className="text-gray-500 font-medium mb-2">Advertisement</div>
                <div className="text-sm text-gray-400">336x280 - Medium Rectangle AdSense Space</div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Quick Tools */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">🧮 Quick Calculators</h3>
                <div className="space-y-3">
                  <Link href="/south-africa-tax-calculator" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="font-semibold text-sm text-green-700">Tax Calculator</div>
                    <div className="text-xs text-green-600">Calculate your SARS tax</div>
                  </Link>
                  <Link href="/south-africa-loan-calculator" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="font-semibold text-sm text-blue-700">Loan Calculator</div>
                    <div className="text-xs text-blue-600">Current interest rates</div>
                  </Link>
                  <Link href="/south-africa-fuel-cost-calculator" className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <div className="font-semibold text-sm text-orange-700">Fuel Cost Calculator</div>
                    <div className="text-xs text-orange-600">Latest fuel prices</div>
                  </Link>
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="text-gray-500 font-medium mb-2">Advertisement</div>
                <div className="text-sm text-gray-400">300x250 - Sidebar AdSense</div>
              </div>

              {/* Market Alerts */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">🔔 Market Alerts</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="font-semibold text-sm text-yellow-700">Rate Change Alert</div>
                    <div className="text-xs text-yellow-600">SARB meeting scheduled</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-sm text-green-700">Currency Update</div>
                    <div className="text-xs text-green-600">Rand strengthening</div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-3">📈 Market Updates</h3>
                <p className="text-sm text-green-100 mb-4">Get daily market data and rate changes delivered to your inbox</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded text-gray-900 text-sm"
                  />
                  <button className="w-full bg-white text-green-600 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Subscribe Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-500 font-medium mb-2">Advertisement</div>
            <div className="text-sm text-gray-400">970x250 - Bottom Leaderboard AdSense Space</div>
          </div>
        </div>
      </section>

      {/* SEO Footer */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Interest Rates</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• SARB Repo Rate: 8.25%</li>
                <li>• Prime Lending Rate: 11.75%</li>
                <li>• Home Loan Rates</li>
                <li>• Personal Loan Rates</li>
                <li>• Savings Account Rates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Currency Rates</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• USD/ZAR Exchange Rate</li>
                <li>• EUR/ZAR Exchange Rate</li>
                <li>• GBP/ZAR Exchange Rate</li>
                <li>• Rand Performance</li>
                <li>• Currency Forecasts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Stock Market</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• JSE All Share Index</li>
                <li>• Top 40 Index</li>
                <li>• Banking Index</li>
                <li>• Resource Index</li>
                <li>• Market Analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Economic Data</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• South African GDP</li>
                <li>• Inflation Rate</li>
                <li>• Employment Data</li>
                <li>• Trade Balance</li>
                <li>• Economic Forecasts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}