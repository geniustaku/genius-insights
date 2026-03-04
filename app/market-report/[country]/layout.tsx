import { Metadata } from 'next';

const marketReportCountries: Record<string, { name: string; flag: string }> = {
  'south-africa': { name: 'South Africa', flag: '🇿🇦' },
  'nigeria': { name: 'Nigeria', flag: '🇳🇬' },
  'kenya': { name: 'Kenya', flag: '🇰🇪' },
};

export function generateStaticParams() {
  return Object.keys(marketReportCountries).map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const country = marketReportCountries[resolvedParams.country];

  if (!country) {
    return {
      title: 'Market Report Not Found | Genius Insights',
    };
  }

  const title = `${country.name} Market Report 2026 | Genius Insights`;
  const description = `Live ${country.name} market report with GDP, inflation, exchange rates, and economic indicators. Updated for 2026.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.genius-insights.co.za/market-report/${resolvedParams.country}`,
      type: 'website',
      siteName: 'Genius Insights',
      images: [{
        url: `https://www.genius-insights.co.za/api/og?title=${encodeURIComponent(country.name + ' Market Report')}&subtitle=${encodeURIComponent('GDP • Inflation • Exchange Rates')}`,
        width: 1200,
        height: 630,
      }],
    },
    alternates: {
      canonical: `https://www.genius-insights.co.za/market-report/${resolvedParams.country}`,
    },
  };
}

export default function MarketReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
