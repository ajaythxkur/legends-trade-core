
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

interface BodyProps {
    tokenAddr: string;
}
export default function Body({ tokenAddr }: BodyProps) {
    const { account } = useWallet();
    const [isBuy, setIsBuy] = useState(true);
    const [fillType, setFillType] = useState<string>('all')
    const [collateral, setCollateral] = useState<string>('all')
    const [offers, setOffers] = useState<TokenOffers[]>([]);
    const [tokenInfo, setTokenInfo] = useState<Token>();
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const getTokenInfo = async () => {
        try {
            const response = await backendApi.getTokenInfo(tokenAddr)
            setTokenInfo(response.data[0])
        } catch (err) {
            console.log(err)
        }
    }

    const getOffers = useCallback(async () => {
        try {
            setLoading(true)
            const response = await backendApi.getOffers(tokenAddr, String(account?.address), collateral, fillType, isBuy, offset, 10)
            setOffers(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [account, collateral, fillType, isBuy, offset])

    useEffect(() => {
        getTokenInfo();
    }, [])

    useEffect(() => {
        getOffers();
    }, [getOffers])

    if (!tokenInfo) return <SpinnerLoading />
    return (
        <>
            {/* Header */}
            <div className="md:border-b border-border-color md:pb-4">
                <TokenInfo tokenInfo={tokenInfo} />
            </div>

            {/* Trading Controls */}
            <div className="mt-6 mb-0 lg:mb-8">
                <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 overflow-x-auto scrollbar-hidden">
                    <Tabs defaultValue="buy" className="w-full">
                        <div className="flex items-start justify-between pb-4 lg:pb-6">
                            <div className="flex flex-col justify-between h-full">
                                <TabsList>
                                    <TabsTrigger value="buy" onClick={() => setIsBuy(true)}>Buy</TabsTrigger>
                                    <TabsTrigger value="sell" onClick={() => setIsBuy(false)}>Sell</TabsTrigger>
                                </TabsList>
                                <div className="hidden badges lg:flex gap-4 items-center mt-6">
                                    {/* <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('floorPrice')}>Floor Price{filters.floorPrice}<IoCloseOutline className="w-5 h-5" /></Badge> */}
                                    {collateral !== 'all' &&
                                        <Badge variant="outline" className="flex items-center gap-2 capitalize" onClick={() => setCollateral('all')}>{collateral} <IoCloseOutline className="w-5 h-5" /></Badge>
                                    }
                                    {fillType !== 'all' &&
                                        <Badge variant="outline" className="flex items-center gap-2 capitalize" onClick={() => setFillType('all')}>{fillType}<IoCloseOutline className="w-5 h-5" /></Badge>
                                    }

                                </div>
                            </div>

                            <div className="space-y-0 lg:space-y-4 flex lg:flex-col items-end gap-4 lg:gap-0 ">
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
                        </div>

                        <TabsContent value="buy">
                            <BuySellCard
                                type="buy"
                                offers={offers}
                                tokenInfo={tokenInfo}
                                fillType={fillType}
                                loading={loading}
                            />
                        </TabsContent>

                        <TabsContent value="sell">
                            <BuySellCard
                                type="sell"
                                offers={offers}
                                tokenInfo={tokenInfo}
                                fillType={fillType}
                                loading={loading}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};



