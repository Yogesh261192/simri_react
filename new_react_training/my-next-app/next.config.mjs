/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static export

  images: {
    unoptimized: true, // ← ADD THIS LINE
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
