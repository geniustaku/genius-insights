import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Germany VAT Calculator 2026 | 19% Mehrwertsteuer',
  description: 'Free Germany VAT calculator. Calculate 19% and 7% Mehrwertsteuer (MwSt) instantly. Add or remove German VAT for invoices, pricing and business compliance.',
  keywords: ['Germany VAT calculator', 'Mehrwertsteuer calculator', 'MwSt Rechner', '19% VAT Germany', '7% reduced VAT Germany', 'German tax calculator', 'Umsatzsteuer calculator', 'Germany VAT rates 2026', 'calculate German VAT online', 'add remove VAT Germany'],
  alternates: { canonical: '/germany-vat-calculator' },
  openGraph: {
    title: 'Germany VAT Calculator 2026 | 19% Mehrwertsteuer',
    description: 'Free German VAT (Mehrwertsteuer) calculator. Calculate 19% standard and 7% reduced VAT rates instantly for invoices and pricing.',
    url: 'https://www.genius-insights.co.za/germany-vat-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Germany VAT Calculator | 19% Mehrwertsteuer',
    description: 'Free German VAT calculator. Calculate 19% and 7% Mehrwertsteuer instantly for invoices and business.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
