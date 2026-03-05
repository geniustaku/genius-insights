import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Standard Bank Bond & Loan Calculator 2026 | Free',
  description: 'Standard Bank home loan bond calculator 2026. Calculate bond repayment, personal loan, vehicle finance & fixed deposit rates. Free monthly instalment tool.',
  keywords: [
    'Standard Bank home loan calculator',
    'Standard Bank bond repayment calculator',
    'Standard Bank personal loan calculator',
    'Standard Bank vehicle finance calculator',
    'Standard Bank interest rate 2026',
    'Standard Bank bond calculator',
    'Standard Bank loan rates',
    'Standard Bank fixed deposit rates',
    'Standard Bank affordability calculator',
    'Standard Bank home loan apply',
    'how much can I borrow Standard Bank',
    'Standard Bank monthly instalment',
    'Standard Bank PureSave interest rate',
    'bond calculator South Africa'
  ],
  alternates: { canonical: '/south-africa-standard-bank-calculator' },
  openGraph: {
    title: 'Standard Bank Bond & Loan Calculator 2026',
    description: 'Calculate Standard Bank home loan bond repayment, personal loan & vehicle finance instalments with current 2026 rates.',
    url: 'https://www.genius-insights.co.za/south-africa-standard-bank-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Standard+Bank+Bond+%26+Loan+Calculator+2026&subtitle=Home+Loan+Personal+Loan+and+Vehicle+Finance',
        width: 1200,
        height: 630,
        alt: 'Standard Bank Bond & Loan Calculator 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Standard Bank Bond & Loan Calculator 2026',
    description: 'Calculate Standard Bank bond repayment & loan instalments with current rates.',
    images: ['/api/og?title=Standard+Bank+Bond+%26+Loan+Calculator+2026&subtitle=Home+Loan+Personal+Loan+and+Vehicle+Finance'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
