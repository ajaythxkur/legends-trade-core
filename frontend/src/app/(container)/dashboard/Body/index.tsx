'use client'
import { H5, H6, PExtraSmall, PMedium, } from "@/components/ui/typography";
import Image from "next/image";
import { IoMdArrowUp } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import DashTabs from "./dashtabs";
import { backendUrl } from "@/utils/env";
import { useEffect, useState } from "react";
import { Token, UserData } from "@/types/premarket";
import { AccountAddress, truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Body() {
    const { account, isLoading } = useWallet()
    const [tokens, setTokens] = useState<Token[]>([])
    const [userData, setUserData] = useState<UserData>()

    const getUserOfferTokens = async () => {
        if (!account) return;
        try {
            const response = await fetch(`${backendUrl}/dashboard/user_offer_tokens/${account.address}`);
            const data = await response.json();
            setTokens(data);
            console.log(`Tokens: ${data}`);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserData = async () => {
        if (!account) return;
        try {
            const response = await fetch(`${backendUrl}/dashboard/userdata/${account.address}`);
            const data = await response.json();
            setUserData(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getUserOfferTokens()
        getUserData()
    }, [account])

    if (isLoading && !account) return <div>connect wallet</div>;
    if (!userData && !tokens) return <div>Loading...</div>;
    return (
        <>
            <div className="md:p-4">
                <div className="flex items-center gap-4">
                    <Image src="/media/ido-token.png" alt="user-img" height={40} width={40} />
                    <H6 className="text-primary-text-color font-bold flex gap-4 items-center">{truncateAddress(String(account?.address))}<LuCopy /></H6>
                </div>

                {/* <div className="flex gap-6 justify-between mt-12"> */}
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

                <DashTabs tokens={tokens} />
            </div>
        </>
    )
}
