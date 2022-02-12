import { useEffect, useState } from "react"
import { Phantom } from "./Phantom";
import SendTransaction from "./SendTransaction";

const ConnectToPhantom = () => {
    const [phantom, setPhantom] = useState<Phantom | null>(null)
    const [connected, setConnected] = useState(false);

    const connectHandler = () => {
        phantom?.connect()
    };

    const disconnectHandler = () => {
        phantom?.disconnect();
    }

    useEffect(() => {
        if ((window["solana"])?.isPhantom) {
            setPhantom(window["solana"])
            console.log(window["solana"])
        }
    }, []);

    useEffect(() => {
        phantom?.on("connect", () => setConnected(true))
        phantom?.on("disconnect", () => setConnected(false))
    }, [phantom])

    if (phantom) {
        if (connected) return (<div>
            <button onClick={disconnectHandler} className="phantom-button-connect">Disconnect from Phantom</button>
            <SendTransaction></SendTransaction>
        </div>)
        else return <button onClick={connectHandler} className="phantom-button-connect">Connect to Phantom</button>
    }
    else return <a href="https://phantom.app/" target="_blank" className="phantom-button-connect">Get Phantom</a>
};

export default ConnectToPhantom