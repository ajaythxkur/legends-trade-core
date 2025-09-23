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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatDateTime } from "@/utils/helpers";
import { chainIcons } from "@/utils/constants";
import { useApp } from "@/contexts/AppProvider";
import { testnetTokens } from "@/cross-chain-core";
dayjs.extend(relativeTime)

interface TokenGridProps {
    tokens: Token[];
    loading: boolean
}
export default function TokensGrid({ tokens, loading }: TokenGridProps) {
    // const { isLoading } = useWallet()
    const { tokenPrices } = useApp()
    const [expandedColumn, setExpandedColumn] = useState<number | null>(null);

    if (loading) return <PremarketSkeletons />
    if (tokens.length === 0) return <Empty title="Tokens not found." className="mt-4"/>

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-6 items-start">
                {tokens.map((token, index) => {
                    const vol24h = (token.vol24h / Math.pow(10, 8)) * 4.3;
                    const totalVolume = (token.volAll / Math.pow(10, 8)) * 4.3;

                    const startsAt = formatDateTime(Number(token.temp_starts_at));
                    const endsAt = formatDateTime(Number(token.temp_ends_at));
                    
                    const last_price_coll = token.lastPriceCollateral;

                    if (!last_price_coll) {
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
                                        <H6 className="font-semibold text-primary-text-color">$ {0.00}</H6>
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
                                        <PLarge className="font-medium text-secondary-text-color">$ {vol24h.toFixed(2)}</PLarge>
                                        {/* <Badge variant="negative">+ 3.2%</Badge> */}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-0">
                                    <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
                                    <div className="flex gap-2 items-center flex-wrap justify-end">
                                        <PLarge className="font-medium text-secondary-text-color">$ {totalVolume.toFixed(2)}</PLarge>
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
                        )
                    }

                    // const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]
                    const collateralTokens = testnetTokens["Aptos"]
                    const collateralToken = collateralTokens.find(
                        (coll) => coll.tokenId.address.toLowerCase() === last_price_coll.toLowerCase()
                    );
                    if (!collateralToken) {
                        console.warn(`No collateral found for ${last_price_coll}`);
                        return null;
                    }
                    if (!tokenPrices) {
                        console.warn("Token prices not loaded yet");
                        return null;
                    }
                    const collTokenPrice = tokenPrices[collateralToken.symbol] ?? 0;

                    const lastprice = (token.lastPrice / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice;
                    const formatlastPrice = Math.round(lastprice * 100) / 100;
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
                                    <H6 className="font-semibold text-primary-text-color">$ {formatlastPrice}</H6>
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
                                    <PLarge className="font-medium text-secondary-text-color">$ {vol24h.toFixed(2)}</PLarge>
                                    {/* <Badge variant="negative">+ 3.2%</Badge> */}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-0">
                                <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <PLarge className="font-medium text-secondary-text-color">$ {totalVolume.toFixed(2)}</PLarge>
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




// 'use client';
// import { IoIosArrowUp } from "react-icons/io";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { PSmall, H6, PExtraSmall, PLarge } from "@/components/ui/typography";
// import { Dispatch, SetStateAction, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { Token } from "@/types/premarket";
// import CountDownBadge from "@/components/CountDownBadge";
// import PremarketSkeletons from "@/components/skeletons/PremarketTokens";
// import Empty from "@/components/Empty";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime'
// import { formatDateTime, formatPrice } from "@/utils/helpers";
// import { chainIcons } from "@/utils/constants";
// import { useApp } from "@/contexts/AppProvider";
// import { testnetTokens } from "@/cross-chain-core";
// dayjs.extend(relativeTime)

// interface TokenGridProps {
//     tokens: Token[];
//     loading: boolean
// }

// export default function TokensGrid({ tokens, loading }: TokenGridProps) {
//     const { isLoading } = useWallet()
//     const { sourceChain, tokenPrices } = useApp()
//     const [expandedColumn, setExpandedColumn] = useState<number | null>(null);
//     const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]

//     if (loading || isLoading) return <PremarketSkeletons />
//     if (tokens.length === 0) return <Empty title="Tokens not found." />

//     return (
//         <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-6 items-start">
//                 {tokens.map((token, index) => {
//                     const startsAt = formatDateTime(Number(token.temp_starts_at));
//                     const endsAt = formatDateTime(Number(token.temp_ends_at));

//                     // Check if we have the new volume structure from the updated backend
//                     const hasNewVolumeStructure = 'vol24hUsdcVolumeUSD' in token || 'vol24hAptVolumeUSD' in token;

//                     let vol24h: number;
//                     let totalVolume: number;

//                     if (hasNewVolumeStructure) {
//                         // Use the new separated volume data from backend (already in USD)
//                         vol24h = token.vol24h || 0;
//                         totalVolume = token.volAll || 0;
//                     } else {
//                         // Fallback to old calculation method (assuming all volumes are in APT)
//                         vol24h = (token.vol24h / Math.pow(10, 8)) * 4.3;
//                         totalVolume = (token.volAll / Math.pow(10, 8)) * 4.3;
//                     }

//                     const last_price_coll = token.lastPriceCollateral;

//                     // Handle case where no collateral info is available
//                     if (!last_price_coll) {
//                         return (
//                             <TokenCard
//                                 key={index}
//                                 token={token}
//                                 expandedColumn={expandedColumn}
//                                 setExpandedColumn={setExpandedColumn}
//                                 index={index}
//                                 formatlastPrice={0}
//                                 vol24h={vol24h}
//                                 totalVolume={totalVolume}
//                                 startsAt={startsAt}
//                                 endsAt={endsAt}
//                                 hasNewVolumeStructure={hasNewVolumeStructure}
//                             />
//                         );
//                     }

//                     // Handle case where we have the new backend structure with lastPriceUSD
//                     if ('lastPriceUSD' in token && token.lastPriceUSD !== undefined) {
//                         return (
//                             <TokenCard
//                                 key={index}
//                                 token={token}
//                                 expandedColumn={expandedColumn}
//                                 setExpandedColumn={setExpandedColumn}
//                                 index={index}
//                                 formatlastPrice={token.lastPriceUSD}
//                                 vol24h={vol24h}
//                                 totalVolume={totalVolume}
//                                 startsAt={startsAt}
//                                 endsAt={endsAt}
//                                 hasNewVolumeStructure={hasNewVolumeStructure}
//                             />
//                         );
//                     }

//                     // Fallback to old calculation method
//                     const collateralToken = collateralTokens.find(
//                         (coll) => coll.tokenId.address.toLowerCase() === last_price_coll.toLowerCase()
//                     );
                    
//                     if (!collateralToken) {
//                         console.warn(`No collateral found for ${last_price_coll}`);
//                         return null;
//                     }
                    
//                     if (!tokenPrices) {
//                         console.warn("Token prices not loaded yet");
//                         return null;
//                     }
                    
//                     const collTokenPrice = tokenPrices[collateralToken.symbol] ?? 0;
//                     const lastprice = (token.lastPrice / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice;
//                     const formatlastPrice = Math.round(lastprice * 100) / 100;

//                     return (
//                         <TokenCard
//                             key={index}
//                             token={token}
//                             expandedColumn={expandedColumn}
//                             setExpandedColumn={setExpandedColumn}
//                             index={index}
//                             formatlastPrice={formatlastPrice}
//                             vol24h={vol24h}
//                             totalVolume={totalVolume}
//                             startsAt={startsAt}
//                             endsAt={endsAt}
//                             hasNewVolumeStructure={hasNewVolumeStructure}
//                         />
//                     );
//                 })}
//             </div>
//         </>
//     )
// }

// interface TokenCardProps {
//     token: Token;
//     expandedColumn: number | null;
//     setExpandedColumn: Dispatch<SetStateAction<number | null>>;
//     index: number;
//     formatlastPrice: number;
//     vol24h: number;
//     totalVolume: number;
//     startsAt: any;
//     endsAt: any;
//     hasNewVolumeStructure: boolean;
// }

// const TokenCard = ({ 
//     token, 
//     expandedColumn, 
//     setExpandedColumn,
//     index,
//     formatlastPrice,
//     vol24h,
//     totalVolume,
//     startsAt,
//     endsAt,
//     hasNewVolumeStructure
// }: TokenCardProps) => {

//     // Volume breakdown display (only show if we have the new structure)
//     const showVolumeBreakdown = hasNewVolumeStructure && (
//         ('vol24hUsdcVolumeUSD' in token && token.volAll > 0) ||
//         ('vol24hAptVolumeUSD' in token && token.volAll > 0)
//     );

//     return (
//         <div className="bg-card-bg p-4 rounded-xl md:rounded-2xl space-y-3 md:space-y-4">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                     <div className="relative">
//                         <Link href={`/premarket/${token.token_addr}`} className="w-full">
//                             <Image 
//                                 src={`${token.image ? token.image : '/media/token-img.png'}`} 
//                                 alt="token-image" 
//                                 width={42} 
//                                 height={42} 
//                                 className="h-10.5 w-10.5 rounded-full" 
//                             />
//                         </Link>
//                         <Image 
//                             src={chainIcons[token.chain_type]} 
//                             alt="chain-image" 
//                             width={42} 
//                             height={42} 
//                             className="h-4 w-4 rounded-full absolute bottom-0 right-0" 
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <Link href={`/premarket/${token.token_addr}`} className="w-full">
//                             <H6 className="font-semibold text-primary-text-color">{token.symbol}</H6>
//                         </Link>
//                         <PExtraSmall className="text-xs text-tertiary-text-color">{token.name}</PExtraSmall>
//                     </div>
//                 </div>
//                 <IoIosArrowUp
//                     className={`text-tertiary-action-text-color cursor-pointer transition-transform duration-300 
//                         ${expandedColumn === index ? 'rotate-0' : 'rotate-180'}`}
//                     onClick={() =>
//                         setExpandedColumn(expandedColumn === index ? null : index)
//                     }
//                 />
//             </div>

//             {/* Static Sections */}
//             <div className="flex justify-between items-center">
//                 <PSmall className="text-sm text-tertiary-text-color">Last Price</PSmall>
//                 <div className="flex gap-2 items-center flex-wrap justify-end">
//                     <H6 className="font-semibold text-primary-text-color">
//                         $ {formatlastPrice.toFixed(2)}
//                     </H6>
//                     {token.priceChange !== undefined && (
//                         token.priceChange > 0 ?
//                             <Badge variant="positive">+ {token.priceChange.toFixed(2)}%</Badge>
//                             :
//                             <Badge variant="negative">{token.priceChange.toFixed(2)}%</Badge>
//                     )}
//                 </div>
//             </div>

//             <div className="flex justify-between items-center">
//                 <PSmall className="text-sm text-tertiary-text-color">24 hr Vol</PSmall>
//                 <div className="flex gap-2 items-center flex-wrap justify-end">
//                     <PLarge className="font-medium text-secondary-text-color">
//                         $ {vol24h.toFixed(2)}
//                     </PLarge>
//                     {showVolumeBreakdown && (
//                         <div className="text-xs text-tertiary-text-color">
//                             {('vol24hUsdcVolumeUSD' in token && token.volAll > 0) && (
//                                 <span>USDC: ${token.volAll.toFixed(0)}</span>
//                             )}
//                             {('vol24hAptVolumeUSD' in token && token.volAll > 0) && (
//                                 <>
//                                     {('vol24hUsdcVolumeUSD' in token && token.volAll > 0) && ' | '}
//                                     <span>APT: ${token.volAll.toFixed(0)}</span>
//                                 </>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="flex justify-between items-center mb-0">
//                 <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
//                 <div className="flex gap-2 items-center flex-wrap justify-end">
//                     <PLarge className="font-medium text-secondary-text-color">
//                         $ {totalVolume.toFixed(2)}
//                     </PLarge>
//                     {showVolumeBreakdown && (
//                         <div className="text-xs text-tertiary-text-color">
//                             {('totalUsdcVolumeUSD' in token && token.volAll > 0) && (
//                                 <span>USDC: ${token.volAll.toFixed(0)}</span>
//                             )}
//                             {('totalAptVolumeUSD' in token && token.volAll > 0) && (
//                                 <>
//                                     {('totalUsdcVolumeUSD' in token && token.volAll > 0) && ' | '}
//                                     <span>APT: ${token.volAll.toFixed(0)}</span>
//                                 </>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Expandable Section */}
//             <div className={`transition-all duration-300 ease-in-out grid 
//                 ${expandedColumn === index ? "grid-rows-[1fr]" : "grid-rows-[0fr] overflow-hidden"}`}>
//                 <div className="overflow-hidden">
//                     {/* Settlement Times */}
//                     <div className="space-y-3 my-4">
//                         <div className="flex justify-between items-center">
//                             <PSmall className="text-sm text-tertiary-text-color">Settle time start</PSmall>
//                             {startsAt ? (
//                                 <PLarge className="text-sm text-secondary-text-color flex flex-col">
//                                     <span>{startsAt.date}</span>
//                                     <span className="text-xs">{startsAt.time}</span>
//                                 </PLarge>
//                             ) : '-'}
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
//                             {endsAt ? (
//                                 <PLarge className="text-sm text-secondary-text-color flex flex-col">
//                                     <span>{endsAt.date}</span>
//                                     <span className="text-xs">{endsAt.time}</span>
//                                 </PLarge>
//                             ) : '-'}
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <PSmall className="text-sm text-tertiary-text-color">Count down</PSmall>
//                             <PLarge className="text-sm text-secondary-text-color">
//                                 <CountDownBadge 
//                                     settle_starts_at={token.settle_started_at} 
//                                     settle_duration={token.settle_duration} 
//                                 />
//                             </PLarge>
//                         </div>

//                         {/* Enhanced Volume Breakdown (in expanded section) */}
//                         {hasNewVolumeStructure && (
//                             <>
//                                 {/* 24h Volume Breakdown */}
//                                 {(('vol24hUsdcVolume' in token && token.vol24hUsdcVolume) || 
//                                   ('vol24hAptVolume' in token && token.vol24hAptVolume)) && (
//                                     <>
//                                         <div className="border-t border-border pt-3 mt-4">
//                                             <PSmall className="text-sm text-tertiary-text-color mb-2">24h Volume Breakdown</PSmall>
//                                         </div>
//                                         {('vol24hUsdcVolume' in token && token.vol24hUsdcVolume) && (
//                                             <div className="flex justify-between items-center">
//                                                 <PExtraSmall className="text-xs text-tertiary-text-color">24h USDC Vol</PExtraSmall>
//                                                 <PExtraSmall className="text-xs text-secondary-text-color">
//                                                     {token.volAll} USDC (${('vol24hUsdcVolumeUSD' in token) ? token.volAll.toFixed(2) : '0.00'})
//                                                 </PExtraSmall>
//                                             </div>
//                                         )}
//                                         {('vol24hAptVolume' in token && token.vol24hAptVolume) && (
//                                             <div className="flex justify-between items-center">
//                                                 <PExtraSmall className="text-xs text-tertiary-text-color">24h APT Vol</PExtraSmall>
//                                                 <PExtraSmall className="text-xs text-secondary-text-color">
//                                                     {token.volAll} APT (${('vol24hAptVolumeUSD' in token) ? token.volAll.toFixed(2) : '0.00'})
//                                                 </PExtraSmall>
//                                             </div>
//                                         )}
//                                     </>
//                                 )}

//                                 {/* Total Volume Breakdown */}
//                                 {(('totalUsdcVolume' in token && token.totalUsdcVolume) || 
//                                   ('totalAptVolume' in token && token.totalAptVolume)) && (
//                                     <>
//                                         <div className="border-t border-border pt-3 mt-4">
//                                             <PSmall className="text-sm text-tertiary-text-color mb-2">Total Volume Breakdown</PSmall>
//                                         </div>
//                                         {('totalUsdcVolume' in token && token.totalUsdcVolume) && (
//                                             <div className="flex justify-between items-center">
//                                                 <PExtraSmall className="text-xs text-tertiary-text-color">Total USDC Vol</PExtraSmall>
//                                                 <PExtraSmall className="text-xs text-secondary-text-color">
//                                                     {token.volAll} USDC (${('totalUsdcVolumeUSD' in token) ? token.volAll.toFixed(2) : '0.00'})
//                                                 </PExtraSmall>
//                                             </div>
//                                         )}
//                                         {('totalAptVolume' in token && token.totalAptVolume) && (
//                                             <div className="flex justify-between items-center">
//                                                 <PExtraSmall className="text-xs text-tertiary-text-color">Total APT Vol</PExtraSmall>
//                                                 <PExtraSmall className="text-xs text-secondary-text-color">
//                                                     {token.volAll} APT (${('totalAptVolumeUSD' in token) ? token.volAll.toFixed(2) : '0.00'})
//                                                 </PExtraSmall>
//                                             </div>
//                                         )}
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </div>

//                     {/* Pre Market Button */}
//                     <Link prefetch href={`/premarket/${token.token_addr}`} className="w-full">
//                         <Button className="w-full">Pre Market</Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };