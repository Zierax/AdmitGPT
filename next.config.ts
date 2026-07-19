import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Lint is run separately (npm run lint); don't fail production builds on
  // style rules (unescaped entities, explicit any) so Cloudflare Pages deploys
  // reliably. Type errors still block the build via ignoreBuildErrors:false.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // In Next.js 15, allowedDevOrigins is a top-level property
  allowedDevOrigins: ["http://192.168.56.1:3005", "192.168.56.1"],
};

export default nextConfig;
