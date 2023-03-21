import express from 'express';
import { Server } from 'http';
import dbBootstrap from './bootstrap/db';
import { logger } from '@utils/logger';
import controllers from './controllers';
import { accessLogMiddleware } from './middlewares/logger';
import timeout from 'connect-timeout';
import { haltOnTimeout } from './middlewares/timeout';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { prometheusMiddleware } from './middlewares/prometheus';
import ethereum from '@bootstrap/ethereum';
import { getRabbitMqChannel } from '@bootstrap/rabbitMq';
import { defineQueueHandler, sendMessage } from '@utils/rabbitMq';
import { EQueues } from 'lib-indexer/constants'
import { blockIndexerQueueHandler } from './events';
import { getNextBlockNumberToIndex } from '@services/evm.service';
import { IBlockIndexEvent } from 'lib-indexer/interfaces';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(prometheusMiddleware);
app.use(accessLogMiddleware);
app.use(timeout('2s'));
app.use(controllers.router);
app.use(haltOnTimeout);
app.use(errorHandlerMiddleware);

const server: Server = app.listen(port, async () => {
  logger.info(`Block indexer is running on port ${port}`);
  dbBootstrap.mongoConnect().catch((error) => {
    logger.error('Mongo has an error', error);
    logger.info('Going to shutdown the server.');
    process.exit(0);
  });
  //TODO here should implement for multiple provider with one interface
  const provider = await ethereum.connectToInfura(process.env.INFURA_PROJECT_ID ?? '', process.env.NETWORK_NAME ?? '');
  const rabbitMqChannel = await getRabbitMqChannel(process.env.RABBIT_MQ_URL ?? '');
  const nextBlockNumberToIndex: IBlockIndexEvent = await getNextBlockNumberToIndex(provider);
  defineQueueHandler(rabbitMqChannel,  EQueues.BLOCK_INDEXER_ARCHIVE_BLOCK , blockIndexerQueueHandler);
  defineQueueHandler(rabbitMqChannel,  EQueues.BLOCK_INDEXER_NEW_BLOCK_MINTED , blockIndexerQueueHandler);
  await sendMessage<IBlockIndexEvent>(rabbitMqChannel, EQueues.BLOCK_INDEXER_ARCHIVE_BLOCK, nextBlockNumberToIndex);
  

  ethereum.welcomeNewBies(provider, rabbitMqChannel);
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.info('Block indexer Crashed because of', signal);
  logger.info('Going to shutdown the server.');
  server.close(() => {
    logger.info('Http server closed.');
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown).on('SIGINT', shutdown).on('uncaughtException', shutdown);
