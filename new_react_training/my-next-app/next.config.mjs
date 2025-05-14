/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← Add this line

  images: {
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
