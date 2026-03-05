interface FAQ {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'homepage' | 'salary-calculator' | 'career-assessment' | 'skills-analyzer' | 'cv-builder' | 'investment-calculator' | 'rental-calculator' | 'business-calculator' | 'fuel-calculator' | 'retirement-calculator' | 'vat-calculator' | 'tax-calculator' | 'loan-calculator' | 'property-transfer-calculator' | 'gst-calculator' | 'sales-tax-calculator' | 'epf-calculator' | 'cpf-calculator' | 'super-calculator' | '401k-calculator' | 'pension-calculator' | 'rrsp-calculator' | 'student-loan-calculator' | 'property-calculator';
  faqs?: FAQ[];
  breadcrumbs?: BreadcrumbItem[];
}

export default function StructuredData({ type, faqs, breadcrumbs }: StructuredDataProps) {
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
          "name": "Genius Insights - South Africa Tax & Financial Calculators",
          "url": "https://www.genius-insights.co.za",
          "description": "Free tax calculator South Africa, SARS PAYE calculator, salary calculator, income tax calculator, property transfer cost calculator, bond calculator with 2026 rates.",
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
          "name": "South Africa Salary Calculator 2026",
          "url": "https://www.genius-insights.co.za/salary-calculator",
          "description": "Free salary calculator for South Africa with PAYE, UIF and SDL deductions. Calculate take-home pay with 2026 rates.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": [
            "Salary calculation for 18+ African countries",
            "Real-time 2026 market data",
            "Industry-specific salary ranges",
            "Experience level adjustments",
            "Education impact analysis"
          ]
        };

      case 'career-assessment':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Free Career Assessment Test South Africa 2026",
          "url": "https://www.genius-insights.co.za/career-assessment",
          "description": "AI-powered career assessment test for finding your ideal career path in South Africa",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": [
            "AI-powered career matching",
            "Personality assessment",
            "South African market insights",
            "Career recommendations",
            "Education pathway guidance"
          ]
        };

      case 'skills-analyzer':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Free Skills Gap Analyzer South Africa 2026",
          "url": "https://www.genius-insights.co.za/skills-analyzer",
          "description": "AI-powered skills gap analysis and career readiness assessment for South African job markets",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": [
            "AI-powered skills gap analysis",
            "Career readiness assessment",
            "Personalized learning recommendations",
            "South African market focus",
            "Industry-specific skill requirements"
          ]
        };

      case 'cv-builder':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Free CV Builder South Africa 2026",
          "url": "https://www.genius-insights.co.za/cv-builder",
          "description": "Create professional CVs with our free CV builder. Choose from 15+ templates, download as PDF instantly. No sign up required.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": [
            "15+ professional CV templates",
            "Instant PDF download",
            "ATS-friendly optimization",
            "Mobile responsive builder",
            "Free to use, no sign up"
          ]
        };

      case 'investment-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Compound Interest & Investment Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-investment-calculator",
          "description": "Calculate compound interest, investment growth and portfolio returns for South African investments with 2026 rates.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["Compound interest calculation", "JSE investment tracking", "Portfolio growth analysis", "TFSA calculations", "2026 market rates"]
        };

      case 'rental-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Rental Yield Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-rental-yield-calculator",
          "description": "Calculate rental yields, property ROI and buy-to-let returns for South African property investments.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["Gross rental yield calculation", "Net rental yield analysis", "Cash flow calculation", "Property ROI analysis", "2026 market rates"]
        };

      case 'business-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "CIPC Business Registration Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-business-registration-calculator",
          "description": "Calculate CIPC company registration costs for Pty Ltd, CC and sole proprietor in South Africa.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["CIPC registration fees", "SARS registration costs", "Annual compliance fees", "Entity type comparison", "2026 updated fees"]
        };

      case 'fuel-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Petrol & Diesel Cost Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-fuel-cost-calculator",
          "description": "Calculate fuel costs, consumption and trip expenses with current South African petrol and diesel prices.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["Current SA fuel prices", "Trip cost calculation", "Fuel consumption analysis", "Petrol vs diesel comparison", "Monthly fuel budgeting"]
        };

      case 'retirement-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Retirement Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-retirement-calculator",
          "description": "How much do I need to retire in South Africa? Plan with pension fund, retirement annuity and two-pot system projections.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["Pension fund calculation", "Retirement annuity planning", "Two-pot system projections", "Compound growth projection", "Tax-efficient planning"]
        };

      case 'vat-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "VAT Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-vat-calculator",
          "description": "Add or remove 15% VAT. Calculate VAT inclusive and exclusive prices for South African businesses.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["15% VAT calculation", "Add or remove VAT", "SARS VAT compliance", "VAT registration thresholds", "Invoice VAT calculation"]
        };

      case 'tax-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "SARS Tax Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-tax-calculator",
          "description": "Calculate SARS income tax, PAYE, UIF and SDL with 2026/2027 tax year rates and brackets.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["SARS income tax calculation", "PAYE calculation", "UIF and SDL calculation", "2026/2027 tax rates", "Tax brackets and rebates"]
        };

      case 'loan-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Home Loan Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-loan-calculator",
          "description": "Calculate home loan affordability, bond repayments and loan costs with current South African interest rates.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["Home loan affordability", "Bond repayment calculation", "Interest rate analysis", "Deposit requirements", "Monthly payment breakdown"]
        };

      case 'property-transfer-calculator':
        return {
          ...baseData,
          "@type": "WebApplication",
          "name": "Transfer Cost Calculator South Africa 2026",
          "url": "https://www.genius-insights.co.za/south-africa-property-transfer-calculator",
          "description": "Calculate transfer costs when buying a house: transfer duty, conveyancing fees and bond registration costs.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
          "featureList": ["Transfer duty calculation", "Conveyancing fees", "Bond registration costs", "Property purchase costs", "First-time buyer benefits"]
        };

      default:
        return baseData;
    }
  };

  const getFAQSchema = (faqItems: FAQ[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const getBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }}
        />
      )}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
        />
      )}
    </>
  );
}
