import { describe, expect, it } from "vitest";

import { CalculateFreight } from "../../src/application/calculate-freight.use-case";
import { ZipcodeData } from "../../src/domain/data/zipcode-data";
import { Zipcode } from "../../src/domain/entities/zipcode";

describe("SimulateFreight unit tests (UseCase)", () => {
    it("should be able to simulate a freight without cep", async () => {
        const input = {
            products: [
                { volume: 1, density: 2, quantity: 1 },
                { volume: 2, density: 10, quantity: 1 },
                { volume: 3, density: 20, quantity: 1 },
            ],
        };
        const sut = new CalculateFreight(undefined as any);
        const response = await sut.execute(input);
        expect(response).toStrictEqual({ freight: 820 });
    });

    it("should be able to simulate a freight with minimum of R$10,00", async () => {
        const input = {
            products: [{ volume: 1, density: 1, quantity: 1 }],
        };
        const sut = new CalculateFreight(undefined as any);
        const response = await sut.execute(input);
        expect(response).toStrictEqual({ freight: 10 });
    });

    it("should be able to simulate a freight with cep", async () => {
        const zipcodeData: ZipcodeData = {
            get: async function (code: string): Promise<Zipcode | undefined> {
                if (code === "22030060")
                    return new Zipcode("22030060", "", "", -27.5945, -48.5477);
                if (code === "88015600")
                    return new Zipcode("88015600", "", "", -22.9192, -43.2003);
            },
        };
        const input = {
            from: "22030060",
            to: "88015600",
            products: [{ volume: 1, density: 2, quantity: 1 }],
        };
        const sut = new CalculateFreight(zipcodeData);
        const response = await sut.execute(input);
        expect(response).toStrictEqual({ freight: 14.95 });
    });
});
