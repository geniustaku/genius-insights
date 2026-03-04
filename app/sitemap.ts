import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.genius-insights.co.za'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/tools',
    '/africa-tools',
    '/calculators',
    '/articles',
    '/guides',
    '/guides/sars-tax-guides',
    '/guides/property-transfer-guides',
    '/document-converter',
    '/cv-builder',
    '/market',
    '/career-assessment',
    '/job-comparison',
    '/skills-analyzer',
    '/privacy',
    '/terms',
  ]

  // All calculators
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
    '/south-africa-vat-calculator',
    '/south-africa-uif-calculator',
    '/south-africa-personal-loan-calculator',
    '/south-africa-car-finance-calculator',
    '/south-africa-overtime-calculator',
    '/south-africa-pension-calculator',
    '/south-africa-tax-refund-calculator',
    '/south-africa-leave-calculator',
    '/south-africa-credit-card-calculator',
    '/south-africa-inflation-calculator',
    '/south-africa-gratuity-calculator',
    '/south-africa-deposit-calculator',
    '/south-africa-tax-calculator',
    '/south-africa-fnb-calculator',
    '/south-africa-standard-bank-calculator',
    '/south-africa-retirement-calculator',
    '/south-africa-fuel-cost-calculator',
    '/south-africa-insurance-calculator',
    '/south-africa-insurance-comparison',
    '/south-africa-business-registration-calculator',
    '/salary-calculator',
    '/germany-vat-calculator',
  ]

  // Country pages (16 countries)
  const countries = [
    '/countries/south-africa',
    '/countries/nigeria',
    '/countries/kenya',
    '/countries/ghana',
    '/countries/united-kingdom',
    '/countries/canada',
    '/countries/united-states',
    '/countries/india',
    '/countries/egypt',
    '/countries/morocco',
    '/countries/australia',
    '/countries/germany',
    '/countries/france',
    '/countries/singapore',
    '/countries/uae',
    '/countries/brazil',
  ]

  // Market report pages
  const marketReports = [
    '/market-report/south-africa',
    '/market-report/nigeria',
    '/market-report/kenya',
  ]

  // Fetch all published articles from Firestore
  let articleSlugs: string[] = []
  let guideSlugs: string[] = []
  try {
    const articlesRef = collection(db, 'articles')
    const q = query(articlesRef, where('is_published', '==', true))
    const snapshot = await getDocs(q)

    snapshot.docs.forEach(doc => {
      const data = doc.data()
      const slug = data.slug
      if (slug) {
        articleSlugs.push(`/articles/${slug}`)
        // Guides use the same articles collection
        guideSlugs.push(`/guides/${slug}`)
      }
    })
    console.log(`Sitemap: Found ${articleSlugs.length} published articles`)
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
    articleSlugs = []
    guideSlugs = []
  }

  const allPages = [
    ...staticPages,
    ...calculators,
    ...countries,
    ...marketReports,
    ...articleSlugs,
    ...guideSlugs,
  ]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(page),
    priority: getPriority(page),
  }))
}

function getChangeFrequency(page: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (page === '') return 'daily'
  if (page.startsWith('/articles')) return 'weekly'
  if (page.startsWith('/market')) return 'weekly'
  if (page === '/privacy' || page === '/terms') return 'yearly'
  return 'monthly'
}

function getPriority(page: string): number {
  // Homepage
  if (page === '') return 1.0

  // Main hub pages
  if (page === '/guides' || page === '/tools' || page === '/calculators') return 0.9

  // High-traffic calculators
  if (
    page === '/south-africa-tax-calculator' ||
    page === '/south-africa-income-tax-calculator' ||
    page === '/south-africa-personal-loan-calculator' ||
    page === '/south-africa-fuel-cost-calculator' ||
    page === '/south-africa-property-transfer-calculator'
  ) return 0.95

  // Guide category pages
  if (page === '/guides/sars-tax-guides' || page === '/guides/property-transfer-guides') return 0.85

  // Calculators
  if (page.includes('-calculator')) return 0.8

  // Articles & individual guides
  if (page.startsWith('/articles/') || page.startsWith('/guides/')) return 0.7

  // Country pages
  if (page.startsWith('/countries/')) return 0.6

  // Market reports
  if (page.startsWith('/market-report/')) return 0.6

  // Privacy/Terms
  if (page === '/privacy' || page === '/terms') return 0.3

  // Other pages
  return 0.6
}
