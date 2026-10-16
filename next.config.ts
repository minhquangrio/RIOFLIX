import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/player-proxy/:path*",
        destination: "https://player.phimapi.com/:path*",
      },
    ];
  },
};

export default nextConfig;
