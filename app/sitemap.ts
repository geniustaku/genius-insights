import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.genius-insights.co.za'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/tools',
    '/calculators',
    '/articles',
    '/guides',
    '/guides/sars-tax-guides',
    '/guides/property-transfer-guides',
  ]

  // Calculators
  const calculators = [
    '/south-africa-income-tax-calculator',
    '/south-africa-property-transfer-calculator',
    '/south-africa-rental-yield-calculator',
    '/south-africa-loan-calculator',
    '/south-africa-investment-calculator',
    '/south-africa-capital-gains-tax-calculator',
    '/south-africa-solar-loadshedding-calculator',
    '/south-africa-capitec-calculator',
    '/south-africa-crypto-tax-calculator',
    '/south-africa-debt-consolidation-calculator',
    '/south-africa-freelancer-provisional-tax-calculator',
    '/south-africa-payroll-calculator',
    '/south-africa-estate-duty-calculator',
    '/south-africa-tfsa-calculator',
    '/south-africa-bond-calculator',
    '/south-africa-vat-calculator-2025',
    '/south-africa-uif-calculator',
    '/south-africa-personal-loan-calculator',
    '/south-africa-car-finance-calculator',
  ]

  // SARS Articles
  const sarsArticles = [
    '/articles/sars-efiling-registration-guide',
    '/articles/how-to-submit-tax-returns-sars-efiling',
    '/articles/sars-provisional-tax-guide-self-employed',
    '/articles/south-africa-income-tax-deductions-guide',
    '/articles/track-sars-tax-refund-guide',
    '/articles/sars-tax-clearance-certificate-guide',
  ]

  // Property Articles
  const propertyArticles = [
    '/articles/complete-property-transfer-guide-south-africa-2025',
    '/articles/property-transfer-costs-south-africa-2025-breakdown',
    '/articles/first-time-home-buyer-guide-south-africa-2025',
    '/articles/how-to-choose-property-transfer-attorney-south-africa',
    '/articles/transfer-duty-calculator-guide-south-africa',
    '/articles/property-transfer-timeline-south-africa',
    '/articles/selling-property-south-africa-complete-guide',
    '/articles/bond-registration-vs-property-transfer-explained',
    '/articles/property-transfer-documents-checklist-south-africa',
    '/articles/buying-property-deceased-estate-south-africa',
  ]

  const allPages = [
    ...staticPages,
    ...calculators,
    ...sarsArticles,
    ...propertyArticles,
  ]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page.startsWith('/articles') ? 'weekly' : 'monthly',
    priority: getPriority(page),
  }))
}

function getPriority(page: string): number {
  // Homepage
  if (page === '') return 1.0

  // Main guides and calculator pages
  if (page === '/guides' || page === '/tools' || page === '/calculators') return 0.9

  // Guide category pages
  if (page.startsWith('/guides/')) return 0.8

  // Calculators
  if (page.includes('-calculator')) return 0.8

  // Articles
  if (page.startsWith('/articles/')) return 0.7

  // Other pages
  return 0.6
}
