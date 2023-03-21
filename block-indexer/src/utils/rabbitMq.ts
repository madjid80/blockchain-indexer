import { ConsumeMessage, Channel } from 'amqplib';

async function sendMessage<T>(channel: Channel, queue: string, body: T) {
  await channel.assertQueue(queue);
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(body)));
}

async function defineQueueHandler(channel: Channel, queue: string, queueHandler: (msg: ConsumeMessage | null) => void) {
  await channel.assertQueue(queue);
  channel.consume(queue, queueHandler);
}

export { sendMessage, defineQueueHandler };
