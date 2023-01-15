import { vitest, describe, it, expect, beforeEach } from "vitest";

import { CheckoutFactory } from "../../src/application/checkout/checkout-factory";
import { Checkout } from "../../src/application/checkout/checkout.use-case";
import { QueueController } from "../../src/infra/queue/queue-controller";
import { QueueMemory } from "../../src/infra/queue/queue-memory";
import { getCurrentFullYear } from "../date.fixture";

describe("Queue E2E tests", () => {
    const checkoutSpy = vitest.spyOn(Checkout.prototype, "execute");

    beforeEach(() => {
        checkoutSpy.mockRestore();
    });

    it("should be able to create an order", async () => {
        const payload = {
            cpf: "582.407.930-70",
            items: [{ productId: 1, quantity: 2 }],
        };
        const checkout = CheckoutFactory.createForTest();
        const queue = new QueueMemory();
        new QueueController(queue, checkout);
        await queue.publish("checkout", payload);
        const checkoutOutput = getResult();
        expect(checkoutOutput).toMatchObject({
            total: 44,
            orderCode: `${getCurrentFullYear()}00000001`,
        });
    });

    function getResult() {
        return checkoutSpy.mock.results[0].value;
    }
});
