import { describe, expect, it } from "vitest";
import { GetOrderByCode } from "../../src/application/get-order-by-code";
import { OrderData } from "../../src/domain/data/order-data";
import { Order } from "../../src/domain/entities/order";

describe("GetOrderByCode unit tests (UseCase)", () => {
    it("should be able to get a order", async () => {
        const orderData: OrderData = {
            getByCode: async function (code: string): Promise<any> {
                return { total: 125 };
            },
            getByCpf: function (cpf: string): Promise<any> {
                throw new Error("Function not implemented.");
            },
            create: function (order: Order): Promise<void> {
                throw new Error("Function not implemented.");
            },
        };
        const sut = new GetOrderByCode(orderData);
        const output = await sut.execute({ code: "some code" });
        expect(output.total).toBe(125);
    });
});
