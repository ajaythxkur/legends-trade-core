'use client'
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
interface CopyAddressProps {
    address: string
}

export default function CopyAddress({ address }: CopyAddressProps) {
    const [copiedText, copy] = useCopyToClipboard();
    const [isCopied, setIsCopied] = useState(false);
    function handleCopy(text: string) {
        copy(text)
            .then(() => {
                console.log('Copied!', { text: copiedText })
                setIsCopied(true)
                setTimeout(() => {
                    setIsCopied(false)
                }, 3000)
            })
            .catch(error => {
                toast.error("Failed to copy")
                console.error('Failed to copy!', error)
                setIsCopied(false)
            })
    }
    return (
        <>
            {
                isCopied ?
                    <FaCheck className="text-primary-button-color h-4 w-4 mb-[2px]" />
                    :
                    <IoCopyOutline className="h-4 w-4 relative z-20 cursor-pointer mb-[2px]" onClick={() => handleCopy(address)} />
            }
        </>
    )
}