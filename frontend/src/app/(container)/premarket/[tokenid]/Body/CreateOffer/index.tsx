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
import { useUSDCBalance } from "@/contexts/USDCBalanceContext"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
interface ModalDemoProps {
    token: Token;
    tokenAddr: string;
}

export default function ModalDemo({ token, tokenAddr }: ModalDemoProps) {
    const [open, setOpen] = useState(false);
    const { network, account } = useWallet();
    const { originWalletDetails, sourceChain } = useApp();
    const { aptosBalance, originBalance, fetchAptosBalance, fetchOriginBalance } = useUSDCBalance();
    const [combinedUsdcBalance, setCombinedUsdcBalance] = useState<string>("");
    useEffect(() => {
        if (!sourceChain) return;
        if(account) {
            fetchAptosBalance(account.address.toString());
        }
        if(originWalletDetails) {
            fetchOriginBalance(originWalletDetails.address.toString(), sourceChain);
        }
    }, [originWalletDetails, network, sourceChain, fetchOriginBalance, fetchAptosBalance]);

    useEffect(() => {
        let combinedBalance = aptosBalance ? Number(aptosBalance) : 0;
        combinedBalance += originBalance ? Number(originBalance) : 0;
        setCombinedUsdcBalance(
            combinedBalance.toString()
        )
    },[aptosBalance, originBalance])
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
                    <CreateOfferModal open={open} setOpen={setOpen} token={token} tokenAddr={tokenAddr} balance={combinedUsdcBalance}/>
                </DialogContent>
            </Dialog>
        </>
    )
}