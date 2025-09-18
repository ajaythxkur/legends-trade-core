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
import { formatDateTime, formatPrice } from "@/utils/helpers";
import { chainIcons } from "@/utils/constants";
dayjs.extend(relativeTime)

interface TokenGridProps {
    tokens: Token[];
    loading: boolean
}
export default function TokensGrid({ tokens, loading }: TokenGridProps) {
    const { isLoading } = useWallet()
    const [expandedColumn, setExpandedColumn] = useState<number | null>(null);

    if (loading || isLoading) return <PremarketSkeletons />
    if (tokens.length === 0) return <Empty title="Tokens not found." />
    
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-6 items-start">
                {tokens.map((token, index) => {
                    const lastprice = formatPrice(token.lastPrice);
                    const vol24h = formatPrice(token.vol24h);
                    const totalVolume = formatPrice(token.volAll);
                    const startsAt = formatDateTime(Number(token.temp_starts_at));
                    const endsAt = formatDateTime(Number(token.temp_ends_at));

                    return (
                        <div key={index} className="bg-card-bg p-4 rounded-xl md:rounded-2xl space-y-3 md:space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Link href={`/premarket/${token.token_addr}`} className="w-full">
                                            <Image src={`${token.image ? token.image : '/media/token-img.png'}`} alt="token-image" width={42} height={42} className="h-10.5 w-10.5  rounded-full" />
                                        </Link>
                                        <Image src={chainIcons[token.chain_type]} alt="token-image" width={42} height={42} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                                    </div>
                                    <div className="space-y-1">
                                        <Link href={`/premarket/${token.token_addr}`} className="w-full"><H6 className="font-semibold text-primary-text-color">{token.symbol}</H6></Link>
                                        <PExtraSmall className="text-xs text-tertiary-text-color">{token.name}</PExtraSmall>
                                    </div>
                                </div>
                                <IoIosArrowUp
                                    className={`text-tertiary-action-text-color cursor-pointer transition-transform duration-300 
                                        ${expandedColumn === index ? 'rotate-0' : 'rotate-180'}`}
                                    onClick={() =>
                                        setExpandedColumn(expandedColumn === index ? null : index)
                                    }
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
                                            <Badge variant="positive">+ {token.priceChange.toFixed(2)}%</Badge>
                                            :
                                            <Badge variant="negative">{token.priceChange.toFixed(2)}%</Badge>
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
                            <div className={`transition-all duration-300 ease-in-out grid 
                                ${expandedColumn === index ? "grid-rows-[1fr]" : "grid-rows-[0fr] overflow-hidden"}`}>
                                <div className="overflow-hidden">

                                    {/* Settlement Times */}
                                    <div className="space-y-3 my-4">
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Settle time start</PSmall>
                                            {
                                                startsAt ?
                                                    <PLarge className="text-sm text-secondary-text-color flex flex-col">
                                                        <span>{startsAt.date}</span>
                                                        <span className="text-xs">{startsAt.time}</span>
                                                    </PLarge>
                                                    : '-'
                                            }
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
                                            {
                                                endsAt ?
                                                    <PLarge className="text-sm text-secondary-text-color flex flex-col">
                                                        <span>{endsAt.date}</span>
                                                        <span className="text-xs">{endsAt.time}</span>
                                                    </PLarge>
                                                    : '-'
                                            }
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Count down</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color">
                                                <CountDownBadge settle_starts_at={token.settle_started_at} settle_duration={token.settle_duration} />
                                            </PLarge>
                                        </div>
                                    </div>

                                    {/* Pre Market Button */}
                                    <Link prefetch href={`/premarket/${token.token_addr}`} className="w-full">
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