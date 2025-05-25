import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Genius Insights',
  description: 'Privacy Policy for Genius Insights - Learn how we collect, use, and protect your personal information on our African tech career platform.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-200">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">1. Introduction</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Welcome to Genius Insights ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services related to African tech careers, salary insights, and professional development tools.
              </p>
              <p className="text-slate-700 leading-relaxed">
                By accessing or using our services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-4">2.1 Personal Information</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We only collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
                <li>Subscribe to our newsletter (name and email address)</li>
                <li>Leave comments on articles (name and email address)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-4">2.2 Analytics Information</h3>
              <p className="text-slate-700 leading-relaxed">
                We use Google Analytics to understand how visitors interact with our website. This service may collect anonymous usage data such as page views and user interactions, but we do not collect or store personal identifying information like IP addresses ourselves.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">3. How We Use Your Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use the limited information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
                <li>Send newsletters to subscribers who have opted in</li>
                <li>Display and manage comments on articles</li>
                <li>Improve our website content and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-4">4.1 Third-Party Service Providers</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We only share information with Google Analytics for website usage analysis. We do not share personal information with any other third parties.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 mb-4">4.2 Legal Requirements</h3>
              <p className="text-slate-700 leading-relaxed">
                We may disclose information if required by law, court order, or to protect our rights, property, or safety.
              </p>
            </section>

            {/* Google AdSense */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">5. Google AdSense and Advertising</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use Google AdSense to display advertisements on our website. Google may use cookies and other technologies to:
              </p>
              <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
                <li>Show ads based on your interests and previous visits</li>
                <li>Measure ad effectiveness and user engagement</li>
                <li>Provide relevant advertising content</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                You can opt out of personalized advertising by visiting Google's Ad Settings or using the Network Advertising Initiative opt-out tool.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">6. Data Security</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure cloud storage with access controls</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal information</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">7. Data Retention</h2>
              <p className="text-slate-700 leading-relaxed">
                We retain personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">8. Your Privacy Rights</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                To exercise these rights, please contact us at the information provided below.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">9. Children's Privacy</h2>
              <p className="text-slate-700 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided personal information, please contact us to have it removed.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">10. International Data Transfers</h2>
              <p className="text-slate-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information during such transfers, in accordance with applicable data protection laws.
              </p>
            </section>


            {/* Changes to Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">11. Changes to This Privacy Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">12. Contact Us</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-slate-700 mb-2"><strong>Email:</strong> privacy@geniusinsights.co.za</p>
                <p className="text-slate-700 mb-2"><strong>Website:</strong> www.geniusinsights.co.za</p>
                <p className="text-slate-700"><strong>Response Time:</strong> We will respond to your inquiry within 30 days</p>
              </div>
            </section>

            {/* Effective Date */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">13. Effective Date</h2>
              <p className="text-slate-700 leading-relaxed">
                This Privacy Policy is effective as of January 2025 and was last updated on January 2025.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}