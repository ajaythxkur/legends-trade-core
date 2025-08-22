'use client';
import Image from 'next/image';
import { H4, H5, PExtraSmall, PMedium, PSmall } from '@/components/ui/typography';
import { FaXTwitter } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { LuGlobe } from 'react-icons/lu';
import Filters from './filters';
import Trades from './trades';
export default function Body({ id }: { id: string }) {
    return (
        <>
            {/* Token Data */}
            <div className="border-b border-border-color pb-4">
                <div className="flex gap-6 flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/media/token-img.png" alt="token-image" width={50} height={50} className="rounded-full" />
                        <div>
                            <H5 className="font-semibold text-primary-text-color">CTK {id}</H5>
                            <PExtraSmall className="text-tertiary-text-color mt-2">CryptoKitty</PExtraSmall>
                        </div>
                    </div>
                    {/* Price */}
                    <div className="text-center">
                        <div className="flex items-center gap-2">
                            <PMedium className="font-semibold me-2 text-primary-text-color">$ 0.78</PMedium>
                            <Badge variant="positive">+ 3.2%</Badge>
                        </div>
                        <PExtraSmall className="text-tertiary-text-color mt-2">-</PExtraSmall>
                    </div>
                    {/* 24h Volume */}
                    <div className="text-center pt-4 md:pt-0">
                        <div className="flex items-center gap-2">
                            <PMedium className="font-medium text-secondary-text-color">$ 300,000</PMedium>
                            <Badge variant="negative">+ 3.2%</Badge>
                        </div>
                        <PExtraSmall className="text-tertiary-text-color mt-2">24h Volume</PExtraSmall>
                    </div>

                    {/* Total Volume */}
                    <div className="text-center pt-4 md:pt-0">
                        <div className="flex items-center gap-2">
                            <PMedium className="font-medium text-secondary-text-color">$ 300,000</PMedium>
                            <Badge variant="positive">+ 3.2%</Badge>
                        </div>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Total Volume</PExtraSmall>
                    </div>

                    {/* Settle Time Start */}
                    <div className="text-center  pt-4 md:pt-0">
                        <PMedium className="text-sm text-secondary-text-color flex flex-col">
                            <span>2025-16-06</span>
                            <span className='text-xs'>06:00 P.M</span>
                        </PMedium>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Settle time start</PExtraSmall>
                    </div>

                    {/* Settle Time end */}
                    <div className="text-center  pt-4 md:pt-0">
                        <PMedium className="text-sm text-secondary-text-color flex flex-col">
                            <span>2025-16-06</span>
                            <span className='text-xs'>06:00 P.M</span>
                        </PMedium>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Settle time end</PExtraSmall>
                    </div>

                    <div className="text-center  pt-4 md:pt-0">
                        <PExtraSmall className="text-tertiary-text-color mb-2">Settle time end</PExtraSmall>
                        <Badge variant="warning">ended</Badge>
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-3  pt-4 md:pt-0">
                        <Link href="#" className="p-2 hover:bg-card-bg rounded-full cursor-pointer"><FaXTwitter className='text-2xl' /></Link>
                        <Link href="#" className="p-2 hover:bg-card-bg rounded-full cursor-pointer"><LuGlobe className='text-2xl' /></Link>
                    </div>
                </div>
            </div>

            {/* Filter row */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mt-6">
                <div className='space-y-1 pb-4 md:pb-0'>
                    <H4>My Pre-Market Trades</H4>
                    <PSmall className='underline'>How it works ?</PSmall >
                </div>
                <Filters />
            </div>

            {/* Trades table */}
            <div className="mt-6">
                <Trades />
            </div>
        </>
    )
}