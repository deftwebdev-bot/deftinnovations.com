import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Image optimization
  images: {
    dangerouslyAllowLocalIP: true,
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 90 days — Drive proxy images bypass the
    // optimizer entirely (via MediaImage component) so this only applies
    // to Unsplash + Django /media/ uploads which rarely change.
    minimumCacheTTL: 60 * 60 * 24 * 90,
    // Limit generated sizes to the breakpoints the site actually uses.
    // Fewer sizes = less disk I/O and faster cold-start optimisation.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    // Only allow image optimization for hosts we actually serve images from.
    // The Django API origin (media uploads + Drive video proxy) is injected via
    // env so production automatically trusts the real backend host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").hostname,
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },

  // HTTP headers for caching static assets
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      // Next.js handles /_next/static caching automatically
      {
        source: "/favicon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
