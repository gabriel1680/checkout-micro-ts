import { describe, it, expect } from "vitest";
import { Coupon } from "../../src/domain/entities/coupon";
import { Order } from "../../src/domain/entities/order";
import { Product } from "../../src/domain/entities/product";
import { getCurrentFullYear } from "../date.fixture";

describe("Order unit tests (Domain)", () => {
    it("should be able to create an empty order with only a valid cpf", () => {
        const order = new Order("582.407.930-70");
        expect(order.total()).toBe(0);
    });

    it("should not be able to create an empty order with a Invalid CPF", () => {
        expect(() => {
            new Order("111.111.111-11");
        }).toThrowError("Invalid CPF");
    });

    it("should be able to create an order with 3 items", () => {
        const order = new Order("582.407.930-70");
        order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 1);
        order.addItem(new Product(2, "B", 30, 100, 30, 10, 3), 1);
        order.addItem(new Product(3, "C", 45, 200, 100, 50, 40), 2);
        expect(order.total()).toBe(142);
    });

    it("should be able to create an order with 3 items with coupon", () => {
        const order = new Order("582.407.930-70");
        order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 1);
        order.addItem(new Product(2, "B", 30, 100, 30, 10, 3), 1);
        order.addItem(new Product(3, "C", 45, 200, 100, 50, 40), 2);
        order.addCoupon(new Coupon("VALE20", 20, new Date("2025-12-12")));
        expect(order.total()).toBe(113.6);
    });

    it("should not be able to create an order with invalid item quantity", () => {
        const order = new Order("582.407.930-70");
        expect(() => {
            order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), -1);
        }).toThrowError("Invalid item quantity");
        expect(() => {
            order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 0);
        }).toThrowError("Invalid item quantity");
    });

    it("should not be able to create an order with duplicated products", () => {
        const order = new Order("582.407.930-70");
        expect(() => {
            order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 1);
            order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 1);
        }).toThrowError("Duplicated product");
    });

    it("should be able to create an order with 3 products and calculate the total with freight", () => {
        const order = new Order("582.407.930-70");
        order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 1);
        order.addItem(new Product(2, "B", 30, 100, 30, 10, 3), 1);
        order.addItem(new Product(3, "C", 45, 200, 100, 50, 40), 2);
        expect(order.totalWithFreight()).toBe(582);
    });

    it("should be able to create an order with code", () => {
        const order = new Order("582.407.930-70");
        order.addItem(new Product(1, "A", 22, 20, 15, 10, 0.9), 1);
        order.addItem(new Product(2, "B", 30, 100, 30, 10, 3), 1);
        order.addItem(new Product(3, "C", 45, 200, 100, 50, 40), 2);
        expect(order.code()).toBe(`${getCurrentFullYear()}00000001`);
    });
});
