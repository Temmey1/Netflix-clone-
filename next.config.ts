import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
  TMDB_API_KEY: process.env.TMDB_API_KEY
}
};

export default nextConfig;
