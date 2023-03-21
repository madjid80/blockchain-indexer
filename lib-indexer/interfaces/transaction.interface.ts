export interface ITransaction{
    id: string; 
    blockHash: string; 
    blockNumber: number;
    blockId: string; 
    confirmations: number;
    data: string; 
    from: string; 
    gasLimit: string; 
    gasPrice: string;
    hash: string;
    nonce: number;
    r: string;
    s: string;
    to: string;
    transactionIndex: number; 
    type: number; 
    v: number;
    value: string;
}