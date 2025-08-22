
import Image from "next/image";
// import { LuCopy, LuCrown, LuExternalLink, LuMedal, LuTrophy } from "react-icons/lu";
import { LuCopy, LuCrown, LuExternalLink } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Award } from "lucide-react";
export default function RewardTabs() {
    return (
        <div className="overflow-x-auto">
            <Tabs defaultValue="referred" className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
                <div className="overflow-x-auto">
                    <TabsList className="overflow-auto w-max">
                        <TabsTrigger value="referred">Referred</TabsTrigger>
                        <TabsTrigger value="engagement">Engagement</TabsTrigger>
                        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    </TabsList>
                </div>

                {/* Referred */}
                <TabsContent value="referred" className="mt-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Referral ID</TableHead>
                                <TableHead className="text-center">Referral code</TableHead>
                                <TableHead className="text-center">Referral Reward </TableHead>
                                <TableHead className="text-center">Engagement score</TableHead>
                                <TableHead className="text-end">Commission</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 10 }).map((_, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="text-start "><span className="flex gap-2 lg:gap-4 items-center">OX6...S125S <LuCopy className="h-4 lg:h-5 w-4 lg:w-5" /></span></TableCell>
                                        <TableCell className="text-center"><span className="flex gap-2 lg:gap-4 justify-center items-center">OX6...S125S <LuCopy className="h-4 lg:h-5 w-4 lg:w-5" /></span></TableCell>
                                        <TableCell className="text-center">
                                            <span className="flex gap-2 justify-center items-center">100
                                                <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24} />
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">250</TableCell>
                                        <TableCell className="text-end">
                                            <span className="flex gap-2 justify-end items-center">100
                                                <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24} />
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TabsContent>

                {/* Engagement */}
                <TabsContent value="engagement" className="mt-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Order ID</TableHead>
                                <TableHead className="text-center">Txn ID</TableHead>
                                <TableHead className="text-center">Reward Earned </TableHead>
                                <TableHead className="text-center">Engagement score</TableHead>
                                <TableHead className="text-end"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 10 }).map((_, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell >
                                            <span className="flex gap-2 items-center justify-center md:justify-start pe-5 md:pe-0">
                                                <Image src="/media/eng1-pos.svg" alt="user-img" height={24} width={24} />
                                                {/* <Image src="/media/eng1-neg.svg" alt="user-img" height={24} width={24} />
                                            <Image src="/media/eng2-pos.svg" alt="user-img" height={24} width={24} />
                                            <Image src="/media/eng2-neg.svg" alt="user-img" height={24} width={24} /> */}
                                            <span>#4454S</span>
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center ">
                                            <span className="flex gap-2 lg:gap-4 justify-center items-center">OX6...e25S <LuCopy className="h-4 lg:h-5 w-4 lg:w-5" /></span>
                                        </TableCell>
                                        <TableCell className="text-end">
                                            <span className="flex gap-2 justify-center items-center">100
                                                <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24} />
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">250</TableCell>
                                        <TableCell className="text-end "><LuExternalLink className="h-4 lg:h-5 w-4 lg:w-5 ms-auto" /></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TabsContent>

                {/* Leaderboard */}
                <TabsContent value="leaderboard" className="mt-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Positions</TableHead>
                                <TableHead className="text-center">User Id</TableHead>
                                <TableHead className="text-center">Badge </TableHead>
                                <TableHead className="text-center">Total Earned</TableHead>
                                <TableHead className="text-center">Total Engagement score</TableHead>
                                <TableHead className="text-end"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 10 }).map((_, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="text-start">
                                            <span className="flex gap-2 items-center">
                                                <Image src="/media/leaderboard-pos.svg" alt="user-img" height={16} width={16} />
                                                1st
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center"><span className="flex gap-2 lg:gap-4 justify-center items-center">OX6...S125S <LuCopy className="h-4 lg:h-5 w-4 lg:w-5" /></span></TableCell>
                                        <TableCell className="text-center">
                                            <span className="flex gap-4 justify-center items-center">
                                                <LuCrown className="h-6 w-6 text-logo-surface" />
                                                {/* <LuTrophy className="h-6 w-6 text-logo-surface" />
                                                <LuMedal className="h-6 w-6 text-logo-surface" />
                                                <Award className="h-6 w-6 text-logo-surface" /> */}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="flex gap-2 justify-center items-center">100
                                                <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24} />
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">250</TableCell>
                                        <TableCell className="text-end"><LuExternalLink className="h-4 lg:h-5 w-4 lg:w-5 ms-auto" /></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}