import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Cheapest Insurance South Africa 2026',
  description: 'Compare insurance quotes side-by-side. Find the cheapest life, car, home & funeral cover from Sanlam, Discovery, Old Mutual, OUTsurance, Santam. Free tool.',
  keywords: [
    'compare insurance South Africa',
    'cheapest insurance South Africa',
    'cheapest car insurance South Africa',
    'cheapest life insurance South Africa',
    'compare insurance quotes SA',
    'insurance comparison tool SA',
    'Sanlam vs Discovery insurance',
    'OUTsurance vs Santam',
    'cheapest funeral cover South Africa',
    'best medical aid South Africa',
    'compare medical aid plans',
    'cheapest home insurance SA',
    'motor insurance comparison',
    'insurance quotes online SA',
    'best insurance company South Africa'
  ],
  alternates: { canonical: '/south-africa-insurance-comparison' },
  openGraph: {
    title: 'Compare Cheapest Insurance South Africa 2026',
    description: 'Find the cheapest insurance in SA. Compare life, car, home & funeral cover quotes from Sanlam, Discovery, Old Mutual, OUTsurance side-by-side.',
    url: 'https://www.genius-insights.co.za/south-africa-insurance-comparison',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Cheapest Insurance South Africa 2026',
    description: 'Compare insurance quotes side-by-side. Find the cheapest cover from top SA insurers.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
