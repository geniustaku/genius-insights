'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Country configurations with local data
const countryConfigs = {
  'south-africa': {
    name: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    currencySymbol: 'R',
    taxYear: '2025/2026',
    vatRate: 15,
    minWage: 27.58,
    averageSalary: 25000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker with SA templates' },
      { name: 'Tax Calculator', link: '/south-africa-tax-calculator', icon: '🧮', description: 'SARS-compliant tax calculator' },
      { name: 'Loan Calculator', link: '/south-africa-loan-calculator', icon: '🏠', description: 'Home loan and bond calculator' },
      { name: 'VAT Calculator', link: '/south-africa-vat-calculator', icon: '💼', description: '15% VAT calculations' },
      { name: 'Property Transfer', link: '/south-africa-property-transfer-calculator', icon: '📋', description: 'Transfer duty calculator' },
      { name: 'Retirement Planning', link: '/south-africa-retirement-calculator', icon: '🏦', description: 'Pension and RA calculator' },
      { name: 'Investment Calculator', link: '/south-africa-investment-calculator', icon: '📈', description: 'JSE and offshore investments' },
      { name: 'Fuel Cost Calculator', link: '/south-africa-fuel-cost-calculator', icon: '⛽', description: 'Petrol and diesel costs' },
      { name: 'Business Registration', link: '/south-africa-business-registration-calculator', icon: '🏢', description: 'CIPC registration costs' },
      { name: 'Rental Yield Calculator', link: '/south-africa-rental-yield-calculator', icon: '🏠', description: 'Property investment ROI' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'SA salary insights' },
    ],
    keyStats: [
      { label: 'Population', value: '60.4M', icon: '👥' },
      { label: 'GDP Growth', value: '0.7%', icon: '📊' },
      { label: 'Unemployment', value: '32.1%', icon: '📉' },
      { label: 'Inflation', value: '5.1%', icon: '💹' },
    ],
    seoTitle: 'South Africa Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for South Africa: SARS tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by 400,000+ South Africans.',
  },
  'nigeria': {
    name: 'Nigeria',
    flag: '🇳🇬',
    currency: 'NGN',
    currencySymbol: '₦',
    taxYear: '2025',
    vatRate: 7.5,
    minWage: 70000,
    averageSalary: 150000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Nigerian market' },
      { name: 'Tax Calculator', link: '/nigeria-tax-calculator', icon: '🧮', description: 'Nigerian tax calculations' },
      { name: 'Loan Calculator', link: '/nigeria-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/nigeria-vat-calculator', icon: '💼', description: '7.5% VAT calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'Nigerian salary insights' },
      { name: 'Business Calculator', link: '/nigeria-business-calculator', icon: '🏢', description: 'CAC registration costs' },
      { name: 'Investment Calculator', link: '/nigeria-investment-calculator', icon: '📈', description: 'NSE investments' },
      { name: 'Property Calculator', link: '/nigeria-property-calculator', icon: '🏠', description: 'Real estate planning' },
    ],
    keyStats: [
      { label: 'Population', value: '218M', icon: '👥' },
      { label: 'GDP Growth', value: '3.2%', icon: '📊' },
      { label: 'Unemployment', value: '33.3%', icon: '📉' },
      { label: 'Inflation', value: '28.2%', icon: '💹' },
    ],
    seoTitle: 'Nigeria Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Nigeria: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Nigerian professionals.',
  },
  'kenya': {
    name: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    currencySymbol: 'KSh',
    taxYear: '2025',
    vatRate: 16,
    minWage: 15000,
    averageSalary: 50000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Kenyan market' },
      { name: 'Tax Calculator', link: '/kenya-tax-calculator', icon: '🧮', description: 'KRA tax calculations' },
      { name: 'Loan Calculator', link: '/kenya-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/kenya-vat-calculator', icon: '💼', description: '16% VAT calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'Kenyan salary insights' },
      { name: 'Investment Calculator', link: '/kenya-investment-calculator', icon: '📈', description: 'NSE investments' },
    ],
    keyStats: [
      { label: 'Population', value: '54.0M', icon: '👥' },
      { label: 'GDP Growth', value: '5.0%', icon: '📊' },
      { label: 'Unemployment', value: '5.7%', icon: '📉' },
      { label: 'Inflation', value: '6.8%', icon: '💹' },
    ],
    seoTitle: 'Kenya Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Kenya: KRA tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Kenyan professionals.',
  },
  'ghana': {
    name: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    currencySymbol: '₵',
    taxYear: '2025',
    vatRate: 12.5,
    minWage: 14.88,
    averageSalary: 2000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Ghanaian market' },
      { name: 'Tax Calculator', link: '/ghana-tax-calculator', icon: '🧮', description: 'GRA tax calculations' },
      { name: 'Loan Calculator', link: '/ghana-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/ghana-vat-calculator', icon: '💼', description: '12.5% VAT calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'Ghanaian salary insights' },
    ],
    keyStats: [
      { label: 'Population', value: '32.8M', icon: '👥' },
      { label: 'GDP Growth', value: '3.8%', icon: '📊' },
      { label: 'Unemployment', value: '4.7%', icon: '📉' },
      { label: 'Inflation', value: '23.2%', icon: '💹' },
    ],
    seoTitle: 'Ghana Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Ghana: GRA tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Ghanaian professionals.',
  },
  'united-kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    taxYear: '2024/2025',
    vatRate: 20,
    minWage: 11.44,
    averageSalary: 35000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for UK market' },
      { name: 'Tax Calculator', link: '/uk-tax-calculator', icon: '🧮', description: 'HMRC tax calculations' },
      { name: 'Loan Calculator', link: '/uk-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/uk-vat-calculator', icon: '💼', description: '20% VAT calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'UK salary insights' },
      { name: 'Pension Calculator', link: '/uk-pension-calculator', icon: '🏦', description: 'UK pension planning' },
      { name: 'Investment Calculator', link: '/uk-investment-calculator', icon: '📈', description: 'ISA and investments' },
      { name: 'Property Calculator', link: '/uk-property-calculator', icon: '🏠', description: 'Stamp duty calculator' },
    ],
    keyStats: [
      { label: 'Population', value: '67.5M', icon: '👥' },
      { label: 'GDP Growth', value: '1.1%', icon: '📊' },
      { label: 'Unemployment', value: '3.8%', icon: '📉' },
      { label: 'Inflation', value: '4.0%', icon: '💹' },
    ],
    seoTitle: 'UK Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for UK: HMRC tax calculator, CV builder, mortgage calculator, VAT tools & more. Trusted by British professionals.',
  },
  'canada': {
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
    taxYear: '2025',
    vatRate: 13, // HST average
    minWage: 16.65,
    averageSalary: 55000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Canadian market' },
      { name: 'Tax Calculator', link: '/canada-tax-calculator', icon: '🧮', description: 'CRA tax calculations' },
      { name: 'Loan Calculator', link: '/canada-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'GST/HST Calculator', link: '/canada-gst-calculator', icon: '💼', description: 'GST/HST calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'Canadian salary insights' },
      { name: 'RRSP Calculator', link: '/canada-rrsp-calculator', icon: '🏦', description: 'Retirement planning' },
      { name: 'Investment Calculator', link: '/canada-investment-calculator', icon: '📈', description: 'TFSA and investments' },
    ],
    keyStats: [
      { label: 'Population', value: '39.0M', icon: '👥' },
      { label: 'GDP Growth', value: '1.2%', icon: '📊' },
      { label: 'Unemployment', value: '5.2%', icon: '📉' },
      { label: 'Inflation', value: '2.8%', icon: '💹' },
    ],
    seoTitle: 'Canada Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Canada: CRA tax calculator, CV builder, mortgage calculator, GST tools & more. Trusted by Canadian professionals.',
  },
  'united-states': {
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    taxYear: '2025',
    vatRate: 8.5, // Average sales tax
    minWage: 7.25,
    averageSalary: 65000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional resume maker for US market' },
      { name: 'Tax Calculator', link: '/us-tax-calculator', icon: '🧮', description: 'IRS tax calculations' },
      { name: 'Loan Calculator', link: '/us-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'Sales Tax Calculator', link: '/us-sales-tax-calculator', icon: '💼', description: 'State sales tax calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'US salary insights' },
      { name: '401k Calculator', link: '/us-401k-calculator', icon: '🏦', description: 'Retirement planning' },
      { name: 'Investment Calculator', link: '/us-investment-calculator', icon: '📈', description: 'Stock market investments' },
      { name: 'Property Calculator', link: '/us-property-calculator', icon: '🏠', description: 'Real estate planning' },
      { name: 'Student Loan Calculator', link: '/us-student-loan-calculator', icon: '🎓', description: 'Education loan planning' },
    ],
    keyStats: [
      { label: 'Population', value: '334M', icon: '👥' },
      { label: 'GDP Growth', value: '2.1%', icon: '📊' },
      { label: 'Unemployment', value: '3.7%', icon: '📉' },
      { label: 'Inflation', value: '3.2%', icon: '💹' },
    ],
    seoTitle: 'US Professional Tools | Tax Calculator, Resume Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for USA: IRS tax calculator, resume builder, mortgage calculator, 401k tools & more. Trusted by American professionals.',
  },
  'india': {
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    currencySymbol: '₹',
    taxYear: '2024-25',
    vatRate: 18, // GST
    minWage: 178,
    averageSalary: 50000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Indian market' },
      { name: 'Tax Calculator', link: '/india-tax-calculator', icon: '🧮', description: 'Income tax calculations' },
      { name: 'Loan Calculator', link: '/india-loan-calculator', icon: '🏠', description: 'Home loan and EMI calculator' },
      { name: 'GST Calculator', link: '/india-gst-calculator', icon: '💼', description: '18% GST calculations' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'Indian salary insights' },
      { name: 'EPF Calculator', link: '/india-epf-calculator', icon: '🏦', description: 'Provident fund calculator' },
      { name: 'Investment Calculator', link: '/india-investment-calculator', icon: '📈', description: 'SIP and mutual funds' },
    ],
    keyStats: [
      { label: 'Population', value: '1.42B', icon: '👥' },
      { label: 'GDP Growth', value: '6.7%', icon: '📊' },
      { label: 'Unemployment', value: '3.2%', icon: '📉' },
      { label: 'Inflation', value: '5.4%', icon: '💹' },
    ],
    seoTitle: 'India Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for India: Income tax calculator, CV builder, loan calculator, GST tools & more. Trusted by Indian professionals.',
  },
  'egypt': {
    name: 'Egypt',
    flag: '🇪🇬',
    currency: 'EGP',
    currencySymbol: 'E£',
    taxYear: '2025',
    vatRate: 14,
    minWage: 3500,
    averageSalary: 15000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Egyptian market' },
      { name: 'Tax Calculator', link: '/egypt-tax-calculator', icon: '🧮', description: 'Egyptian tax calculations' },
      { name: 'Loan Calculator', link: '/egypt-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/egypt-vat-calculator', icon: '💼', description: '14% VAT calculations' },
    ],
    keyStats: [
      { label: 'Population', value: '104M', icon: '👥' },
      { label: 'GDP Growth', value: '4.2%', icon: '📊' },
      { label: 'Unemployment', value: '7.4%', icon: '📉' },
      { label: 'Inflation', value: '25.8%', icon: '💹' },
    ],
    seoTitle: 'Egypt Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Egypt: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Egyptian professionals.',
  },
  'morocco': {
    name: 'Morocco',
    flag: '🇲🇦',
    currency: 'MAD',
    currencySymbol: 'DH',
    taxYear: '2025',
    vatRate: 20,
    minWage: 3500,
    averageSalary: 8000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Moroccan market' },
      { name: 'Tax Calculator', link: '/morocco-tax-calculator', icon: '🧮', description: 'Moroccan tax calculations' },
      { name: 'Loan Calculator', link: '/morocco-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/morocco-vat-calculator', icon: '💼', description: '20% VAT calculations' },
    ],
    keyStats: [
      { label: 'Population', value: '37.5M', icon: '👥' },
      { label: 'GDP Growth', value: '3.1%', icon: '📊' },
      { label: 'Unemployment', value: '11.8%', icon: '📉' },
      { label: 'Inflation', value: '6.1%', icon: '💹' },
    ],
    seoTitle: 'Morocco Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Morocco: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Moroccan professionals.',
  },
  'australia': {
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    taxYear: '2024-25',
    vatRate: 10, // GST
    minWage: 23.23,
    averageSalary: 75000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Australian market' },
      { name: 'Tax Calculator', link: '/australia-tax-calculator', icon: '🧮', description: 'ATO tax calculations' },
      { name: 'Loan Calculator', link: '/australia-loan-calculator', icon: '🏠', description: 'Home loan calculator' },
      { name: 'GST Calculator', link: '/australia-gst-calculator', icon: '💼', description: '10% GST calculations' },
      { name: 'Superannuation Calculator', link: '/australia-super-calculator', icon: '🏦', description: 'Super fund calculator' },
      { name: 'Investment Calculator', link: '/australia-investment-calculator', icon: '📈', description: 'ASX investments' },
    ],
    keyStats: [
      { label: 'Population', value: '26.0M', icon: '👥' },
      { label: 'GDP Growth', value: '1.5%', icon: '📊' },
      { label: 'Unemployment', value: '3.5%', icon: '📉' },
      { label: 'Inflation', value: '3.8%', icon: '💹' },
    ],
    seoTitle: 'Australia Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Australia: ATO tax calculator, CV builder, home loan calculator, GST tools & more. Trusted by Australian professionals.',
  },
  'germany': {
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    taxYear: '2025',
    vatRate: 19,
    minWage: 12.41,
    averageSalary: 55000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for German market' },
      { name: 'Tax Calculator', link: '/germany-tax-calculator', icon: '🧮', description: 'German tax calculations' },
      { name: 'Loan Calculator', link: '/germany-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/germany-vat-calculator', icon: '💼', description: '19% VAT calculations' },
      { name: 'Investment Calculator', link: '/germany-investment-calculator', icon: '📈', description: 'DAX investments' },
    ],
    keyStats: [
      { label: 'Population', value: '83.2M', icon: '👥' },
      { label: 'GDP Growth', value: '0.2%', icon: '📊' },
      { label: 'Unemployment', value: '3.0%', icon: '📉' },
      { label: 'Inflation', value: '3.7%', icon: '💹' },
    ],
    seoTitle: 'Germany Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Germany: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by German professionals.',
  },
  'france': {
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    taxYear: '2025',
    vatRate: 20,
    minWage: 11.52,
    averageSalary: 45000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for French market' },
      { name: 'Tax Calculator', link: '/france-tax-calculator', icon: '🧮', description: 'French tax calculations' },
      { name: 'Loan Calculator', link: '/france-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'VAT Calculator', link: '/france-vat-calculator', icon: '💼', description: '20% VAT calculations' },
      { name: 'Investment Calculator', link: '/france-investment-calculator', icon: '📈', description: 'CAC 40 investments' },
    ],
    keyStats: [
      { label: 'Population', value: '68.0M', icon: '👥' },
      { label: 'GDP Growth', value: '0.9%', icon: '📊' },
      { label: 'Unemployment', value: '7.3%', icon: '📉' },
      { label: 'Inflation', value: '4.9%', icon: '💹' },
    ],
    seoTitle: 'France Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for France: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by French professionals.',
  },
  'singapore': {
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    currencySymbol: 'S$',
    taxYear: '2025',
    vatRate: 9, // GST
    minWage: 0, // No minimum wage
    averageSalary: 70000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Singapore market' },
      { name: 'Tax Calculator', link: '/singapore-tax-calculator', icon: '🧮', description: 'IRAS tax calculations' },
      { name: 'Loan Calculator', link: '/singapore-loan-calculator', icon: '🏠', description: 'HDB and private property loans' },
      { name: 'GST Calculator', link: '/singapore-gst-calculator', icon: '💼', description: '9% GST calculations' },
      { name: 'CPF Calculator', link: '/singapore-cpf-calculator', icon: '🏦', description: 'CPF contributions' },
      { name: 'Investment Calculator', link: '/singapore-investment-calculator', icon: '📈', description: 'SGX investments' },
    ],
    keyStats: [
      { label: 'Population', value: '5.9M', icon: '👥' },
      { label: 'GDP Growth', value: '1.2%', icon: '📊' },
      { label: 'Unemployment', value: '1.8%', icon: '📉' },
      { label: 'Inflation', value: '4.8%', icon: '💹' },
    ],
    seoTitle: 'Singapore Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Singapore: IRAS tax calculator, CV builder, HDB loan calculator, GST tools & more. Trusted by Singapore professionals.',
  },
  'uae': {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'AED',
    taxYear: '2025',
    vatRate: 5,
    minWage: 0, // No minimum wage
    averageSalary: 120000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for UAE market' },
      { name: 'VAT Calculator', link: '/uae-vat-calculator', icon: '💼', description: '5% VAT calculations' },
      { name: 'Loan Calculator', link: '/uae-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'Salary Calculator', link: '/salary-calculator', icon: '💰', description: 'UAE salary insights' },
      { name: 'Investment Calculator', link: '/uae-investment-calculator', icon: '📈', description: 'DFM investments' },
    ],
    keyStats: [
      { label: 'Population', value: '9.9M', icon: '👥' },
      { label: 'GDP Growth', value: '3.4%', icon: '📊' },
      { label: 'Unemployment', value: '2.4%', icon: '📉' },
      { label: 'Inflation', value: '3.5%', icon: '💹' },
    ],
    seoTitle: 'UAE Professional Tools | VAT Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for UAE: VAT calculator, CV builder, loan calculator & more. Trusted by UAE professionals.',
  },
  'brazil': {
    name: 'Brazil',
    flag: '🇧🇷',
    currency: 'BRL',
    currencySymbol: 'R$',
    taxYear: '2025',
    vatRate: 17, // Average
    minWage: 1412,
    averageSalary: 5000,
    tools: [
      { name: 'CV Builder', link: '/cv-builder', icon: '📄', description: 'Professional CV maker for Brazilian market' },
      { name: 'Tax Calculator', link: '/brazil-tax-calculator', icon: '🧮', description: 'Brazilian tax calculations' },
      { name: 'Loan Calculator', link: '/brazil-loan-calculator', icon: '🏠', description: 'Mortgage and loan planning' },
      { name: 'Investment Calculator', link: '/brazil-investment-calculator', icon: '📈', description: 'Bovespa investments' },
    ],
    keyStats: [
      { label: 'Population', value: '215M', icon: '👥' },
      { label: 'GDP Growth', value: '2.9%', icon: '📊' },
      { label: 'Unemployment', value: '7.8%', icon: '📉' },
      { label: 'Inflation', value: '4.6%', icon: '💹' },
    ],
    seoTitle: 'Brazil Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Brazil: tax calculator, CV builder, loan calculator & more. Trusted by Brazilian professionals.',
  },
};

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  const country = countryConfigs[resolvedParams.country as keyof typeof countryConfigs];
  
  if (!country) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Country Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-8xl mb-6">{country.flag}</div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                {country.name}
                <span className="block text-2xl sm:text-3xl text-blue-200 mt-2">
                  Professional Tools
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Comprehensive financial and career tools designed specifically for {country.name}'s 
                market, regulations, and opportunities.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                {country.keyStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {country.name} Professional Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                All tools are configured with {country.name}'s latest rates, regulations, and market data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.tools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.link}
                  className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="font-medium">Use Tool</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Country-Specific Information */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {country.name} Market Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Currency</span>
                    <span className="font-bold text-gray-900">{country.currency} ({country.currencySymbol})</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Tax Year</span>
                    <span className="font-bold text-gray-900">{country.taxYear}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">VAT/Tax Rate</span>
                    <span className="font-bold text-gray-900">{country.vatRate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Average Salary</span>
                    <span className="font-bold text-gray-900">{country.currencySymbol}{country.averageSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose Our {country.name} Tools?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Local Compliance</h4>
                      <p className="text-gray-600">All calculations follow {country.name}'s current regulations and rates.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Updated Data</h4>
                      <p className="text-gray-600">Regular updates with the latest market data and government rates.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Free Forever</h4>
                      <p className="text-gray-600">All tools are completely free with no hidden charges or subscriptions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Mobile Optimized</h4>
                      <p className="text-gray-600">Works perfectly on all devices, optimized for mobile users.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Countries */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Explore Other Countries
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}