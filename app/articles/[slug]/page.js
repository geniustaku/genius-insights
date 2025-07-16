// app/articles/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import CopyLinkButton from '../../../components/CopyLinkButton';
import SaveButton from '../../../components/Save';
import ArticleComments from '../../../components/ArticleComments';
import AdSenseAd from '../../../components/AdSenseAd';

function getArticleImage(category) {
  const categoryImages = {
    'Tax & SARS': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center',
    'Property': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&crop=center',
    'Banking': 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop&crop=center',
    'Insurance': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop&crop=center',
    'Business': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop&crop=center',
    'Finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center',
    'Healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop&crop=center',
    'Legal': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop&crop=center'
  };
  
  return categoryImages[category] || categoryImages['Business'];
} 

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const articles = await getArticles(20);
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.warn('Could not generate static params, falling back to empty array:', error);
    return [
      { slug: 'sars-efiling-registration' },
      { slug: 'cipc-company-registration' },
      { slug: 'property-transfer-guide' },
      { slug: 'medical-aid-vs-insurance' },
      { slug: 'open-bank-account-guide' }
    ];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
  
  return {
    title: `${article.title} | Genius Insights`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      type: 'article',
      url: `https://www.genius-insights.co.za/articles/${article.slug}`,
      images: [
        {
          url: article.featured_image || 'https://www.genius-insights.co.za/images/default-og.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      publishedTime: article.published_at,
      authors: [article.author],
      tags: [article.category, 'careers', 'south africa'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.title,
      images: [article.featured_image || 'https://www.genius-insights.co.za/images/default-og.jpg'],
    }
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  let article = await getArticleBySlug(slug);
  
  if (!article) {
    const fallbackArticles = {
      'medical-aid-vs-insurance': {
        id: 'fallback-1',
        title: 'Medical Aid vs Medical Insurance in South Africa: Complete Comparison Guide',
        content: `
          <h2>Understanding the Difference Between Medical Aid and Medical Insurance</h2>
          <p>In South Africa, choosing between medical aid and medical insurance is a crucial decision that affects your healthcare coverage and financial well-being. This comprehensive guide explains the key differences and helps you make an informed choice.</p>
          
          <h3>What is Medical Aid?</h3>
          <p>Medical aid is regulated by the Council for Medical Schemes and provides comprehensive healthcare coverage. Medical aids must offer Prescribed Minimum Benefits (PMBs) and cannot refuse membership based on health status.</p>
          
          <h3>What is Medical Insurance?</h3>
          <p>Medical insurance provides specific coverage for defined medical events or expenses. It's regulated by the Financial Sector Conduct Authority (FSCA) and typically offers gap cover or specific illness coverage.</p>
          
          <h3>Key Differences</h3>
          <ul>
            <li><strong>Regulation:</strong> Medical aid is regulated by CMS, medical insurance by FSCA</li>
            <li><strong>Coverage:</strong> Medical aid offers comprehensive coverage, insurance offers specific coverage</li>
            <li><strong>PMBs:</strong> Medical aid must cover PMBs, insurance doesn't</li>
            <li><strong>Waiting Periods:</strong> Medical aid has general waiting periods, insurance has specific exclusions</li>
          </ul>
          
          <h3>Which Should You Choose?</h3>
          <p>Your choice depends on your healthcare needs, budget, and risk tolerance. Consider consulting with a healthcare financial advisor to make the best decision for your circumstances.</p>
        `,
        excerpt: 'Complete comparison guide between medical aid and medical insurance in South Africa, including regulations, coverage, and benefits.',
        category: 'Insurance',
        author: 'Healthcare Expert',
        published_at: new Date().toISOString(),
        reading_time: 8,
        slug: 'medical-aid-vs-insurance',
        featured_image: null
      },
      'cipc-company-registration': {
        id: 'fallback-2',
        title: 'CIPC Company Registration in South Africa: Complete Step-by-Step Guide',
        content: `
          <h2>Registering Your Company with CIPC</h2>
          <p>The Companies and Intellectual Property Commission (CIPC) is South Africa's regulatory body for company registration. This guide walks you through the complete process of registering your business.</p>
          
          <h3>Types of Companies You Can Register</h3>
          <ul>
            <li><strong>Private Company (Pty Ltd):</strong> Most common for small to medium businesses</li>
            <li><strong>Public Company (Ltd):</strong> For companies planning to list on the stock exchange</li>
            <li><strong>Personal Liability Company (Inc):</strong> For professional services</li>
            <li><strong>Non-Profit Company (NPC):</strong> For non-profit organizations</li>
          </ul>
          
          <h3>Registration Process</h3>
          <ol>
            <li><strong>Name Reservation:</strong> Reserve your company name online via CIPC website</li>
            <li><strong>Prepare Documents:</strong> Memorandum of Incorporation, Form CoR 14.1, and CoR 15.1</li>
            <li><strong>Submit Application:</strong> Submit online or at CIPC offices</li>
            <li><strong>Pay Fees:</strong> Registration fees vary by company type</li>
            <li><strong>Receive Certificate:</strong> Get your Certificate of Incorporation</li>
          </ol>
          
          <h3>Required Information</h3>
          <ul>
            <li>Company name and registration details</li>
            <li>Directors' information and ID copies</li>
            <li>Registered office address</li>
            <li>Share capital structure</li>
            <li>Memorandum of Incorporation</li>
          </ul>
          
          <h3>Costs and Timeframes</h3>
          <p>Registration typically takes 5-15 business days and costs between R175-R500 depending on company type and service level chosen.</p>
        `,
        excerpt: 'Complete step-by-step guide to registering your company with CIPC, including requirements, costs, and timeframes.',
        category: 'Business',
        author: 'Business Registration Expert',
        published_at: new Date().toISOString(),
        reading_time: 12,
        slug: 'cipc-company-registration',
        featured_image: null
      }
    };
    
    article = fallbackArticles[slug];
    
    if (!article) {
      notFound();
    }
  }
  
  const relatedArticles = await getRelatedArticles(article.category, article.id, 3);
  
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(`https://www.genius-insights.co.za/articles/${article.slug}`);
  
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const articleUrl = `https://www.genius-insights.co.za/articles/${article.slug}`;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Genius Insights</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/tools" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">Tools</Link>
                <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium pb-4 border-b-2 border-blue-600">Guides</Link>
                <Link href="/calculators" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">Calculators</Link>
                <Link href="/market" className="text-gray-600 hover:text-gray-900 font-medium pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors">Market</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all font-medium shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-400">›</span>
            <Link href="/articles" className="hover:text-white transition-colors">Articles</Link>
            <span className="text-gray-400">›</span>
            <span className="text-blue-300">{article.category}</span>
          </nav>
          
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-medium mb-6 shadow-lg">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {article.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              {article.title}
            </h1>
            
            {/* Author and Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold mr-4 shadow-lg">
                  {article.author ? article.author.substring(0, 1) : 'A'}
                </div>
                <div>
                  <p className="font-semibold text-white">{article.author}</p>
                  <p className="text-blue-200 text-sm">{formatDate(article.published_at)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-blue-200 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.reading_time} min read
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {Math.floor(Math.random() * 1000) + 500} views
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        
        {/* Featured Image */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
            <div className="relative overflow-hidden rounded-2xl" style={{ height: '400px' }}>
              <Image
                src={article.featured_image || getArticleImage(article.category)}
                alt={article.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-sm text-gray-500 mt-4 text-center">
              Photo by Genius Insights © 2025
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Reading Progress Bar */}
              <div className="sticky top-16 z-30 h-1 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300" style={{ width: '25%' }}></div>
              </div>
              
              {/* Article Content */}
              <div className="p-8 md:p-12">
                {/* Article Meta */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </div>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <div className="text-sm text-gray-500">{formatDate(article.published_at)}</div>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <div className="text-sm text-gray-500">{article.reading_time} min read</div>
                </div>
                
                {/* Content */}
                <div className="article-content prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
                
                {/* In-Article Ad */}
                <div className="my-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <AdSenseAd 
                    adSlot="4969876131"
                    adFormat="fluid"
                    adLayout="in-article"
                    style={{ display: 'block', textAlign: 'center' }}
                  />
                </div>
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Topics Covered</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
                      {article.category}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                      South Africa
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200">
                      Financial Guide
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              
              {/* Table of Contents */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                <nav className="space-y-3">
                  <a href="#introduction" className="block text-sm text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    Introduction
                  </a>
                  <a href="#key-insights" className="block text-sm text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    Key Insights
                  </a>
                  <a href="#conclusion" className="block text-sm text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    Conclusion
                  </a>
                </nav>
              </div>
              
              {/* Author Quick Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">About the Author</h3>
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                    {article.author ? article.author.substring(0, 1) : 'A'}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{article.author}</h4>
                  <p className="text-sm text-gray-600 mb-4">Financial Expert</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Related Articles */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-6">Related Articles</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">Related Article Title</h4>
                        <p className="text-xs text-gray-600 mb-2">Brief description of the related article...</p>
                        <div className="text-xs text-gray-500">5 min read</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                  <p className="text-sm text-white/90 mb-4">Get weekly insights delivered to your inbox</p>
                </div>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Subscribe Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Author Bio Section */}
        <div className="mt-16 bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About the Author</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {article.author ? article.author.substring(0, 1) : 'A'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{article.author}</h4>
              <p className="text-emerald-600 font-semibold mb-4">Financial Expert & Industry Analyst</p>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Seasoned professional specializing in {article.category.toLowerCase()} and financial guidance within the South African market. 
                With over 8 years of experience in the industry, {article.author} has helped thousands of individuals 
                navigate their financial journeys and make informed decisions.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="#" className="inline-flex items-center px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">LinkedIn</span>
                </a>
                <a href="#" className="inline-flex items-center px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Twitter</span>
                </a>
                <a href="#" className="inline-flex items-center px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-md">
                  <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.593 7.203c-.23-.858-.525-1.201-1.097-1.773-.547-.572-.921-.885-1.774-1.104-1.568-.436-7.935-.437-7.935-.437s-6.359-.002-7.928.434c-.85.219-1.227.531-1.772 1.103-.573.573-.87.917-1.099 1.776-.43 1.566-.436 4.764-.436 4.764s-.004 3.201.435 4.765c.23.857.525 1.2 1.098 1.772.545.572.919.885 1.772 1.103 1.569.436 7.929.437 7.929.437s6.359.002 7.928-.434c.85-.219 1.227-.532 1.773-1.105.548-.57.868-.915 1.096-1.772.437-1.565.436-4.765.436-4.765s.016-3.201-.433-4.764zm-11.736 9.676v-8.288l6.272 4.144-6.272 4.144z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Share Section */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-200 p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share this article</h3>
            <p className="text-gray-600">Found this helpful? Share it with others who might benefit</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href={facebookShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              Facebook
            </a>
            <a 
              href={twitterShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </a>
            <a 
              href={linkedinShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href={whatsappShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp
            </a>
            <CopyLinkButton url={articleUrl} />
          </div>
          
          <div className="flex justify-center gap-4">
            <SaveButton />
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like Article
            </button>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="mt-16">
          <ArticleComments articleSlug={slug} />
        </div>
      </div>

      {/* Related Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Related Financial Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use our calculators and tools to apply the insights from this guide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'SARS Tax Calculator',
                href: '/south-africa-tax-calculator',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
                description: 'Calculate your exact South African tax obligations with our comprehensive calculator',
                category: 'Tax & SARS'
              },
              {
                name: 'Property Transfer Calculator',
                href: '/south-africa-property-transfer-calculator',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
                description: 'Calculate bond costs, transfer duty, and attorney fees for SA property transfers',
                category: 'Property'
              },
              {
                name: 'Retirement Calculator',
                href: '/south-africa-retirement-calculator',
                image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
                description: 'Plan your retirement savings and pension contributions',
                category: 'Investment'
              }
            ].map((tool, index) => (
              <Link key={index} href={tool.href} className="group">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                        {tool.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-medium text-sm">Free Tool</span>
                      <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Continue Reading
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore more insights and expert analysis from our financial guides
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <Link key={relatedArticle.id} href={`/articles/${relatedArticle.slug}`} className="group">
                  <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1">
                    {relatedArticle.featured_image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                            {relatedArticle.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
                        <div className="text-center relative z-10">
                          <svg className="w-12 h-12 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-white/90 text-sm font-medium">Article</span>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-emerald-600 px-3 py-1 text-xs font-bold rounded-full">
                            {relatedArticle.category}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{formatDate(relatedArticle.published_at)}</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {relatedArticle.reading_time} min read
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Stay Ahead with Financial Insights
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 15,000+ South Africans receiving weekly financial insights, guides, and market analysis. 
              No spam, just value.
            </p>
          </div>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-blue-100 font-medium"
                required
              />
              <button
                type="submit"
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Subscribe Free
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Weekly insights
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privacy protected
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Unsubscribe anytime
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <AdSenseAd 
              adSlot="5279468522"
              className="text-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}