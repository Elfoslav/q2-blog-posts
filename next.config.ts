import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://stage73.q2.cz/**')],
  },
};

export default nextConfig;
