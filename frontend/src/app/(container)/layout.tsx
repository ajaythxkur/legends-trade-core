'use client';
import BreadCrumb from "@/components/breadcrumb";
import Sidebar from "@/components/sidebar";
import { useDrawer } from '../../contexts/DrawerContext';
import Logo from "@/components/icons/logo";
import { WalletButton } from "@/components/wallet/WalletButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useApp } from "@/contexts/AppProvider";
import DepositModal from "@/components/DepositWithdraw";
import Body from "./deposit/Body";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { account } = useWallet()
    const { sourceChain } = useApp()
    const isMobile = useIsMobile()
    const { isVisible, drawerContent, closeDrawer } = useDrawer();
    return (
        <section className="min-h-screen md:h-screen pb-20 md:p-4 lg:p-6 bg-card-bg">
            <div className="flex gap-4 lg:gap-6 h-full">

                {/* sidebar */}
                <div className="bg-bottom-layer-2 p-2 md:p-4 rounded-2xl rounded-bl-sm md:h-full fixed left-4 right-4 bottom-4 md:bottom-0 md:left-0 md:right-0 md:w-fit z-60
                md:rounded-tl-lg md:rounded-br-lg md:rounded-tr-4xl md:rounded-bl-4xl md:relative shadow-lg md:shadow-none ">
                    <Sidebar />
                </div>

                <div className="w-full flex flex-col h-full px-4 md:px-0 pt-4 md:pt-0">
                    {/* header */}
                    <div className="bg-light p-1.5 md:p-3 rounded-md md:rounded-lg flex justify-between items-center gap-4 bg-bottom-layer-2 mb-0">
                        <div className="md:hidden"><Logo /></div> {/* on mobile only*/}

                        <div className="breadcrumb hidden md:block">
                            <BreadCrumb />
                        </div>
                        <div className="flex gap-4 items-center">
                            {
                                account && sourceChain !== "Aptos" &&
                                // <DepositModal />
                                <Body />
                            }
                            <WalletButton />
                        </div>
                    </div>
                    {/* mobile */}
                    {/* <div className="breadcrumb md:hidden mt-3">
                        <BreadCrumb />
                    </div> */}

                    {/* content */}
                    <div className="lg:flex gap-6 mt-4 lg:mt-6 h-full overflow-y-auto scrollbar-hide">
                        <div className={`p-4 px-3 md:px-4 rounded-lg overflow-y-auto bg-bottom-layer-2 scrollbar-hide h-[calc(100vh-184px)] md:h-full
                            ${isVisible ? 'w-full xl:w-3/4 md:hidden lg:block lg:w-[60%]' : 'w-full'} transition-all duration-300 ease-in-out`}>
                            {children}
                        </div>

                        {/* Side Drawer */}
                        {
                            isVisible &&
                            <>
                                {
                                    isMobile ?
                                        <Drawer open={isVisible} onOpenChange={closeDrawer}>
                                            <DrawerContent className="bg-bottom-layer-2 px-4 max-h-[90vh] overflow-y-auto scrollbaar-hide">
                                                <DrawerTitle>{''}</DrawerTitle>
                                                {drawerContent}
                                            </DrawerContent>
                                        </Drawer>
                                        :
                                        <div className="pb-14 xl:pb-4 p-4 rounded-lg overflow-y-auto bg-bottom-layer-2 scrollbar-hide w-full lg:lg:w-[40%] xl:w-1/4 h-full transition-all duration-300 ease-in-out z-90">
                                            {drawerContent}
                                        </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}