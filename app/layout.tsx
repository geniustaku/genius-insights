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
  title: "Genius Insights | Global Professional Tools for Career Success 2025",
  description: "Trusted by 1M+ professionals worldwide. Build CVs, calculate taxes, plan investments, and advance your career in 25+ countries. Enterprise-grade accuracy for US, UK, India, South Africa, and more.",
  keywords: "global career tools 2025, international tax calculator, CV builder worldwide, salary calculator global, investment calculator, loan calculator, career assessment, professional tools, US tax calculator, UK tax calculator, India tax calculator, South Africa SARS, global careers, international professionals, expat tools, worldwide job search, professional development",
  openGraph: {
    title: "Genius Insights | Professional Tools for Global Careers",
    description: "Transform your career with the world's most trusted professional platform. Used by 1M+ professionals across 25+ countries. Enterprise-grade tools for taxes, CVs, investments, and career planning.",
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
    title: "Global Professional Tools Platform | Genius Insights 2025",
    description: "🌍 Trusted by 1M+ professionals worldwide. Enterprise-grade tools for taxes, CVs, investments across 25+ countries. Start your global career journey!",
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