import type { NextConfig } from "next";

// Trigger rebuild - Updated for sidebar fix
const nextConfig: NextConfig = {
  output: "standalone",
  generateBuildId: async () => {
    return `build-${Date.now()}-sidebar-fix-${Math.random().toString(36).substr(2, 9)}`
  },
  // Force cache invalidation
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
