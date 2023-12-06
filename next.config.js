/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['ldb-phinf.pstatic.net', 'naverbooking-phinf.pstatic.net', 'ldb-phinf.pstatic.net'],
  },
};

module.exports = nextConfig;
