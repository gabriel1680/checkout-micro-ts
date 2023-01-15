import { CheckoutFactory } from "../../application/checkout/checkout-factory";
import { QueueController } from "./queue-controller";
import { RabbitMQAdapter } from "./rabbitmq-adapter";

async function init() {
    const checkout = CheckoutFactory.createForProduction();
    const queue = new RabbitMQAdapter();
    new QueueController(queue, checkout);
    await queue.connect();
}

init();
