"use client";

import {
    AboutAptosConnect,
    AboutAptosConnectEducationScreen,
    AdapterNotDetectedWallet,
    AdapterWallet,
    WalletItem,
    WalletSortingOptions,
    groupAndSortWallets,
    isInstallRequired,
    useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTitle, } from "@/components/ui/drawer"

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "../ui/tabs";
import { H3, H4 } from "../ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";

interface WalletProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    walletSortingOptions?: WalletSortingOptions
}

export function WalletModal({ open, setOpen, walletSortingOptions }: WalletProps) {
    const isMobile = useIsMobile();

    if (isMobile) return <MobileDrawer open={open} setOpen={setOpen} walletSortingOptions={walletSortingOptions} />
    return <DesktopModal open={open} setOpen={setOpen} walletSortingOptions={walletSortingOptions} />

}

const DesktopModal = ({ open, setOpen, walletSortingOptions }: WalletProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[80vh] overflow-y-auto bg-bottom-layer-2 scrollbar-hide">
                <DialogTitle>{''}</DialogTitle>
                <H4 className="text-center">Connect Wallet</H4>
                <ConnectWalletDialog close={setOpen} {...walletSortingOptions} />
            </DialogContent>
        </Dialog>
    )
}

const MobileDrawer = ({ open, setOpen, walletSortingOptions }: WalletProps) => {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="max-h-[80vh] bg-bottom-layer-2 scrollbar-hide px-4 overflow-y-auto">
                <DrawerTitle>{''}</DrawerTitle>
                <H4 className="text-center">Connect Wallet</H4>
                <ConnectWalletDialog close={setOpen} {...walletSortingOptions} />
            </DrawerContent>
        </Drawer>
    )
}


interface ConnectWalletDialogProps extends WalletSortingOptions {
    close: Dispatch<SetStateAction<boolean>>;
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
        <div className="">
            <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
                {hasAptosConnectWallets && (
                    <div className="flex flex-col gap-2 pt-3">
                        {aptosConnectWallets.map((wallet) => (
                            <AptosConnectWalletRow
                                key={wallet.name}
                                wallet={wallet}
                            // onConnect={close}
                            />
                        ))}
                        <div className="flex items-center gap-3 pt-4 text-muted-foreground">
                            <div className="h-px bg-border-color w-1/2" />
                            Or
                            <div className="h-px bg-border-color w-1/2" />
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
                                // onConnect={close}
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
                                            // onConnect={close}
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
                                // onConnect={close}
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
                                            // onConnect={close}
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
                                // onConnect={close}
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
                                            // onConnect={close}
                                            />
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </AboutAptosConnect>
        </div>
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
            className="flex items-center justify-between px-4 py-2 pb-4 gap-4 border-b border-border-color"
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
        <WalletItem wallet={wallet} onConnect={onConnect} className="text-center">
            <WalletItem.ConnectButton asChild>
                <Button variant="ghost" className="dark:bg-bottom-layer-1 text-primary-text-color w-full md:w-[80%] mx-auto  gap-4">
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