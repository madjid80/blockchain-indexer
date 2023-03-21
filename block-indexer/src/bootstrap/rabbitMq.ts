import { logger } from '@utils/logger';
import { connect, Channel } from 'amqplib';

async function getRabbitMqChannel(url: string): Promise<Channel> {
    try{
        const rabbitMqConnection = await connect('amqp://' + url);
        const senderChannel = await rabbitMqConnection.createChannel();
        logger.info('successfully connect to rabbitmq', url)
        return senderChannel;
    }catch(error){
        logger.error('rabbit mq connection function failed to connect: ',error)
        throw error;
    }
  
}

export { getRabbitMqChannel };
