'use client'
import { Button } from "@/components/ui/button";
import CreateOrder from "./createorder";
import { PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import Image from "next/image";
import { PremarketSvg } from "@/components/icons/icons";
import { Badge } from "@/components/ui/badge";
import { useDrawer } from "@/contexts/DrawerContext";
import { Token, TokenOffers } from "@/types/premarket";
import Empty from "@/components/Empty";
import { OffersSkeleton } from "@/components/skeletons/PremarketTokens";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useApp } from "@/contexts/AppProvider";
import { testnetTokens } from "@/cross-chain-core";
interface BuySellCardProps {
    type: string;
    offers: TokenOffers[];
    tokenInfo: Token;
    fillType: string;
    loading: boolean;
}

export default function BuySellCard({ type, offers, tokenInfo, loading }: BuySellCardProps) {
    const { account } = useWallet();
    const { openDrawer } = useDrawer();
    const { tokenPrices } = useApp()

    if (loading) return <OffersSkeleton />
    if (offers.length === 0) return <Empty title={`No ${type === 'buy' ? 'buying' : 'selling'} offers.`} />
    return (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
            {offers.map((offer, i) => {
                // const collateralToken = collateral_assets.find(
                //     (coll) => coll.address.toLowerCase() === offer.collateral_asset.toLowerCase()
                // );
                // const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]
                const collateralTokens = testnetTokens["Aptos"]
                const collateralToken = collateralTokens.find(
                    (coll) => coll.tokenId.address.toLowerCase() === offer.collateral_asset.toLowerCase()
                );
                if (!collateralToken) {
                    console.warn(`No collateral found for ${offer.collateral_asset}`);
                    return null;
                }
                if (!tokenPrices) {
                    console.warn("Token prices not loaded yet");
                    return null;
                }
                const collTokenPrice = tokenPrices[collateralToken.symbol] ?? 0;
                const filled_amount = Number(offer.filled_amount) / 10000;
                const amount = Number(offer.amount) / 10000;
                const price = (Number(offer.price) / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice;
                const formatPrice = Math.round(price * 100) / 100;
                // const collateralInUsd = amount * price
                const collateralInUsd = Math.round((amount * price) * 100) / 100;
                const collateral = Number((collateralInUsd / collTokenPrice))
                const formatcollateral = Math.round(collateral * 100) / 100;


                return (
                    <div key={i} className={`bg-card-bg rounded-lg px-4 py-5 border-2 ${type === 'buy' ? 'border-card-border-buy' : 'border-card-border-sell'}  flex flex-col`}>
                        <div className="grid grid-cols-3 mb-4 text-secondary-text-color">
                            <div className="text-start">
                                <PSmall>Offer</PSmall>
                                <div className="flex gap-1 items-center mt-2">
                                    <Image src={tokenInfo.image ? tokenInfo.image : "/media/token-image.svg"} alt="token-image" width={20} height={20} className="rounded-full" />
                                    <PLarge className='text-primary-text-color'>{amount}</PLarge>
                                </div>
                            </div>

                            <div className="text-center">
                                <PExtraSmall className="text-tertiary-text-color">Rate</PExtraSmall>
                                <Badge variant="info">$ {formatPrice}</Badge>
                                <div className="mt-4 flex justify-center">
                                    <PremarketSvg className="text-secondary-text-color" />
                                </div>
                            </div>

                            <div className="text-end">
                                <PSmall>For</PSmall>
                                <div className="flex gap-2 items-center mt-2 justify-end">
                                    <Image src={`${collateralToken?.icon}`} alt="token-image" width={20} height={20} className="rounded-full" />
                                    <PLarge className='text-primary-text-color'>{formatcollateral}</PLarge>
                                </div>
                                <PExtraSmall className="text-tertiary-text-color mt-2">$ {collateralInUsd}</PExtraSmall>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                            <Badge variant='outline' className='text-xs p-3 py-2.75 w-fit'>{offer.is_full_match ? 'Full' : 'Partial'}</Badge>
                            {
                                offer.created_by === account?.address.toString() ?
                                    <PExtraSmall className="text-tertiary-text-color text-center">My Offer</PExtraSmall>
                                    : <span>{''}</span>
                            }
                            <Button
                                size="md"
                                onClick={() => openDrawer(
                                    <CreateOrder
                                        type={type}
                                        token={tokenInfo}
                                        amount={amount}
                                        filled_amount={filled_amount}
                                        collateral={collateral}
                                        price={price}
                                        offer={offer}
                                        collateral_fa={offer.collateral_asset}
                                        collTokenPrice={collTokenPrice}
                                    />
                                )}
                                disabled={tokenInfo.status !== 0 || offer.created_by === account?.address.toString()}
                                className="w-fit ms-auto"
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