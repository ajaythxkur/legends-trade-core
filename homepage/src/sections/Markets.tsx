import { Marquee } from '@/components/marque';
import Section from '@/components/section';
import { H2, PLarge, PSmall, PXLarge, Tagline } from '@/components/typography';
import Image from 'next/image';
import React from 'react';

const Markets = () => {
    const trades = [1, 2, 3, 4, 5]; 

    return (
        <Section className='bg-background text-white ' aria-labelledby="markets-heading">
            
            <div className="flex-1 mb-8 md:mb-0">
                <Tagline>Live Markets</Tagline>
                <H2>
                    Explore what’s live.
                </H2>
                <PXLarge weight='regular'>
                    Real-time prices, active deals, and open trades updated as they happen.
                </PXLarge>
            </div>C

            {/* Marquee */}
            <div className="relative flex w-full flex-col mt-8 items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {trades.map((trade, i) => (
                        <TradeCard key={i} />
                    ))}
                </Marquee>
            </div>
        </Section>
    )
}

export default Markets;

const TradeCard = () => {
    return (
        <div className='bg-white space-y-4 text-background text-left p-4 rounded-2xl max-w-sm mr-4'>
            {/* Card Header */}
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <div>
                        <Image src={"/coin-cat.png"} height={40} width={40} alt='' />
                    </div>
                    <div>
                        <Tagline weight='medium'>CTK</Tagline>
                        <PSmall weight='regular'>CryptoKitty</PSmall>
                    </div>
                </div>
                {/* badge */}
                <Tagline className='bg-[#E4E9FE] h-fit text-[#2E52E5] p-2 rounded-lg'>
                    Point Market
                </Tagline>
            </div>

            {/* body */}
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <PSmall>Last  Price</PSmall>
                    <div className='flex gap-1 items-center'>
                        <PLarge>$ 0.78</PLarge>
                        {/* badge */}
                        <Tagline className='bg-[#DEFCE3] h-fit text-[#0F7D24] p-2 rounded-lg'>
                            + 3.2%
                        </Tagline>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <PSmall>24 hr Vol</PSmall>
                    <div className='flex gap-1 items-center'>
                        <PLarge>$ 300</PLarge>
                        {/* badge */}
                        <Tagline className='bg-[#FDCCCC] h-fit text-[#870101] p-2 rounded-lg'>
                            - 3.2%
                        </Tagline>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <PSmall>Total volume</PSmall>
                    <div className='flex gap-1 items-center'>
                        <PLarge>$ 0.78</PLarge>
                        {/* badge */}
                        <Tagline className='bg-[#DEFCE3] h-fit text-[#0F7D24] p-2 rounded-lg'>
                            + 3.2%
                        </Tagline>
                    </div>
                </div>
            </div>
        </div>
    )
}
