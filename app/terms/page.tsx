import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Genius Insights',
  description: 'Terms and Conditions for using Genius Insights platform, career guidance services, and African tech resources.',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-blue-200">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          
          <div className="prose prose-lg max-w-none text-black">
            
            <h2 className="text-2xl font-bold text-black mb-6">1. Acceptance of Terms</h2>
            <p className="mb-6 text-black">
              By accessing and using Genius Insights ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">2. Description of Service</h2>
            <p className="mb-4 text-black">
              Genius Insights provides career guidance, salary information, skills analysis, and educational content specifically focused on the African technology sector. Our services include:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-black">
              <li>Career assessment tools and recommendations</li>
              <li>Salary calculation and market data for African countries</li>
              <li>Skills gap analysis and learning recommendations</li>
              <li>Educational articles and industry insights</li>
              <li>Job market trends and analysis</li>
              <li>Professional development resources</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-6">3. User Accounts and Registration</h2>
            <p className="mb-4 text-black">
              Some features of our service may require you to register for an account. When you register, you agree to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-black">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security and confidentiality of your login credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-6">4. Acceptable Use Policy</h2>
            <p className="mb-4 text-black">
              You agree not to use our service to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-black">
              <li>Violate any applicable local, state, national, or international law</li>
              <li>Post, transmit, or distribute content that is illegal, harmful, or offensive</li>
              <li>Harass, abuse, or harm another person or group</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Distribute spam, chain letters, or unsolicited communications</li>
              <li>Upload or transmit viruses, malware, or other harmful code</li>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Interfere with or disrupt our service or servers</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-6">5. Intellectual Property Rights</h2>
            <p className="mb-4 text-black">
              All content on Genius Insights, including text, graphics, logos, icons, images, audio clips, and software, is the property of Genius Insights or its content suppliers and is protected by South African and international copyright laws.
            </p>
            <p className="mb-6 text-black">
              You may not reproduce, distribute, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, decompile or otherwise exploit this website or any portion of it unless expressly permitted by us in writing.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">6. User-Generated Content</h2>
            <p className="mb-4 text-black">
              When you submit content to our platform (comments, reviews, etc.), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, publicly perform, publicly display, reproduce, and distribute such content.
            </p>
            <p className="mb-6 text-black">
              You represent and warrant that you own or have the necessary rights to grant the above license and that your content does not violate any third-party rights.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">7. Privacy Policy</h2>
            <p className="mb-6 text-black">
              Your privacy is important to us. Our Privacy Policy, which also governs your use of the service, can be found at{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                our Privacy Policy page
              </Link>. By using our service, you consent to the collection and use of your information as outlined in our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">8. Advertising and Third-Party Services</h2>
            <p className="mb-4 text-black">
              Our website may contain advertisements and links to third-party websites or services. We use Google AdSense and other advertising partners to display relevant advertisements.
            </p>
            <p className="mb-6 text-black">
              We are not responsible for the content, privacy policies, or practices of third-party websites or services. You acknowledge and agree that we shall not be responsible for any damage or loss caused by your use of any third-party content, goods, or services.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">9. Disclaimer of Warranties</h2>
            <p className="mb-6 text-black">
              Our service is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of our service or the information, content, materials, or products included on this website.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">10. Limitation of Liability</h2>
            <p className="mb-6 text-black">
              We will not be liable for any damages of any kind arising from the use of this service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">11. Data Accuracy and Career Guidance</h2>
            <p className="mb-4 text-black">
              While we strive to provide accurate salary data and career guidance, information on our platform is for general informational purposes only and should not be considered as professional career advice.
            </p>
            <p className="mb-6 text-black">
              Users should verify information independently and consult with qualified professionals for specific career decisions. Salary data is based on available market information and may not reflect current or accurate compensation for all positions or locations.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">12. Termination</h2>
            <p className="mb-6 text-black">
              We may terminate or suspend your account and access to our service at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, our business, or third parties.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">13. Governing Law</h2>
            <p className="mb-6 text-black">
              These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">14. Changes to Terms</h2>
            <p className="mb-6 text-black">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website with a new "Last Updated" date. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-bold text-black mb-6">15. Contact Information</h2>
            <p className="mb-4 text-black">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> legal@geniusinsights.co.za</p>
              <p><strong>Address:</strong> Genius Insights, Cape Town, South Africa</p>
              <p><strong>Website:</strong> www.geniusinsights.co.za</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link 
                href="/privacy"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Privacy Policy
              </Link>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}