"use client";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
    // let endpoint = web3.clusterApiUrl("mainnet-beta")
    // let endpoint = "https://broken-winter-mound.solana-mainnet.quiknode.pro/63fece8f53c63eab678c176205db01048360f182/";
    // const environment = process.env.SOLANA_ENV;
    // if(environment == "localnet"){
    //     endpoint = "http://127.0.0.1:8899/";
    // }
    // if(environment == "devnet"){
    //     endpoint = web3.clusterApiUrl("devnet") 
    // }
    // if(environment == "testnet"){
    // }
    const endpoint = web3.clusterApiUrl("testnet") 
    return(
        <ConnectionProvider endpoint={endpoint} config={{
            commitment: "confirmed"
        }}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
export default WalletContextProvider;