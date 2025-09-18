'use client'
import { H1, H5, H6, PExtraSmall, PMedium, } from "@/components/ui/typography";
import Image from "next/image";
import { IoMdArrowUp } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import DashTabs from "./dashtabs";
import { useCallback, useEffect, useState } from "react";
import { Token, UserData } from "@/types/premarket";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import backendApi from "@/utils/backendApi";
import SpinnerLoading from "@/components/SpinnerLoading";
import Empty from "@/components/Empty";
import shortAddress from "@/utils/shortAddress";
import { Inbox } from "lucide-react";
import { WalletButton } from "@/components/wallet/WalletButton";

export default function Body() {
    const { account, isLoading } = useWallet()
    const [tokens, setTokens] = useState<Token[]>([])
    const [userData, setUserData] = useState<UserData>();
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [tokenStatus, setTokenStatus] = useState('all')

    const getUserData = async () => {
        try {
            const response = await backendApi.getUserData(String(account?.address))
            setUserData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getUserPremarketTokens = useCallback(async () => {
        setLoading(true)
        try {
            const response = await backendApi.getUserPremarketTokens(String(account?.address), 10, offset, tokenStatus)
            setTokens(response.data.tokens);
            setTotal(response.data.total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }, [account, offset, tokenStatus]);

    useEffect(() => {
        getUserData()
    }, [account])

    useEffect(() => {
        getUserPremarketTokens()
    }, [getUserPremarketTokens])

    if (isLoading) return <SpinnerLoading />;
    if (!account) return (
        <div className="h-full text-center text-action-text-color rounded-2xl bg-card-bg shadow-lg flex items-center justify-center py-22">
            <div>
                <Inbox className="h-20 w-20 m-auto text-tag-stroke-color" />
                <H1 className="mt-6 mb-5">Wallet not connected</H1>
                <WalletButton />
            </div>
        </div>
    )
    return (
        <>
            <div className="md:p-4">
                <div className="flex items-center gap-4">
                    <Image src="/media/ido-token.png" alt="user-img" height={40} width={40} />
                    <H6 className="text-primary-text-color font-bold flex gap-4 items-center">{shortAddress(String(account?.address))}<LuCopy /></H6>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 justify-between mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Trades</PMedium>
                        {
                            userData &&
                            <H5 className="text-text-emphasis mt-[10px]">{userData.total_offers + userData.total_orders}</H5>
                        }
                        <div className="flex items-center gap-2 mt-[10px]">
                            <PExtraSmall className="text-tertiary-text-color">{userData?.total_orders} Order - {userData?.total_offers} offer</PExtraSmall>
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Settled</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">{userData?.settled_orders}</H5>
                        <div className="flex items-center gap-2 mt-[10px]">
                            <PExtraSmall className="text-tertiary-text-color">{userData?.settled_orders}/{userData?.total_orders} Offer Settled</PExtraSmall>
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Volume</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">#15th</H5>
                        <div className="flex gap-2 items-center mt-[10px]">
                            <Badge variant="positive" className="flex gap-1 items-center"><IoMdArrowUp /> 0% </Badge>
                            <PExtraSmall className="text-tertiary-text-color">This month </PExtraSmall>
                        </div>
                    </div>
                </div>

                <DashTabs tokens={tokens} total={total} offset={offset} setOffset={setOffset} loading={loading} tokenStatus={tokenStatus} setTokenStatus={setTokenStatus} />
            </div>
        </>
    )
}
