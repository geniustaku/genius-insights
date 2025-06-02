import { Metadata } from 'next';

const countryConfigs = {
  'south-africa': {
    name: 'South Africa',
    seoTitle: 'South Africa Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for South Africa: SARS tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by 400,000+ South Africans.',
  },
  'nigeria': {
    name: 'Nigeria',
    seoTitle: 'Nigeria Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Nigeria: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Nigerian professionals.',
  },
  'kenya': {
    name: 'Kenya',
    seoTitle: 'Kenya Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Kenya: KRA tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Kenyan professionals.',
  },
  'ghana': {
    name: 'Ghana',
    seoTitle: 'Ghana Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Ghana: GRA tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Ghanaian professionals.',
  },
  'united-kingdom': {
    name: 'United Kingdom',
    seoTitle: 'UK Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for UK: HMRC tax calculator, CV builder, mortgage calculator, VAT tools & more. Trusted by British professionals.',
  },
  'canada': {
    name: 'Canada',
    seoTitle: 'Canada Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Canada: CRA tax calculator, CV builder, mortgage calculator, GST tools & more. Trusted by Canadian professionals.',
  },
  'united-states': {
    name: 'United States',
    seoTitle: 'US Professional Tools | Tax Calculator, Resume Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for USA: IRS tax calculator, resume builder, mortgage calculator, 401k tools & more. Trusted by American professionals.',
  },
  'india': {
    name: 'India',
    seoTitle: 'India Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for India: Income tax calculator, CV builder, loan calculator, GST tools & more. Trusted by Indian professionals.',
  },
  'egypt': {
    name: 'Egypt',
    seoTitle: 'Egypt Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Egypt: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Egyptian professionals.',
  },
  'morocco': {
    name: 'Morocco',
    seoTitle: 'Morocco Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Morocco: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by Moroccan professionals.',
  },
  'australia': {
    name: 'Australia',
    seoTitle: 'Australia Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Australia: ATO tax calculator, CV builder, home loan calculator, GST tools & more. Trusted by Australian professionals.',
  },
  'germany': {
    name: 'Germany',
    seoTitle: 'Germany Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Germany: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by German professionals.',
  },
  'france': {
    name: 'France',
    seoTitle: 'France Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for France: tax calculator, CV builder, loan calculator, VAT tools & more. Trusted by French professionals.',
  },
  'singapore': {
    name: 'Singapore',
    seoTitle: 'Singapore Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Singapore: IRAS tax calculator, CV builder, HDB loan calculator, GST tools & more. Trusted by Singapore professionals.',
  },
  'uae': {
    name: 'United Arab Emirates',
    seoTitle: 'UAE Professional Tools | VAT Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for UAE: VAT calculator, CV builder, loan calculator & more. Trusted by UAE professionals.',
  },
  'brazil': {
    name: 'Brazil',
    seoTitle: 'Brazil Professional Tools | Tax Calculator, CV Builder & Financial Planning 2025',
    seoDescription: 'Complete professional toolkit for Brazil: tax calculator, CV builder, loan calculator & more. Trusted by Brazilian professionals.',
  },
};

type Props = {
  params: Promise<{ country: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const country = countryConfigs[resolvedParams.country as keyof typeof countryConfigs];
  
  if (!country) {
    return {
      title: 'Country Not Found | Genius Insights',
      description: 'Professional tools for global markets.',
    };
  }

  return {
    title: country.seoTitle,
    description: country.seoDescription,
    keywords: `${country.name} tax calculator, ${country.name} CV builder, ${country.name} loan calculator, ${country.name} professional tools, ${country.name} salary calculator, ${country.name} financial planning`,
    openGraph: {
      title: country.seoTitle,
      description: country.seoDescription,
      url: `https://genius-insights.co.za/countries/${resolvedParams.country}`,
      type: 'website',
      locale: 'en_US',
      siteName: 'Genius Insights',
      images: [
        {
          url: `/images/${resolvedParams.country}-tools-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${country.name} Professional Tools - Genius Insights`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: country.seoTitle,
      description: country.seoDescription,
      images: [`/images/${resolvedParams.country}-tools-og.jpg`],
      site: '@geniusinsights_global',
    },
    alternates: {
      canonical: `https://genius-insights.co.za/countries/${resolvedParams.country}`,
    },
  };
}

export default function CountryLayout({ children }: Props) {
  return children;
}