"use client";
import React, { useState } from "react";
import { ChevronDown, Copy, Check, LogOut, Wallet, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "usehooks-ts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner";
import shortAddress from "@/utils/shortAddress";
import { PMedium } from "../ui/typography";
import { WalletModal } from "./WalletModal";

export function WalletButton() {
    const { account, isLoading, disconnect } = useWallet();
    const [, copy] = useCopyToClipboard();
    const isMobile = useIsMobile();
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCopyAddress = async (walletAddress: string) => {
        try {
            await copy(walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
            toast.success('Addres copied successfully.')
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (isLoading) {
        return (
            <Button disabled className="relative">
                <span className="hidden lg:block">Connecting..</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
            </Button>
        );
    }

    // If wallet is not connected
    if (!account)
        return (
            <>
                <Button type="button" onClick={() => setOpen(true)}
                // size={isMobile ? "sm" : "default"}
                >
                    {isMobile ? <Wallet className="h-5 w-5" /> : "Connect Wallet"}
                </Button>

                {/* Wallet Modal */}
                <WalletModal open={open} setOpen={setOpen} />
            </>
        );

    // If wallet is connected
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    {account?.ansName ||
                        shortAddress(account?.address?.toString()) ||
                        "Unknown"}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-90">
                <DropdownMenuItem className="gap-2 flex items-center cursor-pointer">

                    <div className="space-y-1">
                        <PMedium
                            className="flex items-center gap-2"
                            onClick={() => handleCopyAddress(account.address.toString())}
                        >
                            {copied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                            Copy Address
                        </PMedium>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={disconnect} className="gap-2 flex items-center cursor-pointer">
                    <LogOut className="h-4 w-4" /> Disconnect
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
