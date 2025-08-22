import { P, PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PointsSvg, PremarketSvg } from "@/components/icons/icons";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function DashTabs() {
    return (
        <Tabs defaultValue="premarket" className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
            <TabsList>
                <TabsTrigger value="premarket">PreMarket</TabsTrigger>
                <TabsTrigger value="points">Points</TabsTrigger>
                <TabsTrigger value="launchpad">Launchpad</TabsTrigger>
            </TabsList>

            {/* Premarket tab content */}
            <TabsContent value="premarket" className="mt-4 lg:mt-8">
                <div className="grid gap-4 lg:gap-8 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
                    {
                        Array.from({ length: 10 }).map((_, index) => {
                            return (
                                <div key={index} className="p-4 rounded-lg bg-card-bg">
                                    <div className="flex justify-between gap-4 items-center">
                                        <Link href={`/dashboard/premarket/${index}`}>
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <Image src="/media/ido-token.png" alt="token" height={32} width={32} />
                                                    <Image src="/media/aptos.png" alt="chain-icon" height={14} width={14} className="absolute bottom-0 -left-1" />
                                                </div>
                                                <div>
                                                    <PLarge className="text-primary-text-color">TOK</PLarge>
                                                    <PExtraSmall className="text-tertiary-text-color">Aptos</PExtraSmall>
                                                </div>
                                            </div>
                                        </Link>
                                        <PremarketSvg className="text-tertiary-text-color" />
                                        <div className="text-center">
                                            <PSmall className="text-tertiary-text-color mb-2">Count down</PSmall>

                                            {/* Badges */}
                                            <Badge variant="warning">ended</Badge>
                                            {/* <Badge variant="positive">success</Badge>
                                                <Badge variant="negative">rejected</Badge>
                                                <Badge variant="info">12:00 hr</Badge>
                                                <Badge variant="input">Not Started</Badge> */}
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Total Offer</PSmall>
                                        <P className="flex-1 text-end">20</P>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <PSmall className="text-tertiary-text-color">Total Order</PSmall>
                                        <P className="flex-1 text-end">15</P>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <PSmall className="text-tertiary-text-color">Settle starts UTC</PSmall>
                                        <div className="text-primary-text-color text-end">
                                            <P>2025-16-06</P>
                                            <PExtraSmall>03:00 P.M</PExtraSmall>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <PSmall className="text-tertiary-text-color">Settle Ends UTC</PSmall>
                                        <div className="text-primary-text-color text-end">
                                            <P>2025-16-06</P>
                                            <PExtraSmall>03:00 P.M</PExtraSmall>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </TabsContent>

            {/* Points tab content */}
            <TabsContent value="points" className="mt-8">
                Points <PointsSvg className="text-tertiary-text-color" />
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