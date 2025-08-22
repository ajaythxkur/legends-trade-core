import { useDrawer } from "@/contexts/DrawerContext";
import { Badge } from "@/components/ui/badge";
import { P, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography";
import { Info } from "lucide-react";
import { IoMdTime } from "react-icons/io";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
interface tradepDrawerProps {
    tradetype: "buy" | "sell"
}
export default function TradesDrawer({ tradetype }: tradepDrawerProps) {
    const { closeDrawer } = useDrawer();
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <RiArrowRightDoubleFill className="w-5 h-5 text-tertiary-text-color cursor-pointer" onClick={() => closeDrawer()} />
                    <Badge variant="outline">{tradetype === 'buy' ? 'Buy me' : 'Sell me'}</Badge>
                    <PExtraSmall className="tag-text-color">Offer</PExtraSmall>
                    <P className="primary-text-color">#131412</P>
                </div>
                <Info className="w-5 h-5 text-tertiary-text-color" />
            </div>

            {/* Offer Details */}
            <PExtraSmall className="text-secondary-text-color mt-7 font-semibold">Offer Details</PExtraSmall>
            <div className="space-y-4 mt-5 text-primary-text-color">
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Settle Count down </PSmall>
                    <div className="flex gap-2 items-center">
                        {/* if time ended */}
                        {/* <Badge variant="input"><IoMdTime className="h-3 w-3"/>00:00 Hr</Badge>
                        <PMedium>Ended</PMedium> */}

                        {/* not ended yet */}
                        <Badge variant="info" className="flex items-center gap-1"><IoMdTime className="h-3 w-3" />05:00 Hr</Badge>
                        <PMedium>Left</PMedium>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Status</PSmall>
                    <Badge variant="warning">Pending</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Type</PSmall>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs"><div className="h-3 w-3 bg-positive-text rounded-full"></div> buy</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Price</PSmall>
                    <PMedium>$ 4.5</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Fill type</PSmall>
                    <Badge variant="outline">Partial</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Filled amount</PSmall>
                    <PMedium>100/100</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Settled order</PSmall>
                    <PMedium>2/4</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Offer Txn</PSmall>
                    <Link href="/#" target="_blank">
                        <PMedium className="flex items-center gap-2">16zW...vh44 <LuExternalLink className="h-4 w-4 ms-auto" /></PMedium>
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Offer closed txn</PSmall>
                    <Link href="/#" target="_blank">
                        <PMedium className="flex items-center gap-2">45vbW...5cd5 <LuExternalLink className="h-4 w-4 ms-auto" /></PMedium>
                    </Link>
                </div>
            </div>
            
            <PExtraSmall className="text-secondary-text-color mt-7 font-semibold">Manage Orders</PExtraSmall>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start">User</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Collateral</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <TableRow key={index} >
                                <TableCell className="text-sm">16zW...5cd5</TableCell>
                                <TableCell className="text-center ">6m</TableCell>
                                <TableCell>
                                    <span className="flex gap-1 justify-center items-center">
                                        <Image src="/media/aptos.svg" alt="coll-icon" height={16} width={16} />
                                        <span>100</span>
                                    </span>
                                </TableCell>
                                <TableCell className="text-center ">
                                    {/* if settled */}
                                    <Badge variant="positive">Claimed</Badge>
                                    {/* If not settled before time */}
                                    {/* <Badge variant="warning">Pending</Badge> */}
                                </TableCell>
                                <TableCell className="text-center">
                                    {/* if settled */}
                                    <Link href="/#" target="_blank"><LuExternalLink className="h-5 w-5 ms-auto" /></Link>

                                    {/* If not settled before time */}
                                    {/* <Button className="px-4 py-1.75">Claim</Button> */}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </>
    )
}