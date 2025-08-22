'use client';
import { IoIosArrowDown } from "react-icons/io";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Network() {
    const networks = [
        { name: "Aptos", value: "aptos", icon: "/media/aptos.svg" },
        { name: "Solana", value: "solana", icon: "/media/token-img.png" },
        { name: "Movement", value: "movement", icon: "/media/token-img.png" },
    ]

    const [selectedNetwork, setSelectedNetwork] = useState<string>("aptos")

    // Get the selected network name for display
    const getSelectedNetworkName = () => {
        const selected = networks.find(network => network.value === selectedNetwork)
        return selected ? selected.name : "Select Network"
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="focus-visible:outline-none p-3">
                        <Image src="/media/aptos.svg" alt="token-icon" height={20} width={20} className="rounded-full" />
                        <span className="hidden md:block">{getSelectedNetworkName()}</span>
                        <IoIosArrowDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={selectedNetwork} onValueChange={setSelectedNetwork}>
                        {networks.map((network) => (
                            <DropdownMenuRadioItem
                                key={network.value}
                                value={network.value}
                                // disabled={network.value === "movement"}
                                disabled={["movement", "solana"].includes(network.value)}
                                className="py-2 px-6 hover:bg-card-bg flex gap-2 items-center cursor-pointer"
                            >
                                <Image src={network.icon} alt="token-icon" height={20} width={20} className="rounded-full" />
                                {network.name}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    );
}