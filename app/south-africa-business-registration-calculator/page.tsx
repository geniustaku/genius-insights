import type { Metadata } from 'next';
import SouthAfricaBusinessRegistrationCalculator from '@/components/SouthAfricaBusinessRegistrationCalculator';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'South Africa Business Registration Cost Calculator 2025 | CIPC & SARS Fees',
  description: 'Free SA business registration cost calculator 2025. Calculate CIPC fees, SARS registration, annual returns, compliance costs. Complete guide for 100,000+ entrepreneurs.',
  keywords: [
    'South Africa business registration cost 2025', 'CIPC registration fees SA', 'company registration cost SA', 'SARS business registration fees', 'close corporation cost SA', 'annual return fees CIPC', 'business compliance costs SA', 'SA company formation costs', 'CIPC annual fees', 'business startup costs SA', 'company registration calculator SA', 'SMAS registration fees', 'VAT registration cost SA', 'business license fees SA', 'SA entrepreneur costs'
  ],
  alternates: {
    canonical: '/south-africa-business-registration-calculator',
  },
  openGraph: {
    title: 'South Africa Business Registration Calculator 2025 | Free CIPC & SARS Fees',
    description: '🏢 Calculate SA business registration costs! CIPC fees, SARS registration, compliance costs with 2025 rates. Free tool for 100,000+ entrepreneurs.',
    url: 'https://genius-insights.co.za/south-africa-business-registration-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-business-registration-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa Business Registration Calculator 2025 - CIPC & SARS Fees',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Business Registration Calculator 2025 | CIPC & SARS Fees',
    description: '🏢 Calculate South African business registration costs! CIPC fees, SARS registration, compliance with 2025 rates.',
    images: ['/images/sa-business-registration-og.jpg'],
  },
};

export default function SouthAfricaBusinessRegistrationCalculatorPage() {
  return (
    <>
      <StructuredData type="business-calculator" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">🏢 CIPC & SARS Compliant</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                SA Business Registration Calculator <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate complete business registration costs in South Africa. CIPC fees, SARS registration, 
                annual compliance costs, and ongoing requirements with 2025 rates.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100K+</div>
                  <div className="text-white/80 text-sm">Entrepreneurs</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">R600+</div>
                  <div className="text-white/80 text-sm">Company Registration</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">CIPC</div>
                  <div className="text-white/80 text-sm">Compliant</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">2025</div>
                  <div className="text-white/80 text-sm">Updated Fees</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaBusinessRegistrationCalculator />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  SA Business Entity Types
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Choose the right business structure for your needs. Each entity type has different 
                  registration costs, compliance requirements, and tax implications.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🏢', title: 'Private Company (Pty Ltd)', desc: 'Limited liability, separate legal entity' },
                    { icon: '👥', title: 'Close Corporation (CC)', desc: 'Simple structure, limited members' },
                    { icon: '🤝', title: 'Partnership', desc: 'Shared ownership and responsibility' },
                    { icon: '👤', title: 'Sole Proprietorship', desc: 'Individual business ownership' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  CIPC Registration Process
                </h3>
                
                <div className="space-y-4">
                  {[
                    { step: 'Name Reservation', time: '1-2 days', cost: 'R50', color: 'bg-green-500' },
                    { step: 'Document Preparation', time: '2-3 days', cost: 'Legal fees', color: 'bg-blue-500' },
                    { step: 'CIPC Registration', time: '5-10 days', cost: 'R600+', color: 'bg-purple-500' },
                    { step: 'SARS Registration', time: '1-2 weeks', cost: 'Free', color: 'bg-orange-500' },
                    { step: 'Bank Account Opening', time: '1-2 weeks', cost: 'Bank fees', color: 'bg-red-500' },
                    { step: 'Compliance Setup', time: 'Ongoing', cost: 'Annual fees', color: 'bg-indigo-500' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{item.step}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{item.cost}</div>
                          <div className="text-xs text-gray-600">{item.time}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                             style={{ width: `${85 + index * 2}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Business Registration Tips</h4>
                      <ul className="text-blue-800 text-sm leading-relaxed space-y-1">
                        <li>• Reserve your company name early to avoid delays</li>
                        <li>• Consider professional help for complex structures</li>
                        <li>• Plan for ongoing compliance costs and deadlines</li>
                        <li>• Register for appropriate tax numbers from start</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}