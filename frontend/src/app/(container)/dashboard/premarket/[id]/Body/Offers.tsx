import { useDrawer } from "@/contexts/DrawerContext";
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io"
import TradesDrawer from "./tradesdrawer";
import CircularProgress from "@/components/ui/circular-progress";
import { Token, TokenOffers } from "@/types/premarket";
import { truncateAddress } from "@aptos-labs/ts-sdk";
interface TradesProps {
    offers: TokenOffers[]
    tokenInfo: Token;
}
export default function Offers({ offers, tokenInfo }: TradesProps) {
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
                {
                    offers.map((offer, index) => {
                        const aptPrice = 5;
                        const amount = Number(offer.amount) / 10000;
                        const filled_amount = Number(offer.filled_amount) / 10000;
                        const price = (Number(offer.price) / Math.pow(10, 8)) * aptPrice
                        const collateralInUsd = amount * price
                        const collateral = collateralInUsd / aptPrice

                        const filledPercentage = (filled_amount / amount) * 100

                        return (
                            <TableRow key={index} onClick={() => openDrawer(
                                <TradesDrawer
                                    offer={offer}
                                    orders={offer.orders}
                                    tokenInfo={tokenInfo}
                                />

                            )} className="cursor-pointer hover:bg-card-bg">
                                <TableCell>
                                    <span className="flex gap-2 items-center">
                                        <div className="h-4 w-4 bg-positive-text rounded-full"></div>
                                        {/* {truncateAddress(offer.offer_addr)} */}
                                        {index + 1} {/* Serial number for now */}

                                    </span>
                                </TableCell>
                                <TableCell className="text-center ">
                                    <Badge variant="outline"> {offer.is_buy ? 'Buy' : 'Sell'}</Badge>
                                </TableCell>
                                <TableCell className="text-center">$ {price}</TableCell>
                                <TableCell className="text-center">
                                    <span className="flex gap-2 justify-center items-center">
                                        <span>{amount}</span>
                                        <Image src={tokenInfo.image} alt="coll-icon" height={20} width={20} className="rounded-full mb-1" />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex gap-2 justify-center items-center">
                                        {collateral}
                                        <Image src="/media/aptos.svg" alt="coll-icon" height={20} width={20} className="mb-1" />
                                    </span>
                                </TableCell>

                                <TableCell className="text-center py-2.5">

                                    <div className="text-center">
                                        <CircularProgress percentage={filledPercentage} size="sm" color="purple" />
                                        {/* <p>{filledPercentage}%</p> */}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">{offer.orders.filter((o) => o.is_settled).length}/{offer.orders.length}</TableCell>

                                <TableCell className="text-center">
                                    {
                                        offer.is_active ? (
                                            filled_amount === amount ? (
                                                <Badge variant="info">Filled</Badge>
                                            ) : (
                                                <Badge variant="positive">Active</Badge>
                                            )
                                        ) :
                                            <Badge variant="warning">Cancelled</Badge>
                                    }
                                </TableCell>
                                <TableCell className="text-end">
                                    <IoIosArrowForward
                                        className="h-5 w-5 ms-auto text-tertiary-action-text-color cursor-pointer"
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
        </Table>
    )
}