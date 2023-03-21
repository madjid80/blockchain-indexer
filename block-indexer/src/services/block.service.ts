import { logger } from '@utils/logger';
//TODO this should go to better folder
import ethereum from '@bootstrap/ethereum';
import { IBlockIndexEvent } from 'lib-indexer/interfaces';
import { Block } from '@ethersproject/providers';

async function fetchBlockContent(requestedBlock: IBlockIndexEvent) {
  try {
    logger.info('going to fetch block by number.')
    const provider = await ethereum.getProvider();
    const block: Block  =  await provider.getBlock(requestedBlock.blockNumber)
    console.log(block)
  } catch (error) {
    logger.error(error);
  }
}

export { fetchBlockContent };
