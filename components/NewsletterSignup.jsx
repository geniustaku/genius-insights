// components/NewsletterSignup.jsx
'use client'
import { useState } from 'react';

export default function NewsletterSignup({ 
  variant = 'standard', // 'standard', 'compact', 'sidebar', 'popup'
  title = 'Get Career Updates',
  description = 'Subscribe for the latest African salary trends, job opportunities, and career advice.',
  leadMagnet = {
    enabled: true,
    title: '2025 African Salary Guide',
    description: 'Complete salary data for top jobs across major African economies.'
  }
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [countryInterest, setCountryInterest] = useState('');
  const [industryInterest, setIndustryInterest] = useState('');
  const [status, setStatus] = useState('');
  const [showExtendedForm, setShowExtendedForm] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const formData = {
        email,
        name: name || undefined,
        countryInterest: countryInterest || undefined,
        industryInterest: industryInterest || undefined,
        source: 'newsletter_signup',
        leadMagnetRequested: leadMagnet.enabled
      };
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setStatus('success');
        
        // If the subscription included a lead magnet, track the conversion
        if (leadMagnet.enabled && data.downloadUrl) {
          // Trigger download or redirect to download page
          window.open(data.downloadUrl, '_blank');
          
          // Track conversion for analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'lead_magnet_download', {
              'event_category': 'lead_generation',
              'event_label': leadMagnet.title
            });
          }
        }
      } else {
        setStatus('error');
        const errorData = await response.json();
        console.error('Subscription error:', errorData);
      }
    } catch (error) {
      setStatus('error');
      console.error('Subscription error:', error);
    }
  };
  
  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('invalid-email');
      return;
    }
    setShowExtendedForm(true);
    setStatus('');
  };
  
  // Industry options
  const industries = [
    { value: '', label: 'Select Industry Interest' },
    { value: 'tech', label: 'Technology & IT' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'education', label: 'Education & Academia' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'construction', label: 'Construction & Real Estate' },
    { value: 'agriculture', label: 'Agriculture & Farming' }
  ];
  
  // Country options
  const countries = [
    { value: '', label: 'Select Country Interest' },
    { value: 'south-africa', label: 'South Africa' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'egypt', label: 'Egypt' },
    { value: 'ethiopia', label: 'Ethiopia' },
    { value: 'tanzania', label: 'Tanzania' },
    { value: 'all', label: 'All African Countries' }
  ];
  
  // Basic signup form (first step)
  const initialForm = (
    <form onSubmit={handleInitialSubmit} className="w-full">
      <div className={`flex ${variant === 'compact' ? 'flex-row' : 'flex-col sm:flex-row'} gap-2`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="px-4 py-2 rounded border flex-grow"
          required
        />
        <button 
          type="submit" 
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Processing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'invalid-email' && (
        <p className="text-red-600 mt-2 text-sm">Please enter a valid email address.</p>
      )}
    </form>
  );
  
  // Extended form (second step)
  const extendedForm = (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Name (Optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="px-4 py-2 rounded border w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-1">Country Interest</label>
          <select
            value={countryInterest}
            onChange={(e) => setCountryInterest(e.target.value)}
            className="px-4 py-2 rounded border w-full"
          >
            {countries.map(country => (
              <option key={country.value} value={country.value}>{country.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm mb-1">Industry Interest</label>
          <select
            value={industryInterest}
            onChange={(e) => setIndustryInterest(e.target.value)}
            className="px-4 py-2 rounded border w-full"
          >
            {industries.map(industry => (
              <option key={industry.value} value={industry.value}>{industry.label}</option>
            ))}
          </select>
        </div>
        
        {leadMagnet.enabled && (
          <div className="bg-blue-50 p-3 rounded flex items-start">
            <div className="flex-shrink-0 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H7a1 1 0 110-2h7.586l-3.293-3.293A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm">
              <span className="font-semibold block">{leadMagnet.title}</span>
              <span className="text-gray-600">{leadMagnet.description}</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-2">
          <button 
            type="submit" 
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Processing...' : 'Complete Subscription'}
          </button>
        </div>
      </div>
    </form>
  );
  
  // Success message
  const successMessage = (
    <div className="text-center py-3">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Thanks for subscribing!</h3>
      <p className="text-gray-600">
        {leadMagnet.enabled ? 
          'Your download is starting and you will receive updates in your inbox.' :
          'You\'ll receive career updates in your inbox'}
      </p>
      {leadMagnet.enabled && (
        <p className="mt-4 text-sm">
          <a href="/downloads" className="text-blue-600 hover:underline">
            Didn't get your download? Click here.
          </a>
        </p>
      )}
    </div>
  );
  
  // Error message
  const errorMessage = (
    <div className="text-center py-3">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Something went wrong!</h3>
      <p className="text-gray-600 mb-4">Please try again or contact support if the issue persists.</p>
      <button
        onClick={() => setStatus('')}
        className="text-blue-600 hover:underline"
      >
        Try Again
      </button>
    </div>
  );
  
  // Determine container styles based on variant
  let containerClasses = 'p-6 rounded-lg';
  if (variant === 'standard') {
    containerClasses += ' bg-blue-50';
  } else if (variant === 'sidebar') {
    containerClasses += ' bg-gray-50 border';
  } else if (variant === 'popup') {
    containerClasses += ' bg-white shadow-xl border';
  } else if (variant === 'compact') {
    containerClasses += ' bg-white border p-4';
  }
  
  return (
    <div className={containerClasses}>
      {status !== 'success' && status !== 'error' && (
        <>
          <h3 className={`font-bold mb-2 ${variant === 'compact' ? 'text-lg' : 'text-xl'}`}>{title}</h3>
          <p className={`mb-4 ${variant === 'compact' ? 'text-sm' : ''}`}>{description}</p>
        </>
      )}
      
      {status === 'success' && successMessage}
      {status === 'error' && errorMessage}
      {status !== 'success' && status !== 'error' && !showExtendedForm && initialForm}
      {status !== 'success' && status !== 'error' && showExtendedForm && extendedForm}
      
      {status !== 'success' && status !== 'error' && (
        <p className="text-xs text-gray-500 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      )}
    </div>
  );
}