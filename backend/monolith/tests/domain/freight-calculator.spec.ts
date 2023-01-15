import { describe, it, expect } from "vitest";

import { FreightCalculator } from "../../src/domain/entities/freight-calculator";
import { Product } from "../../src/domain/entities/product";

describe("FreightCalculator unit tests (Domain)", () => {
    it("should be able to calculate the freight of a product", () => {
        const product = new Product(1, "A", 22, 20, 15, 10, 15);
        const freight = FreightCalculator.calculate(product);
        expect(freight).toBe(150);
    });

    it("should be able to calculate minimum freight of a product", () => {
        const product = new Product(1, "B", 22, 20, 15, 10, 0.9);
        const freight = FreightCalculator.calculate(product);
        expect(freight).toBe(10);
    });

    it("should be able to calculate a freight of a product with a distance and minimum value", () => {
        const product = new Product(1, "B", 22, 20, 15, 10, 0.9);
        const distance = 800;
        const freight = FreightCalculator.calculate(product, distance);
        expect(freight).toBe(10);
    });

    it("should be able to calculate a freight of a product with a distance", () => {
        const product = new Product(1, "B", 22, 20, 15, 10, 19);
        const distance = 800;
        const freight = FreightCalculator.calculate(product, distance);
        expect(freight).toBe(152);
    });
});
