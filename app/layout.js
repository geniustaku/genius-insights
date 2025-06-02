import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Genius Insights | Professional Tools for 20+ Countries | CV Builder & Tax Calculators 2025',
  description: 'Professional tools for 20+ countries: CV builder, tax calculators, salary insights & career tools. 750,000+ professionals worldwide.',
  keywords: 'free CV builder global, international tax calculator, multi-country salary calculator, African career tools, CV templates worldwide, tax calculator Nigeria Kenya Ghana, professional tools Africa Europe Asia, global salary insights',
  openGraph: {
    title: 'Genius Insights | Professional Tools for Global Markets',
    description: 'Professional tools for 20+ countries: CV builder, tax calculators, salary insights & career tools. 750,000+ professionals worldwide.',
    url: 'https://genius-insights.co.za',
    type: 'website',
    locale: 'en_US',
    siteName: 'Genius Insights',
    images: [
      {
        url: '/images/genius-insights-global-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Genius Insights - Professional Tools for Global Markets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genius Insights | Professional Tools for Global Markets',
    description: 'Professional tools for 20+ countries: CV builder, tax calculators, salary insights & career tools. 750,000+ professionals worldwide.',
    images: ['/images/genius-insights-global-og.jpg'],
    site: '@geniusinsights_global',
  },
  alternates: {
    canonical: 'https://genius-insights.co.za',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-PWD6J7ZL1E" />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}