'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PExtraSmall } from "@/components/ui/typography";
import aptosClient from "@/lib/aptos";
import { TokenOffers, TokenOrder } from "@/types/premarket";
import { moduleAddress } from "@/utils/env";
import shortAddress from "@/utils/shortAddress";
import { InputTransactionData, truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import dayjs from "dayjs";
import { LucideExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
interface OrderProps {
    offer: TokenOffers;
    orders: TokenOrder[];
    status: string;
    tokenStatus: number;
}

export default function Orders({ offer, orders, status, tokenStatus }: OrderProps) {
    const { account, signAndSubmitTransaction } = useWallet();
    if (!account) return;
    // const isSettlementEnded = status === "Ended";
    const isSettlementEnded = status === "Ended";

    const handleSettleOrder = async (order_addr: string) => {
        try {
            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::premarket::settle_order_entry`,
                    functionArguments: [
                        order_addr
                    ]
                }
            }
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            toast.success('Order Settled successfully.')
        } catch (err) {
            console.log(err)
            toast.error(`Failed to settle order. ${err}`)
        }
    }

    const handleClaimOrder = async (order_addr: string) => {
        try {
            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::premarket::claim_order_entry`,
                    functionArguments: [
                        order_addr
                    ]
                }
            }
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            toast.success('Order Claimed successfully.')
        } catch (err) {
            console.log(err)
            toast.error(`Failed to settle order. ${err}`)
        }
    }

    const handleCancelOrder = async (order_addr: string) => {
        try {
            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::premarket::cancel_order_entry`,
                    functionArguments: [
                        order_addr
                    ]
                }
            }
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            toast.success('Order Canceled successfully.')
        } catch (err) {
            console.log(err)
            toast.error(`Failed to cancel order. ${err}`)
        }
    }

    return (
        <>
            <PExtraSmall className="text-secondary-text-color mt-7 font-semibold">Manage Orders</PExtraSmall>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start">By</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Collateral</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map((order, index) => {
                            const amount = Number(order.amount) / 10000;
                            const price = (Number(offer.price) / Math.pow(10, 8)) * 5
                            const collateral = (price * amount) / 5

                            // Determine order status and action logic
                            const isBuyer = String(account?.address) === order.buyer;
                            const isSeller = String(account?.address) === order.seller;

                            // Claim button should be enabled for buyer only when:
                            // 1. Settlement period has ended AND seller hasn't settled, OR
                            // 2. Seller has settled (regardless of time)
                            // const isOrderSettled = order.is_settled || false;
                            const isOrderSettled = order.is_settled || false;
                            const shouldEnableClaimForBuyer = isBuyer && (
                                (isSettlementEnded && !isOrderSettled) || isOrderSettled
                            );

                            // If offer is settled, both buyer and seller should see "settled" status
                            // const orderStatus = isOrderSettled ? "settled" : (order.is_settled ? "claimed" : "pending");
                            const orderStatus = isOrderSettled ? "settled" : (order.is_settled ? "claimed" : "pending");

                            return (
                                <TableRow key={index} >
                                    <TableCell className="text-sm">
                                        {order.created_by === String(account.address) ?
                                            'me'
                                            :
                                            shortAddress(order.created_by.toString())
                                        }
                                    </TableCell>
                                    <TableCell className="text-center ">{dayjs.unix(Number(order.ts)).fromNow()}</TableCell>
                                    <TableCell>
                                        <span className="flex gap-1 justify-center items-center">
                                            <Image src="/media/aptos.svg" alt="coll-icon" height={16} width={16} />
                                            <span>{collateral}</span>
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center ">
                                        <Badge
                                            variant={
                                                isBuyer
                                                    ? order.is_claimed
                                                        ? "positive"
                                                        : "warning"
                                                    : isSeller
                                                        ? order.is_settled
                                                            ? "positive"
                                                            : order.is_claimed
                                                                ? "positive"
                                                                : "warning"
                                                        : "warning"
                                            }
                                        >
                                            {/* {isBuyer ?
                                                order.is_claimed
                                                    ? "Claimed"
                                                    : "Pending"
                                                : isSeller
                                                    ? order.is_settled
                                                        ? "Settled"
                                                        : order.is_claimed
                                                            ? "Claimed"
                                                            : "Pending"
                                                    : "Pending"} */}


                                            {
                                                isBuyer &&
                                                (order.is_settled ? "Settled" : (order.is_claimed ? "Claimed" : "Pending"))
                                            }
                                            {
                                                isSeller &&
                                                (order.is_settled ? "Settled" : (order.is_claimed ? "Claimed" : "Pending"))
                                            }
                                            {
                                                // order.is_claimed
                                                //     ? "Claimed"
                                                //     : "Pending"
                                                // : isSeller
                                                //     ? order.is_settled
                                                //         ? "Settled"
                                                //         : order.is_claimed
                                                //             ? "Claimed"
                                                //             : "Pending"
                                                //     : "Pending"
                                            }
                                        </Badge>
                                    </TableCell>
                                    {
                                        tokenStatus !== 1 && order.created_by === account?.address.toString() ?
                                            <TableCell className="text-center">
                                                <Button
                                                    className="px-4 py-1.75"
                                                    onClick={() => handleCancelOrder(order.order_addr.toString())}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                            :
                                            <TableCell className="text-center">
                                                {orderStatus === "settled" || order.is_settled || order.is_claimed ? (
                                                    //if order is settled.
                                                    <Link href="/#" target="_blank">
                                                        <LucideExternalLink className="h-5 w-5 ms-auto" />
                                                    </Link>
                                                ) : order.is_claimed ? (
                                                    <Button className="px-4 py-1.75" disabled>Claimed</Button>
                                                ) : isBuyer ? (
                                                    // Buyer logic -- can claim only if seller didn't settle with settle duration
                                                    <Button
                                                        className="px-4 py-1.75"
                                                        // disabled={!shouldEnableClaimForBuyer || order.is_settled }
                                                        disabled={status === 'Not Started' || status === 'Running' || order.is_settled}
                                                        onClick={() => handleClaimOrder(order.order_addr.toString())}
                                                    >
                                                        Claim
                                                    </Button>
                                                ) : isSeller ? (
                                                    // Seller logic - can settle within settle duration only.
                                                    <Button
                                                        className="px-4 py-1.75"
                                                        disabled={isSettlementEnded || status === 'Not Started' || order.is_settled}
                                                        onClick={() => handleSettleOrder(order.order_addr.toString())}
                                                    >
                                                        Settle
                                                    </Button>
                                                ) : (
                                                    // Neither buyer nor seller
                                                    <span>-</span>
                                                )}
                                            </TableCell>

                                    }
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </>
    )
}