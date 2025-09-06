'use client';
import { Chain, CrossChainCore, CrossChainProvider, EthereumChainIdToMainnetChain, EthereumChainIdToTestnetChain } from '@/cross-chain-core';
import { getOriginWalletDetails, isEIP1193DerivedWallet, isSolanaDerivedWallet, OriginWalletDetails } from '@/utils/derivedWallet';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Account, Ed25519PrivateKey, Network, PrivateKey, PrivateKeyVariants } from "@aptos-labs/ts-sdk"
import { FEE_PAYER_ACCOUNT_PRIVATE_KEY, NETWORK } from '@/utils/env';

interface AppContextType {
    originWalletDetails?: OriginWalletDetails;
    sourceChain?: Chain;
    sponsorAccount: Account;
    provider: CrossChainProvider<any, any, any, any, any, any>;
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
    const { network, wallet } = useWallet();
    const [originWalletDetails, setOriginWalletDetails] = useState<
        OriginWalletDetails | undefined
    >(undefined);
    const [sourceChain, setSourceChain] = useState<Chain | undefined>(undefined);
    const feePayerPrivateKey = new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(FEE_PAYER_ACCOUNT_PRIVATE_KEY, PrivateKeyVariants.Ed25519)
    );
    const sponsorAccount = Account.fromPrivateKey({
        privateKey: feePayerPrivateKey,
    });
    const crossChainCore = new CrossChainCore({
        dappConfig: { aptosNetwork: NETWORK },
    });
    const provider = crossChainCore.getProvider("Wormhole")
    useEffect(() => {
        if (!wallet) {
            setOriginWalletDetails(undefined);
            setSourceChain(undefined);
            return;
        }
        // originWallet
        const fetchOriginWalletDetails = async () => {
            const details = await getOriginWalletDetails(wallet);
            setOriginWalletDetails(details);
        };
        void fetchOriginWalletDetails();
        // sourceChain
        if (isSolanaDerivedWallet(wallet)) {
            setSourceChain("Solana");
        } else if (isEIP1193DerivedWallet(wallet)) {
            const fetchWalletChainId = async () => {
                const chainId = await wallet.eip1193Provider.request({
                    method: "eth_chainId",
                });
                return chainId;
            };
            fetchWalletChainId().then((chainId: string) => {
                const actualChainId = parseInt(chainId, 16);
                console.log("actualChainId", actualChainId);
                const chain =
                    network?.name === Network.MAINNET
                        ? EthereumChainIdToMainnetChain[actualChainId]
                        : EthereumChainIdToTestnetChain[actualChainId];
                setSourceChain(chain.key);
            });
        } else {
            setSourceChain("Aptos");
        }
    }, [wallet]);

    useEffect(() => {

    }, [wallet])
    const value: AppContextType = {
        originWalletDetails,
        sourceChain,
        sponsorAccount,
        provider
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};