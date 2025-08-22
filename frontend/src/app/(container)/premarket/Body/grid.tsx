'use client';
import { IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PSmall, H6, PExtraSmall, PLarge } from "@/components/ui/typography";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export default function TokensGrid() {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const columns = 4;
    const toggleRow = (row: number) => {
        setExpandedRow(prev => (prev === row ? null : row));
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-6">
                {Array.from({ length: 10 }).map((_, index) => {
                    const rowIndex = Math.floor(index / columns);
                    const expanded = expandedRow === rowIndex;
                    return (
                        <div key={index} className="bg-card-bg p-4 rounded-xl md:rounded-2xl space-y-3 md:space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src="/media/token-img.png" alt="token-image" width={42} height={42} className="h-10.5 w-10.5  rounded-full" />
                                    <div className="space-y-1">
                                        <H6 className="font-semibold text-primary-text-color">CTK</H6>
                                        <PExtraSmall className="text-xs text-tertiary-text-color">CryptoKitty</PExtraSmall>
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
                                    <H6 className="font-semibold text-primary-text-color">$ 0.78</H6>
                                    <Badge variant="positive">+ 3.2%</Badge>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <PSmall className="text-sm text-tertiary-text-color">24 hr Vol</PSmall>
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <PLarge className="font-medium text-secondary-text-color">$ 300,000</PLarge>
                                    <Badge variant="negative">+ 3.2%</Badge>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-0">
                                <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <PLarge className="font-medium text-secondary-text-color">$ 310,000</PLarge>
                                    <Badge variant="positive">+ 3.2%</Badge>
                                </div>
                            </div>

                            {/* Expandable Section */}
                            <div className={`transition-all duration-300 ease-in-out grid ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] overflow-hidden"}`}>
                                <div className="overflow-hidden">

                                    {/* Settlement Times */}
                                    <div className="space-y-3 my-4">
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Settle time start</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color">-</PLarge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color">-</PLarge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <PSmall className="text-sm text-tertiary-text-color">Count down</PSmall>
                                            <PLarge className="text-sm text-secondary-text-color">-</PLarge>
                                        </div>
                                    </div>

                                    {/* Pre Market Button */}
                                    <Link href={`/premarket/${index}`} className="w-full">
                                        <Button className="w-full">Pre Market</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div >
        </>
    )
}