'use client'
import Withdraw from "./Withdraw";
import DepositToken from "./Deposit";
import { useCallback, useEffect, useState } from "react";
import backendApi from "@/utils/backendApi";
import { Token } from "@/types/premarket";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H4, H5 } from "@/components/ui/typography";

export default function DepositModal() {
    const [crossChainTokens, setCrossChainTokens] = useState<Token[]>([]);
    const getCrossChainTokens = useCallback(async () => {
        try {
            const response = await backendApi.getCrossChainTokens(1);
            setCrossChainTokens(response.data)
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        if (key === "Backspace" || key === "Delete" || key === "ArrowLeft" || key === "ArrowRight" || key === "Tab") { return; }
        if (!/[0-9.]/.test(key)) {
            e.preventDefault();
        }
        if (key === "." && e.currentTarget.value.includes(".")) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        getCrossChainTokens()
    }, [getCrossChainTokens])

    return (
        <>
            <Dialog>
                <DialogTrigger className="bg-secondary-button-color py-3.25 px-6 rounded text-action-text-color">Deposit/Withdraw</DialogTrigger>
                <DialogContent className="bg-bottom-layer-2 p-6">
                    <DialogTitle></DialogTitle>
                    <Tabs defaultValue="deposit" className="mt-4">
                        <TabsList>
                            <TabsTrigger value="deposit">Deposit</TabsTrigger>
                            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                        </TabsList>

                        <TabsContent value="deposit">
                            <DepositToken
                                crossChainTokens={crossChainTokens}
                                handleKeyPress={handleKeyPress}
                            />
                        </TabsContent>
                        <TabsContent value="withdraw">
                            <Withdraw
                                crossChainTokens={crossChainTokens}
                                handleKeyPress={handleKeyPress}
                            />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog >
        </>
    )
    // return (
    //     <>
    //         <DepositToken
    //             crossChainTokens={crossChainTokens}
    //             handleKeyPress={handleKeyPress}
    //         />

    //         <Withdraw
    //             crossChainTokens={crossChainTokens}
    //             handleKeyPress={handleKeyPress}
    //         />
    //     </>
    // )
}