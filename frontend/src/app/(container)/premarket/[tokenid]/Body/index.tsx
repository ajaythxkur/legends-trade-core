
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CreateOfferModal from './CreateOffer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import Filters from './filters';
import { Token, TokenOffers } from '@/types/premarket';
import BuySellCard from './BuySellCard';
import TokenInfo from './TokenInfo';
import backendApi from '@/utils/backendApi';
import SpinnerLoading from '@/components/SpinnerLoading';
import { Badge } from '@/components/ui/badge';
import { IoCloseOutline } from 'react-icons/io5';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { H1, H4, H5 } from '@/components/ui/typography';
import { testnetTokens } from '@/cross-chain-core';
import { useApp } from '@/contexts/AppProvider';
import { backendUrl } from '@/utils/env';
import PaginationNew from '@/components/Pagination';

interface BodyProps {
    tokenAddr: string;
}
export default function Body({ tokenAddr }: BodyProps) {
    const { sourceChain } = useApp()
    const { account } = useWallet();
    const [isBuy, setIsBuy] = useState(true);
    const [fillType, setFillType] = useState<string>('all')
    const [collateral, setCollateral] = useState<string>('all')
    const [offers, setOffers] = useState<TokenOffers[]>([]);
    const [tokenInfo, setTokenInfo] = useState<Token>();
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totaloffers, setTotalOffers] = useState(0)
    const [buyPages, setBuyPages] = useState(0)
    const [sellPages, setSellPages] = useState(0)
    const [myoffers, setMyOffers] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens['Aptos'];

    const tokenMap = collateralTokens.reduce((acc, token) => {
        acc[token.tokenId.address] = token.symbol;
        return acc;
    }, {} as Record<string, string>);

    // const getTokenInfo = async () => {
    //     try {
    //         const response = await backendApi.getTokenInfo(tokenAddr)
    //         setTokenInfo(response.data[0])
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const getOffers = useCallback(async () => {
    //     try {
    //         setLoading(true)
    //         if (!account) return;
    //         const response = await backendApi.getOffers(tokenAddr, String(account?.address), collateral, fillType, isBuy, offset, 10)
    //         setOffers(response.data.offers);
    //         setTotalOffers(response.data.totalOffers)
    //         setMyOffers(response.data.myOffers)
    //         setTotalOrders(response.data.totalOrders)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }, [account, collateral, fillType, isBuy, offset])

    // useEffect(() => {
    //     getTokenInfo();
    // }, [])

    // useEffect(() => {
    //     getOffers();
    // }, [getOffers])

    useEffect(() => {
        const getTokenInfo = async () => {
            try {
                const response = await backendApi.getTokenInfo(tokenAddr)
                setTokenInfo(response.data[0])
            } catch (err) {
                console.log(err)
            }
        }
        getTokenInfo();
    }, [tokenAddr])

    useEffect(() => {
        if (!account) return;
        const fetchOffers = async () => {
            setLoading(true);
            try {
                const response = await backendApi.getOffers(tokenAddr, String(account.address), collateral, fillType, isBuy, offset, 6);
                setOffers(response.data.offers);
                setTotalOffers(response.data.totalOffers);
                setMyOffers(response.data.myOffers);
                setTotalOrders(response.data.totalOrders);
                setBuyPages(response.data.totalBuyPages);
                setSellPages(response.data.totalSellPages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [account, tokenAddr, collateral, fillType, isBuy, offset]);

    if (!tokenInfo) return <SpinnerLoading />

    return (
        <>
            {/* Header */}
            <div className="md:border-b border-border-color md:pb-4">
                <TokenInfo tokenInfo={tokenInfo} />
            </div>

            {/* Trading Controls */}
            {
                tokenInfo.status === 1 ?
                    <>
                        <H4 className='mt-8 text-center'>Settle Ended - Token Stats:</H4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="space-y-4 p-4 rounded-2xl bg-bottom-layer-1 text-center shadow-md">
                                <H5>Total Offers</H5>
                                <H1>{totaloffers}</H1>
                            </div>
                            <div className="space-y-4 p-4 rounded-2xl bg-bottom-layer-1 text-center shadow-md">
                                <H5>Total Orders</H5>
                                <H1>{totalOrders}</H1>
                            </div>
                            <div className="space-y-4 p-4 rounded-2xl bg-bottom-layer-1 text-center shadow-md">
                                <H5>My Offers</H5>
                                <H1>{myoffers}</H1>
                            </div>
                        </div>
                    </>
                    :
                    <div className="mt-6 mb-0 lg:mb-8">
                        <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 overflow-x-auto scrollbar-hidden">
                            <Tabs defaultValue="buy" className="w-full">
                                <div className="flex items-center md:items-start justify-between pb-4 lg:pb-6">
                                    <div className="flex flex-col justify-between h-full">
                                        <TabsList>
                                            <TabsTrigger value="buy"
                                                onClick={() => {
                                                    setOffset(0);
                                                    setIsBuy(true)
                                                }}
                                            >Buy</TabsTrigger>
                                            <TabsTrigger value="sell"
                                                onClick={() => {
                                                    setOffset(0);
                                                    setIsBuy(false)
                                                }}
                                            >Sell</TabsTrigger>
                                        </TabsList>
                                        <div className="hidden badges lg:flex gap-4 items-center mt-6">
                                            {fillType !== 'all' &&
                                                <Badge variant="outline" className="flex items-center gap-2 capitalize cursor-pointer" onClick={() => setFillType('all')}>{fillType}<IoCloseOutline className="w-5 h-5" /></Badge>
                                            }

                                            {collateral !== 'all' &&
                                                <Badge variant="outline" className="flex items-center gap-2 capitalize cursor-pointer" onClick={() => setCollateral('all')}>
                                                    {/* {collateral} */}
                                                    {tokenMap[collateral] ?? collateral}
                                                    <IoCloseOutline className="w-5 h-5" />
                                                </Badge>
                                            }
                                        </div>
                                    </div>
                                    {
                                        tokenInfo.status === 0 &&
                                        <div className="space-y-0 lg:space-y-4 flex md:flex-col items-end gap-4 lg:gap-0 ">
                                            {/* Create Offer Modal---------------- */}
                                            <CreateOfferModal
                                                token={tokenInfo}
                                                tokenAddr={tokenAddr}
                                            />

                                            {/* Filters---------------- */}
                                            <Filters
                                                fillType={fillType}
                                                setFillType={setFillType}
                                                collateral={collateral}
                                                setCollateral={setCollateral}
                                            />
                                        </div>
                                    }
                                </div>

                                <TabsContent value="buy">
                                    <BuySellCard
                                        type="buy"
                                        offers={offers}
                                        tokenInfo={tokenInfo}
                                        fillType={fillType}
                                        loading={loading}
                                    />
                                    <PaginationNew offset={offset} setOffset={setOffset} total={sellPages} loading={loading} />
                                </TabsContent>

                                <TabsContent value="sell" className='pb-1.5'>
                                    <BuySellCard
                                        type="sell"
                                        offers={offers}
                                        tokenInfo={tokenInfo}
                                        fillType={fillType}
                                        loading={loading}
                                    />
                                    <PaginationNew offset={offset} setOffset={setOffset} total={buyPages} loading={loading} />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
            }
        </>
    );
};



