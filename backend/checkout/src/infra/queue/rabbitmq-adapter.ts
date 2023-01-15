import amqp from "amqplib";

import { Queue } from "./queue";

export class RabbitMQAdapter implements Queue {
    connection!: amqp.Connection;

    async connect(): Promise<void> {
        this.connection = await amqp.connect("");
    }

    async on(queueName: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, async (message) => {
            if (!message) return;
            const input = JSON.parse(message.content.toString());
            await callback(input);
            channel.ack(message);
        });
    }

    async publish(queueName: string, data: any): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    }
}
