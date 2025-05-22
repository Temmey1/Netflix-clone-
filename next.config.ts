import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
