import { describe, expect, it } from "vitest";
import { GetOrderByCpf } from "../../src/application/get-order-by-cpf";
import { OrderData } from "../../src/domain/data/order-data";
import { Order } from "../../src/domain/entities/order";

describe("GetOrderByCpf unit tests (UseCase)", () => {
    it("should be able to get a order", async () => {
        const orderData: OrderData = {
            getByCode: async function (code: string): Promise<any> {
                return { total: 125 };
            },
            getByCpf: async function (cpf: string): Promise<any> {
                return { total: 125 };
            },
            create: function (order: Order): Promise<void> {
                throw new Error("Function not implemented.");
            },
        };
        const sut = new GetOrderByCpf(orderData);
        const output = await sut.execute({ cpf: "some valid cpf" });
        expect(output.total).toBe(125);
    });
});
