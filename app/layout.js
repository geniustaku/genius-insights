import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Genius Insights | South African Career Guidance & Salary Information',
  description: 'Get expert career guidance, South African salary insights, and professional roadmaps tailored for the South African job market.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-PWD6J7ZL1E" />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}