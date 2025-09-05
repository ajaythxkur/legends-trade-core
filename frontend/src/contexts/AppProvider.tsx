'use client';
import { getOriginWalletDetails, OriginWalletDetails } from '@/utils/derivedWallet';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AppContextType {

}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within a AppProvider');
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const { account, connected, network, wallet, changeNetwork } = useWallet();
    const [originWalletDetails, setOriginWalletDetails] = useState<
        OriginWalletDetails | undefined
    >(undefined);

    useEffect(() => {
        if (!wallet) {
            setOriginWalletDetails(undefined);
            return;
        }
        const fetchOriginWalletDetails = async () => {
            const details = await getOriginWalletDetails(wallet);
            setOriginWalletDetails(details);
        };
        void fetchOriginWalletDetails();
    }, [wallet]);
    const value: AppContextType = {

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};