import type { NextConfig } from "next";

const nextConfig: any = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  output: "standalone",

  // Hapus generateBuildId yang menggunakan random
  // Biarkan Next.js handle build ID secara otomatis

  // Optimize for faster builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
    // Turbopack (default di Next 16) memakai CA sistem agar fetch Google Fonts
    // tidak gagal TLS saat build di Docker/CI.
    turbopackUseSystemTlsCerts: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard/pendaftar/ujian-online/:path*',
        destination: '/dashboard/pendaftar/ujian/:path*',
        permanent: false,
      },
    ];
  },
  // Rewrite khusus untuk subdomain MOSA CUP
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'mosacup.pesantren-alimam.com',
            },
          ],
          destination: '/mosa_cup.html',
        },
      ],
    };
  },
};

export default nextConfig;
