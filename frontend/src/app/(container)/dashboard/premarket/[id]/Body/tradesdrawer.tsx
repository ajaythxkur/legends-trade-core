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
import { useCountdown } from "../../../../../../components/Countdown";
import Orders from "./Orders";
import { Button } from "@/components/ui/button";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { moduleAddress } from "@/utils/env";
import aptosClient from "@/lib/aptos";
import { toast } from "sonner";
import shortAddress from "@/utils/shortAddress";
import { TokenConfig } from "@/cross-chain-core";
dayjs.extend(relativeTime);

interface TradesDrawerPrps {
    offer: TokenOffers
    orders: TokenOrder[]
    tokenInfo: Token;
    collateral: number;
    collTokenPrice: number
    collateralToken: TokenConfig
}
export default function TradesDrawer({ offer, orders, tokenInfo, collateral, collTokenPrice, collateralToken }: TradesDrawerPrps) {
    const { account, signAndSubmitTransaction } = useWallet()
    const { closeDrawer } = useDrawer();
    const filled_amount = Number(offer.filled_amount) / 10000;
    const amount = Number(offer.amount) / 10000;
    const price = (Number(offer.price) / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice
    const formatPrice = Math.round(price * 100) / 100;

    const settleduration = tokenInfo?.settle_duration;  // 86400
    const settlestartsat = tokenInfo?.settle_started_at;  // 1756270267
    const { status, timeLeft } = useCountdown(Number(settlestartsat), Number(settleduration));
    const settledOrders = orders.filter((o) => o.is_settled).length;

    const handleCancelOffer = async (offer_addr: string) => {
        try {
            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::premarket::cancel_offer_entry`,
                    functionArguments: [
                        offer_addr
                    ]
                }
            }
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            toast.success('Offer Canceled Successfully')
        } catch (err) {
            console.log(err)
            toast.success('Failed to cancel offer.')
        }
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <RiArrowRightDoubleFill className="w-5 h-5 text-tertiary-text-color cursor-pointer" onClick={() => closeDrawer()} />
                    <Badge variant="outline">
                        {
                            offer.created_by === String(account?.address) ? 'By me' : "By Other"
                        }
                    </Badge>
                    <PExtraSmall className="tag-text-color">Offer</PExtraSmall>
                    <P className="primary-text-color">{shortAddress(offer.offer_addr)}</P>
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
                    {
                        offer.is_active ? (
                            offer.filled_amount === offer.amount ? (
                                <Badge variant="info">Filled</Badge>
                            ) : (
                                <Badge variant="positive">Active</Badge>
                            )
                        ) :
                            <Badge variant="warning">Cancelled</Badge>
                    }
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
                    <PMedium>$ {formatPrice}</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Fill type</PSmall>
                    <Badge variant="outline">{offer.is_full_match ? 'Full' : 'Partial'}</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Filled amount</PSmall>
                    <PMedium>{filled_amount}/{amount}</PMedium>
                </div>
                <div className="flex justify-between items-center">
                    <PSmall className="text-tertiary-text-color">Settled order</PSmall>
                    <PMedium>{settledOrders}/{orders.length}</PMedium>
                </div>
                {
                    offer.is_active ? (
                        <>
                            {
                                tokenInfo.status !== 1
                                && offer.created_by === String(account?.address)
                                && offer.filled_amount < offer.amount &&
                                // && settledOrders === orders.length &&
                                <div className="flex justify-between items-center">
                                    <PSmall className="text-tertiary-text-color">Cancel Offer</PSmall>
                                    <Button
                                        className="px-3  py-2 text-sm"
                                        onClick={() => handleCancelOffer(offer.offer_addr.toString())}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            }
                        </>
                    ) :
                        ''
                }
            </div>

            <Orders offer={offer} orders={orders} status={status} tokenStatus={tokenInfo.status} />
        </>
    )
}