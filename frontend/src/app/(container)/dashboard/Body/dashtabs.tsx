'use client'
import { P, PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremarketSvg } from "@/components/icons/icons";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Token } from "@/types/premarket";
import CountDownBadge from "@/components/CountDownBadge";
import dayjs from "dayjs";
import PaginationNew from "@/components/Pagination";
import { Dispatch, SetStateAction, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import Empty from "@/components/Empty";
import { IoCloseOutline } from "react-icons/io5";
interface DashTabsProps {
    tokens: Token[];
    total: number;
    offset: number;
    setOffset: Dispatch<SetStateAction<number>>;
    loading: boolean,
    tokenStatus: string,
    setTokenStatus: Dispatch<SetStateAction<string>>
}
export default function DashTabs({ tokens, total, offset, setOffset, loading, tokenStatus, setTokenStatus }: DashTabsProps) {
    const tokenstatus = ['all', 'ended', 'not-started', 'ongoing'];
    const [currentTab, setCurrentTab] = useState(1)
    return (
        <Tabs defaultValue="premarket" className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
            <div className="flex flex-wrap md:flex-nowarp justify-between items-center gap-4">
                <TabsList>
                    <TabsTrigger value="premarket" onClick={() => setCurrentTab(1)}>PreMarket</TabsTrigger>
                    <TabsTrigger value="points" onClick={() => setCurrentTab(2)}>Points</TabsTrigger>
                    <TabsTrigger value="launchpad" onClick={() => setCurrentTab(3)}>Launchpad</TabsTrigger>
                </TabsList>

                {currentTab === 1 &&
                    <DropdownMenu>
                        <DropdownMenuTrigger className="py-2.5 md:py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                            Status<IoIosArrowDown className='ms-2' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Type </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                tokenstatus.map((t, i) => {
                                    return (
                                        <DropdownMenuItem
                                            key={i}
                                            onClick={() => setTokenStatus(t)}
                                            className={`capitalize ${tokenStatus === t ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                        >
                                            {t}
                                        </DropdownMenuItem>
                                    )
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            {tokenStatus !== 'all' &&
                <div className="badges lg:flex gap-4 items-center mt-4">
                    <Badge variant="outline" className="flex items-center gap-2 capitalize" onClick={() => setTokenStatus('all')}>{tokenStatus}<IoCloseOutline className="w-5 h-5" /></Badge>
                </div>
            }


            {/* Premarket tab content */}
            <TabsContent value="premarket" className="mt-4 lg:mt-8">
                <div className="grid gap-4 lg:gap-8 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
                    {
                        tokens.map((token, index) => {
                            return (
                                <div key={index} className="p-4 rounded-2xl bg-card-bg space-y-4">
                                    <div className="flex justify-between gap-4 items-center">
                                        <Link href={`/dashboard/premarket/${token.token_addr}`}>
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <Image src={`${token.image ? token.image : '/media/token-img.png'}`} alt="token" height={32} width={32} className="rounded-full" />
                                                    {
                                                        token.chain_type === 0 &&
                                                        <Image src="/media/aptos.png" alt="chain-icon" height={14} width={14} className="absolute bottom-0 -right-1" />
                                                    }
                                                </div>
                                                <div>
                                                    <PLarge className="text-primary-text-color">{token.symbol}</PLarge>
                                                    <PExtraSmall className="text-tertiary-text-color">{token.name}</PExtraSmall>
                                                </div>
                                            </div>
                                        </Link>
                                        <PremarketSvg className="text-tertiary-text-color" />
                                        <div className="text-center">
                                            <PSmall className="text-tertiary-text-color mb-2">Count down</PSmall>
                                            <CountDownBadge settle_starts_at={token.settle_started_at} settle_duration={token.settle_duration} />
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <PSmall className="text-tertiary-text-color">Total Offer</PSmall>
                                        <P className="flex-1 text-end">{token.totalOffers}</P>
                                    </div>

                                    <div className="flex justify-between">
                                        <PSmall className="text-tertiary-text-color">Total Order</PSmall>
                                        <P className="flex-1 text-end">{token.totalOrders}</P>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <PSmall className="text-tertiary-text-color">Settle starts</PSmall>
                                        {
                                            token.temp_starts_at ?
                                                <div className="text-primary-text-color text-end">
                                                    <P>{dayjs.unix(Number(token.temp_starts_at)).format("YYYY-DD-MM")}</P>
                                                    <PExtraSmall className="text-xs">{dayjs.unix(Number(token.temp_starts_at)).format("hh:mm A")}</PExtraSmall>
                                                </div>
                                                : '-'
                                        }
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <PSmall className="text-tertiary-text-color">Settle Ends</PSmall>
                                        {
                                            token.temp_ends_at ?
                                                <div className="text-primary-text-color text-end">
                                                    <P>{dayjs.unix(Number(token.temp_ends_at)).format("YYYY-DD-MM")}</P>
                                                    <PExtraSmall className="text-xs">{dayjs.unix(Number(token.temp_ends_at)).format("hh:mm A")}</PExtraSmall>
                                                </div>
                                                : '-'
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <PaginationNew total={total} offset={offset} setOffset={setOffset} loading={loading} />
            </TabsContent>

            {/* Points tab content */}
            <TabsContent value="points" className="mt-8">
                <Empty title="Coming Soon" />
            </TabsContent>

            {/* Launchpad tab content */}
            <TabsContent value="launchpad" className="mt-8">
                <div className="grid gap-4 lg:gap-8 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
                    {
                        Array.from({ length: 10 }).map((_, index) => {
                            return (
                                <div key={index} className="p-4 rounded-lg bg-card-bg">
                                    <div className="flex justify-between gap-4 items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <Image src="/media/aptos.svg" alt="chain-icon" height={32} width={32} />
                                            </div>
                                            <div>
                                                <PLarge className="text-primary-text-color">APT</PLarge>
                                                <PExtraSmall className="text-tertiary-text-color">Aptos</PExtraSmall>
                                            </div>
                                        </div>
                                        <Info className="h-4 w-4" />
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Order id</PSmall>
                                        <P className="text-primary-text-color">#5kd121</P>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Price</PSmall>
                                        <P className="text-primary-text-color">3000 APT/ETH</P>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Status</PSmall>
                                        <Badge variant="positive">Claimed</Badge>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Total Purchased</PSmall>
                                        <P className="text-primary-text-color">5 ETH</P>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Total Claimable</PSmall>
                                        <P className="text-primary-text-color">5 ETH</P>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <PSmall className="text-tertiary-text-color">Claim Starts </PSmall>
                                        <div className="text-primary-text-color text-end">
                                            <P>2025-16-06</P>
                                            <PExtraSmall>03:00 P.M</PExtraSmall>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Claim Duration </PSmall>
                                        <Badge variant="negative">2 hrs left</Badge>
                                    </div>

                                    <div className="flex mt-4 gap-4">
                                        <Button variant="ghost" className="flex-1">View Project </Button>

                                        {/* only show if claim available */}
                                        <Button className="flex-1">Claim</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </TabsContent>
        </Tabs>
    )
}