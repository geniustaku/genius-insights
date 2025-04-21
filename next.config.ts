/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'geniusinsightsdocs.blob.core.windows.net', // Your Azure Storage hostname
      'localhost' // For local development
    ],
    // Optional: Set maximum size for your images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'geniusinsightsdocs.blob.core.windows.net',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;