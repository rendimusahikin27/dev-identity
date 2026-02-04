import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Tambahkan ini agar jadi file statis
  images: {
    unoptimized: true, // GitHub Pages tidak bisa memproses optimasi gambar otomatis Next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;