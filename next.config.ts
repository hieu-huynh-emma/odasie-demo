import type { NextConfig } from 'next';

const getBundleAnalyzer = () => {
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = eval('require')('@next/bundle-analyzer')({
      enabled: true,
    });
    return withBundleAnalyzer;
  }
  return (config: NextConfig) => config;
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // External packages for server components
  serverExternalPackages: ['sharp'],

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Tree shaking optimizations
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }

    return config;
  },

  // Image optimization for better LCP
  images: {
    remotePatterns: process.env.REMOTE_IMAGE_PATTERNS
      ? process.env.REMOTE_IMAGE_PATTERNS.split(',').map(url => ({
          protocol: url.startsWith('https') ? 'https' : 'http',
          hostname: url.replace(/^https?:\/\//, ''),
        }))
      : [
          {
            protocol: 'https',
            hostname:
              'odasie-staging-media-optimized.s3.ap-southeast-7.amazonaws.com',
          },
          {
            protocol: 'https',
            hostname:
              'odasie-staging-media-original.s3.ap-southeast-7.amazonaws.com',
          },
          {
            protocol: 'https',
            hostname: 'media-staging.odasie.com',
          },
        ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
  },
};

export default getBundleAnalyzer()(nextConfig);
