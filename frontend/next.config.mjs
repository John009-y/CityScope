/**
 * @type {import('next').NextConfig}
 */
const output = process.env.NODE_ENV === 'production' ? 'export' : 'standalone';
const nextConfig = {
  trailingSlash: true,
  distDir: 'build',
  output,
  basePath: '',
  swcMinify: false,
  devIndicators: {
    buildActivityPosition: 'bottom-left',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/web_pages/home',
      },

      {
        source: '/about',
        destination: '/web_pages/about',
      },

      {
        source: '/services',
        destination: '/web_pages/services',
      },

      {
        source: '/contact',
        destination: '/web_pages/contact',
      },

      {
        source: '/blog',
        destination: '/web_pages/blog',
      },
    ];
  },
};

export default nextConfig;
