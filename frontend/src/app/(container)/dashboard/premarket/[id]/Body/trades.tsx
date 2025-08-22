import { useDrawer } from "@/contexts/DrawerContext";
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io"
import TradesDrawer from "./tradesdrawer";
import CircularProgress from "@/components/ui/circular-progress";
export default function Trades() {
    const { openDrawer } = useDrawer();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-start">Offer Id</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                    <TableHead className="text-center">Colletral</TableHead>
                    <TableHead className="text-center">Fill Progress</TableHead>
                    <TableHead className="text-center">Settled Order</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-end"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 10 }).map((_, index) => {
                    return (
                        <TableRow key={index} onClick={() => openDrawer(<TradesDrawer tradetype="buy" />)} className="cursor-pointer hover:bg-card-bg">
                            <TableCell>
                                <span className="flex gap-2 items-center">
                                    <div className="h-4 w-4 bg-positive-text rounded-full"></div>
                                    {/* bg-negative-text  for Failed*/}
                                    {/* bg-warning-text  for pending*/}
                                    #55D515
                                </span>
                            </TableCell>
                            <TableCell className="text-center ">
                                <Badge variant="outline">Buy</Badge>
                            </TableCell>
                            <TableCell className="text-center">$ 1.25</TableCell>
                            <TableCell className="text-center">1000</TableCell>
                            <TableCell>
                                <span className="flex gap-2 justify-center items-center">11
                                    <Image src="/media/aptos.svg" alt="coll-icon" height={20} width={20} />
                                </span>
                            </TableCell>

                            <TableCell className="text-center py-2.5">

                                <div className="text-center">
                                    <CircularProgress percentage={20} size="sm" color="purple" />
                                </div>
                            </TableCell>
                            <TableCell className="text-center">1/1</TableCell>
                            <TableCell className="text-center">
                                <Badge variant="positive">Done</Badge>
                                {/* variant="negative"  for failed*/}
                                {/* variant="warning"  for pending*/}
                            </TableCell>
                            <TableCell className="text-end">
                                <IoIosArrowForward
                                    className="h-5 w-5 ms-auto text-tertiary-action-text-color cursor-pointer"
                                    onClick={() => openDrawer(<TradesDrawer tradetype="buy" />)}
                                />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}