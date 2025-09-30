import Section from '@/components/section'
import { H2, H4, PXLarge, Tagline } from '@/components/typography'
import Image from 'next/image'
import React from 'react'

const Solution = () => {
    return (
        <Section className='space-y-20' id='solution'>
            <div>
                <Tagline>Solution</Tagline>
                <H2>
                    Every Phase. One Place.
                </H2>
                <PXLarge weight='regular'>
                    Trade tokens at any stage before they exist, as they launch, and after they <br /> grow. All with one wallet, no friction.
                </PXLarge>
            </div>


            {/* Problem Cards */}
            <div className="max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-11 mx-auto ">
                {/* Background Mask */}


                <div className='flex gap-6 lg:gap-11 flex-col'>
                    {/* 1st */}
                    <div className="p-6 md:p-12 border-2 relative border-[#EAC002] flex overflow-hidden gap-2 lg:min-w-sm w-full text-left rounded-[40px] flex-col backdrop-blur-xl">
                        <Tagline>Points Market</Tagline>
                        <H4 className="font-bold text-[#302800]" >Speculate Before Tokens Exist</H4>
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#fdfdfc] via-[#fffff3] to-[#ffde4b] opacity-90" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <Image src={"/point1.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Trade reward points before any token is live.
                                    No liquidity? No problem.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point1.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Points have value and you can trade them today.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point1.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Turn early participation into early gains.
                                </PXLarge>
                            </div>
                        </div>

                        <Image src={"/points-bg.png"} height={155} width={528} alt="" className="" />
                    </div>

                    {/* 2nd */}
                    <div className="p-6 md:p-12 border-2 relative border-[#6315FB] h-[27rem] lg:h-[50%] flex overflow-hidden gap-2 lg:min-w-sm w-full text-left rounded-[40px] flex-col backdrop-blur-xl">
                        <Tagline>  Bonding Curve Launches</Tagline>
                        <H4 className="font-bold text-[#32194A]">Trade with Built-in Price Discovery</H4>
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#fffdff] via-[#fdf0fb] to-[#d7c3ff] opacity-90" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <Image src={"/point3.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Token price moves with demand using a bonding curve.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point3.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    No whales. No dumps. Just the curve.
                                </PXLarge>
                            </div>
                        </div>
                        <div className='absolute bottom-0'>
                            <Image src={"/bonding-bg.png"} height={288} width={528} alt="" className="w-full " />
                        </div>

                    </div>
                </div>

                <div className='flex gap-11 flex-col'>
                    {/* 3rd */}
                    <div className="p-6 md:p-12  border-2 relative border-[#FF58E4] h-fit flex overflow-hidden gap-2 lg:min-w-sm w-full text-left rounded-[40px] flex-col backdrop-blur-xl">
                        <Tagline>Fair IDOs</Tagline>
                        <H4 className="font-bold text-[#351931]">Public Launches Without the Games</H4>
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#fffdff] via-[#fdf0fb] to-[#ffcbf6] opacity-90" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <Image src={"/point2.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Timed IDOs with transparent rules built for real users.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point2.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Fair launches should be the default.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point2.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    No bots. No backdoors
                                </PXLarge>
                            </div>
                        </div>

                    </div>


                    {/* 4th */}
                    <div className="p-6 md:p-12 border-2 relative border-[#00324C] h-fit flex overflow-hidden gap-2 lg:min-w-sm w-full text-left rounded-[40px] flex-col backdrop-blur-xl">
                        <Tagline>  Premarket Allocations</Tagline>
                        <H4 className="font-bold text-[#00324C]">On-Chain OTC, No DMs</H4>
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-[145px] inset-0 bg-gradient-to-r h-[90%] blur-xl from-[#fcfeff] via-[#d5f0ff] to-[#b8e6ff] opacity-90 rounded-l-full" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <Image src={"/point4.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Buy or sell pre-TGE token allocations using smart contracts.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point4.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    No DMs. No middlemen. Just clean, verified trades.
                                </PXLarge>
                            </div>
                            <div className="flex gap-2 items-start">
                                <Image src={"/point4.svg"} height={16} width={16} alt="" className="mt-2" />
                                <PXLarge weight='regular'>
                                    Secure Early Deals — Without the Risk
                                </PXLarge>
                            </div>
                        </div>
                        <Image src={"/premarket-bg.png"} height={288} width={528} alt="" className="w-full" />

                    </div>
                </div>
            </div>


        </Section>
    )
}

export default Solution
