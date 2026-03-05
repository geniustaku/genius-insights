import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insurance Premium Calculator SA 2026 | Get Quotes',
  description: 'Calculate insurance premiums in South Africa. Compare life, car, home & funeral cover quotes from Sanlam, Discovery, Old Mutual, OUTsurance. Free 2026 tool.',
  keywords: [
    'insurance calculator South Africa',
    'life insurance quote SA',
    'car insurance calculator South Africa',
    'cheapest car insurance South Africa',
    'home insurance quote SA',
    'funeral cover calculator',
    'medical aid calculator South Africa',
    'Sanlam life insurance quote',
    'Discovery insurance quote',
    'OUTsurance car insurance quote',
    'Old Mutual life cover',
    'compare insurance quotes SA',
    'disability insurance calculator',
    'insurance premium calculator',
    'short-term insurance quote SA'
  ],
  alternates: { canonical: '/south-africa-insurance-calculator' },
  openGraph: {
    title: 'Insurance Premium Calculator South Africa 2026',
    description: 'Get insurance quotes for life, car, home & funeral cover. Compare Sanlam, Discovery, Old Mutual, OUTsurance premiums.',
    url: 'https://www.genius-insights.co.za/south-africa-insurance-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Insurance+Premium+Calculator+SA+2026&subtitle=Compare+Life+Car+Home+and+Funeral+Cover+Quotes',
        width: 1200,
        height: 630,
        alt: 'Insurance Premium Calculator South Africa 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Premium Calculator South Africa 2026',
    description: 'Compare life, car, home & funeral cover quotes from top SA insurers.',
    images: ['/api/og?title=Insurance+Premium+Calculator+SA+2026&subtitle=Compare+Life+Car+Home+and+Funeral+Cover+Quotes'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
