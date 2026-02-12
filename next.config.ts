import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Hapus generateBuildId yang menggunakan random
  // Biarkan Next.js handle build ID secara otomatis

  // Optimize for faster builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
  },

  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;