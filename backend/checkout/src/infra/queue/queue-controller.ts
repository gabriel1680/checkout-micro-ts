import { Checkout } from "../../application/checkout/checkout.use-case";
import { Queue } from "./queue";

export class QueueController {
    constructor(readonly queue: Queue, readonly checkout: Checkout) {
        queue.on("checkout", async (input: any) => {
            try {
                await checkout.execute(input);
            } catch (error) {
                console.log(error);
            }
        });
    }
}
