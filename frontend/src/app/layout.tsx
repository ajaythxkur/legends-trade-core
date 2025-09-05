import "./globals.css";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
const font = League_Spartan({ subsets: ["latin"], weight: "500" });
import { ThemeProvider } from 'next-themes'
import { DrawerProvider } from '../contexts/DrawerContext';
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/sonner";
import { AutoConnectProvider } from "@/components/AutoConnectProvider";
import NextTopLoader from 'nextjs-toploader';
import { Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";
import { CrossChainProvider } from "@/contexts/CrossChain";
import { AppProvider } from "@/contexts/AppProvider";
// constand network configuration
const dappNetwork: Network.MAINNET | Network.TESTNET = Network.TESTNET;
export const metadata: Metadata = {
  title: "Legends Trade",
  description: "Cross chain OTC platform on Aptos blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`} >
        <ThemeProvider>
          <AutoConnectProvider>
            <WalletProvider>
              <CrossChainProvider dappNetwork={dappNetwork}>
                <AppProvider>
                  <DrawerProvider>
                    <NextTopLoader color="#9FE878" showSpinner={false} />
                    {children}
                  </DrawerProvider>
                </AppProvider>
              </CrossChainProvider>
            </WalletProvider>
          </AutoConnectProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html >
  );
}
