import { describe, expect, it, vitest, beforeEach } from "vitest";

import { CheckoutFactory } from "../../src/application/checkout/checkout-factory";
import { Checkout } from "../../src/application/checkout/checkout.use-case";
import { CLIController } from "../../src/infra/cli/cli-controller";
import { CLIHandlerMemory } from "../../src/infra/cli/cli-handler-memory";
import { getCurrentFullYear } from "../date.fixture";

describe("CLI E2E tests", () => {
    const makeSut = () => {
        const checkout = CheckoutFactory.createForTest();
        const handler = new CLIHandlerMemory();
        new CLIController(handler, checkout);
        return handler;
    };

    const checkoutSpy = vitest.spyOn(Checkout.prototype, "execute");

    beforeEach(() => {
        checkoutSpy.mockRestore();
    });

    it("should be able to return error when receives incorrect cpf", async () => {
        const payload = {
            cpf: "123.456.789-10",
        };
        const sut = makeSut();
        await sut.type(`set-cpf ${payload.cpf}\n`);
        await sut.type("checkout");
        const checkoutOutput = checkoutSpy.mock.results[0].value;
        expect(checkoutOutput).instanceOf(Error);
        expect(checkoutOutput.message).contains("Invalid CPF");
    });

    it("should be able to return error when product does not exists", async () => {
        const payload = {
            cpf: "582.407.930-70",
            products: { id: 9, quantity: 2 },
        };
        const sut = makeSut();
        await sut.type(`set-cpf ${payload.cpf}\n`);
        await sut.type(
            `add-item ${payload.products.id} ${payload.products.quantity}`
        );
        await sut.type("checkout");
        const checkoutOutput = checkoutSpy.mock.results[0].value;
        expect(checkoutOutput.message).contain("Product not found");
    });

    it("should be able to checkout with one product", async () => {
        const payload = {
            cpf: "582.407.930-70",
            products: { id: 1, quantity: 2 },
        };
        const sut = makeSut();
        await sut.type(`set-cpf ${payload.cpf}\n`);
        await sut.type(
            `add-item ${payload.products.id} ${payload.products.quantity}`
        );
        await sut.type("checkout");
        const checkoutOutput = checkoutSpy.mock.results[0].value;
        expect(checkoutOutput).toMatchObject({
            total: 54,
            orderCode: `${getCurrentFullYear()}00000001`,
        });
    });
});
