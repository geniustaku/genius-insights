import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Providers from '@/components/Providers';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genius Insights | Premium Banking & Insurance Calculators 2025 | Global Financial Tools",
  description: "Premium calculators for Chase Bank, Bank of America, Barclays, HSBC. Compare mortgage rates, life insurance quotes, investment returns. Trusted by 1M+ professionals across 25+ countries with enterprise-grade accuracy.",
  keywords: "mortgage calculator 2025, chase bank rates, bank of america mortgage, barclays mortgage calculator, hsbc global banking, life insurance calculator, insurance quotes comparison, investment calculator, loan calculator, home loan rates, private banking calculator, preferred rewards calculator, mortgage rates comparison, insurance premium calculator, auto insurance quotes, health insurance calculator, retirement planning calculator, 401k calculator, IRA calculator, term life insurance, whole life insurance, disability insurance calculator, property investment calculator, home insurance quotes, car insurance rates, financial planning tools",
  openGraph: {
    title: "Premium Banking & Insurance Calculators 2025 | Genius Insights",
    description: "Compare mortgage rates from Chase, Bank of America, Barclays, HSBC. Get life insurance quotes, calculate investment returns. Trusted by 1M+ professionals worldwide with enterprise-grade financial tools.",
    type: "website",
    siteName: "Genius Insights - Global Professional Platform",
    locale: "en_US",
    images: [
      {
        url: '/images/og-global-platform.jpg',
        width: 1200,
        height: 630,
        alt: 'Genius Insights - Global Professional Tools Platform',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Banking & Insurance Calculators 2025 | Compare Rates",
    description: "💰 Compare Chase, BofA, Barclays, HSBC rates. Life insurance quotes, mortgage calculators, investment tools. Trusted by 1M+ professionals worldwide! 🏦",
    images: ['/images/twitter-global-platform.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.genius-insights.co.za",
    languages: {
      'en-US': '/en-us',
      'en-GB': '/en-gb',
      'en-ZA': '/en-za',
      'en-IN': '/en-in',
      'en-AU': '/en-au',
      'en-CA': '/en-ca',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta tag for Google AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-3259241984391146" />
        
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PWD6J7ZL1E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PWD6J7ZL1E');
          `}
        </Script>
        
        {/* Google Ads Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17042498697"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17042498697');
          `}
        </Script>
        
        {/* Google AdSense Script */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3259241984391146"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}