import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NETWORK: process.env.NETWORK,
    BACKEND_URL: process.env.BACKEND_URL,
    MODULE_ADDRESS: process.env.MODULE_ADDRESS,
    FEE_PAYER_ACCOUNT_PRIVATE_KEY: process.env.FEE_PAYER_ACCOUNT_PRIVATE_KEY,
    APTOS_API_KEY_TESNET: process.env.APTOS_API_KEY_TESNET,
    APTOS_API_KEY_DEVNET: process.env.APTOS_API_KEY_DEVNET,
    SOL_PRIVATE_KEY: process.env.SOL_PRIVATE_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
    ],
  },

  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       buffer: require.resolve('buffer'),
  //       util: require.resolve('util'),
  //     };
  //   }
  //   return config;
  // },

};

export default nextConfig;