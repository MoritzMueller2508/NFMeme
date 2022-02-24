// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//Solana Token Program: https://spl.solana.com/token
import * as web3 from '@solana/web3.js';
import * as spltoken from '@solana/spl-token';
import type { NextApiRequest, NextApiResponse } from 'next'


//TODO Wallet Adapter vllt. ->https://github.com/solana-labs/wallet-adapter


export async function createNewKeyPair(): Promise<web3.Keypair>{
  //Connect to Testnet
  const connection = await getConnectionNet();

  //generate new KeyPair
  const payer = web3.Keypair.generate();

  //Airdrop Token
  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  await connection.confirmTransaction(airdropSignature);

  //Control Output (Temp)
  console.log("pubKey: " + payer.publicKey.toBase58());
  console.log("secretKey: " + payer.secretKey);

  //alt return payer.secretKey : uint8Array
  return payer;
}


export async function createNewSPLToken(payer: web3.Keypair){

  //Connect to Testnet
  const connection = await getConnectionNet();

  //initialize KeyPair 
  const mintAuthority = web3.Keypair.generate();
  const freezeAuthority = web3.Keypair.generate();

  //create Token
  const mint = await spltoken.createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    freezeAuthority.publicKey,
    9 // We are using 9 to match the CLI decimal default exactly
  );
  console.log("Token: " + mint.toBase58());

  //create TokenAccount
  const tokenAccount = await spltoken.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  )
  console.log(tokenAccount.address.toBase58());
  // 7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi

  //mint Token to your Wallet
  await spltoken.mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    mintAuthority,
    100
  )

  
}

export async function checkAccount(publicKey: String){
  //Connect to Testnet
  const connection = await getConnectionNet();

  //check your Wallet
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new web3.PublicKey(publicKey),
    {
      programId: spltoken.TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((e) => {
    const accountInfo = spltoken.AccountLayout.decode(e.account.data);
    console.log(`${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
  })
}

export async function getConnectionNet(): Promise<web3.Connection>{
  //Connect to Testnet
  const connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed'
  );
  return connection;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payer = await createNewKeyPair();// <-- Hier kann das KeyPair definiert werden
  await createNewSPLToken(payer);
  checkAccount(payer.publicKey.toBase58())
}
