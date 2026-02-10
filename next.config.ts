import type { NextConfig } from "next";

// Auto-deployment optimized configuration
const nextConfig: NextConfig = {
  output: "standalone",
  generateBuildId: async () => {
    // Only generate new build ID if there are actual changes
    if (process.env.NODE_ENV === 'production') {
      return `build-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    }
    return 'dev'
  },
  // Expose environment variables to the runtime
  // Expose environment variables to the runtime
  env: {
    // DATABASE_URL should NOT be here to avoid build-time inlining
  },
  // Optimize for faster builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    forceSwcTransforms: true,
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
  },
  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
