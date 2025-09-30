// Functions will be called to fetch the balances of any tokens accross the chains
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { ethers, JsonRpcProvider } from "ethers";

export const getSolanaWalletBalance = async (
  walletAddress: string,
  rpc: string,
  tokenAddress: string
): Promise<string> => {
  const address = new PublicKey(walletAddress);
  const connection = new Connection(rpc);
  // Check to see if we were passed wallet address or token account
  const splToken = await connection.getTokenAccountsByOwner(address, {
    mint: new PublicKey(tokenAddress),
  });

  // Use the first token account if it exists, otherwise fall back to wallet address
  const checkAddress =
    splToken.value.length > 0 ? splToken.value[0]!.pubkey : address;

  const balance = await connection.getTokenAccountBalance(checkAddress);

  return (
    balance.value.uiAmountString ??
    (Number(balance.value.amount) / 10 ** balance.value.decimals).toString()
  );
};

export const getEthereumWalletBalance = async (
  walletAddress: string,
  rpc: string,
  tokenAddress: string,
  decimals: number,
): Promise<string> => {
  const connection = new JsonRpcProvider(rpc);
  const abi = ["function balanceOf(address owner) view returns (uint256)"];
  const contract = new ethers.Contract(tokenAddress, abi, connection);
  const balance = await contract.balanceOf(walletAddress);
  return ethers.formatUnits(balance, decimals).toString();
};

export const getAptosWalletBalance = async (
  walletAddress: string,
  aptosNetwork: Network,
  tokenAddress: string,
  decimals: number,
): Promise<string> => {
  const aptosConfig = new AptosConfig({ network: aptosNetwork });
  const connection = new Aptos(aptosConfig);
  const response = await connection.getCurrentFungibleAssetBalances({
    options: {
      where: {
        owner_address: { _eq: walletAddress },
        asset_type: { _eq: tokenAddress },
      },
    },
  });
  if (response.length === 0) {
    return "0";
  }
  const balance = (
    Number(response[0].amount) /
    10 ** decimals
  ).toString();
  return balance;
};
