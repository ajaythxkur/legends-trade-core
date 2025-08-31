'use client'
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import aptosClient from "@/lib/aptos";

export const APT = "0x1::aptos_coin::AptosCoin";
export const USDT = "";
export const USDC = "";

export default function WalletBalance() {
    const { account } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    const getAptBalance = async (addr: string) => {
        if (!addr) return;
        try {
            const result = await aptosClient.getAccountCoinAmount({
                accountAddress: addr,
                coinType: APT,
            });
            setBalance(result / Math.pow(10, 8));
        } catch (error) {
            console.error("Failed to fetch balance", error);
            setBalance(null);
        }
    };

    useEffect(() => {
        if (account?.address) {
            getAptBalance(account.address.toString());
        }
    }, [account?.address]);

    return (
        <p>{balance !== null ? balance : "Loading..."}</p>
    );
}




// 'use client'
// import aptosClient from "@/lib/aptos";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { useEffect } from "react";

// export const APT = "0x1::aptos_coin::AptosCoin";

// export default function WalletBalance() {
//     const { account } = useWallet()
//     const getAptBalance = async (addr: string) => {
//         const result = await aptosClient.getAccountCoinAmount({
//             accountAddress: addr,
//             coinType: APT,
//         });

//         console.log("APT balance", result);
//         return result;
//     };
//     useEffect(() => {
//         getAptBalance(String(account?.address))
//     }, [])
//     return (
//         <p>bal: {getAptBalance(String(account?.address))}</p>
//     )
// }