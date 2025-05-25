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
  title: "African Career Guidance & Salary Calculator 2025 | Find Your Dream Job in Africa",
  description: "Discover high-paying careers across Africa with our AI-powered career assessment and salary calculator. Get personalized career guidance for South Africa, Nigeria, Kenya, Ghana, Egypt and 13+ African countries. Start your African career journey today!",
  keywords: "African careers 2025, African salary calculator, career guidance Africa, jobs in Africa, South Africa careers, Nigeria jobs, Kenya employment, Ghana career opportunities, Egypt job market, African job search, career assessment Africa, African professionals, tech jobs Africa, finance careers Africa, healthcare jobs Africa",
  openGraph: {
    title: "African Career Guidance & Salary Calculator 2025 | Your Path to Success",
    description: "Transform your career with Africa's #1 career platform. AI-powered assessments, real salary data from 18+ countries, and personalized career roadmaps for African professionals.",
    type: "website",
    siteName: "Genius Insights - African Career Platform",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Career Platform 2025 | Career Assessment & Salary Calculator",
    description: "🚀 Discover your dream career in Africa! AI career assessment + salary data from 18 countries. Start your African success story today.",
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