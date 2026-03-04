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
  title: "Tax Calculator South Africa 2026 | Genius Insights",
  description: "Free SARS tax calculator, PAYE calculator & salary calculator for South Africa. Calculate income tax, property transfer costs & bond repayments. 2026 rates.",
  keywords: "tax calculator south africa, SARS tax calculator, PAYE calculator, salary calculator south africa, income tax calculator south africa, take home pay calculator south africa, how much tax do I pay south africa, property transfer cost calculator, bond calculator south africa, home loan calculator south africa, VAT calculator south africa, UIF calculator, capital gains tax calculator south africa, retirement annuity calculator south africa, SARS tax tables 2026, calculate my salary after tax south africa, property transfer duty calculator, how to calculate PAYE in south africa, cost of buying a house south africa, debt consolidation calculator, personal loan calculator south africa, car finance calculator south africa, TFSA calculator, overtime calculator south africa, payroll calculator south africa, estate duty calculator, rental yield calculator, credit card calculator, eFiling calculator, gross to net salary south africa, financial tools south africa, free online calculator south africa",
  openGraph: {
    title: "Tax Calculator South Africa 2026 | Genius Insights",
    description: "Free SARS tax calculator, PAYE & salary calculators for South Africa. Property transfer, bond & home loan calculators updated with 2026 rates.",
    type: "website",
    siteName: "Genius Insights - South Africa Tax & Financial Calculators",
    locale: "en_ZA",
    images: [
      {
        url: '/images/og-south-africa-platform.jpg',
        width: 1200,
        height: 630,
        alt: 'Genius Insights - Free Tax Calculator South Africa with PAYE, Salary and Property Tools',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Calculator South Africa | Free PAYE & Salary Tools",
    description: "Free SARS tax calculator, PAYE calculator, salary calculator & property transfer tools for South Africa. Updated with 2026 tax tables.",
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
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
        <meta name="google-adsense-account" content="ca-pub-2849262030162416" />
        
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2849262030162416"
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