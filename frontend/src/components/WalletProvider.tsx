"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { setupAutomaticEthereumWalletDerivation } from "@aptos-labs/derived-wallet-ethereum";
import { setupAutomaticSolanaWalletDerivation } from "@aptos-labs/derived-wallet-solana";
import { PropsWithChildren } from "react";
import { APTOS_API_KEY_DEVNET, APTOS_API_KEY_TESNET, NETWORK } from "@/utils/env";
import { toast } from "sonner"

setupAutomaticEthereumWalletDerivation({ defaultNetwork: NETWORK });
setupAutomaticSolanaWalletDerivation({ defaultNetwork: NETWORK });

let dappImageURI: string | undefined;
if (typeof window !== "undefined") {
  dappImageURI = `${window.location.origin}${window.location.pathname}favicon.ico`;
}

export const WalletProvider = ({ children }: PropsWithChildren) => {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: NETWORK,
        aptosApiKeys: {
          testnet: APTOS_API_KEY_TESNET,
          devnet: APTOS_API_KEY_DEVNET,
        },
        aptosConnect: {
          dappId: "57fa42a9-29c6-4f1e-939c-4eefa36d9ff5",
          dappImageURI,
        },
        mizuwallet: {
          manifestURL:
            "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
        },
        crossChainWallets: true,
      }}
      onError={(error) => {
        toast.error(`${error || "unknown wallet error"} `)
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};