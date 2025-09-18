'use client'
import CountDownBadge from "@/components/CountDownBadge";
import { Badge } from "@/components/ui/badge";
import { H5, H6, PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import { Token } from "@/types/premarket";
import { chainIcons } from "@/utils/constants";
import { formatDateTime, formatPrice } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LuGlobe } from "react-icons/lu";
interface TokenInfoProps {
    tokenInfo: Token;
}

export default function TokenInfo({ tokenInfo }: TokenInfoProps) {

    // const lastprice = formatPrice(tokenInfo.lastPrice);
    const lastprice = (tokenInfo.lastPrice / Math.pow(10, 8)) * 4.3;
    const formatlastPrice = Math.round(lastprice * 100) / 100;
    // const price = (Number(tokenInfo.lastPrice) / Math.pow(10, Number(collateralToken?.decimals))) * collTokenPrice;

    const vol24h = formatPrice(tokenInfo.vol24h);
    const totalVolume = formatPrice(tokenInfo.volAll);
    const startsAt = formatDateTime(Number(tokenInfo.temp_starts_at));
    const endsAt = formatDateTime(Number(tokenInfo.temp_starts_at));

    return (
        <div className="flex gap-4 flex-wrap xl:flex-nowrap items-center justify-between text-primary-text-color">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Image src={`${tokenInfo.image ? tokenInfo.image : '/media/token-img.png'}`} alt="token-image" width={50} height={50} className="rounded-full" />
                    <Image src={chainIcons[tokenInfo.chain_type]} alt="token-image" width={42} height={42} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                </div>
                <div>
                    <H5>{tokenInfo.symbol}</H5>
                    <PExtraSmall className="text-tertiary-text-color mt-1">{tokenInfo.name}</PExtraSmall>
                </div>
            </div>

            <div className="text-center">
                <div className="flex items-center gap-2">
                    <H6>$ {formatlastPrice}</H6>
                    {
                        tokenInfo.priceChange > 0 ?
                            <Badge variant="positive">+ {tokenInfo.priceChange.toFixed(2)}%</Badge>
                            :
                            <Badge variant="negative">{tokenInfo.priceChange.toFixed(2)}%</Badge>
                    }
                </div>
                <PSmall className="text-tertiary-text-color mt-2">Last Price</PSmall>
            </div>

            <div className="text-center">
                <div className="flex items-center gap-2">
                    <PLarge>$ {vol24h.toFixed(4)}</PLarge>
                    {/* <Badge variant="negative">- 3.2%</Badge> */}
                </div>
                <PSmall className="text-sm text-tertiary-text-color">24h Volume</PSmall>
            </div>

            <div className="text-center">
                <div className="flex items-center gap-2">
                    <PLarge>$ {totalVolume.toFixed(4)}</PLarge>
                    {/* <Badge variant="positive">+ 3.2%</Badge> */}
                </div>
                <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
            </div>

            <div className="text-center">
                {
                    startsAt ?

                        <PLarge className="text-sm text-secondary-text-color flex flex-col">
                            <span>{startsAt.date}</span>
                            <span className="text-xs">{startsAt.time}</span>
                        </PLarge>
                        : '-'
                }
                <PSmall className="text-tertiary-text-color">Settle time start</PSmall>
            </div>

            <div className="text-center">
                {
                    endsAt ?
                        <PLarge className="text-sm text-secondary-text-color flex flex-col">
                            <span>{endsAt.date}</span>
                            <span className="text-xs">{endsAt.time}</span>
                        </PLarge>
                        : '-'
                }
                <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
            </div>

            <div className="text-center">
                <CountDownBadge settle_starts_at={tokenInfo.settle_started_at} settle_duration={tokenInfo.settle_duration} />
                <PSmall className="text-sm text-tertiary-text-color">Settle duration</PSmall>
            </div>

            {/* Social */}
            <div className="flex items-center gap-1 md:gap-3">
                {tokenInfo.twitter && <Link href={`${tokenInfo.twitter}`} className="p-1 md:p-2 hover:bg-card-bg rounded-full cursor-pointer"><FaXTwitter className='h-5 w-5' /></Link>}
                {tokenInfo.website && <Link href={`${tokenInfo.website}`} className="p-1 md:p-2 hover:bg-card-bg rounded-full cursor-pointer"><LuGlobe className='h-5 w-5' /></Link>}
            </div>
        </div>
    )
}