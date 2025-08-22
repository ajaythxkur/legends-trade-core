'use client';
import { Button } from "@/components/ui/button";
import { H6, PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import { useState } from "react";
import { LuCopy, LuSend, LuUsers } from "react-icons/lu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image";
import { rewardPoints } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";

export default function ReferModal() {
    const [isActive, setisActive] = useState(false);
    return (
        <>
            <Button onClick={() => setisActive(!isActive)}>Refer & Earn<LuUsers /></Button>

            {/* Modal */}
            {
                isActive &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-bottom-layer-2 rounded-2xl w-full max-w-lg mx-auto p-4 relative">
                        <Button variant="modal" className="cursor-pointer absolute right-4 top-3 p-0 text-tertiary-action-text-color" onClick={() => setisActive(!isActive)}>Esc</Button>
                        <H6 className="text-primary-text-color">Referral </H6>
                        <PExtraSmall className="text-tertiary-text-color mt-2 mb-4">Invite & Earn Instantly</PExtraSmall>
                        <Badge variant="info">Bonus: Earn 100 points instantly and 20% of their future rewards forever!</Badge>
                        <div className="flex gap-2 items-center mt-4">
                            <PSmall className="text-tertiary-text-color">Referral Code: </PSmall>
                            <PExtraSmall className="bg-card-bg rounded-md py-2 px-4 text-primary-text-color">Legend125</PExtraSmall>
                            <LuCopy className="h-5 w-5" />
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-2 items-center mt-4">
                            <PSmall className="text-tertiary-text-color w-full">Referral Link: </PSmall>
                            <PExtraSmall className="bg-card-bg rounded-md py-2 px-4 text-primary-text-color">https://legend.in/ref/Legend125</PExtraSmall>
                            <Button className="p-1"><LuSend /></Button>
                        </div>
                        <PLarge className="mt-8">Reward system</PLarge>
                        <div className="flex gap-2 justify-between">
                            <div className="flex-1"></div>
                            <div className="flex-1"></div>
                            <div className="flex-1"></div>
                        </div>
                        <Table className="mt-4">
                            <TableHeader >
                                <TableRow >
                                    <TableHead></TableHead>
                                    <TableHead className="text-center">Reward</TableHead>
                                    <TableHead className="text-end">Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    rewardPoints.map((reward, index) => {
                                        return (
                                            <TableRow key={index} className="border-0">
                                                <TableCell className="text-tertiary-text-color text-xs py-2">{reward.title}</TableCell>
                                                <TableCell className="py-2">
                                                    <span className="flex gap-2 justify-center items-center">{reward.points}
                                                        <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24}  />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-end py-2">{reward.score}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            }
        </>
    )
}