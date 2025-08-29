import { Button } from "@/components/ui/button";
import CreateOrder from "./createorder";
import { PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import Image from "next/image";
import { PremarketSvg } from "@/components/icons/icons";
import { Badge } from "@/components/ui/badge";
import { useDrawer } from "@/contexts/DrawerContext";
import { Token, TokenOffers } from "@/types/premarket";
interface BuySellCardProps {
    type: string;
    offers: TokenOffers[];
    tokenInfo: Token;
    fillType: string;
}

export default function BuySellCard({ type, offers, tokenInfo, fillType }: BuySellCardProps) {
    const { openDrawer } = useDrawer();
    const filteredOffers = offers.filter((offer) => {
        if (fillType === 'all') return true
        if (fillType == 'partial') return !offer.is_full_match
        if (fillType == 'full') return offer.is_full_match
    })
    return (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
            {filteredOffers.map((offer, i) => {
                const aptPrice = 5;
                const amount = Number(offer.amount) / 10000;
                const price = (Number(offer.price) / Math.pow(10, 8)) * aptPrice
                const collateralInUsd = amount * price
                const collateral = collateralInUsd / aptPrice
                return (
                    // <div key={i} className="bg-card-bg rounded-lg px-4 py-5 border-2 border-card-border-sell flex flex-col" >
                    <div key={i} className={`bg-card-bg rounded-lg px-4 py-5 border-2 ${type === 'buy' ? 'border-card-border-buy' : 'border-card-border-sell'}  flex flex-col`}>
                        <div className="flex justify-between items-start mb-4 text-secondary-text-color">
                            <div className="text-start">
                                <PSmall>Offer</PSmall>
                                <div className="flex gap-1 items-center mt-2">
                                    <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
                                    <PLarge className='text-primary-text-color'>{amount}</PLarge>
                                </div>
                                {/* <PExtraSmall className="text-tertiary-text-color mt-2">$ {}</PExtraSmall> */}
                            </div>

                            <div className="text-center">
                                <PExtraSmall className="text-tertiary-text-color">Rate</PExtraSmall>
                                <Badge variant="info">$ {price}</Badge>
                                <div className="mt-4 flex justify-center">
                                    <PremarketSvg className="text-secondary-text-color" />
                                </div>
                            </div>

                            <div className="text-end">
                                <PSmall>For</PSmall>
                                <div className="flex gap-2 items-center mt-2">
                                    {
                                        tokenInfo.chain_type === 0 ?
                                            <Image src="/media/aptos.svg" alt="token-image" width={20} height={20} className="rounded-full" />
                                            :
                                            <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
                                    }
                                    <PLarge className='text-primary-text-color'>{collateral}</PLarge>
                                </div>
                                <PExtraSmall className="text-tertiary-text-color mt-2">$ {collateralInUsd}</PExtraSmall>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Badge variant='outline' className='text-xs py-2 px-3'>{offer.is_full_match ? 'Full' : 'Partial'}</Badge>
                            <Button
                                size="md"
                                onClick={() => openDrawer(
                                    <CreateOrder
                                        type={type}
                                        token={tokenInfo}
                                        amount={amount}
                                        collateral={collateral}
                                        price={price}
                                        offer={offer}
                                    />
                                )}
                                disabled={tokenInfo.status !== 0}
                            >
                                {
                                    type === 'buy' ? 'Buy' : 'Sell'
                                }
                            </Button>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}