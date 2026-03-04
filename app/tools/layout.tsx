import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SA Financial Tools & Calculators 2026',
  description: 'Free online financial calculators for South Africa. SARS tax, VAT, bond, property transfer, fuel cost, solar, investment tools. All updated for 2026.',
  keywords: [
    'South Africa financial calculators',
    'free online calculators SA',
    'SARS tax calculator',
    'South Africa financial tools 2026',
    'SA calculator hub',
    'free calculators South Africa',
    'online financial tools SA',
    'tax tools South Africa',
    'property calculators SA',
    'loan calculators South Africa',
    'investment calculators SA',
    'SA money calculators free'
  ],
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free SA Financial Tools & Calculators 2026',
    description: '35+ free financial calculators for South Africa. SARS tax, VAT, bonds, property, fuel, solar, investments. All updated for 2026 with current rates.',
    url: 'https://genius-insights.co.za/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SA Financial Tools & Calculators 2026',
    description: '35+ free financial calculators for South Africa. SARS tax, VAT, bonds, property, fuel, solar and investment tools.',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
