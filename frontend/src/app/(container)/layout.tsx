'use client';
import BreadCrumb from "@/components/breadcrumb";
// import ConnectWallet from "@/components/connectwallet";
import Network from "@/components/network";
import Sidebar from "@/components/sidebar";
import { useDrawer } from '../../contexts/DrawerContext';
import Logo from "@/components/icons/logo";
import { WalletSelector } from "@/components/connectwallet";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isVisible, drawerContent } = useDrawer();
    return (
        <section className="md:h-screen pb-20 md:p-4 lg:p-6 bg-card-bg">
            <div className="flex gap-4 lg:gap-6 h-full">

                {/* sidebar */}
                <div className="bg-bottom-layer-2 p-2 md:p-4 rounded-2xl rounded-bl-sm md:h-full fixed left-4 right-4 bottom-4 md:bottom-0 md:left-0 md:right-0 md:w-fit z-60
                md:rounded-tl-lg md:rounded-br-lg md:rounded-tr-4xl md:rounded-bl-4xl md:relative shadow-lg md:shadow-none ">
                    <Sidebar />
                </div>

                {/* content box */}
                <div className="w-full flex flex-col h-full px-4 sm:px-0 pt-4 md:pt-0">
                    <div className="bg-light p-1.75 md:p-3 rounded-md md:rounded-lg flex justify-between items-center gap-4 bg-bottom-layer-2 mb-0">
                        <div className="md:hidden"><Logo /></div> {/* on mobile only*/}

                        <div className="breadcrumb hidden md:block">
                            <BreadCrumb />
                        </div>
                        <div className="flex gap-4 items-center">
                            {/* <Network /> */}
                            {/* <ConnectWallet /> */}
                            <WalletSelector />
                        </div>
                    </div>
                    {/* mobile */}
                    <div className="breadcrumb md:hidden mt-3">
                        <BreadCrumb />
                    </div>

                    <div className="lg:flex gap-6 mt-4 lg:mt-8 h-full overflow-y-auto scrollbar-hide">
                        <div className={`p-4 rounded-lg overflow-y-auto bg-bottom-layer-2 scrollbar-hide h-full 
                            ${isVisible ? 'w-full xl:w-3/4 md:hidden lg:block lg:w-[60%]' : 'w-full'} transition-all duration-300 ease-in-out`}>
                            {children}
                        </div>

                        {isVisible && (
                            <div className="mt-10 sm:mt-0 pb-14 xl:pb-4 p-4 rounded-lg overflow-y-auto bg-bottom-layer-2 scrollbar-hide w-full lg:lg:w-[40%] xl:w-1/4 h-full transition-all duration-300 ease-in-out fixed md:relative top-0 left-0 z-90 border-t-4 border-primary-button-color md:border-0">
                                {drawerContent}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}