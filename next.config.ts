import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.prod.website-files.com"],
  },
};

export default nextConfig;
