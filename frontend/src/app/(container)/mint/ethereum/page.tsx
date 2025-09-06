"use client"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Account, MintLayout, TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMint, createMintToInstruction, getAssociatedTokenAddress, getMinimumBalanceForRentExemptMint, getMint } from "@solana/spl-token"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";
import { web3 } from "@coral-xyz/anchor";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { H5, P, PSmall } from "@/components/ui/typography";

export default function MintToken() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet()
    const { signTransaction } = useWallet()
    const [tokenMint, setTokenMint] = useState("")
    const [sendingMint, setSendingMint] = useState("")
    const [sendAmount, setSendAmount] = useState(0)
    const [receiver, setReceiver] = useState("")
    const [checkMint, setCheckMint] = useState("");
    const [checkAddress, setCheckAddress] = useState("");
    const [checkedBalance, setCheckedBalance] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    console.log(connection)
    async function createToken() {
        if (!connection || !wallet || !signTransaction) {
            return;
        }
        try {
            setIsCreating(true)
            const mint = web3.Keypair.generate();
            const rent = await getMinimumBalanceForRentExemptMint(connection);
            const { blockhash } = await connection.getRecentBlockhash();
            const txn = new web3.Transaction({
                recentBlockhash: blockhash,
                feePayer: wallet.publicKey
            });
            const accIx = web3.SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mint.publicKey,
                lamports: rent,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID,
            });
            const mintIx = createInitializeMintInstruction(
                mint.publicKey,
                8,
                wallet.publicKey,
                null,
                TOKEN_PROGRAM_ID
            );
            txn.add(accIx, mintIx);
            const signedTxn = await signTransaction(txn);
            signedTxn.partialSign(mint);
            const signature = await connection.sendRawTransaction(signedTxn.serialize());
            await connection.confirmTransaction(signature, "finalized")
            setTokenMint(mint.publicKey.toBase58())
            toast.success("Txn succeed")
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsCreating(false)
        }
    }
    const onCheckSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!connection || !wallet || checkMint == "" || checkAddress == "") {
            return
        }
        try {
            setIsChecking(true)
            const mintAddress = new web3.PublicKey(checkMint);
            const user = new web3.PublicKey(checkAddress)
            const user_ata = await getAssociatedTokenAddress(mintAddress, user);
            const userBal = await connection.getTokenAccountBalance(user_ata);
            setCheckedBalance(userBal.value.uiAmountString || "");
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsChecking(false)
        }

    }
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!connection || !wallet || sendAmount == 0 || sendingMint == "" || receiver == "" || !signTransaction) {
            return
        }
        try {
            setIsSending(true)
            const mintAddress = new web3.PublicKey(sendingMint);
            const receiverAddress = new web3.PublicKey(receiver)
            const mint = await getMint(connection, mintAddress);
            const { blockhash } = await connection.getRecentBlockhash();
            const txn = new web3.Transaction({
                recentBlockhash: blockhash,
                feePayer: wallet.publicKey
            });
            const receiver_ata = await getAssociatedTokenAddress(mint.address, receiverAddress)
            const accountInfo = await connection.getAccountInfo(receiver_ata);
            if (!accountInfo) {
                txn.add(
                    createAssociatedTokenAccountInstruction(
                        wallet.publicKey,
                        receiver_ata,
                        receiverAddress,
                        mint.address,
                        TOKEN_PROGRAM_ID
                    )
                )
            }
            txn.add(
                createMintToInstruction(
                    mint.address,
                    receiver_ata,
                    wallet.publicKey,
                    sendAmount * 10 ** mint.decimals
                )
            )
            const signedTxn = await signTransaction(txn);
            const signature = await connection.sendRawTransaction(signedTxn.serialize());
            await connection.confirmTransaction(signature, "finalized")
            toast.success("Txn succeed")

        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsSending(false)
        }
    }
    return (
        <section className="">
            <div className="container-fluid">

                <div className="py-4">
                    <div
                        className="p-6 w-full max-w-2xl mx-auto rounded-2xl text-center"
                        style={{ boxShadow: "0 0 14px 0 #00000015 inset" }}
                    >
                        <WalletMultiButton />
                        <H5 className="mt-4">Create Mint Token</H5>
                        <div className="col-md-12 text-center mt-4">
                            {
                                isCreating
                                    ?
                                    <Button className="btn" disabled>Creating Mint...</Button>
                                    :
                                    <Button className="btn" onClick={createToken}>Create Mint</Button>
                            }
                            {tokenMint != "" && <PSmall className="mt-4">Token Mint: {tokenMint}</PSmall>}
                        </div>
                    </div>
                </div>
                {/* <hr /> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                    <div className="py-4">
                        <div
                            className="p-6 w-full max-w-2xl mx-auto rounded-2xl"
                            style={{ boxShadow: "0 0 14px 0 #00000015 inset" }}
                        >
                            <H5>Mint tokens</H5>
                            <form className="mt-4 space-y-5" onSubmit={onSubmit}>
                                <div className="space-y-2">
                                    <PSmall>Mint (token address)</PSmall>
                                    <input
                                        type="text"
                                        className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none"
                                        name="mint"
                                        value={sendingMint}
                                        onChange={(e) => setSendingMint(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <PSmall>Receiver Address (user address)</PSmall>
                                    <input
                                        type="text"
                                        className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none"
                                        name="receiver"
                                        value={receiver}
                                        onChange={(e) => setReceiver(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <PSmall>Amount</PSmall>
                                    <input
                                        type="text"
                                        className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none"
                                        name="amount"
                                        value={sendAmount}
                                        onChange={(e) => setSendAmount(Number(e.target.value))}
                                    />
                                </div>

                                <div className="text-center">
                                    {
                                        isSending
                                            ?
                                            <Button type="button" className="btn btn-primary" disabled>
                                                Loading...
                                            </Button>
                                            :
                                            <Button type="submit" className="btn btn-primary">
                                                Send {sendAmount} Tokens
                                            </Button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <hr /> */}
                    <div className="py-4 h-full">
                        <div
                            className="p-6 w-full h-full max-w-2xl mx-auto rounded-2xl"
                            style={{ boxShadow: "0 0 14px 0 #00000015 inset" }}
                        >
                            <H5>Balance Check</H5>
                            <form className="form space-y-5 mt-4" onSubmit={onCheckSubmit}>
                                <div className="space-y-2">
                                    <PSmall>Mint</PSmall>
                                    <input
                                        type="text"
                                        className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none"
                                        name="mint"
                                        value={checkMint}
                                        onChange={(e) => setCheckMint(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <PSmall>Address</PSmall>
                                    <input
                                        type="text"
                                        className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none"
                                        name="address"
                                        value={checkAddress}
                                        onChange={(e) => setCheckAddress(e.target.value)}
                                    />
                                </div>



                                <div className="text-center">
                                    {
                                        isChecking
                                            ?
                                            <Button type="button" className="btn btn-primary" disabled>
                                                Loading...
                                            </Button>
                                            :
                                            <Button type="submit" className="btn btn-primary">
                                                Check Balance
                                            </Button>
                                    }
                                </div>

                                {
                                    checkedBalance &&
                                    <P className="text-center">Balance: {checkedBalance}</P>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

