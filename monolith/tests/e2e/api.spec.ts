import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../src/infra/http/app";
import { getCurrentFullYear } from "../date.fixture";

describe("API E2E tests", () => {
    const api = request(app);

    it("should be able to return error when receives incorrect cpf", async () => {
        const payload = {
            cpf: "123.456.789-10",
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("Invalid CPF");
    });

    it("should be able to return error when product does not exists", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [{ productId: 9, quantity: 3 }],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("Product not found");
    });

    it("should be able to do the checkout with 3 products and calculate the total", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 3, quantity: 2 },
            ],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(642);
    });

    it("should be able to do the checkout with 3 products with coupon and calculate the total even if coupon not found", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 3, quantity: 2 },
            ],
            coupon: "INVALID_COUPON",
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(642);
    });

    it("should be able to do the checkout with 3 products with coupon and calculate the total", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 3, quantity: 2 },
            ],
            coupon: "VALE20",
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(601.6);
    });

    it("should not be able to apply coupon when it is out of dated", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 3, quantity: 2 },
            ],
            coupon: "VALE60",
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(642);
    });

    it("should not be able to do the checkout if product quantity is negative", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: -3 },
                { productId: 3, quantity: 2 },
            ],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("Invalid item quantity");
    });

    it("should not be able to do the checkout if product quantity is zero", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 0 },
                { productId: 3, quantity: 2 },
            ],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("Invalid item quantity");
    });

    it("should be able to do the checkout with 3 products and calculate the total with freight", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 3, quantity: 2 },
            ],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(642);
    });

    it("should be able to do the checkout and calculate the total with minimum freight of R$10,00", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [{ productId: 1, quantity: 1 }],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(32);
    });

    it("should be able to return the order code", async () => {
        const payload = {
            cpf: "502.502.880-95",
            items: [{ productId: 1, quantity: 1 }],
        };
        const response = await api.post("/checkout").send(payload);
        expect(response.status).toBe(200);
        expect(response.body.orderCode).toBe(`${getCurrentFullYear()}00000001`);
    });
});
