'use client'
import { useDrawer } from "@/contexts/DrawerContext";
import { Badge } from "@/components/ui/badge";
import { P, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography";
import { Info } from "lucide-react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Token, TokenOffers, TokenOrder } from "@/types/premarket";
import { truncateAddress } from "@aptos-labs/ts-sdk";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCountdown } from "./Countdown";
import Orders from "./Orders";
import { Button } from "@/components/ui/button";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { moduleAddress } from "@/utils/env";
import aptosClient from "@/lib/aptos";
import { toast } from "sonner";
dayjs.extend(relativeTime);

interface TradesDrawerPrps {
    offer: TokenOffers
    orders: TokenOrder[]
    tokenInfo: Token;
}
export default function TradesDrawer({ offer, orders, tokenInfo }: TradesDrawerPrps) {
    const { account, signAndSubmitTransaction } = useWallet()
    const { closeDrawer } = useDrawer();
    const amount = Number(offer.amount) / 10000;
    const price = (Number(offer.price) / Math.pow(10, 8)) * 5

    const settleduration = tokenInfo?.settle_duration;  // 86400
    const settlestartsat = tokenInfo?.settle_started_at;  // 1756270267
    const { status, timeLeft } = useCountdown(Number(settlestartsat), Number(settleduration));
    const settledOrders = orders.filter((o) => o.is_settled).length;

    const handleCancelOffer = async (offer_addr: string) => {
        try {
            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::todolist::create_list`,
                    functionArguments: [
                        offer_addr
                    ]
                }
            }
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            toast.success('offer Canceled Successfully')
        } catch (err) {
            console.log(err)
            toast.success('failed to cancel offer.')
        }
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <RiArrowRightDoubleFill className="w-5 h-5 text-tertiary-text-color cursor-pointer" onClick={() => closeDrawer()} />
                    <Badge variant="outline">
                        {offer.is_creator ? 'By me' : 'By other'}
                    </Badge>
                    <PExtraSmall className="tag-text-color">Offer</PExtraSmall>
                    <P className="primary-text-color">{truncateAddress(offer.offer_addr)}</P>
                </div>
                <Info className="w-5 h-5 text-tertiary-text-color" />
            </div>

            {/* Offer Details */}
            <PExtraSmall className="text-secondary-text-color mt-7 font-semibold">Offer Details</PExtraSmall>
            <div className="space-y-4 mt-5 text-primary-text-color">
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Settle Count down </PSmall>
                    <div className="flex gap-2 items-center">
                        <div>
                            {status === "Running" ? (
                                <Badge variant="info" className='w-20'>{timeLeft}</Badge>
                            ) : status === "Not Started" ? (
                                <Badge variant="input" className='w-20'>Not Started</Badge>
                            ) : (
                                <Badge variant="warning" className='w-20'>Ended</Badge>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Status</PSmall>
                    {offer.filled_amount === offer.amount ? (
                        <Badge variant="warning">filled</Badge>
                    ) : (
                        <Badge variant="positive">active</Badge>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Type</PSmall>
                    {
                        offer.is_buy ?
                            <Badge variant="outline" className="flex items-center gap-2 text-xs">
                                <div className="h-2 w-2 bg-positive-text rounded-full"></div> Buy
                            </Badge>
                            :
                            <Badge variant="outline" className="flex items-center gap-2 text-xs">
                                <div className="h-2 w-2 bg-negative-text rounded-full"></div> Sell
                            </Badge>
                    }
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Price</PSmall>
                    <PMedium>$ {price}</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Fill type</PSmall>
                    <Badge variant="outline">{offer.is_full_match ? 'Full' : 'Partial'}</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Filled amount</PSmall>
                    <PMedium>--/{amount}</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Settled order</PSmall>
                    <PMedium>{settledOrders}/{orders.length}</PMedium>
                </div>
                {
                    tokenInfo.status !== 1 && offer.created_by === String(account?.address) && offer.filled_amount < offer.amount && settledOrders === orders.length &&
                    <div className="flex justify-between items-center">
                        <PSmall className="text-tertiary-text-color">Cancel Offer</PSmall>
                        <Button
                            className="px-4 py-1.75"
                            onClick={() => handleCancelOffer(offer.offer_addr.toString())}
                        >
                            Cancel Offer
                        </Button>
                    </div>
                }
            </div>

            <Orders offer={offer} orders={orders} status={status} tokenStatus={tokenInfo.status} />
        </>
    )
}



// 'use client'
// import { useDrawer } from "@/contexts/DrawerContext";
// import { Badge } from "@/components/ui/badge";
// import { P, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography";
// import { Info } from "lucide-react";
// import { RiArrowRightDoubleFill } from "react-icons/ri";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import Image from "next/image";
// import { LuExternalLink } from "react-icons/lu";
// import Link from "next/link";
// import { Token, TokenOffers, TokenOrder } from "@/types/premarket";
// import { AccountAddress, truncateAddress } from "@aptos-labs/ts-sdk";
// import { Button } from "@/components/ui/button";
// import dayjs from "dayjs";
// import relativeTime from 'dayjs/plugin/relativeTime'
// import { useCountdown } from "./Countdown";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { useState } from "react";
// dayjs.extend(relativeTime);

// interface TradesDrawerPrps {
//     offer: TokenOffers
//     orders: TokenOrder[]
//     tokenInfo: Token;
// }
// export default function TradesDrawer({ offer, orders, tokenInfo }: TradesDrawerPrps) {
//     const {account} = useWallet();
//     const { closeDrawer } = useDrawer();
//     const amount = Number(offer.amount) / 10000;
//     const price = (Number(offer.price) / Math.pow(10, 8)) * 5
//     const collateral = (price * amount) / 5

//     const settleduration = tokenInfo?.settle_duration;  // 86400
//     const settlestartsat = tokenInfo?.settle_started_at;  // 1756270267
//     const { status, timeLeft } = useCountdown(Number(settlestartsat), Number(settleduration));
//     // const [currentUser, setCurrentUser] = useState<AccountAddress>()
//     // if(account){
//     //     setCurrentUser(account.address);
//     // }
//     return (
//         <>
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                     <RiArrowRightDoubleFill className="w-5 h-5 text-tertiary-text-color cursor-pointer" onClick={() => closeDrawer()} />
//                     <Badge variant="outline">
//                         {offer.is_creator ? 'By me' : 'By other'}
//                     </Badge>
//                     <PExtraSmall className="tag-text-color">Offer</PExtraSmall>
//                     <P className="primary-text-color">{truncateAddress(offer.offer_addr)}</P>
//                 </div>
//                 <Info className="w-5 h-5 text-tertiary-text-color" />
//             </div>

//             {/* Offer Details */}
//             <PExtraSmall className="text-secondary-text-color mt-7 font-semibold">Offer Details</PExtraSmall>
//             <div className="space-y-4 mt-5 text-primary-text-color">
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Settle Count down </PSmall>
//                     <div className="flex gap-2 items-center">
//                         {/* if time ended */}
//                         {/* <Badge variant="input"><IoMdTime className="h-3 w-3"/>00:00 Hr</Badge>
//                         <PMedium>Ended</PMedium> */}

//                         {/* not ended yet */}
//                         {/* <Badge variant="info" className="flex items-center gap-1"><IoMdTime className="h-3 w-3" />05:00 Hr</Badge> */}
//                         <div>
//                             {status === "Running" ? (
//                                 <Badge variant="info" className='w-20'>{timeLeft}</Badge>
//                             ) : status === "Not Started" ? (
//                                 <Badge variant="input" className='w-20'>Not Started</Badge>
//                             ) : (
//                                 <Badge variant="warning" className='w-20'>Ended</Badge>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Status</PSmall>
//                     <Badge variant="warning">Pending</Badge>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Type</PSmall>
//                     {
//                         offer.is_buy ?
//                             <Badge variant="outline" className="flex items-center gap-2 text-xs">
//                                 <div className="h-2 w-2 bg-positive-text rounded-full"></div> Buy
//                             </Badge>
//                             :
//                             <Badge variant="outline" className="flex items-center gap-2 text-xs">
//                                 <div className="h-2 w-2 bg-negative-text rounded-full"></div> Sell
//                             </Badge>
//                     }
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Price</PSmall>
//                     <PMedium>$ {price}</PMedium>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Fill type</PSmall>
//                     <Badge variant="outline">Partial</Badge>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Filled amount</PSmall>
//                     <PMedium>--/{amount}</PMedium>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Settled order</PSmall>
//                     <PMedium>2/2</PMedium>
//                 </div>
//                 {/* <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Offer Txn</PSmall>
//                     <Link href="/#" target="_blank">
//                         <PMedium className="flex items-center gap-2">16zW...vh44 <LuExternalLink className="h-4 w-4 ms-auto" /></PMedium>
//                     </Link>
//                 </div> */}
//                 {/* <div className="flex justify-between items-center">
//                     <PSmall className="text-tertiary-text-color">Offer closed txn</PSmall>
//                     <Link href="/#" target="_blank">
//                         <PMedium className="flex items-center gap-2">45vbW...5cd5 <LuExternalLink className="h-4 w-4 ms-auto" /></PMedium>
//                     </Link>
//                 </div> */}
//             </div>

//             <PExtraSmall className="text-secondary-text-color mt-7 font-semibold">Manage Orders</PExtraSmall>
//             <Table className="mt-4">
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="text-start">User</TableHead>
//                         <TableHead className="text-center">Time</TableHead>
//                         <TableHead className="text-center">Collateral</TableHead>
//                         <TableHead className="text-center">Status</TableHead>
//                         <TableHead className="text-center">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         orders.map((order, index) => {
//                             const amount = Number(order.amount) / 10000;
//                             const price = (Number(offer.price) / Math.pow(10, 8)) * 5
//                             const collateral = (price * amount) / 5

//                             return (
//                                 <TableRow key={index} >
//                                     <TableCell className="text-sm">{truncateAddress(order.created_by.toString())}</TableCell>
//                                     <TableCell className="text-center ">{dayjs.unix(Number(order.ts)).fromNow()}</TableCell>
//                                     <TableCell>
//                                         <span className="flex gap-1 justify-center items-center">
//                                             <Image src="/media/aptos.svg" alt="coll-icon" height={16} width={16} />
//                                             <span>{collateral}</span>
//                                         </span>
//                                     </TableCell>
//                                     <TableCell className="text-center ">
//                                         {
//                                             order.is_settled ?
//                                                 <Badge variant="positive">Claimed</Badge>
//                                                 :
//                                                 <Badge variant="warning">Pending</Badge>
//                                         }
//                                     </TableCell>
//                                     <TableCell className="text-center">
//                                         {order.is_settled ? (
//                                             <Link href="/#" target="_blank">
//                                                 <LuExternalLink className="h-5 w-5 ms-auto" />
//                                             </Link>
//                                         ) : order.is_claimed ? (
//                                             <Button className="px-4 py-1.75">Claimed</Button>
//                                         ) : String(account?.address) === order.buyer ? (
//                                             // Buyer → show claim button
//                                             <Button className="px-4 py-1.75">Claim</Button>
//                                         ) : String(account?.address) === order.seller ? (
//                                             // Seller → show settle button
//                                             <Button className="px-4 py-1.75">Settle</Button>
//                                         ) : (
//                                             // Neither buyer nor seller → nothing
//                                             <span>-</span>
//                                         )}
//                                     </TableCell>
//                                 </TableRow>
//                             )
//                         })}
//                 </TableBody>
//             </Table>

//         </>
//     )
// }