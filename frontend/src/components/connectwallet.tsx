"use client";

import {
    APTOS_CONNECT_ACCOUNT_URL,
    AboutAptosConnect,
    AboutAptosConnectEducationScreen,
    AdapterNotDetectedWallet,
    AdapterWallet,
    AptosPrivacyPolicy,
    WalletItem,
    WalletSortingOptions,
    groupAndSortWallets,
    isAptosConnectWallet,
    isInstallRequired,
    truncateAddress,
    useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    Copy,
    LogOut,
    User,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import { useToast } from "./ui/use-toast";
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "./ui/tabs";
import Link from "next/link";

export function WalletSelector(walletSortingOptions: WalletSortingOptions) {
    const { account, connected, disconnect, wallet, isLoading } = useWallet();
    //   const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = useCallback(() => setIsDialogOpen(false), []);

    const copyAddress = useCallback(async () => {
        if (!account?.address) return;
        try {
            await navigator.clipboard.writeText(account.address.toString());
            toast.success('Copied wallet address to clipboard.');
        } catch {
            toast.error('Failed to copy wallet address.');
        }
    }, [account?.address, toast]);

    return connected ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    {account?.ansName ||
                        truncateAddress(account?.address?.toString()) ||
                        "Unknown"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={copyAddress} className="gap-2 flex items-center cursor-pointer">
                    <Copy className="h-4 w-4" /> Copy address
                </DropdownMenuItem>
                {wallet && isAptosConnectWallet(wallet) && (
                    <DropdownMenuItem asChild>
                        <Link
                            href={APTOS_CONNECT_ACCOUNT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2"
                        >
                            <User className="h-4 w-4" /> Account
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={disconnect} className="gap-2 flex items-center cursor-pointer">
                    <LogOut className="h-4 w-4" /> Disconnect
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button disabled = {isLoading}>
                    {
                        isLoading ? 'connecting...' : 'Connect Wallet'
                    }
                    </Button>
            </DialogTrigger>
            <ConnectWalletDialog close={closeDialog} {...walletSortingOptions} />
        </Dialog>
    );
}

interface ConnectWalletDialogProps extends WalletSortingOptions {
    close: () => void;
}

function ConnectWalletDialog({
    close,
    ...walletSortingOptions
}: ConnectWalletDialogProps) {
    const { wallets = [], notDetectedWallets = [] } = useWallet();

    const { aptosConnectWallets, availableWallets, installableWallets } =
        groupAndSortWallets(
            [...wallets, ...notDetectedWallets],
            walletSortingOptions
        );

    const hasAptosConnectWallets = !!aptosConnectWallets.length;

    const { evmWallets, solanaWallets, aptosWallets } = availableWallets.reduce<{
        evmWallets: AdapterWallet[];
        solanaWallets: AdapterWallet[];
        aptosWallets: AdapterWallet[];
    }>(
        (acc, wallet) => {
            if (wallet.name.includes("Ethereum")) {
                acc.evmWallets.push(wallet);
            } else if (wallet.name.includes("Solana")) {
                acc.solanaWallets.push(wallet);
            } else {
                acc.aptosWallets.push(wallet);
            }
            return acc;
        },
        { evmWallets: [], solanaWallets: [], aptosWallets: [] }
    );

    const {
        evmInstallableWallets,
        solanaInstallableWallets,
        aptosInstallableWallets,
    } = installableWallets.reduce<{
        evmInstallableWallets: AdapterNotDetectedWallet[];
        solanaInstallableWallets: AdapterNotDetectedWallet[];
        aptosInstallableWallets: AdapterNotDetectedWallet[];
    }>(
        (acc, wallet) => {
            if (wallet.name.includes("Ethereum")) {
                acc.evmInstallableWallets.push(wallet);
            } else if (wallet.name.includes("Solana")) {
                acc.solanaInstallableWallets.push(wallet);
            } else {
                acc.aptosInstallableWallets.push(wallet);
            }
            return acc;
        },
        {
            evmInstallableWallets: [],
            solanaInstallableWallets: [],
            aptosInstallableWallets: [],
        }
    );

    return (
        <DialogContent className="max-h-[80vh] overflow-auto bg-white scrollbar-hide">
            <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
                <DialogHeader>
                    <DialogTitle className="flex flex-col text-center leading-snug">
                        {hasAptosConnectWallets ? (
                            <>
                                <span>Log in or sign up</span>
                                <span>with Social + Aptos Connect</span>
                            </>
                        ) : (
                            "Connect Wallet"
                        )}
                    </DialogTitle>
                </DialogHeader>

                {hasAptosConnectWallets && (
                    <div className="flex flex-col gap-2 pt-3">
                        {aptosConnectWallets.map((wallet) => (
                            <AptosConnectWalletRow
                                key={wallet.name}
                                wallet={wallet}
                                onConnect={close}
                            />
                        ))}
                        <p className="flex gap-1 justify-center items-center text-muted-foreground text-sm">
                            Learn more about{" "}
                            <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center text-foreground">
                                Aptos Connect <ArrowRight size={16} />
                            </AboutAptosConnect.Trigger>
                        </p>
                        <AptosPrivacyPolicy className="flex flex-col items-center py-1">
                            <p className="text-xs leading-5">
                                <AptosPrivacyPolicy.Disclaimer />{" "}
                                <AptosPrivacyPolicy.Link className="text-muted-foreground underline underline-offset-4" />
                                <span className="text-muted-foreground">.</span>
                            </p>
                            <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-muted-foreground" />
                        </AptosPrivacyPolicy>
                        <div className="flex items-center gap-3 pt-4 text-muted-foreground">
                            <div className="h-px w-full bg-secondary" />
                            Or
                            <div className="h-px w-full bg-secondary" />
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3 pt-3">
                    {/* Handle Aptos wallets */}
                    <Tabs defaultValue="aptos">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="aptos">Aptos</TabsTrigger>
                            <TabsTrigger value="solana">Solana</TabsTrigger>
                            <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                        </TabsList>
                        <TabsContent value="aptos" className="space-y-2">
                            {aptosWallets.map((wallet) => (
                                <WalletRow
                                    key={wallet.name}
                                    wallet={wallet}
                                    onConnect={close}
                                />
                            ))}
                            {!!aptosInstallableWallets.length && (
                                <Collapsible className="flex flex-col gap-3 pt-3">
                                    <CollapsibleTrigger asChild>
                                        <Button size="sm" variant="ghost" className="gap-2">
                                            More wallets <ChevronDown />
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="flex flex-col gap-3">
                                        {aptosInstallableWallets.map((wallet) => (
                                            <WalletRow
                                                key={wallet.name}
                                                wallet={wallet}
                                                onConnect={close}
                                            />
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                        </TabsContent >
                        {/* Handle Solana wallets */}
                        <TabsContent value="solana" className="space-y-2">
                            {solanaWallets.map((wallet) => (
                                <WalletRow
                                    key={wallet.name}
                                    wallet={wallet}
                                    onConnect={close}
                                />
                            ))}
                            {!!solanaInstallableWallets.length && (
                                <Collapsible className="flex flex-col gap-3 pt-3">
                                    <CollapsibleTrigger asChild>
                                        <Button size="sm" variant="ghost" className="gap-2">
                                            More wallets <ChevronDown />
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="flex flex-col gap-3">
                                        {solanaInstallableWallets.map((wallet) => (
                                            <WalletRow
                                                key={wallet.name}
                                                wallet={wallet}
                                                onConnect={close}
                                            />
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                        </TabsContent>
                        {/* Handle Ethereum wallets */}
                        <TabsContent value="ethereum" className="space-y-2">
                            {evmWallets.map((wallet) => (
                                <WalletRow
                                    key={wallet.name}
                                    wallet={wallet}
                                    onConnect={close}
                                />
                            ))}
                            {!!evmInstallableWallets.length && (
                                <Collapsible className="flex flex-col gap-3 pt-3">
                                    <CollapsibleTrigger asChild>
                                        <Button size="sm" variant="ghost" className="gap-2">
                                            More wallets <ChevronDown />
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="flex flex-col gap-3">
                                        {evmInstallableWallets.map((wallet) => (
                                            <WalletRow
                                                key={wallet.name}
                                                wallet={wallet}
                                                onConnect={close}
                                            />
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </AboutAptosConnect>
        </DialogContent>
    );
}

interface WalletRowProps {
    wallet: AdapterWallet | AdapterNotDetectedWallet;
    onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
        <WalletItem
            wallet={wallet}
            onConnect={onConnect}
            className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md"
        >
            <div className="flex items-center gap-4">
                <WalletItem.Icon className="h-6 w-6" />
                <WalletItem.Name className="text-base font-normal" />
            </div>
            {isInstallRequired(wallet) ? (
                <Button size="sm" variant="ghost" asChild>
                    <WalletItem.InstallLink />
                </Button>
            ) : (
                <WalletItem.ConnectButton asChild>
                    <Button size="sm">Connect</Button>
                </WalletItem.ConnectButton>
            )}
        </WalletItem>
    );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
        <WalletItem wallet={wallet} onConnect={onConnect}>
            <WalletItem.ConnectButton asChild>
                <Button size="lg" variant="outline" className="w-full gap-4">
                    <WalletItem.Icon className="h-5 w-5" />
                    <WalletItem.Name className="text-base font-normal" />
                </Button>
            </WalletItem.ConnectButton>
        </WalletItem>
    );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
    return (
        <>
            <DialogHeader className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
                <Button variant="ghost" size="lg" onClick={screen.cancel}>
                    <ArrowLeft />
                </Button>
                <DialogTitle className="leading-snug text-base text-center">
                    About Aptos Connect
                </DialogTitle>
            </DialogHeader>

            <div className="flex h-[162px] pb-3 items-end justify-center">
                <screen.Graphic />
            </div>
            <div className="flex flex-col gap-2 text-center pb-4">
                <screen.Title className="text-xl" />
                <screen.Description className="text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
            </div>

            <div className="grid grid-cols-3 items-center">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={screen.back}
                    className="justify-self-start"
                >
                    Back
                </Button>
                <div className="flex items-center gap-2 place-self-center">
                    {screen.screenIndicators.map((ScreenIndicator, i) => (
                        <ScreenIndicator key={i} className="py-4">
                            <div className="h-0.5 w-6 transition-colors bg-muted [[data-active]>&]:bg-foreground" />
                        </ScreenIndicator>
                    ))}
                </div>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={screen.next}
                    className="gap-2 justify-self-end"
                >
                    {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"}
                    <ArrowRight size={16} />
                </Button>
            </div>
        </>
    );
}

// 'use client';
// import { LuWalletMinimal } from 'react-icons/lu';
// import { useState } from 'react';
// import { CgClose } from 'react-icons/cg';
// import { PExtraSmall } from './ui/typography';
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// // import { RxExit } from 'react-icons/rx';
// import { Button } from './ui/button';
// export default function ConnectWallet() {
//     const [isOpen, setIsOpen] = useState(false);

//     const wallets = [
//         {
//             name: 'Petra',
//             icon: '🦊',
//             description: 'Connect to your Petra wallet',
//             popular: true
//         },
//         {
//             name: 'Martian',
//             icon: '🔗',
//             description: 'Martian wallet'
//         },
//         {
//             name: 'Phontem',
//             icon: '🔵',
//             description: 'Connect to your phontem Wallet'
//         },
//     ];

//     return (
//         <>
//             {/* Trigger Button */}
//             <Button onClick={() => setIsOpen(true)} className='p-3 md:px-4 md:py-3'>
//                 <span className="hidden md:block">Connect Wallet </span>
//                 <LuWalletMinimal className='md:ms-2' />
//             </Button>

//             {/* On Wallet connected */}
//             {/* <div className="">
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className='rounded-lg'>OX6...S125S <LuWalletMinimal className='ms-2' /></Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="bg-secondary-button-color py-2 rounded-md shadow-lg mt-1">
//                         <DropdownMenuGroup>
//                                 <DropdownMenuItem className='py-2 px-6 hover:bg-card-bg text-sm flex gap-2 items-center cursor-pointer focus:outline-none focus:ring-0'>Disconnect Wallet <RxExit /></DropdownMenuItem>
//                                 <DropdownMenuItem className='py-2 px-6 hover:bg-card-bg text-sm flex gap-2 items-center cursor-pointer focus:outline-none focus:ring-0'>Dashboard</DropdownMenuItem>
//                         </DropdownMenuGroup>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div> */}


//             {/* Modal */}
//             {isOpen && (
//                 <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//                         {/* Header */}
//                         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                             <h2 className="text-xl font-semibold text-gray-900">Connect Wallet</h2>
//                             <button
//                                 onClick={() => setIsOpen(false)}
//                                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                             >
//                                 <CgClose className='text-2xl' />
//                             </button>
//                         </div>

//                         {/* Content */}
//                         <div className="p-6">
//                             <p className="text-gray-600 text-sm mb-6">
//                                 Choose how you want to connect. There are several wallet providers.
//                             </p>

//                             {/* Wallet Options */}
//                             <div className="space-y-3">
//                                 {wallets.map((wallet, index) => (
//                                     <button
//                                         key={index}
//                                         // onClick={() => handleWalletConnect(wallet.name)}
//                                         className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
//                                     >
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
//                                                 {wallet.icon}
//                                             </div>
//                                             <div className="text-left">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="font-medium text-gray-900">{wallet.name}</span>
//                                                     {wallet.popular && (
//                                                         <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                                                             Popular
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <p className="text-sm text-gray-600">{wallet.description}</p>
//                                             </div>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Footer */}
//                             <div className="mt-6 pt-4 border-t border-gray-200">
//                                 <PExtraSmall className="text-xs text-gray-500 text-center">
//                                     New to Crypto?{' '}
//                                     <a href="#" className="text-blue-600 hover:text-blue-800 underline">
//                                         Learn more about wallets
//                                     </a>
//                                 </PExtraSmall>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </>
//     );
// }