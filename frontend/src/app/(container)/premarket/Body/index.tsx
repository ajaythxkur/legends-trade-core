'use client'
// import Network from "@/components/network";
import { H4, PSmall } from "@/components/ui/typography";
import TokensGrid from "./grid";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import { backendUrl } from "@/utils/env";
import { Token } from "@/types/premarket";



export default function Body() {
    const [tokens, setTokens] = useState<Token[]>([]);
    const getTokens = async () => {
        try {
            const response = await fetch(`${backendUrl}/premarket/tokens`);
            const data = await response.json();
            setTokens(data);
            console.log(`Tokens: ${data}`);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getTokens()
    }, [])
    return (
        <>
            <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-5 lg:gap-0 justify-between">
                <div className="space-y-1">
                    <H4>Live Pre-Market Trades</H4>
                    <PSmall className='underline'>How it works ?</PSmall >
                </div>

                <div className="flex gap-4 items-center">
                    {/* Search */}
                    {/* <div className="flex items-center gap-2 bg-card-bg text-input-field-text-color rounded px-2 md:px-4.5  w-2/5 md:w-full"> */}
                    <div className="flex items-center gap-2 bg-card-bg text-input-field-text-color rounded px-2 md:px-4.5 w-full">
                        <div className=""><LuSearch className="text-tag-stroke-color h-5 w-5" /></div>
                        <div className="w-fit md:w-full overflow-hidden">
                            <input type="text" placeholder="Search by token name" className="pe-4 py-3 focus:outline-none" />
                        </div>
                    </div>
                    {/* <Network /> */}
                </div>
            </div>

            <TokensGrid tokens={tokens}/>
        </>
    )
}