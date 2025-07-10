import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata = {
  title: 'Contact Genius Insights | Get Support & Share Feedback',
  description: 'Get in touch with the Genius Insights team. We are here to help with questions, feedback, and suggestions for our South African financial tools platform.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Contact Genius Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our calculators? Found an issue? Want to suggest a new feature? 
              We would love to hear from you and improve our platform based on your feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                    <p className="text-gray-600 text-sm mb-2">For general inquiries and support</p>
                    <a href="mailto:support@genius-insights.co.za" className="text-green-600 hover:text-green-700">
                      support@genius-insights.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🐛</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Report Issues</h3>
                    <p className="text-gray-600 text-sm mb-2">Found a bug or calculation error?</p>
                    <a href="mailto:bugs@genius-insights.co.za" className="text-blue-600 hover:text-blue-700">
                      bugs@genius-insights.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Are your calculators accurate?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes! We update our calculators regularly with the latest SARS tax tables, 
                    interest rates, and South African financial regulations. However, results 
                    should be used for estimation purposes only.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Is Genius Insights really free?</h3>
                  <p className="text-gray-600 text-sm">
                    Absolutely! All our calculators, guides, and market data are completely free. 
                    We believe financial tools should be accessible to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Get notified about new calculators, rate changes, and platform updates.
              </p>
              <NewsletterSignup 
                variant="compact"
                title="Platform Updates"
                description="Be the first to know about new features and important rate changes."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}