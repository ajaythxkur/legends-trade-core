'use client'
import { H4, PSmall } from "@/components/ui/typography";
import TokensGrid from "./grid";
import { useCallback, useEffect, useState } from "react";
import { Token } from "@/types/premarket";
import backendApi from "@/utils/backendApi";
import Filters from "./Filters";
import Pagination from "@/components/Pagination";
import PaginationNew from "@/components/PaginationNew";

export default function Body() {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0)
    const [sortOrder, setSortOrder] = useState('desc');
    const [search, setSearch] = useState('');
    const [network, setNetwork] = useState(0);
    const [isLoading, setisLoading] = useState(false);
    const [debounce, setDebounce] = useState('')

    const getTokens = useCallback(async () => {
        try {
            setisLoading(true);
            const response = await backendApi.getPremarketTokens(search, 10, offset, sortOrder, network);
            setTokens(response.data.data);
            // if (offset === 0) {
            //     setTokens(response.data.data);
            // } else {
            //     setTokens(prev => [...prev, ...response.data.data]);
            // }
            setTotal(response.data.count);
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
                <Filters
                    sortOrder={sortOrder}
                    network={network}
                    setSortOrder={setSortOrder}
                    setNetwork={setNetwork}
                    debounce={debounce}
                    setDebounce={setDebounce}
                    isLoading={isLoading}
                />
            </div>

            <TokensGrid tokens={tokens} loading={isLoading} />

            {/* <Pagination
                offset={offset}
                setOffset={setOffset}
                total={total}
                loading={isLoading}
            /> */}
            <PaginationNew offset={offset} setOffset={setOffset} total={total} loading={isLoading} />
        </>
    )
}