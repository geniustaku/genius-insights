import Link from 'next/link';
import Image from 'next/image';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata = {
  title: 'About Genius Insights | South African Financial Tools Platform',
  description: 'Learn about Genius Insights - South Africa\'s comprehensive financial tools platform providing calculators, guides, and market data for informed financial decisions.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Genius Insights</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About Genius Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              South Africa's most comprehensive financial tools platform, empowering individuals and businesses 
              to make informed financial decisions with accurate calculators, expert guides, and real-time market data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At Genius Insights, we believe that everyone deserves access to accurate, up-to-date financial tools 
              and information. Our mission is to democratize financial planning in South Africa by providing 
              comprehensive calculators, educational content, and market insights that help our users navigate 
              the complexities of the South African financial landscape.
            </p>
          </section>

          {/* What We Offer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🧮 Financial Calculators</h3>
                  <p className="text-gray-600 text-sm">SARS tax calculators, property transfer tools, retirement planners, and more - all updated with the latest South African rates and regulations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📚 Expert Guides</h3>
                  <p className="text-gray-600 text-sm">Comprehensive guides covering tax filing, property transfers, insurance comparisons, and investment strategies specific to South Africa.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📊 Market Data</h3>
                  <p className="text-gray-600 text-sm">Real-time interest rates, currency exchange rates, fuel prices, and economic indicators to keep you informed.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🇿🇦 SA-Specific Focus</h3>
                  <p className="text-gray-600 text-sm">All our tools and content are designed specifically for South African residents, businesses, and financial regulations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Ad Unit 4 - About Page */}
          <div className="my-8">
            <AdSenseAd 
              adSlot="5279468522"
              className="text-center"
            />
          </div>

          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Accuracy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Financial decisions are too important to be based on outdated or inaccurate information. That's why we:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Update our calculators with the latest SARS tax tables and rebates
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Monitor South African Reserve Bank rate changes and economic indicators
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Collaborate with financial experts to ensure our guides remain current
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Regularly review and verify all financial data and calculations
              </li>
            </ul>
          </section>

          {/* Why Choose Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Genius Insights?</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">SA-Focused</h3>
                  <p className="text-sm text-gray-600">Designed specifically for South African financial regulations and markets</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🆓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Completely Free</h3>
                  <p className="text-sm text-gray-600">All our tools and guides are available at no cost to users</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Always Updated</h3>
                  <p className="text-sm text-gray-600">Regular updates to reflect the latest rates and regulations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions or Feedback?</h2>
            <p className="text-gray-600 mb-6">
              We're always looking to improve our platform and welcome your input.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Get in Touch
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}