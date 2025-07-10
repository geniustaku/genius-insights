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
  metadataBase: new URL('https://www.genius-insights.co.za'),
  title: "Genius Insights | South African Financial Tools & Calculators 2025",
  description: "Free South African financial calculators for SARS tax, property transfer, retirement planning, insurance comparison, and more. Updated with latest 2025 rates and regulations for accurate financial planning.",
  keywords: "South Africa tax calculator, SARS calculator, property transfer calculator, retirement calculator SA, financial tools South Africa, VAT calculator, home loan calculator SA, medical aid comparison, SARS eFiling, property transfer duty, Standard Bank calculator, FNB calculator, Capitec calculator, South African insurance comparison, JSE investment calculator",
  openGraph: {
    title: "Genius Insights | South African Financial Tools & Calculators 2025",
    description: "Free SA financial calculators for SARS tax, property transfer, retirement, insurance, and more. Updated with latest 2025 rates and regulations.",
    type: "website",
    siteName: "Genius Insights - South African Financial Platform",
    locale: "en_ZA",
    images: [
      {
        url: '/images/og-south-africa-platform.jpg',
        width: 1200,
        height: 630,
        alt: 'Genius Insights - South African Financial Tools Platform',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South African Financial Tools & Calculators 2025 | Genius Insights",
    description: "🇿🇦 Free SARS tax calculator, property transfer tools, retirement planning, insurance comparison. Updated with latest SA rates! 💰",
    images: ['/images/twitter-south-africa-platform.jpg'],
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
      'en-ZA': '/',
      'en': '/',
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