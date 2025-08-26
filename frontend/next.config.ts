import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NETWORK: process.env.NETWORK,
    BACKEND_URL: process.env.BACKEND_URL,
    MODULE_ADDRESS: process.env.MODULE_ADDRESS

  }
};

export default nextConfig;
