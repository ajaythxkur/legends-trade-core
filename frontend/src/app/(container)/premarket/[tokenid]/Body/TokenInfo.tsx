import CountDownBadge from "@/components/CountDownBadge";
import { Badge } from "@/components/ui/badge";
import { H5, H6, PExtraSmall, PLarge, PSmall } from "@/components/ui/typography";
import { Token } from "@/types/premarket";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LuGlobe } from "react-icons/lu";
interface TokenInfoProps {
    tokenInfo: Token;
}

export default function TokenInfo({ tokenInfo }: TokenInfoProps) {
    const aptPrice = 5; //in used
    const lastprice = (tokenInfo.lastPrice / Math.pow(10, 8)) * aptPrice;
    const vol24h = (tokenInfo.vol24h / Math.pow(10, 8)) * aptPrice;
    const totalVolume = (tokenInfo.volAll / Math.pow(10, 8)) * aptPrice;
    return (
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-between text-primary-text-color">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Image src={`${tokenInfo.image ? tokenInfo.image : '/media/token-img.png'}`} alt="token-image" width={50} height={50} className="rounded-full" />
                    {
                        tokenInfo.chain_type === 0 &&
                        <Image src="/media/aptos.svg" alt="token-image" width={42} height={42} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                    }
                </div>
                <div>
                    <H5>{tokenInfo.symbol}</H5>
                    <PExtraSmall className="text-tertiary-text-color mt-1">{tokenInfo.name}</PExtraSmall>
                </div>
            </div>

            <div className="text-center">
                <div className="flex items-center gap-2">
                    <H6>$ {lastprice}</H6>
                    {
                        tokenInfo.priceChange > 0 ?
                            <Badge variant="positive">+ {tokenInfo.priceChange}%</Badge>
                            :
                            <Badge variant="negative">{tokenInfo.priceChange}%</Badge>
                    }
                </div>
                <PSmall className="text-tertiary-text-color mt-2">Last Price</PSmall>
            </div>

            <div className="text-center pt-4 md:pt-0">
                <div className="flex items-center gap-2">
                    <PLarge>$ {vol24h}</PLarge>
                    {/* <Badge variant="negative">- 3.2%</Badge> */}
                </div>
                <PSmall className="text-sm text-tertiary-text-color">24h Volume</PSmall>
            </div>

            <div className="text-center  mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                    <PLarge>$ {totalVolume}</PLarge>
                    {/* <Badge variant="positive">+ 3.2%</Badge> */}
                </div>
                <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
            </div>

            <div className="text-center  mt-4 md:mt-0">
                {/* <PLarge>-</PLarge> */}
                <PLarge className="flex flex-col items-center justify-center">
                    <span>{tokenInfo.temp_starts_at ? dayjs.unix(Number(tokenInfo.temp_starts_at)).format("YYYY-DD-MM") : '---- -- --'}</span>
                    <span className="text-xs">{tokenInfo.temp_starts_at ? dayjs.unix(Number(tokenInfo.temp_starts_at)).format("hh:mm A") : '-- : -- --'}</span>
                </PLarge>
                <PSmall className="text-tertiary-text-color">Settle time start</PSmall>
            </div>

            <div className="text-center mt-4 md:mt-0">
                <PLarge className="flex flex-col items-center justify-center">
                    <span>{tokenInfo.temp_ends_at ? dayjs.unix(Number(tokenInfo.temp_ends_at)).format("YYYY-DD-MM") : '---- -- --'}</span>
                    <span className="text-xs">{tokenInfo.temp_ends_at ? dayjs.unix(Number(tokenInfo.temp_ends_at)).format("hh:mm A") : '-- : -- --'}</span>
                </PLarge>
                <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
            </div>

            <div className="text-center mt-4 md:mt-0">
                <CountDownBadge settle_starts_at={tokenInfo.settle_started_at} settle_duration={tokenInfo.settle_duration} />
                <PSmall className="text-sm text-tertiary-text-color">Settle duration</PSmall>
            </div>


            {/* Social */}
            <div className="flex items-center gap-1 md:gap-3  pt-4 md:pt-0">
                {tokenInfo.twitter && <Link href={`${tokenInfo.twitter}`} className="p-1 md:p-2 hover:bg-card-bg rounded-full cursor-pointer"><FaXTwitter className='h-5 w-5' /></Link>}
                {tokenInfo.website && <Link href={`${tokenInfo.website}`} className="p-1 md:p-2 hover:bg-card-bg rounded-full cursor-pointer"><LuGlobe className='h-5 w-5' /></Link>}
            </div>
        </div>
    )
}