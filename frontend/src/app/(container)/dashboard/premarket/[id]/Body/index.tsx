'use client';
import Image from 'next/image';
import { H4, H5, PExtraSmall, PMedium, PSmall } from '@/components/ui/typography';
import { FaXTwitter } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { LuGlobe } from 'react-icons/lu';
import Filters from './filters';
import { useCallback, useEffect, useState } from 'react';
import { Token, TokenOffers } from '@/types/premarket';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import dayjs from 'dayjs'
import duration from "dayjs/plugin/duration";
import CountDownBadge from '@/components/CountDownBadge';
import backendApi from '@/utils/backendApi';
import SpinnerLoading from '@/components/SpinnerLoading';
import Empty from '@/components/Empty';
import Offers from './Offers';
import PaginationNew from '@/components/PaginationNew';
dayjs.extend(duration);

export default function Body({ id }: { id: string }) {
    const { account, isLoading } = useWallet();

    const [tokenInfo, setTokenInfo] = useState<Token>();
    const [offers, setoffers] = useState<TokenOffers[]>([])
    const [offerType, setOfferType] = useState('all')
    const [offerStatus, setOfferStatus] = useState('all');
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const getTokenInfo = async () => {
        try {
            const response = await backendApi.getTokenInfo(id)
            setTokenInfo(response.data[0])
        } catch (err) {
            console.log(err)
        }
    }

    const getUserOffersData = useCallback(async () => {
        if (!account) return;
        setLoading(true)
        try {
            const response = await backendApi.getUserOffersData(id, String(account.address), offerStatus, offerType, offset, 10)
            setoffers(response.data.offers)
            setTotal(response.data.total)
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [account, offerStatus, offerType, offset])

    useEffect(() => {
        getTokenInfo();
    }, [])

    useEffect(() => {
        getUserOffersData();
    }, [getUserOffersData])

    if (isLoading || !tokenInfo) return <SpinnerLoading />;
    if (!isLoading && !account) return <Empty title="Wallet not connected" />

    const aptPrice = 5; //in used
    const lastprice = (tokenInfo.lastPrice / Math.pow(10, 8)) * aptPrice;
    const vol24h = (tokenInfo.vol24h / Math.pow(10, 8)) * aptPrice;
    const totalVolume = (tokenInfo.volAll / Math.pow(10, 8)) * aptPrice;

    return (
        <>
            {/* Token Data */}
            <div className="border-b border-border-color pb-4">
                <div className="flex gap-6 flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Image src={`${tokenInfo.image ? tokenInfo.image : '/media/token-img.png'}`} alt="token-image" width={50} height={50} className="rounded-full" />
                            {
                                tokenInfo.chain_type === 0 &&
                                <Image src="/media/aptos.svg" alt="token-image" width={16} height={16} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                            }
                            {
                                tokenInfo.chain_type === 1 &&
                                <Image src="/media/solana.jpg" alt="token-image" width={16} height={16} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                            }
                            {
                                tokenInfo.chain_type === 2 &&
                                <Image src="/media/ethereum.jpg" alt="token-image" width={16} height={16} className="h-4 w-4  rounded-full absolute bottom-0 right-0" />
                            }
                        </div>
                        <div>
                            <H5 className="font-semibold text-primary-text-color">{tokenInfo.symbol}</H5>
                            <PExtraSmall className="text-tertiary-text-color mt-2">{tokenInfo.name}</PExtraSmall>
                        </div>
                    </div>
                    {/* Price */}
                    <div className="text-center">
                        <div className="flex items-center gap-2">
                            <PMedium className="font-semibold me-2 text-primary-text-color">$ {lastprice}</PMedium>
                            {
                                tokenInfo.priceChange > 0 ?
                                    <Badge variant="positive">+ {tokenInfo.priceChange}%</Badge>
                                    :
                                    <Badge variant="negative">{tokenInfo.priceChange}%</Badge>
                            }
                        </div>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Last Price</PExtraSmall>
                    </div>
                    {/* 24h Volume */}
                    <div className="text-center pt-4 md:pt-0">
                        <div className="flex items-center gap-2">
                            <PMedium className="font-medium text-secondary-text-color">$ {vol24h}</PMedium>
                            {/* <Badge variant="negative">+ 3.2%</Badge> */}
                        </div>
                        <PExtraSmall className="text-tertiary-text-color mt-2">24h Volume</PExtraSmall>
                    </div>

                    {/* Total Volume */}
                    <div className="text-center pt-4 md:pt-0">
                        <div className="flex items-center gap-2">
                            <PMedium className="font-medium text-secondary-text-color">$ {totalVolume}</PMedium>
                            {/* <Badge variant="positive">+ 3.2%</Badge> */}
                        </div>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Total Volume</PExtraSmall>
                    </div>

                    {/* Settle Time Start */}
                    <div className="text-center  pt-4 md:pt-0">
                        <PMedium className="text-sm text-secondary-text-color flex flex-col">
                            <span>{tokenInfo.temp_starts_at ? dayjs.unix(Number(tokenInfo.temp_starts_at)).format("YYYY-DD-MM") : '---- -- --'}</span>
                            <span className="text-xs">{tokenInfo.temp_starts_at ? dayjs.unix(Number(tokenInfo.temp_starts_at)).format("hh:mm A") : '-- : -- --'}</span>
                        </PMedium>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Settle time start</PExtraSmall>
                    </div>

                    {/* Settle Time end */}
                    <div className="text-center  pt-4 md:pt-0">
                        <PMedium className="text-sm text-secondary-text-color flex flex-col">
                            <span>{tokenInfo.temp_ends_at ? dayjs.unix(Number(tokenInfo.temp_ends_at)).format("YYYY-DD-MM") : '---- -- --'}</span>
                            <span className="text-xs">{tokenInfo.temp_ends_at ? dayjs.unix(Number(tokenInfo.temp_ends_at)).format("hh:mm A") : '-- : -- --'}</span>
                        </PMedium>
                        <PExtraSmall className="text-tertiary-text-color mt-2">Settle time end</PExtraSmall>
                    </div>

                    <div className="text-center  pt-4 md:pt-0">
                        <PExtraSmall className="text-tertiary-text-color mb-2">Settle duration</PExtraSmall>
                        <CountDownBadge settle_starts_at={tokenInfo.settle_started_at} settle_duration={tokenInfo.settle_duration} />
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-3  pt-4 md:pt-0">
                        {tokenInfo.twitter && <Link href={`${tokenInfo.twitter}`} className="p-2 hover:bg-card-bg rounded-full cursor-pointer"><FaXTwitter className='text-2xl' /></Link>}
                        {tokenInfo.website && <Link href={`${tokenInfo.website}`} className="p-2 hover:bg-card-bg rounded-full cursor-pointer"><LuGlobe className='text-2xl' /></Link>}
                    </div>
                </div>
            </div>

            {/* Filter row */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mt-6">
                <div className='space-y-1 pb-4 md:pb-0'>
                    <H4>My Pre-Market Trades</H4>
                    <PSmall className='underline'>How it works ?</PSmall >
                </div>
                <Filters
                    offerType={offerType}
                    setOfferType={setOfferType}
                    offerStatus={offerStatus}
                    setOfferStatus={setOfferStatus}
                />
            </div>

            {/* Trades table */}
            <div className="mt-6">
                <Offers offers={offers} tokenInfo={tokenInfo} />
                <PaginationNew offset={offset} setOffset={setOffset} loading={loading} total={total} />
            </div>
        </>
    )
}