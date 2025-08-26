import "./globals.css";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
const font = League_Spartan({ subsets: ["latin"], weight: "500" });
import { ThemeProvider } from 'next-themes'
import { DrawerProvider } from '../contexts/DrawerContext';
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/sonner";
import { AutoConnectProvider } from "@/components/AutoConnectProvider";
export const metadata: Metadata = {
  title: "Legends Trade",
  description: "legends trade",
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
              <DrawerProvider>
                {children}
              </DrawerProvider>
            </WalletProvider>
          </AutoConnectProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html >
  );
}
