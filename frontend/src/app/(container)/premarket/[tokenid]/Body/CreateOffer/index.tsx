"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CreateOfferModal from "./offermodal"
import { FiPlus } from "react-icons/fi"
import { Token } from "@/types/premarket"
interface ModalDemoProps{
    token:Token;
    tokenAddr:string;
}

export default function ModalDemo({token, tokenAddr}:ModalDemoProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {/* <Button className="md:mb-4 w-fit" onClick={() => setIsModalOpen(true)} > */}
            <Button className="w-fit" onClick={() => setIsModalOpen(true)} >
                <span className="hidden sm:block">Create Offer</span>
                <FiPlus className="h-3 w-3"/>
            </Button>
            <CreateOfferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={token} tokenAddr={tokenAddr}/>
        </>
    )
}