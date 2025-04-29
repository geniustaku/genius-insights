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
  title: "Career Compass | South African & African Career Guidance & Salary Tools",
  description: "Comprehensive career guidance platform tailored for South Africa and Africa, offering local job market analytics, accurate salary calculator for African markets, detailed job analysis, and personalized career path recommendations for African professionals.",
  keywords: "South Africa career guidance, African job market, South African salary calculator, job opportunities Africa, career development South Africa, professional growth Africa, Johannesburg jobs, Cape Town employment, African job analysis, African salary insights, Pretoria careers, Durban job market",
  openGraph: {
    title: "Career Compass | South African & African Career Guidance Platform",
    description: "Discover optimal career paths in South Africa and across Africa with our specialized job market analytics, region-specific salary calculator, and localized career guidance tools.",
    type: "website",
    siteName: "Career Compass Africa",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Compass | South African & African Career Guidance",
    description: "Find your perfect career path in South Africa and across the African continent with our comprehensive job analysis and locally-calibrated salary tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://career.co.za",
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