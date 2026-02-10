import type { NextConfig } from "next";

// Trigger rebuild
const nextConfig: NextConfig = {
  output: "standalone",
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
};

export default nextConfig;
