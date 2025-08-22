import { Button } from "@/components/ui/button";
import { H4, H5, P, PLarge, PSmall } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";
import { LuBook } from "react-icons/lu";
import { FiGlobe, FiLinkedin, FiPlus } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Body() {
    return (
        <>
            <div className="flex flex-wrap items-center md:flex-nowrap justify-between">
                <H4>Latest IDO</H4>

                {/* show if wallet connected */}
                <Link href="/launchpad/createido/">
                    <Button>
                        <span className="hidden md:block">Create new IDO</span>
                        <FiPlus />
                    </Button>
                </Link>
            </div>

            <div className="launchpad-tabs mt-6">
                <Tabs defaultValue="active" >
                    <div className="overflow-x-auto">
                        <TabsList className="overflow-auto w-max">
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="my-ido">My IDO</TabsTrigger>
                        </TabsList>
                    </div>

                    {/*  */}
                    <TabsContent value="active" className="mt-6">
                        <div className="grid gap-4 md:gap-6 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
                            {
                                Array.from({ length: 10 }).map((_, index) => {
                                    return (
                                        <div key={index} className="p-4 rounded-lg shadow-[0_0_16px] shadow-card-shadow bg-xl-card-bg">
                                            <Image src="/media/ido-banner.png" alt="ido-banner" height={100} width={265} className="w-full rounded-lg" />
                                            <div className="flex items-center justify-center gap-3 mt-[10px] bg-icons-bg w-fit rounded-lg m-auto">
                                                <Link href="/#"><FaXTwitter className="w-9 h-9 text-tertiary-action-text-color p-2" /></Link>
                                                <Link href="/#"><FiGlobe className="w-9 h-9 text-tertiary-action-text-color p-2" /></Link>
                                                <Link href="/#"><FiLinkedin className="w-9 h-9 text-tertiary-action-text-color p-2" /></Link>
                                                <Link href="/#"><LuBook className="w-9 h-9 text-tertiary-action-text-color p-2" /></Link>
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                                <H5>CryptoKitty</H5>
                                                <Image src="/media/ido-token.png" alt="ido-token" height={32} width={32} />
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                                <PSmall>CryptoKitty</PSmall>
                                                <PLarge>CTK</PLarge>
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                                <PSmall>Token Price</PSmall>
                                                <P>$1</P>
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                                <PSmall className="flex-1">Start time </PSmall>
                                                <P className="flex-1 text-end">10:00 A.M - May-20th-2025</P>
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                                <PSmall>
                                                    <span>Soft cap</span>
                                                    <span className="bg-surface-positive text-positive-text p-1 rounded flex-1 ms-2 text-xs">Success</span>
                                                </PSmall>
                                                <P className="flex-1 text-end">10,000</P>
                                            </div>
                                            <div className="flex justify-between mt-[10px]">
                                                <PSmall>Hard cap</PSmall>
                                                <P>20,000</P>
                                            </div>
                                            <div className="mt-4">
                                                {/* show if wallet connected */}
                                                <Link href={`/launchpad/${index}`}><Button className="w-full">Join IDO</Button></Link>
                                                {/* if not connected wallet */}
                                                {/* <ConnectWallet /> */}
                                            </div>

                                            {/* for completed */}
                                            {/* <div className="mt-4">
                                                <Button className="w-full" disabled>Sold Out</Button>
                                            </div> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </TabsContent>

                    {/* Completed */}
                    <TabsContent value="completed">
                        Completed
                    </TabsContent>

                    {/* Upcomming */}
                    <TabsContent value="upcoming">
                        Upcoming
                    </TabsContent>

                    {/* My Ido's */}
                    <TabsContent value="my-ido">
                        {/* if no ido's */}
                        <div className="flex flex-col gap-8 items-center justify-center p-10">
                            <Image src="/media/not-found.png" alt="ido-banner" height={178} width={178} />
                            <H4 className="text-tertiary-text-color">Oops, No projects found</H4>
                            <Button>Create new IDO <FiPlus /> </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}