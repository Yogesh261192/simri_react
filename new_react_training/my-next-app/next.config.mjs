/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Optional — keeps trailing slashes in URLs
  images: {
    unoptimized: true, // For EC2/static image compatibility (optional)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'readdy.ai',
        pathname: '/api/**',
      },
    ],
  },
};

export default nextConfig;
