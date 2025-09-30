"use client";

import { CrossChainCore, Chain } from "@/cross-chain-core";
import { Network } from "@aptos-labs/ts-sdk";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface BalanceContextType {
  aptosBalance: string | undefined;
  originBalance: string | undefined;
  isLoadingAptosBalance: boolean;
  isLoadingOriginBalance: boolean;
  globalTransactionInProgress: boolean;
  fetchAptosBalance: (address: string, token: string, decimals: number) => Promise<void>;
  fetchOriginBalance: (address: string, chain: Chain, token: string, decimals: number) => Promise<void>;
  refetchBalances: () => Promise<void>;
  refetchBalancesWithDelay: (delayMs?: number) => Promise<void>;
  refetchAptosBalanceWithDelay: (delayMs?: number) => Promise<void>;
  setGlobalTransactionInProgress: (inProgress: boolean) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

interface BalanceProviderProps {
  children: ReactNode;
  dappNetwork: Network.MAINNET | Network.TESTNET;
}

export function BalanceProvider({
  children,
  dappNetwork,
}: BalanceProviderProps) {
  // Initialize crossChainCore with the prop
  const crossChainCore = new CrossChainCore({
    dappConfig: { aptosNetwork: dappNetwork },
  });

  const [aptosBalance, setAptosBalance] = useState<string | undefined>(undefined);
  const [originBalance, setOriginBalance] = useState<string | undefined>(undefined);
  const [isLoadingAptosBalance, setIsLoadingAptosBalance] = useState(false);
  const [isLoadingOriginBalance, setIsLoadingOriginBalance] = useState(false);
  const [globalTransactionInProgress, setGlobalTransactionInProgress] = useState(false);

  // Store the last used parameters for refetching
  const [lastAptosConfig, setLastAptosConfig] = useState<{ address: string; token: string; decimals: number } | undefined>(undefined);
  const [lastOriginConfig, setLastOriginConfig] = useState<{ address: string; token: string; decimals: number } | undefined>(undefined);
  const [lastOriginChain, setLastOriginChain] = useState<Chain | undefined>(undefined);

  const fetchAptosBalance = useCallback(async (address: string, token: string, decimals: number) => {
    if (!address) return;

    setIsLoadingAptosBalance(true);
    setLastAptosConfig({ address, token, decimals });

    try {
      const balance = await crossChainCore.getWalletBalance(
        address,
        "Aptos",
        token,
        decimals
      );
      console.log(`Aptos balance : ${address}, ${token}, ${decimals}}`)
      setAptosBalance(balance);
      // console.log('fetch runing')
    } catch (error) {
      console.error("Error fetching Aptos USDC balance:", error);
      setAptosBalance(undefined);
    } finally {
      setIsLoadingAptosBalance(false);
    }
  }, []);

  const fetchOriginBalance = useCallback(
    async (address: string, chain: Chain, token: string, decimals: number) => {
      if (!address || !chain) return;

      setIsLoadingOriginBalance(true);
      setLastOriginConfig({ address, token, decimals });
      setLastOriginChain(chain);

      try {
        const balance = await crossChainCore.getWalletBalance(
          address,
          chain,
          token,
          // '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
          decimals
        );
        console.log(`Origin balance : ${address}, ${chain}, ${token}, ${decimals}}`)
        setOriginBalance(balance);
      } catch (error) {
        console.error("Error fetching origin USDC balance:", error);
        setOriginBalance(undefined);
      } finally {
        setIsLoadingOriginBalance(false);
      }
    },
    []
  );

  const refetchBalances = useCallback(async () => {
    const promises = [];

    if (lastAptosConfig) {
      promises.push(fetchAptosBalance(lastAptosConfig.address, lastAptosConfig.token, lastAptosConfig.decimals));
    }

    if (lastOriginConfig && lastOriginChain) {
      promises.push(fetchOriginBalance(lastOriginConfig.address, lastOriginChain, lastOriginConfig.token, lastOriginConfig.decimals));
    }

    await Promise.all(promises);
  }, [
    lastAptosConfig,
    lastOriginConfig,
    lastOriginChain,
    fetchAptosBalance,
    fetchOriginBalance,
  ]);

  const refetchAptosBalanceWithRetry = useCallback(
    async (maxRetries: number = 3, initialDelayMs: number = 5000) => {
      if (!lastAptosConfig) return;

      let retryCount = 0;
      const originalBalance = aptosBalance;

      const attemptFetch = async (delayMs: number): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              const balance = await crossChainCore.getWalletBalance(
                lastAptosConfig.address,
                "Aptos",
                lastAptosConfig.token,
                lastAptosConfig.decimals
              );

              // Check if balance actually changed (indicating transaction was processed)
              if (balance !== originalBalance) {
                setAptosBalance(balance);
                resolve();
                return;
              }

              // If balance hasn't changed and we have retries left, try again
              if (retryCount < maxRetries) {
                retryCount++;
                const nextDelay = delayMs * 1.5; // Exponential backoff
                console.log(
                  `Aptos balance unchanged, retrying in ${nextDelay}ms (attempt ${retryCount}/${maxRetries})`
                );
                await attemptFetch(nextDelay);
                resolve();
              } else {
                // Final attempt - set the balance even if unchanged
                setAptosBalance(balance);
                resolve();
              }
            } catch (error) {
              console.error(
                `Error fetching Aptos balance (attempt ${retryCount + 1}):`,
                error
              );
              if (retryCount < maxRetries) {
                retryCount++;
                const nextDelay = delayMs * 1.5;
                await attemptFetch(nextDelay);
              }
              resolve();
            }
          }, delayMs);
        });
      };

      await attemptFetch(initialDelayMs);
    },
    [lastAptosConfig, aptosBalance]
  );

  const refetchBalancesWithDelay = useCallback(
    async (delayMs: number = 5000) => {
      // Immediately refetch origin balance
      if (lastOriginConfig && lastOriginChain) {
        await fetchOriginBalance(lastOriginConfig.address, lastOriginChain, lastOriginConfig.token, lastOriginConfig.decimals);
      }

      // Use retry mechanism for Aptos balance
      await refetchAptosBalanceWithRetry(3, delayMs);
    },
    [
      lastOriginConfig,
      lastOriginChain,
      fetchOriginBalance,
      refetchAptosBalanceWithRetry,
    ]
  );

  const refetchAptosBalanceWithDelay = useCallback(
    async (delayMs: number = 5000) => {
      if (lastAptosConfig) {
        setTimeout(async () => {
          await fetchAptosBalance(lastAptosConfig.address, lastAptosConfig.token, lastAptosConfig.decimals);
        }, delayMs);
      }
    },
    [lastAptosConfig, fetchAptosBalance]
  );

  const value: BalanceContextType = {
    aptosBalance,
    originBalance,
    isLoadingAptosBalance,
    isLoadingOriginBalance,
    globalTransactionInProgress,
    fetchAptosBalance,
    fetchOriginBalance,
    refetchBalances,
    refetchBalancesWithDelay,
    refetchAptosBalanceWithDelay,
    setGlobalTransactionInProgress,
  };

  return (
    <BalanceContext.Provider value={value}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance(): BalanceContextType {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}
