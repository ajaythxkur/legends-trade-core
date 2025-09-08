"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import CreateOfferModal from "./offermodal"
import { FiPlus } from "react-icons/fi"
import { Token } from "@/types/premarket"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useApp } from "@/contexts/AppProvider"
import { useBalance } from "@/contexts/BalanceContext"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { testnetTokens, TokenConfig } from "@/cross-chain-core"
interface ModalDemoProps {
    token: Token;
    tokenAddr: string;
}

export default function ModalDemo({ token, tokenAddr }: ModalDemoProps) {
    const [open, setOpen] = useState(false);
    const { network, account } = useWallet();
    const { originWalletDetails, sourceChain, tokenPrices } = useApp();
    const { aptosBalance, originBalance, fetchAptosBalance, fetchOriginBalance } = useBalance();
    const [sourceBalance, setSourceBalance] = useState<string>("");
    const [sourceToken, setSourceToken] = useState<TokenConfig>(testnetTokens["Aptos"][0]);
    useEffect(() => {
        if (!sourceChain) return;
        if(account) {
            fetchAptosBalance(account.address.toString(), sourceToken.tokenId.address, sourceToken.decimals);
        }
        if(originWalletDetails) {
            fetchOriginBalance(originWalletDetails.address.toString(), sourceChain, sourceToken.tokenId.address, sourceToken.decimals);
        }
    }, [originWalletDetails, network, sourceChain, fetchOriginBalance, fetchAptosBalance, sourceToken]);

    useEffect(() => {
        let combinedBalance = aptosBalance ? Number(aptosBalance) : 0;
        combinedBalance += originBalance ? Number(originBalance) : 0;
        setSourceBalance(
            combinedBalance.toString()
        )
    },[aptosBalance, originBalance])

    useEffect(() => {
        if(!sourceChain) {
            setSourceToken(testnetTokens["Aptos"][0])
        } else {
            setSourceToken(testnetTokens[sourceChain][0])
        }
    },[sourceChain]);

    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]
    const priceInUsd = tokenPrices ? tokenPrices[sourceToken.symbol] : 0;
    useEffect(() => {
        if(tokenPrices) {
            console.log(tokenPrices);
            const usd = tokenPrices[sourceToken.symbol];
            const us = tokenPrices["USDC"];
            console.log(usd, us)
        }
    },[tokenPrices, sourceToken])
    return (
        <>
            <Button className="w-fit" onClick={() => setOpen(!open)} disabled={token.status != 0}>
                <span className="hidden sm:block">Create Offer</span>
                <FiPlus className="h-3 w-3" />
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 space-y-0 max-h-[90vh] overflow-y-auto scrollbar-hide" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>{''}</DialogTitle>
                    </DialogHeader>
                    <CreateOfferModal 
                        open={open} 
                        setOpen={setOpen} 
                        token={token} 
                        tokenAddr={tokenAddr} 
                        balance={sourceBalance}
                        collateralTokens={collateralTokens}
                        collateralToken={sourceToken}
                        onCollateralChange={(t: TokenConfig) => setSourceToken(t)}
                        priceInUsd={priceInUsd}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}