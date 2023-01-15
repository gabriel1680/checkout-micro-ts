import { describe, it, expect } from "vitest";

import { Coord } from "../../src/domain/entities/coord";
import { DistanceCalculator } from "../../src/domain/entities/distance-calculator";

describe("DistanceCalculator unit tests (Domain)", () => {
    it("should be able to calculate distance between the same spot", () => {
        const x0 = new Coord(12, 43);
        const x1 = new Coord(12, 43);
        const distance = DistanceCalculator.calculate(x0, x1);
        expect(distance).toBe(0);
    });

    it("should be able to calculate distance between two different coordinates", () => {
        const x0 = new Coord(-46.70122878491827, -23.5663172846805);
        const x1 = new Coord(47.6205063, -122.3514661);
        const distance = DistanceCalculator.calculate(x0, x1);
        expect(distance).toBe(14172.280599196218);
    });
});
