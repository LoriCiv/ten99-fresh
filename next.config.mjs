/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ten99-api-fresh.vercel.app/api/:path*',
      },
    ]
  },
};

export default nextConfig;
