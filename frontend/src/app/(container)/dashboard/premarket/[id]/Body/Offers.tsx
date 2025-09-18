import { useDrawer } from "@/contexts/DrawerContext";
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io"
import TradesDrawer from "./tradesdrawer";
import CircularProgress from "@/components/ui/circular-progress";
import { Token, TokenOffers } from "@/types/premarket";
import { P, PExtraSmall, PMedium } from "@/components/ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import { useApp } from "@/contexts/AppProvider";
import { testnetTokens } from "@/cross-chain-core";
interface TradesProps {
    offers: TokenOffers[]
    tokenInfo: Token;
}

export default function Offers({ offers, tokenInfo }: TradesProps) {
    const isMobile = useIsMobile();
    if (isMobile) return <MobileCards offers={offers} tokenInfo={tokenInfo} />
    return <DesktopRows offers={offers} tokenInfo={tokenInfo} />
}

const DesktopRows = ({ offers, tokenInfo }: TradesProps) => {
    const { openDrawer } = useDrawer();
    const { sourceChain, tokenPrices } = useApp();
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

                        const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]
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
                        // const aptPrice = 5;
                        const amount = Number(offer.amount) / 10000;
                        const filled_amount = Number(offer.filled_amount) / 10000;
                        // const price = (Number(offer.price) / Math.pow(10, 8)) * collTokenPrice
                        const price = (Number(offer.price) / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice;
                        const formatPrice = Math.round(price * 100) / 100;
                        const collateralInUsd = amount * price
                        const collateral = collateralInUsd / collTokenPrice
                        const formatCollateral = Math.round(collateral * 100) / 100;
                        const filledPercentage = (filled_amount / amount) * 100

                        return (
                            <TableRow key={index} onClick={() => openDrawer(
                                <TradesDrawer
                                    offer={offer}
                                    orders={offer.orders}
                                    tokenInfo={tokenInfo}
                                    collateral={formatCollateral}
                                    collTokenPrice={collTokenPrice}
                                    collateralToken={collateralToken}

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
                                <TableCell className="text-center">$ {formatPrice}</TableCell>
                                <TableCell className="text-center">
                                    <span className="flex gap-2 justify-center items-center">
                                        <span>{amount}</span>
                                        <Image src={tokenInfo.image} alt="coll-icon" height={20} width={20} className="rounded-full mb-1" />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex gap-2 justify-center items-center">
                                        {formatCollateral}
                                        <Image src={`${collateralToken.icon}`} alt="coll-icon" height={20} width={20} className="mb-1 rounded-full" />
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

const MobileCards = ({ offers, tokenInfo }: TradesProps) => {
    const { openDrawer } = useDrawer();
    const { sourceChain, tokenPrices } = useApp();
    return (
        <div className="space-y-4">
            {
                offers.map((offer, index) => {
                    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]
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
                    // const aptPrice = 5;
                    const amount = Number(offer.amount) / 10000;
                    const filled_amount = Number(offer.filled_amount) / 10000;
                    // const price = (Number(offer.price) / Math.pow(10, 8)) * collTokenPrice
                    const price = (Number(offer.price) / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice;
                    const formatPrice = Math.round(price * 100) / 100;
                    const collateralInUsd = amount * price
                    const collateral = collateralInUsd / collTokenPrice
                    const filledPercentage = (filled_amount / amount) * 100
                    return (
                        <div key={index} onClick={() => openDrawer(
                            <TradesDrawer
                                offer={offer}
                                orders={offer.orders}
                                tokenInfo={tokenInfo}
                                collateral={collateral}
                                collTokenPrice={collTokenPrice}
                                collateralToken={collateralToken}
                            />
                        )}
                            className="p-4 rounded-2xl bg-card-bg space-y-2.5">
                            <div className="flex justify-between">
                                <PMedium className="text-tertiary-text-color">Order #{index + 1}</PMedium>
                                <IoIosArrowForward className="h-5 w-5 ms-auto text-tertiary-action-text-color cursor-pointer" />
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Type</PExtraSmall>
                                <Badge variant="outline"> {offer.is_buy ? 'Buy' : 'Sell'}</Badge>
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Status</PExtraSmall>
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
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Price</PExtraSmall>
                                <PExtraSmall className="flex-1 text-end">$ {formatPrice}</PExtraSmall>
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Settled Orders</PExtraSmall>
                                <PExtraSmall className="flex-1 text-end">{offer.orders.filter((o) => o.is_settled).length}/{offer.orders.length}</PExtraSmall>
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Amount</PExtraSmall>
                                <PExtraSmall className="flex-1 text-end flex items-center gap-2 justify-end">
                                    {amount}
                                    <Image src={tokenInfo.image} alt="coll-icon" height={20} width={20} className="rounded-full mb-1" />
                                </PExtraSmall>
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Collateral</PExtraSmall>
                                <PExtraSmall className="flex-1 text-end flex items-center gap-2 justify-end">
                                    {collateral}
                                    <Image src={'/media/aptos.png'} alt="coll-icon" height={20} width={20} className="rounded-full mb-1" />
                                </PExtraSmall>
                            </div>
                            <div className="flex justify-between">
                                <PExtraSmall className="text-tertiary-text-color">Filled %age</PExtraSmall>
                                <PExtraSmall className="flex-1 text-end">  {filledPercentage} %</PExtraSmall>
                            </div>
                        </div>
                    )
                })
            }

        </div>

    )
}