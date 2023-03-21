import { InfuraProvider } from '@ethersproject/providers';
import { logger } from '@utils/logger';
import { sendMessage } from '@utils/rabbitMq';
import { Channel } from 'amqplib';
import { EQueues } from 'lib-indexer/constants';
let provider: InfuraProvider;
function connectToInfura(projectId: string, network: string): InfuraProvider {
  try {
    if (!provider) {
      provider = new InfuraProvider(network, projectId);
      logger.info('Successfully connect to Infura provider', network);
    }
    return provider;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
//TODO should be more generic
function getProvider(): InfuraProvider {
  return provider
}

async function welcomeNewBies(provider: InfuraProvider, channel: Channel): Promise<void> {
  provider.on('block', (blockNumber: number) => {
    logger.info('New block minted on the network', blockNumber);
    sendMessage(channel, EQueues.BLOCK_INDEXER_NEW_BLOCK_MINTED, { blockNumber });
  });
}
export default { connectToInfura, welcomeNewBies, getProvider };
