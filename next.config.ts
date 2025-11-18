import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  // No basePath needed for custom domain
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
