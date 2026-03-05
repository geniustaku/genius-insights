/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/south-africa-vat-calculator-2025',
        destination: '/south-africa-vat-calculator',
        permanent: true,
      },
      {
        source: '/articles/sars-efiling-registration',
        destination: '/articles/sars-efiling-registration-guide',
        permanent: true,
      },
      {
        source: '/articles/how-to-pay-sars-debt-south-africa',
        destination: '/guides/how-to-pay-sars-debt-south-africa',
        permanent: true,
      },
      {
        source: '/articles/sars-tax-brackets-2025-south-africa',
        destination: '/guides/sars-tax-brackets-2025-south-africa',
        permanent: true,
      },
      {
        source: '/articles/property-transfer-costs-south-africa-2025-breakdown',
        destination: '/guides/property-transfer-costs-south-africa-2025-breakdown',
        permanent: true,
      },
      {
        source: '/guides/attorney-fees-property-transfer-south-africa',
        destination: '/articles/attorney-fees-property-transfer-south-africa',
        permanent: true,
      },
      {
        source: '/articles/bond-costs-vs-transfer-costs-south-africa',
        destination: '/guides/bond-costs-vs-transfer-costs-south-africa',
        permanent: true,
      },
      {
        source: '/articles/cipc-annual-returns-filing-guide',
        destination: '/guides/cipc-annual-returns-filing-guide',
        permanent: true,
      },
      {
        source: '/articles/paye-calculator-guide-south-africa',
        destination: '/guides/paye-calculator-guide-south-africa',
        permanent: true,
      },
      {
        source: '/articles/how-to-use-sars-income-tax-calculator',
        destination: '/guides/how-to-use-sars-income-tax-calculator',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
