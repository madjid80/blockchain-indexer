export interface IBlock {
  id: string;
  difficulty: number;
  extraData: string;
  gasLimit: string; //Big
  gasUsed: string; 
  hash: string;
  miner: string; 
  none: string; 
  blockNumber: number; 
  parentHash: string;
  timestamp: number; 
  networkId: string;
}
