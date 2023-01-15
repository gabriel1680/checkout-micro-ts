import { describe, expect, it } from "vitest";
import { CouponInMemory } from "../../src/infra/database/in-memory/coupon-in-memory";
import { ValidateCoupon } from "../../src/application/validate-coupon.use-case";

describe("ValidateCoupon unit tests (UseCase)", () => {
    function makeSut() {
        return new ValidateCoupon(new CouponInMemory());
    }

    it("should be able to validate a coupon", async () => {
        const input = {
            coupon: "VALE20",
        };
        const sut = makeSut();
        const response = await sut.execute(input);
        expect(response).toStrictEqual({ isValid: true });
    });

    it("should be able to return false for expired coupon", async () => {
        const input = {
            coupon: "VALE60",
        };
        const sut = makeSut();
        const response = await sut.execute(input);
        expect(response).toStrictEqual({ isValid: false });
    });

    it("should be able to return false for non existent coupon", async () => {
        const input = {
            coupon: "INEXISTENT_COUPON",
        };
        const sut = makeSut();
        const response = await sut.execute(input);
        expect(response).toStrictEqual({ isValid: false });
    });
});
