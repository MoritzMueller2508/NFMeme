import { Phantom } from "./Phantom"
import { Transaction, Connection } from '@solana/web3.js'

const SendTransaction = () => {
    const sendTSX = async () => {
        const network = "https://api.testnet.solana.com";
        const connection = new Connection(network);
        const transaction = new Transaction();
        const { signature } = await (window["solana"] as Phantom).signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature);
    }

    return <button className="phantom-send-transaction" onClick={() => sendTSX()}>Send transaction</button>
}

export default SendTransaction