/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  watchOptions: { ignored: '/node_modules' },
  images: {
    domains: [
      'ldb-phinf.pstatic.net',
      'naverbooking-phinf.pstatic.net',
      'ldb-phinf.pstatic.net',
      'jungminbucket2.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
