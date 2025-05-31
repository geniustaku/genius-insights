import type { Metadata } from 'next';
import CVBuilder from '@/components/CVBuilder';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Free CV Builder 2025 | Professional Resume Maker with PDF Download | South Africa',
  description: 'Create professional CVs with our free South African CV builder. 20+ ATS-friendly templates, instant PDF download, optimized for SA job market. Used by 300,000+ job seekers across Africa.',
  keywords: [
    'free CV builder South Africa 2025', 'SA CV maker free', 'South African resume builder', 'CV builder Johannesburg', 'Cape Town CV maker', 'Durban resume builder', 'free CV templates South Africa', 'ATS CV builder SA', 'professional CV maker Africa', 'job application CV builder SA', 'curriculum vitae builder South Africa', 'SA job market CV builder', 'African CV templates free', 'resume maker South Africa', 'CV creator SA', 'South African job CV', 'free resume builder Africa', 'professional resume templates SA', 'CV builder PDF download SA', 'online CV maker South Africa', 'career CV builder Africa', 'job hunting CV builder SA', 'employment CV maker SA', 'graduate CV builder South Africa', 'entry level CV builder SA'
  ],
  alternates: {
    canonical: '/cv-builder',
  },
  openGraph: {
    title: 'Free CV Builder 2025 | South African Resume Maker with PDF Download',
    description: '📄 Build professional CVs for the SA job market! 20+ ATS-friendly templates, instant PDF download. Trusted by 300,000+ African job seekers.',
    url: 'https://genius-insights.co.za/cv-builder',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Genius Insights',
    images: [
      {
        url: '/images/cv-builder-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free South African CV Builder 2025 - Professional Resume Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CV Builder 2025 | SA Resume Maker',
    description: '📄 Create professional CVs for South African jobs! 20+ templates, instant PDF download, ATS-optimized for SA market.',
    images: ['/images/cv-builder-og.jpg'],
    site: '@geniusinsights_za',
  },
};

export default function CVBuilderPage() {
  return (
    <>
      <StructuredData type="cv-builder" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">📄 Professional CV Builder</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Free South African CV Builder <br/>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">2025</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Create professional CVs optimized for the South African job market. Choose from 20+ ATS-friendly templates, 
                download as PDF instantly. Trusted by job seekers across Africa.
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">20+</div>
                  <div className="text-white/80 text-sm">SA-Optimized Templates</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">300K+</div>
                  <div className="text-white/80 text-sm">African Job Seekers</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">ATS</div>
                  <div className="text-white/80 text-sm">Optimized</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/80 text-sm">Free Forever</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main CV Builder Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <CVBuilder />
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Why Choose Our South African CV Builder?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Create professional CVs tailored for the South African job market. Our builder combines 
                  beautiful design with ATS optimization and local market insights to help you land your dream job in SA.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: '🇿🇦', title: 'SA Market Optimized', desc: '20+ templates designed for South African employers' },
                    { icon: '📱', title: 'Mobile Friendly', desc: 'Build your CV on any device, anywhere in Africa' },
                    { icon: '📄', title: 'Instant PDF Download', desc: 'Download professional PDFs with pdfmake technology' },
                    { icon: '🤖', title: 'ATS Optimized', desc: 'Pass South African company screening systems' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
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
                  Popular CV Templates
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Modern Professional', style: 'Clean & minimal design', color: 'bg-blue-500' },
                    { name: 'Creative Designer', style: 'Bold & colorful layout', color: 'bg-purple-500' },
                    { name: 'Corporate Executive', style: 'Traditional & formal', color: 'bg-gray-600' },
                    { name: 'Tech Professional', style: 'Modern & technical', color: 'bg-green-500' }
                  ].map((template, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                      <div className={`w-full h-20 ${template.color} rounded-md mb-3 opacity-80`}></div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{template.name}</h4>
                      <p className="text-gray-600 text-xs">{template.style}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-indigo-600 text-sm font-bold">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900 mb-2">Pro Tips for Great CVs</h4>
                      <ul className="text-indigo-800 text-sm leading-relaxed space-y-1">
                        <li>• Keep it to 1-2 pages maximum</li>
                        <li>• Use action verbs and quantify achievements</li>
                        <li>• Tailor your CV for each job application</li>
                        <li>• Include relevant keywords from job descriptions</li>
                        <li>• Proofread carefully for spelling and grammar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Trusted by Job Seekers Worldwide
            </h3>
            <p className="text-xl text-gray-600">
              See how our CV builder helped professionals land their dream jobs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Manager",
                company: "Cape Town, SA",
                quote: "Got 3 interview calls within a week of using this CV builder. The templates are absolutely beautiful!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Software Developer",
                company: "Lagos, Nigeria",
                quote: "The ATS optimization feature was a game-changer. Finally, my CV gets past the initial screening.",
                rating: 5
              },
              {
                name: "Amara Okafor",
                role: "Financial Analyst",
                company: "Nairobi, Kenya",
                quote: "Professional, clean, and easy to use. Landed my current job thanks to this amazing CV builder.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}