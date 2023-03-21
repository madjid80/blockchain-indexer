import BlockEntity from '@models/block.entity';
import { IBlock } from 'lib-indexer/interfaces';

async function getSmallestBlockNumber(): Promise<Pick<IBlock, 'blockNumber'>[]> {
  return BlockEntity.find({}).select('blockNumber').sort({ blockNumber: 1 }).limit(1);
}

export { getSmallestBlockNumber };
