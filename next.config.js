/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      'lodash',
      'date-fns',
      '@radix-ui/react-*',
    ],
    // Enable React 18 concurrent features
    reactRoot: true,
    // Enable new JSX transform
    reactRemoveProperties: true,
    // Remove console in production
    removeConsole: !process.env.NEXT_PUBLIC_DEBUG,
  },

  // Optimize font loading
  optimizeFonts: true,
  
  // Disable type checking during build (run it as a separate step)
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Disable ESLint during build (run it as a separate step)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Only run in production
    if (!dev) {
      // Add module replacement for moment.js locales to reduce bundle size
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^moment\/locale\/.+$/
        })
      );

      // Enable tree shaking for production
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
      
      // Split chunks configuration
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
          },
        },
      };
    }

    // Only include necessary polyfills for modern browsers
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      
      if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
        entries['main.js'].unshift('./polyfills.js');
      }
      
      return entries;
    };

    return config;
  },

  // Enable HTTP/2 server push for static assets
  httpAgentOptions: {
    keepAlive: true,
  },

  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|gif|ico|svg|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Bundle analyzer for production builds
module.exports = withBundleAnalyzer(nextConfig);

