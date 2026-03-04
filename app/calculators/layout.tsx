import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SA Calculators 2026 | Tax, Property, Loans Free',
  description: 'Free South African financial calculators for 2026. Calculate SARS income tax, property transfer costs, bond repayments, investment returns and more. SARS-compliant.',
  keywords: [
    'South Africa calculators 2026',
    'financial calculators SA free',
    'SARS tax calculator online',
    'property transfer calculator SA',
    'bond repayment calculator',
    'South Africa loan calculator',
    'retirement calculator SA',
    'free SA calculators',
    'online calculators South Africa',
    'investment calculator SA',
    'VAT calculator SA',
    'salary calculator South Africa'
  ],
  alternates: {
    canonical: '/calculators',
  },
  openGraph: {
    title: 'SA Financial Calculators 2026 | Free Online Tools',
    description: 'Free South African financial calculators. SARS tax, property transfer, bond, loan, investment, retirement. All updated for 2026 with current rates.',
    url: 'https://genius-insights.co.za/calculators',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Financial Calculators 2026 | Free Online Tools',
    description: 'Free SA financial calculators. Tax, property, bonds, loans, investments. All updated for 2026.',
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
