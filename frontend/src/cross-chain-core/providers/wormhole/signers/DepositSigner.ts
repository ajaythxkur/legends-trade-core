import { SolanaDerivedWallet } from "@aptos-labs/derived-wallet-solana";
import { EIP1193DerivedWallet } from "@aptos-labs/derived-wallet-ethereum";
import { PublicKey } from "@solana/web3.js";
import { ChainConfig } from "../../../config";
import { Signer } from "./Signer";

export class DepositSigner extends Signer<any, any> {
  public signer: any;

  private constructor(
    chainConfig: ChainConfig,
    address: string,
    signer: any,
    wallet: SolanaDerivedWallet | EIP1193DerivedWallet
  ) {
    super(chainConfig, address, {}, wallet);
    this.signer = signer;
  }

  static async create(
    chainConfig: ChainConfig,
    wallet: SolanaDerivedWallet | EIP1193DerivedWallet
  ): Promise<DepositSigner> {
    let address: string;
    let signer: any;

    if (chainConfig.context === "Solana") {
      const solWallet = (wallet as SolanaDerivedWallet).solanaWallet;
      if (!solWallet?.publicKey) throw new Error("Phantom not connected");
      address = solWallet.publicKey.toBase58();

      signer = {
        publicKey: solWallet.publicKey,
        signTransaction: async (tx: any) => {
          if (!solWallet.signTransaction) throw new Error("signTransaction is undefined");
          return await solWallet.signTransaction(tx);
        },
        signAllTransactions: async (txs: any[]) => {
          if (!solWallet.signAllTransactions) throw new Error("signAllTransactions is undefined");
          return await solWallet.signAllTransactions(txs);
        },
      };
    } else if (chainConfig.context === "Ethereum") {
      const provider = (wallet as EIP1193DerivedWallet).eip1193Provider as any;
      if (!provider) throw new Error("EVM provider missing");
      const [addr] = await provider.request({ method: "eth_requestAccounts" });
      address = addr;

      signer = provider; // EVM signer is the provider
    } else {
      throw new Error(`Unsupported chain context: ${chainConfig.context}`);
    }

    return new DepositSigner(chainConfig, address, signer, wallet);
  }
}
