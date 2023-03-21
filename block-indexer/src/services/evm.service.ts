import { InfuraProvider } from '@ethersproject/providers';
import { getSmallestBlockNumber } from '@repositories/block.repository';
import { logger } from '@utils/logger';
import { IBlock, IBlockIndexEvent } from 'lib-indexer/interfaces';

async function getNextBlockNumberToIndex(provider: InfuraProvider): Promise<IBlockIndexEvent> {
  try {
    let oldestBlock: Pick<IBlock, 'blockNumber'>[] = await getSmallestBlockNumber();
    logger.info(`Oldest block is`, oldestBlock);
    if (oldestBlock.length > 0 && oldestBlock[0].blockNumber === 0) {
      return { blockNumber: -1 }; //it means we indexes all blocks
    }
    const smallestBlockNumber = oldestBlock.length > 0 ? oldestBlock[0].blockNumber - 1 : Number.MAX_SAFE_INTEGER;
    const currentBlockNumber: number = await provider.getBlockNumber();
    logger.info(`Current block number is ${currentBlockNumber}`);
    const fetchingBlockNumber = smallestBlockNumber < currentBlockNumber ? smallestBlockNumber : currentBlockNumber;
    return { blockNumber: fetchingBlockNumber };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export { getNextBlockNumberToIndex };
