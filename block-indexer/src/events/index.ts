import { fetchBlockContent } from '@services/block.service';
import { logger } from '@utils/logger';
import { ConsumeMessage } from 'amqplib';
import { EQueues } from 'lib-indexer/constants';
import { IBlockIndexEvent } from 'lib-indexer/interfaces';

//TODO write it with more generic type and handle more generic queue
async function blockIndexerQueueHandler(msg: ConsumeMessage | null) {
  logger.info('New event received', msg);
  const queueName = msg?.fields.routingKey;
  try {
    const event: IBlockIndexEvent = JSON.parse(msg?.content.toString() ?? '{}') as IBlockIndexEvent;
    if (!event.blockNumber || event.blockNumber === -1) {
    }
    await fetchBlockContent(event);
    if (queueName === EQueues.BLOCK_INDEXER_NEW_BLOCK_MINTED) {
      logger.info('new minted block event received.', event);
    }
    if (queueName === EQueues.BLOCK_INDEXER_ARCHIVE_BLOCK) {
      logger.info('Need to recover an archive block.', event);
    }
  } catch (error) {
    logger.error(error);
  }
}

export { blockIndexerQueueHandler };
