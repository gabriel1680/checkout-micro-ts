import { beforeEach, describe, expect, it, Mocked, vitest } from "vitest";
import { Checkout } from "../../src/application/checkout/checkout.use-case";
import { OrderData } from "../../src/domain/data/order-data";
import { Order } from "../../src/domain/entities/order";
import { CouponInMemory } from "../../src/infra/database/in-memory/coupon-in-memory";
import { ProductInMemory } from "../../src/infra/database/in-memory/product-in-memory";

describe("Checkout unit test (UseCase)", () => {
    let sut: Checkout;
    let orderData: Mocked<OrderData>;

    beforeEach(() => {
        vitest.clearAllMocks();
        orderData = {
            create: vitest.fn(),
            getByCpf: vitest.fn(),
            getByCode: vitest.fn(),
        };
        sut = new Checkout(
            new ProductInMemory(),
            new CouponInMemory(),
            orderData
        );
    });

    it("should be able to save the order", async () => {
        const input = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 3, quantity: 2 },
            ],
        };
        await sut.execute(input);
        expect(orderData.create).toHaveBeenNthCalledWith(1, expect.any(Order));
    });
});
