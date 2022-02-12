type Event = "connect" | "disconnect"

export interface Phantom {
    signAndSendTransaction(transaction: any): { signature: any; } | PromiseLike<{ signature: any; }>;
    on: (event: Event, callback: () => void) => void;
    connect: () => Promise<void>
    disconnect: () => Promise<void>;
}