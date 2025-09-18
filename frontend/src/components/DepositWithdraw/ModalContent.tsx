'use client'
import { H4, PSmall } from "../ui/typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Image from "next/image"
import { IoIosArrowDown } from "react-icons/io"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Dispatch, SetStateAction, useMemo } from "react"
import { TokenConfig } from "@/cross-chain-core"
import { Token } from "@/types/premarket"

interface ModalProps {
    aptosBalance?: string;
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>
    handleDeposit: () => void;
    balance: string;
    collateralTokens: TokenConfig[];
    collateralToken: TokenConfig;
    onCollateralChange: (t: TokenConfig) => void;
    transferInProgress: boolean
    onWithdrawClick: () => void
    withdrawAmount: string;
    setWithdrawAmount: Dispatch<SetStateAction<string>>
    originBalance?: string;
    withdrawInProgress: boolean;
    crossChainTokens: Token[];
    crossChainToken: Token | undefined;
    setCrossChainToken: Dispatch<SetStateAction<Token | undefined>>
}

export default function ModalContent({
    aptosBalance,
    amount,
    setAmount,
    handleDeposit,
    collateralToken,
    collateralTokens,
    onCollateralChange,
    transferInProgress,
    onWithdrawClick,
    withdrawAmount,
    setWithdrawAmount,
    originBalance,
    withdrawInProgress,
    crossChainTokens,
    crossChainToken,
    setCrossChainToken
}: ModalProps) {

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

    // Combine collateral tokens and cross chain tokens
    const combinedTokens = useMemo(() => {
        const collateralTokensFormatted = collateralTokens.map(token => ({
            ...token,
            type: 'collateral' as const,
            image: token.icon
        }));

        const crossChainTokensFormatted = crossChainTokens.map(token => ({
            ...token,
            type: 'crossChain' as const,
            // Add any missing properties that TokenConfig might have
            icon: token.image,
            // tokenId: token.tokenId || { address: '', decimals: token.decimals || 6 },
            // decimals: token.decimals || 6
            tokenId: token.token_addr
            // decimals: token.decimals || 6
        }));

        return [...collateralTokensFormatted, ...crossChainTokensFormatted];
    }, [collateralTokens, crossChainTokens]);

    // Get currently selected token (either collateral or cross chain)
    const selectedToken = crossChainToken || collateralToken;

    const handleTokenSelect = (token: any) => {
        if (token.type === 'collateral') {
            onCollateralChange(token);
            setCrossChainToken(undefined); // Clear cross chain token selection
        } else {
            setCrossChainToken(token);
            // You might want to clear collateral token selection or handle it differently
        }
    };

    return (
        <div className="">
            <H4 className="text-center">Deposit/Withdraw</H4>
            <Tabs defaultValue="deposit" className="mt-4">
                <TabsList>
                    <TabsTrigger value="deposit">Deposit</TabsTrigger>
                    <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>
                <TabsContent value="deposit">
                    <div className="bg-card-bg rounded-md p-4 mt-4">
                        <div className="flex items-center gap-4 justify-between">
                            <PSmall>Deposit</PSmall>
                            <PSmall>Bal: {originBalance}</PSmall>
                        </div>
                        <div className="mt-2 flex justify-between items-center mb-2 text-tertiary-text-color">
                            <div className="flex items-center gap-4 justify-between w-full">
                                <input
                                    type="text"
                                    name="token_price"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="0.000"
                                    inputMode="decimal"
                                    className="text-xl font-bold bg-transparent outline-none w-full"
                                    autoComplete="off"
                                />

                                <div className="w-fit">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
                                            {/* <Image
                                                src={selectedToken.image || selectedToken.icon}
                                                alt={`${selectedToken.symbol}`}
                                                height={20}
                                                width={20}
                                                className="rounded-full"
                                            /> */}
                                            {selectedToken.symbol}
                                            <IoIosArrowDown className='ms-2 h-9 w-9' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-secondary-button-color w-fit rounded-md z-90">
                                            {combinedTokens.length > 0 && (
                                                <>
                                                    {/* Collateral Tokens Section */}
                                                    {combinedTokens.filter(token => token.type === 'collateral').length > 0 && (
                                                        <>
                                                            {/* <div className="px-3 py-1 text-xs text-gray-400 font-medium">
                                                                Collateral Tokens
                                                            </div> */}
                                                            {combinedTokens
                                                                .filter(token => token.type === 'collateral')
                                                                .map((token, i) => (
                                                                    <DropdownMenuItem
                                                                        key={`collateral-${i}`}
                                                                        onClick={() => handleTokenSelect(token)}
                                                                        className="capitalize flex items-center gap-2 px-3 py-2 hover:bg-primary-button-color cursor-pointer"
                                                                    >
                                                                        <Image
                                                                            src={token.icon || token.image || ''}
                                                                            alt="token-icon"
                                                                            height={20}
                                                                            width={20}
                                                                            className="rounded-full"
                                                                        />
                                                                        {token.symbol}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                        </>
                                                    )}

                                                    {/* Cross Chain Tokens Section */}
                                                    {combinedTokens.filter(token => token.type === 'crossChain').length > 0 && (
                                                        <>
                                                            {/* <div className="px-3 py-1 text-xs text-gray-400 font-medium border-t border-gray-600 mt-1">
                                                                Cross Chain Tokens
                                                            </div> */}
                                                            {combinedTokens
                                                                .filter(token => token.type === 'crossChain')
                                                                .map((token, i) => (
                                                                    <DropdownMenuItem
                                                                        key={`crosschain-${i}`}
                                                                        onClick={() => handleTokenSelect(token)}
                                                                        className="capitalize flex items-center gap-2 px-3 py-2 hover:bg-primary-button-color cursor-pointer"
                                                                    >
                                                                        <Image
                                                                            src={token.icon}
                                                                            alt="token-icon"
                                                                            height={20}
                                                                            width={20}
                                                                            className="rounded-full"
                                                                        />
                                                                        {token.symbol}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4 ">
                        <Button className="w-full" onClick={() => handleDeposit()} disabled={transferInProgress || !amount} >
                            {transferInProgress ?
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                : 'Deposit'}
                        </Button>
                    </div>
                </TabsContent>

                {/* ======================== */}
                {/* Withdraw */}
                {/* ======================== */}
                <TabsContent value="withdraw">
                    <div className="bg-card-bg rounded-md p-4 mt-4">
                        <div className="flex items-center gap-4 justify-between">
                            <PSmall>Withdraw</PSmall>
                            <PSmall>Bal: {aptosBalance}</PSmall>
                        </div>
                        <div className="mt-2 flex justify-between items-center mb-2 text-tertiary-text-color">
                            <div className="flex items-center gap-4 justify-between w-full">
                                <input
                                    type="text"
                                    name="token_price"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="0.000"
                                    inputMode="decimal"
                                    className="text-xl font-bold bg-transparent outline-none w-full"
                                />
                                <div className="w-fit">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
                                            {/* <Image
                                                src={`${selectedToken.image || selectedToken.icon}`}
                                                alt={`${selectedToken.symbol}`}
                                                height={20}
                                                width={20}
                                                className="rounded-full"
                                            /> */}
                                            {selectedToken.symbol}
                                            <IoIosArrowDown className='ms-2 h-9 w-9' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-secondary-button-color w-fit rounded-md z-90">
                                            {combinedTokens.length > 0 && (
                                                <>
                                                    {/* Collateral Tokens Section */}
                                                    {combinedTokens.filter(token => token.type === 'collateral').length > 0 && (
                                                        <>
                                                            {/* <div className="px-3 py-1 text-xs text-gray-400 font-medium">
                                                                Collateral Tokens
                                                            </div> */}
                                                            {combinedTokens
                                                                .filter(token => token.type === 'collateral')
                                                                .map((token, i) => (
                                                                    <DropdownMenuItem
                                                                        key={`collateral-${i}`}
                                                                        onClick={() => handleTokenSelect(token)}
                                                                        className="capitalize flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer"
                                                                    >
                                                                        <Image
                                                                            src={token.icon || token.image || ''}
                                                                            alt="token-icon"
                                                                            height={20}
                                                                            width={20}
                                                                            className="rounded-full"
                                                                        />
                                                                        {token.symbol}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                        </>
                                                    )}

                                                    {/* Cross Chain Tokens Section */}
                                                    {combinedTokens.filter(token => token.type === 'crossChain').length > 0 && (
                                                        <>
                                                            {/* <div className="px-3 py-1 text-xs text-gray-400 font-medium border-t border-gray-600 mt-1">
                                                                Cross Chain Tokens
                                                            </div> */}
                                                            {combinedTokens
                                                                .filter(token => token.type === 'crossChain')
                                                                .map((token, i) => (
                                                                    <DropdownMenuItem
                                                                        key={`crosschain-${i}`}
                                                                        onClick={() => handleTokenSelect(token)}
                                                                        className="capitalize flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer"
                                                                    >
                                                                        <Image
                                                                            src={token.icon}
                                                                            alt="token-icon"
                                                                            height={20}
                                                                            width={20}
                                                                            className="rounded-full"
                                                                        />
                                                                        {token.symbol}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4 ">
                        <Button className="w-full" onClick={() => onWithdrawClick()} disabled={withdrawInProgress || !withdrawAmount}>
                            {withdrawInProgress ?
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                : 'Withdraw'}
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}






// 'use client'
// import { H4, PSmall } from "../ui/typography"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
// import Image from "next/image"
// import { IoIosArrowDown } from "react-icons/io"
// import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
// import { Button } from "../ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// import { Dispatch, SetStateAction } from "react"
// import { TokenConfig } from "@/cross-chain-core"
// import { Token } from "@/types/premarket"

// interface ModalProps {
//     aptosBalance?: string;
//     amount: string;
//     setAmount: Dispatch<SetStateAction<string>>
//     handleDeposit: () => void;
//     balance: string;
//     collateralTokens: TokenConfig[];
//     collateralToken: TokenConfig;
//     onCollateralChange: (t: TokenConfig) => void;
//     transferInProgress: boolean
//     onWithdrawClick: () => void
//     withdrawAmount: string;
//     setWithdrawAmount: Dispatch<SetStateAction<string>>
//     originBalance?: string;
//     withdrawInProgress: boolean;
//     crossChainTokens: Token[];
//     crossChainToken: Token | undefined;
//     setCrossChainToken: Dispatch<SetStateAction<Token | undefined>>
// }

// export default function ModalContent({
//     aptosBalance,
//     amount,
//     setAmount,
//     handleDeposit,
//     collateralToken,
//     collateralTokens,
//     onCollateralChange,
//     transferInProgress,
//     onWithdrawClick,
//     withdrawAmount,
//     setWithdrawAmount,
//     originBalance,
//     withdrawInProgress,
//     crossChainTokens,
//     crossChainToken,
//     setCrossChainToken
// }: ModalProps) {

//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         const { key } = e;
//         if (key === "Backspace" || key === "Delete" || key === "ArrowLeft" || key === "ArrowRight" || key === "Tab") { return; }
//         if (!/[0-9.]/.test(key)) {
//             e.preventDefault();
//         }
//         if (key === "." && e.currentTarget.value.includes(".")) {
//             e.preventDefault();
//         }
//     };

//     return (
//         <div className="">
//             <H4 className="text-center">Deposit/Withdraw</H4>
//             <Tabs defaultValue="deposit" className="mt-4">
//                 <TabsList>
//                     <TabsTrigger value="deposit">Deposit</TabsTrigger>
//                     <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="deposit">
//                     <div className="bg-card-bg rounded-md p-4 mt-4">
//                         <div className="flex items-center gap-4 justify-between">
//                             <PSmall>Deposit</PSmall>
//                             <PSmall>Bal: {originBalance}</PSmall>
//                         </div>
//                         <div className="mt-2 flex justify-between items-center mb-2 text-tertiary-text-color">
//                             <div className="flex items-center gap-4 justify-between w-full">
//                                 <input
//                                     type="text"
//                                     name="token_price"
//                                     value={amount}
//                                     onChange={(e) => setAmount(e.target.value)}
//                                     onKeyDown={handleKeyPress}
//                                     placeholder="0.000"
//                                     inputMode="decimal"
//                                     className="text-xl font-bold bg-transparent outline-none w-full"
//                                     autoComplete="off"
//                                 />

//                                 <div className="w-fit">
//                                     <DropdownMenu>
//                                         {/* <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
//                                             {
//                                                 crossChainToken ?
//                                                     <>
//                                                         <Image src={`${crossChainToken?.image}`} alt={`${crossChainToken?.symbol}`} height={20} width={20} className="rounded-full" />
//                                                         <span>{crossChainToken.symbol}</span>
//                                                     </>
//                                                     :
//                                                     'Select'
//                                             }
//                                             <IoIosArrowDown className='ms-2 h-9 w-9' />
//                                         </DropdownMenuTrigger>
//                                         <DropdownMenuContent className="bg-secondary-button-color w-fit rounded-md z-90">
//                                             {
//                                                 crossChainTokens.map((token, i) => {
//                                                     return (
//                                                         <DropdownMenuItem
//                                                             key={i}
//                                                             // onClick={() => {
//                                                             //     onCollateralChange(token)
//                                                             // }}
//                                                             onClick={() => {
//                                                                 setCrossChainToken(token)
//                                                             }}
//                                                             className={`capitalize flex items-center gap-2`}
//                                                         >
//                                                             <Image src={token.image ?? ''} alt="token-icon" height={20} width={20} className="rounded-full" />
//                                                             {token.symbol}
//                                                         </DropdownMenuItem>
//                                                     )
//                                                 })
//                                             }
//                                         </DropdownMenuContent> */}

//                                         <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
//                                             <Image src={collateralToken.icon} alt={collateralToken.symbol} height={20} width={20} className="rounded-full" />
//                                             {collateralToken.symbol}
//                                             <IoIosArrowDown className='ms-2 h-9 w-9' />
//                                         </DropdownMenuTrigger>
//                                         <DropdownMenuContent className="bg-secondary-button-color w-fit rounded-md z-90">
//                                             {
//                                                 collateralTokens.map((coll, i) => {
//                                                     return (
//                                                         <DropdownMenuItem
//                                                             key={i}
//                                                             onClick={() => {
//                                                                 onCollateralChange(coll)
//                                                             }}
//                                                             className={`capitalize flex items-center gap-2`}
//                                                         >
//                                                             <Image src={coll.icon ?? ''} alt="token-icon" height={20} width={20} className="rounded-full" />
//                                                             {coll.symbol}
//                                                         </DropdownMenuItem>
//                                                     )
//                                                 })
//                                             }
//                                         </DropdownMenuContent>
//                                     </DropdownMenu>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="text-center mt-4 ">
//                         <Button className="w-full" onClick={() => handleDeposit()} disabled={transferInProgress || !amount} >
//                             {transferInProgress ?
//                                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
//                                 : 'Deposit'}
//                         </Button>
//                     </div>
//                 </TabsContent>

//                 {/* ======================== */}
//                 {/* Withdraw */}
//                 {/* ======================== */}
//                 <TabsContent value="withdraw">
//                     <div className="bg-card-bg rounded-md p-4 mt-4">
//                         <div className="flex items-center gap-4 justify-between">
//                             <PSmall>Withdraw</PSmall>
//                             <PSmall>Bal: {aptosBalance}</PSmall>
//                         </div>
//                         <div className="mt-2 flex justify-between items-center mb-2 text-tertiary-text-color">
//                             <div className="flex items-center gap-4 justify-between w-full">
//                                 <input
//                                     type="text"
//                                     name="token_price"
//                                     value={withdrawAmount}
//                                     onChange={(e) => setWithdrawAmount(e.target.value)}
//                                     onKeyDown={handleKeyPress}
//                                     placeholder="0.000"
//                                     inputMode="decimal"
//                                     className="text-xl font-bold bg-transparent outline-none w-full"
//                                 />
//                                 <div className="w-fit">
//                                     <DropdownMenu>
//                                         <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
//                                             <Image src={collateralToken.icon} alt={collateralToken.symbol} height={20} width={20} className="rounded-full" />
//                                             {collateralToken.symbol}
//                                             <IoIosArrowDown className='ms-2 h-9 w-9' />
//                                         </DropdownMenuTrigger>
//                                         <DropdownMenuContent className="bg-secondary-button-color w-fit rounded-md z-90">
//                                             {
//                                                 collateralTokens.map((coll, i) => {
//                                                     return (
//                                                         <DropdownMenuItem
//                                                             key={i}
//                                                             onClick={() => {
//                                                                 onCollateralChange(coll)
//                                                             }}
//                                                             className={`capitalize flex items-center gap-2`}
//                                                         >
//                                                             <Image src={coll.icon ?? ''} alt="token-icon" height={20} width={20} className="rounded-full" />
//                                                             {coll.symbol}
//                                                         </DropdownMenuItem>
//                                                     )
//                                                 })
//                                             }
//                                         </DropdownMenuContent>
//                                     </DropdownMenu>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="text-center mt-4 ">
//                         <Button className="w-full" onClick={() => onWithdrawClick()} disabled={withdrawInProgress || !withdrawAmount}>
//                             {withdrawInProgress ?
//                                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
//                                 : 'Withdraw'}
//                         </Button>
//                     </div>
//                 </TabsContent>
//             </Tabs>
//         </div>
//     )
// }

