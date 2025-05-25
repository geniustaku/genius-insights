'use client'

interface StructuredDataProps {
  type: 'homepage' | 'salary-calculator' | 'career-assessment' | 'skills-analyzer';
}

export default function StructuredData({ type }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "publisher": {
        "@type": "Organization",
        "name": "Genius Insights",
        "url": "https://www.genius-insights.co.za",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.genius-insights.co.za/logo.png"
        }
      }
    };

    switch (type) {
      case 'homepage':
        return {
          ...baseData,
          "@type": "WebSite",
          "name": "Genius Insights - African Career Platform",
          "url": "https://www.genius-insights.co.za",
          "description": "African career guidance platform with AI-powered career assessment and salary calculator for 18+ African countries",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.genius-insights.co.za/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://www.linkedin.com/company/genius-insights-africa",
            "https://twitter.com/geniusinsights_za",
            "https://www.facebook.com/geniusinsightsafrica"
          ]
        };

      case 'salary-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "African Salary Calculator 2025",
          "url": "https://www.genius-insights.co.za/salary-calculator",
          "description": "Free salary calculator for 18 African countries with real 2025 market data",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Salary calculation for 18+ African countries",
            "Real-time 2025 market data",
            "Industry-specific salary ranges",
            "Experience level adjustments",
            "Education impact analysis"
          ]
        };

      case 'career-assessment':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "African Career Assessment Test 2025",
          "url": "https://www.genius-insights.co.za/career-assessment",
          "description": "AI-powered career assessment test for finding your ideal career path in Africa",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "AI-powered career matching",
            "Personality assessment",
            "African market insights",
            "Career recommendations for 18+ countries",
            "Education pathway guidance"
          ]
        };

      case 'skills-analyzer':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "African Skills Analyzer 2025",
          "url": "https://www.genius-insights.co.za/skills-analyzer",
          "description": "AI-powered skills gap analysis and career readiness assessment for African job markets",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "AI-powered skills gap analysis",
            "Career readiness assessment",
            "Personalized learning recommendations",
            "African market focus",
            "Skills marketplace integration",
            "Industry-specific skill requirements",
            "Learning pathway guidance"
          ]
        };

      default:
        return baseData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}