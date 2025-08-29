"use client"

import { useState } from "react"
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
interface ModalDemoProps {
    token: Token;
    tokenAddr: string;
}

export default function ModalDemo({ token, tokenAddr }: ModalDemoProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button className="w-fit" onClick={() => setOpen(!open)} disabled={token.status != 0}>
                <span className="hidden sm:block">Create Offer</span>
                <FiPlus className="h-3 w-3" />
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 space-y-0">
                    <DialogHeader>
                        <DialogTitle>{''}</DialogTitle>
                    </DialogHeader>
                    <CreateOfferModal open={open} setOpen={setOpen} token={token} tokenAddr={tokenAddr} />
                </DialogContent>
            </Dialog>
        </>
    )
}