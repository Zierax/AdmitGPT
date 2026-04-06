import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // In Next.js 15, allowedDevOrigins is a top-level property
  allowedDevOrigins: ["http://192.168.56.1:3005", "192.168.56.1"],
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
