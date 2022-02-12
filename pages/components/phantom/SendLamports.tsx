import { WalletNotConnectedError, WalletReadyState } from '@solana/wallet-adapter-base';
import { useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

// Example taken from https://stackoverflow.com/questions/70727499/get-balance-and-all-custom-token-list-of-solana-tokens-in-wallet
export const SendLamports: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    console.log(publicKey)
    const walletContextState: WalletContextState = useWallet()
    console.log("Wallet Context State: ", walletContextState)
    const phantomWalletAdapters = walletContextState.wallets.filter(wallet => wallet.readyState == WalletReadyState.Installed)
    for (let wallet of phantomWalletAdapters) {
        console.log(wallet);
    }
    const activeWallet = walletContextState.wallet;
    console.log("Active Wallet: ", activeWallet)

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('3TUoR8hz3ELPvihmsowkyEBeytSVsRuMRKs3TnrTULUS'), // Keypair.generate().publicKey,
                lamports: 0.01 * LAMPORTS_PER_SOL
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send lamports to address!
        </button>
    );
};