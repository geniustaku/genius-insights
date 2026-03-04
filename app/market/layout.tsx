import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SA Market Data | JSE, Rand, Interest Rates Live',
  description: 'Live South African market data: JSE All Share index, USD/ZAR exchange rate, SARB repo rate, fuel prices and bank interest rates. Free, updated daily.',
  keywords: [
    'JSE All Share index today', 'USD ZAR exchange rate', 'south africa interest rates', 'SARB repo rate', 'south africa market data', 'rand exchange rate live', 'JSE stock prices', 'south africa fuel prices today', 'bank interest rates south africa', 'prime lending rate SA', 'south africa tax rates 2026', 'gold price ZAR', 'brent crude oil price', 'south africa economic data', 'FNB interest rate', 'ABSA home loan rate', 'Capitec savings rate', 'south africa inflation rate'
  ],
  alternates: {
    canonical: '/market',
  },
  openGraph: {
    title: 'SA Market Data | JSE, Rand Exchange Rate, Interest Rates',
    description: 'Live South African financial data: JSE index, USD/ZAR rate, repo rate, fuel prices, bank rates. Free and updated daily.',
    url: 'https://genius-insights.co.za/market',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Market Data | JSE, Rand, Rates Live',
    description: 'Live SA market data: JSE All Share, USD/ZAR, repo rate, fuel prices, bank interest rates. Free, updated daily.',
  },
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
