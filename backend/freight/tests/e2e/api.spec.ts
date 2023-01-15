import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../../src/infra/http/app";

describe("API E2E tests", () => {
    const api = request(app);

    it("should be able to return error when receives incorrect cpf", async () => {
        const payload = {
            products: [{ volume: 0.03, density: 100, quantity: 1 }],
        };
        const response = await api.post("/calculate-freight").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.freight).toStrictEqual(30);
    });
});
