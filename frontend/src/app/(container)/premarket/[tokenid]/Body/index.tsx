
'use client';
import React, { useEffect, useState } from 'react';
import CreateOfferModal from './CreateOffer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import Filters from './filters';
import { backendUrl } from '@/utils/env';
import { Token, TokenOffers } from '@/types/premarket';
import BuySellCard from './BuySellCard';
import TokenInfo from './TokenInfo';
import backendApi from '@/utils/backendApi';

interface BodyProps {
    tokenAddr: string;
}
export default function Body({ tokenAddr }: BodyProps) {
    const [fillType, setFillType] = useState<string>('all')
    const [offers, setOffers] = useState<TokenOffers[]>([]);
    const [tokenInfo, setTokenInfo] = useState<Token>();
    const getTokenInfo = async () => {
        try {
            // const response = await fetch(`${backendUrl}/premarket/token/${tokenAddr}`);
            // const data = await response.json();
            // setTokenInfo(data[0]);
            const response = await backendApi.getTokenInfo(tokenAddr)
            setTokenInfo(response.data[0])
        } catch (err) {
            console.log(err)
        }
    }

    const getOffers = async () => {
        try {
            const response = await fetch(`${backendUrl}/premarket/offers/${tokenAddr}`);
            const data = await response.json();
            setOffers(data);
            console.log(`Token offers: ${data}`)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTokenInfo();
        getOffers();
    }, [])
    const buyOffers = offers.filter((f) => f.is_buy === true);
    const sellOffers = offers.filter((f) => f.is_buy === false);

    if (!tokenInfo) return <div>Loading...</div>;
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
                                    <TabsTrigger value="buy">Buy</TabsTrigger>
                                    <TabsTrigger value="sell">Sell</TabsTrigger>
                                </TabsList>
                                {/* <div className="hidden badges lg:flex gap-4 items-center mt-6">
                                    <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('floorPrice')}>Floor Price{filters.floorPrice}<IoCloseOutline className="w-5 h-5" /></Badge>
                                    <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('sol')}>SOL <IoCloseOutline className="w-5 h-5" /></Badge>
                                    <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('full')}>Full<IoCloseOutline className="w-5 h-5" /></Badge>
                                </div> */}
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
                                />
                            </div>
                        </div>

                        <TabsContent value="buy">
                            <BuySellCard
                                type="buy"
                                offers={sellOffers}
                                tokenInfo={tokenInfo}
                                fillType={fillType}
                            />
                        </TabsContent>

                        <TabsContent value="sell">
                            <BuySellCard
                                type="sell"
                                offers={buyOffers}
                                tokenInfo={tokenInfo}
                                fillType={fillType}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};



