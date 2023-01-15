import { describe, it, expect } from "vitest";
import { OrderCode } from "../../src/domain/entities/order-code";

describe("OrderCode unit tests (Domain)", () => {
    it("should be able to create a order code", () => {
        const orderCode = new OrderCode(new Date("2022-12-12"), 0);
        expect(orderCode.value).toBe("202200000001");
    });

    it("should not be able to create a order code with negative sequence", () => {
        expect(() => {
            new OrderCode(new Date("2022-12-12"), -1);
        }).toThrowError("Invalid sequence");
    });

    it.each([null, undefined, 123, new Date("asd")])(
        "should not be able to create a order code with invalid date",
        (date: any) => {
            expect(() => {
                new OrderCode(date, 1);
            }).toThrowError("Invalid date");
        }
    );
});
