import { describe, it, expect } from "vitest";
import { Coupon } from "../../src/domain/entities/coupon";

describe("Coupon unit tests (Domain)", () => {
    it.each([
        { code: 123, discountPercentage: 12, expireDate: new Date() },
        { code: "VALE20", discountPercentage: "asd", expireDate: new Date() },
        {
            code: "VALE20",
            discountPercentage: "asd",
            expireDate: new Date().getTime(),
        },
        { code: null, discountPercentage: 12, expireDate: new Date() },
        { code: "VALE20", discountPercentage: null, expireDate: new Date() },
        {
            code: "VALE20",
            discountPercentage: "asd",
            expireDate: null,
        },
    ])("should be able to validate a coupon", (data: any) => {
        expect(() => {
            new Coupon(data.code, data.discountPercentage, data.expireDate);
        }).toThrowError("Invalid Coupon");
    });

    it("should be able to tell when coupon is expired", () => {
        let coupon = new Coupon("VALE20", 12, new Date("2020-10-10"));
        expect(coupon.isExpired()).toBeTruthy();

        coupon = new Coupon("VALE20", 12, getFutureDate());
        expect(coupon.isExpired()).toBeFalsy();
    });

    it("should be able to calculate discount", () => {
        const total = 100;
        const coupon = new Coupon("VALE20", 12, new Date("2020-10-10"));
        expect(coupon.getDiscount(total)).toBe(12);
    });
});

function getFutureDate(): Date {
    return new Date(new Date().getTime() + 3600);
}
