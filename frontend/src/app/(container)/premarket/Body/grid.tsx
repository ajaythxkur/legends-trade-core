'use client';
import { IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PSmall, H6, PExtraSmall, PLarge } from "@/components/ui/typography";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Token } from "@/types/premarket";
import CountDownBadge from "@/components/CountDownBadge";
import PremarketSkeletons from "@/components/skeletons/PremarketTokens";
import Empty from "@/components/Empty";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

interface TokenGridProps {
    tokens: Token[];
    loading: boolean
}
export default function TokensGrid({ tokens, loading }: TokenGridProps) {
    const { isLoading } = useWallet()
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const columns = 4;
    const toggleRow = (row: number) => {
        setExpandedRow(prev => (prev === row ? null : row));
    };

    if (loading || isLoading) return <PremarketSkeletons />
    if (tokens.length === 0) return <Empty title="Tokens not found." />

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-6">
                {tokens.map((token, index) => {
                    const rowIndex = Math.floor(index / columns);
                    const expanded = expandedRow === rowIndex;

                    const aptPrice = 5; //in used
                    const lastprice = (token.lastPrice / Math.pow(10, 8)) * aptPrice;
                    const vol24h = (token.vol24h / Math.pow(10, 8)) * aptPrice;
                    const totalVolume = (token.volAll / Math.pow(10, 8)) * aptPrice;

                    return (
                        <div key={index} className="bg-card-bg p-4 rounded-xl md:rounded-2xl space-y-3 md:space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Link href={`/premarket/${token.token_addr}`} className="w-full">
                                            <Image src={`${token.image ? token.image : '/media/token-img.png'}`} alt="token-image" width={42} height={42} className="h-10.5 w-10.5  rounded-full" />
                                        </Link>
                                        {
                                            token.chain_type === 0 &&
                                            <Image src="/media/aptos.svg" alt="token-image" width={42} height={42} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                                        }
                                        {
                                            token.chain_type === 1 &&
                                            <Image src="/media/solana.jpg" alt="token-image" width={42} height={42} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                                        }
                                        {
                                            token.chain_type === 2 &&
                                            <Image src="/media/ethereum.jpg" alt="token-image" width={42} height={42} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                                        }
                                    </div>

                                    <div className="space-y-1">
                                        <Link href={`/premarket/${token.token_addr}`} className="w-full"><H6 className="font-semibold text-primary-text-color">{token.symbol}</H6></Link>
                                        <PExtraSmall className="text-xs text-tertiary-text-color">{token.name}</PExtraSmall>
                                    </div>
                                </div>
                                <IoIosArrowUp
                                    className={`text-tertiary-action-text-color cursor-pointer transition-transform duration-300 ${expanded ? 'rotate-0' : 'rotate-180'}`}
                                    onClick={() => toggleRow(rowIndex)}
                                />
                            </div>

                            {/* Static Sections */}
                            <div className="flex justify-between items-center">
                                <PSmall className="text-sm text-tertiary-text-color">Last Price</PSmall>
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <H6 className="font-semibold text-primary-text-color">$ {lastprice}</H6>
                                    {/* <Badge variant="positive">+ 3.2%</Badge> */}
                                    {
                                        token.priceChange > 0 ?
                                            <Badge variant="positive">+ {token.priceChange}%</Badge>
                                            :
                                            <Badge variant="negative">{token.priceChange}%</Badge>
                                    }
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <PSmall className="text-sm text-tertiary-text-color">24 hr Vol</PSmall>
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <PLarge className="font-medium text-secondary-text-color">$ {vol24h.toFixed(4)}</PLarge>
                                    {/* <Badge variant="negative">+ 3.2%</Badge> */}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-0">
                                <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <PLarge className="font-medium text-secondary-text-color">$ {totalVolume.toFixed(4)}</PLarge>
                                    {/* <Badge variant="positive">+ 3.2%</Badge> */}
                                </div>
                            </div>

                            {/* Expandable Section */}
                            <div className={`transition-all duration-300 ease-in-out grid ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] overflow-hidden"}`}>
                                <div className="overflow-hidden">

                                    {/* Settlement Times */}
                                    <div className="space-y-3 my-4">
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Settle time start</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color flex flex-col justify-end items-end">
                                                {/* <span>{token.temp_starts_at ? token.temp_starts_at : ''}</span> */}
                                                <span>{token.temp_starts_at ? dayjs.unix(Number(token.temp_starts_at)).format("YYYY-MM-DD") : '---- -- --'}</span>
                                                <span className="text-xs">{token.temp_starts_at ? dayjs.unix(Number(token.temp_starts_at)).format("hh:mm A") : '-- : -- --'}</span>
                                            </PLarge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color flex flex-col justify-end items-end">
                                                <span>{token.temp_ends_at ? dayjs.unix(Number(token.temp_ends_at)).format("YYYY-DD-MM") : '---- -- --'}</span>
                                                <span className="text-xs">{token.temp_ends_at ? dayjs.unix(Number(token.temp_ends_at)).format("hh:mm A") : '-- : -- --'}</span>
                                            </PLarge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Count down</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color">
                                                <CountDownBadge settle_starts_at={token.settle_started_at} settle_duration={token.settle_duration} />
                                            </PLarge>
                                        </div>
                                    </div>

                                    {/* Pre Market Button */}
                                    <Link href={`/premarket/${token.token_addr}`} className="w-full">
                                        <Button className="w-full">Pre Market</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}