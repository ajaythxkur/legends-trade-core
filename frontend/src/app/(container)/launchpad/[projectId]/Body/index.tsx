'use client';
import { Button } from "@/components/ui/button";
import { H5, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FiGlobe, FiLinkedin, FiPlus } from "react-icons/fi";
import { LuBook } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartPieDonut } from "./pieChart";
import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";
import JoinPresale from "./joinPresale";

export default function Body({ id }: { id: string }) {
    const [joinStatus, setJoinStatus] = useState(false);
    return (
        <>
            <div className="pb-0 bg-no-repeat bg-center bg-cover rounded-lg h-50 flex justify-end md:justify-between items-end" style={{ backgroundImage: 'url("/media/ido-page-banner.png")' }} >
                <div className="p-4 hidden md:block">
                    <Image src="/media/ido-token.png" alt="ido-token" height={50} width={50} />
                </div>
                <div className="rounded-lg px-6 py-4 bg-ido-countdown">
                    <PMedium>Sale count down</PMedium>
                    <PMedium>00 : 00 : 00</PMedium>
                </div>
            </div>

            <section className="flex">
                {/* ido details */}
                <div className={`px-0 pt-6 xl:p-6 transition-all duration-300 ${joinStatus ? "hidden xl:block w-full lg:w-2/3 2xl:w-3/4" : "w-full"}`}>
                    <div className="flex flex-wrap lg:flex-nowrap justify-between items-start w-full">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 w-full lg:w-fit relative">
                            <div className="space-y-1">
                                <H5>DOG {id}</H5>
                                <PSmall>Dogami</PSmall>
                            </div>
                            <div className="flex items-center lg:justify-center gap-3 bg-icons-bg w-fit rounded-lg lg:m-auto text-tertiary-action-text-color">
                                <Link href="/#"><FaXTwitter className="w-9 h-9 p-2" /></Link>
                                <Link href="/#"><FiGlobe className="w-9 h-9 p-2" /></Link>
                                <Link href="/#"><FiLinkedin className="w-9 h-9 p-2" /></Link>
                                <Link href="/#"><LuBook className="w-9 h-9 p-2" /></Link>
                            </div>

                            {/* presale btn mobile */}
                            <Button onClick={() => setJoinStatus(!joinStatus)} className="w-fit absolute top-0 right-0 lg:hidden">Join Presale <FiPlus /></Button>
                        </div>

                        <div className="flex gap-6 mt-6 lg:mt-0">
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-[#2E99E5] rounded-full"></div>
                                    <PExtraSmall> Token collected</PExtraSmall>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-[#C55C0B] rounded-full"></div>
                                    <PExtraSmall>Soft Cap</PExtraSmall>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-[#925FB8] rounded-full"></div>
                                    <PExtraSmall>Hard Cap</PExtraSmall>
                                </div>
                            </div>

                            {/* Piechart */}
                            <ChartPieDonut />
                        </div>
                        {joinStatus ? '' :
                            <Button onClick={() => setJoinStatus(!joinStatus)} className="hidden lg:flex">Join Presale <FiPlus /></Button>
                        }
                    </div>

                    <Tabs defaultValue="overview" className="mt-6 xl:mt-0">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="project_details">Project Details</TabsTrigger>
                        </TabsList>
                        {/* Project overview */}
                        <TabsContent value="overview" className="pt-4">
                            <div className="flex flex-col lg:flex-row gap-5 lg:gap-4 justify-between bg-ido-tabdetails rounded-lg px-6 py-[18px]">
                                <div className="flex-1 text-center">
                                    <PExtraSmall className="text-secondary-text-color">VIP Round start</PExtraSmall>
                                    <PMedium className="mt-3 text-primary-text-color">21st May 2025 - 02:30 P.M</PMedium>
                                </div>
                                <div className="flex-1 text-center">
                                    <PExtraSmall className="text-secondary-text-color">VIP Round start</PExtraSmall>
                                    <PMedium className="mt-3 text-primary-text-color">21st May 2025 - 02:30 P.M</PMedium>
                                </div>
                                <div className="flex-1 text-center">
                                    <PExtraSmall className="text-secondary-text-color">VIP Round start</PExtraSmall>
                                    <PMedium className="mt-3 text-primary-text-color">21st May 2025 - 02:30 P.M</PMedium>
                                </div>
                                <div className="flex-1 text-center">
                                    <PExtraSmall className="text-secondary-text-color">VIP Round start</PExtraSmall>
                                    <PMedium className="mt-3 text-primary-text-color">21st May 2025 - 02:30 P.M</PMedium>
                                </div>
                            </div>
                            <div className="pt-8">
                                <PExtraSmall className="text-tertiary-text-color font-semibold pb-2">Sale Detail</PExtraSmall>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Start time</PExtraSmall>
                                    <PSmall className="text-primary-text-color">13rd May 2025 - 09:45 A.M</PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px]">
                                    <PExtraSmall className="text-secondary-text-color">End time</PExtraSmall>
                                    <PSmall className="text-primary-text-color">13rd May 2025 - 09:45 A.M</PSmall>
                                </div>
                            </div>

                            <div className="pt-8">
                                <PExtraSmall className="text-tertiary-text-color font-semibold pb-2">Token Detail</PExtraSmall>
                                <div className="flex justify-between items-center py-7 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Token Address</PExtraSmall>
                                    <PSmall className="text-primary-text-color flex gap-4">02X1....AFxcf46 <IoCopyOutline /></PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Token Price</PExtraSmall>
                                    <PSmall className="text-primary-text-color">0.1 APT</PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Token Symbol</PExtraSmall>
                                    <PSmall className="text-primary-text-color">DOG</PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Token for Sale</PExtraSmall>
                                    <PSmall className="text-primary-text-color">25000 DOG</PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Token Supply</PExtraSmall>
                                    <PSmall className="text-primary-text-color">5,551,534,354</PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Market Cap</PExtraSmall>
                                    <PSmall className="text-primary-text-color">250050 APT</PSmall>
                                </div>
                            </div>
                            <div className="pt-8">
                                <PExtraSmall className="text-tertiary-text-color font-semibold pb-2">Vesting Detail</PExtraSmall>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Token Claim network</PExtraSmall>
                                    <PSmall className="text-primary-text-color flex gap-2 items-center">
                                        <Image src="/media/aptos.svg" alt="token-image" width={24} height={24} className="rounded-full" />
                                        Aptos
                                    </PSmall>
                                </div>
                                <div className="flex justify-between items-center py-4 px-[10px] border-b border-border-color">
                                    <PExtraSmall className="text-secondary-text-color">Vesting schedule</PExtraSmall>
                                    <PSmall className="text-primary-text-color">100% GST</PSmall>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Project Details */}
                        <TabsContent value="project_details" className="pt-4 xl:pt-8">
                            <PMedium className="text-secondary-text-color xl:w-[80%] m-auto">The Dogami project is an innovative Web 3 initiative that aims to revolutionize the pet ownership experience through blockchain technology. By launching our unique token, we empower users to engage in a decentralized ecosystem where pet lovers can connect, trade, and share their passion for pets. Our platform offers a range of features, including virtual pet adoption, training, and competitions, all secured by smart contracts. With Dogami, users can earn rewards for their participation and contributions to the community. Our mission is to create a vibrant marketplace that not only enhances pet ownership but also fosters a sense of belonging among pet enthusiasts. Join us as we embark on this exciting journey to redefine the future of pet care in the digital age.</PMedium>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Join Presale form */}
                {
                    joinStatus && <JoinPresale status={joinStatus} onClose={() => setJoinStatus(false)} />
                }

            </section>
        </>
    )
}