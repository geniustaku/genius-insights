/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'geniusinsightsdocs.blob.core.windows.net', // Your Azure Storage hostname
      'localhost', // For local development
      'images.unsplash.com', // Unsplash images
      'unsplash.com', // Additional Unsplash domain
      'via.placeholder.com' // Placeholder images
    ],
    // Optional: Set maximum size for your images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'geniusinsightsdocs.blob.core.windows.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;