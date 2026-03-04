import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FNB Bond Repayment & Loan Calculator 2026 | Free',
  description: 'FNB bond repayment calculator 2026. Calculate FNB home loan, personal loan, vehicle finance & eBucks rewards. Current prime rate & monthly instalments.',
  keywords: [
    'FNB bond repayment calculator',
    'FNB home loan calculator',
    'FNB personal loan calculator',
    'FNB vehicle finance calculator',
    'FNB bond calculator 2026',
    'FNB eBucks calculator',
    'FNB interest rate 2026',
    'FNB affordability calculator',
    'FNB home loan apply online',
    'FNB monthly instalment calculator',
    'bond repayment calculator South Africa',
    'FNB prime rate calculator',
    'FNB student loan calculator',
    'how much can I borrow FNB',
    'FNB fixed deposit rate'
  ],
  alternates: { canonical: '/south-africa-fnb-calculator' },
  openGraph: {
    title: 'FNB Bond Repayment & Loan Calculator 2026',
    description: 'Calculate FNB home loan bond repayment, personal loan instalments, vehicle finance & eBucks rewards with current 2026 rates.',
    url: 'https://www.genius-insights.co.za/south-africa-fnb-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FNB Bond Repayment & Loan Calculator 2026',
    description: 'Calculate FNB home loan, personal loan & vehicle finance repayments with current rates.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
