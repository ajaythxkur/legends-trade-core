'use client'
import { H4, PSmall } from "@/components/ui/typography";
import TokensGrid from "./grid";
import { LuSearch } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import { Token } from "@/types/premarket";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useRouter } from "next/navigation";
import backendApi from "@/utils/backendApi";



export default function Body() {
    const router = useRouter();
    const [tokens, setTokens] = useState<Token[]>([]);
    const [offset, setOffset] = useState(0);
    const [sortOrder, setSortOrder] = useState('desc');
    const [search, setSearch] = useState('');
    const [network, setNetwork] = useState(0);
    const [isLoading, setisLoading] = useState(false);
    const [debounce, setDebounce] = useState('')

    const getTokens = useCallback(async () => {
        try {
            setisLoading(true);
            const response = await backendApi.getPremarketTokens(search, 2, offset, sortOrder, network);
            setTokens(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    }, [offset, sortOrder, network, search])
    useEffect(() => {
        getTokens()
    }, [getTokens])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(debounce)
        }, 2000);
        return () => clearTimeout(timer)
    }, [debounce])

    return (
        <>
            <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-5 lg:gap-0 justify-between">
                <div className="space-y-1">
                    <H4>Live Pre-Market Trades</H4>
                    <PSmall className='underline'>How it works ?</PSmall>
                </div>

                <div className="flex gap-4 items-center">
                    {/* sortby */}
                    <Select onValueChange={(value) => setSortOrder(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Latest</SelectItem>
                            <SelectItem value="asc">Older</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Network */}
                    <Select onValueChange={(value) => setNetwork(Number(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Network" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0" onClick={() => setNetwork(0)}>Aptos</SelectItem>
                            <SelectItem value="1" onClick={() => setNetwork(1)}>Solana</SelectItem>
                            <SelectItem value="2" onClick={() => setNetwork(2)}>Ethereum</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* <Network /> */}
                    {/* Search */}
                    <div className="flex items-center gap-2 bg-card-bg text-input-field-text-color rounded px-2 md:px-4.5 w-full">
                        <div className=""><LuSearch className="text-tag-stroke-color h-5 w-5" /></div>
                        <div className="w-fit md:w-full overflow-hidden">
                            <input
                                type="text"
                                value={debounce}
                                onChange={(e) => setDebounce(e.target.value)}
                                placeholder="Search by token name"
                                className="pe-4 py-3 focus:outline-none"
                            />
                        </div>
                        {
                            debounce !== '' && isLoading &&
                            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        }
                    </div>
                </div>
            </div>

            <TokensGrid tokens={tokens} loading={isLoading} />
        </>
    )
}