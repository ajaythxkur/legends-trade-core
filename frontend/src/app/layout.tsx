import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { DrawerProvider } from '../contexts/DrawerContext';
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { Toaster } from "@/components/ui/sonner";
import { AutoConnectProvider } from "@/contexts/AutoConnectProvider";
import NextTopLoader from 'nextjs-toploader';
import { AppProvider } from "@/contexts/AppProvider";
import { BalanceProvider } from "@/contexts/BalanceContext";
import { NETWORK } from "@/utils/env";
import WalletContextProvider from "@/contexts/WalletProvider";

// const font = League_Spartan({ subsets: ["latin"], weight: "500" });
import { Inter } from "@/components/fonts";

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
      <body className={`${Inter.className}`} >
        <ThemeProvider>
          <AutoConnectProvider>
            <WalletProvider>
              <BalanceProvider dappNetwork={NETWORK}>

                <WalletContextProvider>
                  <AppProvider>
                    <DrawerProvider>
                      <NextTopLoader color="#9FE878" showSpinner={false} />
                      {children}
                    </DrawerProvider>
                  </AppProvider>
                </WalletContextProvider>

              </BalanceProvider>
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
              toast: Inter.className,
            }
          }}
        />
      </body>
    </html >
  );
}
