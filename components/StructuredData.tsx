'use client'

interface StructuredDataProps {
  type: 'homepage' | 'salary-calculator' | 'career-assessment' | 'skills-analyzer' | 'cv-builder' | 'investment-calculator' | 'rental-calculator' | 'business-calculator' | 'fuel-calculator' | 'retirement-calculator' | 'vat-calculator' | 'tax-calculator' | 'loan-calculator' | 'property-transfer-calculator' | 'gst-calculator' | 'sales-tax-calculator' | 'epf-calculator' | 'cpf-calculator' | 'super-calculator' | '401k-calculator' | 'pension-calculator' | 'rrsp-calculator' | 'student-loan-calculator' | 'property-calculator';
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

      case 'cv-builder':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Free CV Builder 2025 | Professional Resume Maker",
          "url": "https://www.genius-insights.co.za/cv-builder",
          "description": "Create stunning professional CVs with our free CV builder. Choose from 15+ beautiful templates, download as PDF instantly.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "15+ professional CV templates",
            "Instant PDF download",
            "ATS-friendly optimization",
            "Mobile responsive builder",
            "Free to use forever",
            "Professional design templates",
            "Easy-to-use interface"
          ]
        };

      case 'investment-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Investment Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-investment-calculator",
          "description": "Calculate investment growth, compound interest, and portfolio returns for South African investments with 2025 rates.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Compound interest calculation",
            "JSE investment tracking",
            "Portfolio growth analysis",
            "TFSA calculations",
            "Offshore investment planning",
            "2025 market rates"
          ]
        };

      case 'rental-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Rental Yield Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-rental-yield-calculator",
          "description": "Calculate rental yields, property ROI, and cash flow analysis for South African property investments.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Gross rental yield calculation",
            "Net rental yield analysis",
            "Cash flow calculation",
            "Property ROI analysis",
            "Investment comparison",
            "2025 market rates"
          ]
        };

      case 'business-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Business Registration Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-business-registration-calculator",
          "description": "Calculate complete business registration costs in South Africa including CIPC fees, SARS registration, and compliance costs.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "CIPC registration fees",
            "SARS registration costs",
            "Annual compliance fees",
            "Entity type comparison",
            "Complete cost breakdown",
            "2025 updated fees"
          ]
        };

      case 'fuel-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Fuel Cost Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-fuel-cost-calculator",
          "description": "Calculate fuel costs, consumption, and trip expenses with current South African petrol and diesel prices.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Current SA fuel prices",
            "Trip cost calculation",
            "Fuel consumption analysis",
            "Petrol vs diesel comparison",
            "Monthly fuel budgeting",
            "Real-time price updates"
          ]
        };

      case 'retirement-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Retirement Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-retirement-calculator",
          "description": "Plan your financial future with comprehensive South African retirement calculator for pension funds and retirement planning.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Pension fund calculation",
            "Retirement annuity planning",
            "Provident fund analysis",
            "Compound growth projection",
            "Tax-efficient planning",
            "2025 contribution limits"
          ]
        };

      case 'vat-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa VAT Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-vat-calculator",
          "description": "Calculate 15% VAT, VAT inclusive/exclusive prices, and VAT registration thresholds for South African businesses.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "15% VAT calculation",
            "VAT inclusive/exclusive pricing",
            "SARS VAT compliance",
            "VAT registration thresholds",
            "Business VAT planning",
            "Invoice VAT calculation"
          ]
        };

      case 'tax-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Tax Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-tax-calculator",
          "description": "Calculate SARS income tax, PAYE, UIF, and SDL with updated 2025/2026 tax year rates and brackets.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "SARS income tax calculation",
            "PAYE calculation",
            "UIF and SDL calculation",
            "2025/2026 tax rates",
            "Tax brackets and rebates",
            "Annual tax planning"
          ]
        };

      case 'loan-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Loan Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-loan-calculator",
          "description": "Calculate home loan affordability, bond payments, and loan costs with current South African interest rates.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Home loan affordability",
            "Bond payment calculation",
            "Interest rate analysis",
            "Deposit requirements",
            "Loan term planning",
            "Monthly payment breakdown"
          ]
        };

      case 'property-transfer-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "South Africa Property Transfer Calculator 2025",
          "url": "https://www.genius-insights.co.za/south-africa-property-transfer-calculator",
          "description": "Calculate property transfer costs including transfer duty, attorney fees, and bond registration costs in South Africa.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Transfer duty calculation",
            "Attorney fees estimation",
            "Bond registration costs",
            "Property purchase costs",
            "First-time buyer benefits",
            "Complete cost breakdown"
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