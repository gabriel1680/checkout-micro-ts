import { describe, it, expect } from "vitest";

import { FreightCalculator } from "../../src/domain/entities/freight-calculator";

describe("FreightCalculator unit tests (Domain)", () => {
    it("should be able to calculate the freight of a product", () => {
        const freight = FreightCalculator.calculate(0.03, 100);
        expect(freight).toBe(30);
    });

    it("should be able to calculate minimum freight of a product", () => {
        const freight = FreightCalculator.calculate(0.125, 176);
        expect(freight).toBe(220);
    });

    it("should be able to calculate a freight of a product with a distance and minimum value", () => {
        const distance = 800;
        const freight = FreightCalculator.calculate(0.01, 100, distance);
        expect(freight).toBe(10);
    });

    it("should be able to calculate a freight of a product with a distance", () => {
        const distance = 800;
        const freight = FreightCalculator.calculate(0.03, 100, distance);
        expect(freight).toBe(24);
    });
});
