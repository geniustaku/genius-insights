import type { Metadata } from 'next';
import React from 'react';
import SouthAfricaVATCalculator from '@/components/SouthAfricaVATCalculator';
import StructuredData from '@/components/StructuredData';
import ToolLayout from '@/components/ToolLayout';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'South Africa VAT Calculator 2025 | Free 15% VAT Calculator & SARS Tool',
  description: 'Free South African VAT calculator 2025. Calculate 15% VAT, VAT inclusive/exclusive prices, VAT registration thresholds. SARS compliant tool used by 80,000+ businesses.',
  keywords: [
    'South Africa VAT calculator 2025', 'SA VAT calculator 15%', 'VAT inclusive calculator SA', 'VAT exclusive calculator SA', 'SARS VAT calculator', 'South African VAT rates', 'VAT registration threshold SA', 'business VAT calculator SA', 'SA VAT calculation tool', '15% VAT calculator', 'South Africa VAT compliance', 'VAT invoice calculator SA', 'SARS VAT tool', 'SA value added tax calculator', 'VAT refund calculator SA'
  ],
  alternates: {
    canonical: '/south-africa-vat-calculator',
  },
  openGraph: {
    title: 'South Africa VAT Calculator 2025 | Free 15% VAT Calculator',
    description: '💼 Calculate SA VAT instantly! 15% VAT inclusive/exclusive, registration thresholds, SARS compliant. Free tool for 80,000+ businesses.',
    url: 'https://genius-insights.co.za/south-africa-vat-calculator',
    type: 'website',
    images: [
      {
        url: '/images/sa-vat-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'South Africa VAT Calculator 2025 - 15% VAT Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA VAT Calculator 2025 | Free 15% VAT Tool',
    description: '💼 Calculate South African VAT! 15% VAT inclusive/exclusive, registration info. SARS compliant & free.',
    images: ['/images/sa-vat-calculator-og.jpg'],
  },
};

export default function SouthAfricaVATCalculatorPage() {
  const relatedTools = [
    {
      name: 'SARS Tax Calculator',
      href: '/south-africa-tax-calculator',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate income tax, PAYE, UIF, and SDL with 2025/2026 rates',
      category: 'Tax & SARS'
    },
    {
      name: 'Business Registration Calculator',
      href: '/south-africa-business-registration-calculator',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop&crop=center',
      description: 'Calculate CIPC registration and business setup costs',
      category: 'Business'
    },
    {
      name: 'Retirement Calculator',
      href: '/south-africa-retirement-calculator',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
      description: 'Plan retirement savings and pension contributions',
      category: 'Investment'
    }
  ];

  const relatedArticles = [
    {
      title: 'VAT Registration Guide for SA Businesses',
      href: '/articles/vat-registration-guide-sa',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Complete guide to VAT registration requirements and process',
      category: 'Business',
      readTime: '10 min read'
    },
    {
      title: 'Understanding VAT Returns and Compliance',
      href: '/articles/vat-returns-compliance-sa',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      excerpt: 'How to submit VAT returns and stay compliant with SARS',
      category: 'Business',
      readTime: '8 min read'
    },
    {
      title: 'VAT Zero-Rated vs Exempt Items in SA',
      href: '/articles/vat-zero-rated-exempt-items-sa',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
      excerpt: 'Understanding the difference between zero-rated and exempt items',
      category: 'Business',
      readTime: '6 min read'
    }
  ];

  return (
    <>
      <StructuredData type="vat-calculator" />
      <ToolLayout
        title="VAT Calculator 2025"
        category="Tax & SARS"
        heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop&crop=center"
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        {/* Display Ad 3 - Before Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd 
            adSlot="5341658648"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaVATCalculator />
        </div>

        {/* Display Ad 4 - After Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd 
            adSlot="2386701555"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Multiplex Ad - Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <AdSenseAd 
            adSlot="9985989974"
            adFormat="autorelaxed"
            style={{ display: 'block', minHeight: '280px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>
      </ToolLayout>
    </>
  );
}