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
import { AppProvider } from "@/contexts/AppProvider";
import { USDCBalanceProvider } from "@/contexts/USDCBalanceContext";
import { NETWORK } from "@/utils/env";

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
              <USDCBalanceProvider dappNetwork={NETWORK}>
                {/* <CrossChainProvider dappNetwork={dappNetwork}> */}
                  <AppProvider>
                    <DrawerProvider>
                      <NextTopLoader color="#9FE878" showSpinner={false} />
                      {children}
                    </DrawerProvider>
                  </AppProvider>
                {/* </CrossChainProvider> */}
              </USDCBalanceProvider>
            </WalletProvider>
          </AutoConnectProvider>
        </ThemeProvider>
        <Toaster
          toastOptions={{
            style: {
              background: "#121212",
              color: "#ffffff",
              border: "1px solid #363636",
              fontSize: "12px"
            },
            classNames: {
              toast: font.className,
            }
          }}
        />
      </body>
    </html >
  );
}
